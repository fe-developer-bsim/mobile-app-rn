import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Keyboard} from 'react-native';
import {SinarmasButtonOnboarding} from '../FormComponents';
import {Field} from 'redux-form';
import SmsOtpInput from '../SmsOtp/SmsOtpInput.component';
import {language} from '../../config/language';
import styles from './Onboarding.component.styles';
import easyPinStyles from './EasyPinCreation.component.styles';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import noop from 'lodash/noop';
import BackgroundTimer from 'react-native-background-timer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import tracker from '../../utils/googleAnalytics.util';
import SimasIcon from '../../assets/fonts/SimasIcon';

export const totalSeconds = 60;

class OTPFormView extends Component {
  subscriber = null;
  state = {
    secondsRemaining: totalSeconds
  }

  tick = () => {
    const {userId, TXID, doBack, showAlertOtpFailed} = this.props;
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      BackgroundTimer.clearInterval(this.interval);
      tracker.trackEvent('OTP_NOT_RECEIVED_ONBOARDING', 'TOOK_TIME: ' + String(totalSeconds - this.state.secondsRemaining), null, {label: `TXID: ${TXID}, ID: ${userId}`});
      showAlertOtpFailed();
      doBack();
    }
  }

  componentDidMount = () => {
    this.interval = BackgroundTimer.setInterval(this.tick, 1000);
  }

  componentWillUnmount = () => {
    BackgroundTimer.clearInterval(this.interval);
  }

  hideKeyboard =  () => {
    const {userId, TXID} = this.props;
    Keyboard.dismiss();
    tracker.trackEvent('OTP_RECEIVED_ONBOARDING', 'TOOK_TIME: ' + String(totalSeconds - this.state.secondsRemaining), null, {label: `TXID: ${TXID}, ID: ${userId}`});
  }

  render () {
    const {currentLanguage, dontRecogniseNumber, newUserMobileMigrate, isMigrate, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop, mobileNumber} = reduxFormProps;
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerOTP} extraHeight={120}>
        <View style={styles.columnContainer}>
          <View>
            <View style={styles.rowOtpSubIcon}>
              <View>
                {currentLanguage === 'id' ?
                  <Text style={styles.otpHeaderTitle}>
                    {language.ONBOARDING__ENTER_OTP_PART_ONE}
                    <Text style={styles.otpPartSMS}>{language.ONBOARDING__ENTER_OTP_PART_TWO}</Text>
                  </Text> :
                  <Text style={styles.otpHeaderTitle}>
                    {language.ONBOARDING__ENTER_OTP_PART_ONE}
                    <Text style={styles.otpPartSMS}>{language.ONBOARDING__ENTER_OTP_PART_TWO}</Text>
                  </Text>
                }
              </View>
              <View>
                <SimasIcon name='OTP' style={styles.otpIcon} size={50}/>
              </View>
            </View>
            <View>
              <Text style={styles.loginWelcomeSubMessageOTP}>
                {language.ONBOARDING__OTP_SEND_TO} {isMigrate ? newUserMobileMigrate : mobileNumber}
              </Text>
            </View>
            <View style={styles.rowOtpIcon}>
              <View>
                <Text style={styles.dontRecogniseNumberText} onPress={dontRecogniseNumber}>
                  {language.ONBOARDING__OTP_SEND_TO_NOTIFICATION}
                </Text>
              </View>
            </View>
          </View>
          <View style={easyPinStyles.container}>
            <View style={easyPinStyles.inputOTPCOntainer}>
              <Field name={'OTP'} style={easyPinStyles.inputOTP} component={SmsOtpInput} secureTextEntry={false} submitHandler={this.hideKeyboard}/>
            </View>
            <View style={styles.containerResend}>
              <Text style={styles.dontHaveOTP}>
                <Text style={styles.disabledLink}>Time remaining {this.state.secondsRemaining}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.containerDetail}>
            <Text style={styles.otpDetailTop}>{language.ONBOARDING__OTP_MORE_INFO}</Text>
            <View style={styles.otpRow}>
              <View style={styles.modalTextLeftContainer}><Text style={styles.otpDetail}>1.</Text></View>
              <View style={styles.modalTextRightContainer}><Text style={styles.otpDetail}>{language.ONBOARDING__OTP_MORE_INFO_SUBTITLE}</Text></View>
            </View>
            <View style={styles.otpRow}>
              <View style={styles.modalTextLeftContainer}><Text style={styles.otpDetail}>2.</Text></View>
              <View style={styles.modalTextRightContainer}><Text style={styles.otpDetail}>{language.ONBOARDING__OTP_MORE_INFO_SUBTITLE_CHANGE_DEVICE}</Text></View>
            </View>
          </View>
        </View>
        <View style={styles.buttonOtpSubmit}>
          <SinarmasButtonOnboarding onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting} style={styles.buttonOtpSubmitSimas} >
            <Text style={styles.buttonOtpSubmitPage}>
              {language.GENERIC__CONTINUE}
            </Text>
          </SinarmasButtonOnboarding>
        </View>
      </KeyboardAwareScrollView>
    );
  }

}

OTPFormView.propTypes = {
  handleSubmit: PropTypes.func,
  setOTP: PropTypes.func,
  transRefNum: PropTypes.string,
  TXID: PropTypes.string,
  userId: PropTypes.number,
  moreInfo: PropTypes.func,
  currentLanguage: PropTypes.string,
  dontRecogniseNumber: PropTypes.func,
  newUserMobileMigrate: PropTypes.string,
  isMigrate: PropTypes.bool,
  doBack: PropTypes.func,
  showAlertOtpFailed: PropTypes.func,
};

export default OTPFormView;
