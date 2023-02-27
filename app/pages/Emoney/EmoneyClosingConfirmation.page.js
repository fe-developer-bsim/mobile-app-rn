import React from 'react';
import PropTypes from 'prop-types';
import EmoneyClosingConfirmationWithBalance from '../../components/EmoneyJourney/EmoneyClosingConfirmation.component';
import EmoneyClosingConfirmationNoBalance from '../../components/EmoneyJourney/EmoneyClosingConfirmationNoBalance.component';
import {connect} from 'react-redux';
import {closeEmoneyAcc} from '../../state/thunks/dashboard.thunks';
import result from 'lodash/result';
import find from 'lodash/find';
import {NavigationActions} from 'react-navigation';

const mapStateToProps = (state) => ({
  currentLanguage: result(state, 'currentLanguage.id', ''),
  accounts: result(state, 'accounts', []),
});


const mapDispatchToProps = (dispatch) => ({
  closeEmoney: () => dispatch(closeEmoneyAcc()),
  backToDashboard: (accounts) => {
    if (find(accounts, {accountType: 'emoneyAccount'}) && accounts.length === 1) {
      dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'ConfirmClosingEmoney'}),
        ]
      }));
    }
    dispatch(NavigationActions.navigate({routeName: 'HomeScreen'}));
  }
});

class EmoneyClosingConfirmationPage extends React.Component {
  static propTypes = {
    currentLanguage: PropTypes.string,
    accounts: PropTypes.array,
    closeEmoney: PropTypes.func,
    backToDashboard: PropTypes.func,
    emoneyBalance: PropTypes.string,
    showServices: PropTypes.bool,
  }

  goToDashboard = () => {
    const {backToDashboard, accounts} = this.props;
    backToDashboard(accounts);
  }

  goCloseEmoney = () => {
    const {closeEmoney} = this.props;
    closeEmoney();
  }

  render () {
    const {currentLanguage, accounts} = this.props;
    const emoney = find(accounts, {accountType: 'emoneyAccount'});
    const emoneyBalance = result(emoney, 'balances.availableBalance');
    if (emoneyBalance === 0.0 || emoneyBalance === 0) {
      return <EmoneyClosingConfirmationNoBalance
        goCloseEmoney={this.goCloseEmoney}
        restartApp={this.restartApp}
        currentLanguage={currentLanguage}
        {...this.props}/>;
    } else {
      return <EmoneyClosingConfirmationWithBalance
        goToDashboard={this.goToDashboard}
        restartApp={this.restartApp}
        currentLanguage={currentLanguage}
        {...this.props}/>;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmoneyClosingConfirmationPage);

