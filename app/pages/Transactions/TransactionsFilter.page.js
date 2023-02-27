import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import TransactionsFilter from '../../components/Transactions/TransactionsFilter.component';
import {downloadTransactionHistory, updateTransactionHistoryNew} from '../../state/thunks/transactionHistory.thunks';
import {updateTransactionFilters} from '../../state/actions/index.actions';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {validateRequiredFields} from '../../utils/validator.util';
import {language} from '../../config/language';
import moment from 'moment/min/moment-with-locales';
import {showSpinner} from '../../state/actions/index.actions';

const formConfig = {
  form: 'TransactionsFilter',
  onSubmit: (values, dispatch, props) => {
    const accountInfo = result(props, 'navigation.state.params.accountInfo', {});
    const accountNumber = result(accountInfo, 'accountNumber', '');
    const accountCurrency = result(accountInfo, 'currency', '');
    const selectedFilterValue = result(values, 'selectedFilter.value', '');
    const downloadPdf = result(values, 'downloadPdf', false);
    const sendToEmail = result(values, 'sendToEmail', false);
    props.showAlert(false);
    dispatch(updateTransactionFilters(values));
    if (selectedFilterValue === 'selectMonth' && !sendToEmail) {
      dispatch(downloadTransactionHistory(selectedFilterValue, accountNumber));
    } else {
      dispatch(updateTransactionHistoryNew(selectedFilterValue, accountNumber, sendToEmail)).then((res) => {
        const status = result(res, 'resStatus', '');
        if (downloadPdf) {
          if (selectedFilterValue === 'selectMonth' && status !== 200) {
            dispatch(showSpinner());
            setTimeout(() => {
              dispatch(downloadTransactionHistory(selectedFilterValue, accountNumber));
            }, 2000);
          } else {
            dispatch(downloadTransactionHistory(selectedFilterValue, accountNumber));
          }
        } 
        if (selectedFilterValue !== 'selectMonth' && status === 200) {
          dispatch(NavigationActions.navigate({
            routeName: 'Transactions',
            params: {
              accountNumber: accountNumber,
              currency: accountCurrency,
              selectedAccount: accountInfo,
              filters: values
            },
            reload: true
          }));
        }
      });
    }
  },
  validate: (values) => ({
    ...validateRequiredFields(values, ['selectedFilter']),
    ...validateRequiredFields(values, ['selectedRange']),
    ...validateRequiredFields(values, ['selectedStartDate']),
    ...validateRequiredFields(values, ['selectedEndDate']),
    
  }),
  initialValues: {
    downloadPdf: false,
    sendToEmail: false
  },
  destroyOnUnmount: true
};

const mapStateToProps = (state) => ({
  formValues: result(state, 'form.TransactionsFilter.values', {}),
  serverTime: result(state, 'timeConfig.serverTime', 0),
  email: result(state, 'user.profile.email', ''),
  currentLanguage: result(state, 'currentLanguage.id', 'en'),
});

const mapDispatchToProps = (dispatch) => ({
  updateDownloadField: (status) => dispatch(change('TransactionsFilter', 'downloadPdf', status)),
  updateSendEmailField: (status) => dispatch(change('TransactionsFilter', 'sendToEmail', status)),
  defaultMonthField: (value) => dispatch(change('TransactionsFilter', 'selectedRange', value)),
  defaultStartDateField: (value) => dispatch(change('TransactionsFilter', 'selectedStartDate', value)),
  defaultEndDateField: (value) => dispatch(change('TransactionsFilter', 'selectedEndDate', value)),
});

const DecoratedTransactionsFilter = reduxForm(formConfig)(TransactionsFilter);

class TransactionsFilterPage extends Component {
  static propTypes = {
    formValues: PropTypes.object,
    servertime: PropTypes.string,
    email: PropTypes.string,
    navigation: PropTypes.object,
    updateDownloadField: PropTypes.func,
    updateSendEmailField: PropTypes.func,
    defaultMonthField: PropTypes.func,
    defaultStartDateField: PropTypes.func,
    defaultEndDateField: PropTypes.func,
    backToBankAcc: PropTypes.func,
    serverTime: PropTypes.string,
    currentLanguage: PropTypes.string,
  }

  state = {
    showAlert: false,
  }

  showAlert = (status) => {
    this.setState({showAlert: status});
  }

