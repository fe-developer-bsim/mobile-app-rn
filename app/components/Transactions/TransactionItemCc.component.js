import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import SimasIcon from '../../assets/fonts/SimasIcon';
import styles from './TransactionItem.styles';
import {currencySymbol, historyDateFormatter, formatForexAmount} from '../../utils/transformer.util';
import {replace} from 'lodash';

const TransactionItem = ({amount, credit, description, date, style, currency, hideIcon = false, isSaving = false}) => (
  <View>
    <View style={[styles.container, style]} >
      {hideIcon ? 
        null :
        <View style={styles.icon}>
          <SimasIcon name={credit ? 'income' : 'expense'} size={30} style={credit ? styles.statusSuccess : styles.statusFailure}/>
        </View>
      }
      <View style={styles.icon}>
        <SimasIcon name={credit ? 'path2' : 'path2'} size={15} style={credit ? styles.iconSuccess : styles.iconFailure}/>
      </View>
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.transactionHeading}>{description}</Text>
          <Text style={styles.transactionDate}>{historyDateFormatter(date, 'DD MMM YYYY') === 'Invalid date' ? date : historyDateFormatter(date, 'DD MMM YYYY')}</Text>
        </View>
      </View>
      <View style={styles.amountContainer}>
        <Text style={[isSaving ? styles.amountSaving : styles.amount, credit ? styles.statusSuccess : styles.statusFailure]}>{(isSaving && !credit) && '- '}{currencySymbol(currency)} {currency === 'IDR' ? replace(replace(amount, ',', '.'), '-', '') : formatForexAmount(replace(replace(amount, ',', '.'), '-', ''), currency)}</Text>
      </View>
    </View>
    <View style={styles.greyLine}/>
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
  transactionLength: PropTypes.number,
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isSaving: PropTypes.bool
};
export default TransactionItem;
