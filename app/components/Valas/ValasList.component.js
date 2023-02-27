import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './ValasList.component.styles';

class ValasList extends React.Component {
  render () {
    const {currency, changeCurrency, spreadSellRate, spreadBuyRate, spreadBuyRateUSD, spreadSellRateUSD} = this.props;
    const isMinor = changeCurrency === 'CNY' || changeCurrency === 'SGD' || changeCurrency === 'JPY';
    const spreadBuyRateDecimal = spreadBuyRate !== null ? spreadBuyRate : ''; 
    const spreadSellRateDecimal = spreadSellRate !== null ? spreadSellRate : '';
    const spreadBuyRateDecimalUSDDecimal = isMinor ? spreadSellRateUSD : spreadBuyRateUSD !== null ? spreadBuyRateUSD : ''; 
    const spreadSellRateDecimalUSDDecimal = isMinor ? spreadBuyRateUSD : spreadSellRateUSD !== null ? spreadSellRateUSD : '';
    return (
      <View style={styles.container}>
        <View style={[styles.content, styles.row]}>
          <View style={styles.wrapCoupon}>
            <Text style={styles.descriptionHeading}>{currency === null ? changeCurrency : currency}</Text>
          </View>
          <View style={styles.wrapCoupon}>
            <Text style={styles.descriptionHeading}>{spreadBuyRateDecimal === '' ? spreadBuyRateDecimalUSDDecimal : spreadBuyRateDecimal}</Text>
          </View>
          <View style={styles.wrapCoupon}>
            <Text style={styles.descriptionHeading}>{spreadSellRateDecimal === '' ? spreadSellRateDecimalUSDDecimal : spreadSellRateDecimal}</Text>
          </View>
        </View>
      </View>
    );
  }
  static propTypes = {
    navigation: PropTypes.object,
    lastUpdatedDate: PropTypes.number,
    currency: PropTypes.string,
    spreadSellRate: PropTypes.number,
    spreadBuyRate: PropTypes.number,
    changeCurrency: PropTypes.string,
    spreadBuyRateUSD: PropTypes.number,
    spreadSellRateUSD: PropTypes.number,
    buyRateCustomer: PropTypes.number,
    sellRateCustomer: PropTypes.number,
  }
}
export default ValasList;
