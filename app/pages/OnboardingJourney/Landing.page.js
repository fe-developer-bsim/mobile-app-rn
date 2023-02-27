import React from 'react';
import PropTypes from 'prop-types';
import {Linking} from 'react-native';
import {connect} from 'react-redux';
import LandingView from '../../components/OnboardingJourney/Landing.component';
import {setCurrentLanguage, checkHSMandNavigate, populateOffersPrivate, inquirySimasPoin, getMovieCgv, getShoppingList, goSimasPoinHistory, goToDiscountQREULA, goToDiscountMerchant, getEgiftMostData, getallAccbeforelogin, getCacheMenuSearch, goReferralCode, getCacheBankList} from '../../state/thunks/common.thunks';
import {resetDevice, checkLogin, checkLoginAllsegmentFlow, checkLoginCC, checkLoginForDeeplinkPromo, checkLoginSaving, checkLoginEmoney, getBalanceEmoneyBeforeLogin, addOrder, logoutDashboard, checkLoginBiller, checkLoginAllMgm, deeplinkPromo, populateConfigCacheEFormData} from '../../state/thunks/onboarding.thunks';
import SplashScreen from 'react-native-splash-screen';
import {NavigationActions} from 'react-navigation';
import isEmpty from 'lodash/isEmpty';
import * as actionCreators from '../../state/actions/index.actions';
import result from 'lodash/result';
import DeepLinking from 'react-native-deep-linking';
import {getAllOffersExcept, getSavingAccount, getCurrentRouteName} from '../../utils/transformer.util';
import find from 'lodash/find';
import sortBy from 'lodash/sortBy';
import noop from 'lodash/noop';
import {goFlight} from '../../state/thunks/flight.thunks';
import {goToGenerateMain} from '../../state/thunks/generateCode.thunks';
import {openInbox, inboxPushCounter, finishOrder, checkPrivateOffersType, getTdConfig} from '../../state/thunks/dashboard.thunks';
import {goToSDK as goToSDKThunk, checkEULA} from '../../state/thunks/qrpayment.thunk';
import {setupPayment, setupPaymentGopay, getBillpayHistory, setupPaymentOther, goToSearchAlfacart} from '../../state/thunks/common.thunks';
// import {Toast} from '../../utils/RNHelpers.util';
// import {language} from '../../config/language';
import {goToCart, goToDetail} from '../../state/thunks/common.thunks';
// import Permissions from 'react-native-permissions';
import {set, get, storageKeys} from '../../utils/storage.util';
import AgreementEmoney from '../RegisterEmoneyJourney/AgreementEmoney.page';
import {NetworkInfo} from 'react-native-network-info';
import VersionNumber from 'react-native-version-number';
import {listAllProduct, generateJwt} from '../../state/thunks/digitalStore.thunks';
import {getDefaultAccount} from '../../state/thunks/fundTransfer.thunks';
import {getDefaultAccount as getEmonneyAccount} from '../../state/thunks/genericBill.thunks';
import {listCategoryProductAlfacart, listCategoryProduct, shouldGiveChecklist, shouldGiveChecklistSimasCatalog, goToMerchantStore, checklistUnipin} from '../../state/thunks/digitalStore.thunks';
import {saveTutorialProduct} from '../../state/actions/index.actions';
import {destroy} from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';
import {insurance} from '../../state/thunks/Insurance.thunks';
import {goToSplitBillMenu} from '../../state/thunks/splitBill.thunks';
import {getConfigMenuSavingValas, getCreditCardProductsItems, getListLoanProduct} from '../../state/thunks/digitalAccountOpening.thunks';
import toLower from 'lodash/toLower';

const totalSeconds = 300;
// let PermissionsAndroid;

// if (Platform.OS === 'android') {
//   PermissionsAndroid = require('react-native').PermissionsAndroid;
// }

