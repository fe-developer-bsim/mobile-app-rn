import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AlfacartShippingMethod from '../../components/MerchantJourney/MerchantShippingMethod.component';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import find from 'lodash/find';
import {goToShipping} from '../../state/thunks/digitalStore.thunks';
import {change} from 'redux-form';
import {NavigationActions} from 'react-navigation';

const mapStateToProps = (state) =>  {
  const isStateEmpty = isEmpty(state.appInitKeys);
  const introductionTriggered = result(state, 'introductionTriggered', false);
  const allOffers = result(state, 'promos.offers', []);
  const clickedOffer = find(allOffers, {offerID: {}});
  const billerMenuOrderRevamp = result(state, 'config.billerMenuOrderRevamp', []);
  const billerConfig = result(state, 'billerConfig', {});
  const emoney = result(state, 'emoney', {});
  const shipmentAdressMerchant = result(state, 'shipmentAdressMerchant', []);
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
    shipmentAdressMerchant
  };
};

const mapDispatchToProps = (dispatch) => ({
  goToShipping: () => {
    dispatch(goToShipping());
  },
  getConfirmation: (formName, fieldName, values) => {
    dispatch(change(formName, fieldName, values));
    dispatch(NavigationActions.back());
  }
});

class AlfacartShippingMethodPage extends React.Component {
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
    getConfirmation: PropTypes.func,
    getListShipping: PropTypes.func,
    shipmentAdressMerchant: PropTypes.array
  }

  state = {
    value: false,
  }

  selectAccount = (values) => () => {
    const {navigation, getConfirmation} = this.props;
    const formName = result(navigation, 'state.params.formName', '');
    const fieldName = result(navigation, 'state.params.fieldName', '');
    getConfirmation(formName, fieldName, values);
  };

  render () {
    const {nav, goToAlfacart, listAllProductData, categoryData, goToDetail,
      goToDetailCategory, seeAllCategory, goToShipping, shipmentAdressMerchant} = this.props;
    const dataCategory = result(categoryData, 'Array', []);

    return (
      <AlfacartShippingMethod goToDetail={goToDetail} nav={nav} navigateTo={this.navigateTo}
        goToAlfacart={goToAlfacart}  categoryData={categoryData} shipmentAdressMerchant={shipmentAdressMerchant}
        listAllProductData={listAllProductData} dataCategory={dataCategory}
        goToDetailCategory={goToDetailCategory}
        seeAllCategory={seeAllCategory} goToShipping={goToShipping} getConfirmation={this.selectAccount}/>
    );
  }
}

const ConnectedAlfacartShippingMethodPage = connect(mapStateToProps, mapDispatchToProps)(AlfacartShippingMethodPage);
export default ConnectedAlfacartShippingMethodPage;
