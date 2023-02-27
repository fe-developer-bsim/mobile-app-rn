import React, {Component} from 'react';
import {connect} from 'react-redux';
import EgiftPaymentStatus from '../../components/QRGpn/QRPaymentStatus.component';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';
import {shouldGiveFeedback} from '../../state/thunks/feedback.thunks';
import {setDirtyMiniStatement} from '../../state/actions/index.actions';
import {logout, getBalanceEmoneyBeforeLogin} from '../../state/thunks/onboarding.thunks';
import {hideSpinner, deleteCouponSuccessStatus} from '../../state/actions/index.actions.js';
import moment from 'moment';
import {hidePaymentModal} from '../../state/actions/index.actions.js';
import PropTypes from 'prop-types';
import {newLoginAfterBillpay} from '../../state/thunks/genericBill.thunks';


class PaymentStatusPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    data: PropTypes.object,
    onClose: PropTypes.func,
    logoutFunc: PropTypes.func,
    fullName: PropTypes.string,
    hideSpinner: PropTypes.func,
    transRefNum: PropTypes.string,
    onCloseLogin: PropTypes.func,
    onCloseLanding: PropTypes.func,
    couponStatusPayment: PropTypes.string,
    defaultAccount: PropTypes.object,
    goToHHH: PropTypes.func,
    isLuckyDipActive: PropTypes.string,
    goToHHHBeforeLogin: PropTypes.func
  };

  componentDidMount () {
    setTimeout(() => {
      this.props.hideSpinner();
    }, 2000);
  }

  render () {
    const {data, onClose, logoutFunc, fullName, navigation, onCloseLogin, onCloseLanding, couponStatusPayment, defaultAccount, goToHHH, isLuckyDipActive, goToHHHBeforeLogin} = this.props;
    const isBillPayBeforeLogin = result(navigation, 'state.params.isBillpay', false);
    const date = moment().format('D MMM YYYY, hh:mm A');
    return <EgiftPaymentStatus navigation={navigation} onClose={onClose} logoutFunc={logoutFunc} couponStatusPayment={couponStatusPayment}
      fullName={fullName} date={date} onCloseLogin={onCloseLogin} isBillPayBeforeLogin={isBillPayBeforeLogin}
      goToHHH={goToHHH} isLuckyDipActive={isLuckyDipActive} goToHHHBeforeLogin={goToHHHBeforeLogin}
      onCloseLanding={onCloseLanding} defaultAccount={defaultAccount} {...data}/>;
  }
}

const mapStateToProps = (state) => ({
  data: result(state, 'paymentStatus', {}),
  fullName: result(state, 'simasPoin.fullName', ''),
  couponStatusPayment: result(state, 'CouponPaymentStatus', ''),
  defaultAccount: result(state, 'defaultAccount', {}),
  isLuckyDipActive: result(state, 'config.flag.flagLuckyDip', 'inactive'),
});

const mapDispatchToProps = (dispatch) => ({
  onClose: () => {
    dispatch(setDirtyMiniStatement(true));
    dispatch(NavigationActions.back());
    dispatch(hidePaymentModal());
    dispatch(deleteCouponSuccessStatus());
    dispatch(getBalanceEmoneyBeforeLogin());
    return dispatch(shouldGiveFeedback());
  },
  goToHHH: () => {
    dispatch(setDirtyMiniStatement(true));
    dispatch(NavigationActions.back());
    dispatch(NavigationActions.navigate({routeName: 'LuckyDipMainPage'}));
    dispatch(hidePaymentModal());
    dispatch(deleteCouponSuccessStatus());
    dispatch(getBalanceEmoneyBeforeLogin());
    return dispatch(shouldGiveFeedback());
  },
  logoutFunc: () => {
    dispatch(NavigationActions.back());
    setTimeout(() => {
      dispatch(logout());
    }, 0);
  },
  hideSpinner: () => {
    dispatch(hideSpinner());
  },
  onCloseLogin: () => {
    dispatch(setDirtyMiniStatement(true));
    dispatch(newLoginAfterBillpay());
    dispatch(hidePaymentModal());
    dispatch(deleteCouponSuccessStatus());
    dispatch(getBalanceEmoneyBeforeLogin());
    return dispatch(shouldGiveFeedback());
  },
  goToHHHBeforeLogin: () => {
    dispatch(setDirtyMiniStatement(true));
    dispatch(newLoginAfterBillpay());
    dispatch(NavigationActions.navigate({routeName: 'LuckyDipMainPage'}));
    dispatch(hidePaymentModal());
    dispatch(deleteCouponSuccessStatus());
    dispatch(getBalanceEmoneyBeforeLogin());
    return dispatch(shouldGiveFeedback());
  },
  onCloseLanding: () => {
    dispatch(setDirtyMiniStatement(true));
    // setTimeout(() => {
    //   dispatch(logout());
    // }, 0);
    dispatch(hidePaymentModal());
    dispatch(deleteCouponSuccessStatus());
    return dispatch(shouldGiveFeedback());
  },
});

const connectedEgiftPaymentStatus = connect(mapStateToProps, mapDispatchToProps)(PaymentStatusPage);
export default connectedEgiftPaymentStatus;
