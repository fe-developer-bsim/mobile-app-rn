import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasIconInput, SinarmasInputBoxNew, SinarmasButton, DatePickerNew} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './Onboarding.component.styles';
import {normalizeNumber} from '../../utils/transformer.util';
import Touchable from '../Touchable.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import Image from 'react-native-image-progress';
import {Pie} from 'react-native-progress';

export const fields = {
  ACCOUNT_NUMBER: 'accNumber',
  PHONE_NUMBER: 'phoneNumber',
  EMAIL_ADDRESS: 'emailAddress',
  KTP_NUMBER: 'ktpNumber',
  BIRTH_DATE: 'birthDate',
  CAPTCHAINPUT: 'captchaInput'
};

export default class RegisterFormAtm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    scanCard: PropTypes.func,
    isForgetPassword: PropTypes.bool,
    goToRegisterNTB: PropTypes.func,
    validationInput: PropTypes.func,
    fillForm: PropTypes.func
  };

  render () {
    const {validationInput, handleSubmit, ...reduxFormProps} = this.props;
    const {invalid, submitting, simasCaptcha, refreshCaptcha} = reduxFormProps;
    const maxDate = new Date();

    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBgAtm}>
          <KeyboardAwareScrollView contentContainerStyle={styles.newBodyContainerLogin} keyboardShouldPersistTaps='handled' extraScrollHeight={100} enableOnAndroid={true}>
            <View>
              <View style={styles.padding40}>
                <View style={styles.registerATMTitle}>
                  <Text style={styles.welcomeText}>
                    {language.TELL__ABOUT_ACCOUNT}
                  </Text>
                </View>
              </View>
              <View style={styles.fieldContainer}>
                <Field
                  name={fields.ACCOUNT_NUMBER}
                  component={SinarmasInputBoxNew}
                  theme='primary'
                  maxLength={15}
                  keyboardType='numeric'
                  style={styles.fieldContainer}
                  label={language.DASHBOARD__ACCOUNT_NUMBER}
                  isUseSuccessInputText={true}
                  typeField={'accNumber'}
                  validationInput={validationInput}
                  normalize={normalizeNumber}
                />

                <Field
                  name={fields.PHONE_NUMBER}
                  component={SinarmasInputBoxNew}
                  theme='primary'
                  maxLength={15}
                  keyboardType='numeric'
                  style={styles.fieldContainer}
                  label={language.IDENTITYSECONDFORM__PHONE_TITLE}
                  placeholder={language.HINTTEXT__PHONE_NUMBER}
                  isUseSuccessInputText={true}
                  typeField={'phoneNumber'}
                  validationInput={validationInput}
                />

                <Field
                  name={fields.EMAIL_ADDRESS}
                  component={SinarmasInputBoxNew}
                  theme='primary'
                  maxLength={40}
                  style={styles.fieldContainer}
                  label={language.COMMON__EMAIL}
                  isUseSuccessInputText={true}
                  typeField={'emailAddress'}
                  validationInput={validationInput}
                />

                <Field
                  name={fields.KTP_NUMBER}
                  component={SinarmasInputBoxNew}
                  theme='primary'
                  maxLength={16}
                  keyboardType='numeric'
                  style={styles.fieldContainer}
                  label={language.CREDITCARD__KTP_NUMBER}
                  isUseSuccessInputText={true}
                  typeField={'ktpNumber'}
                  validationInput={validationInput}
                  normalize={normalizeNumber}
                />

                <Field
                  name={fields.BIRTH_DATE}
                  component={DatePickerNew}
                  label={language.CREDITCARD__BIRTH_DATE}
                  maximumDate={maxDate}
                  minimumDate={'01/01/1900'}
                  date={maxDate}              
                />

                <View>
                  <View style={styles.captchaBorder}>
                    <View style={styles.captchaPadding}>
                      {!isEmpty(simasCaptcha) &&
                      <View style={styles.captchaContainer}>
                        <Image
                          source={{uri: result(simasCaptcha, 'captchaImg', '')}}
                          indicator={Pie}
                          indicatorProps={styles.captchaLoader}
                          style={styles.captchaIcon}/>
                      </View>
                      }
                      <View style={styles.captchaFieldContainer}>
                        <Field
                          name={fields.CAPTCHAINPUT}
                          component={SinarmasIconInput}
                          label={language.LABEL__CAPTCHA}
                          placeholder={language.ONBOARDING__TYPE_CHARACTERS} theme='primary' maxLength={5}/>
                        <View style={styles.refreshCaptchaContainer}>
                          <Text style={styles.greySmallText}>{language.ONBOARDING__CANT_SEE}</Text>
                          <Touchable onPress={refreshCaptcha} ><Text style={styles.refreshCaptcha}>{language.ONBOARDING__REFRESH_CAPTCHA}</Text></Touchable>
                        </View>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.captchaInfo}>{language.ONBOARDING__CAPTCHA_INFO}</Text>
                </View>
              </View>
            </View>
            <View style={styles.buttonAtmCont}>
              <SinarmasButton style={styles.buttonRegister} onPress={handleSubmit} disabled={invalid || submitting}>
                <Text style={styles.buttonMainLogin}>{language.GENERIC__CONTINUE}</Text>
              </SinarmasButton>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}
