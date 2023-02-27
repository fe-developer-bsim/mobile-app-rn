import {View, Text} from 'react-native';
import React from 'react';
import {SinarmasInput, SinarmasButton, SinarmasPickerLine, SinarmasIconInput, DatePicker} from '../FormComponents';
import {normalizeNumber, wrapMethodInFunction, generateQRLabel} from '../../utils/transformer.util';
import {Field} from 'redux-form';
import styles from './QRMerchantRegister3.styles';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import result from 'lodash/result';
import PropTypes from 'prop-types';
import SimasIcon from '../../assets/fonts/SimasIcon';

class QRMerchantRegister3 extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    formValues: PropTypes.object,
    accounts: PropTypes.array,
    getCityList: PropTypes.func,
    districtList: PropTypes.array,
    getDistrictList: PropTypes.func,
    getSubDistrictList: PropTypes.func,
    subDistrictList: PropTypes.array,
    cityList: PropTypes.array,
    provinceList: PropTypes.array,
    receiveCity: PropTypes.func,
    setZipCode: PropTypes.func,
    validationInput: PropTypes.func,
    storeLocationList: PropTypes.array,
    ownershipList: PropTypes.array,
    navigation: PropTypes.object,
    goMechant4: PropTypes.func,
    isRent: PropTypes.number,
    nameStatus: PropTypes.bool,
    availStorename: PropTypes.func,
  }

  goMechant4 = () => {
    const {navigation, goMechant4} = this.props;
    const params = result(navigation, 'state.params', {});
    const isRegisterStore = result(params, 'isRegisterStore');
    const isRegisterTerminal = result(params, 'isRegisterTerminal');
    const merchantId = result(params, 'merchantId');
    goMechant4(isRegisterStore, isRegisterTerminal, merchantId);
  }

  render () {
    const {validationInput, provinceList, getCityList, cityList, getDistrictList, districtList, getSubDistrictList, subDistrictList, setZipCode, storeLocationList, ownershipList, navigation, isRent, nameStatus, availStorename, ...reduxFormProps} = this.props;
    const {handleSubmit, submitting, invalid} = reduxFormProps;
    const params = result(navigation, 'state.params.isRegisterStore', {});
    const maxDate = new Date();
    return (
      <View style={styles.halfWidth}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraHeight={120}>
          <View style={styles.formContainer}>
            <View style={styles.containerInner}>
              <Text style={styles.titles}>{language.QR_GPN__MERCHANT_DETAIL_05}</Text>
              <Text style={styles.titles3}>{language.QR_GPN__MERCHANT_NEW_REGIST_02}</Text>
              <Field
                name='storeName'
                label={language.QR_GPN__MERCHANT_STORE_NAME}
                placeholder={language.QR_GPN__MERCHANT_STORE_NAME}
                component={SinarmasInput}
                maxLength={25}
                whenBlur={availStorename}
              />
              { nameStatus === true ?
                <View style={styles.textcontainer}>
                  <Text style={styles.textavailable}>{language.QR__STORENAME_AVAILABLE}</Text>
                </View>
                : nameStatus === false ?
                  <View style={styles.textcontainer}>
                    <Text style={styles.textnotavail}>{language.QR__STORENAME_NOT_AVAILABLE}</Text>
                  </View>
                  : null
              }
              <Field
                name='storePhone'
                label={language.QR_GPN__MERCHANT_PHONE_NAME}
                placeholder={language.QR_GPN__MERCHANT_PHONE_NAME}
                keyboardType='numeric'
                disabled={false}
                maxLength={14}
                component={SinarmasInput}
              />
              <View style={styles.labelSpacing} />
              <Field
                name='province'
                component={SinarmasPickerLine}
                style={styles.fieldContainer}
                placeholder={language.QR_GPN__MERCHANT_PROVINCE}
                itemList={provinceList}
                labelKey='name'
                typeField={'province'}
                onValChange={getCityList}
                labelText={language.QR_GPN__MERCHANT_PROVINCE}
              />
              <View style={styles.labelSpacing} />
              <Field
                name='city'
                component={SinarmasPickerLine}
                theme='primary'
                style={styles.fieldContainer}
                labelKey='name'
                placeholder={language.EMONEY__CITY}
                itemList={cityList}
                typeField={'city'}
                onValChange={getDistrictList}
                labelText={language.EMONEY__CITY}
              />
              <View style={styles.labelSpacing} />
              <Field
                name='district'
                component={SinarmasPickerLine}
                theme='primary'
                style={styles.fieldContainer}
                labelKey='name'
                placeholder={language.EMONEY__DISTRICT}
                typeField={'district'}
                itemList={districtList}
                onValChange={getSubDistrictList}
                labelText={language.EMONEY__DISTRICT}
              />
              <View style={styles.labelSpacing} />
              <Field
                name='subDistrict'
                component={SinarmasPickerLine}
                theme='primary'
                labelKey='name'
                style={styles.fieldContainer}
                placeholder={language.EMONEY__SUB_DISTRICT}
                typeField={'subdistrict'}
                itemList={subDistrictList}
                onValChange={setZipCode}
                labelText={language.EMONEY__SUB_DISTRICT}
              />
              <Field
                name='postalCode'
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
                normalize={normalizeNumber}
                disabled={true}
              />
              <Field
                name='merchantAddress'
                label={language.QR_GPN__MERCHANT_ADDRESS}
                placeholder={language.HINTTEXT__QR_GPN_MERCHANT_ADDRESS}
                component={SinarmasInput}
                maxLength={40}
                style={styles.fieldContainer}
              />
              <View style={styles.labelSpacing} />
              <Field
                name='storeLocation'
                rightIcon='arrow'
                component={SinarmasPickerLine}
                placeholder={language.QR_GPN__MERCHANT_STORE_LOCATION}
                labelKey='name'
                itemList={generateQRLabel(storeLocationList)}
                labelText={language.QR_GPN__MERCHANT_STORE_LOCATION}
              />
              <View style={styles.labelSpacing} />
              <Field
                name='ownership'
                rightIcon='arrow'
                component={SinarmasPickerLine}
                placeholder={language.QR_GPN__MERCHANT_OWNERSHIP}
                labelKey='name'
                itemList={generateQRLabel(ownershipList)}
                labelText={language.QR_GPN__MERCHANT_OWNERSHIP}
              />
              {isRent === 1 ?
                <View style={styles.rentRow}>
                  <View style={styles.rentStart}>
                    <Field
                      name='rentStart'
                      label={language.QR__RENT_DATE_START}
                      component={DatePicker}
                      placeholder='Choose date'
                      labelKey='label'
                      maximumDate={maxDate}
                      minimumDate={'01/01/1900'}
                      date={maxDate}
                    />
                  </View>
                  <View style={styles.rentEnd}>
                    <Field
                      name='rentEnd'
                      label={language.QR__RENT_DATE_END}
                      component={DatePicker}
                      placeholder='Choose date'
                      labelKey='label'
                      maximumDate={'01/01/2100'}
                      minimumDate={maxDate}
                      date={maxDate}
                    />
                  </View>
                </View>
                : null }
              <Field
                name='merchantNmid'
                label={language.QR_GPN__MERCHANT_NMID}
                placeholder={language.QR_GPN__MERCHANT_NMID}
                component={SinarmasInput}
                maxLength={15}
                style={styles.fieldContainer}
              />
              <View style={styles.containtextExplanation}>
                <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>
                <Text style={styles.textExplanation}>{language.QR__NMID_EXPLANATION}</Text>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        { params === false ?
          <View style={styles.containerBtn}>
            <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={submitting || invalid} text={language.SERVICE__NEXT_BUTTON}/>
          </View>
          :
          <View style={styles.containerBtn}>
            <SinarmasButton onPress={this.goMechant4} disabled={submitting || invalid} text={language.GENERIC__CONTINUE}/>
          </View>
        }
      </View>
    );
  }
}




export default QRMerchantRegister3;
