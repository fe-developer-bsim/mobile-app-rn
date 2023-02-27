import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import AndroidOverlay from '../Overlay/AndroidOverlay.component.android';
import noop from 'lodash/noop';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import styles from './FingerprintModal.styles.android';
import {language} from '../../config/language/index';

class FingerPrintModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func
  }
  static defaultProps = {
    visible: false,
    onClose: noop,
  }

  render () {
    const {visible, onClose} = this.props;
    return (
      <AndroidOverlay closeOnTouchOutside visible={visible} onClose={onClose}>
        <Text style={styles.heading}>{language.FINGER_PRINT__SIGN_IN}</Text>
        <Text style={styles.subheading}>{language.FINGER_PRINT__CONFIRM}</Text>
        <View style={styles.iconContainer}>
          <SimasIcon name='fingerprint' size={48} />
          <Text style={styles.iconText}>{language.FINGER_PRINT__TOUCH_SENSOR}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonAlign}>
            <Touchable>
              <Text style={styles.cancelText} onPress={onClose}>{language.FINGER_PRINT__CANCEL}</Text>
            </Touchable>
          </View>
        </View>
      </AndroidOverlay>
    );
  }
}

export default FingerPrintModal;
