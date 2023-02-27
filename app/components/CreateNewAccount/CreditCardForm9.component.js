import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasIconInput, SinarmasButton, SinarmasPicker} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './CreditCard.styles';
import {noop} from 'lodash';
import {normalizeNumber, formatFieldName, wrapMethodInFunction, formatFieldNote} from '../../utils/transformer.util';

export const fields = {
  EMERGENCY_FULLNAME: 'emergencyFullName',
  EMERGENCY_RELATIONSHIP: 'emergencyRelationship',
  EMERGENCY_PHONE: 'emergencyPhone',
  EMERGENCY_COUNTRY: 'emergencyCountry',
  EMERGENCY_PROVINCE: 'emergencyProvince',
  EMERGENCY_CITY: 'emergencyCity',
  EMERGENCY_DISTRICT: 'emergencyDistrict',
  EMERGENCY_SUBDISTRICT: 'emergencySubDistrict',
  EMERGENCY_POSTAL_CODE: 'emergencyPostalCode',
  EMERGENCY_RT: 'emergencyRT',
  EMERGENCY_RW: 'emergencyRW',
  EMERGENCY_STREET_ADDRESS: 'emergencyStreetAddress'
};

class CreditCardForm9 extends Component {

  render () {
    const {validationInput, emergencyList, cityList, provinceList, getCityList, 
      districtList, getDistrictList, getSubDistrictList, subDistrictList, setZipCode,
      ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.spaceContainer}>
          <View style={styles.progressBar}>
            <View style={[{flex: 9}, styles.redBar]}/>
            <View style={[{flex: 1}, styles.greyBar]}/>
          </View>
          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>{language.CREDITCARD_TITLE9}</Text>
          </View>

          <View style={styles.FieldsContainerWrapper}>
            <Field
              name={fields.EMERGENCY_FULLNAME}
              component={SinarmasIconInput}
              label={language.CREDITCARD__EMERGENCY_FULLNAME}
              theme='primary'
              style={styles.fieldContainer}
              placeholder={language.HINT__EMERGENCY_FULLNAME}
              isUseSuccessInputText={true}
              typeField={'emergencyFullName'}
              validationInput={validationInput}
              normalize={formatFieldName}
            />
            <Field
              name={fields.EMERGENCY_RELATIONSHIP}
              component={SinarmasPicker}
              style={styles.fieldContainer}
              placeholder={language.CREDITCARD__EMERGENCY_RELATIONSHIP}
              labelKey='name'
              itemList={emergencyList}
            />
            <Field
              name={fields.EMERGENCY_PHONE}
              component={SinarmasIconInput}
              label={language.CREDITCARD__EMERGENCY_PHONE}
              theme='primary'
              style={styles.fieldContainer}
              placeholder={language.HINT__EMERGENCY_PHONE}
              isUseSuccessInputText={true}
              typeField={'emergencyPhone'}
              validationInput={validationInput}
              normalize={normalizeNumber}
              keyboardType={'numeric'}
              maxLength={15}
            />
            <Field
              name={fields.EMERGENCY_COUNTRY}
              component={SinarmasIconInput}
              style={styles.fieldContainer}
              label={language.EMONEY__COUNTRY}
              placeholder={language.HINTTEXT__COUNTRY}
              typeField={'emergencyCountry'}
              disabled={true}
            />
            <Field
              name={fields.EMERGENCY_PROVINCE}
              component={SinarmasPicker}
              style={styles.fieldContainer}
              placeholder={language.EMONEY__PROVINCE}
              itemList={provinceList}
              labelKey='name'
              typeField={'province'}
              onSelectPress={getCityList}
            />
            <Field
              name={fields.EMERGENCY_CITY}
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
              name={fields.EMERGENCY_DISTRICT}
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
              name={fields.EMERGENCY_SUBDISTRICT}
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
              name={fields.EMERGENCY_POSTAL_CODE}
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
                  name={fields.EMERGENCY_RT}
                  component={SinarmasIconInput}
                  theme='primary'
                  style={styles.fieldContainer}
                  maxLength={3}
                  label={language.EMONEY__RT}
                  placeholder={language.EMONEY__RT}
                  isUseSuccessInputText={true}
                  typeField={'emergencyRT'}
                  validationInput={validationInput}
                  keyboardType={'numeric'}
                />
              </View>

              <View style={styles.childFieldper}><Text>/</Text></View>

              <View style={styles.childField}>
                <Field
                  name={fields.EMERGENCY_RW}
                  component={SinarmasIconInput}
                  theme='primary'
                  style={styles.fieldContainer}
                  maxLength={3}
                  label={language.EMONEY__RW}
                  placeholder={language.EMONEY__RW}
                  isUseSuccessInputText={true}
                  typeField={'emergencyRW'}
                  validationInput={validationInput}
                  keyboardType={'numeric'}
                />
              </View>
            </View>
            <Field
              name={fields.EMERGENCY_STREET_ADDRESS}
              component={SinarmasIconInput}
              theme='primary'
              style={styles.fieldContainer}
              label={language.CREDITCARD__STREET_ADDRESS}
              placeholder={language.HINTTEXT__STREET_ADDRESS}
              isUseSuccessInputText={true}
              typeField={'emergencyStreetAddress'}
              validationInput={validationInput}
              maxLength={80}
              normalize={formatFieldNote}
            />
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

CreditCardForm9.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onSubmitPress: PropTypes.func,
  validationInput: PropTypes.func,
  emergencyCityList: PropTypes.array,
  emergencyProvinceList: PropTypes.array,
  receiveCity: PropTypes.func,
  setCity: PropTypes.func,
  onvalChangeProvinceAndCity: PropTypes.func,
  emergencyList: PropTypes.array,
  cityList: PropTypes.array,
  provinceList: PropTypes.array,
  getCityList: PropTypes.func,
  districtList: PropTypes.array,
  getDistrictList: PropTypes.func,
  getSubDistrictList: PropTypes.func,
  subDistrictList: PropTypes.array,
  setZipCode: PropTypes.func,
};

export default CreditCardForm9;
