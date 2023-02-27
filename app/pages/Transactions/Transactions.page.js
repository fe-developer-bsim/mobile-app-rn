import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {destroy} from 'redux-form';
import Transactions from '../../components/Transactions/Transactions.component';
import {getDetailTransactionHistory} from '../../state/thunks/transactionHistory.thunks';
import {result, filter, find} from 'lodash';
import {updateTransactionFilters, clearTransactions} from '../../state/actions/index.actions';
import {checkShariaAccount} from '../../utils/transformer.util';
import {closeSimasTara} from '../../state/thunks/savingAccount.thunks';
import * as actionCreators from '../../state/actions/index.actions';
import {language} from '../../config/language';
import moment from 'moment';
const DEFAULT_TRANSACTION_FILTER = {value: 'curMonth', label: 'Current Month'};

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
    goToFilter: PropTypes.func,
    allSelectedFilters: PropTypes.object,
    goToCloseSimasTara: PropTypes.func,
    accountsCust: PropTypes.array,
    serverTime: PropTypes.string,
    moreInfo: PropTypes.func,
  }

  componentWillUnmount () {
    this.props.setDefaultTransactionType();
    this.props.destroy();
  }

  goToFilter = () => {
    const {navigation} = this.props;
    navigation.goBack();
  }

  getSelectedFilterType = (allSelectedFilters) => {
    const allType = [result(allSelectedFilters, 'others', false),
      result(allSelectedFilters, 'billPayments', false),
      result(allSelectedFilters, 'withdrawals', false),
      result(allSelectedFilters, 'transfers', false)];
    const size = filter(allType, (value) => value).length;
    return size;
  }

  getFilterText = (selectedFilter, filters) => {
    if (selectedFilter.value === 'selectDateRange') {
      if (moment(filters.selectedStartDate).isSameOrBefore(filters.selectedEndDate)) {
        return filters.selectedStartDate + ' - ' + filters.selectedEndDate;
      } else {
        return filters.selectedEndDate + ' - ' + filters.selectedStartDate;
      }
    } else if (selectedFilter.value === 'currentMonth') {
      return moment().format('MMMM YYYY');
    } else {
      return selectedFilter.label;
    }
  }

  getSelectedFilters = (filters) => Object.keys(filters).filter((key) => filters[key] === true).join(', ')

  render () {
    const {selectedTransactionFilter, transactions, filters, navigation, goToDetailTransaction, allSelectedFilters, serverTime, moreInfo, goToCloseSimasTara, accountsCust} = this.props;
    const selectedFilterType = this.getSelectedFilterType(allSelectedFilters);
    const selectedFilter = filters.selectedFilter;
    const filterText = this.getFilterText(selectedFilter, filters);
    const currency = result(navigation, 'state.params.currency', '');
    const selectedAccount = result(navigation, 'state.params.selectedAccount', '');
    const isShariaAccount = checkShariaAccount(selectedAccount);
    const data = result(navigation, 'state.params.data', {});
    const findAccountNumber = find(accountsCust, function (accList) {
      return accList.accountNumber === data.debitAccountNumber;
    });
    const productType = result(findAccountNumber, 'productType', '');
    const estimatedInterest = result(data, 'initialDeposit', '') * 5 / 100;
    return <Transactions transactions={transactions} currency={currency} header={selectedTransactionFilter.label} filterValue={selectedTransactionFilter.value} selectedFilters={this.getSelectedFilters(filters)}
      goToDetailTransaction={goToDetailTransaction} isShariaAccount={isShariaAccount} selectedAccount={selectedAccount} goToFilter={this.goToFilter} selectedFilter={selectedFilter} filterText={filterText}
      selectedFilterType={selectedFilterType} serverTime={serverTime} moreInfo={moreInfo} goToCloseSimasTara={goToCloseSimasTara} data={data} productType={productType} estimatedInterest={estimatedInterest}
    />;
  }
}

const mapStateToProps = (state) => {
  const selectedTransactionFilter = result(state, 'transactions.filters.selectedFilter', '');
  const transactions = state.transactions[selectedTransactionFilter.value];
  const allSelectedFilters = result(state, 'form.TransactionsFilter.values', {});
  const accountsCust = result(state, 'accounts', []);
  const serverTime = result(state, 'config.serverTime', '');
  return {
    transactions,
    selectedTransactionFilter,
    filters: state.transactions.filters,
    allSelectedFilters,
    accountsCust,
    serverTime
  };
};

const mapDispatchToProps = (dispatch) => ({
  setDefaultTransactionType: () => dispatch(updateTransactionFilters(DEFAULT_TRANSACTION_FILTER)),
  destroy: () => {
    dispatch(updateTransactionFilters({}));
    dispatch(clearTransactions());
    dispatch(destroy('TransactionsFilter'));
  },
  goToDetailTransaction: (statementId, transactionCode, accountTransactions) => dispatch(getDetailTransactionHistory(statementId, transactionCode, accountTransactions)),
  goToCloseSimasTara: (simasTaraAccNo, productType, sourceAccNoSimasTara) => () => dispatch(closeSimasTara(simasTaraAccNo, productType, sourceAccNoSimasTara)),
  moreInfo: () => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      text: language.DASHBOARD__LOCKAMOUNT_INFORMATION,
      button1: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  },
});

const ConnectedTransactionsPage = connect(mapStateToProps, mapDispatchToProps)(TransactionsPage);

export default ConnectedTransactionsPage;
