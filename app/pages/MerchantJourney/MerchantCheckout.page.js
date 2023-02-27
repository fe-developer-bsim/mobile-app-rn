import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AlfacartCheckout from '../../components/MerchantJourney/MerchantCheckout.component';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import map from 'lodash/map';
import {filter, size, uniq} from 'lodash';
import {listCategoryProduct, seeAllCategory, goToShipping, goToCheckout} from '../../state/thunks/digitalStore.thunks';
import {loginToEgift, clearAndResetPasswordBurgerMenu, logout} from '../../state/thunks/onboarding.thunks';
import {validatePinCodeLength} from '../../utils/validator.util';
import {reduxForm} from 'redux-form';
import LoginEasyPinForm from '../../components/Egift/EgiftLogin.component';
import {NavigationActions} from 'react-navigation';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';
import {checkoutPurchaseOrder, listaddress, couponCustomerMerchant} from '../../state/thunks/digitalStore.thunks';

const formConfig = {
  form: 'checkoutForm',
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

const mapStateToProps = (state) =>  {
  const isStateEmpty = isEmpty(state.appInitKeys);
  const introductionTriggered = result(state, 'introductionTriggered', false);
  const allOffers = result(state, 'promos.offers', []);
  const clickedOffer = find(allOffers, {offerID: {}});
  const billerMenuOrderRevamp = result(state, 'config.billerMenuOrderRevamp', []);
  const billerConfig = result(state, 'billerConfig', {});
  const emoney = result(state, 'emoney', {});
  return {
    isLockedDevice: Boolean(state.appInitKeys && state.appInitKeys.username && state.appInitKeys.tokenClient && state.appInitKeys.tokenServer),
    currentLanguage: state.currentLanguage,
    nav: state.nav,
    isStateEmpty,
    introductionTriggered,
    state,
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
    formValues: result(state, 'form.checkoutForm.values', {}),
    accountList: getTransferPossibleAccounts(result(state, 'accounts', []), 'ft'),
    checkoutList: result(state, 'merchantCart', []),
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
    dispatch(goToShipping());
  },
  forgotEasyPin: () => {
    dispatch(clearAndResetPasswordBurgerMenu());
  },
  getSourceAcc: (payee, isTopup) => {
    dispatch(NavigationActions.navigate({
      routeName: 'AlfaSourceAccount',
      params: {formName: 'checkoutForm', fieldName: 'myAccount', sourceType: 'fundTransfer', payee: payee, isTopup: isTopup}
    }));
  },
  getSelectShipping: (payee) => {
    dispatch(NavigationActions.navigate({
      routeName: 'AlfacartShippingMethod',
      params: {formName: 'checkoutForm', fieldName: 'shippingAddress', payee: payee}
    }));
  },
  goPayment: (formValues, totalAll, subscriberNoInput) => dispatch(checkoutPurchaseOrder(formValues, totalAll, subscriberNoInput)),
  getListShipping: () => {
    dispatch(listaddress());
  },
  goToLanding: () => {
    dispatch(logout());
  },
  couponCustomerMerchant: (amount, billerCode) => {
    dispatch(couponCustomerMerchant(amount, billerCode));
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
    getListShipping: PropTypes.func,
    goToLanding: PropTypes.func,
    couponCustomerMerchant: PropTypes.func
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
    const {getSelectShipping, navigation} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    getSelectShipping(payee);
  }

  componentWillMount=() => {
    this.props.getListShipping();
  }

  couponCustomerMerchantView=() => {
    const {checkoutList} = this.props;
    let totalByProduct = 0;
    forEach(checkoutList, (value) => {
      const amount = Number(result(value, 'items.price', ''));
      totalByProduct = totalByProduct + amount;
    });
    this.props.couponCustomerMerchant(totalByProduct, '1920');
  }

  render () {
    const {nav, goToAlfacart, listAllProductData, categoryData, goToDetail,
      goToDetailCategory, seeAllCategory, forgotEasyPin, formValues, goToLanding, navigation, checkoutList, goPayment} = this.props;
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
      <AlfacartCheckout goToDetail={goToDetail} nav={nav} navigateTo={this.navigateTo}
        goToAlfacart={goToAlfacart} categoryData={categoryData} couponCustomerMerchantView={this.couponCustomerMerchantView}
        listAllProductData={listAllProductData} dataCategory={dataCategory} subscriberNoInput={subscriberNoInput}
        listCategoryProduct={listCategoryProduct} goToDetailCategory={goToDetailCategory} goToLanding={goToLanding}
        seeAllCategory={seeAllCategory} goToShipping={this.selectShipping} DecoratedForm={DecoratedForm} forgotEasyPin={forgotEasyPin} getSourceAcc={this.selectSourceAcc} formValues={formValues} checkoutList={filterPurchaseOrder} goPayment={goPayment} totalByProduct={totalByProduct}/>
    );
  }
}

const ConnectedAlfaCartCheckoutPage = connect(mapStateToProps, mapDispatchToProps)(AlfaCartCheckoutPage);
export default ConnectedAlfaCartCheckoutPage;
