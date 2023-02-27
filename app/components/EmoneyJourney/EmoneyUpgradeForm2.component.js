import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasInput, SinarmasButton, SinarmasPicker, SinarmasIconInput} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './EmoneyUpgradeForm.styles';
import noop from 'lodash/noop';
import {wrapMethodInFunction, formatFieldAccount} from '../../utils/transformer.util';

export const fields = {
  COUNTRY: 'country',
  PROVINCE: 'province',
  CITY: 'city',
  DISTRICT: 'district',
  SUBDISTRICT: 'subDistrict',
  ADDRESS: 'address',
  RT: 'rt',
  RW: 'rw',
  POSTAL: 'postal',
};

class EmoneyUpgradeSecondForm extends Component {

  render () {
    const {validationInput, cityList, provinceList, onvalChangeProvinceAndCity, getDistrictList, districtList,
      getSubDistrictList, subDistrictList, setZipCode, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.spaceContainer}>
          <View style={styles.progressBar}>
            <View style={[{flex: 5}, styles.redBar]}/>
            <View style={[{flex: 5}, styles.greyBar]}/>
          </View>
          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>{language.EMONEY__UPGRADE_TITLE_FORM2}</Text>
          </View>
       
          <View style={styles.FieldsContainerWrapper}>
            <SinarmasIconInput
              label={language.EMONEY__COUNTRY}
              theme='primary'
              style={styles.fieldContainer}
              placeholder={language.HINTTEXT__COUNTRY}
              disabled={true}
              value='Indonesia'
            />
            <Field
              name={fields.PROVINCE}
              component={SinarmasPicker}
              style={styles.fieldContainer}
              placeholder={language.EMONEY__PROVINCE}
              itemList={provinceList}
              labelKey='label'
              typeField={'province'}
              onValChange={onvalChangeProvinceAndCity}
            />
            <Field
              name={fields.CITY}
              component={SinarmasPicker}
              theme='primary'
              style={styles.fieldContainer}
              labelKey='label'
              placeholder={language.EMONEY__CITY}
              itemList={cityList}
              typeField={'city'}
              onSelectPress={getDistrictList}
            /> 
            <Field
              name={fields.DISTRICT}
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
              name={fields.SUBDISTRICT}
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
              name={fields.POSTAL}
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
                  name={fields.RT}
                  component={SinarmasInput}
                  theme='primary'
                  style={styles.fieldContainer}
                  maxLength={3}
                  label={language.EMONEY__RT}
                  placeholder={language.EMONEY__RT}
                  isUseSuccessInputText={true}
                  typeField={'rt'}
                  validationInput={validationInput}
                  keyboardType={'numeric'}
                  format={formatFieldAccount}
                  normalize={formatFieldAccount}
                />
              </View> 

              <View style={styles.childFieldper}><Text>/</Text></View>
              
              <View style={styles.childField}> 
                <Field
                  name={fields.RW}
                  component={SinarmasInput}
                  theme='primary'
                  style={styles.fieldContainer}
                  maxLength={3}
                  label={language.EMONEY__RW}
                  placeholder={language.EMONEY__RW}
                  isUseSuccessInputText={true}
                  typeField={'rw'}
                  validationInput={validationInput}
                  keyboardType={'numeric'}
                  format={formatFieldAccount}
                  normalize={formatFieldAccount}
                />
              </View>
            </View>

            <Field
              name={fields.ADDRESS}
              component={SinarmasInput}
              theme='primary'
              style={styles.fieldContainer}
              label={language.EMONEY__ADDRESS}
              placeholder={language.EMONEY__ADDRESS}
              isUseSuccessInputText={true}
              typeField={'address'}
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

EmoneyUpgradeSecondForm.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onSubmitPress: PropTypes.func,
  validationInput: PropTypes.func,
  cityList: PropTypes.array,
  provinceList: PropTypes.array,
  receiveCity: PropTypes.func,
  onvalChangeProvinceAndCity: PropTypes.func,
  getDistrictList: PropTypes.func,
  districtList: PropTypes.array,
  getSubDistrictList: PropTypes.func,
  subDistrictList: PropTypes.array,
  setZipCode: PropTypes.func
};

export default EmoneyUpgradeSecondForm;
