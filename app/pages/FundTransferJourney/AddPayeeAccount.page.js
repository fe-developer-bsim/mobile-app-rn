import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SearcheableListTrf from '../../components/SearcheableList/SearcheableListTrf.component';
import {NavigationActions} from 'react-navigation';
import {sortPayees, payeesAddSecondaryText} from '../../utils/transformer.util';
import {result, startsWith, find, noop, isEmpty} from 'lodash';
import {setupFundTransfer, deleteSelectedPayee, getDefaultAccount, getPayeeNameBiFast, deleteSelectedPayeeBiFast}  from '../../state/thunks/fundTransfer.thunks';
import {language} from '../../config/language';
import EmoneyUpgrade from '../../components/EmoneyJourney/EmoneyUpgradeBenefitIndex.component';
import {getTargetAccount, checkCameraPermissionAndNavigate, addBiFast, getTargetAccountProxyAddress, getChargeListCache} from '../../state/thunks/common.thunks';
import {getFavBiller} from '../../state/thunks/dashboard.thunks';
import {getTransferPossibleAccounts, upperCase, formatMobileNumberEmoneyRegistration} from '../../utils/transformer.util';
import {Platform, Toast, Alert} from '../../utils/RNHelpers.util';
import {reduxForm} from 'redux-form';
import {login as loginThunk, clearAndResetPasswordBurgerMenu, loginToSendCash} from '../../state/thunks/onboarding.thunks';
import {validatePinCodeLength} from '../../utils/validator.util';
import TouchID from 'react-native-touch-id';
import LoginEasyPinForm from '../../components/OnboardingJourney/LoginWithEasyPinAccount.component';

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

const formConfig = {
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

const DecoratedForm = reduxForm(formConfig)(LoginEasyPinForm);

class AddPayeeAccountPage extends Component {
  state = {
    disabled: false,
    visible: false,
    isSeeMore: '1',
  }
  carouselRefs = {
    acountNumber: null,
    phoneNumber: null,
    email: null,
  }
  tabNames =['acountNumber', 'phoneNumber', 'email']

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
    addBiFast: PropTypes.func,
    goToAddPayeeBiFast: PropTypes.func,
    getTargetAccountProxyAddress: PropTypes.func,
    payeeStatusBiFast: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    payeeListBiFast: PropTypes.array,
    goToDeletePayeeBiFast: PropTypes.func,
    chargeList: PropTypes.array,
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


  // transfer


  findPayee = (accountNumber) => {
    const {goToAddPayee, selectExistingPayee, payeeList} = this.props;
    const foundPayee = find(payeeList, {accountNumber});
    foundPayee ? selectExistingPayee(foundPayee) : goToAddPayee((accountNumber));
  }

  findPayeeBiFast = (proxyValue) => {
    const {goToAddPayeeBiFast, selectExistingPayee, payeeListBiFast} = this.props;
    const isBiFast = this.state.isSeeMore;
    const foundPayee = find(payeeListBiFast, {proxyValue: upperCase(proxyValue)}) || find(payeeListBiFast, {proxyValue: formatMobileNumberEmoneyRegistration(proxyValue)});
    foundPayee ? selectExistingPayee(foundPayee) : goToAddPayeeBiFast(proxyValue, isBiFast);
  }

  selectExistingPayee = (payee) => () => {
    this.setState({disabled: true});
    this.props.selectExistingPayee(payee);
    setTimeout(() => {
      this.setState({disabled: false});
    }, 2000);
  }

  deletePayee = (payee) => () => {
    const {goToDeletePayee, cif, loginName} = this.props;
    goToDeletePayee(payee, cif, loginName);
  }

  reloadHistory = () => {
    const {reloadHistory} = this.props;
    reloadHistory();
  }

  reloadHistoryBiFast = () => {
    const {getTargetAccountProxyAddress} = this.props;
    getTargetAccountProxyAddress();
  }

  deletePayeeBiFast = (payee) => () => {
    const {goToDeletePayeeBiFast, cif, loginName} = this.props;
    goToDeletePayeeBiFast(payee, cif, loginName);
  }

  _onChangeTab = ({i, from}) => {
    if (i === from)
      return;
    const activeTab = this.tabNames[i];
    this.setState({activeTab}, () => {
      if (activeTab === 'acountNumber') this.setState({isSeeMore: '1'}); // logic buat acountNumber
      else if (activeTab === 'phoneNumber') this.setState({isSeeMore: '2'}); // logic buat phoneNumber
      else if (activeTab === 'email') this.setState({isSeeMore: '3'}); // logic buat email
    });
  }

  addProxyBiFast = (textBiFast) => {
    const {addBiFast} = this.props;
    addBiFast(textBiFast);
  }

  // componentWillMount () {
  //   this.props.getFavBiller();
  // }

  componentDidMount () {
    const {payeeList, accountsTransfer, hasFingerprint, isUsingFingerprint, lastSuccessfulLogin, isLogin, payeeListBiFast, chargeList} = this.props;
    if (isEmpty(payeeList)) {
      this.props.getTargetAccount();
    }
    if (isEmpty(accountsTransfer)) {
      this.props.getDefaultAccount();
    }
    if (lastSuccessfulLogin === 'fingerprint' && hasFingerprint && isUsingFingerprint && !isLogin) {
      Platform.OS === 'android' ? this.showFingerprintModalAndroid() : this.showFingerprintModalIOS();
    }
    if (isEmpty(payeeListBiFast)) {
      this.props.getTargetAccountProxyAddress();
    }
    if (isEmpty(chargeList)) {
      this.props.getChargeListCache();
    }
  }


  render () {
    const {visible} = this.state;
    const {payeeList = [], cif, movetoForm, payeeStatus, mockImageLocation = false, drawer, getTargetAccount, cifCode, loginWithFaceRecognition, forgotEasyPin, isFaceRegistered, isLockedDevice, isFaceRecogEnabled,
      isUsingFaceRecog, isUsingFingerprint, hasFingerprint, navigation, isOBMActive, isLogin, payeeListBiFast = [], payeeStatusBiFast} = this.props;
    const isOBM = result(navigation, 'state.params.isOBM') === false;
    const isOBMPassword = result(this.props, 'navigation.state.params.isOBMPassword');
    const isOBMDashboard = result(this.props, 'navigation.state.params.isOBMDashboard');
    const cifEmoney = isEmpty(cif) ? cifCode : cif;
    const SetBiFast = this.state.isSeeMore;
    const isBiFast = this.state.isSeeMore === '2' || this.state.isSeeMore === '3';
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
        isTransfer={true}
        addStyleContinue={true}
      />;
    } else {
      if (startsWith(cifEmoney, 'NK')) {
        return <EmoneyUpgrade movetoForm={movetoForm} isTransfer={true} />;
      } else {
        return <SearcheableListTrf
          searchlist={isBiFast ? payeesAddSecondaryText(sortPayees(payeeListBiFast)) : payeesAddSecondaryText(sortPayees(payeeList))}
          listHeader = {language.TRANSFER__OR_PICK_FROM_ADDED_PAYEE}
          inputHeader = {language.TRANSFER__PAYEE_ACCOUNT_NUMBER}
          placeholderText = {language.HINTTEXT__PAYEE_ACCOUNT_NUMBER}
          placeholderSearch = {language.TRANSFER__SEARCH_ACCOUNT_PLACEHOLDER}
          placeholderAdd = {language.TRANSFER__ADD_ACCOUNT_PLACEHOLDER}
          labelSearch = {language.TRANSFER__SEARCH_ACCOUNT_LABEL}
          labelAdd = {language.TRANSFER__ADD_ACCOUNT_LABEL}
          labelTitlle = {language.TRANSFER__MENU_TITTLE}
          tittleSearch = {language.TRANSFER__SEARCH_TITTLE}
          titleBiFast = {language.BIFAST__TRANSFER}
          btnNewAcc = {language.TRANSFER_BTN_ADD_NEW_ACCOUNT}
          buttonText = 'arrow-next-red'
          textKey = 'name'
          subtextKey = 'accountNumber'
          onNextClick = {this.findPayee}
          onItemClick = {this.selectExistingPayee}
          onDeleteClick = {isBiFast ? this.deletePayeeBiFast : this.deletePayee}
          payeeStatus = {isBiFast ? payeeStatusBiFast : payeeStatus}
          drawer = {drawer}
          reloadHistory = {isBiFast ? this.reloadHistoryBiFast : this.reloadHistory}
          onChangeText = {noop}
          minLength={6}
          inputProps={{keyboardType: 'default', maxLength: 30, returnKeyType: 'search'}}
          inputPropsAdd={{keyboardType: 'phone-pad', maxLength: 30}}
          inputPropsBiFast={{keyboardType: 'default', maxLength: 50}}
          disabled={this.state.disabled}
          mockImageLocation={mockImageLocation}
          getTargetAccount={getTargetAccount}
          isLogin={isLogin}
          isTransfer={true}
          toggleBiFast={this._onChangeTab}
          isBiFast={isBiFast}
          placeholderEmail= 'Email Address'
          placeholderPhone = 'Phone Number'
          placeholderBiFast= 'Email Address / Phone Number'
          onNextClickBiFast ={this.findPayeeBiFast}
          addProxyBiFast={this.addProxyBiFast}
          textKeyBiFast = 'proxyValue'
          SetBiFast={SetBiFast}
          dtActionName={isBiFast ? 'Next BiFast' : 'Next Account Number'}
          dtActionNameHistory={isBiFast ? 'BiFast History' : 'Account Number History'}
        />;
      }
    }
  }
}

