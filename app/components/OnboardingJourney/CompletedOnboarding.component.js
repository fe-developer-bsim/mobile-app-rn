import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import styles from './Onboarding.component.styles';

export const fields = {
  EASYPIN: 'easyPin',
};

class EasyPin extends Component {
  static propTypes = {
    onPress: PropTypes.func
  }

  render () {
    const {onPress, ...reduxFormProps} = this.props;
    const {invalid, submitting} = reduxFormProps;

    return (
      <View style={styles.bodyContainer}>
        <View style={[styles.columnContainer, {justifyContent: 'center'}]}>
          <Text style={styles.welcomeTextNew}>
            {language.ONBOARDING__COMPLETE_TITLE}
          </Text>
          <Text style={styles.welcomeSubTextNew}>
            {language.ONBOARDING__COMPLETE_SUBTEXT}
          </Text>
        </View>
        <View>
          <SinarmasButton buttonType='secondary' disabled={invalid || submitting} onPress={onPress} text={language.ONBOARDING__COMPLETE_BUTTON} />
        </View>
      </View>
    );
  }
}

export default EasyPin;
