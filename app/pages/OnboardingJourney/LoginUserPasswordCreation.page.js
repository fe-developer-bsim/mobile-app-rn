import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import {verifyUsername as verifyUsernameAPI} from './../../utils/api.util';
import AccountSettingsForm, {fields} from '../../components/OnboardingJourney/UserPasswordSettings.component';
import {setLoginAccount as setLoginAccountThunk, forgetEasyPin, setLoginAccountMigrate} from '../../state/thunks/onboarding.thunks';
import {isValidUsername, isValidPassword} from '../../utils/validator.util';
import {language} from '../../config/language';
import {connect} from 'react-redux';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import {NavigationActions} from 'react-navigation';
import {getRegexPasswordPolicy} from '../../state/thunks/passwordPolicyRegex.thunks';

const formConfig = {
  form: 'loginAccountForm',
  destroyOnUnmount: true,
  initialValues: {
    [fields.USERNAME]: '',
    [fields.PASSWORD]: '',
    [fields.CONFIRM_PASSWORD]: '',
    [fields.IS_ALLOWED_IB]: 'NO'
  },
  onSubmit: (values, dispatch, props) => {
    const action = result(props, 'action', '');
    const isResetEasypin = result(props, 'navigation.state.params.isForgetPassword', false);
    if (action === 'forgotEasyPin') {
      dispatch(forgetEasyPin(values));
    }    else if (props.isMigrate) {
      dispatch(setLoginAccountMigrate(values, props.isMigrate, props.uniCode, props.token));
    } else {
      dispatch(setLoginAccountThunk(values, isResetEasypin, props.uniCode, props.token));
    }
  },
  asyncValidate: (values, dispatch, props, blurredField) => {
    const {USERNAME, PASSWORD} = fields;
    if (result(props, 'action') === 'forgotEasyPin') {
      return new Promise((resolve, reject) => {
        // This means that the user is now focused on the Password field and the Username field is not empty
        if (blurredField === USERNAME) {
          if (!values[USERNAME]) {
            reject({
              ['_error']: language.ONBOARDING__ACCOUNT_VALIDATION_USERNAME_REQUIRED
            });
          } else if (!values[PASSWORD]) {
            reject({
              ['_error']: language.ONBOARDING__ACCOUNT_VALIDATION_PASSWORD_REQUIRED
            });
          }
        } else {
          resolve(null);
        }
      });
    } else {
      return new Promise((resolve, reject) => {
        // This means that the user is now focused on the Password field and the Username field is not empty
        if (blurredField === USERNAME) {
          if (values[USERNAME].length >= 1) {
            return verifyUsernameAPI(values[USERNAME], dispatch).then(() => {
              resolve(null);
            }).catch(() => {
              reject({
                [USERNAME]: language.ONBOARDING__ACCOUNT_VALIDATION_USERNAME_DUPLICATE
              });
            });
          } else {
            reject({
              ['_error']: language.ONBOARDING__ACCOUNT_VALIDATION_USERNAME_REQUIRED
            });
          }
        } else {
          resolve(null);
        }
      });
    }
  },
  validate: (values, props) => {
    const {USERNAME, PASSWORD, CONFIRM_PASSWORD} = fields;
    const action = result(props, 'action', '');
    const passwordPolicyRegex = result(props, 'passwordPolicyRegex', '');
    const passwordPolicyMessage = result(props, 'passwordPolicyMessage', '');
    const errors = {};
    const isForgetPassword = result(props, 'navigation.state.params.isForgetPassword', false);
    if (isForgetPassword) {
      if (!values[PASSWORD]) {
        errors['_error'] = language.ONBOARDING__ACCOUNT_VALIDATION_PASSWORD_REQUIRED;
        return errors;
      }
      const messageError = isValidPassword(values[PASSWORD], values[USERNAME], passwordPolicyRegex, passwordPolicyMessage);
      if (messageError) {
        errors['_error'] = String(messageError);
        return errors;
      }
      if (!values[CONFIRM_PASSWORD]) {
        errors['_error'] = language.ONBOARDING__ACCOUNT_VALIDATION_CONFIRM_PASSWORD_REQUIRED;
        return errors;
      }
      if (values[PASSWORD] !== values[CONFIRM_PASSWORD]) {
        errors['_error'] = language.ONBOARDING__ACCOUNT_VALIDATION_PASSWORD_NOT_MATCH;
        return errors;
      }

    } else {
      if (action === 'forgotEasyPin') {
        if (!values[USERNAME]) {
          errors['_error'] = language.ONBOARDING__ACCOUNT_VALIDATION_USERNAME_REQUIRED;
        }

        if (!values[PASSWORD]) {
          errors['_error'] = language.ONBOARDING__ACCOUNT_VALIDATION_PASSWORD_REQUIRED;
        }

      } else {
        if (!props.maskedUsername) {
          if (!isValidUsername(values[USERNAME])) {
            errors['_error'] = language.ONBOARDING__ACCOUNT_VALIDATION_USERNAME;
            return errors;
          }
        }

        if (!values[PASSWORD]) {
          errors['_error'] = language.ONBOARDING__ACCOUNT_VALIDATION_PASSWORD_REQUIRED;
          return errors;
        }
        const messageError = isValidPassword(values[PASSWORD], values[USERNAME], passwordPolicyRegex, passwordPolicyMessage);
        if (messageError) {
          errors['_error'] = String(messageError);
          return errors;
        }
        if (!values[CONFIRM_PASSWORD]) {
          errors['_error'] = language.ONBOARDING__ACCOUNT_VALIDATION_CONFIRM_PASSWORD_REQUIRED;
          return errors;
        }
        if (values[PASSWORD] !== values[CONFIRM_PASSWORD]) {
          errors['_error'] = language.ONBOARDING__ACCOUNT_VALIDATION_PASSWORD_NOT_MATCH;
          return errors;
        }
      }
    }
    return errors;
  },
  asyncBlurFields: ['username']
};

