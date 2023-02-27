import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './CreditCardPayment.style';
import noop from 'lodash/noop';
import {SinarmasInput, SinarmasButton, SinarmasPicker, RadioButton} from '../FormComponents';
import {Field} from 'redux-form';
import * as Utils from '../../utils/transformer.util';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import result from 'lodash/result';

class CreditCardPayment extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    payee: PropTypes.object,
    accountList: PropTypes.array,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    formValues: PropTypes.object,
    paymentMethods: PropTypes.array,
    paymentMode: PropTypes.array,
    setAmount: PropTypes.func,
    billDetails: PropTypes.object,
    id: PropTypes.number,
    bank: PropTypes.object,
    accNo: PropTypes.string,
    bankList: PropTypes.array,
    checkEmoney: PropTypes.func,
  }

  render () {
    const {payee = {}, invalid, submitting, accountList = [], handleSubmit = noop, formValues, paymentMethods = [], paymentMode = [], setAmount, billDetails} = this.props;
    const availableBalance = Utils.getUnformattedAccountAmount(formValues['myAccount']);
    const disableAmount = formValues.paymentMode !== 'other';
    const outstandingBalance = Utils.checkBillAmountCc(result(billDetails, 'billAmount', 0), result(billDetails, 'billAmountCC'));
    const showInformation = Utils.isLessThanOutstanding(formValues.amount, outstandingBalance);
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraHeight={120} enableOnAndroid={true}>
        <View style={styles.paddingContent}>
          <Text style={styles.titleText}>{language.CREDIT_CARD__MAKE_PAYMENT}</Text>
          <Text style={styles.subtext}>{language.CREDIT_CARD__ENTER_DETAILS}</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.payee}>
            <View style={styles.paddingContent}>
              <Text style={styles.payeeName}>{payee.name}</Text>
              <Text style={styles.payeeBank}>{payee.accountNumber || 'NA'} - {payee.accountType || result(payee, 'bank.bankName', 'NA')}</Text>
            </View>
          </View>
          <View style={styles.paddingContent}>
            <Text style={styles.formHeader}>{language.CREDIT_CARD__PAY_FROM}</Text>
            <Field name='myAccount'
              component={SinarmasPicker}
              autocomplete={false}
              rightIcon={accountList.length > 0 ? 'arrow' : null}
              itemList={Utils.generateAccountLabel(accountList, payee.accountNumber)}
              label='Account'
              placeholder={language.CREDIT_CARD__ACCOUNT_PLACEHOLDER}
              labelKey='display'/>
            <Text style={styles.availableBalanceText}>{language.SERVICE__AVAILABLE_BALANCE} : Rp {Utils.balanceFormatter(availableBalance)}</Text>
            {
              (result(payee, 'bank.isSinarmas', false)) &&
                <Field name='paymentMode'
                  normalize={Utils.normalizeTransferType} format={Utils.formatTransferType}
                  component={RadioButton}
                  onChange={setAmount}
                  options={paymentMode}/>
            }
            <View style={styles.fieldAmount}>
              <Field
                name='amount'
                label={language.CREDIT_CARD__AMOUNT}
                placeholder={language.HINTTEXT__CREDIT_CARD_PAYMENT_AMOUNT}
                format={Utils.formatFieldAmount}
                disabled={disableAmount}
                normalize={Utils.normalizeAmount}
                component={SinarmasInput}
                keyboardType='phone-pad'
              />
            </View>
            {
              showInformation && <Text style={styles.information}>{language.CREDIT_CARD__LESS_THAN_OUTSTANDING}</Text>
            }
            <View>
              <View style={styles.transferTypeHeader}>
                <Text style={styles.formHeader}>{language.TRANSFER__TRANSFER_TYPE}</Text>
                <Text style={styles.formHeader}>{language.TRANSFER__FEES}</Text>
              </View>
              <Field name='transferType' normalize={Utils.normalizeTransferType} format={Utils.formatTransferType}
                component={RadioButton}
                options={Utils.transformToTransferTypeRadioData(paymentMethods)}/>
            </View>
          </View>
        </View>
        <View style={styles.paddingContent}>
          <SinarmasButton disabled={invalid || submitting} onPress={Utils.wrapMethodInFunction(handleSubmit)} text={language.SERVICE__NEXT_BUTTON} />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default CreditCardPayment;
