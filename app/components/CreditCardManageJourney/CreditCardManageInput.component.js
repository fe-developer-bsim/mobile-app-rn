import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './CreditCardManageInput.style';
import noop from 'lodash/noop';
import {SinarmasInput, SinarmasButton, RadioButton} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {wrapMethodInFunction, normalizeDate, formatFieldAmount, normalizeAmount, formatFieldName} from '../../utils/transformer.util';
import result from 'lodash/result';

class CreditCardManageInput extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    data: PropTypes.object,
    options: PropTypes.array
  }

  render () {
    const {invalid, submitting, handleSubmit = noop, data, options = []} = this.props;
    const menu = result(data, 'label');
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraHeight={120}>
        <Text style={styles.titleText}>{result(data, 'title')}</Text>
        <Text style={styles.subtext}>{result(data, 'subtitle')}</Text>
        <View style={styles.formContainer}>
          <Field
            name='creditCardName'
            label={language.CREDIT_CARD_MANAGE__CREDIT_CARD_NAME}
            placeholder={language.HINTTEXT__NAME}
            format={formatFieldName}
            normalize={formatFieldName}
            component={SinarmasInput}
            keyboardType='default'
          />
          <Field
            name='creditCardBirth'
            label={language.CREDIT_CARD_MANAGE__CREDIT_CARD_BIRTH}
            placeholder={language.HINTTEXT__BIRTHDATE}
            normalize={normalizeDate}
            component={SinarmasInput}
            keyboardType='numeric'
            maxLength={10}
          />
          {
            menu === 'ChangeLimit' ?
              <View>
                <Field
                  name='limit'
                  label={language.CREDIT_CARD_MANAGE__INPUT_CREDIT_CARD_CHANGE_LIMIT}
                  placeholder={language.HINTTEXT__CREDIT_CARD_LIMIT}
                  component={SinarmasInput}
                  keyboardType='numeric'
                  format={formatFieldAmount}
                  normalize={normalizeAmount}
                />
              </View> :
              <View>
                <Text style={styles.formHeader}>{language.CREDIT_CARD_MANAGE__INPUT_CREDIT_CARD_CHANGE_STATUS}</Text>
                <Field name='status' component={RadioButton} options={options}/>
              </View>
          }
        </View>
        <SinarmasButton disabled={invalid || submitting} onPress={wrapMethodInFunction(handleSubmit)} text={language.SERVICE__NEXT_BUTTON} />
      </KeyboardAwareScrollView>
    );
  }
}

export default CreditCardManageInput;
