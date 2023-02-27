import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import QRInvoice from '../../components/QRGpn/QRInvoice.component';
import {reduxForm, change} from 'redux-form';
import {QRInvoiceConfirm, inquiryGPN, inquiryQrisCB} from '../../state/thunks/QRGpn.thunks';
import {result, isEmpty, forEach, toLower} from 'lodash';
import {triggerAuthNavigate, moreInfoBL, checkSyariahAccount} from '../../state/thunks/common.thunks';
import {getTransferPossibleAccounts, getTransferPossibleAccountsWithCC, getBankName, chewTag, generateAccountLabel, getTransferPossibleAccountsNoEmoney} from '../../utils/transformer.util';
import {validateRequiredFields} from '../../utils/validator.util';
import {silentLoginBillpay} from '../../state/thunks/genericBill.thunks';
// import firebase from 'react-native-firebase';
// import {Platform} from 'react-native';
// let Analytics = firebase.analytics();

const formConfig = {
  form: 'QRInvoiceForm',
  destroyOnUnmount: false,
  initialValues: {
    amountVal: '',
  },
  validate: (values) => {
    let errors = {
      ...validateRequiredFields(values, ['accountNo']),
    };
    return {
      ...errors
    };
  },
  onSubmit: (values, dispatch, props) => {
    const {navigation, thisData, defaultAccount, isLogin, isCrossBorder} = props;
    const qrData = (thisData ? thisData : '') + result(navigation, 'state.params.qrData', '');
    const jsonDt = chewTag(qrData);
    const qrInvoiceFunc = () => {
      isCrossBorder ? dispatch(inquiryQrisCB(values, jsonDt, qrData)) :  dispatch(QRInvoiceConfirm(values, jsonDt, defaultAccount));
    };
    if (isLogin) {
      isCrossBorder ? dispatch(inquiryQrisCB(values, jsonDt, qrData)) : dispatch(QRInvoiceConfirm(values, jsonDt, defaultAccount));
    } else {
      dispatch(silentLoginBillpay(qrInvoiceFunc));
    }
  },
};

const FormInvoiceQR = reduxForm(formConfig)(QRInvoice);

class QRInvoicePage extends Component {
  static propTypes = {
    QRInvoice: PropTypes.object,
    navigation: PropTypes.object,
    triggerAuth: PropTypes.func,
    setAmount: PropTypes.func,
    tipEnabled: PropTypes.bool,
    accounts: PropTypes.array,
    accountsNoEmoney: PropTypes.array,
    amountVal: PropTypes.string,
    formValues: PropTypes.object,
    setTip: PropTypes.func,
    changeBank: PropTypes.func,
    inquiryGpnTag: PropTypes.func,
    dtQrGpn: PropTypes.object,
    inquiryQR: PropTypes.string,
    bankSelected: PropTypes.func,
    isLogin: PropTypes.bool,
    setDefaultAccount: PropTypes.func,
    defaultAccount: PropTypes.object,
    getDefaultAccount: PropTypes.func,
    userMobileNumber: PropTypes.string,
    moreInfoBL: PropTypes.func,
    isAutoSwitchToogle: PropTypes.bool,
    switchAccountToogleBE: PropTypes.bool,
    inquiryCrossBorder: PropTypes.func,
    checkSyaAcc: PropTypes.func,
    enableCCsof: PropTypes.string,
    accountsCC: PropTypes.array,
    enableQrCCsof: PropTypes.string,
  };

  state = {
    inputTipDisabled: false,
    selectedCoupon: 0,
    inquiryData: {},
    data: ''
  }

  componentDidMount () {
    const {setAmount, navigation, setTip, changeBank, inquiryGpnTag, dtQrGpn, isLogin, defaultAccount, setDefaultAccount, isAutoSwitchToogle, switchAccountToogleBE} = this.props;
    const dtPayload = dtQrGpn;
    let defaultBankBsim = [];
    forEach(dtPayload, (value) => {
      const isBsimCode = result(value, '01', '').substring(5, 8) === '153';
      if (isBsimCode) {
        defaultBankBsim = value;
      }
    });
    const valAmount = result(dtQrGpn, '54', '');
    const tipStat = result(dtQrGpn, '55', '');
    const defaultBank = result(dtQrGpn, '26', '');
    const defaultBankSelected = !isEmpty(defaultBankBsim) ? defaultBankBsim : defaultBank;
    const bankCode = result(defaultBankSelected, '01', '').substring(5, 8);
    const bankList = result(navigation, 'state.params.bankList', '');
    const isCrossBorder = result(navigation, 'state.params.isCrossBorder', false);
    const bankSelect = getBankName(bankList, bankCode);
    const tag51 = result(dtQrGpn, '51', '');
    const tipVal = (tipStat === '02') ? result(dtQrGpn, '56', '') : (tipStat === '03') ? (Number(valAmount) * Number(result(dtQrGpn, '57', ''))) / 100 : '';
    valAmount > 0 ? setAmount(valAmount) : '';
    setTip(tipVal);
    this.checkTipAmount(tipVal);
    const displayFirst = result(bankSelect, '0.bankName', '');
    changeBank({
      bankId: result(bankSelect, '0.bankCode', ''),
      bankName: result(bankSelect, '0.bankName', ''),
      val: !isEmpty(defaultBankBsim) ? result(defaultBankBsim, '01', '') : result(defaultBank, '01', ''),
      'display': displayFirst
    });
    if (!isLogin && isAutoSwitchToogle && switchAccountToogleBE) {
      setDefaultAccount(defaultAccount);
    }
    if (!isEmpty(tag51) || !isEmpty(defaultBank) && !isCrossBorder) {
      isEmpty(defaultBank) && !isCrossBorder ? inquiryGpnTag(this.setTag51, dtPayload) : null;
    }
    // if (isCrossBorder) {
    //   inquiryCrossBorder(dtPayload);
    // }
    // const billCode = 'QR-2';
    // const os = Platform.OS;
    // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
  }

