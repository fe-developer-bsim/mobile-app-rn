import * as actionCreators from '../actions/index.actions.js';
import * as middlewareUtils from '../../utils/middleware.util';

import {
  OBM_EncryptPassword,
  OBM_GetEncodingParameter,
  OBM_GetEncryptedPassword,
  randomString,
} from '../../utils/vendor/pinEncryption.util';
import {change, destroy, reset} from 'redux-form';
import {
  checkIfEmpty,
  formatMobileNumberEmoneyRegistration,
  generateCaptcha as generateCaptchaTransformer,
  generatePaymentRoute,
  getAllOffersExcept,
  getCountCoupon,
  getErrorMessage,
  getFilteredBillerDataRevamp,
  getTransactionType,
  isLockedDevice,
  lowerCase,
  transformToken,
  transformTokenIos,
  transformTokenSpecialChar,
  wrapMethodInFunction,
  inNumber,
  checkSyaria,
  etaxMonthRange,
  currencyFormatter,
} from '../../utils/transformer.util';
import {
  checkLogin,
  checkLoginAllsegmentFlow,
  checkLoginCC,
  checkLoginEmoney,
  checkLoginSaving,
  logout,
  logoutAndReleaseDevice,
  prepareGoBiller,
  prepareGoBillerVoucher,
  sendOtpActivation,
  sendOtpResetPassword,
  getBalanceEmoneyBeforeLogin,
} from './onboarding.thunks';
import {deleteTerminal, resetTerminal} from './QRGpn.thunks';
import {
  filter,
  find,
  forEach,
  isArray,
  isEmpty,
  noop,
  reverse,
  slice,
  sortBy,
  startsWith,
  trimEnd,
} from 'lodash';
import {
  getAlldefaultAccount,
  getConfigVersion,
  getEgiftMost,
  getInitKeys,
  getIsFaceRegistered,
  getLastLuckyDipTicket,
  getMobileNumber,
  getOfferList,
  getQRDiscountEULA,
  getSkipFaceRegis,
  getTooglePrimaryAccount,
  releaseDeviceLogin,
  set,
  storageKeys,
  getLastReferMgm,
  get,
  getRecentSearch,
  remove,
  getConfigVersionMenuSearch,
  getAppConfigList,
  getConfigVersionBankList,
} from '../../utils/storage.util';
import api from '../../utils/api.util';
import result from 'lodash/result';
import {StackActions, NavigationActions} from 'react-navigation';
import {Toast} from '../../utils/RNHelpers.util.js';
import {language, setCurrentLang} from '../../config/language';

import Contacts from 'react-native-contacts';
import DeepLinking from 'react-native-deep-linking';
import DeviceInfo from 'react-native-device-info';
import {ENV} from '../../config/env.config';
import Geolocation from '@react-native-community/geolocation';
import {Linking} from 'react-native';
import {updateFundTransferFees} from '../../config/appConstants.config';
import {getUserApiKey} from './qrpayment.thunk';
import {Platform} from 'react-native';
import {resetToLandingAndNavigate} from './navigation.thunks';
import Permissions from 'react-native-permissions';
import Pushwoosh from 'pushwoosh-react-native-plugin';
import VersionNumber from 'react-native-version-number';
import {deleteRecurringTransfer} from './fundTransfer.thunks';
import {genericBillerNavigate} from '../../utils/genericBiller.util';
import {getFavBiller} from './dashboard.thunks';
import {getLuckyDipTicket} from './luckyDip.thunks';
import {initStoreWithTransactionDetails} from './onboarding.thunks';
import {initializeRSA} from '../../utils/secure.util';
import map from 'lodash/map';
import moment from 'moment';
import {pushWooshAppConstants} from '../../config/env.config';
import {setModulusExponent} from '../../utils/vendor/pinEncryption.util';
import size from 'lodash/size';
import tracker from '../../utils/googleAnalytics.util';
import {
  triggerAuthBillpay,
  getAmountForGenericBillerTypeOne,
} from './genericBill.thunks';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {
  checklistUnipin,
  shouldGiveChecklist,
  shouldGiveChecklistSimasCatalog,
} from './digitalStore.thunks';

// import firebase from 'react-native-firebase';
// import JailMonkey from 'jail-monkey';
// import RNExitApp from 'react-native-exit-app'; // //comment for release
// let Analytics = firebase.analytics();

import Share from 'react-native-share';
import {openInbox} from './dashboard.thunks';
import {genericSearchNavigate} from '../../utils/genericRouteSearch.util';
import {MenuSearchContent} from '../../config/MenuSearchContent.config';

// import {NetworkInfo} from 'react-native-network-info';
import {blockCC, sendCCAddress, createPin} from './creditCardManage.thunks';
import {confirmActivate, showVCC, showDormantOtp} from './dashboard.thunks';
import {rsa} from 'react-native-rsa';
import {Dynatrace} from '@dynatrace/react-native-plugin';
let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

let LocationServices;

if (Platform.OS === 'android') {
  LocationServices =
    require('react-native-android-location-services-dialog-box').default;
}

export function setupAppInitKeys() {
  return dispatch =>
    getInitKeys().then(values => {
      const data = {};
      data[storageKeys.USERNAME] = values[0];
      data[storageKeys.TOKEN_CLIENT] = values[1];
      data[storageKeys.TOKEN_SERVER] = values[2];
      dispatch(actionCreators.saveAppInitKeys(data));
      return data;
    });
}

export function hsmInit() {
  return dispatch => {
    // Do not init HSM Encryption in dev/uat environments
    if (ENV === 'production' || ENV === 'dev') {
      return Promise.resolve();
    }
    return api
      .retrieveHSMInitKeys(dispatch)
      .then(r => {
        const E2EE_RANDOM = r.data._e2EERandomNum;
        const publicKey = r.data._e2EEPublicKey;
        const sessionId = r.data._e2EESessionId;
        // dispatch(actionCreators.setAPIPayloadParam({E2EE_RANDOM, publicKey, sessionId})); // not use if using new obm
        return initializeRSA(publicKey, sessionId, E2EE_RANDOM);
      })
      .catch(err =>
        tracker.trackEvent('NON_FATAL_ERROR', 'HSM_INIT API FAILED', null, {
          label: `ERROR_MSG: ${JSON.stringify(err)}`,
        }),
      );
  };
}

export function checkHSMInit() {
  return (dispatch, getState) => {
    // Do not init HSM Encryption in dev/uat environments
    if (ENV === 'production' || ENV === 'dev') {
      return Promise.resolve();
    }

    const resultE2EE_RANDOM = result(
      getState(),
      'additionalApiPayload.E2EE_RANDOM',
      {},
    );
    const resultpublicKey = result(
      getState(),
      'additionalApiPayload.publicKey',
      {},
    );
    const resultsessionId = result(
      getState(),
      'additionalApiPayload.sessionId',
      {},
    );

    if (
      isEmpty(resultE2EE_RANDOM) ||
      isEmpty(resultpublicKey) ||
      isEmpty(resultsessionId)
    ) {
      return api
        .retrieveHSMInitKeys(dispatch)
        .then(r => {
          const E2EE_RANDOM = r.data._e2EERandomNum;
          const publicKey = r.data._e2EEPublicKey;
          const sessionId = r.data._e2EESessionId;

          // dispatch(actionCreators.setAPIPayloadParam({E2EE_RANDOM, publicKey, sessionId})); // not use if using new obm
          initializeRSA(publicKey, sessionId, E2EE_RANDOM);
          return Promise.resolve();
        })
        .catch(() => {
          const err = {
            data: {
              responseMessage: language.ERROR_MESSAGE__HSM_RE_INIT_FAILED,
            },
          };
          tracker.trackEvent(
            'NON_FATAL_ERROR',
            'HSM RE-INIT API FAILED',
            null,
            {label: `ERROR_MSG: ${JSON.stringify(err)}`},
          );
          return Promise.reject(err);
        });
    } else {
      return Promise.resolve();
    }
  };
}

export function getBalances() {
  return (dispatch, getState) => {
    const state = getState();
    const accounts = result(state, 'accounts', []);
    const emoneyAccount = find(result(state, 'accounts', []), {
      accountType: 'emoneyAccount',
    });
    if (
      isEmpty(emoneyAccount) ||
      (!isEmpty(emoneyAccount) && accounts.length > 1)
    ) {
      return Promise.resolve();
    } else {
      return Promise.resolve();
    }
  };
}

export function getBalancesOnRefresh() {
  return (dispatch, getState) => {
    const state = getState();
    const emoneyBalance = result(state, 'emoney', {});
    const accounts = result(state, 'accounts', []);
    const emoneyAccount = find(result(state, 'accounts', []), {
      accountType: 'emoneyAccount',
    });
    if (
      isEmpty(emoneyAccount) ||
      (!isEmpty(emoneyAccount) && accounts.length > 1)
    ) {
      return api
        .getBalances(dispatch)
        .then(res => {
          const accounts = {
            accounts: [...res.data.accounts, {...emoneyBalance}],
          };
          dispatch(
            actionCreators.updateBalances(
              middlewareUtils.getBalances(accounts),
            ),
          );
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_UPDATE_BALANCES,
            ),
            Toast.LONG,
          );
          throw err;
        });
    } else {
      return Promise.resolve();
    }
  };
}

export function updateBalances(checkingValue = false) {
  return (dispatch, getState) => {
    const state = getState();
    const emoneyBalance = result(state, 'emoney', {});
    dispatch(actionCreators.showSpinner());
    if (!isEmpty(result(state, 'user.profile.customer.cifCode', ''))) {
      return api
        .getBalances(dispatch)
        .then(res => {
          const accounts = {
            accounts: [...res.data.accounts, {...emoneyBalance}],
          };
          dispatch(
            actionCreators.updateBalances(
              middlewareUtils.getBalances(accounts),
            ),
          );
          dispatch(
            actionCreators.updateBalanceEmoney(
              middlewareUtils.getBalancesEmoney(accounts),
            ),
          );
          dispatch(actionCreators.hideSpinner());
          const isLuckyDipActive = result(
            state,
            'config.flag.flagLuckyDip',
            'inactive',
          );
          if (
            (isLuckyDipActive === 'active' || isLuckyDipActive === 'ACTIVE') &&
            !checkingValue
          ) {
            dispatch(getLuckyDipTicket());
          }
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          throw err;
        });
    } else {
      dispatch(actionCreators.hideSpinner());
      return Promise.resolve();
    }
  };
}

export function assembleDataForDashboard(dispatch, res) {
  // dispatch(actionCreators.updatePayees(middlewareUtils.getPayees(res.data)));
  dispatch(
    actionCreators.updateAccounts(middlewareUtils.getAccounts(res.data)),
  );
  dispatch(
    actionCreators.updateUserMetaData(
      middlewareUtils.getUserMetaData(res.data),
    ),
  );
  dispatch(
    actionCreators.saveDefaultAccount(
      middlewareUtils.getDefaultAccount(res.data),
    ),
  );
  dispatch(actionCreators.saveCClist(middlewareUtils.getAccountsCC(res.data)));
}

export function assembleDataForDashboardNew(dispatch, res) {
  dispatch(
    actionCreators.updateAccounts(middlewareUtils.getAccounts(res.data)),
  );
  dispatch(
    actionCreators.updateUserMetaData(
      middlewareUtils.getUserMetaData(res.data),
    ),
  );
  dispatch(actionCreators.saveCClist(middlewareUtils.getAccountsCC(res.data)));
  dispatch(
    actionCreators.saveDefaultAccount(
      middlewareUtils.getDefaultAccount(res.data),
    ),
  );
}

export function prepareDataForLogin(dispatch, res, cifCode) {
  if (!startsWith(cifCode, 'NK')) {
    dispatch(actionCreators.saveCIFstate());
  }
  dispatch(actionCreators.saveLoginData(res));
  dispatch(
    actionCreators.updateAccounts(middlewareUtils.getAccounts(res.data)),
  );
}

export function refreshStorageNew() {
  return (dispatch, getState) => {
    const isLoginV2 = result(getState(), 'config.toogleLoginNew', '') === 'YES';
    const refreshStorageAPI = isLoginV2
      ? api.refreshStorageV2
      : api.refreshStorageV2;
    dispatch(actionCreators.savecounterTrxData(true));
    return refreshStorageAPI({}, dispatch)
      .then(res => {
        const state = getState();
        const isLuckyDipActive = result(
          state,
          'config.flag.flagLuckyDip',
          'inactive',
        );
        if (!isEmpty(res.data)) {
          if (isLoginV2) {
            assembleDataForDashboardNew(dispatch, res);
          } else {
            assembleDataForDashboard(dispatch, res);
          }
          if (isLuckyDipActive === 'active' || isLuckyDipActive === 'ACTIVE') {
            dispatch(getLuckyDipTicket());
          }
        } else {
          throw Error('');
        }
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_UPDATE_ACCOUNT_LIST,
          ),
          Toast.LONG,
        );
      });
  };
}

export function refreshStorage() {
  return (dispatch, getState) => {
    const isLoginV2 = result(getState(), 'config.toogleLoginNew', '') === 'YES';
    const refreshStorageAPI = isLoginV2
      ? api.refreshStorageV2
      : api.refreshStorageV2;
    return refreshStorageAPI({}, dispatch)
      .then(res => {
        if (!isEmpty(res.data)) {
          const state = getState();
          const isLuckyDipActive = result(
            state,
            'config.flag.flagLuckyDip',
            'inactive',
          );
          if (isLoginV2) {
            assembleDataForDashboardNew(dispatch, res);
            dispatch(updateBalances(true));
          } else {
            assembleDataForDashboard(dispatch, res);
            dispatch(updateBalances(true));
          }
          if (isLuckyDipActive === 'active' || isLuckyDipActive === 'ACTIVE') {
            dispatch(getLuckyDipTicket());
          }
        } else {
          throw Error('');
        }
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_UPDATE_ACCOUNT_LIST,
          ),
          Toast.LONG,
        );
      });
  };
}

export function refreshStorageSend() {
  return (dispatch, getState) => {
    let status = 'loading';
    const state = getState();
    const isLuckyDipActive = result(
      state,
      'config.flag.flagLuckyDip',
      'inactive',
    );
    const isLoginV2 = result(state, 'config.toogleLoginNew', '') === 'YES';
    const refreshStorageAPI = isLoginV2
      ? api.refreshStorageV2
      : api.refreshStorageV2;
    dispatch(actionCreators.savePayeeStatus(status));
    return refreshStorageAPI({}, dispatch)
      .then(res => {
        dispatch(actionCreators.updatePayees([]));
        dispatch(actionCreators.saveCardlessWithdrawalTransferList([]));
        if (!isEmpty(res.data)) {
          dispatch(getTargetAccount());
          if (isLuckyDipActive === 'active' || isLuckyDipActive === 'ACTIVE') {
            dispatch(getLuckyDipTicket());
          }
        } else {
          throw Error('');
        }
      })
      .catch(err => {
        const status = 'error';
        dispatch(actionCreators.savePayeeStatus(status));
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_UPDATE_ACCOUNT_LIST,
          ),
          Toast.LONG,
        );
      });
  };
}

export function populateConfigDataReload(isReload) {
  return dispatch => {
    // const storeState = getState();
    // const accounts = getSavingAccount(result(storeState, 'accounts', ''));
    // const isRooted = JailMonkey.isJailBroken();
    // if (isRooted === true) {
    // Toast.show(language.COMMON__TIMEOUT_TITLE2_F5);
    // if (ENV === 'production') {
    // RNExitApp.exitApp();
    // }
    // } // comment for release
    if (isReload === true) {
      return api.getAppConfig(dispatch).then(res => {
        const EXPOBMprod =
          '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003';
        const MODOBMprod =
          'BA6FD9A895BBDFF27736042B3719ED060465E7CE4D25E5826B620BED78A535A4841C1A5F5BEF08286CBA03A7217CD790AC425C86FAA46FCB9D465C4E1A2805ACC374B46A185EE221D53E98CC5DA456AF5AA50AC24FBB5D34235A2DAA933E64AEFE77C3BD2EFD84A2A57FA6337041DC33642D135F78CCABC7269BF408D03ADA51';
        const EXPOBMdev =
          '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003';
        const MODOBMdev =
          'D6D8A4A5E913EEBE4CBABD910196077F3206584274DC087A295A004F0C81D641CFBCF57C90EA3F75F32CB5C03CB952CB4A29F6171EA09761AB05CCCB7551CAF384EE6514BD9EB0ED5D087BC5473F222A852FE9D769FCA3C36FAFADFFE2D072977040B86EB2A00AE5D23DD860BCF12A4B757BAC0ABE488C035200EBC1058C2AAF';
        const modulusString = ENV === 'production' ? MODOBMprod : MODOBMdev;
        const exponentString = ENV === 'production' ? EXPOBMprod : EXPOBMdev;
        const timeOutSession = Number(result(res, 'data.timeoutSession', 5));
        const lazyLogin = result(res.data, 'lazyLogin', '');
        setModulusExponent(modulusString, exponentString);
        dispatch(actionCreators.saveTimeReducer(timeOutSession * 60));
        dispatch(actionCreators.setAppTimeout(timeOutSession * 60));
        dispatch(actionCreators.configPopulateData(res.data));
        // dispatch(actionCreators.priorityConfigPopulateData(priorityConfig));
        if (!isEmpty(res.data)) {
          set(storageKeys.APPCONFIG_LIST_DATA, res.data).catch(err => {
            Toast.show(
              getErrorMessage(
                err,
                language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
              ),
              Toast.LONG,
            );
          });
        }
        if (lazyLogin !== 'active') {
          dispatch(inquirySimasPoin());
          dispatch(getBalanceEmoneyBeforeLogin());
        }
      });
    }
    return Promise.resolve(); // So that the function always return a valid promise
  };
}

export function populateConfigData() {
  return (dispatch, getState) => {
    const state = getState();
    getAppConfigList().then(confidata => {
      if (!isEmpty(confidata)) {
        const EXPOBMprod =
          '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003';
        const MODOBMprod =
          'BA6FD9A895BBDFF27736042B3719ED060465E7CE4D25E5826B620BED78A535A4841C1A5F5BEF08286CBA03A7217CD790AC425C86FAA46FCB9D465C4E1A2805ACC374B46A185EE221D53E98CC5DA456AF5AA50AC24FBB5D34235A2DAA933E64AEFE77C3BD2EFD84A2A57FA6337041DC33642D135F78CCABC7269BF408D03ADA51';
        const EXPOBMdev =
          '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003';
        const MODOBMdev =
          'D6D8A4A5E913EEBE4CBABD910196077F3206584274DC087A295A004F0C81D641CFBCF57C90EA3F75F32CB5C03CB952CB4A29F6171EA09761AB05CCCB7551CAF384EE6514BD9EB0ED5D087BC5473F222A852FE9D769FCA3C36FAFADFFE2D072977040B86EB2A00AE5D23DD860BCF12A4B757BAC0ABE488C035200EBC1058C2AAF';
        const modulusString = ENV === 'production' ? MODOBMprod : MODOBMdev;
        const exponentString = ENV === 'production' ? EXPOBMprod : EXPOBMdev;
        const timeOutSession = Number(result(confidata, 'timeoutSession', 5));
        const lazyLogin = result(confidata, 'lazyLogin', '');
        setModulusExponent(modulusString, exponentString);
        dispatch(actionCreators.saveTimeReducer(timeOutSession * 60));
        dispatch(actionCreators.setAppTimeout(timeOutSession * 60));
        dispatch(actionCreators.configPopulateData(confidata));
        // dispatch(actionCreators.priorityConfigPopulateData(priorityConfig));
        if (lazyLogin !== 'active') {
          dispatch(inquirySimasPoin());
          if (
            result(state, 'appInitKeys.tokenClient', '') !== null &&
            result(state, 'appInitKeys.tokenServer', '') !== null
          ) {
            dispatch(getBalanceEmoneyBeforeLogin());
          }
        }
      } else {
        const isReload = true;
        dispatch(populateConfigData(isReload));
      }
    });
    return Promise.resolve(); // So that the function always return a valid promise
  };
}

export function resetToDashboardFrom(currentRouteIndex) {
  return dispatch => {
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: currentRouteIndex})],
      }),
    );
    dispatch(NavigationActions.back());
  };
}

export function resetToSendFrom(currentRouteIndex) {
  return dispatch => {
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: currentRouteIndex})],
      }),
    );
  };
}

export function getTransRefNumAndOTP(transactionId, shouldSendSmsOtp = true) {
  // Use triggerAuth for all normal cases. In special cases where u need only OTP and not easypin - use this
  return (dispatch, getState) =>
    dispatch(populateConfigData())
      .then(() => {
        const smsPriority = Boolean(
          result(getState(), 'config.smsPriority.payment_send', false),
        );
        const state = getState();
        const isLogin = !isEmpty(result(state, 'user', {}));
        const transferMethodType = isLogin ? '' : '1';
        const payload = middlewareUtils.prepateTransRefNumPayload(
          transactionId,
          shouldSendSmsOtp,
          transferMethodType,
        );
        return api.getTransRefNum({...payload, smsPriority}, dispatch);
      })
      .then(response => {
        dispatch(actionCreators.saveTransRefNum(response.data.transRefNum));
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_SEND_SMS_VERIFICATION,
          ),
          Toast.LONG,
        );
      });
}

export function triggerAuth(transactionId, amount, isOwnAccount = false) {
  // This function decides based on amount whether to get OTP or not (useful to handle case of EasyPin)
  return (dispatch, getState) => {
    const tokenConfig = result(getState(), 'config.tokenConfig', []);
    const shouldSendSmsOtp =
      getTransactionType(amount, tokenConfig, isOwnAccount) === '0';
    return dispatch(getTransRefNumAndOTP(transactionId, shouldSendSmsOtp));
  };
}

export function setCurrentLanguage(languageId) {
  return dispatch => {
    if (!['id', 'en'].includes(languageId)) {
      // If asyncstorage contains anything else except 'id' or 'en', use 'id'
      languageId = 'en';
    }
    setCurrentLang(languageId);
    return dispatch(actionCreators.setLanguage(languageId));
  };
}

export function populateBillerData() {
  return (dispatch, getState) => {
    const {billerConfig} = getState();
    if (result(billerConfig, 'billerList', []).length === 0) {
      return api.getbillerConfig(dispatch).then(res => {
        dispatch(actionCreators.updateBillerConfig(res.data));
        return res.data;
      });
    }
    return Promise.resolve(); // So that the function always return a valid promise
  };
}

export function resendBillPayOTP(transactionId = '') {
  return (dispatch, getState) => {
    const transRefNum = result(getState(), 'transRefNum');
    const userId = result(getState(), 'user.profile.customer.id', 0);
    const transactionType = transactionId;
    if (!transRefNum) {
      const errorMessage = getErrorMessage(
        null,
        language.ERROR_MESSAGE__NO_TRANSREFNO,
      );
      Toast.show(errorMessage, Toast.LONG);
      return Promise.resolve(); // change to reject if you want to catch on the page
    }
    return dispatch(populateConfigData())
      .then(() => {
        const smsPriority = Boolean(
          result(getState(), 'config.smsPriority.payment_resend', false),
        );
        const payload = {transRefNum, smsPriority, transactionType};

        return api.resendPaymentOTP(payload, dispatch);
      })
      .then(() =>
        tracker.trackEvent('RESEND_OTP', 'BILLPAY', null, {
          label: `userId:${userId}`,
        }),
      )
      .catch(err => {
        const errorMessage = getErrorMessage(
          err,
          language.ONBOARDING__OTP_RESEND_FAILED,
        );
        Toast.show(errorMessage, Toast.LONG);
      });
  };
}

export function setupPayment(paymentRoute, billerTypeId) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    return Promise.all([
      dispatch(populateBillerData()),
      dispatch(populateConfigData()),
    ])
      .then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(
          NavigationActions.navigate({
            routeName: paymentRoute,
            params: {billerTypeId},
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_UPDATE_BILLER_CONFIG,
          ),
          Toast.LONG,
        );
      });
  };
}

export function setupPaymentOther(billerName) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    return Promise.all([
      dispatch(populateBillerData()),
      dispatch(populateConfigData()),
    ])
      .then(() => {
        const billerConfig = result(getState(), 'billerConfig', {});
        const biller = getFilteredBillerDataRevamp(billerConfig, billerName)[0];
        dispatch(actionCreators.hideSpinner());
        genericBillerNavigate(dispatch, biller);
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_UPDATE_BILLER_CONFIG,
          ),
          Toast.LONG,
        );
      });
  };
}

export function setupPaymentGopay(paymentRoute, isGopay) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    return Promise.all([
      dispatch(populateBillerData()),
      dispatch(populateConfigData()),
    ])
      .then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(
          NavigationActions.navigate({
            routeName: paymentRoute,
            params: {isGopay},
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_UPDATE_BILLER_CONFIG,
          ),
          Toast.LONG,
        );
      });
  };
}

export function setupGenericDeepLink(isOrami) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    return Promise.all([
      dispatch(populateBillerData()),
      dispatch(populateConfigData()),
    ])
      .then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(prepareGoBiller(isOrami));
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function getCreditCardInquiry(bank, accNo, biller, name, payeeID) {
  return (dispatch, getState) => {
    const isLogin = !isEmpty(result(getState(), 'user', {}));
    const billerPreferences = result(biller, '[0].billerPreferences', '');
    const billpayMethodType = isLogin ? null : '1';
    const payload = middlewareUtils.prepareCreditCardInquiryPayload({
      accNo,
      billerPreferences,
      billpayMethodType,
    });
    dispatch(actionCreators.showSpinner());
    return api
      .inquireCreditCardBill(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        dispatch(
          NavigationActions.navigate({
            routeName: 'CreditCardPayment',
            params: {accNo, bank, name, billDetails: res.data, id: payeeID},
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_GET_CREDIT_CARD_BILL,
          ),
          Toast.LONG,
        );
      });
  };
}

export function getPayeeNameCc() {
  return (dispatch, getState) => {
    const {bank = {}, accNo = ''} = result(
      getState(),
      'form.creditcard.values',
      {},
    );
    const isLogin = !isEmpty(result(getState(), 'user', {}));
    const transferMethodType = isLogin ? '' : '1';
    let additional = [];
    if (isLogin) {
      additional = ['ipassport', 'TXID', 'lang'];
    } else {
      additional = [
        'TXID',
        'lang',
        'tokenClient',
        'tokenServer',
        'transferMethodType',
      ];
    }
    dispatch(change('creditcard', 'name', ''));
    if (
      accNo.length > 0 &&
      (bank.isSinarmas || bank.networkEnabled === 'yes')
    ) {
      const payload = middlewareUtils.prepareGetPayeeName({
        bankId: bank.id,
        accountNumber: accNo,
        transferMethodType,
      });
      dispatch(actionCreators.showSpinner());
      return api
        .getPayeeName(payload, additional, dispatch)
        .then(payeeDetails => {
          dispatch(actionCreators.hideSpinner());
          const uniqueCode = result(payeeDetails, 'data.uniqueCode', '');
          dispatch(actionCreators.saveUniqeCode(uniqueCode));
          const name = result(payeeDetails, 'data.targetName', '');
          dispatch(change('creditcard', 'name', name));
          dispatch(change('creditcard', 'payeeNameDisabled', true));
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__ERROR_GETTING_PAYEE_NAME,
            ),
            Toast.LONG,
          );
        });
    }
    dispatch(change('creditcard', 'payeeNameDisabled', false));
  };
}

// export function populateOffers () {
//   return (dispatch, getState) => {
//     const lang = result(getState(), 'currentLanguage.id', 'id');
//     return api.getOffers(lang, dispatch).then((res) => {
//       dispatch(getDefaultAccount());
//       const offers = result(res, 'data');
//       isArray(offers) && dispatch(actionCreators.populateOffers(offers));
//     }).
//     catch((err) => {
//       Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__POPULATE_OFFERS), Toast.LONG);
//     });
//   };
// }

export function populateOffersPrivate(isReload) {
  return dispatch => {
    getInitKeys()
      .then(() => {
        if (isReload === true) {
          return api
            .getOffersPrivate({}, dispatch)
            .then(res => {
              const offers = result(res, 'data');
              const data = slice(reverse(offers), 0, 1);
              const dataRaw = result(data, '0', '');
              const getOfferPrivate = result(dataRaw, 'PrivateOffers', []);
              const reverseOffers = reverse(offers);
              const offerBanner = reverseOffers.slice(
                0,
                reverseOffers.length - 1,
              );
              dispatch(actionCreators.saveToogleKoperasi(getOfferPrivate));
              isArray(offerBanner) &&
                dispatch(actionCreators.populateOffers(offerBanner));
              isArray(offerBanner) &&
                dispatch(actionCreators.clearCacheOffers());
              const customerData = result(dataRaw, 'Customer', {});
              dispatch(actionCreators.setDataTravel(customerData));
              if (!isEmpty(dataRaw)) {
                set(storageKeys.OFFER_LIST_DATA, res.data).catch(err => {
                  Toast.show(
                    getErrorMessage(
                      err,
                      language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
                    ),
                    Toast.LONG,
                  );
                });
              }
            })
            .catch(() => {});
        }
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function populateOffersCache() {
  return dispatch =>
    getOfferList()
      .then(offerData => {
        if (!isEmpty(offerData)) {
          const offers = offerData;
          const data = slice(reverse(offers), 0, 1);
          const dataRaw = result(data, '0', '');
          const getOfferPrivate = result(dataRaw, 'PrivateOffers', []);
          const customerData = result(dataRaw, 'Customer', {});
          const offerBanner = offerData;
          const cachePosition = 1;
          isArray(offerBanner) &&
            dispatch(actionCreators.populateOffers(offerBanner));
          isArray(offerBanner) &&
            dispatch(actionCreators.saveCacheOffers(cachePosition));
          dispatch(actionCreators.saveToogleKoperasi(getOfferPrivate));
          dispatch(actionCreators.setDataTravel(customerData));
        } else {
          const isReload = true;
          dispatch(populateOffersPrivate(isReload));
        }
      })
      .catch(() => {});
}

export function getPromoList() {
  return dispatch => {
    dispatch(getUserApiKey()).then(res => {
      const userApiKey = res;
      const payload = middlewareUtils.prepareLoginQRPayload(userApiKey);
      return api
        .loginQR(payload, dispatch)
        .then(res => {
          if (
            result(res, 'data.result', 'failed').toLowerCase() === 'success'
          ) {
            api
              .getQrPromoList(dispatch)
              .then(res => {
                const promo = result(res, 'data.loyaltyPrograms', []);
                isArray(promo) && dispatch(actionCreators.setQRPromo(promo));
              })
              .catch(err => {
                Toast.show(
                  getErrorMessage(err, language.ERROR_MESSAGE__POPULATE_OFFERS),
                  Toast.LONG,
                );
              });
          } else {
            dispatch(actionCreators.hideSpinner());
          }
        })
        .catch(() => {
          dispatch(actionCreators.hideSpinner());
        });
    });
  };
}

export function goToBankAcc() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToBankAcc = () => {
      dispatch(checkHSMandNavigate());
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      text: 'have an account ?',
      button1: 'YES',
      onButton1Press: goToBankAcc,
      button2: 'NO',
      onButton2Press: hideAlert,
      onClose: hideAlert,
      image: 'bankAccount',
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function checkHSMandNavigate(
  fromLuckyDip = 'false',
  routeMenuSearch = '',
  productName,
  offerNavigate,
) {
  return (dispatch, getState) =>
    dispatch(setupIsFaceRegistered())
      .then(() => {
        const {additionalApiPayload, appInitKeys} = getState();
        const state = getState();
        const lastSuccessfulLogin = result(
          state,
          'lastSuccessfulLogin',
          'easypin',
        );
        const isHSMcalled = additionalApiPayload.publicKey;
        const hsmPromise = () =>
          isHSMcalled ? Promise.resolve() : dispatch(hsmInit());
        const isUsingFaceRecog = result(state, 'faceRecognition', false);
        const isFaceRecogEnabled = result(
          state,
          'config.isFaceRecognitionEnabled',
          false,
        );
        dispatch(actionCreators.showSpinner());
        return hsmPromise()
          .then(() => {
            dispatch(actionCreators.hideSpinner());
            const isFaceRegistered = result(
              getState(),
              'isFaceRegistered.isFaceRegistered',
              false,
            );
            if (isLockedDevice(appInitKeys)) {
              if (
                lastSuccessfulLogin === 'face' &&
                isUsingFaceRecog &&
                isFaceRecogEnabled
              ) {
                dispatch(
                  checkCameraPermissionAndNavigate('CameraPage', {
                    isLockedDevice: true,
                    action: 'Login',
                  }),
                );
              } else {
                dispatch(
                  NavigationActions.navigate({
                    routeName:
                      routeMenuSearch ||
                      fromLuckyDip === 'LoginLanding' ||
                      fromLuckyDip === 'LoginProduct'
                        ? 'LoginWithEasyPinSearch'
                        : 'LoginWithEasyPin',
                    params: {
                      isLockedDevice: isLockedDevice(appInitKeys),
                      isFaceRegistered,
                      fromLuckyDip,
                      routeMenuSearch,
                      isFromSearch: routeMenuSearch !== '',
                      productName,
                      offerNavigate,
                    },
                  }),
                );
              }
            } else {
              dispatch(
                NavigationActions.navigate({
                  routeName: 'Login',
                  params: {disableEasyPinLogin: true},
                }),
              );
            }
          })
          .catch(err => {
            dispatch(actionCreators.hideSpinner());
            Toast.show(
              getErrorMessage(err, language.ERROR_MESSAGE__HSM_FAILED),
              Toast.LONG,
            );
          });
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__HSM_FAILED),
          Toast.LONG,
        );
      });
}

export function clearReducer() {
  return dispatch => {
    dispatch(actionCreators.clearAccounts());
    dispatch(actionCreators.clearUserMetaData());
    dispatch(actionCreators.clearPayee());
    dispatch(actionCreators.clearElectricityPayment());
    dispatch(actionCreators.clearWaterPayment());
    dispatch(actionCreators.clearPostpaidPayment());
    dispatch(actionCreators.clearRecharges());
    dispatch(actionCreators.clearPayees());
    dispatch(actionCreators.clearCreditCardPayment());
    dispatch(actionCreators.clearAppInitKeys());
    dispatch(actionCreators.clearCcHistory());
    dispatch(actionCreators.cleanClearTransactions());
    dispatch(actionCreators.clearTransRefNum());
    dispatch(actionCreators.clearAPIPayloadParam());
    dispatch(actionCreators.clearUserApiKey());
    dispatch(actionCreators.clearIsUsingFaceRecog());
    dispatch(actionCreators.clearIsUsingFingerprint());
    dispatch(actionCreators.clearHasFingerprint());
    dispatch(actionCreators.clearEgiftCart());
    dispatch(actionCreators.clearSimasPoin());
    dispatch(actionCreators.clearPaymentStatus());
    dispatch(actionCreators.saveSimasPoin({isLockdown: false}));
    dispatch(actionCreators.clearEmoney());
    dispatch(actionCreators.clearProvinceList());
    dispatch(actionCreators.clearCityList());
    dispatch(actionCreators.clearDistrictList());
    dispatch(actionCreators.clearSubDistrictList());
    dispatch(actionCreators.clearOpenAccountData());
    dispatch(actionCreators.clearDukcapil());
    dispatch(actionCreators.clearCheckpoint());
    dispatch(actionCreators.clearCodeOnboard());
    dispatch(actionCreators.clearInsuranceTravel());
    dispatch(actionCreators.clearInsurancePA());
    dispatch(actionCreators.clearDataPA());
    dispatch(actionCreators.clearDataTravel());
    dispatch(actionCreators.clearDefaultAccount());
    dispatch(actionCreators.clearCCTransManage());
    dispatch(actionCreators.clearCcAvailableBalance());
    dispatch(actionCreators.clearCcNotifSettings());
    dispatch(actionCreators.clearAccountIB());
    dispatch(actionCreators.clearCCTransManage());
    dispatch(actionCreators.clearCcAvailableBalance());
    dispatch(actionCreators.clearCcNotifSettings());
    dispatch(
      actionCreators.saveTutorialProduct({
        tutorialON: false,
        order: 0,
      }),
    );
    dispatch(actionCreators.clearInquirySIL());
    return Promise.resolve();
  };
}

export function generateReferralCode() {
  return (dispatch, getState) =>
    api
      .shareReferralCode(dispatch)
      .then(res => {
        const temp = result(getState(), 'user');
        const tempRC = result(res, 'data.referralCode');
        dispatch(
          actionCreators.updateUserMetaData(
            middlewareUtils.getUserMetaData(temp, tempRC),
          ),
        );
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_GENERATE_REFERRAL_CODE,
          ),
          Toast.LONG,
        );
        throw err;
      });
}

export function getTransRefNumAndOTPNavigate(
  transactionId,
  shouldSendSmsOtp = true,
  routeName,
  params,
  isOwnAccount,
  checkRefNum = false,
  isBfr,
  isBiller,
) {
  // Use triggerAuth for all normal cases. In special cases where u need only OTP and not easypin - use this
  return (dispatch, getState) =>
    dispatch(populateConfigData())
      .then(() => {
        const transRefNum = checkRefNum ? getState().transRefNum : '';
        dispatch(actionCreators.showSpinner());
        const state = getState();
        const isLogin = !isEmpty(result(state, 'user', {}));
        const transferMethodType =
          isBfr === true ? '1' : isBiller === true ? '' : isLogin ? '' : '1';
        const billpayMethodType = isBiller === true ? '1' : '';
        const isbillerOtp = isBiller === true ? isBiller : null;
        const billerUniqueCode =
          isBiller === true ? result(getState(), 'referralCode', '') : null;
        const smsPriority = Boolean(
          result(getState(), 'config.smsPriority.payment_send', false),
        );
        const payload = middlewareUtils.prepateTransRefNumPayload(
          transactionId,
          shouldSendSmsOtp,
          transRefNum,
          transferMethodType,
          billpayMethodType,
          isbillerOtp,
          billerUniqueCode,
        );
        return api.getTransRefNum({...payload, smsPriority}, dispatch);
      })
      .then(response => {
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.saveTransRefNum(response.data.transRefNum));
        const isTrf = isBfr === true ? true : '';
        dispatch(
          NavigationActions.navigate({
            routeName: routeName,
            params: {
              ...params,
              isOwnAccount,
              shouldSendSmsOtp,
              transactionId,
              isTrf,
            },
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_SEND_SMS_VERIFICATION,
          ),
          Toast.LONG,
        );
      });
}

export function triggerAuthNavigate(
  transactionId,
  amount,
  isOwnAccount = false,
  routeName = '',
  params = {},
  checkRefNum = false,
  isbillerOtp,
) {
  // This function decides based on amount whether to get OTP or not (useful to handle case of EasyPin)
  return (dispatch, getState) => {
    const tokenConfig = result(getState(), 'config.tokenConfig', []);
    const shouldSendSmsOtp =
      getTransactionType(amount, tokenConfig, isOwnAccount) === '0';
    return dispatch(
      getTransRefNumAndOTPNavigate(
        transactionId,
        shouldSendSmsOtp,
        routeName,
        params,
        isOwnAccount,
        checkRefNum,
        false,
        isbillerOtp,
      ),
    );
  };
}

export function triggerAuthNavigateSetLimit(
  transactionId,
  amount,
  isOwnAccount = false,
  routeName = '',
  params = {},
  checkRefNum = false,
  isbillerOtp,
) {
  // This function decides based on amount whether to get OTP or not (useful to handle case of EasyPin)
  return (dispatch, getState) => {
    const tokenConfig = result(getState(), 'config.reksadanaConfig', []);
    const shouldSendSmsOtp =
      getTransactionType(amount, tokenConfig, isOwnAccount) === '0';
    return dispatch(
      getTransRefNumAndOTPNavigate(
        transactionId,
        shouldSendSmsOtp,
        routeName,
        params,
        isOwnAccount,
        checkRefNum,
        false,
        isbillerOtp,
      ),
    );
  };
}

export function medalionTriggerAuthNavigate(
  transactionId,
  amount,
  isOwnAccount = false,
  routeName = '',
  params = {},
  checkRefNum = false,
  isbillerOtp,
) {
  // This function decides based on amount whether to get OTP or not (useful to handle case of EasyPin)
  return (dispatch, getState) => {
    const tokenConfig = result(getState(), 'config.reksadanaConfig', []);

    const shouldSendSmsOtp =
      getTransactionType(amount, tokenConfig, isOwnAccount) === '0';
    return dispatch(
      getTransRefNumAndOTPNavigate(
        transactionId,
        shouldSendSmsOtp,
        routeName,
        params,
        isOwnAccount,
        checkRefNum,
        false,
        isbillerOtp,
      ),
    );
  };
}

export function medalionConvertUSDTriggerAuthNavigate(amountMed, params) {
  return dispatch => {
    const transactionReferenceNumber = 'asd';
    const currencyAccountFrom = 'IDR';
    const currencyReksadana = result(params, 'currency', '');
    const payload = {
      currencyReksadana,
      currencyAccountFrom,
      amount: amountMed,
      transactionReferenceNumber,
    };
    dispatch(actionCreators.showSpinner());
    return api
      .getConvertAmountMedalion(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const amount = result(res, 'data.charge');
        const {onSubmit} = params;
        const paramsConvert = {onSubmit, amount, currencyReksadana};
        dispatch(
          medalionTriggerAuthNavigate(
            'reksadana',
            amount,
            false,
            'AuthDashboard',
            paramsConvert,
          ),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_GET_CREDIT_CARD_BILL,
          ),
          Toast.LONG,
        );
      });
  };
}

