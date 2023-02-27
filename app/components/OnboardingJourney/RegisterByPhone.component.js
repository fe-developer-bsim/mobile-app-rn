import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasIconInput, SinarmasInputBoxNew, SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './Onboarding.component.styles';
import noop from 'lodash/noop';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import Touchable from '../Touchable.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import Image from 'react-native-image-progress';
import {Pie} from 'react-native-progress';

export const fields = {
  PHONE: 'phone',
  CAPTCHAINPUT: 'captchaInput'
};

export default class RegisterFormAtm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    scanCard: PropTypes.func,
    isForgetPassword: PropTypes.bool,
    goToRegisterNTB: PropTypes.func,
    validationInput: PropTypes.func
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
      <View style={styles.pinkBg}>
        <View style={styles.whiteBgAtm}>
          <KeyboardAwareScrollView contentContainerStyle={styles.newBodyContainerLogin}>
            <View>
              <View style={styles.padding40}>
                <View style={styles.registerATMTitle}>
                  <Text style={styles.welcomeText}>
                    {language.ONBOARDING__FORGOT_PASSWORD_MESSAGE}
                  </Text>
                  <Text style={styles.welcomeSubTitle}>
                    {language.ONBOARDING__FORGOT_PASSWORD_SUBTEXT}
                  </Text>
                </View>
              </View>
              <View style={styles.fieldContainer}>
                <Field
                  name={fields.PHONE}
                  iconName='call'
                  component={SinarmasInputBoxNew}
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
              <SinarmasButton style={styles.buttonRegister} onPress={this.onModalSubmit} disabled={invalid || submitting || this.state.valueSubmit}>
                <Text style={styles.buttonMainLogin}>{language.GENERIC__CONTINUE}</Text>
              </SinarmasButton>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}
