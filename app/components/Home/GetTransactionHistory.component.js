import React from 'react';
import PropTypes from 'prop-types';
import TransactionItem from '../Transactions/TransactionItem.component';
import TransactionItemCCInstallment from '../Transactions/TransactionItemCCInstallment.component';
import {View, Text} from 'react-native';
import styles from './GetTransactionHistory.styles';
import {language} from '../../config/language';
import {isArray, size} from 'lodash';

class GetTransactionHistory extends React.Component {
  static propTypes = {
    transactions: PropTypes.array,
    hideIcon: PropTypes.bool,
    isSaving: PropTypes.bool,
    isCredit: PropTypes.bool,
    CCtransDetail: PropTypes.func
  }
  render () {
    const {transactions = [], hideIcon, isSaving, isCredit, CCtransDetail} = this.props;
    const transactionLength = size(transactions);
    if (!isArray(transactions) || transactions.length === 0) return <Text style={styles.errorText}>{language.PAY_BILLS__HISTORY_NOTHING}</Text>;
    else return (
      <View>
        { isCredit ?
          <View>
            {transactions.map((transaction, i) => <TransactionItemCCInstallment key={i} hideIcon={hideIcon} currencyCC={'IDR'}
              transactionLength={transactionLength} index={i} {...transaction} isSaving={isSaving} transactions={transaction} CCtransDetail={CCtransDetail}/>)}
          </View>
          :
          <View>
            {transactions.map((transaction, i) => <TransactionItem key={i} hideIcon={hideIcon}
              transactionLength={transactionLength} index={i} {...transaction} isSaving={isSaving} transactions={transaction} CCtransDetail={CCtransDetail}/>)}
          </View>
        }
      </View>
    );
  }
}

export default GetTransactionHistory;
