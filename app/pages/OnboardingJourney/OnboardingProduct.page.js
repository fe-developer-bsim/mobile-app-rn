import React from 'react';
import PropTypes from 'prop-types';
import Offers from '../../components/OnboardingJourney/OnboardingProduct.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import {getAllOffersExcept} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import find from 'lodash/find';
import {checkHSMandNavigate, goReferralCode} from '../../state/thunks/common.thunks';
import {getConfigMenuSavingValas, getCreditCardProductsItems, getListLoanProduct} from '../../state/thunks/digitalAccountOpening.thunks';
import * as actionCreators from '../../state/actions/index.actions';
import {getTdConfig} from '../../state/thunks/dashboard.thunks';
import {insurance} from '../../state/thunks/Insurance.thunks';
import {set, storageKeys} from '../../utils/storage.util';
import {goToSplitBillMenu} from '../../state/thunks/splitBill.thunks';

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
    isLogin: !isEmpty(result(state, 'user', {})),
    hideMGM: result(state, 'config.hideMGM', ''),
    dataDisplay: result(state, 'insuranceDataTravel', {}),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onButtonPress: (btnName, isProduct, data) => {
    dispatch(checkHSMandNavigate(btnName, isProduct, data));
  },
  newProduct: () => {
    dispatch(getConfigMenuSavingValas());
  },
  newProductCC: () => {
    dispatch(getCreditCardProductsItems());
  },
  goToLoan: () => {
    dispatch(getListLoanProduct());
  },
  getTdCreate: () => {
    dispatch(actionCreators.clearValueTD());
    dispatch(getTdConfig());
  },
  getInsurance: () => {
    dispatch(insurance());
  },
  goToSplitBillMenu: () => {
    set(storageKeys['NEW_SPLITBILL'], true);
    dispatch(actionCreators.hideDrawer());
    dispatch(goToSplitBillMenu());
  },
  getValas: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(NavigationActions.navigate({routeName: 'ValasItem'}));
  },
  goReferralCode: () => () => dispatch(goReferralCode()),
});

class OffersPage extends React.Component {

  static propTypes = {
    newProduct: PropTypes.func,
    getValas: PropTypes.func,
    getTdCreate: PropTypes.func,
    getInsurance: PropTypes.func,
    goToSplitBillMenu: PropTypes.func,
    goReferralCode: PropTypes.func,
    gotoEasyPin: PropTypes.func,
    newProductCC: PropTypes.func,
    isLogin: PropTypes.bool,
    onButtonPress: PropTypes.func,
    hideMGM: PropTypes.string,
    dataDisplay: PropTypes.object,
    goToLoan: PropTypes.func
  }

  navgotoEasyPin = (productName) => () => {
    this.props.onButtonPress('LoginProduct', '', productName);
  }

  render () {
    const {isLogin, newProduct, getValas, getTdCreate, getInsurance, goToSplitBillMenu, goReferralCode, newProductCC, hideMGM, dataDisplay, goToLoan} = this.props;
    return <Offers isLogin={isLogin} gotoEasyPin={this.navgotoEasyPin} newProduct={newProduct} getValas={getValas} getTdCreate={getTdCreate}
      getInsurance={getInsurance} goToSplitBillMenu={goToSplitBillMenu} goReferralCode={goReferralCode} newProductCC={newProductCC} hideMGM={hideMGM} dataDisplay={dataDisplay} goToLoan={goToLoan}/>;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(OffersPage);
