import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ScrollView} from 'react-native';
import styles from './AutoDebitDetail.styles';
import Touchable from '../Touchable.component';
import {isEmpty, result, find, size, orderBy, slice, noop} from 'lodash';
import {language} from '../../config/language';
import TransactionItem from '../../components/Transactions/TransactionItemPage.component';
import moment from 'moment';

class AutoDebitDetail extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToBiller: PropTypes.func,
    autoDebitList: PropTypes.object,
    closeOnTouchOutside: PropTypes.bool,
    visible: PropTypes.bool,
    reloadHistory: PropTypes.func,
    dispatch: PropTypes.func,
    AutoDebitList: PropTypes.object,
    isEdit: PropTypes.bool,
    data: PropTypes.object,
    accountList: PropTypes.array,
    autoDebitHistory: PropTypes.array,
    currency: PropTypes.string,
    goToDetailTransaction: PropTypes.func,
    goToAutoDebitTransactions: PropTypes.func,
  }

  renderListItemCurency = () => {
    const {currency} = this.props;
    return currency ? currency : '';
  }
  renderListItemDetailTransaction = () => {
    const {goToDetailTransaction = noop} = this.props;
    return goToDetailTransaction ? goToDetailTransaction : noop;
  }

  renderListItem = (item = {}, index) => {
    const {autoDebitHistory} = this.props;
    const transactionLength = size(autoDebitHistory);
    const status = result(item, 'STATUS', '');
    const successAutoDebit = status.toUpperCase() === 'SUKSES';
    const credit = status === 'REVERSAL';
    const merchantName = result(item, 'MERCHANTNAME', '');
    const description = merchantName;
    const date = moment(result(item, 'TRANSACTIONDATE', ''), 'YYYY-MM-DD').format('DD MMM YYYY');
    const transactionCode = result(item, 'TRXTYPE', '');
    const accountNumber = result(item, 'ACCOUNTNO', '');
    const amount = result(item, 'TOTALAMOUNT', '');
    const isAmountAvailable = amount !== null;
    const failedAutoDebit = !credit && !successAutoDebit;
    const data = {
      description,
      date,
      transactionCode,
      accountNumber,
      amount: isAmountAvailable ? amount.toString() : '0',
      credit,
      failedAutoDebit,
      successAutoDebit,
    };
    return (<TransactionItem {...data} index={index} currency={this.renderListItemCurency()}
      getDetailTransactionHistory={this.renderListItemDetailTransaction()} key={index}
      isShariaAccount={false} transactionLength={transactionLength} />);
  }

  goToAutoDebitTransactions = (transactionList) => () => {
    const {goToAutoDebitTransactions} = this.props;
    goToAutoDebitTransactions(transactionList);
  }

  render () {
    const {data, accountList, autoDebitHistory} = this.props;
    const merhchantName = result(data, 'merchantName', '');
    const subscriberNumber = result(data, 'subscriberNumber', '');
    const paymentDate = result(data, 'periode', '');
    const amount = result(data, 'amount', '');
    const accountNumber = result(data, 'accountNumber', '');
    const account = find(accountList, {'accountNumber': accountNumber});
    const accountType = result(account, 'productType', '');
    const transactionList = orderBy(autoDebitHistory, 'TRANSACTIONDATE', 'desc');
    const lastFiveTransactions = slice(transactionList, 0, 5);

    return (
      <View>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.top}>
            <View style={styles.backgroundColor1}/>
            <View style={styles.containerBox}>
              <View style={styles.optionContainer}>
                <Text style={styles.optionText}>Regular</Text>
              </View>
              <Text style={styles.topText}>{merhchantName}</Text>
              <Text style={styles.subText}>{subscriberNumber}</Text>
              <Text style={styles.subText2}>{language.AUTODEBIT__LIST_NEXT_PAYMENTS} {paymentDate}</Text>

              <View style={[styles.row, styles.flex]}>
                <Text style={styles.leftText}>{language.CREDIT_CARD__AMOUNT}</Text>
                <Text style={styles.rightText}>{amount}</Text>
              </View>

              <View style={styles.greyLine} />

              <View style={[styles.row, styles.flex]}>
                <Text style={styles.leftText}>{language.GENERIC_BILLER__SOURCE_ACC}</Text>
                <View style={styles.sourceAccContainer}>
                  <Text style={styles.rightText}>{accountNumber}</Text>
                  <Text style={styles.rightText}>{accountType}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.historyHeaderContainer}>
              <Text style={styles.historyTitle}>{language.DASHBOARD__TRANSACTION_HISTORY}</Text>
            </View>
            {
              isEmpty(autoDebitHistory) ?
                <Text style={styles.subText2}>{language.DASHBOARD__NO_TRANSACTION}</Text>
                : 
                <View>
                  {lastFiveTransactions.map(this.renderListItem)}
                  <Touchable style={styles.seeAllButton} onPress={this.goToAutoDebitTransactions(transactionList)}>
                    <Text style={styles.seeAllText}>{language.DASHBOARD__VIEW_ALL}</Text>
                  </Touchable>
                </View>
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default AutoDebitDetail;
