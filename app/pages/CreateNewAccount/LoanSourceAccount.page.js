import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SourceAccount from '../../components/CreateNewAccount/LoanSourceAccount.component';
import {updateBalances} from '../../state/thunks/common.thunks';
import {toLandingEmall} from '../../state/thunks/onboarding.thunks';
import {NavigationActions} from 'react-navigation';
import {change} from 'redux-form';
import {getTransferPossibleAccounts, getAccountsForPGO} from '../../utils/transformer.util';

const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'ft'),
});

const mapDispatchToProps = (dispatch) => ({
  getConfirmation: (formName, fieldName, values) => {
    dispatch(change(formName, fieldName, values));
    dispatch(NavigationActions.back());
  },
  updateBalances: () => dispatch(updateBalances()),
  goLanding: () => dispatch(toLandingEmall()),
});

class SourceAccountPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    getConfirmation: PropTypes.func,
    updateBalances: PropTypes.func,
    getBalanceEmoney: PropTypes.func,
    getPayday: PropTypes.func,
    loadBalancesWithSpinner: PropTypes.func,
    goLanding: PropTypes.func,
  };

  selectAccount = (values) => {
    const {navigation, getConfirmation} = this.props;
    const formName = result(navigation, 'state.params.formName', '');
    const fieldName = result(navigation, 'state.params.fieldName', '');
    getConfirmation(formName, fieldName, values);
  };

  render () {
    const {navigation, accounts, getBalanceEmoney, goLanding} = this.props;
    const listAccounts = getAccountsForPGO(accounts);
    return <SourceAccount navigation={navigation} listAccounts={listAccounts} getConfirmation={this.selectAccount} onDashboardRefresh={this._onDashboardRefresh} getBalanceEmoney={getBalanceEmoney} loadBalancesWithSpinner={this.props.loadBalancesWithSpinner}
      goLanding={goLanding} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SourceAccountPage);
