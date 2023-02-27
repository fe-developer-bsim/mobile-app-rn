import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LoanProductComponent from '../../components/ProductOptions/ChooseLoanProduct.component';
import {connect} from 'react-redux';
import {result, isEmpty, startsWith, find} from 'lodash';
import {openLoanAccount} from '../../state/thunks/EForm.thunks';
import {NavigationActions} from 'react-navigation';
import {saveCcCode, saveProductCode} from '../../state/actions/index.actions.js';

const mapStateToProps = (state) => ({currentLanguage, config}) => ({
  currentLanguage, 
  config, 
  isLogin: !isEmpty(result(state, 'user', {})),
  listProducts: result(state, 'listLoanProducts', []),
  accountList: result(state, 'accounts', []),
  cifCode: result(state, 'user.profile.customer.cifCode', ''),
  nav: result(state, 'nav', {}),
});

const mapDispatchToProps = (dispatch) => ({
  goToNextPage: (value) => {
    dispatch(saveCcCode(result(value, 'productCode', '') + '-SIMOBI-002'));
    dispatch(saveProductCode(result(value, 'productCode', '')));
    dispatch(openLoanAccount(value));
  },
  goToIdentifyForm: (value) => {
    dispatch(saveCcCode(result(value, 'productCode', '') + '-SIMOBI-002'));
    dispatch(saveProductCode(result(value, 'productCode', '')));
    dispatch(NavigationActions.navigate({routeName: 'CreditCardForm1', params: {value}}));
  },
  goToCreateAccountForm: (value) => {
    dispatch(saveCcCode(result(value, 'productCode', '') + '-SIMOBI-002'));
    dispatch(saveProductCode(result(value, 'productCode', '')));
    dispatch(NavigationActions.navigate({routeName: 'EmoneyRegistration'}));
  }
});

class ChooseLoanProduct extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    nav: PropTypes.object,
    goToSmartfren: PropTypes.func,
    listProducts: PropTypes.array,
    isLogin: PropTypes.bool,
    currentLanguage: PropTypes.string,
    goToNextPage: PropTypes.func,
    config: PropTypes.object,
    accountList: PropTypes.array,
    cifCode: PropTypes.string,
    goToIdentifyForm: PropTypes.func,
    goToCreateAccountForm: PropTypes.func
  }

  nextPage = (value) => () => {
    const {goToNextPage, goToIdentifyForm, goToCreateAccountForm, accountList, isLogin, cifCode, nav} = this.props;
    const loginRoute = result(nav, 'routes.0.routeName', 'Onboarding');
    const isUserLogin = isLogin && (result(nav, 'index', 0) > 0 || loginRoute === 'Main');
    const emoneyKycOnly = !find(accountList, {accountType: 'SavingAccount'}) && find(accountList, {accountType: 'emoneyAccount'}) && !startsWith(cifCode, 'NK');
 
    if (isUserLogin) {
      if (!startsWith(cifCode, 'NK')) {
        if (emoneyKycOnly) {
          goToIdentifyForm(value);
        } else {
          goToNextPage(value);
        }
      } else {
        goToIdentifyForm(value);
      }
    } else {
      goToCreateAccountForm(value);
    }
  }

  render () {
    const {isLogin, listProducts, currentLanguage, accountList, cifCode} = this.props;
    const isEmoneyKyc = !isEmpty(find(accountList, {accountType: 'emoneyAccount'})) && !startsWith(cifCode, 'NK');
    return (
      <LoanProductComponent
        nextPage={this.nextPage}
        isLogin={isLogin}
        listProducts={listProducts}
        currentLanguage={currentLanguage}
        isEmoneyKyc={isEmoneyKyc}
      />
    );
  }
}

const LoanProductsPage = connect(mapStateToProps, mapDispatchToProps)(ChooseLoanProduct);

export default LoanProductsPage;
