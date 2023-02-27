import React from 'react';
import PropTypes from 'prop-types';
import Offers from '../../components/OnboardingJourney/OnboardingOffers.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import sortBy from 'lodash/sortBy';
import {getAllOffersExcept} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import find from 'lodash/find';
import noop from 'lodash/noop';
import  reverse from 'lodash/reverse';
import {populateOffersPrivate} from '../../state/thunks/common.thunks';
import {shouldGiveChecklist, listAllProduct, shouldGiveChecklistSimasCatalog, goToMerchantStore, checklistUnipin} from '../../state/thunks/digitalStore.thunks';

const mapStateToProps = (state) => {
  const allOffers = result(state, 'promos.offers', []);
  const clickedOffer = find(allOffers, {offerID: {}});
  const offers = getAllOffersExcept(clickedOffer, allOffers);
  const listCategoryOffers = result(state, 'config.listCategoryOffers', '');
  const offerCachePosition = result(state, 'offerCachePosition', '');
  const toogleMenuKoperasi = result(state, 'toogleMenuKoperasi', '');
  return {
    offers,
    clickedOffer,
    listCategoryOffers,
    offerCachePosition,
    toogleMenuKoperasi,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onOfferClick: (offer) => () => {
    dispatch(NavigationActions.navigate({routeName: 'OfferDetail', params: {offer}}));
  },
  closeHandler: () => dispatch(NavigationActions.back()),
  displayOffers: () => dispatch(populateOffersPrivate()),
  goToTncAlfacart: () => {
    dispatch(shouldGiveChecklist());
  },
  goToTncSimasCatalog: () => {
    dispatch(shouldGiveChecklistSimasCatalog());
  },
  goToAlfacart: () => {
    dispatch(listAllProduct());
  },
  goToMerchantStore: (merchant) => () => {
    dispatch(goToMerchantStore(merchant));
  },
  goToTncUnipin: () => {
    dispatch(checklistUnipin());
  },
});

class OffersPage extends React.Component {

  componentWillMount () {
    this.props.displayOffers();
  }

  static propTypes = {
    offers: PropTypes.array,
    clickedOffer: PropTypes.object,
    onOfferClick: PropTypes.func,
    closeHandler: PropTypes.func,
    isLogin: PropTypes.bool,
    displayOffers: PropTypes.func,
    qrPromo: PropTypes.array,
    merchantList: PropTypes.array,
    onPromoClick: PropTypes.func,
    changeTab: PropTypes.func,
    displayQrPromo: PropTypes.func,
    getMerchantList: PropTypes.func,
    goToMaps: PropTypes.func,
    listCategoryOffers: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    offerCachePosition: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    toogleMenuKoperasi: PropTypes.array,
    goToTncAlfacart: PropTypes.func,
    goToTncSimasCatalog: PropTypes.func,
    goToAlfacart: PropTypes.func,
    goToMerchantStore: PropTypes.func,
    goToTncUnipin: PropTypes.func,
  }

  render () {
    const {clickedOffer = {}, offerCachePosition, offers = [], onOfferClick = noop, isLogin = false, qrPromo = [], onPromoClick = noop, getMerchantList = noop, merchantList = [], goToMaps = noop, listCategoryOffers, toogleMenuKoperasi = [],
      goToTncAlfacart = noop, goToTncSimasCatalog = noop, goToAlfacart = noop, goToMerchantStore = noop, goToTncUnipin = noop} = this.props;
    let offersToShow = offers;
    if (offerCachePosition === 1) {
      offersToShow = reverse(offersToShow);
    } else {
      offersToShow = offers;
    }
    const sortOffers = sortBy(offersToShow, 'order');
    return <Offers isLogin={isLogin} closeHandler={this.props.closeHandler} offers={sortOffers} onOfferClick={onOfferClick} getMerchantList={getMerchantList}
      clickedOffer={clickedOffer} qrPromo={qrPromo} onPromoClick={onPromoClick} changeTab={this.changeTab} merchantList={merchantList} goToMaps={goToMaps} listCategoryOffers={listCategoryOffers}
      toogleMenuKoperasi={toogleMenuKoperasi} goToTncAlfacart={goToTncAlfacart} goToTncSimasCatalog={goToTncSimasCatalog} goToAlfacart={goToAlfacart}
      goToMerchantStore={goToMerchantStore} goToTncUnipin={goToTncUnipin}/>;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(OffersPage);
