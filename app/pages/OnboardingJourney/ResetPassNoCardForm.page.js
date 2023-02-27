import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import ResetPassNoCardForm, {fields} from '../../components/OnboardingJourney/ResetPassNoCardForm.component';
import {generateCaptcha as generateCaptchaTransformer} from '../../utils/transformer.util';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import * as actionCreators from '../../state/actions/index.actions';
import {validateRequiredFields, validateRequiredStringDOB, validatePhoneNumber, validateEmail, validateKtpDukcapil, validateNumber} from '../../utils/validator.util';
import {checkUserAccount} from '../../state/thunks/onboarding.thunks';

const formConfig = {
  form: 'resetPassForm',
  onSubmit: (values, dispatch) => {
    const noCard = true;
    dispatch(checkUserAccount(noCard));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.ACCOUNT_NUMBER, fields.PHONE_NUMBER, fields.EMAIL_ADDRESS, fields.KTP_NUMBER, fields.CAPTCHAINPUT])
    };
    const validationFormat = {
      ...validateRequiredStringDOB(values, [fields.BIRTH_DATE])
    };
    return {
      phoneNumber: validatePhoneNumber(values.phoneNumber),
      emailAddress: validateEmail(values.emailAddress),
      ktpNumber: validateKtpDukcapil(values.ktpNumber),
      ...validationFormat,
      ...errors
    };
  }
};

const mapDispatchToProps = (dispatch) => ({
  generateCaptcha: () => {
    const captcha = generateCaptchaTransformer();
    return dispatch(actionCreators.setCaptcha(captcha));
  }
});
const mapStateToProps = ({currentLanguage, captcha}) => ({currentLanguage, captcha});

const ResetPassNoCard = reduxForm(formConfig)(ResetPassNoCardForm);

class ResetPassNoCardScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    generateCaptcha: PropTypes.func,
    captcha: PropTypes.object,
  }

  componentWillMount () {
    this.props.generateCaptcha();
  }

  refreshCaptcha = () => {
    const {generateCaptcha} = this.props;
    generateCaptcha();
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('accountNumber' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('phoneNumber' === typeField) {
      if (isEmpty(validatePhoneNumber(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('emailAddress' === typeField) {
      if (isEmpty(validateEmail(val))) {
        return true;
      } else {
        return false;
      }
    }
  } 

  render () {
    const {captcha} = this.props;
    return (
      <ResetPassNoCard validationInput={this.validationInput} simasCaptcha={captcha} refreshCaptcha={this.refreshCaptcha}/>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassNoCardScreen);
