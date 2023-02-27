import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import LoginEasyPinForm from '../../components/OnboardingJourney/LoginWithEasyPin.component';
import {login as loginThunk, clearAndResetPasswordBurgerMenu, loginOBM, loginToDashboard} from '../../state/thunks/onboarding.thunks';
import {validatePinCodeLength} from '../../utils/validator.util';
import result from 'lodash/result';
import {checkCameraPermissionAndNavigate} from '../../state/thunks/common.thunks';
import TouchID from 'react-native-touch-id';
import {Toast, Platform, Alert} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

const formConfig = {
  form: 'loginEasyPinFormSearch',
  destroyOnUnmount: true,
  initialValues: {
    easyPin: '',
  },
  onSubmit: (values, dispatch, {isLockedDevice, isOBM, isOBMDashboard, fromLuckyDip, routeMenuSearch, loginLanding, isFromSearch, productName, offerNavigate}) => {
    if (fromLuckyDip === 'true'  || routeMenuSearch !== '' || loginLanding === 'LoginLanding' || loginLanding === 'LoginProduct') {
      const defineParam = routeMenuSearch === '' ? fromLuckyDip : routeMenuSearch;
      dispatch(loginToDashboard(values, isLockedDevice, isOBM, false, false, false, false, defineParam, false, isFromSearch, productName, offerNavigate));
    } else {
      dispatch(loginOBM(values, isLockedDevice, isOBM, isOBMDashboard));
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
  lastSuccessfulLogin: result(state, 'lastSuccessfulLogin', 'easypin'),
  isOBMActive: result(state, 'config.isOBMActive'),
});

const mapDispatchToProps = (dispatch) => ({
  forgotEasyPin: () => {
    dispatch(clearAndResetPasswordBurgerMenu());
  },
  loginWithFaceRecognition: (isLockedDevice) => {
    dispatch(checkCameraPermissionAndNavigate('CameraPage', {isLockedDevice, action: 'Login'}));
  },
  loginFingerprint: (isLockedDevice, isOBMActive, isOBM, isResetEasypin = false, regisATM = false, loginATM = false, isUserRegistered = false, routeMenuSearch, isRouteMenuSearch) => {
    if (isOBMActive === 'TRUE') {
      dispatch(loginOBM({}, isLockedDevice, isOBM, isResetEasypin, regisATM, loginATM, isUserRegistered, routeMenuSearch, isRouteMenuSearch));
    } else {
      dispatch(loginThunk({}, isLockedDevice));
    }
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
    loginThunk: PropTypes.func,
    isOBMActive: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
  }
  goRegister = () => {
    this.props.navigation.navigate('RegisterAtm');
  }

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
    const {loginFingerprint, isLockedDevice, isOBMActive} = this.props;
    const isRouteMenuSearch = true;
    const routeMenuSearch = result(this.props, 'navigation.state.params.routeMenuSearch', '');
    const isFromSearch = result(this.props, 'navigation.state.params.isFromSearch', 'false');
    const loginLanding = result(this.props, 'navigation.state.params.fromLuckyDip', 'false');
    const isLoginLanding = isFromSearch ?  routeMenuSearch : loginLanding;
    const isOBM = result(this.props, 'state.params.isOBM') === false;
    TouchID.authenticate(language.LOGIN__SCAN_FINGER, configTouchID).then(() => {
      loginFingerprint(isLockedDevice, isOBMActive, isOBM, false, false, false, false, isLoginLanding, isRouteMenuSearch);
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
    const {loginFingerprint, isLockedDevice, isOBMActive} = this.props;
    const isRouteMenuSearch = true;
    const routeMenuSearch = result(this.props, 'navigation.state.params.routeMenuSearch', '');
    const isFromSearch = result(this.props, 'navigation.state.params.isFromSearch', 'false');
    const loginLanding = result(this.props, 'navigation.state.params.fromLuckyDip', 'false');
    const isLoginLanding = isFromSearch ?  routeMenuSearch : loginLanding;
    const isOBM = result(this.props, 'state.params.isOBM') === false;
    TouchID.authenticate(language.LOGIN__SCAN_FINGER, configTouchID).then(() => {
      loginFingerprint(isLockedDevice, isOBMActive, isOBM, false, false, false, false, isLoginLanding, isRouteMenuSearch);
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

  //   componentDidMount () {
  //     const {hasFingerprint, isUsingFingerprint, lastSuccessfulLogin} = this.props;
  //     if (lastSuccessfulLogin === 'fingerprint' && hasFingerprint && isUsingFingerprint) {
  //       Platform.OS === 'android' ? this.showFingerprintModalAndroid() : this.showFingerprintModalIOS();
  //     }
  //   }


  render () {
    const {visible} = this.state;
    const {loginWithFaceRecognition, forgotEasyPin, isFaceRegistered, isLockedDevice, isFaceRecogEnabled,
      isUsingFaceRecog, isUsingFingerprint, hasFingerprint, navigation, isOBMActive} = this.props;
    const isOBM = result(navigation, 'state.params.isOBM') === false;
    const isOBMPassword = result(this.props, 'navigation.state.params.isOBMPassword');
    const isOBMDashboard = result(this.props, 'navigation.state.params.isOBMDashboard');
    const fromLuckyDip = result(this.props, 'navigation.state.params.fromLuckyDip', 'false');
    const routeMenuSearch = result(this.props, 'navigation.state.params.routeMenuSearch', '');
    const loginLanding = result(this.props, 'navigation.state.params.fromLuckyDip', 'false');
    const isFromSearch = result(this.props, 'navigation.state.params.isFromSearch', 'false');
    const productName = result(this.props, 'navigation.state.params.productName', '');
    const offerNavigate = result(this.props, 'navigation.state.params.offerNavigate', '');
    const isRouteMenuSearch = true;
    return (
      <DecoratedForm
        goRegister={this.goRegister}
        loginWithFaceRecognition={loginWithFaceRecognition}
        visible={visible}
        showFingerprintModalIOS={this.showFingerprintModalIOS}
        showFingerprintModalAndroid={this.showFingerprintModalAndroid}
        onModalClose={this.onModalClose}
        handleAuthenticationAttempted={this.handleAuthenticationAttempted}
        loginFaceRecognition={this.loginFaceRecognition}
        forgotEasyPin={forgotEasyPin}
        isFaceRegistered={isFaceRegistered}
        isLockedDevice={isLockedDevice}
        isFaceRecogEnabled={isFaceRecogEnabled}
        isUsingFaceRecog={isUsingFaceRecog}
        isUsingFingerprint={isUsingFingerprint}
        hasFingerprint={hasFingerprint}
        isOBM={isOBM}
        isOBMPassword={isOBMPassword}
        isOBMDashboard={isOBMDashboard}
        isOBMActive={isOBMActive}
        fromLuckyDip={fromLuckyDip}
        routeMenuSearch={routeMenuSearch}
        loginLanding={loginLanding}
        isFromSearch={isFromSearch}
        isRouteMenuSearch={isRouteMenuSearch}
        productName={productName}
        offerNavigate={offerNavigate}
      />);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithEasyPin);
