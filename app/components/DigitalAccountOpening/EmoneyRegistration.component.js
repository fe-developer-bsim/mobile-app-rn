import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasIconInput, SinarmasButton, SinarmasInputBoxNew} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './DigitalEForm.styles';
import {noop, result, isEmpty} from 'lodash';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import Touchable from '../Touchable.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Image from 'react-native-image-progress';
import {Pie} from 'react-native-progress';
import {formatFieldNoSpecialChar, normalizeNumber} from '../../utils/transformer.util';

export const fields = {
  NAME: 'name',
  PHONE: 'phone',
  CAPTCHAINPUT: 'captchaInput',
  REFERRAL_CODE: 'referralCode'
};

export default class EmoneyRegistration extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    validationInput: PropTypes.func
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
    const {validationInput, ...reduxFormProps} = this.props;
    const {invalid, submitting, simasCaptcha, refreshCaptcha} = reduxFormProps;

    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBg}>
          <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithNoTerms} enableOnAndroid={true} showsVerticalScrollIndicator={false}>
            <View style={styles.spaceContainer}>
              <Text style={styles.mainTitleText}>{language.ONBOARDING__VERIFY_ACCOUNT}</Text>
              <View>
                <Field
                  name={fields.NAME}
                  component={SinarmasInputBoxNew}
                  theme='primary'
                  style={styles.fieldContainer}
                  label={language.ONBOARDING_NAME}
                  placeholder={language.ONBOARDING_NAME}
                  isUseSuccessInputText={true}
                  typeField={'name'}
                  validationInput={validationInput}
                  normalize={formatFieldNoSpecialChar}
                />

                <Field
                  name={fields.PHONE}
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
                  normalizeNumber={normalizeNumber}
                />
   
                <View style={styles.paddingAddition}>
                  <View style={styles.captchaBorder}>
                    <View style={styles.captchaPadding}>
                      {!isEmpty(simasCaptcha) &&
                      <View style={styles.captchaContainer}>
                        <Image
                          source={{uri: result(simasCaptcha, 'captchaImgOpenProduct', '')}}
                          indicator={Pie}
                          indicatorProps={styles.captchaLoader}
                          style={styles.captchaIcon}
                        />
                      </View>
                      }
                      <View style={styles.captchaFieldContainer}>
                        <Field
                          name={fields.CAPTCHAINPUT}
                          component={SinarmasIconInput}
                          label={language.LABEL__CAPTCHA}
                          placeholder={language.ONBOARDING__TYPE_CHARACTERS} 
                          theme='primary' 
                          maxLength={5}
                        />
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

            <SinarmasButton onPress={this.onModalSubmit} disabled={invalid || submitting || this.state.valueSubmit}>
              <Text style={styles.buttonLargeTextStyle}>{language.GENERIC__CONTINUE}</Text>
            </SinarmasButton>
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}
