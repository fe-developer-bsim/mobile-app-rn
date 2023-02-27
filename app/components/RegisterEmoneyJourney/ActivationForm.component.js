import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import {SinarmasButton, SinarmasInputBoxNew} from '../FormComponents';
import Touchable from '../Touchable.component';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './ActivationForm.styles';
import noop from 'lodash/noop';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import showPasswordIcon from '../../assets/images/blackEyeIcon.png';
import hidePasswordIcon from '../../assets/images/blackEyeSlashIcon.png';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import FormError from '../FormError/FormError.component';
import SimobiPlus from '../../assets/images/simobiplus.png';
import SimasIcon from '../../assets/fonts/SimasIcon';

export const fields = {
  USER: 'user',
  PASSWORD: 'password',
  CONFPASS: 'confpass',
}; 


class ActivationForm extends Component {
  state = {
    valueSubmit: false
  }

  onModalSubmit = () => {
    this.setState({valueSubmit: true}, () => {
      const {handleSubmit = noop} = this.props;
      wrapMethodInFunction(handleSubmit());
      setTimeout(() => {
        this.setState({valueSubmit: false});
      }, 7000);
    });
  }

  render () {
    const {showOrHidePassword, showOrHidePasswordConf, isSecureTextEntry, typeActivation, isSecureTextEntry2, validationInput, ...reduxFormProps} = this.props;
    const {invalid, submitting, error, anyTouched} = reduxFormProps;
    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBg}>
          <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithNoTerms}>
            <View>
              <View style={styles.imageContain}>
                <Image source={SimobiPlus} style={styles.simobiPng}/>
              </View>
              <View style={styles.mainTitle}>
                {typeActivation === '003' ?
                  <Text style={styles.mainTitleText}>{language.ONBOARDING__ENTER_NEW_PASSWORD_TITLE}</Text> :
                  <Text style={styles.mainTitleText}>{language.ACTIVATION_FORM_TITLE}</Text>
                }
              </View>

              <View style={styles.FieldsContainerWrapper}>
                {typeActivation === '003' ? 
                  null :
                  <View>
                    <Field
                      name={fields.USER}
                      component={SinarmasInputBoxNew}
                      iconName='username-input'
                      theme='primary'
                      style={styles.fieldContainer}
                      label={language.ACTIVATION_FORM_USERNAME}
                      placeholder={language.ACTIVATION_FORM_USERNAME_PLACEHOLDER}
                      isUseSuccessInputText={true}
                      typeField={'user'}
                      validationInput={validationInput}
                    />
                  </View>
                }
                
                <View>
                  <Field
                    name={fields.PASSWORD}
                    component={SinarmasInputBoxNew}
                    theme='primary'
                    style={styles.fieldContainer}
                    label={language.ACTIVATION_FORM_PASSWORD}
                    placeholder={language.ACTIVATION_FORM_PASSWORD_PLACEHOLDER}
                    isUseSuccessInputText={true}
                    typeField={'password'}
                    validationInput={validationInput}
                    secureTextEntry={isSecureTextEntry}
                  />
                  <Touchable onPress={showOrHidePassword} style={styles.eyeIconStyle}><Image source={isSecureTextEntry ? showPasswordIcon : hidePasswordIcon}/></Touchable>
                </View>
                <View>
                  <Field
                    name={fields.CONFPASS}
                    component={SinarmasInputBoxNew}
                    theme='primary'
                    style={styles.fieldContainer}
                    label={language.ACTIVATION_FORM_CONFPASS}
                    placeholder={language.ACTIVATION_FORM_CONFPASS_PLACEHOLDER}
                    isUseSuccessInputText={true}
                    typeField={'confpass'}
                    validationInput={validationInput}
                    secureTextEntry={isSecureTextEntry2}
                  />
                  <Touchable onPress={showOrHidePasswordConf} style={styles.eyeIconStyle}><Image source={isSecureTextEntry2 ? showPasswordIcon : hidePasswordIcon}/></Touchable>
                </View>
              </View>
              <View style={styles.errorContainer}>
                {error && anyTouched && <FormError iconName='input-error' text={error} />}
              </View>
              {typeActivation === '001' ?
                <View style={styles.additionalInfoContainer}>
                  <Text style={styles.additionalInfo}>
                    {language.ACTIVATION_FORM_ADDITIONAL_INFO}
                  </Text>
                </View> 
                : null}
            </View>

            <View style={styles.buttonContainer}>
              {typeActivation === '003' ?
                <View style={styles.boxedInfo}>
                  <SimasIcon style={styles.iconColor} name='caution-circle' size={20}/>
                  <View>
                    <Text style={styles.info}>{language.ACTIVATION__FORM_NOTICE}</Text>
                  </View>
                </View>
                : null}
              <SinarmasButton onPress={this.onModalSubmit} disabled={invalid || submitting || this.state.valueSubmit} >
                <Text style={styles.buttonLargeTextStyle}>{language.GENERIC__CONTINUE}</Text>
              </SinarmasButton>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }

}

ActivationForm.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  validationInput: PropTypes.func,
  showOrHidePassword: PropTypes.func,
  showOrHidePasswordConf: PropTypes.func,
  isSecureTextEntry: PropTypes.bool,
  isSecureTextEntry2: PropTypes.bool,
  typeActivation: PropTypes.string
};

export default ActivationForm;
