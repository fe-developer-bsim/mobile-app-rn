import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import {SinarmasIconInput, SinarmasButton} from '../FormComponents';
import FormError from '../FormError/FormError.component';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './Onboarding.component.styles';
import noop from 'lodash/noop';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import result from 'lodash/result';
import Touchable from '../Touchable.component';
import TermConditionLink from './TermConditionLink.component';
import Switch from '../FormComponents/SinarmasSwitch/Switch.component';
import showPasswordIcon from '../../assets/images/blackEyeIcon.png';
import hidePasswordIcon from '../../assets/images/blackEyeSlashIcon.png';

export const fields = {
  USERNAME: 'username',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  IS_ALLOWED_IB: 'isAllowedIB'
};

class RegisterForm extends Component {

  state = {
    toggleCheck: false,
    ibCheck: 'NO',
  }

  handleIBtoggle = () => {
    const {toggleIB, enableIB} = this.props;
    const tog = true;
    this.setState({
      toggleCheck: this.state.toggleCheck === false ? tog : !tog,
      ibCheck: toggleIB === 'NO' ? 'YES' : 'NO'
    });
    if (toggleIB === 'NO') {
      enableIB('YES');
    }    else {
      enableIB('NO');
    }
  }

  render () {
    const {navigation, action, forgotPassword, maskedUsername, showOrHideNewPassword, isSecureTextEntryNewPassword = true, showOrHideConfirmNewPassword, isSecureTextEntryConfirmNewPassword = true, validationInput, setNewUsernameValue, setNewPasswordValue, usernameValue, passwordValue, toggleIB, ...reduxFormProps} = this.props;
    const {invalid, error, anyTouched, submitting, handleSubmit = noop} = reduxFormProps;
    const isForgetPassword = result(navigation, 'state.params.isForgetPassword', false);
    const isForgotEasypin = action === 'forgotEasyPin';
    const tog = true;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithTerms} extraHeight={120}>
        <View style={styles.columnContainer}>
          <Text style={styles.welcomeTextNew}>
            {isForgotEasypin ? language.ONBOARDING__FORGOT_PASSWORD_MESSAGE :
              maskedUsername ? language.ONBOARDING__ENTER_NEW_PASSWORD_TITLE : language.ACTIVATION_FORM_TITLE}
          </Text>
          <View style={styles.rowTitlePlusName}>
            <Text style={styles.forgotPassWordSubTitle}>
              {isForgotEasypin ? language.ONBOARDING__FORGOT_PASSWORD_SUBTEXT :
                maskedUsername ? language.ONBOARDING__ENTER_NEW_PASSWORD_SUBTEXT : language.ONBOARDING__ACCOUNT_SUBTEXT}
            </Text>
            {maskedUsername ? <Text style={styles.forgotPassWordUserName}>{maskedUsername}</Text> : null}
          </View>
          <View style={styles.loginFieldsContainer}>
            {maskedUsername ? null : <Field
              name={fields.USERNAME}
              iconName='username-input'
              component={SinarmasIconInput}
              label={language.ONBOARDING__ENTER_USERNAME}
              placeholder={language.HINTTEXT__USERNAME}
              theme='primary'
              maxLength={20}
              disabled={isForgetPassword}
              isUseSuccessInputText={true}
              typeField={'username'}
              setNewUsernameValue={setNewUsernameValue}
              validationInput={validationInput}
            />
            }
            <View>
              <Field
                name={fields.PASSWORD}
                iconName='password-input'
                component={SinarmasIconInput}
                label={language.ONBOARDING__ENTER_PASSWORD}
                placeholder={language.HINTTEXT__PASSWORD}
                theme='primary'
                secureTextEntry={isSecureTextEntryNewPassword}
                isUseSuccessInputText={true}
                typeField={'password'}
                usernameValue={isForgetPassword ? maskedUsername : usernameValue}
                setNewPasswordValue={setNewPasswordValue}
                validationInput={validationInput}
              />
              <Touchable onPress={showOrHideNewPassword}style={styles.eyeIconStyle}><Image source={isSecureTextEntryNewPassword ? showPasswordIcon : hidePasswordIcon}/></Touchable>
            </View>
            {isForgotEasypin ?
              <View style={styles.forgotPasswordContainer}>
                <Touchable onPress={forgotPassword}>
                  <Text style={styles.loginProblemText}>{language.LOGIN__LOGIN_PROBLEM}
                    <Text style={styles.resetPasswordText}>{language.LOGIN__RESET_PASSWORD}</Text>
                  </Text>
                </Touchable>
              </View>
              :
              <View>
                <Text style={styles.iconInputTips}>{language.ONBOARDING__ACCOUNT_PASSWORD_SUBTEXT}</Text>
                <View>
                  <Field
                    name={fields.CONFIRM_PASSWORD}
                    iconName='password-input'
                    component={SinarmasIconInput}
                    label={language.ONBOARDING__ENTER_PASSWORD_CONFIRM}
                    placeholder={language.HINTTEXT__PASSWORD}
                    theme='primary'
                    secureTextEntry={isSecureTextEntryConfirmNewPassword}
                    isUseSuccessInputText={true}
                    typeField={'confirmPassword'}
                    usernameValue={isForgetPassword ? maskedUsername : usernameValue}
                    passwordValue={passwordValue}
                    validationInput={validationInput}
                  />
                  <Touchable onPress={showOrHideConfirmNewPassword} style={styles.eyeIconStyle}><Image source={isSecureTextEntryConfirmNewPassword ? showPasswordIcon : hidePasswordIcon}/></Touchable>
                </View>
              </View>
            }
          </View>

