import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Keyboard, Platform} from 'react-native';
import {SinarmasButtonOnboarding} from '../FormComponents';
import SmsOtpInput from '../SmsOtp/SmsOtpInput.component';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import easyPinStyles from '../OnboardingJourney/EasyPinCreation.component.styles';
import Touchable from '../Touchable.component';
import styles from '../OnboardingJourney/Onboarding.component.styles';
import noop from 'lodash/noop';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';

class LoginEasyPin extends Component {
  handleValidate = () => {
    Keyboard.dismiss();
  }

  showFingerprintModalAndroid = () => {
    this.props.showFingerprintModalAndroid();
    Keyboard.dismiss();
  }

  render () {
    const {forgotEasyPin, isFaceRegistered, isUsingFaceRecog, isUsingFingerprint, hasFingerprint, loginFaceRecognition,
      showFingerprintModalIOS, isFaceRecogEnabled, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'  contentContainerStyle={styles.bodyContainerEasyPin} extraHeight={120}>
        <View>
          <View style={styles.rowEasyPINFormat}>
            <View>
              <Text style={styles.easypinHeaderTitle}>
                {language.LOGIN_EASYPIN__TITLE}
              </Text>
            </View>
            <View>
              <SimasIcon name='EasyPIN' style={styles.easypinIcon} size={50}/>
            </View>
          </View>

          <View style={styles.rowLoginEasyPIN}>
            <Text style={styles.welcomeSubTextNewVerifyEP}>
              {language.EASYPIN__ENTER_EASYPIN_SUBTEXT}
            </Text>
          </View>
          <View style={easyPinStyles.containerEasyPin}>
            <View style={easyPinStyles.inputOTPCOntainer}>
              <Field name={'easyPin'} style={easyPinStyles.inputOTP} secureTextEntry={true} component={SmsOtpInput} submitHandler={this.handleValidate}/>
            </View>
            <View style={styles.forgotPasswordContainer}>
              <Text style={easyPinStyles.loginProblemTextEP}>{language.EASYPIN__ENTER_EASYPIN_SUBTEXT_POPOVER_ATTEMPTS}</Text>
            </View>
            <View style={styles.forgotEasyPinContainer}>
              <Touchable onPress={forgotEasyPin}>
                <Text style={easyPinStyles.loginProblemTextEP}>{language.LOGIN__LOGIN_PROBLEM}
                  <Text style={styles.resendOtpButton}>{language.LOGIN__FORGOT_EASYPIN}</Text>
                </Text>
              </Touchable>
            </View>

            <View style={styles.quickLoginContainer}>
              {
                hasFingerprint && isUsingFingerprint ?
                  <Touchable onPress={Platform.OS === 'android' ? this.showFingerprintModalAndroid : showFingerprintModalIOS}>
                    <View style={styles.registerContent}>
                      <View style={styles.quickLoginIconContainer}>
                        <SimasIcon name='fingerprint' style={styles.quickLoginIcon} size={40}/>
                      </View>
                      <View>
                        <Text style={styles.resendOtpButton}>{language.LOGIN__QUICK_FINGERPRINT_1}</Text>
                        <Text style={styles.resendOtpButton}>{language.LOGIN__QUICK_FINGERPRINT_2}</Text>
                      </View>
                    </View>
                  </Touchable>
                  : null
              }
              {(hasFingerprint && isFaceRegistered && isUsingFaceRecog && isUsingFingerprint) ?
                <View style={styles.quickLoginBorder}/> : null
              }
              {isFaceRegistered && isUsingFaceRecog && isFaceRecogEnabled ?
                <Touchable onPress={loginFaceRecognition}>
                  <View style={styles.registerContent}>
                    <View style={styles.quickLoginIconContainer}>
                      <SimasIcon name='face-recog' style={styles.quickLoginIcon} size={40}/>
                    </View>
                    <View>
                      <Text style={styles.resendOtpButton}>{language.LOGIN__QUICK_FACE_1}</Text>
                      <Text style={styles.resendOtpButton}>{language.LOGIN__QUICK_FACE_2}</Text>
                    </View>
                  </View>
                </Touchable>
                : null
              }
            </View>
          </View>
        </View>
        <View style={styles.buttonOtpSubmit}>
          <SinarmasButtonOnboarding onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting}  >
            <Text style={styles.buttonOtpSubmitPage}>{language.GENERIC__CONTINUE}</Text>
          </SinarmasButtonOnboarding>
        </View>
      </KeyboardAwareScrollView>
    );
  }

}

LoginEasyPin.propTypes = {
  handleSubmit: PropTypes.func,
  forgotEasyPin: PropTypes.func,
  loginFaceRecognition: PropTypes.func,
  isUsingFaceRecog: PropTypes.bool,
  isUsingFingerprint: PropTypes.bool,
  hasFingerprint: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  isFaceRegistered: PropTypes.bool,
  isLockedDevice: PropTypes.bool,
  loginFingerprint: PropTypes.func,
  visible: PropTypes.bool,
  showFingerprintModalAndroid: PropTypes.func,
  showFingerprintModalIOS: PropTypes.func,
  onModalClose: PropTypes.func,
  isFaceRecogEnabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

};

export default LoginEasyPin;
