/** Currently using AsyncStorage , we may end up  using Realm **/
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageKeys = {
  SESSION_CODE: 'sessionCode',
  USERNAME: 'username',
  TOKEN_CLIENT: 'tokenClient',
  TOKEN_SERVER: 'tokenServer',
  ALL_ELECTRICITY_TRANSACTIONS: 'allElectricityTransactions',
  ALL_WATER_TRANSACTIONS: 'allWaterTransactions',
  ALL_POSTPAID_TRANSACTIONS: 'allPostpaidTransactions',
  ALL_RECHARGES: 'allRecharges',
  ALL_PAYEES: 'allPayees',
  ALL_CREDIT_CARD_TRANSACTIONS: 'allCreditCardTransactions',
  LANGUAGE: 'language',
  FEEDBACK_GIVEN: 'feedbackGiven',
  FEEDBACK_COUNT: 'feedbackCount',
  CLEAR_HISTORY: 'clearHistory',
  QREULA: 'QREula',
  LANG: 'lang',
  POPUPLANDING: 'popuplanding',
  POPUPLKD: 'popuplkd',
  ACCOUNT_VISIBILITY: 'accountVisibility',
  IS_FACE_REGISTERED: 'isFaceRegistered',
  LOGIN_SETTING: 'loginSetting',
  SKIP_FACE_REGIS: 'skipFaceRegis',
  PAYDAYPOPUPOFFER: 'paydayOffer',
  LAST_SUCCESSFUL_LOGIN: 'lastLogin',
  PAYDAYLOANREDEEM: 'paydayLoanRedeem',
  GETCASHGUIDEMODAL: 'getCashGuideModal',
  MOBILE_NUMBER: 'getMobileNumber',
  QR_DISCOUNT_EULA: 'getQRDiscountEULA',
  IS_NEW_MENU: 'getIsNewMenu',
  PROFILE_PICTURE: 'getProfilePicture',
  OFFLINEGENERATECODE: 'offlineGenerateCode',
  OFFLINEGENERATECODECLICK: 'offlineGenerateCodeClick',
  RANDOMGENERATECODE: 'randomGenerateCode',
  LUCKYDRAW_REDEEM: 'LuckyDrawRedeem',
  LOGIN_WITH_RELEASE_DEVICE: 'releaseDeviceLogin',
  SPINNER_RELEASE_DEVICE: 'releaseDeviceSpinner',
  GET_OFFER_PGO: 'getLastOffersPinjamanGO',
  PGO_REJECT: 'pgoReject',
  PGO_PAYMENT: 'pgoPayment',
  CART_ALFACART: 'cartAlfacart',
  WISHLIST_ALFACART: 'wishlistAlfacart',
  CART_CMI: 'cartCMI',
  WISHLIST_CMI: 'wishlistCMI',
  LUCKY_DIP_ADDRESS_STORAGE: 'luckyDipAddress',
  WELCOME_EMONEY: 'welcomeEmoney',
  TNC_LOCKDOWN: 'tncLockdown',
  NEW_SPLITBILL: 'newSplitBill',
  NEW_SOF: 'new',
  GET_DEFAULT_ADDRESS: 'getDefaultAddress',
  FEEDBACK_CHECKLIST: 'feedbackChecklist',
  ACCOUNT_DATA_DEFAULT: 'defaultAccountEmoney',
  TOOGLE_PRIMARY_ACCOUNT: 'primaryAccountToogle',
  CUSTOMER_ACC_ALL: 'allCustomerAcc',
  TOOLTIP_NEW_FEATURES: 'tooltipNew',
  EGIFT_MOST_DATA: 'egiftMostData',
  OFFER_LIST_DATA: 'offerListData',
  LUCKY_DIP_TICKET: 'luckyDipTicket',
  CONFIG_VERSION: 'configVersion',
  APPCONFIG_LIST_DATA: 'appConfigListData',
  BILLERCONFIG_LIST_DATA: 'billerConfigListData',
  AUTO_SAVE_CHECKLIST: 'autoSaveChecklist',
  GET_PRIVATE_OFFERS_TD: 'privateOffersTD',
  GET_PRIVATE_OFFERS_LP2: 'privateOffersLP2',
  GET_REFER_MGM: 'ReferMgm',
  FEEDBACK_CHECKLIST_CATALOG: 'feedbackChecklistCatalog',
  GET_RECENT_SEARCH: 'recentSearch',
  GET_RECENT_SEARCH_SORT: 'recentSearchSort',
  OFFER_MENU_SEARCH: 'offerMenuSearch',
  CONFIG_VERSION_MENU_SEARCH: 'configVersionMenuSearch',
  SIMAS_CATALOG_LOCATION: 'simasCatalogLocation',
  CONFIG_LIST_EFORM: 'configListEForm',
  CONFIG_VERSION_BANK_LIST: 'configVersionBankList',
  BANK_LIST: 'BankList',
  CONFIG_EMONEY: 'configEmoney',
  CONFIG_CHARGE: 'configCharge',
  TNC_UNIPIN: 'tncUnipin',
};
// methods for storing and retrieving objects
export const set = async (key, value) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(key, jsonValue);
};

