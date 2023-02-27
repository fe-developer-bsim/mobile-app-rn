import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Field} from 'redux-form';
import {SinarmasButton, SinarmasInput} from '../FormComponents';
import {language} from '../../config/language';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import styles from './EmailVerification.styles';

export const fields = {
  formName: 'emailVerificationForm',
  email: 'email',
};

class EmailVerification extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    handleQuery: PropTypes.func,
    isHidden: PropTypes.bool,
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
  }

  render () {
    const {handleSubmit = noop, invalid, submitting} = this.props;
    return (
      <View style={styles.container}>
        <Text>{language.VERIFY_EMAIL__NOTES}</Text>
        <Field
          name={fields.email}
          component={SinarmasInput}
          label={language.COMMON_EMAIL}
          placeholder={language.COMMON_EMAIL}
        />
        <SinarmasButton disabled={invalid || submitting} text={language.VERIFY_EMAIL__CONTINUE} onPress={handleSubmit}/>
      </View>
    );
  }
}

export default EmailVerification;