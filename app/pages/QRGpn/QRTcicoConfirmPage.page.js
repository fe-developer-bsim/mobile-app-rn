import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import QRTcicoConfirmPage from '../../components/QRGpn/QRTcicoConfirmPage.component';
import {reduxForm, change} from 'redux-form';
import {qrTransfer, qrCashoutTransfer, triggerAuthQR} from '../../state/thunks/QRGpn.thunks';
import result from 'lodash/result';
import {triggerAuthNavigate, couponCustomer, removeCoupon, getSimasPoinLogin, getTransRefNumAndOTPNavigate} from '../../state/thunks/common.thunks';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';
import isEmpty from 'lodash/isEmpty';
// import firebase from 'react-native-firebase';
// import {Platform} from 'react-native';
// let Analytics = firebase.analytics();

const formConfig = {
  form: 'QRconfirm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {confirmInvoice, navigation, triggerAuth, shouldSendSmsOtp, isLogin}) => {
    const isOwnAccount = false;
    const navParams = result(navigation, 'state.params', {});
    const getAmount = result(navParams, 'data.amountVal', '');
    const amount = isEmpty(getAmount) ? result(navParams, 'jsonDt.54', '') : getAmount;
    const isCashout = result(navParams, 'jsonDt.62.08', '') === 'CWDL';
    const payee = result(navParams, 'selectedPayee', {});
    const merchantName = result(navParams, 'jsonDt.59', '');
    const params = {onSubmit: confirmInvoice, amount: amount, isOtp: payee.isNewPayee};
    const triggerAuthData = {amount, params};
    if (!isLogin) {
      if (shouldSendSmsOtp === false) {
        if (payee.isNewPayee === true) {
          dispatch(getSimasPoinLogin(params));
        } else {
          isCashout ? dispatch(triggerAuthQR(amount, triggerAuthData, false, merchantName)) 
            : triggerAuth(amount, payee.isNewPayee, isOwnAccount, 'Auth', params, true);
          

        }
      } else {
        dispatch(getSimasPoinLogin(params));
      }
    } else {
      isCashout ? dispatch(triggerAuthQR(amount, triggerAuthData, false, merchantName)) 
        : triggerAuth(amount, false, isOwnAccount, 'Auth', params, true);
    }
  }

};

const FormInvoiceQR = reduxForm(formConfig)(QRTcicoConfirmPage);

