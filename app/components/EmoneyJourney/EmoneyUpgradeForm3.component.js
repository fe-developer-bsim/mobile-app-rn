import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasInput, SinarmasButton, SinarmasPicker} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './EmoneyUpgradeForm.styles';
import noop from 'lodash/noop';
import {wrapMethodInFunction, formatFieldName} from '../../utils/transformer.util';

export const fields = {
  WORK: 'work',
  INCOME: 'income',
  FUND: 'fund',
};

class EmoneyUpgradeThirdForm extends Component {

  render () {
    const {validationInput, jobOptions, salaryOptions, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.spaceContainer}>
          <View style={styles.progressBar}>
            <View style={[{flex: 6}, styles.redBar]}/>
            <View style={[{flex: 4}, styles.greyBar]}/>
          </View>

          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>{language.EMONEY__UPGRADE_TITLE_FORM4}</Text>
          </View>

          <View style={styles.FieldsContainerWrapper}>
            <Field
              name={fields.WORK}
              component={SinarmasPicker}
              theme='primary'
              itemList={jobOptions}
              labelKey='label'
              style={styles.fieldContainer}
              label={language.EMONEY__WORK}
              placeholder={language.HINTTEXT__WORK}
              isUseSuccessInputText={true}
              typeField={'work'}
              validationInput={validationInput}
            />
            <Field
              name={fields.INCOME}
              component={SinarmasPicker}
              label={language.EMONEY__INCOME}
              placeholder={language.HINTTEXT__INCOME}
              itemList={salaryOptions}
              labelKey='label'
              typeField={'income'}
              validationInput={validationInput}
            />
            <Field
              name={fields.FUND}
              component={SinarmasInput}
              theme='primary'
              style={styles.fieldContainer}
              label={language.EMONEY__FUND}
              placeholder={language.HINTTEXT__FUND}
              isUseSuccessInputText={true}
              typeField={'fund'}
              validationInput={validationInput}
              format={formatFieldName}
              normalize={formatFieldName}
            />
          </View>
        </View>
      
        <View style={styles.buttonWrapper}>
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting} >
            <Text style={styles.buttonLargeTextStyle}>{language.EMONEY__SUBMIT}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }

}

EmoneyUpgradeThirdForm.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onSubmitPress: PropTypes.func,
  validationInput: PropTypes.func,
  jobOptions: PropTypes.array,
  salaryOptions: PropTypes.array
};

export default EmoneyUpgradeThirdForm;