  setTag51 = () => {
    const {changeBank, navigation, inquiryQR} = this.props;
    this.setState({inquiryData: chewTag(inquiryQR), data: inquiryQR});
    const tagChew = chewTag(inquiryQR);
    const defaultBank = result(tagChew, '26', {});
    const bankCode = result(defaultBank, '01', '').substring(5, 8);
    const bankList = result(navigation, 'state.params.bankList', '');
    const bankSelect = getBankName(bankList, bankCode);
    if (isEmpty(tagChew)) {
      changeBank({});
    } else {
      changeBank({
        bankId: result(bankSelect, '0.bankCode', ''),
        bankName: result(bankSelect, '0.bankName', ''),
        val: result(defaultBank, '01', '')
      });

    }
    return true;
  }

  checkTipAmount = (tipAmount) => {
    if (parseInt(tipAmount) > 0) {
      this.setState({inputTipDisabled: true});
    } else {
      this.setState({inputTipDisabled: false});
    }
  }


  render () {
    const {navigation = {}, accounts, accountsNoEmoney, formValues, QRInvoice, defaultAccount, getDefaultAccount, setDefaultAccount, isLogin, moreInfoBL, isAutoSwitchToogle, switchAccountToogleBE, checkSyaAcc,  enableCCsof, accountsCC, enableQrCCsof} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const isCrossBorder = result(navParams, 'isCrossBorder', false);
    const selectedAccount = isCrossBorder ? accountsNoEmoney : accounts;
    const {triggerAuth} = this.props;
    const tipEnabled = result(QRInvoice, 'content.tipEnabled', false);
    return <FormInvoiceQR accounts={selectedAccount} formValues={formValues}
      inputTipDisabled={this.state.inputTipDisabled} triggerAuth={triggerAuth}
      checkTipAmount={this.checkTipAmount} navParams={navParams} navigation={navigation} isCrossBorder={isCrossBorder} checkSyaAcc={checkSyaAcc} enableCCsof={enableCCsof} accountsCC={accountsCC}
      tipEnabled={tipEnabled} thisState={this.state.inquiryData} thisData={this.state.data} defaultAccount={defaultAccount} getDefaultAccount={getDefaultAccount} setDefaultAccount={setDefaultAccount}
      isLogin={isLogin} moreInfoBL={moreInfoBL} isAutoSwitchToogle={isAutoSwitchToogle} switchAccountToogleBE={switchAccountToogleBE} enableQrCCsof={enableQrCCsof}/>;
  }
}

const mapStateToProps = (state) => ({
  QRInvoice: result(state, 'QRInvoice', {}),
  accountsNoEmoney: getTransferPossibleAccountsNoEmoney(result(state, 'accounts', []), 'bp'),
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.QRInvoiceForm.values', {}),
  dtQrGpn: result(state, 'qrGpnIssuer.dataQrGpn', {}),
  inquiryQR: result(state, 'qrGpnIssuer.inquiryQR', ''),
  defaultAccount: result(state, 'defaultAccount', {}),
  isLogin: !isEmpty(result(state, 'user', {})),
  userMobileNumber: result(state, 'user.profile.mobileNumberMasking', ''),
  isAutoSwitchToogle: result(state, 'primaryToogleAccount', false),
  switchAccountToogleBE: toLower(result(state, 'config.flag.primaryToogleAccount', 'inactive')) === 'active',
  accountsCC: getTransferPossibleAccountsWithCC(result(state, 'accounts', []), 'bp'),
  enableCCsof: result(state, 'config.enableCCsof', ''),
  enableQrCCsof: result(state, 'config.enableQrCCsof', ''),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, params) => dispatch(triggerAuthNavigate('register-merchant', amount, true, 'AuthDashboard', params)),
  setAmount: (amountVal) => {
    dispatch(change('QRInvoiceForm', 'amountVal', amountVal));
  },
  setTip: (amountVal) => {
    dispatch(change('QRInvoiceForm', 'tipAmountManual', amountVal));
  },
  changeBank: (bankId) => {
    dispatch(change('QRInvoiceForm', 'bankAcc', bankId));
  },
  bankSelected: (accounts) => {
    const listAccounts = generateAccountLabel(accounts);
    const selectedAccounts = result(listAccounts, '0', {});
    dispatch(change('QRInvoiceForm', 'accountNo', selectedAccounts));
  },
  inquiryGpnTag: (setState, data) => dispatch(inquiryGPN(setState, data)),
  inquiryCrossBorder: (dtPayload) => dispatch(inquiryQrisCB(dtPayload)),
  setDefaultAccount: (defaultAccount) => {
    dispatch(change('QRInvoiceForm', 'accountNo', defaultAccount));
  },
  moreInfoBL: (data) => {
    dispatch(moreInfoBL(data));
  },
  checkSyaAcc: (acc) => {
    dispatch(checkSyariahAccount(acc));
  }
});

const connectedQRInvoice = connect(mapStateToProps, mapDispatchToProps)(QRInvoicePage);
export default connectedQRInvoice;
