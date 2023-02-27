import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import {View, Text} from 'react-native';
import styles from './EasyPinComponent.styles';
import EasyPinInput from './EasyPinInput.component';
import {language} from '../../config/language';
import {SinarmasButtonOnboarding} from '../FormComponents';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';

class EasyPinModal extends React.Component {
  static propTypes = {
    input: PropTypes.object,
    submitHandler: PropTypes.func,
    onClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    disabled: PropTypes.bool,
    changeEasyPin: PropTypes.func,
    isCloseTd: PropTypes.bool,
    forgotEasyPin: PropTypes.func,
    isRemittance: PropTypes.bool,
  }
  static defaultProps = {
    visible: false,
    input: {},
    submitHandler: noop
  }
  state = {
    disableSubmit: false
  }
  onSubmit = () => {
    const {handleSubmit = noop} = this.props;
    this.setState({disableSubmit: true}, () => {
      handleSubmit();
      setTimeout(() => {
        this.setState({disableSubmit: false});
      }, 5000);
    });
  }
  render () {
    const {input, disabled, changeEasyPin, forgotEasyPin, isRemittance} = this.props;
    if (isRemittance) {
      return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' bounces={false} contentContainerStyle={styles.bodyContainerEasyPin} extraHeight={120}>
          <View>
            <View style={styles.rowEasyPINFormat}>
              <View>
                <Text style={styles.easypinHeaderTitle}>
                  {language.EASYPIN__ENTER_EASYPIN}
                </Text>
              </View>
              <View>
                <SimasIcon name='EasyPIN' style={styles.easypinIcon} size={50}/>
              </View>
            </View>
            <View style={styles.rowEasyPIN}>
              <Text style={styles.verifyEasyPin}>
                {language.EASYPIN__ENTER_EASYPIN_SUBTEXT}
              </Text>
            </View>
            <View style={styles.containerEasyPin}>
              <View style={styles.inputOTPCOntainer}>
                <EasyPinInput style={styles.inputOTP} input={input} changeEasyPin={changeEasyPin}/>
              </View>
            </View>
            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.loginProblemTextEP}>{language.EASYPIN__ENTER_EASYPIN_SUBTEXT_POPOVER_ATTEMPTS}</Text>
            </View>
            <View style={styles.forgotEasyPinContainer}>
              <Touchable onPress={forgotEasyPin}>
                <Text style={styles.loginProblemTextEP}>{language.LOGIN__LOGIN_PROBLEM}
                  <Text style={styles.resendOtpButton}>{language.LOGIN__FORGOT_EASYPIN}</Text>
                </Text>
              </Touchable>
            </View>
          </View>
          <View style={styles.buttonOtpSubmit}>
            <SinarmasButtonOnboarding onPress={this.onSubmit} disabled={disabled || this.state.disableSubmit}  >
              <Text style={styles.buttonOtpSubmitPage}>{language.GENERIC__CONTINUE}</Text>
            </SinarmasButtonOnboarding>
          </View>
        </KeyboardAwareScrollView>
      );
    } else {
      return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' bounces={false} contentContainerStyle={styles.bodyContainerEasyPin} extraHeight={120}>
          <View>
            <View style={styles.rowEasyPINFormat}>
              <View>
                <Text style={styles.easypinHeaderTitle}>
                  {language.EASYPIN__ENTER_EASYPIN}
                </Text>
              </View>
              <View>
                <SimasIcon name='EasyPIN' style={styles.easypinIcon} size={50}/>
              </View>
            </View>
            <View style={styles.rowEasyPIN}>
              <Text style={styles.verifyEasyPin}>
                {language.EASYPIN__ENTER_EASYPIN_SUBTEXT}
              </Text>
            </View>
            <View style={styles.containerEasyPin}>
              <View style={styles.inputOTPCOntainer}>
                <EasyPinInput style={styles.inputOTP} input={input} changeEasyPin={changeEasyPin}/>
              </View>
            </View>
          </View>
          <View style={styles.buttonOtpSubmit}>
            <SinarmasButtonOnboarding dtActionName='Enter EasyPIN' onPress={this.onSubmit} disabled={disabled || this.state.disableSubmit}  >
              <Text style={styles.buttonOtpSubmitPage}>{language.GENERIC__CONTINUE}</Text>
            </SinarmasButtonOnboarding>
          </View>
        </KeyboardAwareScrollView>
      );
    }
  }
}
export default EasyPinModal;
