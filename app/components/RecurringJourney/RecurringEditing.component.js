import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {SinarmasIconInput, SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import styles from './RecurringDetail.style';
import * as Utils from '../../utils/transformer.util';
import {Field} from 'redux-form';
import noop from 'lodash/noop';
import {wrapMethodInFunction} from '../../utils/transformer.util';

export const fields = {
  AMOUNT_RECURRING: 'amountRecurring',
};

class RecurringEditingView extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    validationInput: PropTypes.func,
    handleSubmit: PropTypes.func,
    targetBankName: PropTypes.string,
    recurringInterval: PropTypes.number,
    targetAccountName: PropTypes.string,
    amount: PropTypes.number,
    recurring: PropTypes.string,
    maxRecurrence: PropTypes.number,
    message: PropTypes.string,
    nextRecurrence: PropTypes.string,
    targetAccount: PropTypes.string,
    account: PropTypes.string,
    createdBy: PropTypes.string,
    transactionReferenceNumber: PropTypes.string,
    currentaccountBalance: PropTypes.number,
    targetBank: PropTypes.string,
    lastRecurrence: PropTypes.number,
    bankCharges: PropTypes.number,
    transactionType: PropTypes.string,
    foundAccount: PropTypes.object,
    renderListItemDeleteTransaction: PropTypes.func,
    transferDate: PropTypes.string,
    accountName: PropTypes.string
  }

  render () {
    const {validationInput, transferDate, accountName, currentaccountBalance, targetBank, recurringInterval, targetAccountName, lastRecurrence, maxRecurrence, message, nextRecurrence, targetAccount, account, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;

    return (
      <ScrollView contentContainerStyle={styles.containerEditing}>
        <View style={styles.contentContainerEditing}>
          <View>
            <View style={styles.textTitleHeadContent}>
              <View>
                <Field
                  name={fields.AMOUNT_RECURRING}
                  component={SinarmasIconInput}
                  theme='primary'
                  format={Utils.formatFieldAmount}
                  normalize={Utils.normalizeAmount}
                  style={styles.fieldContainer}
                  label={language.TRANSFER__TRANSFER_AMOUNT}
                  isUseSuccessInputText={true}
                  typeField={'amountRecurring'}
                  validationInput={validationInput}
                />
              </View>
            </View>
            <View>
              <Text style={styles.availableBalanceText}>{language.SERVICE__AVAILABLE_BALANCE} : Rp {Utils.balanceFormatter(parseInt(Utils.removeComma(String(currentaccountBalance))))}</Text>
            </View>
            <View style={styles.paddingBorder}>
              <View style={styles.borderLine}/>
            </View>
            <View style={styles.paddingTop}>
              <Text style={styles.normalText}>{language.TITLE__TRANSFER_TITLE}</Text>
            </View>

            <View style={styles.rowMid}>

              <View style={styles.triangleIcon}>
                <View style={styles.oval}/>
                <View style={styles.line}/>
                <View style={styles.triangle}/>
              </View>
              <View>
                <View>
                  <Text style={styles.smallText}>{accountName}</Text>
                  <Text style={styles.smallText}>{account} - PT BANK SINARMAS</Text>
                </View>
                <View style={styles.paddingContent}>
                  <Text style={styles.smallText}>{targetAccountName}</Text>
                  <Text style={styles.smallText}>{targetAccount} - {targetBank}</Text>
                </View>
              </View>
            </View>

            <View style={styles.contentRowBottom}>

              <View>
                <View style={styles.padding}>
                  <Text style={styles.normalText}>{language.RECURRING__SCHEDULE_TRANSFER}</Text>
                  { (maxRecurrence === null && recurringInterval === null) ?
                    <Text style={styles.smallText}> {language.RECURRING__ONLYONCE_SUBTITLE}</Text>
                    : recurringInterval === 1 ?
                      <Text style={styles.smallText}> {language.RECURRING__DAILY_SUBTITLE}</Text>
                      : recurringInterval === 7 ?
                        <Text style={styles.smallText}> {language.RECURRING__ONEWEEK_SUBTITLE}</Text>
                        : recurringInterval === 14 ?
                          <Text style={styles.smallText}> {language.RECURRING__TWOWEEK_SUBTITLE}</Text>
                          : <Text style={styles.smallText}> {language.RECURRING__MONTHLY_SUBTITLE}</Text>
                  }
                </View>
                <View style={styles.padding}>
                  <Text style={styles.normalText}>{language.RECURRING__NEXT_TRANSFER}</Text>
                  { (maxRecurrence === null && recurringInterval === null) ?
                    <Text style={styles.smallText}> {transferDate}</Text> :
                    <Text style={styles.smallText}> {nextRecurrence}</Text>
                  }
                </View>
              </View>

              <View>
                <View style={styles.padding}>
                  <Text style={styles.normalText}>{language.RECURRING__MESSAGE}</Text>
                  <Text style={styles.smallText}>{message}</Text>
                </View>
                <View style={styles.padding}>
                  <Text style={styles.normalText}>{language.RECURRING__TOTAL}</Text>
                  { (maxRecurrence === null && recurringInterval === null) ?
                    <Text style={styles.smallText}>0 {language.RECURRING__FROM} 1 {language.RECURRING__TIMES}</Text> :
                    <Text style={styles.smallText}>{lastRecurrence} {language.RECURRING__FROM} {maxRecurrence} {language.RECURRING__TIMES}</Text>
                  }
                </View>
              </View>
            </View>

          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.borderGrey}/>
          <View style={styles.contentContainerEditingBottom}>
            <View style={styles.containtextExplanation}>
              <Text style={styles.textExplanation}>{language.CONFIRMATION_PAGE__EXPLANATION}</Text>
            </View>
            <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting} >
              <Text style={styles.buttonLargeTextStyle}>{language.RECURRING__EDIT_BUTTON}</Text>
            </SinarmasButton>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default RecurringEditingView;
