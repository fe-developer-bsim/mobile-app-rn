import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './CreateNewPassword.styles.js';
import {Field} from 'redux-form';
import Touchable from '../Touchable.component';
import {SinarmasInput, SinarmasButton} from '../FormComponents';
import noop from 'lodash/noop';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import showPasswordIcon from '../../assets/images/blackEyeIcon.png';
import hidePasswordIcon from '../../assets/images/blackEyeSlashIcon.png';

class CreateNewPassword extends React.Component {
  static propTypes = {
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
    showOrHideNewPassword: PropTypes.func,
    isSecureTextEntryNewPassword: PropTypes.bool,
    showOrHideConfirmNewPassword: PropTypes.func,
    isSecureTextEntryConfirmNewPassword: PropTypes.bool,
    oldPassword: PropTypes.string,
    userName: PropTypes.string,
    validationInput: PropTypes.func,
    setNewPasswordValue: PropTypes.func,
    passwordValue: PropTypes.string
  }

  render () {
    const {submitting, invalid, showOrHideNewPassword, isSecureTextEntryNewPassword = true, showOrHideConfirmNewPassword, isSecureTextEntryConfirmNewPassword = true, handleSubmit = noop, oldPassword = '', userName = '', passwordValue = '', validationInput, setNewPasswordValue} = this.props;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.container} extraHeight={120}>
        <View>
          <View style={styles.inputSpacing}>
            <View style={styles.passwordFieldsContainer}>
              <Field
                name='newPassword'
                label={language.CHANGE_PASSWORD__ENTER_NEW_PASSWORD}
                placeholder={language.HINTTEXT__PASSWORD}
                component={SinarmasInput}
                secureTextEntry={isSecureTextEntryNewPassword}
                isUseSuccessInputText={true}
                typeField={'newPassword'}
                usernameValue={userName}
                oldPassword={oldPassword}
                validationInput={validationInput}
                setNewPasswordValue={setNewPasswordValue}
              />
              <Touchable onPress={showOrHideNewPassword} style={styles.eyeIconStyle}><Image source={isSecureTextEntryNewPassword ? showPasswordIcon : hidePasswordIcon}/></Touchable>
            </View>
            <Text style={styles.passRule}>{language.ONBOARDING__ACCOUNT_PASSWORD_SUBTEXT}</Text>
          </View>
          <View style={styles.inputSpacing}>
            <View style={styles.passwordFieldsContainer}>
              <Field
                name='confirmNewPassword'
                label={language.CHANGE_PASSWORD__CONFIRM_NEW_PASSWORD}
                placeholder={language.HINTTEXT__PASSWORD}
                component={SinarmasInput}
                secureTextEntry={isSecureTextEntryConfirmNewPassword}
                isUseSuccessInputText={true}
                typeField={'confirmNewPassword'}
                usernameValue={userName}
                oldPassword={oldPassword}
                passwordValue={passwordValue}
                validationInput={validationInput}
              />
              <Touchable onPress={showOrHideConfirmNewPassword} style={styles.eyeIconStyle}><Image source={isSecureTextEntryConfirmNewPassword ? showPasswordIcon : hidePasswordIcon}/></Touchable>
            </View>
          </View>
        </View>
        <SinarmasButton text={language.BUTTON__NEXT} onPress={handleSubmit} disabled={(submitting || invalid)}/>
      </KeyboardAwareScrollView>
    );
  }
}

export default CreateNewPassword;
