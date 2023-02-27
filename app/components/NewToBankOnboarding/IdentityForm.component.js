import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasIconInput, SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './IdentityForm.styles';
import noop from 'lodash/noop';
import {wrapMethodInFunction, normalizeDate} from '../../utils/transformer.util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const fields = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  BIRTH_MONTH: 'birthMonth',
  ID_CARD_NUMBER: 'idCardNumber',
  PHONE: 'phone',
  E_MAIL: 'email',
  POSTAL_CODE: 'postalCode',
};

class RegisterForm extends Component {

  render () {
    const {validationInput, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' style={styles.columnContainer} extraHeight={120}>
        <View >
          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>{language.IDENTITYFORM__TITLE}</Text>
          </View>
          <View style={styles.FieldsContainerWrapper}>
            <Field
              name={fields.FIRST_NAME}
              component={SinarmasIconInput}
              theme='primary'
              maxLength={12}
              style={styles.fieldContainer}
              label={language.IDENTITYFORM__FIRSTNAME_TITLE}
              placeholder={language.HINTTEXT__NAME}
              isUseSuccessInputText={true}
              typeField={'name'}
              validationInput={validationInput}
            />
            <Field
              name={fields.LAST_NAME}
              component={SinarmasIconInput}
              theme='primary'
              style={styles.fieldContainer}
              maxLength={12}
              label={language.IDENTITYFORM__LASTNAME_TITLE}
              placeholder={language.HINTTEXT__NAME}
              isUseSuccessInputText={true}
              typeField={'name'}
              validationInput={validationInput}
            />
            <Field
              name={fields.BIRTH_MONTH}
              normalize={normalizeDate}
              component={SinarmasIconInput}
              keyboardType='numeric'
              theme='primary'
              style={styles.fieldContainer}
              maxLength={10}
              label={language.IDENTITYFORM__BIRTHDATE_TITLE}
              placeholder={language.HINTTEXT__BIRTHDATE}
              isUseSuccessInputText={true}
              typeField={'date'}
              validationInput={validationInput}
            />
            <Field
              name={fields.ID_CARD_NUMBER}
              component={SinarmasIconInput}
              theme='primary'
              style={styles.fieldContainer}
              keyboardType='numeric'
              maxLength={16}
              label={language.IDENTITYFORM__IDCARDNUMBER_TITLE}
              placeholder={language.HINTTEXT__ID_CARD_NUMBER}
              isUseSuccessInputText={true}
              typeField={'idCardNumber'}
              validationInput={validationInput}
            />
          </View>
        </View>
        <View style={styles.paddingTop}>
          <View style={styles.borderGrey}/>
        </View>
        <View>
          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>{language.IDENTITYFORM__SUBTITLE}</Text>
          </View>
          <View style={styles.FieldsContainerWrapper}>
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
            <Field
              name={fields.POSTAL_CODE}
              component={SinarmasIconInput}
              keyboardType='numeric'
              maxLength={5}
              theme='primary'
              style={styles.fieldContainer}
              label={language.IDENTITYSECONDFORM__POSTALCODE_TITLE}
              placeholder={language.HINTTEXT__POSTAL_CODE}
              isUseSuccessInputText={true}
              typeField={'postalCode'}
              validationInput={validationInput}
            />
          </View>
        </View>
        <View style={styles.bottomWrapper}>
          <View style={styles.buttonNext}>
            <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting} >
              <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
            </SinarmasButton>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }

}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onLoginPress: PropTypes.func,
  validationInput: PropTypes.func
};

export default RegisterForm;
