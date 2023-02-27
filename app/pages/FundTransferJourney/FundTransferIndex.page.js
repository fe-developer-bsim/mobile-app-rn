import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import FundTransferIndex from '../../components/FundTransferJourney/FundTransferIndex.component';
import {setupFundTransfer} from '../../state/thunks/fundTransfer.thunks';
import result from 'lodash/result';

class FundTransferIndexPage extends Component {
  static propTypes = {
    goToAddPayee: PropTypes.func,
    selectExistingPayee: PropTypes.func,
    lastTransfers: PropTypes.array,
    payees: PropTypes.array,
  }
  render () {
    const {goToAddPayee, lastTransfers, selectExistingPayee, payees, ...extraProps} = this.props;
    return <FundTransferIndex onNewTransfer={goToAddPayee} onRecentTransfer={selectExistingPayee} payees={payees} recentTransferList={lastTransfers} {...extraProps}/>;
  }
}

const mapStateToProps = (state) => ({
  lastTransfers: result(state, 'lastFundTransactions.recentTransactions', []),
  language: state.currentLanguage,
  payees: state.payees,
});

const mapDispatchToProps = (dispatch) => ({
  goToAddPayee: () => {
    dispatch(NavigationActions.navigate({routeName: 'AddPayeeAccount'}));
  },
  selectExistingPayee: (payee) => {
    dispatch(setupFundTransfer(payee));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FundTransferIndexPage);
