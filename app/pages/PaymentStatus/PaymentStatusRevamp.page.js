import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PaymentStatus from '../../components/PaymentStatus/PaymentStatusRevamp.component';
import {result, isEmpty} from 'lodash';
import {NavigationActions} from 'react-navigation';
import {shouldGiveFeedback} from '../../state/thunks/feedback.thunks';
import {formatBillDetails, formatDataDetailList, getEmoneyAccount, formatDetailsShopeepay} from '../../utils/transformer.util';
import {setDirtyMiniStatement} from '../../state/actions/index.actions';
import {logout} from '../../state/thunks/onboarding.thunks';
import {hidePaymentModal, deleteCouponSuccessStatus, saveAutoSave, clearCcAvailableBalance} from '../../state/actions/index.actions.js';
import {updateUserAfterBillpay, updateEmoneySimasPoin} from '../../state/thunks/genericBill.thunks';
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
    getAutoSaveChecklist: PropTypes.func,
    checked: PropTypes.bool,
    nav: PropTypes.object,
    saveAutoSaveFunc: PropTypes.func,
    isAutoSave: PropTypes.bool,
    transfer: PropTypes.bool,
    billPay: PropTypes.bool,
    saving: PropTypes.bool,
    goToHHH: PropTypes.func,
    goToHHHBeforeLogin: PropTypes.func,
    isLuckyDipActive: PropTypes.string,
    displayListShopee: PropTypes.array,
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
    const {navigation, options, onClose, logoutFunc, couponStatusPayment, goToHHH, goToHHHBeforeLogin, isLuckyDipActive,
      onCloseLogin, onCloseLanding, emoneyAccounts, saveAutoSaveFunc, isAutoSave, transfer, billPay, saving} = this.props;
    const displayList = !isEmpty(result(options, 'resultDisplay', [])) ? typeof (result(options, 'resultDisplay', [])) !== 'string' ? formatBillDetails(result(options, 'resultDisplay', [])) : '' : '';
    const dataDetailList = !isEmpty(result(options, 'dataDetail', [])) ? formatDataDetailList(result(options, 'dataDetail', [])) : '';
    const rawDataDetailList = result(options, 'dataDetail', []);
    const isClosingTd = result(options, 'isClosingTd', '');
    const accountTo = result(navigation, 'accountTo', {});
    const isBillPayBeforeLogin = result(navigation, 'state.params.isBillPay', false);
    const isValas = result(navigation, 'state.params.isValas', false);
    const generalCode = result(options, 'generalCode', '');
    const resDataTrf = result(options, 'resDataTrf', {});
    const resData = result(options, 'resData', {});
    const isFundTransfer = result(options, 'isFundTransfer');
    const currencyObject = result(options, 'currencyRate', {});
    const inputPolis = result(options, 'inputPolis', '');
    const isSilIdrUsd = result(options, 'isSilIdrUsd', '');
    const currencyAcc = result(options, 'accountFrom.currency', '');
    const infoPolis = result(options, 'infoPolis', '');
    const {checked} = this.state;
    const infoPolisStarInvestama = result(options, 'infoPolisStarInvestama', '');
    const displayListShopee = formatDetailsShopeepay(result(navigation, 'state.params.err.data.result.displayList', []));

    return <PaymentStatus onClose={onClose} displayList={displayList}
      couponStatusPayment={couponStatusPayment} dataDetailList={dataDetailList}
      logoutFunc={logoutFunc} isClosingTd={isClosingTd} opions={options}
      accountTo={accountTo} rawDataDetailList={rawDataDetailList} {...options}
      onCloseLogin={onCloseLogin} isBillPayBeforeLogin={isBillPayBeforeLogin}
      goToHHHBeforeLogin={goToHHHBeforeLogin} goToHHH={goToHHH} isLuckyDipActive={isLuckyDipActive}
      onCloseLanding={onCloseLanding} navigation={navigation} emoneyAccounts={emoneyAccounts}
      generalCode={generalCode} isValas={isValas} resDataTrf={resDataTrf} resData={resData} isFundTransfer={isFundTransfer} currencyObject={currencyObject}
      inputPolis={inputPolis} isSilIdrUsd={isSilIdrUsd} currencyAcc={currencyAcc} infoPolis={infoPolis} checked={checked} saveAutoSaveFunc={saveAutoSaveFunc} isAutoSave={isAutoSave} transfer={transfer} billPay={billPay} saving={saving}
      infoPolisStarInvestama={infoPolisStarInvestama} displayListShopee={displayListShopee}/>;
  }
}

