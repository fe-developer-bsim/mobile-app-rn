import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import split from 'lodash/split';
import takeRight from 'lodash/takeRight';
import join from 'lodash/join';
import styles from './PayeeListItem.style';

const filterLabel = (rawLabel) => join(takeRight(split(rawLabel, '/'), 2), ' ');

const PayeeListItem = ({accountNumber, label}) => {
  const extractedLabel = filterLabel(label);
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>{accountNumber}</Text>
      <Text style={styles.subText}>{extractedLabel}</Text>
    </View>
  );
};

PayeeListItem.propTypes = {
  accountNumber: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default PayeeListItem;
