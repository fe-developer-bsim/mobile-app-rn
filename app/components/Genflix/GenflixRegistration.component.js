import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Field} from 'redux-form';
import {SelectSourceAccount, SinarmasTncBox, SinarmasButton} from '../FormComponents';
import styles from './GenflixRegistration.styles';
import GenflixUsername from './TextBoxWithSpinner.component';
import GenflixPassword from './PasswordField.component';
import {language} from '../../config/language';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

export const fields = {
  formName: 'genflixRegistrationForm',
  username: 'genflixUsername',
  password: 'genflixPassword',
  tnc: 'genflixTnC',
  sourceAccount: 'genflixSourceAccount',
};

class GenflixRegistration extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    handleQuery: PropTypes.func,
    isHidden: PropTypes.bool,
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    setEmail: PropTypes.func,
    email: PropTypes.string,
  }

  componentDidMount = () => {
    const {setEmail, email, handleQuery} = this.props;
    setEmail(email);
    handleQuery(email);
  }

  render () {
    const {isLoading, handleQuery, isHidden, disabled, invalid, submitting, handleSubmit = noop, email} = this.props;
    return (
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container}>      
        <Field 
          name={fields.sourceAccount}
          component={SelectSourceAccount}
          formName={fields.formName}
          fieldName={fields.sourceAccount}
          sourceType={'genericBiller'}
        />
        <View style={styles.bodyContainer}>
          <View style={styles.paddingBottom10}>
            <GenflixUsername label={language.LOGIN__USERNAME} placeholder={language.COMMON__EMAIL} maxLength={50} fieldName={fields.username} onBlur={handleQuery} isLoading={isLoading} disabled={!!email}/>
            <Text>{language.GENFLIX__REGISTRATION_USERNAME_NOTES}</Text>
          </View>
          {
            isHidden ? 
              null :
              <View style={styles.paddingBottom10}>
                <GenflixPassword label={language.LOGIN__ENTER_PASSWORD} placeholder={`${language.LOGIN__ENTER_PASSWORD} ${language.GENFLIX__PASSWORD_REQUIREMENTS}`} maxLength={20} fieldName={fields.password}/>
                <Text>{language.GENFLIX__REGISTRATION_PASSWORD_NOTES}</Text>
              </View>
          }
          <Field 
            name={fields.tnc}
            fieldName={fields.tnc}
            formName={fields.formName}
            component={SinarmasTncBox}
          />
          <View style={styles.buttonContainer}>
            <SinarmasButton disabled={disabled || invalid || submitting} onPress={handleSubmit} text={language.GENERIC__CONTINUE}/>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default GenflixRegistration;