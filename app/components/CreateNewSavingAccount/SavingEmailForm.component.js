import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity, Keyboard} from 'react-native';
import {SinarmasInput, SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './SavingAccount.style';
import noop from 'lodash/noop';
import SimasIcon from '../../assets/fonts/SimasIcon';

class SavingEmailForm extends Component {

  hideKeyboard = () => {
    Keyboard.dismiss();
  };

  render () {
    const {validationInput, disabled, productCode, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    return (
      <TouchableOpacity style={styles.bodyContainerWithTerms} activeOpacity={1} onPress={this.hideKeyboard}>
        <View style={styles.spaceContainer}>
          <Text style={styles.mainTitleText}>{language.CREATE_ACCOUNT__MISSING_INFO}</Text>
          <View style={styles.pt20}>
            <Field
              name='email'
              component={SinarmasInput}
              theme='primary'
              style={styles.fieldContainer}
              label={language.COMMON__EMAIL}
              placeholder={language.CREATE_ACCOUNT__EMAIL_PLACEHOLDER}
              isUseSuccessInputText={true}
              maxLength={40}
              typeField={'ktpId'}
              validationInput={validationInput}
            />
            <Text style={styles.fieldFooter}>{productCode.includes('SA-T') ? language.SIMAS_TARA__EMAIL_FOOTER : language.CREATE_ACCOUNT__EMAIL_FOOTER}</Text>
          </View>
        </View>

        <View style={styles.buttonWrapper2}>
          { productCode.includes('SA-T') ? 
            null :
            <View style={styles.boxedInfo}>
              <View>
                <SimasIcon style={styles.iconColor} name='caution-circle' size={20}/>
              </View>
              <View>
                <Text style={styles.info}>{language.CREATE_ACCOUNT__COMPLETE_DETAIL}</Text>
              </View>
            </View>
          }
          <SinarmasButton onPress={handleSubmit} disabled={invalid || submitting || disabled} >
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </TouchableOpacity>
    );
  }
}

SavingEmailForm.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onSubmitPress: PropTypes.func,
  validationInput: PropTypes.func,
  disabled: PropTypes.bool,
  productCode: PropTypes.string
};

export default SavingEmailForm;
