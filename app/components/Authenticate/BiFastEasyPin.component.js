import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Keyboard} from 'react-native';
import {SinarmasButtonOnboarding} from '../FormComponents';
import SmsOtpInput from '../SmsOtp/SmsOtpInput.component';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import easyPinStyles from '../OnboardingJourney/EasyPinCreation.component.styles';
import styles from '../Authenticate/BiFastEasyPin.styles';
import noop from 'lodash/noop';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';

class LoginEasyPin extends Component {
  handleValidate = () => {
    Keyboard.dismiss();
  }

  render () {
    const {...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'  contentContainerStyle={styles.bodyContainerEasyPin} extraHeight={120}>
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

          <View style={styles.rowLoginEasyPIN}>
            <Text style={styles.welcomeSubTextNewVerifyEP}>
              {language.EASYPIN__ENTER_EASYPIN_SUBTEXT}
            </Text>
          </View>
          <View style={easyPinStyles.containerEasyPin}>
            <View style={easyPinStyles.inputOTPCOntainer}>
              <Field name={'easyPinBiFast'} style={easyPinStyles.inputOTP} secureTextEntry={true} component={SmsOtpInput} submitHandler={this.handleValidate}/>
            </View>



            <View style={styles.quickLoginContainer} />
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
};

export default LoginEasyPin;
