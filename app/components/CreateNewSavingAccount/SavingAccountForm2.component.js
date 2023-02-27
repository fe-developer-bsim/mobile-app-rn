import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasIconInput, SinarmasButton, SinarmasPicker} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './SavingAccount.style';
import {noop} from 'lodash';
import CheckBox from 'react-native-checkbox';
import RedCheckBox from '../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../assets/images/checkbox-unchecked.png';
import {wrapMethodInFunction, formatFieldNote} from '../../utils/transformer.util';
import Touchable from '../Touchable.component';

export const fields = {
  COUNTRY: 'country',
  PROVINCE: 'province',
  CITY: 'city',
  DISTRICT: 'district',
  SUBDISTRICT: 'subDistrict',
  POSTAL_CODE: 'postalCode',
  RT: 'rt',
  RW: 'rw',
  STREET_ADDRESS: 'streetAddress'
};

class SavingAccountForm2 extends Component {

  render () {
    const {validationInput, cityList, provinceList, toogleCheckbox, checked, getCityList, 
      districtList, getDistrictList, getSubDistrictList, subDistrictList, setZipCode,
      existing, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.spaceContainer}>
          <View style={styles.progressBar}>
            <View style={[{flex: 2}, styles.redBar]}/>
            <View style={[{flex: 8}, styles.greyBar]}/>
          </View>
          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>{language.CREDITCARD_TITLE2}</Text>
          </View>

          {existing ? 
            null :
            <View style={styles.mainTitle}>
              <View style={styles.rowFieldAgreement}>
                <Touchable>
                  <View>
                    <CheckBox
                      onChange={toogleCheckbox}
                      uncheckedImage={RedCheckBox}
                      checkedImage={UnCheckBox}
                      label={language.EMONEY__CHECKBOX}
                      checkboxStyle={styles.checkboxStyle}
                      labelStyle={styles.checkboxLabel}
                      checked={!checked} // somehow checked value is reversed
                    />
                  </View>
                </Touchable>
              </View>
            </View>
          }
          
          {checked ? 
            null :
            <View style={styles.FieldsContainerWrapper}>
              <Field
                name={fields.COUNTRY}
                component={SinarmasIconInput}
                style={styles.fieldContainer}
                label={language.EMONEY__COUNTRY}
                placeholder={language.HINTTEXT__COUNTRY}
                typeField={'country'}
                disabled={true}
              />
              <Field
                name={fields.PROVINCE}
                component={SinarmasPicker}
                style={styles.fieldContainer}
                placeholder={language.EMONEY__PROVINCE}
                itemList={provinceList}
                labelKey='name'
                typeField={'province'}
                onSelectPress={getCityList}
              />
              <Field
                name={fields.CITY}
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
                name={fields.POSTAL_CODE}
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
                    component={SinarmasIconInput}
                    theme='primary'
                    style={styles.fieldContainer}
                    keyboardType={'numeric'}
                    maxLength={3}
                    label={language.EMONEY__RT}
                    placeholder={language.EMONEY__RT}
                    isUseSuccessInputText={true}
                    typeField={'rt'}
                    validationInput={validationInput}
                  />
                </View>

                <View style={styles.childFieldper}><Text>/</Text></View>

                <View style={styles.childField}>
                  <Field
                    name={fields.RW}
                    component={SinarmasIconInput}
                    theme='primary'
                    style={styles.fieldContainer}
                    keyboardType={'numeric'}
                    maxLength={3}
                    label={language.EMONEY__RW}
                    placeholder={language.EMONEY__RW}
                    isUseSuccessInputText={true}
                    typeField={'rw'}
                    validationInput={validationInput}
                  />
                </View>
              </View>
              <Field
                name={fields.STREET_ADDRESS}
                component={SinarmasIconInput}
                theme='primary'
                style={styles.fieldContainer}
                label={language.CREDITCARD__STREET_ADDRESS}
                placeholder={language.HINTTEXT__STREET_ADDRESS}
                isUseSuccessInputText={true}
                typeField={'streetAddress'}
                validationInput={validationInput}
                maxLength={35}
                normalize={formatFieldNote}
              />
            </View>
          }
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

SavingAccountForm2.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onSubmitPress: PropTypes.func,
  validationInput: PropTypes.func,
  cityList: PropTypes.array,
  provinceList: PropTypes.array,
  receiveCity: PropTypes.func,
  toogleCheckbox: PropTypes.func,
  hidden: PropTypes.bool,
  checked: PropTypes.bool,
  getCityList: PropTypes.func,
  districtList: PropTypes.array,
  getDistrictList: PropTypes.func,
  getSubDistrictList: PropTypes.func,
  subDistrictList: PropTypes.array,
  setZipCode: PropTypes.func,
  existing: PropTypes.bool,
};

export default SavingAccountForm2;
