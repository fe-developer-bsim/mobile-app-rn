import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isEmptyOrNull} from '../../utils/transformer.util';
import {map, result} from 'lodash';
import {ConnectedEFormComponent} from './RenderDigitalEForm.component';
import {Text, View} from 'react-native';
import {change} from 'redux-form';
import styles from './DigitalEForm.styles';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {requestEmailOtp} from '../../state/thunks/digitalAccountOpening.thunks';

class DigitalEFormEmailInput extends Component {
  static propTypes = {
    page: PropTypes.object,
    initialValues: PropTypes.object,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    prefilledEmail: PropTypes.func,
    pageName: PropTypes.string,
    formName: PropTypes.string,
    requestEmailOtp: PropTypes.func
  }

  componentWillMount () {
    const {initialValues} = this.props;
    const email = result(initialValues, 'email', '');
    if (email !== '') {
      this.props.prefilledEmail(email);
    }
  }

  render () {
    const {page, pageName, formName, invalid, submitting, requestEmailOtp} = this.props;
    const {fields, header, style} = page;

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithTerms} style={styles[style]} keyboardShouldPersistTaps='handled'>
        <View>
          {
            isEmptyOrNull(header) ? null :
              typeof (header) === 'object' ? 
                map(header, (headerText) => <Text style={styles.mainTitleText}>{language[headerText]}</Text>)
                :
                <Text style={styles.mainTitleText}>{language[header]}</Text>
          }

          {
            map(fields, (component) => (
              <ConnectedEFormComponent key={`${formName}/${component.code}`} {...component} fieldName={component.code}/>
            ))
          }
        </View>

        <View style={styles.buttonContainer}>
          <SinarmasButton onPress={requestEmailOtp(pageName)} disabled={invalid || submitting}>
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>);
  }
}

const loanSimulationState = () => ({});

const loanSimulationDispatch = (dispatch) => ({
  prefilledEmail: (email) => {
    dispatch(change('DigitalEForm', 'email', email));
  },
  requestEmailOtp: (pageName) => () => {
    dispatch(requestEmailOtp(pageName));
  }
});

const ConnectedEFormEmailInput = connect(loanSimulationState, loanSimulationDispatch)(DigitalEFormEmailInput);

export default ConnectedEFormEmailInput;