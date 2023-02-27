import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import RegisterPhoneEmail, {fields} from '../../components/CreateNewSavingAccount/RegisterPhoneEmailSaving.component';
import {generateCaptchaOpenProduct as generateCaptchaTransformer} from '../../utils/transformer.util';
import {connect} from 'react-redux';
import {result, isEmpty} from 'lodash';
import * as actionCreators from '../../state/actions/index.actions';
import {validateRequiredFields, validatePhoneNumber, validateEmail, validateAlphanumeric} from '../../utils/validator.util';
import {checkPhoneforSaving} from '../../state/thunks/savingAccount.thunks';
import {language} from '../../config/language';

const formConfig = {
  form: 'identifyUserSavingForm',
  onSubmit: (values, dispatch) => {
    dispatch(checkPhoneforSaving());
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
  setOramiData: (oramiData) => {
    dispatch(change('identifyUserSavingForm', 'phone', result(oramiData, 'phoneNumber', '')));
    dispatch(change('identifyUserSavingForm', 'email', result(oramiData, 'emailUser', '')));
    dispatch(change('identifyUserSavingForm', 'referralCode', result(oramiData, 'referralCodeOrami', '')));
  },
});
const mapStateToProps = (state) => ({currentLanguage, captcha}) => ({
  currentLanguage: currentLanguage, 
  captcha: captcha,
  ccCode: result(state, 'ccCode', ''),
  oramiData: result(state, 'paramsDeeplinkObject', {})
});

const RegisterFormPhoneEmail = reduxForm(formConfig)(RegisterPhoneEmail);

class RegisterPhoneEmailScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    setCardNumber: PropTypes.func,
    generateCaptcha: PropTypes.func,
    captcha: PropTypes.object,
    ccCode: PropTypes.string,
    oramiData: PropTypes.object,
    setOramiData: PropTypes.func
  }

  state = {
    disabledOrami: false,
  }

  componentWillMount () {
    const {oramiData, ccCode} = this.props;
    if (ccCode === 'SAO-SIMOBI-002') {
      this.props.setOramiData(oramiData);
      this.setState({disabledOrami: true});
    }
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
    const {navigation, captcha} = this.props;
    const isForgetPassword = result(navigation, 'state.params.isForgetPassword', false);
    return (
      <RegisterFormPhoneEmail scanCard={this.getCardNumber} goToTermCondition={this.goToTermCondition} isForgetPassword={isForgetPassword}
        registerATM={this.registerATM} validationInput={this.validationInput} simasCaptcha={captcha} refreshCaptcha={this.refreshCaptcha} 
        goToLogin={this.goToLogin} disabledOrami={this.state.disabledOrami} />);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPhoneEmailScreen);
