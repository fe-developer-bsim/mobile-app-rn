import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import EmoneyTopup from '../../components/FundTransferJourney/EmoneyTopup.component';
import result from 'lodash/result';
import find from 'lodash/find';
import {NavigationActions} from 'react-navigation';
import {setupFundTransfer}  from '../../state/thunks/fundTransfer.thunks';

class EmoneyTopupPage extends Component {
  static propTypes = {
    goTransfer: PropTypes.func,
    goToAddPayee: PropTypes.func,
    selectExistingPayee: PropTypes.func,
    payeeList: PropTypes.array,
    emoneyAccount: PropTypes.object,
    accounts: PropTypes.array,
  }

  goTransfer = () => {
    const {goToAddPayee, selectExistingPayee, payeeList, emoneyAccount} = this.props;
    const accountNumber = result(emoneyAccount, 'accountNumber', '');
    const foundPayee = find(payeeList, {accountNumber});
    foundPayee ? selectExistingPayee(foundPayee) : goToAddPayee(accountNumber);
  }

  render () {
    const {accounts, emoneyAccount} = this.props;
    const accountNumber = result(emoneyAccount, 'accountNumber', '');
    return <EmoneyTopup goTransfer={this.goTransfer} accounts={accounts} accountNumber={accountNumber}/>;
  }
}

const mapStateToProps = (state) => ({
  payeeList: result(state, 'payees', []),
  emoneyAccount: find(result(state, 'accounts', []), {accountType: 'emoneyAccount'}),
  accounts: result(state, 'accounts', [])
});

const mapDispatchToProps = (dispatch) => ({
  goToAddPayee: (payeeAccNo) => {
    dispatch(NavigationActions.navigate({routeName: 'AddPayee', params: {payeeAccNo, ownEmoney: true}}));
  },
  selectExistingPayee: (payee) => {
    dispatch(setupFundTransfer(payee));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EmoneyTopupPage);
