import React from 'react';
import PropTypes from 'prop-types';
import {DeviceEventEmitter, Platform, AppState, Linking, NativeModules, NativeEventEmitter} from 'react-native';
import OverlaySpinner from './components/OverlaySpinner/OverlaySpinner.component';
import {hidePaymentModal, setNetworkStatus, resetNetworkBar, saveTutorialProduct, saveTutorialOnboard} from './state/actions/index.actions';
import {noop, isEmpty, isEqual, clone, result} from 'lodash';
import {ConnectedRoutes} from './routes/Router';
import OfflineBar from './components/OfflineBar/OfflineBar.component';
import {tokenInit, checkAppVersion, navigateOnNotification, setLanguage, getLoginPreference, getLastSuccessfulLogin} from './state/thunks/appSetup.thunks.js';
import {hsmInit, setCurrentLanguage, showTimeoutAlert, resetAndNavigate, populateOffersPrivate, goToLocator, getToogleAutoDebitAccount, getDatacacheLuckydip} from './state/thunks/common.thunks.js';
import {connect} from 'react-redux';
import {View, StatusBar} from 'react-native';
import {get, storageKeys, clearHistory, set} from './utils/storage.util';
import {SinarmasAlert, SinarmasInputAlert} from './components/FormComponents';
import {language} from './config/language';
import {Toast} from './utils/RNHelpers.util.js';
import {lowerCase, upperCase, getErrorMessage, transformToken, transformTokenSpecialChar, transformTokenIos} from './utils/transformer.util';
import BackgroundTimer from 'react-native-background-timer';
import {setAppTimeout, cleanAppState} from './state/actions/index.actions';
import moment from 'moment';
import Drawer from 'react-native-drawer';
import * as actionCreators from './state/actions/index.actions';
import DrawerComponent from './components/Drawer/Drawer.component';
import {logout, refreshDevice, clearAndResetPasswordBurgerMenu, getGenerateCode, setOfflineStorage, getGenerateCodeII, checkLoginAllsegmentFlow, checkLoginSaving, checkLoginAllMgm, deeplinkPromo, checkLogin, checkLoginCC, checkLoginForDeeplinkPromo, resetDevice, checkLoginBiller, checkLoginEmoney} from './state/thunks/onboarding.thunks';
import {linkCreditCard, getTdConfig, redeemSmartfren, validateCloseEmoney} from './state/thunks/dashboard.thunks';
import {insurance} from './state/thunks/Insurance.thunks';
import {NavigationActions} from 'react-navigation';
import {inquiryRecurringTransfer} from './state/thunks/fundTransfer.thunks';
import {showQRTrf, QRCustomer, getQRGpn} from './state/thunks/QRGpn.thunks';
import Pushwoosh from 'pushwoosh-react-native-plugin';
import {theme} from './styles/core.styles';
import {getSimasPoinHistory, inquirySimasPoin, userTagDynatrace} from './state/thunks/common.thunks';
import {goToOfflineMain, goToGenerateMain} from './state/thunks/generateCode.thunks';
import {goToShowQR}  from './state/thunks/qrpayment.thunk';
import {getSavingProductsItems} from './state/thunks/digitalAccountOpening.thunks';
import DeepLinking from 'react-native-deep-linking';
// import {resetDevice, checkLogin, checkLoginAllsegmentFlow, checkLoginCC, checkLoginForDeeplinkPromo, checkLoginSaving, checkLoginEmoney, getBalanceEmoneyBeforeLogin, addOrder, logoutDashboard, checkLoginBiller, checkLoginAllMgm, deeplinkPromo} from '../../state/thunks/onboarding.thunks';
import {Dynatrace, DataCollectionLevel} from '@dynatrace/react-native-plugin';

let adjustAndroid;

if (Platform.OS === 'android') {
  adjustAndroid = require('react-native-adjust');
}

