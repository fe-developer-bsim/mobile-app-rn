import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import PinBox from './PinBox.component';
import styles from './ScrambleKeyboard.styles';
import times from 'lodash/times';

export default class PinBoxList extends Component {
  static propTypes = {
    pinValue: PropTypes.string,
    pinLength: PropTypes.number,
    invalid: PropTypes.bool
  };

  renderPills = () => {
    const {pinLength} = this.props;
    let pills = [];
    times(pinLength, (i) => pills.push(this.renderPill(i + 1)));
    return pills;
  }

  renderPill = (index) => {
    const {pinValue = '', invalid} = this.props;
    return (
      <PinBox
        key={index}
        hasValue={pinValue !== '' && pinValue.length >= index}
        active={pinValue.length >= index - 1 && pinValue.length < index}
        invalid={invalid}
      />
    );
  }

  render () {
    return (
      <View
        style={styles.pillsContainer}>
        {this.renderPills()}
      </View>
    );
  }
}
