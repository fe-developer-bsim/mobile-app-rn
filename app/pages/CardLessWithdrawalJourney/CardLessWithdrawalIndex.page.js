import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SearcheableListTrf from '../../components/SearcheableList/SearcheableListTrf.component';
import {NavigationActions} from 'react-navigation';
import {sortPayees, payeesAddSecondaryText, upperCase, getTransferPossibleAccounts} from '../../utils/transformer.util';
import result from 'lodash/result';
import find from 'lodash/find';
import noop from 'lodash/noop';
import {reduxForm} from 'redux-form';
import {setupCardlessWithdrawal, deleteSelectedPayee, getDefaultAccount}  from '../../state/thunks/fundTransfer.thunks';
import {language} from '../../config/language';
import {goToGenerateMain} from '../../state/thunks/generateCode.thunks';
import {refreshStorageSend, getTargetAccount, checkCameraPermissionAndNavigate, getCacheBankList, getChargeListCache} from '../../state/thunks/common.thunks';
import EmoneyUpgrade from '../../components/EmoneyJourney/EmoneyUpgradeBenefitIndex.component';
import startsWith from 'lodash/startsWith';
import isEmpty from 'lodash/isEmpty';
import {login as loginThunk, clearAndResetPasswordBurgerMenu, loginToSendCash} from '../../state/thunks/onboarding.thunks';
import {validatePinCodeLength} from '../../utils/validator.util';
import TouchID from 'react-native-touch-id';
import {Platform, Toast, Alert} from '../../utils/RNHelpers.util';
import LoginEasyPinForm from '../../components/OnboardingJourney/LoginWithEasyPinAccount.component';

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

