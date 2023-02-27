import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import RegisterFormAtm, {fields} from '../../components/NewToBankOnboarding/IdentitySecondForm.component';
import {getFormDataNTB} from '../../state/thunks/onboarding.thunks';
import {generateCaptchaForNTB as generateCaptchaTransformer} from '../../utils/transformer.util';
import {language} from '../../config/language';
import {connect} from 'react-redux';
import * as actionCreators from '../../state/actions/index.actions';
import result from 'lodash/result';

const formConfig = {
  form: 'registerNTBForm',
  onSubmit: (values, dispatch, {formFillData, simasCaptcha}) => {
    dispatch(getFormDataNTB(values, formFillData, simasCaptcha));
  },
  validate: (values) => {
    const {CAPTCHAINPUT} = fields;
    const captchaInput = values[CAPTCHAINPUT];
    const errors = {};

    if (!captchaInput) {
      errors[CAPTCHAINPUT] = language.ONBOARDING__ATM_VALIDATION_CAPTCHA_REQUIRED;
    }

    return errors;
  }
};

const mapDispatchToProps = (dispatch) => ({
  generateCaptcha: () => {
    const captcha = generateCaptchaTransformer();
    return dispatch(actionCreators.setCaptcha(captcha));
  }
});
const mapStateToProps = ({currentLanguage, captcha}) => ({currentLanguage, captcha});

const RegisterForm = reduxForm(formConfig)(RegisterFormAtm);

class RegisterScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    generateCaptcha: PropTypes.func,
    captcha: PropTypes.object
  }
  componentWillMount () {
    this.props.generateCaptcha();
  }

  refreshCaptcha = () => {
    const {generateCaptcha} = this.props;
    generateCaptcha();
  }

  render () {
    const {navigation, captcha} = this.props;
    const formFillData = result(navigation, 'state.params', {});
    return (
      <RegisterForm simasCaptcha={captcha} refreshCaptcha={this.refreshCaptcha} formFillData={formFillData}/>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
