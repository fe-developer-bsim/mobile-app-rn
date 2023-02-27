import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import ActForm, {
  fields,
} from '../../components/RegisterEmoneyJourney/ActivationForm.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import {
  activationRegistration,
  doResetPasswordLink,
} from '../../state/thunks/onboarding.thunks';
import {isValidUsername, isValidPassword} from '../../utils/validator.util';
import {language} from '../../config/language';
import {getRegexPasswordPolicy} from '../../state/thunks/passwordPolicyRegex.thunks';
import {validateRequiredFields} from '../../utils/validator.util';

// import {Platform} from 'react-native';

const formConfig = {
  form: 'ActivationForm',
  destroyOnUnmount: false,
  onSubmit: (
    values,
    dispatch,
    {registTemp, typeActivation, firebaseEmoney, navigation}
  ) => {
    const noCard = result(navigation, 'state.params.noCard', false);
    if (typeActivation === '003') {
      dispatch(doResetPasswordLink(values, registTemp, noCard));
    } else {
      dispatch(
        activationRegistration(
          values,
          registTemp,
          firebaseEmoney,
          typeActivation
        )
      );
      if (firebaseEmoney === true) {
        // const os = Platform.OS;
        // Analytics.logEvent('REGIST_EMONEY', {device: os, step_route: '6'});
      }
    }
  },
  validate: (values, props) => {
    const errors = {
      ...validateRequiredFields(values, [
        fields.USER,
        fields.PASSWORD,
        fields.CONFPASS,
      ]),
    };
    const passwordPolicyRegex = result(props, 'passwordPolicyRegex', '');
    const passwordPolicyMessage = result(props, 'passwordPolicyMessage', '');
    const typeActivation = result(props, 'typeActivation', '');
    const userResetPassword = result(props, 'userResetPassword', '');
    if (typeActivation === '003') {
      if (!values.password) {
        errors._error =
          language.ONBOARDING__ACCOUNT_VALIDATION_PASSWORD_REQUIRED;
        return errors;
      }
      const messageError = isValidPassword(
        values.password,
        userResetPassword,
        passwordPolicyRegex,
        passwordPolicyMessage
      );
      if (messageError) {
        errors._error = String(messageError);
        return errors;
      }
      if (!values.confpass) {
        errors._error =
          language.ONBOARDING__ACCOUNT_VALIDATION_CONFIRM_PASSWORD_REQUIRED;
        return errors;
      }
      if (values.password !== values.confpass) {
        errors._error =
          language.ONBOARDING__ACCOUNT_VALIDATION_PASSWORD_NOT_MATCH;
        return errors;
      }
    } else {
      if (!props.maskedUsername) {
        if (!isValidUsername(values.user)) {
          errors._error = language.ONBOARDING__ACCOUNT_VALIDATION_USERNAME;
          return errors;
        }
      }

      if (!values.password) {
        errors._error =
          language.ONBOARDING__ACCOUNT_VALIDATION_PASSWORD_REQUIRED;
        return errors;
      }
      const messageError = isValidPassword(
        values.password,
        values.user,
        passwordPolicyRegex,
        passwordPolicyMessage
      );
      if (messageError) {
        errors._error = String(messageError);
        return errors;
      }
      if (!values.confpass) {
        errors._error =
          language.ONBOARDING__ACCOUNT_VALIDATION_CONFIRM_PASSWORD_REQUIRED;
        return errors;
      }
      if (values.password !== values.confpass) {
        errors._error =
          language.ONBOARDING__ACCOUNT_VALIDATION_PASSWORD_NOT_MATCH;
        return errors;
      }
    }
    return errors;
  }
};

const mapStateToProps = (state) => {
  const currentLanguage = result(state, 'currentLanguage', '');
  const passwordPolicyRegex = result(state, 'passwordRegex.passReg', '');
  const passwordPolicyMessage =
    result(state, 'currentLanguage.id', '') === 'en'
      ? result(state, 'passwordRegex.alertChangePasswordEN_New', '')
      : result(state, 'passwordRegex.alertChangePasswordID_New', '');
  return {
    currentLanguage,
    passwordPolicyRegex,
    passwordPolicyMessage
  };
};

