import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {destroy} from 'redux-form';
import Transactions from '../../components/TransactionsEmoney/TransactionsEmoney.component';
import {updateTransactionEmoneyHistory, getDetailTransactionEmoneyHistory, exportTransactionHistory} from '../../state/thunks/transactionHistory.thunks';
import result from 'lodash/result';
import {updateTransactionFiltersEmoney} from '../../state/actions/index.actions';
import isEqual from 'lodash/isEqual';
import {checkShariaAccount} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';

const DEFAULT_TRANSACTION_FILTER = {selectedRange: {value: 'lastMonth', label: 'Last Month'}};

class TransactionsPage extends Component {
  static propTypes = {
    loadFilteredTransactions: PropTypes.func,
    setDefaultTransactionType: PropTypes.func,
    destroy: PropTypes.func,
    transactions: PropTypes.array,
    navigation: PropTypes.object,
    selectedTransactionFilter: PropTypes.object,
    filters: PropTypes.object,
    goToDetailTransaction: PropTypes.func,
    sendMail: PropTypes.func,
    exportTransaction: PropTypes.func,
    goToFilter: PropTypes.func,
  }

  // componentDidMount () {
  //   const {loadFilteredTransactions, navigation, setDefaultTransactionType} = this.props;
  //   const accountNumber = result(navigation, 'state.params.accountNumber', '');
  //   setDefaultTransactionType();
  //   loadFilteredTransactions(DEFAULT_TRANSACTION_FILTER.selectedRange.value, accountNumber); // by default load last 30 days transactions if filter is not there
  // }

  componentDidMount () {
    const {setDefaultTransactionType} = this.props;
    setDefaultTransactionType();
  }
  componentWillUnmount () {
    this.props.destroy();
  }
  componentWillReceiveProps (newProps) {
    const {loadFilteredTransactions, navigation, filters} = this.props;
    if (!isEqual(filters, newProps.filters)) {
      const accountNumber = result(navigation, 'state.params.accountNumber', '');
      loadFilteredTransactions(newProps.selectedTransactionFilter.value, accountNumber);
    }
  }
  getSelectedFilters = (filters) => Object.keys(filters).filter((key) => filters[key] === true).join(', ')

  sendMail = (accNumber) => () => {
    const {exportTransaction} = this.props;
    exportTransaction(accNumber);
  }

  render () {
    const {selectedTransactionFilter, transactions, filters, navigation, goToDetailTransaction, goToFilter} = this.props;
    const currency = result(navigation, 'state.params.currency', '');
    const accountNumber = result(navigation, 'state.params.accountNumber', '');
    const isShariaAccount = checkShariaAccount(accountNumber);
    return <Transactions transactions={transactions} currency={currency} header={selectedTransactionFilter.label} filterValue={selectedTransactionFilter.value} selectedFilters={this.getSelectedFilters(filters)}
      goToDetailTransaction={goToDetailTransaction} isShariaAccount={isShariaAccount} sendMail={this.sendMail} accountNumber={accountNumber} goToFilter={goToFilter}
    />;
  }
}

const mapStateToProps = (state) => {
  const selectedTransactionFilter = result(state, 'transactionsEmoney.filters.selectedRange', DEFAULT_TRANSACTION_FILTER);
  const transactions = state.transactionsEmoney[selectedTransactionFilter.value];
  return {
    transactions,
    selectedTransactionFilter,
    filters: state.transactionsEmoney.filters
  };
};

const mapDispatchToProps = (dispatch) => ({
  setDefaultTransactionType: () => dispatch(updateTransactionFiltersEmoney(DEFAULT_TRANSACTION_FILTER)),
  loadFilteredTransactions: (filterValue, accountNumber) => {
    dispatch(updateTransactionEmoneyHistory(filterValue, accountNumber));
  },
  destroy: () => {
    dispatch(updateTransactionFiltersEmoney({}));
    // dispatch(clearTransactionsEmoney());
    dispatch(destroy('TransactionsFilterEmoney'));
  },
  goToDetailTransaction: (statementId, transactionCode, accountTransactions, description, creditAmount, debitAmount) => dispatch(getDetailTransactionEmoneyHistory(statementId, transactionCode, accountTransactions, description, creditAmount, debitAmount)),
  exportTransaction: (accNumber) => dispatch(exportTransactionHistory(accNumber)),
  goToFilter: () => {
    dispatch(NavigationActions.navigate({routeName: 'TransactionFilterEmoneyScreen'}));
  },
});

const ConnectedTransactionsPage = connect(mapStateToProps, mapDispatchToProps)(TransactionsPage);

export default ConnectedTransactionsPage;
