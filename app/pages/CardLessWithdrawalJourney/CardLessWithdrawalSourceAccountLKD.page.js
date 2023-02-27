import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CashLessSourceAcc from '../../components/CardLessWithdrawalJourney/CardLessWithdrawalSourceAccount.component';
import {getTransferPossibleAccountsLKD} from '../../utils/transformer.util';
import {updateBalances, inquirySimasPoin} from '../../state/thunks/common.thunks';
import {confirmEmall, confirmEmallSimas, toLandingEmall} from '../../state/thunks/onboarding.thunks';
import {selectingAccount as selectedAccount} from '../../state/thunks/common.thunks';
import {NavigationActions} from 'react-navigation';

const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccountsLKD(result(state, 'accounts', []), 'bp'),
  simasPoin: result(state, 'simasPoin', {}),
  simasConfig: result(state, 'config.CGVConfig', {}),
});

const mapDispatchToProps = (dispatch, props) => ({
  getConfirmation: (value) => dispatch(confirmEmall(value, result(props.navigation, 'state.params', {}))),
  updateBalances: () => dispatch(updateBalances()),
  inquirySimasPoin: () => dispatch(inquirySimasPoin()),
  goLanding: () => dispatch(toLandingEmall()),
  getUseSimas: (isUseSimas, emallData) => dispatch(confirmEmallSimas(isUseSimas, emallData)),
  selectingAccount: (value, form, field) => dispatch(selectedAccount(value, form, field)),
  goBack: () => dispatch(NavigationActions.back())
});


class CardLessWithdrawalSourceAccPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    getConfirmation: PropTypes.func,
    updateBalances: PropTypes.func,
    inquirySimasPoin: PropTypes.func,
    getBalanceEmoney: PropTypes.func,
    selectingAccount: PropTypes.func,
    loadBalancesWithSpinner: PropTypes.func,
    goLanding: PropTypes.func,
    getUseSimas: PropTypes.func,
    simasPoin: PropTypes.object,
    simasConfig: PropTypes.object,
    goBack: PropTypes.func
  };

  render () {
    const {navigation, accounts, getConfirmation, getBalanceEmoney, goLanding, getUseSimas, simasPoin, simasConfig, selectingAccount, goBack} = this.props;
    return <CashLessSourceAcc 
      navigation={navigation} 
      accounts={accounts} 
      getConfirmation={getConfirmation} 
      onDashboardRefresh={this._onDashboardRefresh} 
      getBalanceEmoney={getBalanceEmoney} 
      loadBalancesWithSpinner={this.props.loadBalancesWithSpinner}
      goLanding={goLanding} 
      getUseSimas={getUseSimas} 
      simasPoin={simasPoin} 
      simasConfig={simasConfig} 
      selectingAccount={selectingAccount} 
      goBack={goBack} 
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardLessWithdrawalSourceAccPage);
