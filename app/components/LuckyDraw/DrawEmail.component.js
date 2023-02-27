import React from 'react';
import Overlay from '../Overlay/Overlay.component';
import noop from 'lodash/noop';
import {View, Text, Platform, Image} from 'react-native';
import {textAlignCenter, fontSizeXLStyle} from '../../styles/common.styles';
import styles from './EasyPinModal.styles';
import EasyPinInput from './EasyPinInput.component';
import {language} from '../../config/language';
import EasyPINLogo from '../../assets/images/easypin-small.png';
import QuestionLogo from '../../assets/images/question-grey.png';
import PopoverTooltip from 'react-native-popover-tooltip';
import PropTypes from 'prop-types';

const inputContainerWidth = {width: Platform.OS === 'ios' ? 150 : 100};

class EasyPinModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    input: PropTypes.object,
    submitHandler: PropTypes.func,
    onClose: PropTypes.func,
  }
  static defaultProps = {
    visible: false,
    input: {},
    submitHandler: noop,
    onClose: noop,
  }
  handleEasyPinChange = (pin) => {
    const {submitHandler, onClose} = this.props;
    submitHandler(pin);
    onClose();
  }

  render () {
    const {visible, onClose, input} = this.props;
    return (
      <Overlay closeOnTouchOutside visible={visible} onClose={onClose}>
        <View style={styles.row}>
          <Text style={{...styles.mainTitle, ...fontSizeXLStyle, ...textAlignCenter}}>{language.EASYPIN__ENTER_EASYPIN}</Text>
          <Image source={EasyPINLogo} style={styles.appLogoeasypin}/>
        </View>
        <View style={styles.rowEasyPIN}>
          <Text style={styles.mainTitleInfoEasyPin}>{language.EASYPIN__ENTER_EASYPIN_SUBTEXT}</Text>
          <PopoverTooltip
            buttonComponent={
              <View style={styles.appLogoquestion}>
                <Image source={QuestionLogo}/>
              </View>
            }
            items={[
              {
                label: language.EASYPIN__ENTER_EASYPIN_SUBTEXT_NOTIFICATION
              }
            ]}
          />
        </View>
        <View style={[styles.inputContainer, inputContainerWidth]}>
          <EasyPinInput style={styles.input} submitHandler={this.handleEasyPinChange} input={input} />
        </View>
        <View style={styles.mainTitleAttempts}>
          <Text style={styles.mainTitleAttemptstext}>{language.EASYPIN__ENTER_EASYPIN_SUBTEXT_POPOVER_ATTEMPTS}</Text>
        </View>
      </Overlay>
    );
  }
}
export default EasyPinModal;
