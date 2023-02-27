import React from 'react';
import PropTypes from 'prop-types';
import Overlay from '../Overlay/Overlay.component';
import noop from 'lodash/noop';
import {View, Text, Platform} from 'react-native';
import styles from './SmsOtpModal.styles';
import SmsOtpInput from './SmsOtpInput.component';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import {getOTPFromMsg} from '../../utils/transformer.util';
import tracker from '../../utils/googleAnalytics.util';
import BackgroundTimer from 'react-native-background-timer';
import PopoverTooltip from 'react-native-popover-tooltip';

const totalSeconds = 30;

const inputContainerWidth = {width: Platform.OS === 'ios' ? 150 : 100};

class SmsOtpModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    input: PropTypes.object,
    submitHandler: PropTypes.func,
    onClose: PropTypes.func,
    resendOTP: PropTypes.func,
    transRefNum: PropTypes.string,
    userId: PropTypes.number,
    userMobileNumber: PropTypes.string,
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
    if (this.props.visible) {
      this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    }
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
    if (otp && this.props.visible) { // OTP is read
      this.props.input.onChange(otp);
      this.handleSmsOtpChange(otp);
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

  handleSmsOtpChange = (pin) => {
    const {submitHandler, onClose, userId} = this.props;
    submitHandler(pin);
    onClose();
    tracker.trackEvent('OTP_RECEIVED_PAYMENTS', 'TOOK_TIME: ' + String(totalSeconds - this.state.secondsRemaining), null, {label: 'ID: ' + String(userId)});
  }
  onClose  = () => {
    this.props.onClose();
    this.setState({secondsRemaining: totalSeconds});
  }
  render () {
    const {visible, input, userMobileNumber} = this.props;
    return (
      <Overlay closeOnTouchOutside visible={visible} onClose={this.onClose} isKeyboardAwareView={true}>
        <Text style={styles.mainTitle}>{language.SMS_OTP__MESSAGE}</Text>
        <Text style={styles.informationSentTo}>{language.ONBOARDING__OTP_SEND_TO}{userMobileNumber}</Text>
        <View style={styles.dontRecognizeNumber}>
          <PopoverTooltip
            buttonComponent={
              <View>
                <Text style={styles.dontRecogniseNumberText}>
                  {language.ONBOARDING__OTP_SEND_TO_NOTIFICATION}
                </Text>
              </View>
            }
            items={[
              {
                label: language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TEXT
              }
            ]}
          />
        </View>
        <View style={[styles.inputContainer, inputContainerWidth]}>
          <SmsOtpInput style={styles.input} submitHandler={this.handleSmsOtpChange} input={input} />
        </View>
        <View>
          {this.state.secondsRemaining ? <View style={styles.containerResend}><Text style={styles.dontHaveOTP}>{language.ONBOARDING__OTP_DONT_HAVE_OTP}<Text style={styles.disabledLink}>{language.ONBOARDING__RESEND_SMS_MESSAGE} {this.state.secondsRemaining}s</Text></Text></View>
            : <SinarmasButton buttonType='link' onPress={this.resendOTP} disabled={this.state.resending} text={language.ONBOARDING__OTP_RESEND} />}
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
      </Overlay>
    );
  }
}
export default SmsOtpModal;
