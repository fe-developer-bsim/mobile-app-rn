import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {buttonLargeTextStyle} from '../../styles/common.styles';
import {SinarmasButton} from '../FormComponents';
import {currencyFormatter} from '../../utils/transformer.util';
import {language} from '../../config/language';
import styles from './OpenAndromaxConfirmation.style';

export default class OpenAndromaxConfirmation extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    triggerAuth: PropTypes.func,
    accountNo: PropTypes.object,
    dataDetail: PropTypes.array,
    email: PropTypes.string,
    responseData: PropTypes.object,
    openAccountConfig: PropTypes.object,
  }

  render () {
    const {responseData = {}, accountNo = {}, email, handleSubmit, openAccountConfig = {}} = this.props;
    return (
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent}>
        <View>
          <View style={styles.container}>
            <Text style={styles.titleText}>{language.OPEN_NEW_ACCOUNT__CONFIRM}</Text>
            <View style={styles.summaryContainer}>
              <View style ={styles.summaryArea}>
                <View style={styles.rowItem}>
                  <View style={styles.halfWidth}><Text style={styles.detailTitle}>{language.OPEN_NEW_ACCOUNT__CONFIRM_INITIAL_DEPOSIT}</Text></View>
                  <View style={styles.halfWidth}><Text style={styles.initialDeposit}>Rp {currencyFormatter(responseData.initialDeposit)}</Text></View>
                </View>
                <View style={styles.rowItem}>
                  <View style={styles.halfWidth}><Text style={styles.detailTitle}>{language.OPEN_NEW_ACCOUNT__CONFIRM_LOCKED_AMOUNT}</Text></View>
                  <View style={styles.halfWidth}><Text style={styles.lockedAmount}>Rp {currencyFormatter(openAccountConfig.lockedAmount)}</Text></View>
                </View>
                <View style={styles.rowItem}>
                  <View style={styles.halfWidth}><Text style={styles.detailTitle}>{language.OPEN_NEW_ACCOUNT__CONFIRM_MINIMUM_BALANCE}</Text></View>
                  <View style={styles.halfWidth}><Text style={styles.lockedAmount}>Rp {currencyFormatter(openAccountConfig.minimumBalance)}</Text></View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.lineDiv}/>
          <View style={styles.container}>
            <View style={styles.summaryContainer}>
              <Text style={styles.titleText}>{language.OPEN_NEW_ACCOUNT__TRANSACTION_DETAIL}</Text>
              <View style={styles.detailContainer}>
                <View style={styles.halfWidth}><Text style={styles.detailTitle}>{language.OPEN_NEW_ACCOUNT__TRANSACTION}</Text></View>
                <View style={styles.halfWidth}><Text style={styles.detailText}>{responseData.productTypeName}</Text></View>
              </View>
              <View style={styles.detailContainer}>
                <View style={styles.halfWidth}><Text style={styles.detailTitle}>{language.OPEN_NEW_ACCOUNT__NAME}</Text></View>
                <View style={styles.halfWidth}><Text style={styles.detailText}>{accountNo.name}</Text></View>
              </View>
              {
                email === '' ?
                  null
                  :
                  <View style={styles.detailContainer}>
                    <View style={styles.halfWidth}><Text style={styles.detailTitle}>{language.OPEN_NEW_ACCOUNT__EMAIL}</Text></View>
                    <View style={styles.halfWidth}><Text style={styles.detailText}>{email}</Text></View>
                  </View>
              }
              <View style={styles.detailContainer}>
                <View style={styles.halfWidth}><Text style={styles.detailTitle}>{language.OPEN_NEW_ACCOUNT__SOURCE_ACCOUNT}</Text></View>
                <View style={styles.halfWidth}><Text style={styles.detailText}>{accountNo.productType} - {responseData.debitAccountNumber}</Text></View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.verticalSpacing}>
            <View style={styles.containtextExplanation}>
              <Text style={styles.textExplanation}>{language.CONFIRMATION_PAGE__EXPLANATION}</Text>
            </View>
            <SinarmasButton onPress={handleSubmit}>
              <Text style={buttonLargeTextStyle}>{language.GENERIC_BILLER__CONFIRM_PAYMENT_BUTTON}</Text>
            </SinarmasButton>
          </View>
        </View>
      </ScrollView>
    );
  }
}
