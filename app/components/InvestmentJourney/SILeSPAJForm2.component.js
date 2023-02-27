import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasIconInput, SinarmasButton, SinarmasInput} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from '../../components/InvestmentJourney/SILeSPAJForm2.styles';
import {noop} from 'lodash';
import {formatFieldNote, formatFieldAccount} from '../../utils/transformer.util';
import Touchable from '../Touchable.component';

export const fields = {
  PROVINCE: 'province',
  CITY: 'city',
  POSTAL_CODE: 'postalCode',
  RT: 'rt',
  RW: 'rw',
  STREET_ADDRESS: 'streetAddress',
  PHONE_NUMBER: 'phoneNumber',
  MOBILE_NUMBER: 'mobileNumber',
  EMAIL: 'email',
};

class SmartInvestaLinkForm2 extends Component {

  render () {
    const {validationInput, mobileNumberWA, email, goToSearchableList, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View>
          <View style={styles.SilTitleHeaderView}>
            <Text style={styles.SilTitleHeader}>{language.SMART__INVESTA_LINK_DETAIL_HEADER2}</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[{flex: 3}, styles.redBar]}/>
            <View style={[{flex: 7}, styles.greyBar]}/>
          </View>

          <View>
            <Text style={styles.mainTitleText}>{language.SIL__ESPAJ_TITLE2}</Text>
          </View>
          
          <View style={styles.FieldsContainerWrapper}>
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
              normalize={formatFieldNote}
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
                  format={formatFieldAccount}
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
                  normalize={formatFieldAccount}

                />
              </View>
            </View>
            <Touchable onPress={goToSearchableList}>
              <Field
                name={fields.CITY}
                component={SinarmasInput}
                theme='primary'
                style={styles.fieldContainer}
                labelKey='cityName'
                label={language.EMONEY__CITY}
                placeholder={language.EMONEY__CITY}
                typeField={'city'}
                disabled={true}
              />
            </Touchable>
            <Field
              name={fields.PROVINCE}
              component={SinarmasInput}
              style={styles.fieldContainer}
              label={language.EMONEY__PROVINCE}
              placeholder={language.EMONEY__PROVINCE}
              typeField={'province'}
              disabled={true}
            />
            <Field
              name={fields.POSTAL_CODE}
              component={SinarmasIconInput}
              theme='primary'
              style={styles.fieldContainer}
              label={language.EMONEY__POSTAL_CODE}
              placeholder={language.EMONEY__POSTAL_CODE}
              isUseSuccessInputText={true}
              typeField={'postalCode'}
              maxLength={5}
              keyboardType={'numeric'}
              validationInput={validationInput}
              normalize={formatFieldAccount}
            />
            <Field
              name={fields.PHONE_NUMBER}
              component={SinarmasIconInput}
              theme='primary'
              style={styles.fieldContainer}
              label={language.SIL__PHONE_NUMBER}
              placeholder={language.SIL__HINTTEXT_PHONE_NUMBER}
              isUseSuccessInputText={true}
              typeField={'phoneNumber'}
              keyboardType={'numeric'}
              validationInput={validationInput}
              maxLength={11}
              normalize={formatFieldAccount}
            />
            <View style={styles.mobileNumbeContainer}>
              <Text style={styles.pageTitleName}>{language.SIL__MOBILE_NUMBER_WA}</Text>
              <Text style={styles.titleNameProduct}> {mobileNumberWA}</Text>
            </View>
            <View style={styles.phoneNumberField}>
              <Field
                name={fields.MOBILE_NUMBER}
                component={SinarmasIconInput}
                theme='primary'
                style={styles.fieldContainer}
                label={language.SIL__MOBILE_NUMBER}
                placeholder={language.SIL__HINTTEXT_MOBILE_NUMBER}
                isUseSuccessInputText={true}
                typeField={'mobileNumber'}
                validationInput={validationInput}
                maxLength={12}
                keyboardType={'numeric'}
                normalize={formatFieldAccount}
              />
            </View>
            <View>
              <Text style={styles.pageTitleName}>{language.SIL__EMAIL}</Text>
              <Text style={styles.titleNameProduct}>{email}</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <SinarmasButton onPress={handleSubmit} disabled={invalid || submitting} >
            <Text style={styles.buttonLargeTextStyle}>{language.GENERIC__CONTINUE}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

SmartInvestaLinkForm2.propTypes = {
  onSubmitPress: PropTypes.func,
  validationInput: PropTypes.func,
  prefilledProvince: PropTypes.func,
  cityListSIL: PropTypes.object,
  setProvinceCity: PropTypes.func,
  mobileNumberWA: PropTypes.string,
  email: PropTypes.string,
  goToSearchableList: PropTypes.func
};

export default SmartInvestaLinkForm2;