const mapStateToProps = (state) => {
  const currentLanguage = result(state, 'currentLanguage', '');
  const passwordPolicyRegex = result(state, 'passwordRegex.passReg', '');
  const passwordPolicyMessage = (result(state, 'currentLanguage.id', '')) === 'en' ? result(state, 'passwordRegex.alertChangePasswordEN_New', '') : result(state, 'passwordRegex.alertChangePasswordID_New', '');
  const toggleIB = result(state, 'form.loginAccountForm.values.isAllowedIB', '');
  return {
    currentLanguage, passwordPolicyRegex, passwordPolicyMessage, toggleIB
  };
};

const mapDispatchToProps = (dispatch) => ({
  setUsername: (maskedUsername) => dispatch(change('loginAccountForm', 'username', maskedUsername)),
  goToForgotPassword: () => {
    dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Landing'}),
      ]
    }));
    dispatch(NavigationActions.navigate({routeName: 'RegisterAtm', params: {isForgetPassword: true}}));
  },
  getRegexPasswordPolicy: () => dispatch(getRegexPasswordPolicy()),
  enableIB: (toggleCheck) => {
    dispatch(change('loginAccountForm', 'isAllowedIB', toggleCheck));
  },
});

const RegisterForm = reduxForm(formConfig)(AccountSettingsForm);

class AccountSettings extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    setUsername: PropTypes.func,
    goToForgotPassword: PropTypes.func,
    getRegexPasswordPolicy: PropTypes.func,
    passwordPolicyRegex: PropTypes.string,
    passwordPolicyMessage: PropTypes.string,
    toggleIB: PropTypes.object,
    enableIB: PropTypes.func,
  }

  componentDidMount () {
    const {navigation, setUsername} = this.props;
    const maskedUsername = result(navigation, 'state.params.maskedUsername', '');
    setUsername(maskedUsername);
  }

  componentWillMount () {
    this.props.getRegexPasswordPolicy();
  }

  state = {
    isSecureTextEntryNewPassword: true,
    isSecureTextEntryConfirmNewPassword: true,
    usernameValue: '',
    passwordValue: ''
  }

  showOrHideNewPassword = () => () => {
    if (this.state.isSecureTextEntryNewPassword) {
      this.setState({isSecureTextEntryNewPassword: false});
    } else {
      this.setState({isSecureTextEntryNewPassword: true});
    }
  }

  showOrHideConfirmNewPassword = () => () => {
    if (this.state.isSecureTextEntryConfirmNewPassword) {
      this.setState({isSecureTextEntryConfirmNewPassword: false});
    } else {
      this.setState({isSecureTextEntryConfirmNewPassword: true});
    }
  }

  setNewUsernameValue = () => (val) => {
    this.setState({usernameValue: val});
  }

  setNewPasswordValue = () => (val) => {
    this.setState({passwordValue: val});
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {passwordPolicyRegex, passwordPolicyMessage} = this.props;
    const {typeField, usernameValue, passwordValue, setNewUsernameValue, setNewPasswordValue} = inputProps;
    if ('username' === typeField) {
      setNewUsernameValue(val);
      if (isValidUsername(val)) {
        return true;
      } else {
        return false;
      }
    } else if ('password' === typeField) {
      setNewPasswordValue(val);
      if (isEmpty(isValidPassword(val, usernameValue, passwordPolicyRegex, passwordPolicyMessage))) {
        return true;
      } else {
        return false;
      }
    } else if ('confirmPassword' === typeField) {
      if (isEmpty(isValidPassword(val, usernameValue, passwordPolicyRegex, passwordPolicyMessage)) && val === passwordValue) {
        return true;
      } else {
        return false;
      }
    }
  }

  render () {
    const {navigation, goToForgotPassword, passwordPolicyRegex, passwordPolicyMessage, toggleIB, enableIB} = this.props;
    const action = result(navigation, 'state.params.action', '');
    const maskedUsername = result(navigation, 'state.params.maskedUsername', '');
    const isMigrate = result(navigation, 'state.params.isMigrate', false);
    const uniCode = result(navigation, 'state.params.code', '');
    const token = result(navigation, 'state.params.token', '');

    return (
      <RegisterForm
        isMigrate={isMigrate}
        action={action}
        forgotPassword={goToForgotPassword}
        navigation={navigation}
        passwordPolicyRegex={passwordPolicyRegex}
        passwordPolicyMessage={passwordPolicyMessage}
        maskedUsername={maskedUsername}
        showOrHideNewPassword={this.showOrHideNewPassword()}
        isSecureTextEntryNewPassword={this.state.isSecureTextEntryNewPassword}
        showOrHideConfirmNewPassword={this.showOrHideConfirmNewPassword()}
        isSecureTextEntryConfirmNewPassword={this.state.isSecureTextEntryConfirmNewPassword}
        validationInput={this.validationInput()}
        setNewUsernameValue={this.setNewUsernameValue()}
        setNewPasswordValue={this.setNewPasswordValue()}
        usernameValue={this.state.usernameValue}
        passwordValue={this.state.passwordValue}
        uniCode={uniCode}
        token={token}
        toggleIB={toggleIB}
        enableIB={enableIB}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
