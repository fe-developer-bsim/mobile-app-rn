import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SourceAccount from '../../components/Account/SourceAccount.component';
import {getTransferPossibleAccounts, getPushBillPossibleAccounts, getBillerPossibleAccounts, getAccountSavingOnly, getTransferPossibleAccountsWithCC} from '../../utils/transformer.util';
import {updateBalances} from '../../state/thunks/common.thunks';
import {getCreditCardBalance} from '../../state/thunks/common.thunks';
import {toLandingEmall} from '../../state/thunks/onboarding.thunks';
import {NavigationActions} from 'react-navigation';
import {change} from 'redux-form';
import {inquirySimasPoin} from '../../state/thunks/common.thunks';
import {get, storageKeys} from '../../utils/storage.util';
import {confirmEmallSimas} from '../../state/thunks/onboarding.thunks';
import * as actionCreators from '../../state/actions/index.actions';

const mapStateToProps = (state, props) => ({
  simasPoin: result(state, 'simasPoin', {}),
  simasConfig: result(state, 'config.CGVConfig', {}),
  newSof: result(state, 'newSourceofFund'),
  accountsBiller: getBillerPossibleAccounts(result(state, 'accounts', []), 'bp'),
  accountsSaving: getAccountSavingOnly(result(state, 'accounts', []), 'bp'),
  accountsTransfer: getTransferPossibleAccounts(result(state, 'accounts', []), 'ft', result(props, 'navigation.state.params.payee', {}), result(props, 'navigation.state.params.isValas', {})),
  emoneyAccount: getPushBillPossibleAccounts(result(state, 'accounts', []), 'bp'),
  accountsBillerWithCC: getTransferPossibleAccountsWithCC(result(state, 'accounts', []), 'bp'),
  creditCardBalance: result(state, 'creditCardBalance', {}),
  enableCCsof: result(state, 'config.enableCCsof', ''),
});

const mapDispatchToProps = (dispatch) => ({
  getConfirmation: (formName, fieldName, values) => {
    dispatch(change(formName, fieldName, values));
    dispatch(NavigationActions.back());
  },
  updateBalances: () => dispatch(updateBalances()),
  goLanding: () => dispatch(toLandingEmall()),
  getCreditCardBalance: (id) => dispatch(getCreditCardBalance(id)),
  inquirySimasPoin: () => dispatch(inquirySimasPoin()),
  checkNew: () => get(storageKeys['NEW_SOF']).
    then((res) => {
      dispatch(actionCreators.saveNewSof(res));
    }),
  getUseSimas: (isUseSimas, emallData, simasPoin) => dispatch(confirmEmallSimas(isUseSimas, emallData, simasPoin)),
});

class SourceAccountPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    accountsBiller: PropTypes.array,
    accountsTransfer: PropTypes.array,
    accountsBillerWithCC: PropTypes.array,
    creditCardBalance: PropTypes.array,
    getConfirmation: PropTypes.func,
    updateBalances: PropTypes.func,
    getPayday: PropTypes.func,
    loadBalancesWithSpinner: PropTypes.func,
    goLanding: PropTypes.func,
    emoneyAccount: PropTypes.array,
    getCreditCardBalance: PropTypes.func,
    simasPoin: PropTypes.object,
    simasConfig: PropTypes.object,
    inquirySimasPoin: PropTypes.func,
    getUseSimas: PropTypes.func,
    checkNew: PropTypes.func,
    newSof: PropTypes.bool,
    accountsSaving: PropTypes.array,
    enableCCsof: PropTypes.string
  };

  selectAccount = (values) => {
    const {navigation, getConfirmation} = this.props;
    const formName = result(navigation, 'state.params.formName', '');
    const fieldName = result(navigation, 'state.params.fieldName', '');
    getConfirmation(formName, fieldName, values);
  };

  componentDidMount () {
    this.props.inquirySimasPoin();
    this.props.checkNew();
  }

  render () {
    const {navigation, accountsBiller, accountsSaving, accountsTransfer, goLanding, getUseSimas, simasPoin, simasConfig, newSof, emoneyAccount, creditCardBalance, getCreditCardBalance, accountsBillerWithCC, enableCCsof} = this.props;
    return <SourceAccount navigation={navigation} accountsBiller={accountsBiller} accountsTransfer={accountsTransfer} 
      getConfirmation={this.selectAccount} onDashboardRefresh={this._onDashboardRefresh} emoneyAccount={emoneyAccount}
      loadBalancesWithSpinner={this.props.loadBalancesWithSpinner} goLanding={goLanding} accountsSaving={accountsSaving}
      getUseSimas={getUseSimas} simasPoin={simasPoin} simasConfig={simasConfig} newSof={newSof}   
      creditCardBalance={creditCardBalance} getCreditCardBalance={getCreditCardBalance}
      accountsBillerWithCC={accountsBillerWithCC} enableCCsof={enableCCsof}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SourceAccountPage);
