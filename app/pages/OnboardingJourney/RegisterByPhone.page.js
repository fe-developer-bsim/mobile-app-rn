import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import RegisterFormPhoneComponent, {fields} from '../../components/OnboardingJourney/RegisterByPhone.component';
import {generateCaptcha as generateCaptchaTransformer} from '../../utils/transformer.util';
import {connect} from 'react-redux';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import * as actionCreators from '../../state/actions/index.actions';
import {validateRequiredFields, validatePhoneNumber} from '../../utils/validator.util';
import {checkAccountType} from '../../state/thunks/onboarding.thunks';

const formConfig = {
  form: 'registerByPhoneForm',
  initialValues: {
    [fields.PHONE]: '',
    [fields.CAPTCHAINPUT]: '',
  },
  onSubmit: (values, dispatch, {simasCaptcha}) => {
    dispatch(checkAccountType(values, simasCaptcha));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.PHONE, fields.CAPTCHAINPUT])};
    return {
      phone: validatePhoneNumber(values.phone),
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

const RegisterFormPhone = reduxForm(formConfig)(RegisterFormPhoneComponent);

class RegisterPhoneScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    setCardNumber: PropTypes.func,
    generateCaptcha: PropTypes.func,
    captcha: PropTypes.object,
    fillForm: PropTypes.func
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
    if ('phone' === typeField) {
      if (isEmpty(validatePhoneNumber(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  render () {
    const {navigation, captcha, fillForm} = this.props;
    const isForgetPassword = result(navigation, 'state.params.isForgetPassword', false);
    return (
      <RegisterFormPhone scanCard={this.getCardNumber} goToTermCondition={this.goToTermCondition} isForgetPassword={isForgetPassword}
        registerATM={this.registerATM} validationInput={this.validationInput} simasCaptcha={captcha} refreshCaptcha={this.refreshCaptcha} goToLogin={this.goToLogin}
        fillForm={fillForm}/>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPhoneScreen);