const mapStateToProps = ({showSpinner, sinarmasAlert, networkStatus, currentLanguage, highlightText, appTimeout, nav, drawer, user, appInitKeys, paydayLoan, config, accounts, showQRTrf, getQRGpn, qrCustomer, simasPoinHistory, simasPoin, generateCodeOnboard, savePicture, sinarmasInputAlert, timeoutReducer, labelNewSplitBill}) => ({
  isLockedDevice: Boolean(appInitKeys && appInitKeys.username && appInitKeys.tokenClient && appInitKeys.tokenServer),
  showSpinner,
  sinarmasAlert,
  networkStatus,
  currentLanguage,
  highlightText,
  appTimeout,
  nav,
  drawer,
  user,
  paydayLoan,
  getQRGpn,
  qrCustomer,
  showQRTrf,
  accounts,
  simasPoinHistory,
  simasPoin,
  savePicture,
  isSmartfrenPromoEnable: result(config, 'smartfrenPromo.isSmartfrenPromoEnable', 'no') === 'yes',
  isQrGPNEnable: lowerCase(result(config, 'qrGPNConfig.isQrGPNEnable', 'no')) === 'yes',
  cif: result(user, 'profile.customer.cifCode', ''),
  flag: result(config, 'flag', {}),
  link: isEmpty(result(config, 'attention.urlSimobiOnboardingTnCWithoutCheckbox', '')) ? result(config, 'attention.urlSimobiOnboardingTnC', '') : result(config, 'attention.urlSimobiOnboardingTnCWithoutCheckbox', ''),
  showGenerateCode: (result(generateCodeOnboard, 'data.accountOffline', []).length > 0) && (!isEmpty(result(generateCodeOnboard, 'data', {}))),
  flagLKDCashOut: upperCase(result(config, 'flag.flagLKDCashOut', 'INACTIVE')) === upperCase('ACTIVE'),
  flagLKDPurchase: upperCase(result(config, 'flag.flagLKDPurchase', 'INACTIVE')) === upperCase('ACTIVE'),
  sinarmasInputAlert,
  flagReleaseDevice: upperCase(result(config, 'flag.flagReleaseDevice', 'INACTIVE')) === upperCase('ACTIVE'),
  hideCloseEmoney: upperCase(result(config, 'toogleCloseEmoney', 'YES')) !== 'YES',
  labelNewSplitBill,
  timeoutReducer
});