export function showTimeoutAlert() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      text: language.COMMON__APP_TIMEOUT,
      button1: language.SERVICE__OK_BUTTON,
      onButton1Press: hideAlert,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function OtherResponseInquiry(errResponse, defaultMessage) {
  const responseCode = result(errResponse, 'data.responseCode', '');
  const displayList = result(errResponse, 'data.displayList', []);
  let messageDisplayTemp = '';
  forEach(displayList, function (value) {
    messageDisplayTemp += value.key + '\n';
  });
  const messageDisplay = messageDisplayTemp
    ? messageDisplayTemp
    : defaultMessage;
  if (responseCode === '98' || responseCode === '99') {
    Toast.show(messageDisplay, Toast.LONG);
  } else {
    Toast.show(getErrorMessage(errResponse, defaultMessage), Toast.LONG);
  }
}

export function errorResponseResult(
  errResponse,
  modalOptions,
  resultDisplay,
  errorText,
  selectedAccount,
) {
  return dispatch => {
    const trimmedErrorText = trimEnd(errorText, ' ');
    const responseCode = result(errResponse, 'data.responseCode', '');
    if (responseCode === '98') {
      dispatch(
        actionCreators.showPaymentModal({
          ...modalOptions,
          errorText: language.PAYMENT__STATUS_TIMEOUT,
          resultDisplay,
          type: 'PENDING',
        }),
      );
    } else if (responseCode === '51') {
      dispatch(
        actionCreators.showPaymentModal({
          ...modalOptions,
          errorText: language.RESPONSE_MESSAGE__RC_51,
          resultDisplay,
          type: 'FAILED',
          isNoFund: true,
        }),
      );
    } else if (isEmpty(errResponse)) {
      const goToHistory = () => {
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'Landing'}),
              NavigationActions.navigate({
                routeName: 'TransactionsFilter',
                params: {accountInfo: selectedAccount},
              }),
            ],
          }),
        );
        dispatch(actionCreators.hideSinarmasAlert());
      };
      const sinarmasModalOptions = {
        heading1: language.COMMON__TIMEOUT_TITLE1,
        heading2: language.COMMON__TIMEOUT_TITLE2,
        text: language.COMMON__TIMEOUT_MESSAGE,
        button1: language.COMMON__TIMEOUT_BUTTON,
        onButton1Press: goToHistory,
        closeOnTouchOutside: false,
      };
      dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
    } else {
      dispatch(
        actionCreators.showPaymentModal({
          ...modalOptions,
          errorText: trimmedErrorText,
          resultDisplay,
          type: 'FAILED',
        }),
      );
    }
  };
}

export function moreInfo() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.ONBOARDING__OTP_MORE_INFO_TITLE,
      text: language.ONBOARDING__OTP_MORE_INFO_SUBTITLE,
      button1: language.SERVICE__OK_BUTTON,
      onButton1Press: hideAlert,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}
export function moreInfoBL() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.MORE_INFOBL__TITTLE,
      text: language.MORE_INFOBL__SUBTEXT,
      button1: language.SERVICE__OK_BUTTON,
      onButton1Press: hideAlert,
      onClose: hideAlert,
    };
    dispatch(
      actionCreators.showSinarmasAlert({
        ...sinarmasModalOptions,
        image: 'information_alert',
      }),
    );
  };
}

export function dontRecogniseNumber() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      text: language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TEXT,
      button1: language.SERVICE__OK_BUTTON,
      onButton1Press: hideAlert,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function resetAndNavigate(route, params) {
  return dispatch => {
    dispatch(actionCreators.hideDrawer());
    dispatch(NavigationActions.navigate({routeName: route, params}));
  };
}

export function setupIsFaceRegistered() {
  return dispatch =>
    getIsFaceRegistered().then(values => {
      const isFaceRegistered = result(values, 'isFaceRegistered', false);
      dispatch(actionCreators.isFaceRegisteredUpdate({isFaceRegistered}));
    });
}

export function getMerchant() {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    Geolocation.getCurrentPosition(
      position => {
        const payload = middlewareUtils.prepareGetMerchantList(position.coords);
        return api
          .merchantQR(payload, dispatch)
          .then(res => {
            const merchantList = res.data;
            dispatch(actionCreators.setQRMerchant(merchantList));
            dispatch(actionCreators.hideSpinner());
          })
          .catch(errResponse => {
            dispatch(actionCreators.hideSpinner());
            Toast.show(
              getErrorMessage(errResponse, language.QR_PROMO__ERROR_MERCHANT),
              Toast.LONG,
            );
          });
      },
      () => {
        if (Platform.OS === 'android') {
          dispatch(actionCreators.hideSpinner());
        } else {
          Permissions.check('ios.permission.LOCATION_ALWAYS').then(response => {
            if (response === 'granted') {
              dispatch(actionCreators.showSpinner());
              Geolocation.getCurrentPosition(
                position => {
                  const payload = middlewareUtils.prepareGetMerchantList(
                    position.coords,
                  );
                  return api
                    .merchantQR(payload, dispatch)
                    .then(res => {
                      const merchantList = res.data;
                      dispatch(actionCreators.setQRMerchant(merchantList));
                      dispatch(actionCreators.hideSpinner());
                    })
                    .catch(errResponse => {
                      dispatch(actionCreators.hideSpinner());
                      Toast.show(
                        getErrorMessage(
                          errResponse,
                          language.QR_PROMO__ERROR_MERCHANT,
                        ),
                        Toast.LONG,
                      );
                    });
                },
                () => {
                  dispatch(actionCreators.hideSpinner());
                },
                {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
              );
            } else {
              Permissions.request('ios.permission.LOCATION_ALWAYS').then(
                response => {
                  if (response === 'granted') {
                    dispatch(actionCreators.showSpinner());
                    Geolocation.getCurrentPosition(
                      position => {
                        const payload = middlewareUtils.prepareGetMerchantList(
                          position.coords,
                        );
                        return api
                          .merchantQR(payload, dispatch)
                          .then(res => {
                            const merchantList = res.data;
                            dispatch(
                              actionCreators.setQRMerchant(merchantList),
                            );
                            dispatch(actionCreators.hideSpinner());
                          })
                          .catch(errResponse => {
                            dispatch(actionCreators.hideSpinner());
                            Toast.show(
                              getErrorMessage(
                                errResponse,
                                language.QR_PROMO__ERROR_MERCHANT,
                              ),
                              Toast.LONG,
                            );
                          });
                      },
                      () => {
                        dispatch(actionCreators.hideSpinner());
                      },
                      {
                        enableHighAccuracy: false,
                        timeout: 20000,
                        maximumAge: 1000,
                      },
                    );
                  } else {
                    Toast.show(language.PERMISSION__LOCATION, Toast.LONG);
                    dispatch(actionCreators.hideSpinner());
                  }
                },
              );
            }
          });
        }
      },
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );
  };
}

export function checkCameraPermissionAndNavigate(
  cameraRoute,
  params,
  resetToLanding = false,
  skipFunction = noop,
) {
  return (dispatch, getState) => {
    getSkipFaceRegis().then(values => {
      const state = getState();
      const action = result(params, 'action', 'Login');
      const faceRecogEnabled =
        result(state, 'config.isFaceRecognitionEnabled', 'no') === 'yes';
      const skip = result(values, 'skipFaceRegis', false);
      if (
        (skip && action !== 'RegisterDrawer' && action !== 'Login') ||
        !faceRecogEnabled
      ) {
        skipFunction();
      } else if (action !== 'RegisterDrawer' && action !== 'Login') {
        // if not register from drawer or login, then skip camera
        skipFunction();
      } else {
        if (Platform.OS === 'android') {
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then(
            res => {
              if (!res) {
                PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.CAMERA,
                ).then(result => {
                  if (result === 'granted') {
                    if (resetToLanding) {
                      dispatch(resetToLandingAndNavigate(cameraRoute, params));
                    } else {
                      dispatch(
                        NavigationActions.navigate({
                          routeName: cameraRoute,
                          params,
                        }),
                      );
                    }
                  } else {
                    skipFunction();
                  }
                });
              } else {
                if (resetToLanding) {
                  dispatch(resetToLandingAndNavigate(cameraRoute, params));
                } else {
                  dispatch(
                    NavigationActions.navigate({
                      routeName: cameraRoute,
                      params,
                    }),
                  );
                }
              }
            },
          );
        } else {
          Permissions.check('ios.permission.CAMERA').then(response => {
            if (response === 'granted') {
              if (resetToLanding) {
                dispatch(resetToLandingAndNavigate(cameraRoute, params));
              } else {
                dispatch(
                  NavigationActions.navigate({routeName: cameraRoute, params}),
                );
              }
            } else {
              Permissions.request('ios.permission.CAMERA').then(response => {
                if (response === 'granted') {
                  if (resetToLanding) {
                    dispatch(resetToLandingAndNavigate(cameraRoute, params));
                  } else {
                    dispatch(
                      NavigationActions.navigate({
                        routeName: cameraRoute,
                        params,
                      }),
                    );
                  }
                } else {
                  if (skipFunction === noop) {
                    Toast.show(
                      'Go to settings, allow Simobi+ to access device camera',
                      Toast.LONG,
                    );
                  } else {
                    skipFunction();
                  }
                }
              });
            }
          });
        }
      }
    });
  };
}

export function setSkipFaceRegistered() {
  return () => {
    const payload = {skipFaceRegis: true};
    set(storageKeys.SKIP_FACE_REGIS, payload).catch(err => {
      Toast.show(
        getErrorMessage(
          err,
          language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
        ),
        Toast.LONG,
      );
    });
    tracker.trackEvent(
      'FACE_RECOGNITION_REGISTRATION',
      'FACE_RECOGNITION_REGISTRATION_SKIP',
      null,
      {},
    );
  };
}

export function cameraPermissionSelfie(cameraRoute, params) {
  return dispatch => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then(
        res => {
          if (!res) {
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
            ).then(result => {
              if (result === 'granted') {
                dispatch(
                  NavigationActions.navigate({routeName: cameraRoute, params}),
                );
              } else {
                Toast.show(
                  'Go to settings, allow Simobi+ to access device camera',
                  Toast.LONG,
                );
              }
            });
          } else {
            dispatch(
              NavigationActions.navigate({routeName: cameraRoute, params}),
            );
          }
        },
      );
    } else {
      Permissions.check('ios.permission.CAMERA').then(response => {
        if (response === 'granted') {
          dispatch(
            NavigationActions.navigate({routeName: cameraRoute, params}),
          );
        } else {
          Permissions.request('ios.permission.CAMERA').then(response => {
            if (response === 'granted') {
              dispatch(
                NavigationActions.navigate({routeName: cameraRoute, params}),
              );
            } else {
              dispatch(NavigationActions.navigate({routeName: 'landing'}));
              Toast.show(
                'Go to settings, allow Simobi+ to access device camera',
                Toast.LONG,
              );
            }
          });
        }
      });
    }
  };
}

export function confirmDeleteRecurringTransfer(data) {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToDelete = () => {
      dispatch(triggerDeleteRecurring(goTothunkRecurringDelete));
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goTothunkRecurringDelete = () => {
      dispatch(deleteRecurringTransfer(data));
    };
    const sinarmasModalOptions = {
      heading1: language.RECURRING__DELETE_TITLE,
      text: language.RECURRING__DELETE_SUBTITLE,
      button1: language.RECURRING__MODAL_CANCEL,
      onButton2Press: goToDelete,
      button2: language.RECURRING__MODAL_DELETE,
      onButton1Press: hideAlert,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function triggerDeleteRecurring(deleteRecurringTransfer) {
  return dispatch => {
    const params = {
      onSubmit: deleteRecurringTransfer,
      isOtp: false,
      isEasypin: true,
    };
    dispatch(
      triggerAuthNavigate('deleteRecurring', null, true, 'Auth', params),
    ); // null for replace billamount, absolute must easypin
  };
}

export function confirmBlockCreditCard(selectedAccount) {
  return dispatch => {
    const status = result(selectedAccount, 'cardStatus', '');
    const cardbase = result(selectedAccount, 'cardBase', '');
    const inactive = status === '0' && cardbase === 'virtualCreditCard';
    const statact = status === '1' || inactive ? 'B' : 'U';
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToBlock = () => {
      dispatch(actionCreators.showSpinner());
      dispatch(NavigationActions.back());
      setTimeout(() => {
        dispatch(actionCreators.hideSpinner());
        if (statact === 'U') {
          dispatch(triggerBlockRecurring(goTothunkRecurringBlock));
        } else {
          dispatch(blockCC(selectedAccount));
        }
        dispatch(actionCreators.hideSinarmasAlert());
      }, 1500);
    };
    const goTothunkRecurringBlock = () => {
      dispatch(blockCC(selectedAccount));
    };
    const sinarmasModalOptions = {
      heading1: language.DASHBOARD__BLOCK_CREDIT_CARD_CONFIRM_TITLE,
      text: language.DASHBOARD__BLOCK_CREDIT_CARD_CONFIRM_MESSAGE,
      button1: language.GENERIC__CANCEL,
      onButton2Press: goToBlock,
      button2: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function triggerBlockRecurring(blockCC) {
  return dispatch => {
    const params = {onSubmit: blockCC, isOtp: false, isEasypin: true};
    dispatch(
      triggerAuthNavigate(
        'blockCCRecurring',
        null,
        true,
        'AuthDashboard',
        params,
      ),
    ); // null for replace billamount, absolute must easypin
  };
}

export function confirmActivateCreditCard(selectedAccount) {
  return dispatch => {
    const status = result(selectedAccount, 'cardStatus', '');
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToBlock = () => {
      dispatch(triggerBlockRecurring(goTothunkRecurringActivate));
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goTothunkRecurringActivate = () => {
      if (status === '0') {
        dispatch(confirmActivate(selectedAccount));
      } else {
        dispatch(blockCC(selectedAccount));
      }
    };
    const sinarmasModalOptions = {
      heading1:
        status === '0' || status === '5'
          ? language.DASHBOARD__CREDIT_ACTIVATE_CONFIRM_TITLE
          : language.DASHBOARD__CREDIT_UNBLOCK_CONFIRM_TITLE,
      text:
        status === '0'
          ? language.DASHBOARD__CREDIT_ACTIVATE_CONFIRM_TEXT
          : status === '5'
          ? language.DORMANT_CC_TEXT
          : language.DASHBOARD__CREDIT_UNBLOCK_CONFIRM_MESSAGE,
      button1: language.GENERIC__CANCEL,
      onButton2Press: status === '5' ? hideAlert : goToBlock,
      button2: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function checkResetByAccountType(values) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const mobileNumber = formatMobileNumberEmoneyRegistration(
      result(values, 'phone', ''),
    );
    const dataRes = result(state, 'accTypeList', {});
    const accTypeList = result(dataRes, 'accTypeList', []);
    const responseCode = result(dataRes, 'responseCode', '');
    let tempSav = false;
    let tempEmoneyKYC = false;
    let tempEmoneyNKyc = false;
    if (responseCode === '00') {
      map(accTypeList, function (o) {
        if (o === '01') {
          // saving
          tempSav = true;
        } else if (o === '03') {
          // emoneyKYC
          tempEmoneyKYC = true;
        } else if (o === '02') {
          // emoneyNonkyc
          tempEmoneyNKyc = true;
        }
      });
    } else if (responseCode === '01') {
      Toast.show(language.EMONEY__RESET_PASSWORD, Toast.SHORT);
    }
    const captcha = generateCaptchaTransformer();
    dispatch(actionCreators.setCaptcha(captcha));
    if (tempSav) {
      dispatch(resetPasswordByAtm());
      setTimeout(() => {
        dispatch(actionCreators.hideSpinner());
      }, 3000);
    } else if (tempEmoneyKYC) {
      // phone form
      dispatch(
        NavigationActions.navigate({
          routeName: 'RegisterByPhoneLastForm',
          params: {mobileNumber},
        }),
      );
      setTimeout(() => {
        dispatch(actionCreators.hideSpinner());
      }, 3000);
    } else if (tempEmoneyNKyc) {
      dispatch(requestEmailorSMS(mobileNumber, 'SMS'));
      setTimeout(() => {
        dispatch(actionCreators.hideSpinner());
      }, 3000);
    }
  };
}

export function checkingResetForEmoney(values, mobileNumber) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    const idKtp = result(values, 'idCard', '');
    const birthdate = result(values, 'birthdate', {});
    const dob = moment(birthdate).format('DDMMYYYY');
    const payload = {idKtp, dob, mobileNumber};
    return api
      .checkingResetPasskyc(payload, dispatch)
      .then(res => {
        const responseCode = result(res, 'data.responseCode', '');
        if (responseCode === '00') {
          dispatch(actionCreators.hideSpinner());
          dispatch(resetPaswordForEmoney(mobileNumber));
        } else {
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.DOB__IDNUMBER_ERROR_MESSAGE, Toast.LONG);
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__RESET_PASSWORD),
          Toast.LONG,
        );
      });
  };
}

export function resetPaswordForEmoney(mobileNumber) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    const payload = {mobileNumber};
    return api
      .resetPasswordEMoney(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const email = result(res, 'data.email', '');
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'Login'}),
              NavigationActions.navigate({
                routeName: 'ConfirmEmailScreen',
                params: {email},
              }),
            ],
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__RESET_PASSWORD),
          Toast.LONG,
        );
      });
  };
}

export function validateKtpDobResetPassword(values, mobileNumber) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    const idKtp = result(values, 'idCard', '');
    const birthdate = result(values, 'birthdate', {});
    const dob = moment(birthdate).format('DDMMYYYY');
    const payload = {idKtp, dob, mobileNumber};
    return api
      .checkingResetPasskyc(payload, dispatch)
      .then(res => {
        const responseCode = result(res, 'data.responseCode', '');
        if (responseCode === '00') {
          dispatch(actionCreators.hideSpinner());
          dispatch(requestEmailorSMS(mobileNumber, 'EMAIL'));
        } else {
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.DOB__IDNUMBER_ERROR_MESSAGE, Toast.LONG);
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__RESET_PASSWORD),
          Toast.LONG,
        );
      });
  };
}

export function requestEmailorSMS(mobileNumber, type) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    const version = VersionNumber.appVersion;
    const versionScope = version.replace(/[.]+/g, ',');
    const payload = {mobileNumber, versionScope};
    return api
      .resetPasswordEMoney(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const responseCode = result(res, 'data.responseCode', '');
        const email = result(res, 'data.email', '');
        const typeActivation = transformToken(
          result(res, 'data.typeActivation', ''),
        );
        const tokenEmail = transformToken(result(res, 'data.emailToken', ''));
        const ipassport = result(res, 'data.ipassport', '');
        if (responseCode === '00') {
          if (type === 'EMAIL') {
            // for emoney kyc only
            dispatch(
              requestEmailToken(
                mobileNumber,
                email,
                typeActivation,
                tokenEmail,
                ipassport,
              ),
            );
          } else {
            // for emoney non kyc
            dispatch(
              sendOtpResetPassword(tokenEmail, typeActivation, isLockedDevice),
            );
          }
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__RESET_PASSWORD),
          Toast.LONG,
        );
      });
  };
}

export function requestEmailToken(
  mobileNumber,
  email,
  typeActivation,
  tokenEmail,
  ipassport,
) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    const typeEmailToken = '003'; // have no ipassport
    const payload = {mobileNumber, email, typeEmailToken, ipassport};
    return api
      .sendEmailToken(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const responseCode = result(res, 'data.responseCode', '');
        if (responseCode === '00') {
          dispatch(
            NavigationActions.navigate({
              routeName: 'ResetPasswordEmailToken',
              params: {
                typeActivation: typeActivation,
                tokenEmail: tokenEmail,
                email: email,
                ipassport: ipassport,
              },
            }),
          );
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__RESET_PASSWORD),
          Toast.LONG,
        );
      });
  };
}

export function resendEmailToken(data) {
  return (dispatch, getState) => {
    const state = getState();
    const noCard = result(data, 'noCard', false);
    let mobileNumber = '';
    if (noCard) {
      mobileNumber = formatMobileNumberEmoneyRegistration(
        result(state, 'form.resetPassForm.values.phoneNumber', ''),
      );
    } else {
      mobileNumber = formatMobileNumberEmoneyRegistration(
        result(state, 'form.registerByPhoneForm.values.phone', ''),
      );
    }

    const typeEmailToken = '003'; // have no ipassport
    const ipassport = result(data, 'ipassport', '');
    const payload = {mobileNumber, typeEmailToken, ipassport};
    return api.sendEmailToken(payload, dispatch).catch(error => {
      Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function validateEmailToken(typeActivation, tokenEmail) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const isLockedDevice = Boolean(
      state.appInitKeys &&
        state.appInitKeys.username &&
        state.appInitKeys.tokenClient &&
        state.appInitKeys.tokenServer,
    );
    const otpCode = result(state, 'form.OTPEmail.values.emailToken', '');
    const mobileNumber = formatMobileNumberEmoneyRegistration(
      result(state, 'form.registerByPhoneForm.values.phone', ''),
    );
    const typeEmailToken = '003'; // have no ipassport
    const payload = {otpCode, mobileNumber, typeEmailToken};
    return api
      .validateEmailToken(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const responseCode = result(res, 'data.responseCode', '');
        if (responseCode === '00') {
          dispatch(
            sendOtpResetPassword(tokenEmail, typeActivation, isLockedDevice),
          );
        }
      })
      .catch(error => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(error, language.APP_ERROR__TITLE),
          Toast.LONG,
        );
      });
  };
}

