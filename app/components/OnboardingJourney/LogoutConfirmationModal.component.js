import React from 'react';
import PropTypes from 'prop-types';
import Overlay from '../Overlay/Overlay.component';
import noop from 'lodash/noop';
import Touchable from '../Touchable.component';
import {View, Text} from 'react-native';
import styles from './LogoutConfirmationModal.styles';
import {language} from '../../config/language';

class LogoutModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    input: PropTypes.object,
    logoutHandler: PropTypes.func,
    onClose: PropTypes.func,
    logout: PropTypes.func
  }
  static defaultProps = {
    visible: false,
    input: {},
    submitHandler: noop,
    onClose: noop,
  }
  render () {
    const {visible, onClose, logoutHandler} = this.props;
    return (
      <Overlay closeOnTouchOutside visible={visible} onClose={onClose}>
        <Text style={styles.heading}>{language.LOGOUT_CONFIRMATION__TITLE}</Text>
        <Text style={styles.subheading}>{language.LOGOUT_CONFIRMATION__SUBHEADING}</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonAlign}>
            <Touchable onPress={onClose}>
              <Text style={styles.cancelText}>{language.LOGOUT_CONFIRMATION__CANCEL_BUTTON}</Text>
            </Touchable>
          </View>
          <View style={styles.buttonAlign}>
            <Touchable onPress={logoutHandler}>
              <Text style={styles.logoutText}>{language.LOGOUT_CONFIRMATION__LOGOUT_BUTTON}</Text>
            </Touchable>
          </View>
        </View>
      </Overlay>
    );
  }
}
export default LogoutModal;
