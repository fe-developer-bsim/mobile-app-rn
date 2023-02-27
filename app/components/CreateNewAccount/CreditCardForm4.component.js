import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasIconInput, SinarmasButton, SinarmasPicker} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './CreditCard.styles';
import {noop} from 'lodash';
import {wrapMethodInFunction, formatFieldNote, normalizeNumber} from '../../utils/transformer.util';

export const fields = {
  WORK_TITLE: 'workTitle',
  WORK_POSITION: 'workPosition',
  INDUSTRY: 'industry',
  COMPANY_NAME: 'companyName',
  COMPANY_ADDRESS: 'companyAddress',
  COMPANY_PHONE_NUMBER: 'companyPhoneNumber',
  COMPANY_COUNTRY: 'companyCountry',
  COMPANY_PROVINCE: 'companyProvince',
  COMPANY_CITY: 'companyCity',
  COMPANY_DISTRICT: 'companyDistrict',
  COMPANY_SUBDISTRICT: 'companySubDistrict',
  COMPANY_POSTAL_CODE: 'companyPostalCode',
  COMPANY_RT: 'companyRT',
  COMPANY_RW: 'companyRW',
};

class CreditCardForm4 extends Component {

  render () {
    const {validationInput, cityList, provinceList, getCityList, districtList, 
      getDistrictList, getSubDistrictList, subDistrictList, setZipCode, listPosition,
      ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.spaceContainer}>
          <View style={styles.progressBar}>
            <View style={[{flex: 4}, styles.redBar]}/>
            <View style={[{flex: 6}, styles.greyBar]}/>
          </View>
          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>{language.CREDITCARD_TITLE4}</Text>
          </View>

          <View style={styles.FieldsContainerWrapper}>
            <Field
              name={fields.WORK_TITLE}
              component={SinarmasIconInput}
              theme='primary'
              style={styles.fieldContainer}
              label={language.CREDITCARD__WORK_TITLE}
              placeholder={language.HINT__WORK_TITLE}
              isUseSuccessInputText={true}
              typeField={'workTitle'}
              validationInput={validationInput}
            />
            <Field
              component={SinarmasPicker}
              style={styles.fieldContainer}
              placeholder={language.CREDITCARD__WORK_POSITION}
              labelKey='name'
              itemList={listPosition}
              validationInput={validationInput}
              name={fields.WORK_POSITION}
            />
            <Field
              name={fields.INDUSTRY}
              component={SinarmasIconInput}
              theme='primary'
              style={styles.fieldContainer}
              label={language.CREDITCARD__INDUSTRY}
              placeholder={language.HINT__INDUSTRY}
              isUseSuccessInputText={true}
              typeField={'industry'}
              validationInput={validationInput}
            />
            <Field
              name={fields.COMPANY_NAME}
              component={SinarmasIconInput}
              label={language.CREDITCARD__COMPANY_NAME}
              theme='primary'
              style={styles.fieldContainer}
              placeholder={language.HINT__COMPANY_NAME}
              isUseSuccessInputText={true}
              typeField={'companyName'}
              validationInput={validationInput}
            />
            <Field
              name={fields.COMPANY_ADDRESS}
              component={SinarmasIconInput}
              label={language.CREDITCARD__COMPANY_ADDRESS}
              theme='primary'
              style={styles.fieldContainer}
              placeholder={language.HINT__COMPANY_ADDRESS}
              isUseSuccessInputText={true}
              typeField={'companyAddress'}
              validationInput={validationInput}
              maxLength={80}
              normalize={formatFieldNote}
            />
            <Field
              name={fields.COMPANY_PHONE_NUMBER}
              component={SinarmasIconInput}
              label={language.CREDITCARD__COMPANY_PHONE_NUMBER}
              theme='primary'
              style={styles.fieldContainer}
              placeholder={language.HINT__COMPANY_PHONE_NUMBER}
              isUseSuccessInputText={true}
              keyboardType='numeric'
              typeField={'companyPhoneNumber'}
              validationInput={validationInput}
              normalize={normalizeNumber}
            />
            <Field
              name={fields.COMPANY_COUNTRY}
              component={SinarmasIconInput}
              style={styles.fieldContainer}
              label={language.EMONEY__COUNTRY}
              placeholder={language.HINTTEXT__COUNTRY}
              typeField={'companyCountry'}
              disabled={true}
            />
            <Field
              name={fields.COMPANY_PROVINCE}
              component={SinarmasPicker}
              style={styles.fieldContainer}
              placeholder={language.EMONEY__PROVINCE}
              itemList={provinceList}
              labelKey='name'
              typeField={'province'}
              onSelectPress={getCityList}
            />
            <Field
              name={fields.COMPANY_CITY}
              component={SinarmasPicker}
              theme='primary'
              style={styles.fieldContainer}
              labelKey='name'
              placeholder={language.EMONEY__CITY}
              itemList={cityList}
              typeField={'city'}
              onSelectPress={getDistrictList}
            />
            <Field
              name={fields.COMPANY_DISTRICT}
              component={SinarmasPicker}
              theme='primary'
              style={styles.fieldContainer}
              labelKey='name'
              placeholder={language.EMONEY__DISTRICT}
              typeField={'district'}
              itemList={districtList}
              onSelectPress={getSubDistrictList}
            />
            <Field
              name={fields.COMPANY_SUBDISTRICT}
              component={SinarmasPicker}
              theme='primary'
              labelKey='name'
              style={styles.fieldContainer}
              placeholder={language.EMONEY__SUB_DISTRICT}
              typeField={'subdistrict'}
              itemList={subDistrictList}
              onSelectPress={setZipCode}
            />
            <Field
              name={fields.COMPANY_POSTAL_CODE}
              component={SinarmasIconInput}
              theme='primary'
              style={styles.fieldContainer}
              label={language.EMONEY__POSTAL_CODE}
              placeholder={language.EMONEY__POSTAL_CODE}
              isUseSuccessInputText={true}
              typeField={'postal'}
              maxLength={5}
              keyboardType={'numeric'}
              validationInput={validationInput}
            />

            <View style={styles.inlineField}>
              <View style={styles.childField}>
                <Field
                  name={fields.COMPANY_RT}
                  component={SinarmasIconInput}
                  theme='primary'
                  style={styles.fieldContainer}
                  maxLength={3}
                  label={language.EMONEY__RT}
                  placeholder={language.EMONEY__RT}
                  isUseSuccessInputText={true}
                  typeField={'companyRT'}
                  keyboardType={'numeric'}
                  validationInput={validationInput}
                />
              </View>

              <View style={styles.childFieldper}><Text>/</Text></View>

              <View style={styles.childField}>
                <Field
                  name={fields.COMPANY_RW}
                  component={SinarmasIconInput}
                  theme='primary'
                  style={styles.fieldContainer}
                  maxLength={3}
                  label={language.EMONEY__RW}
                  placeholder={language.EMONEY__RW}
                  isUseSuccessInputText={true}
                  typeField={'companyRW'}
                  keyboardType={'numeric'}
                  validationInput={validationInput}
                />
              </View>
            </View>
          </View>

        </View>

        <View style={styles.buttonWrapper}>
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting} >
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }

}

CreditCardForm4.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onSubmitPress: PropTypes.func,
  validationInput: PropTypes.func,
  cityList: PropTypes.array,
  provinceList: PropTypes.array,
  getCityList: PropTypes.func,
  districtList: PropTypes.array,
  getDistrictList: PropTypes.func,
  getSubDistrictList: PropTypes.func,
  subDistrictList: PropTypes.array,
  setZipCode: PropTypes.func,
  listPosition: PropTypes.array
};

export default CreditCardForm4;
