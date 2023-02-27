import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './ScrambleKeyboard.styles';

export default class PinBox extends Component {
  static propTypes = {
    invalid: PropTypes.bool,
    hasValue: PropTypes.bool,
    active: PropTypes.bool
  };

  getPinBoxStyle = (active, invalid) => {
    if (active) {
      return styles.pinBoxActive;
    } else if (!invalid) {
      return styles.pinBoxValid;
    } else {
      return styles.pinBox;
    }
  }

  render () {
    const {hasValue = false, active = false, invalid} = this.props;
    const pinBoxStyle = this.getPinBoxStyle(active, invalid);
    return (
      <View
        style={pinBoxStyle}>
        {hasValue && <Text style={styles.dotStyle}>•</Text>}
      </View>
    );
  }
}
