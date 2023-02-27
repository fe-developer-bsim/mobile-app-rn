import React from 'react';
import PropTypes from 'prop-types';
import AccountMenu from '../../components/Account/AccountMenu.component.js';
import {Linking, Platform} from 'react-native';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {inquiryRecurringTransfer} from '../../state/thunks/fundTransfer.thunks';
import {goToMyVoucher, couponCustomerView, getBillpayHistory, couponCustomerCounting, getDataOrderWithoutSpinner, goToLocator, checkCameraPermissionAndNavigate, resetAndNavigate,
  tokenInvoiceHistory, goReferralCode, listSetLimitTransactionAccPage, getInternetBankingSettings, getReleaseDeviceQRRevamp, saveEasypin, triggerAuthNavigate, getCacheBankList} from '../../state/thunks/common.thunks';
import {NavigationActions} from 'react-navigation';
import {generatePicture, deletePicture, goFavBiller, goAutoDebitList, getTdConfig, linkCreditCard, validateCloseEmoney, openInbox, getNilaiQ} from '../../state/thunks/dashboard.thunks';
import {upperCase, getTransferPossibleAccountsNoEmoney, getAllAccountsExcept} from '../../utils/transformer.util';
import moment from 'moment';
import forEach from 'lodash/forEach';
import {getLuckyDipTicket, getGenerateCode, goToShowQR} from '../../state/thunks/luckyDip.thunks.js';
import {logoutDashboard, refreshDevice, loginToAccount, loginThunk, clearAndResetPasswordBurgerMenu} from '../../state/thunks/onboarding.thunks';
import {Toast, Alert} from '../../utils/RNHelpers.util.js';
import {language} from '../../config/language';
import {insurance} from '../../state/thunks/Insurance.thunks';
import {getQRGpn} from '../..//state/thunks/QRGpn.thunks';
import isEmpty from 'lodash/isEmpty';
import {validatePinCodeLength} from '../../utils/validator.util';
import {reduxForm} from 'redux-form';
import TouchID from 'react-native-touch-id';
import * as actionCreators from '../../state/actions/index.actions';
import {get, storageKeys, set} from '../../utils/storage.util';
import {goToSplitBillMenu} from '../../state/thunks/splitBill.thunks';
import toLower from 'lodash/toLower';
import {getCurrentSectionAccountMenu} from '../../state/thunks/digitalAccountOpening.thunks';
import {inquiryProxyByEDW} from '../../state/thunks/biFast.thunks';
import {find, startsWith} from 'lodash';
import {getLoginPreference} from '../../state/thunks/appSetup.thunks.js';

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

const formConfig = {
  form: 'loginEasyPinFormAccount',
  destroyOnUnmount: true,
  initialValues: {
    easyPin: '',
  },
  onSubmit: (values, dispatch, {isLockedDevice, isOBM, isResetEasypin = false, regisATM = false, loginATM = false, isUserRegistered = false, isProfile = true}) => {
    dispatch(loginToAccount(values, isLockedDevice, isOBM, isResetEasypin, regisATM, loginATM, isUserRegistered, '', isProfile)).then(() => {
      dispatch(getDataOrderWithoutSpinner());
    });
  },
  validate: (values) => ({
    _error: validatePinCodeLength(values['easyPin'])
  }),
};

const DecoratedForm = reduxForm(formConfig)(AccountMenu);