const mapStateToProps = (state, props) => ({
  payeeList: result(state, 'payees', []),
  language: state.currentLanguage,
  cif: result(state, 'user.profile.customer.cifCode', ''),
  loginName: result(state, 'user.profile.loginName', ''),
  payeeStatus: result(state, 'payeeStatus', ''),
  drawer: result(state, 'drawer', false),
  accountsBiller: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
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
  payeeStatusBiFast: result(state, 'payeeStatusProxyAddress', ''),
  payeeListBiFast: result(state, 'payeeProxyAddress', []),
  chargeList: result(state, 'chargeList', []),
});
const mapDispatchToProps = (dispatch) => ({
  goToAddPayee: (payeeAccNo) => {
    dispatch(NavigationActions.navigate({routeName: 'AddPayee', params: {payeeAccNo}}));
  },
  goToDeletePayee: (payee, cif, loginName) => {
    dispatch(deleteSelectedPayee(payee, cif, loginName));
  },
  reloadHistory: () => {
    dispatch(getTargetAccount());
  },
  selectExistingPayee: (payee) => {
    dispatch(setupFundTransfer(payee));
  },
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
  addBiFast: (textBiFast) => {
    dispatch(addBiFast(textBiFast));
  },
  goToAddPayeeBiFast: (payeeAccNo, isBiFast) => {
    dispatch(getPayeeNameBiFast(payeeAccNo, isBiFast));
  },
  getTargetAccountProxyAddress: () => {
    dispatch(getTargetAccountProxyAddress());
  },
  goToDeletePayeeBiFast: (payee, cif, loginName) => {
    dispatch(deleteSelectedPayeeBiFast(payee, cif, loginName));
  },
  getChargeListCache: () => {
    dispatch(getChargeListCache());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPayeeAccountPage);
