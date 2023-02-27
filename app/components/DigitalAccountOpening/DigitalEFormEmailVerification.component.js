import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Keyboard} from 'react-native';
import DigitalEFormEmailVerificationInput from '../DigitalAccountOpening/DigitalEFormEmailVerificationInput.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './DigitalEForm.styles';
import {noop} from 'lodash';
import BackgroundTimer from 'react-native-background-timer';
import {wrapMethodInFunction, maskedEmail} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {Platform} from 'react-native';
let adjustAndroid;

if (Platform.OS === 'android') {
  adjustAndroid = require('react-native-adjust');
}  

const totalSeconds = 30;

class EmoneyUpgradeEmailVerification extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    navigation: PropTypes.object,
    onSubmitPress: PropTypes.func,
    resendEmailOTP: PropTypes.func,
    cif: PropTypes.string,
    productCode: PropTypes.string
  };

  subscriber = null;
  state = {
    secondsRemaining: totalSeconds
  }

  tick = () => {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      BackgroundTimer.clearInterval(this.interval);
    }
  }

  componentDidMount = () => {
    this.interval = BackgroundTimer.setInterval(this.tick, 1000);
  }

  componentWillUnmount = () => {
    BackgroundTimer.clearInterval(this.interval);
  }

  resendEmailOTP = () => {
    const {resendEmailOTP} = this.props;
    this.setState({resending: true});
    return resendEmailOTP().then(() => {
      this.interval = BackgroundTimer.setInterval(this.tick, 1000);
      this.setState({
        secondsRemaining: totalSeconds,
        resending: false
      });
    }).catch(() => {
      this.setState({
        secondsRemaining: 0,
        resending: false,
      });
    });
  }

  hideKeyboard =  () => {
    Keyboard.dismiss();
  }

  render () {
    const {cif, productCode, ...reduxFormProps} = this.props;
    const {invalid, submitting, email, handleSubmit = noop} = reduxFormProps;
    let adjustEvent;
    if (productCode.includes('EMONEY')) {
      if (Platform.OS === 'android') {
        adjustEvent = new adjustAndroid.AdjustEvent('eb9ysx');
        adjustEvent.addCallbackParameter('page_id', 'ak-emkyc-2');
        adjustEvent.addCallbackParameter('cif', cif);
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      }
    }
    

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.spaceContainer}>
          <View style={styles.rowOtpSubIcon}>
            <View>
              <Text style={styles.otpHeaderTitle}>
                {language.EMONEY__UPGRADE_EMAIL_VERIFICATION_1}
              </Text>
              <Text style={styles.otpPartSMS}>{language.EMONEY__UPGRADE_EMAIL_VERIFICATION_2}</Text>
            </View>
            <View style={styles.iconCenter}>
              <SimasIcon name='envelope' style={styles.otpIcon} size={35}/>
            </View>
          </View>

          <View style={styles.emailContainer}>
            <Text style={styles.loginWelcomeSubMessageOTP}>
              {language.EMONEY__UPGRADE_EMAIL_VERIFICATION_3} 
            </Text>
            <Text style={styles.loginWelcomeSubMessage}>{maskedEmail(email)}</Text>
          </View>

          <View style={styles.inputOTPContainer}>
            <Field name={'emailToken'} style={styles.inputEmail} component={DigitalEFormEmailVerificationInput} secureTextEntry={false} submitHandler={this.hideKeyboard}/>
          </View>
          {this.state.secondsRemaining ? <View style={styles.containerResend}><Text style={styles.dontHaveOTP}>{language.EMONEY__UPGRADE_OTP_DONT_HAVE_OTP}<Text style={styles.disabledLink}>{language.EMONEY__UPGRADE_RESEND_EMAIL_TOKEN}</Text> <Text style={styles.disabledLink2}> {this.state.secondsRemaining}s</Text></Text></View>
            : <SinarmasButton buttonType='link' style={styles.resendOtp} onPress={this.resendEmailOTP} disabled={this.state.resending}>
              <Text style={styles.resendOtpButton}>
                {language.EMONEY__UPGRADE_OTP_RESEND}
              </Text>
            </SinarmasButton>
          }
        </View>

        <View style={styles.buttonWrapper}>
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting} style={styles.buttonOtpSubmitSimas} >
            <Text style={styles.buttonLargeTextStyle}>{language.EMONEY__UPGRADE_VERIFY_EMAIL}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

EmoneyUpgradeEmailVerification.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onSubmitPress: PropTypes.func,
  resendEmailOTP: PropTypes.funcf
};

export default EmoneyUpgradeEmailVerification;
