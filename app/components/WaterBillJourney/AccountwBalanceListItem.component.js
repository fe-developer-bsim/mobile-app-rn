import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {currencyFormatter} from '../../utils/transformer.util';
import styles from './AccountwBalanceListItem.style';
import {getAccountAmount} from '../../utils/transformer.util';

const AccountListItem = ({accountNumber, name, balances = {}}) => (
  <View style={styles.container}>
    <Text style={styles.mainText}>{accountNumber}</Text>
    <Text style={styles.subText}>{name}</Text>
    <Text style={styles.subText}>{currencyFormatter(getAccountAmount(balances))}</Text>
  </View>
);

AccountListItem.propTypes = {
  accountNumber: PropTypes.string.isRequired,
  name: PropTypes.string,
  balances: PropTypes.object
};

export default AccountListItem;
