import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasInput, SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import noop from 'lodash/noop';
import {formatMobileNumber, wrapMethodInFunction, formatFieldName} from '../../utils/transformer.util';
import styles from './CardLessWithdrawalAccount.component.style';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';

class CardLessWithdrawalAccount extends React.Component {
  static propTypes = {
    payeeNameDisabled: PropTypes.bool,
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool
  }

  formatBank = (bank = '') => bank.bankName || ''

  render () {
    const {payeeNameDisabled = false, invalid, submitting, handleSubmit = noop} = this.props;
    return (
      <View style={styles.container} >
        <View style={styles.row}>
          <SimasIcon name='sendto' size={30} style={styles.iconBlue}/>
          <Text style={styles.title}>{language.CARDLESSWITHDRAWAL__CASH}</Text>
        </View>
        <View style={styles.formContainer}>
          <Field
            name='phoneNumber'
            label={language.CARDLESSWITHDRAWAL__PHONE_NUMBER}
            placeholder={language.CARDLESSWITHDRAWAL__HINTTEXT_PHONE_NUMBER}
            format={formatMobileNumber}
            component={SinarmasInput}
            keyboardType='numeric'
            disabled={true}
          />
          <Field
            name='description'
            label={language.CARDLESSWITHDRAWAL__NAME}
            placeholder={language.CARDLESSWITHDRAWAL__HINTTEXT_NAME}
            disabled={payeeNameDisabled}
            format={formatFieldName}
            normalize={formatFieldName}
            component={SinarmasInput}
          />
        </View>
        <SinarmasButton dtActionName='Button Add Payee Cash Withdrawal' disabled={invalid || submitting} onPress={wrapMethodInFunction(handleSubmit)} text={language.SERVICE__NEXT_BUTTON}/>
      </View>
    );
  }
}

export default CardLessWithdrawalAccount;
