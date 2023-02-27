/* eslint-disable */
import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isEmpty, result, noop} from 'lodash';
import {Field} from 'redux-form';
import {Text, View} from 'react-native';
import styles from './DigitalEForm.styles';
import {language} from '../../config/language';
import {SinarmasButton, RadioButtonOpenAccNoLine} from '../FormComponents';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class DigitalEFormCustConsent extends Component {
  static propTypes = {
    page: PropTypes.object,
    initialValues: PropTypes.object,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    pageName: PropTypes.string,
    formName: PropTypes.string,
    setImageData: PropTypes.func,
    handleSubmit: PropTypes.func,
    value: PropTypes.object
  }

  render () {
    const {page, invalid, submitting, handleSubmit = noop, value} = this.props;
    const {code, style, option, titleID, titleEN, contentID, contentEN} = page;
    const header = language === 'id' ? titleID : titleEN;
    const content = language === 'id' ? contentID : contentEN;
    const disable = isEmpty(value);

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithTerms} style={styles[style]} keyboardShouldPersistTaps='handled'>
        <View>
          <Text style={styles.mainTitleTextCenter}>{header}</Text>

          <View style={styles.content}>
            <Text style={styles.mainContentText}>{content}</Text>
          </View>

          <View style={styles.rdButton}>
            <Field name={code}
              component={RadioButtonOpenAccNoLine}
              options={option}
              labelBold={true}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <SinarmasButton onPress={handleSubmit} disabled={invalid || submitting || disable}>
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>);
  }
}

const loanSimulationState = (state) => ({
  value: result(state, 'form.DigitalEForm.values.2~19', {})
});

const ConnectedEFormUpload = connect(loanSimulationState, null)(DigitalEFormCustConsent);

export default ConnectedEFormUpload;