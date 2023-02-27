import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import noop from 'lodash/noop';
import styles from './ScrambleKeyboard.styles';
import deleteImage from '../../../assets/images/delete.png';
import checkImage from '../../../assets/images/check.png';

export default class PinKey extends Component {
  static propTypes = {
    value: PropTypes.string,
    onPress: PropTypes.func,
    disabled: PropTypes.bool
  };

  renderPad = (value) => {
    if (value === 'delete') {
      return <Image source={deleteImage}/>;
    } else if (value === 'next') {
      return <Image source={checkImage}/>;
    } else {
      return <Text style={styles.pinSize}>{value}</Text>;
    }
  }

  render () {
    const {value = '', onPress = noop, disabled = false} = this.props;
    const pinStyle = [styles.pinKey, value.length === 0 && styles.pinKeyEmpty];
    return (
      <TouchableOpacity onPress={onPress(value)} disabled={disabled}>
        <View style={pinStyle}>
          {this.renderPad(value)}
        </View>
      </TouchableOpacity>
    );
  }
}
