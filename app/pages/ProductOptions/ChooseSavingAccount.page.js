import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SavingAccountComponent from '../../components/ProductOptions/ChooseSavingAccount.component';
import {connect} from 'react-redux';
import {saveCcCode, saveSavingData} from '../../state/actions/index.actions.js';
import {NavigationActions} from 'react-navigation';
import {result, isEmpty, startsWith, find} from 'lodash';

const mapStateToProps = (state) => ({currentLanguage, config}) => ({
  currentLanguage, 
  config, 
  isLogin: !isEmpty(result(state, 'user', {})),
  listProducts: result(state, 'listSavingProducts', []),
  accountList: result(state, 'accounts', []),
  cifCode: result(state, 'user.profile.customer.cifCode', '')
});

const mapDispatchToProps = (dispatch) => ({
  goToTnC: (value) => () => {
    dispatch(saveCcCode(result(value, 'productCode', '') + '-SIMOBI-002'));
    dispatch(saveSavingData(value));
    dispatch(NavigationActions.navigate({routeName: 'SavingTnC'}));    
  },
  goToSmartfren: () => dispatch(NavigationActions.navigate({routeName: 'SmartPromoAbout'}))
});

class ChooseSavingAccount extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToSmartfren: PropTypes.func,
    isLogin: PropTypes.bool,
    listProducts: PropTypes.array,
    currentLanguage: PropTypes.string,
    goToTnC: PropTypes.func,
    config: PropTypes.object,
    accountList: PropTypes.array,
    cifCode: PropTypes.string
  }

  render () {
    const {goToSmartfren, config, isLogin, listProducts, currentLanguage, goToTnC, accountList, cifCode} = this.props;
    const smartfrenToogle = result(config, 'smartfrenPromo.isSmartfrenPromoEnable', '');
    const language = result(currentLanguage, 'id', 'id');
    const emoneyKycOnly = !find(accountList, {accountType: 'SavingAccount'}) && find(accountList, {accountType: 'emoneyAccount'}) && !startsWith(cifCode, 'NK');
    let showSaving = false;
    if (isLogin) {
      if (!startsWith(cifCode, 'NK')) {
        if (emoneyKycOnly) {
          showSaving = false;
        } else {
          showSaving = true;
        }
      } else {
        showSaving = false;
      }
    } else {
      showSaving = false;
    }

    return (
      <SavingAccountComponent
        smartfrenToogle={smartfrenToogle}
        goToSmartfren={goToSmartfren}
        isLogin={isLogin}
        listProducts={listProducts}
        currentLanguage={language}
        goToTnC={goToTnC}
        showSaving={showSaving}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseSavingAccount);
