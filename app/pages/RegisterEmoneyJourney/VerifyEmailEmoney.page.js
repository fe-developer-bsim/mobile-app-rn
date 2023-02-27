import React, {Component} from 'react';
import PropTypes from 'prop-types';
import VerifyEmailEmoney from '../../components/RegisterEmoneyJourney/VerifyEmailEmoney.component';
import {isEmpty} from 'lodash';
import {connect} from 'react-redux';
import {sendOtpActivation, sendOtpResetPassword} from '../../state/thunks/onboarding.thunks';
import result from 'lodash/result';

const mapDispatchToProps = (dispatch) => ({
  sendOtpActivationOnpress: (tokenEmail, typeActivation, isLockedDevice) => dispatch(sendOtpActivation(tokenEmail, typeActivation, isLockedDevice)),
  sendOtpResetPasswordOnpress: (tokenEmail, typeActivation, isLockedDevice) => dispatch(sendOtpResetPassword(tokenEmail, typeActivation, isLockedDevice))
});

const mapStateToProps = (state) => ({
  isLockedDevice: Boolean(state.appInitKeys && state.appInitKeys.username && state.appInitKeys.tokenClient && state.appInitKeys.tokenServer),
  isLogin: !isEmpty(result(state, 'user', {}))
});

class VerifyEmail extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    isLogin: PropTypes.bool,
    sendOtpActivationOnpress: PropTypes.func,
    isLockedDevice: PropTypes.bool,
    sendOtpResetPasswordOnpress: PropTypes.func,

  }

  onVerifyPhonePress = () => {
    const {navigation, isLockedDevice, sendOtpResetPasswordOnpress, sendOtpActivationOnpress} = this.props;
    const typeActivation = result(navigation, 'state.params.typeActivation', '');
    const tokenEmail = result(navigation, 'state.params.tokenEmail', '');
    if (typeActivation === '003') {
      sendOtpResetPasswordOnpress(tokenEmail, typeActivation, isLockedDevice);
    } else {
      sendOtpActivationOnpress(tokenEmail, typeActivation, isLockedDevice);
    }
  }

  render () {
    const {navigation} = this.props;
    const navParams = result(navigation, 'state.params', {});
    return (
      <VerifyEmailEmoney onVerifyPhone={this.onVerifyPhonePress} {...navParams} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
