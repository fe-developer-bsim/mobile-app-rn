import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PaymentStatus from '../../components/QRGpn/NewPaymentStatusRevamp.component';
import {result} from 'lodash';
import {NavigationActions} from 'react-navigation';
import {shouldGiveFeedback} from '../../state/thunks/feedback.thunks';
import {getEmoneyAccount} from '../../utils/transformer.util';
import {setDirtyMiniStatement} from '../../state/actions/index.actions';
import {logout} from '../../state/thunks/onboarding.thunks';
import {hidePaymentModal, deleteCouponSuccessStatus} from '../../state/actions/index.actions.js';
import {updateUserAfterBillpay} from '../../state/thunks/genericBill.thunks';
import {refreshStorageNew} from '../../state/thunks/common.thunks';
class PaymentStatusPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    data: PropTypes.object,
    onClose: PropTypes.func,
    logoutFunc: PropTypes.func,
    isClosingTd: PropTypes.string,
    accountTo: PropTypes.object,
    couponStatusPayment: PropTypes.string,
    functionDeleteCouponState: PropTypes.func,
    onCloseLogin: PropTypes.func,
    onCloseLanding: PropTypes.func,
    emoneyAccounts: PropTypes.array

  };

  componentWillUnmount () {
    this.props.functionDeleteCouponState();
  }

  render () {
    const {navigation, data, onClose, logoutFunc, couponStatusPayment,
      onCloseLogin, onCloseLanding, emoneyAccounts} = this.props;
    const rawDataDetailList = result(data, 'dataDetail', []);
    const isClosingTd = result(data, 'isClosingTd', '');
    const accountTo = result(navigation, 'accountTo', {});
    const isBillPayBeforeLogin = result(navigation, 'state.params.isBillPay', false);
    const isValas = result(navigation, 'state.params.isValas', false);
    const generalCode = result(data, 'generalCode', '');
    const resDataTrf = result(data, 'resDataTrf', {});
    const resData = result(data, 'resData', {});
    const isFundTransfer = result(data, 'isFundTransfer');
    return <PaymentStatus onClose={onClose}
      couponStatusPayment={couponStatusPayment}
      logoutFunc={logoutFunc} isClosingTd={isClosingTd}
      accountTo={accountTo} rawDataDetailList={rawDataDetailList} {...data}
      onCloseLogin={onCloseLogin} isBillPayBeforeLogin={isBillPayBeforeLogin}
      onCloseLanding={onCloseLanding} navigation={navigation} emoneyAccounts={emoneyAccounts}
      generalCode={generalCode} isValas={isValas} resDataTrf={resDataTrf} resData={resData} isFundTransfer={isFundTransfer}/>;
  }
}

const mapStateToProps = (state) =>  ({
  options: result(state, 'paymentModal', {}),
  couponStatusPayment: result(state, 'CouponPaymentStatus', ''),
  emoneyAccounts: getEmoneyAccount(result(state, 'accounts', []), 'bp'),
  data: result(state, 'paymentStatus', {}),
});

const mapDispatchToProps = (dispatch) => ({
  onClose: () => {
    // dispatch(resetToDashboardFrom('QRScannerLanding'));      
    dispatch(setDirtyMiniStatement(true));
    dispatch(NavigationActions.back());
    dispatch(hidePaymentModal());
    return dispatch(shouldGiveFeedback());
  },
  onCloseLogin: (isBillPayBeforeLogin) => {
    dispatch(refreshStorageNew());
    dispatch(setDirtyMiniStatement(true));
    dispatch(updateUserAfterBillpay(isBillPayBeforeLogin));
    dispatch(NavigationActions.navigate({routeName: 'Landing'}));
    dispatch(hidePaymentModal());
    dispatch(deleteCouponSuccessStatus());
    return dispatch(shouldGiveFeedback());
  },
  onCloseLanding: () => {
    dispatch(updateUserAfterBillpay());
    dispatch(setDirtyMiniStatement(true));
    setTimeout(() => {
      dispatch(logout());
    }, 0);
    dispatch(hidePaymentModal());
    dispatch(deleteCouponSuccessStatus());
    return dispatch(shouldGiveFeedback());
  },
  logoutFunc: () => {
    dispatch(NavigationActions.back());
    dispatch(deleteCouponSuccessStatus());
    setTimeout(() => {
      dispatch(logout());
    }, 0);
  },
  functionDeleteCouponState: () => {
    dispatch(deleteCouponSuccessStatus());
  }
});

const connectedCreditCardConfirmation = connect(mapStateToProps, mapDispatchToProps)(PaymentStatusPage);
export default connectedCreditCardConfirmation;
