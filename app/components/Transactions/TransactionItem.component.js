import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import SimasIcon from '../../assets/fonts/SimasIcon';
import styles from './TransactionItem.styles';
import {currencySymbol, historyDateFormatter, formatForexAmountMiniStatement, toCCFormater, currencyFormatter} from '../../utils/transformer.util';
import {replace} from 'lodash';
import moment from 'moment';

const TransactionItem = ({amount, credit, description, date, style, currency, currencyCC, hideIcon = false, isSaving = false}) => (
  <View>
    <View style={[styles.container, style]} >
      {hideIcon ? 
        null :
        <View style={styles.icon}>
          <SimasIcon name={credit ? 'income' : 'expense'} size={30} style={credit ? styles.statusSuccess : styles.statusFailure}/>
        </View>
      }
      <View style={styles.icon}>
        <SimasIcon name={credit ? 'path2' : 'path2'} size={12} style={credit ? styles.iconSuccess : styles.iconFailure}/>
      </View>
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.transactionHeading}>{description}</Text>
        </View>
      </View>
      <View style={styles.amountContainer}>
        <Text style={[isSaving ? styles.amountSaving : styles.amount, credit ? styles.statusSuccess : styles.statusFailure]}>
          {!isSaving ? null : !credit ? '- ' : '+ '} {currencySymbol(currency)} {currencyCC === 'IDR' ? toCCFormater(amount) : currency === 'IDR' ? currencyFormatter(amount) : formatForexAmountMiniStatement(replace(replace(amount, ',', '.'), '-', ''), currency)}
        </Text>
        <Text style={styles.transactionDate}>{historyDateFormatter(date, 'DD MMM YYYY') === 'Invalid date' ? date : date === moment().format('DD/MM/YYYY') ? 'Today' : historyDateFormatter(date, 'DD MMM')}</Text>
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
  isSaving: PropTypes.bool,
  currencyCC: PropTypes.string,
};
export default TransactionItem;
