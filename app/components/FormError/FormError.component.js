import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import SimasIcon from '../../assets/fonts/SimasIcon';
import styles from './FormError.styles';

export default class FormError extends Component {
  static propTypes = {
    iconName: PropTypes.string,
    text: PropTypes.string
  }
  render () {
    return (
      <View style={styles.errorContainer}>
        <SimasIcon name={this.props.iconName} size={25} style={styles.icon}/>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}