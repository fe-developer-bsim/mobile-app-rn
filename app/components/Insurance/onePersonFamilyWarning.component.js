import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Overlay from '../Overlay/Overlay.component';
import styles from './onePersonFamilyWarning.component.style';
import Touchable from '../Touchable.component';
import {noop} from 'lodash';
import PropTypes from 'prop-types';
import {language} from '../../config/language';

export default class ModalExample extends Component {

  static propTypes = {
    onPress: PropTypes.func,
    modalVisible: PropTypes.bool,
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
  }

  onPress = () => {
    const {onPress = noop, hideModal} = this.props;
    hideModal();
    onPress();
  }

  render () {
    const {modalVisible, hideModal} = this.props;
    return (
      <View>
        <Overlay visible={modalVisible} hideModal={hideModal} closeOnTouchOutside>
          <View style={styles.textContainer}>
            <Text style={[styles.bottomPad, styles.header]}>{language.TRAVEL_INSURANCE__ADD_PARTY_WARNING}</Text>
            <Text style={[styles.bottomPad, styles.body]}>{language.TRAVEL_INSURANCE__PARTY_REQUIREMENT_WARNING}</Text>
            <View style={styles.buttonContainer}>
              <View>
                <Touchable onPress={hideModal} style={styles.buttonLeft}><Text>{language.GENERIC__NO}</Text></Touchable>
              </View>
              <View>
                <Touchable onPress={this.onPress}><Text style={styles.yesButton}>{language.GENERIC__YES}</Text></Touchable>
              </View>
            </View>
          </View>
        </Overlay>
      </View>
    );
  }
}