export function resetPasswordByEmail() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToDelete = () => {
      dispatch(
        StackActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({routeName: 'Login'}),
            NavigationActions.navigate({routeName: 'IdentityThirdForm'}),
          ],
        }),
      );
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.RESET_PASSWORD__EMONEY_MODAL_PHONE_NOT_REGISTER,
      text: language.RESET_PASSWORD__EMONEY_MODAL_PHONE_NOT_REGISTER_SUBTITLE,
      button1: language.RESET_PASSWORD__NO_BUTTON,
      onButton2Press: goToDelete,
      button2: language.RESET_PASSWORD__EMONEY_MODAL_CREATE_ACCOUNT,
      onButton1Press: hideAlert,
      onClose: hideAlert,
      button1Color: 'black',
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function resetPasswordByAtm() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToAtmRegister = () => {
      dispatch(
        StackActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({routeName: 'Login'}),
            NavigationActions.navigate({routeName: 'RegisterAtm'}),
          ],
        }),
      );
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.RESET_PASSWORD__ATM_MODAL_TITLE,
      button1: language.INVESTMENT__ALERT_OK_BUTTON,
      onButton1Press: goToAtmRegister,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function confirmDeleteTerminal(data) {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToDelete = () => {
      dispatch(triggerDeleteTerminal(goTothunkTerminalDelete));
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goTothunkTerminalDelete = () => {
      dispatch(deleteTerminal(data));
    };
    const sinarmasModalOptions = {
      heading1: language.QR_GPN__DELETE_TITLE,
      text: language.QR_GPN__DELETE_SUBTITLE,
      button1: language.QR_GPN__MODAL_CANCEL,
      onButton2Press: goToDelete,
      button2: language.QR_GPN__MODAL_DELETE,
      onButton1Press: hideAlert,
      onClose: hideAlert,
      image: 'QRGPN',
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function triggerDeleteTerminal(deleteTerminalTransfer) {
  return dispatch => {
    const params = {
      onSubmit: deleteTerminalTransfer,
      isOtp: false,
      isEasypin: true,
    };
    dispatch(
      triggerAuthNavigate(
        'deleteRecurring',
        null,
        true,
        'AuthDashboard',
        params,
      ),
    ); // null for replace billamount, absolute must easypin
  };
}

export function confirmResetTerminal(data) {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToReset = () => {
      dispatch(triggerResetTerminal(goTothunkTerminalReset));
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goTothunkTerminalReset = () => {
      dispatch(resetTerminal(data));
    };
    const sinarmasModalOptions = {
      heading1: language.QR_GPN__RESET_TITLE,
      text: language.QR_GPN__RESET_SUBTITLE,
      button1: language.QR_GPN__MODAL_CANCEL,
      onButton1Press: hideAlert,
      button2: language.QR_GPN__MODAL_RESET,
      onButton2Press: goToReset,
      onClose: hideAlert,
      image: 'QRGPN',
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function triggerResetTerminal(resetTerminalTransfer) {
  return dispatch => {
    const params = {
      onSubmit: resetTerminalTransfer,
      isOtp: false,
      isEasypin: true,
    };
    dispatch(
      triggerAuthNavigate(
        'deleteRecurring',
        null,
        true,
        'AuthDashboard',
        params,
      ),
    ); // null for replace billamount, absolute must easypin
  };
}

export function getShoppingList(category) {
  return dispatch => {
    const data = {
      mode: 'DATA_ALL',
      filter: {
        categoryCode: category,
      },
    };
    dispatch(
      actionCreators.saveEgiftList({loading: true, reload: true, category}),
    );
    return api
      .getEgiftCache(data, dispatch)
      .then(res => {
        dispatch(actionCreators.saveEgiftList({...res.data, category}));
      })
      .catch(() => {
        dispatch(
          actionCreators.saveEgiftList({
            loading: false,
            reload: true,
            category,
          }),
        );
      });
  };
}

export function getEgiftPage(pageList, category) {
  return (dispatch, getState) => {
    const state = getState();
    const data = {
      mode: 'DATA_ALL',
      pagination: pageList,
      filter: {
        categoryCode: category,
      },
    };
    const egiftListUpdate = result(
      state,
      'egiftList.egiftListByConstructList',
      {},
    );
    return api
      .getEgiftListPage(data, dispatch)
      .then(res => {
        const egiftListPage = result(res, 'data', {});
        const newData = result(egiftListPage, 'egiftListByConstructList', {});
        const newegiftList = egiftListUpdate.push.apply(
          egiftListUpdate,
          newData,
        );
        dispatch(actionCreators.saveEgiftPage(newegiftList));
      })
      .catch(() => {
        dispatch(
          actionCreators.saveEgiftPage({
            loading: false,
            reload: true,
            egiftListByConstructList: egiftListUpdate,
          }),
        );
      });
  };
}

export function goToDetail(items) {
  return dispatch => {
    const data = {
      egiftId: items.egiftId,
    };
    dispatch(actionCreators.showSpinner());
    return api
      .getEgiftDetail(data, dispatch)
      .then(res => {
        if (result(res, 'data.responseCode') === '00') {
          dispatch(actionCreators.hideSpinner());
          const detailProduct = result(res, 'data.egiftViewDetailMap');
          dispatch(
            NavigationActions.navigate({
              routeName: 'ProductDetail',
              params: {items, detailProduct},
            }),
          );
        }
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__POPULATE_REDEEM),
          Toast.LONG,
        );
      });
  };
}

export function inquirySimasPoin(isSpiner) {
  return (dispatch, getState) => {
    const state = getState();
    const payload = {pushToken: '123456', clientCheck: 'WEB_BROWSER'};
    if (
      result(state, 'appInitKeys.username', '') === null ||
      result(state, 'appInitKeys.tokenClient', '') === null ||
      result(state, 'appInitKeys.tokenServer', '') === null
    ) {
      dispatch(actionCreators.saveSimasPoin({isLockdown: false}));
    } else {
      dispatch(
        actionCreators.saveSimasPoin({
          status: 'loading',
          loading: true,
          reload: true,
        }),
      );
      if (result(isSpiner, 'isSpiner') === true) {
        dispatch(actionCreators.showSpinner());
      }
      return api
        .inquirySimasPoin(payload, dispatch)
        .then(res => {
          dispatch(actionCreators.hideSpinner());
          dispatch(
            actionCreators.saveSimasPoin({...res.data, status: 'success'}),
          );
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          const errorCode = result(err, 'data.simasPoin.code', '');
          if (errorCode === '11' || errorCode === '10') {
            dispatch(actionCreators.saveSimasPoin({status: 'success'}));
          } else {
            dispatch(
              actionCreators.saveSimasPoin({
                status: 'error',
                loading: false,
                reload: true,
              }),
            );
          }
        });
    }
  };
}

export function goToCart() {
  return dispatch => {
    dispatch(NavigationActions.navigate({routeName: 'EgiftCart'}));
  };
}

export function goToCartAlfacart() {
  return (dispatch, getState) => {
    const state = getState();
    const cartCMI = result(state, 'cartCMI', {});
    const productId = map(cartCMI, 'items.productId', '');
    const data = {
      lang: 'en',
      item: productId,
    };
    const payload = {
      requestData: data,
      targetUrl: 'productListForCartWhislist',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api.productListForCartWhislist(payload, dispatch).then(res => {
      const listAllProductData = result(res, 'data.result.0.success', []);
      const currentMerchant = result(state, 'currentMerchant', []);
      const merchant = result(currentMerchant, 'name', '');
      if (merchant === 'ALFACART') {
        let items = result(state, 'cartAlfacart', []);
        dispatch(actionCreators.confrimCheckoutAlfa(items));
        dispatch(NavigationActions.navigate({routeName: 'AlfacartCart'}));
      } else {
        let finalData = [];
        forEach(listAllProductData, function (value) {
          let quantity;
          forEach(cartCMI, function (item) {
            quantity = result(item, 'quantity', 0);
          });
          finalData = [...finalData, {items: {...value}, quantity}];
        });
        dispatch(actionCreators.updateConfirmCheckoutAlfa(finalData));
        dispatch(actionCreators.updateCartCMI(finalData));
        set(storageKeys.CART_CMI, finalData);
        dispatch(NavigationActions.navigate({routeName: 'AlfacartCart'}));
      }
    });
  };
}

export function goToWishlistAlfacart() {
  return (dispatch, getState) => {
    const state = getState();
    const wishlistCMI = result(state, 'wishlistCMI', {});
    const productId = map(wishlistCMI, 'productId', '');
    const data = {
      lang: 'en',
      item: productId,
    };
    const payload = {
      requestData: data,
      targetUrl: 'productListForCartWhislist',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api.productListForCartWhislist(payload, dispatch).then(res => {
      const listAllProductData = result(res, 'data.result.0.success', []);
      const currentMerchant = result(state, 'currentMerchant', []);
      const merchant = result(currentMerchant, 'name', '');
      if (merchant === 'ALFACART') {
        let items = result(state, 'wishlistAlfacart', []);
        dispatch(actionCreators.confrimCheckoutAlfa(items));
        dispatch(NavigationActions.navigate({routeName: 'WishlistAlfacart'}));
      } else {
        let finalData = [];
        forEach(listAllProductData, function (value) {
          finalData = [...finalData, {...value}];
        });
        dispatch(actionCreators.updateWishlistCMI(finalData));
        set(storageKeys.WISHLIST_CMI, finalData);
        dispatch(NavigationActions.navigate({routeName: 'WishlistAlfacart'}));
      }
    });
  };
}

export function goToDiscountQR() {
  return dispatch => {
    set(storageKeys.QR_DISCOUNT_EULA, true);
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Landing'})],
      }),
    );
    dispatch(
      cameraPermissionSelfie('QRScannerDiscount', {isLockedDevice: true}),
    );
  };
}

export function goToDiscountQREULA(show) {
  return dispatch =>
    getQRDiscountEULA().then(values => {
      if (show) {
        dispatch(
          NavigationActions.navigate({
            routeName: 'QRDiscountEULA',
            params: {showButton: values},
          }),
        );
      } else {
        if (values) {
          dispatch(
            cameraPermissionSelfie('QRScannerDiscount', {isLockedDevice: true}),
          );
        } else {
          dispatch(NavigationActions.navigate({routeName: 'QRDiscountEULA'}));
        }
      }
    });
}

export function goToDiscountInvoice(res) {
  return dispatch =>
    getMobileNumber().then(values => {
      dispatch(actionCreators.showSpinner());
      const payload = {
        Codestring: 'BSM1503201803',
        NoHP: values,
        MerchantId: result(res, 'data', ''),
      };
      return api
        .qrVoucherDiscount(payload, dispatch)
        .then(res => {
          dispatch(actionCreators.hideSpinner());
          const QRVoucherData = result(res, 'data', {});
          const errMsg = result(res, 'data.Errmsg', {}).length;
          if (errMsg < 1) {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(NavigationActions.back());
            dispatch(
              NavigationActions.navigate({
                routeName: 'QRInvoiceData',
                params: {QRVoucherData},
              }),
            );
          } else {
            Toast.show(result(res, 'data.Errmsg', {}), Toast.LONG);
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
          }
        })
        .catch(err => {
          const errMessage = result(err, 'data.Errmsg', '');
          dispatch(actionCreators.hideSpinner());
          Toast.show(errMessage, Toast.LONG);
        });
    });
}

export function goToDiscountMerchant() {
  return dispatch => {
    dispatch(actionCreators.clearMerchantListByCity());
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(response => {
        if (response === 'granted') {
          LocationServices.checkLocationServicesIsEnabled({
            message: language.QR_PROMO__ACCESS_LOCATION,
            ok: language.GENERIC__YES,
            cancel: language.GENERIC__NO,
            enableHighAccuracy: false,
            showDialog: true,
            openLocationServices: true,
          })
            .then(() => {
              dispatch(
                NavigationActions.navigate({routeName: 'QRMerchantDeals'}),
              );
            })
            .catch(() => {
              Toast.show(language.PERMISSION__LOCATION, Toast.LONG);
            });
        } else {
          Toast.show(language.PERMISSION__LOCATION, Toast.LONG);
        }
      });
    } else {
      Permissions.check('ios.permission.LOCATION_ALWAYS').then(response => {
        if (response === 'granted') {
          dispatch(NavigationActions.navigate({routeName: 'QRMerchantDeals'}));
        } else {
          Permissions.request('ios.permission.LOCATION_ALWAYS').then(
            response => {
              if (response === 'granted') {
                dispatch(
                  NavigationActions.navigate({routeName: 'QRMerchantDeals'}),
                );
              } else {
                Toast.show(language.PERMISSION__LOCATION, Toast.LONG);
              }
            },
          );
        }
      });
    }
  };
}

export function goToDiscountMerchantDetail(merchantData) {
  return dispatch => {
    const payload = {merchantid: merchantData.merchantid};
    dispatch(actionCreators.showSpinner());
    return api
      .qrDiscountMerchantDetail(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const discountMerchantDetail = result(res, 'data', {});
        dispatch(
          NavigationActions.navigate({
            routeName: 'QRDealDetail',
            params: {discountMerchantDetail},
          }),
        );
      })
      .catch(err => {
        const errMessage = result(err, 'data.Errmsg', '');
        dispatch(actionCreators.hideSpinner());
        Toast.show(errMessage, Toast.LONG);
      });
  };
}

export function getMerchantDiscount(merchantData) {
  return dispatch => {
    Geolocation.getCurrentPosition(
      position => {
        const page = result(merchantData, 'page', 1);
        const title = result(merchantData, 'title', '');
        const payload = middlewareUtils.getQrMerchantList(
          position,
          page,
          '',
          'NEARBY',
          title,
        );
        dispatch(actionCreators.saveLoadingStateNearby(true));
        dispatch(actionCreators.showSpinner());
        return api
          .qrDiscountMerchantList(payload, dispatch)
          .then(res => {
            dispatch(actionCreators.saveLoadingStateNearby(false));
            const discountMerchant = result(res, 'data', {});
            if (title !== '' && page === 1) {
              dispatch(actionCreators.saveQRDiscount(discountMerchant));
            } else {
              dispatch(actionCreators.updateQRDiscount(discountMerchant));
            }
            dispatch(actionCreators.hideSpinner());
          })
          .catch(err => {
            const errMessage = result(err, 'data.Errmsg', '');
            Toast.show(errMessage, Toast.LONG);
          });
      },
      () => {
        dispatch(actionCreators.hideSpinner());
      },
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );
  };
}

export function getMerchantDiscountByTitle(merchantData) {
  return dispatch => {
    Geolocation.getCurrentPosition(
      position => {
        const page = result(merchantData, 'page', 1);
        const title = result(merchantData, 'title', '');
        const payload = middlewareUtils.getQrMerchantList(
          position,
          page,
          '',
          'NEARBY',
          title,
        );
        dispatch(actionCreators.saveLoadingStateNearby(true));
        dispatch(actionCreators.showSpinner());
        return api
          .qrDiscountMerchantList(payload, dispatch)
          .then(res => {
            dispatch(actionCreators.saveLoadingStateNearby(false));
            const discountMerchant = result(res, 'data', {});
            dispatch(actionCreators.saveQRDiscount(discountMerchant));
            dispatch(actionCreators.hideSpinner());
          })
          .catch(err => {
            const errMessage = result(err, 'data.Errmsg', '');
            Toast.show(errMessage, Toast.LONG);
          });
      },
      () => {
        dispatch(actionCreators.hideSpinner());
      },
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );
  };
}

export function getMerchantListByCity(merchantData) {
  return dispatch => {
    Geolocation.getCurrentPosition(
      position => {
        const page = result(merchantData, 'page', 1);
        const cityCode =
          result(merchantData, 'cityCode', '') === 'all'
            ? ''
            : result(merchantData, 'cityCode', '');
        const title = result(merchantData, 'title', '');
        const payload = middlewareUtils.getQrMerchantList(
          position,
          page,
          cityCode,
          'TITLE',
          title,
        );
        dispatch(actionCreators.saveLoadingStateAll(true));
        dispatch(actionCreators.showSpinner());
        return api
          .qrDiscountMerchantList(payload, dispatch)
          .then(res => {
            dispatch(actionCreators.saveLoadingStateAll(false));
            const discountMerchant = result(res, 'data', {});
            if (
              (cityCode !== '' && page === 1) ||
              result(merchantData, 'cityCode', '') === 'all'
            ) {
              dispatch(actionCreators.saveMerchantListByCity(discountMerchant));
            } else {
              dispatch(
                actionCreators.updateMerchantListByCity(discountMerchant),
              );
            }
            dispatch(actionCreators.hideSpinner());
          })
          .catch(err => {
            const errMessage = result(err, 'data.Errmsg', '');
            Toast.show(errMessage, Toast.LONG);
          });
      },
      () => {
        dispatch(actionCreators.hideSpinner());
      },
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );
  };
}

export function searchMerchantDiscountByCity(merchantData) {
  return dispatch => {
    Geolocation.getCurrentPosition(
      position => {
        const page = result(merchantData, 'page', 1);
        const cityCode =
          result(merchantData, 'cityCode', '') === 'all'
            ? ''
            : result(merchantData, 'cityCode', '');
        const title = result(merchantData, 'title', '');
        const payload = middlewareUtils.getQrMerchantList(
          position,
          page,
          cityCode,
          'TITLE',
          title,
        );
        dispatch(actionCreators.saveLoadingStateAll(true));
        dispatch(actionCreators.showSpinner());
        return api
          .qrDiscountMerchantList(payload, dispatch)
          .then(res => {
            dispatch(actionCreators.saveLoadingStateAll(false));
            const discountMerchant = result(res, 'data', {});
            dispatch(actionCreators.saveMerchantListByCity(discountMerchant));
            dispatch(actionCreators.hideSpinner());
          })
          .catch(err => {
            const errMessage = result(err, 'data.Errmsg', '');
            Toast.show(errMessage, Toast.LONG);
          });
      },
      () => {
        dispatch(actionCreators.hideSpinner());
      },
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );
  };
}

export function goToMyVoucher() {
  return dispatch => {
    dispatch(NavigationActions.navigate({routeName: 'Shops'}));
  };
}

export function getSimasPoinHistory() {
  return dispatch => {
    const payload = {pushToken: '123456', clientCheck: 'WEB_BROWSER'};
    dispatch(
      actionCreators.saveSimasPoinHistory({loading: true, reload: true}),
    );
    return api
      .getSimasPoinHistory(payload, dispatch)
      .then(res => {
        const responseCode = result(res, 'data.responseCode', '');
        if (responseCode === '00') {
          dispatch(
            actionCreators.saveSimasPoinHistory({
              ...res.data.accountStatementSimasPoin,
              status: 'success',
            }),
          );
        } else {
          dispatch(actionCreators.hideSpinner());
          dispatch(
            actionCreators.saveSimasPoinHistory({loading: false, reload: true}),
          );
        }
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(
          actionCreators.saveSimasPoinHistory({loading: false, reload: true}),
        );
      });
  };
}

export function getSimasPoinLogin(formValues) {
  return dispatch => {
    dispatch(NavigationActions.back());
    dispatch(
      NavigationActions.navigate({
        routeName: 'SimasPoinLogin',
        params: {formValues},
      }),
    );
  };
}

export function getSimasPoinLoginTrf(formValues) {
  return dispatch => {
    dispatch(NavigationActions.back());
    dispatch(
      NavigationActions.navigate({
        routeName: 'AuthTransfer',
        params: {formValues},
      }),
    );
  };
}

export function getDataOrder() {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.getMyOrderDataList({loading: true, reload: true}));
    const cifCode = String(result(state, 'user.profile.customer.cifCode', ' '));
    api
      .getDataMyOrder({}, dispatch)
      .then(res => {
        const dataOrder = result(res, 'data.myOrderVoucher', []);
        if (result(res, 'data.responseCode') === '00') {
          api
            .getGiveAway({}, dispatch)
            .then(response => {
              const giveAwayRaw = result(
                response,
                'data.simasPoin.data.dataUndian',
                [],
              );
              const giveAwayReward = filter(giveAwayRaw, {cifCode: cifCode});
              let giveAwayList = [];
              forEach(giveAwayReward, item => {
                const listPrize = result(item, 'listPrize', []);
                forEach(listPrize, prizeData => {
                  giveAwayList.push(prizeData);
                });
              });
              const finalGiveAwayList =
                middlewareUtils.selectedVoucherGiveAway(giveAwayList);
              api
                .getRewardHistory({}, dispatch)
                .then(resReward => {
                  const luckyDipRewardRaw = result(
                    resReward,
                    'data.simasPoin.data.dataUndian',
                    [],
                  );
                  const luckyDipReward = filter(luckyDipRewardRaw, item => {
                    const voucherCif = result(item, 'cifCode', '');
                    const voucherType = result(item, 'rewards.0.type', '');
                    return voucherCif === cifCode && voucherType === '2';
                  });
                  const dataVoucher =
                    middlewareUtils.selectedVoucher(luckyDipReward);
                  dispatch(
                    actionCreators.getMyOrderDataList([
                      ...finalGiveAwayList,
                      ...dataOrder,
                      ...dataVoucher,
                    ]),
                  );
                  dispatch(actionCreators.hideSpinner());
                })
                .catch(() => {
                  dispatch(
                    actionCreators.getMyOrderDataList([
                      ...finalGiveAwayList,
                      ...dataOrder,
                    ]),
                  );
                  dispatch(actionCreators.hideSpinner());
                });
            })
            .catch(() => {
              api
                .getRewardHistory({}, dispatch)
                .then(resReward => {
                  const luckyDipRewardRaw = result(
                    resReward,
                    'data.simasPoin.data.dataUndian',
                    [],
                  );
                  const luckyDipReward = filter(luckyDipRewardRaw, item => {
                    const voucherCif = result(item, 'cifCode', '');
                    const voucherType = result(item, 'rewards.0.type', '');
                    return voucherCif === cifCode && voucherType === '2';
                  });
                  const dataVoucher =
                    middlewareUtils.selectedVoucher(luckyDipReward);
                  dispatch(
                    actionCreators.getMyOrderDataList([
                      ...dataOrder,
                      ...dataVoucher,
                    ]),
                  );
                  dispatch(actionCreators.hideSpinner());
                })
                .catch(() => {
                  dispatch(actionCreators.getMyOrderDataList([...dataOrder]));
                  dispatch(actionCreators.hideSpinner());
                });
              dispatch(actionCreators.hideSpinner());
            });
        }
      })
      .catch(err => {
        api
          .getGiveAway({}, dispatch)
          .then(response => {
            const giveAwayRaw = result(
              response,
              'data.simasPoin.data.dataUndian',
              [],
            );
            const giveAwayReward = filter(giveAwayRaw, {cifCode: cifCode});
            let giveAwayList = [];
            forEach(giveAwayReward, item => {
              const listPrize = result(item, 'listPrize', []);
              forEach(listPrize, prizeData => {
                giveAwayList.push(prizeData);
              });
            });
            const finalGiveAwayList =
              middlewareUtils.selectedVoucherGiveAway(giveAwayList);
            api
              .getRewardHistory({}, dispatch)
              .then(resultHistory => {
                const luckyDipRewardRaw = result(
                  resultHistory,
                  'data.simasPoin.data.dataUndian',
                  [],
                );
                const luckyDipReward = filter(luckyDipRewardRaw, item => {
                  const voucherCif = result(item, 'cifCode', '');
                  const voucherType = result(item, 'rewards.0.type', '');
                  return voucherCif === cifCode && voucherType === '2';
                });
                const dataVoucher =
                  middlewareUtils.selectedVoucher(luckyDipReward);
                dispatch(
                  actionCreators.getMyOrderDataList([
                    ...finalGiveAwayList,
                    ...dataVoucher,
                  ]),
                );
                dispatch(actionCreators.hideSpinner());
              })
              .catch(() => {
                dispatch(actionCreators.hideSpinner());
                dispatch(
                  actionCreators.getMyOrderDataList([...finalGiveAwayList]),
                );
              });
          })
          .catch(() => {
            api
              .getRewardHistory({}, dispatch)
              .then(resultHistory => {
                const luckyDipRewardRaw = result(
                  resultHistory,
                  'data.simasPoin.data.dataUndian',
                  [],
                );
                const luckyDipReward = filter(luckyDipRewardRaw, item => {
                  const voucherCif = result(item, 'cifCode', '');
                  const voucherType = result(item, 'rewards.0.type', '');
                  return voucherCif === cifCode && voucherType === '2';
                });
                const dataVoucher =
                  middlewareUtils.selectedVoucher(luckyDipReward);
                dispatch(actionCreators.getMyOrderDataList([...dataVoucher]));
                dispatch(actionCreators.hideSpinner());
              })
              .catch(() => {
                dispatch(actionCreators.hideSpinner());
                dispatch(
                  actionCreators.getMyOrderDataList({
                    loading: false,
                    reload: true,
                  }),
                );
                Toast.show(
                  getErrorMessage(err, language.ERROR_MESSAGE__POPULATE_REDEEM),
                  Toast.LONG,
                );
              });
          });
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function orderClickHandler() {
  return dispatch => {
    dispatch(NavigationActions.navigate({routeName: 'DetailOrder'}));
  };
}
export function receiveProvince() {
  return (dispatch, getState) => {
    const state = getState();
    const res = result(
      state,
      'configEmoney.emoneyConfig.listLocationProvinceConfig',
      [],
    );
    const middleWareList = middlewareUtils.getDataOptions(res);
    dispatch(actionCreators.updateListProvince(middleWareList));
  };
}

export function receiveCity() {
  return (dispatch, getState) => {
    const state = getState();
    const res = result(
      state,
      'form.UpgradeEmoneySecondForm.values.province.value',
      '',
    );
    const resPlus = (parseInt(res) + 100).toString();
    const resPlusnull =
      resPlus.length > 3 ? resPlus : '0' + (parseInt(res) + 100).toString();
    const resCity = result(
      state,
      'configEmoney.emoneyConfig.listLocationConfig',
      [],
    );
    const searchListCity = filter(resCity, function (o) {
      return o.code > res && o.code < resPlusnull;
    });
    const middleWareList = sortBy(
      middlewareUtils.getDataOptions(searchListCity),
      ['label'],
    );
    dispatch(actionCreators.updateListCity(middleWareList));
  };
}

export function setMaritalStatus() {
  return (dispatch, getState) => {
    const state = getState();
    const gender = result(
      state,
      'form.UpgradeEmoneyForm.values.gender.value',
      '',
    );
    const maritalStatusOptions = sortBy(
      middlewareUtils.getDataOptions(
        result(state, 'configEmoney.emoneyConfig.listMaritalStatusConfig', {}),
      ),
      ['label'],
    );
    let filteredStatus = [];
    if (gender === 'M') {
      filteredStatus = filter(maritalStatusOptions, function (o) {
        return o.value !== '4';
      });
    } else if (gender === 'F') {
      filteredStatus = filter(maritalStatusOptions, function (o) {
        return o.value !== '5';
      });
    }
    dispatch(actionCreators.saveMaritalStatus(filteredStatus));
  };
}

export function upgradeEmoneyKyc() {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const transRefNum = result(state, 'transRefNum', '');
    const dataDukcapil = result(state, 'listDukcapil', {});

    // First Form
    const birthDate = moment(
      result(state, 'form.UpgradeEmoneyForm.values.birthDate', ''),
    ).format('DD/MM/YYYY');
    const birthPlace = result(dataDukcapil, 'TMPT_LHR', '');
    const gender =
      result(dataDukcapil, 'JENIS_KLMIN', '') === 'Laki-Laki' ? 'M' : 'F';

    const idNumber = result(
      state,
      'form.UpgradeEmoneyForm.values.idNumber',
      '',
    );
    const idType = result(
      state,
      'form.UpgradeEmoneyForm.values.idType.value',
      '1',
    );
    const maritalStatus = result(
      state,
      'form.UpgradeEmoneyForm.values.maritalStatus.value',
      '',
    );
    const mothersMaiden = result(
      state,
      'form.UpgradeEmoneyForm.values.mothersMaidenName',
      '',
    );

    const name = result(state, 'user.profile.name', '');
    const nationality = result(
      state,
      'form.UpgradeEmoneyForm.values.nationality.value',
      'ID',
    );
    const idExpiryDate = null;

    // Second Form
    const country = result(
      state,
      'form.UpgradeEmoneySecondForm.values.country',
      'Indonesia',
    );
    const currentCountry = result(
      state,
      'form.UpgradeEmoneySecondForm.values.country',
      'Indonesia',
    );

    const province = result(
      state,
      'form.UpgradeEmoneySecondForm.values.province.value',
      '',
    );
    const currentProvince = result(
      state,
      'form.UpgradeEmoneySecondForm.values.province.value',
      '',
    );

    const city = result(
      state,
      'form.UpgradeEmoneySecondForm.values.city.value',
      '',
    );
    const currentCity = result(
      state,
      'form.UpgradeEmoneySecondForm.values.city.value',
      '',
    );

    const kecamatan = result(
      state,
      'form.UpgradeEmoneySecondForm.values.district.name',
      '',
    );
    const currentKecamatan = result(
      state,
      'form.UpgradeEmoneySecondForm.values.district.name',
      '',
    );

    const postalCode = result(
      state,
      'form.UpgradeEmoneySecondForm.values.postal',
      '',
    );
    const currentPostalCode = result(
      state,
      'form.UpgradeEmoneySecondForm.values.postal',
      '',
    );

    const rt = result(state, 'form.UpgradeEmoneySecondForm.values.rt', '');
    const rw = result(state, 'form.UpgradeEmoneySecondForm.values.rw', '');
    const rtRw = rt + '/' + rw;
    const currentRt = result(
      state,
      'form.UpgradeEmoneySecondForm.values.rt',
      '',
    );
    const currentRw = result(
      state,
      'form.UpgradeEmoneySecondForm.values.rw',
      '',
    );
    const currentRtRw = currentRt + '/' + currentRw;

    const kelurahan = result(
      state,
      'form.UpgradeEmoneySecondForm.values.subDistrict.name',
      '',
    );
    const currentKelurahan = result(
      state,
      'form.UpgradeEmoneySecondForm.values.subDistrict.name',
      '',
    );

    const address = result(
      state,
      'form.UpgradeEmoneySecondForm.values.address',
      '',
    );
    const currentAddress = result(
      state,
      'form.UpgradeEmoneySecondForm.values.address',
      '',
    );

    // Third Form
    const occupation = result(
      state,
      'form.UpgradeEmoneyThirdForm.values.work.value',
      '',
    );
    const monthlyIncome = result(
      state,
      'form.UpgradeEmoneyThirdForm.values.income.value',
      '',
    );
    const sourceOfFund = result(
      state,
      'form.UpgradeEmoneyThirdForm.values.fund',
      '',
    );

    const simasToken = result(
      state,
      'form.AuthenticateForm.values.simasToken',
      '',
    );
    const accessFrom = 'v3';

    const idCard = result(
      state,
      'form.CameraKTPPassportForm.values.imageData.base64',
    );
    const signature = result(state, 'signature', null);
    const title = gender === 'M' ? 'Mr' : gender === 'F' ? 'Mrs' : '';
    const cifCode = result(state, 'user.profile.customer.cifCode', '');

    const dataRequest = {
      birthDate,
      birthPlace,
      gender,
      idExpiryDate,
      idNumber,
      name,
      idType,
      maritalStatus,
      mothersMaiden,
      country,
      province,
      city,
      kecamatan,
      nationality,
      postalCode,
      rtRw,
      kelurahan,
      address,
      currentCountry,
      currentProvince,
      currentAddress,
      currentKelurahan,
      currentKecamatan,
      currentCity,
      currentPostalCode,
      currentRtRw,
      occupation,
      monthlyIncome,
      sourceOfFund,
      idCard,
      signature,
      title,
      cifCode,
    };
    const payload = {transRefNum, accessFrom, simasToken, dataRequest};
    return api
      .upgradeEmoneyKyc(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const responseCode = result(res, 'data.responseCode', '');
        const responseMessage = result(res, 'data.responseMessage', '');
        if (responseCode === '00') {
          dispatch(
            NavigationActions.navigate({routeName: 'EmoneyUpgradeFinalize'}),
          );
          dispatch(destroy('UpgradeEmoneyForm'));
          dispatch(destroy('UpgradeEmoneySecondForm'));
          dispatch(destroy('UpgradeEmoneyThirdForm'));
          Toast.show(responseMessage, Toast.LONG);
        } else if (responseCode === '01') {
          dispatch(resetToDashboardFrom('EmoneyUpgradeFinalize'));
          Toast.show(responseMessage, Toast.LONG);
        }
      })
      .catch(error => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(error, language.APP_ERROR__TITLE),
          Toast.LONG,
        );
        throw error;
      });
  };
}

export function getMovieCgv() {
  // get movie and cinema here
  return dispatch => {
    const today = moment().format('YYYYMMDD');
    const currentDate = new Date();
    const oneMonth = new Date(currentDate.setDate(currentDate.getDate() + 30));
    const endDate = moment(oneMonth).format('YYYYMMDD');
    const payloadMovie = {startDate: today, endDate: endDate};
    const payloadCinema = {};
    dispatch(destroy('OfferConfig'));
    dispatch(actionCreators.showSpinner());
    return api
      .getMovieCgv(payloadMovie, dispatch)
      .then(res => {
        // API Movie
        const dataMovie = result(res, 'data.movieInfoByConstructList', {});
        dispatch(actionCreators.saveMovieCgv(dataMovie));
        dispatch(actionCreators.showSpinner());

        api
          .getCinemaCgv(payloadCinema, dispatch)
          .then(resCinema => {
            // API Cinema
            const dataCinema = result(
              resCinema,
              'data.cinemaInfoByConstructList',
              {},
            );
            dispatch(actionCreators.saveCinemaCgv(dataCinema));
            dispatch(actionCreators.showSpinner());

            api
              .getCgvComingSoon(payloadCinema, dispatch)
              .then(resComing => {
                // API CommingSoon
                const dataComingSoon = result(
                  resComing,
                  'data.comingSoonMovieInfoByConstructList',
                  {},
                );
                dispatch(actionCreators.showSpinner());

                dispatch(actionCreators.saveComingSoonCgv(dataComingSoon));
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'CgvTab',
                    params: {
                      dataCinema: dataCinema,
                      dataMovie: dataMovie,
                      dataComingSoon: dataComingSoon,
                    },
                  }),
                );
                dispatch(actionCreators.hideSpinner());
              })
              .catch(err => {
                dispatch(actionCreators.hideSpinner());
                Toast.show(
                  getErrorMessage(
                    err,
                    language.ERROR_MESSAGE__ERROR_GETTING_CGV_COMINGSOON,
                  ),
                  Toast.LONG,
                );
              });
          })
          .catch(err => {
            dispatch(actionCreators.hideSpinner());
            Toast.show(
              getErrorMessage(
                err,
                language.ERROR_MESSAGE__ERROR_GETTING_CGV_CINEMA,
              ),
              Toast.LONG,
            );
          });
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__ERROR_GETTING_CGV_MOVIE),
          Toast.LONG,
        );
      });
  };
}

export function couponCustomer(amount, billType, accountId = '') {
  return (dispatch, getState) => {
    const state = getState();
    const transRefNum = result(state, 'transRefNum', '');
    const type = billType === '1' ? 'fundTransfer' : 'billPayment';
    const billerCode =
      billType === '123456'
        ? '123456'
        : result(state, 'billerCode.billerCode', '');
    const transactionAmount = amount.toString();
    const payload = {
      type,
      transactionAmount,
      transRefNum,
      billerCode,
      accountId: String(accountId),
    };
    dispatch(actionCreators.showSpinner());
    return api
      .getVoucherList(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const privateVoucher = result(res, 'data.privateVoucherList', []);
        const publicVoucher = result(res, 'data.publicVoucher', []);
        dispatch(
          NavigationActions.navigate({
            routeName: 'CouponList',
            params: {
              privateVoucher,
              publicVoucher,
              transactionAmount,
              billerCode,
              accountId,
            },
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.REDEEM__SMARTFREN__HEADING__RESULT__ERROR,
          ),
          Toast.LONG,
        );
      });
  };
}

export function couponCustomerView() {
  return (dispatch, getState) => {
    const state = getState();
    const transRefNum = result(state, 'transRefNum', '');
    const payload = {transRefNum};
    const transactionAmount = '100000';
    dispatch(actionCreators.showSpinner());
    return api
      .getVoucherList(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const privateVoucher = result(res, 'data.privateVoucherList', []);
        const publicVoucher = result(res, 'data.publicVoucher', []);
        const isAvailable = true;
        dispatch(
          NavigationActions.navigate({
            routeName: 'CouponList',
            params: {
              privateVoucher,
              publicVoucher,
              transactionAmount,
              isAvailable,
            },
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.REDEEM__SMARTFREN__HEADING__RESULT__ERROR,
          ),
          Toast.LONG,
        );
      });
  };
}

export function getDetailCouponCustomer(
  id,
  transactionAmount,
  isAvailable,
  ownership,
  codebillerList,
  subendDate,
  subenewDate,
  endTimeModRaw,
  startTimeModRaw,
  maxAmount,
  minAmount,
  shortDesc,
  currency,
  billerCode,
  accountId = '',
) {
  return dispatch => {
    const voucherId = id.toString();
    const payload = {voucherId, transactionAmount, ownership};
    const endTimehour = endTimeModRaw.substring(0, 2);
    const endTimemin = endTimeModRaw.substring(2, 4);
    const startTimehour =
      startTimeModRaw === '0' ? '00' : startTimeModRaw.substring(0, 2);
    const startTimemin =
      startTimeModRaw === '0' ? '00' : startTimeModRaw.substring(2, 4);
    const endTimeMod = endTimehour + ':' + endTimemin;
    const startTimeMod = startTimehour + ':' + startTimemin;
    dispatch(actionCreators.showSpinner());
    return api
      .getVoucherListDetail(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const detailVoucher = result(res, 'data.voucherData.voucher', {});
        dispatch(
          NavigationActions.navigate({
            routeName: 'DetailCouponList',
            params: {
              detailVoucher,
              transactionAmount,
              isAvailable,
              voucherId,
              codebillerList,
              subendDate,
              subenewDate,
              endTimeMod,
              startTimeMod,
              maxAmount,
              minAmount,
              ownership,
              shortDesc,
              currency,
              billerCode,
              accountId,
            },
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.REDEEM__SMARTFREN__HEADING__RESULT__ERROR,
          ),
          Toast.LONG,
        );
      });
  };
}

export function populateBanners() {
  return dispatch =>
    api
      .getBanners(dispatch)
      .then(res => dispatch(actionCreators.populateBanners(res.data)))
      .catch(err => console.log(err));
}

export function registerPushId(loginPushwooshID, loginSetTagId) {
  return () => {
    Pushwoosh.init({
      pw_appid: pushWooshAppConstants.applicationID,
      project_number: pushWooshAppConstants.FCMID,
    });
    Pushwoosh.register();
    Pushwoosh.setUserId(loginPushwooshID);
    if (loginSetTagId === 'mr') {
      Pushwoosh.setTags({
        Gender: 'male',
        Title: loginSetTagId,
        Name: loginPushwooshID,
      }); // cari name full jg, set tracking location
    } else if (loginSetTagId === 'mrs' || loginSetTagId === 'ms') {
      Pushwoosh.setTags({
        Gender: 'female',
        Title: loginSetTagId,
        Name: loginPushwooshID,
      });
    } else {
      Pushwoosh.setTags({
        Gender: 'other',
        Title: loginSetTagId,
        Name: loginPushwooshID,
      });
    }
  };
}

export function smsEmailRegisterEmoney(eMoneyData) {
  return (dispatch, getState) => {
    const state = getState();
    const utmSource = result(state, 'utmAndDataLink', {});
    const utm = result(utmSource, 'utm', '');
    const referralCode = result(utmSource, 'referralCode', '');
    const typeActivation = result(utmSource, 'typeActivation', '');
    const codeProduct = result(utmSource, 'codeProduct', '');
    const additionalInfoMap = {utm, referralCode, typeActivation, codeProduct};
    const payload = {...eMoneyData, additionalInfoMap};
    return api
      .sendEmailOtpEmoneyRegister(payload, dispatch)
      .then(() => {
        // const stringEvent = 'PRM_SBT_' + utm + '_PM_' + referralCode + '_PD_' + codeProduct + '_ACT_' + typeActivation;
        // if (utm !== '' && referralCode !== '') {
        //   Analytics().logEvent(stringEvent);
        // }
        dispatch(
          StackActions.reset({
            index: 0,
            actions: [
              dispatch(
                NavigationActions.navigate({
                  routeName: 'ConfirmEmailScreen',
                  params: {...eMoneyData},
                }),
              ),
            ],
          }),
        );
        dispatch(actionCreators.hideSpinner());
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__REGISTRATION_EMONEY),
          Toast.LONG,
        );
      });
  };
}

export function smsOtpRegisterEmoney(eMoneyData, firebaseEmoney) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const isLockedDevice = Boolean(
      state.appInitKeys &&
        state.appInitKeys.username &&
        state.appInitKeys.tokenClient &&
        state.appInitKeys.tokenServer,
    );
    const payload = {...eMoneyData};
    return api
      .sendEmailOtpEmoneyRegister(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const responseCode = result(res, 'data.responseCode', '');
        const typeActivation = transformToken(
          result(res, 'data.typeActivation', ''),
        );
        const tokenEmail = transformToken(result(res, 'data.emailToken', ''));
        if (responseCode === '00') {
          dispatch(
            sendOtpActivation(
              tokenEmail,
              typeActivation,
              isLockedDevice,
              firebaseEmoney,
            ),
          );
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__REGISTRATION_EMONEY),
          Toast.LONG,
        );
      });
  };
}

export function validityCoupon(
  id,
  fixAmount,
  transactionAmount,
  expireTime,
  ownership,
  fromDetail = '',
  subendDate,
  subnewDate,
  endTimeMod,
  startTimeMod,
  currency,
  billerCodeQR,
  accountIdRaw = '',
) {
  return (dispatch, getState) => {
    const state = getState();
    const billerCode =
      billerCodeQR === '123456'
        ? '123456'
        : result(state, 'billerCode.billerCode', '');
    const voucherId = id.toString();
    const transRefNum = result(state, 'transRefNum', '');
    const type = 'billPayment';
    const accountId = String(accountIdRaw);
    const payload = {
      transactionAmount,
      transRefNum,
      voucherId,
      type,
      ownership,
      billerCode,
      billpayMethodType,
      accountId,
    };
    const isLogin = !isEmpty(result(state, 'user', {}));
    const billpayMethodType = isLogin ? null : '1';
    const cashbackDetail =
      currency === 'simaspoin'
        ? language.GENERIC__SIMAS_POIN
        : language.GENERIC__CASHBACK_RP;
    const custAmount =
      language.GENERIC__TITLE_COUPON + ' ' + fixAmount + ' ' + cashbackDetail;
    const custPoin = fixAmount;
    if (fromDetail === '1') {
      dispatch(NavigationActions.back());
    }
    dispatch(actionCreators.showSpinner());
    return api
      .checkVoucherValidity(payload, dispatch)
      .then(res => {
        const responseCode = result(res, 'data.responseCode', '');
        const responseMessage = result(res, 'data.responseMessage', '');
        if (responseCode === '00') {
          if (fromDetail === '1') {
            setTimeout(() => {
              dispatch(
                actionCreators.saveCoupon({
                  voucherId,
                  description: custAmount,
                  ownership,
                  subnewDate,
                  subendDate,
                  endTimeMod,
                  startTimeMod,
                  currency,
                  custPoin,
                }),
              );
              dispatch(NavigationActions.back());
              dispatch(actionCreators.hideSpinner());
            }, 1000);
          } else {
            dispatch(
              actionCreators.saveCoupon({
                voucherId,
                description: custAmount,
                ownership,
                subnewDate,
                subendDate,
                endTimeMod,
                startTimeMod,
                currency,
                custPoin,
              }),
            );
            dispatch(NavigationActions.back());
            dispatch(actionCreators.hideSpinner());
          }
        } else {
          dispatch(actionCreators.hideSpinner());
          Toast.show(responseMessage, Toast.LONG);
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.REDEEM__SMARTFREN__HEADING__RESULT__ERROR,
          ),
          Toast.LONG,
        );
      });
  };
}

export function removeCoupon() {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    dispatch(actionCreators.deleteCoupon());
    dispatch(actionCreators.hideSpinner());
  };
}

export function goToLocator() {
  return dispatch => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(response => {
        if (response === 'granted') {
          LocationServices.checkLocationServicesIsEnabled({
            message: language.ATM_LOCATOR__ACCESS_LOCATION,
            ok: language.GENERIC__YES,
            cancel: language.GENERIC__NO,
            enableHighAccuracy: false,
            showDialog: true,
            openLocationServices: true,
          })
            .then(() => {
              dispatch(getATMList());
            })
            .catch(() => {
              Toast.show(language.PERMISSION__LOCATION, Toast.LONG);
            });
        } else {
          Toast.show(language.PERMISSION__LOCATION, Toast.LONG);
        }
      });
    } else {
      Permissions.check(Permissions.PERMISSIONS.IOS.LOCATION_ALWAYS).then(
        response => {
          if (response === 'granted') {
            dispatch(getATMList());
          } else {
            Permissions.request('ios.permission.LOCATION_ALWAYS').then(
              response => {
                if (response === 'granted') {
                  dispatch(getATMList());
                } else {
                  Toast.show(language.PERMISSION__LOCATION, Toast.LONG);
                }
              },
            );
          }
        },
      );
    }
  };
}

export function getATMList() {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    Geolocation.getCurrentPosition(
      position => {
        const payload = middlewareUtils.getATMList(position);
        return api
          .getATMList(payload, dispatch)
          .then(res => {
            const atmList = result(res, 'data.showATMList', {});
            dispatch(
              NavigationActions.navigate({
                routeName: 'Locator',
                params: {atmList},
              }),
            );
            dispatch(actionCreators.hideSpinner());
          })
          .catch(err => {
            Toast.show(
              getErrorMessage(err, language.ERROR_MESSAGE__ATM_LOCATOR),
              Toast.LONG,
            );
          });
      },
      err => {
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__ATM_LOCATOR2),
          Toast.LONG,
        );
        dispatch(actionCreators.hideSpinner());
      },
      {enableHighAccuracy: false, timeout: 20000},
    );
  };
}

export function goToSearch(data) {
  return dispatch => {
    dispatch(
      NavigationActions.navigate({routeName: 'SearchATMBranch', params: data}),
    );
  };
}
export function prepareGoSimasPoinHistory(formValues) {
  return dispatch => {
    const isOwnAccount = false;
    const isBiller = result(formValues, 'isBiller') === true;
    const params = formValues;
    const isBfr = true;
    const isbillerOtp = isBiller;
    dispatch(destroy('loginWithUsernamePassword'));
    dispatch(destroy('loginAccountForm'));
    dispatch(destroy('easyPinCreationForm'));
    dispatch(destroy('easyPinCreationConfirmForm'));
    dispatch(initStoreWithTransactionDetails());
    if (isBiller) {
      dispatch(
        triggerAuthBillpay(
          formValues.currentAmount,
          formValues.triggerAuthData,
          formValues.isSyariah,
          isbillerOtp,
        ),
      );
    } else {
      dispatch(
        getTransRefNumAndOTPNavigate(
          'transfer',
          true,
          'AuthTransfer',
          params,
          isOwnAccount,
          false,
          isBfr,
        ),
      );
    }
  };
}

export function goSimasPoinHistory() {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const payload = {pushToken: '123456', clientCheck: 'WEB_BROWSER'};
    const navigationKeys = result(
      getState(),
      'promos.navigateOnPushClicked',
      false,
    );
    const accountList = result(state, 'accounts', []);
    dispatch(destroy('loginWithUsernamePassword'));
    dispatch(destroy('loginAccountForm'));
    dispatch(destroy('easyPinCreationForm'));
    dispatch(destroy('easyPinCreationConfirmForm'));
    dispatch(initStoreWithTransactionDetails());
    if (navigationKeys.length) {
      forEach(navigationKeys, navigateKey =>
        dispatch(NavigationActions.navigate({routeName: navigateKey})),
      );
      dispatch(actionCreators.changeNotificationRoute([]));
    }
    return api
      .getSimasPoinHistory(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        dispatch(
          actionCreators.saveSimasPoinHistory({
            ...res.data.accountStatementSimasPoin,
            status: 'success',
          }),
        );
        if (
          accountList.length === 1 &&
          find(accountList, {accountType: 'emoneyAccount'})
        ) {
          dispatch(NavigationActions.navigate({routeName: 'SimasPoinHistory'}));
        } else {
          dispatch(NavigationActions.navigate({routeName: 'SimasPoinHistory'}));
        }
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
        if (
          accountList.length === 1 &&
          find(accountList, {accountType: 'emoneyAccount'})
        ) {
          dispatch(NavigationActions.navigate({routeName: 'SimasPoinHistory'}));
        } else {
          dispatch(NavigationActions.navigate({routeName: 'SimasPoinHistory'}));
        }
      });
  };
}

export function getBillpayHistory() {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const billpayMethodType = isLogin ? null : '1';
    const payload = {billpayMethodType};
    const billerList = result(state, 'billerConfig.billerList', {});
    dispatch(actionCreators.saveBillpayHistory({status: 'loading'}));
    if (!isLogin) {
      return api
        .getBillpayHistory(payload, dispatch)
        .then(res =>
          dispatch(
            actionCreators.saveBillpayHistory({...res.data, status: 'success'}),
          ),
        )
        .catch(() =>
          dispatch(actionCreators.saveBillpayHistory({status: 'error'})),
        );
    } else if (isEmpty(billerList)) {
      dispatch(populateBillerData()).then(() =>
        api
          .getBillpayHistory(payload, dispatch)
          .then(res =>
            dispatch(
              actionCreators.saveBillpayHistory({
                ...res.data,
                status: 'success',
              }),
            ),
          )
          .catch(() =>
            dispatch(actionCreators.saveBillpayHistory({status: 'error'})),
          ),
      );
    } else {
      return api
        .getBillpayHistory(payload, dispatch)
        .then(res =>
          dispatch(
            actionCreators.saveBillpayHistory({...res.data, status: 'success'}),
          ),
        )
        .catch(() =>
          dispatch(actionCreators.saveBillpayHistory({status: 'error'})),
        );
    }
  };
}

export function selectingAccount(item, form, field) {
  return dispatch => {
    dispatch(NavigationActions.back());
    if (form && field) {
      dispatch(change(form, field, item));
    } else {
      dispatch(change('CardLessWithdrawalPayment', 'myAccount', item));
    }
  };
}

export function setupGenericAllsegment(routePath) {
  return (dispatch, getState) => {
    const state = getState();
    const accountList = result(state, 'accounts', []);
    const navigationKeys = result(
      getState(),
      'promos.navigateOnPushClicked',
      false,
    );
    const cifCode = state.user.profile.customer.cifCode;
    dispatch(destroy('loginWithUsernamePassword'));
    dispatch(destroy('loginAccountForm'));
    dispatch(destroy('easyPinCreationForm'));
    dispatch(destroy('easyPinCreationConfirmForm'));
    dispatch(initStoreWithTransactionDetails());
    if (startsWith(cifCode, 'NK')) {
      dispatch(NavigationActions.navigate({routeName: 'MainEmoney'}));
      dispatch(NavigationActions.navigate({routeName: routePath}));
    } else {
      if (
        accountList.length === 1 &&
        find(accountList, {accountType: 'emoneyAccount'})
      ) {
        dispatch(NavigationActions.navigate({routeName: 'MainEmoney'}));
        dispatch(NavigationActions.navigate({routeName: routePath}));
      } else {
        dispatch(NavigationActions.navigate({routeName: 'Main'}));
        dispatch(NavigationActions.navigate({routeName: routePath}));
      }
    }
    if (navigationKeys.length) {
      forEach(navigationKeys, navigateKey =>
        dispatch(NavigationActions.navigate({routeName: navigateKey})),
      );
      dispatch(actionCreators.changeNotificationRoute([]));
    }
  };
}

