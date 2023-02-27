import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import Touchable from '../Touchable.component';
import SinarmasInput from '../FormComponents/SinarmasInput/SinarmasInput.component';
import {SinarmasButton} from '../FormComponents';
import FormError from '../FormError/FormError.component';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './PasswordValidate.styles';
import noop from 'lodash/noop';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import showPasswordIcon from '../../assets/images/blackEyeIcon.png';
import hidePasswordIcon from '../../assets/images/blackEyeSlashIcon.png';
import PropTypes from 'prop-types';
import SimobiPlus from '../../assets/images/simobiplus.png';


class PasswordValidate extends Component {
  static propTypes={
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    error: PropTypes.string,
    buttonText: PropTypes.string,
    showOrHidePassword: PropTypes.func,
    isSecureTextEntry: PropTypes.bool,
    nextRouteName: PropTypes.string, 
    forgotPassword: PropTypes.func,
  }

  render () {
    const {error, handleSubmit = noop, submitting, invalid, buttonText, showOrHidePassword, isSecureTextEntry, nextRouteName = true, forgotPassword} = this.props;
    const headerLabel = nextRouteName === 'Dashboard' ? 'Verify Password' : language.PROFILE__PASSWORD_TITLE;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'  contentContainerStyle={styles.bodyContainer} extraHeight={120}>
        <View style={styles.columnContainer}>
          {headerLabel === 'Verify Password' ?
            <View>
              <Image source={SimobiPlus} style={styles.mainTitleLogo}/>
              <Text style={styles.verifikasiPasswordText}>{language.VERIFIKASI_PASSWORD}</Text>
              <Text style={styles.verifikasiPasswordSubText}>{language.VERIFIKASI_PASSWORD1}</Text>
              <Text style={styles.verifikasiPasswordSubText}>{language.VERIFIKASI_PASSWORD2}</Text>
              <Text style={styles.verifikasiPasswordAlertText}>{language.VERIFIKASI_PASSWORD3}</Text>
            </View>
            : null
          }

          <View style={styles.passwordFieldsContainer}>
            <View>
              <Field
                name={'password'}
                label={headerLabel === 'Verify Password' ? language.VERIFIKASI_PASSWORD5 : language.PROFILE__PASSWORD_CURRENT }
                placeholder={language.HINTTEXT__PASSWORD}
                style={styles.input}
                secureTextEntry={isSecureTextEntry}
                component={SinarmasInput}
                submitHandler={wrapMethodInFunction(handleSubmit)}
              />
              <Touchable onPress={showOrHidePassword} style={styles.eyeIconStyle}><Image source={isSecureTextEntry ? showPasswordIcon : hidePasswordIcon}/></Touchable>
            </View>
            {headerLabel === 'Verify Password' ?
              null
              :
              <View style={styles.errorContainer}>
                {error && <FormError iconName='input-error' text={error}/>}
              </View>
            }
            {headerLabel === 'Verify Password' ?
              <View style={styles.forgotPasswordContainer}>
                <Touchable onPress= {forgotPassword}>
                  <Text style={styles.loginProblemVerifikasiText}>{language.VERIFIKASI_PASSWORD4}
                    <Text style={styles.resetPasswordVerifikasiText}> {language.LOGIN__RESET_PASSWORD}</Text>
                  </Text>
                </Touchable>
              </View>
              
              : null
            }
          </View>
        </View>
        <View>
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting}>
            {headerLabel === 'Verify Password' ? 
              <Text style={styles.button}>{buttonText ? buttonText : language.PROFILE__COMFIRM_BUTTON}</Text>
              :
              <Text style={styles.button}>{buttonText ? buttonText : language.PROFILE__NEXT_BUTTON}</Text>
            }
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default PasswordValidate;
