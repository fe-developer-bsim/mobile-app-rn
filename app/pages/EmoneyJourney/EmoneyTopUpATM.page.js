import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EmoneyTopUpATM from '../../components/EmoneyJourney/EmoneyTopUpATM.component';
import {connect} from 'react-redux';
import {StackActions, NavigationActions} from 'react-navigation';
import {isEmpty, find, filter} from 'lodash';
import {setupFundTransfer} from '../../state/thunks/fundTransfer.thunks';

const mapStateToProps = ({
  currentLanguage,
  config,
  user,
  accounts,
  payees,
}) => ({
  currentLanguage,
  config,
  isLogin: !isEmpty(user),
  emoneyAccount: find(accounts, {accountType: 'emoneyAccount'}),
  allAccounts: filter(accounts, function (o) {
    return (
      o.accountType === 'SavingAccount' || o.accountType === 'CurrentAccount'
    );
  }),
  accounts: accounts,
  payees,
});

const mapDispatchToProps = dispatch => ({
  goToATM: () => {
    dispatch(NavigationActions.navigate({routeName: 'EmoneyTopUpATM'}));
  },
  goToPayment: (availablePayeeList, payeeAccNo) => {
    if (availablePayeeList) {
      dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'Landing'})],
        }),
      );
      dispatch(setupFundTransfer(payeeAccNo));
    } else {
      dispatch(
        NavigationActions.navigate({
          routeName: 'AddPayee',
          params: {payeeAccNo},
        }),
      );
    }
  },
});

class ChooseEmoneyTopUpATM extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToATM: PropTypes.func,
    currentLanguage: PropTypes.object,
    emoneyAccount: PropTypes.object,
    allAccounts: PropTypes.object,
    payees: PropTypes.array,
    goToPayment: PropTypes.func,
  };
  checkPayee = () => {
    const {goToPayment, payees, emoneyAccount} = this.props;
    const accountNumber = emoneyAccount.accountNumber;
    const checkPayee = find(payees, {accountNumber});
    const isPayee = checkPayee === undefined ? null : checkPayee;
    goToPayment(isPayee, checkPayee);
  };
  render() {
    const {goToATM, emoneyAccount, allAccounts, currentLanguage} = this.props;
    const checkAccount = isEmpty(allAccounts);
    return (
      <EmoneyTopUpATM
        goToATM={goToATM}
        emoneyAccount={emoneyAccount}
        allAccounts={allAccounts}
        checkAccount={checkAccount}
        checkPayee={this.checkPayee}
        currentLanguage={currentLanguage}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChooseEmoneyTopUpATM);
