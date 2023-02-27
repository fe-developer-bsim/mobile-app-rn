import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import EmallSourceAcc from '../../components/Emall/EmallSourceAcc.component';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';
import {updateBalances, inquirySimasPoin} from '../../state/thunks/common.thunks';
import {confirmEmall, confirmEmallSimas, toLandingEmall} from '../../state/thunks/onboarding.thunks';

const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),  
  simasPoin: result(state, 'simasPoin', {}),
  simasConfig: result(state, 'config.CGVConfig', {}),
});

const mapDispatchToProps = (dispatch, props) => ({
  getConfirmation: (value) => dispatch(confirmEmall(value, result(props.navigation, 'state.params', {}))), 
  updateBalances: () => dispatch(updateBalances()),
  inquirySimasPoin: () => dispatch(inquirySimasPoin()),
  goLanding: () => dispatch(toLandingEmall()),
  getUseSimas: (isUseSimas, emallData) => dispatch(confirmEmallSimas(isUseSimas, emallData)),
});


class EmallSourceAccPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    getConfirmation: PropTypes.func,
    updateBalances: PropTypes.func,
    inquirySimasPoin: PropTypes.func,
    getBalanceEmoney: PropTypes.func,
    getPayday: PropTypes.func,
    loadBalancesWithSpinner: PropTypes.func,
    goLanding: PropTypes.func,
    getUseSimas: PropTypes.func,
    simasPoin: PropTypes.object,
    simasConfig: PropTypes.object,
  };

  render () {
    const {navigation, accounts, getConfirmation, getBalanceEmoney, goLanding, getUseSimas, simasPoin, simasConfig} = this.props;
    return <EmallSourceAcc navigation={navigation} accounts={accounts} getConfirmation={getConfirmation} onDashboardRefresh={this._onDashboardRefresh} getBalanceEmoney={getBalanceEmoney} loadBalancesWithSpinner={this.props.loadBalancesWithSpinner}
      goLanding={goLanding} getUseSimas={getUseSimas} simasPoin={simasPoin} simasConfig={simasConfig} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmallSourceAccPage);
