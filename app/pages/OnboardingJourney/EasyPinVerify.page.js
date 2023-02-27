import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import EasyPinVerifyForm from '../../components/OnboardingJourney/EasyPinVerify.component';
import {resetEasyPinFromVerify} from '../../state/thunks/onboarding.thunks';
import {verifyEasyPin as verifyEasyPinThunk} from '../../state/thunks/profile.thunks';
import {connect} from 'react-redux';
import result from 'lodash/result';

const formConfig = {
  form: 'easyPinVerifyForm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => dispatch(verifyEasyPinThunk(values))
};

const mapStateToProps = ({currentLanguage}) => ({currentLanguage});

const mapDispatchToProps = (dispatch) => ({
  forgotEasyPin: (maskedUsername) => {
    dispatch(resetEasyPinFromVerify(maskedUsername));
  }
});

const DecoratedForm = reduxForm(formConfig)(EasyPinVerifyForm);

class EasyPinVerify extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    forgotEasyPin: PropTypes.func
  }

  goToResetEasyPin = () => () => {
    const maskedUsername = result(this.props.navigation, 'state.params.maskedUsername', '');
    this.props.forgotEasyPin(maskedUsername);
  }

  render () {
    const isOBM = result(this.props.navigation, 'state.params.isOBM', '');
    return (
      <DecoratedForm forgotEasyPin={this.goToResetEasyPin} isOBM={isOBM} 
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EasyPinVerify);
