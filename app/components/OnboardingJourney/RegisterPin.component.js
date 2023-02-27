import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';
import {View, Text} from 'react-native';
import {language} from '../../config/language';
import styles from './Onboarding.component.styles';
import {ScrambleKeyboard} from '../FormComponents';
import noop from 'lodash/noop';

export const fields = {
  CARDPIN: 'cardpin'
};

export default class RegisterFormPin extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    scanCard: PropTypes.func,
    isForgetPassword: PropTypes.bool,
    scramble: PropTypes.bool
  };

  render () {
    const {scramble = false,  ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const nextButtonDisabled = invalid || submitting;

    return (
      <View style={styles.pinBodyContainer}>
        <View style={styles.contentContainerStyle}>
          <Text style={styles.welcomeTextNew}>
            {language.ONBOARDING__ENTER_CARD_PIN}
          </Text>
        </View>
        <View style={styles.scrambleKeyboardContainer}>
          <Field name={fields.CARDPIN} scramble={scramble} invalid={invalid} nextButtonDisabled={nextButtonDisabled} handleSubmit={handleSubmit} component={ScrambleKeyboard}/>
        </View>
      </View>
    );
  }
}
