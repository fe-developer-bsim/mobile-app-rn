import React from 'react';
import PropTypes from 'prop-types';
import MobilePostpaidConfirmation from '../../components/MobilePostpaidJourney/MobilePostpaidConfirmation.component';
import {payPostpaidBill} from '../../state/thunks/mobilePostpaid.thunks';
import {triggerAuthNavigate, couponCustomer, removeCoupon} from '../../state/thunks/common.thunks';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import result from 'lodash/result';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import moment from 'moment';

const formConfig = {
  form: 'MobilePostpaidConfirmationForm',
  onSubmit: (values, dispatch, {confirmationDisplayTop, triggerAuth, payBill, timeEndCoupon, gapTimeServer, couponUse, currentAmount, timeStartCoupon, dateEndCoupon, dateStartCoupon, usingFromLine, minAmount, maxAmount}) => {
    const params = {onSubmit: payBill, amount: confirmationDisplayTop.billAmount, isOtp: false};
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
              triggerAuth(confirmationDisplayTop.billAmount, 'Auth', params);
            } else {
              Toast.show(language.GENERIC__AMOUNT_INSUFFICIENT, Toast.LONG);    
            }
          } else {
            triggerAuth(confirmationDisplayTop.billAmount, 'Auth', params);
          }
        } else {
          Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);        
        }
      } else {
        if (gapTimeStart > 0 && gapTimeEnd < 0) {
          if (gapTimeStartElse > 0 && gapTimeEndElse < 0) {

            if (usingFromLine === '1') {
              if ((currentAmount > minAmount && currentAmount < maxAmount) || (currentAmount > minAmount && maxAmount === 0)) {
                triggerAuth(confirmationDisplayTop.billAmount, 'Auth', params);
              } else {
                Toast.show(language.GENERIC__AMOUNT_INSUFFICIENT, Toast.LONG);    
              }
            } else {
              triggerAuth(confirmationDisplayTop.billAmount, 'Auth', params);
            }
          } else {
            Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
          }
        } else {
          Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
        }
      }
    } else {
      triggerAuth(confirmationDisplayTop.billAmount, 'Auth', params);
    }
  }
};

const ConnectedForm = reduxForm(formConfig)(MobilePostpaidConfirmation);

class MobilePostpaidConfirmationScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    triggerAuth: PropTypes.func,
    resendBillPayOTP: PropTypes.func,
    transRefNum: PropTypes.string,
    payPostpaidBill: PropTypes.func,
    confirmationDisplay: PropTypes.array,
    confirmationDisplayTop: PropTypes.object,
    biller: PropTypes.object,
    billDetails: PropTypes.object,
    couponUse: PropTypes.string,
    checkCoupon: PropTypes.func,
    removeCoupon: PropTypes.func,
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
    const {payPostpaidBill} = this.props;
    const navParams = this.props.navigation.state.params;
    const billDetails = result(navParams, 'billDetails', {});
    const biller = result(navParams, 'biller', {});
    const accountFrom = result(navParams, 'selectedAccount', {});
    payPostpaidBill(biller, billDetails, accountFrom);
  }

  componentWillMount () {
    const {couponUse} = this.props;
    this.setState({voucherDescription: couponUse});
  }
  goToCoupon = () => {
    const {navigation, checkCoupon} = this.props;
    const totalAmount = result(navigation, 'state.params.confirmationDisplayTop.billAmount', 0);
    checkCoupon(totalAmount);
  }

  render () {
    const {triggerAuth, navigation, removeCoupon, timeEndCoupon, gapTimeServer, timeStartCoupon, dateEndCoupon, dateStartCoupon, usingFromLine, minAmount, maxAmount} = this.props;
    const navParams = this.props.navigation.state.params;
    const totalAmount = parseInt(result(navigation, 'state.params.confirmationDisplayTop.billAmount', 0));
    return <ConnectedForm {...navParams} payBill={this.payBill} timeEndCoupon={timeEndCoupon} gapTimeServer={gapTimeServer} couponUse={this.state.voucherDescription} goToCoupon={this.goToCoupon} removeCoupon={removeCoupon} triggerAuth={triggerAuth} biller={navigation.state.biller} billDetails={navigation.state.billDetails}
      timeStartCoupon={timeStartCoupon} dateEndCoupon={dateEndCoupon} dateStartCoupon={dateStartCoupon} usingFromLine={usingFromLine} minAmount={minAmount} maxAmount={maxAmount} currentAmount={totalAmount}/>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (billAmount, routeName, params) => dispatch(triggerAuthNavigate('billpay', billAmount, false, routeName, params)),
  payPostpaidBill: (biller, billDetails, accountFrom) => {
    dispatch(payPostpaidBill(biller, billDetails, accountFrom));
  },
  checkCoupon: (dataValue) => dispatch(couponCustomer(dataValue)),
  removeCoupon: () => dispatch(removeCoupon()),
});

const mapStateToProps = ({transRefNum, couponCheck, gapTimeServer}) => ({
  transRefNum,
  couponUse: result(couponCheck, 'description', ''),
  timeEndCoupon: result(couponCheck, 'endTimeMod', ''),
  timeStartCoupon: result(couponCheck, 'startTimeMod', ''),
  dateEndCoupon: result(couponCheck, 'subendDate', ''),
  dateStartCoupon: result(couponCheck, 'subnewDate', ''),
  usingFromLine: result(couponCheck, 'usingFromLine', '0'),
  minAmount: result(couponCheck, 'minAmount', 0),
  maxAmount: result(couponCheck, 'maxAmount', 0),
  gapTimeServer,

});

export default connect(mapStateToProps, mapDispatchToProps)(MobilePostpaidConfirmationScreen);
