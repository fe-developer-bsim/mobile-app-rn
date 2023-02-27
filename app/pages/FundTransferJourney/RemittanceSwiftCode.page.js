import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import RemittanceComponent from '../../components/SearcheableList/RemittanceSwiftCode.component';
import {NavigationActions} from 'react-navigation';
import {payeesAddSecondaryText, sortPayeesRemittance} from '../../utils/transformer.util';
import {result, startsWith, noop, isEmpty} from 'lodash';
import {getDefaultAccount, setupSwiftCodeBankInformation, deleteSelectedPayeeRemittance} from '../../state/thunks/fundTransfer.thunks';
import {language} from '../../config/language';
import EmoneyUpgrade from '../../components/EmoneyJourney/EmoneyUpgradeBenefitIndex.component';
import {getTargetAccount, checkCameraPermissionAndNavigate, getTargetAccountRemittance} from '../../state/thunks/common.thunks';
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
const formConfigEasyPin = {
  form: 'loginEasyPinFormTrf',
  destroyOnUnmount: true,
  initialValues: {
    easyPin: '',
  },
  onSubmit: (values, dispatch, {isLockedDevice, isOBM, isOBMDashboard, isOBMActive}) => {
    if (isOBMActive === 'TRUE') {
      dispatch(loginToSendCash(values, isLockedDevice, isOBM, isOBMDashboard));
    } else {
      dispatch(loginThunk(values, isLockedDevice));
    }
  },
  validate: (values) => ({
    _error: validatePinCodeLength(values['easyPin'])
  }),
};
const formConfigRemittance = {
  form: 'addSwiftCode',
  destroyOnUnmount: true,
  onSubmit: (values, dispatch) => {
    const swiftCode = result(values, 'swiftCode', '');
    dispatch(setupSwiftCodeBankInformation(swiftCode));
  }
};

const DecoratedFormEasyPin = reduxForm(formConfigEasyPin)(LoginEasyPinForm);
const DecoratedFormRemittance = reduxForm(formConfigRemittance)(RemittanceComponent);


class RemittanceSwiftCodePage extends Component {
  static propTypes = {
    goToAddPayee: PropTypes.func,
    goToDeletePayee: PropTypes.func,
    selectExistingPayee: PropTypes.func,
    payeeList: PropTypes.array,
    cif: PropTypes.string,
    loginName: PropTypes.string,
    movetoForm: PropTypes.func,
    mockImageLocation: PropTypes.bool,
    payeeStatus: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    goToReloadHistory: PropTypes.func,
    getFavBiller: PropTypes.func,
    drawer: PropTypes.bool,
    reloadHistory: PropTypes.func,
    getTargetAccount: PropTypes.func,
    accountsBiller: PropTypes.array,
    accountsTransfer: PropTypes.array,
    getDefaultAccount: PropTypes.func,
    cifCode: PropTypes.string,
    swiftCodeForm: PropTypes.object,
    onBankAccountPress: PropTypes.func,
    originalName: PropTypes.string,
    onRemittancePress: PropTypes.func,
    navigation: PropTypes.func,
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
    getTargetAccountRemittance: PropTypes.func,
    payeeListRemittance: PropTypes.array,
  }

  state = {
    disabled: false,
    visible: false,
  }

  // login

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


  // transfer

  findPayee = (swiftCode) => {
    const {goToAddPayee} = this.props;
    goToAddPayee((swiftCode));
  }

  selectExistingPayee = (payee) => () => {
    this.setState({disabled: true});
    this.props.selectExistingPayee(payee);
    setTimeout(() => {
      this.setState({disabled: false});
    }, 2000);
  }

  deletePayee = (payee) => () => {
    const {goToDeletePayee} = this.props;
    goToDeletePayee(payee);
  }

  reloadHistory = () => () => {
    const {reloadHistory} = this.props;
    reloadHistory();
  }

  componentWillMount () {
  }