          {maskedUsername ? null : isForgotEasypin ? 
            null
            :
            <View style={styles.tipsBox}>
              <View>
                <View style={styles.tipsBoxText}>
                  <Text style={styles.tipsTxt}>{language.IB_ACCESS_REGISTER_ONE}</Text>
                  <Text style={styles.tipsTxt}>{language.IB_ACCESS_REGISTER_TWO}</Text>
                </View>
                <View style={styles.greyLine} />
                <View style={styles.tipsBoxText}>
                  <View style={[styles.menu, styles.rowCenter]}>
                    <Text style={styles.titleTxt}>{language.IB_ACCESS_TITLE}</Text>
                  </View>
                  <View style={styles.rowCenter}>
                    <View>
                      <Text style={styles.promptTxt}>{toggleIB === 'NO' ? language.IB_ACCESS_PROMPT_INACTIVE : language.IB_ACCESS_PROMPT_ACTIVE}</Text>
                    </View>
                    <View style={styles.rowCenter}>
                      <View style={styles.switchRight}>
                        <Field
                          name='isAllowedIB'
                          component={Switch}
                          onChangeHandler={this.handleIBtoggle}
                          defaultValue={toggleIB === 'NO' ? !tog : tog}
                          value={toggleIB}
                          fontSize={12}
                          colorBrand={false}
                          switchWidth={62}
                          switchHeight={28}
                          buttonWidth={20}
                          buttonHeight={20}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          }

          <View style={styles.errorContainer}>
            {error && anyTouched && <FormError iconName='input-error' text={error}/>}
          </View>
        </View>
        <View>
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting} >
            <Text style={styles.buttonLargeTextStyle}>{language.GENERIC__CONTINUE}</Text>
          </SinarmasButton>
          <View style={styles.bottomContainer}>
            <TermConditionLink showTerms={false}/>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  forgotPassword: PropTypes.func,
  action: PropTypes.string,
  maskedUsername: PropTypes.string,
  showOrHideNewPassword: PropTypes.func,
  isSecureTextEntryNewPassword: PropTypes.bool,
  showOrHideConfirmNewPassword: PropTypes.func,
  isSecureTextEntryConfirmNewPassword: PropTypes.bool,
  validationInput: PropTypes.func,
  setNewUsernameValue: PropTypes.func,
  setNewPasswordValue: PropTypes.func,
  usernameValue: PropTypes.string,
  passwordValue: PropTypes.string,
  isMigrate: PropTypes.bool,
  toggleIB: PropTypes.string,
  enableIB: PropTypes.string,
};

export default RegisterForm;
