import React from 'react';
import PropTypes from 'prop-types';
import BillerTypeEightConfirmation from '../../components/BillerTypeEightJourney/BillerTypeEightConfirmation.component';
import {payGenericBillTypeEight, confirmGenericBillTypeEight, triggerAuthBillpay, checkValidityCouponLogin, registerAutoDebit} from '../../state/thunks/genericBill.thunks';
import {triggerAuthNavigate, couponCustomer, removeCoupon, showFavorite, removeFavorite, saveAlias} from '../../state/thunks/common.thunks';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import {checkShariaAccount} from '../../utils/transformer.util';
// import indexOf from 'lodash/indexOf';
import {Toast} from '../../utils/RNHelpers.util.js';
import {language} from '../../config/language';
// import {Platform} from 'react-native';
import moment from 'moment';
// import firebase from 'react-native-firebase';
// let Analytics = firebase.analytics();

const formConfig = {
  form: 'BillerTypeEightConfirmationForm',
  onSubmit: (values, dispatch, {resData = {}, payBill, navigation, currentAmount, confirmData, isLogin, isSyariah, couponCheck, autoDebitDate}) => {
    const billAmounts = result(resData, 'billAmount', 0);
    const resDataTemp = result(navigation, 'state.params.resData', {});
    const params = {onSubmit: payBill, amount: billAmounts, isOtp: false};

    const confirmFunction = () => {
      dispatch(confirmGenericBillTypeEight({...confirmData, resDataTemp, autoDebitDate}, true)).then(() => {
        dispatch(triggerAuthBillpay(currentAmount, triggerAuthData, isSyariah));
      });
    };
    const triggerAuthData = {billAmounts, params};
    // const checkingCIF = checkingCIFbeforeLogin;
    // const limitBeforeLogin = configLimit;
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

const ConnectedForm = reduxForm(formConfig)(BillerTypeEightConfirmation);

class BillerTypeEightConfirmationPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    triggerAuth: PropTypes.func,
    payGenericBillTypeEight: PropTypes.func,
    checkCoupon: PropTypes.func,
    couponUse: PropTypes.string,
    removeCoupon: PropTypes.func,
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
    configLimit: PropTypes.string,
    checkingCIFbeforeLogin: PropTypes.bool,
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
    const {payGenericBillTypeEight, isLogin, navigation, isUseSimas, isAutoDebit, setAsAutodebit, autoDebitDate} = this.props;
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
      payGenericBillTypeEight({nextAutodebit, ...data}, isBillPay);
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
    const {triggerAuth,
      removeCoupon,
      checkingCIFbeforeLogin = false, 
      configLimit,
      timeEndCoupon,
      gapTimeServer,
      navigation,
      timeStartCoupon,
      dateEndCoupon,
      dateStartCoupon,
      usingFromLine,
      minAmount,
      maxAmount,
      showFavorite,
      favoriteBill,
      removeFavorite,
      billerFavorite, 
      currency, 
      isLogin,
      couponCheck, 
      isAutoDebit,
      autoDebitDate} = this.props;
    const amount = parseInt(result(navigation, 'state.params.resData.amountNumber', '0'));
    const isUseSimas = result(navParams, 'accountNo.isUseSimas', '');
    const isSyariah = checkShariaAccount(result(navParams, 'accountNo', {})) && currency !== 'simaspoin';
    const isADebit = result(navParams, 'isADebit', false);
    return <ConnectedForm {...navParams}
      goToCoupon={this.goToCoupon} timeEndCoupon={timeEndCoupon}
      gapTimeServer={gapTimeServer} removeCoupon={removeCoupon} configLimit={configLimit}
      checkingCIFbeforeLogin={checkingCIFbeforeLogin}
      timeStartCoupon={timeStartCoupon} dateEndCoupon={dateEndCoupon}
      dateStartCoupon={dateStartCoupon} usingFromLine={usingFromLine}
      minAmount={minAmount} maxAmount={maxAmount} currentAmount={amount}
      couponUse={this.state.voucherDescription} triggerAuth={triggerAuth}
      payBill={this.payBill} showFavorite={showFavorite}
      favoriteBill={favoriteBill} removeFavorite={removeFavorite} isUseSimas={isUseSimas}
      navigation={navigation} billerFavorite={billerFavorite} isSyariah={isSyariah} isLogin={isLogin}
      couponCheck={couponCheck} isAutoDebit={isAutoDebit} isADebit={isADebit} autoDebitDate={autoDebitDate}/>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (billAmounts, params) => dispatch(triggerAuthNavigate('billpay', billAmounts, false, 'Auth', params)),
  payGenericBillTypeEight: (data, isBillPay) => dispatch(payGenericBillTypeEight(data, isBillPay)),
  checkCoupon: (dataValue, billertype, accountId) => dispatch(couponCustomer(dataValue, billertype, accountId)),
  removeCoupon: () => dispatch(removeCoupon()),
  showFavorite: (billerName, subsNumber) => () => dispatch(showFavorite(billerName, subsNumber)),
  removeFavorite: (billerName, subsNumber) => () => dispatch(removeFavorite(billerName, subsNumber)),
  saveAlias: () => dispatch(saveAlias()),
  setAsAutodebit: (data) => dispatch(registerAutoDebit(data)),
});
const mapStateToProps = ({transRefNum, checkingCIFbeforeLogin, config, user, couponCheck, gapTimeServer, billerDescFav, billerFavorite, flagAutoDebit}) => ({
  transRefNum, config: result(config, 'tokenConfig', []),
  userId: result(user, 'profile.customer.id', 0),
  couponUse: result(couponCheck, 'description', ''),
  timeEndCoupon: result(couponCheck, 'endTimeMod', ''),
  timeStartCoupon: result(couponCheck, 'startTimeMod', ''),
  dateEndCoupon: result(couponCheck, 'subendDate', ''),
  dateStartCoupon: result(couponCheck, 'subnewDate', ''),
  usingFromLine: result(couponCheck, 'usingFromLine', '0'),
  minAmount: result(couponCheck, 'minAmount', 0),
  maxAmount: result(couponCheck, 'maxAmount', 0),
  favoriteBill: result(billerDescFav, 'isFavorite', ''),
  isLogin: !isEmpty(user),
  billerFavorite,
  gapTimeServer,
  currency: result(couponCheck, 'currency', 'simaspoin'),
  configLimit: result(config, 'limitConfigAutoDebetAccount', ''),
  isAutoDebit: flagAutoDebit,
  autoDebitDate: result(flagAutoDebit, 'date'),
  checkingCIFbeforeLogin,
  couponCheck
});

export default connect(mapStateToProps, mapDispatchToProps)(BillerTypeEightConfirmationPage);
