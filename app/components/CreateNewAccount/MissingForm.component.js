import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity, Keyboard} from 'react-native';
import {SinarmasInput, SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './CreditCard.styles';
import noop from 'lodash/noop';
import {normalizeAmount} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';

export const fields = {
  POSTAL_CODE: 'postalCode',
  EMAIL: 'email'
};

class MissingForm extends Component {

  hideKeyboard = () => {
    Keyboard.dismiss();
  };

  render () {
    const {validationInput, disabled, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    return (
      <TouchableOpacity style={styles.bodyContainerWithTerms} activeOpacity={1} onPress={this.hideKeyboard}>
        <View style={styles.spaceContainer}>
          <Text style={styles.mainTitleText}>{language.CREATE_ACCOUNT__MISSING_INFO_POSTAL}</Text>

          <View style={styles.pt20}>
            <Field
              name={fields.POSTAL_CODE}
              component={SinarmasInput}
              theme='primary'
              style={styles.fieldContainer}
              label={language.COMMON__POSTAL_CODE}
              placeholder={language.CREATE_ACCOUNT__POSTAL_PLACEHOLDER}
              isUseSuccessInputText={true}
              maxLength={5}
              typeField={'postalCode'}
              keyboardType='numeric'
              normalize={normalizeAmount}
              validationInput={validationInput}
            />

            <Field
              name={fields.EMAIL}
              component={SinarmasInput}
              theme='primary'
              style={styles.fieldContainer}
              label={language.COMMON__EMAIL}
              placeholder={language.CREATE_ACCOUNT__EMAIL_PLACEHOLDER}
              isUseSuccessInputText={true}
              maxLength={40}
              typeField={'email'}
              validationInput={validationInput}
            />
          </View>
        </View>

        <View style={styles.buttonWrapper2}>
          <View style={styles.boxedInfo}>
            <SimasIcon style={styles.iconColor} name='caution-circle' size={20}/>
            <Text style={styles.info}>{language.CREATE_ACCOUNT__COMPLETE_DETAIL}</Text>
          </View>
          <SinarmasButton onPress={handleSubmit} disabled={invalid || submitting || disabled} >
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </TouchableOpacity>
    );
  }
}

MissingForm.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onSubmitPress: PropTypes.func,
  validationInput: PropTypes.func,
  disabled: PropTypes.bool,
};

export default MissingForm;
