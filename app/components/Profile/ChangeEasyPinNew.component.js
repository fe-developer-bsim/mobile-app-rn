import React, {Component} from 'react';
import {View, Text} from 'react-native';
import SmsOtpInput from '../SmsOtp/SmsOtpInput.component';
import FormError from '../FormError/FormError.component';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './ChangeEasyPin.styles';
import noop from 'lodash/noop';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import PropTypes from 'prop-types';

export const fields = {
  EASYPIN: 'easyPin',
  EASYPIN_CONFIRM: 'easyPinConfirm'
};

class ChangeEasyPinNew extends Component {
  static propTypes={
    handleSubmit: PropTypes.func,
    error: PropTypes.string
  }

  render () {
    const {error, handleSubmit = noop} = this.props;
    return (
      <View style={styles.bodyContainerEasyPin}>
        <View style={styles.columnContainer}>
          <View style={styles.rowEasyPINFormat}>
            <View>
              <Text style={styles.easypinHeaderTitle}>
                {language.PROFILE__EASYPIN_NEW}
              </Text>
            </View>
            <View>
              <SimasIcon name='EasyPIN' style={styles.easypinIcon} size={50}/>
            </View>
          </View>
          <Text style={styles.welcomeSubTextNewVerifyEP}>
            {language.PROFILE__EASYPIN_NEW_SUBTEXT}
          </Text>
          <View style={styles.containerEasyPin}>
            <View style={styles.inputOTPCOntainer}>
              <Field name={fields.EASYPIN} style={styles.inputOTP} secureTextEntry={true} component={SmsOtpInput} submitHandler={wrapMethodInFunction(handleSubmit)}/>
            </View>
            <View style={styles.errorContainer}>
              {error && <FormError iconName='input-error' text={error}/>}
            </View>
          </View>
        </View>
      </View>
    );
  }

}

export default ChangeEasyPinNew;
