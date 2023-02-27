import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CategoryAlfacart from '../../components/OnboardingJourney/CategoryAlfacart.component';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import find from 'lodash/find';
import {listProduct, listCategoryProduct, seeAllCategory, categorySeeAll} from '../../state/thunks/digitalStore.thunks';
import {saveCategory} from '../../state/actions/index.actions';

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
    category: state.category,
    categoryData: state.categoryAlfacart,
    listCategoryProduct
  };
};

const mapDispatchToProps = (dispatch) => ({
  listProduct: () => {
    dispatch(listProduct());
  },
  saveCategory: () => {
    dispatch(saveCategory());
  },
  goToDetailCategory: (categoryCode) => {
    dispatch(listCategoryProduct(categoryCode));
  },
  seeAllCategory: () => {
    dispatch(seeAllCategory());  
  },
  categorySeeAll: (item) => () => {
    dispatch(categorySeeAll(item));  
  }
});

class CategoryAlfacartPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    isStateEmpty: PropTypes.bool,
    nav: PropTypes.object,
    goToDetail: PropTypes.func,
    goToAlfacart: PropTypes.func,
    listProduct: PropTypes.func,
    category: PropTypes.array,
    categoryData: PropTypes.array,
    detailCategory: PropTypes.func,
    listAllProductData: PropTypes.array,
    goToDetailCategory: PropTypes.func,
    seeAllCategory: PropTypes.func,
    categorySeeAll: PropTypes.func

  }

  state = {
    value: false,
  }

  render () {
    const {nav, goToAlfacart, listAllProductData, category, goToDetail, 
      goToDetailCategory, seeAllCategory, categorySeeAll, categoryData} = this.props;
    const dataCategory = result(category, 'Array', []);

    return (
      <CategoryAlfacart goToDetail={goToDetail} nav={nav} navigateTo={this.navigateTo} 
        goToAlfacart={goToAlfacart} listProduct={listProduct} category={category}
        listAllProductData={listAllProductData} dataCategory={dataCategory}
        listCategoryProduct={listCategoryProduct} goToDetailCategory={goToDetailCategory} 
        seeAllCategory={seeAllCategory} categorySeeAll={categorySeeAll} categoryData={categoryData}/>
    );
  }
}

const ConnectedCategoryAlfaCartPage = connect(mapStateToProps, mapDispatchToProps)(CategoryAlfacartPage);
export default ConnectedCategoryAlfaCartPage;
