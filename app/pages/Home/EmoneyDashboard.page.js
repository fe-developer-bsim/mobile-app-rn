import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DashboardComponent from '../../components/Home/EmoneyDashboard.component';
import result from 'lodash/result';
import startCase from 'lodash/startCase';
import toLower from 'lodash/toLower';
import find from 'lodash/find';
import {showUpgradeFull, emoneyUpgradeModal, showDefaultAccountModal} from '../../state/thunks/dashboard.thunks';
import {inquirySimasPoin} from '../../state/thunks/common.thunks';
import {NavigationActions} from 'react-navigation';
import {openSavingAccount} from '../../state/thunks/savingAccount.thunks';

const mapStateToProps = (state) => ({
  userName: startCase(result(state, 'user.profile.title', '').toLowerCase()) + '. ' + startCase(toLower(result(state, 'user.profile.name', ''))),
  accounts: result(state, 'accounts', []),
  emoney: result(state, 'emoney', {}),
  cif: result(state, 'user.profile.customer.cifCode', ''),
  language: result(state, 'currentLanguage', {}),
  state: state,
  simasPoin: state.simasPoin,
  nav: result(state, 'nav', {})
});

const mapDispatchToProps = (dispatch) => ({
  showUpgradeEmoney: () => dispatch(NavigationActions.navigate({routeName: 'TermsEmoney'})),
  showUpgradeFull: () => dispatch(showUpgradeFull()),
  cardLessWithdrawal: () => {
    dispatch(NavigationActions.navigate({routeName: 'CardLessWithdrawalIndex'}));
  },
  topUp: () => {
    dispatch(NavigationActions.navigate({routeName: 'EmoneyTopup'}));
  },
  goToEmoneyHistory: (accountNumber) => dispatch(NavigationActions.navigate({routeName: 'TransactionEmoneyScreen', params: {accountNumber: accountNumber}})),
  goTopUp: () => dispatch(NavigationActions.navigate({routeName: 'EmoneyTopUpATM'})),
  inquirySimasPoin: () => dispatch(inquirySimasPoin()),
  SimasPoinHistory: () => {
    dispatch(NavigationActions.navigate({routeName: 'SimasPoinHistory'}));
  },
  goUpgradeModal: () => {
    dispatch(emoneyUpgradeModal());
  },
  openSaving: (nav) => {
    dispatch(openSavingAccount(nav));
  },
  setDefaultAccEmoney: (data) => () => {
    dispatch(showDefaultAccountModal(data));
  },
});

class Dashboard extends Component {

  static propTypes = {
    userName: PropTypes.string,
    cif: PropTypes.string,
    emoney: PropTypes.object,
    accounts: PropTypes.array,
    showUpgradeEmoney: PropTypes.func,
    showUpgradeFull: PropTypes.func,
    cardLessWithdrawal: PropTypes.func,
    topUp: PropTypes.func,
    language: PropTypes.object,
    goToEmoneyHistory: PropTypes.func,
    simasPoin: PropTypes.object,
    inquirySimasPoin: PropTypes.func,
    SimasPoinHistory: PropTypes.func,
    goTopUp: PropTypes.func,
    goUpgradeModal: PropTypes.func,
    openSaving: PropTypes.func,
    nav: PropTypes.object,
    setDefaultAccEmoney: PropTypes.func
  }

  state = {
    dashboardRefreshing: false
  }

  goUpgrade = () => {
    const {goUpgradeModal} = this.props;
    goUpgradeModal();
  }

  goToEmoneyHistoryNavigate=() => {
    const {goToEmoneyHistory, accounts} = this.props;
    const accountEmoney = find(accounts, {productType: 'Emoney Account'});
    const accountNumber = result(accountEmoney, 'accountNumber', '');
    goToEmoneyHistory(accountNumber);
  }

  goToTopUp = () => {
    const {goTopUp} = this.props;
    goTopUp();
  }

  _onDashboardRefresh = () => {
    this.setState({dashboardRefreshing: true});
    setTimeout(() => {
      this.setState({dashboardRefreshing: false});
    }, 0);
  }

  cardLessWithdrawal = () => {
    if (!this.state.cardlessDisabled) {
      this.setState({cardlessDisabled: true});
      this.props.cardLessWithdrawal();
      setTimeout(() => {
        this.setState({cardlessDisabled: false});
      }, 2000);
    }
  }

  render () {
    const {userName, emoney, cif, showUpgradeEmoney, SimasPoinHistory,
      showUpgradeFull, topUp, language, simasPoin, inquirySimasPoin, openSaving, nav, setDefaultAccEmoney} = this.props;
    return (
      <DashboardComponent userName={userName} emoney={emoney} cif={cif}
        showUpgradeEmoney={showUpgradeEmoney} showUpgradeFull={showUpgradeFull} cardLessWithdrawal={this.cardLessWithdrawal}
        topUp={topUp} currLanguage={language} goToEmoneyHistoryNavigate= {this.goToEmoneyHistoryNavigate}
        refreshing={this.state.dashboardRefreshing} onDashboardRefresh={this._onDashboardRefresh}
        simasPoin={simasPoin} inquirySimasPoin={inquirySimasPoin} SimasPoinHistory={SimasPoinHistory}
        goUpgrade={this.goUpgrade} goToTopUp={this.goToTopUp} openSaving={openSaving} nav={nav}
        setDefaultAccEmoney={setDefaultAccEmoney}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