const mapStateToProps = (state) => {
  const isStateEmpty = isEmpty(state.appInitKeys);
  const introductionTriggered = result(state, 'introductionTriggered', false);
  const allOffers = result(state, 'promos.offers', []);
  const clickedOffer = find(allOffers, {offerID: {}});
  const offers = getAllOffersExcept(clickedOffer, allOffers);
  const billerMenuOrderRevamp = result(state, 'config.billerMenuOrderRevamp', []);
  const billerConfig = result(state, 'billerConfig', {});
  const emoney = result(state, 'emoney', {});
  const isShowTnC = result(state, 'config.versionWithTNC', '');
  const link = result(state, 'config.attention.urlSimobiTnCOramiIn', '');
  const tokenClient = result(state, 'appInitKeys.tokenClient', '');
  const tokenServer = result(state, 'appInitKeys.tokenServer', '');
  const toogleMenuKoperasi = result(state, 'toogleMenuKoperasi', '');
  const toogleKoperasi = result(state, 'config.toogleKoperasi', 'Yes');
  const inboxCounter = result(state, 'inboxCounter', []);
  const mostSoldData = result(state, 'egiftMostSold', []);
  const accounts = getSavingAccount(result(state, 'accounts', []));
  const toogleDisableTutorial = result(state, 'config.toogleDisableTutorial', '');
  const toggleDisableBillerNKYC = result(state, 'config.toggleDisableBillerNKYC', '');
  const form = result(state, 'form', {});
  const listCategoryOffers = result(state, 'config.listCategoryOffers', '');
  const lazyLogin = result(state, 'config.lazyLogin', '');
  return {
    isLockedDevice: Boolean(state.appInitKeys && state.appInitKeys.username && state.appInitKeys.tokenClient && state.appInitKeys.tokenServer),
    currentLanguage: state.currentLanguage,
    nav: state.nav,
    isStateEmpty,
    introductionTriggered,
    state,
    offers,
    clickedOffer,
    egiftList: state.egiftList,
    simasPoin: state.simasPoin,
    isDeeplinkExist: state.isDeeplinkExist,
    billerMenuOrderRevamp,
    billerConfig,
    getBalanceEmoneyBeforeLogin,
    emoney,
    link,
    isShowTnC,
    listCategoryProduct,
    tokenClient,
    tokenServer,
    toogleMenuKoperasi,
    toogleKoperasi,
    toggleDisableBillerNKYC,
    listCategoryProductAlfacart,
    inboxCounter,
    mostSoldData,
    accounts,
    tutorialProduct: state.tutorialProduct,
    isLogin: !isEmpty(result(state, 'user', {})),
    dataDisplay: result(state, 'insuranceDataTravel', {}),
    toogleDisableTutorial,
    form,
    listCategoryOffers,
    luckyDipCounter: result(state, 'counterLuckyDip.currentToken', '0'),
    isLuckyDipActive: result(state, 'config.flag.flagLuckyDip', 'INACTIVE'),
    serverTime: result(state, 'timeConfig.serverTime', '0'),
    luckyDipcache: result(state, 'getLuckyDipCache', {}),
    defaultAccount: result(state, 'defaultAccount', {}),
    landingOffersCount: result(state, 'landingOffersCount', ''),
    lazyLogin,
    configEForm: result(state, 'configEForm', {}),
    hideMGM: result(state, 'config.hideMGM', ''),
    bankList: result(state, 'valueBankList.bankList', {}),
    statusMember: toLower(result(state, 'memberUser', '')),
    chargeList: result(state, 'chargeList', []),
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeCurrentLanguage: (languageId) => dispatch(setCurrentLanguage(languageId)),
  onButtonPress: (btnName, isProduct, data) => {
    dispatch(checkHSMandNavigate(btnName, isProduct, data));
  },
  goToIntroduction: (nav) => {
    nav.index === 0 &&
      (dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'Introduction'})
        ]
      }))
      );
  },
  goToRegister: () => dispatch(NavigationActions.navigate({routeName: 'ConfirmationAccount'})),
  triggerIntroduction: () => {
    dispatch(actionCreators.triggerIntroduction(true));
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
  onOfferClick: (offer) => () => {
    dispatch(NavigationActions.navigate({routeName: 'OfferDetail', params: {offer}}));
  },
  cgvTab: () => {
    dispatch(getMovieCgv());
  },
  closeHandler: () => dispatch(NavigationActions.back()),
  displayOffers: () => dispatch(populateOffersPrivate()),
  displayPrivateOffer: (tokenClient, tokenServer) => dispatch(populateOffersPrivate(tokenClient, tokenServer)),
  menageresetDevice: (id) => dispatch(resetDevice(id)),
  inquirySimasPoin: () => dispatch(inquirySimasPoin()),
  getShoppingList: () => dispatch(getShoppingList()),
  TabShopping: (category) => {
    dispatch(NavigationActions.navigate({routeName: 'TabShopping', params: {category}}));
  },
  verifyEmail: (tokenEmail, typeActivation, ktp, dob, formid) => {
    dispatch(checkLoginEmoney(tokenEmail, typeActivation, ktp, dob, formid));
  },

  SimasPoinHistory: () => dispatch(goSimasPoinHistory()),
  goToDiscountMerchant: () => dispatch(goToDiscountMerchant()),
  goToDiscountQREULA: () => dispatch(goToDiscountQREULA()),
  checkLogin: (tokenIdbiller, typeActivation, params) => dispatch(checkLogin(tokenIdbiller, typeActivation, params)),
  checkLoginForDeeplinkPromo: (typeActivation) => dispatch(checkLoginForDeeplinkPromo(typeActivation)),
  checkLoginCC: (tokenEmail, typeActivation, referralCode, ccCodereform) => dispatch(checkLoginCC(tokenEmail, typeActivation, referralCode, ccCodereform)),
  goToOffer: () => {
    dispatch(NavigationActions.navigate({routeName: 'Offers'}));
  },
  openDrawer: () => {
    dispatch(actionCreators.showDrawer());
  },
  checkLoginAllsegment: (typeLockdownDevice, pathRouteFlow, typeActivation, typeUtm, typeCode, typereferralCode) => dispatch(checkLoginAllsegmentFlow(typeLockdownDevice, pathRouteFlow, typeActivation, typeUtm, typeCode, typereferralCode)),
  flightTab: () => dispatch(goFlight()),
  checkLoginSaving: (referralCodeOrami, typeActivation, usernameOrami, emailUser, handphoneNumber) => dispatch(checkLoginSaving(referralCodeOrami, typeActivation, usernameOrami, emailUser, handphoneNumber)),
  saveIpaddress: (ipData) => {
    dispatch(actionCreators.saveIpAddress(ipData));
  },
  saveGeolocation: (lat, lot) => {
    dispatch(actionCreators.saveGeoLocation({lat, lot}));
  },
  goToBillpay: () => {
    dispatch(NavigationActions.navigate({routeName: 'PayScreen'}));
  },
  setupPaymentGopayForNavigation: (route, isGopay) => {
    // dispatch(getFavBiller());
    dispatch(setupPaymentGopay(route, isGopay));
  },
  setupPaymentForNavigation: (route, billerTypeId) => {
    // dispatch(getFavBiller());
    dispatch(getBillpayHistory());
    dispatch(setupPayment(route, billerTypeId));
  },
  goToQrPayment: () => {
    dispatch(goToSDKThunk());
  },
  checkEULAandNavigate: () => {
    dispatch(checkEULA());
  },
  goToBiller: (biller) => {
    // dispatch(getFavBiller());
    dispatch(getBillpayHistory());
    dispatch(setupPaymentOther(biller));
  },
  toGenerateMain: (trxType) => () => {
    // dispatch(getFavBiller());
    dispatch(goToGenerateMain(trxType));
  },
  goToCart: () => {
    dispatch(goToCart());
  },
  getBalanceEmoney: () => {
    dispatch(getBalanceEmoneyBeforeLogin());
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
  getEmoneyTnc: () => get(storageKeys['TNC_LOCKDOWN']),
  turnOffTnc: () => set(storageKeys['TNC_LOCKDOWN'], false),
  getBillpayHistory: () => dispatch(getBillpayHistory()),


  goToAlfacart: () => {
    dispatch(listAllProduct());
  },
  goToUltraVoucher: () => {
    dispatch(generateJwt()).then((res) => {
      const jwt = result(res, 'jwt', '');
      if (!isEmpty(jwt)) {
        dispatch(NavigationActions.navigate({routeName: 'UltraVoucherWebView', params: {jwt: jwt}}));
      }
    });
  },
  openInbox: () => {
    dispatch(openInbox());
  },
  goToInboxPushCounter: () => {
    dispatch(inboxPushCounter());
  },
  getEgiftMostData: () => {
    dispatch(getEgiftMostData());
  },
  goToEmoneyHistoryNavigate: () => {
    dispatch(NavigationActions.navigate({routeName: 'EgiftLogin', params: {isEmoney: true}}));
  },
  getDefaultAccount: () => {
    dispatch(getDefaultAccount());
  },
  addOrder: () => {
    dispatch(addOrder());
  },
  emoneyHistory: () => {
    dispatch(NavigationActions.navigate({routeName: 'EmoneyDashboard', params: {isEmoney: true}}));
  },
  gotoDasboard: () => {
    dispatch(NavigationActions.navigate({routeName: 'homeRoutes'}));
  },
  goToDetail: (items) => dispatch(goToDetail(items)),
  goToAlfacartNew: () => {
    dispatch(listCategoryProductAlfacart());
  },
  goToSearchAlfacart: () => {
    dispatch(goToSearchAlfacart());
  },
  setTutorialProduct: (data) => dispatch(saveTutorialProduct(data)),
  finishOrder: () => {
    dispatch(finishOrder());
  },
  destroyForm: () => {
    dispatch(destroy('loginEasyPinForm'));
  },
  logout: () => dispatch(logoutDashboard()),
  inquiryLuckyDipCoupon: () => {
    dispatch(NavigationActions.navigate({routeName: 'LuckyDipMainPage', params: {pathRoute: 'HomeScreen'}}));
  },
  checkLoginBiller: () => {
    dispatch(checkLoginBiller());
  },
  getallAccbeforelogin: () => {
    dispatch(getallAccbeforelogin());
  },
  getEmonneyAccount: () => {
    dispatch(getEmonneyAccount());
  },
  goToMerchantStore: (merchant) => () => {
    dispatch(goToMerchantStore(merchant));
  },
  showPrivateOffers: () => dispatch(checkPrivateOffersType()),
  getOffersCount: () => dispatch(actionCreators.saveLandingOffers('1')),
  getScannerState: () => dispatch(dispatch(actionCreators.saveScannerState(true))),
  checkLoginAllMgm: (pathRouteRaw, typereferralCode) => dispatch(checkLoginAllMgm(pathRouteRaw, typereferralCode)),
  deeplinkPromoFunc: (promoFix, productCode, phoneNumberFix) => {
    dispatch(deeplinkPromo(promoFix, productCode, phoneNumberFix));
  },
  goToTncSimasCatalog: () => {
    dispatch(shouldGiveChecklistSimasCatalog());
  },
  goToTncUnipin: () => {
    dispatch(checklistUnipin());
  },
  goToMenuSearch: () => {
    dispatch(getCacheMenuSearch());
  },
  newProduct: () => {
    dispatch(getConfigMenuSavingValas());
  },
  newProductCC: () => {
    dispatch(getCreditCardProductsItems());
  },
  getTdCreate: () => {
    dispatch(actionCreators.clearValueTD());
    dispatch(getTdConfig());
  },
  getInsurance: () => {
    dispatch(insurance());
  },
  goToSplitBillMenu: () => {
    set(storageKeys['NEW_SPLITBILL'], true);
    dispatch(actionCreators.hideDrawer());
    dispatch(goToSplitBillMenu());
  },
  getValas: () => {
    dispatch(actionCreators.hideDrawer());
    dispatch(NavigationActions.navigate({routeName: 'ValasItem'}));
  },
  deeplinkUTM: () => {
    dispatch(actionCreators.saveUTM('Test Deeplink'));
  },
  goToTncAlfacart: () => {
    dispatch(shouldGiveChecklist());
  },
  goReferralCode: () => () => dispatch(goReferralCode()),
  gotoProduct: () => {
    dispatch(NavigationActions.navigate({routeName: 'ProductSeall'}));
  },
  goToLoan: () => {
    dispatch(getListLoanProduct());
  },
  goToMembership: () => {
    dispatch(NavigationActions.navigate({routeName: 'MembershipDetail'}));
  },
  getConfigEForm: () => {
    dispatch(populateConfigCacheEFormData());
  },
  getCacheBankList: () => {
    dispatch(getCacheBankList());
  },
});


class LandingPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    isLockedDevice: PropTypes.bool,
    changeCurrentLanguage: PropTypes.func,
    onButtonPress: PropTypes.func,
    currentLanguage: PropTypes.object,
    isStateEmpty: PropTypes.bool,
    goToIntroduction: PropTypes.func,
    goToRegister: PropTypes.func,
    triggerIntroduction: PropTypes.func,
    introductionTriggered: PropTypes.bool,
    nav: PropTypes.object,
    setToMigrate: PropTypes.func,
    displayOffers: PropTypes.func,
    offers: PropTypes.array,
    clickedOffer: PropTypes.object,
    onOfferClick: PropTypes.func,
    closeHandler: PropTypes.func,
    onPopUp: PropTypes.func,
    menageresetDevice: PropTypes.func,
    getEgiftList: PropTypes.func,
    egiftList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    inquirySimasPoin: PropTypes.func,
    goToDetail: PropTypes.func,
    cgvTab: PropTypes.func,
    TabShopping: PropTypes.func,
    simasPoin: PropTypes.object,
    getShoppingList: PropTypes.func,
    verifyEmail: PropTypes.func,
    SimasPoinHistory: PropTypes.func,
    goToDiscountMerchant: PropTypes.func,
    goToDiscountQREULA: PropTypes.func,
    checkLogin: PropTypes.func,
    goToOffer: PropTypes.func,
    checkLoginAllsegment: PropTypes.func,
    checkLoginCC: PropTypes.func,
    flightTab: PropTypes.func,
    checkLoginForDeeplinkPromo: PropTypes.func,
    checkLoginSaving: PropTypes.func,
    isDeeplinkExist: PropTypes.string,
    goToBillpay: PropTypes.func,
    billerConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    setupPaymentForNavigation: PropTypes.func,
    goToBiller: PropTypes.func,
    setupPaymentGopayForNavigation: PropTypes.func,
    checkEULAandNavigate: PropTypes.func,
    goToQrPayment: PropTypes.func,
    billerMenuOrderRevamp: PropTypes.array,
    openDrawer: PropTypes.func,
    goToCart: PropTypes.func,
    emoney: PropTypes.func,
    getBalanceEmoney: PropTypes.func,
    getBalanceEmoneyBeforeLogin: PropTypes.func,
    saveIpaddress: PropTypes.func,
    saveGeolocation: PropTypes.func,
    link: PropTypes.string,
    initializeEmoneyTnc: PropTypes.func,
    getEmoneyTnc: PropTypes.func,
    turnOffTnc: PropTypes.func,
    getBillpayHistory: PropTypes.func,
    isShowTnC: PropTypes.string,
    displayPrivateOffer: PropTypes.func,
    tokenClient: PropTypes.string,
    tokenServer: PropTypes.string,
    toogleMenuKoperasi: PropTypes.string,
    toogleKoperasi: PropTypes.string,
    openInbox: PropTypes.func,
    inboxCounter: PropTypes.array,
    goToInboxPushCounter: PropTypes.func,
    getEgiftMostData: PropTypes.func,
    mostSoldData: PropTypes.array,
    goToEmoneyHistoryNavigate: PropTypes.func,
    getDefaultAccount: PropTypes.func,
    accounts: PropTypes.array,
    addOrder: PropTypes.func,
    tutorialProduct: PropTypes.func,
    isLogin: PropTypes.bool,
    emoneyHistory: PropTypes.func,
    gotoDasboard: PropTypes.func,
    dataDisplay: PropTypes.object,
    goToAlfacartNew: PropTypes.func,
    goToSearchAlfacart: PropTypes.func,
    setTutorialProduct: PropTypes.func,
    finishOrder: PropTypes.func,
    toogleDisableTutorial: PropTypes.string,
    toggleDisableBillerNKYC: PropTypes.string,
    destroyForm: PropTypes.func,
    form: PropTypes.object,
    logout: PropTypes.object,
    listCategoryOffers: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    luckyDipCounter: PropTypes.string,
    serverTime: PropTypes.string,
    isLuckyDipActive: PropTypes.string,
    inquiryLuckyDipCoupon: PropTypes.func,
    luckyDipcache: PropTypes.object,
    checkLoginBiller: PropTypes.func,
    getallAccbeforelogin: PropTypes.func,
    getEmonneyAccount: PropTypes.func,
    defaultAccount: PropTypes.object,
    goToMerchantStore: PropTypes.func,
    showPrivateOffers: PropTypes.object,
    getOffersCount: PropTypes.func,
    landingOffersCount: PropTypes.string,
    getScannerState: PropTypes.func,
    checkLoginAllMgm: PropTypes.func,
    deeplinkPromoFunc: PropTypes.func,
    lazyLogin: PropTypes.string,
    goToUltraVoucher: PropTypes.func,
    goToTncSimasCatalog: PropTypes.func,
    goToMenuSearch: PropTypes.func,
    newProduct: PropTypes.func,
    getValas: PropTypes.func,
    getTdCreate: PropTypes.func,
    getInsurance: PropTypes.func,
    goToSplitBillMenu: PropTypes.func,
    goReferralCode: PropTypes.func,
    gotoEasyPin: PropTypes.func,
    newProductCC: PropTypes.func,
    gotoProduct: PropTypes.func,
    hideMGM: PropTypes.string,
    goToLoan: PropTypes.func,
    goToAlfacart: PropTypes.func,
    goToTncAlfacart: PropTypes.func,
    configEForm: PropTypes.object,
    getConfigEForm: PropTypes.func,
    getCacheBankList: PropTypes.func,
    bankList: PropTypes.object,
    statusMember: PropTypes.string,
    goToMembership: PropTypes.func,
    chargeList: PropTypes.array,
    goToTncUnipin: PropTypes.func,
  }

  onBuyMobileTopTop = () => {
    this.props.setupPaymentForNavigation('MobileTopup');
  }

  goToBiller = (billerName) => () => {
    const {accounts, isLogin, defaultAccount} = this.props;
    if (isEmpty(accounts)) {
      this.props.getDefaultAccount();
    }
    if (!isLogin && isEmpty(defaultAccount)) {
      this.props.getEmonneyAccount();
    }
    this.props.goToBiller(billerName);
  }

  goToEmoneyHistory = () => {
    const {isLogin} = this.props;
    isLogin ? this.props.emoneyHistory() : this.props.goToEmoneyHistoryNavigate();
  }

  navigateTo = (routeName, billerTypeId) => () => {
    const {accounts, isLogin, defaultAccount} = this.props;
    if (isEmpty(accounts)) {
      this.props.getDefaultAccount();
    }
    if (!isLogin && isEmpty(defaultAccount)) {
      this.props.getEmonneyAccount();
    }
    this.props.setupPaymentForNavigation(routeName, billerTypeId);
  }

  goPayNavigateTo = (routeName, isGopay) => () => {
    const {accounts, isLogin, defaultAccount} = this.props;
    if (isEmpty(accounts)) {
      this.props.getDefaultAccount();
    }
    if (!isLogin && isEmpty(defaultAccount)) {
      this.props.getEmonneyAccount();
    }
    this.props.setupPaymentGopayForNavigation(routeName, isGopay);
  }

  handleUrl = ({url}) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        DeepLinking.evaluateUrl(url);
      }
    });
  }

  state = {
    value: false,
    tncLockdown: false,
    hideRegister: true,
    alreadyHit: false,
    secondsRemaining: totalSeconds
  }

  tick = () => {
    const {inquirySimasPoin, getBalanceEmoney} = this.props;
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      BackgroundTimer.clearInterval(this.interval);
      this.testsec();
      inquirySimasPoin();
      getBalanceEmoney();
    }
  }

  testsec = () => {
    this.interval = BackgroundTimer.setInterval(this.tick, 1000);
    this.setState({
      secondsRemaining: totalSeconds,
    });
  }

  componentWillUnmount () {
    // Linking.removeEventListener('url', this.handleUrl);
    BackgroundTimer.clearInterval(this.interval);
  }
  componentDidUpdate () {
  }

  componentDidMount () {
    if (this.props.lazyLogin !== 'active') {
      this.testsec();
    }
    get(storageKeys['TOOLTIP_NEW_FEATURES']).then((res) => {
      if (res === true) {
        const dataSave = {
          tutorialON: false,
          order: 0,
        };
        this.props.setTutorialProduct(dataSave);
      } else {
        if (this.props.toogleDisableTutorial === 'YES') {
          const dataSave = {
            tutorialON: false,
            order: 0,
          };
          this.props.setTutorialProduct(dataSave);
        } else {
          const dataSave = {
            tutorialON: false,
            order: 0,
          };
          this.props.setTutorialProduct(dataSave);
        }
      }
    });
    // Linking.addEventListener('url', this.handleUrl);

    // Get Local IP
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      this.props.saveIpaddress(String(ipv4Address));
    });
  }

  componentWillReceiveProps = () => {
    const {isLockedDevice, isStateEmpty, goToIntroduction, triggerIntroduction, introductionTriggered, nav, link, tokenClient, tokenServer, getOffersCount, landingOffersCount} = this.props;
    if (!isLockedDevice && !isStateEmpty && !introductionTriggered) {
      triggerIntroduction();
      return goToIntroduction(nav, link);
    }
    if (!isStateEmpty) {
      SplashScreen.hide();
    }
    if (!this.state.alreadyHit) {
      if (tokenClient && tokenServer) {
        this.setState({alreadyHit: true});
        // if (isEmpty(accounts)) {
        //   this.props.getDefaultAccount();
        // } // activate when need choose bank acc
        this.props.displayPrivateOffer(tokenClient, tokenServer);
      }
    }
    // private offers
    setTimeout(() => {
      if (landingOffersCount === '') {
        getOffersCount();
        this.props.showPrivateOffers();
      }
    }, 1000);
  }

  componentWillMount = () => {
    const {getEmoneyTnc, mostSoldData, configEForm, isLogin, bankList} = this.props;
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    getEmoneyTnc().then((res) => {
      this.setState({
        tncLockdown: res,
      });
    });
    this.props.goToInboxPushCounter();
    if (isEmpty(mostSoldData)) {
      this.props.getEgiftMostData();
    }
    if (isLogin) {
      if (isEmpty(configEForm)) {
        this.props.getConfigEForm();
      }
      if (isEmpty(bankList)) {
        this.props.getCacheBankList();
      }
    }
  }

  c = () => {

  }

  login = () => {
    const {isLogin} = this.props;
    if (isLogin) {
      this.props.gotoDasboard();
    } else {
      this.props.onButtonPress('Login');
      this.props.turnOffTnc();
    }
  }

  loginFromLuckDip = () => {
    const {isLogin} = this.props;
    if (isLogin) {
      this.props.inquiryLuckyDipCoupon();
    } else {
      this.props.onButtonPress('true');
      this.props.turnOffTnc();
    }
  }

  register = () => this.props.goToRegister()

  changeLanguage = (selectedLanguage) => () => {
    const {currentLanguage, changeCurrentLanguage} = this.props;
    if (currentLanguage.id !== selectedLanguage.id) {
      changeCurrentLanguage(selectedLanguage.id);
    }
  }

  goToDetail = (product) => () => {
    this.props.goToDetail(product);
  }

  isSelectedLanguage = (currentId) => currentId === result(this.props, 'currentLanguage.id', '')

  buttonMap = [{
    id: 'id',
    displayText: 'ID',
    onPress: this.changeLanguage({id: 'id'})
  }, {
    id: 'en',
    displayText: 'EN',
    onPress: this.changeLanguage({id: 'en'})
  }]

  loginLanding = () => {
    this.props.getCacheBankList();
    this.props.onButtonPress('LoginLanding');
  }

  navgotoEasyPin = (productName) => () => {
    this.props.onButtonPress('LoginProduct', '', productName);
  }

  render () {
    const {offers = [], onOfferClick = noop, clickedOffer = {},
      closeHandler = noop, getEgiftList, egiftList, cgvTab = noop, listCategoryOffers,
      simasPoin, TabShopping, getShoppingList, inquirySimasPoin, toogleKoperasi,
      nav, SimasPoinHistory, goToDiscountMerchant, goToDiscountQREULA, toogleMenuKoperasi,
      goToOffer, flightTab, goToBillpay, goToQrPayment, billerMenuOrderRevamp, goToCart, openDrawer,
      emoney, getBalanceEmoney, isShowTnC, goToAlfacart, openInbox, mostSoldData, toggleDisableBillerNKYC,
      accounts, addOrder, tutorialProduct, dataDisplay, goToAlfacartNew, goToSearchAlfacart, goToTncAlfacart, finishOrder,
      logout, isLogin, serverTime, isLuckyDipActive, luckyDipCounter, inquiryLuckyDipCoupon, luckyDipcache, lazyLogin, goToTncSimasCatalog,
      goToMenuSearch, newProduct, getValas, getTdCreate, getInsurance, goToSplitBillMenu, goReferralCode, newProductCC, gotoProduct, hideMGM, 
      goToLoan, goToMerchantStore, statusMember, goToMembership, goToTncUnipin} = this.props;
    let {tncLockdown} = this.state;
    const currentVersion = VersionNumber.appVersion;
    const currentRouteName = getCurrentRouteName(nav);
    const sortedCategory = sortBy(listCategoryOffers, 'priority');
    if (currentRouteName === 'QRScannerLanding') {
      this.props.getScannerState();
    }
    if (isShowTnC === currentVersion && tncLockdown) {
      return <AgreementEmoney tncLockdown={tncLockdown} login={this.login} />;
    } else {
      return (
        <LandingView login={this.login} register={this.register} toogleKoperasi={toogleKoperasi} listCategoryOffers={sortedCategory}
          buttonMap={this.buttonMap} isSelectedLanguage={this.isSelectedLanguage} isLockedDevice={this.props.isLockedDevice}
          offers={offers} onOfferClick={onOfferClick} cgvTab={cgvTab} clickedOffer={clickedOffer} closeHandler={closeHandler}
          getEgiftList={getEgiftList} egiftList={egiftList} goToDetail={this.goToDetail} simasPoin={simasPoin} TabShopping={TabShopping}
          getShoppingList={getShoppingList} inquirySimasPoin={inquirySimasPoin} nav={nav} SimasPoinHistory={SimasPoinHistory}
          goToDiscountMerchant={goToDiscountMerchant} goToDiscountQREULA={goToDiscountQREULA} goToOffer={goToOffer} flightTab={flightTab} goToBillpay={goToBillpay} serviceList={this.serviceList}
          navigateTo={this.navigateTo} onBuyMobileTopTop={this.onBuyMobileTopTop} goToQrPayment={goToQrPayment} goToTncSimasCatalog={goToTncSimasCatalog}
          goPayNavigateTo={this.goPayNavigateTo} billerMenuOrder={billerMenuOrderRevamp} toogleMenuKoperasi={toogleMenuKoperasi} toggleDisableBillerNKYC={toggleDisableBillerNKYC} inquiryLuckyDipCoupon={inquiryLuckyDipCoupon} luckyDipCounter={luckyDipCounter} isLuckyDipActive={isLuckyDipActive} serverTime={serverTime}
          goToBiller={this.goToBiller} goToCart={goToCart} openDrawer={openDrawer} emoney={emoney} getBalanceEmoney={getBalanceEmoney} goToAlfacart={goToAlfacart} openInbox={openInbox} mostSoldData={mostSoldData} goToEmoneyHistoryNavigate={this.goToEmoneyHistory} luckyDipcache={luckyDipcache}
          accounts={accounts} addOrder={addOrder} tutorialProduct={tutorialProduct} dataDisplay={dataDisplay} goToAlfacartNew={goToAlfacartNew} goToSearchAlfacart={goToSearchAlfacart} goToTncAlfacart={goToTncAlfacart} finishOrder={finishOrder} logout={logout} isLogin={isLogin} loginFromLuckDip={this.loginFromLuckDip} lazyLogin={lazyLogin}
          loginLanding={this.loginLanding} goToMenuSearch={goToMenuSearch} gotoEasyPin={this.navgotoEasyPin} newProduct={newProduct} getValas={getValas} getTdCreate={getTdCreate} getInsurance={getInsurance} goToSplitBillMenu={goToSplitBillMenu} goReferralCode={goReferralCode} newProductCC={newProductCC} gotoProduct={gotoProduct} hideMGM={hideMGM} 
          goToLoan={goToLoan} goToMerchantStore={goToMerchantStore} goToMembership={goToMembership} statusMember={statusMember} goToTncUnipin={goToTncUnipin} />
      );
    }
  }
}

const ConnectedLandingPage = connect(mapStateToProps, mapDispatchToProps)(LandingPage);
export default ConnectedLandingPage;