const mapStateToProps = (state) => ({
  currentLanguage: state.currentLanguage.id,
  profile: result(state, 'user.profile', {}),
  profilePicture: result(state, 'savePicture', ''),
  isUndian: upperCase(result(state, 'config.flag.flagUndian', 'INACTIVE')) === upperCase('ACTIVE'),
  couponCounterDetail: result(state, 'couponCounterDetail', 0),
  orderData: result(state, 'myDataOrder', []),
  luckyDipCounter: result(state, 'counterLuckyDip.currentToken', '0'),
  isLuckyDipActive: result(state, 'config.flag.flagLuckyDip', 'inactive'),
  isLogin: !isEmpty(result(state, 'user', {})),

  isLockedDevice: Boolean(state.appInitKeys && state.appInitKeys.username && state.appInitKeys.tokenClient && state.appInitKeys.tokenServer),
  isFaceRegistered: state.isFaceRegistered.isFaceRegistered,
  isUsingFaceRecog: result(state, 'faceRecognition', false),
  isUsingFingerprint: result(state, 'fingerprint', false),
  hasFingerprint: result(state, 'hasFingerprint', false),
  isFaceRecogEnabled: result(state, 'config.isFaceRecognitionEnabled', false),
  lastSuccessfulLogin: result(state, 'lastSuccessfulLogin', 'easypin'),
  isOBMActive: result(state, 'config.isOBMActive'),
  hideCloseEmoney: upperCase(result(state, 'config.toogleCloseEmoney', 'YES')) !== 'YES',
  cif: result(state, 'user.profile.customer.cifCode', ''),
  labelNewSplitBill: result(state, 'labelNewSplitBill', {}),
  primaryToogleAccount: result(state, 'primaryToogleAccount', false),
  switchAccountToogleBE: toLower(result(state, 'config.flag.primaryToogleAccount', 'inactive')) === 'active',
  termsCondition: result(state, 'config.attention.urlSimobiOnboardingTnCWithoutCheckbox', ''),
  privacyPolicy: result(state, 'config.attention.urlSimobiPrivacyPolicy', ''),
  flagMgm: result(state, 'config.hideMGM', ''),
  accounts: result(state, 'accounts', []),
  tagQrTTS: result(state, 'generateQRTTSTag', {}),
  formValues: result(state, 'form.loginEasyPinFormAccount.values'),
  savingAccounts: getTransferPossibleAccountsNoEmoney(result(state, 'accounts', []), 'ft'),
  user: state.user,
  toogleLuckyDraw: result(state, 'config.toogleLuckyDraw', ''),
  formEasypin: result(state, 'form.loginEasyPinFormAccount.values.easyPin', ''),
  statusMember: toLower(result(state, 'memberUser', '')),
  username: result(state, 'user.profile.loginName', ''),
  nilaiQScore_Beta: result(state, 'config.toggleNilaiQ_Beta', true),
  toggleNilaiQ_SDK: result(state, 'config.toggleNilaiQ_SDK', true),
});

