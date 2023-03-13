import React, {Component} from 'react';
import PropTypes from 'prop-types';
import QrScanner from '../../components/QRPayment/QRScanner.component.js';
import {connect} from 'react-redux';
import {StackActions, NavigationActions} from 'react-navigation';
import result from 'lodash/result';
import {language} from '../../config/language';
import {destroy} from 'redux-form';
import * as actionCreators from '../../state/actions/index.actions.js';
import {
  getInvoiceDetail,
  invoiceGPN,
  saveQrData,
  goToShowQR,
  getGenerateCode,
  invoiceTcico,
  goToShowQRTcico,
} from '../../state/thunks/qrpayment.thunk';
import isEmpty from 'lodash/isEmpty';
import {
  getTransferPossibleAccountsNoEmoney,
  getUnformattedAccountAmount,
  parseTLV,
  parseTLVTcico,
  getAllAccountsExcept,
} from '../../utils/transformer.util';
import {getDefaultAccount} from '../../state/thunks/genericBill.thunks';
// import firebase from 'react-native-firebase';
// import {Platform} from 'react-native';
import {reduxForm, change} from 'redux-form';
import {validateRequiredFields} from '../../utils/validator.util';
import BackgroundTimer from 'react-native-background-timer';
import {
  triggerAuthNavigate,
  getCacheBankList,
} from '../../state/thunks/common.thunks';

// let Analytics = firebase.analytics();

const formConfig = {
  form: 'MyQRForm',
  destroyOnUnmount: true,
  validate: values => {
    let errors = {
      ...validateRequiredFields(values, ['accountNo', 'amount']),
    };
    return {
      errors,
    };
  },
  onSubmit: (values, dispatch, {toQrShow}) => {
    const params = {onSubmit: toQrShow, amount: 0, isOtp: false};
    dispatch(triggerAuthNavigate('lkd', 0, true, 'Auth', params));
  },
};

const DecoratedTdForm = reduxForm(formConfig)(QrScanner);

class QRScanner extends Component {
  static propTypes = {
    getInvoice: PropTypes.func,
    inputAmount: PropTypes.func,
    destroyForm: PropTypes.func,
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    getInvoiceDIMO: PropTypes.func,
    showQR: PropTypes.func,
    gotoGenerate: PropTypes.func,
    isLogin: PropTypes.bool,
    nav: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    backQr: PropTypes.func,
    showSandTime: PropTypes.bool,
    renewQR: PropTypes.func,
    savingAccounts: PropTypes.array,
    formValues: PropTypes.object,
    dataNewQR: PropTypes.object,
    isVisible: PropTypes.object,
    changeAccount: PropTypes.func,
    getInvoiceTcico: PropTypes.func,
    getDefaultAccount: PropTypes.func,
    goToShowQr: PropTypes.func,
    scannerState: PropTypes.bool,
    clearScannerState: PropTypes.func,
    setScannerState: PropTypes.func,
    clearCPM: PropTypes.func,
    clearCPMandValues: PropTypes.func,
    clearGenerated: PropTypes.func,
    goToExistingQRCPM: PropTypes.func,
    tagQrTTS: PropTypes.object,
    showQRTcico: PropTypes.func,
    bankList: PropTypes.object,
    getCacheBankList: PropTypes.func,
    hideQRTTS: PropTypes.string,
  };

  state = {
    qrVal: {},
    showQR: true,
    showPopupQR: false,
    showCountdown: 0,
    countGenerated: 0,
  };