const mapDispatchToProps = (dispatch) => ({
  initializeSecurity: () => dispatch(tokenInit()).then(() => dispatch(hsmInit())),
  initializeLanguage: () => get(storageKeys['LANGUAGE']).
    then((currentLanguageId) => {
      dispatch(setCurrentLanguage(currentLanguageId || 'en'));
    }),
  initializeClearHistory: () => get(storageKeys['CLEAR_HISTORY']).
    then((status) => {
      if (!status) {
        clearHistory().then(() => {
          set('CLEAR_HISTORY', true);
          set(storageKeys['CLEAR_HISTORY'], true).catch((err) => {
            Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_DELETE_HISTORY), Toast.LONG);
          });
        });
      }
    }),
  onPaymentModalClose: () => dispatch(hidePaymentModal()),
  initAppVersionCheck: () => dispatch(checkAppVersion()),
  setNetworkStatus: (isConnected) => dispatch(setNetworkStatus(isConnected)),
  resetNetworkBar: () => dispatch(resetNetworkBar()),
  navigateOnNotification: (message) => dispatch(navigateOnNotification(message)),
  setLanguage: () => dispatch(setLanguage()),
  setTimeout: (timeout) => dispatch(setAppTimeout(timeout)),
  timeoutAction: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(cleanAppState());
    dispatch(actionCreators.savePositionDeeplink('yes'));
  }
  ,
  showTimeoutAlert: () => dispatch(showTimeoutAlert()),
  hideDrawer: () => {
    dispatch(actionCreators.hideDrawer());
  },
  showDrawer: () => {
    dispatch(actionCreators.showDrawer());
  },
  resetAndNavigateTo: (destinationRoute, params) => () => {
    dispatch(resetAndNavigate(destinationRoute, params));
  },
  resetNavigateTo: (destinationRoute, params) => {
    dispatch(resetAndNavigate(destinationRoute, params));
  },
  logout: () => dispatch(logout()),
  changeCurrentLanguage: (languageId) => () => {
    dispatch(setCurrentLanguage(languageId));
    dispatch(populateOffersPrivate());
  },
  linkCreditCard: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(linkCreditCard());
  },
  getTdCreate: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(getTdConfig());
  },
  onRefresh: () => {
    dispatch(refreshDevice());
    dispatch(actionCreators.hideDrawer());
    dispatch(actionCreators.deletePrimaryAccountToogle());
  },
  getLoginPreference: () => {
    dispatch(getLoginPreference());
  },
  getInsurance: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(insurance());
  },
  cardLessWithdrawal: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(NavigationActions.navigate({routeName: 'CardLessWithdrawalIndex'}));
  },
  forgotPassword: () => {
    dispatch(clearAndResetPasswordBurgerMenu());
    dispatch(actionCreators.hideDrawer());
  },
  goToPaydayLoanAgreement: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(NavigationActions.navigate({routeName: 'AboutPaydayLoan'}));
  },
  redeemSmartfren: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(redeemSmartfren());
  },
  showQRTrf: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(showQRTrf());
  },
  getLastSuccessfulLogin: () => dispatch(getLastSuccessfulLogin()),
  goToinquiryRecurringTransfer: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(inquiryRecurringTransfer());
  },
  validateClosingEmoney: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(validateCloseEmoney());
  },
  newProduct: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(NavigationActions.navigate({routeName: 'ProductsList'}));
  },
  goToLocator: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(goToLocator());
  },
  goToOffers: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(NavigationActions.navigate({routeName: 'Offers'}));
  },
  getQRGpn: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(getQRGpn());
  },
  qrCustomer: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(QRCustomer());
  },
  getSimasPoinHistory: () => dispatch(getSimasPoinHistory()),
  inquirySimasPoin: () => dispatch(inquirySimasPoin()),
  goToProfile: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(NavigationActions.navigate({routeName: 'Account'}));
  },
  goToSettings: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(NavigationActions.navigate({routeName: 'AccountSettings', params: {isSetting: true}}));
  },
  goToSimasPoinHistory: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(NavigationActions.navigate({routeName: 'SimasPoinHistory'}));
  },
  generateCode: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(getGenerateCode());
  },
  offlineStorage: () => {
    dispatch(setOfflineStorage());
  },
  toOfflineMain: () => () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(goToOfflineMain());
  },
  getGenerateCodeII: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(getGenerateCodeII());
  },
  toGenerateMain: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(goToGenerateMain('1'));
  },
  getSavingProducts: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(getSavingProductsItems());
  },
  showQR: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(goToShowQR());
  },
  openDrawer: () => {
    dispatch(actionCreators.showDrawer());
  },
  chooseServices: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(NavigationActions.navigate({routeName: 'ChooseServices'}));
  },
  initializeEmoneyTnc: () => get(storageKeys['TNC_LOCKDOWN']).
    then((res) => {
      if (res === null || res === undefined) {
        set(storageKeys['TNC_LOCKDOWN'], true);
      } else if (res === true) {
        set(storageKeys['TNC_LOCKDOWN'], true);
      } else if (res === false) {
        set(storageKeys['TNC_LOCKDOWN'], false);
      }
    }),
  setTutorialProduct: (data) => dispatch(saveTutorialProduct(data)),
  checkBill: () => get(storageKeys['NEW_SPLITBILL']).
    then((res) => {
      dispatch(actionCreators.labelNewSplitBill(res));
    }),
  goToSplitBillMenu: () => {
    set(storageKeys['NEW_SPLITBILL'], true);
    dispatch(actionCreators.hideDrawer());
    dispatch(NavigationActions.navigate({routeName: 'SplitBillMenu'}));
  },
  setInitialToogleDefault: () => dispatch(getToogleAutoDebitAccount()),
  getValas: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(NavigationActions.navigate({routeName: 'ValasItem'}));
  },
  getDatacacheLuckydip: () => dispatch(getDatacacheLuckydip()),
  setTutorialOnboard: (data) => dispatch(saveTutorialOnboard(data)),
  checkLoginAllMgm: (pathRouteRaw, typereferralCode) => dispatch(checkLoginAllMgm(pathRouteRaw, typereferralCode)),
  deeplinkPromoFunc: (promoFix, productCode, phoneNumberFix) => {
    dispatch(deeplinkPromo(promoFix, productCode, phoneNumberFix));
  },
  checkLoginAllsegment: (typeLockdownDevice, pathRouteFlow, typeActivation, typeUtm, typeCode, typereferralCode) => dispatch(checkLoginAllsegmentFlow(typeLockdownDevice, pathRouteFlow, typeActivation, typeUtm, typeCode, typereferralCode)),
  checkLoginSaving: (referralCodeOrami, typeActivation, usernameOrami, emailUser, handphoneNumber) => dispatch(checkLoginSaving(referralCodeOrami, typeActivation, usernameOrami, emailUser, handphoneNumber)),
  checkLogin: (tokenIdbiller, typeActivation, params) => dispatch(checkLogin(tokenIdbiller, typeActivation, params)),
  checkLoginForDeeplinkPromo: (typeActivation) => dispatch(checkLoginForDeeplinkPromo(typeActivation)),
  checkLoginCC: (tokenEmail, typeActivation, referralCode, ccCodereform) => dispatch(checkLoginCC(tokenEmail, typeActivation, referralCode, ccCodereform)),
  menageresetDevice: (id) => dispatch(resetDevice(id)),
  verifyEmail: (tokenEmail, typeActivation, ktp, dob, formid) => {
    dispatch(checkLoginEmoney(tokenEmail, typeActivation, ktp, dob, formid));
  },
  checkLoginBiller: () => {
    dispatch(checkLoginBiller());
  },
  setToMigrate: (id) => {
    dispatch(NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({routeName: 'Landing'}),
        NavigationActions.navigate({routeName: 'MigrateLandingPage', params: {id: id}})
      ]
    }));
  },
  userTagDynatrace: () => {
    dispatch(userTagDynatrace());
  },
});

