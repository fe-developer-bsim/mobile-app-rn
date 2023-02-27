import React from 'react';
import PropTypes from 'prop-types';
import BillerTypeTwoConfirmation from '../../components/BillerTypeTwoJourney/BillerTypeTwoConfirmation.component';
import {payGenericBillTypeTwo, confirmGenericBillTypeTwo, triggerAuthBillpay, checkValidityCouponLogin, registerAutoDebit} from '../../state/thunks/genericBill.thunks';
import {triggerAuthNavigate, couponCustomer, removeCoupon, showFavorite, removeFavorite, saveAlias} from '../../state/thunks/common.thunks';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
// import indexOf from 'lodash/indexOf';
import {checkShariaAccount} from '../../utils/transformer.util';
import {Toast} from '../../utils/RNHelpers.util.js';
import {language} from '../../config/language';
// import firebase from 'react-native-firebase';
// import {Platform} from 'react-native';
import moment from 'moment';
// let Analytics = firebase.analytics();

const formConfig = {
  form: 'BillerTypeTwoConfirmationForm',
  onSubmit: (values, dispatch, {amount, payBill, currentAmount, navigation, confirmData, isLogin, isSyariah, couponCheck, autoDebitDate}) => {
    const params = {onSubmit: payBill, amount, isOtp: false};
    const triggerAuthData = {amount, params};
    const resDataTemp = result(navigation, 'state.params.resData', {});
    const confirmFunction = () => {
      dispatch(confirmGenericBillTypeTwo({...confirmData, resDataTemp, autoDebitDate}, true)).then(() => {
        dispatch(triggerAuthBillpay(currentAmount, triggerAuthData, isSyariah));
      });
    };
    // const checkingCIF = result(state, 'checkingCIFbeforeLogin', false);
    // const limitBeforeLogin = result(state, 'config.limitConfigAutoDebetAccount', '');
    // const searchIndexComma = indexOf(limitBeforeLogin, ',');
    // const setLimitCIF = checkingCIF ? limitBeforeLogin.substring(0, searchIndexComma) : limitBeforeLogin.substring(searchIndexComma + 1, limitBeforeLogin.length);
    // const allAmount = result(resDataTemp, 'amount', 0);
    if (isLogin) {
      const afterCheckCouponFunction = () => {
        dispatch(triggerAuthBillpay(currentAmount, triggerAuthData, isSyariah));
      };
      const biller = result(navigation, 'state.params.biller', {});
      const idAccountSelected = result(navigation, 'state.params.accountNo.id', ''); 
      const amount = result(navigation, 'state.params.resData.amountNumber', '0').toString();        
      if (!isEmpty(couponCheck)) {
        dispatch(checkValidityCouponLogin(amount, isLogin, biller, idAccountSelected, afterCheckCouponFunction));
      } else {
        dispatch(triggerAuthBillpay(currentAmount, triggerAuthData, isSyariah));
      }    
    } else {
      const afterCheckCouponFunction = () => {
        dispatch(confirmFunction);
      };
      const biller = result(navigation, 'state.params.biller', {});
      const idAccountSelected = result(navigation, 'state.params.accountNo.id', ''); 
      const amount = result(navigation, 'state.params.resData.amountNumber', '0').toString();        
      if (!isEmpty(couponCheck)) {
        dispatch(checkValidityCouponLogin(amount, isLogin, biller, idAccountSelected, afterCheckCouponFunction));
      } else {
        dispatch(confirmFunction);
      }    
    }
    // if (Number(setLimitCIF) < Number(allAmount) && !isLogin) {
    //   Toast.show(language.SET_AUTODEBIT_EXCEED_LIMIT, Toast.LONG);
    // } else {
    //   if (isLogin) {
    //     const afterCheckCouponFunction = () => {
    //       dispatch(triggerAuthBillpay(currentAmount, triggerAuthData, isSyariah));
    //     };
    //     const biller = result(navigation, 'state.params.biller', {});
    //     const idAccountSelected = result(navigation, 'state.params.accountNo.id', ''); 
    //     const amount = result(navigation, 'state.params.resData.amountNumber', '0').toString();        
    //     if (!isEmpty(couponCheck)) {
    //       dispatch(checkValidityCouponLogin(amount, isLogin, biller, idAccountSelected, afterCheckCouponFunction));
    //     } else {
    //       dispatch(triggerAuthBillpay(currentAmount, triggerAuthData, isSyariah));
    //     }    
    //   } else {
    //     const afterCheckCouponFunction = () => {
    //       dispatch(confirmFunction);
    //     };
    //     const biller = result(navigation, 'state.params.biller', {});
    //     const idAccountSelected = result(navigation, 'state.params.accountNo.id', ''); 
    //     const amount = result(navigation, 'state.params.resData.amountNumber', '0').toString();        
    //     if (!isEmpty(couponCheck)) {
    //       dispatch(checkValidityCouponLogin(amount, isLogin, biller, idAccountSelected, afterCheckCouponFunction));
    //     } else {
    //       dispatch(confirmFunction);
    //     }    
    //   }
    // }
  }
};