  showErrorGallery = () => {
    const {dispatch} = this.props;
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      dispatch(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'QRScannerLanding'}),
          ],
        }),
      );
    };
    const modalOptions = {
      button1: 'OK',
      onButton1Press: hideAlert,
      closeOnTouchOutside: hideAlert,
      onClose: hideAlert,
      heading1: 'heading',
      text: 'text',
    };
    dispatch(
      actionCreators.showSinarmasAlert({
        ...modalOptions,
        heading1: language.QR_GPN_NOT_REGISTERED_QR,
        text: language.QR_GPN_NOT_REGISTERED_QR_TEXT,
      }),
    );
  };

  onGalleryQr = res => {
    const tlvLeng = result(res, 'data', {}).length;
    const {getInvoice, dispatch, isLogin, getInvoiceTcico} = this.props;
    const isGalery = true;
    saveQrData({});
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      dispatch(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'QRScannerLanding'}),
          ],
        }),
      );
    };

    const modalOptions = {
      button1: 'OK',
      onButton1Press: hideAlert,
      closeOnTouchOutside: hideAlert,
      onClose: hideAlert,
      heading1: 'heading',
      text: 'text',
    };

    let jsonData = parseTLV(result(res, 'data', {}));
    jsonData = JSON.parse(jsonData);
    const tag08 = result(jsonData, '62.08', '');
    const isQrTcico = tag08 === 'DMCT' || tag08 === 'BOOK';
    if (isQrTcico) {
      return getInvoiceTcico(res); // ke qr tcico
    } else if (tag08 === 'CDPT' || tag08 === 'CWDL') {
      dispatch(
        actionCreators.showSinarmasAlert({
          ...modalOptions,
          heading1: language.QR_GPN_NOT_REGISTERED_QR,
          text: language.QR_GPN_NOT_REGISTERED_QR_TEXT,
        }),
      );
    } else {
      if (tlvLeng > 0 && tlvLeng !== '' && isLogin) {
        const is63 = result(res, 'data', {}).substring(
          tlvLeng - 8,
          tlvLeng - 6,
        );
        if (is63 === '63' && !isQrTcico) {
          // const billCode = 'QR-1';
          // const os = Platform.OS;
          // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
          return getInvoice(res, isGalery); // ke scann payment
        } else {
          dispatch(
            actionCreators.showSinarmasAlert({
              ...modalOptions,
              heading1: language.QR_GPN_NOT_REGISTERED_QR,
              text: language.QR_GPN_NOT_REGISTERED_QR_TEXT,
            }),
          );
        }
      } else if (tlvLeng > 0 && tlvLeng !== '' && !isLogin) {
        const is63 = result(res, 'data', {}).substring(
          tlvLeng - 8,
          tlvLeng - 6,
        );
        if (is63 === '63' && !isQrTcico) {
          return getInvoice(res, isGalery); // ke scann payment
        } else {
          dispatch(
            actionCreators.showSinarmasAlert({
              ...modalOptions,
              heading1: language.QR_GPN_NOT_REGISTERED_QR,
              text: language.QR_GPN_NOT_REGISTERED_QR_TEXT,
            }),
          );
        }
      }
    }
  };

  onScan = res => {
    const tlvLeng = result(res, 'data', {}).length;
    const {getInvoice, dispatch, isLogin, getInvoiceTcico, hideQRTTS} =
      this.props;
    saveQrData({});
    let jsonData = parseTLVTcico(result(res, 'data', ''));
    jsonData = JSON.parse(jsonData);
    const tag08 = result(jsonData, '62.08', '');
    const isQrTcico = tag08 === 'DMCT' || tag08 === 'BOOK' || tag08 === 'CWDL';
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const disableQRTTS = hideQRTTS === 'YES';
    const modalOptions = {
      button1: 'OK',
      onButton1Press: hideAlert,
      closeOnTouchOutside: true,
      onClose: hideAlert,
      heading1: 'heading',
      text: 'text',
    };
    if (isQrTcico) {
      if (disableQRTTS) {
        dispatch(
          actionCreators.showSinarmasAlert({
            ...modalOptions,
            heading1: language.QR_GPN_NOT_REGISTERED_QR,
            text: language.QR_GPN_NOT_REGISTERED_QR_TEXT,
          }),
        );
      } else {
        return getInvoiceTcico(res); // ke qr tcico
      }
    } else if (tag08 === 'CDPT') {
      dispatch(
        actionCreators.showSinarmasAlert({
          ...modalOptions,
          heading1: language.QR_GPN_NOT_REGISTERED_QR,
          text: language.QR_GPN_NOT_REGISTERED_QR_TEXT,
        }),
      );
    } else {
      if (tlvLeng > 0 && tlvLeng !== '' && isLogin) {
        const is63 = result(res, 'data', {}).substring(
          tlvLeng - 8,
          tlvLeng - 6,
        );
        if (is63 === '63' && !isQrTcico) {
          // const billCode = 'QR-1';
          // const os = Platform.OS;
          // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
          return getInvoice(res); // ke scann payment
        } else {
          dispatch(
            actionCreators.showSinarmasAlert({
              ...modalOptions,
              heading1: language.QR_GPN_NOT_REGISTERED_QR,
              text: language.QR_GPN_NOT_REGISTERED_QR_TEXT,
            }),
          );
        }
      } else if (tlvLeng > 0 && tlvLeng !== '' && !isLogin) {
        const is63 = result(res, 'data', {}).substring(
          tlvLeng - 8,
          tlvLeng - 6,
        );
        if (is63 === '63' && !isQrTcico) {
          return getInvoice(res); // ke scann payment
        } else {
          dispatch(
            actionCreators.showSinarmasAlert({
              ...modalOptions,
              heading1: language.QR_GPN_NOT_REGISTERED_QR,
              text: language.QR_GPN_NOT_REGISTERED_QR_TEXT,
            }),
          );
        }
      }
    }
  };

  onCodePressed = () => {
    const {changeAccount, savingAccounts, navigation, dataNewQR, showQR} =
      this.props;
    const isNewQR = result(dataNewQR, 'dataNewQR', false);
    const accNumber =
      isNewQR === true
        ? result(dataNewQR, 'dataQR', {})
        : result(navigation, 'state.params.dataQR', {});
    const acc = isEmpty(accNumber) ? savingAccounts[0] : accNumber;
    const displayFirst =
      result(acc, 'accountNumber', '--') +
      ' • ' +
      result(acc, 'productType', '--') +
      ' • ' +
      result(acc, 'name', '--');
    changeAccount({...acc, display: displayFirst});
    showQR();
  };

  showPopupQR = () => {
    const {dispatch, dataNewQR} = this.props;
    const data = result(dataNewQR, 'data', '');

    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const modalOptions = {
      onButton1Press: hideAlert,
      onClose: hideAlert,
      valueQR: data,
      showLoading: this.state.showLoading,
    };
    dispatch(
      actionCreators.showSinarmasAlert({...modalOptions, image: 'QR_CPM'}),
    );
  };

  goBack = () => {
    const {backQr} = this.props;
    backQr();
  };

  componentDidMount() {
    const {isLogin, getDefaultAccount, bankList} = this.props;
    this.props.destroyForm();
    if (!isLogin) {
      getDefaultAccount();
      if (isEmpty(bankList)) {
        this.props.getCacheBankList();
      }
    }
  }

  componentWillUnmount = () => {
    BackgroundTimer.clearInterval(this.interval);
  };

  gotoQrShow = () => {
    const {goToShowQr, formValues, dataNewQR} = this.props;
    const countGenerated = result(dataNewQR, 'addGeneartedTotal', 0);
    const addGeneartedTotal = countGenerated + 1;
    const accountNumber = result(formValues, 'accountNo.accountNumber', '');
    const accId = result(formValues, 'accountNo.id', '');
    const name = result(formValues, 'accountNo.name', '');
    const productType = result(formValues, 'accountNo.productType', '');
    const isNewQR = true;
    const data = {
      accountNumber,
      accId,
      name,
      productType,
      isNewQR,
      addGeneartedTotal,
    };
    goToShowQr(data);
  };

  goToshowQRTcico = type => {
    const {showQRTcico, tagQrTTS, formValues} = this.props;
    const isFromMenu = true;
    showQRTcico(tagQrTTS, formValues, isFromMenu, type);
  };

  render() {
    const {
      navigation = {},
      formValues = {},
      savingAccounts = [],
      dataNewQR,
      isVisible,
      isLogin,
      scannerState,
      clearScannerState,
      setScannerState,
      nav,
      clearCPM,
      clearCPMandValues,
      clearGenerated,
      changeAccount,
      goToExistingQRCPM,
      tagQrTTS,
      hideQRTTS,
    } = this.props;
    const {onScan, onCode, secondsRemaining} = this.state;
    const availableBalance = getUnformattedAccountAmount(formValues.accountNo);
    const isNewQR = result(dataNewQR, 'isNewQR', false);
    const isGenerated = result(dataNewQR, 'isGenerated', false);
    const data =
      isNewQR === true
        ? result(dataNewQR, 'data', '')
        : result(navigation, 'state.params.data', {});
    const filteredAcc = getAllAccountsExcept(savingAccounts);
    return (
      <DecoratedTdForm
        navigation={navigation}
        savingAccounts={filteredAcc}
        availableBalance={availableBalance}
        updateQRVal={this.updateQRVal}
        thisState={this.state}
        formValues={formValues}
        showPopupQR={this.showPopupQR}
        data={data}
        isNewQR={isNewQR}
        isVisible={isVisible}
        goBack={this.goBack}
        onScanQr={this.onScan}
        onGalleryQr={this.onGalleryQr}
        onScan={onScan}
        onCode={onCode}
        onCodePressed={this.onCodePressed}
        secondsRemaining={secondsRemaining}
        dataNewQR={dataNewQR}
        nav={nav}
        isGenerated={isGenerated}
        clearCPMandValues={clearCPMandValues}
        isLogin={isLogin}
        toQrShow={this.gotoQrShow}
        errGallery={this.showErrorGallery}
        scannerState={scannerState}
        clearScannerState={clearScannerState}
        setScannerState={setScannerState}
        clearCPM={clearCPM}
        clearGenerated={clearGenerated}
        changeAccount={changeAccount}
        goToExistingQRCPM={goToExistingQRCPM}
        tagQrTTS={tagQrTTS}
        showQRTcico={this.goToshowQRTcico}
        hideQRTTS={hideQRTTS}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLogin: !isEmpty(result(state, 'user', {})),
  nav: result(state, 'nav'),
  accounts: result(state, 'accounts', []),
  formValues: result(state, 'form.MyQRForm.values', {}),
  accNo: result(state, 'form.MyQRForm.values.accountNo.accountNumber', {}),
  savingAccounts: getTransferPossibleAccountsNoEmoney(
    result(state, 'accounts', []),
    'ft',
  ),
  dataNewQR: result(state, 'generateCodeTag', {}),
  isVisible: result(state, 'usernameAvailability.isVisible', {}),
  scannerState: result(state, 'scannerState', false),
  tagQrTTS: result(state, 'generateQRTTSTag', {}),
  bankList: result(state, 'valueBankList.bankList', {}),
  hideQRTTS: result(state, 'config.hideQRTTS', 'YES'),
});