const mapDispatchToProps = (dispatch) => ({
  inquiryRecurringTransfer: () => dispatch(inquiryRecurringTransfer()),
  goToMyCoupon: () => dispatch(couponCustomerView()),
  goToMyVoucher: () => dispatch(goToMyVoucher()),
  goToSettings: () => dispatch(NavigationActions.navigate({routeName: 'AccountSettings'})),
  setImageData: (data) => dispatch(generatePicture(data)),
  delImageData: () => dispatch(deletePicture()),
  goToMyLuckyDraw: () => dispatch(NavigationActions.navigate({routeName: 'LuckyDrawScreen'})),
  getFavBiller: () => {
    dispatch(actionCreators.clearAddFavoriteTrx());
    dispatch(goFavBiller());
  },
  getBillpayHistory: () => dispatch(getBillpayHistory()),
  goAutodebitList: () => dispatch(goAutoDebitList()),
  couponCustomerCounting: () => dispatch(couponCustomerCounting()),
  getDataOrder: (checkFormSplitBill) => dispatch(getDataOrderWithoutSpinner(checkFormSplitBill)),
  inquiryLuckyDipCoupon: () => {
    dispatch(NavigationActions.navigate({routeName: 'LuckyDipMainPage', params: {pathRoute: 'AccountMenu'}}));
  },
  getLuckyDipTicket: () => {
    dispatch(getLuckyDipTicket());
  },
  gotoGenerate: () => dispatch(getGenerateCode()),
  showQR: () => dispatch(goToShowQR()),
  onRefresh: () => dispatch(refreshDevice()),
  newProduct: () => {
    dispatch(NavigationActions.navigate({routeName: 'ProductsList'}));
  },
  getTdCreate: () => {
    dispatch(actionCreators.clearValueTD());
    dispatch(getTdConfig());
  },
  getInsurance: () => {
    dispatch(insurance());
  },
  getQRGpn: () => {
    dispatch(actionCreators.clearValueOpenMerchant());
    dispatch(getQRGpn());
  },
  linkCreditCard: () => {
    dispatch(linkCreditCard());
  },
  goToOffers: () => {
    dispatch(NavigationActions.navigate({routeName: 'Offers'}));
  },
  goToLocator: () => {
    dispatch(goToLocator());
  },
  logout: () => {
    dispatch(logoutDashboard());
  },

  forgotEasyPin: () => {
    dispatch(clearAndResetPasswordBurgerMenu());
  },
  loginWithFaceRecognition: (isLockedDevice) => {
    dispatch(checkCameraPermissionAndNavigate('CameraPage', {isLockedDevice, action: 'Login'}));
  },
  loginFingerprint: (isLockedDevice, isOBMActive) => {
    if (isOBMActive === 'TRUE') {
      dispatch(loginToAccount({}, isLockedDevice));
    } else {
      dispatch(loginThunk({}, isLockedDevice));
    }
  },
  resetAndNavigateTo: (destinationRoute, params) => () => {
    dispatch(resetAndNavigate(destinationRoute, params));
  },
  validateClosingEmoney: () => {
    dispatch(validateCloseEmoney());
  },
  chooseServices: () => {
    dispatch(NavigationActions.navigate({routeName: 'ChooseServices'}));
  },
  getValas: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(NavigationActions.navigate({routeName: 'ValasItem'}));
  },
  checkBill: () => get(storageKeys['NEW_SPLITBILL']).
    then((res) => {
      dispatch(actionCreators.labelNewSplitBill(res));
    }),
  goToSplitBillMenu: () => {
    set(storageKeys['NEW_SPLITBILL'], true);
    dispatch(actionCreators.hideDrawer());
    dispatch(goToSplitBillMenu());
  },
  goToPushInvoiceList: () => dispatch(tokenInvoiceHistory()),
  goToSwitchpage: () => {
    dispatch(NavigationActions.navigate({routeName: 'SetDefaultAutoDebitScreen'}));
  },
  goToTnC: (urlLink, singleBilingual) => () => {
    dispatch(NavigationActions.navigate({routeName: 'TnCPageAccount', params: {urlLink, singleBilingual}}));
  },
  goToPrivacy: (urlLink, singleBilingual) => () => {
    dispatch(NavigationActions.navigate({routeName: 'PrivacyPageAccount', params: {urlLink, singleBilingual}}));
  },
  setLimit: () => {
    dispatch(listSetLimitTransactionAccPage());
  },
  goReferralCode: () => () => dispatch(goReferralCode()),
  getCurrentSectionAccountMenu: () => {
    dispatch(actionCreators.saveProductCode('PD'));
    dispatch(getCurrentSectionAccountMenu());
  },
  manageBIFast: () => {
    dispatch(inquiryProxyByEDW());
  },
  goToInternetBankingSettings: () => dispatch(getInternetBankingSettings()),
  getLoginPreference: () => {
    dispatch(getLoginPreference());
    dispatch(resetAndNavigate('LoginPreference'));
  },
  goToShowQrDevice: (loginName, isSearch) => () => {
    dispatch(saveEasypin());
    dispatch(getReleaseDeviceQRRevamp(loginName, isSearch));
  },
  openInbox: () => {
    dispatch(openInbox());
  },
  upgradeEmoney: () => {
    dispatch(NavigationActions.navigate({routeName: 'EmoneyUpgradeBenefit'}));
  },
  goToMembership: () => {
    dispatch(NavigationActions.navigate({routeName: 'MembershipDetail'}));
  },
  getCacheBankList: () => {
    dispatch(getCacheBankList());
  },
  goToNilaiQScore: () => {
    dispatch(getNilaiQ());
  },
  dispatch: (data) => dispatch(data)
});


