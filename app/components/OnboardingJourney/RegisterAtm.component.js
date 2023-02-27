import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasIconInput, SinarmasInputBoxNew, SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './Onboarding.component.styles';
import noop from 'lodash/noop';
import {wrapMethodInFunction, formatFieldAccount} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import Image from 'react-native-image-progress';
import {Pie} from 'react-native-progress';

export const fields = {
  PANNUMBER: 'panNumber',
  CAPTCHAINPUT: 'captchaInput'
};

export default class RegisterFormAtm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    scanCard: PropTypes.func,
    isForgetPassword: PropTypes.bool,
    goToRegisterNTB: PropTypes.func,
    createProduct: PropTypes.func,
    fillForm: PropTypes.func
  };

  render () {
    const {scanCard, isForgetPassword, fillForm, ...reduxFormProps} = this.props;
    const {invalid, submitting, simasCaptcha, refreshCaptcha, handleSubmit = noop} = reduxFormProps;
    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBgAtm}>
          <KeyboardAwareScrollView contentContainerStyle={styles.newBodyContainerLogin}>
            <View>
              <View style={styles.padding40}>
                <View style={styles.registerATMTitle}>
                  <Text style={styles.welcomeText}>
                    {isForgetPassword ? language.ONBOARDING__FORGOT_PASSWORD_SUBTEXT : language.ONBOARDING__WELCOME_SUBTEXT}
                  </Text>
                </View>
              </View>
              <View style={styles.fieldContainer}>
                <Field
                  format={formatFieldAccount} 
                  normalize={formatFieldAccount}
                  name={fields.PANNUMBER}
                  component={SinarmasInputBoxNew}
                  keyboardType='numeric'
                  label={language.ONBOARDING__ENTER_ATM_CARDNUMBER} theme='primary' maxLength={16}
                  placeholder={language.HINTTEXT__ATM_CARD_NUMBER}/>
                <Touchable onPress={scanCard} style={styles.newCameraIcon}><SimasIcon name='camera' size={20}/></Touchable>

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

              <View style={styles.cardTextContainer}>
                <Touchable onPress={fillForm}>
                  <Text style={styles.cardText}>{language.I_DONT_HAVE_CARD}</Text>
                </Touchable>
              </View>
            </View>
            <View style={styles.buttonAtmCont}>
              <SinarmasButton style={styles.buttonRegister} onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting}>
                <Text style={styles.buttonMainLogin}>{language.GENERIC__CONTINUE}</Text>
              </SinarmasButton>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}