const formConfig = {
  form: 'loginEasyPinFormCardless',
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

const DecoratedForm = reduxForm(formConfig)(LoginEasyPinForm);

class CardLessWithdrawalIndexPage extends Component {
  state = {
    disabled: false,
    visible: false
  }
  static propTypes = {
    goToAddPhoneNumber: PropTypes.func,
    selectRecentCardLessWithdrawal: PropTypes.func,
    payeeList: PropTypes.array,
    cif: PropTypes.string,
    loginName: PropTypes.string,
    goToDeletePayee: PropTypes.func,
    payeeStatus: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    isCardless: PropTypes.bool,
    goToReloadHistory: PropTypes.func,
    toGenerateMain: PropTypes.func,
    haveEmoney: PropTypes.object,
    flagLKDCashOut: PropTypes.bool,
    transactionTypeLKD: PropTypes.object,
    drawer: PropTypes.bool,
    movetoForm: PropTypes.func,
    accounts: PropTypes.array,
    getTargetAccount: PropTypes.func,
    accountsTransfer: PropTypes.array,
    getDefaultAccount: PropTypes.func,
    cifCode: PropTypes.string,
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
    isOBMActive: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    isLogin: PropTypes.bool,
    getCacheBankList: PropTypes.func,
    getChargeListCache: PropTypes.func,
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

  // cardless

  findPayee = (phoneNumber) => {
    const {goToAddPhoneNumber, selectRecentCardLessWithdrawal, payeeList} = this.props;
    const foundPayeeOrigin = find(payeeList, {phoneNumber});
    const phoneNumberNormalize = phoneNumber.substring(0, 1) === '0' ?  '62' + phoneNumber.substring(1, phoneNumber.length) :
      phoneNumber.substring(0, 2) === '62' ?  '0' + phoneNumber.substring(2, phoneNumber.length) : phoneNumber;
    const phoneNumberFix = foundPayeeOrigin ? phoneNumber : phoneNumberNormalize;
    const foundPayee = find(payeeList, {'phoneNumber': phoneNumberFix});
    foundPayee ? selectRecentCardLessWithdrawal(foundPayee) : goToAddPhoneNumber(phoneNumber);
  }

  deletePayee = (payee) => () => {
    const {goToDeletePayee, cif, loginName} = this.props;
    goToDeletePayee(payee, cif, loginName);
  }

  reloadHistory = () => {
    const {goToReloadHistory} = this.props;
    goToReloadHistory();
  }

  selectPayee = (payee) => () => {
    const {selectRecentCardLessWithdrawal} = this.props;
    selectRecentCardLessWithdrawal(payee);
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
    this.props.getChargeListCache();
  }

  render () {
    const {visible} = this.state;
    const {payeeList = [], payeeStatus, cif, movetoForm, toGenerateMain, flagLKDCashOut, transactionTypeLKD, drawer, accounts, getTargetAccount, cifCode, loginWithFaceRecognition, forgotEasyPin, isFaceRegistered, isLockedDevice, isFaceRecogEnabled,
      isUsingFaceRecog, isUsingFingerprint, hasFingerprint, navigation, isOBMActive, isLogin} = this.props;
    const isOBM = result(navigation, 'state.params.isOBM') === false;
    const isOBMPassword = result(this.props, 'navigation.state.params.isOBMPassword');
    const isOBMDashboard = result(this.props, 'navigation.state.params.isOBMDashboard');
    const kyc = !isEmpty(find(accounts, {accountType: 'emoneyAccount'})) && !startsWith(cif, 'NK');
    const cifEmoney = isEmpty(cif) ? cifCode : cif;
    if (!isLogin) {
      return <DecoratedForm
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
        isCashless={true}
        addStyleContinue={true}
      />;
    } else {
      if (startsWith(cifEmoney, 'NK')) {
        return <EmoneyUpgrade movetoForm={movetoForm} isCashless={true} />;
      } else {
        return <SearcheableListTrf
          searchlist={payeesAddSecondaryText(sortPayees(payeeList))}
          listHeader = {language.CARDLESSWITHDRAWAL__OR_PICK_FROM_RECENT_WITHDRAWAL}
          inputHeader = {language.CARDLESSWITHDRAWAL__ADD_PHONE_NUMBER_LABEL}
          placeholderText = {language.CARDLESSWITHDRAWAL__PHONE_NUMBER}
          placeholderSearch = {language.CARDLESSWITHDRAWAL__SEARCH_ACCOUNT_PLACEHOLDER}
          placeholderAdd = {language.CARDLESSWITHDRAWAL__ADD_PHONE_NUMBER_PLACEHOLDER}
          labelSearch = {language.CARDLESSWITHDRAWAL__SEARCH_PHONE_NUMBER_LABEL}
          labelAdd = {language.CARDLESSWITHDRAWAL__ADD_PHONE_NUMBER_LABEL}
          labelTitlle = {language.CARDLESSWITHDRAWAL__MENU_TITTLE}
          tittleSearch = {language.PAYMENT_HISTORY__TITLE}
          btnNewAcc = {language.CARDLESSWITHDRAWAL__BTN_ADD_NEW_PHONE_NUMBER}
          buttonText = 'arrow-next-red'
          textKey = 'phoneNumber'
          subtextKey = 'description'
          secondaryText =''
          onNextClick = {this.findPayee}
          onItemClick = {this.selectPayee}
          onDeleteClick = {this.deletePayee}
          reloadHistory = {this.reloadHistory}
          payeeStatus = {payeeStatus}
          onChangeText = {noop}
          minLength={10}
          inputProps={{keyboardType: 'default', maxLength: 30, returnKeyType: 'search'}}
          inputPropsAdd={{keyboardType: 'phone-pad', maxLength: 30}}
          isCardless={true}
          toGenerateMain={toGenerateMain}
          flagLKDCashOut= {flagLKDCashOut}
          transactionTypeLKD= {transactionTypeLKD}
          drawer = {drawer}
          cif={cif}
          kyc={kyc}
          getTargetAccount={getTargetAccount}
          isCashless={true}
          dtActionName='Next Withdraw using phone number'
          dtActionNameHistory='Cash Withdrawal History'
        />;
      }
    }
  }
}

const mapStateToProps = (state, props) => ({
  payeeList: result(state, 'cardlessWithdrawal', []),
  language: state.currentLanguage,
  cif: result(state, 'user.profile.customer.cifCode', ''),
  loginName: result(state, 'user.profile.loginName', ''),
  payeeStatus: result(state, 'payeeStatus', ''),
  haveEmoney: result(state, 'generateCode', {}),
  flagLKDCashOut: upperCase(result(state, 'config.flag.flagLKDCashOut', 'INACTIVE')) === upperCase('ACTIVE'),
  transactionTypeLKD: result(state, 'config.transactionTypeLKD', {}),
  drawer: result(state, 'drawer', false),
  accounts: result(state, 'accounts', ''),
  accountsTransfer: getTransferPossibleAccounts(result(state, 'accounts', []), 'ft', result(props, 'navigation.state.params.payee', {})),
  cifCode: result(state, 'insuranceDataTravel.cifCode', ''),

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
  goToAddPhoneNumber: (payeeAccNo) => {
    dispatch(NavigationActions.navigate({routeName: 'CardLessWithdrawalAccount', params: {payeeAccNo}}));
  },
  goToDeletePayee: (payee, cif, loginName) => {
    dispatch(deleteSelectedPayee(payee, cif, loginName));
  },
  goToReloadHistory: () => {
    dispatch(refreshStorageSend());
  },
  selectRecentCardLessWithdrawal: (payee) => {
    dispatch(setupCardlessWithdrawal(payee));
  },
  toGenerateMain: (params) => () => {
    dispatch(goToGenerateMain(params));
  },
  movetoForm: () => {
    dispatch(NavigationActions.navigate({routeName: 'ProductsListUpgradeEmoney'}));
  },
  getTargetAccount: () => {
    dispatch(getTargetAccount());
  },
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
  getCacheBankList: () => {
    dispatch(getCacheBankList());
  },
  getChargeListCache: () => {
    dispatch(getChargeListCache());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CardLessWithdrawalIndexPage);
