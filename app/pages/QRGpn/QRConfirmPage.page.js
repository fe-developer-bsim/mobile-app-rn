import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import QRConfirmPage from '../../components/QRGpn/QRConfirmPage.component';
import {reduxForm, change} from 'redux-form';
import {QRPay, triggerAuthQR, QRPayCrossBorder, checkValidityCouponQR} from '../../state/thunks/QRGpn.thunks';
import result from 'lodash/result';
import {triggerAuthNavigate, couponCustomer, removeCoupon} from '../../state/thunks/common.thunks';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';
import isEmpty from 'lodash/isEmpty';
// import indexOf from 'lodash/indexOf';
import {Toast} from '../../utils/RNHelpers.util.js';
import {language} from '../../config/language';

// import {Platform} from 'react-native';

const formConfig = {
  form: 'QRconfirm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {amountVal, confirmInvoice, isSyariah, isLogin, navParams, navigation, couponCheck}) => {
    const feeVal = result(values, 'tipAmountManual', '') > 0 ? result(values, 'tipAmountManual', '') : result(values, 'tipAmount.value', '');
    const amount = parseInt(amountVal + feeVal);
    const currentAmount = amount;
    const params = {onSubmit: confirmInvoice, amount: amount, isOtp: false};
    const triggerAuthData = {amount, params};
    const merchantName = result(navParams, 'jsonDt.59', '') === '' ? 'QrCrossBorderPayment' : result(navParams, 'jsonDt.59', '');
    // const checkingCIF = result(state, 'checkingCIFbeforeLogin', false);
    // const limitBeforeLogin = result(state, 'config.limitConfigAutoDebetAccount', '');
    // const searchIndexComma = indexOf(limitBeforeLogin, ',');
    // const setLimitCIF = checkingCIF ? limitBeforeLogin.substring(0, searchIndexComma) : limitBeforeLogin.substring(searchIndexComma + 1, limitBeforeLogin.length);
    // const allAmount = amount;
    const availableBalance = result(navParams, 'data.accountNo.balances', '0');
    const isEmptyBalance = typeof availableBalance !== 'number';
    const qrCBequivalentAmount = result(navParams, 'resulData.convertedAmountIDR', '');
    const convertedAmount = Number(qrCBequivalentAmount.substring(0, qrCBequivalentAmount.length - 2));
    const isCrossBorderLimit = convertedAmount > availableBalance;
    if (isCrossBorderLimit && !isEmptyBalance) {
      Toast.show(language.SAVING__ACCOUNT_NOT_ENOUGH_BALANCE, Toast.LONG);
    } else {
      if (isLogin) {
        const afterCheckCouponFunction = () => {
          dispatch(triggerAuthQR(currentAmount, triggerAuthData, isSyariah, merchantName));
        };
        const amountVal = String(result(navigation, 'state.params.data.amountVal', '0'));
        const accountIdCoupon = result(navigation, 'state.params.data.accountNo.id', '');
        const billerCode = '123456';
        if (!isEmpty(couponCheck)) {
          dispatch(checkValidityCouponQR(amountVal, isLogin, billerCode, accountIdCoupon, afterCheckCouponFunction));
        } else {
          dispatch(triggerAuthQR(currentAmount, triggerAuthData, isSyariah, merchantName));
        }
      } else {
        const afterCheckCouponFunction = () => {
          dispatch(triggerAuthQR(currentAmount, triggerAuthData, isSyariah, merchantName));
        };
        const amountVal = String(result(navigation, 'state.params.data.amountVal', '0'));
        const accountIdCoupon = result(navigation, 'state.params.data.accountNo.id', '');
        const billerCode = '123456';
        if (!isEmpty(couponCheck)) {
          dispatch(checkValidityCouponQR(amountVal, isLogin, billerCode, accountIdCoupon, afterCheckCouponFunction));
        } else {
          dispatch(triggerAuthQR(currentAmount, triggerAuthData, isSyariah, merchantName));
        }
      }
    }

    // if (Number(setLimitCIF) < Number(allAmount) && !isLogin) {
    //   Toast.show(language.SET_AUTODEBIT_EXCEED_LIMIT, Toast.LONG);
    // } else {
    //   if (isLogin) {
    //     const afterCheckCouponFunction = () => {
    //       dispatch(
    //         triggerAuthQR(
    //           currentAmount,
    //           triggerAuthData,
    //           isSyariah,
    //           merchantName
    //         )
    //       );
    //     };
    //     const amountVal = String(
    //       result(navigation, 'state.params.data.amountVal', '0')
    //     );
    //     const accountIdCoupon = result(
    //       navigation,
    //       'state.params.data.accountNo.id',
    //       ''
    //     );
    //     const billerCode = '123456';
    //     if (!isEmpty(couponCheck)) {
    //       dispatch(
    //         checkValidityCouponQR(
    //           amountVal,
    //           isLogin,
    //           billerCode,
    //           accountIdCoupon,
    //           afterCheckCouponFunction
    //         )
    //       );
    //     } else {
    //       dispatch(
    //         triggerAuthQR(
    //           currentAmount,
    //           triggerAuthData,
    //           isSyariah,
    //           merchantName
    //         )
    //       );
    //     }
    //   } else {
    //     const afterCheckCouponFunction = () => {
    //       dispatch(
    //         triggerAuthQR(
    //           currentAmount,
    //           triggerAuthData,
    //           isSyariah,
    //           merchantName
    //         )
    //       );
    //     };
    //     const amountVal = String(
    //       result(navigation, 'state.params.data.amountVal', '0')
    //     );
    //     const accountIdCoupon = result(
    //       navigation,
    //       'state.params.data.accountNo.id',
    //       ''
    //     );
    //     const billerCode = '123456';
    //     if (!isEmpty(couponCheck)) {
    //       dispatch(
    //         checkValidityCouponQR(
    //           amountVal,
    //           isLogin,
    //           billerCode,
    //           accountIdCoupon,
    //           afterCheckCouponFunction
    //         )
    //       );
    //     } else {
    //       dispatch(
    //         triggerAuthQR(
    //           currentAmount,
    //           triggerAuthData,
    //           isSyariah,
    //           merchantName
    //         )
    //       );
    //     }
    //   }
    // }
  }
};

