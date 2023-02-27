import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Platform} from 'react-native';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import LoginEasyPinForm from '../../components/Egift/EgiftLogin.component';
import {loginToEgift, clearAndResetPasswordBurgerMenu, loginToEmoney} from '../../state/thunks/onboarding.thunks';
import {validatePinCodeLength} from '../../utils/validator.util';
import result from 'lodash/result';
import {checkCameraPermissionAndNavigate} from '../../state/thunks/common.thunks';
import {Toast, Alert} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import TouchID from 'react-native-touch-id';

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
  onSubmit: (values, dispatch, {isLockedDevice, isOBM, isOBMDashboard, isEmoney}) => {
    if (isEmoney) {
      dispatch(loginToEmoney(values, isLockedDevice, isOBM, isOBMDashboard));
    } else {
      dispatch(loginToEgift(values, isLockedDevice, isOBM, isOBMDashboard));
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
  formValues: result(state, 'form.loginEasyPinForm.values', {}),
  isFaceRegistered: state.isFaceRegistered.isFaceRegistered,
  isUsingFaceRecog: result(state, 'faceRecognition', false),
  isUsingFingerprint: result(state, 'fingerprint', false),
  hasFingerprint: result(state, 'hasFingerprint', false),
  isFaceRecogEnabled: result(state, 'config.isFaceRecognitionEnabled', false),
  lastSuccessfulLogin: result(state, 'lastSuccessfulLogin', 'easypin'),
  isOBMActive: result(state, 'config.isOBMActive'),
});

const mapDispatchToProps = (dispatch) => ({
  forgotEasyPin: () => {
    dispatch(clearAndResetPasswordBurgerMenu());
  },
  loginWithFaceRecognition: (isLockedDevice, props) => {
    dispatch(checkCameraPermissionAndNavigate('CameraPage', {isLockedDevice, action: 'Login'}, result(props.navigation, 'state.params.data', {})));
  },
  loginFingerprint: (isEmoney, values, isLockedDevice, isOBM, isOBMDashboard) => {
    if (isEmoney) {
      dispatch(loginToEmoney(values, isLockedDevice, isOBM, isOBMDashboard));
    } else {
      dispatch(loginToEgift(values, isLockedDevice, isOBM, isOBMDashboard));
    }
  },
});

