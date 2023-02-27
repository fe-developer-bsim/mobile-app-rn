import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import SimasIcon from '../../assets/fonts/SimasIcon';
import styles from './TransactionItemEmoney.styles';
import {currencySymbol, removeComma, balanceFormatter} from '../../utils/transformer.util';
import Touchable from '../Touchable.component';

class TransactionItem extends React.Component {
  getDetailTransactionHistoryState = () => this.props.getDetailTransactionHistory(this.props.statementId, this.props.transactionCode, this.props.accountTransactions, this.props.description, this.props.creditAmount, this.props.debitAmount)
  render () { 
    const {amount, credit, description, date, style, currency} = this.props;
    const parseAmount = removeComma(amount);
    const formattedAmount = parseInt(parseAmount);
    const transactionAmount = balanceFormatter(formattedAmount);
    return (
      <View>
        <Touchable style={[styles.container, style]} onPress={this.getDetailTransactionHistoryState}>
          <View style={styles.detailsContainer}>
            <View>
              <Text style={styles.transactionHeading}>{description}</Text>
              <Text style={styles.transactionDate}>{date}</Text>
            </View>
          </View>
          <View style={styles.amountContainer}>
            <Text style={[styles.amount, credit ? styles.statusSuccess : styles.statusFailure]}>{!credit && '- '}{currencySymbol(currency)} {transactionAmount}</Text>
          </View>
          <View style={styles.iconSecondPage}>
            <SimasIcon name='arrow' size={10} style={styles.iconDetail}/>
          </View>
        </Touchable>
      </View>
    );
  }
  static propTypes = {
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    credit: PropTypes.bool,
    description: PropTypes.string,
    date: PropTypes.string,
    currency: PropTypes.string,
    style: PropTypes.object,
    statementId: PropTypes.string,
    getDetailTransactionHistory: PropTypes.func,
    transactionCode: PropTypes.string,
    accountTransactions: PropTypes.object,
    isShariaAccount: PropTypes.bool,
    creditAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    debitAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }
}
export default TransactionItem;
