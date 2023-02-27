import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import RegisterFormPin, {fields} from '../../components/OnboardingJourney/RegisterPin.component';
import {registerATMPin as registerATMPinThunk} from '../../state/thunks/onboarding.thunks';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {validatePinCodeLength} from '../../utils/validator.util';

const formConfig = {
  form: 'registerPINCardForm',
  destroyOnUnmount: true,
  initialValues: {
    [fields.CARDPIN]: ''
  },
  onSubmit: (values, dispatch, {isForgetPassword, panNumber, uniCode, token}) => {
    dispatch(registerATMPinThunk({panNumber, ...values}, isForgetPassword, uniCode, token));
  },
  validate: (values) => {
    const {CARDPIN} = fields;
    const cardPin = validatePinCodeLength(values[CARDPIN]);

    const errors = {};
    if (cardPin) {
      errors[CARDPIN] = cardPin;
    }

    return errors;
  }
};

const mapStateToProps = ({currentLanguage}) => ({currentLanguage}); 

const RegisterForm = reduxForm(formConfig)(RegisterFormPin);

class RegisterScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    scramble: PropTypes.bool
  }

  goToTermCondition = () => this.props.navigation.navigate('TermCondition')

  render () {
    const {navigation, scramble = true} = this.props;
    const isForgetPassword = result(navigation, 'state.params.isForgetPassword', false);
    const panNumber = result(navigation, 'state.params.panNumber', '');
    const uniCode = result(navigation, 'state.params.code', '');
    const token = result(navigation, 'state.params.token', '');
    return (
      <RegisterForm scramble={scramble} goToTermCondition={this.goToTermCondition} isForgetPassword={isForgetPassword} panNumber={panNumber} token={token} uniCode={uniCode}/>);
  }
}

export default connect(mapStateToProps)(RegisterScreen);
