import React from 'react';
import PropTypes from 'prop-types';
import ElectricityConfirmation from '../../components/ElectricityJourney/ElectricityConfirmation.component';
import {payElectricityBill} from '../../state/thunks/electricityBill.thunks';
import {triggerAuthNavigate, couponCustomer, removeCoupon} from '../../state/thunks/common.thunks';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import moment from 'moment';

const formConfig = {
  form: 'ElectricityConfirmationForm',
  onSubmit: (values, dispatch, {billDetails, triggerAuth, payBill, denomination = [], isPrepaidBiller = false, timeEndCoupon, gapTimeServer, couponUse, currentAmount, timeStartCoupon, dateEndCoupon, dateStartCoupon, usingFromLine, minAmount, maxAmount}) => {
    const billAmount = isPrepaidBiller ? denomination.value : billDetails.billAmount;
    const params = {onSubmit: payBill, amount: billAmount, isOtp: false};
   
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
              triggerAuth(billAmount, 'Auth', params);
            } else {
              Toast.show(language.GENERIC__AMOUNT_INSUFFICIENT, Toast.LONG);    
            }
          } else {
            triggerAuth(billAmount, 'Auth', params);
          }


        } else {
          Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);        
        }
      } else {
        if (gapTimeStart > 0 && gapTimeEnd < 0) {
          if (gapTimeStartElse > 0 && gapTimeEndElse < 0) {

            if (usingFromLine === '1') {
              if ((currentAmount > minAmount && currentAmount < maxAmount) || (currentAmount > minAmount && maxAmount === 0)) {
                triggerAuth(billAmount, 'Auth', params);
              } else {
                Toast.show(language.GENERIC__AMOUNT_INSUFFICIENT, Toast.LONG);    
              }
            } else {
              triggerAuth(billAmount, 'Auth', params);
            }
          } else {
            Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
          }
        } else {
          Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
        }
      }
    } else {
      triggerAuth(billAmount, 'Auth', params);
    }
  }
};

const ConnectedForm = reduxForm(formConfig)(ElectricityConfirmation);

class ElectricityConfirmationPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    triggerAuth: PropTypes.func,
    resendBillPayOTP: PropTypes.func,
    payElectricityBill: PropTypes.func,
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
    const {payElectricityBill, navigation} = this.props;
    const {billDetails, biller} = navigation.state.params;
    payElectricityBill(biller, billDetails);
  }
  componentWillMount () {
    const {couponUse} = this.props;
    this.setState({voucherDescription: couponUse});
  }
  goToCoupon = () => {
    const {navigation, checkCoupon} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const prepaidAmount = result(navParams, 'denomination.value', '0');
    const nonprepaidAmount = result(navParams, 'billDetails.billAmount', '0');
    const isPrepaidBiller = result(navigation, 'state.params.isPrepaidBiller', false);
    const totalAmount = isPrepaidBiller === true ? prepaidAmount : nonprepaidAmount;
    checkCoupon(totalAmount);
  }

  render () {
    const navParams = this.props.navigation.state.params;
    const {triggerAuth, removeCoupon, timeEndCoupon, gapTimeServer, navigation, timeStartCoupon, dateEndCoupon, dateStartCoupon, usingFromLine, minAmount, maxAmount} = this.props;
    const prepaidAmount = result(navParams, 'denomination.value', '0');
    const nonprepaidAmount = result(navParams, 'billDetails.billAmount', '0');
    const isPrepaidBiller = result(navigation, 'state.params.isPrepaidBiller', false);
    const totalAmount = isPrepaidBiller === true ? parseInt(prepaidAmount) : parseInt(nonprepaidAmount);
    return <ConnectedForm {...navParams} removeCoupon={removeCoupon} timeEndCoupon={timeEndCoupon} gapTimeServer={gapTimeServer} couponUse={this.state.voucherDescription} goToCoupon={this.goToCoupon} triggerAuth={triggerAuth} payBill={this.payBill}
      timeStartCoupon={timeStartCoupon} dateEndCoupon={dateEndCoupon} dateStartCoupon={dateStartCoupon} usingFromLine={usingFromLine} minAmount={minAmount} maxAmount={maxAmount} currentAmount={totalAmount}/>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (billAmount, routeName, params) => dispatch(triggerAuthNavigate('billpay', billAmount, false, routeName, params)),
  payElectricityBill: (biller, billDetails) => dispatch(payElectricityBill(biller, billDetails)),
  checkCoupon: (dataValue) => dispatch(couponCustomer(dataValue)),
  removeCoupon: () => dispatch(removeCoupon()),
});
const mapStateToProps = (state) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(ElectricityConfirmationPage);