class AppComponent extends React.Component {
  static propTypes = {
    initializeSecurity: PropTypes.func,
    onPaymentModalClose: PropTypes.func,
    initializeLanguage: PropTypes.func,
    initializeClearHistory: PropTypes.func,
    initAppVersionCheck: PropTypes.func,
    showSpinner: PropTypes.bool,
    highlightText: PropTypes.bool,
    setNetworkStatus: PropTypes.func,
    resetNetworkBar: PropTypes.func,
    networkStatus: PropTypes.object,
    currentLanguage: PropTypes.object,
    feedback: PropTypes.object,
    handleFeedback: PropTypes.func,
    navigateOnNotification: PropTypes.func,
    sinarmasAlert: PropTypes.object,
    setLanguage: PropTypes.func,
    appTimeout: PropTypes.number,
    setTimeout: PropTypes.func,
    timeoutAction: PropTypes.func,
    showTimeoutAlert: PropTypes.func,
    nav: PropTypes.object,
    drawer: PropTypes.bool,
    hideDrawer: PropTypes.func,
    showDrawer: PropTypes.func,
    resetAndNavigateTo: PropTypes.func,
    user: PropTypes.object,
    logout: PropTypes.func,
    changeCurrentLanguage: PropTypes.func,
    linkCreditCard: PropTypes.func,
    getTdCreate: PropTypes.func,
    onRefresh: PropTypes.func,
    isLockedDevice: PropTypes.bool,
    getLoginPreference: PropTypes.func,
    getInsurance: PropTypes.func,
    cardLessWithdrawal: PropTypes.func,
    forgotPassword: PropTypes.func,
    resetNavigateTo: PropTypes.func,
    paydayLoan: PropTypes.object,
    redeemSmartfren: PropTypes.func,
    isSmartfrenPromoEnable: PropTypes.bool,
    goToPaydayLoanAgreement: PropTypes.func,
    getLastSuccessfulLogin: PropTypes.func,
    goToinquiryRecurringTransfer: PropTypes.func,
    showQRTrf: PropTypes.func,
    accounts: PropTypes.array,
    validateClosingEmoney: PropTypes.func,
    cif: PropTypes.string,
    newProduct: PropTypes.func,
    goToLocator: PropTypes.func,
    goToOffers: PropTypes.func,
    flag: PropTypes.object,
    link: PropTypes.string,
    getQRGpn: PropTypes.func,
    qrCustomer: PropTypes.func,
    isQrGPNEnable: PropTypes.bool,
    simasPoinHistory: PropTypes.object,
    getSimasPoinHistory: PropTypes.func,
    simasPoin: PropTypes.object,
    inquirySimasPoin: PropTypes.func,
    goToProfile: PropTypes.func,
    goToSettings: PropTypes.func,
    goToSplitBillMenu: PropTypes.func,
    goToSimasPoinHistory: PropTypes.func,
    generateCode: PropTypes.func,
    offlineStorage: PropTypes.func,
    showGenerateCode: PropTypes.bool,
    toOfflineMain: PropTypes.func,
    flagLKDCashOut: PropTypes.bool,
    flagLKDPurchase: PropTypes.bool,
    getGenerateCodeII: PropTypes.func,
    savePicture: PropTypes.object,
    sinarmasInputAlert: PropTypes.object,
    toGenerateMain: PropTypes.func,
    flagReleaseDevice: PropTypes.bool,
    getSavingProducts: PropTypes.func,
    goToSplitBill: PropTypes.func,
    showQR: PropTypes.func,
    initializeEmoneyTnc: PropTypes.func,
    setTutorialProduct: PropTypes.func,
    hideCloseEmoney: PropTypes.bool,
    openDrawer: PropTypes.func,
    labelNewSplitBill: PropTypes.object,
    checkBill: PropTypes.func,
    chooseServices: PropTypes.func,
    setInitialToogleDefault: PropTypes.func,
    getValas: PropTypes.func,
    getDatacacheLuckydip: PropTypes.func,
    timeoutReducer: PropTypes.number,
    setTutorialOnboard: PropTypes.func,
    checkLogin: PropTypes.func,
    checkLoginAllsegment: PropTypes.func,
    checkLoginCC: PropTypes.func,
    checkLoginForDeeplinkPromo: PropTypes.func,
    checkLoginSaving: PropTypes.func,
    checkLoginBiller: PropTypes.func,
    setToMigrate: PropTypes.func,
    verifyEmail: PropTypes.func,
    menageresetDevice: PropTypes.func,
    deeplinkPromoFunc: PropTypes.func,
    checkLoginAllMgm: PropTypes.func,
    userTagDynatrace: PropTypes.func,
  }

