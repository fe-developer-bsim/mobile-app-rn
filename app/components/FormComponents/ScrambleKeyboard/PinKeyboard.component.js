import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import PinKey from './PinKey.component';
import styles from './ScrambleKeyboard.styles';
import {language} from '../../../config/language';

export default class PinKeyboard extends Component {
  static propTypes = {
    onTouchKeyboard: PropTypes.func,
    nextButtonDisabled: PropTypes.bool,
    keys: PropTypes.array
  }

  render () {
    const {onTouchKeyboard, nextButtonDisabled, keys} = this.props;
    return (
      <View style={styles.pinKeyboardContainer}>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>{language.SCRAMBLE_KEYBOARD__INFO}</Text>
        </View>
        <View style={styles.pinKeyboard}>
          <PinKey dtActionName='ATM PIN' onPress={onTouchKeyboard} value={keys[0]}/>
          <PinKey dtActionName='ATM PIN' onPress={onTouchKeyboard} value={keys[1]}/>
          <PinKey dtActionName='ATM PIN' onPress={onTouchKeyboard} value={keys[2]}/>
          <PinKey dtActionName='ATM PIN' onPress={onTouchKeyboard} value={keys[3]}/>
          <PinKey dtActionName='ATM PIN' onPress={onTouchKeyboard} value={keys[4]}/>
          <PinKey dtActionName='ATM PIN' onPress={onTouchKeyboard} value={keys[5]}/>
          <PinKey dtActionName='ATM PIN' onPress={onTouchKeyboard} value={keys[6]}/>
          <PinKey dtActionName='ATM PIN' onPress={onTouchKeyboard} value={keys[7]}/>
          <PinKey dtActionName='ATM PIN' onPress={onTouchKeyboard} value={keys[8]}/>
          <PinKey dtActionName='ATM PIN' onPress={onTouchKeyboard} value='delete' />
          <PinKey dtActionName='ATM PIN' onPress={onTouchKeyboard} value={keys[9]}/>
          <PinKey dtActionName='ATM PIN Next' onPress={onTouchKeyboard} disabled={nextButtonDisabled} value='next' />
        </View>
      </View>
    );
  }
}
