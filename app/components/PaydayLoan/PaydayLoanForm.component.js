import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasIconInput, SinarmasButton, SinarmasPicker} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './AboutPayDayLoan.styles';
import noop from 'lodash/noop';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const fields = {
  NPWP: 'npwp',
  E_MAIL: 'email',
  POSTAL_CODE: 'postalCode',
  CITY: 'city',
};

class IdentitySecondForm extends Component {

  render () {
    const {FormFillFirstData, validationInput, configPostal, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' style={styles.columnContainer} extraHeight={120}>
        <View >
          <View style={styles.topContainerForm}>
            <Text style={styles.bigTitle}>{language.PAYDAY_LOAN__FORMFILL_TITLE}</Text>
            <Text style={styles.bigSecTitle}>{language.PAYDAY_LOAN__FORMFILL_SUBTITLE}</Text>
          </View>
          <View style={styles.FieldsContainerWrapper}>
            <Field
              name={fields.E_MAIL}
              component={SinarmasIconInput}
              theme='primary'
              maxLength={30}
              style={styles.fieldContainer}
              label={language.IDENTITYSECONDFORM__EMAIL_TITLE}
              placeholder={language.HINTTEXT__EMAIL}
              isUseSuccessInputText={true}
              typeField={'email'}
              validationInput={validationInput}
            />
            <Field
              name={fields.NPWP}
              component={SinarmasIconInput}
              theme='primary'
              maxLength={15}
              keyboardType='numeric'
              style={styles.fieldContainer}
              label={language.PAYDAY_LOAN__FORMFILL_NPWP}
              placeholder={language.HINTTEXT__PHONE_NUMBER}
              isUseSuccessInputText={true}
              typeField={'phoneNumber'}
              validationInput={validationInput}
            />
            <View style={styles.subPading}>
              <Text>
                {language.PAYDAY_LOAN__FORMFILL_CITY}
              </Text>
            </View>
            <Field
              name={fields.CITY}
              component={SinarmasPicker}
              theme='primary'
              style={styles.fieldContainer}
              placeholder={language.PAYDAY_LOAN__FORMFILL_CITY_HINT}
              isUseSuccessInputText={true}
              typeField={'city'}
              validationInput={validationInput}
              itemList={configPostal}
              labelKey='DESC2'
            />
            <Field
              name={fields.POSTAL_CODE}
              component={SinarmasIconInput}
              keyboardType='numeric'
              maxLength={5}
              theme='primary'
              style={styles.fieldContainer}
              label={language.PAYDAY_LOAN__FORMFILL_POSTAL_CODE}
              placeholder={language.HINTTEXT__POSTAL_CODE}
              isUseSuccessInputText={true}
              typeField={'postalCode'}
              validationInput={validationInput}
            />
          </View>
        </View>
        <View style={styles.bottomWrapper}>
          <View style={styles.buttonNext}>
            <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting} FormFillFirstData={FormFillFirstData}>
              <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
            </SinarmasButton>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

IdentitySecondForm.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  FormFillFirstData: PropTypes.object,
  validationInput: PropTypes.func,
  configPostal: PropTypes.array,
};

export default IdentitySecondForm;