class AccountMenuPage extends React.Component {
  state = {
    backgrounded: false,
    backgroundedTime: new Date(),
    timeout: 10,
    visible: false,
    checkLogin: false
  }
  static propTypes = {
    profile: PropTypes.object,
    inquiryRecurringTransfer: PropTypes.func,
    goToMyCoupon: PropTypes.func,
    goToMyVoucher: PropTypes.func,
    goToSettings: PropTypes.func,
    setImageData: PropTypes.func,
    profilePicture: PropTypes.object,
    delImageData: PropTypes.func,
    goToMyLuckyDraw: PropTypes.func,
    isUndian: PropTypes.bool,
    getFavBiller: PropTypes.func,
    getBillpayHistory: PropTypes.func,
    couponCounterDetail: PropTypes.number,
    orderData: PropTypes.array,
    currentLanguage: PropTypes.string,
    goAutodebitList: PropTypes.func,
    couponCustomerCounting: PropTypes.func,
    getDataOrder: PropTypes.func,
    inquiryLuckyDipCoupon: PropTypes.func,
    getLuckyDipTicket: PropTypes.func,
    luckyDipCounter: PropTypes.string,
    isLuckyDipActive: PropTypes.string,
    gotoGenerate: PropTypes.func,
    showQR: PropTypes.func,
    onRefresh: PropTypes.func,
    newProduct: PropTypes.func,
    getTdCreate: PropTypes.func,
    getInsurance: PropTypes.func,
    getQRGpn: PropTypes.func,
    linkCreditCard: PropTypes.func,
    goToOffers: PropTypes.func,
    goToLocator: PropTypes.func,
    logout: PropTypes.func,
    isLogin: PropTypes.bool,
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
    resetAndNavigateTo: PropTypes.func,
    dispatch: PropTypes.func,
    validateClosingEmoney: PropTypes.func,
    chooseServices: PropTypes.func,
    hideCloseEmoney: PropTypes.bool,
    cif: PropTypes.string,
    goToMerchantList: PropTypes.func,
    getValas: PropTypes.func,
    goToPushInvoiceList: PropTypes.func,
    goToSplitBillMenu: PropTypes.func,
    checkBill: PropTypes.func,
    labelNewSplitBill: PropTypes.object,
    setLimit: PropTypes.func,
    goToSwitchpage: PropTypes.func,
    primaryToogleAccount: PropTypes.bool,
    switchAccountToogleBE: PropTypes.bool,
    goToTnC: PropTypes.func,
    goToPrivacy: PropTypes.func,
    termsCondition: PropTypes.string,
    privacyPolicy: PropTypes.string,
    goReferralCode: PropTypes.func,
    flagMgm: PropTypes.string,
    getCurrentSectionAccountMenu: PropTypes.func,
    getListReceiver: PropTypes.object,
    manageBIFast: PropTypes.func,
    accounts: PropTypes.object,
    tagQrTTS: PropTypes.object,
    formValues: PropTypes.object,
    savingAccounts: PropTypes.array,
    goToInternetBankingSettings: PropTypes.func,
    getLoginPreference: PropTypes.func,
    goToShowQr: PropTypes.func,
    user: PropTypes.object,
    toogleLuckyDraw: PropTypes.string,
    openInbox: PropTypes.func,
    upgradeEmoney: PropTypes.func,
    goToShowQrDevice: PropTypes.func,
    formEasypin: PropTypes.string,
    getCacheBankList: PropTypes.func,
    statusMember: PropTypes.string,
    goToMembership: PropTypes.func,
    username: PropTypes.string,
    goToNilaiQScore: PropTypes.func,
    nilaiQScore_Beta: PropTypes.bool,
    toggleNilaiQ_SDK: PropTypes.bool,
  }

