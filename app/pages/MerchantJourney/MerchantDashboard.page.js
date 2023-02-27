import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AlfacartDashboard from '../../components/MerchantJourney/MerchantDashboard.component';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import find from 'lodash/find';
import {listCategoryProduct, seeAllCategory, detailProduct, filterCartProduct, addToCart} from '../../state/thunks/digitalStore.thunks';

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
    egiftList: state.merchantCart,
    simasPoin: state.simasPoin,
    isDeeplinkExist: state.isDeeplinkExist,
    billerMenuOrderRevamp,
    billerConfig,
    emoney,
    listAllProductData: result(state, 'allProductMerchantFilter', []),
    categoryData: result(state, 'allProductMerchantCategory', []),
    listCategoryProduct
  };
};

const mapDispatchToProps = (dispatch) => ({
  goToDetailCategory: (categoryCode) => {
    dispatch(listCategoryProduct(categoryCode));
  },
  seeAllCategory: () => {
    dispatch(seeAllCategory());  
  },
  detailProduct: (item) => () => {
    dispatch(detailProduct(item));  
  },
  addToCart: (item)  => {
    dispatch(addToCart(item));  
  },
  filterCartProduct: (type) => () => {
    dispatch(filterCartProduct(type));  
  }
});

class AlfaCartPage extends React.Component {
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
    detailProduct: PropTypes.func,
    addToCart: PropTypes.func,
    filterCartProduct: PropTypes.func
  }

  state = {
    quantity: 1,
    totalAmount: 0,
    value: false,
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
  }

  render () {
    const {nav, goToAlfacart, listAllProductData, categoryData, goToDetail, 
      goToDetailCategory, seeAllCategory, detailProduct, filterCartProduct} = this.props;
    const dataCategory = result(categoryData, 'Array', []);
    const {quantity} = this.state; 
    return (
      <AlfacartDashboard goToDetail={goToDetail} nav={nav} navigateTo={this.navigateTo} 
        goToAlfacart={goToAlfacart} categoryData={categoryData}
        listAllProductData={listAllProductData} dataCategory={dataCategory}
        listCategoryProduct={listCategoryProduct} goToDetailCategory={goToDetailCategory} 
        seeAllCategory={seeAllCategory} addQuantity={this.addQuantity} filterCartProduct={filterCartProduct}
        minusQuantity={this.minusQuantity} detailProduct={detailProduct} quantity={quantity}
        addToCart={this.addToCartFunc}/>
    );
  }
}

const ConnectedAlfaCartPage = connect(mapStateToProps, mapDispatchToProps)(AlfaCartPage);
export default ConnectedAlfaCartPage;
