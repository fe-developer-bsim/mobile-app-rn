import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DetailProductAlfacart from '../../components/OnboardingJourney/DetailProductAlfacart.component';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import find from 'lodash/find';
import {size, filter} from 'lodash';
import {listProductAlfacart, listCategoryProductAlfacart, seeAllCategoryAlfacart, addToCartAlfacart, goToCheckout, buyNow, wishlistDetailAlfacart, dropFromWishlist, productAlreadyAlfacart} from '../../state/thunks/digitalStore.thunks';
import {goToCartAlfacart, goToSearchAlfacart} from '../../state/thunks/common.thunks';
import {saveCategory} from '../../state/actions/index.actions';

const mapStateToProps = (state) =>  {
  const isStateEmpty = isEmpty(state.appInitKeys);
  const introductionTriggered = result(state, 'introductionTriggered', false);
  const allOffers = result(state, 'promos.offers', []);
  const clickedOffer = find(allOffers, {offerID: {}});
  const billerMenuOrderRevamp = result(state, 'config.billerMenuOrderRevamp', []);
  const billerConfig = result(state, 'billerConfig', {});
  const emoney = result(state, 'emoney', {});
  const allCart = result(state, 'cartAlfacart', []);
  const wishlistAlfacart = result(state, 'wishlistAlfacart', []);
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
    categoryData: state.category,
    listCategoryProductAlfacart,
    detailProductData: state.detailProduct,
    cartAlfacart: state.cartAlfacart,
    allCart,
    wishlistAlfacart,
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
  addToCart: (item)  => dispatch(addToCartAlfacart(item)),  
  buyNow: (item)  => dispatch(buyNow(item)),

  goToCheckout: () => {
    dispatch(goToCheckout());  
  },
  goToCartAlfacart: () => {
    dispatch(goToCartAlfacart());  
  },
  wishlistDetailAlfacart: (item)  => dispatch(wishlistDetailAlfacart(item)),  

  goToSearchAlfacart: () => {
    dispatch(goToSearchAlfacart());
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
    goToDetailCategory: PropTypes.func,
    seeAllCategory: PropTypes.func,
    detailProductData: PropTypes.array,
    cartAlfacart: PropTypes.array,
    onChangeTab: PropTypes.func,
    initialTab: PropTypes.number,
    addToCart: PropTypes.func,
    buyNow: PropTypes.func,
    goToCheckout: PropTypes.func,
    goToCartAlfacart: PropTypes.func,
    allCart: PropTypes.array,
    wishlistDetailAlfacart: PropTypes.func,
    goToSearchAlfacart: PropTypes.func,
    wishlistAlfacart: PropTypes.array,
    dropFromWishlist: PropTypes.func,
    productAlreadyAlfacart: PropTypes.func,
    currentMerchant: PropTypes.array,
    wishlistCMI: PropTypes.array,
    cartCMI: PropTypes.array,

  }

  state = {
    quantity: 1,
    totalAmount: 0,
    value: false,
    error: {},
    visible: false,
    targetItems: {}
  }

  tabNames = ['TabDescription', 'TabSpesification', '']

  _onChangeTab = ({i, from}) => {
    if (i === from)
      return;
    const activeTab = this.tabNames[i];
    this.setState({activeTab}, () => {
      if (activeTab === 'TabDescription');
      else if (activeTab === 'TabSpesification');
      else (activeTab === '');
    });
  }

  addQuantity = () => {
    this.setState({quantity: this.state.quantity + 1});
  }

  minusQuantity = () => {
    this.setState({quantity: this.state.quantity - 1});
  }

  addToCartFunc = (items) => () => {
    const {addToCart} = this.props;
    const {quantity} = this.state;
    const bunch  = {items, quantity};
    addToCart(bunch);
    this.tickOnclose();
  }

  buyNowFunc = (items) => () => {
    const {buyNow} = this.props;
    const {quantity} = this.state;
    const bunch  = {items, quantity};
    buyNow(bunch);
    this.tickOnclose();
  }
  wishlistDetailAlfacartFunc = (items) => () => {
    const {wishlistDetailAlfacart} = this.props;
    wishlistDetailAlfacart(items);
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

  render () {
    const {nav, goToAlfacart, listAllProductData, categoryData, goToDetail, 
      goToDetailCategory, seeAllCategory, cartAlfacart, goToCheckout, 
      goToCartAlfacart, navigation, goToSearchAlfacart, wishlistAlfacart, allCart, dropFromWishlist, productAlreadyAlfacart, currentMerchant, wishlistCMI, cartCMI} = this.props;
    const dataCategory = result(categoryData, 'Array', []);
    const initialTab = result(nav, 'state.params.initialTab', 0);
    const {quantity} = this.state; 
    const productDetail  = result(navigation, 'state.params.productDetail', {});


    return (
      <DetailProductAlfacart goToDetail={goToDetail} nav={nav} navigateTo={this.navigateTo} 
        goToAlfacart={goToAlfacart} listProduct={listProductAlfacart} categoryData={categoryData}
        listAllProductData={listAllProductData} dataCategory={dataCategory}
        listCategoryProduct={listCategoryProductAlfacart} goToDetailCategory={goToDetailCategory} 
        seeAllCategory={seeAllCategory} addQuantity={this.addQuantity} 
        minusQuantity={this.minusQuantity} detailProductData={productDetail}
        onChangeTab={this._onChangeTab} initialTab={initialTab} quantity={quantity}
        addToCart={this.addToCartFunc} buyNow={this.buyNowFunc} cartAlfacart={cartAlfacart} 
        goToCheckout={goToCheckout} goToCartAlfacart={goToCartAlfacart}
        visible={this.state.visible} tickOverlay={this.tickOverlay} tickOverlayCMI={this.tickOverlayCMI} tickOnclose={this.tickOnclose} 
        wishlistDetailAlfacart={this.wishlistDetailAlfacartFunc} goToSearchAlfacart={goToSearchAlfacart}
        wishlistAlfacart={wishlistAlfacart} allCart={allCart} dropFromWishlist={dropFromWishlist}
        productAlreadyAlfacart={productAlreadyAlfacart} currentMerchant={currentMerchant} wishlistCMI={wishlistCMI} cartCMI={cartCMI}/>
    );
  }
}

const ConnectedAlfaCartPage = connect(mapStateToProps, mapDispatchToProps)(AlfaCartPage);
export default ConnectedAlfaCartPage;