export function payByHistory(biller, subscriberNo, description, favBill) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    return Promise.all([
      dispatch(populateBillerData()),
      dispatch(populateConfigData()),
    ])
      .then(() => {
        dispatch(actionCreators.hideSpinner());
        const paymentConfig = generatePaymentRoute(biller);
        const paymentRoute = result(paymentConfig, 'route', '');
        const formName = result(paymentConfig, 'formName', '');
        dispatch(change(formName, 'subscriberNo', subscriberNo));
        dispatch(change(formName, 'description', description));
        dispatch(
          NavigationActions.navigate({
            routeName: paymentRoute,
            params: {biller, favBill},
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_UPDATE_BILLER_CONFIG,
          ),
          Toast.LONG,
        );
      });
  };
}

export function payByFav(
  biller,
  subscriberNo,
  description,
  favBill,
  filterData,
) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    return Promise.all([
      dispatch(populateBillerData()),
      dispatch(populateConfigData()),
    ])
      .then(() => {
        dispatch(actionCreators.hideSpinner());
        const paymentConfig = generatePaymentRoute(biller);
        const paymentRoute = result(paymentConfig, 'route', '');
        const formName = result(paymentConfig, 'formName', '');
        dispatch(change(formName, 'subscriberNo', subscriberNo));
        dispatch(change(formName, 'description', description));
        if (filterData === 'biller') {
          dispatch(
            NavigationActions.navigate({
              routeName: paymentRoute,
              params: {biller, favBill},
            }),
          );
        } else {
          dispatch(
            StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'AccountMenu'})],
            }),
          );
          dispatch(
            NavigationActions.navigate({
              routeName: paymentRoute,
              params: {biller, favBill},
            }),
          );
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_UPDATE_BILLER_CONFIG,
          ),
          Toast.LONG,
        );
      });
  };
}

export function manualValidityCoupon(
  id,
  fixAmount,
  transactionAmount,
  expireTime,
  ownership,
  codebillerList,
  subendDate,
  subnewDate,
  endTimeMod,
  startTimeMod,
  maxAmountRaw,
  minAmountRaw,
  currency,
) {
  return (dispatch, getState) => {
    const state = getState();
    const custPoin = fixAmount;
    const minAmount = minAmountRaw === null ? 0 : minAmountRaw;
    const maxAmount = minAmountRaw === null ? 0 : maxAmountRaw;
    const gapTimeServer = result(state, 'gapTimeServer', 0);
    const voucherId = id.toString();
    const cashbackDetail =
      currency === 'simaspoin'
        ? language.GENERIC__SIMAS_POIN
        : language.GENERIC__CASHBACK_RP;
    const custAmount =
      language.GENERIC__TITLE_COUPON + ' ' + fixAmount + ' ' + cashbackDetail;
    const now = new Date();
    const nowTimeDate = moment(now).format('YYYY/MM/DD');

    const nowTime = moment(now).format('YYYY/MM/DD H:mm');
    const timeDateEnded = subendDate + ' ' + endTimeMod;
    const timeDateStarted = subnewDate + ' ' + startTimeMod;
    const diffDateStart = moment(nowTime).diff(moment(timeDateStarted));
    const diffDateEnd = moment(nowTime).diff(moment(timeDateEnded));
    const gapTimeStart =
      Math.round(moment.duration(diffDateStart).asSeconds()) - gapTimeServer;
    const gapTimeEnd =
      Math.round(moment.duration(diffDateEnd).asSeconds()) - gapTimeServer;

    const timeDateEndedElse = nowTimeDate + ' ' + endTimeMod;
    const timeDateStartedElse = nowTimeDate + ' ' + startTimeMod;
    const diffDateStartElse = moment(nowTime).diff(moment(timeDateStartedElse));
    const diffDateEndElse = moment(nowTime).diff(moment(timeDateEndedElse));
    const gapTimeStartElse =
      Math.round(moment.duration(diffDateStartElse).asSeconds()) -
      gapTimeServer;
    const gapTimeEndElse =
      Math.round(moment.duration(diffDateEndElse).asSeconds()) - gapTimeServer;
    dispatch(actionCreators.savebillerCodeDeepLink(codebillerList));
    dispatch(actionCreators.showSpinner());
    return Promise.all([
      dispatch(populateBillerData()),
      dispatch(populateConfigData()),
    ])
      .then(() => {
        if (endTimeMod === '23:59' && startTimeMod === '00:00') {
          if (gapTimeStart > 0 && gapTimeEnd < 0) {
            dispatch(
              actionCreators.saveCoupon({
                voucherId,
                description: custAmount,
                ownership,
                subnewDate,
                subendDate,
                endTimeMod,
                startTimeMod,
                maxAmount,
                minAmount,
                usingFromLine: '1',
                currency,
                custPoin,
              }),
            );
            dispatch(actionCreators.saveUsingCouponUI('1'));
            setTimeout(() => {
              dispatch(actionCreators.hideSpinner());
            }, 5000);
            dispatch(prepareGoBillerVoucher());
          } else {
            dispatch(actionCreators.hideSpinner());
            Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
          }
        } else {
          if (gapTimeStart > 0 && gapTimeEnd < 0) {
            if (gapTimeStartElse > 0 && gapTimeEndElse < 0) {
              dispatch(
                actionCreators.saveCoupon({
                  voucherId,
                  description: custAmount,
                  ownership,
                  timeDateEnded,
                  timeDateStarted,
                  endTimeMod,
                  startTimeMod,
                  maxAmount,
                  minAmount,
                  usingFromLine: '1',
                  currency,
                  custPoin,
                }),
              );
              dispatch(actionCreators.saveUsingCouponUI('1'));
              setTimeout(() => {
                dispatch(actionCreators.hideSpinner());
              }, 5000);
              dispatch(prepareGoBillerVoucher());
            } else {
              dispatch(actionCreators.hideSpinner());
              Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
            }
          } else {
            dispatch(actionCreators.hideSpinner());
            Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
          }
        }
      })
      .catch(() => {});
  };
}

export function deleteBillpayHistory(history) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const billpayMethodType = isLogin ? null : '1';
    const deleteFunction = () => {
      dispatch(actionCreators.saveBillpayHistory({status: 'loading'}));
      const payload = {
        billerId: result(history, 'billerId', ''),
        subscriberNo: result(history, 'subscriberNo', ''),
        billpayMethodType,
      };
      dispatch(actionCreators.hideSinarmasAlert());
      return api
        .deleteBillpayHistory(payload, dispatch)
        .then(() => {
          dispatch(getBillpayHistory());
          Toast.show(language.PAYMENT_HISTORY__DELETE_SUCCESS, Toast.LONG);
        })
        .catch(() => {
          Toast.show(language.PAYMENT_HISTORY__DELETE_ERROR, Toast.LONG);
        });
    };
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.PAYMENT_HISTORY__DELETE_TITLE,
      text: language.TRANSFER__DELETE_PAYEE_MODAL_TEXT,
      button1: language.FAVORITE__CANCEL_BUTTON,
      onButton1Press: hideAlert,
      button2: language.ONBOARDING__OKAY,
      onButton2Press: deleteFunction,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}
export function validityCouponCheck(
  id,
  fixAmount,
  amount,
  endTime,
  ownership,
  codebillerList,
  subendDate,
  subenewDate,
  endTimeMod,
  startTimeMod,
  maxAmount,
  minAmount = '0',
) {
  return (dispatch, getState) => {
    const state = getState();
    const voucherId = id.toString();
    const transRefNum = result(state, 'transRefNum', '');
    const type = 'billPayment';
    const checkMinAmount = minAmount === null ? 0 : minAmount;
    const checkMaxAmount = minAmount === null ? 0 : maxAmount;
    const isLogin = !isEmpty(result(state, 'user', {}));
    const billpayMethodType = isLogin ? null : '1';
    const payload = {
      transactionAmount: checkMinAmount.toString(),
      transRefNum,
      voucherId,
      type,
      ownership,
      billpayMethodType,
    };
    dispatch(actionCreators.showSpinner());
    return api
      .checkVoucherValidity(payload, dispatch)
      .then(res => {
        const responseCode = result(res, 'data.responseCode', '');
        const responseMessage = result(res, 'data.responseMessage', '');
        if (responseCode === '00') {
          dispatch(NavigationActions.back());
          dispatch(actionCreators.hideSpinner());
          dispatch(
            manualValidityCoupon(
              id,
              fixAmount,
              amount,
              endTime,
              ownership,
              codebillerList,
              subendDate,
              subenewDate,
              endTimeMod,
              startTimeMod,
              checkMaxAmount,
              checkMinAmount,
            ),
          );
        } else {
          dispatch(actionCreators.hideSpinner());
          Toast.show(responseMessage, Toast.LONG);
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.REDEEM__SMARTFREN__HEADING__RESULT__ERROR,
          ),
          Toast.LONG,
        );
      });
  };
}
export const goHome = () => dispatch => {
  dispatch(resetToDashboardFrom('PayScreen'));
  dispatch(NavigationActions.navigate({routeName: 'Main'}));
  dispatch(NavigationActions.navigate({routeName: 'Home'}));
};

export const getFlag = flagName => (_, getState) => {
  const state = getState();
  const flags = result(state, 'config.flag', {});
  return result(flags, flagName, 'INACTIVE') === 'ACTIVE';
};

export const getURL = urlName => (_, getState) => {
  const state = getState();
  const url = result(state, 'config.attention', {});
  return result(url, urlName, '');
};

export function errorResult(
  errResponse,
  payload,
  resultDisplay,
  errorText,
  selectedAccount,
) {
  return dispatch => {
    const trimmedErrorText = trimEnd(errorText, ' ');
    const responseCode = result(errResponse, 'data.responseCode', '');
    if (responseCode === '98') {
      dispatch(
        actionCreators.updatePaymentStatus({
          ...payload,
          errorText: language.PAYMENT__STATUS_TIMEOUT,
          resultDisplay,
          status: 'PENDING',
        }),
      );
    } else if (responseCode === '51') {
      dispatch(
        actionCreators.updatePaymentStatus({
          ...payload,
          errorText: language.RESPONSE_MESSAGE__RC_51,
          resultDisplay,
          status: 'FAILED',
          isNoFund: true,
        }),
      );
    } else if (isEmpty(errResponse)) {
      const goToHistory = () => {
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'Landing'}),
              NavigationActions.navigate({
                routeName: 'TransactionsFilter',
                params: {accountInfo: selectedAccount},
              }),
            ],
          }),
        );
        dispatch(actionCreators.hideSinarmasAlert());
      };
      const sinarmasModalOptions = {
        heading1: language.COMMON__TIMEOUT_TITLE1,
        heading2: language.COMMON__TIMEOUT_TITLE2,
        text: language.COMMON__TIMEOUT_MESSAGE,
        button1: language.COMMON__TIMEOUT_BUTTON,
        onButton1Press: goToHistory,
        closeOnTouchOutside: false,
      };
      dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
    } else {
      dispatch(
        actionCreators.updatePaymentStatus({
          ...payload,
          errorText: trimmedErrorText,
          resultDisplay,
          status: 'FAILED',
        }),
      );
    }
  };
}

export const isEmptyFields =
  (dataName, mapping, specialCondition = noop) =>
  (_, getState) => {
    const state = getState();
    const data =
      typeof dataName === 'object' ? dataName : result(state, dataName, {});
    return checkIfEmpty(data, mapping, specialCondition);
  };

export function sendEmail(luckyDrawCode, luckyDrawName) {
  return (dispatch, getState) => {
    const newDate = new Date();
    const currentDate = moment(newDate).format('D MMM YYYY - h:mm a');
    const state = getState();
    const transRefNum = result(state, 'transRefNum', '');
    const realEmail = result(state, 'user.profile.email', '');
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasInputAlert());
    };
    const buttonsend = text => {
      const email = text === '' ? realEmail : text;
      const payload = {transRefNum, luckyDrawCode, email};
      dispatch(actionCreators.showSpinner());
      dispatch(actionCreators.hideSinarmasInputAlert());
      const serverTime = result(state, 'timeConfig.serverTime', '');
      set(storageKeys.LUCKYDRAW_REDEEM, {serverTime});
      return api
        .sendEmailLuckydraw(payload, dispatch)
        .then(() => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.LUCKYDRAW__SENT, Toast.LONG);
        })
        .catch(() => {
          dispatch(actionCreators.hideSinarmasInputAlert());
          dispatch(actionCreators.hideSpinner());
          dispatch(LuckydrawPending());
        });
    };
    const sinarmasModalOptions = {
      heading1: language.LUCKYDRAW__DOWNLOAD2,
      text:
        language.LUCKYDRAW__DETAIL_ALERT +
        luckyDrawName +
        ' ( ' +
        currentDate +
        ' ) ',
      text1: language.COMMON__EMAIL,
      button1: language.GENERIC__CANCEL,
      button2: language.GENERIC__OK,
      placeholder: language.HINTTEXT__EMAIL,
      onButton1Press: hideAlert,
      onButton2Press: buttonsend,
      onClose: hideAlert,
      value2: realEmail,
    };
    dispatch(
      actionCreators.showSinarmasInputAlert({
        ...sinarmasModalOptions,
        input: 'TextInput',
      }),
    );
  };
}

export function LuckydrawPending() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.LUCKYDRAW__PENDING,
      text: language.LUCKYDRAW__PENDING2,
      button1: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
      closeOnTouchOutside: false,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function luckyDrawTnC() {
  return dispatch => {
    dispatch(NavigationActions.navigate({routeName: 'LuckyDrawTnC'}));
  };
}

export const goBack = () => dispatch => dispatch(NavigationActions.back());

export const getFormVal = formName => (_, getState) =>
  result(getState(), `form.${formName}.values`, {});

export const goTo = (routeName, params) => dispatch =>
  dispatch(NavigationActions.navigate({routeName, params}));

export function showFavorite(billerName, subsNumber) {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const buttonYes = () => {
      dispatch(
        actionCreators.saveBillerDescFav({description: '', isFavorite: 'yes'}),
      );
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.FAVORITE_ADD_HEADER,
      text: billerName + ' ' + subsNumber,
      text1: language.FAVORITE__BILLER_NAME,
      text2: language.FAVORITE_TXT2,
      text3: language.FAVORITE__SUBSCRIBER_NUMBER,
      placeholder: language.HINTTEXT__ALIAS,
      button1: language.FAVORITE__CANCEL_BUTTON,
      button2: language.GENERIC__SAVE,
      onButton1Press: hideAlert,
      onButton2Press: buttonYes,
      onClose: hideAlert,
      value1: billerName,
      value3: subsNumber,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function saveAlias() {
  return (dispatch, getState) => {
    const state = getState();
    const desc = result(state, 'billerDescFav.description', '');
    dispatch(
      actionCreators.saveBillerDescFav({description: desc, isFavorite: 'yes'}),
    );
  };
}

export function showFavoriteTransfer(billerName, subsNumber) {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const buttonYes = () => {
      dispatch(
        actionCreators.saveBillerDescFav({description: '', isFavorite: 'yes'}),
      );
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.FAVORITE_ADD_HEADER,
      text: billerName + ' ' + subsNumber,
      button1: language.GENERIC__NO,
      button2: language.GENERIC__YES,
      onButton1Press: hideAlert,
      onButton2Press: buttonYes,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function removeFavorite(billerName, subsNumber) {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const buttonYes = () => {
      dispatch(
        actionCreators.saveBillerDescFav({description: '', isFavorite: 'no'}),
      );
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.FAVORITE_DEL_HEADER,
      text: billerName + ' ' + subsNumber,
      button1: language.GENERIC__NO,
      button2: language.GENERIC__YES,
      onButton1Press: hideAlert,
      onButton2Press: buttonYes,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function saveFavorite(filterData) {
  return (dispatch, getState) => {
    const state = getState();
    const billerFavorite = result(state, 'billerFavorite', {});
    const billerId = result(
      state,
      'form.FavoriteBillerForm.values.billerList.id',
      '',
    );
    const description = result(
      state,
      'form.FavoriteBillerForm.values.description',
      '',
    );
    const subscriberNo = result(
      state,
      'form.FavoriteBillerForm.values.phone',
      '',
    );
    const targetAccountNumber = result(
      state,
      'form.FavoriteBillerForm.values.payeeAccNo',
      '',
    );
    const favoriteType =
      result(state, 'form.FavoriteBillerForm.values.phone', '') === ''
        ? 'transfer'
        : 'billPayment';
    const fav = find(
      billerFavorite,
      fav => subscriberNo === fav.subscriberNo && billerId === fav.billerId,
    );
    const isFavorite = !isEmpty(fav);
    const mPinInputed = result(state, 'form.AuthenticateForm.values.otp', '');
    const transRefNum = result(state, 'transRefNum', '');
    const billerCode = result(
      state,
      'form.FavoriteBillerForm.values.billerList.billerPreferences.code',
      '',
    );
    const payload = {
      billerId,
      description,
      subscriberNo,
      favoriteType,
      targetAccountNumber,
      mPinInputed,
      transRefNum,
      billerCode,
    };
    const isSearch = result(state, 'addFavoriteTrxSearch', false);
    const additional = ['ipassport'];
    if (isFavorite) {
      const payloadEdit = {
        transactionId: fav.transactionId,
        billerId: fav.billerId,
        description: description,
        subscriberNo: subscriberNo,
        favoriteType,
      };
      return api
        .editFavBiller(payloadEdit, dispatch)
        .then(() => {
          dispatch(getFavBiller());
          dispatch(getBillpayHistory());
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.FAVORITE__EDIT_SUCCESS, Toast.LONG);
        })
        .catch(() => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.FAVORITE__EDIT_ERROR, Toast.LONG);
        });
    } else {
      dispatch(actionCreators.showSpinner());
      return api
        .addFavBiller(payload, additional, dispatch)
        .then(() => {
          dispatch(getFavBiller());
          dispatch(getBillpayHistory());
          dispatch(getTargetAccount());
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.FAVORITE__NEW_SUCCESS, Toast.LONG);
          if (filterData === 'biller') {
            dispatch(
              StackActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({routeName: 'PayScreen'}),
                  NavigationActions.navigate({
                    routeName: 'FavBiller',
                    params: {favFilter: 'biller'},
                  }),
                ],
              }),
            );
          } else if (isSearch) {
            dispatch(
              StackActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({routeName: 'Landing'}),
                  NavigationActions.navigate({routeName: 'FavBiller'}),
                ],
              }),
            );
          } else {
            dispatch(
              StackActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({routeName: 'PayScreen'}),
                  NavigationActions.navigate({routeName: 'FavBiller'}),
                ],
              }),
            );
          }
          dispatch(destroy('FavoriteBillerForm'));
        })
        .catch(() => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.FAVORITE__NEW_ERROR, Toast.LONG);
          if (filterData === 'biller') {
            dispatch(
              StackActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({routeName: 'PayScreen'}),
                  NavigationActions.navigate({
                    routeName: 'FavBiller',
                    params: {favFilter: 'biller'},
                  }),
                ],
              }),
            );
          } else if (isSearch) {
            dispatch(
              StackActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({routeName: 'Landing'}),
                  NavigationActions.navigate({routeName: 'FavBiller'}),
                ],
              }),
            );
          } else {
            dispatch(
              StackActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({routeName: 'PayScreen'}),
                  NavigationActions.navigate({routeName: 'FavBiller'}),
                ],
              }),
            );
          }
          dispatch(destroy('FavoriteBillerForm'));
        });
    }
  };
}

export function saveFavoriteBank() {
  return (dispatch, getState) => {
    const state = getState();
    const favBillForm = result(state, 'form.FavoriteBillerForm.values', '');
    const payeeAccNo = result(favBillForm, 'payeeAccNo', '');
    const listPayees = result(state, 'payees', []);
    const isExist = !isEmpty(
      find(listPayees, payees => payeeAccNo === payees.accountNumber),
    );
    dispatch(actionCreators.saveBillerDescFav({favBillForm}));
    if (isExist) {
      const state = getState();
      const targetAccountNumber = result(
        state,
        'billerDescFav.favBillForm.payeeAccNo',
        '',
      );
      const favoriteType = 'transfer';
      const bankCode = result(
        state,
        'billerDescFav.favBillForm.bank.bankCode',
        '',
      );
      const transRefNum = result(state, 'transRefNum', '');
      const tokenId = result(state, 'form.AuthenticateForm.values.otp', '');
      const targetType =
        bankCode === '153' ? 'inbanktransfer' : 'networkTransfer';
      const additional = [
        'TXID',
        'sessionCode',
        'E2EE_RANDOM',
        'tokenClient',
        'tokenServer',
        'deviceParam',
        'lang',
        'ipassport',
      ];
      const payload = {
        favoriteType,
        targetAccountNumber,
        tokenId,
        transRefNum,
        bankCode,
        targetType,
      };
      dispatch(actionCreators.showSpinner());
      return api
        .addFavBiller(payload, additional, dispatch)
        .then(() => {
          dispatch(getFavBiller());
          dispatch(getBillpayHistory());
          dispatch(getTargetAccount());
          dispatch(refreshStorageSend());
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.FAVORITE__NEW_SUCCESS, Toast.LONG);
        })
        .catch(() => {
          dispatch(actionCreators.hideSpinner());
          dispatch(NavigationActions.back());
          Toast.show(language.FAVORITE__NEW_ERROR, Toast.LONG);
          dispatch(destroy('FavoriteBillerForm'));
        });
    } else {
      const onSubmit = () => {
        const state = getState();
        const targetAccountNumber = result(
          state,
          'billerDescFav.favBillForm.payeeAccNo',
          '',
        );
        const favoriteType = 'transfer';
        const bankCode = result(
          state,
          'billerDescFav.favBillForm.bank.bankCode',
          '',
        );
        const transRefNum = result(state, 'transRefNum', '');
        const tokenId = result(state, 'form.AuthenticateForm.values.otp', '');
        const targetType =
          bankCode === '153' ? 'inbanktransfer' : 'networkTransfer';
        const additional = [
          'TXID',
          'sessionCode',
          'E2EE_RANDOM',
          'tokenClient',
          'tokenServer',
          'deviceParam',
          'lang',
          'ipassport',
        ];
        const payload = {
          favoriteType,
          targetAccountNumber,
          tokenId,
          transRefNum,
          bankCode,
          targetType,
        };
        dispatch(actionCreators.showSpinner());
        return api
          .addFavBiller(payload, additional, dispatch)
          .then(() => {
            dispatch(getFavBiller());
            dispatch(getBillpayHistory());
            dispatch(getTargetAccount());
            dispatch(refreshStorageSend());
            dispatch(actionCreators.hideSpinner());
            dispatch(NavigationActions.back());
            Toast.show(language.FAVORITE__NEW_SUCCESS, Toast.LONG);
          })
          .catch(() => {
            dispatch(actionCreators.hideSpinner());
            dispatch(NavigationActions.back());
            Toast.show(language.FAVORITE__NEW_ERROR, Toast.LONG);
            dispatch(destroy('FavoriteBillerForm'));
          });
      };
      dispatch(populateConfigData())
        .then(() => {
          const isLogin = !isEmpty(result(state, 'user', {}));
          const transferMethodType = isLogin ? '' : '1';
          const payload = middlewareUtils.prepateTransRefNumPayload(
            'transferList',
            true,
            transferMethodType,
          );
          dispatch(actionCreators.showSpinner());
          return api.getTransRefNum({...payload, smsPriority: false}, dispatch);
        })
        .then(res => {
          dispatch(actionCreators.saveTransRefNum(res.data.transRefNum));
          dispatch(actionCreators.hideSpinner());
          dispatch(
            NavigationActions.navigate({
              routeName: 'EmallEasyPin',
              params: {isOtp: true, onSubmit},
            }),
          );
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_SEND_SMS_VERIFICATION,
            ),
            Toast.LONG,
          );
        });
    }
  };
}

export function deleteFavorite(data) {
  return dispatch => {
    const merchantName =
      result(data, 'item.merchantName', '') === ''
        ? result(data, 'item.name', '')
        : result(data, 'item.merchantName', '');
    const subscriberNo =
      result(data, 'item.subscriberNo', '') === ''
        ? result(data, 'item.accountNumber', '')
        : result(data, 'item.subscriberNo', '');
    const transactionId =
      result(data, 'item.favoriteType', '') === ''
        ? result(data, 'item.id', '')
        : result(data, 'item.transactionId', '');
    const favoriteType =
      result(data, 'item.favoriteType', '') === '' ? 'transfer' : 'billPayment';
    const payload = {transactionId, favoriteType};
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const buttonYes = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      dispatch(actionCreators.showSpinner());
      return api
        .deleteFavBiller(payload, dispatch)
        .then(() => {
          dispatch(getFavBiller());
          dispatch(getBillpayHistory());
          dispatch(getTargetAccount());
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.FAVORITE__DELETE_SUCCESS, Toast.LONG);
        })
        .catch(() => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.FAVORITE__DELETE_ERROR, Toast.LONG);
        });
    };
    const sinarmasModalOptions = {
      heading1: language.FAVORITE_DEL_HEADER,
      text: merchantName + ' ' + subscriberNo,
      button1: language.GENERIC__NO,
      button2: language.GENERIC__YES,
      onButton1Press: hideAlert,
      onButton2Press: buttonYes,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function editFavorite(data) {
  return dispatch => {
    const valueData = result(data, 'item', {});
    const transactionId = result(valueData, 'transactionId', '');
    const billerId = result(valueData, 'billerId', '');
    const descriptionData = result(valueData, 'description', '');
    const subscriberNo = result(valueData, 'subscriberNo', '');
    const favoriteType = 'billPayment';
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasInputAlert());
    };
    const buttonsend = text => {
      const description = text;
      const payload = {
        transactionId,
        billerId,
        description,
        subscriberNo,
        favoriteType,
      };
      dispatch(actionCreators.hideSinarmasInputAlert());
      dispatch(actionCreators.showSpinner());
      return api
        .editFavBiller(payload, dispatch)
        .then(() => {
          dispatch(getFavBiller());
          dispatch(getBillpayHistory());
          dispatch(getTargetAccount());
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.FAVORITE__EDIT_SUCCESS, Toast.LONG);
        })
        .catch(() => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.FAVORITE__EDIT_ERROR, Toast.LONG);
        });
    };
    const sinarmasModalOptions = {
      heading1: language.FAVORITE_EDIT_ALIAS,
      text2: language.FAVORITE_TXT2,
      text3: language.FAVORITE__SUBSCRIBER_NUMBER,
      button1: language.FAVORITE__CANCEL_BUTTON,
      buttonFavBiller: language.GENERIC__OK,
      placeholder: language.HINTTEXT__ALIAS,
      onButton1Press: hideAlert,
      onButtonFavBiller: buttonsend,
      onClose: hideAlert,
      valueDesc: descriptionData,
      value3: subscriberNo,
    };
    dispatch(
      actionCreators.showSinarmasInputAlert({
        ...sinarmasModalOptions,
        input: 'EditFavouriteInput',
        textInput2: '2',
        textInput3: '3',
      }),
    );
  };
}

export function setupGenericDeeplinkPromo(typeActivation) {
  return dispatch => {
    dispatch(destroy('loginWithUsernamePassword'));
    dispatch(destroy('loginAccountForm'));
    dispatch(destroy('easyPinCreationForm'));
    dispatch(destroy('easyPinCreationConfirmForm'));
    if (typeActivation === '020') {
      dispatch(
        StackActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({routeName: 'Login'}),
            NavigationActions.navigate({routeName: 'SmartfrenTnC'}),
          ],
        }),
      );
      dispatch(destroy('GeneralLogin'));
    }
  };
}

export function couponCustomerCounting() {
  return (dispatch, getState) => {
    const state = getState();
    const transRefNum = result(state, 'transRefNum', '');
    const payload = {transRefNum};
    return api
      .getVoucherList(payload, dispatch)
      .then(res => {
        const privateVoucher = result(res, 'data.privateVoucherList', []);
        const publicVoucher = result(res, 'data.publicVoucher', []);
        const countCouponPublic = size(publicVoucher);
        const countCouponPrivate = getCountCoupon(privateVoucher);
        const grandTotal = countCouponPrivate + countCouponPublic;
        dispatch(actionCreators.saveCouponCounter(grandTotal));
      })
      .catch(() => {});
  };
}

export function getDataOrderWithoutSpinner(checkFormSplitBill) {
  return (dispatch, getState) => {
    const state = getState();
    const cifCode = String(result(state, 'user.profile.customer.cifCode', ' '));
    api
      .getDataMyOrder({}, dispatch)
      .then(res => {
        const dataOrder = result(res, 'data.myOrderVoucher', []);
        if (result(res, 'data.responseCode') === '00') {
          api
            .getGiveAway({}, dispatch)
            .then(response => {
              const giveAwayRaw = result(
                response,
                'data.simasPoin.data.dataUndian',
                [],
              );
              const giveAwayReward = filter(giveAwayRaw, {cifCode: cifCode});
              let giveAwayList = [];
              forEach(giveAwayReward, item => {
                const listPrize = result(item, 'listPrize', []);
                forEach(listPrize, prizeData => {
                  giveAwayList.push(prizeData);
                });
              });
              const finalGiveAwayList =
                middlewareUtils.selectedVoucherGiveAway(giveAwayList);
              api
                .getRewardHistory({}, dispatch)
                .then(resReward => {
                  const luckyDipRewardRaw = result(
                    resReward,
                    'data.simasPoin.data.dataUndian',
                    [],
                  );
                  const luckyDipReward = filter(luckyDipRewardRaw, item => {
                    const voucherCif = result(item, 'cifCode', '');
                    const voucherType = result(item, 'rewards.0.type', '');
                    return voucherCif === cifCode && voucherType === '2';
                  });
                  const dataVoucher =
                    middlewareUtils.selectedVoucher(luckyDipReward);
                  dispatch(
                    actionCreators.getMyOrderDataList([
                      ...finalGiveAwayList,
                      ...dataOrder,
                      ...dataVoucher,
                    ]),
                  );
                  dispatch(actionCreators.hideSpinner());
                })
                .catch(() => {
                  dispatch(
                    actionCreators.getMyOrderDataList([
                      ...finalGiveAwayList,
                      ...dataOrder,
                    ]),
                  );
                  dispatch(actionCreators.hideSpinner());
                });
            })
            .catch(() => {
              api
                .getRewardHistory({}, dispatch)
                .then(resReward => {
                  const luckyDipRewardRaw = result(
                    resReward,
                    'data.simasPoin.data.dataUndian',
                    [],
                  );
                  const luckyDipReward = filter(luckyDipRewardRaw, item => {
                    const voucherCif = result(item, 'cifCode', '');
                    const voucherType = result(item, 'rewards.0.type', '');
                    return voucherCif === cifCode && voucherType === '2';
                  });
                  const dataVoucher =
                    middlewareUtils.selectedVoucher(luckyDipReward);
                  dispatch(
                    actionCreators.getMyOrderDataList([
                      ...dataOrder,
                      ...dataVoucher,
                    ]),
                  );
                  dispatch(actionCreators.hideSpinner());
                })
                .catch(() => {
                  dispatch(actionCreators.getMyOrderDataList([...dataOrder]));
                  dispatch(actionCreators.hideSpinner());
                });
              dispatch(actionCreators.hideSpinner());
            });
        }
      })
      .catch(err => {
        api
          .getGiveAway({}, dispatch)
          .then(response => {
            const giveAwayRaw = result(
              response,
              'data.simasPoin.data.dataUndian',
              [],
            );
            const giveAwayReward = filter(giveAwayRaw, {cifCode: cifCode});
            let giveAwayList = [];
            forEach(giveAwayReward, item => {
              const listPrize = result(item, 'listPrize', []);
              forEach(listPrize, prizeData => {
                giveAwayList.push(prizeData);
              });
            });
            const finalGiveAwayList =
              middlewareUtils.selectedVoucherGiveAway(giveAwayList);
            api
              .getRewardHistory({}, dispatch)
              .then(resultHistory => {
                const luckyDipRewardRaw = result(
                  resultHistory,
                  'data.simasPoin.data.dataUndian',
                  [],
                );
                const luckyDipReward = filter(luckyDipRewardRaw, item => {
                  const voucherCif = result(item, 'cifCode', '');
                  const voucherType = result(item, 'rewards.0.type', '');
                  return voucherCif === cifCode && voucherType === '2';
                });
                const dataVoucher =
                  middlewareUtils.selectedVoucher(luckyDipReward);
                dispatch(
                  actionCreators.getMyOrderDataList([
                    ...finalGiveAwayList,
                    ...dataVoucher,
                  ]),
                );
                dispatch(actionCreators.hideSpinner());
              })
              .catch(() => {
                dispatch(actionCreators.hideSpinner());
                dispatch(
                  actionCreators.getMyOrderDataList([...finalGiveAwayList]),
                );
              });
          })
          .catch(() => {
            api
              .getRewardHistory({}, dispatch)
              .then(resultHistory => {
                const luckyDipRewardRaw = result(
                  resultHistory,
                  'data.simasPoin.data.dataUndian',
                  [],
                );
                const luckyDipReward = filter(luckyDipRewardRaw, item => {
                  const voucherCif = result(item, 'cifCode', '');
                  const voucherType = result(item, 'rewards.0.type', '');
                  return voucherCif === cifCode && voucherType === '2';
                });
                const dataVoucher =
                  middlewareUtils.selectedVoucher(luckyDipReward);
                dispatch(actionCreators.getMyOrderDataList([...dataVoucher]));
                dispatch(actionCreators.hideSpinner());
              })
              .catch(() => {
                dispatch(actionCreators.hideSpinner());
                dispatch(
                  actionCreators.getMyOrderDataList({
                    loading: false,
                    reload: true,
                  }),
                );
                if (!checkFormSplitBill) {
                  Toast.show(
                    getErrorMessage(
                      err,
                      language.ERROR_MESSAGE__POPULATE_REDEEM,
                    ),
                    Toast.LONG,
                  );
                }
              });
          });
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function clearFromdeeplinkState() {
  return dispatch => {
    dispatch(actionCreators.clearParamsLink());
    dispatch(actionCreators.deletebillerCodeDeepLink(''));
  };
}

export function luckyDrawDetailWinner() {
  return dispatch => {
    api
      .getDetailWinner({}, dispatch)
      .then(res => {
        const offer = result(res, 'data.news', {});
        dispatch(
          NavigationActions.navigate({
            routeName: 'OfferDetail',
            params: {offer: offer},
          }),
        );
      })
      .catch(() => {});
  };
}

export function confirmSendAddress(navigation) {
  return dispatch => {
    const selectedAccount = result(
      navigation,
      'state.params.selectedAccount',
      {},
    );
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToBlock = () => {
      dispatch(triggerBlockRecurring(goTothunkSendAddress));

      dispatch(actionCreators.showSpinner());
      dispatch(NavigationActions.back());
      setTimeout(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(triggerBlockRecurring(goTothunkSendAddress));
        dispatch(actionCreators.hideSinarmasAlert());
      }, 1500);
    };
    const gotoHome = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      dispatch(NavigationActions.back());
    };
    const goTothunkSendAddress = () => {
      dispatch(sendCCAddress(selectedAccount));
    };
    const sinarmasModalOptions = {
      heading1: language.DASHBOARD__CREDIT_PRINT_CARD_TITLE,
      text: language.DASHBOARD__CREDIT_PRINT_CARD_TEXT,
      button1: language.GENERIC__CANCEL,
      onButton2Press: goToBlock,
      button2: language.GENERIC__OK,
      onButton1Press: gotoHome,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function triggerCVVRecurring(showVCC) {
  return dispatch => {
    const params = {onSubmit: showVCC, isOtp: false, isEasypin: true};
    dispatch(
      triggerAuthNavigate('cvvRecurring', null, true, 'AuthDashboard', params),
    ); // null for replace billamount, absolute must easypin
  };
}

export function confirmcvv(navigation) {
  return dispatch => {
    const goTothunkSendAddress = () => {
      dispatch(showVCC(navigation));
    };
    dispatch(triggerCVVRecurring(goTothunkSendAddress));
  };
}

export function triggerPINRecurring(CreditCardManageCreatePin) {
  return dispatch => {
    const params = {
      onSubmit: CreditCardManageCreatePin,
      isOtp: false,
      isEasypin: true,
    };
    dispatch(
      triggerAuthNavigate('pinRecurring', null, true, 'AuthDashboard', params),
    ); // null for replace billamount, absolute must easypin
  };
}

export function confirmpin(selectedAccount) {
  return dispatch => {
    const goTothunkSendAddress = () => {
      dispatch(createPin(selectedAccount));
    };
    dispatch(actionCreators.showSpinner());
    dispatch(NavigationActions.back());
    setTimeout(() => {
      dispatch(NavigationActions.back());
      dispatch(actionCreators.hideSpinner());
      dispatch(triggerPINRecurring(goTothunkSendAddress));
    }, 1500);
  };
}

export function checkReleaseDeviceStatus() {
  return (dispatch, getState) => {
    const state = getState();
    const randNumCode = result(
      state,
      'releaseQR.dataQrShow.getUserDeviceDataMap.randNumCode',
      '',
    );
    const userID = String(result(state, 'user.profile.id', ''));
    const payload = {
      userID,
      randNumCode,
    };
    const releaseQR = result(state, 'releaseQR', {});
    return api
      .checkReleaseDeviceQR(payload, dispatch)
      .then(res => {
        const eligibleRelease = result(
          res,
          'data.checkReleaseQRStatusMap.isEligible',
          false,
        );
        if (eligibleRelease) {
          dispatch(
            actionCreators.saveReleaseDeviceQR({
              ...releaseQR,
              dataCheckQr: result(res, 'data', {}),
            }),
          );
        } else {
          const hideAlert = () => {
            dispatch(actionCreators.hideSinarmasAlert());
          };
          const modalOptions = {
            button1: language.BUTTON_CLOSE,
            onButton1Press: hideAlert,
            onClose: hideAlert,
            heading1: language.CHANGE_DEVICE__TOO_MANY_ATTEMPTS,
            text: language.CHANGE_DEVICE__TOO_MANY_ATTEMPTS_DETAIL,
          };
          dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
          dispatch(NavigationActions.back());
          dispatch(actionCreators.hideSpinner());
        }
      })
      .catch(err => {
        dispatch(
          actionCreators.saveReleaseDeviceQR({
            ...releaseQR,
            dataErr: result(err, 'data', {}),
          }),
        );
      });
  };
}

export function checkReleaseDeviceStatusRevamp() {
  return (dispatch, getState) => {
    const state = getState();
    const randNumCode = result(
      state,
      'releaseQR.dataQrShow.getQrCodeMap.randNumCode',
      '',
    );
    const payload = {
      randNumCode,
    };
    const releaseQR = result(state, 'releaseQR', {});
    return api
      .checkReleaseDeviceQRRevamp(payload, dispatch)
      .then(res => {
        const eligibleRelease =
          result(res, 'data.responseCode', false) !== '05';
        if (eligibleRelease) {
          dispatch(
            actionCreators.saveReleaseDeviceQR({
              ...releaseQR,
              dataCheckQr: result(res, 'data', {}),
            }),
          );
        } else {
          const hideAlert = () => {
            dispatch(actionCreators.hideSinarmasAlert());
          };
          const modalOptions = {
            button1: language.BUTTON_CLOSE,
            onButton1Press: hideAlert,
            onClose: hideAlert,
            heading1: language.CHANGE_DEVICE__TOO_MANY_ATTEMPTS,
            text: language.CHANGE_DEVICE__TOO_MANY_ATTEMPTS_DETAIL,
          };
          dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
          dispatch(NavigationActions.back());
          dispatch(actionCreators.hideSpinner());
        }
      })
      .catch(err => {
        dispatch(
          actionCreators.saveReleaseDeviceQR({
            ...releaseQR,
            dataErr: result(err, 'data', {}),
          }),
        );
      });
  };
}

export function toReleaseDeviceResult() {
  return dispatch => {
    dispatch(resetAndNavigate('Main'));
    dispatch(logoutAndReleaseDevice());
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Introduction'})],
      }),
    );
    dispatch(resetAndNavigate('ReleaseDeviceResult'));
  };
}

export const renewQR = () => dispatch => {
  dispatch(
    StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({routeName: 'HomeScreen'}),
        NavigationActions.navigate({routeName: 'AccountSettings'}),
      ],
    }),
  );
  const params = {
    onSubmit: () => {
      dispatch(saveEasypin());
      dispatch(getReleaseDeviceQRRevamp());
    },
    amount: 0,
    isOtp: false,
  };
  dispatch(triggerAuthNavigate('lkd', 0, true, 'AuthDashboard', params));
};

