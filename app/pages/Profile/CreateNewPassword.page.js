import React from 'react';
import PropTypes from 'prop-types';
import CreateNewPassword from '../../components/CreateNewPassword/CreateNewPassword.component.js';
import {reduxForm} from 'redux-form';
import {validateRequiredFields, validateCreatePassword, validateFieldsMatch} from '../../utils/validator.util';
import {changePassword} from '../../state/thunks/profile.thunks';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import {connect} from 'react-redux';
import {getRegexPasswordPolicy} from '../../state/thunks/passwordPolicyRegex.thunks';

const formConfig = {
  form: 'CreateNewPassword',
  validate: (values, {oldPassword, userName, passwordPolicyRegex, passwordPolicyMessage}) => ({
    newPassword: validateCreatePassword(values.newPassword, oldPassword, userName, passwordPolicyRegex, passwordPolicyMessage),
    confirmNewPassword: validateFieldsMatch(values.confirmNewPassword, values.newPassword),
    ...validateRequiredFields(values, ['newPassword', 'confirmNewPassword']),
  }),
  onSubmit: (values, dispatch, {isSetNewCredential, isSearch}) => {
    dispatch(changePassword(values, isSearch, isSetNewCredential));
  }
};

const mapStateToProps = (state) => {
  const userName = result(state, 'user.profile.loginName', '');
  const passwordPolicyRegex = result(state, 'passwordRegex.passReg', '');
  const passwordPolicyMessage = (result(state, 'currentLanguage.id', '')) === 'en' ? result(state, 'passwordRegex.alertChangePasswordEN_New', '') : result(state, 'passwordRegex.alertChangePasswordID_New', '');
  return {
    userName, passwordPolicyRegex, passwordPolicyMessage
  };
};

const mapDispatchToProps = (dispatch) => ({
  getRegexPasswordPolicy: () => dispatch(getRegexPasswordPolicy())
});

const DecoratedForm = reduxForm(formConfig)(CreateNewPassword);

class CreateNewPasswordPage extends React.Component {
  static propTypes = {
    getRegexPasswordPolicy: PropTypes.func,
    userName: PropTypes.string,
    passwordPolicyRegex: PropTypes.string,
    passwordPolicyMessage: PropTypes.string,
    navigation: PropTypes.object
  }

  componentWillMount () {
    this.props.getRegexPasswordPolicy();
  }

  state = {
    isSecureTextEntryNewPassword: true,
    isSecureTextEntryConfirmNewPassword: true,
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

  setNewPasswordValue = () => (val) => {
    this.setState({passwordValue: val});
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {passwordPolicyRegex, passwordPolicyMessage} = this.props;
    const {typeField = '', oldPassword = '', usernameValue = '', passwordValue = '', setNewPasswordValue} = inputProps;
    if ('newPassword' === typeField) {
      setNewPasswordValue(val);
      if (isEmpty(validateCreatePassword(val, oldPassword, usernameValue, passwordPolicyRegex, passwordPolicyMessage))) {
        return true;
      } else {
        return false;
      }
    } else if ('confirmNewPassword' === typeField) {
      if (isEmpty(validateCreatePassword(val, oldPassword, usernameValue, passwordPolicyRegex, passwordPolicyMessage)) && val === passwordValue) {
        return true;
      } else {
        return false;
      }
    }
  }

  render () {
    const {userName, navigation, passwordPolicyRegex, passwordPolicyMessage} = this.props;
    const oldPassword = result(navigation, 'state.params.password');
    const isSetNewCredential = result(navigation, 'state.params.isSetNewCredential', '');
    const isSearch = result(navigation, 'state.params.isSearch', false);

    return <DecoratedForm
      oldPassword={oldPassword}
      isSetNewCredential={isSetNewCredential}
      userName={userName}
      passwordPolicyRegex={passwordPolicyRegex}
      passwordPolicyMessage={passwordPolicyMessage}
      showOrHideNewPassword={this.showOrHideNewPassword()}
      isSecureTextEntryNewPassword={this.state.isSecureTextEntryNewPassword}
      showOrHideConfirmNewPassword={this.showOrHideConfirmNewPassword()}
      isSecureTextEntryConfirmNewPassword={this.state.isSecureTextEntryConfirmNewPassword}
      validationInput={this.validationInput()}
      setNewPasswordValue={this.setNewPasswordValue()}
      passwordValue={this.state.passwordValue}
      isSearch={isSearch}/>;
  }
}

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(CreateNewPasswordPage);
export default ConnectedForm;