  state = {
    backgrounded: false,
    backgroundedTime: new Date(),
    timeout: 10,
    // Environment Adjust for dev ->  adjustConfig: Platform.OS === 'android' ? new adjustAndroid.AdjustConfig('pbs61gulbojk', adjustAndroid.AdjustConfig.EnvironmentSandbox) : null,
    // Environment Adjust for prod ->  adjustConfig: Platform.OS === 'android' ? new adjustAndroid.AdjustConfig('pbs61gulbojk', adjustAndroid.AdjustConfig.EnvironmentProduction) : null,
    adjustConfig: Platform.OS === 'android' ? new adjustAndroid.AdjustConfig('pbs61gulbojk', adjustAndroid.AdjustConfig.EnvironmentProduction) : null,
    subscription: null
  }
  subscription = null;

  tick = () => {
    const {appTimeout, setTimeout, timeoutAction, showTimeoutAlert, user, timeoutReducer} = this.props;
    const {timeout} = this.state;
    const now = new Date();
    if (!isEmpty(user)) {
      if (appTimeout > 0) {
        if (AppState.currentState === 'active') {
          if (this.state.backgrounded) {
            this.setState({backgrounded: false});
            let diff = moment(now, 'DD/MM/YYYY').diff(moment(this.state.backgroundedTime, 'DD/MM/YYYY'));
            let secondDifference = Math.round(moment.duration(diff).asSeconds());
            this.setState({timeout: timeout - secondDifference});
            setTimeout(appTimeout - secondDifference);
          } else {
            if (appTimeout === timeoutReducer) {
              this.setState({timeout: appTimeout})
              ;
              setTimeout(appTimeout - 1);
            } else {
              this.setState({timeout: timeout - 1});
              setTimeout(appTimeout - 1);
              timeout <= 0 && setTimeout(0);
            }
          }
        } else {
          if (!this.state.backgrounded) {
            this.setState({backgrounded: true});
            this.setState({backgroundedTime: now});

          }
        }
      }
      if (appTimeout <= 0) {
        timeoutAction();
        showTimeoutAlert();
      }
    }
  }

  getLoginPrefs = () => {
    this.props.getLoginPreference();
    this.props.resetNavigateTo('LoginPreference');
  }

  handleTween = (ratio) => ({
    main: {opacity: (2 - ratio) / 2}
  })