const ConnectedForm = reduxForm(formConfig)(BillerTypeTwoConfirmation);

class BillerTypeTwoConfirmationPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    triggerAuth: PropTypes.func,
    resendBillPayOTP: PropTypes.func,
    transRefNum: PropTypes.string,
    config: PropTypes.array,
    userId: PropTypes.number,
    payGenericBillTypeTwo: PropTypes.func,
    checkCoupon: PropTypes.func,
    removeCoupon: PropTypes.func,
    couponUse: PropTypes.string,
    state: PropTypes.object,
    timeEndCoupon: PropTypes.string,
    gapTimeServer: PropTypes.number,
    timeStartCoupon: PropTypes.string,
    dateEndCoupon: PropTypes.string,
    dateStartCoupon: PropTypes.string,
    usingFromLine: PropTypes.string,
    minAmount: PropTypes.number,
    maxAmount: PropTypes.number,
    showFavorite: PropTypes.func,
    favoriteBill: PropTypes.string,
    removeFavorite: PropTypes.func,
    billerFavorite: PropTypes.array,
    saveAlias: PropTypes.func,
    currency: PropTypes.string,
    isLogin: PropTypes.bool,
    isUseSimas: PropTypes.bool,
    isAutoDebit: PropTypes.object,
    autoDebitDate: PropTypes.string,
    setAsAutodebit: PropTypes.func,
    couponCheck: PropTypes.object
  };
  state={
    voucherDescription: '',
  }

  componentWillReceiveProps (newProps) {
    this.setState({voucherDescription: result(newProps, 'couponUse', '')});
  }

  payBill = () => {
    const {payGenericBillTypeTwo, isLogin, navigation, isUseSimas, isAutoDebit, setAsAutodebit, autoDebitDate} = this.props;
    const navParams = navigation.state.params;
    const data = {...navParams, isUseSimas};
    const isBillPay = !isLogin;
    const nextAutodebit = autoDebitDate ? moment(autoDebitDate, 'DD').add(1, 'M').format('YYYY-MM-DD').toString() : '';
    const isADebit = result(navParams, 'isADebit', false);
    const isRegular = result(isAutoDebit, 'isRegular') === true;
    const registerAutodebitOnly = isADebit && isRegular;
    if (registerAutodebitOnly) {
      setAsAutodebit({nextAutodebit, registerAutodebitOnly, ...data});
    } else {
      payGenericBillTypeTwo({nextAutodebit, ...data}, isBillPay);
    }
  }
  componentWillMount () {
    const {couponUse, saveAlias, billerFavorite, navigation} = this.props;
    const biller = result(navigation, 'state.params.biller', {});
    const resData = result(navigation, 'state.params.resData', {});
    const subsNumber = result(resData, 'subscriberNoInput', '');
    const isFavorite = !isEmpty(find(billerFavorite, (fav) => subsNumber === fav.subscriberNo && biller.id === fav.billerId));
    isFavorite && saveAlias();
    this.setState({voucherDescription: couponUse});
    // const code = result(biller, 'billerPreferences.code', '');
    // const billCode = code.concat('-3');
    // const os = Platform.OS;
    // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
  }

  goToCoupon = () => {
    const {navigation, checkCoupon, currency} = this.props;
    const idAccountSelected = result(navigation, 'state.params.accountNo.id', ''); 
    const amount = result(navigation, 'state.params.resData.amountNumber', '0').toString();
    const navParams = result(navigation, 'state.params', {});
    const isSyariah = checkShariaAccount(result(navParams, 'accountNo', {})) && currency !== 'simaspoin';
    if (isSyariah) {
      Toast.show(language.COUPON__ERROR_MESSAGE_SYARIAH, Toast.LONG);
    } else {
      checkCoupon(amount, '', idAccountSelected);
    }
  }

  render () {
    const navParams = this.props.navigation.state.params;
    const {triggerAuth, removeCoupon, timeEndCoupon, gapTimeServer, navigation,
      timeStartCoupon, dateEndCoupon, dateStartCoupon, usingFromLine, minAmount, state,
      maxAmount, showFavorite, favoriteBill, removeFavorite, billerFavorite, currency, isLogin, couponCheck,
      isAutoDebit, autoDebitDate} = this.props;
    const isSyariah = checkShariaAccount(result(navParams, 'accountNo', {})) && currency !== 'simaspoin';
    const amount = parseInt(result(navigation, 'state.params.resData.amountNumber', '0'));
    const isUseSimas = result(navParams, 'accountNo.isUseSimas', '');
    const isADebit = result(navParams, 'isADebit', false);
    return <ConnectedForm {...navParams} removeCoupon={removeCoupon} timeEndCoupon={timeEndCoupon} gapTimeServer={gapTimeServer} couponUse={this.state.voucherDescription} goToCoupon={this.goToCoupon} triggerAuth={triggerAuth} payBill={this.payBill}
      timeStartCoupon={timeStartCoupon} dateEndCoupon={dateEndCoupon} state={state}
      dateStartCoupon={dateStartCoupon} usingFromLine={usingFromLine}
      minAmount={minAmount} maxAmount={maxAmount} currentAmount={amount}
      showFavorite={showFavorite} favoriteBill={favoriteBill} isUseSimas={isUseSimas}
      navigation={navigation} removeFavorite={removeFavorite} billerFavorite={billerFavorite} isSyariah={isSyariah} isLogin={isLogin} couponCheck={couponCheck}
      isAutoDebit={isAutoDebit} isADebit={isADebit} autoDebitDate={autoDebitDate}/>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (billAmount, params) => dispatch(triggerAuthNavigate('billpay', billAmount, false, 'Auth', params)),
  payGenericBillTypeTwo: (data, isBillPay) => dispatch(payGenericBillTypeTwo(data, isBillPay)),
  checkCoupon: (dataValue, billertype, accountId) => dispatch(couponCustomer(dataValue, billertype, accountId)),
  removeCoupon: () => dispatch(removeCoupon()),
  showFavorite: (billerName, subsNumber) => () => dispatch(showFavorite(billerName, subsNumber)),
  removeFavorite: (billerName, subsNumber) => () => dispatch(removeFavorite(billerName, subsNumber)),
  saveAlias: () => dispatch(saveAlias()),
  setAsAutodebit: (data) => dispatch(registerAutoDebit(data)),
});
const mapStateToProps = (state) => ({
  state,
  transRefNum: result(state, 'transRefNum', ''),
  config: result(state, 'config.tokenConfig', []),
  userId: result(state, 'user.profile.customer.id', 0),
  couponUse: result(state, 'couponCheck.description', ''),
  timeEndCoupon: result(state, 'couponCheck.endTimeMod', ''),
  timeStartCoupon: result(state, 'couponCheck.startTimeMod', ''),
  dateEndCoupon: result(state, 'couponCheck.subendDate', ''),
  dateStartCoupon: result(state, 'couponCheck.subnewDate', ''),
  usingFromLine: result(state, 'couponCheck.usingFromLine', '0'),
  minAmount: result(state, 'couponCheck.minAmount', 0),
  maxAmount: result(state, 'couponCheck.maxAmount', 0),
  gapTimeServer: result(state, 'gapTimeServer', 0),
  favoriteBill: result(state, 'billerDescFav.isFavorite', ''),
  billerFavorite: result(state, 'billerFavorite', []),
  currency: result(state, 'couponCheck.currency', 'simaspoin'),
  isLogin: !isEmpty(result(state, 'user', {})),
  isAutoDebit: result(state, 'flagAutoDebit', {}),
  autoDebitDate: result(state, 'flagAutoDebit.date'),
  couponCheck: result(state, 'couponCheck', {})
});

export default connect(mapStateToProps, mapDispatchToProps)(BillerTypeTwoConfirmationPage);
