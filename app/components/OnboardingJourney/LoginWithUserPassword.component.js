import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Alert, Image, ScrollView} from 'react-native';
import {SinarmasButton, SinarmasInputBoxNew} from '../FormComponents';
import Touchable from '../Touchable.component';
import {Field} from 'redux-form';
import FormError from '../FormError/FormError.component';
import {language} from '../../config/language';
import noop from 'lodash/noop';
import env, {setEnv} from '../../config/env.config';
import styles from './Onboarding.component.styles';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import receipt from '../../assets/images/atm-receipt.jpg';
import showPasswordIcon from '../../assets/images/blackEyeIcon.png';
import hidePasswordIcon from '../../assets/images/blackEyeSlashIcon.png';

import simobi from '../../assets/images/simobiplus.png';

export const fields = {
  USERNAME: 'username',
  PASSWORD: 'password'
};

class LoginForm extends Component {
  easterEgg = () => {
    if (env.ENV === 'dev') { // UAT/Prod do not need MockAPI
      const {MOCKAPI} = setEnv('MOCKAPI', !env.MOCKAPI);
      Alert.alert('MOCK API ', String(MOCKAPI));
    }
  }
  
  render () {
    const {forgotPassword, regisATM, showOrHidePassword, isSecureTextEntry = true, goToRegisterProduct, loginLanding, ...reduxFormProps} = this.props;
    const {isUserRegistered, isLockedDevice, invalid, error, submitting, handleSubmit = noop} = reduxFormProps;
    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBg}>
          <ScrollView contentContainerStyle={styles.newBodyContainerLogin}>
            <View style={styles.spaceContainer}>
              <View>
                <View style={styles.padding40}>
                  {regisATM ?
                    <View style={styles.registerAtmTitle}>
                      <View>
                        <Text style={styles.registerAtmTitleText}>
                          {language.ONBOARDING__LOCATE_ACT_CODE}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.registerAtmTitleTextBottom}>
                          {language.ONBOARDING__FROM_ATM_RECEIPT}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.registerAtmSubMessage}>
                          {language.ONBOARDING__HAVE_RECEIPT}
                        </Text>
                      </View>
                      <View style={styles.receiptContainer}>
                        <Image source={receipt} style={styles.receiptImage}/>
                      </View>
                    </View>
                    :
                    <View>
                      <Image source={simobi} style={styles.logo}/>
                      <View style={styles.welcomeTextContainer}>
                        <Text style={styles.welcomeText}>
                          {language.LOGIN__WELCOME_MESSAGE} {language.LOGIN__WELCOME_SUBTEXT}
                        </Text>
                      </View>
                    </View>
                  }
                </View>
                <View style={styles.fieldContainer}>
                  <Field
                    name={fields.USERNAME}
                    iconName='username-input'
                    component={SinarmasInputBoxNew}
                    label={regisATM ? language.LOGIN_ENTER_REGISTRATION_CODE : language.LOGIN__ENTER_USERNAME}
                    placeholder={regisATM ? language.HINTTEXT__ACT_CODE : language.HINTTEXT__MOBILE_NUMBER_OR_USERNAME}
                    disabled={loginLanding === 'Login' || loginLanding === 'LoginLanding' ? true : isUserRegistered || isLockedDevice}
                  />
                  {regisATM ?
                    <Field
                      name={fields.PASSWORD}
                      component={SinarmasInputBoxNew}
                      label={language.LOGIN_ENTER_IBANKING_PIN}
                      placeholder={language.HINTTEXT__IBANK_PIN_NUMBER}
                      secureTextEntry={true}
                      maxLength={6}
                    />
                    :
                    <View>
                      <Field
                        name={fields.PASSWORD}
                        component={SinarmasInputBoxNew}
                        label={language.LOGIN__ENTER_PASSWORD}
                        placeholder={language.HINTTEXT__PASSWORD}
                        secureTextEntry={isSecureTextEntry}
                        maxLength={20}
                      />
                      <Touchable onPress={showOrHidePassword} style={styles.newEyeIcon}><Image source={isSecureTextEntry ? showPasswordIcon : hidePasswordIcon}/></Touchable>
                    </View>
                  }
                </View>
                {!regisATM &&
                <View style={styles.forgotPasswordContainer}>
                  <Touchable onPress={forgotPassword}>
                    <Text style={styles.loginProblemText}>{language.LOGIN__LOGIN_PROBLEM}
                      <Text style={styles.resetPasswordText}>{language.LOGIN__RESET_PASSWORD}</Text>
                    </Text>
                  </Touchable>
                </View>
                }
                <View style={styles.errorContainer}>
                  {error && <FormError iconName='input-error' text={error}/>}
                </View>
              </View>

              <View style={styles.bottomSpace}>
                {regisATM ?
                  <View style={styles.buttonLoginSubmit}>
                    <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={(invalid && !error) || submitting}>
                      <Text style={styles.buttonMainLogin}>{language.GENERIC__CONTINUE}</Text>
                    </SinarmasButton>
                  </View> : isLockedDevice ?
                    <View style={styles.buttonLoginSubmit}>
                      <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={(invalid && !error) || submitting}>
                        <Text style={styles.buttonMainLogin}>{language.GENERIC__CONTINUE}</Text>
                      </SinarmasButton>
                    </View>
                    :
                    <View>
                      <View style={styles.buttonLoginSubmit}>
                        <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} style={styles.buttonRegister}>
                          <Text style={styles.buttonMainLogin}>{language.LOGIN__LOGIN_BUTTON}</Text>
                        </SinarmasButton>
                      </View>
                    </View>
                }
                <Touchable onPress={goToRegisterProduct} style={styles.buttonMg}>	
                  <Text style={styles.loginProblemText}>{language.LOGIN__DONT_HAVE_ACCOUNT}	
                    <Text style={styles.resetPasswordText}> {language.LOGIN__REGISTER_HERE}</Text>	
                  </Text>
                </Touchable>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  goToTermCondition: PropTypes.func,
  goRegister: PropTypes.func,
  forgotPassword: PropTypes.func,
  regisATM: PropTypes.bool,
  isUserRegistered: PropTypes.bool,
  showOrHidePassword: PropTypes.func,
  isSecureTextEntry: PropTypes.bool,
  isLockedDevice: PropTypes.bool,
  goToRegisterProduct: PropTypes.func,
  loginLanding: PropTypes.string,
};

export default LoginForm;
