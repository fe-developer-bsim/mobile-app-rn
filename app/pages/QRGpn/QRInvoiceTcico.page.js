import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import QRInvoice from '../../components/QRGpn/QRInvoiceTcico.component';
import {reduxForm, change} from 'redux-form';
import {QRTcicoInvoiceConfirm, inquiryGPN, QRCashoutInquiry} from '../../state/thunks/QRGpn.thunks';
import {result, isEmpty} from 'lodash';
import {triggerAuthNavigate, moreInfoBL} from '../../state/thunks/common.thunks';
import {getTransferPossibleAccountsNoEmoney, chewTag, generateAccountLabel, getAllAccountsExcept} from '../../utils/transformer.util';
import {validateRequiredFields} from '../../utils/validator.util';

const formConfig = {
  form: 'QRInvoiceForm',
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
    const {navigation, thisData, isCashout, payeeList, bankListData} = props;
    const qrData = (thisData ? thisData : '') + result(navigation, 'state.params.qrData', '');
    const jsonDt = chewTag(qrData);
    if (isCashout) {
      dispatch(QRCashoutInquiry(values, jsonDt, isCashout, qrData));
    } else {
      dispatch(QRTcicoInvoiceConfirm(values, jsonDt, isCashout, payeeList, qrData, bankListData));
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
    payeeList: PropTypes.array,
    bankListData: PropTypes.array,
    goToAddPayeeQr: PropTypes.func
  };

  state = {
    inputTipDisabled: false,
    selectedCoupon: 0,
    inquiryData: {},
    data: ''
  }

  componentDidMount () {
    const {setAmount, navigation} = this.props;
    const {setDefaultAccount, defaultAccount, isLogin} = this.props;
    !isLogin && setDefaultAccount(defaultAccount);
    const valAmount = result(navigation, 'state.params.data.54', '');
    const fixedAmount = (Number(valAmount)).toFixed(0);
    fixedAmount > 0 ? setAmount(fixedAmount) : '';
  }

  render () {
    const {navigation = {}, accounts, formValues, QRInvoice, defaultAccount, getDefaultAccount, isLogin, moreInfoBL, accountsTransfer, payeeList, bankListData} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const isCashout = result(navParams, 'data.62.08', '') === 'CWDL';
    const {triggerAuth} = this.props;
    const tipEnabled = result(QRInvoice, 'content.tipEnabled', false);
    const filteredAcc = getAllAccountsExcept(accounts);
    return <FormInvoiceQR accounts={filteredAcc} formValues={formValues} isCashout={isCashout}
      inputTipDisabled={this.state.inputTipDisabled} triggerAuth={triggerAuth}
      checkTipAmount={this.checkTipAmount} navParams={navParams} navigation={navigation} accountsTransfer={accountsTransfer} payeeList={payeeList} bankListData={bankListData}
      tipEnabled={tipEnabled} thisState={this.state.inquiryData} thisData={this.state.data} defaultAccount={defaultAccount} getDefaultAccount={getDefaultAccount} isLogin={isLogin} moreInfoBL={moreInfoBL}/>;
  }
}

const mapStateToProps = (state, props) => ({
  payeeList: result(state, 'payees', []),
  QRInvoice: result(state, 'QRInvoice', {}),
  accounts: getTransferPossibleAccountsNoEmoney(result(state, 'accounts', []), ''),
  formValues: result(state, 'form.QRInvoiceForm.values', {}),
  dtQrGpn: result(state, 'qrGpnIssuer.dataQrGpn', {}),
  inquiryQR: result(state, 'qrGpnIssuer.inquiryQR', ''),
  defaultAccount: result(state, 'defaultAccount', {}),
  isLogin: !isEmpty(result(state, 'user', {})),
  userMobileNumber: result(state, 'user.profile.mobileNumberMasking', ''),
  accountsTransfer: getTransferPossibleAccountsNoEmoney(result(state, 'accounts', []), 'ft', result(props, 'navigation.state.params.payee', {}), result(props, 'navigation.state.params.isValas', {})),
  bankListData: result(state, 'valueBankList.bankList', [])
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
  setDefaultAccount: (defaultAccount) => {
    dispatch(change('QRInvoiceForm', 'sourceAcc', defaultAccount)); 
  },
  moreInfoBL: (data) => {
    dispatch(moreInfoBL(data));
  },
});

const connectedQRInvoice = connect(mapStateToProps, mapDispatchToProps)(QRInvoicePage);
export default connectedQRInvoice;
