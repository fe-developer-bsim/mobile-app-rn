import React from 'react';
import PropTypes from 'prop-types';
import WaterBillSummary from '../../components/WaterBillJourney/WaterBillSummary.component';
import {payWaterBill} from '../../state/thunks/waterBill.thunks';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import result from 'lodash/result';
import {triggerAuthNavigate, resendBillPayOTP, couponCustomer, removeCoupon} from '../../state/thunks/common.thunks';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import moment from 'moment';

const formConfig = {
  form: 'WaterBillerSummary',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {triggerAuth, payBill, navigation, timeEndCoupon, gapTimeServer, couponUse, currentAmount, timeStartCoupon, dateEndCoupon, dateStartCoupon, usingFromLine, minAmount, maxAmount}) => {
    const amount = result(navigation, 'state.params.bill.billAmount');
    const params = {onSubmit: payBill, amount: amount, isOtp: false};
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
              triggerAuth(amount, 'Auth', params);
            } else {
              Toast.show(language.GENERIC__AMOUNT_INSUFFICIENT, Toast.LONG);    
            }
          } else {
            triggerAuth(amount, 'Auth', params);
          }


        } else {
          Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);        
        }
      } else {
        if (gapTimeStart > 0 && gapTimeEnd < 0) {
          if (gapTimeStartElse > 0 && gapTimeEndElse < 0) {

            if (usingFromLine === '1') {
              if ((currentAmount > minAmount && currentAmount < maxAmount) || (currentAmount > minAmount && maxAmount === 0)) {
                triggerAuth(amount, 'Auth', params);
              } else {
                Toast.show(language.GENERIC__AMOUNT_INSUFFICIENT, Toast.LONG);    
              }
            } else {
              triggerAuth(amount, 'Auth', params);
            }
          } else {
            Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
          }
        } else {
          Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
        }
      }
    } else {
      triggerAuth(amount, 'Auth', params);
    }
  }
};

const mapStateToProps = (state) => {
  const accountNo = result(state, 'form.WaterBillerPayment.values.accountNo', {});
  const areaCode = result(state, 'form.WaterBillerSelectionForm.values.areaCode', {});
  const couponUse = result(state, 'couponCheck.description', '');
  return {
    accountNo,
    areaCode,
    transRefNum: state.transRefNum,
    config: result(state, 'config.tokenConfig', []),
    userId: result(state, 'user.profile.customer.id', 0),
    userMobileNumber: result(state, 'user.profile.mobileNumberMasking', ''),
    couponUse,
    timeEndCoupon: result(state, 'couponCheck.endTimeMod', ''),
    timeStartCoupon: result(state, 'couponCheck.startTimeMod', ''),
    dateEndCoupon: result(state, 'couponCheck.subendDate', ''),
    dateStartCoupon: result(state, 'couponCheck.subnewDate', ''),
    usingFromLine: result(state, 'couponCheck.usingFromLine', '0'),
    minAmount: result(state, 'couponCheck.minAmount', 0),
    maxAmount: result(state, 'couponCheck.maxAmount', 0),
    gapTimeServer: result(state, 'gapTimeServer', 0),
    
  };
};

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (billAmount, routeName, params) => dispatch(triggerAuthNavigate('billpay', billAmount, false, routeName, params)),
  resendBillPayOTP: (transactionId) => dispatch(resendBillPayOTP(transactionId)),
  payWaterBill: (payload) => dispatch(payWaterBill(payload)),
  checkCoupon: (dataValue) => dispatch(couponCustomer(dataValue)),
  removeCoupon: () => dispatch(removeCoupon()),
});

class WaterBillSummaryScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    payWaterBill: PropTypes.func,
    confirmationDisplay: PropTypes.array,
    checkCoupon: PropTypes.func,
    removeCoupon: PropTypes.func,
    couponUse: PropTypes.string,
    timeEndCoupon: PropTypes.string,
    gapTimeServer: PropTypes.number,
    timeStartCoupon: PropTypes.string,
    dateEndCoupon: PropTypes.string,
    dateStartCoupon: PropTypes.string,
    usingFromLine: PropTypes.string,
    minAmount: PropTypes.number,
    maxAmount: PropTypes.number
  }
  state={
    voucherDescription: '',
  }

  componentWillReceiveProps (newProps) {
    this.setState({voucherDescription: result(newProps, 'couponUse', '')});
  }

  payBill = () => {
    const {payWaterBill, navigation} = this.props;
    let bill = navigation.state.params.bill;
    const totalAmount = navigation.state.params.totalAmount;
    bill.totalAmount = totalAmount;
    const payload = {...bill};
    payWaterBill(payload);
  }
  componentWillMount () {
    const {couponUse} = this.props;
    this.setState({voucherDescription: couponUse});
  }
  goToCoupon = () => {
    const {navigation, checkCoupon} = this.props;
    const totalAmount = result(navigation, 'state.params.bill.billAmount', 0);
    checkCoupon(totalAmount);
  }

  render () {
    const {navigation, removeCoupon, timeEndCoupon, gapTimeServer, timeStartCoupon, dateEndCoupon, dateStartCoupon, usingFromLine, minAmount, maxAmount} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const totalAmount = parseInt(result(navigation, 'state.params.bill.billAmount', 0));
    return <ConnectedForm {...navParams} removeCoupon={removeCoupon} timeEndCoupon={timeEndCoupon} gapTimeServer={gapTimeServer} couponUse={this.state.voucherDescription} goToCoupon={this.goToCoupon} payBill={this.payBill} {...this.props} 
      timeStartCoupon={timeStartCoupon} dateEndCoupon={dateEndCoupon} dateStartCoupon={dateStartCoupon} usingFromLine={usingFromLine} minAmount={minAmount} maxAmount={maxAmount} currentAmount={totalAmount}/>;
  }
}

const ConnectedForm = reduxForm(formConfig)(WaterBillSummary);

export default connect(mapStateToProps, mapDispatchToProps)(WaterBillSummaryScreen);