// New devices
export function updateReleaseDeviceQR(deviceInfo, randNumCode) {
  return dispatch => {
    const payload = {
      deviceInfo: {
        name: deviceInfo.name,
        model: deviceInfo.model,
      },
      deviceParam: deviceInfo.id,
      randNumCode,
    };

    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };

    let modalOptions = {
      button1: language.CHANGE_DEVICE__RENEW_QR,
      onButton1Press: hideAlert,
      onClose: hideAlert,
      heading1: language.CHANGE_DEVICE__SCAN_FAIL,
      text: language.CHANGE_DEVICE__READ_FAIL,
    };

    return api
      .updateReleaseDeviceQR(payload, dispatch)
      .then(res => {
        const responseCode = result(res, 'data.responseCode', '01');
        const responseMessage = result(res, 'data.responseMessage', '');
        const swar = result(res, 'data.updateReleaseQRStatusMap.swar', '');
        const mobileNumber = result(
          res,
          'data.updateReleaseQRStatusMap.mobileNumber',
          '',
        );
        const ipass = swar.substring(0, swar.length - 3);
        if (responseCode === '00') {
          getInitKeys().then(values => {
            const token_client = values[1];
            dispatch(
              StackActions.reset({
                index: 2,
                actions: [
                  NavigationActions.navigate({routeName: 'Login'}),
                  NavigationActions.navigate({routeName: 'AccountSettings'}),
                  NavigationActions.navigate({
                    routeName: 'OTPchangeDevice',
                    params: {
                      ipass,
                      isLoginChangeDevice: true,
                      mobileNumber,
                      token_client,
                      randNumCode,
                      payload,
                    },
                  }),
                ],
              }),
            );
          });
        } else {
          dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
          Toast.show(responseMessage, Toast.LONG);
          dispatch(NavigationActions.back());
        }
      })
      .catch(err => {
        const responseCode = result(err, 'data.responseCode', '01');
        const responseMessage = result(err, 'data.responseMessage', '');
        if (responseCode === '01') {
          dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
          dispatch(NavigationActions.back());
          Toast.show(responseMessage, Toast.LONG);
        } else if (responseCode === '05') {
          const modalOptions = {
            button1: language.BUTTON_CLOSE,
            onButton1Press: hideAlert,
            onClose: hideAlert,
            heading1: language.CHANGE_DEVICE__TOO_MANY_ATTEMPTS,
            text: language.CHANGE_DEVICE__TOO_MANY_ATTEMPTS_DETAIL,
          };
          dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
          dispatch(NavigationActions.back());
          Toast.show(responseMessage, Toast.LONG);
        } else {
          dispatch(NavigationActions.back());
          Toast.show(responseMessage, Toast.LONG);
        }
      });
  };
}

export function updateReleaseDeviceQRRevamp(values, deviceInfo) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    let easyPin = result(values, 'values.easyPin', '');
    const randomNumber = randomString(16);
    const randNumCode = result(values, 'randNumCode', '');
    OBM_EncryptPassword(easyPin, randomNumber);
    if (easyPin) {
      easyPin =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    }
    const payload = {
      easyPin: easyPin,
      randNumCode,
      deviceInfo: {
        name: deviceInfo.name,
        model: deviceInfo.model,
      },
      deviceParam: deviceInfo.id,
      E2EE_RANDOM: randomNumber,
    };
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };

    let modalOptions = {
      button1: language.CHANGE_DEVICE__RENEW_QR,
      onButton1Press: hideAlert,
      onClose: hideAlert,
      heading1: language.CHANGE_DEVICE__SCAN_FAIL,
      text: language.CHANGE_DEVICE__READ_FAIL,
    };

    return api
      .updateReleaseDeviceQRRevamp(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const responseCode = result(res, 'data.responseCode', '01');
        const responseMessage = result(res, 'data.responseMessage', '');
        const swar = result(res, 'data.ScanQrCodeMap.swar', '');
        const mobileNumber = result(res, 'data.ScanQrCodeMap.mobileNumber', '');
        const ipass = swar.substring(0, swar.length - 3);
        if (responseCode === '00') {
          getInitKeys().then(values => {
            dispatch(
              actionCreators.saveTransRefNum(
                result(res, 'data.ScanQrCodeMap.swar'),
              ),
            );
            const token_client = values[1];
            dispatch(
              StackActions.reset({
                index: 2,
                actions: [
                  NavigationActions.navigate({routeName: 'Login'}),
                  NavigationActions.navigate({routeName: 'AccountSettings'}),
                  NavigationActions.navigate({
                    routeName: 'OTPchangeDevice',
                    params: {
                      ipass,
                      isLoginChangeDevice: true,
                      randNumCode,
                      mobileNumber,
                      token_client,
                      payload,
                    },
                  }),
                ],
              }),
            );
          });
        } else {
          dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
          Toast.show(responseMessage, Toast.LONG);
          dispatch(NavigationActions.back());
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        const responseCode = result(err, 'data.responseCode', '01');
        const responseMessage = result(err, 'data.responseMessage', '');
        if (responseCode === '01') {
          dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
          dispatch(NavigationActions.back());
          Toast.show(responseMessage, Toast.LONG);
        } else if (responseCode === '05') {
          const modalOptions = {
            button1: language.BUTTON_CLOSE,
            onButton1Press: hideAlert,
            onClose: hideAlert,
            heading1: language.CHANGE_DEVICE__TOO_MANY_ATTEMPTS,
            text: language.CHANGE_DEVICE__TOO_MANY_ATTEMPTS_DETAIL,
          };
          dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
          dispatch(NavigationActions.back());
          Toast.show(responseMessage, Toast.LONG);
        } else {
          dispatch(NavigationActions.back());
          Toast.show(responseMessage, Toast.LONG);
        }
      });
  };
}

export function releaseDevicePopup() {
  return dispatch => {
    const hideAlert = () => {
      set(storageKeys.LOGIN_WITH_RELEASE_DEVICE, false);
      dispatch(actionCreators.hideSinarmasAlert());
    };
    releaseDeviceLogin().then(res => {
      if (res) {
        const modalOptions = {
          button1: language.BUTTON_OK,
          onButton1Press: hideAlert,
          onClose: hideAlert,
          heading1: language.CHANGE_DEVICE_SUCCESS_HEADER,
          text: language.CHANGE_DEVICE_SUCCESS,
        };
        dispatch(
          actionCreators.showSinarmasAlert({
            ...modalOptions,
            image: 'LOCKDOWN',
          }),
        );
      }
    });
  };
}

// Old devices
export function saveEasypin() {
  return (dispatch, getState) => {
    const state = getState();
    const releaseQR = result(state, 'releaseQR', {});
    const easyPin = result(
      state,
      'form.AuthenticateForm.values.easyPinPure',
      '',
    );
    dispatch(actionCreators.saveReleaseDeviceQR({...releaseQR, easyPin}));
  };
}

export function getReleaseDeviceQR(loginName, toReleaseDevice = true) {
  return (dispatch, getState) => {
    const state = getState();
    set(storageKeys.SPINNER_RELEASE_DEVICE, true);
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const transRefNum = result(state, 'transRefNum', '');
    const easyPin = result(state, 'releaseQR.easyPin', '');
    const payload = middlewareUtils.transformEasypin(
      cifCode,
      transRefNum,
      easyPin,
    );
    return api
      .getReleaseDeviceQR(payload, dispatch)
      .then(res => {
        set(storageKeys.SPINNER_RELEASE_DEVICE, false);
        const eligibleRelease = result(
          res,
          'data.getUserDeviceDataMap.isEligible',
          false,
        );
        if (eligibleRelease) {
          const releaseQR = result(state, 'releaseQR', {});
          dispatch(
            actionCreators.saveReleaseDeviceQR({
              ...releaseQR,
              dataQrShow: result(res, 'data', {}),
            }),
          );
          if (toReleaseDevice) {
            dispatch(
              StackActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({routeName: 'HomeScreen'}),
                  NavigationActions.navigate({routeName: 'AccountSettings'}),
                ],
              }),
            );
            dispatch(
              resetAndNavigate('ReleaseDeviceQR', {
                loginName: loginName,
                resData: res,
                state,
              }),
            );
          }
          dispatch(actionCreators.hideSpinner());
        } else {
          const hideAlert = () => {
            dispatch(actionCreators.hideSinarmasAlert());
          };
          const modalOptions = {
            button1: language.BUTTON_CLOSE,
            onButton1Press: hideAlert,
            onClose: hideAlert,
            heading1: language.CHANGE_DEVICE__TOO_MANY_ATTEMPTS,
            text: language.CHANGE_DEVICE__TOO_MANY_ATTEMPTS_DETAIL,
          };
          dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
          dispatch(NavigationActions.back());
          dispatch(actionCreators.hideSpinner());
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(result(err, 'data.responseMessage', ''), Toast.LONG);
      });
  };
}

export function getReleaseDeviceQRRevamp(
  loginName,
  isSearch,
  toReleaseDevice = true,
) {
  return (dispatch, getState) => {
    const state = getState();
    set(storageKeys.SPINNER_RELEASE_DEVICE, true);
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const transRefNum = result(state, 'transRefNum', '');
    const easyPin = result(state, 'releaseQR.easyPin', '');
    const payload = middlewareUtils.transformEasypin(
      cifCode,
      transRefNum,
      easyPin,
    );
    return api
      .getReleaseDeviceQRRevamp(payload, dispatch)
      .then(res => {
        set(storageKeys.SPINNER_RELEASE_DEVICE, false);
        const eligibleRelease = result(
          res,
          'data.getQrCodeMap.isEligible',
          true,
        );
        if (eligibleRelease) {
          const releaseQR = result(state, 'releaseQR', {});
          dispatch(
            actionCreators.saveReleaseDeviceQR({
              ...releaseQR,
              dataQrShow: result(res, 'data', {}),
            }),
          );
          if (toReleaseDevice) {
            dispatch(
              StackActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({
                    routeName: isSearch ? 'Landing' : 'HomeScreen',
                  }),

                  NavigationActions.navigate({
                    routeName: !isSearch ? 'AccountMenu' : 'Landing',
                  }),
                ],
              }),
            );
            dispatch(destroy('loginEasyPinFormSearch'));
            dispatch(
              resetAndNavigate('ReleaseDeviceQR', {
                loginName: loginName,
                resData: res,
                state,
              }),
            );
          }
          dispatch(actionCreators.hideSpinner());
        } else {
          const hideAlert = () => {
            dispatch(actionCreators.hideSinarmasAlert());
          };
          const modalOptions = {
            button1: language.BUTTON_CLOSE,
            onButton1Press: hideAlert,
            onClose: hideAlert,
            heading1: language.CHANGE_DEVICE__TOO_MANY_ATTEMPTS,
            text: language.CHANGE_DEVICE__TOO_MANY_ATTEMPTS_DETAIL,
          };
          dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
          dispatch(NavigationActions.back());
          dispatch(actionCreators.hideSpinner());
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        dispatch(destroy('loginEasyPinFormSearch'));
        Toast.show(result(err, 'data.responseMessage', ''), Toast.LONG);
      });
  };
}

export const tokenPaymentDeeplink = data => (dispatch, getState) => {
  const payload = {invoiceNumber: data};
  const state = getState();
  const isLogin = !isEmpty(result(state, 'user', {}));
  if (isLogin) {
    dispatch(actionCreators.showSpinner());
    return api
      .inquiryToken(payload, dispatch)
      .then(res => {
        const responseCode = result(res, 'data.responseCode', '');
        const responseMessage = result(res, 'data.responseMessage', '');

        if (responseCode === '00') {
          const data = result(res, 'data', '');
          dispatch(resetToDashboardFrom('Landing'));
          dispatch(NavigationActions.navigate({routeName: 'AccountMenu'}));
          dispatch(
            NavigationActions.navigate({
              routeName: 'TokenFormPayment',
              params: {state, data},
            }),
          );
          dispatch(actionCreators.hideSpinner());
        } else {
          dispatch(NavigationActions.navigate({routeName: 'Main'}));
          dispatch(actionCreators.hideSpinner());
          Toast.show(responseMessage, Toast.LONG);
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        const responseMessage = result(err, 'data.responseMessage', '');
        if (responseMessage === language.PUSH_BILLING__CHECK_ERROR) {
          return null;
        } else {
          Toast.show(
            getErrorMessage(
              err,
              language.REDEEM__SMARTFREN__HEADING__RESULT__ERROR,
            ),
            Toast.LONG,
          );
        }
      });
  } else {
    dispatch(checkLogin(data, 'tokenPayment'));
  }
};

export const confirmTokenPayment = data => dispatch => {
  dispatch(actionCreators.showSpinner());
  dispatch(
    NavigationActions.navigate({routeName: 'TokenFormIndex', params: {data}}),
  );
  dispatch(actionCreators.hideSpinner());
};

export const tokenPayment =
  (formVal, data, emoneyAccount, kmtr) => (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const selectedAccount = kmtr
      ? result(emoneyAccount, 'emoneyAccount', '')
      : result(formVal, 'accountNo', '');
    const accountIdEmoney = result(selectedAccount, 'id', '').toString();
    const merchName = result(data, 'merchantName', '');
    const totalAmount = result(data, 'totalAmount');
    let easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    const randomNumber = randomString(16);
    OBM_EncryptPassword(easyPin, randomNumber);
    if (easyPin) {
      easyPin =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    }
    const mPinInputed = result(state, 'form.AuthenticateForm.values.otp', '');
    const transRefNum = result(data, 'transRefNum', '');
    const invoiceNumber = result(data, 'txId', '');
    const isPushBilling = 'yes';
    const payload = {
      mPinInputed,
      invoiceNumber,
      accountId: kmtr
        ? accountIdEmoney
        : result(formVal, 'accountNo.id', '').toString(),
      transRefNum,
      easyPin,
    };
    const modalOptions = {
      merchName,
      sourceAcc: selectedAccount,
      amount: totalAmount,
      transactionType: language.TOKEN_PAYMENT,
      type: 'PENDING',
      isPushBilling,
      txId: invoiceNumber,
    };

    return api
      .tokenPayment(payload, dispatch)
      .then(res => {
        const responseCode = result(res, 'data.responseCode', '');
        const responseMessage = result(res, 'data.responseMessage', '');
        const pushBillTrfNum = result(res, 'data.transRefNum', '');
        const pushBillTransacation = result(res, 'data', {});
        if (responseCode === '00') {
          dispatch(actionCreators.hideSpinner());
          dispatch(resetToDashboardFrom('AccountMenu'));
          dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
          dispatch(
            actionCreators.showPaymentModal({
              ...modalOptions,
              type: 'SUCCESS',
              subheading: 'Sub header',
              responseMessage: responseMessage,
              isPushBilling,
              transactionId: pushBillTrfNum,
              pushBillTransacation,
            }),
          );
          dispatch(destroy('TokenFormIndex'));
          dispatch(destroy('TokenHistory'));
          dispatch(refreshStorageNew());
          dispatch(updateBalances());
          dispatch(actionCreators.clearEgiftCart());
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.hideSpinner());
        } else if (responseCode === '11') {
          dispatch(actionCreators.hideSpinner());
          dispatch(resetToDashboardFrom('AccountMenu'));
          dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
          dispatch(refreshStorageNew());
          dispatch(
            actionCreators.showPaymentModal({
              ...modalOptions,
              type: 'FAILED',
              subheading: 'Sub header',
              responseMessage: responseMessage,
              accountFrom: '123123',
              isPushBilling,
            }),
          );
          dispatch(destroy('TokenFormIndex'));
          dispatch(destroy('TokenHistory'));
          dispatch(actionCreators.clearEgiftCart());
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.hideSpinner());
        } else {
          dispatch(actionCreators.hideSpinner());
          dispatch(resetToDashboardFrom('AccountMenu'));
          dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
          dispatch(
            actionCreators.showPaymentModal({
              ...modalOptions,
              type: 'FAILED',
              subheading: 'Sub header',
              responseMessage: responseMessage,
              accountFrom: '123123',
              isPushBillingFailed: 'yes',
            }),
          );
          dispatch(destroy('TokenFormIndex'));
          dispatch(destroy('TokenHistory'));
          dispatch(refreshStorageNew());
          dispatch(updateBalances());
          dispatch(actionCreators.clearEgiftCart());
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.hideSpinner());
        }
      })
      .catch(err => {
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
        const responseMessage = result(err, 'data.responseMessage', '');
        const responseCode = result(err, 'data.responseCode', '');
        if (easyPinAttempt === 'invalid') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          if (mPinInputed !== '') {
            Toast.show(language.ERROR_MESSAGE_INVALID_SMS_PIN_TRANSACTION);
          } else {
            Toast.show(language.ERROR_MESSAGE_INVALID_EASYPIN_TRANSACTION);
          }
        } else if (easyPinAttempt === 'blocked') {
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.clearTransRefNum());
          Toast.show(language.ERROR_MESSAGE_BLOCKED_EASYPIN_TRANSACTION);
          dispatch(logout());
        } else if (easyPinAttempt === 'errHsm') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          Toast.show(language.ERROR_MESSAGE_SYSTEM_UNDER_MAINTENANCE);
        } else if (responseCode === '11') {
          dispatch(actionCreators.hideSpinner());
          dispatch(resetToDashboardFrom('AccountMenu'));
          dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
          dispatch(refreshStorageNew());
          dispatch(
            actionCreators.showPaymentModal({
              ...modalOptions,
              type: 'FAILED',
              subheading: 'Sub header',
              responseMessage: responseMessage,
              accountFrom: '123123',
              isPushBilling,
            }),
          );
          dispatch(destroy('TokenFormIndex'));
          dispatch(destroy('TokenHistory'));
          dispatch(actionCreators.clearEgiftCart());
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.hideSpinner());
        } else {
          dispatch(actionCreators.hideSpinner());
          dispatch(resetToDashboardFrom('AccountMenu'));
          dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
          dispatch(
            actionCreators.showPaymentModal({
              ...modalOptions,
              type: 'FAILED',
              subheading: 'Sub header',
              responseMessage: responseMessage,
              accountFrom: '123123',
              isPushBillingFailed: 'yes',
            }),
          );
          dispatch(destroy('TokenFormIndex'));
          dispatch(destroy('TokenHistory'));
          dispatch(actionCreators.clearEgiftCart());
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.hideSpinner());
        }
      });
  };

export const resultPayment = responseMessage => dispatch => {
  dispatch(actionCreators.clearEgiftCart());
  dispatch(actionCreators.clearTransRefNum());
  dispatch(actionCreators.hideSpinner());
  Toast.show(responseMessage, Toast.LONG);
};

export function tokenPaymentDetail(data) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const payload = {invoiceNumber: data};
    return api
      .inquiryToken(payload, dispatch)
      .then(res => {
        const responseCode = result(res, 'data.responseCode', '');
        const responseMessage = result(res, 'data.responseMessage', '');
        if (responseCode === '00') {
          const data = result(res, 'data', '');
          dispatch(
            NavigationActions.navigate({
              routeName: 'TokenFormPayment',
              params: {state, data},
            }),
          );
          dispatch(actionCreators.hideSpinner());
        } else {
          dispatch(actionCreators.hideSpinner());
          Toast.show(responseMessage, Toast.LONG);
        }
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(language.TOKEN_PAYMENT_EXPIRED), Toast.LONG);
      });
  };
}

export function expiredInvoice(formatDate) {
  return (dispatch, getState) => {
    const state = getState();
    const serverTime = result(state, 'config.serverTime', '');
    const expiredDate = new Date(formatDate);
    const dateGap = moment(serverTime).format('DD MMM YYYY');
    const gapTime = new Date(expiredDate.setDate(expiredDate.getDate() + 7));
    const diff = moment(gapTime).diff(moment(dateGap));
    const timeLeft = moment.duration(diff).days();

    if (timeLeft !== 0) {
      const hideAlert = () => {
        dispatch(actionCreators.hideSinarmasAlert());
      };
      const sinarmasModalOptions = {
        heading1: language.TOKEN_BILL_EXPIRED_TITLE,
        text:
          language.TOKEN_BILL_EXPIRED_BODY +
          timeLeft +
          language.TOKEN_BILL_EXPIRED_BODY_DAYS,
        button1: language.GENERIC__OK,
        onButton1Press: hideAlert,
        onClose: hideAlert,
        closeOnTouchOutside: false,
      };
      dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
    }
  };
}

export const tokenInvoiceHistory = () => (dispatch, getState) => {
  const state = getState();
  dispatch(actionCreators.showSpinner());
  const cifCode = result(state, 'user.profile.customer.cifCode', '');
  const payload = {cifCode};
  api
    .incompleteInvoice(payload, dispatch)
    .then(res => {
      const data = result(res, 'data.invoiceList', '');
      dispatch(
        NavigationActions.navigate({
          routeName: 'TokenHistory',
          params: {data: data},
        }),
      );
      dispatch(actionCreators.hideSpinner());
    })
    .catch(err => {
      Toast.show(err.responseMessage, Toast.LONG);
    });
};

export const getMerchantList = () => dispatch => {
  dispatch(actionCreators.showSpinner());
  const payload = {};
  return api
    .getPartnerList(payload, dispatch)
    .then(res => {
      const data = result(res, 'data.dataStatus', '');
      const responseCode = result(data, 'responseCode', '');
      const partnerList = result(data, 'partnerList', []);
      if (responseCode === '00') {
        dispatch(actionCreators.savePartnerList(partnerList));
        dispatch(actionCreators.hideSpinner());
      } else {
        dispatch(actionCreators.hideSpinner());
      }
    })
    .catch(err => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(err.responseMessage, Toast.LONG);
    });
};

export function triggerunlinkMerchant(unlinkSelectedMerchant) {
  return dispatch => {
    const params = {
      onSubmit: unlinkSelectedMerchant,
      amount: '',
      isOtp: false,
      isEasypin: true,
    };
    const currentAmount = 0;
    dispatch(
      triggerAuthNavigate(
        'unlinkMerchant',
        currentAmount,
        false,
        'Auth',
        params,
      ),
    ); // null for replace billamount, absolute must easypin
  };
}

export function unlinkMerchant(data) {
  return dispatch => {
    const partnerName = result(data, 'partnerName', '');
    const accToken = result(data, 'accToken', '');
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToDelete = () => {
      dispatch(triggerunlinkMerchant(goToUnlinkMerchant));
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToUnlinkMerchant = () => {
      dispatch(unlinkSelectedMerchant(accToken));
    };
    const sinarmasModalOptions = {
      heading1: language.PUSH_INVOICE_UNLINK_CONFIRMATION,
      text: language.PUSH_INVOICE_DISCCONET_EMONEY1,
      text1: language.PUSH_INVOICE_DISCCONET_EMONEY2,
      text2: partnerName,
      button1: language.PUSH_INVOICE_NOTSURE,
      onButton1Press: hideAlert,
      button1Color: 'red',
      button2: language.PUSH_INVOICE_SURE,
      onButton2Press: goToDelete,
      onClose: hideAlert,
      image: 'unlinkMerchant',
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function unlinkSelectedMerchant(accToken) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    const payload = {accToken};
    return api
      .unlinkPartner(payload, dispatch)
      .then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.back());
        dispatch(getMerchantList());
        const hideAlert = () => {
          dispatch(actionCreators.hideSinarmasAlert());
        };
        const sinarmasModalOptions = {
          heading1: language.PUSH_INVOICE_CONGRATS,
          text: language.PUSH_INVOICE_SUCCESS_UNLINK,
          button1: language.FEEDBACK__RATING_3,
          onButton1Press: hideAlert,
          button1Color: 'red',
          onClose: hideAlert,
          image: 'successUnlink',
        };
        dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        const errorMessage = getErrorMessage(
          err,
          language.RECURRING__TIME_OUT_OR_NO_DATA,
        );
        Toast.show(errorMessage, Toast.LONG);
      });
  };
}

export const wrapDispatchMethodInFunction =
  (method, ...args) =>
  dispatch =>
    wrapMethodInFunction(dispatch, method(...args));

export function sendTrackingFivePointTwo() {
  return (dispatch, getState) => {
    const state = getState();
    const cif = String(result(state, 'user.profile.customer.cifCode', ' '));
    const userType = '1';
    const mSsid = ' ';
    const mBssid = ' ';
    const mCapabilities = ' ';
    const mVenueName = ' ';
    const mChannelWidth = ' ';
    const mOperatorFriendlyName = ' ';
    const requestData = {
      cif,
      userType,
      mBssid,
      mSsid,
      mCapabilities,
      mChannelWidth,
      mOperatorFriendlyName,
      mVenueName,
    };
    const targetUrl = '5.1';
    const payload = {requestData, targetUrl, type: 'post'};
    return api
      .apiGeneral(payload, dispatch)
      .then(() => {})
      .catch(() => {});
  };
}

export function sendTrackingFivePointThree() {
  return (dispatch, getState) => {
    const state = getState();
    const cif = String(result(state, 'user.profile.customer.cifCode', ' '));
    const rawAppsData = result(state, 'listAPPuser', []);
    const platformType = Platform.OS;
    const phoneOs = Platform.Version.toString();
    let model = DeviceInfo.getModel();
    const version = VersionNumber.appVersion;
    const contents = middlewareUtils.getListAppInstalled(
      rawAppsData,
      platformType,
    );
    const requestData = {
      contents,
      platform: platformType,
      cif,
      phoneModel: model,
      phoneOs,
      version,
    };
    const targetUrl = '5.2';
    const payload = {requestData, targetUrl, type: 'post'};
    return api
      .apiGeneral(payload, dispatch)
      .then(() => {})
      .catch(() => {});
  };
}

export function sendTrackingFivePointFour() {
  return (dispatch, getState) => {
    const state = getState();
    const cif = String(result(state, 'user.profile.customer.cifCode', ' '));
    const userType = '1';
    const mapType = 'google'; // google or etc
    const targetUrl = '5.3';
    Geolocation.getCurrentPosition(info => {
      const lat = result(info, 'coords.latitude', '0').toString();
      const lot = result(info, 'coords.longitude', '0').toString();
      const requestData = {cif, lat, lot, userType, mapType};
      const payload = {requestData, targetUrl, type: 'post'};
      return api
        .apiGeneral(payload, dispatch)
        .then(() => {})
        .catch(() => {});
    });
  };
}

export function sendTrackingFivePointFive(eventCodeRaw = ' ') {
  // 5.4
  return (dispatch, getState) => {
    const state = getState();
    const cif = String(result(state, 'user.profile.customer.cifCode', ' '));
    const mobile =
      DeviceInfo.getPhoneNumber() === undefined
        ? 'not have sim card'
        : DeviceInfo.getPhoneNumber();
    const bankCard = ' ';
    const eventCode = eventCodeRaw;
    const platformType = Platform.OS === 'android' ? '2' : '1';
    const deviceId = DeviceInfo.getDeviceId();
    const userChannel = ' ';
    const triggerTime = moment().format('YYYY-MM-DD');
    const isDelete = '0';
    const version = VersionNumber.appVersion;
    const remark = 'note';
    const requestData = {
      cif,
      mobile,
      bankCard,
      eventCode,
      platformType,
      deviceId,
      userChannel,
      triggerTime,
      isDelete,
      version,
      remark,
    };
    const targetUrl = '5.4';
    const payload = {requestData, targetUrl, type: 'post'};
    return api
      .apiGeneral(payload, dispatch)
      .then(() => {})
      .catch(() => {});
  };
}

export function getContactForLoan() {
  return dispatch => {
    if (Platform.OS === 'android') {
      dispatch(getPermissionAndroidandGetContact());
    } else {
      dispatch(getPermissionIosandGetContact());
    }
  };
}

export function getPermissionAndroidandGetContact() {
  // aka 2.10
  return (dispatch, getState) => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
      .then(status => {
        if ([PermissionsAndroid.RESULTS.GRANTED, true].includes(status)) {
          Contacts.getAll((err, contacts) => {
            if (err === 'denied') {
              Toast.show(language.PERMISSION_ERROR__CONTACTS, Toast.LONG);
            } else {
              const state = getState();
              const cif = String(
                result(state, 'user.profile.customer.cifCode', ' '),
              );
              const allContactRaw = middlewareUtils.getListPhone(contacts);
              let idContacts = [];
              const customContacts = filter(allContactRaw, obj => {
                filter(obj, obj2 => {
                  idContacts.push(obj2);
                });
              });
              const content = [...idContacts, ...customContacts];
              const requestIp = result(state, 'ipAddress', ' ');
              const deviceId = DeviceInfo.getDeviceId();
              const requestData = {deviceId, requestIp, cif, content};
              const targetUrl = '2.10';
              const payload = {requestData, targetUrl, type: 'post'};
              return api
                .apiGeneral(payload, dispatch)
                .then(() => {
                  dispatch(actionCreators.hideSpinner());
                })
                .catch(() => {
                  dispatch(actionCreators.hideSpinner());
                });
            }
          });
        }
      })
      .catch(() => {});
  };
}

export function getPermissionIosandGetContact() {
  // aka 2.10
  return (dispatch, getState) => {
    Contacts.getAll((err, contacts) => {
      if (err) {
        throw err;
      } else {
        const state = getState();
        const cif = String(result(state, 'user.profile.customer.cifCode', ' '));
        const allContactRaw = middlewareUtils.getListPhone(contacts);
        let idContacts = [];
        const customContacts = filter(allContactRaw, obj => {
          filter(obj, obj2 => {
            idContacts.push(obj2);
          });
        });
        const content = [...idContacts, ...customContacts];
        const requestIp = result(state, 'ipAddress', ' ');
        const deviceId = DeviceInfo.getDeviceId();
        const requestData = {deviceId, requestIp, cif, content};
        const targetUrl = '2.10';
        const payload = {requestData, targetUrl, type: 'post'};
        return api
          .apiGeneral(payload, dispatch)
          .then(() => {})
          .catch(() => {
            dispatch(actionCreators.hideSpinner());
          });
      }
    });
  };
}

// export function getInstalledApp () {
//   return (dispatch) => {
//     if (Platform.OS === 'android') {
//       dispatch(getInstalledAppInAndroid());
//     } else {
//       dispatch(getInstalledAppInIOS());
//     }
//   };
// }

// export function getInstalledAppInIOS () {
//   return (dispatch) => {
//     GetAppList.getAll((apps) => {
//       dispatch(actionCreators.saveAppList(apps));
//       dispatch(sendTrackingFivePointThree());
//     });
//   };
// }

// export function getInstalledAppInAndroid () {
//   return (dispatch) => {
//     GetAppList.getNonSystemApps().
//       then((apps) => {
//         dispatch(actionCreators.saveAppList(apps));
//         dispatch(sendTrackingFivePointThree());
//       }).
//       catch(() => {
//       });
//   };
// }

// export function sendTrackingFourPointOne () {
//   return (dispatch, getState) => {
//     const state = getState();
//     const cif = String(result(state, 'user.profile.customer.cifCode', ''));
//     const version = VersionNumber.appVersion;
//     const requestData = {cif, version};
//     const targetUrl = '4.1';
//     const payload = {requestData, targetUrl, type: 'post'};
//     return api.apiGeneral(payload, dispatch).then((res) => {
//       const response = result(res, 'data.data.status', '').toString();
//       if (response === '0') {
//         dispatch(sendTrackingFourPointThree());
//       } else if (response === '1') {
//         dispatch(NavigationActions.navigate({routeName: 'RetakeSelfiePage'}));
//       }
//     }).catch((err) => {
//       const easyPinAttempt = result(err, 'data.easypinAttempt', '');
//       if (easyPinAttempt === 'invalid') {
//         dispatch(actionCreators.hideSpinner());
//         dispatch(reset('AuthenticateForm'));
//         Toast.show(language.ERROR_MESSAGE_INVALID_EASYPIN_TRANSACTION);
//       } else if (easyPinAttempt === 'blocked') {
//         dispatch(actionCreators.hideSpinner());
//         dispatch(actionCreators.clearTransRefNum());
//         Toast.show(language.ERROR_MESSAGE_BLOCKED_EASYPIN_TRANSACTION);
//         dispatch(logout());
//       } else {
//         dispatch(actionCreators.hideSpinner());
//         Toast.show((result(err, 'data.responseMessage', '')), Toast.LONG);
//       }
//     });
//   };
// }

// export const wrapDispatchMethodInFunction = (method, ...args) => (dispatch) => wrapMethodInFunction(dispatch, method(...args));

export function getDistrictList(formName, fieldName) {
  return (dispatch, getState) => {
    const state = getState();
    const formValues = state.form[`${formName}`].values;
    const code = formValues[`${fieldName}`].value || '';
    if (code === '') {
      return Promise.resolve();
    } else {
      dispatch(actionCreators.showSpinner());
      const payload = {mode: 'district', code};
      return api
        .locationUpgradeKyc(payload, dispatch)
        .then(res => {
          const districtList = sortBy(
            result(res, 'data.data.district', []),
            'name',
          );
          dispatch(actionCreators.saveDistrictList(districtList));
          dispatch(actionCreators.hideSpinner());
        })
        .catch(error => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(error, language.APP_ERROR__TITLE),
            Toast.LONG,
          );
        });
    }
  };
}

export function getSubDistrictList(formName, fieldName) {
  return (dispatch, getState) => {
    const state = getState();
    const formValues = state.form[`${formName}`].values;
    const code = formValues[`${fieldName}`].code || '';
    if (code === '') {
      return Promise.resolve();
    } else {
      dispatch(actionCreators.showSpinner());
      const payload = {mode: 'subDistrict', code};
      return api
        .locationUpgradeKyc(payload, dispatch)
        .then(res => {
          const subDistrictList = sortBy(
            result(res, 'data.data.subDistrict', []),
            'name',
          );
          dispatch(actionCreators.saveSubDistrictList(subDistrictList));
          dispatch(actionCreators.hideSpinner());
        })
        .catch(error => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(error, language.APP_ERROR__TITLE),
            Toast.LONG,
          );
        });
    }
  };
}

export function deeplinkCatcher() {
  return (dispatch, getState) => {
    // to use this function please add listener and remove listener corresponding the page that you want add deeplink
    const state = getState();
    const allOffers = result(state, 'promos.offers', []);
    const clickedOffer = find(allOffers, {offerID: {}});
    const offers = getAllOffersExcept(clickedOffer, allOffers);
    const isDeeplinkExist = result(state, 'isDeeplinkExist', '');

    Linking.getInitialURL()
      .then(url => {
        if (url && isDeeplinkExist !== 'yes') {
          Linking.canOpenURL(url).then(supported => {
            if (supported) {
              DeepLinking.evaluateUrl(url);
            }
          });
        }
      })
      .catch(err => err);
    DeepLinking.addScheme('https://');
    DeepLinking.addScheme('http://');
    DeepLinking.addScheme('smbplus://');
    DeepLinking.addScheme('simobiplus://');
    DeepLinking.addRoute(
      '/www.banksinarmas.com/PersonalBanking/:activation/:token',
      ({activation, token}) => {
        const tokenEmail = transformToken(token);
        const typeActivation = transformToken(activation);
        dispatch(checkLoginEmoney(tokenEmail, typeActivation));
      },
    );

    // uncomment bellow comment if smartfren active
    // DeepLinking.addRoute('/www.banksinarmas.com/PersonalBanking/:activation', ({activation}) => {
    //   const typeActivation = transformToken(activation);
    //   if (typeActivation === '020') {
    //     dispatch(checkLoginForDeeplinkPromo(typeActivation));
    //   }
    // });

    DeepLinking.addRoute(
      '/www.banksinarmas.com/PersonalBanking/Billpayment/:idbiller',
      ({idbiller}) => {
        const tokenIdbiller = transformToken(idbiller);
        dispatch(checkLogin(tokenIdbiller));
      },
    );
    // deeplink with some parameter 'params' method ex = /?email=example@gmail.com|name=BSIM|phoneNumber=01234
    DeepLinking.addRoute(
      '/www.banksinarmas.com/PersonalBanking/Billpayment/:params/:idbiller',
      ({params, idbiller}) => {
        const tokenIdbiller = transformToken(idbiller);
        const paramsDeeplink = transformTokenSpecialChar(params);
        dispatch(checkLogin(tokenIdbiller, null, paramsDeeplink));
      },
    );
    DeepLinking.addRoute(
      '/www.banksinarmas.com/PersonalBanking/AllSegment/:typeLockdown/:pathRoute',
      ({typeLockdown, pathRoute}) => {
        const typeLockdownDevice = transformToken(typeLockdown);
        const pathRouteFlow = transformToken(pathRoute);
        dispatch(checkLoginAllsegmentFlow(typeLockdownDevice, pathRouteFlow));
      },
    );
    DeepLinking.addRoute('/www.simobi.com/migrate/:id', ({id}) => {
      dispatch(
        StackActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({routeName: 'Landing'}),
            NavigationActions.navigate({
              routeName: 'MigrateLandingPage',
              params: {id: id},
            }),
          ],
        }),
      );
    });
    DeepLinking.addRoute(
      '/www.banksinarmas.com/PersonalBanking/:activation/:token/:referral/:cccode',
      ({activation, token, referral, cccode}) => {
        const tokenEmail = transformToken(token);
        const typeActivation = transformToken(activation);
        const referralCode = transformToken(referral);
        const ccCodereform = transformToken(cccode);
        if (typeActivation === '011') {
          dispatch(
            checkLoginCC(
              tokenEmail,
              typeActivation,
              referralCode,
              ccCodereform,
            ),
          );
        }
      },
    );
    DeepLinking.addRoute('/migrate/:id', ({id}) =>
      this.props.menageresetDevice(id),
    );
    setTimeout(() => {
      if (isEmpty(offers)) {
        dispatch(populateOffersPrivate());
      }
    }, 500);
    // deeplink orami saving with referral code, code orami saving '021'
    DeepLinking.addRoute(
      '/www.banksinarmas.com/PersonalBanking/:activation/:username/:referralCode/:emailOrami/:hpNumber',
      ({activation, username, referralCode, emailOrami, hpNumber}) => {
        const referralCodeOrami = transformToken(referralCode);
        const typeActivation = transformToken(activation);
        const usernameOrami = transformToken(username);
        const emailUser = transformToken(emailOrami);
        const handphoneNumber = transformToken(hpNumber);
        if (typeActivation === '021') {
          dispatch(
            checkLoginSaving(
              referralCodeOrami,
              typeActivation,
              usernameOrami,
              emailUser,
              handphoneNumber,
            ),
          );
        }
      },
    );
    DeepLinking.addRoute(
      '/www.banksinarmas.com/PersonalBanking/AllSegment/:typeLockdown/:pathRoute/:utm/:code/:referralCode/:activation',
      ({typeLockdown, pathRoute, utm, code, referralCode, activation}) => {
        const rawtypeActivation = transformToken(activation);
        const typeActivation = transformTokenIos(rawtypeActivation);
        const typeUtm = transformToken(utm);
        const typeCode = transformToken(code);
        const typereferralCode = transformToken(referralCode);
        const typeLockdownDevice = transformToken(typeLockdown);
        const pathRouteFlow = transformToken(pathRoute);
        dispatch(
          checkLoginAllsegmentFlow(
            typeLockdownDevice,
            pathRouteFlow,
            typeActivation,
            typeUtm,
            typeCode,
            typereferralCode,
          ),
        );
      },
    );
  };
}