class LoginWithEasyPin extends Component {
  state = {
    visible: false
  }
  static propTypes = {
    navigation: PropTypes.object,
    isLockedDevice: PropTypes.bool,
    loginWithFaceRecognition: PropTypes.func,
    forgotEasyPin: PropTypes.func,
    loginFaceRecognition: PropTypes.func,
    loginFingerprint: PropTypes.func,
    hasFingerprint: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    isUsingFaceRecog: PropTypes.bool,
    isUsingFingerprint: PropTypes.bool,
    isFaceRegistered: PropTypes.bool,
    lastSuccessfulLogin: PropTypes.string,
    isFaceRecogEnabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    isOBMActive: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    isLogin: PropTypes.bool,
    formValues: PropTypes.object,
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

  showFingerprintModalIOS = () => {
    const configTouchID = {
      title: language.FINGER_PRINT__SIGN_IN,
      imageColor: '#e00606',
      imageErrorColor: '#ff0000',
      sensorDescription: language.FINGER_PRINT__TOUCH_SENSOR,
      sensorErrorDescription: language.FINGER_PRINT__TOUCH_SENSOR_FAILED,
      cancelText: language.FINGER_PRINT__CANCEL,
      fallbackLabel: language.ONBOARDING__ENTER_PASSWORD, // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };
    const {loginFingerprint, isLockedDevice, navigation, formValues} = this.props;
    const isEmoney = result(navigation, 'state.params.isEmoney') === true;
    const isOBM = result(navigation, 'state.params.isOBM') === false;
    const isOBMDashboard = result(this.props, 'navigation.state.params.isOBMDashboard');
    const values = formValues;
    TouchID.authenticate(language.LOGIN__SCAN_FINGER, configTouchID).then(() => {
      loginFingerprint(isEmoney, values, isLockedDevice, isOBM, isOBMDashboard);
    }).catch((error) => {
      const errName = result(error, 'name');
      if (errName === 'LAErrorAuthenticationFailed') {
        Toast.show(language.FINGER_PRINT__TO_MANY_ATTEMPT);
      }
    });
  }

  showFingerprintModalAndroid = () => {
    const configTouchID = {
      title: language.FINGER_PRINT__SIGN_IN,
      imageColor: '#e00606',
      imageErrorColor: '#ff0000',
      sensorDescription: language.FINGER_PRINT__TOUCH_SENSOR,
      sensorErrorDescription: language.FINGER_PRINT__TOUCH_SENSOR_FAILED,
      cancelText: language.FINGER_PRINT__CANCEL,
      fallbackLabel: language.ONBOARDING__ENTER_PASSWORD, // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };
    const {loginFingerprint, isLockedDevice, navigation, formValues} = this.props;
    const values = formValues;
    const isEmoney = result(navigation, 'state.params.isEmoney') === true;
    const isOBM = result(navigation, 'state.params.isOBM') === false;
    const isOBMDashboard = result(this.props, 'navigation.state.params.isOBMDashboard');
    TouchID.authenticate(language.LOGIN__SCAN_FINGER, configTouchID).then(() => {
      loginFingerprint(values, isLockedDevice, isEmoney, isOBM, isOBMDashboard);
    }).catch((error) => {
      const errName = result(error, 'name');
      if (errName === 'LAErrorAuthenticationFailed') {
        Toast.show(language.FINGER_PRINT__TO_MANY_ATTEMPT);
      }
    });
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

  componentDidMount () {
    const {hasFingerprint, isUsingFingerprint, lastSuccessfulLogin, isLogin} = this.props;
    if (!isLogin) {
      if (lastSuccessfulLogin === 'fingerprint' && hasFingerprint && isUsingFingerprint) {
        Platform.OS === 'android' ? this.showFingerprintModalAndroid() : this.showFingerprintModalIOS();
      }
    }
  }

  render () {
    const {visible} = this.state;
    const {forgotEasyPin, isLockedDevice, navigation, loginWithFaceRecognition, isFaceRegistered, isFaceRecogEnabled,
      isUsingFaceRecog, isUsingFingerprint, hasFingerprint} = this.props;
    const isOBM = result(navigation, 'state.params.isOBM') === false;
    const isEmoney = result(navigation, 'state.params.isEmoney') === true;
    const isOBMPassword = result(this.props, 'navigation.state.params.isOBMPassword');
    const isOBMDashboard = result(this.props, 'navigation.state.params.isOBMDashboard');
    return (
      <DecoratedForm
        navigation={navigation}
        goRegister={this.goRegister}
        visible={visible}
        onModalClose={this.onModalClose}
        handleAuthenticationAttempted={this.handleAuthenticationAttempted}
        forgotEasyPin={forgotEasyPin}
        isLockedDevice={isLockedDevice}
        isOBM={isOBM}
        isOBMPassword={isOBMPassword}
        isOBMDashboard={isOBMDashboard}
        isEmoney={isEmoney}
        loginWithFaceRecognition={loginWithFaceRecognition} showFingerprintModalIOS={this.showFingerprintModalIOS} showFingerprintModalAndroid={this.showFingerprintModalAndroid}
        loginFaceRecognition={this.loginFaceRecognition} isFaceRegistered={isFaceRegistered} isFaceRecogEnabled={isFaceRecogEnabled} isUsingFaceRecog={isUsingFaceRecog} isUsingFingerprint={isUsingFingerprint}
        hasFingerprint={hasFingerprint}
      />);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithEasyPin);
