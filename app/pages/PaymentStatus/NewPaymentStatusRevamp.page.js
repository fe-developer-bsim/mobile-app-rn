import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PaymentStatus from '../../components/PaymentStatus/NewPaymentStatusRevamp.component';
import {result} from 'lodash';
import {NavigationActions} from 'react-navigation';
import {shouldGiveFeedback} from '../../state/thunks/feedback.thunks';
import {getEmoneyAccount} from '../../utils/transformer.util';
import {setDirtyMiniStatement} from '../../state/actions/index.actions';
import {logout} from '../../state/thunks/onboarding.thunks';
import {hidePaymentModal, deleteCouponSuccessStatus} from '../../state/actions/index.actions.js';
import {updateUserAfterBillpay} from '../../state/thunks/genericBill.thunks';
import {refreshStorageNew, saveImageEtax} from '../../state/thunks/common.thunks';
class PaymentStatusPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    options: PropTypes.object,
    onClose: PropTypes.func,
    logoutFunc: PropTypes.func,
    isClosingTd: PropTypes.string,
    accountTo: PropTypes.object,
    couponStatusPayment: PropTypes.string,
    functionDeleteCouponState: PropTypes.func,
    onCloseLogin: PropTypes.func,
    onCloseLanding: PropTypes.func,
    emoneyAccounts: PropTypes.array,
    saveImageEtax: PropTypes.func

  };

  componentWillUnmount () {
    this.props.functionDeleteCouponState();
  }

  render () {
    const {navigation, options, onClose, logoutFunc, couponStatusPayment,
      onCloseLogin, onCloseLanding, emoneyAccounts, saveImageEtax} = this.props;
    const rawDataDetailList = result(options, 'dataDetail', []);
    const isClosingTd = result(options, 'isClosingTd', '');
    const accountTo = result(navigation, 'accountTo', {});
    const isBillPayBeforeLogin = result(navigation, 'state.params.isBillPay', false);
    const isValas = result(navigation, 'state.params.isValas', false);
    const generalCode = result(options, 'generalCode', '');
    const resDataTrf = result(options, 'resDataTrf', {});
    const resData = result(options, 'resData', {});
    const isFundTransfer = result(options, 'isFundTransfer');
    return <PaymentStatus onClose={onClose}
      couponStatusPayment={couponStatusPayment}
      logoutFunc={logoutFunc} isClosingTd={isClosingTd} opions={options} 
      accountTo={accountTo} rawDataDetailList={rawDataDetailList} {...options}
      onCloseLogin={onCloseLogin} isBillPayBeforeLogin={isBillPayBeforeLogin} saveImageEtax={saveImageEtax}
      onCloseLanding={onCloseLanding} navigation={navigation} emoneyAccounts={emoneyAccounts}
      generalCode={generalCode} isValas={isValas} resDataTrf={resDataTrf} resData={resData} isFundTransfer={isFundTransfer} />;
  }
}

const mapStateToProps = (state) =>  ({
  options: result(state, 'paymentModal', {}),
  couponStatusPayment: result(state, 'CouponPaymentStatus', ''),
  emoneyAccounts: getEmoneyAccount(result(state, 'accounts', []), 'bp'),

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
  },
  saveImageEtax: (uri, idBilling) => {
    dispatch(saveImageEtax(uri, idBilling));
  }
});

const connectedCreditCardConfirmation = connect(mapStateToProps, mapDispatchToProps)(PaymentStatusPage);
export default connectedCreditCardConfirmation;
