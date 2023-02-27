import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './TransactionsFilterEmoney.styles';
import {Field} from 'redux-form';
import {CheckBox, SinarmasButton, SinarmasPicker} from '../../components/FormComponents';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import noop from 'lodash/noop';
import {language} from '../../config/language';

class TransactionsFilter extends React.Component {
  static propTypes = {
    rangeOptions: PropTypes.array,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    isCheckboxDisabled: PropTypes.bool,
    invalid: PropTypes.bool
  }

  render () {
    const {rangeOptions = [], submitting, handleSubmit = noop, isCheckboxDisabled = false, invalid} = this.props;
    const checkboxProps = {checkboxStyle: styles.checkboxStyle, containerStyle: styles.checkboxContainerStyle,
      labelStyle: styles.checkboxLabelStyle, disabled: isCheckboxDisabled};
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.formInputWrapper}>
            <Text style={styles.dropdownLabel}>{language.TRANSACTION_FILTER__FILTER_BY_DATE}</Text>
            <Field
              name='selectedRange'
              placeholder={language.TRANSACTION_FILTER__FILTER_PLACEHOLDER}
              component={SinarmasPicker}
              itemList={rangeOptions}
              labelKey='label'/>
          </View>
          {isCheckboxDisabled ? 
            null :
            <View style={styles.formInputWrapper}>
              <Text style={styles.checkboxLabel}>{language.TRANSACTION_FILTER__FILTER_BY_TRANSACTION}</Text>
              <Field name='transfers' component={CheckBox} label={language.TRANSACTION_FILTER__FILTER_FUND_TRANSFER} {...checkboxProps}/>
              <Field name='billPayments' component={CheckBox} label={language.TRANSACTION_FILTER__FILTER_BILL_PAYMENT} {...checkboxProps}/>
              <Field name='withdrawals' component={CheckBox} label={language.TRANSACTION_FILTER__FILTER_WITHDRAWALS} {...checkboxProps}/>
              <Field name='others' component={CheckBox} label={language.TRANSACTION_FILTER__FILTER_OTHERS} {...checkboxProps}/>
            </View>}
        </View>
        <SinarmasButton disabled={submitting || invalid} onPress={wrapMethodInFunction(handleSubmit)} text={language.TRANSACTION_FILTER__FILTER_BUTTON} buttonType = 'primary'/>
      </View>);
  }
}

export default TransactionsFilter;
