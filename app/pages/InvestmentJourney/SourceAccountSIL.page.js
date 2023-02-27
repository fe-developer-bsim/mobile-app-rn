import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SourceAccount from '../../components/InvestmentJourney/SourceAccountSIL.component';
import {getTransferPossibleAccounts, getTransferPossibleAccountsSIL} from '../../utils/transformer.util';
import {updateBalances} from '../../state/thunks/common.thunks';
import {toLandingEmall} from '../../state/thunks/onboarding.thunks';
import {NavigationActions} from 'react-navigation';
import {change} from 'redux-form';

const mapStateToProps = (state, props) => ({
  accountsBiller: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  accountsTransfer: getTransferPossibleAccountsSIL(result(state, 'accounts', []), 'ft', result(props, 'navigation.state.params.payee', {}), result(props, 'navigation.state.params.currency', {}), result(props, 'navigation.state.params.isOpenCrossCurrency', {}), result(props, 'navigation.state.params.isSilIdrUsd', '')),
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
  };

  selectAccount = (values) => {
    const {navigation, getConfirmation} = this.props;
    const formName = result(navigation, 'state.params.formName', '');
    const fieldName = result(navigation, 'state.params.fieldName', '');
    getConfirmation(formName, fieldName, values);
  };

  render () {
    const {navigation, accountsBiller, accountsTransfer, goLanding} = this.props;
    return <SourceAccount navigation={navigation} accountsBiller={accountsBiller} accountsTransfer={accountsTransfer} 
      getConfirmation={this.selectAccount} onDashboardRefresh={this._onDashboardRefresh} 
      loadBalancesWithSpinner={this.props.loadBalancesWithSpinner} goLanding={goLanding} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SourceAccountPage);