const mapStateToProps = (state) => ({
  options: result(state, 'paymentModal', {}),
  couponStatusPayment: result(state, 'CouponPaymentStatus', ''),
  emoneyAccounts: getEmoneyAccount(result(state, 'accounts', []), 'bp'),
  isAutoSave: result(state, 'autoSave.isAutoSave', false),
  transfer: result(state, 'autoSave.transfer', false),
  billPay: result(state, 'autoSave.billPay', false),
  saving: result(state, 'autoSave.isSaving', false),
  isLuckyDipActive: result(state, 'config.flag.flagLuckyDip', 'inactive'),
});

const mapDispatchToProps = (dispatch) => ({
  getAutoSaveChecklist: () => get(storageKeys['AUTO_SAVE_CHECKLIST']),
  saveAutoSaveFunc: (isAutoSave, checked) => dispatch(saveAutoSave(isAutoSave, checked)),
  onClose: () => {
    dispatch(setDirtyMiniStatement(true));
    dispatch(NavigationActions.back());
    dispatch(hidePaymentModal());
    dispatch(deleteCouponSuccessStatus());
    dispatch(shouldGiveFeedback());
    dispatch(clearCcAvailableBalance());
    dispatch(updateEmoneySimasPoin());
  },
  onCloseLogin: (isBillPayBeforeLogin) => {
    dispatch(refreshStorageNew());
    dispatch(setDirtyMiniStatement(true));
    dispatch(updateUserAfterBillpay(isBillPayBeforeLogin));
    dispatch(NavigationActions.navigate({routeName: 'Landing'}));
    dispatch(hidePaymentModal());
    dispatch(deleteCouponSuccessStatus());
    dispatch(clearCcAvailableBalance());
    dispatch(updateEmoneySimasPoin());
    return dispatch(shouldGiveFeedback());
  },
  goToHHH: () => {
    dispatch(setDirtyMiniStatement(true));
    dispatch(NavigationActions.back());
    dispatch(NavigationActions.navigate({routeName: 'LuckyDipMainPage'}));
    dispatch(hidePaymentModal());
    dispatch(deleteCouponSuccessStatus());
    dispatch(shouldGiveFeedback());
    dispatch(updateEmoneySimasPoin());
    dispatch(clearCcAvailableBalance());
  },
  goToHHHBeforeLogin: (isBillPayBeforeLogin) => {
    dispatch(refreshStorageNew());
    dispatch(setDirtyMiniStatement(true));
    dispatch(updateUserAfterBillpay(isBillPayBeforeLogin));
    dispatch(NavigationActions.navigate({routeName: 'Landing'}));
    dispatch(NavigationActions.navigate({routeName: 'LuckyDipMainPage'}));
    dispatch(hidePaymentModal());
    dispatch(deleteCouponSuccessStatus());
    dispatch(clearCcAvailableBalance());
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
    dispatch(clearCcAvailableBalance());
    return dispatch(shouldGiveFeedback());
  },
  logoutFunc: () => {
    dispatch(NavigationActions.back());
    dispatch(deleteCouponSuccessStatus());
    dispatch(clearCcAvailableBalance());
    setTimeout(() => {
      dispatch(logout());
    }, 0);
  },
  functionDeleteCouponState: () => {
    dispatch(deleteCouponSuccessStatus());
  },
});

const connectedCreditCardConfirmation = connect(mapStateToProps, mapDispatchToProps)(PaymentStatusPage);
export default connectedCreditCardConfirmation;
