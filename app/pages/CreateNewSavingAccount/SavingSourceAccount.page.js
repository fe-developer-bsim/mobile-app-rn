import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SavingSourceAccount from '../../components/CreateNewSavingAccount/SavingSourceAccount.component';
import {getTransferPossibleAccounts, getAllAccountsExcept, getAllAccountsExceptSavingValas, getSavingValasPossibleAccounts} from '../../utils/transformer.util';
import {updateBalances} from '../../state/thunks/common.thunks';
import {NavigationActions} from 'react-navigation';
import {change} from 'redux-form';
import {convertAmountSavingValas} from '../../state/thunks/savingAccount.thunks';

const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'ft'),
  accountsFilterValas: getSavingValasPossibleAccounts(result(state, 'accounts', []), 'ft'),
  productCode: result(state, 'productCode', ''),
  savingProductType: result(state, 'productData.productType', ''),
  currencySavingValas: result(state, 'productItems.currencySavingValas', ''),
});

const mapDispatchToProps = (dispatch) => ({
  getConfirmation: (formName, fieldName, productCode, values) => {
    dispatch(change(formName, fieldName, values));
    if (productCode.includes('SAV')) {
      dispatch(convertAmountSavingValas());
    } else {
      dispatch(NavigationActions.back());
    }
  },
  updateBalances: () => dispatch(updateBalances()),
});


class SavingSourceAccPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    getConfirmation: PropTypes.func,
    updateBalances: PropTypes.func,
    getBalanceEmoney: PropTypes.func,
    getPayday: PropTypes.func,
    loadBalancesWithSpinner: PropTypes.func,
    productCode: PropTypes.string,
    savingProductType: PropTypes.string,
    currencySavingValas: PropTypes.string,
    accountsFilterValas: PropTypes.array,
  };

  selectAccount = (values) => {
    const {navigation, getConfirmation, productCode} = this.props;
    const formName = result(navigation, 'state.params.formName');
    const fieldName = result(navigation, 'state.params.fieldName');
    getConfirmation(formName, fieldName, productCode, values);
  }

  render () {
    const {navigation, accounts, getBalanceEmoney, savingProductType, currencySavingValas, accountsFilterValas} = this.props;
    const filteredAccount = getAllAccountsExcept(accounts);
    const filteredAccountSavingValas = getAllAccountsExceptSavingValas(accountsFilterValas, currencySavingValas);
    const filteredAccountSavingValasExcept = getAllAccountsExcept(filteredAccountSavingValas);
 
    return <SavingSourceAccount
      navigation={navigation}
      filteredAccount={filteredAccount}
      getConfirmation={this.selectAccount}
      onDashboardRefresh={this._onDashboardRefresh}
      getBalanceEmoney={getBalanceEmoney}
      loadBalancesWithSpinner={this.props.loadBalancesWithSpinner}
      savingProductType={savingProductType}
      filteredAccountSavingValasExcept={filteredAccountSavingValasExcept} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavingSourceAccPage);