  componentDidMount () {
    const {payeeList, accountsTransfer, hasFingerprint, isUsingFingerprint, lastSuccessfulLogin, isLogin, payeeListRemittance} = this.props;
    if (isEmpty(payeeList)) {
      this.props.getTargetAccount();
    }
    if (isEmpty(accountsTransfer)) {
      this.props.getDefaultAccount();
    }
    if (lastSuccessfulLogin === 'fingerprint' && hasFingerprint && isUsingFingerprint && !isLogin) {
      Platform.OS === 'android' ? this.showFingerprintModalAndroid() : this.showFingerprintModalIOS();
    }
    if (isEmpty(payeeListRemittance)) {
      this.props.getTargetAccountRemittance();
    }
  }
  render () {
    const {visible} = this.state;
    const {cif, movetoForm, payeeStatus, mockImageLocation = false, drawer, getTargetAccount, cifCode, swiftCodeForm, onBankAccountPress, originalName, onRemittancePress, navigation, loginWithFaceRecognition, forgotEasyPin, isFaceRegistered, isLockedDevice, isFaceRecogEnabled,
      isUsingFaceRecog, isUsingFingerprint, hasFingerprint, isOBMActive, isLogin, payeeListRemittance} = this.props;
    const isRemittance = result(navigation, 'state.params.isRemittance', false);
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
      />;
    } else {
      if (startsWith(cifEmoney, 'NK')) {
        return <EmoneyUpgrade movetoForm={movetoForm} />;
      } else {
        return <DecoratedFormRemittance
          searchlist={payeesAddSecondaryText(sortPayeesRemittance(payeeListRemittance))}
          listHeader = {language.TRANSFER__OR_PICK_FROM_ADDED_PAYEE}
          inputHeader = {language.TRANSFER__PAYEE_ACCOUNT_NUMBER}
          placeholderText = {isRemittance ? language.REMITTANCE__HINTTEXT_PAYEE_ACCOUNT_NUMBER : language.HINTTEXT__PAYEE_ACCOUNT_NUMBER}
          placeholderSearch = {language.TRANSFER__SEARCH_ACCOUNT_PLACEHOLDER}
          placeholderAdd = {language.TRANSFER__ADD_ACCOUNT_PLACEHOLDER}
          labelSearch = {language.TRANSFER__SEARCH_ACCOUNT_LABEL}
          labelAdd = {language.TRANSFER__ADD_ACCOUNT_LABEL}
          labelTitlle = {language.TRANSFER__MENU_TITTLE}
          tittleSearch = {language.TRANSFER__SEARCH_TITTLE}
          btnNewAcc = {language.TRANSFER_BTN_ADD_NEW_ACCOUNT}
          buttonText = 'arrow-next-red'
          textKey = 'receiverName'
          subtextKey = 'accountNumber'
          swiftCodeText = 'swiftCode'
          onNextClick = {this.findPayee}
          onItemClick = {this.selectExistingPayee}
          onDeleteClick = {this.deletePayee}
          payeeStatus = {payeeStatus}
          drawer = {drawer}
          reloadHistory = {this.reloadHistory}
          onChangeText = {noop}
          minLength={6}
          inputProps={{keyboardType: 'default', maxLength: 30, returnKeyType: 'search'}}
          inputPropsAdd={{keyboardType: 'phone-pad', maxLength: 30}}
          disabled={this.state.disabled}
          mockImageLocation={mockImageLocation}
          getTargetAccount={getTargetAccount}
          swiftCodeForm={swiftCodeForm}
          onBankNamePress={onBankAccountPress}
          originalName={originalName}
          onRemittancePress={onRemittancePress}
          isRemittance={isRemittance}
          isLogin={isLogin}
        />;
      }
    }

  }
}

const mapStateToProps = (state, props) => ({
  swiftCodeForm: result(state, 'form.addSwiftCode.values', {}),
  payeeList: result(state, 'payees', []),
  language: state.currentLanguage,
  cif: result(state, 'user.profile.customer.cifCode', ''),
  loginName: result(state, 'user.profile.loginName', ''),
  payeeStatus: result(state, 'payeeStatusRemittance', ''),
  drawer: result(state, 'drawer', false),
  accountsBiller: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  accountsTransfer: getTransferPossibleAccounts(result(state, 'accounts', []), 'ft', result(props, 'navigation.state.params.payee', {})),
  cifCode: result(state, 'insuranceDataTravel.cifCode', ''),
  originalName: result(state, 'form.addPayeeAcc.values.originalName', ''),
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
  payeeListRemittance: result(state, 'payeesRemittance', []),
});

const mapDispatchToProps = (dispatch) => ({
  selectExistingPayee: (payee) => {
    dispatch(NavigationActions.navigate({routeName: 'RemittanceRecipientData', params: {payee, isExisting: true}}));
  },
  goToDeletePayee: (payee) => {
    dispatch(deleteSelectedPayeeRemittance(payee));
  },
  reloadHistory: () => {
    dispatch(getTargetAccountRemittance());
  },
  goToAddPayee: (swiftCode) => {
    dispatch(setupSwiftCodeBankInformation(swiftCode));
  },
  // before login
  movetoForm: () => {
    dispatch(NavigationActions.navigate({routeName: 'ProductsListUpgradeEmoney'}));
  },
  getFavBiller: () => dispatch(getFavBiller()),
  getTargetAccount: () => dispatch(getTargetAccount()),
  getDefaultAccount: () => dispatch(getDefaultAccount()),

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
  getTargetAccountRemittance: () => {
    dispatch(getTargetAccountRemittance());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RemittanceSwiftCodePage);
