import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import SimasIcon from '../../assets/fonts/SimasIcon';
import styles from './TransactionItemEmoney.styles';
import {currencySymbol} from '../../utils/transformer.util';

const TransactionItem = ({amount, credit, description, date, style, currency, hideIcon = false}) => (
  <View style={[styles.container, style]} >
    {hideIcon ? 
      null :
      <View style={styles.icon}>
        <SimasIcon name={credit ? 'income' : 'expense'} size={30} style={credit ? styles.statusSuccess : styles.statusFailure}/>
      </View>
    }
    <View style={styles.detailsContainer}>
      <View>
        <Text style={styles.transactionHeading}>{description}</Text>
        <Text style={styles.transactionDate}>{date}</Text>
      </View>
    </View>
    <View style={styles.amountContainer}>
      <Text style={[styles.amount, credit ? styles.statusSuccess : styles.statusFailure]}>{!credit && '- '}{currencySymbol(currency)} {(amount)}</Text>
    </View>
  </View>
);

TransactionItem.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  credit: PropTypes.bool,
  description: PropTypes.string,
  date: PropTypes.string,
  currency: PropTypes.string,
  style: PropTypes.object,
  hideIcon: PropTypes.bool,
};
export default TransactionItem;
