import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import styles from './FormDataPA.styles';
import {language} from '../../config/language';
import result from 'lodash/result';
import {SinarmasInput, SinarmasPicker, SinarmasButton} from '../FormComponents';
import {formatFieldName, normalizeDate, generateDropDownList, generateAccountLabel} from '../../utils/transformer.util';
import {Field} from 'redux-form';
import noop from 'lodash/noop';
import Touchable from '../Touchable.component';

export const fields = {
  NAME: 'cust_name',
  IDENTITY_NUMBER: 'cust_identity_number',
  DOB: 'cust_dob',
  SEX: 'cust_sex',
  PHONE: 'cust_phone',
  MOBILE: 'cust_mobile',
  EMAIL: 'cust_email',
  ADDRESS: 'cust_address',
  CITY: 'cust_city',
  POSTAL: 'cust_postal_code',
};

class InsurancePAForm extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    navParams: PropTypes.object,
    sumbitFormDataPA: PropTypes.func,
    handleSubmit: PropTypes.func,
    accounts: PropTypes.array,
    getPACreate: PropTypes.func,
    genderAcc: PropTypes.string,
  }

  render () {
    const {accounts, navParams, getPACreate, genderAcc, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const formDataDropDownSex = result(navParams, 'formDataDropDownSex', []);
    const premi = result(navParams, 'premi', '');
    return (
      <ScrollView>
        <View style={styles.barStep}>
          <View style={styles.partOne}/>
          <View style={styles.partTwo}/>
        </View>
        <View style={styles.content}>
          <View style={styles.contentContainerEdit}>
            <View style={styles.row}>
              <View style={styles.contentContainer}>
                <Text style={styles.editPart}>{language.INSURANCE_PA} </Text>
                <Text style={styles.editPart}>{language.INSURANCE_PA_CONFIRMATION_TYPE_PREMI}{premi} </Text>
              </View>
              <Touchable onPress={getPACreate}>
                <Text style={styles.editButton}>{language.GENERIC__EDIT}</Text>
              </Touchable>
            </View>
          </View>
        </View>
        <View style={styles.partEditBar}/>
        <View style={styles.content}>
          <View style={styles.contentContainer}>
            <Text style={styles.pageTitle}>{language.INSURANCE_PA_DETAIL}</Text>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
              <Field
                name={fields.NAME}
                label={language.INSURANCE_PA_NAME}
                placeholder={language.INSURANCE_PA_PH}
                component={SinarmasInput}
                format={formatFieldName}
                normalize={formatFieldName}
              />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.verticalSpacing}>
              <Text style={styles.subTitle}>{language.SERVICE__PAY_FROM}</Text>
              <Field
                name='accountNo'
                rightIcon='arrow'
                component={SinarmasPicker}
                placeholder={language.GENERIC_BILLER__SELECT_ACCOUNT_PLACEHOLDER}
                labelKey='display'
                itemList={generateAccountLabel(accounts)} 
              />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
              <Field
                name={fields.IDENTITY_NUMBER}
                label={language.INSURANCE_PA_IDENTITY_NUMBER}
                placeholder={language.INSURANCE_PA_IDENTITY_NUMBER_PH}
                component={SinarmasInput}
                keyboardType='numeric'
              />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
              <Field
                name={fields.DOB}
                label={language.INSURANCE_PA_BIRTH}
                placeholder={language.INSURANCE_PA_DOB}
                component={SinarmasInput}
                normalize={normalizeDate}
                keyboardType='numeric'
                maxLength={10}
              />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
              <Field
                name={fields.SEX}
                rightIcon='arrow'
                component={SinarmasPicker}
                placeholder={genderAcc ? '' : language.INSURANCE_PA_GENDER}
                labelKey='display'
                itemList={generateDropDownList(formDataDropDownSex, genderAcc)}
                disabled={!!genderAcc}
              />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
              <Field
                name={fields.PHONE}
                label={language.INSURANCE_PA_PHONE}
                placeholder={language.INSURANCE_PA_PHONE_PA}
                component={SinarmasInput}
                keyboardType='numeric'
              />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
              <Field
                name={fields.MOBILE}
                label={language.INSURANCE_PA_MOBILE_PHONE}
                placeholder={language.INSURANCE_PA_MOBILE_PHONE_PA}
                component={SinarmasInput}
                keyboardType='numeric'
              />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
              <Field
                name={fields.EMAIL}
                label={language.INSURANCE_PA_EMAIL}
                placeholder={language.INSURANCE_PA_EMAIL_PH}
                component={SinarmasInput}
              />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
              <Field
                name={fields.ADDRESS}
                label={language.INSURANCE_PA_ADDRESS}
                placeholder={language.INSURANCE_PA_ADDRESS_PH}
                component={SinarmasInput}
              />
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.formContainer}>
              <Field
                name={fields.CITY}
                label={language.INSURANCE_PA_CITY}
                placeholder={language.INSURANCE_PA_CITY_PH}
                component={SinarmasInput}
                format={formatFieldName}
                normalize={formatFieldName}
              />
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.formContainer}>
              <Field
                name={fields.POSTAL}
                label={language.INSURANCE_PA_POSTAL_CODE}
                placeholder={language.INSURANCE_PA_POSTAL_CODE_PH}
                component={SinarmasInput}
                keyboardType='numeric'
                maxLength={5}
              />
            </View>
          </View>
          <SinarmasButton onPress={handleSubmit} disabled={invalid || submitting} >
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>

        </View>

      </ScrollView>
    );
  }
}

export default InsurancePAForm;
