import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import RegisterPhoneEmail, {fields} from '../../components/CreateNewAccount/RegisterPhoneEmailKTP.component';
import {generateCaptchaOpenProduct as generateCaptchaTransformer} from '../../utils/transformer.util';
import {connect} from 'react-redux';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import * as actionCreators from '../../state/actions/index.actions';
import {validateRequiredFields, validatePhoneNumber, validateEmail, validateAlphanumeric} from '../../utils/validator.util';
import {language} from '../../config/language';
import {checkPhoneforCCForm} from '../../state/thunks/EForm.thunks';

const formConfig = {
  form: fields.formName,
  onSubmit: (values, dispatch) => {
    dispatch(checkPhoneforCCForm());
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.PHONE, fields.CAPTCHAINPUT])};
    return {
      phone: validatePhoneNumber(values.phone),
      email: validateEmail(values.email),
      referralCode: validateAlphanumeric(values.referralCode, language.VALIDATE__REFERRAL_CODE),
      ...errors
    };
  }
};

const mapDispatchToProps = (dispatch) => ({
  generateCaptcha: () => {
    const captcha = generateCaptchaTransformer();
    return dispatch(actionCreators.setCaptcha(captcha));
  },
  setNpwpReasontoNull: (referralCodeOrami) => {
    dispatch(change('identifyUserCCForm', 'referralCode', referralCodeOrami));
  },
});
const mapStateToProps = (state) => ({currentLanguage, captcha}) => ({
  currentLanguage: currentLanguage, 
  captcha: captcha,
  ccCode: result(state, 'ccCode', '')
});

const RegisterFormPhoneEmail = reduxForm(formConfig)(RegisterPhoneEmail);

class RegisterPhoneEmailScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    setCardNumber: PropTypes.func,
    generateCaptcha: PropTypes.func,
    captcha: PropTypes.object,
    ccCode: PropTypes.string,
    setNpwpReasontoNull: PropTypes.func
  }
  componentWillMount () {
    this.props.generateCaptcha();
  }

  componentDidMount = () => {
    const {navigation, setNpwpReasontoNull} = this.props;
    const referralCodeOrami = result(navigation, 'state.params.refferalCodeOrami', '');
    setNpwpReasontoNull(referralCodeOrami);
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
    if ('email' === typeField) {
      if (isEmpty(validateEmail(val))) {
        return true;
      } else {
        return false;
      }
    }
    if ('referralCode' === typeField) {
      if (validateAlphanumeric(val, language.VALIDATE__REFERRAL_CODE)) {
        return true;
      } else {
        return false;
      }
    }
  }

  render () {
    const {navigation, captcha, ccCode} = this.props;
    const isForgetPassword = result(navigation, 'state.params.isForgetPassword', false);
    const referralCodeOrami = result(navigation, 'state.params.refferalCodeOrami', '');
    return (
      <RegisterFormPhoneEmail referralCodeOrami={referralCodeOrami} scanCard={this.getCardNumber} goToTermCondition={this.goToTermCondition} isForgetPassword={isForgetPassword}
        registerATM={this.registerATM} validationInput={this.validationInput} simasCaptcha={captcha} refreshCaptcha={this.refreshCaptcha} goToLogin={this.goToLogin} ccFormCode={ccCode}/>);
  }
}

const NewEForm = connect(mapStateToProps, mapDispatchToProps)(RegisterPhoneEmailScreen);

export default NewEForm;
