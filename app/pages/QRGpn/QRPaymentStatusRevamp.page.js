import React, {Component} from 'react';
import {connect} from 'react-redux';
import EgiftPaymentStatus from '../../components/QRGpn/QRPaymentStatusRevamp.component';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';
import {shouldGiveFeedback} from '../../state/thunks/feedback.thunks';
import {setDirtyMiniStatement} from '../../state/actions/index.actions';
import {logout} from '../../state/thunks/onboarding.thunks';
import {hideSpinner, deleteCouponSuccessStatus} from '../../state/actions/index.actions.js';
import moment from 'moment';
import {hidePaymentModal, saveAutoSave} from '../../state/actions/index.actions.js';
import PropTypes from 'prop-types';
import {getBalanceEmoneyBeforeLogin} from '../../state/thunks/onboarding.thunks';
import {refreshStorageNew} from '../../state/thunks/common.thunks';
import {goToSplitBillFromTransaction} from '../../state/thunks/splitBill.thunks';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import {getErrorMessage} from '../../utils/transformer.util';
import {Toast} from '../../utils/RNHelpers.util.js';
import {language} from '../../config/language';
import {storageKeys, set, get} from '../../utils/storage.util';

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
    custPoin: PropTypes.string,
    onPresSplitBill: PropTypes.func,
    isLogin: PropTypes.bool,
    custPoinCurrenncy: PropTypes.string,
    getListSender: PropTypes.object,
    getAutoSaveChecklist: PropTypes.func,
    checked: PropTypes.bool,
    nav: PropTypes.object,
    saveAutoSaveFunc: PropTypes.func,
    isAutoSave: PropTypes.bool,
    QR: PropTypes.bool,
    isQR: PropTypes.bool,
    goToHHH: PropTypes.func,
    isLuckyDipActive: PropTypes.string,
    goToHHHBeforeLogin: PropTypes.func
  };

  goToSplitBill = (amountFee) => () => {
    const {onPresSplitBill, getListSender} = this.props;
    const isFromQrPayment = true;
    const dataSenderSplitBill = result(getListSender, 'res.data', '');
    const {InvoiceList = {}} = dataSenderSplitBill;
    const getPending = filter(InvoiceList, {status: 'Pending'});
    const getPartiallyPaid = filter(InvoiceList, {status: 'Partially Paid'});
    const totalPending = getPending.length;
    const totalPartiallyPaid = getPartiallyPaid.length;
    let validateSplitBill;
    if (totalPending + totalPartiallyPaid >= 5) {
      validateSplitBill = true;
    }
    if (validateSplitBill) {
      Toast.show(getErrorMessage(language.SPLITBILL_LIMIT_STATUS__TITLE), Toast.LONG);
    } else {
      onPresSplitBill(amountFee, isFromQrPayment);
    }
  }


  state = {
    checked: false
  }

  componentWillMount () {
    const {getAutoSaveChecklist} = this.props;
    set(storageKeys['AUTO_SAVE_CHECKLIST'], true);
    getAutoSaveChecklist().then((res) => {
      this.setState({
        checked: res,
      });
    });
  }

  componentDidMount () {
    setTimeout(() => {
      this.props.hideSpinner();
    }, 2000);
  }

  render () {
    const {data, onClose, logoutFunc, fullName, navigation, onCloseLogin, onCloseLanding, goToHHH, isLuckyDipActive, goToHHHBeforeLogin,
      couponStatusPayment, defaultAccount, custPoin, isLogin, custPoinCurrenncy, saveAutoSaveFunc, isAutoSave, QR} = this.props;
    const isBillPayBeforeLogin = result(navigation, 'state.params.isBillpay', false);
    const date = moment().format('DD MMM YYYY, hh:mm A');
    const transRefNum = result(navigation, 'state.params.transRefNum', '');
    const paymentStatusData = result(navigation, 'state.params.paymentStatusData', {});
    const {checked} = this.state;
    const isQR = true;
    return <EgiftPaymentStatus navigation={navigation} onClose={onClose} logoutFunc={logoutFunc} couponStatusPayment={couponStatusPayment}
      fullName={fullName} date={date} onCloseLogin={onCloseLogin} isBillPayBeforeLogin={isBillPayBeforeLogin}
      onCloseLanding={onCloseLanding} defaultAccount={defaultAccount} {...data} isLogin={isLogin}
      custPoin={custPoin} custPoinCurrenncy={custPoinCurrenncy} transRefNum={transRefNum} paymentStatusData={paymentStatusData} goToSplitBill={this.goToSplitBill}
      goToHHH={goToHHH} isLuckyDipActive={isLuckyDipActive} goToHHHBeforeLogin={goToHHHBeforeLogin}
      checked={checked} saveAutoSaveFunc={saveAutoSaveFunc} isAutoSave={isAutoSave} QR={QR} isQR={isQR}/>;
  }
}

const mapStateToProps = (state) => (
  {
    data: result(state, 'paymentStatus', {}),
    fullName: result(state, 'simasPoin.fullName', ''),
    couponStatusPayment: result(state, 'CouponPaymentStatus', ''),
    defaultAccount: result(state, 'defaultAccount', {}),
    custPoin: result(state, 'couponCheck.custPoin', ''),
    custPoinCurrenncy: result(state, 'couponCheck.currency', ''),
    isLogin: !isEmpty(result(state, 'user', {})),
    getListSender: result(state, 'splitBillBySender', {}),
    isAutoSave: result(state, 'autoSave.isAutoSave', false),
    QR: result(state, 'autoSave.QR', false),
    isLuckyDipActive: result(state, 'config.flag.flagLuckyDip', 'inactive'),
  }
);


const mapDispatchToProps = (dispatch) => ({
  getAutoSaveChecklist: () => get(storageKeys['AUTO_SAVE_CHECKLIST']),
  saveAutoSaveFunc: (isAutoSave, checked) => dispatch(saveAutoSave(isAutoSave, checked)),
  onClose: () => {
    dispatch(setDirtyMiniStatement(true));
    dispatch(NavigationActions.back());
    dispatch(NavigationActions.navigate({routeName: 'Landing'}));
    dispatch(hidePaymentModal());
    dispatch(getBalanceEmoneyBeforeLogin());
    return dispatch(shouldGiveFeedback());
  },
  goToHHH: () => {
    dispatch(setDirtyMiniStatement(true));
    dispatch(NavigationActions.back());
    dispatch(NavigationActions.navigate({routeName: 'LuckyDipMainPage'}));
    dispatch(hidePaymentModal());
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
    dispatch(refreshStorageNew());
    dispatch(setDirtyMiniStatement(true));
    dispatch(NavigationActions.navigate({routeName: 'Landing'}));
    dispatch(hidePaymentModal());
    dispatch(deleteCouponSuccessStatus());
    dispatch(getBalanceEmoneyBeforeLogin());
    return dispatch(shouldGiveFeedback());
  },
  goToHHHBeforeLogin: () => {
    dispatch(refreshStorageNew());
    dispatch(setDirtyMiniStatement(true));
    dispatch(NavigationActions.navigate({routeName: 'Landing'}));
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
  onPresSplitBill: (amountFee, isFromQrPayment) => {
    dispatch(goToSplitBillFromTransaction(amountFee, isFromQrPayment));
  },
});

const connectedEgiftPaymentStatus = connect(mapStateToProps, mapDispatchToProps)(PaymentStatusPage);
export default connectedEgiftPaymentStatus;