export function inbankList() {
  return (dispatch, getState) => {
    let status = 'loading';
    dispatch(actionCreators.savePayeeStatus(status));
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const additional = isLogin ? ['ipassport'] : ['tokenClient', 'tokenServer'];
    const payload = isLogin ? {} : {transferMethodType: '1'};
    return api
      .getTargetAccount(payload, additional, dispatch)
      .then(res => {
        if (!isEmpty(res.data)) {
          dispatch(actionCreators.clearPayeeStatus());
          status = 'success';
          dispatch(actionCreators.savePayeeStatus(status));
          const data = [...res.data.inbankTransferList];
          dispatch(
            actionCreators.updatePayees(
              middlewareUtils.getPayees(res.data, data),
            ),
          );
          dispatch(
            actionCreators.saveInbankTransferList(res.data.inbankTransferList),
          );
        } else {
          throw Error('');
        }
      })
      .catch(() => {
        const status = 'error';
        dispatch(actionCreators.savePayeeStatus(status));
      });
  };
}

export function getTargetAccount() {
  return (dispatch, getState) => {
    let status = 'loading';
    dispatch(actionCreators.savePayeeStatus(status));
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const additional = isLogin ? ['ipassport'] : ['tokenClient', 'tokenServer'];
    const payload = isLogin ? {} : {transferMethodType: '1'};
    return api
      .getTargetAccount(payload, additional, dispatch)
      .then(res => {
        if (!isEmpty(res.data)) {
          dispatch(actionCreators.clearPayeeStatus());
          status = 'success';
          dispatch(actionCreators.savePayeeStatus(status));
          const data = [
            ...res.data.inbankTransferList,
            ...res.data.networkTransferList,
            ...res.data.sknTransferList,
          ];
          dispatch(
            actionCreators.updatePayees(
              middlewareUtils.getPayees(res.data, data),
            ),
          );
          dispatch(
            actionCreators.saveCardlessWithdrawalTransferList(
              res.data.cardlessWithdrawalTransferList,
            ),
          );
        } else {
          throw Error('');
        }
      })
      .catch(() => {
        const status = 'error';
        dispatch(actionCreators.savePayeeStatus(status));
        // Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
      });
  };
}

export function goToSearchAlfacart() {
  return dispatch => {
    dispatch(NavigationActions.navigate({routeName: 'SearchAlfacartPage'}));
    dispatch(actionCreators.deletePaginationSearchAlfa());
    dispatch(actionCreators.deleteSearchallProductAlfa());
  };
}

export function popUpActivate(
  accName,
  accountNo,
  idCard,
  cardNo,
  contractCard,
  bankBranchName,
  nameFull,
  nameProductCard,
  uriImg,
) {
  return (dispatch, getState) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToNext = () => {
      dispatch(triggerActivateCard(goTothunkActivateCard));
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goTothunkActivateCard = () => {
      dispatch(activeCard());
    };
    const activeCard = () => {
      const stateActive = getState();
      const accountNumber = accountNo;
      const state = 'active';
      const tokenId = result(
        stateActive,
        'form.AuthenticateForm.values.otp',
        '',
      );
      const branchName = bankBranchName;
      const payload = {accountNumber, state, tokenId, branchName};
      dispatch(actionCreators.showSpinner());
      return api
        .getActivationCard(payload, dispatch)
        .then(() => {
          dispatch(actionCreators.hideSpinner());
          const status = 'Inactive';
          const payload = {status};
          dispatch(actionCreators.showSpinner());
          return api
            .getInquiryCardInfo(payload, dispatch)
            .then(res => {
              const data = result(res, 'data.card', []);
              const lang = result(stateActive, 'currentLanguage.id', 'id');
              dispatch(actionCreators.saveInquiryCardInfo(res.data.card));
              dispatch(actionCreators.hideSpinner());
              dispatch(
                StackActions.reset({
                  index: 1,
                  actions: [
                    NavigationActions.navigate({routeName: 'AccountMenu'}),
                    NavigationActions.navigate({
                      routeName: 'ActiveList',
                      params: {data},
                    }),
                  ],
                }),
              );
              if (lang === 'en') {
                const sinarmasModalOptions = {
                  heading1: language.POPUP_CONGRATULATION_HEADING,
                  text:
                    'Your' +
                    ' ' +
                    accName +
                    '\n' +
                    'ATM Card' +
                    '\n' +
                    language.POPUP__TEXT_WITH_ACC_NO +
                    ' ' +
                    accountNo +
                    '\n' +
                    language.POPUP__TEXT_HAS_BEEN_ACTIVATED,
                  button1: 'OK!',
                  onButton1Press: hideAlert,
                  onClose: hideAlert,
                };
                dispatch(
                  actionCreators.showSinarmasAlert({
                    ...sinarmasModalOptions,
                    image: 'CONGRATS',
                    uriImage,
                  }),
                );
              } else if (lang === 'id') {
                const sinarmasModalOptions = {
                  heading1: language.POPUP_CONGRATULATION_HEADING,
                  text:
                    'Kartu ATM' +
                    ' ' +
                    accName +
                    ' ' +
                    'Anda' +
                    '\n' +
                    language.POPUP__TEXT_WITH_ACC_NO +
                    ' ' +
                    accountNo +
                    '\n' +
                    language.POPUP__TEXT_HAS_BEEN_ACTIVATED,
                  button1: 'OK!',
                  onButton1Press: hideAlert,
                  onClose: hideAlert,
                };
                dispatch(
                  actionCreators.showSinarmasAlert({
                    ...sinarmasModalOptions,
                    image: 'CONGRATS',
                    uriImage,
                  }),
                );
              }
            })
            .catch(err => {
              dispatch(actionCreators.hideSpinner());
              Toast.show(
                getErrorMessage(err, language.MANAGE_ATM__ALERT_TIMEOUT),
                Toast.LONG,
              );
            });
        })
        .catch(err => {
          const easyPinAttempt = result(err, 'data.easypinAttempt', '');
          if (easyPinAttempt === 'invalid') {
            dispatch(actionCreators.hideSpinner());
            dispatch(reset('AuthenticateForm'));
            Toast.show(language.ERROR_MESSAGE_INVALID_SMS_PIN_MANAGE_ATM_CARD);
          } else if (easyPinAttempt === 'blocked') {
            dispatch(actionCreators.hideSpinner());
            Toast.show(language.ERROR_MESSAGE_BLOCKED_SMS_PIN_MANAGE_ATM_CARD);
            dispatch(logout());
          } else {
            dispatch(actionCreators.hideSpinner());
            dispatch(reset('AuthenticateForm'));
            Toast.show(
              getErrorMessage(err, language.MANAGE_ATM__ALERT_TIMEOUT),
              Toast.LONG,
            );
          }
        });
    };
    const lang = result(getState(), 'currentLanguage.id', 'id');
    const uriImage = uriImg;
    if (lang === 'en') {
      const sinarmasModalOptions = {
        heading1: language.POPUP_ARE_YOU_SURE_HEADING,
        text:
          language.POPUP_ACTIVATE_TEXT +
          ' ' +
          accName +
          '\n' +
          'ATM Card' +
          '\n' +
          language.POPUP__TEXT_WITH_ACC_NO +
          ' ' +
          accountNo,
        button1: language.POPUP_NOT_SURE,
        onButton1Press: hideAlert,
        button2: language.POP_UP_IM_SURE,
        onButton2Press: goToNext,
        onClose: hideAlert,
      };
      dispatch(
        actionCreators.showSinarmasAlert({
          ...sinarmasModalOptions,
          image: 'ACTIVEATM',
          uriImage,
        }),
      );
    } else if (lang === 'id') {
      const sinarmasModalOptions = {
        heading1: language.POPUP_ARE_YOU_SURE_HEADING,
        text:
          language.POPUP_ACTIVATE_TEXT +
          ' ' +
          'Kartu ATM' +
          '\n' +
          accName +
          '\n' +
          language.POPUP__TEXT_WITH_ACC_NO +
          ' ' +
          accountNo,
        button1: language.POPUP_NOT_SURE,
        onButton1Press: hideAlert,
        button2: language.POP_UP_IM_SURE,
        onButton2Press: goToNext,
        onClose: hideAlert,
      };
      dispatch(
        actionCreators.showSinarmasAlert({
          ...sinarmasModalOptions,
          image: 'ACTIVEATM',
          uriImage,
        }),
      );
    }
  };
}

export function triggerActivateCard(data) {
  return dispatch => {
    const params = {onSubmit: data, amount: '', isOtp: true, isEasypin: false};
    const currentAmount = 0;
    dispatch(
      triggerAuthNavigate(
        'activeCard',
        currentAmount,
        false,
        'AuthDashboard',
        params,
      ),
    ); // null for replace billamount, absolute must easypin
  };
}

export function popUpBlocked(
  accName,
  accountNo,
  idCard,
  cardNo,
  contractCard,
  bankBranchName,
  nameFull,
  nameProductCard,
  uriImg,
) {
  return (dispatch, getState) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToNext = () => {
      dispatch(triggerBlockCard(goTothunkBlockCard));
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goTothunkBlockCard = () => {
      dispatch(blockCard());
    };
    const blockCard = () => {
      const stateBlock = getState();
      const accountNumber = accountNo;
      const state = 'permanent blocked by client';
      const branchName = bankBranchName;
      const payload = {accountNumber, state, branchName};
      dispatch(actionCreators.showSpinner());
      return api
        .getActivationCard(payload, dispatch)
        .then(() => {
          dispatch(actionCreators.hideSpinner());
          const status = 'Active';
          const payload = {status};
          dispatch(actionCreators.showSpinner());
          return api
            .getInquiryCardInfo(payload, dispatch)
            .then(res => {
              const data = result(res, 'data.card', []);
              const lang = result(stateBlock, 'currentLanguage.id', 'id');
              dispatch(actionCreators.saveInquiryCardInfo(res.data.card));
              dispatch(actionCreators.hideSpinner());
              dispatch(
                StackActions.reset({
                  index: 1,
                  actions: [
                    NavigationActions.navigate({routeName: 'AccountMenu'}),
                    NavigationActions.navigate({
                      routeName: 'BlockList',
                      params: {data},
                    }),
                  ],
                }),
              );
              if (lang === 'en') {
                const sinarmasModalOptions = {
                  heading1: language.POPUP_CONGRATULATION_BLOCK_HEADING,
                  text:
                    'Your' +
                    ' ' +
                    accName +
                    '\n' +
                    'ATM Card' +
                    '\n' +
                    language.POPUP__TEXT_WITH_ACC_NO +
                    ' ' +
                    accountNo +
                    '\n' +
                    language.POPUP__TEXT_HAS_BEEN_BLOCKED,
                  button1: 'OK!',
                  onButton1Press: hideAlert,
                  onClose: hideAlert,
                };
                dispatch(
                  actionCreators.showSinarmasAlert({
                    ...sinarmasModalOptions,
                    image: 'CONGRATS',
                    uriImage,
                  }),
                );
              } else if (lang === 'id') {
                const sinarmasModalOptions = {
                  heading1: language.POPUP_CONGRATULATION_BLOCK_HEADING,
                  text:
                    'Kartu ATM' +
                    ' ' +
                    accName +
                    ' ' +
                    'Anda' +
                    '\n' +
                    language.POPUP__TEXT_WITH_ACC_NO +
                    ' ' +
                    accountNo +
                    '\n' +
                    language.POPUP__TEXT_HAS_BEEN_BLOCKED,
                  button1: 'OK!',
                  onButton1Press: hideAlert,
                  onClose: hideAlert,
                };
                dispatch(
                  actionCreators.showSinarmasAlert({
                    ...sinarmasModalOptions,
                    image: 'CONGRATS',
                    uriImage,
                  }),
                );
              }
            })
            .catch(err => {
              dispatch(actionCreators.hideSpinner());
              Toast.show(
                getErrorMessage(err, language.MANAGE_ATM__ALERT_TIMEOUT),
                Toast.LONG,
              );
            });
        })
        .catch(err => {
          const easyPinAttempt = result(err, 'data.easypinAttempt', '');
          if (easyPinAttempt === 'invalid') {
            dispatch(actionCreators.hideSpinner());
            dispatch(reset('AuthenticateForm'));
            Toast.show(language.ERROR_MESSAGE_INVALID_EASYPIN_TRANSACTION);
          } else if (easyPinAttempt === 'blocked') {
            dispatch(actionCreators.hideSpinner());
            Toast.show(language.ERROR_MESSAGE_BLOCKED_EASYPIN_TRANSACTION);
            dispatch(logout());
          } else {
            dispatch(actionCreators.hideSpinner());
            dispatch(reset('AuthenticateForm'));
            Toast.show(
              getErrorMessage(err, language.MANAGE_ATM__ALERT_TIMEOUT),
              Toast.LONG,
            );
          }
        });
    };
    const lang = result(getState(), 'currentLanguage.id', 'id');
    const uriImage = uriImg;
    if (lang === 'en') {
      const sinarmasModalOptions = {
        heading1: language.POPUP_ARE_YOU_SURE_HEADING,
        text:
          language.POPUP_BLOCKING_TEXT +
          ' ' +
          accName +
          '\n' +
          'ATM Card' +
          '\n' +
          language.POPUP__TEXT_WITH_ACC_NO +
          ' ' +
          accountNo,
        button1: language.POPUP_NOT_SURE,
        onButton1Press: hideAlert,
        button2: language.POP_UP_IM_SURE,
        onButton2Press: goToNext,
        onClose: hideAlert,
      };
      dispatch(
        actionCreators.showSinarmasAlert({
          ...sinarmasModalOptions,
          image: 'BLOCKATM',
          uriImage,
        }),
      );
    } else if (lang === 'id') {
      const sinarmasModalOptions = {
        heading1: language.POPUP_ARE_YOU_SURE_HEADING,
        text:
          language.POPUP_BLOCKING_TEXT +
          ' ' +
          'Kartu ATM' +
          '\n' +
          accName +
          '\n' +
          language.POPUP__TEXT_WITH_ACC_NO +
          ' ' +
          accountNo,
        button1: language.POPUP_NOT_SURE,
        onButton1Press: hideAlert,
        button2: language.POP_UP_IM_SURE,
        onButton2Press: goToNext,
        onClose: hideAlert,
      };
      dispatch(
        actionCreators.showSinarmasAlert({
          ...sinarmasModalOptions,
          image: 'BLOCKATM',
          uriImage,
        }),
      );
    }
  };
}

export function triggerBlockCard(data) {
  return dispatch => {
    const params = {onSubmit: data, isOtp: false, isEasypin: true};
    dispatch(
      triggerAuthNavigate('blockCard', null, false, 'AuthDashboard', params),
    ); // null for replace billamount, absolute must easypin
  };
}

export function offerOpeningAccount() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const gotoOpenAccount = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      dispatch(NavigationActions.navigate({routeName: 'ProductsList'}));
    };
    const modalOptions = {
      button1: language.SET_AUTODEBIT_OPENACCOUNT_BUTTON,
      onButton1Press: gotoOpenAccount,
      onClose: hideAlert,
      heading1: language.SET_AUTODEBIT_OPENACCOUNT_TITLE,
      text: language.SET_AUTODEBIT_OPENACCOUNT_SUBTITLE,
    };
    dispatch(
      actionCreators.showSinarmasAlert({
        ...modalOptions,
        image: 'information_alert',
      }),
    );
  };
}

// get toogle audebit second Account after emoney
// temporary Disable
export function getToogleAutoDebitAccount() {
  return dispatch =>
    getTooglePrimaryAccount()
      .then(res => {
        const defaultToogle = result(res, 'defaultToogle', false);
        if (defaultToogle === true) {
          dispatch(actionCreators.savePrimaryAccountToogle());
        } else {
          dispatch(actionCreators.deletePrimaryAccountToogle());
        }
      })
      .catch(() => {
        // Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__GET_DATA));
      });
}

export function setToogleAutoDebitAccount(value) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const accountList = result(state, 'accounts', []);
    const valueId = result(value, 'targetId', '');
    const toogleCheck = result(value, 'toogleCheck', false);
    const findIdAccount = find(accountList, function (accountDetail) {
      return result(accountDetail, 'id') === valueId;
    });
    const isDefaultFound =
      lowerCase(result(findIdAccount, 'isDefaultAccount', '')) === 'yes';

    if (isDefaultFound && toogleCheck) {
      dispatch(NavigationActions.back());
      Toast.show(language.SET_AUTODEBIT_SWITCH_ON, Toast.LONG);
      dispatch(actionCreators.hideSpinner());
      dispatch(actionCreators.savePrimaryAccountToogle());
      set(storageKeys.TOOGLE_PRIMARY_ACCOUNT, {defaultToogle: toogleCheck});
    } else if (!isDefaultFound && toogleCheck) {
      dispatch(actionCreators.showSpinner());
      return api
        .setDefaultAccount({accountId: valueId, isDefault: 'YES'}, dispatch)
        .then(() => {
          dispatch(actionCreators.savePrimaryAccountToogle());
          set(storageKeys.TOOGLE_PRIMARY_ACCOUNT, {
            defaultToogle: toogleCheck,
          });
          dispatch(NavigationActions.back());
          Toast.show(language.SET_AUTODEBIT_SWITCH_ON, Toast.LONG);
          dispatch(refreshStorageNew()).then(() => {
            dispatch(actionCreators.hideSpinner());
          });
        })
        .catch(() => {
          dispatch(actionCreators.hideSpinner());
          Toast.show('failed to set Auto Debit');
        });
    } else {
      dispatch(actionCreators.hideSpinner());
      dispatch(NavigationActions.back());
      Toast.show(language.SET_AUTODEBIT_SWITCH_OFF, Toast.LONG);
      set(storageKeys.TOOGLE_PRIMARY_ACCOUNT, {defaultToogle: toogleCheck});
      dispatch(actionCreators.deletePrimaryAccountToogle());
    }
  };
}

export function getProvinceList() {
  return (dispatch, getState) => {
    const state = getState();
    const provinceListReducer = result(state, 'provinceList', []);
    if (isEmpty(provinceListReducer)) {
      dispatch(actionCreators.showSpinner());
      const payload = {mode: 'province'};
      return api
        .getProvinceList(payload, dispatch)
        .then(res => {
          const provinceList = sortBy(
            result(res, 'data.data.provinsi', []),
            'name',
          );
          dispatch(actionCreators.saveProvinceList(provinceList));
          dispatch(actionCreators.hideSpinner());
        })
        .catch(error => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(error, language.APP_ERROR__TITLE),
            Toast.LONG,
          );
        });
    } else {
      return Promise.resolve();
    }
  };
}

export function getCityList(formName, fieldName) {
  return (dispatch, getState) => {
    const state = getState();
    const formValues = result(state.form[`${formName}`], 'values', {});
    const code = result(formValues[`${fieldName}`], 'code', '') || '';
    if (code === '') {
      return Promise.resolve();
    } else {
      dispatch(actionCreators.showSpinner());
      const payload = {mode: 'city', code};
      return api
        .getCityList(payload, dispatch)
        .then(res => {
          const cityList = sortBy(result(res, 'data.data.city', []), 'name');
          dispatch(actionCreators.saveCityList(cityList));
          dispatch(actionCreators.hideSpinner());
        })
        .catch(error => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(error, language.APP_ERROR__TITLE),
            Toast.LONG,
          );
        });
    }
  };
}

export function getListDistrict(formName, fieldName) {
  return (dispatch, getState) => {
    const state = getState();
    const formValues = state.form[`${formName}`].values;
    const code = formValues[`${fieldName}`].code || '';
    if (code === '') {
      return Promise.resolve();
    } else {
      dispatch(actionCreators.showSpinner());
      const payload = {mode: 'district', code};
      return api
        .getDistrictList(payload, dispatch)
        .then(res => {
          const districtList = sortBy(
            result(res, 'data.data.district', []),
            'name',
          );
          dispatch(actionCreators.saveDistrictList(districtList));
          dispatch(actionCreators.hideSpinner());
        })
        .catch(error => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(error, language.APP_ERROR__TITLE),
            Toast.LONG,
          );
        });
    }
  };
}

export function getListSubDistrict(formName, fieldName) {
  return (dispatch, getState) => {
    const state = getState();
    const formValues = state.form[`${formName}`].values;
    const code = formValues[`${fieldName}`].code || '';
    if (code === '') {
      return Promise.resolve();
    } else {
      dispatch(actionCreators.showSpinner());
      const payload = {mode: 'subDistrict', code};
      return api
        .getSubDistrictList(payload, dispatch)
        .then(res => {
          const subDistrictList = sortBy(
            result(res, 'data.data.subDistrict', []),
            'name',
          );
          dispatch(actionCreators.saveSubDistrictList(subDistrictList));
          dispatch(actionCreators.hideSpinner());
        })
        .catch(error => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(error, language.APP_ERROR__TITLE),
            Toast.LONG,
          );
        });
    }
  };
}

export function getEgiftMostData() {
  return dispatch => {
    getEgiftMost()
      .then(response => {
        if (isEmpty(response)) {
          const payload = {};
          return api
            .getEgiftMost(payload, dispatch)
            .then(res => {
              const data = res.data.egiftListByConstructList;
              dispatch(actionCreators.saveEgiftMost(data));
              set(storageKeys.EGIFT_MOST_DATA, data).catch(err => {
                Toast.show(
                  getErrorMessage(
                    err,
                    language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
                  ),
                  Toast.LONG,
                );
              });
            })
            .catch(() => {
              // Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
            });
        } else {
          const data = response;
          dispatch(actionCreators.saveEgiftMost(data));
        }
      })
      .catch(() => {});
  };
}

export function getValas() {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    return api
      .getListValas({}, dispatch)
      .then(res => {
        const valasList = result(res, 'data.currencyRateList', []);
        isEmpty(valasList)
          ? null
          : dispatch(actionCreators.saveCurrencyRates(valasList));

        dispatch(actionCreators.hideSpinner());
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function getDatacacheLuckydip() {
  return dispatch =>
    getLastLuckyDipTicket()
      .then(res => {
        dispatch(actionCreators.getSaveLuckyDipBox(res));
      })
      .catch(err => {
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__GET_DATA));
      });
}

export function getCache() {
  return dispatch => {
    api
      .getCacheData({}, dispatch)
      .then(res => {
        getConfigVersion()
          .then(response => {
            const configSaved = response;
            const configIncoming = result(
              res,
              'data.configVersion',
              0,
            ).toString();
            dispatch(actionCreators.saveConfigCache(configIncoming));
            if (
              isEmpty(response) === true ||
              (configSaved !== configIncoming) === true
            ) {
              const isReload = true;
              dispatch(populateOffersPrivate(isReload));
              dispatch(populateConfigDataReload(isReload));
              set(storageKeys.CONFIG_VERSION, configIncoming).catch(err => {
                Toast.show(
                  getErrorMessage(
                    err,
                    language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
                  ),
                  Toast.LONG,
                );
              });
            } else {
              dispatch(populateOffersCache());
              dispatch(populateConfigData());
            }
          })
          .catch(() => {});
      })
      .catch(() => {});
  };
}

export function getCreditCardBalance(id) {
  return dispatch => {
    const payload = middlewareUtils.prepareCreditCardBalance(id);
    dispatch(actionCreators.showSpinner());
    return api
      .getCreditCard(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const resData = res.data;
        const balances = result(resData, 'balances', {});
        const availableBalance = find(balances, [
          'amountType',
          'Available Balance',
        ]);
        dispatch(actionCreators.saveCcAvailableBalance({id, availableBalance}));
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_GET_CC_DETAIL),
          Toast.LONG,
        );
      });
  };
}

export function checkBalanceAddAtm() {
  return (dispatch, getState) => {
    const state = getState();
    const accNo = result(
      state,
      'form.AddNewAtmChooseSavings.values.accountNo.accNo',
      '',
    );
    const payload = {accNo};
    if (!isEmpty(accNo)) {
      dispatch(actionCreators.showSpinner());
      return api
        .checkBalanceAddAtm(payload, dispatch)
        .then(res => {
          const dataBalanceInsufficient = parseFloat(
            result(res, 'data.availableBalanceInsufficient', 0),
          );
          const dataBalance = parseFloat(
            result(res, 'data.AvailableBalance', 0),
          );
          const minBalance = parseFloat(result(res, 'data.MinimumBalance', 0));
          dispatch(
            change(
              'AddNewAtmChooseSavings',
              'AvailableBalance',
              dataBalanceInsufficient,
            ),
          );
          dispatch(
            change('AddNewAtmChooseSavings', 'AvailableBalance', dataBalance),
          );
          dispatch(
            change('AddNewAtmChooseSavings', 'MinimumBalance', minBalance),
          );
          dispatch(actionCreators.hideSpinner());
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(err, language.APP_ERROR__TITLE),
            Toast.LONG,
          );
        });
    }
  };
}

export function getCustomerDetailAddAtm() {
  return (dispatch, getState) => {
    const lang = result(getState(), 'currentLanguage.id', 'id');
    const minBalance = result(
      getState(),
      'form.AddNewAtmChooseSavings.values.MinimumBalance',
      '',
    );
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToNext = () => {
      dispatch(getAlamat());
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const getAlamat = () => {
      const state = getState();
      const cifCode = result(state, 'user.profile.customer.cifCode', '');
      const payload = {cifCode};
      dispatch(actionCreators.showSpinner());
      return api
        .getCustomerDetailAddAtm(payload, dispatch)
        .then(res => {
          const data = result(res, 'data', {});
          dispatch(actionCreators.saveInquiryCardInfo(res.data));
          dispatch(actionCreators.hideSpinner());
          dispatch(
            NavigationActions.navigate({
              routeName: 'AddNewAtmCardChooseAddress',
              params: {data},
            }),
          );
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(err, language.APP_ERROR__TITLE),
            Toast.LONG,
          );
        });
    };
    if (lang === 'en') {
      const sinarmasModalOptions = {
        heading1: language.POPUP_ARE_YOU_SURE_HEADING,
        text:
          language.POPUP__TEXT_ADD_NEW_CARD1 +
          currencyFormatter(minBalance) +
          ' ' +
          language.POPUP__TEXT_ADD_NEW_CARD2,
        button1: language.CGV__MODAL_BACK,
        onButton1Press: goToNext,
        onClose: hideAlert,
      };
      dispatch(
        actionCreators.showSinarmasAlert({
          ...sinarmasModalOptions,
          image: 'REQUESTATMCARD',
        }),
      );
    } else if (lang === 'id') {
      const sinarmasModalOptions = {
        heading1: language.POPUP_ARE_YOU_SURE_HEADING,
        text:
          language.POPUP__TEXT_ADD_NEW_CARD1 +
          currencyFormatter(minBalance) +
          ' ' +
          language.POPUP__TEXT_ADD_NEW_CARD2,
        button1: language.CGV__MODAL_BACK,
        onButton1Press: goToNext,
        onClose: hideAlert,
      };
      dispatch(
        actionCreators.showSinarmasAlert({
          ...sinarmasModalOptions,
          image: 'REQUESTATMCARD',
        }),
      );
    }
  };
}

export function popUpRadioButtonAddressAddNewAtm() {
  return (dispatch, getState) => {
    const lang = result(getState(), 'currentLanguage.id', 'id');
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    if (lang === 'en') {
      const sinarmasModalOptions = {
        heading1: language.ADD_NEW_ATM_HEADING_POPUP_INFORMATION,
        text: language.POPUP__TEXT_WARNING_CHOOSE_ALAMAT_ADD_NEW_ATM,
        button1: language.ADD_NEW_ATM_BUTTON_POPUP_UNDERSTAND,
        onButton1Press: hideAlert,
        onClose: hideAlert,
      };
      dispatch(
        actionCreators.showSinarmasAlert({
          ...sinarmasModalOptions,
          image: 'WARNING_DETAIL_ALAMAT_ADDNEWATM',
        }),
      );
    } else if (lang === 'id') {
      const sinarmasModalOptions = {
        heading1: language.ADD_NEW_ATM_HEADING_POPUP_INFORMATION,
        text: language.POPUP__TEXT_WARNING_CHOOSE_ALAMAT_ADD_NEW_ATM,
        button1: language.ADD_NEW_ATM_BUTTON_POPUP_UNDERSTAND,
        onButton1Press: hideAlert,
        onClose: hideAlert,
      };
      dispatch(
        actionCreators.showSinarmasAlert({
          ...sinarmasModalOptions,
          image: 'WARNING_DETAIL_ALAMAT_ADDNEWATM',
        }),
      );
    }
  };
}

export function getLinkingCard() {
  return (dispatch, getState) => {
    const stateForm = getState();
    const state = 'add card';
    const accountNumber = result(
      stateForm,
      'form.AddNewAtmChooseSavings.values.accountNo.accNo',
      '',
    );
    const productType = result(
      stateForm,
      'form.AddNewAtmChooseSavings.values.accountNo.productType',
      '',
    );
    const branchCode = result(
      stateForm,
      'form.AddNewAtmChooseSavings.values.accountNo.branchCode',
      '',
    );
    const branchName = result(
      stateForm,
      'form.AddNewAtmChooseSavings.values.accountNo.branchName',
      '',
    );
    const accountTypeCode = result(
      stateForm,
      'form.AddNewAtmChooseSavings.values.accountNo.accountTypeCode',
      '',
    );
    const mailingAdress =
      result(
        stateForm,
        'form.AddNewAtmCardChooseAddress.values.deliveryMode.currentLengkap',
        '',
      ) ||
      result(
        stateForm,
        'form.AddNewAtmCardChooseAddress.values.deliveryMode.ktpLengkap',
        '',
      );
    const tokenId = result(stateForm, 'form.AuthenticateForm.values.otp', '');
    const embossedName = result(
      stateForm,
      'form.AddNewAtmCardConfirmation.values.embossedName',
      '',
    );
    const payload = {
      state,
      accountNumber,
      productType,
      branchCode,
      branchName,
      accountTypeCode,
      mailingAdress,
      tokenId,
      embossedName,
    };
    dispatch(actionCreators.showSpinner());
    return api
      .getLinkingCard(payload, dispatch)
      .then(res => {
        const responseCode = result(res, 'data.responseCode', '99');
        const transactionId = result(res, 'data.transactionId', '');
        const errMsg = result(res, 'data.responseMessage', '');
        if (responseCode === '00') {
          dispatch(actionCreators.hideSpinner());
          dispatch(refreshStorageNew());
          dispatch(destroy('AddNewAtmChooseSavings'));
          dispatch(destroy('AddNewAtmCardChooseAddress'));
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'AccountMenu'}),
                NavigationActions.navigate({
                  routeName: 'AddNewAtmSuccessScreen',
                  params: {
                    transactionId: transactionId,
                    isSuccess: 'yes',
                    productType: productType,
                    accountNumber: accountNumber,
                  },
                }),
              ],
            }),
          );
        } else {
          dispatch(actionCreators.hideSpinner());
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'AccountMenu'}),
                NavigationActions.navigate({
                  routeName: 'AddNewAtmSuccessScreen',
                  params: {
                    transactionId: transactionId,
                    isSuccess: 'no',
                    errMsg: errMsg,
                  },
                }),
              ],
            }),
          );
        }
      })
      .catch(err => {
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
        const transactionId = result(err, 'data.transactionId', '');
        const errMsg = result(err, 'data.responseMessage', '');
        if (easyPinAttempt === 'invalid') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          Toast.show(language.ERROR_MESSAGE_INVALID_SMS_PIN_MANAGE_ATM_CARD);
        } else if (easyPinAttempt === 'blocked') {
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.ERROR_MESSAGE_BLOCKED_SMS_PIN_MANAGE_ATM_CARD);
          dispatch(logout());
        } else {
          dispatch(actionCreators.hideSpinner());
          dispatch(destroy('AddNewAtmChooseSavings'));
          dispatch(destroy('AddNewAtmCardChooseAddress'));
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'AccountMenu'}),
                NavigationActions.navigate({
                  routeName: 'AddNewAtmSuccessScreen',
                  params: {
                    transactionId: transactionId,
                    isSuccess: 'no',
                    errMsg: errMsg,
                  },
                }),
              ],
            }),
          );
        }
      });
  };
}

export function getStateDefault() {
  return (dispatch, getState) => {
    const state = getState();
    return state;
  };
}

export function getallAccbeforelogin() {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    getAlldefaultAccount()
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.updateAccounts(res));
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
      });
  };
}
export function getDataKeyVCC() {
  return dispatch => {
    const key = 'private';
    const payload = {key};
    return api
      .getKeyVCC(payload, dispatch)
      .then(res => {
        const dataKey = result(res, 'data.privateKey.privateKey', '');
        rsa.setPrivateString(dataKey);
        dispatch(actionCreators.hideSpinner());
      })
      .catch(() => {});
  };
}

export function createIDBilling(biller) {
  return dispatch => {
    dispatch(
      NavigationActions.navigate({
        routeName: 'IdBillingFormOne',
        params: {biller},
      }),
    );
  };
}

export function getDataSetoran(kodePajak, haveNpwp) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const additional = isLogin ? ['ipassport'] : ['tokenClient', 'tokenServer'];
    const payload = {
      code: kodePajak,
      isBeforeLogin: !isLogin,
      isNpwp: haveNpwp,
    };
    return api
      .getJenisSetoran(payload, additional, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const depositType = result(res, 'data.jenisSetoran.list', []);
        dispatch(actionCreators.saveEtaxDeposit(depositType));
      })
      .catch(err => {
        const errMessage = result(err, 'data.Errmsg', '');
        dispatch(actionCreators.hideSpinner());
        Toast.show(errMessage, Toast.LONG);
      });
  };
}

