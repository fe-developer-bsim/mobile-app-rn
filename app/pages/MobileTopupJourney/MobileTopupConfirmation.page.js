import React from 'react';
import PropTypes from 'prop-types';
import MobileTopupConfirmation from '../../components/MobileTopupJourney/MobileTopupConfirmation.component';
import {reduxForm} from 'redux-form';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {payMobileTopUp} from '../../state/thunks/mobileTopup.thunks';
import {triggerAuthNavigate, couponCustomer, removeCoupon} from '../../state/thunks/common.thunks';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import moment from 'moment';

const formConfig = {
  form: 'MobileTopupConfirmationForm',
  initialValues: {
    'easyPin': ''
  },
  destroyOnUnmount: true,
  onSubmit (values, dispatch, {triggerAuth, confirmationDisplay, payBill, timeEndCoupon, gapTimeServer, couponUse, currentAmount, timeStartCoupon, dateEndCoupon, dateStartCoupon, usingFromLine, minAmount, maxAmount}) { // third argument is props
    const params = {onSubmit: payBill, amount: confirmationDisplay.amountNumber, isOtp: false};
    const now = new Date();
    const nowTimeDate = moment(now).format('YYYY/MM/DD');
    const nowTime = moment(now).format('YYYY/MM/DD H:mm');
    const timeDateEnded = dateEndCoupon + ' ' + timeEndCoupon;
    const timeDateStarted = dateStartCoupon + ' ' + timeStartCoupon;
    const diffDateStart = moment(nowTime).diff(moment(timeDateStarted));
    const diffDateEnd = moment(nowTime).diff(moment(timeDateEnded));
    const gapTimeStart = Math.round(moment.duration(diffDateStart).asSeconds()) - gapTimeServer;
    const gapTimeEnd = Math.round(moment.duration(diffDateEnd).asSeconds()) - gapTimeServer;
   
    const timeDateEndedElse = nowTimeDate + ' ' + timeEndCoupon;
    const timeDateStartedElse = nowTimeDate + ' ' + timeStartCoupon;
    const diffDateStartElse = moment(nowTime).diff(moment(timeDateStartedElse));
    const diffDateEndElse = moment(nowTime).diff(moment(timeDateEndedElse));
    const gapTimeStartElse = Math.round(moment.duration(diffDateStartElse).asSeconds()) - gapTimeServer;
    const gapTimeEndElse = Math.round(moment.duration(diffDateEndElse).asSeconds()) - gapTimeServer;
    if (couponUse !== '') {
      if (timeEndCoupon === '23:59' && timeStartCoupon === '00:00') {
        if (gapTimeStart > 0 && gapTimeEnd < 0) {

          if (usingFromLine === '1') {
            if ((currentAmount > minAmount && currentAmount < maxAmount) || (currentAmount > minAmount && maxAmount === 0)) {
              triggerAuth(confirmationDisplay.amountNumber, 'Auth', params);
            } else {
              Toast.show(language.GENERIC__AMOUNT_INSUFFICIENT, Toast.LONG);    
            }
          } else {
            triggerAuth(confirmationDisplay.amountNumber, 'Auth', params);
          }
        } else {
          Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);      
        }
      } else {
        if (gapTimeStart > 0 && gapTimeEnd < 0) {
          if (gapTimeStartElse > 0 && gapTimeEndElse < 0) {

            if (usingFromLine === '1') {
              if ((currentAmount > minAmount && currentAmount < maxAmount) || (currentAmount > minAmount && maxAmount === 0)) {
                triggerAuth(confirmationDisplay.amountNumber, 'Auth', params);
              } else {
                Toast.show(language.GENERIC__AMOUNT_INSUFFICIENT, Toast.LONG);    
              }
            } else {
              triggerAuth(confirmationDisplay.amountNumber, 'Auth', params);
            }
          } else {
            Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
          }
        } else {
          Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
        }
      }
    } else {
      triggerAuth(confirmationDisplay.amountNumber, 'Auth', params);
    }
  }
};

const DecoratedMobileTopupConfirmation = reduxForm(formConfig)(MobileTopupConfirmation);

class MobileTopupConfirmationPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    mobileNo: PropTypes.string,
    topupAmount: PropTypes.object,
    myAccount: PropTypes.object,
    triggerAuth: PropTypes.func,
    payMobileTopUp: PropTypes.func,
    confirmationDisplay: PropTypes.object,
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
    maxAmount: PropTypes.number
  };

  state={
    voucherDescription: '',
  }

  componentWillReceiveProps (newProps) {
    this.setState({voucherDescription: result(newProps, 'couponUse', '')});
  }

  payBill = () => {
    const {navigation, payMobileTopUp} = this.props;
    const {biller} = result(navigation, 'state.params', {});
    payMobileTopUp(biller);
  }
  componentWillMount () {
    const {couponUse} = this.props;
    this.setState({voucherDescription: couponUse});
  }
  goToCoupon = () => {
    const {navigation, checkCoupon} = this.props;
    const amount = result(navigation, 'state.params.confirmationDisplay.amountNumber', 0);
    checkCoupon(amount);
  }

  render () {
    const {mobileNo, topupAmount, myAccount, navigation, triggerAuth, removeCoupon, timeEndCoupon, gapTimeServer, timeStartCoupon, dateEndCoupon, dateStartCoupon, usingFromLine, minAmount, maxAmount} = this.props;
    const {biller} = result(navigation, 'state.params', {});
    const amount = parseInt(result(navigation, 'state.params.confirmationDisplay.amountNumber', 0));
    const navParams = this.props.navigation.state.params;
    return <DecoratedMobileTopupConfirmation {...navParams} timeEndCoupon={timeEndCoupon} gapTimeServer={gapTimeServer} goToCoupon={this.goToCoupon} removeCoupon={removeCoupon}
      mobileNo={mobileNo} topupAmount={topupAmount} myAccount={myAccount} couponUse={this.state.voucherDescription}
      timeStartCoupon={timeStartCoupon} dateEndCoupon={dateEndCoupon} dateStartCoupon={dateStartCoupon} usingFromLine={usingFromLine} minAmount={minAmount} maxAmount={maxAmount} currentAmount={amount}
      biller={biller} triggerAuth={triggerAuth} payBill={this.payBill}/>;
  }
}

const mapStateToProps = (state) => ({
  topupAmount: result(state, 'form.MobileTopupForm.values.topupAmount', {}),
  mobileNo: result(state, 'form.MobileTopupForm.values.mobileNo', ''),
  myAccount: result(state, 'form.MobileTopupForm.values.myAccount', {}),
  couponUse: result(state, 'couponCheck.description', ''),
  timeEndCoupon: result(state, 'couponCheck.endTimeMod', ''),
  timeStartCoupon: result(state, 'couponCheck.startTimeMod', ''),
  dateEndCoupon: result(state, 'couponCheck.subendDate', ''),
  dateStartCoupon: result(state, 'couponCheck.subnewDate', ''),
  usingFromLine: result(state, 'couponCheck.usingFromLine', '0'),
  minAmount: result(state, 'couponCheck.minAmount', 0),
  maxAmount: result(state, 'couponCheck.maxAmount', 0),
  gapTimeServer: result(state, 'gapTimeServer', 0),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (billAmount, routeName, params) => dispatch(triggerAuthNavigate('billpay', billAmount, false, routeName, params)),
  payMobileTopUp: (biller) => dispatch(payMobileTopUp(biller)),
  checkCoupon: (dataValue) => dispatch(couponCustomer(dataValue)),
  removeCoupon: () => dispatch(removeCoupon()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MobileTopupConfirmationPage);