const mapDispatchToProps = (dispatch) => ({
  getRegexPasswordPolicy: () => dispatch(getRegexPasswordPolicy()),
});

const RegisterForm = reduxForm(formConfig)(ActForm);

const ConnectedForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);

class ActivationForm extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    destroyForm: PropTypes.func,
    passwordPolicyRegex: PropTypes.string,
    passwordPolicyMessage: PropTypes.string,
    getRegexPasswordPolicy: PropTypes.func,
  };

  state = {
    isSecureTextEntry: true,
    isSecureTextEntry2: true
  };

  showOrHidePassword = () => () => {
    if (this.state.isSecureTextEntry) {
      this.setState({isSecureTextEntry: false});
    } else {
      this.setState({isSecureTextEntry: true});
    }
  };

  showOrHidePasswordConf = () => () => {
    if (this.state.isSecureTextEntry2) {
      this.setState({isSecureTextEntry2: false});
    } else {
      this.setState({isSecureTextEntry2: true});
    }
  };

  componentWillMount () {
    this.props.getRegexPasswordPolicy();
  }

  componentDidMount () {
    const {navigation} = this.props;
    const firebaseEmoney = result(
      navigation,
      'state.params.firebaseEmoney',
      false
    );
    if (firebaseEmoney === true) {
      // const os = Platform.OS;
      // Analytics.logEvent('REGIST_EMONEY', {device: os, step_route: '5'});
    }
  }

  setNewUsernameValue = () => (val) => {
    this.setState({usernameValue: val});
  };

  setNewPasswordValue = () => (val) => {
    this.setState({passwordValue: val});
  };

  validationInput = () => (inputProps = {}, val = '') => {
    const {passwordPolicyRegex, passwordPolicyMessage} = this.props;
    const {typeField, usernameValue, passwordValue} = inputProps;
    if ('username' === typeField) {
      this.setNewUsernameValue(val);
      if (isValidUsername(val)) {
        return true;
      } else {
        return false;
      }
    } else if ('password' === typeField) {
      this.setNewPasswordValue(val);
      if (
        isEmpty(
          isValidPassword(
            val,
            usernameValue,
            passwordPolicyRegex,
            passwordPolicyMessage
          )
        )
      ) {
        return true;
      } else {
        return false;
      }
    } else if ('confpass' === typeField) {
      if (
        isEmpty(
          isValidPassword(
            val,
            usernameValue,
            passwordPolicyRegex,
            passwordPolicyMessage
          )
        ) &&
        val === passwordValue
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  render () {
    const {
      navigation,
      passwordPolicyRegex,
      passwordPolicyMessage,
    } = this.props;
    const mobileNumberReset = result(
      navigation,
      'state.params.res.activationData.mobileNumber'
    );
    const registTemp = result(
      navigation,
      'state.params.res.activationData',
      {}
    );
    const emailToken = result(navigation, 'state.params.emailToken', '');
    const typeActivation = result(
      navigation,
      'state.params.typeActivation',
      ''
    );
    const userResetPasswordRaw = result(
      navigation,
      'state.params.userResetPasswordRaw',
      ''
    );
    const firebaseEmoney = result(
      navigation,
      'state.params.firebaseEmoney',
      false
    );

    return (
      <ConnectedForm
        navigation={navigation}
        validationInput={this.validationInput()}
        passwordPolicyRegex={passwordPolicyRegex}
        passwordPolicyMessage={passwordPolicyMessage}
        showOrHidePassword={this.showOrHidePassword()}
        showOrHidePasswordConf={this.showOrHidePasswordConf()}
        isSecureTextEntry={this.state.isSecureTextEntry}
        isSecureTextEntry2={this.state.isSecureTextEntry2}
        registTemp={registTemp}
        emailToken={emailToken}
        typeActivation={typeActivation}
        mobileNumberReset={mobileNumberReset}
        userResetPassword={userResetPasswordRaw}
        firebaseEmoney={firebaseEmoney}
      />
    );
  }
}

const ConnectedFormPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivationForm);
export default ConnectedFormPage;
