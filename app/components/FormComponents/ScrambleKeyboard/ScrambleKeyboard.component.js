import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import PinBoxList from './PinBoxList.component';
import PinKeyboard from './PinKeyboard.component';
import styles from './ScrambleKeyboard.styles';
import noop from 'lodash/noop';
import {scrambleKeyboard} from '../../../utils/transformer.util';

export default class ScrambleKeyboard extends Component {
  static propTypes = {
    input: PropTypes.object,
    scramble: PropTypes.bool,
    invalid: PropTypes.bool,
    nextButtonDisabled: PropTypes.bool,
    handleSubmit: PropTypes.func
  }

  static defaultProps = {
    itemList: [],
    input: {onChange: noop, value: ''},
    onValChange: noop
  }

  keys = scrambleKeyboard(this.props.scramble);

  onTouchKeyboard = (value) => () => {
    const {input, handleSubmit} = this.props;
    if (input.value.length < 6 && value !== 'delete' && value !== 'next') {
      input.onChange(input.value + value);
    }
    if (input.value.length > 0 && value === 'delete') {
      input.onChange(input.value.substring(0, input.value.length - 1));
    }

    if (input.value.length > 0 && value === 'next') {
      handleSubmit();
    }
  }

  render () {
    const {input, nextButtonDisabled, invalid} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.pinView}>
          <PinBoxList pinLength={6} pinValue={input.value} invalid={invalid}/>
        </View>
        <PinKeyboard keys={this.keys}
          onTouchKeyboard={this.onTouchKeyboard} nextButtonDisabled={nextButtonDisabled}/>
      </View>
    );
  }
}

