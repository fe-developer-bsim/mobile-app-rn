import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasInput, SinarmasButton, SinarmasPicker, DatePicker} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './EmoneyUpgradeForm.styles';
import noop from 'lodash/noop';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import {formatFieldName, normalizeNumber, formatFieldAccount} from '../../utils/transformer.util';

export const fields = {
  MARITAL_STATUS: 'maritalStatus',
  BIRTH_DATE: 'birthDate',
  ID_CARD_NUMBER: 'idNumber',
  MOTHER_MAIDEN_NAME: 'mothersMaidenName',
};

class EmoneyUpgradeForm extends Component {
  
  state={
    checked: true,
  }

  toogleCheckbox= () => {
    if (this.state.checked === true) {
      this.setState({checked: false});
    } else {
      this.setState({checked: true});
      this.props.expirydateNull();
    }
  }

  render () {
    const {validationInput, statusOptions, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const maxDate = new Date();

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.spaceContainer}>
          <View style={styles.progressBar}>
            <View style={[{flex: 3}, styles.redBar]}/>
            <View style={[{flex: 7}, styles.greyBar]}/>
          </View>

          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>{language.EMONEY__UPGRADE_TITLE_FORM}</Text>
          </View>

          <View style={styles.FieldsContainerWrapper}>
            <Field
              name={fields.ID_CARD_NUMBER}
              component={SinarmasInput}
              theme='primary'
              style={styles.fieldContainer}
              maxLength={16}
              label={language.EMONEY__ID_CARD_NUMBER}
              placeholder={language.HINTTEXT__ID_CARD_NUMBER}
              isUseSuccessInputText={true}
              typeField={'idNumber'}
              keyboardType='numeric'
              validationInput={validationInput}
              format={formatFieldAccount}
              normalize={normalizeNumber}
            />
            <Field
              name={fields.MARITAL_STATUS}
              component={SinarmasPicker}
              theme='primary'
              style={styles.fieldContainer}
              label={language.EMONEY__STATUS}
              labelKey='label'
              placeholder={language.HINTTEXT__STATUS}
              itemList={statusOptions}
              isUseSuccessInputText={true}
              typeField={'maritalStatus'}
              validationInput={validationInput}
            />
            <Field
              name={fields.BIRTH_DATE}
              component={DatePicker}
              label={language.EMONEY__BIRTHDATE}
              maximumDate={maxDate}
              minimumDate={'01/01/1900'}
              date={maxDate}   
            />
           
            <Field
              name={fields.MOTHER_MAIDEN_NAME}
              component={SinarmasInput}
              theme='primary'
              style={styles.fieldContainer}
              maxLength={16}
              label={language.EMONEY__MOTHER_MAIDEN}
              placeholder={language.HINTTEXT__MOTHER_MAIDEN}
              isUseSuccessInputText={true}
              typeField={'mothersMaiden'}
              validationInput={validationInput}
              normalize={formatFieldName}
              format={formatFieldName}
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

EmoneyUpgradeForm.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onSubmitPress: PropTypes.func,
  validationInput: PropTypes.func,
  genderOptions: PropTypes.array,
  statusOptions: PropTypes.array,
  provinceOptions: PropTypes.array,
  nationalityOptions: PropTypes.array,
  idCardType: PropTypes.array,
  cityOptions: PropTypes.array,
  idType: PropTypes.string,
  setIdType: PropTypes.func,
  filteredStatus: PropTypes.func,
  toogleCheckbox: PropTypes.func,
  hidden: PropTypes.bool,
  expirydateNull: PropTypes.func,
  yesterday: PropTypes.object,
};

export default EmoneyUpgradeForm;
