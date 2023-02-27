import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FundTransferTypeComponent from '../../components/FundTransferJourney/FundTransferRevamp.component';
import {NavigationActions} from 'react-navigation';
import {result, startsWith, isEmpty} from 'lodash';
import {getDefaultAccount, checkTimeOperationRemittance} from '../../state/thunks/fundTransfer.thunks';
import {language} from '../../config/language';
import EmoneyUpgrade from '../../components/EmoneyJourney/EmoneyUpgradeBenefitIndex.component';
import {getTargetAccount, checkCameraPermissionAndNavigate, getCacheBankList, getChargeListCache} from '../../state/thunks/common.thunks';
import {getFavBiller} from '../../state/thunks/dashboard.thunks';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';
import {reduxForm} from 'redux-form';
import {Platform, Toast, Alert} from '../../utils/RNHelpers.util';
import TouchID from 'react-native-touch-id';
import LoginEasyPinForm from '../../components/OnboardingJourney/LoginWithEasyPinAccount.component';
import {login as loginThunk, clearAndResetPasswordBurgerMenu, loginToSendCash} from '../../state/thunks/onboarding.thunks';
import {validatePinCodeLength} from '../../utils/validator.util';


let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

const formConfig = {
  form: 'fundTransferType',
  destroyOnUnmount: true,
  initialValues: {
    easyPin: '',
  },
  onSubmit: (values, dispatch, {isLockedDevice, isOBM, isOBMActive}) => {
    if (isOBMActive === 'TRUE') {
      dispatch(loginToSendCash(values, isLockedDevice, isOBM, false, false, false, false, ''));
    } else {
      dispatch(loginThunk(values, isLockedDevice));
    }
  },
  validate: (values) => ({
    _error: validatePinCodeLength(values['easyPin'])
  }),
};

// const DecoratedFundTransferType = reduxForm(formConfig)(fundTransferTypeComponent);
const DecoratedFormEasyPin = reduxForm(formConfig)(LoginEasyPinForm);


class FundTransferTypePage extends Component {
  static propTypes = {
    payeeList: PropTypes.array,
    cif: PropTypes.string,
    movetoForm: PropTypes.func,
    getTargetAccount: PropTypes.func,
    accountsTransfer: PropTypes.array,
    getDefaultAccount: PropTypes.func,
    cifCode: PropTypes.string,
    goToFundTransfer: PropTypes.func,
    goToRemittance: PropTypes.func,
    navigation: PropTypes.func,
    // Before Login
    isLogin: PropTypes.bool,
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
    isOBMActive: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    getCacheBankList: PropTypes.func,
    getChargeListCache: PropTypes.func,
  }

  state = {
    disabled: false,
    visible: false,
  }

