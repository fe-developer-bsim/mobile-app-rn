import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './TxTravelContact.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Field} from 'redux-form';
import {SinarmasInput, CheckBox, SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';

class TxTravelContact extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    navigation: PropTypes.object,
  }

  render () {
    const {handleSubmit, disabled, invalid} = this.props;
    return (
      <View>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.scrollContainer} extraHeight={120}>
          <View>
            <View style={styles.redLine}/>
            <View style={styles.bgWhite}>
              <Text style={styles.textTitle}>{language.FLIGHT__CONTACT_DETAIL}</Text>
              <Field
                name='firstName'
                label='First Name'
                placeholder='First Name'
                component={SinarmasInput}
              />
              <Field
                name='lastName'
                label='Last Name'
                placeholder='Last Name'
                component={SinarmasInput}
              />
              <Field
                name='phone'
                label='Phone'
                placeholder='Phone'
                component={SinarmasInput}
              />
              <Field
                name='email'
                label='Email'
                placeholder='Email'
                component={SinarmasInput}
              />
              <View style={styles.rowCheckBox}>
                <View style={styles.checkboxField}>
                  <Field name='template' component={CheckBox} label='' checkboxStyle={styles.checkBoxStyle}/>
                </View>
                <Text style={styles.labelCheckBox}>{language.FLIGHT__ADD_CONTACT_LABEL}</Text>
              </View>
              <Text style={styles.textPurpose}>{language.FLIGHT__PURPOSE}</Text>
            </View>
          </View>
          <View style={styles.btnConfirm}>
            <SinarmasButton onPress={handleSubmit} disabled={disabled || invalid}>
              <Text style={styles.buttonLargeTextStyle}>{language.GENERIC__CONTINUE}</Text>
            </SinarmasButton>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default TxTravelContact;
