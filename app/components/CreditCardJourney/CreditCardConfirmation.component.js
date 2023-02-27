import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {cardVerticalSpacingStyle, buttonLargeTextStyle} from '../../styles/common.styles';
import {currencyFormatter} from '../../utils/transformer.util';
import result from 'lodash/result';
import styles from './CreditCardConfirmation.style';
import {language} from '../../config/language';
import startCase from 'lodash/startCase';

class CreditCardConfirmation extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    isConnected: PropTypes.bool,
    resendBillPayOTP: PropTypes.func,
    config: PropTypes.array,
    triggerAuth: PropTypes.func,
    currentDate: PropTypes.string,
    payee: PropTypes.object,
    resData: PropTypes.object,
    formValues: PropTypes.object,
    goToCoupon: PropTypes.func,
    removeCoupon: PropTypes.func,
    couponUse: PropTypes.string,
  }

  remove = () => {
    this.props.removeCoupon();
  }

  render () {
    const {isConnected, formValues, handleSubmit, resData} = this.props;
    const targetAccount = result(resData, 'transferTransaction.targetAccountObject', {});
    return (
      <ScrollView keyboardShouldPersistTaps='handled'  contentContainerStyle={styles.containerContent} style={styles.container}>
        <Text style={styles.titleText}>{language.CREDIT_CARD__PAYMENT_SUMMARY}</Text>
        <Text style={styles.subtext}>{language.CREDIT_CARD__PAYMENT_SUMMARY_DESCRIPTION}</Text>
        <View style={styles.summaryContainer}>
          <View style ={styles.summaryArea}>
            <View style={styles.rowItem}>
              <View style={styles.halfWidth}><Text style={styles.rowItemLeft}>{language.CREDIT_CARD__PAYING_FROM}</Text></View>
              <View style={styles.halfWidth}>
                <View style={styles.rowItemRight}>
                  <Text style={styles.rightItemHeader}>{result(formValues, 'myAccount.productType', 'NIL')}</Text>
                  <Text style={styles.rightItemText}>{result(formValues, 'myAccount.accountNumber', 'NIL')}</Text>
                </View>
              </View>
            </View>
            <View style={styles.rowItem}>
              <View style={styles.halfWidth}><Text style={styles.rowItemLeft}>{language.CREDIT_CARD__ACCOUNT_HOLDER}</Text></View>
              <View style={styles.halfWidth}>
                <View style={styles.rowItemRight}>
                  <Text style={styles.rightItemHeader}>{result(targetAccount, 'name', 'NA')}</Text>
                </View>
              </View>
            </View>
            <View style={styles.rowItem}>
              <View style={styles.halfWidth}><Text style={styles.rowItemLeft}>{language.CREDIT_CARD__ACCOUNT_NUMBER}</Text></View>
              <View style={styles.halfWidth}>
                <View style={styles.rowItemRight}>
                  <Text style={styles.rightItemHeader}>{result(targetAccount, 'accountNumber', 'NA')}</Text>
                  <Text style={styles.rightItemText}>{result(targetAccount, 'bankName', 'NA')}</Text>
                </View>
              </View>
            </View>
            <View style={styles.rowItem}>
              <View style={styles.halfWidth}><Text style={styles.rowItemLeft}>{language.CREDIT_CARD__TRANSFER_MODE}</Text></View>
              <View style={styles.halfWidth}>
                <View style={styles.rowItemRight}>
                  <Text style={styles.rightItemHeader}>{startCase(result(resData, 'transferTransaction.mode', ''))}</Text>
                </View>
              </View>
            </View>
            <View style={styles.rowItem}>
              <View style={styles.halfWidth}><Text style={styles.rowItemLeft}>{language.CREDIT_CARD__PAYMENT_FEE}</Text></View>
              <View style={styles.halfWidth}>
                <View style={styles.rowItemRight}>
                  <Text style={styles.rightItemHeader}>Rp {currencyFormatter(result(resData, 'transferTransaction.bankCharge', 0))}</Text></View>
              </View>
            </View>
            <View style={styles.rowItem}>
              <View style={styles.halfWidth}><Text style={styles.rowItemLeft}>{language.CREDIT_CARD__PAYMENT_AMOUNT}</Text></View>
              <View style={styles.halfWidth}>
                <View style={styles.rowItemRight}>
                  <Text style={styles.rightItemHeader}>Rp {currencyFormatter(result(formValues, 'amount', 0))}</Text></View>
              </View>
            </View>
          </View>
        </View>
        <View style={cardVerticalSpacingStyle}>
          <View style={styles.containtextExplanation}>
            <Text style={styles.textExplanation}>{language.CONFIRMATION_PAGE__EXPLANATION}</Text>
          </View>
          <SinarmasButton onPress={handleSubmit} disabled={!isConnected}>
            <Text style={buttonLargeTextStyle}>{language.CREDIT_CARD__CONFIRM_PAYMENT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </ScrollView>
    );
  }
}

export default CreditCardConfirmation;
