import React from 'react';
import PropTypes from 'prop-types';
import TransactionItem from '../Transactions/TransactionItem.component';
import {View, Text} from 'react-native';
import styles from './GetTransactionHistory.styles';
import {language} from '../../config/language';
import {isArray, size} from 'lodash';

class GetTransactionHistory extends React.Component {
  static propTypes = {
    transactions: PropTypes.array,
    hideIcon: PropTypes.bool,
    isSaving: PropTypes.bool,
  }
  render () {
    const {transactions = [], hideIcon, isSaving} = this.props;
    const transactionLength = size(transactions);
    if (!isArray(transactions) || transactions.length === 0) return <Text style={styles.errorText}>{language.PAY_BILLS__HISTORY_NOTHING}</Text>;
    else return (
      <View>
        {transactions.map((transaction, i) => <TransactionItem key={i} hideIcon={hideIcon}
          transactionLength={transactionLength} index={i} {...transaction} isSaving={isSaving}/>)}
      </View>
    );
  }
}

export default GetTransactionHistory;
