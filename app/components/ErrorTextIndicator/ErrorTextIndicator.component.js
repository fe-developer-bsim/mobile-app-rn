import React from 'react';
import PropTypes from 'prop-types';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {View, Text} from 'react-native';
import styles from './ErrorTextIndicator.styles';

const ErrorTextIndicator = ({text, isSof, isTax, ...extraProps}) => (<View style={isTax ? styles.errorContainerTax : isSof ? styles.errorContainerSof : styles.errorContainer}>
  <SimasIcon name='input-error' style={isSof ? styles.errIconSof : styles.errIcon}/>
  <Text {...extraProps} style={styles.errorText}>{text}</Text>
</View>);

ErrorTextIndicator.propTypes = {
  text: PropTypes.string,
  isTax: PropTypes.bool,
  isSof: PropTypes.bool
};
export default ErrorTextIndicator;