  onCustomerCall = (telephone) => () => {
    Linking.canOpenURL(telephone).then((supported) => {
      if (supported) {
        Linking.openURL(telephone);
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_CALL, Toast.LONG);
      }
    }).catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_CALL), Toast.LONG);
  }

  refresh = () => {
    const {onRefresh} = this.props;
    this.setState(this.state);
    onRefresh();
  }

  refreshPassEP = () => {
    const {forgotPassword} = this.props;
    forgotPassword();
  }

  componentWillMount () {
    const logEmitter = new NativeEventEmitter(NativeModules.APIGuard);
    this.subscription = logEmitter.addListener(
      'APIGuardLogEvent'
    );
    NativeModules.APIGuard.initialize('config', 'default');
    this.props.initializeLanguage();
    this.props.initializeClearHistory();
    this.props.initAppVersionCheck();
    this.props.initializeSecurity();
    this.pushListener = DeviceEventEmitter.addListener('pushOpened', (message = {}) => {
      this.props.navigateOnNotification(message);
    });
    this.props.setLanguage();
    this.props.getLoginPreference();
    this.props.getLastSuccessfulLogin();
    this.props.offlineStorage();
    this.props.initializeEmoneyTnc();
    this.props.setInitialToogleDefault();
    this.props.getDatacacheLuckydip();
    this.props.userTagDynatrace();
  }

  handleUrl = ({url}) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        DeepLinking.evaluateUrl(url);
      }
    });
  }
  
  componentDidMount () {
    this.interval = BackgroundTimer.setInterval(this.tick, 1000);
    this.props.checkBill();
    if (Platform.OS === 'android') {
      Pushwoosh.setMultiNotificationMode(true);
    }
    const dataSave = {
      tutorialON: true,
      order: 0,
    };
    this.props.setTutorialOnboard(dataSave);
    if (Platform.OS === 'android') {
      adjustAndroid.Adjust.create(this.state.adjustConfig);
    }

    Dynatrace.setDataCollectionLevel(DataCollectionLevel.User);
    Dynatrace.setCrashReportingOptedIn(true);
    
    Linking.addEventListener('url', this.handleUrl);


    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleUrl({url});
      }
    }).catch((err) => err);
    DeepLinking.addScheme('https://');
    DeepLinking.addScheme('http://');
    DeepLinking.addScheme('smbplus://');
    DeepLinking.addScheme('simobiplus://');

    DeepLinking.addRoute('/www.banksinarmas.com/PersonalBanking/:activation/:token', ({activation, token}) => {
      const tokenEmail = transformToken(token);
      const typeActivation = transformToken(activation);
      if (typeActivation === 'splitBill') {
        this.props.checkLogin(token, 'splitBill');
      } else if (typeActivation === 'splitBill-NKYC') {
        this.props.checkLogin(token, 'splitBill-NKYC');
      } else if (typeActivation === 'Tokenpayment') {
        this.props.checkLogin(token, 'tokenPayment');
      } else if (typeActivation === 'fundTransfer-SplitBill') {
        this.props.checkLogin(token, 'fundTransfer-SplitBill');
      } else if (typeActivation === 'rejectSplitBill') {
        this.props.checkLogin(token, 'rejectSplitBill');
      } else if (typeActivation === 'rejectSplitBill-NKYC') {
        this.props.checkLogin(token, 'rejectSplitBill-NKYC');
      } else if (typeActivation === 'Alfacart') {
        this.props.checkLoginBiller();
      } else {
        this.props.verifyEmail(tokenEmail, typeActivation);
      }
    });


    DeepLinking.addRoute('/www.banksinarmas.com/PersonalBanking/Billpayment/:idbiller', ({idbiller}) => {
      const tokenIdbiller = transformToken(idbiller);
      this.props.checkLogin(tokenIdbiller);
    });
    // deeplink with some parameter 'params' method ex = /?email=example@gmail.com|name=BSIM|phoneNumber=01234
    DeepLinking.addRoute('/www.banksinarmas.com/PersonalBanking/Billpayment/:params/:idbiller', ({params, idbiller}) => {
      const tokenIdbiller = transformToken(idbiller);
      const paramsDeeplink = transformTokenSpecialChar(params);
      this.props.checkLogin(tokenIdbiller, null, paramsDeeplink);
    });
    DeepLinking.addRoute('/www.banksinarmas.com/PersonalBanking/AllSegment/:typeLockdown/:pathRoute', ({typeLockdown, pathRoute}) => {
      const typeLockdownDevice = transformToken(typeLockdown);
      const pathRouteFlow = transformToken(pathRoute);
      this.props.checkLoginAllsegment(typeLockdownDevice, pathRouteFlow);
    });
    DeepLinking.addRoute('/www.simobi.com/migrate/:id', ({id}) => {
      this.props.setToMigrate(id);
    });
    DeepLinking.addRoute('/www.banksinarmas.com/PersonalBanking/:activation/:token/:referral/:cccode', ({activation, token, referral, cccode}) => {
      const tokenEmail = transformToken(token);
      const typeActivation = transformToken(activation);
      const referralCode = transformToken(referral);
      const ccCodereform = transformToken(cccode);
      if (typeActivation === '011') {
        this.props.checkLoginCC(tokenEmail, typeActivation, referralCode, ccCodereform);
      }
    });
    DeepLinking.addRoute('/migrate/:id', ({id}) => this.props.menageresetDevice(id));
    setTimeout(() => {
      // const {offers = []} = this.props;
      // if (isEmpty(offers)) {
      //   this.props.displayOffers();
      // }
    }, 500);
    // deeplink orami saving with referral code, code orami saving '021'
    DeepLinking.addRoute('/www.banksinarmas.com/PersonalBanking/:activation/:username/:referralCode/:emailOrami/:hpNumber', ({activation, username, referralCode, emailOrami, hpNumber}) => {
      const referralCodeOrami = transformToken(referralCode);
      const typeActivation = transformToken(activation);
      const usernameOrami = transformToken(username);
      const emailUser = transformToken(emailOrami);
      const handphoneNumber = transformToken(hpNumber);
      if (typeActivation === '021') {
        this.props.checkLoginSaving(referralCodeOrami, typeActivation, usernameOrami, emailUser, handphoneNumber);
      }
    });
    DeepLinking.addRoute('/www.banksinarmas.com/PersonalBanking/AllSegment/:typeLockdown/:pathRoute/:utm/:code/:referralCode/:activation', ({typeLockdown, pathRoute, utm, code, referralCode, activation}) => {
      const rawtypeActivation = transformToken(activation);
      const typeActivation = transformTokenIos(rawtypeActivation);
      const typeUtm = transformToken(utm);
      const typeCode = transformToken(code);
      const typereferralCode = transformToken(referralCode);
      const typeLockdownDevice = transformToken(typeLockdown);
      const pathRouteFlow = transformToken(pathRoute);
      this.props.checkLoginAllsegment(typeLockdownDevice, pathRouteFlow, typeActivation, typeUtm, typeCode, typereferralCode);
    });
    DeepLinking.addRoute('/www.banksinarmas.com/PersonalBanking/:utm', () => {
      // const tokenEmail = transformTokenIos(utm);
      // Analytics.logEvent('URL_FROM', {utm: String(tokenEmail)});
    });
    DeepLinking.addRoute('/www.banksinarmas.com/PersonalBanking/ShareCodeMgm/:pathRoute/:referralCode', ({pathRoute, referralCode}) => {
      const typereferralCode = transformToken(referralCode);
      const pathRouteFlow = transformToken(pathRoute);
      this.props.checkLoginAllMgm(pathRouteFlow, typereferralCode);
    });

    DeepLinking.addRoute('/www.banksinarmas.com/PersonalBanking/Promo/:utmPromo/:destinationProduct/:phoneNumber', ({utmPromo, destinationProduct, phoneNumber}) => {
      const promoFix = transformToken(utmPromo);
      const phoneNumberFix = transformToken(phoneNumber);
      const productCode = transformToken(destinationProduct);
      this.props.deeplinkPromoFunc(promoFix, productCode, phoneNumberFix);
    });
    DeepLinking.addRoute('/www.banksinarmas.com/PersonalBanking/PromoCC/:utmPromo/:destinationProduct/:phoneNumber', ({utmPromo, destinationProduct, phoneNumber}) => {
      const promoFix = transformToken(utmPromo);
      const phoneNumberFix = transformToken(phoneNumber);
      const productCode = transformToken(destinationProduct);
      this.props.deeplinkPromoFunc(promoFix, productCode, phoneNumberFix);
    });
  }

  componentWillUnmount () {
    BackgroundTimer.clearInterval(this.interval);
    this.pushListener.remove();
    if (Platform.OS === 'android') {
      adjustAndroid.Adjust.componentWillUnmount();
    }
    Linking.removeEventListener('url', this.handleUrl);
    this.subscription.remove();
  }

  shouldComponentUpdate (nextProps, nextState) {
    let nextStateContainer = clone(nextState);
    let stateContainer = clone(this.state);
    nextStateContainer.timeout = 0;
    stateContainer.timeout = 0;
    return !isEqual(nextProps, this.props) || !isEqual(nextStateContainer, stateContainer);
  }

  render () {
    const {showSpinner, currentLanguage, highlightText, resetNetworkBar = noop, sinarmasAlert, networkStatus,
      setNetworkStatus, drawer, hideDrawer, showDrawer, resetAndNavigateTo, user, logout, changeCurrentLanguage, linkCreditCard,
      getTdCreate, isLockedDevice, getInsurance, cardLessWithdrawal, paydayLoan, goToPaydayLoanAgreement, redeemSmartfren,
      isSmartfrenPromoEnable, goToinquiryRecurringTransfer, accounts, validateClosingEmoney, cif, newProduct,
      goToLocator, goToOffers, showQRTrf, link, nav, getQRGpn, qrCustomer, isQrGPNEnable, simasPoin, simasPoinHistory, inquirySimasPoin, goToProfile,
      goToSettings, goToSimasPoinHistory, generateCode, showGenerateCode, toOfflineMain, flagLKDCashOut, flagLKDPurchase, getGenerateCodeII, savePicture,
      sinarmasInputAlert, flagReleaseDevice, getSavingProducts, hideCloseEmoney, openDrawer, toGenerateMain, showQR, chooseServices, getValas, goToSplitBillMenu, labelNewSplitBill} = this.props;
    const showLkdMenu = (flagLKDCashOut || flagLKDPurchase) && showGenerateCode;
    const loginRoute = result(nav, 'routes.0.routeName', 'Onboarding');
    const isLogin = !isEmpty(user) && (result(nav, 'index', 0) > 0 || loginRoute === 'Main');
    const drawerOpenStyles = {
      mainOverlay: {backgroundColor: theme.lightGrey, opacity: 0.5}
    };
    const drawerStyles = {
      drawer: {borderRightWidth: 1, borderColor: theme.borderGrey, borderRadius: 3}
    };
    return (
      <View style={{flexGrow: 1}}>
        <Drawer
          open={drawer}
          openDrawerOffset={0.16} // 5:1 screen ratio
          panCloseMask={0.16}
          onClose={hideDrawer}
          onOpen={showDrawer}
          tapToClose={true}
          type={'overlay'}
          tweenDuration={300}
          styles={drawer ? drawerOpenStyles : drawerStyles}
          content={<DrawerComponent
            resetAndNavigate={resetAndNavigateTo}
            user={result(user, 'profile', {})}
            logout={logout}
            paydayLoanEligible={lowerCase(result(paydayLoan, 'data.eligible_status', ''))}
            changeCurrentLanguage={changeCurrentLanguage}
            currentLanguage={currentLanguage}
            linkCreditCard={linkCreditCard}
            getTdCreate={getTdCreate}
            getLoginPrefs={this.getLoginPrefs}
            onPrimaryCustomerCall={this.onCustomerCall('tel:1500153')}
            onSecondaryCustomerCall={this.onCustomerCall('tel:50188888')}
            onRefresh={this.refresh}
            isLockedDevice={isLockedDevice}
            getInsurance={getInsurance}
            cardLessWithdrawal={cardLessWithdrawal}
            forgotPassword={this.refreshPassEP}
            redeemSmartfren={redeemSmartfren}
            isSmartfrenPromoEnable={isSmartfrenPromoEnable}
            goToPaydayLoanAgreement={goToPaydayLoanAgreement}
            goToinquiryRecurringTransfer={goToinquiryRecurringTransfer}
            showQRTrf={showQRTrf}
            accounts={accounts}
            validateClosingEmoney={validateClosingEmoney}
            cif={cif}
            newProduct={newProduct}
            goToLocator={goToLocator}
            goToOffers={goToOffers}
            link={link}
            isLogin={isLogin}
            getQRGpn={getQRGpn}
            qrCustomer={qrCustomer}
            isQrGPNEnable={isQrGPNEnable}
            simasPoinHistory={simasPoinHistory}
            simasPoin={simasPoin}
            inquirySimasPoin={inquirySimasPoin}
            goToProfile={goToProfile}
            goToSettings={goToSettings}
            goToSimasPoinHistory={goToSimasPoinHistory}
            generateCode={generateCode}
            showGenerateCode={showGenerateCode}
            toOfflineMain={toOfflineMain}
            showLkdMenu={showLkdMenu}
            getGenerateCodeII={getGenerateCodeII}
            profilePicture={savePicture}
            toGenerateMain={toGenerateMain}
            flagReleaseDevice={flagReleaseDevice}
            getSavingProducts={getSavingProducts}
            goToSplitBillMenu={goToSplitBillMenu}
            showQR={showQR}
            openDrawer={openDrawer}
            hideCloseEmoney={hideCloseEmoney}
            labelNewSplitBill={labelNewSplitBill}
            chooseServices={chooseServices}
            getValas={getValas}
          />}
          tweenHandler={this.handleTween}
        >
          <OfflineBar highlightText={highlightText} resetNetworkBar={resetNetworkBar} setNetworkStatus={setNetworkStatus} networkStatus={networkStatus}/>
          <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}/>
          <ConnectedRoutes />
          <OverlaySpinner showSpinner={showSpinner}/>
          <SinarmasAlert {...sinarmasAlert} currentLanguage={currentLanguage}/>
          <SinarmasInputAlert {...sinarmasInputAlert} currentLanguage={currentLanguage}/>
        </Drawer>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
