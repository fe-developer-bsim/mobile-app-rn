import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasIconInput, SinarmasButton, SinarmasPicker, SinarmasInput} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './LuckyDipInformation.style';
import {noop, result} from 'lodash';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {formatMobileNumber} from '../../utils/transformer.util';
import WebView from 'react-native-webview';
import {formatFieldNote} from '../../utils/transformer.util';

export const fields = {
  PROVINCE: 'province',
  CITY: 'city',
  DISTRICT: 'district',
  SUBDISTRICT: 'subDistrict',
  POSTAL_CODE: 'postalCode',
  FULL_NAME: 'fullName',
  LAST_NAME: 'lastName',
  STREET_ADDRESS: 'streetAddress',
  PHONE_NUMBER: 'phoneNumber',
  LUCKY_DIP_NOTE: 'note'
};


class LuckyDipInformation extends Component {

  render () {
    const {validationInput, cityList = [], districtList = [], getDistrictList, setZipCode, getSubDistrictList, subDistrictList = [], provinceList = [], getCityList = [], reward, 
      ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const uriImage = result(reward, 'URLImage', '');
    const displayName = result(reward, 'displayName', '');
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.spaceContainer}>

          <View style={styles.rowTop}>
            <View>
              <WebView source={{uri: uriImage}} style={styles.imageContainer}/>
            </View>
            <View style={styles.rightTopContain}>
              <Text style={styles.textProductTitle}>{language.LUCKY__DIP_TITLE_PRODUK}</Text>
              <View style={styles.textProductContainer}>
                <Text style={styles.textProductSubTitle}>{displayName}</Text>
                <Text style={styles.textProductSubTitle}>{language.LUCKY__DIP_TITLE_QUANTITY} : 1</Text>
              </View>
            </View>
          </View>
          <View style={styles.greyLine}/>
          <View style={styles.paddingTop}>
            <Text style={styles.mainTitleText}>{language.LUCKY__DIP_SHIP_TO}</Text>
          </View>
          <Field
            name={fields.FULL_NAME}
            component={SinarmasIconInput}
            theme='primary'
            style={styles.fieldContainer}
            label={language.IDENTITYFORM__FIRSTNAME_TITLE}
            placeholder={language.HINTTEXT__NAME}
            isUseSuccessInputText={true}
            typeField={'fullName'}
            validationInput={validationInput}
            normalize={formatFieldNote}
            format={formatFieldNote}
          />
          <Field
            name={fields.LAST_NAME}
            component={SinarmasIconInput}
            theme='primary'
            style={styles.fieldContainer}
            label={language.IDENTITYFORM__LASTNAME_TITLE}
            placeholder={language.HINTTEXT__NAME}
            isUseSuccessInputText={true}
            typeField={'lastName'}
            validationInput={validationInput}
            normalize={formatFieldNote}
            format={formatFieldNote}
          />
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
            maxLength={80}
            normalize={formatFieldNote}
            format={formatFieldNote}
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
          />
          <Field
            name={fields.PHONE_NUMBER}
            label={language.MOBILE_POSTPAID__PHONE_NUMBER}
            format={formatMobileNumber}
            component={SinarmasInput}
            typeField={'phoneNumber'}
            keyboardType='numeric'
            maxLength={16}
          />
          <Field
            name={fields.LUCKY_DIP_NOTE}
            component={SinarmasIconInput}
            theme='primary'
            style={styles.fieldContainer}
            label={language.LUCKY__DIP_NOTE_TITLE}
            placeholder={language.LUCKY__DIP_NOTE_PLACEHOLDER}
            isUseSuccessInputText={true}
            typeField={'note'}
            validationInput={validationInput}
            maxLength={80}
            normalize={formatFieldNote}
            format={formatFieldNote}
          />
        </View>
        <View style={styles.containtextExplanation}>
          <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>                        
          <View style={styles.containExplantionRight}><Text style={styles.textExplanation}>{language.LUCKY__DIP_CONFIRMATION_COMPLETION_EDITED}</Text></View>
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
  reward: PropTypes.object
};

export default LuckyDipInformation;