export function getExchangeCurrency(
  currencyRemmitance,
  currencyAccountFrom,
  accountFrom,
) {
  return (dispatch, getState) => {
    const state = getState();
    const amount = result(state, 'form.remittanceTransfer.values.amount', '');
    const transRefNum = result(state, 'transRefNum', '');
    const user = result(state, 'user.profile', {});
    const accountList = result(state, 'accounts', []);
    const profileScope = {userLogin: user, customer: accountList};
    const payload = {
      transRefNum,
      profileScope,
      amount,
      currencyRemmitance,
      currencyAccountFrom,
      accountFrom,
    };
    dispatch(actionCreators.showSpinner());
    return api
      .exchangeCurrency(payload, dispatch)
      .then(res => {
        const totalAmountView = result(res, 'data.totalAmountView', '');
        const getConvertAmountFee = result(res, 'data.getConvertAmountFee', {});
        const totalAmount = result(res, 'data.totalAmount', '');
        const getConvertAmountTransaction = result(
          res,
          'data.getConvertAmountTransaction',
          {},
        );
        const currencyAccountFrom = result(res, 'data.currencyAccountFrom', '');
        const currencyRemmitance = result(res, 'data.currencyRemmitance', '');
        const customerSpread = result(res, 'data.customerSpread', '');
        const listCurrency = result(res, 'data.listCurrency', []);
        const totalAmountDebit = result(res, 'data.totalAmountDebit', '');
        const amountInBaseCurrency = result(
          res,
          'data.amountInBaseCurrency',
          '',
        );
        const dataExchangeCurrency = {
          totalAmountView,
          getConvertAmountFee,
          totalAmount,
          getConvertAmountTransaction,
          currencyAccountFrom,
          currencyRemmitance,
          customerSpread,
          listCurrency,
          totalAmountDebit,
          amountInBaseCurrency,
        };
        isEmpty(dataExchangeCurrency)
          ? null
          : dispatch(actionCreators.saveExchangeCurrency(dataExchangeCurrency));
        dispatch(actionCreators.hideSpinner());
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function triggerAddLimit(
  transactionId,
  amount,
  isOwnAccount = false,
  routeName = '',
  params = {},
  checkRefNum = false,
  isbillerOtp,
) {
  // This function decides based on amount whether to get OTP or not (useful to handle case of EasyPin)
  return (dispatch, getState) => {
    const tokenConfig = result(getState(), 'config.tokenConfig', []);
    const shouldSendSmsOtp =
      getTransactionType(amount, tokenConfig, isOwnAccount) === '0';
    return dispatch(
      getTransRefNumAndOTPNavigate(
        transactionId,
        shouldSendSmsOtp,
        routeName,
        params,
        isOwnAccount,
        checkRefNum,
        false,
        isbillerOtp,
      ),
    );
  };
}

export function triggerEditLimit(
  transactionId,
  amount,
  isOwnAccount = false,
  routeName = '',
  params = {},
  checkRefNum = false,
  isbillerOtp,
  payeeName,
  payeeNumber,
) {
  // This function decides based on amount whether to get OTP or not (useful to handle case of EasyPin)
  return (dispatch, getState) => {
    const tokenConfig = result(getState(), 'config.tokenConfig', []);
    const shouldSendSmsOtp =
      getTransactionType(amount, tokenConfig, isOwnAccount) === '0';
    return dispatch(
      getTransRefNumAndOTPNavigate(
        transactionId,
        shouldSendSmsOtp,
        routeName,
        params,
        isOwnAccount,
        checkRefNum,
        false,
        isbillerOtp,
        payeeName,
        payeeNumber,
      ),
    );
  };
}

export function easyPinLimitTransaction() {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const transRefNum = result(state, 'transRefNum');
    let easyPin = result(
      state,
      'form.SetLimitEasyPin.values.easyPinsetLimit',
      '',
    );
    const randomNumber = randomString(16);
    OBM_EncryptPassword(easyPin, randomNumber);
    if (easyPin) {
      easyPin =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    }
    const mPinInputed = result(state, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(
      state,
      'form.AuthenticateForm.values.simasToken',
      '',
    );
    const ipassport = result(getState(), 'user.ipassport', '');
    const limitPerDay = result(
      state,
      'setLimitTransactionAdd.payload.payload.limitPerDay',
      '',
    );
    const limitPerTransaction = result(
      state,
      'setLimitTransactionAdd.payload.payload.limitPerTransaction',
      '',
    );
    const debitAccountNumber = result(
      state,
      'setLimitTransactionAdd.payload.payload.debitAccountNumber',
      '',
    );
    const debitAccountName = result(
      state,
      'setLimitTransactionAdd.payload.payload.debitAccountName',
      '',
    );
    const creditAccountNumber = result(
      state,
      'setLimitTransactionAdd.payload.payload.creditAccountNumber',
      '',
    );
    const creditAccountName = result(
      state,
      'setLimitTransactionAdd.payload.payload.creditAccountName',
      '',
    );
    const lang = result(state, 'currentLanguage.id', 'en');
    const payload = {
      easyPin,
      transRefNum,
      simasToken,
      ipassport,
      creditAccountNumber,
      debitAccountNumber,
      limitPerDay,
      limitPerTransaction,
      lang,
      mPinInputed,
      creditAccountName,
      debitAccountName,
    };
    return api
      .addLimitTransaction(payload, dispatch)
      .then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate());
        dispatch(listSetLimitTransaction());
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({
                routeName: 'HomeScreen',
              }),
              NavigationActions.navigate({routeName: 'HighValue'}),
            ],
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_SEND_SMS_VERIFICATION,
          ),
          Toast.LONG,
        );
      });
  };
}

export function deleteSelectedList(formValues, uriImg) {
  return (dispatch, getState) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };

    const state = getState();
    const goDelete = () => {
      const ipassport = result(getState(), 'user.ipassport', '');
      const lang = result(state, 'currentLanguage.id', 'en');
      const limitId = result(formValues, 'id', {});
      const payload = {limitId, ipassport, lang};
      dispatch(actionCreators.hideSinarmasAlert());
      return api
        .deleteLimitTransaction(payload, dispatch)
        .then(() => {
          dispatch(listSetLimitTransaction());
          dispatch(inbankList()).then(() => {
            Toast.show(language.SET_LIMIT__DELETE_SUCCESS);
          });
        })
        .catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_DELETE_SET_LIMIT,
            ),
            Toast.LONG,
          );
        });
    };
    const uriImage = uriImg;
    const sinarmasModalOptions = {
      heading1: language.DELETE_WORDING1,
      text: language.DELETE_WORDING2,
      button1: language.GENERIC__NO,
      onButton1Press: hideAlert,
      button2: language.GENERIC__YES,
      onButton2Press: goDelete,
      onClose: hideAlert,
    };
    dispatch(
      actionCreators.showSinarmasAlert({
        ...sinarmasModalOptions,
        image: 'DELETE',
        uriImage,
      }),
    );
  };
}

export function listSetLimitTransaction() {
  return (dispatch, getState) => {
    const state = getState();
    const ipassport = result(getState(), 'user.ipassport', '');
    const lang = result(state, 'currentLanguage.id', 'en');
    const payload = {ipassport, lang};
    return api
      .listLimitTransaction(payload, dispatch)
      .then(res => {
        const listLimit = result(res, 'data.listLimit', []);
        dispatch(actionCreators.listLimit(listLimit));
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT,
          ),
        );
      });
  };
}
export function listSetLimitTransactionAccPage() {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const ipassport = result(getState(), 'user.ipassport', '');
    const lang = result(state, 'currentLanguage.id', 'en');
    const payload = {ipassport, lang};
    return api
      .listLimitTransaction(payload, dispatch)
      .then(res => {
        const listLimit = result(res, 'data.listLimit', []);
        dispatch(actionCreators.listLimit(listLimit));
        dispatch(NavigationActions.navigate({routeName: 'HighValue'}));
        dispatch(actionCreators.hideSpinner());
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT,
          ),
        );
      });
  };
}

export function editSelectedList(formValues) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    const mPinInputed = '123456';
    const ipassport = result(getState(), 'user.ipassport', '');
    const lang = result(state, 'currentLanguage.id', 'en');
    const limitId = result(formValues, 'id', {});
    const creditAccountNumber = result(formValues, 'creditAccount', {});
    const name = result(formValues, 'name', {});
    const debitAccountNumber = result(formValues, 'debitAccount', {});
    const debitAccountName = result(formValues, 'debitAccountName', {});
    const limitPerDay = result(formValues, 'maximumLimitPerDay', {});
    const limitPerTransaction = result(formValues, 'maximumLimit', {});
    const payload = {
      ipassport,
      lang,
      debitAccountNumber,
      debitAccountName,
      creditAccountNumber,
      limitPerDay,
      limitPerTransaction,
      limitId,
      name,
      mPinInputed,
      easyPin,
    };
    dispatch(actionCreators.saveEditLimitTransaction({payload}));
    dispatch(NavigationActions.navigate({routeName: 'SetLimitEdit'}));
    dispatch(actionCreators.hideSpinner());
  };
}

export function goToEditSetLimitTransaction() {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const transRefNum = result(state, 'transRefNum');
    let easyPin = result(
      state,
      'form.SetLimitEasyPin.values.easyPinsetLimit',
      '',
    );
    const randomNumber = randomString(16);
    OBM_EncryptPassword(easyPin, randomNumber);
    if (easyPin) {
      easyPin =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    }
    const mPinInputed = result(state, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(
      state,
      'form.AuthenticateForm.values.simasToken',
      '',
    );
    const ipassport = result(getState(), 'user.ipassport', '');
    const debitAccountNumber = result(
      state,
      'setLimitTransactionEdit.payload.debitAccountNumber',
      '',
    );
    const debitAccountName = result(
      state,
      'setLimitTransactionEdit.payload.debitAccountName',
      '',
    );
    const creditAccountNumber = result(
      state,
      'setLimitTransactionEdit.payload.creditAccountNumber',
      '',
    );
    const creditAccountName = result(
      state,
      'setLimitTransactionEdit.payload.name',
      '',
    );
    const limitPerDay = result(
      state,
      'form.autoFilledSetLimit.values.limitPerDay',
      0,
    ).toString();
    const limitPerTransaction = result(
      state,
      'form.autoFilledSetLimit.values.limitPerTransaction',
      0,
    ).toString();
    const limitId = result(
      state,
      'setLimitTransactionEdit.payload.limitId',
      '',
    );
    const lang = result(state, 'currentLanguage.id', 'en');
    const payload = {
      easyPin,
      transRefNum,
      simasToken,
      ipassport,
      creditAccountNumber,
      debitAccountNumber,
      limitPerDay,
      limitPerTransaction,
      lang,
      mPinInputed,
      creditAccountName,
      debitAccountName,
      limitId,
    };
    return api
      .editLimitTransaction(payload, dispatch)
      .then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate());
        dispatch(listSetLimitTransaction());
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({
                routeName: 'HomeScreen',
              }),
              NavigationActions.navigate({routeName: 'HighValue'}),
            ],
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_SEND_SMS_VERIFICATION,
          ),
          Toast.LONG,
        );
      });
  };
}

export function getTargetAccountRemittance() {
  return (dispatch, getState) => {
    let status = 'loading';
    dispatch(actionCreators.savePayeeStatusRemittance(status));
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const additional = isLogin ? ['ipassport'] : ['tokenClient', 'tokenServer'];
    const payload = isLogin ? {} : {transferMethodType: '1'};
    return api
      .getTargetAccountRemittance(payload, additional, dispatch)
      .then(res => {
        if (!isEmpty(res.data)) {
          dispatch(actionCreators.clearPayeeStatusRemittance());
          status = 'success';
          dispatch(actionCreators.savePayeeStatusRemittance(status));
          const data = [...res.data.historyTransactionMap];
          dispatch(
            actionCreators.updatePayeesRemittance(
              middlewareUtils.getPayeesRemittance(res.data, data),
            ),
          );
          // dispatch(actionCreators.saveCardlessWithdrawalTransferList(res.data.cardlessWithdrawalTransferList));
        } else {
          throw Error('');
        }
      })
      .catch(() => {
        const status = 'error';
        dispatch(actionCreators.savePayeeStatusRemittance(status));
        // Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
      });
  };
}
export function setInternetBankingSettings(allow) {
  return (dispatch, getState) => {
    const state = getState();
    const serverToken = result(state, 'appInitKeys.tokenServer', {});
    const sessionId = result(state, 'additionalApiPayload.sessionCode', {});
    const payload = middlewareUtils.prepareAllowIB({
      serverToken,
      sessionId,
      allow,
    });
    dispatch(actionCreators.showSpinner());
    return api
      .setAllowInternetBanking(payload, dispatch)
      .then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.showSpinner());
        return api
          .getAllowInternetBanking(dispatch)
          .then(response => {
            dispatch(actionCreators.saveAccountIB(response.data));
            setTimeout(() => {
              dispatch(NavigationActions.back());
              dispatch(actionCreators.hideSpinner());
            }, 1000);
          })
          .catch(() => {});
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE_INTERNET_BANKING),
        );
      });
  };
}

export function goToEditSetLimitFundTransferConfirm() {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const transRefNum = result(state, 'transRefNum');
    let easyPin = result(
      state,
      'form.SetLimitEasyPinEditFund.values.easyPinsetLimit',
      '',
    );
    const randomNumber = randomString(16);
    OBM_EncryptPassword(easyPin, randomNumber);
    if (easyPin) {
      easyPin =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    }
    const mPinInputed = result(state, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(
      state,
      'form.AuthenticateForm.values.simasToken',
      '',
    );
    const ipassport = result(getState(), 'user.ipassport', '');
    const debitAccountNumber = result(
      state,
      'setLimitTransactionEdit.payload.debitAccountNumber',
      '',
    );
    const debitAccountName = result(
      state,
      'setLimitTransactionEdit.payload.debitAccountName',
      '',
    );
    const creditAccountNumber = result(
      state,
      'setLimitTransactionEdit.payload.creditAccountNumber',
      '',
    );
    const creditAccountName = result(
      state,
      'setLimitTransactionEdit.payload.name',
      '',
    );
    const limitPerDay = result(
      state,
      'form.autoFilledSetLimitConfirm.values.limitPerDay',
      0,
    ).toString();
    const limitPerTransaction = result(
      state,
      'form.autoFilledSetLimitConfirm.values.limitPerTransaction',
      0,
    ).toString();
    const limitId = result(
      state,
      'setLimitTransactionEdit.payload.limitId',
      '',
    );
    const lang = result(state, 'currentLanguage.id', 'en');
    const payload = {
      easyPin,
      transRefNum,
      simasToken,
      ipassport,
      creditAccountNumber,
      debitAccountNumber,
      limitPerDay,
      limitPerTransaction,
      lang,
      mPinInputed,
      creditAccountName,
      debitAccountName,
      limitId,
    };
    return api
      .editLimitTransaction(payload, dispatch)
      .then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate());
        dispatch(
          StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: 'FundTransferPaymentSetLimit',
              }),
            ],
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_SEND_SMS_VERIFICATION,
          ),
          Toast.LONG,
        );
      });
  };
}

export function storageSetLimitFundTransfer(formValues) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    const limitId = result(formValues, 'id', {});
    const creditAccountNumber = result(formValues, 'creditAccount', {});
    const name = result(formValues, 'name', {});
    const debitAccountNumber = result(formValues, 'debitAccount', {});
    const debitAccountName = result(formValues, 'debitAccountName', {});
    const limitPerDay = result(formValues, 'maximumLimitPerDay', {});
    const limitPerTransaction = result(formValues, 'maximumLimit', {});
    const bank = result(formValues, 'bank', {});
    const currency = result(formValues, 'currency', {});
    const idTa = result(formValues, 'idTa', {});
    const payload = {
      debitAccountNumber,
      debitAccountName,
      creditAccountNumber,
      limitPerDay,
      limitPerTransaction,
      limitId,
      name,
      bank,
      currency,
      idTa,
    };
    dispatch(actionCreators.saveEditLimitTransaction({payload}));
    dispatch(inbankList());
    dispatch(
      NavigationActions.navigate({routeName: 'FundTransferPaymentSetLimit'}),
    );
    dispatch(actionCreators.hideSpinner());
  };
}

export function highValueSetLimit() {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const transRefNum = result(state, 'transRefNum');
    let easyPin = result(
      state,
      'form.SetLimitEasyPinHighValue.values.easyPinsetLimit',
      '',
    );
    const randomNumber = randomString(16);
    OBM_EncryptPassword(easyPin, randomNumber);
    if (easyPin) {
      easyPin =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    }
    const mPinInputed = result(state, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(
      state,
      'form.AuthenticateForm.values.simasToken',
      '',
    );
    const ipassport = result(getState(), 'user.ipassport', '');
    const debitAccountNumber = result(
      state,
      'setLimitTransactionAdd.payload.payload.debitAccountNumber',
      '',
    );
    const debitAccountName = result(
      state,
      'setLimitTransactionAdd.payload.payload.debitAccountName',
      '',
    );
    const creditAccountNumber = result(
      state,
      'setLimitTransactionAdd.payload.payload.creditAccountNumber',
      '',
    );
    const creditAccountName = result(
      state,
      'setLimitTransactionAdd.payload.payload.creditAccountName',
      '',
    );
    const limitPerDay = result(
      state,
      'setLimitTransactionAdd.payload.payload.limitPerDay',
      0,
    ).toString();
    const limitPerTransaction = result(
      state,
      'setLimitTransactionAdd.payload.payload.limitPerTransaction',
      0,
    ).toString();
    const lang = result(state, 'currentLanguage.id', 'en');
    const payload = {
      easyPin,
      transRefNum,
      simasToken,
      ipassport,
      creditAccountNumber,
      debitAccountNumber,
      limitPerDay,
      limitPerTransaction,
      lang,
      mPinInputed,
      creditAccountName,
      debitAccountName,
    };
    return api
      .addLimitTransaction(payload, dispatch)
      .then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate());
        dispatch(listSetLimitTransaction());
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({
                routeName: 'HomeScreen',
              }),
              NavigationActions.navigate({routeName: 'HighValue'}),
            ],
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_SEND_SMS_VERIFICATION,
          ),
          Toast.LONG,
        );
      });
  };
}

export function easyPinDataToAddLimitTransaction() {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const debitAccountNumber =
      result(state, 'form.setLimitForm1.values.myAccount.accountNumber', '') ||
      result(state, 'defaultAccount.accountNumber', '');
    const debitAccountName =
      result(state, 'form.setLimitForm1.values.myAccount.name', '') ||
      result(state, 'defaultAccount.name', '');
    const creditAccountNumber = result(
      state,
      'form.setLimitForm1.values.accountNumber',
      '',
    );
    const creditAccountName = result(
      state,
      'form.setLimitForm1.values.name',
      '',
    );
    const limitPerDay = result(
      state,
      'form.setLimitForm1.values.limitPerDay',
      0,
    ).toString();
    const limitPerTransaction = result(
      state,
      'form.setLimitForm1.values.limitPerTransaction',
      0,
    ).toString();
    const payload = {
      debitAccountNumber,
      debitAccountName,
      creditAccountNumber,
      limitPerDay,
      limitPerTransaction,
      creditAccountName,
    };
    dispatch(actionCreators.saveAddLimitTransaction({payload}));
    dispatch(NavigationActions.navigate({routeName: 'EasyPinSetLimit'}));
    dispatch(actionCreators.hideSpinner());
  };
}

export function easyPinDataToAddLimitTransactionHighValue() {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const debitAccountNumber =
      result(
        state,
        'form.highValueTransfer.values.myAccount.accountNumber',
        '',
      ) || result(state, 'defaultAccount.accountNumber', '');
    const debitAccountName =
      result(state, 'form.highValueTransfer.values.myAccount.name', '') ||
      result(state, 'defaultAccount.name', '');
    const creditAccountNumber = result(
      state,
      'form.highValueTransfer.values.accountNumber',
      '',
    );
    const creditAccountName = result(
      state,
      'form.highValueTransfer.values.name',
      '',
    );
    const limitPerDay = result(
      state,
      'form.highValueTransfer.values.limitPerDay',
      0,
    ).toString();
    const limitPerTransaction = result(
      state,
      'form.highValueTransfer.values.limitPerTransaction',
      0,
    ).toString();
    const payload = {
      debitAccountNumber,
      debitAccountName,
      creditAccountNumber,
      limitPerDay,
      limitPerTransaction,
      creditAccountName,
    };
    dispatch(actionCreators.saveAddLimitTransaction({payload}));
    dispatch(
      NavigationActions.navigate({routeName: 'EasyPinSetLimitHighValue'}),
    );
    dispatch(actionCreators.hideSpinner());
  };
}

export function easyPinDataToAddLimitTransactionEdit(payeeName, payeeNumber) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const debitAccountNumber =
      result(
        state,
        'form.autoFilledSetLimit.values.myAccount.accountNumber',
        '',
      ) || result(state, 'defaultAccount.accountNumber', '');
    const debitAccountName =
      result(state, 'form.autoFilledSetLimit.values.myAccount.name', '') ||
      result(state, 'defaultAccount.name', '');
    const creditAccountName = payeeName;
    const creditAccountNumber = payeeNumber;
    const limitPerDay = result(
      state,
      'form.autoFilledSetLimit.values.limitPerDay',
      0,
    ).toString();
    const limitPerTransaction = result(
      state,
      'form.autoFilledSetLimit.values.limitPerTransaction',
      0,
    ).toString();
    const payload = {
      debitAccountNumber,
      debitAccountName,
      creditAccountNumber,
      creditAccountName,
      limitPerDay,
      limitPerTransaction,
    };
    dispatch(actionCreators.saveAddLimitTransaction({payload}));
    dispatch(NavigationActions.navigate({routeName: 'EasyPinSetLimitEdit'}));
    dispatch(actionCreators.hideSpinner());
  };
}
export function getInternetBankingSettings() {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    return api
      .getAllowInternetBanking(dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const resData = res.data;
        dispatch(actionCreators.saveAccountIB(resData));
        dispatch(
          NavigationActions.navigate({
            routeName: 'InternetBankingSettings',
            params: resData,
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE_INTERNET_BANKING),
        );
      });
  };
}

export function goReferralCode() {
  return (dispatch, getState) => {
    const payload = '';
    const state = getState();
    const cif = result(state, 'insuranceDataTravel.cifCode', '');
    const isKyc = !startsWith(cif, 'NK');
    dispatch(actionCreators.showSpinner());
    if (isKyc) {
      return api
        .getReferralCode(payload, dispatch)
        .then(res => {
          dispatch(actionCreators.saveReferralCodeMgm(res.data));
          dispatch(
            NavigationActions.navigate({routeName: 'ShareReferralCode'}),
          );
          dispatch(actionCreators.hideSpinner());
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(getErrorMessage(err, language.COMMON__CANNOT_LOAD));
        });
    } else {
      dispatch(NavigationActions.navigate({routeName: 'AccountMenu'}));
      dispatch(NavigationActions.navigate({routeName: 'EmoneyUpgradeBenefit'}));
      dispatch(actionCreators.hideSpinner());
    }
  };
}

export function goReferralList(transactionType) {
  return (dispatch, getState) => {
    const state = getState();
    const customStartDate = result(state, 'filteredCalendar.filterStarDate');
    const customEndDate = result(state, 'filteredCalendar.filterEndDate');
    const periodLabel = result(
      state,
      'form.MyInvitingRecord.values.selectedRange.label',
    );
    let filterAction = null;
    dispatch(actionCreators.showSpinner());
    dispatch(actionCreators.cleanClearTransactionsMgm());
    const payload = middlewareUtils.prepareReferralListPayload(
      periodLabel,
      customStartDate,
      customEndDate,
    );
    switch (transactionType) {
      case language.MGM__FILTER_DATE_LAST_7DAYS: {
        filterAction = actionCreators.updateLast7DaysTrans;
        break;
      }
      case language.MGM__FILTER_DATE_TODAY: {
        filterAction = actionCreators.updateTodayReferralTrans;
        break;
      }
      case language.MGM__FILTER_DATE_LAST_30DAYS: {
        filterAction = actionCreators.updateLast30DaysTrans;
        break;
      }
      case language.MGM__FILTER_DATE_THIS_MONTH: {
        filterAction = actionCreators.updateThisMonthsTrans;
        break;
      }
      case language.MGM__FILTER_DATE_CUSTOM: {
        filterAction = actionCreators.updateCustomTrans;
        break;
      }
      default: {
        filterAction = actionCreators.updateLast7DaysTrans;
      }
    }
    return api
      .getReferralList(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const transactions = sortBy(
          middlewareUtils.getReferralListMgm(res.data),
          ['date'],
          ['name'],
        );
        dispatch(filterAction(transactions));
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        const responseCode = result(err, 'data.responseCode', '');
        if (responseCode === '93') {
          Toast.show(language.MGM__SET_FILTER_DATE, Toast.LONG);
        } else {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_TRANSACTION_HISTORY,
            ),
            Toast.LONG,
          );
        }
      });
  };
}

export function goHistoryReward(transactionType) {
  return (dispatch, getState) => {
    const state = getState();
    const customStartDate = result(state, 'filteredCalendar.filterStarDate');
    const customEndDate = result(state, 'filteredCalendar.filterEndDate');
    // const periodLabel = 'Today';
    const periodLabel = language.MGM__FILTER_DATE_TODAY;
    let filterAction = null;
    dispatch(actionCreators.showSpinner());
    const payload = middlewareUtils.prepareReferralListPayload(
      periodLabel,
      customStartDate,
      customEndDate,
    );
    switch (transactionType) {
      case language.MGM__FILTER_DATE_TODAY: {
        filterAction = actionCreators.updateTodayRewardTrans;
        break;
      }
      case language.MGM__FILTER_DATE_LAST_7DAYS: {
        filterAction = actionCreators.updateLast7DaysTrans;
        break;
      }
      case language.MGM__FILTER_DATE_LAST_30DAYS: {
        filterAction = actionCreators.updateLast30DaysTrans;
        break;
      }
      case language.MGM__FILTER_DATE_THIS_MONTH: {
        filterAction = actionCreators.updateThisMonthsTrans;
        break;
      }
      case language.MGM__FILTER_DATE_CUSTOM: {
        filterAction = actionCreators.updateCustomTrans;
        break;
      }
      default: {
        filterAction = actionCreators.updateTodayRewardTrans;
      }
    }
    return api
      .getHistoryReward(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const transactions = sortBy(
          middlewareUtils.getHistoryReward(res.data),
          ['transactionType'],
          ['name'],
        );
        dispatch(filterAction(transactions));
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_TRANSACTION_HISTORY,
          ),
          Toast.LONG,
        );
      });
  };
}

export function goRewardBalance() {
  return dispatch => {
    const payload = '';
    dispatch(actionCreators.showSpinner());
    return api
      .getRewardBalance(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.saveRewardBalance(res.data));
        dispatch(NavigationActions.navigate({routeName: 'MyHistoryReward'}));
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.COMMON__CANNOT_LOAD));
      });
  };
}

export function gotoPayment(biller) {
  return dispatch => {
    dispatch(
      NavigationActions.navigate({
        routeName: 'EtaxPaymentType',
        params: {biller},
      }),
    );
  };
}

export function gotoHistory(biller) {
  return dispatch => {
    dispatch(
      NavigationActions.navigate({
        routeName: 'EtaxHistoryFilter',
        params: {biller},
      }),
    );
  };
}

export function getEtaxInfo() {
  return dispatch =>
    api.getEtaxInfo(dispatch).then(res => {
      dispatch(actionCreators.saveEtaxInformation(res.data));
    });
}

export function getHistory(values, setDate, biller) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const additional = isLogin ? ['ipassport'] : ['tokenClient', 'tokenServer'];
    let startDate = '';
    let endDate = '';
    if (setDate === 'Today') {
      const date = new Date();
      startDate = moment(date).format('DD-MM-YY');
    } else if (setDate === 'Month') {
      endDate = result(values, 'monthSelected.display', '');
    } else {
      startDate = result(values, 'dateStart', '');
      endDate = result(values, 'dateEnd', '');
    }
    const merchantCode = result(biller, 'id', '');
    const transformCode = merchantCode.toString();
    const payload = {
      merchantCode: transformCode,
      isBeforeLogin: !isLogin,
      startDate,
      endDate,
    };
    return api
      .getEtaxHistory(payload, additional, dispatch)
      .then(res => {
        const resData = result(res, 'data.history', []);
        dispatch(
          NavigationActions.navigate({
            routeName: 'EtaxHistoryList',
            params: {resData, biller, values},
          }),
        );
        dispatch(actionCreators.hideSpinner());
      })
      .catch(err => {
        const errMessage = result(err, 'data.Errmsg', '');
        dispatch(actionCreators.hideSpinner());
        Toast.show(errMessage, Toast.LONG);
      });
  };
}

export function redeemPoinMgm() {
  return dispatch => {
    const payload = '';
    dispatch(actionCreators.showSpinner());
    return api
      .getReedemPoin(payload, dispatch)
      .then(() => {
        dispatch(popUpSuccessMgm());
        dispatch(historyRewardMgm());
        dispatch(rewardBalanceMgm());
        dispatch(actionCreators.hideSpinner());
      })
      .catch(err => {
        dispatch(popUpFailedMgm());
        Toast.show(
          getErrorMessage(err, language.COMMON__CANNOT_LOAD),
          Toast.LONG,
        );
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function historyRewardMgm() {
  return dispatch => {
    const periodLabel = language.MGM__FILTER_DATE_TODAY;
    const payloadHistory =
      middlewareUtils.prepareReferralListPayload(periodLabel);
    dispatch(actionCreators.showSpinner());
    return api
      .getHistoryReward(payloadHistory, dispatch)
      .then(res => {
        const transactions = sortBy(
          middlewareUtils.getHistoryReward(res.data),
          ['transactionType'],
          ['name'],
        );
        dispatch(actionCreators.updateTodayRewardTrans(transactions));
        dispatch(actionCreators.hideSpinner());
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(err, language.COMMON__CANNOT_LOAD),
          Toast.LONG,
        );
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function rewardBalanceMgm() {
  return dispatch => {
    const payload = '';
    dispatch(actionCreators.showSpinner());
    return api
      .getRewardBalance(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.saveRewardBalance(res.data));
        dispatch(actionCreators.hideSpinner());
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(err, language.COMMON__CANNOT_LOAD),
          Toast.LONG,
        );
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function saveImageEtax(uri, idBilling) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const additional = isLogin ? ['ipassport'] : ['tokenClient', 'tokenServer'];
    const isBeforeLogin = !isLogin;
    const payload = {
      idBilling: idBilling,
      image: uri,
      isBeforeLogin,
    };
    return api
      .saveEtaxImage(payload, additional, dispatch)
      .then(() => {
        dispatch(actionCreators.hideSpinner());
      })
      .catch(err => {
        const errMessage = result(err, 'data.Errmsg', '');
        dispatch(actionCreators.hideSpinner());
        Toast.show(errMessage, Toast.LONG);
      });
  };
}

export function getEtaxImage(idBilling) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const additional = isLogin ? ['ipassport'] : ['tokenClient', 'tokenServer'];
    const isBeforeLogin = !isLogin;
    const payload = {idBilling: idBilling, isBeforeLogin, isPDF: true};
    return api
      .getEtaxImage(payload, additional, dispatch)
      .then(res => {
        const htmlString = result(res, 'data.displayList', '');
        let options = {
          html: htmlString,
          fileName: 'Etax_Receipt_' + idBilling,
          directory: 'Download',
        };

        if (Platform.OS === 'android') {
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ).then(res => {
            if (!res) {
              PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              ).then(result => {
                if (result === 'granted') {
                  RNHTMLtoPDF.convert(options)
                    .then(() => {
                      const hideAlert = () => {
                        dispatch(actionCreators.hideSinarmasAlert());
                      };
                      const sinarmasModalOptions = {
                        heading1: 'Download Success',
                        text: 'Your etax receipt has been successfully downloaded',
                        button1: language.ONBOARDING__OKAY,
                        onButton1Press: hideAlert,
                        onClose: hideAlert,
                      };
                      dispatch(
                        actionCreators.showSinarmasAlert({
                          ...sinarmasModalOptions,
                        }),
                      );
                      dispatch(actionCreators.hideSpinner());
                    })
                    .catch(() => {
                      const hideAlert = () => {
                        dispatch(actionCreators.hideSinarmasAlert());
                      };
                      const sinarmasModalOptions = {
                        heading1: 'Download Success',
                        text: 'Your etax receipt has been successfully downloaded',
                        button1: language.ONBOARDING__OKAY,
                        onButton1Press: hideAlert,
                        onClose: hideAlert,
                      };
                      dispatch(
                        actionCreators.showSinarmasAlert({
                          ...sinarmasModalOptions,
                        }),
                      );
                      dispatch(actionCreators.hideSpinner());
                    });
                } else {
                  dispatch(actionCreators.hideSpinner());
                  Toast.show(
                    'Go to settings, allow Simobi+ to access device camera',
                    Toast.LONG,
                  );
                }
              });
            } else {
              RNHTMLtoPDF.convert(options)
                .then(() => {
                  const hideAlert = () => {
                    dispatch(actionCreators.hideSinarmasAlert());
                  };
                  const sinarmasModalOptions = {
                    heading1: 'Download Success',
                    text: 'Your etax receipt has been successfully downloaded',
                    button1: language.ONBOARDING__OKAY,
                    onButton1Press: hideAlert,
                    onClose: hideAlert,
                  };
                  dispatch(
                    actionCreators.showSinarmasAlert({...sinarmasModalOptions}),
                  );
                  dispatch(actionCreators.hideSpinner());
                })
                .catch(() => {
                  dispatch(actionCreators.hideSpinner());
                });
            }
          });
        } else {
          RNHTMLtoPDF.convert(options)
            .then(() => {
              const hideAlert = () => {
                dispatch(actionCreators.hideSinarmasAlert());
              };
              const sinarmasModalOptions = {
                heading1: 'Download Success',
                text: 'Your etax receipt has been successfully downloaded',
                button1: language.ONBOARDING__OKAY,
                onButton1Press: hideAlert,
                onClose: hideAlert,
              };
              dispatch(
                actionCreators.showSinarmasAlert({...sinarmasModalOptions}),
              );
              dispatch(actionCreators.hideSpinner());
            })
            .catch(() => {
              dispatch(actionCreators.hideSpinner());
            });
        }
      })
      .catch(err => {
        const errMessage = result(err, 'data.responseMessage', '');
        dispatch(actionCreators.hideSpinner());
        Toast.show(errMessage, Toast.LONG);
      });
  };
}

export function goClaimRewardNow() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const gotoHomeLock = () => {
      dispatch(redeemPoinMgm());
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.MGM__POPUP_CLAIM_REWARD_TITLE,
      text: language.MGM__POPUP_CLAIM_REWARD_SUBTITLE,
      button2: language.MGM__BUTTON_CANCEL_TEXT,
      onButton2Press: hideAlert,
      button1: language.GENERIC__YES,
      onButton1Press: gotoHomeLock,
      onClose: hideAlert,
    };
    dispatch(
      actionCreators.showSinarmasAlert({
        ...sinarmasModalOptions,
        image: 'CLAIMREWARDMGM',
      }),
    );
  };
}

export function popUpSuccessMgm() {
  return (dispatch, getState) => {
    const state = getState();
    const nameProfile = result(state, 'user.profile.name', '');
    const totalReward = result(state, 'totalRewardMgm.totalPoinSuccess', '');
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToShare = () => {
      const shareOptions = {
        title: language.PAYMENT_STATUS__SHARE_WITH,
        message:
          'Yuhuu!' +
          ' ' +
          nameProfile +
          ' ' +
          language.MGM__SHARE_CLAIM_REWARD +
          ' ' +
          totalReward +
          ' ' +
          language.MGM__SIMAS_POIN +
          '. ' +
          language.MGM__SHARE_CLAIM_REWARD2, // Note that according to the documentation at least one of "message" or "url" fields is required
        // url: 'https://simobiplusprod.page.link/?link=https://www.banksinarmas.com/PersonalBanking/ShareCodeMgm/:?pathRoute=' + 'Introduction' + '/?referralCode=' + referralCode + '&apn=com.simas.mobile.SimobiPlus&isi=938705552&ibi=com.simas.mobile.SimobiPlus',
        url: 'http://bit.ly/simobiplus-mgm-sp',
      };
      Share.open(shareOptions);
    };
    const sinarmasModalOptions = {
      heading1: language.MGM__POP_UP_SUCCESS_TITLE,
      text: language.MGM__POP_UP_SUCCESS_SUBTITLE,
      text1: totalReward + ' ' + language.MGM__SIMAS_POIN + ' ',
      text2: language.MGM__POP_UP_SUCCESS_SUBTITLE2,
      button2: language.MGM__TEXT_SHARE3,
      onButton1Press: hideAlert,
      button1: language.GENERIC__CLOSE,
      onButton2Press: goToShare,
      onClose: hideAlert,
    };
    dispatch(
      actionCreators.showSinarmasAlert({
        ...sinarmasModalOptions,
        image: 'SUCCESSMGM',
      }),
    );
  };
}

export function popUpFailedMgm() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.MGM__POP_UP_FAILED_TITLE,
      text: language.MGM__POP_UP_FAILED_SUBTITLE,
      button1: language.MGM__POP_UP_DONE,
      onButton1Press: hideAlert,
      onClose: hideAlert,
    };
    dispatch(
      actionCreators.showSinarmasAlert({
        ...sinarmasModalOptions,
        image: 'FAILEDMGM',
      }),
    );
  };
}

export function goInformation() {
  return (dispatch, getState) => {
    const state = getState();
    const claimRewardBalance = result(state, 'rewardBalanceMgm', '');
    const totalBonusRewardPoin = result(
      claimRewardBalance,
      'eventTiering',
      '',
    ).split('&');
    const totalBonusPoinOne = parseInt(
      result(totalBonusRewardPoin, '[0]', '').split(':')[0],
    );
    const totalBonusRewardPoinOne = parseInt(
      result(totalBonusRewardPoin, '[0]', '').split(':')[1],
    );
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: 'Information',
      text: language.MGM__POP_UP_INFORMATION_REWARD,
      text1: totalBonusRewardPoinOne + ' ' + language.MGM__SIMAS_POIN + ' ',
      text2: language.MGM__POP_UP_INFORMATION_REWARD2,
      text3: totalBonusPoinOne + language.MGM__POP_UP_INFORMATION_REWARD3,
      button1: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
    };
    dispatch(
      actionCreators.showSinarmasAlert({
        ...sinarmasModalOptions,
        image: 'INFORMATION',
      }),
    );
  };
}

export function popUpOpenSaving() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const gotoOpenAccount = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      dispatch(NavigationActions.navigate({routeName: 'ProductsList'}));
    };
    const sinarmasModalOptions = {
      heading1: language.MGM__POP_UP_KYC_ONLY_TITLE,
      text: language.MGM__POP_UP_KYC_ONLY_SUBTITLE,
      button1: language.BUTTON_CLOSE,
      onButton1Press: hideAlert,
      button2: language.MGM__POP_UP_OPENSAVING,
      onButton2Press: gotoOpenAccount,
      onClose: hideAlert,
    };
    dispatch(
      actionCreators.showSinarmasAlert({
        ...sinarmasModalOptions,
        image: 'OPENSAVING',
      }),
    );
  };
}

export function getDetailHistoryReward(
  idStatement,
  name,
  date,
  event,
  transactionType,
  poinType,
  poin,
) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    const payload = {idStatement};
    return api
      .getDetailHistoryReward(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        dispatch(
          NavigationActions.navigate({
            routeName: 'DetailTransactionMgm',
            params: {
              detailData: res.data.detailRewardStatement,
              name: name,
              idStatement: idStatement,
              date: date,
              event: event,
              transactionType: transactionType,
              poinType: poinType,
              poin: poin,
            },
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_TRANSACTION_HISTORY,
          ),
        );
      });
  };
}

export function popUpRewardMgm() {
  return dispatch => {
    let checked = false;
    const hideAlert = () => {
      set(storageKeys.GET_REFER_MGM, {dontShow: checked});
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToProfileMgm = () => {
      dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'Landing'})],
        }),
      );
      dispatch(refreshStorageNew());
      dispatch(goReferralCode());
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const checkboxChange = res => {
      checked = !res;
    };
    return getLastReferMgm().then(res => {
      if (!result(res, 'dontShow', false)) {
        const modalOptions = {
          heading1: language.MGM__SUCCESS_SCREEN_POPUP_MGM_TITLE,
          text: language.MGM__SUCCESS_SCREEN_POPUP_MGM_SUBTITLE,
          button1: language.MGM__BUTTON_CANCEL_TEXT,
          onButton1Press: hideAlert,
          button2: language.MGM__SUCCESS_SCREEN_POPUP_MGM,
          onButton2Press: goToProfileMgm,
          onClose: hideAlert,
          checkboxChange,
          checkboxLabel: language.LANDING__DONT_SHOW_AGAIN,
          text1Black: true,
        };
        dispatch(
          actionCreators.showSinarmasAlert({
            ...modalOptions,
            image: 'REWARDMGM',
          }),
        );
      }
    });
  };
}

