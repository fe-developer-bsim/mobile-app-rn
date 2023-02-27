import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SendSourceAcc from '../../components/FundTransferJourney/SendSourceAcc.component';
import {generateAccountLabel} from '../../utils/transformer.util';
import {updateBalances, inquirySimasPoin} from '../../state/thunks/common.thunks';
import {confirmEmallSimas} from '../../state/thunks/onboarding.thunks';
import {NavigationActions} from 'react-navigation';
import {change} from 'redux-form';

const mapStateToProps = (state) => ({
  accounts: generateAccountLabel(result(state, 'accounts', []), 'ft'),
  simasPoin: result(state, 'simasPoin', {}),
  simasConfig: result(state, 'config.CGVConfig', {}),
});

const mapDispatchToProps = (dispatch) => ({
  getConfirmation: (formName, fieldName, values) => {
    dispatch(change(formName, fieldName, values));
    dispatch(NavigationActions.back());
  },
  updateBalances: () => dispatch(updateBalances()),
  inquirySimasPoin: () => dispatch(inquirySimasPoin()),
  goLanding: () => dispatch(NavigationActions.back()),
  getUseSimas: (isUseSimas, emallData) => dispatch(confirmEmallSimas(isUseSimas, emallData)),
});


class SendSourceAccPage extends React.Component {
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
    dispatch: PropTypes.func,

  };

  selectAccount = (values) => {
    const {navigation, getConfirmation} = this.props;
    const formName = result(navigation, 'state.params.formName');
    const fieldName = result(navigation, 'state.params.fieldName');
    getConfirmation(formName, fieldName, values);
  }

  render () {
    const {navigation, accounts, getBalanceEmoney, goLanding, getUseSimas, simasPoin, simasConfig, dispatch} = this.props;
    return <SendSourceAcc navigation={navigation} accounts={accounts} getConfirmation={this.selectAccount} onDashboardRefresh={this._onDashboardRefresh} getBalanceEmoney={getBalanceEmoney} loadBalancesWithSpinner={this.props.loadBalancesWithSpinner}
      goLanding={goLanding} getUseSimas={getUseSimas} simasPoin={simasPoin} simasConfig={simasConfig} dispatch={dispatch}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendSourceAccPage);
