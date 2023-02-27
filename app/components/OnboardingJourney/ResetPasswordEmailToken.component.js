import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Keyboard} from 'react-native';
import EmailVerificationInput from '../EmoneyJourney/EmailVerificationInput.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './EmailToken.styles';
import {noop, result} from 'lodash';
import BackgroundTimer from 'react-native-background-timer';
import {wrapMethodInFunction, maskedEmail} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';

const totalSeconds = 30;

class ResetPasswordEmailToken extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    navigation: PropTypes.object,
    onSubmitPress: PropTypes.func,
    resendEmailOTP: PropTypes.func,
    userId: PropTypes.number,
    TXID: PropTypes.string,
    email: PropTypes.string
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
    const {navigation, resendEmailOTP} = this.props;
    const noCard = result(navigation, 'state.params.noCard', false);
    const typeActivation = result(navigation, 'state.params.typeActivation', '');
    const ipassport = result(navigation, 'state.params.ipassport', '');
    const payload = {noCard, typeActivation, ipassport};
    this.setState({resending: true});
    return resendEmailOTP(payload).then(() => {
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
    const {email, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
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
            <Field name={'emailToken'} style={styles.inputEmail} component={EmailVerificationInput} secureTextEntry={false} submitHandler={this.hideKeyboard}/>
          </View>
          {this.state.secondsRemaining ? <View style={styles.containerResend}><Text style={styles.dontHaveOTP}>{language.EMONEY__UPGRADE_OTP_DONT_HAVE_OTP}<Text style={styles.disabledLink}>{language.EMONEY__UPGRADE_RESEND_EMAIL_TOKEN}</Text> <Text style={styles.disabledLink2}> {this.state.secondsRemaining}s</Text></Text></View>
            : <SinarmasButton buttonType='link' style={styles.resendOtp} onPress={this.resendEmailOTP} disabled={this.state.resending}>
              <Text style={styles.resendOtpButton}>
                {language.EMONEY__UPGRADE_OTP_RESEND}
              </Text>
            </SinarmasButton>
          }
        </View>

        <View style={styles.buttonWrapperHorizontal}>
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting} style={styles.buttonOtpSubmitSimas} >
            <Text style={styles.buttonLargeTextStyle}>{language.EMONEY__UPGRADE_VERIFY_EMAIL}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

ResetPasswordEmailToken.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onSubmitPress: PropTypes.func,
  resendEmailOTP: PropTypes.funcs
};

export default ResetPasswordEmailToken;
