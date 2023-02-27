import React from 'react';
import PropTypes from 'prop-types';
import AccountMenu from '../../components/OnboardingJourney/EmoneyDashboard.component.js';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {getTargetAccount} from '../../state/thunks/common.thunks';
import {NavigationActions} from 'react-navigation';
import {upperCase, getEmoneyAccount} from '../../utils/transformer.util';
import {updateTransactionEmoneyHistory, exportTransactionHistory} from '../../state/thunks/transactionHistory.thunks';
import toLower from 'lodash/toLower';
import {updateTransactionFiltersEmoney} from '../../state/actions/index.actions';
// import firebase from 'react-native-firebase';
// let Analytics = firebase.analytics();

const DEFAULT_TRANSACTION_FILTER = {selectedRange: {value: 'lastMonth', label: 'Last Month'}};

const mapStateToProps = (state) => ({
  currentLanguage: state.currentLanguage.id,
  profile: result(state, 'user.profile', {}),
  profilePicture: result(state, 'savePicture', ''),
  isUndian: upperCase(result(state, 'config.flag.flagUndian', 'INACTIVE')) === upperCase('ACTIVE'),
  couponCounterDetail: result(state, 'couponCounterDetail', 0),
  orderData: result(state, 'myDataOrder', []),
  luckyDipCounter: result(state, 'counterLuckyDip.currentToken', '0'),
  isLuckyDipActive: result(state, 'config.flag.flagLuckyDip', 'inactive'),
  transactions: result(state, 'transactionsEmoney'),
  emoneyAccounts: getEmoneyAccount(result(state, 'accounts', []), 'bp'),
  emoney: result(state, 'emoney', {}),
  cif: result(state, 'user.profile.customer.cifCode', ''),
  primaryToogleAccount: result(state, 'primaryToogleAccount', false),
  switchAccountToogleBE: toLower(result(state, 'config.flag.primaryToogleAccount', 'inactive')) === 'active',
});
const mapDispatchToProps = (dispatch) => ({
  updateTransactionEmoneyHistory: (accountNumber) => {
    dispatch(updateTransactionEmoneyHistory('', accountNumber));
    dispatch(updateTransactionFiltersEmoney(DEFAULT_TRANSACTION_FILTER));
  },
  goToEmoneyHistory: (accountNumber) => {
    dispatch(NavigationActions.navigate({routeName: 'TransactionEmoneyScreen', params: {accountNumber: accountNumber}}));
  },
  goToTopUp: () => {
    dispatch(getTargetAccount());
    dispatch(NavigationActions.navigate({routeName: 'EmoneyTopUpATM', params: {isKyc: true}}));
  },
  gotoTopUpNkc: () => {
    dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Landing'})
      ]
    }));
    dispatch(NavigationActions.navigate({routeName: 'EmoneyTopUpATM'}));
  },
  upgradeKyc: () => {
    // const os = Platform.OS;
    // Analytics.logEvent('UPGRADE_EMONEY', {device: os, step_route: '1'});
    dispatch(NavigationActions.navigate({routeName: 'EmoneyUpgradeBenefit'}));
  },
  exportTransaction: (accNumber) => dispatch(exportTransactionHistory(accNumber)),
  goToSwitchpage: () => {
    dispatch(NavigationActions.navigate({routeName: 'SetDefaultAutoDebitScreen'}));
  },
});

class AccountMenuPage extends React.Component {

  static propTypes = {
    updateTransactionEmoneyHistory: PropTypes.func,
    transactions: PropTypes.array,
    emoneyAccounts: PropTypes.object,
    goToAllTransactions: PropTypes.func,
    goToEmoneyHistory: PropTypes.func,
    emoney: PropTypes.object,
    goToTopUp: PropTypes.func,
    cif: PropTypes.string,
    upgradeKyc: PropTypes.func,
    gotoTopUpNkc: PropTypes.func,
    exportTransaction: PropTypes.func,
    sendMail: PropTypes.func,
    primaryToogleAccount: PropTypes.bool,
    goToSwitchpage: PropTypes.func,
    switchAccountToogleBE: PropTypes.bool
  }

  _goToEmoneyHistoryNavigate=() => {
    const {goToEmoneyHistory, emoneyAccounts} = this.props;
    const accountNumber = result(emoneyAccounts, 'accountNumber', '');
    goToEmoneyHistory(accountNumber);
  }


  sendMail = (accNumber) => () => {
    const {exportTransaction} = this.props;
    exportTransaction(accNumber);
  }

  componentWillMount () {
    const {emoneyAccounts} = this.props;
    const accountNumber = result(emoneyAccounts, 'accountNumber', '');
    this.props.updateTransactionEmoneyHistory(accountNumber);
  }

  render () {
    const {transactions, emoneyAccounts, emoney, goToTopUp, cif, upgradeKyc, gotoTopUpNkc, primaryToogleAccount, goToSwitchpage, switchAccountToogleBE} = this.props;
    return <AccountMenu transactions={transactions} goToAllTransactions={this._goToEmoneyHistoryNavigate} emoneyAccounts={emoneyAccounts} emoney={emoney}
      goToTopUp={goToTopUp} gotoTopUpNkc={gotoTopUpNkc} cif={cif} upgradeKyc={upgradeKyc} sendMail={this.sendMail} primaryToogleAccount={primaryToogleAccount} goToSwitchpage={goToSwitchpage} switchAccountToogleBE={switchAccountToogleBE}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMenuPage);
