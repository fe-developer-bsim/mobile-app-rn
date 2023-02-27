import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import {View, Text} from 'react-native';
import styles from './SmsOtpComponent.styles';
import SmsOtpInput from './SmsOtpInput.component';
import {language} from '../../config/language';
import {SinarmasButton, SinarmasButtonOnboarding} from '../FormComponents';
import {getOTPFromMsg} from '../../utils/transformer.util';
import tracker from '../../utils/googleAnalytics.util';
import BackgroundTimer from 'react-native-background-timer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';

const totalSeconds = 30;

class SmsOtpComponent extends React.Component {
  static propTypes = {
    input: PropTypes.object,
    handleSubmit: PropTypes.func,
    resendOTP: PropTypes.func,
    transRefNum: PropTypes.string,
    userId: PropTypes.number,
    userMobileNumber: PropTypes.string,
    disabled: PropTypes.bool,
    moreInfo: PropTypes.func,
    currentLanguage: PropTypes.string,
    dontRecogniseNumber: PropTypes.func,
    transactionId: PropTypes.string
  }
  static defaultProps = {
    visible: false,
    input: {},
    submitHandler: noop,
    onClose: noop,
  }
  state = {
    secondsRemaining: totalSeconds
  }
  subscriber = null
  tick = () => {
    const {userId} = this.props;
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      BackgroundTimer.clearInterval(this.interval);
      tracker.trackEvent('OTP_NOT_RECEIVED_PAYMENTS', 'TOOK_TIME: ' + String(totalSeconds - this.state.secondsRemaining), null, {label: 'ID: ' + String(userId)});
    }
  }
  componentDidMount = () => {
    this.interval = BackgroundTimer.setInterval(this.tick, 1000);
  }
  componentWillUnmount = () => {
    BackgroundTimer.clearInterval(this.interval);
  }
  readSmsOtp = (message) => {
    const otp = getOTPFromMsg(message, 'sms token SimobiPlus');
    if (otp) { // OTP is read
      this.props.input.onChange(otp);
    }
  }

  resendOTP = () => {
    const {resendOTP, transactionId = ''} = this.props;
    this.setState({resending: true});
    return resendOTP(transactionId).then(() => {
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

  handleSmsOtpChange = () => {
    const {handleSubmit, userId} = this.props;
    handleSubmit();
    tracker.trackEvent('OTP_RECEIVED_PAYMENTS', 'TOOK_TIME: ' + String(totalSeconds - this.state.secondsRemaining), null, {label: 'ID: ' + String(userId)});
  }
  render () {
    const {input, userMobileNumber, handleSubmit, disabled, currentLanguage, dontRecogniseNumber} = this.props;
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
                {language.ONBOARDING__OTP_SEND_TO} {userMobileNumber}
              </Text>
            </View>
            <View style={styles.rowOtpIcon}>
              <View>
                <View>
                  <Text style={styles.dontRecogniseNumberText} onPress={dontRecogniseNumber}>
                    {language.ONBOARDING__OTP_SEND_TO_NOTIFICATION}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.inputOTPCOntainer}>
              <SmsOtpInput style={styles.inputOTP} input={input} />
            </View>
            {this.state.secondsRemaining ? <View style={styles.containerResend}><Text style={styles.dontHaveOTP}>{language.ONBOARDING__OTP_DONT_HAVE_OTP}<Text style={styles.disabledLink}>{language.ONBOARDING__RESEND_SMS_MESSAGE} {this.state.secondsRemaining}s</Text></Text></View>
              : <SinarmasButton buttonType='link' style={styles.resendOtp} onPress={this.resendOTP} disabled={this.state.resending}>
                <Text style={styles.resendOtpButton}>
                  {language.ONBOARDING__OTP_RESEND}
                </Text>
              </SinarmasButton>
            }
          </View>
          <View style={styles.containerDetail}>
            <Text style={styles.otpDetailTop}>{language.ONBOARDING__OTP_MORE_INFO}</Text>
            <View style={styles.otpDetail}>
              <View style={styles.modalTextLeftContainer}><Text style={styles.otpDetail}>1.</Text></View>
              <View style={styles.modalTextRightContainer}><Text style={styles.otpDetail}>{language.ONBOARDING__OTP_MORE_INFO_SUBTITLE}</Text></View>
            </View>
            <View style={styles.otpDetail}>
              <View style={styles.modalTextLeftContainer}><Text style={styles.otpDetail}>2.</Text></View>
              <View style={styles.modalTextRightContainer}><Text style={styles.otpDetail}>{language.ONBOARDING__OTP_MORE_INFO_SUBTITLE_2}</Text></View>
            </View>
          </View>
        </View>
        <View style={styles.buttonOtpSubmit}>
          <SinarmasButtonOnboarding dtActionName='SMS OTP' onPress={handleSubmit} disabled={disabled} style={styles.buttonOtpSubmitSimas} >
            <Text style={styles.buttonOtpSubmitPage}>
              {language.GENERIC__CONTINUE}
            </Text>
          </SinarmasButtonOnboarding>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default SmsOtpComponent;
