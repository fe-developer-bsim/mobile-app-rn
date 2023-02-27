import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './BillerItem.component.style';

const BillerItem = ({name}) => (
  <View style={styles.container}><Text style={styles.text}>{name}</Text></View>
);

BillerItem.propTypes = {
  name: PropTypes.string
};


export default BillerItem;
