import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import QRInvoice from '../../components/QRGpn/QRInvoiceCashout.component';
import {reduxForm, change} from 'redux-form';
import {QRTcicoInvoiceConfirm, inquiryGPN} from '../../state/thunks/QRGpn.thunks';
import {result, isEmpty} from 'lodash';
import {triggerAuthNavigate, moreInfoBL} from '../../state/thunks/common.thunks';
import {getTransferPossibleAccounts, getBankName, chewTag, generateAccountLabel, getAllAccountsExcept} from '../../utils/transformer.util';
import {validateRequiredFields} from '../../utils/validator.util';
import {silentLoginBillpay} from '../../state/thunks/genericBill.thunks';
// import firebase from 'react-native-firebase';
// import {Platform} from 'react-native';
// let Analytics = firebase.analytics();

const formConfig = {
  form: 'QRInvoiceCashoutForm',
  destroyOnUnmount: false,
  initialValues: {
    amountVal: '',
  },
  validate: (values) => {
    let errors = {
      ...validateRequiredFields(values, ['amountVal', 'sourceAcc']),
    };
    return {
      ...errors
    };
  },
  onSubmit: (values, dispatch, props) => {
    const {navigation, thisData, defaultAccount, isLogin} = props;
    const qrData = (thisData ? thisData : '') + result(navigation, 'state.params.qrData', '');
    const jsonDt = chewTag(qrData);
    const qrInvoiceFunc = () => {
      dispatch(QRTcicoInvoiceConfirm(values, jsonDt, defaultAccount));
    };
    isLogin ?
      dispatch(QRTcicoInvoiceConfirm(values, jsonDt, defaultAccount))
      :
      dispatch(silentLoginBillpay(qrInvoiceFunc));
  },
};

const FormInvoiceQR = reduxForm(formConfig)(QRInvoice);

class QRInvoiceCashoutPage extends Component {
  static propTypes = {
    QRInvoice: PropTypes.object,
    navigation: PropTypes.object,
    triggerAuth: PropTypes.func,
    setAmount: PropTypes.func,
    tipEnabled: PropTypes.bool,
    accounts: PropTypes.array,
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
    accountsTransfer: PropTypes.array,
  };

  state = {
    inputTipDisabled: false,
    selectedCoupon: 0,
    inquiryData: {},
    data: ''
  }

  componentDidMount () {
    const {setAmount, navigation} = this.props;
    const valAmount = result(navigation, 'state.params.data.54', '');
    valAmount > 0 ? setAmount(valAmount) : '';
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
    const {navigation = {}, accounts, formValues, QRInvoice, defaultAccount, getDefaultAccount, setDefaultAccount, isLogin, moreInfoBL, accountsTransfer} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const filteredAcc = getAllAccountsExcept(accounts);
    const {triggerAuth} = this.props;
    const tipEnabled = result(QRInvoice, 'content.tipEnabled', false);
    return <FormInvoiceQR accounts={filteredAcc} formValues={formValues}
      inputTipDisabled={this.state.inputTipDisabled} triggerAuth={triggerAuth}
      checkTipAmount={this.checkTipAmount} navParams={navParams} navigation={navigation} accountsTransfer={accountsTransfer}
      tipEnabled={tipEnabled} thisState={this.state.inquiryData} thisData={this.state.data} defaultAccount={defaultAccount} getDefaultAccount={getDefaultAccount} setDefaultAccount={setDefaultAccount} isLogin={isLogin} moreInfoBL={moreInfoBL}/>;
  }
}

const mapStateToProps = (state, props) => ({
  QRInvoice: result(state, 'QRInvoice', {}),
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'ft'),
  formValues: result(state, 'form.QRInvoiceForm.values', {}),
  dtQrGpn: result(state, 'qrGpnIssuer.dataQrGpn', {}),
  inquiryQR: result(state, 'qrGpnIssuer.inquiryQR', ''),
  defaultAccount: result(state, 'defaultAccount', {}),
  isLogin: !isEmpty(result(state, 'user', {})),
  userMobileNumber: result(state, 'user.profile.mobileNumberMasking', ''),
  accountsTransfer: getTransferPossibleAccounts(result(state, 'accounts', []), 'ft', result(props, 'navigation.state.params.payee', {}), result(props, 'navigation.state.params.isValas', {})),
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
  // getDefaultAccount: () => dispatch(getDefaultAccount()),
  // setDefaultAccount: (defaultAccount) => {
  //   const accountNumber = result(defaultAccount, 'accountNumber', '');
  //   const accountName = result(defaultAccount, 'name', '');
  //   const selectedAccounts = accountNumber + '•' + accountName;
  //   dispatch(change('QRInvoiceForm', 'accountNo', selectedAccounts));
  // },
  moreInfoBL: (data) => {
    dispatch(moreInfoBL(data));
  },
});

const connectedQRInvoice = connect(mapStateToProps, mapDispatchToProps)(QRInvoiceCashoutPage);
export default connectedQRInvoice;
