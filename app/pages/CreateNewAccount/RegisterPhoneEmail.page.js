import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import RegisterPhoneEmail, {
  fields,
} from '../../components/CreateNewAccount/RegisterPhoneEmail.component';
import {generateCaptchaOpenProduct as generateCaptchaTransformer} from '../../utils/transformer.util';
import {connect} from 'react-redux';
import {result, isEmpty} from 'lodash';
import * as actionCreators from '../../state/actions/index.actions';
import {
  validateRequiredFields,
  validatePhoneNumber,
  validateAlphanumeric,
  validateName,
} from '../../utils/validator.util';
import {language} from '../../config/language';

// import {Platform} from 'react-native';
import {verifyPhoneNumberSendEmail} from '../../state/thunks/ccEform.thunks';

const formConfig = {
  form: 'identifyUserForm',
  onSubmit: (values, dispatch, {firebaseEmoney}) => {
    dispatch(verifyPhoneNumberSendEmail(firebaseEmoney));
    if (firebaseEmoney === true) {
      // const os = Platform.OS;
      // Analytics.logEvent('REGIST_EMONEY', {device: os, step_route: '4'});
    }
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [
        fields.NAME,
        fields.PHONE,
        fields.CAPTCHAINPUT,
      ]),
    };
    return {
      phone: validatePhoneNumber(values.phone),
      referralCode: validateAlphanumeric(
        values.referralCode,
        language.VALIDATE__REFERRAL_CODE
      ),
      ...errors
    };
  }
};

const mapDispatchToProps = (dispatch) => ({
  generateCaptcha: () => {
    const captcha = generateCaptchaTransformer();
    return dispatch(actionCreators.setCaptcha(captcha));
  },
  prefilledOramiCode: (referralCodeOrami) => {
    dispatch(change('identifyUserForm', 'referralCode', referralCodeOrami));
  },
  setOramiData: (oramiData) => {
    dispatch(
      change('identifyUserForm', 'phone', result(oramiData, 'phoneNumber', ''))
    );
    dispatch(
      change('identifyUserForm', 'email', result(oramiData, 'emailUser', ''))
    );
    dispatch(
      change(
        'identifyUserForm',
        'referralCode',
        result(oramiData, 'referralCodeOrami', '')
      )
    );
  },
});
const mapStateToProps = (state) => ({currentLanguage, captcha}) => ({
  currentLanguage: currentLanguage,
  captcha: captcha,
  ccCode: result(state, 'ccCode', ''),
  oramiData: result(state, 'paramsDeeplinkObject', {}),
});

const RegisterFormPhoneEmail = reduxForm(formConfig)(RegisterPhoneEmail);

class RegisterPhoneEmailScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    setCardNumber: PropTypes.func,
    generateCaptcha: PropTypes.func,
    captcha: PropTypes.object,
    prefilledOramiCode: PropTypes.func,
    ccCode: PropTypes.string,
    oramiData: PropTypes.object,
    setOramiData: PropTypes.func,
  };

  state = {
    disabledOrami: false,
  };

  componentWillMount () {
    const {oramiData, ccCode} = this.props;
    if (ccCode === 'SAO-SIMOBI-002') {
      this.props.setOramiData(oramiData);
      this.setState({disabledOrami: true});
    }
    this.props.generateCaptcha();
  }

  componentDidMount = () => {
    const {navigation, prefilledOramiCode} = this.props;
    const referralCodeOrami = result(
      navigation,
      'state.params.refferalCodeOrami',
      ''
    );
    const firebaseEmoney = result(
      navigation,
      'state.params.firebaseEmoney',
      false
    );
    if (firebaseEmoney === true) {
      // const os = Platform.OS;
      // Analytics.logEvent('REGIST_EMONEY', {device: os, step_route: '3'});
    }
    if (referralCodeOrami !== '') {
      prefilledOramiCode(referralCodeOrami);
    }
  };

  refreshCaptcha = () => {
    const {generateCaptcha} = this.props;
    generateCaptcha();
  };

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('name' === typeField) {
      if (isEmpty(validateName(val))) {
        return true;
      } else {
        return false;
      }
    }
    if ('phone' === typeField) {
      if (isEmpty(validatePhoneNumber(val))) {
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
  };

  render () {
    const {navigation, captcha} = this.props;
    const isForgetPassword = result(
      navigation,
      'state.params.isForgetPassword',
      false
    );
    const referralCodeOrami = result(
      navigation,
      'state.params.refferalCodeOrami',
      ''
    );
    const firebaseEmoney = result(
      navigation,
      'state.params.firebaseEmoney',
      false
    );
    return (
      <RegisterFormPhoneEmail
        referralCodeOrami={referralCodeOrami}
        scanCard={this.getCardNumber}
        goToTermCondition={this.goToTermCondition}
        isForgetPassword={isForgetPassword}
        registerATM={this.registerATM}
        validationInput={this.validationInput}
        simasCaptcha={captcha}
        refreshCaptcha={this.refreshCaptcha}
        goToLogin={this.goToLogin}
        disabledOrami={this.state.disabledOrami}
        firebaseEmoney={firebaseEmoney}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPhoneEmailScreen);
