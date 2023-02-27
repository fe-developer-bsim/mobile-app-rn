import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import WishlistAlfacart from '../../components/OnboardingJourney/WishlistAlfacart.component';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import find from 'lodash/find';
import {size, filter} from 'lodash';
import {listProductAlfacart, listCategoryProductAlfacart, seeAllCategoryAlfacart, detailProductAlfacart, addToCartFromWishlist, storageAlfacart, buyNowDashboard, dropFromWishlist, productAlreadyAlfacart} from '../../state/thunks/digitalStore.thunks';
import {saveCategory} from '../../state/actions/index.actions';

const mapStateToProps = (state) => {
  const isStateEmpty = isEmpty(state.appInitKeys);
  const introductionTriggered = result(state, 'introductionTriggered', false);
  const allOffers = result(state, 'promos.offers', []);
  const clickedOffer = find(allOffers, {offerID: {}});
  const billerMenuOrderRevamp = result(state, 'config.billerMenuOrderRevamp', []);
  const billerConfig = result(state, 'billerConfig', {});
  const emoney = result(state, 'emoney', {});
  const allCart = result(state, 'cartAlfacart', []);
  const itemsAll = result(state, 'confirmCheckoutAlfaProduct', []);
  const cartCMI = result(state, 'cartCMI', []);
  const wishlistCMI = result(state, 'wishlistCMI', []);
  const currentMerchant = result(state, 'currentMerchant', []);


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
    wishlistAlfacartData: state.wishlistAlfacart,
    categoryData: state.category,
    listCategoryProductAlfacart,
    saleproductAlfacart: state.saleproductAlfacart,
    allCart,
    itemsAll,
    cartCMI,
    wishlistCMI,
    currentMerchant,
  };
};

const mapDispatchToProps = (dispatch) => ({
  listProduct: () => {
    dispatch(listProductAlfacart());
  },
  saveCategory: () => {
    dispatch(saveCategory());
  },
  goToDetailCategory: (categoryCode) => {
    dispatch(listCategoryProductAlfacart(categoryCode));
  },
  seeAllCategory: () => {
    dispatch(seeAllCategoryAlfacart());
  },
  detailProduct: (item) => () => {
    dispatch(detailProductAlfacart(item));
  },
  addToCart: (item) => {
    dispatch(addToCartFromWishlist(item));
  },
  buyNowDashboard: (item) => {
    dispatch(buyNowDashboard(item));
  },
  dropFromWishlist: (item) => () => {
    dispatch(dropFromWishlist(item));
  },
  productAlreadyAlfacart: () => () => {
    dispatch(productAlreadyAlfacart());
  }
});

class AlfaCartPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    isStateEmpty: PropTypes.bool,
    nav: PropTypes.object,
    goToDetail: PropTypes.func,
    goToAlfacart: PropTypes.func,
    listProduct: PropTypes.func,
    categoryData: PropTypes.array,
    detailCategory: PropTypes.func,
    wishlistAlfacartData: PropTypes.array,
    saleproductAlfacart: PropTypes.array,
    goToDetailCategory: PropTypes.func,
    seeAllCategory: PropTypes.func,
    detailProduct: PropTypes.func,
    addToCart: PropTypes.func,
    buyNowDashboard: PropTypes.func,
    allCart: PropTypes.array,
    itemsAll: PropTypes.array,
    dropFromWishlist: PropTypes.func,
    productAlreadyAlfacart: PropTypes.func,
    cartCMI: PropTypes.array,
    wishlistCMI: PropTypes.array,
    currentMerchant: PropTypes.array,

  }

  state = {
    quantity: 1,
    totalAmount: 0,
    value: false,
    error: {},
    visible: false,
    targetItems: {}
  }

  addQuantity = () => {
    this.setState({quantity: this.state.quantity + 1});
  }

  minusQuantity = () => {
    this.setState({quantity: this.state.quantity - 1});
  }
  tickOverlay = (code) => () => {
    const {allCart, wishlistAlfacartData} = this.props;
    const filterProductExist = size(filter(allCart, function (o) {
      return o.items.productId === code;
    }));
    const selectionDataItems = find(wishlistAlfacartData, function (o) {

      return o.productId === code;
    });

    this.setState({quantity: filterProductExist === 0 ? 1 : filterProductExist});
    this.setState({visible: !this.state.visible});
    this.setState({targetItems: selectionDataItems});
  }

  tickOverlayCMI = (code) => () => {
    const {cartCMI, wishlistCMI} = this.props;
    const filterProductExist = size(filter(cartCMI, function (o) {
      return o.items.productId === code;
    }));
    const selectionDataItems = find(wishlistCMI, function (o) {

      return o.productId === code;
    });

    this.setState({quantity: filterProductExist === 0 ? 1 : filterProductExist});
    this.setState({visible: !this.state.visible});
    this.setState({targetItems: selectionDataItems});
  }

  tickOnclose = () => {
    this.setState({visible: false});
  }

  addToCartFunc = () => {
    const {addToCart} = this.props;
    const {quantity, targetItems} = this.state;
    const bunch = {items: targetItems, quantity};
    addToCart(bunch);
    this.tickOnclose();
  }
  buyNowDashboardFunc = () => {
    const {buyNowDashboard} = this.props;
    const {quantity, targetItems} = this.state;
    const bunch = {items: targetItems, quantity};
    buyNowDashboard(bunch);
    this.tickOnclose();
  }

  render () {
    const {nav, goToAlfacart, wishlistAlfacartData, wishlistCMI, categoryData, goToDetail, allCart, cartCMI, 
      goToDetailCategory, seeAllCategory, detailProduct, saleproductAlfacart, itemsAll, dropFromWishlist, productAlreadyAlfacart, currentMerchant} = this.props;
    const dataCategory = result(categoryData, 'Array', []);
    const {quantity} = this.state;

    return (
      <WishlistAlfacart goToDetail={goToDetail} nav={nav} navigateTo={this.navigateTo}
        goToAlfacart={goToAlfacart} listProduct={listProductAlfacart} categoryData={categoryData}
        wishlistAlfacartData={wishlistAlfacartData} dataCategory={dataCategory}
        listCategoryProduct={listCategoryProductAlfacart} goToDetailCategory={goToDetailCategory}
        seeAllCategory={seeAllCategory} addQuantity={this.addQuantity}
        minusQuantity={this.minusQuantity} detailProduct={detailProduct} quantity={quantity}
        addToCart={this.addToCartFunc} saleproductAlfacart={saleproductAlfacart}
        visible={this.state.visible} tickOverlay={this.tickOverlay} tickOverlayCMI={this.tickOverlayCMI} tickOnclose={this.tickOnclose}
        allCart={allCart} storageAlfacart={storageAlfacart}
        buyNowDashboard={this.buyNowDashboardFunc} itemsAll={itemsAll} dropFromWishlist={dropFromWishlist}
        productAlreadyAlfacart={productAlreadyAlfacart} cartCMI={cartCMI} wishlistCMI={wishlistCMI} currentMerchant={currentMerchant}/>
    );
  }
}

const ConnectedAlfaCartPage = connect(mapStateToProps, mapDispatchToProps)(AlfaCartPage);
export default ConnectedAlfaCartPage;
