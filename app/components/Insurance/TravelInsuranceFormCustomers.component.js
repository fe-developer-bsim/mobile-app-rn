import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {language} from '../../config/language';
import {SinarmasButton, SinarmasInput} from '../FormComponents';
import {Field} from 'redux-form';
import styles from './TravelInsuranceFormCustomers.component.styles';
import {SinarmasPicker, DatePicker} from '../FormComponents';
import {getDropDownList, isEmptyOrNull, getVarName, recursiveMap} from '../../utils/transformer.util';
import {map, filter, result, noop} from 'lodash';
import InsuranceHeader from './InsuranceHeader.component';

class TravelAssuranceFormCustomers extends React.Component {
  static propTypes = {
    navParams: PropTypes.object,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
    isEmptyField: PropTypes.func,
    party: PropTypes.object,
    filterIdInsured: PropTypes.func,
    filterInsured: PropTypes.func,
    formValues: PropTypes.object,
    getPartyData: PropTypes.func,
    dispatchField: PropTypes.func,
    dataDisplay: PropTypes.object,
  }

  componentDidMount () {
    const {navParams, getPartyData, dispatchField, party} = this.props;    
    const index = result(navParams, 'index', '');
    const partyInfo = getPartyData(party, index);
    map(partyInfo,  (objVal, k) => typeof (objVal) === 'object' || isEmptyOrNull(objVal) ? null : dispatchField(k, objVal));
    const statusField = 'Status';
    const genderField = 'Gender';
    const idTypeField = 'IdType'; 
    const status = result(partyInfo, statusField, '');
    const gender = result(partyInfo, genderField, '');
    const idType = result(partyInfo, idTypeField, '');
    const statusList = result(navParams, 'statusList', []);
    const genderList = result(navParams, 'genderList', []);
    const idTypeList = result(navParams, 'idTypeList', []);
    status ? this.dispatchDropDown(statusList, status, statusField) : null;
    gender ? this.dispatchDropDown(genderList, gender, genderField) : null;
    idType ? this.dispatchDropDown(idTypeList, idType, idTypeField) : null;
  } 

  dispatchDropDown = (initList, typeInfo, dispatchedField) => {
    const {dispatchField} = this.props;
    const dropDown = getDropDownList(initList);
    const filteredList = filter(dropDown, {display: typeof (typeInfo) === 'object' ? typeInfo.display : typeInfo});
    const toBeDispatched = result(filteredList, '0', {});
    dispatchField(dispatchedField, toBeDispatched);
  }

  headerView = (text, key) => <Text style={styles.header} key={key}>{text}</Text>

  nameView = (text, key) => text ? <Text style={styles.subHeader} key={key}>{text}</Text> : null

  customView = (object, objKey = '') => recursiveMap(object, this.nameView, 'name', ['function', 'header'], {function: noop, header: this.headerView}).map((object, key) => <View key={objKey + key}>{object}</View>)

  render () {
    const {navParams, invalid, submitting, handleSubmit = noop, isEmptyField, party, dataDisplay} = this.props;
    const index = result(navParams, 'index', '');
    const isInsured = result(navParams, 'isInsured', false);
    const statusList = result(navParams, 'statusList', []);
    const genderList = result(navParams, 'genderList', []);
    const idTypeList = result(navParams, 'idTypeList', []);
    const emptyField = isEmptyField(party, index);

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120}>
        <View style={styles.rowGrey}/>
        <InsuranceHeader headerDisplay={dataDisplay} headerKey={getVarName({dataDisplay})} avoidedDisplay={['function']} customHeader={['insuredHeader']} customView={{insuredHeader: null}}/>
        <View style={styles.container}>
          <Text style={styles.titleHeader}>{language.TRAVEL_INSURANCE__CUSTOMER_FORM}</Text>
          <View style={styles.buttonContinue}>
            <Field
              name='CustName'
              label={language.GENERIC__NAME}
              placeholder={language.GENERIC__NAME}
              disabled={isInsured && !result(emptyField, 'CustName', false)}
              component={SinarmasInput}
              keyboardType='default'
              maxLength={50}
            />
            <Field
              name='IdType'
              disabled={isInsured && !result(emptyField, 'IdType', false)}
              label={language.FORM__ID_TYPE}
              placeholder={language.FORM__ID_TYPE}
              rightIcon='arrow'
              labelKey='display'
              component={SinarmasPicker}
              itemList={getDropDownList(idTypeList)}
            />
            <Field
              name='InsuredIdNo'
              label={language.TRAVEL_INSURANCE__ID_NO}
              placeholder={language.TRAVEL_INSURANCE__ID_NO}
              disabled={isInsured && !result(emptyField, 'InsuredIdNo', false)}
              component={SinarmasInput}
              keyboardType='numeric'
              maxLength={16}
            />
            <Field
              name='DateOfBirth'
              label={language.GENERIC__BIRTH_DATE}
              placeholder={language.GENERIC__BIRTH_DATE}
              disabled={isInsured && !result(emptyField, 'DateOfBirth', false)}
              component={DatePicker}
              keyboardType='numeric'
              isDateFormat={true}
              maximumDate={new Date()}
              formatDate={'MM/DD/YYYY'}
              minimum={'01/01/1900'}
              date={new Date()}
            />
            <Field
              name='Gender'
              disabled={isInsured && !result(emptyField, 'Gender', false)}
              label={language.GENERIC__SEX_TYPE}
              placeholder={language.GENERIC__SEX_TYPE}
              rightIcon='arrow'
              labelKey='name'
              component={SinarmasPicker}
              itemList={getDropDownList(genderList)}
            />
            <Field
              name='Status'
              rightIcon='arrow'
              label={language.FORM__STATUS}
              placeholder={language.FORM__STATUS}
              labelKey='name'
              disabled={isInsured && !result(emptyField, 'Status', false)}
              component={SinarmasPicker}
              itemList={getDropDownList(statusList)}
            /> 
            <Field
              name='HandPhone'
              label={language.FORM__HANDPHONE}
              placeholder={language.FORM__HANDPHONE}
              disabled={isInsured && !result(emptyField, 'HandPhone', false)}
              component={SinarmasInput}
              keyboardType='numeric'
              maxLength={16}
            />
            <Field
              name='PhoneNo'
              label={language.FORM__HOME_PHONE}
              placeholder={language.FORM__HOME_PHONE}
              component={SinarmasInput}
              keyboardType='numeric'
              maxLength={16}
            />
            <Field
              name='Email'
              label={language.FORM__EMAIL}
              placeholder={language.FORM__EMAIL}
              disabled={isInsured && !result(emptyField, 'Email', false)}
              component={SinarmasInput}
              keyboardType='default'
              maxLength={40}
            />
            <Field
              name='CustAddress'
              label={language.FORM__ADDRESS}
              placeholder={language.FORM__ADDRESS}
              component={SinarmasInput}
              keyboardType='default'
              maxLength={40}
            />
            <Field
              name='City'
              label={language.FORM__CITY}
              placeholder={language.FORM__CITY}
              component={SinarmasInput}
              keyboardType='default'
              maxLength={40}
            />
            <Field
              name='ZipCode'
              label={language.FORM__ZIP_CODE}
              placeholder={language.FORM__ZIP_CODE}
              component={SinarmasInput}
              keyboardType='numeric'
              maxLength={5}
            />
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.buttonContinue}>
            <SinarmasButton disabled={invalid || submitting} onPress={handleSubmit} text={language.GENERIC__CONTINUE}/>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default TravelAssuranceFormCustomers;
