import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {SinarmasButton, SinarmasPickerBoxRev, SinarmasInputBoxNewRemittance} from '../FormComponents';
import {wrapMethodInFunction, generateCurrencyRemittance, generatePurposeRemittance} from '../../utils/transformer.util';
import {Field} from 'redux-form';
import styles from './RemittanceRecipientData.style';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import {result} from 'lodash';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import * as Utils from '../../utils/transformer.util';

class RemittanceRecipientDataForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    formValues: PropTypes.object,
    accounts: PropTypes.array,
    currencyList: PropTypes.array,
    goBack: PropTypes.func,
    requireField: PropTypes.bool,
    purposeList: PropTypes.array,
    navigation: PropTypes.object,
    validationInput: PropTypes.func,
  }

  render () {
    const {currencyList, goBack, requireField, purposeList, navigation, validationInput, ...reduxFormProps} = this.props;
    const {handleSubmit, submitting} = reduxFormProps;
    const isExisting = result(navigation, 'state.params.isExisting', '') === true;
    const setNameFill = result(navigation, 'state.params.bankInformation.country', '') === 'INDONESIA' || result(navigation, 'state.params.isExisting', '') === true;
    return (
      <View style={styles.pinkBg}>
        <View style={styles.shadowWhiteBg}>
          <View style={styles.whiteBg}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraScrollHeight={120} enableOnAndroid={true}>
              <ScrollView keyboardShouldPersistTaps='handled'>
                <View style={styles.containerNew}>
                  <View style={styles.containerArrow}>
                    <Touchable onPress={goBack}>
                      <View style={{padding: 5}}>
                        <SimasIcon name={'arrow'} size={20} style={styles.arrow}/>
                      </View>
                    </Touchable>
                    <View style={styles.progressBar}>
                      <View style={[{flex: 1}, styles.redBar]}/>
                      <View style={[{flex: 1}, styles.greyBar]}/>
                    </View>
                  </View>
                  <Text style={styles.titles}>{language.REMITTANCE__SUBTITLE_RECIPIENT_DATA}</Text>
                  <View style={styles.accNumberContainer}>
                    <Field
                      name='payeeAccNo'
                      label={language.HINTTEXT__RECIPIENTDATA_ACCOUNT_NUMBER}
                      placeholder={language.HINTTEXT__RECIPIENTDATA_ACCOUNT_NUMBER}
                      disabled={isExisting}
                      component={SinarmasInputBoxNewRemittance}
                      maxLength={34}
                      typeField={'payeeAccNo'}
                      validationInput={validationInput}
                      isSwiftCode={true}
                      isRemittance={true}
                    />
                  </View>
                  <View style={styles.accNumberContainer}>
                    <Field
                      name='currency'
                      rightIcon='arrow'
                      theme='primary'
                      component={SinarmasPickerBoxRev}
                      placeholder={language.HINTTEXT__RECIPIENTDATA_SELECET_CURRENCY}
                      label={language.HINTTEXT__RECIPIENTDATA_SELECET_CURRENCY}
                      labelKey='display'
                      itemList={generateCurrencyRemittance(currencyList)}
                      isRemittance={true}
                      isCurrency={language.HINTTEXT__RECIPIENTDATA_SELECET_CURRENCY}
                    />
                  </View>
                  <View style={styles.accNumberContainer}>
                    <Field
                      name='nameRecipient'
                      label={language.REMITTANCE__NAME_TEXT}
                      placeholder={language.REMITTANCE__NAME_TEXT}
                      disabled={setNameFill}
                      component={SinarmasInputBoxNewRemittance}
                      maxLength={35}
                      format={Utils.formatFieldNote}
                      normalize={Utils.formatFieldNote}
                      isRemittance={true}
                    />
                  </View>
                  <View style={styles.accNumberContainer}>
                    <Field
                      name='countryRecipient'
                      label={language.REMITTANCE___COUNTRY_TEXT}
                      placeholder={language.HINTTEXT__REMITTANCE_COUNTRY}
                      disabled={true}
                      component={SinarmasInputBoxNewRemittance}
                      maxLength={35}
                      format={Utils.formatFieldNote}
                      normalize={Utils.formatFieldNote}
                      isRemittance={true}
                    />
                  </View>
                  <View style={styles.accNumberContainer}>
                    <Field
                      name='stateRecipient'
                      label={language.REMITTANCE___STATE_TEXT}
                      placeholder={language.HINTTEXT__REMITTANCE_STATE}
                      disabled={false}
                      component={SinarmasInputBoxNewRemittance}
                      maxLength={35}
                      format={Utils.formatFieldNote}
                      normalize={Utils.formatFieldNote}
                      isRemittance={true}
                    />
                  </View>
                  <View style={styles.accNumberContainer}>
                    <Field
                      name='adressRecipient'
                      label={language.REMITTANCE__ADDRESS_TEXT}
                      placeholder={language.REMITTANCE__ADDRESS_TEXT}
                      disabled={false}
                      component={SinarmasInputBoxNewRemittance}
                      maxLength={35}
                      format={Utils.formatFieldNote}
                      normalize={Utils.formatFieldNote}
                      isRemittance={true}
                    />
                  </View>
                  <View style={styles.accNumberContainer}>
                    <Field
                      name='purposeListRecipient'
                      labelKey='display'
                      rightIcon='arrow'
                      placeholder={language.REMITTANCE__PURPOSE_TEXT}
                      disabled={false}
                      component={SinarmasPickerBoxRev}
                      isPurpose={language.REMITTANCE__PURPOSE_TEXT}
                      itemList={generatePurposeRemittance(purposeList)}
                      theme='primary'
                      label={language.REMITTANCE__PURPOSE_TEXT}
                      isRemittance={true}
                    />
                  </View>
                  <View style={styles.accNumberContainer}>
                    <Field
                      name='descriptionRecipient'
                      label={language.REMITTANCE__DESCRIPTION_TEXT}
                      placeholder={language.REMITTANCE__DESCRIPTION_TEXT}
                      disabled={false}
                      component={SinarmasInputBoxNewRemittance}
                      maxLength={140}
                      format={Utils.formatFieldNote}
                      normalize={Utils.formatFieldNote}
                      isRemittance={true}
                    />
                  </View>
                  <View style={styles.buttonBottom}>
                    <SinarmasButton disabled={submitting || requireField} onPress={wrapMethodInFunction(handleSubmit)} text={language.SERVICE__CONTINUE_BUTTON} style={styles.nextButton}/>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAwareScrollView>
          </View>
        </View>
      </View>
    );
  }
}
export default RemittanceRecipientDataForm;
