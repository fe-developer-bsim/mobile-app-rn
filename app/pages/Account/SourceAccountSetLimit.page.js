import SourceAccount from '../../components/Account/SourceAccountSetLimit.component';
import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getTransferPossibleAccountsSetLimit, getBillerPossibleAccountsSetLimit} from '../../utils/transformer.util';
import {updateBalances} from '../../state/thunks/common.thunks';
import {toLandingEmall} from '../../state/thunks/onboarding.thunks';
import {NavigationActions} from 'react-navigation';
import {change} from 'redux-form';

const mapStateToProps = (state, props) => ({
  accountsBiller: getBillerPossibleAccountsSetLimit(result(state, 'accounts', []), 'bp'),
  accountsTransfer: getTransferPossibleAccountsSetLimit(result(state, 'accounts', []), 'ft', result(props, 'navigation.state.params.payee', {}), result(props, 'navigation.state.params.isValas', {})),

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
    accountsBiller: PropTypes.array,
    accountsTransfer: PropTypes.array,
    getConfirmation: PropTypes.func,
    updateBalances: PropTypes.func,
    getPayday: PropTypes.func,
    loadBalancesWithSpinner: PropTypes.func,
    goLanding: PropTypes.func,
    emoneyAccount: PropTypes.array
  };

  selectAccount = (values) => {
    const {navigation, getConfirmation} = this.props;
    const formName = result(navigation, 'state.params.formName', '');
    const fieldName = result(navigation, 'state.params.fieldName', '');
    getConfirmation(formName, fieldName, values);
  };

  render () {
    const {navigation, accountsBiller, accountsTransfer, goLanding, emoneyAccount} = this.props;
    return <SourceAccount navigation={navigation} accountsBiller={accountsBiller} accountsTransfer={accountsTransfer}
      getConfirmation={this.selectAccount} onDashboardRefresh={this._onDashboardRefresh} emoneyAccount={emoneyAccount}
      loadBalancesWithSpinner={this.props.loadBalancesWithSpinner} goLanding={goLanding} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SourceAccountPage);
