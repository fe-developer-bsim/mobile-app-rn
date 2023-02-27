import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasIconInput, SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './RegisterEmoney.styles';
import noop from 'lodash/noop';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import Image from 'react-native-image-progress';
import {Pie} from 'react-native-progress';

export const fields = {
  FULL_NAME: 'fullName',
  PHONE: 'phone',
  E_MAIL: 'email',
  REFERRAL: 'referral',
  CAPTCHAINPUT: 'captchaInput'
};

export default class RegisterFormAtm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    isForgetPassword: PropTypes.bool,
    goToRegisterNTB: PropTypes.func,
    validationInput: PropTypes.func,
    goToAtmRegis: PropTypes.func,
  };
  state = {
    valueSubmit: false,
  }

  onModalSubmit = () => {
    this.setState({valueSubmit: true}, () => {
      // set time out because of this bug
      // https://github.com/facebook/react-native/issues/10471
      const {handleSubmit = noop} = this.props;
      wrapMethodInFunction(handleSubmit());
      setTimeout(() => {
        this.setState({valueSubmit: false});
      }, 7000);
    });
  };

  render () {
    const {validationInput, ...reduxFormProps} = this.props;
    const {invalid, submitting, simasCaptcha, refreshCaptcha} = reduxFormProps;
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithTerms} extraHeight={120}>
        <View style={styles.progressBar}>
          <View style={[{flex: 2}, styles.redBar]}/>
          <View style={[{flex: 8}, styles.greyBar]}/>
        </View>
        <View style={styles.upperContainer}>
          <View>
            <Text style={styles.emoneyTitle}>{language.EMONEY__HEADER}</Text>
          </View>
          <View>
            <View style={styles.loginFieldsContainer}>
              <Field
                name={fields.FULL_NAME}
                component={SinarmasIconInput}
                theme='primary'
                style={styles.fieldContainer}
                label={language.EMONEY__FULLNAME_FIELD}
                placeholder={language.HINTTEXT__NAME}
                isUseSuccessInputText={true}
                typeField={'fullName'}
                validationInput={validationInput}
              />
              <View style={styles.cameraIconStyle}><SimasIcon name='username-input' size={20}/></View>
            </View>

            <View style={styles.loginFieldsContainer}>
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
                typeField={'phoneNumber'}
                validationInput={validationInput}
              />
              <View style={styles.cameraIconStyle}><SimasIcon name='call' size={20}/></View>
            </View>

            <View style={styles.loginFieldsContainer}>
              <Field
                name={fields.E_MAIL}
                component={SinarmasIconInput}
                theme='primary'
                style={styles.fieldContainer}
                label={language.IDENTITYSECONDFORM__EMAIL_TITLE}
                placeholder={language.HINTTEXT__EMAIL}
                isUseSuccessInputText={true}
                typeField={'email'}
                validationInput={validationInput}
              />
              <View style={styles.cameraIconStyle}><SimasIcon name='envelope' size={20}/></View>
            </View>

            <View style={styles.loginFieldsContainer}>
              <Field
                name={fields.REFERRAL}
                component={SinarmasIconInput}
                theme='primary'
                style={styles.fieldContainer}
                label={language.IDENTITYSECONDFORM__REFERRAL_TITLE}
                placeholder={language.HINTTEXT__REFERRAL}
                isUseSuccessInputText={true}
                typeField={'referral'}
                validationInput={validationInput}
              />
              <View style={styles.cameraIconStyle}><SimasIcon name='envelope' size={20}/></View>
            </View>
          </View>

          <View style={styles.captchaBorderAround}>
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
        <View>
          <View style={styles.buttonOtpSubmit}>
            <SinarmasButton style={styles.buttonRegister} onPress={this.onModalSubmit} disabled={invalid || submitting || this.state.valueSubmit}>
              <Text style={styles.buttonMainLogin}>{language.GENERIC__CONTINUE}</Text>
            </SinarmasButton>
          </View>
        </View>

      </KeyboardAwareScrollView>
    );
  }
}
