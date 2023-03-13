import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import RegisterFormAtm, {
  fields,
} from '../../components/RegisterEmoneyJourney/RegisterEmoney.component';
import {generateCaptcha as generateCaptchaTransformer} from '../../utils/transformer.util';
import {connect} from 'react-redux';
import result from 'lodash/result';
import * as actionCreators from '../../state/actions/index.actions';
import isEmpty from 'lodash/isEmpty';
import {
  validateRequiredFields,
  validateEmail,
  validatePhoneNumber,
  validateNameEform,
} from '../../utils/validator.util';
import {registerEmoney} from '../../state/thunks/onboarding.thunks';
import {StackActions, NavigationActions} from 'react-navigation';

const formConfig = {
  form: 'registerEmoneyDataForm',
  destroyOnUnmount: false,
  initialValues: {
    [fields.FULL_NAME]: '',
    [fields.PHONE]: '',
    [fields.E_MAIL]: '',
    [fields.REFERRAL]: '',
    [fields.CAPTCHAINPUT]: '',
  },
  onSubmit: (values, dispatch, {simasCaptcha}) => {
    dispatch(registerEmoney(values, simasCaptcha));
  },
  validate: values => {
    const errors = {
      ...validateRequiredFields(values, [
        fields.FULL_NAME,
        fields.PHONE,
        fields.E_MAIL,
        fields.CAPTCHAINPUT,
      ]),
    };
    return {
      fullName: validateNameEform(values.fullName),
      phone: validatePhoneNumber(values.phone),
      email: validateEmail(values.email),
      referral: values.referral,
      ...errors,
    };
  },
};

const mapDispatchToProps = dispatch => ({
  generateCaptcha: () => {
    const captcha = generateCaptchaTransformer();
    return dispatch(actionCreators.setCaptcha(captcha));
  },
  goToAtmRegis: () => {
    dispatch(
      StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({routeName: 'RegisterEmoneyScreen'}),
          NavigationActions.navigate({routeName: 'RegisterAtm'}),
        ],
      }),
    );
  },
});

const mapStateToProps = ({currentLanguage, captcha}) => ({
  currentLanguage,
  captcha,
});

const RegisterForm = reduxForm(formConfig)(RegisterFormAtm);

class RegisterScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    generateCaptcha: PropTypes.func,
    captcha: PropTypes.object,
    goToAtmRegis: PropTypes.func,
  };

  validationInput =
    () =>
    (inputProps = {}, val = '') => {
      const {typeField} = inputProps;
      if (typeField === 'fullName') {
        if (isEmpty(validateNameEform(val))) {
          return true;
        } else {
          return false;
        }
      } else if (typeField === 'phoneNumber') {
        if (isEmpty(validatePhoneNumber(val))) {
          return true;
        } else {
          return false;
        }
      } else if (typeField === 'email') {
        if (isEmpty(validateEmail(val))) {
          return true;
        } else {
          return false;
        }
      }
    };

  componentWillMount() {
    this.props.generateCaptcha();
  }

  registerATM = () => this.props.navigation.navigate('RegisterAtm');

  goToTermCondition = () => this.props.navigation.navigate('TermCondition');

  goToRegisterNTB = () => this.props.navigation.navigate('IdentityThirdForm');

  refreshCaptcha = () => {
    const {generateCaptcha} = this.props;
    generateCaptcha();
  };

  goToLogin = () =>
    this.props.navigation.navigate('Login', {disableEasyPinLogin: true});

  render() {
    const {navigation, captcha, goToAtmRegis} = this.props;
    const isForgetPassword = result(
      navigation,
      'state.params.isForgetPassword',
      false,
    );
    return (
      <RegisterForm
        scanCard={this.getCardNumber}
        goToTermCondition={this.goToTermCondition}
        isForgetPassword={isForgetPassword}
        registerATM={this.registerATM}
        goToAtmRegis={goToAtmRegis}
        validationInput={this.validationInput}
        simasCaptcha={captcha}
        refreshCaptcha={this.refreshCaptcha}
        goToLogin={this.goToLogin}
        goToRegisterNTB={this.goToRegisterNTB}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