export const get = async key => {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

export const getInitKeys = () =>
  Promise.all([
    get(storageKeys.USERNAME),
    get(storageKeys.TOKEN_CLIENT),
    get(storageKeys.TOKEN_SERVER),
  ]);

export const getTransactionDetails = () =>
  Promise.all([
    get(storageKeys.ALL_ELECTRICITY_TRANSACTIONS),
    get(storageKeys.ALL_WATER_TRANSACTIONS),
    get(storageKeys.ALL_POSTPAID_TRANSACTIONS),
    get(storageKeys.ALL_RECHARGES),
    get(storageKeys.ALL_PAYEES),
    get(storageKeys.ALL_CREDIT_CARD_TRANSACTIONS),
  ]);

export const remove = key => AsyncStorage.removeItem(key);

export const getUsername = () => get(storageKeys.USERNAME);

export const getClientToken = () => get(storageKeys.TOKEN_CLIENT);

export const getServerToken = () => get(storageKeys.TOKEN_SERVER);

export const getQREULA = () => get(storageKeys.QREULA);

export const getLanguage = () => get(storageKeys.LANG);

export const getPopUpLanding = () => get(storageKeys.POPUPLANDING);

export const getPopUpLKD = () => get(storageKeys.POPUPLKD);

export const getPopUpPayday = () => get(storageKeys.PAYDAYPOPUPOFFER);

export const getPaydayLoanRedeem = () => get(storageKeys.PAYDAYLOANREDEEM);

export const getAccountVisibility = () => get(storageKeys.ACCOUNT_VISIBILITY);

export const getIsFaceRegistered = () => get(storageKeys.IS_FACE_REGISTERED);

export const getLoginSetting = () => get(storageKeys.LOGIN_SETTING);

export const getSkipFaceRegis = () => get(storageKeys.SKIP_FACE_REGIS);

export const getLastLogin = () => get(storageKeys.LAST_SUCCESSFUL_LOGIN);

export const getIsCashGuideModalShow = () => get(storageKeys.GETCASHGUIDEMODAL);

export const getMobileNumber = () => get(storageKeys.MOBILE_NUMBER);

export const getQRDiscountEULA = () => get(storageKeys.QR_DISCOUNT_EULA);

export const getIsNewMenu = () => get(storageKeys.IS_NEW_MENU);
export const getProfilePicture = () => get(storageKeys.PROFILE_PICTURE);

export const offlineGenerateCode = () => get(storageKeys.OFFLINEGENERATECODE);

export const offlineGenerateCodeClick = () =>
  get(storageKeys.OFFLINEGENERATECODECLICK);

export const randomGenerateCode = () => get(storageKeys.RANDOMGENERATECODE);

export const LuckyDrawRedeem = () => get(storageKeys.LUCKYDRAW_REDEEM);

export const releaseDeviceLogin = () =>
  get(storageKeys.LOGIN_WITH_RELEASE_DEVICE);

export const releaseDeviceSpinner = () =>
  get(storageKeys.SPINNER_RELEASE_DEVICE);

export const getLastOffersPinjamanGO = () => get(storageKeys.GET_OFFER_PGO);

export const getFeedbackGiven = () => get(storageKeys.FEEDBACK_GIVEN);
export const getLastAddressLuckyDip = () =>
  get(storageKeys.LUCKY_DIP_ADDRESS_STORAGE);

export const cartAlfacart = () => get(storageKeys.CART_ALFACART);

export const wishlistAlfacart = () => get(storageKeys.WISHLIST_ALFACART);

export const cartCMI = () => get(storageKeys.CART_CMI);

export const wishlistCMI = () => get(storageKeys.WISHLIST_CMI);

export const getDefaultAddress = () => get(storageKeys.GET_DEFAULT_ADDRESS);

export const getChecklistAlfacart = () => get(storageKeys.FEEDBACK_CHECKLIST);

export const getDefaultEmoney = () => get(storageKeys.ACCOUNT_DATA_DEFAULT);

export const getAlldefaultAccount = () => get(storageKeys.CUSTOMER_ACC_ALL);

export const getEgiftMost = () => get(storageKeys.EGIFT_MOST_DATA);

export const getOfferList = () => get(storageKeys.OFFER_LIST_DATA);

export const getLastLuckyDipTicket = () => get(storageKeys.LUCKY_DIP_TICKET);

export const getConfigVersion = () => get(storageKeys.CONFIG_VERSION);

export const getAppConfigList = () => get(storageKeys.APPCONFIG_LIST_DATA);

export const getBillerConfigVersion = () =>
  get(storageKeys.BILLERCONFIG_LIST_DATA);

export const getAutoSaveChecklist = () => get(storageKeys.AUTO_SAVE_CHECKLIST);

export const getTooglePrimaryAccount = () =>
  get(storageKeys.TOOGLE_PRIMARY_ACCOUNT);

export const getPrivateOffersTD = () => get(storageKeys.GET_PRIVATE_OFFERS_TD);

export const getPrivateOffersLP2 = () =>
  get(storageKeys.GET_PRIVATE_OFFERS_LP2);

export const getLastReferMgm = () => get(storageKeys.GET_REFER_MGM);

export const getRecentSearch = () => get(storageKeys.GET_RECENT_SEARCH);

export const getRecentSearchSort = () =>
  get(storageKeys.GET_RECENT_SEARCH_SORT);

export const getOfferMenuSearch = () => get(storageKeys.OFFER_MENU_SEARCH);

export const getConfigVersionMenuSearch = () =>
  get(storageKeys.CONFIG_VERSION_MENU_SEARCH);

export const getConfigListEForm = () => get(storageKeys.CONFIG_LIST_EFORM);

export const getConfigVersionBankList = () =>
  get(storageKeys.CONFIG_VERSION_BANK_LIST);

export const getBankList = () => get(storageKeys.BANK_LIST);

export const getConfigEmoney = () => get(storageKeys.CONFIG_EMONEY);

export const getChargeBankList = () => get(storageKeys.CONFIG_CHARGE);

export const removeInitKeys = () =>
  Promise.all([remove(storageKeys.USERNAME), remove(storageKeys.TOKEN_SERVER)]);

export const clearLocalStorage = () =>
  Promise.all([
    remove(storageKeys.SESSION_CODE),
    remove(storageKeys.USERNAME),
    remove(storageKeys.TOKEN_CLIENT),
    remove(storageKeys.TOKEN_SERVER),
    remove(storageKeys.ALL_ELECTRICITY_TRANSACTIONS),
    remove(storageKeys.ALL_WATER_TRANSACTIONS),
    remove(storageKeys.ALL_POSTPAID_TRANSACTIONS),
    remove(storageKeys.ALL_RECHARGES),
    remove(storageKeys.ALL_PAYEES),
    remove(storageKeys.ALL_CREDIT_CARD_TRANSACTIONS),
    remove(storageKeys.FEEDBACK_GIVEN),
    remove(storageKeys.FEEDBACK_COUNT),
    remove(storageKeys.POPUPLANDING),
    remove(storageKeys.POPUPLKD),
    remove(storageKeys.ACCOUNT_VISIBILITY),
    remove(storageKeys.IS_FACE_REGISTERED),
    remove(storageKeys.LOGIN_SETTING),
    remove(storageKeys.SKIP_FACE_REGIS),
    remove(storageKeys.PAYDAYPOPUPOFFER),
    remove(storageKeys.LAST_SUCCESSFUL_LOGIN),
    remove(storageKeys.PAYDAYLOANREDEEM),
    remove(storageKeys.GETCASHGUIDEMODAL),
    remove(storageKeys.MOBILE_NUMBER),
    remove(storageKeys.QR_DISCOUNT_EULA),
    remove(storageKeys.IS_NEW_MENU),
    remove(storageKeys.PROFILE_PICTURE),
    remove(storageKeys.OFFLINEGENERATECODE),
    remove(storageKeys.OFFLINEGENERATECODECLICK),
    remove(storageKeys.RANDOMGENERATECODE),
    remove(storageKeys.LUCKYDRAW_REDEEM),
    remove(storageKeys.GET_OFFER_PGO),
    remove(storageKeys.PGO_REJECT),
    remove(storageKeys.PGO_PAYMENT),
    remove(storageKeys.CART_ALFACART),
    remove(storageKeys.WISHLIST_ALFACART),
    remove(storageKeys.LUCKY_DIP_ADDRESS_STORAGE),
    remove(storageKeys.WELCOME_EMONEY),
    remove(storageKeys.GET_DEFAULT_ADDRESS),
    remove(storageKeys.FEEDBACK_CHECKLIST),
    remove(storageKeys.ACCOUNT_DATA_DEFAULT),
    remove(storageKeys.TOOGLE_PRIMARY_ACCOUNT),
    remove(storageKeys.CUSTOMER_ACC_ALL),
    remove(storageKeys.EGIFT_MOST_DATA),
    remove(storageKeys.LUCKY_DIP_TICKET),
    remove(storageKeys.BILLERCONFIG_LIST_DATA),
    remove(storageKeys.OFFER_LIST_DATA),
    remove(storageKeys.GET_PRIVATE_OFFERS_TD),
    remove(storageKeys.GET_PRIVATE_OFFERS_LP2),
    remove(storageKeys.GET_REFER_MGM),
    // remove(storageKeys['TOOLTIP_NEW_FEATURES']),
    remove(storageKeys.AUTO_SAVE_CHECKLIST),
    remove(storageKeys.FEEDBACK_CHECKLIST_CATALOG),
    remove(storageKeys.GET_RECENT_SEARCH),
    remove(storageKeys.GET_RECENT_SEARCH_SORT),
    remove(storageKeys.OFFER_MENU_SEARCH),
    remove(storageKeys.CONFIG_VERSION_MENU_SEARCH),
    remove(storageKeys.CONFIG_VERSION_BANK_LIST),
    remove(storageKeys.BANK_LIST),
    remove(storageKeys.CONFIG_EMONEY),
    remove(storageKeys.TNC_UNIPIN),
  ]);

export const clearHistory = () =>
  Promise.all([
    remove(storageKeys.ALL_ELECTRICITY_TRANSACTIONS),
    remove(storageKeys.ALL_WATER_TRANSACTIONS),
    remove(storageKeys.ALL_POSTPAID_TRANSACTIONS),
    remove(storageKeys.ALL_RECHARGES),
    remove(storageKeys.ALL_PAYEES),
    remove(storageKeys.ALL_CREDIT_CARD_TRANSACTIONS),
  ]);
