import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton, DatePickerNew, SinarmasInputBoxNew} from '../FormComponents';
import Touchable from '../Touchable.component';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import noop from 'lodash/noop';
import styles from './Onboarding.component.styles';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const fields = {
  BIRTHDATE: 'birthdate',
  IDNUMBER: 'idCard'
};

class ResetByPhoneForm extends Component {
  render () {
    const {validationInput, goToAtmRegistration, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const currentDate = new Date();
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithTerms} extraHeight={120}>
        <View>
          <View>
            <Text style={styles.welcomeTextNew}>
              {language.RESET_PASSWORD__TITLE_CONFIRMATION}
            </Text>
          </View>
          <View style={styles.loginFieldsContainer}>
            <Field name={fields.BIRTHDATE}
              component={DatePickerNew}
              label={language.EMONEY__BIRTHDATE}
              minimumDate={'01/01/1900'}
              maximumDate={currentDate}
              date={currentDate} 
            />
            <Field
              name={fields.IDNUMBER}
              component={SinarmasInputBoxNew}
              theme='primary'
              maxLength={16}
              keyboardType='numeric'
              style={styles.fieldContainer}
              label={language.IDENTITYFORM__IDCARDNUMBER_TITLE}
              placeholder={language.HINTTEXT__ID_CARD_NUMBER}
              isUseSuccessInputText={true}
              typeField={'idCard'}
              validationInput={validationInput}
            />
          </View>

          <View style={styles.borderGreyResetPassword}>
            <View style={styles.border} />
            <View>
              <Text>
                {language.ONBOARDING__TEXT_OR}
              </Text>
            </View>
            <View style={styles.border}/>
          </View>
          <Touchable style={styles.containTextWithAtm} onPress={goToAtmRegistration}>
            <Text style={styles.withAtmCard}>{language.LOGIN__WITH_ATM_CARD}</Text>
          </Touchable>
        </View>

        <View>
          <View style={styles.buttonOtpSubmit}>
            <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)}  disabled={invalid || submitting} style={styles.buttonRegister}>
              <Text style={styles.buttonMainLogin}>{language.GENERIC__CONTINUE}</Text>
            </SinarmasButton>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

ResetByPhoneForm.propTypes = {
  handleSubmit: PropTypes.func,
  goRegister: PropTypes.func,
  goToAtmRegistration: PropTypes.func,
  validationInput: PropTypes.func,
  serverTimeNew: PropTypes.object
};

export default ResetByPhoneForm;
