import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasInput, SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './EmoneyUpgrade.styles';
import {noop} from 'lodash';

export const fields = {
  EMAIL: 'email',
};

class EmoneyUpgradeEmailForm extends Component {

  render () {
    const {validationInput, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.spaceContainer}>
          <View style={styles.mainTitleContainer}>
            <Text style={styles.mainTitleTxt}>{language.EMONEY__UPGRADE_EMAIL_TITLE}</Text>
          </View>

          <View style={styles.emailContainer}>
            <Field
              name={fields.EMAIL}
              component={SinarmasInput}
              theme='primary'
              style={styles.fieldContainer}
              label={language.COMMON__EMAIL}
              placeholder={language.CREATE_ACCOUNT__EMAIL_PLACEHOLDER}
              isUseSuccessInputText={true}
              typeField={'email'}
              validationInput={validationInput}
            />
          </View>
        </View>

        <View style={styles.buttonWrapperHorizontal}>
          <SinarmasButton onPress={handleSubmit} disabled={invalid || submitting} >
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

EmoneyUpgradeEmailForm.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onSubmitPress: PropTypes.func,
  validationInput: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EmoneyUpgradeEmailForm;
