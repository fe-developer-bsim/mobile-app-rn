import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import ResetPasswordEmailTokenComp from '../../components/OnboardingJourney/ResetPasswordEmailToken.component';
import {validatePinCodeLength} from '../../utils/validator.util';
import {result} from 'lodash';
import {connect} from 'react-redux';
import {validateEmailToken, resendEmailToken, validateEmailTokenNoCard} from '../../state/thunks/common.thunks';

const formConfig = {
  form: 'OTPEmail',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {navigation}) => {
    const typeActivation = result(navigation, 'state.params.typeActivation', '');
    const tokenEmail = result(navigation, 'state.params.tokenEmail', '');
    const noCard = result(navigation, 'state.params.noCard', false);
    const email = result(navigation, 'state.params.email', '');

    if (noCard) {
      dispatch(validateEmailTokenNoCard(typeActivation, tokenEmail, noCard, email));
    } else {
      dispatch(validateEmailToken(typeActivation, tokenEmail, email));
    }
  },
  validate: (values) => ({
    emailToken: validatePinCodeLength(values['emailToken'])
  })
};

const mapDispatchToProps = (dispatch) => ({
  resendEmailOTP: (payload) => dispatch(resendEmailToken(payload))
});

const EmailForm = reduxForm(formConfig)(ResetPasswordEmailTokenComp);

class ResetPasswordEmailTokenPage extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    resendEmailOTP: PropTypes.func,
  }

  render () {
    const {resendEmailOTP, navigation} = this.props;
    const email = result(navigation, 'state.params.email', '');
    return (
      <EmailForm navigation={navigation} resendEmailOTP={resendEmailOTP} email={email}/>
    );
  }
}

export default connect(null, mapDispatchToProps)(ResetPasswordEmailTokenPage);