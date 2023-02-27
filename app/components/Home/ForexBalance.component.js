import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {language} from '../../config/language';
import Collapsible from '../Collapsible/Collapsible.component';
import styles from './Summary.styles';
import Touchable from '../Touchable.component';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {currencySymbol, formatForexAmount} from '../../utils/transformer.util';

class ForexBalance extends React.Component {
  static propTypes = {
    forexBalances: PropTypes.object,
    forexCollapse: PropTypes.func,
    forexCollapsed: PropTypes.bool,
  }

  currencies = {
    USD: 'US Dollar',
    SGD: 'Singapore Dollar',
    AUD: 'Australian Dollar',
    EUR: 'Euro',
    JPY: 'Japanese Yen',
    CNY: 'Chinese Yuan'
  }

  getForexBalances = () => {
    const forexBalances = result(this.props, 'forexBalances', {});
    return Object.keys(forexBalances).map((currency, i) => (<View style={styles.row} key={i}>
      <Text style={styles.title}>{this.currencies[currency]}</Text>
      <Text style={styles.value}>{`${currencySymbol(currency)} ${formatForexAmount(forexBalances[currency], currency)}`}</Text>
    </View>));
  }

  render () {
    const {forexCollapse, forexCollapsed} = this.props;
    const iconStyle = forexCollapsed ? styles.iconCollapsedStyle : {};
    if (isEmpty(this.props.forexBalances)) {
      return null;
    }
    return <View>
      <Touchable style={styles.row} onPress={forexCollapse}>
        <Text style={styles.title}>{language.DASHBOARD__ACCOUNT_FOREX}</Text>
        <SimasIcon name={'arrow'} size={10} style={[styles.accordionIcon, iconStyle]}/>
      </Touchable>
      <Collapsible collapsed={forexCollapsed} refName='forex'>
        <View style={styles.forexDetails}>
          {this.getForexBalances()}
        </View>
      </Collapsible>
    </View>;
  }
}

export default ForexBalance;
