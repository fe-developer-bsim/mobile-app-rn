import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity, Keyboard} from 'react-native';
import {SinarmasInput, SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './CreditCard.styles';
import noop from 'lodash/noop';
import SimasIcon from '../../assets/fonts/SimasIcon';

class CreditCardForm1 extends Component {

  hideKeyboard = () => {
    Keyboard.dismiss();
  };

  render () {
    const {validationInput, disabled, ccFormCode, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    return (
      <TouchableOpacity style={styles.bodyContainerWithTerms} activeOpacity={1} onPress={this.hideKeyboard}>
        <View style={styles.spaceContainer}>
          {ccFormCode === 'CCO-SIMOBI-002' ? 
            <Text style={styles.mainTitleText}>
              {language.CREATE_ACCOUNT__MISSING_INFO_ORAMI}
            </Text>
            :
            <Text style={styles.mainTitleText}>{language.CREATE_ACCOUNT__MISSING_INFO}</Text>
          } 

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
            <Text style={styles.fieldFooter}>{language.CREATE_ACCOUNT__EMAIL_FOOTER}</Text>
          </View>
        </View>

        <View style={styles.buttonWrapper2}>
          <View style={styles.boxedInfo}>
            <SimasIcon style={styles.iconColor} name='caution-circle' size={20}/>
            <View>
              <Text style={styles.info}>{language.CREATE_ACCOUNT__COMPLETE_DETAIL}</Text>
              {
                ccFormCode === 'CCO-SIMOBI-002' ?
                  <Text style={styles.info}>{language.CREATE_ACCOUNT__EMAIL_DETAIL}</Text>
                  : null
              }
            </View>
          </View>
          <SinarmasButton onPress={handleSubmit} disabled={invalid || submitting || disabled} >
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </TouchableOpacity>
    );
  }
}

CreditCardForm1.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onSubmitPress: PropTypes.func,
  validationInput: PropTypes.func,
  disabled: PropTypes.bool,
  ccFormCode: PropTypes.string
};

export default CreditCardForm1;
