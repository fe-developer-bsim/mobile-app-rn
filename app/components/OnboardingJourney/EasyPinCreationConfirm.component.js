import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Keyboard} from 'react-native';
import {SinarmasButtonOnboarding} from '../FormComponents';
import SmsOtpInput from '../SmsOtp/SmsOtpInput.component';
import FormError from '../FormError/FormError.component';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import easyPinStyles from './EasyPinCreation.component.styles';
import styles from './Onboarding.component.styles';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import noop from 'lodash/noop';
import SimasIcon from '../../assets/fonts/SimasIcon';
class EasyPinConfirmView extends Component {
  handleValidate = (easyPinConfirm) => {
    Keyboard.dismiss();
    const {easyPin} = this.props.creationFormValues;
    if (easyPinConfirm !== easyPin) {
      this.props.validateBeforeSubmit();
    }
  }

  state = {
    disabled: false,
  }

  onModalSubmit = () => {
    this.setState({disabled: true}, () => {
      // set time out because of this bug
      // https://github.com/facebook/react-native/issues/10471
      const {handleSubmit = noop} = this.props;
      wrapMethodInFunction(handleSubmit());
      setTimeout(() => {
        this.setState({disabled: false});
      }, 7000);
    });
  };

  render () {
    const {...reduxFormProps} = this.props;
    const {invalid, submitting, error} = reduxFormProps;

    return (
      <View style={styles.bodyContainerEasyPin}>
        <View style={styles.columnContainer}>
          <View style={styles.rowEasyPINFormat}>
            <View>
              <Text style={styles.easypinHeaderTitle}>
                {language.ONBOARDING__EASYPIN_CONFIRM_TITLE}
              </Text>
            </View>
            <View>
              <SimasIcon name='EasyPIN' style={styles.easypinIcon} size={50}/>
            </View>
          </View>
          <Text style={styles.welcomeSubTextNewVerifyEP}>
            {language.ONBOARDING__EASYPIN_SUBTEXT}
          </Text>
          <View style={easyPinStyles.containerEasyPin}>
            <View style={easyPinStyles.inputOTPCOntainer}>
              <Field name={'easyPinConfirm'} style={easyPinStyles.inputOTP} secureTextEntry={true} component={SmsOtpInput} submitHandler={this.handleValidate}/>
            </View>
            <View style={easyPinStyles.errorContainer}>
              {error && <FormError iconName='input-error' text={error}/>}
            </View>
          </View>
        </View>
        <View style={styles.buttonOtpSubmit}>
          <SinarmasButtonOnboarding onPress={this.onModalSubmit} disabled={invalid || submitting || this.state.disabled}  >
            <Text style={styles.buttonOtpSubmitPage}>{language.GENERIC__CONTINUE}</Text>
          </SinarmasButtonOnboarding>
        </View>
      </View>
    );
  }

}

EasyPinConfirmView.propTypes = {
  handleSubmit: PropTypes.func,
  validateBeforeSubmit: PropTypes.func,
  creationFormValues: PropTypes.object,
  isMigrate: PropTypes.bool,
  encryptedToken: PropTypes.string
};

export default EasyPinConfirmView;
