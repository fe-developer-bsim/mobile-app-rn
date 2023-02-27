import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import EmoneyUpgradeEmailVerificationComp from '../../components/EmoneyJourney/EmoneyUpgradeEmailVerification.component';
import {validatePinCodeLength} from '../../utils/validator.util';
import {result} from 'lodash';
import {connect} from 'react-redux';
import {validateEmailToken, resendEmailToken} from '../../state/thunks/emoney.thunks';
// import firebase from 'react-native-firebase';
// import {Platform} from 'react-native';
// let Analytics = firebase.analytics();

const formConfig = {
  form: 'OTPEmail',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => {
    dispatch(validateEmailToken());
  },
  validate: (values) => ({
    emailToken: validatePinCodeLength(values['emailToken'])
  })
};

const mapDispatchToProps = (dispatch) => ({
  resendEmailOTP: () => dispatch(resendEmailToken())
});

const mapStateToProps = (state) => ({
  email: result(state, 'form.UpgradeEmoneyEmailForm.values.email', '')
});

const EmailForm = reduxForm(formConfig)(EmoneyUpgradeEmailVerificationComp);

class EmoneyUpgradeEmailVerificationPage extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    resendEmailOTP: PropTypes.func,
    email: PropTypes.string
  }

  componentDidMount () {
    // const {navigation} = this.props;
    // const firebaseEmoney = result(navigation, 'state.params.firebaseEmoney', false);

    // if (firebaseEmoney === true) {
    //   const os = Platform.OS;
    //   Analytics.logEvent('UPGRADE_EMONEY', {device: os, step_route: '8'});
    // }
  }

  render () {
    const {resendEmailOTP, email} = this.props;
    return (
      <EmailForm resendEmailOTP={resendEmailOTP} email={email}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmoneyUpgradeEmailVerificationPage);
