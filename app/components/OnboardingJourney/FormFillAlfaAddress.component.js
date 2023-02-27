
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasIconInput, SinarmasButton, SinarmasPicker, SinarmasInput} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './FormFillAlfaAddress.styles';
import {noop, result} from 'lodash';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {formatMobileNumber} from '../../utils/transformer.util';
import CheckBox from 'react-native-checkbox';
import RedCheckBox from '../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../assets/images/checkbox-unchecked.png';
import Touchable from '../Touchable.component';



export const fields = {
  PROVINCE: 'province',
  CITY: 'city',
  DISTRICT: 'district',
  SUBDISTRICT: 'subDistrict',
  POSTAL_CODE: 'postalCode',
  FULL_NAME: 'fullName',
  LAST_NAME: 'lastName',
  STREET_ADDRESS: 'streetAddress',
  EMAIL: 'email',
  PHONE_NUMBER: 'phoneNumber',
  EMAIL_ADDRES: 'emailAddres',
  COUNTRY: 'indonesia',
  SET_AS: 'setAs'
};


class LuckyDipInformation extends Component {

  render () {
    const {validationInput, cityList = [], districtList = [], getDistrictList, setZipCode, getSubDistrictList, subDistrictList = [], provinceList = [], getCityList = [], reward, toogleCheckbox, checked, isEdit, existing,
      ...reduxFormProps} = this.props;
    const {handleSubmit = noop} = reduxFormProps;
    const displayName = result(reward, 'displayName', '');
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.spaceContainer}>

          <View style={styles.rowTop}>
            <Text style={styles.textProductTitle}>{language.ALFACART__ADDNEW_ADDRES}</Text>
            <View style={styles.textProductContainer}>
              <Text style={styles.textProductSubTitle}>{displayName}</Text>
            </View>
          </View>
          <View style={styles.paddingTop} />
          <View style={styles.fieldStyle}>
            <Field
              name={fields.FULL_NAME}
              component={SinarmasIconInput}
              theme='primary'
              style={styles.fieldContainer}
              Text={language.ALFACART__ADDRESS_ENTER_NAME}
              label={language.IDENTITYFORM__FIRSTNAME_TITLE}
              placeholder={language.HINTTEXT__NAME}
              isUseSuccessInputText={true}
              typeField={'fullName'}
              validationInput={validationInput}
            />

            <Field
              name={fields.EMAIL}
              component={SinarmasIconInput}
              theme='primary'
              style={styles.fieldContainer}
              label={language.ALFACART__EMAIL_ADDRESS}
              placeholder={language.ALFACART__EMAIL_ADDRESS}
              isUseSuccessInputText={true}
              typeField={'email'}
              validationInput={validationInput}
              maxLength={80}
            />
            <Field
              name={fields.PHONE_NUMBER}
              label={language.MOBILE_POSTPAID__PHONE_NUMBER}
              format={formatMobileNumber}
              component={SinarmasInput}
              typeField={'phoneNumber'}
              keyboardType='numeric'
              maxLength={16}
            /></View>

          <View style={styles.greyLine} />
          <View style={styles.rowTop}>
            <Text style={styles.textProductTitle2}>{language.ADD_NEW_ADDRESS_TEXT__BUTTON}</Text>
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
                      label={language.ALFACART__SET_PRIMARY_ADDRESS}
                      checkboxStyle={styles.checkboxStyle}
                      labelStyle={styles.checkboxLabel}
                      checked={!checked} 
                    />
                  </View>
                </Touchable>
              </View>
            </View>
          }
          <Field
            name={fields.SET_AS}
            component={SinarmasIconInput}
            theme='primary'
            style={styles.fieldContainer}
            label={language.ALFACART__SAVE_ADDRESS_SUB_AS}
            placeholder={language.ALFACART__SAVE_ADDRESS_AS}
            isUseSuccessInputText={true}
            typeField={'note'}
            validationInput={validationInput}
            maxLength={100}
          />
          <Field
            name={fields.COUNTRY}
            component={SinarmasPicker}
            style={styles.fieldContainer}
            placeholder={'Indonesia'}
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
            onValChange={getDistrictList}
            typeField={'city'}
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
            onValChange={getSubDistrictList}
          />
          <View style={styles.labelSpacing} />
          <Field
            name={fields.SUBDISTRICT}
            component={SinarmasPicker}
            theme='primary'
            labelKey='name'
            style={styles.fieldContainer}
            placeholder={language.EMONEY__SUB_DISTRICT}
            typeField={'subdistrict'}
            itemList={subDistrictList}
            onValChange={setZipCode}
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
            disabled={true}
          />
          <Field
            name={fields.STREET_ADDRESS}
            component={SinarmasIconInput}
            theme='primary'
            style={styles.fieldContainer}
            label={language.GENERIC__FORM_STREET_ADDRESS}
            placeholder={language.LUCKY__DIP_NOTE_PLACEHOLDER}
            isUseSuccessInputText={true}
            typeField={'note'}
            validationInput={validationInput}
            maxLength={80}
          />
        </View>
        <View style={styles.containtextExplanation}>
          <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>
          <View style={styles.containExplantionRight}><Text style={styles.textExplanation}>{language.LUCKY__DIP_CONFIRMATION_COMPLETION_EDITED}</Text></View>
        </View>
        <View style={styles.buttonWrapper}>
          {isEdit ?
            <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} >
              <Text style={styles.buttonLargeTextStyle}>UPDATE ADDRESS</Text>
            </SinarmasButton> :
            <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} >
              <Text style={styles.buttonLargeTextStyle}>{language.RECURRING__EDIT_BUTTON}</Text>
            </SinarmasButton>
          }
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

LuckyDipInformation.propTypes = {
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
  reward: PropTypes.object,
  goToShipping: PropTypes.func,
  isEdit: PropTypes.string
};

export default LuckyDipInformation;
