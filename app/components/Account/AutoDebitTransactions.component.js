import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ScrollView} from 'react-native';
import styles from './AutoDebitTransactions.styles';
import {isEmpty, result, size, noop} from 'lodash';
import TransactionItem from '../../components/Transactions/TransactionItemPage.component';
import moment from 'moment';
import {language} from '../../config/language';

class AutoDebitTransactions extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    transactionList: PropTypes.array,
    currency: PropTypes.string,
    goToDetailTransaction: PropTypes.func,
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
    const {transactionList} = this.props;
    const transactionLength = size(transactionList);
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

  render () {
    const {transactionList} = this.props;

    return (
      <View>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.whiteBoxContainer}>
            <View style={styles.historyHeaderContainer}>
              <Text style={styles.historyTitle}>{language.DASHBOARD__TRANSACTION_HISTORY}</Text>
            </View>
            {
              isEmpty(transactionList) ?
                <Text style={styles.subText2}>{language.DASHBOARD__NO_TRANSACTION}</Text>
                : 
                <View>
                  {transactionList.map(this.renderListItem)}
                </View>
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default AutoDebitTransactions;
