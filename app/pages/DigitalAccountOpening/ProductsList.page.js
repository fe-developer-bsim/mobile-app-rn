import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProductListComp from '../../components/DigitalAccountOpening/ProductsList.component';
import {connect} from 'react-redux';
import {result, isEmpty, startsWith, find} from 'lodash';
import {finishOrderOnboard} from '../../state/thunks/onboarding.thunks';
import {getConfigMenuSavingValas, getCreditCardProductsItems, getAllowContactsandApps, getListLoanProduct} from '../../state/thunks/digitalAccountOpening.thunks';
// import firebase from 'react-native-firebase';
// import {Platform} from 'react-native';
// let Analytics = firebase.analytics();

const mapStateToProps = (state) => ({
  config: result(state, 'config', {}),
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
  isLogin: !isEmpty(result(state, 'user', {})),
  cifCode: result(state, 'user.profile.customer.cifCode', ''),
  accountList: result(state, 'accounts', []),
  privateOffers: result(state, 'privateOffers', []),
  tutorialOnboard: result(state, 'tutorialOnboard', {})
});

const mapDispatchToProps = (dispatch) => ({
  goToCreditCard: () => dispatch(getCreditCardProductsItems()),
  goToSavingAccount: () => dispatch(getConfigMenuSavingValas()),
  goToLoan: () => dispatch(getListLoanProduct()),
  finishOrderOnboard: () => dispatch(finishOrderOnboard()),
  getContacts: () => dispatch(getAllowContactsandApps())
});

class ProductList extends Component {
  static propTypes = {
    navigation: PropTypes.func,
    goToCreditCard: PropTypes.func,
    goToSavingAccount: PropTypes.func,
    goToLoan: PropTypes.func,
    config: PropTypes.object,
    isLogin: PropTypes.bool,
    cifCode: PropTypes.string,
    accountList: PropTypes.array,
    tutorialOnboard: PropTypes.object,
    privateOffers: PropTypes.array,
    finishOrderOnboard: PropTypes.func,
    getContacts: PropTypes.func
  }

  componentWillMount () {
    this.props.getContacts();
  }

  componentDidMount = () => {
    // const {navigation} = this.props;
    // const firebaseEmoney = result(navigation, 'state.params.firebaseEmoney', false);
    // if (firebaseEmoney === true) {
    //   Analytics.logEvent('REGIST_EMONEY', {device: Platform.OS, step_route: '2-1'});
    // }
  }
  
  render () {
    const {config, isLogin, cifCode, accountList, goToCreditCard, goToSavingAccount, goToLoan, 
      privateOffers, tutorialOnboard, finishOrderOnboard} = this.props;

    const loanMenuEnabledNTB = result(config, 'flag.loanMenuNTB', 'INACTIVE') === 'ACTIVE';

    const emoneyKycOnly = !find(accountList, {accountType: 'SavingAccount'}) && find(accountList, {accountType: 'emoneyAccount'}) && !startsWith(cifCode, 'NK');
    let isValidKyc = false;

    if (isLogin) {
      if (!startsWith(cifCode, 'NK')) {
        if (emoneyKycOnly) {
          isValidKyc = false;
        } else {
          isValidKyc = true;
        }
      } else {
        isValidKyc = false;
      }
    } else {
      isValidKyc = false;
    }

    const toggleMenuCCSANTB = result(config, 'flag.flagCCAndSavingMenuNTB', 'INACTIVE') === 'ACTIVE';
    const toggleMenuSavingNTB = result(config, 'flag.flagSavingMenuNTB', 'INACTIVE') === 'ACTIVE';

    const tutorialON = result(tutorialOnboard, 'tutorialON', '');
    const order = result(tutorialOnboard, 'order', '');

    // const firebaseEmoney = result(navigation, 'state.params.firebaseEmoney', false);

    return (
      <ProductListComp
        config={config}
        isLogin={isLogin}
        isValidKyc={isValidKyc}
        goToCreditCard={goToCreditCard}
        goToSavingAccount={goToSavingAccount}
        goToLoan={goToLoan}
        loanMenuEnabledNTB={loanMenuEnabledNTB}
        privateOffers={privateOffers}
        tutorialON={tutorialON}
        order={order}
        finishOrderOnboard={finishOrderOnboard}
        toggleMenuCCSANTB={toggleMenuCCSANTB}
        toggleMenuSavingNTB={toggleMenuSavingNTB}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);