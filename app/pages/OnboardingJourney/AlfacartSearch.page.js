import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AlfacartDashboard from '../../components/OnboardingJourney/AlfacartSearch.component';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import find from 'lodash/find';
import {size, filter} from 'lodash';
import {listProductAlfacart, listCategoryProductAlfacart, seeAllCategoryAlfacart, detailProductAlfacart, addToCartAlfacart, wishlistDetailAlfacart, storageAlfacart, buyNowDashboard, goToCartAlfacart, categoryDashboard} from '../../state/thunks/digitalStore.thunks';
import {saveCategory} from '../../state/actions/index.actions';
import {goToPageSearch, searchDashboard} from '../../state/thunks/digitalStore.thunks';

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
    listAllProductData: state.listAllProductSearch,
    categoryData: state.categoryAlfacart,
    listCategoryProductAlfacart,
    saleproductAlfacart: state.saleproductAlfacart,
    allCart,
    itemsAll,
    paginationAlfaDashboard: result(state, 'paginationAlfaSearch', {}),
    listProductAlfa: result(state, 'listAllProductSearch', [])
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
  addToWishlist: (item) => {
    dispatch(wishlistDetailAlfacart(item));
  },
  wishlistDetailAlfacart: (item) => dispatch(wishlistDetailAlfacart(item)),
  storageAlfacart: () => dispatch(storageAlfacart()),
  goToCartAlfacart: () => {
    dispatch(goToCartAlfacart());
  },
  categoryDashboard: (code) => () => {
    dispatch(categoryDashboard(code));
  },
  goToPage: (value) => () => {
    dispatch(goToPageSearch(value));
  },
  searchDashboard: (keyWord) => {
    dispatch(searchDashboard(keyWord));
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
    itemsAll: PropTypes.array,
    goToCartAlfacart: PropTypes.func,
    wishlistDetailAlfacart: PropTypes.func,
    categoryDashboard: PropTypes.fun,
    storageAlfacart: PropTypes.func,
    goToPage: PropTypes.func,
    paginationAlfaDashboard: PropTypes.object,
    searchDashboard: PropTypes.func,
    listProductAlfa: PropTypes.array
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
  tickOnclose = () => {
    this.setState({visible: false});
  }

  wishlistDetailAlfacartFunc = (items) => () => {
    const {wishlistDetailAlfacart} = this.props;
    const bunch = {items};
    wishlistDetailAlfacart(bunch);
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
    const {storageAlfacart} = this.props;
    storageAlfacart();
  }
  render () {
    const {nav, goToAlfacart, listAllProductData, categoryData, goToDetail, listProductAlfa, allCart, paginationAlfaDashboard, goToPage,
      goToDetailCategory, seeAllCategory, detailProduct, saleproductAlfacart, addToWishlist, searchDashboard,
      itemsAll, goToCartAlfacart, categoryDashboard} = this.props;
    const dataCategory = result(categoryData, 'Array', []);
    const {quantity} = this.state;

    return (
      <AlfacartDashboard goToDetail={goToDetail} nav={nav} navigateTo={this.navigateTo}
        goToAlfacart={goToAlfacart} listProduct={listProductAlfa} categoryData={categoryData}
        listAllProductData={listAllProductData} dataCategory={dataCategory} paginationAlfaDashboard={paginationAlfaDashboard}
        listCategoryProduct={listCategoryProductAlfacart} goToDetailCategory={goToDetailCategory}
        seeAllCategory={seeAllCategory} addQuantity={this.addQuantity} goToPage={goToPage}
        minusQuantity={this.minusQuantity} detailProduct={detailProduct} quantity={quantity}
        addToCart={this.addToCartFunc} saleproductAlfacart={saleproductAlfacart}
        visible={this.state.visible} tickOverlay={this.tickOverlay} tickOnclose={this.tickOnclose}
        addToWishlist={addToWishlist} allCart={allCart} storageAlfacart={storageAlfacart}
        searchDashboard={searchDashboard}
        buyNowDashboard={this.buyNowDashboardFunc} itemsAll={itemsAll} goToCartAlfacart={goToCartAlfacart}
        wishlistDetailAlfacart={this.wishlistDetailAlfacartFunc} categoryDashboard={categoryDashboard}/>
    );
  }
}

const ConnectedAlfaCartPage = connect(mapStateToProps, mapDispatchToProps)(AlfaCartPage);
export default ConnectedAlfaCartPage;
