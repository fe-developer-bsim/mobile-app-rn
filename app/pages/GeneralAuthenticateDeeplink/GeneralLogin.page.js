import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import LoginEasyPinForm from '../../components/GeneralAuthenticateDeeplink/GeneralLogin.component';
import {validatePinCodeLength} from '../../utils/validator.util';
import result from 'lodash/result';
import {checkCameraPermissionAndNavigate} from '../../state/thunks/common.thunks';
import {Toast, Platform, Alert} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import {loginToEmall, clearAndResetPasswordEmall, loginAllsegment, loginPromoDeeplink} from '../../state/thunks/onboarding.thunks';

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

const formConfig = {
  form: 'loginEasyPinForm',
  destroyOnUnmount: true,
  initialValues: {
    easyPin: '',
  },
  onSubmit: (values, dispatch, {isLockedDevice, pathRoute, allSegment, isTypeActivation}) => {
    if (allSegment) {
      dispatch(loginAllsegment(values, isLockedDevice, pathRoute));
    } else {
      dispatch(loginPromoDeeplink(values, isLockedDevice, isTypeActivation));
    }
  },
  validate: (values) => ({
    _error: validatePinCodeLength(values['easyPin'])
  }),
};

const DecoratedForm = reduxForm(formConfig)(LoginEasyPinForm);

const mapStateToProps = (state) => ({
  isLockedDevice: Boolean(state.appInitKeys && state.appInitKeys.username && state.appInitKeys.tokenClient && state.appInitKeys.tokenServer),
  currentLanguage: state.currentLanguage,
  isFaceRegistered: state.isFaceRegistered.isFaceRegistered,
  isUsingFaceRecog: result(state, 'faceRecognition', false),
  isUsingFingerprint: result(state, 'fingerprint', false),
  hasFingerprint: result(state, 'hasFingerprint', false),
  isFaceRecogEnabled: result(state, 'config.isFaceRecognitionEnabled', false),
  lastSuccessfulLogin: result(state, 'lastSuccessfulLogin', 'easypin')
});

const mapDispatchToProps = (dispatch) => ({
  forgotEasyPin: () => {
    dispatch(clearAndResetPasswordEmall());
  },
  loginWithFaceRecognition: (isLockedDevice) => {
    dispatch(checkCameraPermissionAndNavigate('CameraPage', {isLockedDevice, action: 'Login'}));
  },
  loginFingerprint: (isLockedDevice, props) => {
    dispatch(loginToEmall({}, isLockedDevice, result(props.navigation, 'state.params.flightData', {})));
  },
  doLogin: () => {
    dispatch();
  }
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
    loginFaceRecognition: PropTypes.func,
    isUsingFaceRecog: PropTypes.bool,
    isUsingFingerprint: PropTypes.bool,
    isFaceRegistered: PropTypes.bool,
    loginFingerprint: PropTypes.func,
    lastSuccessfulLogin: PropTypes.string,
    isFaceRecogEnabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  }
  goRegister = () => {
    this.props.navigation.navigate('RegisterAtm');
  }

  onModalClose = () => {
    this.setState({visible: false});
  }

  handleAuthenticationAttempted = () => {
    Toast.show(language.FINGER_PRINT__NOT_RECOGNIZED);
  };

  loginFaceRecognition = () => {
    const {isLockedDevice, loginWithFaceRecognition} = this.props;
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).
        then((res) => {
          if (!res) {
            (async () => {
              const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                loginWithFaceRecognition(isLockedDevice);
              } else {
                Alert.alert(language.CAMERA_PERMISSION_TITLE, language.CAMERA_PERMISSION_REQUEST, [{
                  text: language.GENERIC__OK
                }]);
              }
            })();
          } else {
            loginWithFaceRecognition(isLockedDevice);
          }
        });
    } else {
      loginWithFaceRecognition(isLockedDevice);
    }
  }

  render () {
    const {visible} = this.state;
    const {forgotEasyPin, isLockedDevice, navigation} = this.props;
    const isbiller = result(navigation, 'state.params.biller', false);
    const isTypeActivation = result(navigation, 'state.params.typeActivationTransform', false);
    const isOrami = result(navigation, 'state.params.typeActivation', '');
    const allSegment = result(navigation, 'state.params.allSegment', false);
    const pathRoute = result(navigation, 'state.params.pathRoute', '');
    return (
      <DecoratedForm
        pathRoute={pathRoute}
        navigation={navigation}
        allSegment={allSegment}
        isOrami={isOrami}
        goRegister={this.goRegister}
        visible={visible}
        onModalClose={this.onModalClose}
        handleAuthenticationAttempted={this.handleAuthenticationAttempted}
        loginFaceRecognition={this.loginFaceRecognition}
        forgotEasyPin={forgotEasyPin}
        isLockedDevice={isLockedDevice}
        isbiller={isbiller}
        isTypeActivation={isTypeActivation}
      />);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithEasyPin);
