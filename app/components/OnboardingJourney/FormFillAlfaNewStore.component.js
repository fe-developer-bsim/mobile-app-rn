import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasButton, SinarmasPicker} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './FormFIllAlfaNewStore.styles';
import {noop, result} from 'lodash';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {SinarmasInputBox} from '../FormComponents';
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
  PHONE_NUMBER: 'phoneNumber',
  EMAIL_ADDRES: 'emailAddres',
  COUNTRY: 'indonesia'
};


class LuckyDipInformation extends Component {

  render () {
    const {valueSearchStore,  cityList = [], districtList = [], getDistrictList, setZipCode, getSubDistrictList, subDistrictList = [], provinceList = [], getCityList = [], reward, searchStoreName,
      ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const displayName = result(reward, 'displayName', '');
    const checking = valueSearchStore === '';
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.spaceContainer}>

          <View style={styles.rowTop}>
            <Text style={styles.textProductTitle}>{language.ALFACART__SEARCH_STORE_NAME}</Text>
            <View style={styles.textProductContainer}>
              <Text style={styles.textProductSubTitle}>{displayName}</Text>
            </View>
          </View>

          <View style={styles.paddingTop} />
          <View>
            <View style={styles.bgSearch}>
              <View style={styles.searchTxtInput}>
                <Field
                  name='searchBox'
                  component={SinarmasInputBox}
                  placeholder={language.ALFACART__SEARCH_STORE_SUBNAME}
                  iconName='edit-amount'
                  textPosition='center' />
                <Touchable onPress={searchStoreName} disabled={checking}>
                  <SimasIcon name={'arrow-next-red'} size={30} style={checking ? styles.arrowDisable : styles.arrow} />
                </Touchable>
              </View>

            </View>
          </View>
          <View style={styles.greyLine} />
          <View style={styles.rowTop}>
            <Text style={styles.textProductTitle2}>{language.ALFACART__SEARCH_FROM_REGION}</Text>
          </View>
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
        </View>
        <View style={styles.buttonWrapper}>
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting} >
            <Text style={styles.buttonLargeTextStyle}>{language.ALFACART__SEARCH_STORE_SUBNAME_SEARCH}</Text>
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
  reward: PropTypes.object,
  searchStoreName: PropTypes.func,
  valueSearchStore: PropTypes.object
};

export default LuckyDipInformation;
