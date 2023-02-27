import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Keyboard} from 'react-native';
import {SinarmasButtonOnboarding} from '../FormComponents';
import SmsOtpInput from '../SmsOtp/SmsOtpInput.component';
import FormError from '../FormError/FormError.component';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './ChangeEasyPin.styles';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import noop from 'lodash/noop';
import SimasIcon from '../../assets/fonts/SimasIcon';

export const fields = {
  EASYPIN: 'easyPin',
  EASYPIN_CONFIRM: 'easyPinConfirm'
};

class EasyPinConfirmView extends Component {
  handleValidate = (easyPinConfirm) => {
    Keyboard.dismiss();
    const {easyPin} = this.props.formValues;
    if (easyPinConfirm !== easyPin) {
      this.props.validateBeforeSubmit();
    }
  }

  render () {
    const {...reduxFormProps} = this.props;
    const {invalid, submitting, error, handleSubmit = noop} = reduxFormProps;

    return (
      <View style={styles.bodyContainerEasyPin}>
        <View style={styles.columnContainer}>
          <View style={styles.rowEasyPINFormat}>
            <View>
              <Text style={styles.easypinHeaderTitle}>
                {language.PROFILE__EASYPIN_NEW_CONFIRM}
              </Text>
            </View>
            <View>
              <SimasIcon name='EasyPIN' style={styles.easypinIcon} size={50}/>
            </View>
          </View>
          <Text style={styles.welcomeSubTextNewVerifyEP}>
            {language.ONBOARDING__EASYPIN_SUBTEXT}
          </Text>
          <View style={styles.containerEasyPin}>
            <View style={styles.inputOTPCOntainer}>
              <Field name={fields.EASYPIN_CONFIRM} style={styles.inputOTP} secureTextEntry={true} component={SmsOtpInput} submitHandler={this.handleValidate}/>
            </View>
            <View style={styles.errorContainer}>
              {error && <FormError iconName='input-error' text={error}/>}
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
      </View>
    );
  }

}

EasyPinConfirmView.propTypes = {
  handleSubmit: PropTypes.func,
  validateBeforeSubmit: PropTypes.func,
  formValues: PropTypes.object,
};

export default EasyPinConfirmView;