const FormInvoiceQR = reduxForm(formConfig)(QRConfirmPage);

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
    confirmDataCrossBorder: PropTypes.func,
    couponCheck: PropTypes.object,
    currency: PropTypes.string
  };

  state = {
    inputTipDisabled: true,
    voucherDescription: '',
    selectedCoupon: 1
  };

  componentWillReceiveProps (newProps) {
    this.setState({voucherDescription: result(newProps, 'couponUse', '')});
  }

  componentDidMount () {
    const {setTipAmount, setAmount, navigation} = this.props;
    const valAmount = result(navigation, 'state.params.data.54', '');
    setTipAmount({value: 0, label: '0'});
    valAmount > 0 ? setAmount(valAmount) : null;
  }

  componentWillMount () {
    const {couponUse} = this.props;
    this.setState({voucherDescription: couponUse});
    // const billCode = 'QR-3';
    // const os = Platform.OS;
    // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
  }

  confirmInvoice = () => {
    const {navigation, confirmData, confirmDataCrossBorder, defaultAccount, isLogin} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const data = {defaultAccount, ...navParams};
    const isBillPay = !isLogin;
    const merchantName = result(navParams, 'jsonDt.59', '');
    const isCrossBorder = result(navParams, 'isCrossBorder', false);
    isCrossBorder ? confirmDataCrossBorder(data, defaultAccount, merchantName, isBillPay) :
      confirmData(data, defaultAccount, merchantName, isBillPay);
  };

  checkTipAmount = (tipAmount) => {
    if (result(tipAmount, 'value', '') === 'manual' || result(tipAmount, 'value', '') === 'persen') {
      this.setState({inputTipDisabled: false});
    } else {
      this.setState({inputTipDisabled: true});
      this.props.resetManualTip();
    }
  };

  render () {
    const {navigation = {}, accounts, formValues, state, confirmData, resetManualTip, setAmount, setTipAmount, removeCoupon, timeEndCoupon, amountVal,
      timeStartCoupon, dateEndCoupon, dateStartCoupon, gapTimeServer, checkCoupon, defaultAccount, merchantName, isLogin, couponCheck, currency} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const {triggerAuth} = this.props;

    return (
      <FormInvoiceQR accounts={accounts} confirmData={confirmData} state={state} resetManualTip={resetManualTip} setAmount={setAmount} setTipAmount={setTipAmount} 
        formValues={formValues} inputTipDisabled={this.state.inputTipDisabled} triggerAuth={triggerAuth} checkTipAmount={this.checkTipAmount} navParams={navParams} 
        navigation={navigation} confirmInvoice={this.confirmInvoice} removeCoupon={removeCoupon} timeEndCoupon={timeEndCoupon} gapTimeServer={gapTimeServer} 
        couponUse={this.state.voucherDescription} goToCoupon={this.goToCoupon} timeStartCoupon={timeStartCoupon} dateEndCoupon={dateEndCoupon} dateStartCoupon={dateStartCoupon} 
        checkCoupon={checkCoupon} defaultAccount={defaultAccount} merchantName={merchantName} isLogin={isLogin} couponCheck={couponCheck} currency={currency} amountVal={amountVal}/>
    );
  }
}

const mapStateToProps = (state) => ({
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
  state,
  couponCheck: result(state, 'couponCheck', {})
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, params) => {
    dispatch(
      triggerAuthNavigate('qrGPNPayment', amount, true, 'AuthDashboard', params)
    );
  },
  setTipAmount: (tipAmount) => {
    dispatch(change('QRInvoiceForm', 'tipAmount', tipAmount));
  },
  setAmount: (amountVal) => {
    dispatch(change('QRInvoiceForm', 'amountVal', amountVal));
  },
  resetManualTip: () => {
    dispatch(change('QRInvoiceForm', 'tipAmountManual', ''));
  },
  confirmData: (data, merchantName, defaultAccount, isBillPay) => dispatch(QRPay(data, defaultAccount, merchantName, isBillPay)),
  confirmDataCrossBorder: (data, merchantName, defaultAccount, isBillPay) => dispatch(QRPayCrossBorder(data, defaultAccount, merchantName, isBillPay)),
  checkCoupon: (amountVal, billerCode, accountId) => dispatch(couponCustomer(amountVal, billerCode, accountId)),
  removeCoupon: () => dispatch(removeCoupon())
});

const connectedQRInvoice = connect(mapStateToProps, mapDispatchToProps)(QRInvoiceConfirm);
export default connectedQRInvoice;
