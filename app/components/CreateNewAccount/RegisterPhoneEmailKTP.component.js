import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasIconInput, SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './RegisterPhoneEmail.styles';
import {noop, result, isEmpty} from 'lodash';
import {wrapMethodInFunction, normalizeNumber} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Image from 'react-native-image-progress';
import {Pie} from 'react-native-progress';

export const fields = {
  formName: 'IdentifyUserForm',
  PHONE: 'phone',
  EMAIL: 'email',
  CAPTCHAINPUT: 'captchaInput',
  REFERRAL_CODE: 'referralCode',
  KTP_NUMBER: 'ktpId'
};

export default class RegisterFormPhoneEmail extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    scanCard: PropTypes.func,
    isForgetPassword: PropTypes.bool,
    goToRegisterNTB: PropTypes.func,
    validationInput: PropTypes.func,
    ccFormCode: PropTypes.string,
    referralCodeOrami: PropTypes.string
  };

  state = {
    valueSubmit: false,
  }

  onModalSubmit = () => {
    this.setState({valueSubmit: true}, () => {
      const {handleSubmit = noop} = this.props;
      wrapMethodInFunction(handleSubmit());
      setTimeout(() => {
        this.setState({valueSubmit: false});
      }, 7000);
    });
  };

  render () {
    const {validationInput, ccFormCode, referralCodeOrami, ...reduxFormProps} = this.props;
    const {invalid, submitting, simasCaptcha, refreshCaptcha} = reduxFormProps;

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.container}>
          <View>
            {ccFormCode === 'CCO-SIMOBI-002' ?
              <View>
                <Text style={styles.registerAtmWelcomeMessage}>
                  {language.ONBOARDING__ORAMI_SUBTEXT}
                </Text>
              </View>
              :
              <Text style={styles.registerAtmWelcomeMessage}>
                {language.ONBOARDING__FORGOT_PASSWORD_SUBTEXT}
              </Text>
            }
            <View style={styles.loginFieldsContainer}>
              <Field
                name={fields.KTP_NUMBER}
                component={SinarmasIconInput}
                theme='primary'
                style={styles.fieldContainer}
                label={language.CREDITCARD__KTP_NUMBER}
                placeholder={language.HINT__KTP_NUMBER}
                keyboardType='numeric'
                maxLength={16}
                typeField={'ktpId'}
                normalize={normalizeNumber}
              />
              <Field
                name={fields.PHONE}
                component={SinarmasIconInput}
                theme='primary'
                maxLength={15}
                keyboardType='numeric'
                style={styles.fieldContainer}
                label={language.IDENTITYSECONDFORM__PHONE_TITLE}
                placeholder={language.HINTTEXT__PHONE_NUMBER}
                isUseSuccessInputText={true}
                typeField={'phone'}
                validationInput={validationInput}
              />
            </View>
            <View style={styles.loginFieldsContainer}>
              <Field
                name={fields.EMAIL}
                component={SinarmasIconInput}
                theme='primary'
                style={styles.fieldContainer}
                label={language.OPEN_NEW_ACCOUNT__EMAIL}
                placeholder={language.OPEN_NEW_ACCOUNT__EMAIL}
                isUseSuccessInputText={true}
                typeField={'email'}
                validationInput={validationInput}
              />
              <View style={styles.cameraIconStyle}><SimasIcon name='envelope' size={20}/></View>
            </View>
            {referralCodeOrami !== '' ?
              null :
              <View style={styles.loginFieldsContainer}>
                <Field
                  name={fields.REFERRAL_CODE}
                  component={SinarmasIconInput}
                  theme='primary'
                  maxLength={20}
                  style={styles.fieldContainer}
                  label={language.CREATE_ACCOUNT__REFERRAL_CODE}
                  placeholder={language.CREATE_ACCOUNT__REFERRAL_CODE}
                  isUseSuccessInputText={true}
                  typeField={'referralCode'}
                  validationInput={validationInput}
                />
              </View>
            }
          </View>

          <View style={styles.paddingAddition}>
            <View style={styles.captchaBorder}>
              <View style={styles.captchaPadding}>
                {!isEmpty(simasCaptcha) &&
                <View style={styles.captchaContainer}>
                  <Image
                    source={{uri: result(simasCaptcha, 'captchaImgOpenProduct', '')}}
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

        <View style={styles.buttonWrapper}>
          <SinarmasButton onPress={this.onModalSubmit} disabled={invalid || submitting || this.state.valueSubmit}>
            <Text style={styles.buttonMainLogin}>{language.GENERIC__CONTINUE}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