  // for login
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
    const {hasFingerprint, isUsingFingerprint, lastSuccessfulLogin, isLogin} = this.props;
    this.props.checkBill();
    if (!isLogin) {
      if (lastSuccessfulLogin === 'fingerprint' && hasFingerprint && isUsingFingerprint) {
        Platform.OS === 'android' ? this.showFingerprintModalAndroid() : this.showFingerprintModalIOS();
      }
    }
    this.props.getCacheBankList();
  }


  // for acc menu
  componentWillMount () {
    const {isLogin, getListReceiver} = this.props;
    const checkFormSplitBill = result(getListReceiver, 'isFormSplitBill', false);
    if (isLogin) {
      this.props.getBillpayHistory();
      this.props.couponCustomerCounting();
      this.props.getDataOrder(checkFormSplitBill);
      if (this.props.isLuckyDipActive === 'active' || this.props.isLuckyDipActive === 'ACTIVE') {
        this.props.getLuckyDipTicket();
      }
    }
  }

  refresh = () => {
    const {onRefresh} = this.props;
    this.setState(this.state);
    onRefresh();
  }

  onCustomerCall = (telephone) => () => {
    Linking.canOpenURL(telephone).then((supported) => {
      if (supported) {
        Linking.openURL(telephone);
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_CALL, Toast.LONG);
      }
    }).catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_CALL), Toast.LONG);
  }

  toShowQr = () => {
    const {dispatch, goToShowQrDevice, user, navigation} = this.props;
    const isSearch = result(navigation, 'state.params.isSearch', false);
    const loginName = result(user, 'profile.loginName', '');
    const params = {onSubmit: goToShowQrDevice(loginName, isSearch), amount: 0, isOtp: false};
    dispatch(triggerAuthNavigate('lkd', 0, true, 'Auth', params));
  }

  urlWhatsapp = 'https://api.whatsapp.com/send?phone=6288221500153&text=Hi%20Prissa';


  prissaWhatsappURL = () => {
    Linking.canOpenURL(this.urlWhatsapp).then((supported) => {
      if (supported) {
        Linking.openURL(this.urlWhatsapp);
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_HANDLE_URL, Toast.LONG);
      }
    });
  }

  render () {
    const {visible} = this.state;
    const {profile, inquiryRecurringTransfer, goToMyCoupon, goToMyVoucher, goToSettings, setImageData, luckyDipCounter, profilePicture, delImageData, goToMyLuckyDraw, isUndian, getFavBiller, getBillpayHistory, couponCounterDetail, orderData, goAutodebitList, currentLanguage,
      inquiryLuckyDipCoupon, isLuckyDipActive, gotoGenerate, showQR, newProduct, getTdCreate, getInsurance, getQRGpn, linkCreditCard, goToOffers, goToLocator, logout, isLogin, loginWithFaceRecognition, forgotEasyPin, isFaceRegistered, isLockedDevice, isFaceRecogEnabled,
      isUsingFaceRecog, isUsingFingerprint, hasFingerprint, navigation, isOBMActive, resetAndNavigateTo, validateClosingEmoney, chooseServices, hideCloseEmoney, cif, goToPushInvoiceList, goToMerchantList, getValas, goToSwitchpage, primaryToogleAccount, switchAccountToogleBE,
      goToTnC, goToPrivacy, termsCondition, privacyPolicy, goReferralCode, flagMgm, getCurrentSectionAccountMenu, goToSplitBillMenu, labelNewSplitBill, setLimit, manageBIFast, accounts, savingAccounts = [], tagQrTTS, goToInternetBankingSettings, getLoginPreference,
      toogleLuckyDraw, openInbox, upgradeEmoney, formEasypin, statusMember, goToMembership, username, goToNilaiQScore, nilaiQScore_Beta, toggleNilaiQ_SDK} = this.props;
    let sizeVoucher = 0;
    forEach(orderData, function (data) {
      const expiredDate = result(data, 'expiredDate', '');
      const expiredDates = moment(expiredDate).format('D MMM YYYY hh:mm');
      const currentDate = moment().format('D MMM YYYY hh:mm');
      const isExpired = moment(currentDate).isSameOrAfter(expiredDates);
      const typeVoucher = result(data, 'typeVoucher', '');
      const redeemedDate = result(data, typeVoucher === 'GIVEAWAY' || typeVoucher === 'EVOUCHER' ? 'data.redeemedDate' : 'redeemedDate', '');
      const isRedeemed = !isEmpty(redeemedDate);
      if (!isExpired && !isRedeemed && data !== true) {
        return sizeVoucher = sizeVoucher + 1;
      }
    });
    const filteredAccount = getAllAccountsExcept(savingAccounts);
    const isOBM = result(navigation, 'state.params.isOBM') === false;
    const isOBMPassword = result(this.props, 'navigation.state.params.isOBMPassword');
    const isOBMDashboard = result(this.props, 'navigation.state.params.isOBMDashboard');
    const emoneyKycOnly = !find(accounts, {accountType: 'SavingAccount'}) && find(accounts, {accountType: 'emoneyAccount'}) && !startsWith(cif, 'NK');
    return <DecoratedForm profile={profile} inquiryRecurringTransfer={inquiryRecurringTransfer} couponCounterDetail={couponCounterDetail} cif={cif} goToMyCoupon={goToMyCoupon} goToMyVoucher={goToMyVoucher} goToSettings={goToSettings}
      luckyDipCounter={luckyDipCounter} hideCloseEmoney={hideCloseEmoney} setImageData={setImageData} profilePicture={profilePicture} delImageData={delImageData} goToMyLuckyDraw={goToMyLuckyDraw} isUndian={isUndian} getFavBiller={getFavBiller}
      getBillpayHistory={getBillpayHistory} sizeVoucher={sizeVoucher} goAutodebitList={goAutodebitList} currentLanguage={currentLanguage} inquiryLuckyDipCoupon={inquiryLuckyDipCoupon} isLuckyDipActive={isLuckyDipActive} gotoGenerate={gotoGenerate}
      showQR={showQR} onRefresh={this.refresh} newProduct={newProduct} getTdCreate={getTdCreate} getInsurance={getInsurance} getQRGpn={getQRGpn} linkCreditCard={linkCreditCard} goToOffers={goToOffers} onPrimaryCustomerCall={this.onCustomerCall('tel:1500153')}
      onSecondaryCustomerCall={this.onCustomerCall('tel:50188888')} goToLocator={goToLocator} logout={logout} isLogin={isLogin}   goRegister={this.goRegister} loginWithFaceRecognition={loginWithFaceRecognition} visible={visible} showFingerprintModalIOS={this.showFingerprintModalIOS}
      showFingerprintModalAndroid={this.showFingerprintModalAndroid} onModalClose={this.onModalClose} handleAuthenticationAttempted={this.handleAuthenticationAttempted} loginFaceRecognition={this.loginFaceRecognition} forgotEasyPin={forgotEasyPin} isFaceRegistered={isFaceRegistered}
      isLockedDevice={isLockedDevice} isFaceRecogEnabled={isFaceRecogEnabled} isUsingFaceRecog={isUsingFaceRecog} isUsingFingerprint={isUsingFingerprint} hasFingerprint={hasFingerprint} isOBM={isOBM} isOBMPassword={isOBMPassword} isOBMDashboard={isOBMDashboard} isOBMActive={isOBMActive}
      resetAndNavigate={resetAndNavigateTo} validateClosingEmoney={validateClosingEmoney} chooseServices={chooseServices} toPushInvoiceList={goToPushInvoiceList} toMerchantList={goToMerchantList} getValas={getValas} goToSwitchpage={goToSwitchpage} primaryToogleAccount={primaryToogleAccount}
      switchAccountToogleBE={switchAccountToogleBE} goToTnC={goToTnC} goToPrivacy={goToPrivacy} termsCondition={termsCondition} privacyPolicy={privacyPolicy} goToSplitBillMenu={goToSplitBillMenu} labelNewSplitBill={labelNewSplitBill} goReferralCode={goReferralCode()} flagMgm={flagMgm}
      getCurrentSectionAccountMenu={getCurrentSectionAccountMenu} setLimit={setLimit} manageBIFast={manageBIFast} emoneyKycOnly={emoneyKycOnly} savingAccounts={filteredAccount} tagQrTTS={tagQrTTS} getLoginPreference={getLoginPreference} toShowQr={this.toShowQr} toogleLuckyDraw={toogleLuckyDraw}
      openInbox={openInbox} upgradeEmoney={upgradeEmoney} getInternetBankingSettings={goToInternetBankingSettings} formEasypin={formEasypin} statusMember={statusMember} goToMembership={goToMembership} username={username}
      prissaWhatsappURL={this.prissaWhatsappURL} goToNilaiQScore={goToNilaiQScore} nilaiQScore_Beta={nilaiQScore_Beta} toggleNilaiQ_SDK={toggleNilaiQ_SDK}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMenuPage);
