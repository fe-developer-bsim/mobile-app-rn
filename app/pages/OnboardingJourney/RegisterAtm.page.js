import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import RegisterFormAtm, {fields} from '../../components/OnboardingJourney/RegisterAtm.component';
import {registerATMCard as registerATMCardThunk} from '../../state/thunks/onboarding.thunks';
import {generateCaptcha as generateCaptchaTransformer} from '../../utils/transformer.util';
import {language} from '../../config/language';
import {CardIOModule} from 'react-native-awesome-card-io';
import {connect} from 'react-redux';
import result from 'lodash/result';
import * as actionCreators from '../../state/actions/index.actions';
import {NavigationActions} from 'react-navigation';

const formConfig = {
  form: 'registerATMCardForm',
  initialValues: {
    [fields.PANNUMBER]: ''
  },
  onSubmit: (values, dispatch, {isForgetPassword, simasCaptcha}) => {
    dispatch(registerATMCardThunk(values, isForgetPassword, simasCaptcha, true));
  },
  validate: (values) => {
    const {PANNUMBER, CAPTCHAINPUT} = fields;
    const cardNumber = values[PANNUMBER];
    const captchaInput = values[CAPTCHAINPUT];

    const errors = {};
    if (!cardNumber) {
      errors[PANNUMBER] = language.ONBOARDING__ATM_VALIDATION_CARD_NUM_REQUIRED;
    }

    // TODO: Visa or Mastercard Regex picked up from an online resource, need to update with a valid one
    if (!(/^(484777|639687|621445)[0-9]{10}$/g).test(cardNumber)) {
      errors[PANNUMBER] = language.ONBOARDING__ATM_VALIDATION_CARD_NUM_INVALID;
    }

    if (errors[PANNUMBER]) {
      errors['_error'] = language.ONBOARDING__ATM_VALIDATION_GENERIC_ERROR;
    }

    if (!captchaInput) {
      errors[CAPTCHAINPUT] = language.ONBOARDING__ATM_VALIDATION_CAPTCHA_REQUIRED;
    }

    return errors;
  }
};

const mapDispatchToProps = (dispatch) => ({
  setCardNumber: (cardNumber) => dispatch(change('registerATMCardForm', 'panNumber', cardNumber)),
  generateCaptcha: () => {
    const captcha = generateCaptchaTransformer();
    return dispatch(actionCreators.setCaptcha(captcha));
  },
  goToRegisterNTB: () => {
    dispatch(NavigationActions.navigate({routeName: 'IdentityThirdForm'}));
  },
  createProduct: () => {
    dispatch(NavigationActions.navigate({routeName: 'ProductsList'}));
  },
  fillForm: () => {
    dispatch(NavigationActions.navigate({routeName: 'ResetPassNoCardForm'}));
  }
});
const mapStateToProps = ({currentLanguage, captcha}) => ({currentLanguage, captcha});

const RegisterForm = reduxForm(formConfig)(RegisterFormAtm);

class RegisterScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    setCardNumber: PropTypes.func,
    generateCaptcha: PropTypes.func,
    captcha: PropTypes.object,
    goToRegisterNTB: PropTypes.func,
    createProduct: PropTypes.func,
    fillForm: PropTypes.func
  }
  componentWillMount () {
    this.props.generateCaptcha();
  }
  getCardNumber = () => {
    CardIOModule.
      scanCard({
        hideCardIOLogo: true,
        suppressManualEntry: true,
        requireExpiry: false,
        requireCVV: false,
        scanExpiry: false,
        keepStatusBarStyle: true,
        suppressConfirmation: true
      }).
      then((card) => {
        this.props.setCardNumber(card.cardNumber);
      }).catch(() => {
        // user termination - catch here
      });
  }

  registerATM = () => this.props.navigation.navigate('Login', {regisATM: true, disableEasyPinLogin: true});

  goToTermCondition = () => this.props.navigation.navigate('TermCondition')

  refreshCaptcha = () => {
    const {generateCaptcha} = this.props;
    generateCaptcha();
  }

  goToLogin = () => this.props.navigation.navigate('Login', {disableEasyPinLogin: true})

  render () {
    const {navigation, captcha, goToRegisterNTB, createProduct, fillForm} = this.props;
    const isForgetPassword = result(navigation, 'state.params.isForgetPassword', false);
    return (
      <RegisterForm scanCard={this.getCardNumber} goToRegisterNTB={goToRegisterNTB} goToTermCondition={this.goToTermCondition} isForgetPassword={isForgetPassword}
        registerATM={this.registerATM} simasCaptcha={captcha} refreshCaptcha={this.refreshCaptcha} goToLogin={this.goToLogin}
        createProduct={createProduct} fillForm={fillForm}/>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
