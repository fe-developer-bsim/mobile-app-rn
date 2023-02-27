import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import EasyPinSetLimit from '../../components/Authenticate/SetLimitEasyPin.component';
import {validatePinCodeLength} from '../../utils/validator.util';
import result from 'lodash/result';
import {clearAndResetPasswordEmall} from '../../state/thunks/onboarding.thunks';
import {triggerEditLimit, goToEditSetLimitTransaction} from '../../state/thunks/common.thunks';

const formConfig = {
  form: 'SetLimitEasyPin',
  destroyOnUnmount: true,
  initialValues: {
    easyPinsetLimit: '',
  },
  onSubmit: (values, dispatch, {sendVerification}) => {
    const params = {onSubmit: sendVerification, isOtp: true};
    dispatch(triggerEditLimit('CustomLimit', null, false, 'AuthSetLimit', params));
  },
  validate: (values) => ({
    _error: validatePinCodeLength(values['easyPinsetLimit'])
  }),
};

const DecoratedForm = reduxForm(formConfig)(EasyPinSetLimit);

const mapStateToProps = (state) => ({    
  isLockedDevice: Boolean(state.appInitKeys && state.appInitKeys.username && state.appInitKeys.tokenClient && state.appInitKeys.tokenServer),
  currentLanguage: state.currentLanguage,
  isFaceRegistered: state.isFaceRegistered.isFaceRegistered,
  isUsingFaceRecog: result(state, 'faceRecognition', false),
  isUsingFingerprint: result(state, 'fingerprint', false),
  hasFingerprint: result(state, 'hasFingerprint', false),
  isFaceRecogEnabled: result(state, 'config.isFaceRecognitionEnabled', false),
  lastSuccessfulLogin: result(state, 'lastSuccessfulLogin', 'easypin'),
});
const mapDispatchToProps = (dispatch) => ({
  forgotEasyPin: () => {
    dispatch(clearAndResetPasswordEmall());
  },  
  triggerAuth: (params) => {
    dispatch(triggerEditLimit('CustomLimit', null, true, false, 'AuthSetLimit', params));
  },
  sendVerification: (data) => {
    dispatch(goToEditSetLimitTransaction(data));
  }, 
  dispatch 
});

class LoginWithEasyPin extends Component {
  state = {
    visible: false
  }
  static propTypes = {
    navigation: PropTypes.object,
    isLockedDevice: PropTypes.bool,
    loginWithFaceRecognition: PropTypes.func,
    hasFingerprint: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    forgotEasyPin: PropTypes.func,
    isUsingFaceRecog: PropTypes.bool,
    isUsingFingerprint: PropTypes.bool,
    isFaceRegistered: PropTypes.bool,
    loginFingerprint: PropTypes.func,
    lastSuccessfulLogin: PropTypes.string,
    isFaceRecogEnabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),    
    sendVerification: PropTypes.func,
  }

  render () {
    const {visible} = this.state;
    const {forgotEasyPin, isLockedDevice, navigation, sendVerification} = this.props;
    const isbiller = result(navigation, 'state.params.biller', false);
    const isOrami = result(navigation, 'state.params.typeActivation', '');
    const allSegment = result(navigation, 'state.params.allSegment', false);
    const pathRoute = result(navigation, 'state.params.pathRoute', '');
    const tokenPayment = result(navigation, 'state.params.tokenPayment', false);
    const tokenId = result(navigation, 'state.params.tokenId', false);
    return (
      <DecoratedForm
        pathRoute={pathRoute}
        navigation={navigation}
        allSegment={allSegment}
        isOrami={isOrami}
        visible={visible}
        onModalClose={this.onModalClose}
        handleAuthenticationAttempted={this.handleAuthenticationAttempted}
        loginFaceRecognition={this.loginFaceRecognition}
        forgotEasyPin={forgotEasyPin}
        isLockedDevice={isLockedDevice}
        isbiller={isbiller}
        tokenPayment={tokenPayment}
        tokenId={tokenId}
        sendVerification={sendVerification}
      />);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithEasyPin);
