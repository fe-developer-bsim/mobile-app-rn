import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';
import {View, Text} from 'react-native';
import {SinarmasButton, SinarmasInput, ContactsPicker} from '../FormComponents';
import {formatMobileNumber, normaliseContactPicker} from '../../utils/transformer.util';
import noop from 'lodash/noop';
import styles from './MobileTopupForm.styles';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class MobileTopupForm extends React.Component {
  onNext = () => {
    const {goToPayment, selectedBiller} = this.props;
    goToPayment(selectedBiller);
  }
  render () {
    const {invalid, onMobileNoChange = noop, submitting, selectedBiller = {}} = this.props;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraHeight={120}>
        <Text style={styles.title}>{language.MOBILE_TOPUP__FORM_TITLE}</Text>
        <View style={styles.formContainer}>
          <Field
            name='mobileNo'
            label={language.MOBILE_TOPUP__MOBILE_NUMBER}
            placeholder={language.HINTTEXT__PHONE_NUMBER}
            component={SinarmasInput}
            format={formatMobileNumber}
            onInputChange={onMobileNoChange(selectedBiller)}
            keyboardType='numeric'
          />
          <Field name='mobileNo' normalize={normaliseContactPicker} style={styles.contactPicker} label={language.MOBILE_TOPUP__OR_SELECT_CONTACT} component={ContactsPicker}/>
        </View>
        <SinarmasButton onPress={this.onNext} disabled={invalid || submitting} text={language.SERVICE__NEXT_BUTTON} />
      </KeyboardAwareScrollView>
    );
  }
}
MobileTopupForm.propTypes = {
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  selectedBiller: PropTypes.object,
  goToPayment: PropTypes.func,
  onMobileNoChange: PropTypes.func,
};

export default MobileTopupForm;