const mapDispatchToProps = dispatch => ({
  backQr: () => dispatch(NavigationActions.back()),
  changeAccount: acc => {
    dispatch(change('MyQRForm', 'accountNo', acc));
  },
  getInvoice: (res, isGalery) => dispatch(invoiceGPN(res, isGalery)),
  getInvoiceTcico: res => dispatch(invoiceTcico(res)),
  getInvoiceDIMO: res => dispatch(getInvoiceDetail(res)),
  showQR: () => dispatch(goToShowQR()),
  goToShowQr: data => {
    dispatch(goToShowQR(data));
  },
  gotoGenerate: () => dispatch(getGenerateCode()),
  inputAmount: res =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'QRInputAmount',
        params: {qrData: result(res, 'data', {})},
      }),
    ),
  destroyForm: () => {
    dispatch(destroy('QRInputAmount'));
  },
  dispatch: res => dispatch(res),
  getDefaultAccount: () => dispatch(getDefaultAccount()),
  clearScannerState: () => dispatch(actionCreators.saveScannerState(false)),
  setScannerState: () => dispatch(actionCreators.saveScannerState(true)),
  clearCPM: () =>
    dispatch(
      actionCreators.saveQRTag63({
        data: [],
        dataQR: [],
        isNewQR: [],
        isGenerated: true,
      }),
    ),
  clearGenerated: (data, dataQR, isNewQR, generated, countGenerated) =>
    dispatch(
      actionCreators.saveQRTag63({
        data: data,
        dataQR: dataQR,
        isNewQR: isNewQR,
        isGenerated: generated,
        addGeneartedTotal: countGenerated,
      }),
    ),

  clearCPMandValues: () => {
    dispatch(actionCreators.clearQRTag63());
    dispatch(destroy('MyQRForm'));
  },
  goToExistingQRCPM: time => {
    dispatch(
      NavigationActions.navigate({routeName: 'MyQRScreen', params: {time}}),
    );
  },
  showQRTcico: (tagQrTTS, values, isFromMenu, type) =>
    dispatch(goToShowQRTcico(tagQrTTS, values, isFromMenu, type)),
  getCacheBankList: () => {
    dispatch(getCacheBankList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(QRScanner);
