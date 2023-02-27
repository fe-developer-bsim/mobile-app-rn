import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DetailProductAlfacart from '../../components/MerchantJourney/DetailProductMerchant.component';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import find from 'lodash/find';
import {listCategoryProduct, seeAllCategory, addToCart, goToCheckout} from '../../state/thunks/digitalStore.thunks';

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
    listAllProductData: state.listAllProduct,
    categoryData: state.category,
    listCategoryProduct,
    cartAlfacart: state.cartAlfacart,
  };
};

const mapDispatchToProps = (dispatch) => ({
  goToDetailCategory: (categoryCode) => {
    dispatch(listCategoryProduct(categoryCode));
  },
  seeAllCategory: () => {
    dispatch(seeAllCategory());
  },
  addToCart: (item)  => dispatch(addToCart(item)),
  goToCheckout: () => {
    dispatch(goToCheckout('alfacart'));
  },
  dispatch
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
    cartAlfacart: PropTypes.array,
    onChangeTab: PropTypes.func,
    initialTab: PropTypes.number,
    addToCart: PropTypes.func,
    goToCheckout: PropTypes.func,
    dispatch: PropTypes.func
  }

  state = {
    quantity: 1,
    totalAmount: 0,
    value: false,
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
  }

  render () {
    const {nav, goToAlfacart, listAllProductData, categoryData, goToDetail, dispatch,
      goToDetailCategory, seeAllCategory, cartAlfacart, goToCheckout, navigation} = this.props;
    const dataCategory = result(categoryData, 'Array', []);
    const initialTab = result(nav, 'state.params.initialTab', 0);
    const {quantity} = this.state;

    const productDetailData = result(navigation, 'state.params.productDetail', '');
    return (
      <DetailProductAlfacart goToDetail={goToDetail} nav={nav} navigateTo={this.navigateTo}
        goToAlfacart={goToAlfacart} categoryData={categoryData}
        listAllProductData={listAllProductData} dataCategory={dataCategory}
        listCategoryProduct={listCategoryProduct} goToDetailCategory={goToDetailCategory}
        seeAllCategory={seeAllCategory} addQuantity={this.addQuantity} dispatch={dispatch}
        minusQuantity={this.minusQuantity} detailProductData={productDetailData}
        onChangeTab={this._onChangeTab} initialTab={initialTab} quantity={quantity}
        addToCart={this.addToCartFunc} cartAlfacart={cartAlfacart} goToCheckout={goToCheckout}/>
    );
  }
}

const ConnectedAlfaCartPage = connect(mapStateToProps, mapDispatchToProps)(AlfaCartPage);
export default ConnectedAlfaCartPage;
