import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './CreditCardHistoryOptions.styles';
import {Field} from 'redux-form';
import {SinarmasButton, SinarmasPicker} from '../../components/FormComponents';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import noop from 'lodash/noop';
import {language} from '../../config/language';

class CreditCardHistoryOptions extends React.Component {
  static propTypes = {
    rangeOptions: PropTypes.array,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool
  }

  render () {
    const {rangeOptions = [], submitting, handleSubmit = noop, invalid} = this.props;
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.formInputWrapper}>
            <Text style={styles.dropdownLabel}>{language.CREDIT_CARD__BILL_PERIOD}</Text>
            <Field
              name='selectedRange'
              placeholder={language.CREDIT_CARD__SELECT_BILL_PERIOD}
              component={SinarmasPicker}
              itemList={rangeOptions}
              labelKey='label'/>
          </View>
        </View>
        <SinarmasButton disabled={submitting || invalid} onPress={wrapMethodInFunction(handleSubmit)} text={language.CREDIT_CARD__DOWNLOAD_BUTTON} buttonType = 'primary'/>
      </View>);
  }
}

export default CreditCardHistoryOptions;