  getPreviousMonth = (month, type) => { 
    const value = moment(this.props.serverTime);
    if (type && type === 'label') {
      value.locale(this.props.currentLanguage);
    } else {
      value.locale('en');
    }
    return (
      value.subtract(month, 'M').format('MMMM YYYY')
    );
  }

  getFilterText = (selectedFilter) => {
    if (selectedFilter === 'selectMonth') {
      return language.TRANSACTION_FILTER__ALERT_CONTENT_MONTHLY;
    } else if (selectedFilter === 'selectDateRange') {
      const start = result(this.props, 'formValues.selectedStartDate');
      const end = result(this.props, 'formValues.selectedEndDate');
      if (moment(start).isSameOrBefore(end)) {
        return start + ' - ' + end;
      } else {
        return end + ' - ' + start;
      }
    } else {
      return result(this.props, 'formValues.selectedFilter.label', '').toLowerCase();
    }
  }

  componentDidUpdate (prevProps) {
    const selectedFilter = result(this.props, 'formValues.selectedFilter.value', '');
    const defaultDate = moment().format('DD MMM YYYY');
    const {updateDownloadField, defaultMonthField, defaultStartDateField, defaultEndDateField} = this.props;
    if (!prevProps.formValues.selectedFilter) {
      if (selectedFilter === 'selectMonth') {
        updateDownloadField(true);
        defaultMonthField(this.rangeOptions[0]);
      } else if (selectedFilter === 'selectDateRange') {
        defaultStartDateField(defaultDate);
        defaultEndDateField(defaultDate);
      }
    } else if (selectedFilter !== prevProps.formValues.selectedFilter.value) {
      if (selectedFilter === 'selectMonth') {
        updateDownloadField(true);
        if (!prevProps.formValues.selectedRange) {
          defaultMonthField(this.rangeOptions[0]);
        }
      } else {
        if (selectedFilter === 'selectDateRange') {
          if (!prevProps.formValues.selectedStartDate) {
            defaultStartDateField(defaultDate);
          }
          if (!prevProps.formValues.selectedEndDate) {
            defaultEndDateField(defaultDate);
          }
        }
      }
    }
  }

  filterOptions = [
    {value: 'today', label: language.TRANSACTION_FILTER__FILTER_TODAY},
    {value: 'currentMonth', label: language.TRANSACTION_FILTER__FILTER_CURRENT_MONTH},
    {value: 'selectMonth', label: language.TRANSACTION_FILTER__FILTER_SELECT_MONTH},
    {value: 'selectDateRange', label: language.TRANSACTION_FILTER__FILTER_DATE_RANGE}
  ]
  rangeOptions = [ // MIGHT BE USED LATER IF THE HEADING IS SUPPOSED TO BE DIFFERENT THAN THE DROPDOWN LABEL
    {value: this.getPreviousMonth(1), label: this.getPreviousMonth(1, 'label')},
    {value: this.getPreviousMonth(2), label: this.getPreviousMonth(2, 'label')},
    {value: this.getPreviousMonth(3), label: this.getPreviousMonth(3, 'label')},
    {value: this.getPreviousMonth(4), label: this.getPreviousMonth(4, 'label')},
    {value: this.getPreviousMonth(5), label: this.getPreviousMonth(5, 'label')},
    {value: this.getPreviousMonth(6), label: this.getPreviousMonth(6, 'label')},
  ]
  render () {
    const {navigation, formValues, email, updateDownloadField, updateSendEmailField} = this.props;
    const selectedFilter = result(this.props, 'formValues.selectedFilter.value', '');
    const maxDate = moment().format('MM/DD/YYYY');
    const minDate = moment().subtract(40, 'd'). format('MM/DD/YYYY');
    const filterText = this.getFilterText(selectedFilter);
    const isCheckboxDisabled = selectedFilter === 'selectMonth';
    return <DecoratedTransactionsFilter 
      rangeOptions={this.rangeOptions} 
      isCheckboxDisabled={isCheckboxDisabled} 
      filterOptions={this.filterOptions} 
      selectedFilter={selectedFilter} 
      email={email} 
      goToTransactions={this.goToTransactions} 
      navigation={navigation} 
      formValues={formValues}
      maxDate={maxDate}
      minDate={minDate}
      alertStatus={this.state.showAlert}
      showAlert={this.showAlert}
      filterText={filterText}
      updateDownloadField={updateDownloadField}
      updateSendEmailField={updateSendEmailField}/>;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TransactionsFilterPage);
