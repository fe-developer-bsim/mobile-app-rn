import React from 'react';
import PropTypes from 'prop-types';
import Offers from '../../components/Offers/Offers.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {getAllOffersExcept} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import find from 'lodash/find';
import noop from 'lodash/noop';
import {populateOffersPrivate, getMerchant, getPromoList} from '../../state/thunks/common.thunks';

const mapStateToProps = (state, ownProps) => {
  const offerID = result(ownProps, 'navigation.state.params.offerID');
  const allOffers = result(state, 'promos.offers', []);
  const clickedOffer = find(allOffers, {offerID});
  const offers = getAllOffersExcept(clickedOffer, allOffers);
  const cifCode = result(state, 'user.profile.customer.cifCode', '');
  return {
    user: result(state, 'user.profile'),
    currentLanguage: result(state, 'currentLanguage'),
    offers,
    clickedOffer,
    cifCode,
    isLogin: !!result(state, 'user.ipassport', ''),
    qrPromo: result(state, 'qrPromoList', []),
    merchantList: result(state, 'qrMerchantList', [])
  };
};

const mapDispatchToProps = (dispatch) => ({
  onOfferClick: (offer) => () => {
    dispatch(NavigationActions.navigate({routeName: 'OfferDetail', params: {offer}}));
  },
  onPromoClick: (promo) => () => {
    dispatch(NavigationActions.navigate({routeName: 'QRPromoDetail', params: {promo}}));
  },
  closeHandler: () => dispatch(NavigationActions.back()),
  displayOffers: () => dispatch(populateOffersPrivate()),
  displayQrPromo: () => dispatch(getPromoList()),
  getMerchantList: () => dispatch(getMerchant()),
  goToMaps: (merchant) => () => dispatch(NavigationActions.navigate({routeName: 'QRMerchantLocation', params: {merchant}}))
});

class OffersPage extends React.Component {

  componentWillMount () {
    this.props.displayOffers();
    this.props.displayQrPromo();
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
    cifCode: PropTypes.string,
  }

  render () {
    const {clickedOffer = {}, offers = [], onOfferClick = noop, isLogin = false, qrPromo = [], onPromoClick = noop, getMerchantList = noop, merchantList = [], goToMaps = noop} = this.props;
    return <Offers isLogin={isLogin} closeHandler={this.props.closeHandler} offers={offers} onOfferClick={onOfferClick} getMerchantList={getMerchantList}
      clickedOffer={clickedOffer} qrPromo={qrPromo} onPromoClick={onPromoClick} changeTab={this.changeTab} merchantList={merchantList} goToMaps={goToMaps}/>;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(OffersPage);