class QRInvoiceConfirm extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    confirmData: PropTypes.func,
    triggerAuth: PropTypes.func,
    setTipAmount: PropTypes.func,
    setAmount: PropTypes.func,
    resetManualTip: PropTypes.func,
    tipManualChange: PropTypes.func,
    tipEnabled: PropTypes.bool,
    accounts: PropTypes.array,
    amountVal: PropTypes.string,
    formValues: PropTypes.object,
    checkCoupon: PropTypes.func,
    removeCoupon: PropTypes.func,
    couponUse: PropTypes.string,
    timeStartCoupon: PropTypes.string,
    dateEndCoupon: PropTypes.string,
    dateStartCoupon: PropTypes.string,
    timeEndCoupon: PropTypes.string,
    gapTimeServer: PropTypes.number,
    state: PropTypes.object,
    defaultAccount: PropTypes.object,
    isLogin: PropTypes.bool,
    merchantName: PropTypes.object,
    payeeList: PropTypes.array,
    payQrCashout: PropTypes.func
  };

  state = {
    inputTipDisabled: true,
    voucherDescription: '',
    selectedCoupon: 1
  }

  componentWillReceiveProps (newProps) {
    this.setState({voucherDescription: result(newProps, 'couponUse', '')});
  }

  componentDidMount () {
    const {setAmount, navigation} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const valAmount = result(navigation, 'state.params.data.54', '');
    const amountValues = result(navParams, 'values.amountVal', '');
    const amount = isEmpty(valAmount) ? amountValues : valAmount;
    const isCashout = result(navParams, 'isCashout', false);
    parseInt(valAmount) > 0 || parseInt(amountValues)  > 0 ? setAmount(amount, isCashout) : null;
  }

  componentWillMount () {
    const {couponUse} = this.props;
    this.setState({voucherDescription: couponUse});
    // const billCode = 'QR-3';
    // const os = Platform.OS;
    // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
  }

  confirmInvoice = () => {
    const {navigation, confirmData, payQrCashout, defaultAccount, isLogin} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const data = {...navParams};
    const isBillPay = !isLogin;
    const isCashout = result(navParams, 'jsonDt.62.08', '') === 'CWDL';
    
    isCashout ? payQrCashout(data, defaultAccount, isBillPay) : confirmData(data, defaultAccount, isBillPay);
  }

  checkTipAmount = (tipAmount) => {
    if ((result(tipAmount, 'value', '') === 'manual') || (result(tipAmount, 'value', '') === 'persen')) {
      this.setState({inputTipDisabled: false});
    } else {
      this.setState({inputTipDisabled: true});
      this.props.resetManualTip();
    }
  }

  render () {
    const {navigation = {}, accounts, formValues, state, confirmData, payQrCashout, resetManualTip, setAmount, setTipAmount, removeCoupon, triggerAuth,
      timeEndCoupon,  timeStartCoupon, dateEndCoupon, dateStartCoupon, gapTimeServer, checkCoupon, defaultAccount, merchantName, isLogin} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const shouldSendSmsOtp = result(navigation, 'state.params.shouldSendSmsOtp', false);
    return <FormInvoiceQR accounts={accounts} confirmData={confirmData} payQrCashout={payQrCashout} state={state} resetManualTip={resetManualTip} setAmount={setAmount} setTipAmount={setTipAmount} formValues={formValues} inputTipDisabled={this.state.inputTipDisabled} triggerAuth={triggerAuth} checkTipAmount={this.checkTipAmount} navParams={navParams} navigation={navigation} confirmInvoice={this.confirmInvoice} removeCoupon={removeCoupon} timeEndCoupon={timeEndCoupon} gapTimeServer={gapTimeServer} couponUse={this.state.voucherDescription} goToCoupon={this.goToCoupon}
      timeStartCoupon={timeStartCoupon} dateEndCoupon={dateEndCoupon} dateStartCoupon={dateStartCoupon} checkCoupon={checkCoupon} defaultAccount={defaultAccount} merchantName={merchantName} isLogin={isLogin} shouldSendSmsOtp={shouldSendSmsOtp} />;
  }
}

const mapStateToProps = (state) => ({
  payeeList: result(state, 'payees', []),
  amountVal: result(state, 'form.QRInvoiceForm.values.amountVal', ''),
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.QRInvoiceForm.values', {}),
  couponUse: result(state, 'couponCheck.description', ''),
  timeEndCoupon: result(state, 'couponCheck.endTimeMod', ''),
  timeStartCoupon: result(state, 'couponCheck.startTimeMod', ''),
  dateEndCoupon: result(state, 'couponCheck.subendDate', ''),
  dateStartCoupon: result(state, 'couponCheck.subnewDate', ''),
  usingFromLine: result(state, 'couponCheck.usingFromLine', '0'),
  minAmount: result(state, 'couponCheck.minAmount', 0),
  maxAmount: result(state, 'couponCheck.maxAmount', 0),
  gapTimeServer: result(state, 'gapTimeServer', 0),
  currency: result(state, 'couponCheck.currency', 'simaspoin'),
  defaultAccount: result(state, 'defaultAccount', {}),
  isLogin: !isEmpty(result(state, 'user', {})),
  state
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, isNewPayee = false, isOwnAccount = false, routeName, params) => {
    if (isNewPayee) {
      return dispatch(getTransRefNumAndOTPNavigate('transfer', true, routeName, params, isOwnAccount));
    }
    return dispatch(triggerAuthNavigate('transfer', amount, isOwnAccount, routeName, params));
  },
  setAmount: (amountVal) => {
    dispatch(change('QRInvoiceForm', 'amountVal', amountVal));
  },
  confirmData: (data, defaultAccount, isBillPay) => dispatch(qrTransfer(data, defaultAccount, isBillPay)),
  payQrCashout: (data, defaultAccount, isBillPay) => dispatch(qrCashoutTransfer(data, defaultAccount, isBillPay)),
  checkCoupon: (amountVal, billerCode) => dispatch(couponCustomer(amountVal, billerCode)),
  removeCoupon: () => dispatch(removeCoupon())
});

const connectedQRInvoice = connect(mapStateToProps, mapDispatchToProps)(QRInvoiceConfirm);
export default connectedQRInvoice;