export function firstDownloadIOS(res) {
  return dispatch => {
    const image = result(res, 'data.image', '');
    const base64 = image;
    const date = new Date();
    const nameFile = Math.floor(date.getTime() + date.getSeconds() / 2);
    const dirs = RNFetchBlob.fs.dirs;
    const path = `${dirs.DownloadDir}/${nameFile}.png`;
    RNFS.writeFile(path, image, 'base64')
      .then(() => {
        const hideAlert = () => {
          dispatch(actionCreators.hideSinarmasAlert());
        };
        const sinarmasModalOptions = {
          heading1: !isEmpty(base64)
            ? language.SPLITBILL__DOWNLOAD_SUCCESS
            : language.SPLITBILL__DOWNLOAD_NO_ANY,
          button1: language.SPLITBILL__CONFIRMATION_OK,
          onButton1Press: hideAlert,
          onClose: hideAlert,
        };
        dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
        dispatch(actionCreators.hideSpinner());
      })
      .catch(error => {
        if (isEmpty(base64)) {
          const hideAlert = () => {
            dispatch(actionCreators.hideSinarmasAlert());
          };
          const sinarmasModalOptions = {
            heading1: !isEmpty(base64)
              ? language.SPLITBILL__DOWNLOAD_SUCCESS
              : language.SPLITBILL__DOWNLOAD_NO_ANY,
            button1: language.SPLITBILL__CONFIRMATION_OK,
            onButton1Press: hideAlert,
            onClose: hideAlert,
          };
          dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
          dispatch(actionCreators.hideSpinner());
        } else {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(error, language.SPLITBILL_DOWNLOAD_ERROR),
            Toast.LONG,
          );
        }
      });
  };
}

export function getSearchMetaData() {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    const payload = '';
    return api
      .searchMetaData(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        dispatch(destroy('InputSearch'));
        const resData = result(res, 'data', []);
        set(storageKeys.OFFER_MENU_SEARCH, resData).catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
            ),
            Toast.LONG,
          );
        });
        dispatch(actionCreators.saveSearchMetaData(resData));
        dispatch(
          NavigationActions.navigate({
            routeName: 'MenuHeaderSearch',
            params: resData,
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.showSpinner());
        dispatch(actionCreators.hideSpinner());
        dispatch(destroy('InputSearch'));
        dispatch(actionCreators.saveSearchMetaData(MenuSearchContent));
        dispatch(
          NavigationActions.navigate({
            routeName: 'MenuHeaderSearch',
            params: MenuSearchContent,
          }),
        );
        Toast.show(
          getErrorMessage(err, language.RECURRING__TIME_OUT_OR_NO_DATA),
        );
      });
  };
}

export function idBillingPayment(data, biller) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const additional = isLogin ? ['ipassport'] : ['tokenClient', 'tokenServer'];
    const isBeforeLogin = !isLogin;
    const payload = {idBilling: data.idBilling, isBeforeLogin, isPDF: false};
    const lang = result(state, 'currentLanguage.id', 'id');
    return api
      .getIdBillingDetail(payload, additional, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const responseData = result(res, 'data', {});
        const responseCode = result(responseData, 'responseCode', '');
        if (responseCode === '00') {
          dispatch(
            change(
              'IdBillingFormPayment',
              'accountNo',
              result(data, 'accountNo', {}),
            ),
          );
          const idBilling = data.idBilling;
          const isDJP = result(responseData, 'jenisMpn', '') === 'DJP';
          const taxName = result(responseData, 'namaWp', '');
          const taxAddress = result(responseData, 'alamatWp', '');
          const npwpRes = result(responseData, 'npwp', '');
          const nopData = result(responseData, 'nop', '');
          const nopNumber = nopData === null || nopData === '' ? ' ' : nopData;
          const fromDate = result(responseData, 'masaPajakMulai', '');
          const transformStartDate = etaxMonthRange(lang, fromDate);
          const selectedStartDate = result(transformStartDate, 'label', '');
          const endDate = result(responseData, 'masaPajakSelesai', '');
          const transformEndDate = etaxMonthRange(lang, endDate);
          const selectedEndDate = result(transformEndDate, 'label', '');
          const taxYear = result(responseData, 'tahunPajak', '');
          const regularityNumber = result(responseData, 'nomorSk', '');
          const amount = result(
            responseData,
            'amountTransaction',
            0,
          ).toString();
          const amountText = inNumber(amount);
          const taxType = result(responseData, 'jenisPajak', '');
          const depositType = result(responseData, 'jenisSetoran', '');
          const notes = result(responseData, 'description', '');
          const dataConfirmation = {
            idBilling,
            npwp: npwpRes,
            taxName,
            taxAddress,
            nopNumber,
            taxType,
            depositType,
            fromDate: selectedStartDate,
            endDate: selectedEndDate,
            taxYear,
            regularityNumber,
            amount,
            amountText,
            notes,
            isDJP: isDJP,
          };
          const favBiller = [];
          const etaxData = {dataConfirmation, isEtax: true};
          dispatch(
            getAmountForGenericBillerTypeOne(
              idBilling,
              biller,
              favBiller,
              etaxData,
            ),
          );
        } else {
          const errMessage = result(res, 'data.responseMessage', '');
          Toast.show(errMessage, Toast.LONG);
        }
      })
      .catch(err => {
        const errMessage = result(err, 'data.responseMessage', '');
        dispatch(actionCreators.hideSpinner());
        Toast.show(errMessage, Toast.LONG);
      });
  };
}

export function setupPaymentSearch(billerTypeId) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const user = isEmpty(result(getState(), 'user', {}));
    setTimeout(() => {
      dispatch(actionCreators.hideSpinner());
      const {billerConfig} = getState();
      const dontBiller = result(billerTypeId, 'menu', '');
      const urlLink =
        dontBiller === 'Privacy Policy'
          ? result(getState(), 'config.attention.urlSimobiPrivacyPolicy', '')
          : result(
              getState(),
              'config.attention.urlSimobiOnboardingTnCWithoutCheckbox',
              '',
            );
      const billerList = result(billerConfig, 'billerList', []);
      const digitalVoucher = result(billerTypeId, 'routeName', '');
      const targetingBiller =
        digitalVoucher === 'Special Deals'
          ? find(
              billerList,
              valueBiller =>
                lowerCase(result(valueBiller, 'name', '')) ===
                lowerCase(result(billerTypeId, 'routeName', '')),
            )
          : find(
              billerList,
              valueBiller =>
                lowerCase(result(valueBiller, 'name', '')) ===
                lowerCase(result(billerTypeId, 'menu', '')),
            );
      if (!isEmpty(targetingBiller)) {
        dispatch(getBillpayHistory());
        dispatch(populateConfigData());
        genericBillerNavigate(dispatch, targetingBiller);
      } else {
        if (user) {
          if (dontBiller === 'PREPAID') {
            dispatch(setupPayment('BillerTypeSix'));
          } else if (dontBiller === 'POSTPAID') {
            dispatch(setupPayment('BillerTypeOne'));
          } else if (dontBiller === 'Simas Emoney') {
            dispatch(
              NavigationActions.navigate({
                routeName: 'EgiftLogin',
                params: {isEmoney: true},
              }),
            );
          } else if (dontBiller === 'Simas Poin') {
            dispatch(goSimasPoinHistory());
          } else if (dontBiller === 'Inbox Pushwoosh') {
            const isSearch = true;
            dispatch(openInbox(isSearch));
          } else if (dontBiller === 'BANK ACCOUNT') {
            dispatch(checkHSMandNavigate('Login'));
          } else if (dontBiller === 'Call Support 1500153') {
            dispatch(linkingTelp('tel:1500153'));
          } else if (dontBiller === 'UniPin') {
            dispatch(checklistUnipin());
          } else if (dontBiller === 'Ultra Voucher') {
            dispatch(shouldGiveChecklistSimasCatalog());
          } else if (dontBiller === 'Alfamart') {
            dispatch(shouldGiveChecklist());
          } else {
            dispatch(checkHSMandNavigate('', dontBiller));
          }
        } else {
          dispatch(genericSearchNavigate(dontBiller, urlLink));
        }
      }
    }, 3000);
  };
}

export function linkingTelp(telephone) {
  return () => {
    Linking.canOpenURL(telephone)
      .then(supported => {
        if (supported) {
          Linking.openURL(telephone);
        } else {
          Toast.show(language.ERROR_MESSAGE__CANNOT_CALL, Toast.LONG);
        }
      })
      .catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_CALL), Toast.LONG);
  };
}

export function saveValueRecentSearch(recentSearch) {
  return (dispatch, getState) => {
    const newRecentSearch = result(getState(), 'updateRecentSearch', []);
    const lengthRecentSearch = isEmpty(newRecentSearch)
      ? size(newRecentSearch)
      : newRecentSearch.length < 5;
    const testRecentSearch = filter(
      newRecentSearch,
      item => item === recentSearch,
    );
    getRecentSearch().then(res => {
      if (isEmpty(res)) {
        set(storageKeys.GET_RECENT_SEARCH, [recentSearch]);
        dispatch(actionCreators.updateRecentSearch([recentSearch]));
      } else {
        if (isEmpty(testRecentSearch) && lengthRecentSearch) {
          const valueRecentSearch = res;
          valueRecentSearch.push(recentSearch);
          set(storageKeys.GET_RECENT_SEARCH, valueRecentSearch);
          dispatch(actionCreators.updateRecentSearch(valueRecentSearch));
          const newRecentSearchValue = result(
            getState(),
            'updateRecentSearch',
            [],
          );
          const sortingData = reverse(
            sortBy(newRecentSearchValue, recentSearch),
          );
          set(storageKeys.GET_RECENT_SEARCH_SORT, sortingData);
          dispatch(actionCreators.updateRecentSearch(sortingData));
        } else {
          const valueRecentSearch = res;
          const filterNewRecentSearh = filter(newRecentSearch, function (o) {
            return o === recentSearch;
          });
          const filterNewRecentSearhNonPick = filter(
            newRecentSearch,
            function (o) {
              return o !== recentSearch; // non pick
            },
          );
          if (isEmpty(filterNewRecentSearh) && isEmpty(testRecentSearch)) {
            const valueArrayRecentSearch = res;
            const toRemove = result(valueArrayRecentSearch, '[0]', []);
            const index = valueArrayRecentSearch.indexOf(toRemove);
            if (index > -1 && isEmpty(testRecentSearch)) {
              // Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
              valueArrayRecentSearch.splice(index, 1);
              valueArrayRecentSearch.push(recentSearch);
            }
            set(storageKeys.GET_RECENT_SEARCH, valueRecentSearch);
            dispatch(actionCreators.updateRecentSearch(valueRecentSearch));
            const newRecentSearchValue = result(
              getState(),
              'updateRecentSearch',
              [],
            );
            const sortingData = reverse(
              sortBy(newRecentSearchValue, recentSearch),
            );
            set(storageKeys.GET_RECENT_SEARCH_SORT, sortingData);
            dispatch(actionCreators.updateRecentSearch(sortingData));
          } else {
            set(storageKeys.GET_RECENT_SEARCH_SORT, [
              ...filterNewRecentSearh,
              ...filterNewRecentSearhNonPick,
            ]);
            dispatch(
              actionCreators.updateRecentSearch([
                ...filterNewRecentSearh,
                ...filterNewRecentSearhNonPick,
              ]),
            );
          }
        }
      }
    });
  };
}

export function navigateToEtaxConfirmation(haveNpwp, data, biller, res) {
  return dispatch => {
    const idNumber = result(data, 'nik', '');
    const amount = result(data, 'jumlahSetor', '');
    const taxType = result(data, 'jenisPajak.code', '');
    const depositType = result(data, 'jenisSetoran.code', '');
    const taxTypeView = result(data, 'jenisPajak.display', '');
    const depositTypeView = result(data, 'jenisSetoran.display', '');
    const taxName = haveNpwp
      ? result(res, 'data.nama', '')
      : result(data, 'namaWP', '');
    const taxAddress = haveNpwp
      ? result(res, 'data.alamat', '')
      : result(data, 'alamatWP', '');
    const npwpRes = result(res, 'data.npwp', '');
    const kotaWp = result(data, 'kotaWP', '');
    const npwpPenyetor = result(data, 'npwp', '');
    const nopNumber = result(data, 'nop', '');
    const fromDate = result(data, 'dateStart.code', '');
    const endDate = result(data, 'dateEnd.code', '');
    const fromDateView = result(data, 'dateStart.display', '');
    const endDateView = result(data, 'dateEnd.display', '');
    const taxYear = result(data, 'tahunPajak.display', '');
    const regularityNumber = result(data, 'regularityNumber', '');
    const amountText = inNumber(amount);
    const notes = result(data, 'berita', '');
    const dataConfirmation = {
      npwp: npwpRes,
      taxName,
      taxAddress,
      nopNumber,
      taxType,
      depositType,
      taxTypeView,
      depositTypeView,
      fromDate,
      endDate,
      taxYear,
      regularityNumber,
      amount,
      amountText,
      notes,
      kotaWp,
      idNumber,
      haveNpwp,
      npwpPenyetor,
      fromDateView,
      endDateView,
    };
    dispatch(
      NavigationActions.navigate({
        routeName: 'IdBillingFormConfirmation',
        params: {dataConfirmation, biller},
      }),
    );
  };
}

export function goToConfirmation(data, biller, haveNpwp) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const npwp = result(data, 'npwp', '');
    const npwpPayload =
      npwp === '' ? '' : npwp.toString().replace(/([,.-])+/g, '');
    const amount = result(data, 'jumlahSetor', '');
    const amountPayload =
      amount === '' ? '' : amount.toString().replace(/([.])+/g, '');
    const taxType = result(data, 'jenisPajak.code', '');
    const depositType = result(data, 'jenisSetoran.code', '');
    // const depositType = '101';
    const isLogin = !isEmpty(result(state, 'user', {}));
    const additional = isLogin ? ['ipassport'] : ['tokenClient', 'tokenServer'];
    const isBeforeLogin = !isLogin;
    if (haveNpwp) {
      const payload = {
        npwp: npwpPayload,
        amount: amountPayload,
        isBeforeLogin,
        jenisPajak: taxType,
        jenisSetoran: depositType,
      };
      return api
        .getEtaxUserDetail(payload, additional, dispatch)
        .then(res => {
          dispatch(actionCreators.hideSpinner());
          const responseCode = result(res, 'data.responseCode', '');
          if (responseCode === '00') {
            dispatch(actionCreators.hideSpinner());
            dispatch(navigateToEtaxConfirmation(haveNpwp, data, biller, res));
          } else {
            const responseMessage = result(res, 'data.responseMessage', '');
            dispatch(actionCreators.hideSpinner());
            Toast.show(responseMessage, Toast.LONG);
          }
        })
        .catch(err => {
          const errMessage = result(err, 'data.responseMessage', '');
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(errMessage, language.APP_ERROR__TITLE),
            Toast.LONG,
          );
        });
    } else {
      dispatch(actionCreators.hideSpinner());
      dispatch(navigateToEtaxConfirmation(haveNpwp, data, biller));
    }
  };
}

export function getIdBilling(data, billingData, biller) {
  return (dispatch, getState) => {
    const state = getState();
    if (isEmpty(billingData)) {
      dispatch(actionCreators.showSpinner());
      const amountTransaction = result(data, 'amount', '');
      const npwp = result(data, 'npwp', '');
      const namaWp = result(data, 'taxName', '');
      const alamatWp = result(data, 'taxAddress', '');
      const kotaWp = result(data, 'kotaWp', '');
      const idNumber = result(data, 'idNumber', '');
      const jenisPajak = result(data, 'taxType', '');
      const jenisSetoran = result(data, 'depositType', '');
      const masaPajakMulai = result(data, 'fromDate', '');
      const masaPajakSelesai = result(data, 'endDate', '');
      const tahunPajak = result(data, 'taxYear', '');
      const npwpPenyetor = result(data, 'npwpPenyetor', '');
      const transformnpwpPenyetor =
        npwpPenyetor === ''
          ? ''
          : npwpPenyetor.toString().replace(/([,.-])+/g, '');
      const payloadNpwpPenyetor = idNumber === '' ? '' : transformnpwpPenyetor;
      const description = result(data, 'depositTypeView', '');
      const emptyNop = true;
      const nop = emptyNop ? '' : result(data, 'nopNumber', ' ');
      const amountText = result(data, 'amountText', '');
      const terbilang = amountText
        .replace(/\s+/g, ' ')
        .trim()
        .concat(' Rupiah');
      const haveNpwp = result(data, 'haveNpwp', false);
      const nomorSk = result(data, 'regularityNumber', '');
      const accountNumber = '';
      const currency = 'IDR';
      const isLogin = !isEmpty(result(state, 'user', {}));
      const isBeforeLogin = !isLogin;
      const additional = isLogin
        ? ['ipassport']
        : ['tokenClient', 'tokenServer'];
      const npwpPayload = {
        amountTransaction,
        accountNumber,
        npwp,
        namaWp,
        alamatWp,
        kotaWp,
        jenisPajak,
        jenisSetoran,
        masaPajakMulai,
        masaPajakSelesai,
        tahunPajak,
        nomorSk,
        description,
        nop,
        npwpPenyetor: npwp,
        currency,
        terbilang,
        isBeforeLogin,
      };
      const nonNpwpPayload = {
        amountTransaction,
        accountNumber,
        idNumber,
        npwp,
        namaWp,
        alamatWp,
        kotaWp,
        jenisPajak,
        jenisSetoran,
        masaPajakMulai,
        masaPajakSelesai,
        tahunPajak,
        nomorSk,
        npwpPenyetor: payloadNpwpPenyetor,
        description,
        nop,
        currency,
        terbilang,
        isBeforeLogin,
      };
      const payload = haveNpwp ? npwpPayload : nonNpwpPayload;
      return api
        .createIdBiling(payload, additional, dispatch)
        .then(res => {
          dispatch(actionCreators.hideSpinner());
          const responseCode = result(res, 'data.responseCode', '');
          if (responseCode === '00') {
            const idBilling = result(res, 'data.idBilling', '');
            const activeDate = result(res, 'data.expiredDate', '');
            const dataIdBilling = {idBilling, activeDate};
            dispatch(actionCreators.saveBillingData(dataIdBilling));
          } else {
            const errorCode = result(res, 'data.errorCode', '');
            Toast.show(errorCode, Toast.LONG);
          }
        })
        .catch(err => {
          const errMessage = result(err, 'data.Errmsg', '');
          dispatch(actionCreators.hideSpinner());
          Toast.show(errMessage, Toast.LONG);
        });
    } else {
      if (!isEmpty(billingData)) {
        dispatch(actionCreators.clearBillingData());
      }
      const idBilling = result(billingData, 'idBilling', '');
      const activeDate = result(billingData, 'activeDate', '');
      const npwp = result(data, 'npwp', '') || result(data, 'npwpPenyetor', '');
      const taxName = result(data, 'taxName', '');
      const taxAddress = result(data, 'taxAddress', '');
      const nopNumber = result(data, 'nopNumber', ' ');
      const taxType = result(data, 'taxTypeView', '');
      const depositType = result(data, 'depositTypeView', '');
      const fromDate = result(data, 'fromDateView', '');
      const endDate = result(data, 'endDateView', '');
      const taxYear = result(data, 'taxYear', '');
      const regularityNumber = result(data, 'regularityNumber', '');
      const amount = result(data, 'amount', '');
      const amountText = result(data, 'amountText', '');
      const notes = result(data, 'notes', '');
      const haveNpwp = result(data, 'haveNpwp', false);
      const isDJP = true;
      const dataConfirmation = {
        idBilling,
        activeDate,
        npwp,
        taxName,
        taxAddress,
        nopNumber,
        taxType,
        depositType,
        fromDate,
        endDate,
        taxYear,
        regularityNumber,
        amount,
        amountText,
        notes,
        haveNpwp,
        isDJP: isDJP,
      };
      const favBiller = [];
      const etaxData = {dataConfirmation, isEtax: true};
      dispatch(
        getAmountForGenericBillerTypeOne(
          idBilling,
          biller,
          favBiller,
          etaxData,
        ),
      );
    }
  };
}

export function goToLanding() {
  return dispatch => {
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Landing'})],
      }),
    );
  };
}
export function getDataRecentSearch() {
  return dispatch => {
    get(storageKeys.GET_RECENT_SEARCH_SORT).then(res => {
      dispatch(actionCreators.updateRecentSearch(res));
    });
  };
}

export function deleteRecentSearch() {
  return dispatch => {
    remove(storageKeys.GET_RECENT_SEARCH);
    remove(storageKeys.GET_RECENT_SEARCH_SORT);
    dispatch(actionCreators.clearRecentSearch());
  };
}

export function addRecentSearch(dataSearch) {
  return dispatch => {
    dispatch(actionCreators.saveValueRecentSearch(dataSearch));
  };
}
export function deleteValueSearch() {
  return dispatch => {
    dispatch(actionCreators.clearValueRecentSearch());
  };
}

export function checkSyariahAccount(acc) {
  return dispatch => {
    const accountNumber = result(acc, 'accountNumber', '');
    const isSyariah = checkSyaria(accountNumber);
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.MORE_INFOBL__TITTLE,
      text: language.QR_SYARIAH_DICLAIMER_TEXT,
      button1: language.DISCLAIMER_BUTTON,
      onButton1Press: hideAlert,
      onClose: hideAlert,
    };
    if (isSyariah && Platform.OS === 'android') {
      dispatch(
        actionCreators.showSinarmasAlert({
          ...sinarmasModalOptions,
          image: 'information_alert',
        }),
      );
    }
  };
}

export function getCacheMenuSearch() {
  return dispatch => {
    api
      .getCacheData({}, dispatch)
      .then(res => {
        getConfigVersionMenuSearch()
          .then(response => {
            const configSaved = response;
            const configIncoming = result(
              res,
              'data.configVersion',
              0,
            ).toString();
            dispatch(actionCreators.saveConfigCache(configIncoming));
            if (
              isEmpty(response) === true ||
              (configSaved !== configIncoming) === true
            ) {
              set(storageKeys.CONFIG_VERSION_MENU_SEARCH, configIncoming).catch(
                err => {
                  Toast.show(
                    getErrorMessage(
                      err,
                      language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
                    ),
                    Toast.LONG,
                  );
                },
              );
              dispatch(getSearchMetaData());
              dispatch(populateBillerData());
            } else {
              get(storageKeys.OFFER_MENU_SEARCH).then(res => {
                dispatch(actionCreators.saveSearchMetaData(res));
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'MenuHeaderSearch',
                    params: res,
                  }),
                );
              });
              dispatch(populateBillerData());
            }
          })
          .catch(() => {});
      })
      .catch(() => {});
  };
}

export function validateEmailTokenNoCard(
  typeActivation,
  tokenEmail,
  noCard = false,
  email,
) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const isLockedDevice = Boolean(
      state.appInitKeys &&
        state.appInitKeys.username &&
        state.appInitKeys.tokenClient &&
        state.appInitKeys.tokenServer,
    );
    const otpCode = result(state, 'form.OTPEmail.values.emailToken', '');
    const mobileNumber = formatMobileNumberEmoneyRegistration(
      result(state, 'form.resetPassForm.values.phoneNumber', ''),
    );
    const typeEmailToken = '003'; // have no ipassport
    const payload = {otpCode, mobileNumber, typeEmailToken, typeActivation};
    return api
      .validateEmailToken(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const responseCode = result(res, 'data.responseCode', '');
        const token = result(res, 'data.token', '');
        if (responseCode === '00') {
          if (typeActivation === '001') {
            dispatch(
              sendOtpActivation(
                tokenEmail,
                typeActivation,
                isLockedDevice,
                '',
                noCard,
                token,
                email,
              ),
            );
          } else {
            dispatch(
              sendOtpResetPassword(
                tokenEmail,
                typeActivation,
                isLockedDevice,
                noCard,
                token,
                email,
              ),
            );
          }
        }
      })
      .catch(error => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(error, language.APP_ERROR__TITLE),
          Toast.LONG,
        );
      });
  };
}

export function getSimasPoinHistoryMgm() {
  return dispatch => {
    const payload = {
      pushToken: '123456',
      clientCheck: 'WEB_BROWSER',
      alreadyLogin: true,
    };
    dispatch(
      actionCreators.saveSimasPoinHistory({loading: true, reload: true}),
    );
    return api
      .getSimasPoinHistoryMgm(payload, dispatch)
      .then(res => {
        const responseCode = result(res, 'data.responseCode', '');
        if (responseCode === '00') {
          dispatch(
            actionCreators.saveSimasPoinHistory({
              ...res.data.accountStatementSimasPoin,
              status: 'success',
            }),
          );
        } else {
          dispatch(actionCreators.hideSpinner());
          dispatch(
            actionCreators.saveSimasPoinHistory({loading: false, reload: true}),
          );
        }
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(
          actionCreators.saveSimasPoinHistory({loading: false, reload: true}),
        );
      });
  };
}

export function goSimasPoinHistoryMgm() {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const payload = {
      pushToken: '123456',
      clientCheck: 'WEB_BROWSER',
      alreadyLogin: true,
    };
    const navigationKeys = result(
      getState(),
      'promos.navigateOnPushClicked',
      false,
    );
    const accountList = result(state, 'accounts', []);
    dispatch(destroy('loginWithUsernamePassword'));
    dispatch(destroy('loginAccountForm'));
    dispatch(destroy('easyPinCreationForm'));
    dispatch(destroy('easyPinCreationConfirmForm'));
    dispatch(initStoreWithTransactionDetails());
    if (navigationKeys.length) {
      forEach(navigationKeys, navigateKey =>
        dispatch(NavigationActions.navigate({routeName: navigateKey})),
      );
      dispatch(actionCreators.changeNotificationRoute([]));
    }
    return api
      .getSimasPoinHistoryMgm(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        dispatch(
          actionCreators.saveSimasPoinHistory({
            ...res.data.accountStatementSimasPoin,
            status: 'success',
          }),
        );
        if (
          accountList.length === 1 &&
          find(accountList, {accountType: 'emoneyAccount'})
        ) {
          dispatch(NavigationActions.navigate({routeName: 'SimasPoinHistory'}));
        } else {
          dispatch(NavigationActions.navigate({routeName: 'SimasPoinHistory'}));
        }
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
        if (
          accountList.length === 1 &&
          find(accountList, {accountType: 'emoneyAccount'})
        ) {
          dispatch(NavigationActions.navigate({routeName: 'SimasPoinHistory'}));
        } else {
          dispatch(NavigationActions.navigate({routeName: 'SimasPoinHistory'}));
        }
      });
  };
}

export function inquirySimasPoinMgm(isSpiner) {
  return (dispatch, getState) => {
    const state = getState();
    const payload = {
      pushToken: '123456',
      clientCheck: 'WEB_BROWSER',
      alreadyLogin: true,
    };
    if (
      result(state, 'appInitKeys.username', '') === null ||
      result(state, 'appInitKeys.tokenClient', '') === null ||
      result(state, 'appInitKeys.tokenServer', '') === null
    ) {
      dispatch(actionCreators.saveSimasPoin({isLockdown: false}));
    } else {
      dispatch(
        actionCreators.saveSimasPoin({
          status: 'loading',
          loading: true,
          reload: true,
        }),
      );
      if (result(isSpiner, 'isSpiner') === true) {
        dispatch(actionCreators.showSpinner());
      }
      return api
        .inquirySimasPoinMgm(payload, dispatch)
        .then(res => {
          dispatch(actionCreators.hideSpinner());
          dispatch(
            actionCreators.saveSimasPoin({...res.data, status: 'success'}),
          );
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          const errorCode = result(err, 'data.simasPoin.code', '');
          if (errorCode === '11' || errorCode === '10') {
            dispatch(actionCreators.saveSimasPoin({status: 'success'}));
          } else {
            dispatch(
              actionCreators.saveSimasPoin({
                status: 'error',
                loading: false,
                reload: true,
              }),
            );
          }
        });
    }
  };
}

export function spreadMarginValasRefreshRateValas(isSubmit) {
  return dispatch => {
    const payload = '';
    if (isSubmit === false) {
      return api
        .spreadMarginValasRefreshRateValas(payload, dispatch)
        .then(res => {
          const refreshRateValas = result(res, 'data', {});
          const rateChange = result(res, 'data.rateChange', false);
          const buttonOK = () => {
            dispatch(
              change(
                'fundTransferValasConfirmation',
                'refreshRateValue',
                refreshRateValas,
              ),
            );
            dispatch(actionCreators.hideSinarmasAlert());
          };
          const hideAlert = () => {
            dispatch(actionCreators.hideSinarmasAlert());
          };
          const goBack = () => {
            dispatch(NavigationActions.back());
            hideAlert();
          };
          if (rateChange === true) {
            const sinarmasModalOptions = {
              heading1:
                language.POPUP__EXCHANGE_RATE_HEADING_SPREAD_MARGIN_VALAS,
              text: language.POPUP__EXCHANGE_RATE_SPREAD_MARGIN_VALAS,
              button1: language.GENERIC__NO,
              button2: language.GENERIC__YES,
              onButton1Press: goBack,
              onButton2Press: buttonOK,
              onClose: hideAlert,
            };
            dispatch(
              actionCreators.showSinarmasAlert({
                ...sinarmasModalOptions,
                image: 'OpenMenuActivateAtmCard',
              }),
            );
          }
          dispatch(actionCreators.hideSpinner());
        })
        .catch(() => {
          dispatch(actionCreators.hideSpinner());
        });
    }
  };
}

export function moveVoucher(orderNumber, voucherId) {
  return dispatch => {
    const payload = {
      order_number: orderNumber,
      id_voucher: String(voucherId),
    };
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const confirmMove = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      dispatch(actionCreators.showSpinner());
      return api
        .redeemVoucher(payload, dispatch)
        .then(() => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.EVOUCHER__MOVE_SUCCESS, Toast.LONG);
          dispatch(getDataOrder());
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(err, language.EVOUCHER__MOVE_FAILED),
            Toast.LONG,
          );
          dispatch(getDataOrder());
        });
    };
    const sinarmasModalOptions = {
      heading1: language.EVOUCHER__ALERT_HEADER,
      text:
        language.EVOUCHER__ALERT_WARNING +
        '\n\n' +
        language.EVOUCHER__ALERT_WARNING_2,
      button1: language.GENERIC__YES,
      onButton1Press: confirmMove,
      button2: language.GENERIC__CANCEL,
      onButton2Press: hideAlert,
      onClose: hideAlert,
    };
    dispatch(
      actionCreators.showSinarmasAlert({
        ...sinarmasModalOptions,
        image: 'MOVEVOUCHER',
      }),
    );
  };
}

export function deleteVoucher(orderNumber, voucherId) {
  return dispatch => {
    const payload = {
      order_number: orderNumber,
      id_voucher: String(voucherId),
    };
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const confirmMove = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      dispatch(actionCreators.showSpinner());
      return api
        .deleteVoucher(payload, dispatch)
        .then(() => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.EVOUCHER__DELETE_SUCCESS, Toast.LONG);
          dispatch(getDataOrder());
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(err, language.EVOUCHER__DELETE_FAILED),
            Toast.LONG,
          );
          dispatch(getDataOrder());
        });
    };
    const sinarmasModalOptions = {
      heading1: language.EVOUCHER__DELETE_HEADER,
      text: language.EVOUCHER__DELETE_WARNING,
      button1: language.GENERIC__YES,
      onButton1Press: confirmMove,
      button2: language.GENERIC__CANCEL,
      onButton2Press: hideAlert,
      onClose: hideAlert,
    };
    dispatch(
      actionCreators.showSinarmasAlert({
        ...sinarmasModalOptions,
        image: 'MOVEVOUCHER',
      }),
    );
  };
}

export function getTargetAccountProxyAddress() {
  return (dispatch, getState) => {
    let status = 'loading';
    dispatch(actionCreators.savePayeeStatusProxyAddress(status));
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const additional = isLogin ? ['ipassport'] : ['tokenClient', 'tokenServer'];
    const payload = isLogin ? {} : {transferMethodType: '1'};
    return api
      .getTargetAccountProxyAddress(payload, additional, dispatch)
      .then(res => {
        if (!isEmpty(res.data)) {
          dispatch(actionCreators.clearPayeeStatusProxyAddress());
          status = 'success';
          dispatch(actionCreators.savePayeeStatusProxyAddress(status));
          const data = [...res.data.historyTransactionMap];
          dispatch(
            actionCreators.updatePayeesProxyAddress(
              middlewareUtils.getPayeeProxyAddress(res.data, data),
            ),
          );
        } else {
          throw Error('');
        }
      })
      .catch(() => {
        const status = 'error';
        dispatch(actionCreators.savePayeeStatusProxyAddress(status));
      });
  };
}

export function spreadMarginValasRefreshRateRemittance(isConfirm) {
  return dispatch => {
    const payload = '';
    if (isConfirm === false) {
      return api
        .spreadMarginValasRefreshRateRemittance(payload, dispatch)
        .then(res => {
          const refreshRateRemittance = result(res, 'data', {});
          const rateChange = result(res, 'data.rateChange', false);
          const buttonOK = () => {
            dispatch(
              change(
                'remittanceTransferConfirmation',
                'refreshRateRemittanceValue',
                refreshRateRemittance,
              ),
            );
            dispatch(actionCreators.hideSinarmasAlert());
          };
          const hideAlert = () => {
            dispatch(actionCreators.hideSinarmasAlert());
          };
          const goBack = () => {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({routeName: 'TransferScreen'}),
                ],
              }),
            );
            hideAlert();
          };
          if (rateChange === true) {
            const sinarmasModalOptions = {
              heading1:
                language.POPUP__EXCHANGE_RATE_HEADING_SPREAD_MARGIN_VALAS,
              text: language.POPUP__EXCHANGE_RATE_SPREAD_MARGIN_VALAS,
              button1: language.GENERIC__NO,
              button2: language.GENERIC__YES,
              onButton1Press: goBack,
              onButton2Press: buttonOK,
              onClose: hideAlert,
            };
            dispatch(
              actionCreators.showSinarmasAlert({
                ...sinarmasModalOptions,
                image: 'OpenMenuActivateAtmCard',
              }),
            );
          }
          dispatch(actionCreators.hideSpinner());
        })
        .catch(() => {
          dispatch(actionCreators.hideSpinner());
        });
    }
  };
}

export function addBiFast(dataSearch) {
  return dispatch => {
    dispatch(actionCreators.saveProxyInputBiFast(dataSearch));
  };
}

export function userTagDynatrace() {
  return (dispatch, getState) => {
    getInitKeys()
      .then(() => {
        setTimeout(() => {
          const state = getState();
          const arrayLength = Boolean(
            state.appInitKeys &&
              state.appInitKeys.username &&
              state.appInitKeys.tokenClient &&
              state.appInitKeys.tokenServer,
          );
          if (arrayLength) {
            getOfferList()
              .then(offerData => {
                if (!isEmpty(offerData)) {
                  const offers = offerData;
                  const data = slice(reverse(offers), 0, 1);
                  const dataRaw = result(data, '0', '');
                  const customerData = result(dataRaw, 'Customer', {});
                  const checkCif = result(customerData, 'cifCode', '');
                  Dynatrace.identifyUser(checkCif);
                }
              })
              .catch(() => {});
          }
        }, 5000);
      })
      .catch(() => {});
  };
}

export function getBankList() {
  return dispatch =>
    api
      .getBankList(dispatch)
      .then(res => {
        const resData = result(res, 'data', []);
        set(storageKeys.BANK_LIST, resData).catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
            ),
            Toast.LONG,
          );
        });
        dispatch(actionCreators.saveBankList(resData));
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(err, language.RECURRING__TIME_OUT_OR_NO_DATA),
        );
      });
}

export function getCacheBankList() {
  return dispatch => {
    api
      .getCacheData({}, dispatch)
      .then(res => {
        getConfigVersionBankList()
          .then(response => {
            const configSaved = response;
            const configIncoming = result(
              res,
              'data.configVersion',
              0,
            ).toString();
            dispatch(actionCreators.saveConfigCache(configIncoming));
            if (
              isEmpty(response) === true ||
              (configSaved !== configIncoming) === true
            ) {
              set(storageKeys.CONFIG_VERSION_BANK_LIST, configIncoming).catch(
                err => {
                  Toast.show(
                    getErrorMessage(
                      err,
                      language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
                    ),
                    Toast.LONG,
                  );
                },
              );
              dispatch(getBankList());
            } else {
              get(storageKeys.BANK_LIST).then(res => {
                dispatch(actionCreators.saveBankList(res));
              });
            }
          })
          .catch(() => {});
      })
      .catch(() => {});
  };
}

export function getChargeListCache() {
  return dispatch =>
    api
      .getChargeList(dispatch)
      .then(res => {
        const resData = result(res, 'data.chargeConfig', []);
        dispatch(actionCreators.saveChargeList(resData));
        updateFundTransferFees(resData);
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(err, language.RECURRING__TIME_OUT_OR_NO_DATA),
        );
      });
}

export function triggerDormantModal(getshowDormantOtp) {
  return dispatch => {
    const params = {onSubmit: getshowDormantOtp, isOtp: false, isEasypin: true};
    dispatch(
      triggerAuthNavigate(
        'releaseDormant',
        null,
        true,
        'AuthDashboard',
        params,
      ),
    ); // null for replace billamount, absolute must easypin
  };
}

export function showDormantModal(data) {
  return dispatch => {
    const accountNumber = result(data, 'accountNumber');
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const setDefaultAccount = () => {
      dispatch(triggerDormantModal(goTothunkReleaseDormant));
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goTothunkReleaseDormant = () => {
      dispatch(showDormantOtp(accountNumber));
    };
    const sinarmasModalOptions = {
      heading1: language.DORMANT__MODAL_HEAD,
      text: language.DORMANT__MODAL_TEXT,
      button1: language.EMONEY__MODAL_CANCEL,
      onButton1Press: hideAlert,
      button2: language.GENERIC__OK,
      onButton2Press: setDefaultAccount,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}
