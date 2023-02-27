
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AlfacartCheckout from '../../components/OnboardingJourney/AlfacartCheckout.component';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import map from 'lodash/map';
import {filter, size, uniq} from 'lodash';
import {listCategoryProduct, seeAllCategory, goToCheckout} from '../../state/thunks/digitalStore.thunks';
import {loginToEgift, clearAndResetPasswordBurgerMenu, logout} from '../../state/thunks/onboarding.thunks';
import {validatePinCodeLength} from '../../utils/validator.util';
import {reduxForm} from 'redux-form';
import LoginEasyPinForm from '../../components/Egift/EgiftLogin.component';
import {NavigationActions} from 'react-navigation';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';
import {checkoutPurchaseOrderAlfacart, listaddressAlfa, couponCustomerMerchant, deleteBuyItems, getVoucherAlfa, triggerAuthBillpayAlfa} from '../../state/thunks/digitalStore.thunks';
import {removeCoupon} from '../../state/thunks/common.thunks';


const formConfig = {
  form: 'alfaCheckoutForm',
  destroyOnUnmount: true,
  initialValues: {
    myAccount: {},
    shippingAddress: {},
    vouchers: {},
    easyPin: '',
  },
  onSubmit: (values, dispatch, {isLockedDevice, triggerAuthEgift}) => {
    const params = {onSubmit: goToCheckout, amount: 0, isOtp: false};
    dispatch(triggerAuthEgift(params));
    dispatch(loginToEgift(values, isLockedDevice));


  },
  validate: (values) => ({
    _error: validatePinCodeLength(values['easyPin'])
  }),
};

const DecoratedForm = reduxForm(formConfig)(LoginEasyPinForm);

const mapStateToProps = (state) => {
  const isStateEmpty = isEmpty(state.appInitKeys);
  const introductionTriggered = result(state, 'introductionTriggered', false);
  const allOffers = result(state, 'promos.offers', []);
  const clickedOffer = find(allOffers, {offerID: {}});
  const billerMenuOrderRevamp = result(state, 'config.billerMenuOrderRevamp', []);
  const billerConfig = result(state, 'billerConfig', {});
  const emoney = result(state, 'emoney', {});
  const currentMerchant = result(state, 'currentMerchant', []);
  // const checkoutListTest = result(state, 'confirmCheckoutAlfaProduct', []);
  // const saveResultStockAlfaTest = result(state, 'saveResultStockAlfa', []);
  return {
    isLockedDevice: Boolean(state.appInitKeys && state.appInitKeys.username && state.appInitKeys.tokenClient && state.appInitKeys.tokenServer),
    currentLanguage: state.currentLanguage,
    nav: state.nav,
    isStateEmpty,
    introductionTriggered,
    state,
    currentMerchant,
    clickedOffer,
    egiftList: state.egiftList,
    simasPoin: state.simasPoin,
    isDeeplinkExist: state.isDeeplinkExist,
    billerMenuOrderRevamp,
    billerConfig,
    emoney,
    listAllProductData: state.listAllProduct,
    categoryData: state.category,
    listCategoryProduct,
    formValues: result(state, 'form.alfaCheckoutForm.values', {}),
    accountList: getTransferPossibleAccounts(result(state, 'accounts', []), 'ft'),
    checkoutList: result(state, 'confirmCheckoutAlfaProduct', []),
    couponUse: result(state, 'couponCheck', ''),
    saveResultStockAlfa: result(state, 'saveResultStockAlfa', []),
    currency: result(state, 'couponCheck.currency', 'simaspoin'),
  };
};

const mapDispatchToProps = (dispatch) => ({
  goToDetailCategory: (categoryCode) => {
    dispatch(listCategoryProduct(categoryCode));
  },
  seeAllCategory: () => {
    dispatch(seeAllCategory());
  },
  goToShipping: () => {
    dispatch(listaddressAlfa());
  },
  forgotEasyPin: () => {
    dispatch(clearAndResetPasswordBurgerMenu());
  },
  getSourceAcc: (payee, isTopup) => {
    dispatch(NavigationActions.navigate({
      routeName: 'AlfaSourceAccount',
      params: {formName: 'alfaCheckoutForm', fieldName: 'myAccount', sourceType: 'fundTransfer', payee: payee, isTopup: isTopup, simasAlfaCart: true}
    }));
  },
  getSelectShipping: (payee) => {
    dispatch(NavigationActions.navigate({
      routeName: 'AlfacartShippingMethodReal',
      params: {formName: 'alfaCheckoutForm', fieldName: 'shippingAddress', payee: payee}
    }));
  },
  // check coupon + nnext step alfa
  goPayment: (formValues, totalAll, totalByProduct, isSyariah, isUseSimas) => {
    const paramDispatch = () => dispatch(checkoutPurchaseOrderAlfacart(formValues, totalAll, 'alfacart'));
    dispatch(triggerAuthBillpayAlfa(totalByProduct, paramDispatch, isSyariah, isUseSimas));
  },
  goToLanding: () => {
    dispatch(logout());
  },
  couponCustomerMerchant: (amount, billerCode) => {
    dispatch(couponCustomerMerchant(amount, billerCode));
  },
  removeCoupon: () => dispatch(removeCoupon()),
  deleteOnconfrimItems: (value, formValues) => () => {
    dispatch(deleteBuyItems(value, formValues));
  },
  getVoucher: (amount) => {
    dispatch(getVoucherAlfa(String(amount)));
  }
});


class AlfaCartCheckoutPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    isStateEmpty: PropTypes.bool,
    nav: PropTypes.object,
    goToDetail: PropTypes.func,
    goToAlfacart: PropTypes.func,
    categoryData: PropTypes.array,
    detailCategory: PropTypes.func,
    listAllProductData: PropTypes.array,
    goToDetailCategory: PropTypes.func,
    seeAllCategory: PropTypes.func,
    goToShipping: PropTypes.func,
    forgotEasyPin: PropTypes.func,
    goToCheckout: PropTypes.func,
    getSourceAcc: PropTypes.func,
    formValues: PropTypes.object,
    getSelectShipping: PropTypes.func,
    checkoutList: PropTypes.array,
    goPayment: PropTypes.func,
    goToLanding: PropTypes.func,
    couponCustomerMerchant: PropTypes.func,
    couponUse: PropTypes.object,
    removeCoupon: PropTypes.func,
    pickAddres: PropTypes.func,
    saveResultStockAlfa: PropTypes.array,
    deleteOnconfrimItems: PropTypes.func,
    getVoucher: PropTypes.func,
    currency: PropTypes.string,
    currentMerchant: PropTypes.array,

  }

  state = {
    value: false,
  }

  selectSourceAcc = () => {
    const {getSourceAcc, navigation} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const isTopup = result(payee, 'accountType', '') === 'emoneyAccount' && result(payee, 'transferType', '') === 'own';
    getSourceAcc(payee, isTopup);
  }

  selectShipping = () => {
    const {goToShipping} = this.props;
    goToShipping();
  }

  componentDidMount=() => {
    this.getvoucherAlfaCheckout();
  }

  getvoucherAlfaCheckout=() => {
    const {getVoucher, checkoutList} = this.props;
    let totalByProduct = 0;
    forEach(checkoutList, (value) => {
      const amount = Number(result(value, 'items.price', ''));
      totalByProduct = totalByProduct + amount;
    });
    getVoucher(totalByProduct);
  }

  couponCustomerMerchantView=() => {
    const {checkoutList} = this.props;
    let totalByProduct = 0;
    forEach(checkoutList, (value) => {
      const amount = Number(result(value, 'items.price', ''));
      totalByProduct = totalByProduct + amount;
    });
    this.props.couponCustomerMerchant(totalByProduct, '990003');
  }

  render () {
    const {nav, goToAlfacart, listAllProductData, categoryData, goToDetail, couponUse, removeCoupon, saveResultStockAlfa, deleteOnconfrimItems,
      goToDetailCategory, seeAllCategory, forgotEasyPin, formValues, goToLanding, navigation, checkoutList, goPayment, pickAddres, currency, currentMerchant} = this.props;
    const dataCategory = result(categoryData, 'Array', []);
    let totalByProduct = 0;
    forEach(checkoutList, (value) => {
      const amount = Number(result(value, 'items.price', ''));
      totalByProduct = totalByProduct + amount;
    });
    const products = uniq(checkoutList);
    const filterPurchaseOrder = map(products, function (value) {
      const firstDataId = result(value, 'items.productId', '');
      const countQuantity = size(filter(checkoutList, function (val) {
        const firstCounting = result(val, 'items.productId', '');
        return firstDataId === firstCounting;
      }));
      const productExist = result(value, 'items', {});
      const finalReturn = {items: productExist, quantity: countQuantity};
      return finalReturn;
    });
    const subscriberNoInput = result(navigation, 'state.params.subscriberNoInput', '');
    return (
      <AlfacartCheckout goToDetail={goToDetail} nav={nav} navigateTo={this.navigateTo} couponUse={couponUse} removeCoupon={removeCoupon}
        goToAlfacart={goToAlfacart} categoryData={categoryData} couponCustomerMerchantView={this.couponCustomerMerchantView}
        listAllProductData={listAllProductData} dataCategory={dataCategory} subscriberNoInput={subscriberNoInput} saveResultStockAlfa={saveResultStockAlfa}
        listCategoryProduct={listCategoryProduct} goToDetailCategory={goToDetailCategory} goToLanding={goToLanding}
        seeAllCategory={seeAllCategory} goToShipping={this.selectShipping} DecoratedForm={DecoratedForm} forgotEasyPin={forgotEasyPin}
        getSourceAcc={this.selectSourceAcc} formValues={formValues} checkoutList={filterPurchaseOrder} goPayment={goPayment}
        totalByProduct={totalByProduct} pickAddres={pickAddres} deleteOnconfrimItems={deleteOnconfrimItems} currency={currency} currentMerchant={currentMerchant} />
    );
  }
}

const ConnectedAlfaCartCheckoutPage = connect(mapStateToProps, mapDispatchToProps)(AlfaCartCheckoutPage);
export default ConnectedAlfaCartCheckoutPage;