  // Function Login

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
    TouchID.authenticate(language.LOGIN__SCAN_FINGER, configTouchID).then(() => {
      loginFingerprint(isLockedDevice, isOBMActive);
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
    TouchID.authenticate(language.LOGIN__SCAN_FINGER, configTouchID).then(() => {
      loginFingerprint(isLockedDevice, isOBMActive);
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
    const {payeeList, accountsTransfer, hasFingerprint, isUsingFingerprint, lastSuccessfulLogin, isLogin} = this.props;
    if (isEmpty(payeeList)) {
      this.props.getTargetAccount();
    }
    if (isEmpty(accountsTransfer)) {
      this.props.getDefaultAccount();
    }
    if (lastSuccessfulLogin === 'fingerprint' && hasFingerprint && isUsingFingerprint && !isLogin) {
      Platform.OS === 'android' ? this.showFingerprintModalAndroid() : this.showFingerprintModalIOS();
    }
    this.props.getCacheBankList();
  }
  render () {
    const {visible} = this.state;
    const {cif, movetoForm, cifCode, navigation, loginWithFaceRecognition, forgotEasyPin, isFaceRegistered, isLockedDevice, isFaceRecogEnabled,
      isUsingFaceRecog, isUsingFingerprint, hasFingerprint, isOBMActive, isLogin, goToFundTransfer, goToRemittance} = this.props;
    const isOBM = result(navigation, 'state.params.isOBM') === false;
    const isOBMPassword = result(this.props, 'navigation.state.params.isOBMPassword');
    const isOBMDashboard = result(this.props, 'navigation.state.params.isOBMDashboard');
    const cifEmoney = isEmpty(cif) ? cifCode : cif;
    if (!isLogin) {
      return <DecoratedFormEasyPin
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
        isTransfer={true}
        isLogin={isLogin}
        addStyleContinue={true}
        // isLoginAfterUpgrade={isLoginAfterUpgrade}
      />;
    } else {
      if (startsWith(cifEmoney, 'NK')) {
        return <EmoneyUpgrade movetoForm={movetoForm} isCashless={true}/>;
      } else {
        return (
          <FundTransferTypeComponent
            navigation={navigation} goToFundTransfer={goToFundTransfer} goToRemittance={goToRemittance}
          />
        );
      }
    }

  }
}

const mapStateToProps = (state, props) => ({
  payeeForm: result(state, 'form.addPayeeAcc.values', {}),
  payeeList: result(state, 'payees', []),
  language: state.currentLanguage,
  cif: result(state, 'user.profile.customer.cifCode', ''),
  loginName: result(state, 'user.profile.loginName', ''),
  payeeStatus: result(state, 'payeeStatus', ''),
  drawer: result(state, 'drawer', false),
  accountsBiller: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  accountsTransfer: getTransferPossibleAccounts(result(state, 'accounts', []), 'ft', result(props, 'navigation.state.params.payee', {})),
  cifCode: result(state, 'insuranceDataTravel.cifCode', ''),
  originalName: result(state, 'form.addPayeeAcc.values.originalName', ''),
  // Before Login
  isLockedDevice: Boolean(state.appInitKeys && state.appInitKeys.username && state.appInitKeys.tokenClient && state.appInitKeys.tokenServer),
  currentLanguage: state.currentLanguage,
  isFaceRegistered: state.isFaceRegistered.isFaceRegistered,
  isUsingFaceRecog: result(state, 'faceRecognition', false),
  isUsingFingerprint: result(state, 'fingerprint', false),
  hasFingerprint: result(state, 'hasFingerprint', false),
  isFaceRecogEnabled: result(state, 'config.isFaceRecognitionEnabled', false),
  lastSuccessfulLogin: result(state, 'lastSuccessfulLogin', 'easypin'),
  isOBMActive: result(state, 'config.isOBMActive'),
  isLogin: !isEmpty(result(state, 'user', {})),

});

const mapDispatchToProps = (dispatch) => ({
  goToRemittance: () => {
    dispatch(checkTimeOperationRemittance());
  },
  goToFundTransfer: () => {
    dispatch(NavigationActions.navigate({routeName: 'FundTransferRev'}));
  },
  // getFavBiller: () => dispatch(getFavBiller()),
  getTargetAccount: () => dispatch(getTargetAccount()),
  getDefaultAccount: () => dispatch(getDefaultAccount()),
  // before login
  movetoForm: () => {
    dispatch(NavigationActions.navigate({routeName: 'ProductsListUpgradeEmoney'}));
  },
  getFavBiller: () => dispatch(getFavBiller()),
  forgotEasyPin: () => {
    dispatch(clearAndResetPasswordBurgerMenu());
  },
  loginWithFaceRecognition: (isLockedDevice) => {
    dispatch(checkCameraPermissionAndNavigate('CameraPage', {isLockedDevice, action: 'Login'}));
  },
  loginFingerprint: (isLockedDevice, isOBMActive) => {
    if (isOBMActive === 'TRUE') {
      dispatch(loginToSendCash({}, isLockedDevice));
    } else {
      dispatch(loginThunk({}, isLockedDevice));
    }
  },
  getCacheBankList: () => {
    dispatch(getCacheBankList());
  },
  getChargeListCache: () => {
    dispatch(getChargeListCache());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FundTransferTypePage);
