import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import SimasIcon from '../../assets/fonts/SimasIcon';
import styles from './TransactionItem.styles';
import {currencySymbol, currencyFormatter, formatForexAmountMiniStatement, formatResultAmount} from '../../utils/transformer.util';
import Touchable from '../Touchable.component';

class TransactionItem extends React.Component {
  getDetailTransactionHistoryState = () => this.props.getDetailTransactionHistory(this.props.statementId, this.props.transactionCode, this.props.accountTransactions)
  render () {
    const {amount = '', credit, description, date, style, currency, transactionCode, isShariaAccount, transactionLength, index, failedAutoDebit, successAutoDebit} = this.props;
    const resultAmount = formatResultAmount(amount);
    const transactionAmount = currencyFormatter(resultAmount);
    return (
      <View>
        {isShariaAccount ?
          <View style={[styles.container, style]}>
            <View style={styles.detailsContainer}>
              <View>
                <Text style={styles.transactionHeading}>{description}</Text>
                <Text style={styles.transactionDate}>{date}</Text>
              </View>
            </View>
            <View style={styles.amountContainer}>
              <Text style={[styles.amount, credit ? styles.statusSuccess : styles.statusFailure]}>{!credit ? '- ' : '+ '}{currencySymbol(currency)} {currency === 'IDR' ? transactionAmount : formatForexAmountMiniStatement(resultAmount, currency)}</Text>
            </View>
            <View style={styles.iconSecondPage} />
          </View>
          :
          transactionCode === '0202' || transactionCode === '0213' || transactionCode === '0852' || transactionCode === '0268' || transactionCode === '0832' || transactionCode === '0837' || transactionCode === '0838' || transactionCode === '0241' || transactionCode === '0243' || transactionCode === '0220' || transactionCode === '0210' || transactionCode === '0126' || transactionCode === '0125' ?
            <Touchable style={[styles.container, style]} onPress={this.getDetailTransactionHistoryState}>
              <View style={styles.icon}>
                <SimasIcon name={credit ? 'path2' : 'path2'} size={12} style={credit ? styles.iconSuccess : styles.iconFailure} />
              </View>
              <View style={styles.detailsContainer}>
                <View>
                  <Text style={styles.transactionHeading}>{description}</Text>
                  <Text style={styles.transactionDate}>{date}</Text>
                </View>
              </View>
              <View style={styles.amountContainer}>
                <Text style={[styles.amount, credit ? styles.statusSuccess : styles.statusFailure]}>{!credit ? '- ' : '+ '}{currencySymbol(currency)} {currency === 'IDR' ? transactionAmount : formatForexAmountMiniStatement(resultAmount, currency)}</Text>
              </View>
              <View style={styles.iconSecondPage}>
                <SimasIcon name='arrow' size={12} style={styles.iconDetail}/>
              </View>
            </Touchable>
            :
            <View style={[styles.container, style]}>
              <View style={styles.icon}>
                <SimasIcon name={failedAutoDebit ? 'close-black' : credit ? 'path2' : 'path2'} size={12} style={failedAutoDebit ? styles.iconFailedAutoDebit : credit ? styles.iconSuccess : styles.iconFailure} />
              </View>
              <View style={styles.detailsContainer}>
                <View>
                  <Text style={styles.transactionHeading}>{description}</Text>
                  <Text style={styles.transactionDate}>{date}</Text>
                </View>
              </View>
              <View style={styles.amountContainer}>
                <Text style={[styles.amount, credit ? styles.statusSuccess : successAutoDebit ? styles.successAutoDebitAmount : styles.statusFailure]}>{!credit ? '- ' : '+ '}{currencySymbol(currency)} {currency === 'IDR' ? transactionAmount : formatForexAmountMiniStatement(resultAmount, currency)}</Text>
              </View>
              <View style={styles.iconSecondPage} />
            </View>
        }
        {
          transactionLength === index + 1 ?
            null : <View style={styles.greyLine}/>
        }
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
    transactionLength: PropTypes.number,
    index: PropTypes.string,
    failedAutoDebit: PropTypes.bool,
    successAutoDebit: PropTypes.bool,
  }
}
export default TransactionItem;
