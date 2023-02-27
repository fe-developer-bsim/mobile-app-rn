import React, {Component} from 'react';
import {View, Text} from 'react-native';
import SinarmasInput from '../FormComponents/SinarmasInput/SinarmasInput.component';
import {SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './PasswordValidate.styles';
import noop from 'lodash/noop';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';

class PasswordValidate extends Component {
  static propTypes={
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    error: PropTypes.string,
    buttonText: PropTypes.string,
  }

  render () {
    const {handleSubmit = noop, submitting, invalid, buttonText} = this.props;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'  contentContainerStyle={styles.bodyContainer} extraHeight={120}>
        <View style={styles.columnContainer}>
          <Field
            name={'oldEasyPin'}
            label={language.PROFILE__EASYPIN_OLD}
            placeholder={language.PROFILE__EASYPIN_OLD}
            style={styles.input}
            secureTextEntry={true}
            component={SinarmasInput}
            maxLength={6}
            keyboardType='numeric'
            submitHandler={wrapMethodInFunction(handleSubmit)}
          />
          <Field
            name={'easyPin'}
            label={language.PROFILE__EASYPIN_NEW}
            placeholder={language.PROFILE__EASYPIN_NEW}
            style={styles.input}
            secureTextEntry={true}
            component={SinarmasInput}
            maxLength={6}
            keyboardType='numeric'
            submitHandler={wrapMethodInFunction(handleSubmit)}
          />
          <Field
            name={'easyPin2'}
            label={language.PROFILE__EASYPIN_NEW_CONFIRM}
            placeholder={language.PROFILE__EASYPIN_NEW_CONFIRM}
            style={styles.input}
            secureTextEntry={true}
            component={SinarmasInput}
            maxLength={6}
            keyboardType='numeric'
            submitHandler={wrapMethodInFunction(handleSubmit)}
          />
        </View>
        <View>
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting}>
            <Text style={styles.button}>{buttonText ? buttonText : language.PROFILE__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default PasswordValidate;
