import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {language} from '../../config/language/index';
import PasswordValidate from '../../components/Profile/PasswordValidate.component';
import {changeEasyPin} from '../../state/thunks/profile.thunks';
import {validateRequiredFields} from '../../utils/validator.util';

const formConfig = {
  form: 'easyPinValidatePasswordForm',
  destroyOnUnmount: true,
  initialValues: {
    password: ''
  },
  validate: (values) => validateRequiredFields(values, ['password']),
  onSubmit: (values, dispatch) => dispatch(changeEasyPin(values))
};

const PasswordValidateForm = reduxForm(formConfig)(PasswordValidate);

class EasyPinPasswordPage extends Component {
  state = {
    isSecureTextEntry: true
  }

  showOrHidePassword = () => () => {
    if (this.state.isSecureTextEntry) {
      this.setState({isSecureTextEntry: false});
    } else {
      this.setState({isSecureTextEntry: true});
    }
  }
  render () {
    return <PasswordValidateForm
      buttonText = {language.BUTTON__CONFIRM}
      showOrHidePassword={this.showOrHidePassword()}
      isSecureTextEntry={this.state.isSecureTextEntry}/>;
  }
}
export default EasyPinPasswordPage;
