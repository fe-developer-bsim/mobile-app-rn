import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './AccountListItem.style';

const AccountListItem = ({accountNumber, name}) => (
  <View style={styles.container}>
    <Text style={styles.mainText}>{accountNumber}</Text>
    <Text style={styles.subText}>{name}</Text>
  </View>
);

AccountListItem.propTypes = {
  accountNumber: PropTypes.string.isRequired,
  name: PropTypes.string
};

export default AccountListItem;
