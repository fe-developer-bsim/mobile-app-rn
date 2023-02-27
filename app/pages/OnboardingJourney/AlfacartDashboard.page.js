import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AlfacartDashboard from '../../components/OnboardingJourney/AlfacartDashboard.component';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import find from 'lodash/find';
import {size, filter} from 'lodash';
import {listProductAlfacart, listCategoryProductAlfacart, seeAllCategoryAlfacart, detailProductAlfacart, addToCartAlfacart, wishlistDetailAlfacart, storageAlfacart, buyNowDashboard, goToCartAlfacart, categoryDashboard, goToPageAlfa, listAllProductAlfacart, dropFromWishlist, storageWishlistAlfacart, productAlreadyAlfacart, storageCartCMI, storageWishlistCMI} from '../../state/thunks/digitalStore.thunks';
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
  const wishlistAlfacart = result(state, 'wishlistAlfacart', []);
  const itemsAll = result(state, 'confirmCheckoutAlfaProduct', []);
  const paginationAlfaDashboard = result(state, 'paginationAlfaDashboard', {});
  const currentMerchant = result(state, 'currentMerchant', []);
  const wishlistCMI = result(state, 'wishlistCMI', []);
  const cartCMI = result(state, 'cartCMI', []);

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
    categoryData: state.categoryAlfacart,
    listCategoryProductAlfacart,
    saleproductAlfacart: state.saleproductAlfacart,
    wishlistAlfacart,
    allCart,
    itemsAll,
    paginationAlfaDashboard,
    category: state.category,
    currentMerchant,
    wishlistCMI,
    cartCMI

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
    dispatch(addToCartAlfacart(item));
  },
  buyNowDashboard: (item) => {
    dispatch(buyNowDashboard(item));
  },
  wishlistDetailAlfacart: (item) => dispatch(wishlistDetailAlfacart(item)),

  storageAlfacart: () => dispatch(storageAlfacart()),
  storageWishlistAlfacart: () => dispatch(storageWishlistAlfacart()),
  storageCartCMI: () => dispatch(storageCartCMI()),
  storageWishlistCMI: () => dispatch(storageWishlistCMI()),
  goToCartAlfacart: () => {
    dispatch(goToCartAlfacart());
  },
  categoryDashboard: (code) => () => {
    dispatch(categoryDashboard(code));
  },
  goToPage: (value) => () => {
    dispatch(goToPageAlfa(value));
  },
  listAllProductAlfacart: () => {
    dispatch(listAllProductAlfacart());
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
    listAllProductData: PropTypes.array,
    saleproductAlfacart: PropTypes.array,
    goToDetailCategory: PropTypes.func,
    seeAllCategory: PropTypes.func,
    detailProduct: PropTypes.func,
    addToCart: PropTypes.func,
    buyNowDashboard: PropTypes.func,
    addToWishlist: PropTypes.func,
    allCart: PropTypes.array,
    cartCMI: PropTypes.array,
    itemsAll: PropTypes.array,
    goToCartAlfacart: PropTypes.func,
    wishlistDetailAlfacart: PropTypes.func,
    categoryDashboard: PropTypes.fun,
    storageAlfacart: PropTypes.func,
    storageWishlistAlfacart: PropTypes.func,
    storageCartCMI: PropTypes.func,
    storageWishlistCMI: PropTypes.func,
    paginationAlfaDashboard: PropTypes.object,
    goToPage: PropTypes.func,
    listAllProductAlfacart: PropTypes.func,
    dropFromWishlist: PropTypes.func,
    wishlistAlfacart: PropTypes.array,
    productAlreadyAlfacart: PropTypes.func,
    category: PropTypes.array,
    currentMerchant: PropTypes.array,
    wishlistCMI: PropTypes.array,


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
    const {allCart, listAllProductData} = this.props;
    const filterProductExist = size(filter(allCart, function (o) {
      return o.items.productId === code;
    }));
    const selectionDataItems = find(listAllProductData, function (o) {
      return o.productId === code;
    });

    this.setState({quantity: filterProductExist === 0 ? 1 : filterProductExist});
    this.setState({visible: !this.state.visible});
    this.setState({targetItems: selectionDataItems});
  }

  tickOverlayCMI = (code) => () => {
    const {cartCMI, listAllProductData} = this.props;
    const filterProductExist = size(filter(cartCMI, function (o) {
      return o.items.productId === code;
    }));
    const selectionDataItems = find(listAllProductData, function (o) {
      return o.productId === code;
    });

    this.setState({quantity: filterProductExist === 0 ? 1 : filterProductExist});
    this.setState({visible: !this.state.visible});
    this.setState({targetItems: selectionDataItems});
  }

  tickOnclose = () => {
    this.setState({visible: false});
  }

  wishlistDetailAlfacartFunc = (items) => () => {
    const {wishlistDetailAlfacart} = this.props;
    wishlistDetailAlfacart(items);
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

  componentDidMount () {
    const {storageAlfacart, storageWishlistAlfacart, storageCartCMI, storageWishlistCMI} = this.props;
    storageAlfacart();
    storageWishlistAlfacart();
    storageCartCMI();
    storageWishlistCMI();
  }
  render () {
    const {nav, goToAlfacart, listAllProductData, categoryData, goToDetail, allCart, cartCMI, paginationAlfaDashboard, goToPage,
      goToDetailCategory, seeAllCategory, detailProduct, saleproductAlfacart, addToWishlist,
      itemsAll, goToCartAlfacart, categoryDashboard, listAllProductAlfacart, dropFromWishlist, wishlistAlfacart, productAlreadyAlfacart, category, currentMerchant, wishlistCMI} = this.props;
    const dataCategory = result(categoryData, 'Array', []);
    const {quantity} = this.state;

    return (
      <AlfacartDashboard goToDetail={goToDetail} nav={nav} navigateTo={this.navigateTo}
        goToAlfacart={goToAlfacart} listProduct={listProductAlfacart} categoryData={categoryData}
        listAllProductData={listAllProductData} dataCategory={dataCategory} paginationAlfaDashboard={paginationAlfaDashboard}
        listCategoryProduct={listCategoryProductAlfacart} goToDetailCategory={goToDetailCategory}
        seeAllCategory={seeAllCategory} addQuantity={this.addQuantity} goToPage={goToPage}
        minusQuantity={this.minusQuantity} detailProduct={detailProduct} quantity={quantity}
        addToCart={this.addToCartFunc} saleproductAlfacart={saleproductAlfacart}
        visible={this.state.visible} tickOverlay={this.tickOverlay} tickOverlayCMI={this.tickOverlayCMI} tickOnclose={this.tickOnclose}
        addToWishlist={addToWishlist} allCart={allCart} cartCMI={cartCMI} storageAlfacart={storageAlfacart} storageWishlistAlfacart={storageWishlistAlfacart}
        buyNowDashboard={this.buyNowDashboardFunc} itemsAll={itemsAll} goToCartAlfacart={goToCartAlfacart}
        wishlistDetailAlfacart={this.wishlistDetailAlfacartFunc} categoryDashboard={categoryDashboard}
        listAllProductAlfacart={listAllProductAlfacart} dropFromWishlist={dropFromWishlist} wishlistAlfacart={wishlistAlfacart} wishlistCMI={wishlistCMI}
        productAlreadyAlfacart={productAlreadyAlfacart} category={category} currentMerchant={currentMerchant} storageCartCMI={storageCartCMI} storageWishlistCMI={storageWishlistCMI} />
    );
  }
}

const ConnectedAlfaCartPage = connect(mapStateToProps, mapDispatchToProps)(AlfaCartPage);
export default ConnectedAlfaCartPage;
