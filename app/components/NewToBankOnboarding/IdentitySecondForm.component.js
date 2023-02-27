import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasIconInput, SinarmasButtonOnboarding} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './IdentitySecondForm.styles';
import noop from 'lodash/noop';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import Touchable from '../Touchable.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import Image from 'react-native-image-progress';
import {Pie} from 'react-native-progress';

export const fields = {
  CAPTCHAINPUT: 'captchaInput'
};

export default class RegisterFormAtm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    scanCard: PropTypes.func,
    isForgetPassword: PropTypes.bool,
    goToRegisterNTB: PropTypes.func,
  };

  render () {
    const {...reduxFormProps} = this.props;
    const {invalid, submitting, simasCaptcha, refreshCaptcha, handleSubmit = noop} = reduxFormProps;
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithTerms} extraHeight={120}>
        <View>
          <View style={styles.paddingCaptcha}>
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
                    placeholder={language.ONBOARDING__TYPE_CHARACTERS} theme='primary' maxLength={8}/>
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
            <SinarmasButtonOnboarding onPress={wrapMethodInFunction(handleSubmit)} style={styles.buttonLoginSpace} disabled={invalid || submitting} >
              <Text style={styles.buttonMainLoginUser}>{language.GENERIC__CONTINUE}</Text>
            </SinarmasButtonOnboarding>
          </View>
        </View>

      </KeyboardAwareScrollView>
    );
  }
}
