import React, {Component} from 'react';
import {View, Text} from 'react-native';
import SmsOtpInput from '../SmsOtp/SmsOtpInput.component';
import FormError from '../FormError/FormError.component';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './Onboarding.component.styles';
import easyPinStyles from './EasyPinCreation.component.styles';
import noop from 'lodash/noop';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import PropTypes from 'prop-types';

class EasyPin extends Component {
  static propTypes={
    handleSubmit: PropTypes.func,
    error: PropTypes.string,
    isMigrate: PropTypes.bool,
    encryptedToken: PropTypes.string,
  }

  render () {
    const {error, handleSubmit = noop} = this.props;
    return (
      <View style={styles.bodyContainerEasyPin}>
        <View style={styles.columnContainer}>
          <View style={styles.rowEasyPINFormat}>
            <View>
              <Text style={styles.easypinHeaderTitle}>
                {language.ONBOARDING__EASYPIN_TITLE}
              </Text>
            </View>
            <View>
              <SimasIcon name='EasyPIN' style={styles.otpIcon} size={50}/>
            </View>
          </View>
          <Text style={styles.welcomeSubTextNewVerifyEP}>
            {language.ONBOARDING__EASYPIN_SUBTEXT}
          </Text>
          <View style={easyPinStyles.containerEasyPin}>
            <View style={easyPinStyles.inputOTPCOntainer}>
              <Field name={'easyPin'} style={easyPinStyles.inputOTP} secureTextEntry={true} component={SmsOtpInput} submitHandler={wrapMethodInFunction(handleSubmit)}/>
            </View>
            <View style={easyPinStyles.errorContainer}>
              {error && <FormError iconName='input-error' text={error}/>}
            </View>
          </View>
        </View>
      </View>
    );
  }

}

export default EasyPin;
