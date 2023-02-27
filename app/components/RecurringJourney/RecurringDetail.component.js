import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {language} from '../../config/language';
import styles from './RecurringDetail.style';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import * as Utils from '../../utils/transformer.util';

class RecurringDetailView extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    getDetailTransactionHistory: PropTypes.func,
    targetBank: PropTypes.string,
    recurringInterval: PropTypes.number,
    targetAccountName: PropTypes.string,
    amount: PropTypes.number,
    lastRecurrence: PropTypes.number,
    maxRecurrence: PropTypes.number,
    message: PropTypes.string,
    nextRecurrence: PropTypes.string,
    targetAccount: PropTypes.string,
    account: PropTypes.string,
    createdBy: PropTypes.string,
    transactionReferenceNumber: PropTypes.string,
    bankCharges: PropTypes.number,
    transactionType: PropTypes.string,
    foundAccount: PropTypes.object,
    renderListItemDeleteTransaction: PropTypes.func,
    transferDate: PropTypes.string,
    accountName: PropTypes.string, 
    currency: PropTypes.string,
  }

  render () {
    const {getDetailTransactionHistory, transferDate, accountName, renderListItemDeleteTransaction, bankCharges, transactionType, targetBank, recurringInterval, targetAccountName, amount, lastRecurrence, maxRecurrence, message, nextRecurrence, targetAccount, account, transactionReferenceNumber, currency} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.contentRow}>
            { (maxRecurrence === null && recurringInterval === null) ?
              <View>
                <Text style={styles.textTitleBold}>{language.RECURRING__TRANSACTION_SCHEDULE}<Text style={styles.textTitle}> / {transactionReferenceNumber}</Text></Text>
              </View> :
              <View>
                <Text style={styles.textTitleBold}>{language.RECURRING__TRANSACTION_RECURRING}<Text style={styles.textTitle}> / {transactionReferenceNumber}</Text></Text>
              </View>
            }
            <View>
              <View style={styles.contentRow}>
                <Touchable onPress={getDetailTransactionHistory}>
                  <SimasIcon name={'edit'} size={20} style={styles.icon}/>
                </Touchable>
                <Touchable onPress={renderListItemDeleteTransaction}>
                  <SimasIcon name={'trash'} size={20} style={styles.icon}/>
                </Touchable>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.textTitleHeadContent}>
              <Text style={styles.normalText}>{language.RECURRING__AMOUNT_TITLE}</Text>
            </View>
            <View>
              <Text style={styles.textAmount}>{currency === 'IDR' ? 'Rp' : currency} {Utils.formatFieldAmount(amount)}</Text>
            </View>
            <View>
              <Text style={styles.smallText}>{language.RECURRING__FEE} {currency === 'IDR' ? 'Rp' : currency} {Utils.formatFieldAmount(bankCharges)} ({transactionType})</Text>
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
          </View>
          <View style={styles.detailSchedule}>
            <View style={styles.flex}>
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
            <View style={styles.flexRight}>
              <Text style={styles.normalText}>{language.RECURRING__MESSAGE}</Text>
              <Text style={styles.smallText}>{message}</Text>
            </View>
          </View>
          <View style={styles.detailSchedule}>
            <View style={styles.flex}>
              <Text style={styles.normalText}>{language.RECURRING__NEXT_TRANSFER}</Text>
              { (maxRecurrence === null && recurringInterval === null) ?
                <Text style={styles.smallText}> {transferDate}</Text> :
                <Text style={styles.smallText}> {nextRecurrence}</Text>
              }
            </View>
            <View style={styles.flexRight}>
              <Text style={styles.normalText}>{language.RECURRING__TOTAL}</Text>
              { (maxRecurrence === null && recurringInterval === null) ?
                <Text style={styles.smallText}>0 {language.RECURRING__FROM} 1 {language.RECURRING__TIMES}</Text> :
                <Text style={styles.smallText}>{lastRecurrence} {language.RECURRING__FROM} {maxRecurrence} {language.RECURRING__TIMES}</Text>
              }
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default RecurringDetailView;