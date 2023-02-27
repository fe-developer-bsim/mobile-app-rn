import React from 'react';
import PropTypes from 'prop-types';
import OffersDetail from '../../components/Offers/OfferDetail.component.js';
import {connect} from 'react-redux';
// import {offerClickHandler} from '../../state/thunks/profile.thunks';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import {shouldGiveChecklist, shouldGiveChecklistSimasCatalog} from '../../state/thunks/digitalStore.thunks';
import {goReferralCode, checkHSMandNavigate} from '../../state/thunks/common.thunks';
import {getCreditCardProductsItems} from '../../state/thunks/digitalAccountOpening.thunks';
import {NavigationActions} from 'react-navigation';
import {Platform} from 'react-native';
import {genericSearchNavigate} from '../../utils/genericRouteSearch.util';

let adjustAndroid;

if (Platform.OS === 'android') {
  adjustAndroid = require('react-native-adjust');
}

const mapStateToProps = (state) => ({
  isLogin: !isEmpty(result(state, 'user', {})),
  cif: result(state, 'user.profile.customer.cifCode', ''),
});

const mapDispatchToProps = (dispatch) => ({
  onButtonPress: (btnName, isProduct, data, offerNavigate) => {
    dispatch(checkHSMandNavigate(btnName, isProduct, data, offerNavigate));
  },
  goToTncAlfacart: () => {
    dispatch(shouldGiveChecklist());
  },
  goToTncSimasCatalog: () => {
    dispatch(shouldGiveChecklistSimasCatalog());
  },
  goSpecialDeals: (offers) => {
    dispatch(NavigationActions.navigate({routeName: 'SpecialDealsLogin', params: {offers}}));
  },
  goReferralCode: () => {
    dispatch(goReferralCode());
  },
  getCreditCardProductsItems: () => {
    dispatch(getCreditCardProductsItems());
  },
  genericSearchNavigate: (offerNavigate) => {
    dispatch(genericSearchNavigate(offerNavigate));
  }
});

class OffersDetailPage extends React.Component {
  static propTypes = {
    onOfferClick: PropTypes.func,
    navigation: PropTypes.object,
    isLogin: PropTypes.bool,
    goToTncSimasCatalog: PropTypes.func,
    goToTncAlfacart: PropTypes.func,
    goSpecialDeals: PropTypes.func,
    goReferralCode: PropTypes.func,
    getCreditCardProductsItems: PropTypes.func,
    onButtonPress: PropTypes.func,
    cif: PropTypes.string,
    label: PropTypes.string,
    genericSearchNavigate: PropTypes.func,
  }

  navigateToSpecialDeals = (offers) => () => {
    const {isLogin, cif} = this.props;
    const newsAbout = result(offers, 'navigateTo.0', '');
    const isMgm = newsAbout === 'Referral';
    const isCreditCard = newsAbout === 'CreditCard';
    const isEvoucher = newsAbout === 'UVOffer';
    const isAlfaCart = newsAbout === 'AlfaCartOffer';
    const isEmptyNewsAbout = newsAbout === null;
    const label = result(offers, 'label', '');
    let adjustEvent;
    if (Platform.OS === 'android') { // event adjust tracking offers detail buttom
      adjustEvent = new adjustAndroid.AdjustEvent('bdf0nz');
      adjustEvent.addCallbackParameter('page_id', 'ac-spe-1-2');
      adjustEvent.addCallbackParameter('cif', cif);
      adjustEvent.addCallbackParameter('page_name', label);
      adjustAndroid.Adjust.trackEvent(adjustEvent);
    }

    if (isEmptyNewsAbout) {
      this.props.onOfferClick(offers);
    } else if (isEvoucher) {
      this.props.goToTncSimasCatalog();
    } else if (isAlfaCart) {
      this.props.goToTncAlfacart();
    } else if (!isLogin) {
      this.props.goSpecialDeals(offers);
    } else {
      if (isMgm) {
        this.props.goReferralCode();
      }
      if (isCreditCard) {
        this.props.getCreditCardProductsItems();
      }
    }
  }

  navgotoEasyPin = (offerNavigate) => () => {
    const {isLogin} = this.props;
    if (!isLogin) {
      this.props.onButtonPress('LoginProduct', '', '', offerNavigate);
    } else {
      this.props.genericSearchNavigate(offerNavigate);
    }
  }

  render () {
    const {navigation = {}, cif} = this.props;
    const offer = result(navigation, 'state.params.offer', {});
    const isOfferNilaiQ = result(navigation, 'state.params.isOfferNilaiQ', false);
    return <OffersDetail onOfferClick={this.navgotoEasyPin} offer={offer} cif={cif} isOfferNilaiQ={isOfferNilaiQ}/>;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(OffersDetailPage);
