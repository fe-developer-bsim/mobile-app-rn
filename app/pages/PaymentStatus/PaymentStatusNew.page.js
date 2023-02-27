import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PaymentStatus from '../../components/PaymentStatus/PaymentStatusNew.component';
import {result, isEmpty} from 'lodash';
import {NavigationActions} from 'react-navigation';
import {shouldGiveFeedback} from '../../state/thunks/feedback.thunks';
import {formatBillDetails, formatDataDetailList, getEmoneyAccount, formatDetailsShopeepay} from '../../utils/transformer.util';
import {setDirtyMiniStatement, saveAutoSave} from '../../state/actions/index.actions';
import {logout} from '../../state/thunks/onboarding.thunks';
import {hidePaymentModal, deleteCouponSuccessStatus, clearCcAvailableBalance} from '../../state/actions/index.actions.js';
import {goToSplitBillFromTransaction} from '../../state/thunks/splitBill.thunks';
// import {loginAfterBillpay} from '../../state/thunks/genericBill.thunks';
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
    goToSplitBill: PropTypes.func,
    savingProductType: PropTypes.string,
    currencySavingValas: PropTypes.string,
    formValuesSavingValas: PropTypes.object,
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
    const {navigation, options, onClose, logoutFunc, couponStatusPayment,
      onCloseLogin, onCloseLanding, emoneyAccounts, goToSplitBill, goToHHH, goToHHHBeforeLogin, isLuckyDipActive, saveAutoSaveFunc, isAutoSave, transfer, billPay, saving, savingProductType, currencySavingValas, formValuesSavingValas} = this.props;
    const displayList = !isEmpty(result(options, 'resultDisplay', [])) ? typeof (result(options, 'resultDisplay', [])) !== 'string' ? formatBillDetails(result(options, 'resultDisplay', [])) : '' : '';
    const dataDetailList = !isEmpty(result(options, 'dataDetail', [])) ? formatDataDetailList(result(options, 'dataDetail', [])) : '';
    const rawDataDetailList = result(options, 'dataDetail', []);
    const isClosingTd = result(options, 'isClosingTd', '');
    const inputPolis = result(options, 'inputPolis', '');
    const accountTo = result(navigation, 'accountTo', {});
    const isBillPayBeforeLogin = result(navigation, 'state.params.isBillPay', false);
    const isSplitBill = result(navigation, 'state.params.isSplitBill');
    const isSilIdrUsd = result(options, 'isSilIdrUsd', '');
    const totalFee = result(navigation, 'state.params.totalFee');
    const isBuyReksadana = result(navigation, 'state.params.isBuyReksadana');
    const isSellReksadana = result(navigation, 'state.params.isSellReksadana');
    const detailPortfolio = result(options, 'item.detailPortfolio', {});
    const isResponseUnit = result(options, 'responseUnit', '');
    const {checked} = this.state;
    const displayListShopee = formatDetailsShopeepay(result(navigation, 'state.params.err.data.result.displayList', []));

    return <PaymentStatus onClose={onClose} displayList={displayList}
      couponStatusPayment={couponStatusPayment} dataDetailList={dataDetailList}
      logoutFunc={logoutFunc} isClosingTd={isClosingTd} opions={options}
      accountTo={accountTo} rawDataDetailList={rawDataDetailList} {...options}
      goToHHHBeforeLogin={goToHHHBeforeLogin} goToHHH={goToHHH} isLuckyDipActive={isLuckyDipActive}
      onCloseLogin={onCloseLogin} isBillPayBeforeLogin={isBillPayBeforeLogin}
      onCloseLanding={onCloseLanding} navigation={navigation} emoneyAccounts={emoneyAccounts}
      inputPolis={inputPolis} isSilIdrUsd={isSilIdrUsd} totalFee={totalFee} isBuyReksadana={isBuyReksadana} isSellReksadana={isSellReksadana} detailPortfolio={detailPortfolio}
      isResponseUnit={isResponseUnit} goToSplitBill={goToSplitBill} isSplitBill={isSplitBill}
      checked={checked} saveAutoSaveFunc={saveAutoSaveFunc} isAutoSave={isAutoSave} transfer={transfer} billPay={billPay} saving={saving}
      savingProductType={savingProductType} currencySavingValas={currencySavingValas} formValuesSavingValas={formValuesSavingValas} displayListShopee={displayListShopee}
    />;
  }
}

const mapStateToProps = (state) => ({
  options: result(state, 'paymentModal', {}),
  couponStatusPayment: result(state, 'CouponPaymentStatus', ''),
  emoneyAccounts: getEmoneyAccount(result(state, 'accounts', []), 'bp'),
  savingProductType: result(state, 'productData.productType', ''),
  currencySavingValas: result(state, 'productItems.currencySavingValas', ''),
  formValuesSavingValas: result(state, 'dataConvertSimasValas.dataConvertValas', {}),
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
    dispatch(updateEmoneySimasPoin());
    dispatch(clearCcAvailableBalance());
  },
  onCloseLogin: (isBillPayBeforeLogin) => {
    dispatch(refreshStorageNew());
    dispatch(setDirtyMiniStatement(true));
    dispatch(updateUserAfterBillpay(isBillPayBeforeLogin));
    dispatch(NavigationActions.navigate({routeName: 'Landing'}));
    dispatch(hidePaymentModal());
    dispatch(deleteCouponSuccessStatus());
    dispatch(updateEmoneySimasPoin());
    dispatch(clearCcAvailableBalance());
    return dispatch(shouldGiveFeedback());

  },
  goToHHH: () => {
    dispatch(setDirtyMiniStatement(true));
    dispatch(NavigationActions.back());
    dispatch(NavigationActions.navigate({routeName: 'LuckyDipMainPage'}));
    dispatch(hidePaymentModal());
    dispatch(deleteCouponSuccessStatus());
    dispatch(shouldGiveFeedback());
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
  goToSplitBill: () => {
    dispatch(goToSplitBillFromTransaction());
  }
});

const connectedCreditCardConfirmation = connect(mapStateToProps, mapDispatchToProps)(PaymentStatusPage);
export default connectedCreditCardConfirmation;
