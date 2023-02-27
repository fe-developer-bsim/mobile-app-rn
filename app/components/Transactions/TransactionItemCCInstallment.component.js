import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import SimasIcon from '../../assets/fonts/SimasIcon';
import styles from './TransactionItem.styles';
import {currencySymbol, historyDateFormatter, toCCFormater, formatForexAmount} from '../../utils/transformer.util';
import {replace} from 'lodash';
import Touchable from '../Touchable.component';

class TransactionItem extends React.Component {
  static propTypes = {
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
    posted: PropTypes.string,
    installable: PropTypes.string,
    transactions: PropTypes.array,
    CCtransDetail: PropTypes.func
  }

  navigateToCCTransactionDetail = () => {
    this.props.CCtransDetail(this.props.transactions);
  }

  render () {
    const {amount, credit, description, date, currency, style, hideIcon, isSaving, currencyCC, posted} = this.props;

    return (
      <View>
        <View style={[styles.container, style]} >
          {hideIcon ? 
            null :
            <View style={styles.icon}>
              <SimasIcon name={credit ? 'income' : 'expense'} size={30} style={credit ? styles.statusSuccess : styles.statusFailure}/>
            </View>
          }

          {posted === 'Y' || posted === 'D' || posted === 'S' ?
            <View style={[styles.container, style]}>
              <Touchable style={styles.container} onPress={this.navigateToCCTransactionDetail}>
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
                  <Text style={[isSaving ? styles.amountSaving : styles.amount, credit ? styles.statusSuccess : styles.statusFailure]}>{(isSaving && !credit) && '- '}{currencySymbol(currency)} {currencyCC === 'IDR' ?  toCCFormater(amount) : currency === 'IDR' ? replace(replace(amount, /([,])+/g, '.'), '-', '') : formatForexAmount(replace(replace(amount, ',', '.'), '-', ''), currency)}</Text>
                </View>
                <View style={styles.arrowContainer}>
                  <SimasIcon name={'arrow'} size={20} style={styles.arrowIcon}/>
                </View>
              </Touchable>
            </View>
            : posted === 'N' ?
              <View style={[styles.container, style]}>
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
                  <Text style={[isSaving ? styles.amountSaving : styles.amount, credit ? styles.statusSuccess : styles.statusFailure]}>{(isSaving && !credit) && '- '}{currencySymbol(currency)} {currencyCC === 'IDR' ?  toCCFormater(amount) : currency === 'IDR' ? replace(replace(amount, /([,])+/g, '.'), '-', '') : formatForexAmount(replace(replace(amount, ',', '.'), '-', ''), currency)}</Text>
                  <Text style={styles.transactionDate}>Pending</Text>
                </View>
              </View>
              :
              <View style={[styles.container, style]}>
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
                  <Text style={[isSaving ? styles.amountSaving : styles.amount, credit ? styles.statusSuccess : styles.statusFailure]}>
                    {(isSaving && !credit) && '- '}{currencySymbol(currency)} {currencyCC === 'IDR' ?  toCCFormater(amount) : currency === 'IDR' ? replace(replace(amount, /([,])+/g, '.'), '-', '') : formatForexAmount(replace(replace(amount, ',', '.'), '-', ''), currency)}
                  </Text>
                </View>
              </View>
          }
        </View>
        <View style={styles.greyLine}/>
      </View>
    );
  }
}

export default TransactionItem;
