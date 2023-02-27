import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PaymentStatus from '../../components/PaymentStatus/PaymentStatusRemittance.component';
import {result, isEmpty} from 'lodash';
import {NavigationActions} from 'react-navigation';
import {shouldGiveFeedback} from '../../state/thunks/feedback.thunks';
import {formatBillDetails, formatDataDetailList, getEmoneyAccount} from '../../utils/transformer.util';
import {setDirtyMiniStatement} from '../../state/actions/index.actions';
import {logout} from '../../state/thunks/onboarding.thunks';
import {hidePaymentModal, deleteCouponSuccessStatus, saveAutoSave} from '../../state/actions/index.actions.js';
import {updateUserAfterBillpay} from '../../state/thunks/genericBill.thunks';
import {getBalanceEmoneyBeforeLogin} from '../../state/thunks/onboarding.thunks';
import {refreshStorageNew} from '../../state/thunks/common.thunks';
import {storageKeys, set, get} from '../../utils/storage.util';

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
    currentLanguage: PropTypes.object,
    isLuckyDipActive: PropTypes.string,
    goToHHHBeforeLogin: PropTypes.func,
    goToHHH: PropTypes.func,
    getAutoSaveChecklist: PropTypes.func,
    checked: PropTypes.bool,
    nav: PropTypes.object,
    saveAutoSaveFunc: PropTypes.func,
    isAutoSave: PropTypes.bool,
    transfer: PropTypes.bool,
    billPay: PropTypes.bool,
    saving: PropTypes.bool,
  };

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

  componentWillUnmount () {
    this.props.functionDeleteCouponState();
  }

  render () {
    const {options, onClose, logoutFunc,
      onCloseLogin, onCloseLanding, currentLanguage = {}, isLuckyDipActive, goToHHHBeforeLogin, goToHHH, saveAutoSaveFunc, isAutoSave, transfer, billPay, saving} = this.props;
    const displayList = !isEmpty(result(options, 'resultDisplay', [])) ? typeof (result(options, 'resultDisplay', [])) !== 'string' ? formatBillDetails(result(options, 'resultDisplay', [])) : '' : '';
    const dataDetailList = !isEmpty(result(options, 'dataDetail', [])) ? formatDataDetailList(result(options, 'dataDetail', [])) : '';
    const rawDataDetailList = result(options, 'dataDetail', []);
    const isClosingTd = result(options, 'isClosingTd', '');
    const generalCode = result(options, 'generalCode', '');
    const resDataTrf = result(options, 'resDataTrf', {});
    const resData = result(options, 'resData', {});
    const isFundTransfer = 'yes';
    const currencyObject = result(options, 'currencyRate', {});
    const inputPolis = result(options, 'inputPolis', '');
    const isSilIdrUsd = result(options, 'isSilIdrUsd', '');
    const currencyAcc = result(options, 'accountFrom.currency', '');
    const infoPolis = result(options, 'infoPolis', '');
    const {checked} = this.state;
    return <PaymentStatus onClose={onClose} displayList={displayList}
      dataDetailList={dataDetailList}
      logoutFunc={logoutFunc} isClosingTd={isClosingTd} opions={options}
      rawDataDetailList={rawDataDetailList} {...options}
      onCloseLogin={onCloseLogin} 
      onCloseLanding={onCloseLanding}
      generalCode={generalCode} resDataTrf={resDataTrf} resData={resData}
      isFundTransfer={isFundTransfer} inputPolis={inputPolis} isSilIdrUsd={isSilIdrUsd} currencyAcc={currencyAcc} infoPolis={infoPolis}
      currencyObject={currencyObject} currentLanguage={currentLanguage} isLuckyDipActive={isLuckyDipActive} goToHHHBeforeLogin={goToHHHBeforeLogin}
      goToHHH={goToHHH} checked={checked} saveAutoSaveFunc={saveAutoSaveFunc} isAutoSave={isAutoSave} transfer={transfer} billPay={billPay} saving={saving} />;
  }
}

const mapStateToProps = (state) =>  ({
  options: result(state, 'paymentModal', {}),
  couponStatusPayment: result(state, 'CouponPaymentStatus', ''),
  emoneyAccounts: getEmoneyAccount(result(state, 'accounts', []), 'bp'),
  currentLanguage: result(state, 'currentLanguage', {}),
  isLuckyDipActive: result(state, 'config.flag.flagLuckyDip', 'inactive'),
  isAutoSave: result(state, 'autoSave.isAutoSave', false),
  transfer: result(state, 'autoSave.transfer', false),
  billPay: result(state, 'autoSave.billPay', false),
  saving: result(state, 'autoSave.isSaving', false),
});

const mapDispatchToProps = (dispatch) => ({
  onClose: () => {
    dispatch(setDirtyMiniStatement(true));
    dispatch(NavigationActions.back());
    dispatch(hidePaymentModal());
    dispatch(deleteCouponSuccessStatus());
    dispatch(shouldGiveFeedback());
    dispatch(getBalanceEmoneyBeforeLogin());
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
  goToHHH: () => {
    dispatch(setDirtyMiniStatement(true));
    dispatch(NavigationActions.back());
    dispatch(NavigationActions.navigate({routeName: 'LuckyDipMainPage'}));
    dispatch(hidePaymentModal());
    dispatch(deleteCouponSuccessStatus());
    dispatch(shouldGiveFeedback());
    dispatch(getBalanceEmoneyBeforeLogin());
  },
  goToHHHBeforeLogin: (isBillPayBeforeLogin) => {
    dispatch(refreshStorageNew());
    dispatch(setDirtyMiniStatement(true));
    dispatch(updateUserAfterBillpay(isBillPayBeforeLogin));
    dispatch(NavigationActions.navigate({routeName: 'Landing'}));
    dispatch(NavigationActions.navigate({routeName: 'LuckyDipMainPage'}));
    dispatch(hidePaymentModal());
    dispatch(deleteCouponSuccessStatus());
    return dispatch(shouldGiveFeedback());
  },
  getAutoSaveChecklist: () => get(storageKeys['AUTO_SAVE_CHECKLIST']),
  saveAutoSaveFunc: (isAutoSave, checked) => dispatch(saveAutoSave(isAutoSave, checked)),
});

const connectedCreditCardConfirmation = connect(mapStateToProps, mapDispatchToProps)(PaymentStatusPage);
export default connectedCreditCardConfirmation;
