import React from 'react';
import PropTypes from 'prop-types';
import Cart from '../../components/OnboardingJourney/AlfacartCart.component';

import result from 'lodash/result';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import {addToCartHeader, minusToCartAlfacart, dropFromCartAlfacart, goToLogin, getConfirmProduct, getCheckListAlfaConfirm, addWishlistFromCart, dropWishlistFromCart, getCheckListCMIConfirm, getConfirmProductCMI} from '../../state/thunks/digitalStore.thunks';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';


class ProductDetailPage extends React.Component {
  static propTypes = {
    cartAlfacart: PropTypes.array,
    addQuantity: PropTypes.func,
    minusQuantity: PropTypes.func,
    dropFromCart: PropTypes.func,
    goToLanding: PropTypes.func,
    goToLogin: PropTypes.func,
    simasPoin: PropTypes.object,
    alfacartFreeShippingAfter: PropTypes.object,
    goToCheckout: PropTypes.func,
    getConfirmProduct: PropTypes.func,
    onChangeBoxCheckList: PropTypes.func,
    itemsSelection: PropTypes.array,
    itemsAll: PropTypes.array,
    addWishlistFromCart: PropTypes.func,
    dropWishlistFromCart: PropTypes.func,
    wishlistAlfacart: PropTypes.array,
    cartCMI: PropTypes.array,
    currentMerchant: PropTypes.array,
    wishlistCMI: PropTypes.array,
    onChangeBoxCheckListCMI: PropTypes.func,
    getConfirmProductCMI: PropTypes.func,

  }

  goaddQuantity = (values) => () => {
    const {addQuantity} = this.props;
    addQuantity(values);
  };

  getConfirmProduct=(product) => () => {
    const {getConfirmProduct} = this.props;
    getConfirmProduct(product);
  }

  getConfirmProductCMI=(product) => () => {
    const {getConfirmProductCMI} = this.props;
    getConfirmProductCMI(product);
  }
  render () {
    const {cartAlfacart, minusQuantity, dropFromCart, goToLanding, goToLogin, simasPoin, goToCheckout, onChangeBoxCheckList, itemsSelection, itemsAll, alfacartFreeShippingAfter, addWishlistFromCart, dropWishlistFromCart, wishlistAlfacart, cartCMI, currentMerchant, wishlistCMI, onChangeBoxCheckListCMI} = this.props;
    const sortedList = sortBy(cartAlfacart, 'itemName');
    const sortedListCMI = sortBy(cartCMI, 'itemName');
    return <Cart cartAlfacart={sortedList} addQuantity={this.goaddQuantity} minusQuantity={minusQuantity} dropFromCart={dropFromCart} itemsSelection={itemsSelection} itemsAll={itemsAll}
      goToLanding={goToLanding} goToLogin={goToLogin} simasPoin={simasPoin} goToCheckout={goToCheckout} getConfirmProduct={this.getConfirmProduct} getConfirmProductCMI={this.getConfirmProductCMI} onChangeBoxCheckList={onChangeBoxCheckList}
      alfacartFreeShippingAfter={alfacartFreeShippingAfter} addWishlistFromCart={addWishlistFromCart} dropWishlistFromCart={dropWishlistFromCart} wishlistAlfacart={wishlistAlfacart} cartCMI={sortedListCMI} currentMerchant={currentMerchant} wishlistCMI={wishlistCMI} onChangeBoxCheckListCMI={onChangeBoxCheckListCMI}/>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  addQuantity: (quantity) => {
    dispatch(addToCartHeader(quantity));
  },
  minusQuantity: (product) => () => {
    dispatch(minusToCartAlfacart(product));
  },
  dropFromCart: (product) => () => {
    dispatch(dropFromCartAlfacart(product));
  },
  goToLanding: () => {
    dispatch(NavigationActions.back());
  },
  goToLogin: () => {
    dispatch(goToLogin('alfacart'));
  },
  getConfirmProduct: (product) => {
    dispatch(getConfirmProduct(product));
  },
  getConfirmProductCMI: (product) => {
    dispatch(getConfirmProductCMI(product));
  },
  onChangeBoxCheckList: () => {
    dispatch(getCheckListAlfaConfirm());
  },
  onChangeBoxCheckListCMI: () => {
    dispatch(getCheckListCMIConfirm());
  },
  addWishlistFromCart: (product) => () => {
    dispatch(addWishlistFromCart(product));
  },
  dropWishlistFromCart: (product) => () => {
    dispatch(dropWishlistFromCart(product));
  }
});

const mapStateToProps = (state) => {
  const egiftCart = result(state, 'cartAlfacart', []);
  const alfacartFreeShippingAfter = result(state, 'config.alfacartFreeShippingAfter', '');
  const isStateEmpty = isEmpty(state.appInitKeys);
  const introductionTriggered = result(state, 'introductionTriggered', false);
  const allOffers = result(state, 'promos.offers', []);
  const clickedOffer = find(allOffers, {offerID: {}});
  const billerMenuOrderRevamp = result(state, 'config.billerMenuOrderRevamp', []);
  const billerConfig = result(state, 'billerConfig', {});
  const emoney = result(state, 'emoney', {});
  const itemsSelection = result(state, 'confirmCheckoutAlfaProduct', []);
  const itemsAll = result(state, 'confirmCheckoutAlfaProduct', []);
  const wishlistAlfacart = result(state, 'wishlistAlfacart', []);
  const cartCMI = result(state, 'cartCMI', []);
  const currentMerchant = result(state, 'currentMerchant', []);
  const wishlistCMI = result(state, 'wishlistCMI', []);


  return {
    isLockedDevice: Boolean(state.appInitKeys && state.appInitKeys.username && state.appInitKeys.tokenClient && state.appInitKeys.tokenServer),
    currentLanguage: state.currentLanguage,
    nav: state.nav,
    egiftCart,
    alfacartFreeShippingAfter,
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
    detailProductData: state.detailProduct,
    cartAlfacart: egiftCart,
    itemsSelection,
    itemsAll,
    wishlistAlfacart,
    cartCMI,
    currentMerchant,
    wishlistCMI

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);
