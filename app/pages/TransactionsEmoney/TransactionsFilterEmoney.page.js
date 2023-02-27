import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import TransactionsFilter from '../../components/TransactionsEmoney/TransactionsFilterEmoney.component';
import {updateTransactionFiltersEmoney} from '../../state/actions/index.actions';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {validateRequiredFields} from '../../utils/validator.util';

const formConfig = {
  form: 'TransactionsFilterEmoney',
  onSubmit: (values, dispatch) => {
    dispatch(updateTransactionFiltersEmoney(values));
    dispatch(NavigationActions.back());
  },
  validate: (values) => ({
    ...validateRequiredFields(values, ['selectedRange']),
  }),
  initialValues: {
    others: false,
    billPayments: false,
    withdrawals: false,
    transfers: false,
  },
  destroyOnUnmount: false
};

const mapStateToProps = (state) => ({
  formValues: result(state, 'form.TransactionsFilterEmoney.values', {})
});

const DecoratedTransactionsFilter = reduxForm(formConfig)(TransactionsFilter);

class TransactionsFilterPage extends Component {
  static propTypes = {
    formValues: PropTypes.object
  }
  rangeOptions = [ // MIGHT BE USED LATER IF THE HEADING IS SUPPOSED TO BE DIFFERENT THAN THE DROPDOWN LABEL
    {value: 'last10', label: 'Last 10 transactions'},
    {value: 'lastMonth', label: 'Last Month'},
    {value: 'last2Months', label: 'Last 2 Months'},
    {value: 'last3Months', label: 'Last 3 Months'}
  ]
  render () {
    const isCheckboxDisabled = result(this.props, 'formValues.selectedRange.value', '') === 'last10';
    return <DecoratedTransactionsFilter rangeOptions={this.rangeOptions} isCheckboxDisabled={isCheckboxDisabled}/>;
  }
}


export default connect(mapStateToProps)(TransactionsFilterPage);
