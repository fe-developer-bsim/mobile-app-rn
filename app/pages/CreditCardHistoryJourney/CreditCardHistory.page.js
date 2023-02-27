import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CcHistory from '../../components/CreditCardHistoryJourney/CreditCardHistory.component';
import result from 'lodash/result';
import {clearCcHistory} from '../../state/actions/index.actions';
import {NavigationActions} from 'react-navigation';

class CcHistoryPage extends Component {
  static propTypes = {
    history: PropTypes.array,
    destroy: PropTypes.func,
    navigation: PropTypes.object,
    goToFilter: PropTypes.func,
  }

  componentWillUnmount () {
    this.props.destroy();
  }

  render () {
    const {history, navigation, goToFilter} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount', {});
    const creditCardDetail = result(navigation, 'state.params.creditCardDetail', {});
    return <CcHistory transactions={history} selectedAccount={selectedAccount}
      creditCardDetail={creditCardDetail} goToFilter={goToFilter(selectedAccount.accountNumber)} navigation={navigation}/>;
  }
}

const mapStateToProps = (state) => {
  const history = result(state, 'creditCardHistory.creditCardTransactions');
  return {
    history
  };
};

const mapDispatchToProps = (dispatch) => ({
  destroy: () => {
    dispatch(clearCcHistory());
  },
  goToFilter: (accNo) => () => {
    dispatch(NavigationActions.navigate({routeName: 'CcDownloadOptions', params: {creditCardNumber: accNo}}));
  }
});

const ConnectedCcHistoryPage = connect(mapStateToProps, mapDispatchToProps)(CcHistoryPage);

export default ConnectedCcHistoryPage;
