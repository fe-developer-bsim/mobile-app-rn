import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import {deviceInfo} from '../../utils/device.util';
import result from 'lodash/result';
import * as middlewareUtils from '../../utils/middleware.util';
import {
  storageKeys,
  set,
  getTransactionDetails,
  clearLocalStorage,
  getPopUpLanding,
  getInitKeys,
  offlineGenerateCode,
  get,
  getConfigListEForm,
  getConfigEmoney,
} from '../../utils/storage.util';
import {
  getErrorMessage,
  obfuscateUsername,
  normalisePhoneNumber,
  generateCaptcha,
  generateCaptchaForNTB,
  checkFlipImage,
  formatMobileNumberEmoneyRegistration,
  transformTokenIos,
  getPAramslink,
  getFirstParams,
  generateCaptcha as generateCaptchaTransformer,
  transformToken,
} from '../../utils/transformer.util';
import {StackActions, NavigationActions} from 'react-navigation';
import {Toast, Alert} from '../../utils/RNHelpers.util';
import {destroy, reset, change} from 'redux-form';
import {language} from '../../config/language';
import tracker from '../../utils/googleAnalytics.util';
import {
  hsmInit,
  clearReducer,
  assembleDataForDashboard,
  setupAppInitKeys,
  populateConfigData,
  checkCameraPermissionAndNavigate,
  inquirySimasPoin,
  populateBanners,
  tokenPaymentDeeplink,
  registerPushId,
  prepareGoSimasPoinHistory,
  setupGenericDeepLink,
  setupGenericAllsegment,
  setupGenericDeeplinkPromo,
  refreshStorage,
  prepareDataForLogin,
  smsOtpRegisterEmoney,
  checkResetByAccountType,
  resetAndNavigate,
  populateOffersPrivate,
  getTargetAccount,
  couponCustomerCounting,
  getDataOrderWithoutSpinner,
  getCache,
  populateOffersCache,
  goReferralCode,
} from './common.thunks';
import {resetToLandingAndNavigate} from './navigation.thunks';
import forEach from 'lodash/forEach';
import {tokenInit, getLoginPreference} from './appSetup.thunks.js';
import moment from 'moment';
import Pushwoosh from 'pushwoosh-react-native-plugin';
import {pushWooshAppConstants} from '../../config/env.config';
import startsWith from 'lodash/startsWith';
import find from 'lodash/find';
import {
  closeEmoneyGoToLogin,
  updatePicture,
  isNewBurgerMenu,
  getTdConfigNkycUser,
} from './dashboard.thunks';
import {goCgv, goCgvConfirm, goCgvConfirmSimas} from './cgv.thunks';
import {genericBillerNavigate} from '../../utils/genericBiller.util';
import {goTx, goTxConfirm, goTxConfirmSimas} from './flight.thunks';
import {
  randomString,
  OBM_EncryptPassword,
  OBM_GetEncodingParameter,
  OBM_GetEncryptedPassword,
} from '../../utils/vendor/pinEncryption.util';
import isEmpty from 'lodash/isEmpty';
import VersionNumber from 'react-native-version-number';
import split from 'lodash/split';
import {getDefaultAccount} from './fundTransfer.thunks';
// import firebase from 'react-native-firebase';
// let Analytics = firebase.analytics();
import md5 from 'md5';
import {Platform} from 'react-native';
import {
  gotoYouOweDetailDeepLink,
  gotoYouBillDetailDeeplink,
  goToSplitBillMenuLoginProduct,
} from './splitBill.thunks';
import {getLuckyDipTicket} from './luckyDip.thunks.js';
import {
  shouldGiveChecklist,
  listCategoryProductAlfacart,
} from './digitalStore.thunks';
import size from 'lodash/size';
import {
  getSavingProductsItemsForDeeplink,
  getCreditCardProductsItemsForDeeplink,
  getCreditCardProductsItems,
  getListLoanProduct,
  getListLoanProductFromKycUser,
  getCreditCardProductsItemsFromKycUser,
  getLoginSavingProductsItems,
} from '../../state/thunks/digitalAccountOpening.thunks';
import {genericSearchNavigate} from '../../utils/genericRouteSearch.util';
import {genericProductRoutes} from '../../utils/genericProductRoutes.util';
import {Dynatrace} from '@dynatrace/react-native-plugin';
import {insuranceLoginProduct} from './Insurance.thunks.js';

let adjustAndroid;

if (Platform.OS === 'android') {
  adjustAndroid = require('react-native-adjust');
}

export function onboardingOtpResend() {
  return (dispatch, getState) =>
    dispatch(populateConfigData())
      .then(() => {
        const smsPriority = Boolean(
          result(getState(), 'config.smsPriority.onboarding_resend', false),
        );
        return api.otpResend({smsPriority}, dispatch);
      })
      .then(res => {
        const payload = JSON.parse(result(res, 'config.data', '{}'));
        const userId = result(getState(), 'user.profile.customer.id', 0);
        tracker.trackEvent('RESEND_OTP', 'ONBOARDING', null, {
          label: `TXID: ${payload.TXID}, ID: ${userId}`,
        });
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(err, language.ONBOARDING__OTP_RESEND_FAILED),
          Toast.LONG,
        );
        throw err; // So that we can catch in the component and change UI
      });
}

export function prepareGoDashboard(isBillpay, isRouteMenuSearch) {
  return (dispatch, getState) => {
    const state = getState();
    const accountList = result(state, 'accounts', []);
    const navigationKeys = result(
      getState(),
      'promos.navigateOnPushClicked',
      false,
    );
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const urlLink =
      isBillpay === 'Privacy Policy'
        ? result(getState(), 'config.attention.urlSimobiPrivacyPolicy', '')
        : result(
            getState(),
            'config.attention.urlSimobiOnboardingTnCWithoutCheckbox',
            '',
          );
    dispatch(destroy('loginWithUsernamePassword'));
    dispatch(destroy('loginAccountForm'));
    dispatch(destroy('easyPinCreationForm'));
    dispatch(destroy('easyPinCreationConfirmForm'));
    dispatch(destroy('ActivationForm'));
    dispatch(destroy('loginEasyPinFormSearch'));
    dispatch(initStoreWithTransactionDetails());
    dispatch(isNewBurgerMenu());
    if (!isBillpay) {
      if (startsWith(cifCode, 'NK')) {
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'Landing'}),
              NavigationActions.navigate({routeName: 'homeRoutes'}),
            ],
          }),
        );
      } else {
        if (
          accountList.length === 1 &&
          find(accountList, {accountType: 'emoneyAccount'})
        ) {
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'Landing'}),
                NavigationActions.navigate({routeName: 'homeRoutes'}),
              ],
            }),
          );
        } else {
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'Landing'}),
                NavigationActions.navigate({routeName: 'homeRoutes'}),
              ],
            }),
          );
        }
      }
    } else if (isBillpay === 'Login') {
      dispatch(
        StackActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({routeName: 'Landing'}),
            NavigationActions.navigate({routeName: 'homeRoutes'}),
          ],
        }),
      );
    } else if (isRouteMenuSearch) {
      dispatch(NavigationActions.back());
      dispatch(genericSearchNavigate(isBillpay, urlLink));
    }
    if (navigationKeys.length) {
      forEach(navigationKeys, navigateKey =>
        dispatch(NavigationActions.navigate({routeName: navigateKey})),
      );
      dispatch(actionCreators.changeNotificationRoute([]));
    }
  };
}

export function prepareGoDashboardFromMigrate2() {
  return (dispatch, getState) => {
    const navigationKeys = result(
      getState(),
      'promos.navigateOnPushClicked',
      false,
    );
    const accountList = result(getState(), 'accounts', []);
    const cifCode = result(getState(), 'user.profile.customer.cifCode', '');
    dispatch(destroy('loginWithUsernamePassword'));
    dispatch(destroy('loginAccountForm'));
    dispatch(destroy('easyPinCreationForm'));
    dispatch(destroy('easyPinCreationConfirmForm'));
    dispatch(destroy('ActivationForm'));
    dispatch(initStoreWithTransactionDetails());
    dispatch(isNewBurgerMenu());
    if (startsWith(cifCode, 'NK')) {
      dispatch(NavigationActions.navigate({routeName: 'MainEmoney'}));
    } else {
      if (
        accountList.length === 1 &&
        find(accountList, {accountType: 'emoneyAccount'})
      ) {
        dispatch(NavigationActions.navigate({routeName: 'MainEmoney'}));
      } else {
        dispatch(NavigationActions.navigate({routeName: 'Main'}));
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

export function login(
  {username, password, easyPin},
  isLockedDevice,
  isResetEasypin = false,
  regisATM = false,
  loginATM = false,
  isUserRegistered = false,
  isBillpay = false,
  billpayMethodType = '',
  transferMethodType = '',
) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const smsPriority = Boolean(
      result(getState(), 'config.smsPriority.login', false),
    );
    const version = split(VersionNumber.appVersion, '.');
    const versionScope = version[0] + ',' + version[1];
    const loginAPI = api.loginNew;
    return loginAPI(
      {
        username: normalisePhoneNumber(username),
        password,
        easyPin,
        smsPriority,
        versionScope,
        billpayMethodType,
        transferMethodType,
      },
      isLockedDevice,
      dispatch,
    )
      .then(res => {
        dispatch(updatePicture());
        if (username === '62999') {
          dispatch(actionCreators.activeDemoAccount(true));
        }

        const digitalTrx = result(res, 'data.digitalTransactionService', {});
        dispatch(setLoginStorage(digitalTrx));
        dispatch(actionCreators.saveGenerateCode(digitalTrx));
        const userId = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.id',
          '',
        );
        if (!password && !easyPin && !isBillpay) {
          dispatch(actionCreators.updateLastLogin('fingerprint'));
          set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'fingerprint').catch(err => {
            Toast.show(
              getErrorMessage(
                err,
                language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
              ),
              Toast.LONG,
            );
          });
          tracker.trackEvent('LOGIN_FINGERPRINT_SUCCESS', 'ONBOARDING', null, {
            ID: userId,
          });
        } else {
          dispatch(actionCreators.clearLastLogin());
          set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'easypin').catch(err => {
            Toast.show(
              getErrorMessage(
                err,
                language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
              ),
              Toast.LONG,
            );
          });
        }
        const privateOffers = result(res.data, 'privateOffers', []);
        dispatch(actionCreators.savePrivateOffers(privateOffers));
        const serverTime = moment(
          result(res, 'data.serverTime', '').toString(),
        );
        const appTime = new Date();
        const diff = moment(appTime, 'DD/MM/YYYY').diff(
          moment(serverTime, 'DD/MM/YYYY'),
        );
        const gapTime = Math.round(moment.duration(diff).asSeconds());
        const userApiKey = result(res.data, 'userApiKey', '');
        const faceRegistered = result(res.data, 'isFaceRegister', false);
        const defaultValueAccount = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.accountList',
          {},
        );
        const getdefaultAccount = find(defaultValueAccount, {
          accountType: 'emoneyAccount',
        });
        set(
          storageKeys.ACCOUNT_DATA_DEFAULT,
          middlewareUtils.getAccountDefaultEmoney(getdefaultAccount),
        );
        dispatch(
          actionCreators.isFaceRegisteredUpdate({
            isFaceRegistered: faceRegistered,
          }),
        );
        set(storageKeys.IS_FACE_REGISTERED, {
          isFaceRegistered: faceRegistered,
        }).catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
            ),
            Toast.LONG,
          );
        });
        const stateReduc = getState();
        const tooglePushLoginID = result(
          stateReduc,
          'config.flag.flagPushNotifCifCode',
          'INACTIVE',
        );
        const loginPushwooshID =
          tooglePushLoginID === 'ACTIVE'
            ? result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
                '',
              )
            : result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.loginName',
                '',
              ).toLowerCase();
        const loginSetTagID = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.title',
          '',
        ).toLowerCase();
        const checkCif = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
          '',
        );
        const isAutoSave = result(res, 'data.isAutoSave', []);
        const transfer = result(isAutoSave, 'transfer', false);
        const billPay = result(isAutoSave, 'billPay', false);
        const isSaving = result(isAutoSave, 'isSaving', false);
        const DigitalStore = result(isAutoSave, 'DigitalStore', false);
        const QR = result(isAutoSave, 'QR', false);
        dispatch(
          actionCreators.saveAutoSave({
            transfer: transfer,
            billPay: billPay,
            isSaving: isSaving,
            DigitalStore: DigitalStore,
            QR: QR,
          }),
        );
        dispatch(actionCreators.saveUserApiKey(userApiKey));
        dispatch(actionCreators.setGapTimeServer(gapTime));
        dispatch(
          actionCreators.saveTransRefNum(result(res, 'data.transRefNum', '')),
        );
        dispatch(actionCreators.saveConfigTime(res.data));

        dispatch(populateConfigCacheEFormData());

        if (regisATM) {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.attributeMap.iPassport'),
            }),
          );
        } else {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.ipassport'),
            }),
          );
          if (isBillpay) {
            prepareDataForLogin(dispatch, res, checkCif);
          } else {
            assembleDataForDashboard(dispatch, res);
          }
        }
        dispatch(actionCreators.hideSpinner());
        dispatch(change('loginWithUsernamePassword', 'password', ''));
        tracker.setUser(
          String(result(getState(), 'user.profile.customer.id', deviceInfo.id)),
        );
        const isDemoAccount = /^DEMO-/.test(
          result(res, 'data.ipassport', undefined),
        );
        if ((isLockedDevice || isDemoAccount) && !isResetEasypin) {
          dispatch(registerPushId(loginPushwooshID, loginSetTagID));
          if (faceRegistered) {
            dispatch(prepareGoDashboard(isBillpay));
            if (isBillpay) {
              return Promise.resolve();
            }
          } else {
            const skipFunction = () => {
              dispatch(prepareGoDashboard(isBillpay));
              if (isBillpay) {
                return Promise.resolve();
              }
            };
            dispatch(
              checkCameraPermissionAndNavigate(
                'CameraPage',
                {action: 'RegisterLockdown'},
                true,
                skipFunction,
              ),
            );
          }
        } else {
          const mobileNumber = result(
            res,
            'data.ipassportData.ipassDataClient.profileScope.userLogin.mobileNumberMasking',
            '',
          );
          const mobileNumberATM = result(
            res,
            'data.attributeMap.mobileNumberMasking',
            '',
          );
          const payload = JSON.parse(result(res, 'config.data', '{}'));
          if (mobileNumber || mobileNumberATM) {
            if (loginATM) {
              const params = {
                maskedUsername: obfuscateUsername(username),
                isResetEasypin,
              };
              dispatch(registerPushId(loginPushwooshID, loginSetTagID));
              if (isBillpay) {
                return Promise.resolve();
              } else {
                dispatch(resetToLandingAndNavigate('EasyPin', params));
              }
            } else {
              const params = {
                isEasyPinSet: res.data.isEasyPinSet,
                maskedUsername: obfuscateUsername(username),
                disableEasyPinLogin: true,
                TXID: payload.TXID,
                isResetEasypin,
                regisATM,
                newUserMobile: mobileNumberATM,
              };
              dispatch(registerPushId(loginPushwooshID, loginSetTagID));
              if (isBillpay) {
                return Promise.resolve();
              } else {
                dispatch(resetToLandingAndNavigate('OTP', params));
              }
            }
            set(storageKeys.MOBILE_NUMBER, mobileNumber).catch(err => {
              Toast.show(
                getErrorMessage(
                  err,
                  language.ERROR_MESSAGE__COULD_NOT_STORE_MOBILE_NUMBER,
                ),
                Toast.LONG,
              );
            });
          } else {
            Alert.alert(
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TITLE,
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TEXT,
              [
                {
                  text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                },
              ],
            );
          }
        }
      })
      .catch(err => {
        if (password === '' && easyPin === '') {
          tracker.trackEvent(
            'LOGIN_FINGERPRINT_FAILED',
            'ONBOARDING',
            null,
            {},
          );
        }
        dispatch(actionCreators.hideSpinner());
        if (isBillpay) {
          return Promise.reject(err);
        } else {
          isLockedDevice || isUserRegistered
            ? dispatch(change('loginWithUsernamePassword', 'password', ''))
            : dispatch(reset('loginWithUsernamePassword'));
          dispatch(reset('loginEasyPinForm'));
          const errorCode = result(err, 'data.responseCode', '');
          if (errorCode === '05') {
            // Dormant IB user
            Alert.alert(
              language.ONBOARDING__DORMANT_TITLE,
              language.ONBOARDING__DORMANT_TEXT,
              [
                {
                  text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                  onPress: () => {
                    dispatch(clearAndResetPasswordBurgerMenuNoAlert());
                  },
                },
              ],
            );
            return;
          }
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOG_IN),
            Toast.LONG,
          );
        }
      });
  };
}

export function loginOBM(
  {username, password, easyPin},
  isLockedDevice,
  isOBM,
  isResetEasypin = false,
  regisATM = false,
  loginATM = false,
  isUserRegistered = false,
  routeMenuSearch,
  isRouteMenuSearch,
) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const saveRandomNumber = result(getState(), 'randomNumber', '');
    const smsPriority = Boolean(
      result(getState(), 'config.smsPriority.login', false),
    );
    let randomNumber = randomString(16);
    if (!isEmpty(saveRandomNumber)) {
      randomNumber = randomString(16);
    }
    do {
      randomNumber = randomString(16);
    } while (randomNumber === saveRandomNumber);

    OBM_EncryptPassword(password ? password : easyPin, randomNumber);
    if (easyPin) {
      easyPin =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    } else if (password) {
      password =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    }
    const deviceInfoLogin = {
      name: deviceInfo.name,
      model: deviceInfo.model,
    };
    const version = split(VersionNumber.appVersion, '.');
    const versionScope = version[0] + ',' + version[1];
    const loginAPI = api.loginNew;
    dispatch(actionCreators.generateRandomNumber(randomNumber));
    return loginAPI(
      {
        username: normalisePhoneNumber(username),
        password,
        easyPin,
        smsPriority,
        deviceInfoLogin,
        versionScope,
      },
      isLockedDevice,
      dispatch,
    )
      .then(res => {
        const dataCore = result(res, 'data', {});
        const userMember = result(res, 'data.customerSegment', '');
        dispatch(actionCreators.saveUserMemberData(userMember));
        // const os = Platform.OS;
        // const message = 'Login-Success';
        // Analytics.logEvent('LOGIN_ATTEMPT', {device: os, status: message});
        const setNewCredentialOBM = result(
          res,
          'data.setNewCredentialOBM',
          'ALL',
        );
        const profileScope = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope',
          '',
        );
        const lazylogin =
          result(getState(), 'config.lazyLogin', '') === 'active';
        if (lazylogin !== true) {
          dispatch(updatePicture());
        }
        if (username === '62999') {
          dispatch(actionCreators.activeDemoAccount(true));
        }
        const digitalTrx = result(res, 'data.digitalTransactionService', {});
        dispatch(setLoginStorage(digitalTrx));
        dispatch(actionCreators.saveGenerateCode(digitalTrx));
        const userId = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.id',
          '',
        );
        if (!password && !easyPin) {
          dispatch(actionCreators.updateLastLogin('fingerprint'));
          set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'fingerprint').catch(err => {
            Toast.show(
              getErrorMessage(
                err,
                language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
              ),
              Toast.LONG,
            );
          });
          tracker.trackEvent('LOGIN_FINGERPRINT_SUCCESS', 'ONBOARDING', null, {
            ID: userId,
          });
        } else {
          dispatch(actionCreators.clearLastLogin());
          set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'easypin').catch(err => {
            Toast.show(
              getErrorMessage(
                err,
                language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
              ),
              Toast.LONG,
            );
          });
        }
        const privateOffers = result(res.data, 'privateOffers', []);
        dispatch(actionCreators.savePrivateOffers(privateOffers));
        const serverTime = moment(
          result(res, 'data.serverTime', '').toString(),
        );
        const appTime = new Date();
        const diff = moment(appTime, 'DD/MM/YYYY').diff(
          moment(serverTime, 'DD/MM/YYYY'),
        );
        const gapTime = Math.round(moment.duration(diff).asSeconds());
        const userApiKey = result(res.data, 'userApiKey', '');
        const faceRegistered = result(res.data, 'isFaceRegister', false);
        const defaultValueAccount = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.accountList',
          {},
        );
        const getdefaultAccount = find(defaultValueAccount, {
          accountType: 'emoneyAccount',
        });
        set(
          storageKeys.ACCOUNT_DATA_DEFAULT,
          middlewareUtils.getAccountDefaultEmoney(getdefaultAccount),
        );
        dispatch(
          actionCreators.isFaceRegisteredUpdate({
            isFaceRegistered: faceRegistered,
          }),
        );
        set(storageKeys.IS_FACE_REGISTERED, {
          isFaceRegistered: faceRegistered,
        }).catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
            ),
            Toast.LONG,
          );
        });
        const stateReduc = getState();
        const tooglePushLoginID = result(
          stateReduc,
          'config.flag.flagPushNotifCifCode',
          'INACTIVE',
        );
        const loginPushwooshID =
          tooglePushLoginID === 'ACTIVE'
            ? result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
                '',
              )
            : result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.loginName',
                '',
              ).toLowerCase();
        const loginSetTagID = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.title',
          '',
        ).toLowerCase();
        const checkCif = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
          '',
        );
        Dynatrace.identifyUser(checkCif);
        const isAutoSave = result(res, 'data.isAutoSave', []);
        const transfer = result(isAutoSave, 'transfer', false);
        const billPay = result(isAutoSave, 'billPay', false);
        const isSaving = result(isAutoSave, 'isSaving', false);
        const DigitalStore = result(isAutoSave, 'DigitalStore', false);
        const QR = result(isAutoSave, 'QR', false);
        dispatch(
          actionCreators.saveAutoSave({
            transfer: transfer,
            billPay: billPay,
            isSaving: isSaving,
            DigitalStore: DigitalStore,
            QR: QR,
          }),
        );
        dispatch(actionCreators.saveConfigTime(res.data));
        dispatch(actionCreators.saveUserApiKey(userApiKey));
        dispatch(actionCreators.setGapTimeServer(gapTime));
        dispatch(
          actionCreators.saveTransRefNum(result(res, 'data.transRefNum', '')),
        );
        if (regisATM) {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.attributeMap.iPassport'),
            }),
          );
        } else {
          const ipassport = result(res, 'data.ipassport');
          const iPassport = result(res, 'data.attributeMap.iPassport');
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: isEmpty(ipassport) ? iPassport : ipassport,
            }),
          );
          assembleDataForDashboard(dispatch, res);
        }
        dispatch(actionCreators.hideSpinner());
        dispatch(change('loginWithUsernamePassword', 'password', ''));
        tracker.setUser(
          String(result(getState(), 'user.profile.customer.id', deviceInfo.id)),
        );
        const isDemoAccount = /^DEMO-/.test(
          result(res, 'data.ipassport', undefined),
        );
        if ((isLockedDevice || isDemoAccount) && !isResetEasypin) {
          dispatch(registerPushId(loginPushwooshID, loginSetTagID));
          if (faceRegistered) {
            if (size(dataCore) !== 0) {
              if (setNewCredentialOBM === 'EASYPIN_OBM') {
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'EasyPinVerify',
                    params: {
                      nextRouteName: 'Dashboard',
                      setNewCredentialOBM: setNewCredentialOBM,
                      isOBM,
                    },
                  }),
                );
              } else if (setNewCredentialOBM === 'PASSWORD') {
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'ValidatePassword',
                    params: {
                      nextRouteName: 'Dashboard',
                      isOBMPassword: true,
                      isOBM: false,
                      profileScope,
                    },
                  }),
                );
              } else if (setNewCredentialOBM === 'ALL') {
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'ValidatePassword',
                    params: {
                      nextRouteName: 'Dashboard',
                      isOBMAll: true,
                      isOBM,
                      profileScope,
                    },
                  }),
                );
              } else {
                if (routeMenuSearch === 'LoginEtax') {
                  dispatch(
                    StackActions.reset({
                      index: 0,
                      actions: [
                        NavigationActions.navigate({routeName: 'Landing'}),
                      ],
                    }),
                  );
                  dispatch(
                    NavigationActions.navigate({
                      routeName: 'ETax',
                      params: {biller: isRouteMenuSearch},
                    }),
                  );
                  dispatch(
                    NavigationActions.navigate({
                      routeName: 'EtaxHistoryFilter',
                      params: {biller: isRouteMenuSearch},
                    }),
                  );
                } else {
                  dispatch(prepareGoDashboard());
                }
              }
            } else {
              Toast.show(language.ERROR_MESSAGE__COULD_NOT_LOG_IN, Toast.LONG);
            }
          } else {
            const skipFunction = () => {
              if (setNewCredentialOBM === 'EASYPIN_OBM') {
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'EasyPinVerify',
                    params: {
                      nextRouteName: 'Dashboard',
                      setNewCredentialOBM: setNewCredentialOBM,
                      isOBM,
                      isOBMEasyPin: true,
                    },
                  }),
                );
              } else if (setNewCredentialOBM === 'PASSWORD') {
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'ValidatePassword',
                    params: {
                      nextRouteName: 'Dashboard',
                      isOBMPassword: true,
                      isOBM,
                      profileScope,
                      routeMenuSearch,
                    },
                  }),
                );
              } else if (setNewCredentialOBM === 'ALL') {
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'ValidatePassword',
                    params: {
                      nextRouteName: 'Dashboard',
                      isOBMAll: true,
                      isOBM,
                      profileScope,
                    },
                  }),
                );
              } else {
                if (routeMenuSearch === 'LoginEtax') {
                  dispatch(
                    StackActions.reset({
                      index: 0,
                      actions: [
                        NavigationActions.navigate({routeName: 'Landing'}),
                      ],
                    }),
                  );
                  dispatch(
                    NavigationActions.navigate({
                      routeName: 'ETax',
                      params: {biller: isRouteMenuSearch},
                    }),
                  );
                  dispatch(
                    NavigationActions.navigate({
                      routeName: 'EtaxHistoryFilter',
                      params: {biller: isRouteMenuSearch},
                    }),
                  );
                } else {
                  dispatch(
                    prepareGoDashboard(routeMenuSearch, isRouteMenuSearch),
                  );
                }
              }
            };
            dispatch(
              checkCameraPermissionAndNavigate(
                'CameraPage',
                {action: 'RegisterLockdown'},
                true,
                skipFunction,
              ),
            );
          }
        } else {
          const mobileNumber = result(
            res,
            'data.ipassportData.ipassDataClient.profileScope.userLogin.mobileNumberMasking',
            '',
          );
          const mobileNumberATM = result(
            res,
            'data.attributeMap.mobileNumberMasking',
            '',
          );
          const payload = JSON.parse(result(res, 'config.data', '{}'));
          if (mobileNumber || mobileNumberATM) {
            if (loginATM) {
              const params = {
                maskedUsername: obfuscateUsername(username),
                isResetEasypin,
              };
              dispatch(registerPushId(loginPushwooshID, loginSetTagID));
              dispatch(resetToLandingAndNavigate('EasyPin', params));
            } else {
              const params = {
                isEasyPinSet: res.data.isEasyPinSet,
                maskedUsername: obfuscateUsername(username),
                disableEasyPinLogin: true,
                TXID: payload.TXID,
                isResetEasypin,
                regisATM,
                newUserMobile: mobileNumberATM,
              };
              dispatch(resetToLandingAndNavigate('OTP', params));
            }
            set(storageKeys.MOBILE_NUMBER, mobileNumber).catch(err => {
              Toast.show(
                getErrorMessage(
                  err,
                  language.ERROR_MESSAGE__COULD_NOT_STORE_MOBILE_NUMBER,
                ),
                Toast.LONG,
              );
            });
          } else {
            Alert.alert(
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TITLE,
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TEXT,
              [
                {
                  text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                },
              ],
            );
          }
        }
      })
      .catch(err => {
        // const os = Platform.OS;
        // const message = 'Login-Failed';
        // Analytics.logEvent('LOGIN_ATTEMPT', {device: os, status: message});
        const errorOBM = result(err, 'data.migrateToOBM', '');
        if (errorOBM === 'true') {
          dispatch(NavigationActions.navigate({routeName: 'ObmMigrate'}));
        }
        if (password === '' && easyPin === '') {
          tracker.trackEvent(
            'LOGIN_FINGERPRINT_FAILED',
            'ONBOARDING',
            null,
            {},
          );
        }
        dispatch(actionCreators.hideSpinner());
        isLockedDevice || isUserRegistered
          ? dispatch(change('loginWithUsernamePassword', 'password', ''))
          : dispatch(reset('loginWithUsernamePassword'));
        dispatch(destroy('loginEasyPinForm'));
        const errorCode = result(err, 'data.responseCode', '');
        if (errorCode === '05') {
          // Dormant IB user
          Alert.alert(
            language.ONBOARDING__DORMANT_TITLE,
            language.ONBOARDING__DORMANT_TEXT,
            [
              {
                text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                onPress: () => {
                  dispatch(clearAndResetPasswordBurgerMenuNoAlert());
                },
              },
            ],
          );
          return;
        }
        if (errorOBM === 'true') {
          null;
        } else {
          const status = result(err, 'status', 400);
          if (status === 429) {
            Toast.show(
              getErrorMessage(err, language.COMMON__TIMEOUT_TITLE1_F5),
              Toast.LONG,
            );
          } else {
            Toast.show(
              getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOG_IN),
              Toast.LONG,
            );
          }
        }
      });
  };
}

export function logout() {
  return (dispatch, getState) => {
    const allOffers = result(getState(), 'promos.offers', []);
    if (isEmpty(allOffers)) {
      const isReload = true;
      dispatch(populateOffersPrivate(isReload));
    }
    dispatch(actionCreators.showSpinner());
    const cifCode = result(getState(), 'insuranceDataTravel.cifCode', '');
    return api
      .logOut(dispatch)
      .then(() => {
        dispatch(getDefaultAccount());
        dispatch(destroy('LoginWithEasyPinAccount'));
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.cleanAppState());
        dispatch(actionCreators.savePositionDeeplink('yes'));
        if (startsWith(cifCode, 'NK')) {
          dispatch(resetAndNavigate('MainEmoney'));
        } else {
          dispatch(resetAndNavigate('Main'));
        }
      })
      .catch(() => {
        dispatch(destroy('LoginWithEasyPinAccount'));
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.cleanAppState());
        dispatch(actionCreators.savePositionDeeplink('yes'));
        if (startsWith(cifCode, 'NK')) {
          dispatch(resetAndNavigate('MainEmoney'));
        } else {
          dispatch(resetAndNavigate('Main'));
        }
      });
  };
}

export function logoutDashboard(isProfile) {
  return (dispatch, getState) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const logout = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      const allOffers = result(getState(), 'promos.offers', []);
      if (isEmpty(allOffers)) {
        const isReload = true;
        dispatch(populateOffersPrivate(isReload));
      }
      const cifCode = result(getState(), 'insuranceDataTravel.cifCode', '');
      dispatch(actionCreators.showSpinner());
      return api
        .logOut(dispatch)
        .then(() => {
          dispatch(destroy('LoginWithEasyPinAccount'));
          dispatch(destroy('loginEasyPinFormSearch'));
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.cleanAppState());
          dispatch(actionCreators.savePositionDeeplink('yes'));
          if (startsWith(cifCode, 'NK')) {
            dispatch(resetAndNavigate('MainEmoney'));
          } else {
            if (isProfile) {
              dispatch(resetAndNavigate('Main'));
            } else {
              return Promise.resolve();
            }
          }
        })
        .catch(() => {
          dispatch(destroy('LoginWithEasyPinAccount'));
          dispatch(destroy('loginEasyPinFormSearch'));
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.cleanAppState());
          dispatch(actionCreators.savePositionDeeplink('yes'));
        });
    };
    const sinarmasModalOptions = {
      text: language.LOGOUT_CONFIRMATION,
      button1: language.GENERIC__CANCEL,
      onButton1Press: hideAlert,
      button2: language.GENERIC_LOGOUT,
      onButton2Press: logout,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function registerATMCard(
  cardData,
  isForgetPassword,
  simasCaptcha,
  goToPin,
) {
  const {panNumber, captchaInput} = cardData;
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    return dispatch(populateConfigData())
      .then(() => {
        const smsPriority = result(
          getState(),
          'config.smsPriority.onboarding_send',
          false,
        );
        const captchaId = result(simasCaptcha, 'captchaId', '').toString();
        return api.fetchPanNumber(
          {panNumber, smsPriority, isForgetPassword, captchaInput, captchaId},
          dispatch,
        );
      })
      .then(r => {
        dispatch(actionCreators.clearCaptcha());
        // The iPassport is expected if the user has not been onboarded. the following basically handles the safe condition of using ipassport if it exists in the response
        if (result(r, 'data.attributeMap', null)) {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(
                r,
                'data.attributeMap.iPassport',
                'data.attributeMap.ipassport',
              ),
            }),
          );
        }
        return r || {};
      })
      .then(({data, config}) => {
        dispatch(actionCreators.hideSpinner());
        dispatch(
          actionCreators.saveTransRefNum(result(data, 'transRefNum', '')),
        );
        const payload = JSON.parse(result(config, 'data', '{}'));
        const params = {
          TXID: payload.TXID,
          panNumber,
          newUserMobile: result(
            data,
            'attributeMap.mobileNumberMasking',
            false,
          ),
          isForgetPassword,
          goToPin,
        };
        dispatch(resetToLandingAndNavigate('OTP', params));
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        const errorCode = result(err, 'data.responseCode', '');
        if (errorCode === '05') {
          Alert.alert(
            language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TITLE,
            language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TEXT,
            [
              {
                text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                onPress: () => {
                  dispatch(
                    NavigationActions.navigate({routeName: 'Onboarding'}),
                  );
                },
              },
            ],
          );
          return;
        }
        dispatch(change('registerATMCardForm', 'captchaInput', ''));
        dispatch(actionCreators.setCaptcha(generateCaptcha()));
        Toast.show(
          getErrorMessage(
            err,
            language.ONBOARDING__ATM_VALIDATION_COULD_NOT_VERIFY,
          ),
          Toast.LONG,
        );
      });
  };
}

export function verifyOTPWhenEasyPinSet(OTP, maskedUsername) {
  return dispatch =>
    api
      .otpVerify(OTP, dispatch)
      .then(() => {
        const params = {maskedUsername};
        dispatch(resetToLandingAndNavigate('EasyPinVerify', params));
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_VERFIY_OTP),
          Toast.LONG,
        );
      });
}

export function verifyOTPWhenEasyPinNotSet(
  OTP,
  maskedUsername,
  isResetEasypin,
) {
  return (dispatch, getState) =>
    api
      .otpVerify(OTP, dispatch)
      .then(res => {
        const state = getState();
        const token = result(res, 'data.token', '');
        const ipassport = result(state, 'additionalApiPayload.ipassport', '');
        const typeActivationDeeplink = result(
          state,
          'typeActivationDeeplink',
          '',
        );
        const username = isResetEasypin ? maskedUsername : '';
        const params = {
          maskedUsername: username,
          isResetEasypin,
          typeActivationDeeplink,
          token,
          ipassport,
        };
        dispatch(
          actionCreators.saveTokenRegister({
            token: token,
            ipassport: ipassport,
          }),
        );
        dispatch(resetToLandingAndNavigate('EasyPin', params));
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_VERFIY_OTP),
          Toast.LONG,
        );
      });
}

export function verifyOTP(
  OTP,
  maskedUsername,
  isResetEasypin,
  isForgetPassword,
  panNumber,
  regisATM,
) {
  return (dispatch, getState) =>
    api
      .otpVerify(OTP, dispatch)
      .then(res => {
        const state = getState();
        const transRefNum = result(state, 'transRefNum');
        const subs1 = OTP.substring(0, 4);
        const subs2 = transRefNum.substring(
          transRefNum.length - 3,
          transRefNum.length,
        );
        const transactionCode = subs1 + subs2;
        const uniCode = md5(transactionCode);
        const typeActivationDeeplink = result(
          state,
          'typeActivationDeeplink',
          '',
        );
        const code = result(res, 'data.transactionCode', '');
        const token = result(res, 'data.token', '');
        const ipassport = result(state, 'additionalApiPayload.ipassport', '');
        if (code === uniCode || isEmpty(token)) {
          if (regisATM) {
            const params = {
              isForgetPassword,
              isResetEasypin,
              typeActivationDeeplink,
              token,
              ipassport,
            };
            dispatch(
              actionCreators.saveTokenRegister({
                token: token,
                ipassport: ipassport,
              }),
            );
            dispatch(resetToLandingAndNavigate('LoginAccount', params));
          } else {
            dispatch(actionCreators.hideSpinner());
            const params = {
              isForgetPassword,
              isResetEasypin,
              maskedUsername,
              panNumber,
              typeActivationDeeplink,
              code,
              token,
              ipassport,
            };
            dispatch(
              actionCreators.saveTokenRegister({
                token: token,
                ipassport: ipassport,
              }),
            );
            dispatch(resetToLandingAndNavigate('RegisterPin', params));
          }
        }
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_VERFIY_OTP),
          Toast.LONG,
        );
      });
}

export function setLoginAccount(account, isResetEasypin, uniCode, token) {
  const {username, isAllowedIB} = account;
  let {password} = account;
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    return dispatch(populateConfigData())
      .then(() => {
        const randomNumber = randomString(16);
        OBM_EncryptPassword(password, randomNumber);
        if (password) {
          password =
            'encryptedPassword:' +
            OBM_GetEncryptedPassword() +
            '|encodingParameter:' +
            OBM_GetEncodingParameter() +
            '|randomNumber:' +
            randomNumber;
        } else {
          null;
        }
        const deviceInfoLogin = {
          name: deviceInfo.name,
          model: deviceInfo.model,
        };
        const version = VersionNumber.appVersion;
        const versionScope = version.replace(/[.]+/g, ',');
        return api.createUsernamePassword(
          {
            username,
            password,
            isAllowedIB,
            deviceInfoLogin,
            token,
            versionScope,
          },
          dispatch,
        );
      })
      .then(res => {
        const userMember = result(res, 'data.customerSegment', '');
        dispatch(actionCreators.saveUserMemberData(userMember));
        const token = result(res, 'data.token', '');
        const ipassport = result(res, 'data.ipassport', '');
        const loginSetTagID = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.title',
          '',
        ).toLowerCase();
        dispatch(
          actionCreators.setAPIPayloadParam({
            ipassport: result(res, 'data.ipassport'),
          }),
        );
        dispatch(actionCreators.hideSpinner());
        if (isResetEasypin) {
          const hideAlert = () => {
            dispatch(actionCreators.hideSinarmasAlert());
          };
          const navigateToEasyPin = () => {
            assembleDataForDashboard(dispatch, res);
            tracker.setUser(
              String(
                result(getState(), 'user.profile.customer.id', deviceInfo.id),
              ),
            );
            dispatch(actionCreators.hideSinarmasAlert());
            const params = {
              maskedUsername: obfuscateUsername(username),
              isResetEasypin,
              ipassport,
              token,
            };
            dispatch(
              actionCreators.saveTokenRegister({
                token: token,
                ipassport: ipassport,
              }),
            );
            dispatch(registerPushId(username, loginSetTagID));
            const skipFunction = () =>
              dispatch(resetToLandingAndNavigate('EasyPin', params));
            dispatch(
              checkCameraPermissionAndNavigate(
                'CameraPage',
                {action: 'Register', params},
                true,
                skipFunction,
              ),
            );
          };
          const modalOptions = {
            heading1: language.ONBOARDING__FORGOT_PASSWORD_MODAL_HEADER_1,
            heading2: language.ONBOARDING__MODAL_HEADER_2,
            text: language.ONBOARDING__FORGOT_PASSWORD_1_MORE_STEP,
            button1: language.PROFILE__EASYPIN_MODAL_OK,
            onButton1Press: navigateToEasyPin,
            onClose: hideAlert,
            closeOnTouchOutside: false,
          };
          dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
        } else {
          assembleDataForDashboard(dispatch, res);
          tracker.setUser(
            String(
              result(getState(), 'user.profile.customer.id', deviceInfo.id),
            ),
          );
          const params = {
            maskedUsername: obfuscateUsername(username),
            isResetEasypin,
            ipassport,
            token,
          };
          dispatch(
            actionCreators.saveTokenRegister({
              token: token,
              ipassport: ipassport,
            }),
          );
          dispatch(registerPushId(username, loginSetTagID));
          dispatch(resetToLandingAndNavigate('EasyPin', params));
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        const errorCode = result(err, 'data.responseCode', '');
        if (errorCode === '01') {
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE_RESET_PASSWORD_LINK),
            Toast.LONG,
          );
        } else {
          dispatch(destroy('loginAccountForm'));
          dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({routeName: 'Introduction'}),
              ],
            }),
          );
        }
      });
  };
}

export function prepareCompletedOnboarding(
  maskedUsername,
  forgetEasyPin = false,
  isRegistDeeplink = false,
  isPinCreation = false,
) {
  return dispatch =>
    set(storageKeys.USERNAME, maskedUsername)
      .then(() => {
        dispatch(setupAppInitKeys());
        set(storageKeys.WELCOME_EMONEY, true);

        if (forgetEasyPin) {
          dispatch(prepareGoDashboardFromMigrate(isPinCreation));
        } else if (isRegistDeeplink) {
          dispatch(actionCreators.saveNewOnboarding('yes'));
          dispatch(prepareGoDashboard());
        } else {
          dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({routeName: 'CompletedOnboarding'}),
              ],
            }),
          );
        }
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__SET_LOGverifyIN_ACCOUNT),
          Toast.LONG,
        );
        dispatch(destroy('loginWithUsernamePassword'));
      });
}

export function setEasyPin(
  easyPinData,
  maskedUsername,
  isResetEasypin = false,
  isRegistDeeplink = false,
  firebaseEmoney = false,
  isPinCreation = false,
) {
  const {easyPinConfirm} = easyPinData;
  return (dispatch, getState) => {
    const state = getState();
    const token = result(state, 'tokenRegister.token', '');
    const ipassport = result(state, 'tokenRegister.ipassport', '');
    const isFromEmoney = result(state, 'tokenRegister.isFromEmoney', '');
    const ipassportEmoney = result(state, 'user.ipassport', '');
    const transRefNum = result(state, 'tokenRegister.transRefNum', '');
    return api
      .easyPinRegister(
        middlewareUtils.prepareEasyPinRegister(
          easyPinConfirm,
          isResetEasypin,
          token,
          ipassport,
          isFromEmoney,
          transRefNum,
          ipassportEmoney,
        ),
        dispatch,
      )
      .then(() => {
        const state = getState();
        const tooglePushLoginID = result(
          state,
          'config.flag.flagPushNotifCifCode',
          'INACTIVE',
        );
        const loginPushwooshID =
          tooglePushLoginID === 'ACTIVE'
            ? result(state, 'user.profile.customer.cifCode', '')
            : result(state, 'user.profile.loginName', '').toLowerCase();
        const loginSetTagID = result(
          state,
          'user.profile.title',
          '',
        ).toLowerCase();
        const params = {maskedUsername, isResetEasypin, isRegistDeeplink};
        const isFaceRegistered = result(
          getState(),
          'isFaceRegistered.isFaceRegistered',
          false,
        );
        const skipped = result(getState(), 'isFaceRegistered.skipped', false);
        // if (firebaseEmoney) {
        //   Analytics.logEvent('REGIST_EMONEY', {device: 'android', step_route: '9'});
        // }
        if (isFaceRegistered || skipped || isRegistDeeplink) {
          dispatch(registerPushId(loginPushwooshID, loginSetTagID));
          dispatch(populateOffersCache());
          dispatch(
            prepareCompletedOnboarding(
              maskedUsername,
              isResetEasypin,
              isRegistDeeplink,
              isPinCreation,
            ),
          );
          dispatch(destroy('easyPinCreationForm'));
          dispatch(destroy('easyPinCreationConfirmForm'));
        } else {
          const skipFunction = () => {
            dispatch(
              prepareCompletedOnboarding(
                maskedUsername,
                isResetEasypin,
                isRegistDeeplink,
                isPinCreation,
              ),
            );
            dispatch(destroy('easyPinCreationForm'));
            dispatch(destroy('easyPinCreationConfirmForm'));
          };
          dispatch(populateOffersCache());
          dispatch(registerPushId(loginPushwooshID, loginSetTagID));
          dispatch(
            checkCameraPermissionAndNavigate(
              'CameraPage',
              {action: 'RegisterExisting', params},
              true,
              skipFunction,
            ),
          );
        }
        dispatch(actionCreators.clearTokenRegister());
      })
      .catch(err => {
        // if (firebaseEmoney) {
        //   Analytics.logEvent('REGIST_EMONEY', {device: 'android', step_route: '10'});
        // }
        tracker.trackEvent('NON_FATAL_ERROR', 'SET EASYPIN FAILED', null, {
          label: `ERROR_MSG: ${JSON.stringify(err)}`,
        });
        Pushwoosh.init({
          pw_appid: pushWooshAppConstants.applicationID,
          project_number: pushWooshAppConstants.FCMID,
        });
        Pushwoosh.register();
        Pushwoosh.setUserId('HWID');
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__SET_EASYPIN_ERROR),
          Toast.LONG,
        );
      });
  };
}

export function verifyEasyPin(easyPinData, maskedUsername) {
  const {easyPinVerify} = easyPinData;
  return dispatch =>
    api
      .easyPinRegister(
        middlewareUtils.prepareEasyPinRegister(easyPinVerify),
        dispatch,
      )
      .then(res => {
        dispatch(prepareCompletedOnboarding(maskedUsername));
        return res.data;
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_VERIFY_EASYPIN,
          ),
          Toast.LONG,
        );
      });
}

export function initStoreWithTransactionDetails() {
  return dispatch =>
    getTransactionDetails().then(values => {
      if (values[0]) {
        dispatch(actionCreators.allElectricityPayment(values[0]));
      }
      if (values[1]) {
        dispatch(actionCreators.allWaterPayment(values[1]));
      }
      if (values[2]) {
        dispatch(actionCreators.allPostpaidPayment(values[2]));
      }
      if (values[3]) {
        dispatch(actionCreators.allRecharges(values[3]));
      }
      if (values[4]) {
        dispatch(actionCreators.allPayees(values[4]));
      }
      if (values[5]) {
        dispatch(actionCreators.allCreditCardPayment(values[5]));
      }
    });
}

export function forgetEasyPin(values) {
  const {username, password} = values;
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    dispatch(login({username, password}, false, true));
  };
}

export function clearAndResetEasyPin() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const resetEasyPin = () => {
      dispatch(destroy('loginWithUsernamePassword'));
      Promise.all([clearLocalStorage(), dispatch(clearReducer())])
        .then(() => {
          dispatch(getLoginPreference());
          dispatch(tokenInit()).then(() => dispatch(hsmInit()));
          const params = {action: 'forgotEasyPin'};
          dispatch(resetToLandingAndNavigate('LoginAccount', params));
          dispatch(actionCreators.hideSinarmasAlert());
          dispatch(actionCreators.savePositionDeeplink('yes'));
        })
        .catch(() => {
          dispatch(actionCreators.hideSinarmasAlert());
          dispatch(actionCreators.savePositionDeeplink('yes'));
          Toast.show('Error clearing data', Toast.LONG);
        });
      Pushwoosh.init({
        pw_appid: pushWooshAppConstants.applicationID,
        project_number: pushWooshAppConstants.FCMID,
      });
      Pushwoosh.register();
      Pushwoosh.setUserId('HWID');
    };
    const modalOptions = {
      heading1: language.ONBOARDING__CLEAR_DEVICE_TITLE,
      text: language.ONBOARDING__CLEAR_DEVICE,
      button1: language.ONBOARDING__CLEAR_CANCEL,
      onButton1Press: hideAlert,
      button2: language.ONBOARDING__CLEAR_OKAY,
      onButton2Press: resetEasyPin,
      onClose: hideAlert,
    };
    dispatch(
      actionCreators.showSinarmasAlert({...modalOptions, image: 'REFRESH'}),
    );
  };
}

export function clearAndResetPassword() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const resetPassword = () => {
      dispatch(destroy('loginWithUsernamePassword'));
      Promise.all([clearLocalStorage(), dispatch(clearReducer())])
        .then(() => {
          dispatch(tokenInit()).then(() => dispatch(hsmInit()));
          dispatch(getLoginPreference());
          dispatch(resetToLandingAndNavigate('RegisterByPhone'));
          dispatch(actionCreators.savePositionDeeplink('yes'));
          dispatch(actionCreators.hideSinarmasAlert());
        })
        .catch(() => {
          dispatch(actionCreators.hideSinarmasAlert());
          dispatch(actionCreators.savePositionDeeplink('yes'));
          Toast.show('Error clearing data', Toast.LONG);
        });
      Pushwoosh.init({
        pw_appid: pushWooshAppConstants.applicationID,
        project_number: pushWooshAppConstants.FCMID,
      });
      Pushwoosh.register();
      Pushwoosh.setUserId('HWID');
    };
    const modalOptions = {
      heading1: language.ONBOARDING__CLEAR_DEVICE_TITLE,
      text: language.ONBOARDING__CLEAR_DEVICE,
      button1: language.ONBOARDING__CLEAR_CANCEL,
      onButton1Press: hideAlert,
      button2: language.ONBOARDING__CLEAR_OKAY,
      onButton2Press: resetPassword,
      onClose: hideAlert,
    };
    dispatch(
      actionCreators.showSinarmasAlert({...modalOptions, image: 'REFRESH'}),
    );
  };
}

export function refreshDevice() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const refresh = () => {
      hideAlert();
      dispatch(actionCreators.showSpinner());
      Promise.all([clearLocalStorage(), dispatch(clearReducer())]).then(() => {
        dispatch(NavigationActions.back());
        dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Introduction'})],
          }),
        );
        dispatch(destroy('loginWithUsernamePassword'));
        dispatch(tokenInit())
          .then(() => dispatch(hsmInit()))
          .then(() => {
            dispatch(actionCreators.savePositionDeeplink('yes'));
            dispatch(getLoginPreference());
            const newModalOptions = {
              heading1: language.ONBOARDING__CLEAR_DEVICE_SUCCESS,
              button1: language.ONBOARDING__OKAY,
              onButton1Press: hideAlert,
              onClose: hideAlert,
            };
            setTimeout(() => {
              dispatch(actionCreators.hideSpinner());
              dispatch(
                actionCreators.showSinarmasAlert({
                  ...newModalOptions,
                  image: 'CHECK',
                }),
              );
            }, 1000);
          })
          .catch(() => {
            dispatch(actionCreators.hideSpinner());
            dispatch(actionCreators.savePositionDeeplink('yes'));
            Toast.show('Error clearing data', Toast.LONG);
          });
      });
      Pushwoosh.init({
        pw_appid: pushWooshAppConstants.applicationID,
        project_number: pushWooshAppConstants.FCMID,
      });
      Pushwoosh.register();
      Pushwoosh.setUserId('HWID');
    };
    const modalOptions = {
      heading1: language.ONBOARDING__CLEAR_DEVICE_TITLE,
      text: language.ONBOARDING__CLEAR_DEVICE,
      button1: language.ONBOARDING__CLEAR_CANCEL,
      onButton1Press: hideAlert,
      button2: language.ONBOARDING__CLEAR_OKAY,
      onButton2Press: refresh,
      onClose: hideAlert,
    };
    dispatch(
      actionCreators.showSinarmasAlert({...modalOptions, image: 'REFRESH'}),
    );
  };
}

export function closeEmoneyNonKYC() {
  return dispatch => {
    const refresh = () => {
      dispatch(actionCreators.showSpinner());
      dispatch(actionCreators.savePositionDeeplink('yes'));
      dispatch(closeEmoneyGoToLogin());
      Promise.all([clearLocalStorage(), dispatch(clearReducer())]).then(() => {
        dispatch(tokenInit())
          .then(() => dispatch(hsmInit()))
          .then(() => {
            dispatch(getLoginPreference());
          })
          .catch(() => {
            dispatch(actionCreators.hideSpinner());
            dispatch(actionCreators.savePositionDeeplink('yes'));
            Toast.show('Error clearing data', Toast.LONG);
          });
      });
      Pushwoosh.init({
        pw_appid: pushWooshAppConstants.applicationID,
        project_number: pushWooshAppConstants.FCMID,
      });
      Pushwoosh.register();
      Pushwoosh.setUserId('HWID');
    };
    dispatch(refresh);
  };
}

export function resetEasyPinFromVerify(maskedUsername) {
  return dispatch => {
    const params = {maskedUsername, isResetEasypin: true};
    dispatch(resetToLandingAndNavigate('EasyPin', params));
  };
}

export function registerATMPin(cardData, isForgetPassword, uniCode, token) {
  const {panNumber, cardpin} = cardData;
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    return dispatch(populateConfigData())
      .then(() => {
        const smsPriority = result(
          getState(),
          'config.smsPriority.onboarding_send',
          false,
        );
        const transRefNum = result(getState(), 'transRefNum');
        const version = VersionNumber.appVersion;
        const versionScope = version.replace(/[.]+/g, ',');
        return api.fetchPinNumber(
          {
            panNumber,
            cardpin,
            smsPriority,
            transRefNum,
            token,
            isForgetPassword: true,
            versionScope,
          },
          dispatch,
        );
      })
      .then(r => {
        // The iPassport is expected if the user has not been onboarded. the following basically handles the safe condition of using ipassport if it exists in the response
        if (result(r, 'data.attributeMap', null)) {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(
                r,
                'data.attributeMap.iPassport',
                'data.attributeMap.ipassport',
              ),
            }),
          );
        }
        if (
          (r.data.responseCode === '00' && isForgetPassword) ||
          r.data.attributeMap.statusUser === 'active' ||
          r.data.attributeMap.statusUser === 'dormant'
        ) {
          return {
            ...r,
            data: {
              ...r.data,
              isUserRegistered: true,
              username: result(r, 'data.attributeMap.username'),
            },
          }; // If user is already registered in IB
        }
        return r || {};
      })
      .then(({data, config}) => {
        dispatch(actionCreators.hideSpinner());
        const token = result(data, 'token', '');
        const ipassport = result(data, 'attributeMap.iPassport', '');
        const isUserRegistered = result(data, 'isUserRegistered', false);
        const maskedUsername = result(data, 'username', '');
        const responseCode = result(data, 'responseCode');
        const payload = JSON.parse(result(config, 'data', '{}'));
        const pan = panNumber.substring(0, 3);
        const transRefNum = result(getState(), 'transRefNum');
        const trnum = transRefNum.substring(
          transRefNum.length - 4,
          transRefNum.length,
        );
        const transactionCode = pan + trnum;
        const uniCode = md5(transactionCode);
        const code = result(data, 'transactionCode', '');
        const isCode = code === uniCode;
        if (isCode || isEmpty(code)) {
          if (!isUserRegistered) {
            const params = {
              TXID: payload.TXID,
              newUserMobile: result(
                data,
                'attributeMap.mobileNumberMasking',
                false,
              ),
              code: result(data, 'transactionCode', ''),
              token: result(data, 'token', ''),
              ipassport,
            };
            dispatch(
              actionCreators.saveTokenRegister({
                token: token,
                ipassport: ipassport,
              }),
            );
            dispatch(resetToLandingAndNavigate('LoginAccount', params));
          } else if (
            isUserRegistered &&
            isForgetPassword &&
            responseCode === '00'
          ) {
            const params = {
              TXID: payload.TXID,
              newUserMobile: result(
                data,
                'attributeMap.mobileNumberMasking',
                false,
              ),
              isForgetPassword,
              maskedUsername,
              code: result(data, 'transactionCode', ''),
              token: result(data, 'token', ''),
              ipassport,
            };
            dispatch(
              actionCreators.saveTokenRegister({
                token: token,
                ipassport: ipassport,
              }),
            );
            dispatch(resetToLandingAndNavigate('LoginAccount', params));
          } else {
            Promise.all([
              api.resetDefaultPayload(dispatch),
              dispatch(setupAppInitKeys()),
            ])
              .then(() => {
                const params = {
                  TXID: payload.TXID,
                  newUserMobile: result(
                    data,
                    'attributeMap.mobileNumberMasking',
                    false,
                  ),
                  isForgetPassword: true,
                  maskedUsername,
                  code: result(data, 'transactionCode', ''),
                  token: result(data, 'token', ''),
                  ipassport,
                };
                dispatch(
                  actionCreators.saveTokenRegister({
                    token: token,
                    ipassport: ipassport,
                  }),
                );
                dispatch(resetToLandingAndNavigate('LoginAccount', params));
                dispatch(
                  change(
                    'loginWithUsernamePassword',
                    'username',
                    result(data, 'username', ''),
                  ),
                );
              })
              .catch(() => {
                Toast.show(
                  language.ONBOARDING__COULD_NOT_SETUP_INIT_KEYS,
                  Toast.LONG,
                );
              });
          }
        }
        return isUserRegistered;
      })
      .catch(err => {
        dispatch(change('registerPINCardForm', 'cardpin', ''));
        dispatch(actionCreators.hideSpinner());
        const errorCode = result(err, 'data.responseCode', '');
        if (errorCode === '05') {
          Alert.alert(
            language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TITLE,
            language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TEXT,
            [
              {
                text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                onPress: () => {
                  dispatch(
                    NavigationActions.navigate({
                      routeName: 'Onboarding',
                    }),
                  );
                },
              },
            ],
          );
          return;
        }
        const isBlocked = result(err, 'data.isBlocked', '0');
        isBlocked === '1'
          ? dispatch(resetToLandingAndNavigate('Login'))
          : dispatch(change('registerPINCardForm', 'cardpin', ''));
        Toast.show(
          getErrorMessage(
            err,
            language.ONBOARDING__ATM_VALIDATION_COULD_NOT_VERIFY,
          ),
          Toast.LONG,
        );
      });
  };
}

export function getFormDataNTB(captchaInput, formData, simasCaptcha) {
  return (dispatch, getState) => {
    const state = getState();
    const formid = 'OAR-SIMOBIPLUS-002';
    const smartfrenAmount =
      result(formData, 'typeSaving.value', '') === '' ? '1' : '0';
    const birthDate = result(formData, 'formData.formData.birthMonth', '');
    const fullName =
      result(formData, 'formData.formData.firstName', '') +
      ' ' +
      result(formData, 'formData.formData.lastName', '');
    const idCardNumber = result(formData, 'formData.formData.idCardNumber', '');
    const captchaId = result(simasCaptcha, 'captchaId', '').toString();
    const flipSelfieImage = result(state, 'selfieImage.flipImage', false);
    const flipIdImage = result(state, 'ktpImage.flipImage', false);
    const idImage = result(state, 'ktpImage.image', '')
      ? result(state, 'ktpImage.image', '')
      : 'noimage';
    const orientationIdImage = result(
      state,
      'ktpImage.orientationCode',
      '',
    ).toString();
    const selfieImage = result(state, 'selfieImage.image', '')
      ? result(state, 'selfieImage.image', '')
      : 'noimageselfie';
    const orientationSelfieImage = result(
      state,
      'selfieImage.orientationCode',
      '',
    ).toString();
    const signature = result(formData, 'signatureCust', '')
      ? result(formData, 'signatureCust', '')
      : 'nosignature';
    const formDataCust = middlewareUtils.getEFormNTB({
      captchaInput,
      formid,
      birthDate,
      fullName,
      idCardNumber,
      formData,
      captchaId,
    });
    const payload = {
      formData: {
        ...formDataCust,
        idImage,
        flipSelfieImage,
        flipIdImage,
        orientationIdImage,
        selfieImage,
        orientationSelfieImage,
        signature,
      },
    };
    return api
      .sendEFormNTB(payload, dispatch)
      .then(res => {
        const vaNumber = result(res, 'data.vaNumber');
        const vaName = result(res, 'data.vaName');
        const responseCode = result(res, 'data.responseCode');
        if (responseCode === '00') {
          dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: 'IdentityFourthForm',
                  params: {
                    vaNumber: vaNumber,
                    vaName: vaName,
                    smartfrenAmount: smartfrenAmount,
                  },
                }),
              ],
            }),
          );
        } else {
          Toast.show(language.ERROR_MESSAGE__CAPTCHA_EFORM, Toast.LONG);
          dispatch(actionCreators.setCaptcha(generateCaptchaForNTB()));
        }
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__CAPTCHA_EFORM),
          Toast.LONG,
        );
        dispatch(actionCreators.setCaptcha(generateCaptchaForNTB()));
      });
  };
}

export function sendingTokenMigrate(migrateToken) {
  return dispatch => {
    const payload = {encryptedToken: migrateToken, isForgetPassword: true};
    return api
      .getFetchUserSimobi(payload, dispatch)
      .then(response => {
        const responseCode = result(response, 'data.responseCode', '');
        const maskedUsername = result(
          response,
          'data.attributeMap.username',
          '',
        );
        const iPassport = result(response, 'data.attributeMap.iPassport', '');
        dispatch(
          actionCreators.setSimobiMigrationToken({
            encryptedToken: migrateToken,
          }),
        );
        dispatch(actionCreators.setAPIPayloadParam({ipassport: iPassport}));
        if (responseCode === '00') {
          dispatch(
            NavigationActions.navigate({
              routeName: 'OTP',
              params: {
                userData: response,
                maskedUsername: maskedUsername,
                isMigrate: true,
                encryptedToken: migrateToken,
              },
            }),
          );
        } else {
          dispatch(
            NavigationActions.navigate.navigate({routeName: 'MigrateError'}),
          );
        }
        return response;
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_VERIFY_MIGRATE_TOKEN,
          ),
          Toast.LONG,
        );
      });
  };
}

export function verifyOTPMigrate(
  OTP,
  maskedUsername,
  isMigrate,
  encryptedToken,
) {
  return dispatch =>
    api
      .otpVerify(OTP, dispatch)
      .then(() => {
        const params = {
          maskedUsername: maskedUsername,
          isMigrate: isMigrate,
          encryptedToken: encryptedToken,
        };
        dispatch(
          NavigationActions.navigate({
            routeName: 'LoginAccount',
            params: params,
          }),
        );
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_VERFIY_OTP),
          Toast.LONG,
        );
      });
}

export function setEasyPinMigrate(easyPinData, maskedUsername) {
  const {easyPinConfirm} = easyPinData;
  const migration = true;
  return (dispatch, getState) => {
    const data = getState();
    const encryptedToken = result(data, 'tokenSimobi.encryptedToken', '');
    return api
      .easyPinRegister(
        middlewareUtils.prepareEasyPinRegisterMigrate(
          easyPinConfirm,
          migration,
          encryptedToken,
        ),
        dispatch,
      )
      .then(() => {
        dispatch(prepareCompletedOnboardingMigrate(maskedUsername));
        dispatch(destroy('easyPinCreationForm'));
        dispatch(destroy('easyPinCreationConfirmForm'));
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__SET_EASYPIN_ERROR),
          Toast.LONG,
        );
      });
  };
}

export function prepareCompletedOnboardingMigrate(maskedUsername) {
  return dispatch =>
    set(storageKeys.USERNAME, maskedUsername)
      .then(() => {
        // save username and update AppInitKeys only after onboarding succussfully
        dispatch(setupAppInitKeys());
        dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'MigrateEnded'})],
          }),
        );
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__SET_LOGIN_ACCOUNT),
          Toast.LONG,
        );
        dispatch(destroy('loginWithUsernamePassword'));
      });
}

export function setLoginAccountMigrate(
  account,
  isMigrate,
  encryptedToken,
  uniCode,
) {
  return (dispatch, getState) => {
    const {username, password} = account;
    const token = md5(uniCode);
    dispatch(actionCreators.showSpinner());
    const version = VersionNumber.appVersion;
    const versionScope = version.replace(/[.]+/g, ',');
    return api
      .createUsernamePassword(
        {
          username,
          password,
          token,
          versionScope,
        },
        dispatch,
      )
      .then(res => {
        const userMember = result(res, 'data.customerSegment', '');
        dispatch(actionCreators.saveUserMemberData(userMember));
        dispatch(
          actionCreators.setAPIPayloadParam({
            ipassport: result(res, 'data.ipassport'),
          }),
        );
        dispatch(actionCreators.hideSpinner());
        assembleDataForDashboard(dispatch, res);
        tracker.setUser(
          String(result(getState(), 'user.profile.customer.id', deviceInfo.id)),
        );
        const params = {
          maskedUsername: obfuscateUsername(username),
          isMigrate: isMigrate,
          encryptedToken: encryptedToken,
        };
        dispatch(registerPushId(username));
        dispatch(resetToLandingAndNavigate('EasyPin', params));
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        const errorCode = result(err, 'data.responseCode', '');
        if (errorCode === '01') {
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE_RESET_PASSWORD_LINK),
            Toast.LONG,
          );
        } else {
          dispatch(destroy('loginAccountForm'));
          dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({routeName: 'Introduction'}),
              ],
            }),
          );
        }
      });
  };
}

export function prepareGoDashboardFromMigrate(isPinCreation) {
  return (dispatch, getState) => {
    const navigationKeys = result(
      getState(),
      'promos.navigateOnPushClicked',
      false,
    );
    const accountList = result(getState(), 'accounts', []);
    const cifCode = result(getState(), 'user.profile.customer.cifCode', '');
    dispatch(destroy('MigrateLandingPage'));
    dispatch(destroy('loginWithUsernamePassword'));
    dispatch(destroy('loginAccountForm'));
    dispatch(destroy('easyPinCreationForm'));
    dispatch(destroy('easyPinCreationConfirmForm'));
    dispatch(destroy('MigrateEnded'));
    dispatch(initStoreWithTransactionDetails());
    dispatch(getCache());
    if (startsWith(cifCode, 'NK')) {
      dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'Landing'})],
        }),
      );
      dispatch(NavigationActions.navigate({routeName: 'MainEmoney'}));
    } else {
      if (
        accountList.length === 1 &&
        find(accountList, {accountType: 'emoneyAccount'})
      ) {
        dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Landing'})],
          }),
        );
        dispatch(NavigationActions.navigate({routeName: 'MainEmoney'}));
      } else {
        if (isPinCreation) {
          dispatch(
            StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'Landing'})],
            }),
          );
        } else {
          dispatch(
            StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'Landing'})],
            }),
          );
          dispatch(NavigationActions.navigate({routeName: 'Main'}));
        }
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

export function goBackToLanding() {
  return dispatch => {
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Landing'})],
      }),
    );
  };
}

export function popUp() {
  return (dispatch, getState) => {
    const {config, currentLanguage} = getState();
    const serverTime = result(config, 'serverTime', '').toString();
    const diff = serverTime.substring(10, 8);
    const uriImage =
      result(currentLanguage, 'id', '') === 'en'
        ? result(config, 'attention.urlData.0.url_en', '').toString()
        : result(config, 'attention.urlData.0.url_id', '').toString();
    const urlId = result(config, 'attention.urlData.0.id', '').toString();
    let checked = false;
    const hideAlert = () => {
      set(storageKeys.POPUPLANDING, {date: diff, dontShow: checked, urlId});
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const checkboxChange = res => {
      checked = !res;
    };
    return getPopUpLanding().then(res => {
      if (
        (result(res, 'date', '') !== diff ||
          result(res, 'urlId', '') !== urlId) &&
        !result(res, 'dontShow', false)
      ) {
        const modalOptions = {
          button1: language.ONBOARDING__OKAY,
          onButton1Press: hideAlert,
          checkboxChange,
          onClose: hideAlert,
          checkboxLabel: language.LANDING__DONT_SHOW_AGAIN,
        };
        dispatch(
          actionCreators.showSinarmasAlert({
            ...modalOptions,
            image: 'WARNING',
            uriImage,
          }),
        );
      }
    });
  };
}

export function resetDevice(tokenId) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    return Promise.all([clearLocalStorage(), dispatch(clearReducer())]).then(
      () =>
        dispatch(tokenInit())
          .then(() => dispatch(hsmInit()))
          .then(() => {
            dispatch(getLoginPreference());
            setTimeout(() => {
              dispatch(actionCreators.hideSpinner());
              dispatch(actionCreators.savePositionDeeplink('yes'));
            }, 1000);
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({
                    routeName: 'MigrateLandingPage',
                    params: {id: tokenId},
                  }),
                ],
              }),
            );
          })
          .catch(() => {
            dispatch(actionCreators.hideSpinner());
            dispatch(actionCreators.savePositionDeeplink('yes'));
          }),
    );
  };
}

export function verifyLoginFaceRecognition(
  image,
  orientationCode,
  isLockedDevice,
  isOBM,
) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const accountList = result(state, 'accounts', []);
    const orientation = '0';
    const flipImage = checkFlipImage(orientationCode);
    const version = split(VersionNumber.appVersion, '.');
    const versionScope = version[0] + ',' + version[1];
    const loginAPI = api.loginNew;
    return dispatch(populateConfigData())
      .then(() =>
        loginAPI(
          {faceRecognition: image, orientation, flipImage, versionScope},
          isLockedDevice,
          dispatch,
        ),
      )
      .then(res => {
        const dataCore = result(res, 'data', {});
        const userMember = result(res, 'data.customerSegment', '');
        dispatch(actionCreators.saveUserMemberData(userMember));
        const setNewCredentialOBM = result(
          res,
          'data.setNewCredentialOBM',
          'ALL',
        );
        const profileScope = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope',
          '',
        );
        dispatch(updatePicture());
        const userId = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.id',
          '',
        );
        dispatch(actionCreators.updateLastLogin('face'));
        set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'face').catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
            ),
            Toast.LONG,
          );
        });
        tracker.trackEvent(
          'FACE_RECOGNITION_LOGIN',
          'LOGIN_FACE_SUCCESS',
          null,
          {label: `userId:${userId}`},
        );
        dispatch(
          actionCreators.setAPIPayloadParam({
            ipassport: result(res, 'data.ipassport'),
          }),
        );
        const privateOffers = result(res, 'data.privateOffers', []);
        const defaultValueAccount = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.accountList',
          {},
        );
        const getdefaultAccount = find(defaultValueAccount, {
          accountType: 'emoneyAccount',
        });
        set(
          storageKeys.ACCOUNT_DATA_DEFAULT,
          middlewareUtils.getAccountDefaultEmoney(getdefaultAccount),
        );
        dispatch(actionCreators.savePrivateOffers(privateOffers));
        const isAutoSave = result(res, 'data.isAutoSave', []);
        const transfer = result(isAutoSave, 'transfer', false);
        const billPay = result(isAutoSave, 'billPay', false);
        const isSaving = result(isAutoSave, 'isSaving', false);
        const DigitalStore = result(isAutoSave, 'DigitalStore', false);
        const QR = result(isAutoSave, 'QR', false);
        dispatch(
          actionCreators.saveAutoSave({
            transfer: transfer,
            billPay: billPay,
            isSaving: isSaving,
            DigitalStore: DigitalStore,
            QR: QR,
          }),
        );
        dispatch(actionCreators.hideSpinner());
        assembleDataForDashboard(dispatch, res);
        dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Landing'})],
          }),
        );
        dispatch(initStoreWithTransactionDetails());
        if (size(dataCore) !== 0) {
          if (setNewCredentialOBM === 'EASYPIN_OBM') {
            dispatch(
              NavigationActions.navigate({
                routeName: 'EasyPinVerify',
                params: {
                  nextRouteName: 'Dashboard',
                  setNewCredentialOBM: setNewCredentialOBM,
                  isOBM,
                },
              }),
            );
          } else if (setNewCredentialOBM === 'PASSWORD') {
            dispatch(
              NavigationActions.navigate({
                routeName: 'ValidatePassword',
                params: {
                  nextRouteName: 'Dashboard',
                  isOBMPassword: true,
                  isOBM,
                  profileScope,
                },
              }),
            );
          } else if (setNewCredentialOBM === 'ALL') {
            dispatch(
              NavigationActions.navigate({
                routeName: 'ValidatePassword',
                params: {
                  nextRouteName: 'Dashboard',
                  isOBMAll: true,
                  isOBM,
                  profileScope,
                },
              }),
            );
          } else {
            if (startsWith(cifCode, 'NK')) {
              dispatch(NavigationActions.navigate({routeName: 'MainEmoney'}));
            } else {
              if (startsWith(cifCode, 'NK')) {
                dispatch(NavigationActions.navigate({routeName: 'MainEmoney'}));
              } else {
                if (
                  accountList.length === 1 &&
                  find(accountList, {accountType: 'emoneyAccount'})
                ) {
                  dispatch(
                    NavigationActions.navigate({routeName: 'MainEmoney'}),
                  );
                } else {
                  dispatch(NavigationActions.navigate({routeName: 'Main'}));
                }
              }
            }
          }
        } else {
          Toast.show(language.ERROR_MESSAGE__COULD_NOT_LOG_IN, Toast.LONG);
        }
      })
      .catch(err => {
        const errorOBM = result(err, 'data.migrateToOBM', '');
        if (errorOBM === 'true') {
          dispatch(NavigationActions.navigate({routeName: 'ObmMigrate'}));
        }
        tracker.trackEvent(
          'FACE_RECOGNITION_LOGIN',
          'LOGIN_FACE_FAILED',
          null,
          {},
        );
        dispatch(actionCreators.hideSpinner());
        if (errorOBM === 'true') {
          null;
        } else {
          const status = result(err, 'status', 400);
          if (status === 429) {
            Toast.show(
              getErrorMessage(err, language.COMMON__TIMEOUT_TITLE1_F5),
              Toast.LONG,
            );
          } else {
            Toast.show(
              getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOG_IN),
              Toast.LONG,
            );
          }
        }
      });
  };
}

export function clearAndResetPasswordBurgerMenuNoAlert() {
  return dispatch => {
    dispatch(destroy('loginWithUsernamePassword'));
    dispatch(actionCreators.showSpinner());

    Promise.all([clearLocalStorage(), dispatch(clearReducer())]).then(() => {
      dispatch(tokenInit())
        .then(() => dispatch(hsmInit()))
        .then(() => {
          dispatch(getLoginPreference());
          setTimeout(() => {
            dispatch(actionCreators.hideSpinner());
            dispatch(actionCreators.savePositionDeeplink('yes'));
            dispatch(NavigationActions.back());
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({
                    routeName: 'Login',
                    params: {isForgetPassword: true},
                  }),
                ],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'RegisterByPhone',
                params: {isForgetPassword: true},
              }),
            );
          }, 1000);
        })
        .catch(() => {
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.savePositionDeeplink('yes'));
          Toast.show('Error clearing data', Toast.LONG);
        });
    });
    Pushwoosh.init({
      pw_appid: pushWooshAppConstants.applicationID,
      project_number: pushWooshAppConstants.FCMID,
    });
    Pushwoosh.register();
    Pushwoosh.setUserId('HWID');
  };
}

export function clearAndResetPasswordBurgerMenu() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const refresh = () => {
      hideAlert();
      dispatch(destroy('loginWithUsernamePassword'));
      dispatch(actionCreators.showSpinner());

      Promise.all([clearLocalStorage(), dispatch(clearReducer())]).then(() => {
        dispatch(tokenInit())
          .then(() => dispatch(hsmInit()))
          .then(() => {
            dispatch(getLoginPreference());
            setTimeout(() => {
              dispatch(actionCreators.hideSpinner());
              dispatch(actionCreators.savePositionDeeplink('yes'));
              dispatch(NavigationActions.back());
              dispatch(
                StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({
                      routeName: 'Login',
                      params: {isForgetPassword: true},
                    }),
                  ],
                }),
              );
              dispatch(
                NavigationActions.navigate({
                  routeName: 'RegisterByPhone',
                  params: {isForgetPassword: true},
                }),
              );
            }, 1000);
          })
          .catch(() => {
            dispatch(actionCreators.hideSpinner());
            dispatch(actionCreators.savePositionDeeplink('yes'));
            Toast.show('Error clearing data', Toast.LONG);
          });
      });
      Pushwoosh.init({
        pw_appid: pushWooshAppConstants.applicationID,
        project_number: pushWooshAppConstants.FCMID,
      });
      Pushwoosh.register();
      Pushwoosh.setUserId('HWID');
    };
    const modalOptions = {
      heading1: language.ONBOARDING__CLEAR_DEVICE_TITLE,
      text: language.ONBOARDING__CLEAR_DEVICE,
      button1: language.ONBOARDING__CLEAR_CANCEL,
      onButton1Press: hideAlert,
      button2: language.ONBOARDING__CLEAR_OKAY,
      onButton2Press: refresh,
      onClose: hideAlert,
    };
    dispatch(
      actionCreators.showSinarmasAlert({...modalOptions, image: 'REFRESH'}),
    );
  };
}

export function goSignature(params, data) {
  return dispatch => {
    dispatch(actionCreators.updateSelfieImage(data));
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Login'})],
      }),
    );
    dispatch(NavigationActions.navigate({routeName: 'SignaturePage', params}));
  };
}

export function goSignatureETB(params, data) {
  return dispatch => {
    dispatch(actionCreators.updateSelfieImage(data));
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'HomeScreen'})],
      }),
    );
    dispatch(NavigationActions.navigate({routeName: 'SignaturePage', params}));
  };
}

export function goToCaptcha(params, data) {
  return dispatch => {
    dispatch(actionCreators.updateKTPImage(data));
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Login'})],
      }),
    );
    dispatch(
      NavigationActions.navigate({routeName: 'IdentitySecondForm', params}),
    );
  };
}

export function goToCaptchaETB(params, data) {
  return dispatch => {
    dispatch(actionCreators.updateKTPImage(data));
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'HomeScreen'})],
      }),
    );
    dispatch(
      NavigationActions.navigate({routeName: 'IdentitySecondForm', params}),
    );
  };
}

export function registerEmoney(eMoneyData, captchaId, firebaseEmoney) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    const mobileNumber = formatMobileNumberEmoneyRegistration(
      result(eMoneyData, 'phone', ''),
    );
    const name = result(eMoneyData, 'fullName', '');
    const captchaInput = result(eMoneyData, 'captchaInput', '');
    const typeActivation = '001';
    const payload = {
      mobileNumber,
      name,
      captchaInput,
      captchaId,
      typeActivation,
    };
    return api
      .checkRegisterEmoney(payload, dispatch)
      .then(res => {
        const responseCode = result(res, 'data.responseCode', '');
        if (responseCode === '00') {
          const payload2 = {
            mobileNumber,
            name,
            captchaInput,
            captchaId,
            typeActivation,
          };
          dispatch(smsOtpRegisterEmoney(payload2, firebaseEmoney));
        } else {
          dispatch(modalGotoLogin(firebaseEmoney));
          setTimeout(() => {
            dispatch(actionCreators.hideSpinner());
          }, 5000);
        }
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__REGISTRATION_EMONEY),
          Toast.LONG,
        );
      });
  };
}

export function sendOtpActivation(
  tokenEmailRaw,
  typeActivation,
  isLockedDevice,
  firebaseEmoney,
  noCard = false,
  token,
  email,
) {
  return dispatch => {
    const tokenEmail = transformTokenIos(tokenEmailRaw);
    const isResetPassWithoutCard = noCard ? 'YES' : '';
    const payload = {
      typeActivation,
      tokenEmail,
      activateOtp: true,
      isResetPassWithoutCard,
      token,
      email,
    };
    dispatch(actionCreators.showSpinner());
    return api
      .sendOtpActivation(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.savePositionDeeplink('yes'));
        dispatch(actionCreators.hideSpinner());
        const mobileNumber = result(res, 'data.mobileNumber', '');
        const transRefNum = result(res, 'data.transRefNum', '');
        if (isLockedDevice === true) {
          dispatch(
            NavigationActions.navigate({
              routeName: 'FailedPageActivation',
              params: {responseCode: '97'},
            }),
          );
        } else {
          dispatch(
            NavigationActions.navigate({
              routeName: 'EmoneyActivationOTP',
              params: {
                payload,
                mobileNumber: mobileNumber,
                transRefNum,
                firebaseEmoney,
                typeActivation,
              },
            }),
          );
        }
      })
      .catch(err => {
        const responseCode = result(err, 'data.responseCode', '');
        dispatch(actionCreators.hideSpinner());
        if (isLockedDevice === true) {
          dispatch(
            NavigationActions.navigate({
              routeName: 'FailedPageActivation',
              params: {responseCode: '97'},
            }),
          );
        } else {
          dispatch(
            NavigationActions.navigate({
              routeName: 'FailedPageActivation',
              params: {responseCode},
            }),
          );
        }
      });
  };
}

export function sendOtpResetPassword(
  tokenEmailRaw,
  typeActivation,
  isLockedDevice,
  noCard = false,
  token,
  email,
) {
  return dispatch => {
    const tokenEmail = transformTokenIos(tokenEmailRaw);
    const isResetPassWithoutCard = noCard ? 'YES' : '';
    const payload = {
      typeActivation,
      tokenEmail,
      activateOtp: true,
      isResetPassWithoutCard,
      token,
      email,
    };
    dispatch(actionCreators.showSpinner());
    return api
      .sendOtpResetPassword(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.savePositionDeeplink('yes'));
        dispatch(actionCreators.hideSpinner());
        const mobileNumber = result(res, 'data.mobileNumber', '');
        const unmaskedMobileNum = result(res, 'data.mobileNumber', '');
        const transRefNum = result(res, 'data.transRefNum', '');
        if (isLockedDevice === true) {
          dispatch(
            NavigationActions.navigate({
              routeName: 'FailedPageActivation',
              params: {responseCode: '97'},
            }),
          );
        } else {
          dispatch(
            NavigationActions.navigate({
              routeName: 'EmoneyActivationOTP',
              params: {
                payload,
                mobileNumber: mobileNumber,
                transRefNum,
                typeActivation,
                unmaskedMobileNum,
                noCard,
              },
            }),
          );
        }
      })
      .catch(err => {
        const responseCode = result(err, 'data.responseCode', '');
        dispatch(actionCreators.hideSpinner());
        if (isLockedDevice === true) {
          dispatch(
            NavigationActions.navigate({
              routeName: 'FailedPageActivation',
              params: {responseCode: '97'},
            }),
          );
        } else {
          dispatch(
            NavigationActions.navigate({
              routeName: 'FailedPageActivation',
              params: {responseCode},
            }),
          );
        }
      });
  };
}

export function resendOtpActivation(payload) {
  return dispatch =>
    api.resendOtpActivation(payload, dispatch).catch(err => {
      Toast.show(
        getErrorMessage(err, language.ERROR_MESSAGE__REGISTRATION_EMONEY),
        Toast.LONG,
      );
    });
}

export function verifyOtpActivation(
  emailToken,
  transRefNum,
  firebaseEmoney,
  typeActivation,
) {
  return (dispatch, getState) => {
    const state = getState();
    const smsToken = result(state, 'form.ActivationOTP.values.OTP', '');
    const isFromEmoney = true;
    const payload = {
      smsToken,
      emailToken,
      transRefNum,
      typeActivation,
      isFromEmoney,
    };
    dispatch(actionCreators.showSpinner());
    return api
      .verifyOtpActivation(payload, dispatch)
      .then(res => {
        const token = result(res, 'data.activationData.token', '');
        const transRefNum = result(res, 'data.activationData.tempRefNum', '');
        dispatch(actionCreators.hideSpinner());
        dispatch(
          NavigationActions.navigate({
            routeName: 'ActivationForm',
            params: {
              res: res.data,
              emailToken: emailToken,
              firebaseEmoney,
              typeActivation,
              token,
              isFromEmoney,
              transRefNum,
            },
          }),
        );
        dispatch(
          actionCreators.saveTokenRegister({
            isFromEmoney: isFromEmoney,
            transRefNum: transRefNum,
            token: token,
          }),
        );
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__REGISTRATION_EMONEY),
          Toast.LONG,
        );
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function verifyOtpResetPassword(
  emailToken,
  transRefNum,
  typeActivation,
  unmaskedMobileNum,
  noCard,
) {
  return (dispatch, getState) => {
    const state = getState();
    const smsToken = result(state, 'form.ActivationOTP.values.OTP', '');
    const mobileNumber = unmaskedMobileNum;
    const payload = {smsToken, emailToken, transRefNum, mobileNumber};
    dispatch(actionCreators.showSpinner());
    return api
      .verifyOtpResetPassword(payload, dispatch)
      .then(res => {
        dispatch(
          actionCreators.setAPIPayloadParam({
            ipassport: result(res, 'data.activationData.iPassport'),
            token: result(res, 'data.activationData.token', ''),
          }),
        );
        const userResetPasswordRaw = result(
          res,
          'data.activationData.loginName',
          '',
        );
        dispatch(actionCreators.hideSpinner());
        dispatch(
          NavigationActions.navigate({
            routeName: 'ActivationForm',
            params: {
              res: res.data,
              emailToken: emailToken,
              typeActivation,
              userResetPasswordRaw,
              noCard,
            },
          }),
        );
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__REGISTRATION_EMONEY),
          Toast.LONG,
        );
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function activationRegistration(
  valueForm,
  registTemporary,
  firebaseEmoney,
  typeActivation,
) {
  return (dispatch, getState) => {
    const state = getState();
    const utm = result(state, 'utmCode.utm', '');
    const loginName = result(
      state,
      'form.ActivationForm.values.user',
      '',
    ).toLowerCase();
    const registTemp = {...registTemporary, typeActivation};
    const productCode = result(state, 'productCode', '');
    const cif = result(state, 'user.profile.customer.cifCode', '');
    let password = result(valueForm, 'password', '');
    const payload = middlewareUtils.prepareActivation(
      loginName,
      password,
      registTemp,
      utm,
    );
    let adjustEvent;
    if (productCode.includes('SA')) {
      // event adjust tracking create account
      if (Platform.OS === 'android') {
        adjustEvent = new adjustAndroid.AdjustEvent('csndco');
        adjustEvent.addCallbackParameter('page_id', 'ak-dao-3');
        adjustEvent.addCallbackParameter('cif', cif);
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      }
    } else if (productCode.includes('CC')) {
      if (Platform.OS === 'android') {
        adjustEvent = new adjustAndroid.AdjustEvent('geq1m6');
        adjustEvent.addCallbackParameter('page_id', 'ak-daocc-3');
        adjustEvent.addCallbackParameter('cif', cif);
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      }
    } else {
      if (Platform.OS === 'android') {
        adjustEvent = new adjustAndroid.AdjustEvent('v035jg');
        adjustEvent.addCallbackParameter('page_id', 'ak-emnkyc-3');
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      }
    }

    dispatch(actionCreators.saveRegisName(result(registTemp, 'fullName', '')));
    dispatch(actionCreators.showSpinner());
    return api
      .commonRegistrationActivation(payload, dispatch)
      .then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(
          loginActivation(
            {username: loginName, password},
            false,
            false,
            false,
            false,
            false,
            firebaseEmoney,
          ),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_REGISTER_USER_ACCOUNT,
          ),
          Toast.LONG,
        );
      });
  };
}

export function doResetPasswordLink(valueForm, registTemp) {
  return (dispatch, getState) => {
    const username = result(registTemp, 'loginName', '');
    let password = result(valueForm, 'password', '');
    const state = getState();
    const token = result(state, 'additionalApiPayload.token', '');
    dispatch(actionCreators.showSpinner());
    const randomNumber = randomString(16);
    OBM_EncryptPassword(password, randomNumber);

    if (password) {
      password =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    } else {
      null;
    }
    const deviceInfoLogin = {
      name: deviceInfo.name,
      model: deviceInfo.model,
    };
    const version = VersionNumber.appVersion;
    const versionScope = version.replace(/[.]+/g, ',');
    return api
      .createUsernamePassword(
        {
          password,
          deviceInfoLogin,
          token,
          username,
          versionScope,
        },
        dispatch,
      )
      .then(res => {
        const userMember = result(res, 'data.customerSegment', '');
        dispatch(actionCreators.saveUserMemberData(userMember));
        dispatch(populateOffersCache());
        dispatch(destroy('ActivationForm'));
        dispatch(actionCreators.hideSpinner());
        const token = result(res, 'data.token', '');
        const ipassport = result(res, 'data.ipassport', '');
        const loginSetTagID = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.title',
          '',
        ).toLowerCase();
        dispatch(
          actionCreators.setAPIPayloadParam({
            ipassport: result(res, 'data.ipassport'),
          }),
        );

        dispatch(
          actionCreators.saveTokenRegister({
            token: token,
            ipassport: ipassport,
          }),
        );
        dispatch(registerPushId(username, loginSetTagID));

        assembleDataForDashboard(dispatch, res);
        tracker.setUser(
          String(result(getState(), 'user.profile.customer.id', deviceInfo.id)),
        );
        const params = {
          maskedUsername: obfuscateUsername(username),
          isResetEasypin: true,
          ipassport,
          token,
        };
        dispatch(
          actionCreators.saveTokenRegister({
            token: token,
            ipassport: ipassport,
          }),
        );
        dispatch(registerPushId(username, loginSetTagID));
        dispatch(resetToLandingAndNavigate('EasyPin', params));
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        const errorCode = result(err, 'data.responseCode', '');
        if (errorCode === '01') {
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE_RESET_PASSWORD_LINK),
            Toast.LONG,
          );
        } else {
          dispatch(destroy('ActivationForm'));
          dispatch(actionCreators.setAPIPayloadParam({ipassport: null}));
          dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({routeName: 'Introduction'}),
              ],
            }),
          );
        }
      });
  };
}

export function modalGotoLogin() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToLogin = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'Login'})],
        }),
      );
    };
    const sinarmasModalOptions = {
      heading1: language.MODAL_ALREADY_HAVE_REGISTERED_EMONEY_TITLE,
      text: language.MODAL_ALREADY_HAVE_REGISTERED_EMONEY,
      button1: language.MODAL_ALREADY_HAVE_REGISTERED_EMONEY_CLOSE,
      onButton2Press: goToLogin,
      button2: language.MODAL_ALREADY_HAVE_REGISTERED_EMONEY_LOG_IN,
      onButton1Press: hideAlert,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function loginToSimasPoinHistory(
  {username, password, easyPin},
  isLockedDevice,
  isOBM,
  isResetEasypin = false,
  regisATM = false,
  loginATM = false,
  isUserRegistered = false,
  formValues,
) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    dispatch(populateBanners());
    const smsPriority = Boolean(
      result(getState(), 'config.smsPriority.login', false),
    );
    const version = split(VersionNumber.appVersion, '.');
    const versionScope = version[0] + ',' + version[1];
    const randomNumber = randomString(16);
    OBM_EncryptPassword(password ? password : easyPin, randomNumber);
    if (easyPin) {
      easyPin =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    } else if (password) {
      password =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    }
    const deviceInfoLogin = {
      name: deviceInfo.name,
      model: deviceInfo.model,
    };
    dispatch(actionCreators.showSpinner());
    const loginAPI = api.loginNew;
    return loginAPI(
      {
        username: normalisePhoneNumber(username),
        password,
        easyPin,
        smsPriority,
        deviceInfoLogin,
        versionScope,
      },
      isLockedDevice,
      dispatch,
    )
      .then(res => {
        const dataCore = result(res, 'data', {});
        dispatch(actionCreators.hideSpinner());
        const userMember = result(res, 'data.customerSegment', '');
        dispatch(actionCreators.saveUserMemberData(userMember));
        const setNewCredentialOBM = result(
          res,
          'data.setNewCredentialOBM',
          'ALL',
        );
        const profileScope = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope',
          '',
        );
        const userId = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.id',
          '',
        );
        if (!password && !easyPin) {
          dispatch(actionCreators.updateLastLogin('fingerprint'));
          set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'fingerprint').catch(err => {
            Toast.show(
              getErrorMessage(
                err,
                language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
              ),
              Toast.LONG,
            );
          });
          tracker.trackEvent('LOGIN_FINGERPRINT_SUCCESS', 'ONBOARDING', null, {
            ID: userId,
          });
        } else {
          dispatch(actionCreators.clearLastLogin());
          set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'easypin').catch(err => {
            Toast.show(
              getErrorMessage(
                err,
                language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
              ),
              Toast.LONG,
            );
          });
        }
        const serverTime = moment(
          result(res, 'data.serverTime', '').toString(),
        );
        const appTime = new Date();
        const diff = moment(appTime, 'DD/MM/YYYY').diff(
          moment(serverTime, 'DD/MM/YYYY'),
        );
        const gapTime = Math.round(moment.duration(diff).asSeconds());
        const userApiKey = result(res.data, 'userApiKey', '');
        const faceRegistered = result(res.data, 'isFaceRegister', false);
        const defaultValueAccount = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.accountList',
          {},
        );
        const getdefaultAccount = find(defaultValueAccount, {
          accountType: 'emoneyAccount',
        });
        set(
          storageKeys.ACCOUNT_DATA_DEFAULT,
          middlewareUtils.getAccountDefaultEmoney(getdefaultAccount),
        );
        const privateOffers = result(res.data, 'privateOffers', []);
        dispatch(actionCreators.savePrivateOffers(privateOffers));
        dispatch(
          actionCreators.isFaceRegisteredUpdate({
            isFaceRegistered: faceRegistered,
          }),
        );
        set(storageKeys.IS_FACE_REGISTERED, {
          isFaceRegistered: faceRegistered,
        }).catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
            ),
            Toast.LONG,
          );
        });
        const stateReduc = getState();
        const tooglePushLoginID = result(
          stateReduc,
          'config.flag.flagPushNotifCifCode',
          'INACTIVE',
        );
        const loginPushwooshID =
          tooglePushLoginID === 'ACTIVE'
            ? result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
                '',
              )
            : result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.loginName',
                '',
              ).toLowerCase();
        const loginSetTagID = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.title',
          '',
        ).toLowerCase();
        const isAutoSave = result(res, 'data.isAutoSave', []);
        const transfer = result(isAutoSave, 'transfer', false);
        const billPay = result(isAutoSave, 'billPay', false);
        const isSaving = result(isAutoSave, 'isSaving', false);
        const DigitalStore = result(isAutoSave, 'DigitalStore', false);
        const QR = result(isAutoSave, 'QR', false);
        dispatch(
          actionCreators.saveAutoSave({
            transfer: transfer,
            billPay: billPay,
            isSaving: isSaving,
            DigitalStore: DigitalStore,
            QR: QR,
          }),
        );
        dispatch(actionCreators.saveUserApiKey(userApiKey));
        dispatch(actionCreators.setGapTimeServer(gapTime));
        dispatch(
          actionCreators.saveTransRefNum(result(res, 'data.transRefNum', '')),
        );
        if (regisATM) {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.attributeMap.iPassport'),
            }),
          );
        } else {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.ipassport'),
            }),
          );
          assembleDataForDashboard(dispatch, res);
        }

        dispatch(populateConfigCacheEFormData());

        dispatch(actionCreators.hideSpinner());
        dispatch(change('loginWithUsernamePassword', 'password', ''));
        tracker.setUser(
          String(result(getState(), 'user.profile.customer.id', deviceInfo.id)),
        );
        const isDemoAccount = /^DEMO-/.test(
          result(res, 'data.ipassport', undefined),
        );
        if ((isLockedDevice || isDemoAccount) && !isResetEasypin) {
          dispatch(registerPushId(loginPushwooshID, loginSetTagID));
          if (faceRegistered) {
            if (size(dataCore) !== 0) {
              if (setNewCredentialOBM === 'EASYPIN_OBM') {
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'EasyPinVerify',
                    params: {
                      nextRouteName: 'Dashboard',
                      setNewCredentialOBM: setNewCredentialOBM,
                      isOBM,
                    },
                  }),
                );
              } else if (setNewCredentialOBM === 'PASSWORD') {
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'ValidatePassword',
                    params: {
                      nextRouteName: 'Dashboard',
                      isOBMPassword: true,
                      isOBM,
                      profileScope,
                      isSimasPoin: true,
                    },
                  }),
                );
              } else if (setNewCredentialOBM === 'ALL') {
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'ValidatePassword',
                    params: {
                      nextRouteName: 'Dashboard',
                      isOBMAll: true,
                      isOBM,
                      profileScope,
                      isSimasPoin: true,
                    },
                  }),
                );
              } else {
                dispatch(prepareGoSimasPoinHistory(formValues));
              }
            } else {
              Toast.show(language.ERROR_MESSAGE__COULD_NOT_LOG_IN, Toast.LONG);
            }
          } else {
            const skipFunction = () => {
              if (size(dataCore) !== 0) {
                if (setNewCredentialOBM === 'EASYPIN_OBM') {
                  dispatch(
                    NavigationActions.navigate({
                      routeName: 'EasyPinVerify',
                      params: {
                        nextRouteName: 'Dashboard',
                        setNewCredentialOBM: setNewCredentialOBM,
                        isOBM,
                        isOBMEasyPin: true,
                      },
                    }),
                  );
                } else if (setNewCredentialOBM === 'PASSWORD') {
                  dispatch(
                    NavigationActions.navigate({
                      routeName: 'ValidatePassword',
                      params: {
                        nextRouteName: 'Dashboard',
                        isOBMPassword: true,
                        isOBM,
                        profileScope,
                        isSimasPoin: true,
                      },
                    }),
                  );
                } else if (setNewCredentialOBM === 'ALL') {
                  dispatch(
                    NavigationActions.navigate({
                      routeName: 'ValidatePassword',
                      params: {
                        nextRouteName: 'Dashboard',
                        isOBMAll: true,
                        isOBM,
                        profileScope,
                        isSimasPoin: true,
                      },
                    }),
                  );
                } else {
                  dispatch(prepareGoSimasPoinHistory(formValues));
                }
              } else {
                Toast.show(
                  language.ERROR_MESSAGE__COULD_NOT_LOG_IN,
                  Toast.LONG,
                );
              }
            };
            dispatch(
              checkCameraPermissionAndNavigate(
                'CameraPage',
                {action: 'RegisterLockdown'},
                true,
                skipFunction,
              ),
            );
          }
        } else {
          const mobileNumber = result(
            res,
            'data.ipassportData.ipassDataClient.profileScope.userLogin.mobileNumberMasking',
            '',
          );
          const mobileNumberATM = result(
            res,
            'data.attributeMap.mobileNumberMasking',
            '',
          );
          const payload = JSON.parse(result(res, 'config.data', '{}'));
          if (mobileNumber || mobileNumberATM) {
            if (loginATM) {
              const params = {
                maskedUsername: obfuscateUsername(username),
                isResetEasypin,
              };
              dispatch(resetToLandingAndNavigate('EasyPin', params));
            } else {
              const params = {
                isEasyPinSet: res.data.isEasyPinSet,
                maskedUsername: obfuscateUsername(username),
                disableEasyPinLogin: true,
                TXID: payload.TXID,
                isResetEasypin,
                regisATM,
                newUserMobile: mobileNumberATM,
              };
              dispatch(resetToLandingAndNavigate('OTP', params));
            }
          } else {
            Alert.alert(
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TITLE,
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TEXT,
              [
                {
                  text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                  onPress: () => {
                    dispatch(
                      NavigationActions.navigate({routeName: 'Onboarding'}),
                    );
                  },
                },
              ],
            );
          }
        }
      })
      .catch(err => {
        if (password === '' && easyPin === '') {
          tracker.trackEvent(
            'LOGIN_FINGERPRINT_FAILED',
            'ONBOARDING',
            null,
            {},
          );
        }
        dispatch(actionCreators.hideSpinner());
        isLockedDevice || isUserRegistered
          ? dispatch(change('loginWithUsernamePassword', 'password', ''))
          : dispatch(reset('loginWithUsernamePassword'));
        dispatch(reset('loginEasyPinForm'));
        const errorCode = result(err, 'data.responseCode', '');
        if (errorCode === '05') {
          // Dormant IB user
          Alert.alert(
            language.ONBOARDING__DORMANT_TITLE,
            language.ONBOARDING__DORMANT_TEXT,
            [
              {
                text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                onPress: () => {
                  dispatch(clearAndResetPasswordBurgerMenuNoAlert());
                },
              },
            ],
          );
          return;
        }
        const status = result(err, 'status', 400);
        if (status === 429) {
          Toast.show(
            getErrorMessage(err, language.COMMON__TIMEOUT_TITLE1_F5),
            Toast.LONG,
          );
        } else {
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOG_IN),
            Toast.LONG,
          );
        }
      });
  };
}

export function loginActivation(
  {username, password, easyPin},
  isLockedDevice = false,
  isResetEasypin = false,
  regisATM = false,
  loginATM = false,
  isUserRegistered = false,
  firebaseEmoney = false,
) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    dispatch(populateBanners());
    const smsPriority = false;
    const randomNumber = randomString(16);
    const isloginActivation = 'yes';
    OBM_EncryptPassword(password ? password : easyPin, randomNumber);
    if (easyPin) {
      easyPin =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    } else {
      password =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    }

    const version = split(VersionNumber.appVersion, '.');
    const versionScope = version[0] + ',' + version[1];
    const loginAPI = api.loginNew;
    return loginAPI(
      {
        username: normalisePhoneNumber(username),
        password,
        easyPin,
        smsPriority,
        versionScope,
        isloginActivation,
      },
      isLockedDevice,
      dispatch,
    )
      .then(res => {
        dispatch(populateOffersCache());
        const userMember = result(res, 'data.customerSegment', '');
        dispatch(actionCreators.saveUserMemberData(userMember));
        const userId = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.id',
          '',
        );
        if (!password && !easyPin) {
          dispatch(actionCreators.updateLastLogin('fingerprint'));
          set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'fingerprint').catch(err => {
            Toast.show(
              getErrorMessage(
                err,
                language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
              ),
              Toast.LONG,
            );
          });
          tracker.trackEvent('LOGIN_FINGERPRINT_SUCCESS', 'ONBOARDING', null, {
            ID: userId,
          });
        } else {
          dispatch(actionCreators.clearLastLogin());
          set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'easypin').catch(err => {
            Toast.show(
              getErrorMessage(
                err,
                language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
              ),
              Toast.LONG,
            );
          });
        }
        const serverTime = moment(
          result(res, 'data.serverTime', '').toString(),
        );
        const appTime = new Date();
        const diff = moment(appTime, 'DD/MM/YYYY').diff(
          moment(serverTime, 'DD/MM/YYYY'),
        );
        const gapTime = Math.round(moment.duration(diff).asSeconds());
        const userApiKey = result(res.data, 'userApiKey', '');
        const faceRegistered = result(res.data, 'isFaceRegister', false);
        const defaultValueAccount = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.accountList',
          {},
        );
        const getdefaultAccount = find(defaultValueAccount, {
          accountType: 'emoneyAccount',
        });
        set(
          storageKeys.ACCOUNT_DATA_DEFAULT,
          middlewareUtils.getAccountDefaultEmoney(getdefaultAccount),
        );
        dispatch(
          actionCreators.isFaceRegisteredUpdate({
            isFaceRegistered: faceRegistered,
          }),
        );
        set(storageKeys.IS_FACE_REGISTERED, {
          isFaceRegistered: faceRegistered,
        }).catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
            ),
            Toast.LONG,
          );
        });
        const stateReduc = getState();
        const tooglePushLoginID = result(
          stateReduc,
          'config.flag.flagPushNotifCifCode',
          'INACTIVE',
        );
        const loginPushwooshID =
          tooglePushLoginID === 'ACTIVE'
            ? result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
                '',
              )
            : result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.loginName',
                '',
              ).toLowerCase();
        const loginSetTagID = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.title',
          '',
        ).toLowerCase();
        const checkCif = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
          '',
        );
        Dynatrace.identifyUser(checkCif);
        const isAutoSave = result(res, 'data.isAutoSave', []);
        const transfer = result(isAutoSave, 'transfer', false);
        const billPay = result(isAutoSave, 'billPay', false);
        const isSaving = result(isAutoSave, 'isSaving', false);
        const DigitalStore = result(isAutoSave, 'DigitalStore', false);
        const QR = result(isAutoSave, 'QR', false);
        dispatch(
          actionCreators.saveAutoSave({
            transfer: transfer,
            billPay: billPay,
            isSaving: isSaving,
            DigitalStore: DigitalStore,
            QR: QR,
          }),
        );
        dispatch(actionCreators.saveUserApiKey(userApiKey));
        dispatch(actionCreators.setGapTimeServer(gapTime));
        dispatch(
          actionCreators.saveTransRefNum(result(res, 'data.transRefNum', '')),
        );
        if (regisATM) {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.attributeMap.iPassport'),
            }),
          );
        } else {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.ipassport'),
            }),
          );
          assembleDataForDashboard(dispatch, res);
        }

        dispatch(populateConfigCacheEFormData());

        dispatch(actionCreators.hideSpinner());
        dispatch(change('loginWithUsernamePassword', 'password', ''));
        tracker.setUser(
          String(result(getState(), 'user.profile.customer.id', deviceInfo.id)),
        );
        const params = {
          maskedUsername: obfuscateUsername(username),
          isResetEasypin,
          isRegistDeeplink: true,
          firebaseEmoney,
        };
        dispatch(registerPushId(loginPushwooshID, loginSetTagID));
        dispatch(
          StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'EasyPin', params}),
            ],
          }),
        );
      })
      .catch(err => {
        if (password === '' && easyPin === '') {
          tracker.trackEvent(
            'LOGIN_FINGERPRINT_FAILED',
            'ONBOARDING',
            null,
            {},
          );
        }
        dispatch(actionCreators.hideSpinner());
        isLockedDevice || isUserRegistered
          ? dispatch(change('loginWithUsernamePassword', 'password', ''))
          : dispatch(reset('loginWithUsernamePassword'));
        dispatch(reset('loginEasyPinForm'));
        const errorCode = result(err, 'data.responseCode', '');
        if (errorCode === '05') {
          // Dormant IB user
          Alert.alert(
            language.ONBOARDING__DORMANT_TITLE,
            language.ONBOARDING__DORMANT_TEXT,
            [
              {
                text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                onPress: () => {
                  dispatch(clearAndResetPasswordBurgerMenuNoAlert());
                },
              },
            ],
          );
          return;
        }
        const status = result(err, 'status', 400);
        if (status === 429) {
          Toast.show(
            getErrorMessage(err, language.COMMON__TIMEOUT_TITLE1_F5),
            Toast.LONG,
          );
        } else {
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOG_IN),
            Toast.LONG,
          );
        }
      });
  };
}

export function loginToEmall(
  {username, password, easyPin},
  isLockedDevice,
  emallData,
  isResetEasypin = false,
  regisATM = false,
  loginATM = false,
  isUserRegistered = false,
) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    dispatch(populateBanners());
    const smsPriority = Boolean(
      result(getState(), 'config.smsPriority.login', false),
    );
    const randomNumber = randomString(16);
    OBM_EncryptPassword(password ? password : easyPin, randomNumber);
    if (easyPin) {
      easyPin =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    } else if (password) {
      password =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    }

    const deviceInfoLogin = {
      name: deviceInfo.name,
      model: deviceInfo.model,
    };
    const version = split(VersionNumber.appVersion, '.');
    const versionScope = version[0] + ',' + version[1];
    const loginAPI = api.loginNew;
    return loginAPI(
      {
        username: normalisePhoneNumber(username),
        password,
        easyPin,
        smsPriority,
        deviceInfoLogin,
        versionScope,
      },
      isLockedDevice,
      dispatch,
    )
      .then(res => {
        const userId = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.id',
          '',
        );
        if (!password && !easyPin) {
          dispatch(actionCreators.updateLastLogin('fingerprint'));
          set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'fingerprint').catch(err => {
            Toast.show(
              getErrorMessage(
                err,
                language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
              ),
              Toast.LONG,
            );
          });
          tracker.trackEvent('LOGIN_FINGERPRINT_SUCCESS', 'ONBOARDING', null, {
            ID: userId,
          });
        } else {
          dispatch(actionCreators.clearLastLogin());
          set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'easypin').catch(err => {
            Toast.show(
              getErrorMessage(
                err,
                language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
              ),
              Toast.LONG,
            );
          });
        }
        const userMember = result(res, 'data.customerSegment', '');
        dispatch(actionCreators.saveUserMemberData(userMember));
        const serverTime = moment(
          result(res, 'data.serverTime', '').toString(),
        );
        const appTime = new Date();
        const diff = moment(appTime, 'DD/MM/YYYY').diff(
          moment(serverTime, 'DD/MM/YYYY'),
        );
        const gapTime = Math.round(moment.duration(diff).asSeconds());
        const userApiKey = result(res.data, 'userApiKey', '');
        const faceRegistered = result(res.data, 'isFaceRegister', false);
        const privateOffers = result(res.data, 'privateOffers', []);
        dispatch(actionCreators.savePrivateOffers(privateOffers));
        dispatch(
          actionCreators.isFaceRegisteredUpdate({
            isFaceRegistered: faceRegistered,
          }),
        );
        const defaultValueAccount = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.accountList',
          {},
        );
        const getdefaultAccount = find(defaultValueAccount, {
          accountType: 'emoneyAccount',
        });
        set(
          storageKeys.ACCOUNT_DATA_DEFAULT,
          middlewareUtils.getAccountDefaultEmoney(getdefaultAccount),
        );
        set(storageKeys.IS_FACE_REGISTERED, {
          isFaceRegistered: faceRegistered,
        }).catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
            ),
            Toast.LONG,
          );
        });
        const stateReduc = getState();
        const tooglePushLoginID = result(
          stateReduc,
          'config.flag.flagPushNotifCifCode',
          'INACTIVE',
        );
        const loginPushwooshID =
          tooglePushLoginID === 'ACTIVE'
            ? result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
                '',
              )
            : result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.loginName',
                '',
              ).toLowerCase();
        const loginSetTagID = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.title',
          '',
        ).toLowerCase();
        const checkCif = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
          '',
        );
        Dynatrace.identifyUser(checkCif);
        const isAutoSave = result(res, 'data.isAutoSave', []);
        const transfer = result(isAutoSave, 'transfer', false);
        const billPay = result(isAutoSave, 'billPay', false);
        const isSaving = result(isAutoSave, 'isSaving', false);
        const DigitalStore = result(isAutoSave, 'DigitalStore', false);
        const QR = result(isAutoSave, 'QR', false);
        dispatch(
          actionCreators.saveAutoSave({
            transfer: transfer,
            billPay: billPay,
            isSaving: isSaving,
            DigitalStore: DigitalStore,
            QR: QR,
          }),
        );
        dispatch(actionCreators.saveUserApiKey(userApiKey));
        dispatch(actionCreators.setGapTimeServer(gapTime));
        dispatch(
          actionCreators.saveTransRefNum(result(res, 'data.transRefNum', '')),
        );
        if (regisATM) {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.attributeMap.iPassport'),
            }),
          );
        } else {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.ipassport'),
            }),
          );
          assembleDataForDashboard(dispatch, res);
        }

        dispatch(populateConfigCacheEFormData());

        dispatch(actionCreators.hideSpinner());
        dispatch(change('loginWithUsernamePassword', 'password', ''));
        tracker.setUser(
          String(result(getState(), 'user.profile.customer.id', deviceInfo.id)),
        );
        const isDemoAccount = /^DEMO-/.test(
          result(res, 'data.ipassport', undefined),
        );
        if ((isLockedDevice || isDemoAccount) && !isResetEasypin) {
          dispatch(registerPushId(loginPushwooshID, loginSetTagID));
          if (faceRegistered) {
            dispatch(prepareGoEmall(emallData));
          } else {
            const skipFunction = () => dispatch(prepareGoEmall(emallData)); // ->> ke sini
            dispatch(
              checkCameraPermissionAndNavigate(
                'CameraPage',
                {action: 'RegisterLockdown'},
                true,
                skipFunction,
              ),
            );
          }
        } else {
          const mobileNumber = result(
            res,
            'data.ipassportData.ipassDataClient.profileScope.userLogin.mobileNumberMasking',
            '',
          );
          const mobileNumberATM = result(
            res,
            'data.attributeMap.mobileNumberMasking',
            '',
          );
          const payload = JSON.parse(result(res, 'config.data', '{}'));
          if (mobileNumber || mobileNumberATM) {
            if (loginATM) {
              const params = {
                maskedUsername: obfuscateUsername(username),
                isResetEasypin,
              };
              dispatch(resetToLandingAndNavigate('EasyPin', params));
            } else {
              const params = {
                isEasyPinSet: res.data.isEasyPinSet,
                maskedUsername: obfuscateUsername(username),
                disableEasyPinLogin: true,
                TXID: payload.TXID,
                isResetEasypin,
                regisATM,
                newUserMobile: mobileNumberATM,
              };
              dispatch(registerPushId(loginPushwooshID, loginSetTagID));
              dispatch(resetToLandingAndNavigate('OTP', params));
            }
          } else {
            Alert.alert(
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TITLE,
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TEXT,
              [
                {
                  text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                  onPress: () => {
                    dispatch(
                      NavigationActions.navigate({routeName: 'Onboarding'}),
                    );
                  },
                },
              ],
            );
          }
        }
      })
      .catch(err => {
        if (password === '' && easyPin === '') {
          tracker.trackEvent(
            'LOGIN_FINGERPRINT_FAILED',
            'ONBOARDING',
            null,
            {},
          );
        }
        dispatch(actionCreators.hideSpinner());
        isLockedDevice || isUserRegistered
          ? dispatch(change('loginWithUsernamePassword', 'password', ''))
          : dispatch(reset('loginWithUsernamePassword'));
        dispatch(reset('loginEasyPinForm'));
        const errorCode = result(err, 'data.responseCode', '');
        if (errorCode === '05') {
          // Dormant IB user
          Alert.alert(
            language.ONBOARDING__DORMANT_TITLE,
            language.ONBOARDING__DORMANT_TEXT,
            [
              {
                text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                onPress: () => {
                  dispatch(clearAndResetPasswordBurgerMenuNoAlert());
                },
              },
            ],
          );
          return;
        }
        const status = result(err, 'status', 400);
        if (status === 429) {
          Toast.show(
            getErrorMessage(err, language.COMMON__TIMEOUT_TITLE1_F5),
            Toast.LONG,
          );
        } else {
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOG_IN),
            Toast.LONG,
          );
        }
      });
  };
}

export function loginToEgift(
  {username, password, easyPin},
  isLockedDevice,
  isOBM,
  isResetEasypin = false,
  regisATM = false,
  loginATM = false,
  isUserRegistered = false,
) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    dispatch(populateBanners());
    const smsPriority = Boolean(
      result(getState(), 'config.smsPriority.login', false),
    );
    const randomNumber = randomString(16);
    OBM_EncryptPassword(password ? password : easyPin, randomNumber);

    if (easyPin) {
      easyPin =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    } else if (password) {
      password =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    }

    const deviceInfoLogin = {
      name: deviceInfo.name,
      model: deviceInfo.model,
    };
    const version = split(VersionNumber.appVersion, '.');
    const versionScope = version[0] + ',' + version[1];
    const loginAPI = api.loginNew;
    return loginAPI(
      {
        username: normalisePhoneNumber(username),
        password,
        easyPin,
        smsPriority,
        deviceInfoLogin,
        versionScope,
      },
      isLockedDevice,
      dispatch,
    )
      .then(res => {
        const dataCore = result(res, 'data', {});
        const userMember = result(res, 'data.customerSegment', '');
        dispatch(actionCreators.saveUserMemberData(userMember));
        const setNewCredentialOBM = result(
          res,
          'data.setNewCredentialOBM',
          'ALL',
        );
        const profileScope = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope',
          '',
        );
        dispatch(actionCreators.clearLastLogin());
        set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'easypin').catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
            ),
            Toast.LONG,
          );
        });
        const serverTime = moment(
          result(res, 'data.serverTime', '').toString(),
        );
        const appTime = new Date();
        const diff = moment(appTime, 'DD/MM/YYYY').diff(
          moment(serverTime, 'DD/MM/YYYY'),
        );
        const gapTime = Math.round(moment.duration(diff).asSeconds());
        const userApiKey = result(res.data, 'userApiKey', '');
        const stateReduc = getState();
        const defaultValueAccount = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.accountList',
          {},
        );
        const getdefaultAccount = find(defaultValueAccount, {
          accountType: 'emoneyAccount',
        });
        set(
          storageKeys.ACCOUNT_DATA_DEFAULT,
          middlewareUtils.getAccountDefaultEmoney(getdefaultAccount),
        );
        const tooglePushLoginID = result(
          stateReduc,
          'config.flag.flagPushNotifCifCode',
          'INACTIVE',
        );
        const loginPushwooshID =
          tooglePushLoginID === 'ACTIVE'
            ? result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
                '',
              )
            : result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.loginName',
                '',
              ).toLowerCase();
        const loginSetTagID = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.title',
          '',
        ).toLowerCase();
        const checkCif = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
          '',
        );
        Dynatrace.identifyUser(checkCif);
        const isAutoSave = result(res, 'data.isAutoSave', []);
        const transfer = result(isAutoSave, 'transfer', false);
        const billPay = result(isAutoSave, 'billPay', false);
        const isSaving = result(isAutoSave, 'isSaving', false);
        const DigitalStore = result(isAutoSave, 'DigitalStore', false);
        const QR = result(isAutoSave, 'QR', false);
        dispatch(
          actionCreators.saveAutoSave({
            transfer: transfer,
            billPay: billPay,
            isSaving: isSaving,
            DigitalStore: DigitalStore,
            QR: QR,
          }),
        );
        dispatch(actionCreators.saveUserApiKey(userApiKey));
        dispatch(actionCreators.setGapTimeServer(gapTime));
        dispatch(
          actionCreators.saveTransRefNum(result(res, 'data.transRefNum', '')),
        );
        const privateOffers = result(res.data, 'privateOffers', []);
        dispatch(actionCreators.savePrivateOffers(privateOffers));
        if (regisATM) {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.attributeMap.iPassport'),
            }),
          );
        } else {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.ipassport'),
            }),
          );
          assembleDataForDashboard(dispatch, res);
        }

        dispatch(populateConfigCacheEFormData());

        dispatch(actionCreators.hideSpinner());
        dispatch(change('loginWithUsernamePassword', 'password', ''));
        tracker.setUser(
          String(result(getState(), 'user.profile.customer.id', deviceInfo.id)),
        );
        const isDemoAccount = /^DEMO-/.test(
          result(res, 'data.ipassport', undefined),
        );
        if ((isLockedDevice || isDemoAccount) && !isResetEasypin) {
          dispatch(registerPushId(loginPushwooshID, loginSetTagID));
          const skipFunction = () => {
            if (size(dataCore) !== 0) {
              if (setNewCredentialOBM === 'EASYPIN_OBM') {
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'EasyPinVerify',
                    params: {
                      nextRouteName: 'Dashboard',
                      setNewCredentialOBM: setNewCredentialOBM,
                      isOBM,
                      isOBMEasyPin: true,
                    },
                  }),
                );
              } else if (setNewCredentialOBM === 'PASSWORD') {
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'ValidatePassword',
                    params: {
                      nextRouteName: 'Dashboard',
                      isOBMPassword: true,
                      isOBM,
                      profileScope,
                      isLoginEgift: true,
                    },
                  }),
                );
              } else if (setNewCredentialOBM === 'ALL') {
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'ValidatePassword',
                    params: {
                      nextRouteName: 'Dashboard',
                      isOBMAll: true,
                      isOBM,
                      profileScope,
                      isLoginEgift: true,
                    },
                  }),
                );
              } else {
                dispatch(prepareGoEgift());
              }
            } else {
              Toast.show(language.ERROR_MESSAGE__COULD_NOT_LOG_IN, Toast.LONG);
            }
          };
          dispatch(
            checkCameraPermissionAndNavigate(
              'CameraPage',
              {action: 'RegisterLockdown'},
              true,
              skipFunction,
            ),
          );
        } else {
          const mobileNumber = result(
            res,
            'data.ipassportData.ipassDataClient.profileScope.userLogin.mobileNumberMasking',
            '',
          );
          const mobileNumberATM = result(
            res,
            'data.attributeMap.mobileNumberMasking',
            '',
          );
          const payload = JSON.parse(result(res, 'config.data', '{}'));
          if (mobileNumber || mobileNumberATM) {
            if (loginATM) {
              const params = {
                maskedUsername: obfuscateUsername(username),
                isResetEasypin,
              };
              dispatch(resetToLandingAndNavigate('EasyPin', params));
            } else {
              const params = {
                isEasyPinSet: res.data.isEasyPinSet,
                maskedUsername: obfuscateUsername(username),
                disableEasyPinLogin: true,
                TXID: payload.TXID,
                isResetEasypin,
                regisATM,
                newUserMobile: mobileNumberATM,
              };
              dispatch(registerPushId(loginPushwooshID, loginSetTagID));
              dispatch(resetToLandingAndNavigate('OTP', params));
            }
          } else {
            Alert.alert(
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TITLE,
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TEXT,
              [
                {
                  text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                  onPress: () => {
                    dispatch(
                      NavigationActions.navigate({routeName: 'Onboarding'}),
                    );
                  },
                },
              ],
            );
          }
        }
      })
      .catch(err => {
        if (password === '' && easyPin === '') {
          tracker.trackEvent(
            'LOGIN_FINGERPRINT_FAILED',
            'ONBOARDING',
            null,
            {},
          );
        }
        dispatch(actionCreators.hideSpinner());
        isLockedDevice || isUserRegistered
          ? dispatch(change('loginWithUsernamePassword', 'password', ''))
          : dispatch(reset('loginWithUsernamePassword'));
        dispatch(reset('loginEasyPinForm'));
        const errorCode = result(err, 'data.responseCode', '');
        if (errorCode === '05') {
          // Dormant IB user
          Alert.alert(
            language.ONBOARDING__DORMANT_TITLE,
            language.ONBOARDING__DORMANT_TEXT,
            [
              {
                text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                onPress: () => {
                  dispatch(clearAndResetPasswordBurgerMenuNoAlert());
                },
              },
            ],
          );
          return;
        }
        const status = result(err, 'status', 400);
        if (status === 429) {
          Toast.show(
            getErrorMessage(err, language.COMMON__TIMEOUT_TITLE1_F5),
            Toast.LONG,
          );
        } else {
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOG_IN),
            Toast.LONG,
          );
        }
      });
  };
}

export function loginToEmoney(
  {username, password, easyPin},
  isLockedDevice,
  isOBM,
  isResetEasypin = false,
  regisATM = false,
  loginATM = false,
  isUserRegistered = false,
) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    dispatch(populateBanners());
    const smsPriority = Boolean(
      result(getState(), 'config.smsPriority.login', false),
    );
    const randomNumber = randomString(16);
    OBM_EncryptPassword(password ? password : easyPin, randomNumber);

    if (easyPin) {
      easyPin =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    } else if (password) {
      password =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    }

    const deviceInfoLogin = {
      name: deviceInfo.name,
      model: deviceInfo.model,
    };
    const version = split(VersionNumber.appVersion, '.');
    const versionScope = version[0] + ',' + version[1];
    const loginAPI = api.loginNew;
    return loginAPI(
      {
        username: normalisePhoneNumber(username),
        password,
        easyPin,
        smsPriority,
        deviceInfoLogin,
        versionScope,
      },
      isLockedDevice,
      dispatch,
    )
      .then(res => {
        const payeeList = result(getState(), 'payees', []);
        if (isEmpty(payeeList)) {
          dispatch(getTargetAccount());
        }
        const userMember = result(res, 'data.customerSegment', '');
        dispatch(actionCreators.saveUserMemberData(userMember));
        const setNewCredentialOBM = result(
          res,
          'data.setNewCredentialOBM',
          'ALL',
        );
        const profileScope = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope',
          '',
        );
        dispatch(actionCreators.clearLastLogin());
        set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'easypin').catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
            ),
            Toast.LONG,
          );
        });
        const serverTime = moment(
          result(res, 'data.serverTime', '').toString(),
        );
        const appTime = new Date();
        const diff = moment(appTime, 'DD/MM/YYYY').diff(
          moment(serverTime, 'DD/MM/YYYY'),
        );
        const gapTime = Math.round(moment.duration(diff).asSeconds());
        const userApiKey = result(res.data, 'userApiKey', '');
        const stateReduc = getState();
        const tooglePushLoginID = result(
          stateReduc,
          'config.flag.flagPushNotifCifCode',
          'INACTIVE',
        );
        const loginPushwooshID =
          tooglePushLoginID === 'ACTIVE'
            ? result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
                '',
              )
            : result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.loginName',
                '',
              ).toLowerCase();
        const loginSetTagID = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.title',
          '',
        ).toLowerCase();
        const checkCif = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
          '',
        );
        Dynatrace.identifyUser(checkCif);
        const isAutoSave = result(res, 'data.isAutoSave', []);
        const transfer = result(isAutoSave, 'transfer', false);
        const billPay = result(isAutoSave, 'billPay', false);
        const isSaving = result(isAutoSave, 'isSaving', false);
        const DigitalStore = result(isAutoSave, 'DigitalStore', false);
        const QR = result(isAutoSave, 'QR', false);
        dispatch(
          actionCreators.saveAutoSave({
            transfer: transfer,
            billPay: billPay,
            isSaving: isSaving,
            DigitalStore: DigitalStore,
            QR: QR,
          }),
        );
        dispatch(actionCreators.saveUserApiKey(userApiKey));
        dispatch(actionCreators.setGapTimeServer(gapTime));
        dispatch(
          actionCreators.saveTransRefNum(result(res, 'data.transRefNum', '')),
        );
        dispatch(actionCreators.saveConfigTime(res.data));
        const privateOffers = result(res.data, 'privateOffers', []);
        dispatch(actionCreators.savePrivateOffers(privateOffers));
        if (regisATM) {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.attributeMap.iPassport'),
            }),
          );
        } else {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.ipassport'),
            }),
          );
          assembleDataForDashboard(dispatch, res);
        }

        dispatch(populateConfigCacheEFormData());

        dispatch(actionCreators.hideSpinner());
        dispatch(change('loginWithUsernamePassword', 'password', ''));
        tracker.setUser(
          String(result(getState(), 'user.profile.customer.id', deviceInfo.id)),
        );
        const isDemoAccount = /^DEMO-/.test(
          result(res, 'data.ipassport', undefined),
        );
        if ((isLockedDevice || isDemoAccount) && !isResetEasypin) {
          dispatch(registerPushId(loginPushwooshID, loginSetTagID));
          const skipFunction = () => {
            if (setNewCredentialOBM === 'EASYPIN_OBM') {
              dispatch(
                NavigationActions.navigate({
                  routeName: 'EasyPinVerify',
                  params: {
                    nextRouteName: 'Dashboard',
                    setNewCredentialOBM: setNewCredentialOBM,
                    isOBM,
                    isOBMEasyPin: true,
                  },
                }),
              );
            } else if (setNewCredentialOBM === 'PASSWORD') {
              dispatch(
                NavigationActions.navigate({
                  routeName: 'ValidatePassword',
                  params: {
                    nextRouteName: 'Dashboard',
                    isOBMPassword: true,
                    isOBM,
                    profileScope,
                    isLoginEmoney: true,
                  },
                }),
              );
            } else if (setNewCredentialOBM === 'ALL') {
              dispatch(
                NavigationActions.navigate({
                  routeName: 'ValidatePassword',
                  params: {
                    nextRouteName: 'Dashboard',
                    isOBMAll: true,
                    isOBM,
                    profileScope,
                    isLoginEmoney: true,
                  },
                }),
              );
            } else {
              dispatch(prepareGoEmoney());
            }
          };
          dispatch(
            checkCameraPermissionAndNavigate(
              'CameraPage',
              {action: 'RegisterLockdown'},
              true,
              skipFunction,
            ),
          );
        } else {
          const mobileNumber = result(
            res,
            'data.ipassportData.ipassDataClient.profileScope.userLogin.mobileNumberMasking',
            '',
          );
          const mobileNumberATM = result(
            res,
            'data.attributeMap.mobileNumberMasking',
            '',
          );
          const payload = JSON.parse(result(res, 'config.data', '{}'));
          if (mobileNumber || mobileNumberATM) {
            if (loginATM) {
              const params = {
                maskedUsername: obfuscateUsername(username),
                isResetEasypin,
              };
              dispatch(resetToLandingAndNavigate('EasyPin', params));
            } else {
              const params = {
                isEasyPinSet: res.data.isEasyPinSet,
                maskedUsername: obfuscateUsername(username),
                disableEasyPinLogin: true,
                TXID: payload.TXID,
                isResetEasypin,
                regisATM,
                newUserMobile: mobileNumberATM,
              };
              dispatch(registerPushId(loginPushwooshID, loginSetTagID));
              dispatch(resetToLandingAndNavigate('OTP', params));
            }
          } else {
            Alert.alert(
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TITLE,
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TEXT,
              [
                {
                  text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                  onPress: () => {
                    dispatch(
                      NavigationActions.navigate({routeName: 'Onboarding'}),
                    );
                  },
                },
              ],
            );
          }
        }
      })
      .catch(err => {
        if (password === '' && easyPin === '') {
          tracker.trackEvent(
            'LOGIN_FINGERPRINT_FAILED',
            'ONBOARDING',
            null,
            {},
          );
        }
        dispatch(actionCreators.hideSpinner());
        isLockedDevice || isUserRegistered
          ? dispatch(change('loginWithUsernamePassword', 'password', ''))
          : dispatch(reset('loginWithUsernamePassword'));
        dispatch(reset('loginEasyPinForm'));
        const errorCode = result(err, 'data.responseCode', '');
        if (errorCode === '05') {
          // Dormant IB user
          Alert.alert(
            language.ONBOARDING__DORMANT_TITLE,
            language.ONBOARDING__DORMANT_TEXT,
            [
              {
                text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                onPress: () => {
                  dispatch(clearAndResetPasswordBurgerMenuNoAlert());
                },
              },
            ],
          );
          return;
        }
        const status = result(err, 'status', 400);
        if (status === 429) {
          Toast.show(
            getErrorMessage(err, language.COMMON__TIMEOUT_TITLE1_F5),
            Toast.LONG,
          );
        } else {
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOG_IN),
            Toast.LONG,
          );
        }
      });
  };
}

export function loginToAccount(
  {username, password, easyPin},
  isLockedDevice,
  isOBM,
  isResetEasypin = false,
  regisATM = false,
  loginATM = false,
  isUserRegistered = false,
  gotoluckyDip = 'false',
  isProfile,
  isFromSearch,
) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    dispatch(populateBanners());
    const saveRandomNumber = result(getState(), 'randomNumber', '');
    const smsPriority = Boolean(
      result(getState(), 'config.smsPriority.login', false),
    );
    let randomNumber = randomString(16);
    if (!isEmpty(saveRandomNumber)) {
      randomNumber = randomString(16);
    }
    do {
      randomNumber = randomString(16);
    } while (randomNumber === saveRandomNumber);

    OBM_EncryptPassword(password ? password : easyPin, randomNumber);

    if (easyPin) {
      easyPin =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    } else if (password) {
      password =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    }

    const deviceInfoLogin = {
      name: deviceInfo.name,
      model: deviceInfo.model,
    };
    const version = split(VersionNumber.appVersion, '.');
    const versionScope = version[0] + ',' + version[1];
    const loginAPI = api.loginNew;
    return loginAPI(
      {
        username: normalisePhoneNumber(username),
        password,
        easyPin,
        smsPriority,
        deviceInfoLogin,
        versionScope,
      },
      isLockedDevice,
      dispatch,
    )
      .then(res => {
        const userMember = result(res, 'data.customerSegment', '');
        dispatch(actionCreators.saveUserMemberData(userMember));
        const payeeList = result(getState(), 'payees', []);
        if (isProfile === true) {
          dispatch(couponCustomerCounting());
        }
        if (isEmpty(payeeList)) {
          dispatch(getTargetAccount());
        }
        const setNewCredentialOBM = result(
          res,
          'data.setNewCredentialOBM',
          'ALL',
        );
        const profileScope = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope',
          '',
        );
        dispatch(updatePicture());
        dispatch(actionCreators.clearLastLogin());
        set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'easypin').catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
            ),
            Toast.LONG,
          );
        });
        const serverTime = moment(
          result(res, 'data.serverTime', '').toString(),
        );
        const appTime = new Date();
        const diff = moment(appTime, 'DD/MM/YYYY').diff(
          moment(serverTime, 'DD/MM/YYYY'),
        );
        const gapTime = Math.round(moment.duration(diff).asSeconds());
        const userApiKey = result(res.data, 'userApiKey', '');
        const stateReduc = getState();
        const tooglePushLoginID = result(
          stateReduc,
          'config.flag.flagPushNotifCifCode',
          'INACTIVE',
        );
        const loginPushwooshID =
          tooglePushLoginID === 'ACTIVE'
            ? result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
                '',
              )
            : result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.loginName',
                '',
              ).toLowerCase();
        const loginSetTagID = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.title',
          '',
        ).toLowerCase();
        const checkCif = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
          '',
        );
        Dynatrace.identifyUser(checkCif);
        const isAutoSave = result(res, 'data.isAutoSave', []);
        const transfer = result(isAutoSave, 'transfer', false);
        const billPay = result(isAutoSave, 'billPay', false);
        const isSaving = result(isAutoSave, 'isSaving', false);
        const DigitalStore = result(isAutoSave, 'DigitalStore', false);
        const QR = result(isAutoSave, 'QR', false);
        dispatch(
          actionCreators.saveAutoSave({
            transfer: transfer,
            billPay: billPay,
            isSaving: isSaving,
            DigitalStore: DigitalStore,
            QR: QR,
          }),
        );
        dispatch(actionCreators.saveUserApiKey(userApiKey));
        dispatch(actionCreators.setGapTimeServer(gapTime));
        dispatch(
          actionCreators.saveTransRefNum(result(res, 'data.transRefNum', '')),
        );
        dispatch(actionCreators.saveConfigTime(res.data));
        const privateOffers = result(res.data, 'privateOffers', []);
        dispatch(actionCreators.savePrivateOffers(privateOffers));
        if (regisATM) {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.attributeMap.iPassport'),
            }),
          );
        } else {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.ipassport'),
            }),
          );
          assembleDataForDashboard(dispatch, res);
        }

        dispatch(populateConfigCacheEFormData());

        dispatch(actionCreators.hideSpinner());
        dispatch(change('loginWithUsernamePassword', 'password', ''));
        tracker.setUser(
          String(result(getState(), 'user.profile.customer.id', deviceInfo.id)),
        );
        const isDemoAccount = /^DEMO-/.test(
          result(res, 'data.ipassport', undefined),
        );
        if ((isLockedDevice || isDemoAccount) && !isResetEasypin) {
          dispatch(registerPushId(loginPushwooshID, loginSetTagID));
          const skipFunction = () => {
            if (setNewCredentialOBM === 'EASYPIN_OBM') {
              dispatch(
                NavigationActions.navigate({
                  routeName: 'EasyPinVerify',
                  params: {
                    nextRouteName: 'Dashboard',
                    setNewCredentialOBM: setNewCredentialOBM,
                    isOBM,
                    isOBMEasyPin: true,
                  },
                }),
              );
            } else if (setNewCredentialOBM === 'ALL') {
              dispatch(
                NavigationActions.navigate({
                  routeName: 'ValidatePassword',
                  params: {
                    nextRouteName: 'Dashboard',
                    isOBMAll: true,
                    isOBM,
                    profileScope,
                    isLoginAccount: true,
                  },
                }),
              );
            } else {
              dispatch(prepareGoAccount(false, gotoluckyDip, isFromSearch));
              dispatch(getLuckyDipTicket());
            }
          };
          if (setNewCredentialOBM === 'PASSWORD') {
            dispatch(
              NavigationActions.navigate({
                routeName: 'ValidatePassword',
                params: {
                  nextRouteName: 'Dashboard',
                  isOBMPassword: true,
                  isOBM,
                  profileScope,
                  gotoluckyDip,
                  isFromSearch,
                  isLoginAccount: true,
                  isProfile,
                },
              }),
            );
          } else {
            dispatch(
              checkCameraPermissionAndNavigate(
                'CameraPage',
                {action: 'RegisterLockdown'},
                true,
                skipFunction,
              ),
            );
          }
        } else {
          const mobileNumber = result(
            res,
            'data.ipassportData.ipassDataClient.profileScope.userLogin.mobileNumberMasking',
            '',
          );
          const mobileNumberATM = result(
            res,
            'data.attributeMap.mobileNumberMasking',
            '',
          );
          const payload = JSON.parse(result(res, 'config.data', '{}'));
          if (mobileNumber || mobileNumberATM) {
            if (loginATM) {
              const params = {
                maskedUsername: obfuscateUsername(username),
                isResetEasypin,
              };
              dispatch(resetToLandingAndNavigate('EasyPin', params));
            } else {
              const params = {
                isEasyPinSet: res.data.isEasyPinSet,
                maskedUsername: obfuscateUsername(username),
                disableEasyPinLogin: true,
                TXID: payload.TXID,
                isResetEasypin,
                regisATM,
                newUserMobile: mobileNumberATM,
              };
              dispatch(registerPushId(loginPushwooshID, loginSetTagID));
              dispatch(resetToLandingAndNavigate('OTP', params));
            }
          } else {
            Alert.alert(
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TITLE,
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TEXT,
              [
                {
                  text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                  onPress: () => {
                    dispatch(
                      NavigationActions.navigate({routeName: 'Onboarding'}),
                    );
                  },
                },
              ],
            );
          }
        }
        dispatch(destroy('loginEasyPinFormAccount'));
      })
      .catch(err => {
        if (password === '' && easyPin === '') {
          tracker.trackEvent(
            'LOGIN_FINGERPRINT_FAILED',
            'ONBOARDING',
            null,
            {},
          );
        }
        dispatch(actionCreators.hideSpinner());
        isLockedDevice || isUserRegistered
          ? dispatch(change('loginWithUsernamePassword', 'password', ''))
          : dispatch(reset('loginWithUsernamePassword'));
        dispatch(reset('loginEasyPinForm'));
        const errorCode = result(err, 'data.responseCode', '');
        if (errorCode === '05') {
          // Dormant IB user
          Alert.alert(
            language.ONBOARDING__DORMANT_TITLE,
            language.ONBOARDING__DORMANT_TEXT,
            [
              {
                text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                onPress: () => {
                  dispatch(clearAndResetPasswordBurgerMenuNoAlert());
                },
              },
            ],
          );
          return;
        }
        const status = result(err, 'status', 400);
        if (status === 429) {
          Toast.show(
            getErrorMessage(err, language.COMMON__TIMEOUT_TITLE1_F5),
            Toast.LONG,
          );
        } else {
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOG_IN),
            Toast.LONG,
          );
          dispatch(destroy('loginEasyPinFormAccount'));
        }
      });
  };
}

export function loginToSendCash(
  {username, password, easyPin},
  isLockedDevice,
  isOBM,
  isResetEasypin = false,
  regisATM = false,
  loginATM = false,
  isUserRegistered = false,
  gotoluckyDip = 'false',
) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    dispatch(populateBanners());
    const smsPriority = Boolean(
      result(getState(), 'config.smsPriority.login', false),
    );
    const randomNumber = randomString(16);
    OBM_EncryptPassword(password ? password : easyPin, randomNumber);

    if (easyPin) {
      easyPin =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    } else if (password) {
      password =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    }

    const deviceInfoLogin = {
      name: deviceInfo.name,
      model: deviceInfo.model,
    };
    const version = split(VersionNumber.appVersion, '.');
    const versionScope = version[0] + ',' + version[1];
    const loginAPI = api.loginNew;
    return loginAPI(
      {
        username: normalisePhoneNumber(username),
        password,
        easyPin,
        smsPriority,
        deviceInfoLogin,
        versionScope,
      },
      isLockedDevice,
      dispatch,
    )
      .then(res => {
        const userMember = result(res, 'data.customerSegment', '');
        dispatch(actionCreators.saveUserMemberData(userMember));
        const payeeList = result(getState(), 'payees', []);
        if (isEmpty(payeeList)) {
          dispatch(getTargetAccount());
        }
        const setNewCredentialOBM = result(
          res,
          'data.setNewCredentialOBM',
          'ALL',
        );
        const profileScope = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope',
          '',
        );
        dispatch(actionCreators.clearLastLogin());
        set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'easypin').catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
            ),
            Toast.LONG,
          );
        });
        const serverTime = moment(
          result(res, 'data.serverTime', '').toString(),
        );
        const appTime = new Date();
        const diff = moment(appTime, 'DD/MM/YYYY').diff(
          moment(serverTime, 'DD/MM/YYYY'),
        );
        const gapTime = Math.round(moment.duration(diff).asSeconds());
        const userApiKey = result(res.data, 'userApiKey', '');
        const stateReduc = getState();
        const tooglePushLoginID = result(
          stateReduc,
          'config.flag.flagPushNotifCifCode',
          'INACTIVE',
        );
        const loginPushwooshID =
          tooglePushLoginID === 'ACTIVE'
            ? result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
                '',
              )
            : result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.loginName',
                '',
              ).toLowerCase();
        const loginSetTagID = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.title',
          '',
        ).toLowerCase();
        const checkCif = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
          '',
        );
        Dynatrace.identifyUser(checkCif);
        const isAutoSave = result(res, 'data.isAutoSave', []);
        const transfer = result(isAutoSave, 'transfer', false);
        const billPay = result(isAutoSave, 'billPay', false);
        const isSaving = result(isAutoSave, 'isSaving', false);
        const DigitalStore = result(isAutoSave, 'DigitalStore', false);
        const QR = result(isAutoSave, 'QR', false);
        dispatch(
          actionCreators.saveAutoSave({
            transfer: transfer,
            billPay: billPay,
            isSaving: isSaving,
            DigitalStore: DigitalStore,
            QR: QR,
          }),
        );
        dispatch(actionCreators.saveUserApiKey(userApiKey));
        dispatch(actionCreators.setGapTimeServer(gapTime));
        dispatch(
          actionCreators.saveTransRefNum(result(res, 'data.transRefNum', '')),
        );
        dispatch(actionCreators.saveConfigTime(res.data));
        const privateOffers = result(res.data, 'privateOffers', []);
        dispatch(actionCreators.savePrivateOffers(privateOffers));
        if (regisATM) {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.attributeMap.iPassport'),
            }),
          );
        } else {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.ipassport'),
            }),
          );
          assembleDataForDashboard(dispatch, res);
        }

        dispatch(populateConfigCacheEFormData());

        dispatch(actionCreators.hideSpinner());
        dispatch(change('loginWithUsernamePassword', 'password', ''));
        tracker.setUser(
          String(result(getState(), 'user.profile.customer.id', deviceInfo.id)),
        );
        const isDemoAccount = /^DEMO-/.test(
          result(res, 'data.ipassport', undefined),
        );
        if ((isLockedDevice || isDemoAccount) && !isResetEasypin) {
          dispatch(registerPushId(loginPushwooshID, loginSetTagID));

          const skipFunction = () => {
            if (setNewCredentialOBM === 'EASYPIN_OBM') {
              dispatch(
                NavigationActions.navigate({
                  routeName: 'EasyPinVerify',
                  params: {
                    nextRouteName: 'Dashboard',
                    setNewCredentialOBM: setNewCredentialOBM,
                    isOBM,
                    isOBMEasyPin: true,
                  },
                }),
              );
            } else if (setNewCredentialOBM === 'ALL') {
              dispatch(
                NavigationActions.navigate({
                  routeName: 'ValidatePassword',
                  params: {
                    nextRouteName: 'Dashboard',
                    isOBMAll: true,
                    isOBM,
                    profileScope,
                    isLoginAccount: true,
                  },
                }),
              );
            } else {
              dispatch(prepareGoSend(false, gotoluckyDip));
            }
          };
          if (setNewCredentialOBM === 'PASSWORD') {
            dispatch(
              NavigationActions.navigate({
                routeName: 'ValidatePassword',
                params: {
                  nextRouteName: 'Dashboard',
                  isOBMPassword: true,
                  isOBM,
                  profileScope,
                  isLoginAccount: true,
                },
              }),
            );
          } else {
            dispatch(
              checkCameraPermissionAndNavigate(
                'CameraPage',
                {action: 'RegisterLockdown'},
                true,
                skipFunction,
              ),
            );
          }
        } else {
          const mobileNumber = result(
            res,
            'data.ipassportData.ipassDataClient.profileScope.userLogin.mobileNumberMasking',
            '',
          );
          const mobileNumberATM = result(
            res,
            'data.attributeMap.mobileNumberMasking',
            '',
          );
          const payload = JSON.parse(result(res, 'config.data', '{}'));
          if (mobileNumber || mobileNumberATM) {
            if (loginATM) {
              const params = {
                maskedUsername: obfuscateUsername(username),
                isResetEasypin,
              };
              dispatch(resetToLandingAndNavigate('EasyPin', params));
            } else {
              const params = {
                isEasyPinSet: res.data.isEasyPinSet,
                maskedUsername: obfuscateUsername(username),
                disableEasyPinLogin: true,
                TXID: payload.TXID,
                isResetEasypin,
                regisATM,
                newUserMobile: mobileNumberATM,
              };
              dispatch(registerPushId(loginPushwooshID, loginSetTagID));
              dispatch(resetToLandingAndNavigate('OTP', params));
            }
          } else {
            Alert.alert(
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TITLE,
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TEXT,
              [
                {
                  text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                  onPress: () => {
                    dispatch(
                      NavigationActions.navigate({routeName: 'Onboarding'}),
                    );
                  },
                },
              ],
            );
          }
        }
      })
      .catch(err => {
        if (password === '' && easyPin === '') {
          tracker.trackEvent(
            'LOGIN_FINGERPRINT_FAILED',
            'ONBOARDING',
            null,
            {},
          );
        }
        dispatch(actionCreators.hideSpinner());
        isLockedDevice || isUserRegistered
          ? dispatch(change('loginWithUsernamePassword', 'password', ''))
          : dispatch(reset('loginWithUsernamePassword'));
        dispatch(reset('loginEasyPinForm'));
        const errorCode = result(err, 'data.responseCode', '');
        if (errorCode === '05') {
          // Dormant IB user
          Alert.alert(
            language.ONBOARDING__DORMANT_TITLE,
            language.ONBOARDING__DORMANT_TEXT,
            [
              {
                text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                onPress: () => {
                  dispatch(clearAndResetPasswordBurgerMenuNoAlert());
                },
              },
            ],
          );
          return;
        }
        const status = result(err, 'status', 400);
        if (status === 429) {
          Toast.show(
            getErrorMessage(err, language.COMMON__TIMEOUT_TITLE1_F5),
            Toast.LONG,
          );
        } else {
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOG_IN),
            Toast.LONG,
          );
          dispatch(destroy('loginEasyPinFormAccount'));
        }
      });
  };
}

export function prepareGoSend(isLoginAccount) {
  return (dispatch, getState) => {
    const navigationKeys = result(
      getState(),
      'promos.navigateOnPushClicked',
      false,
    );
    dispatch(destroy('loginWithUsernamePassword'));
    dispatch(destroy('loginAccountForm'));
    dispatch(destroy('easyPinCreationForm'));
    dispatch(destroy('easyPinCreationConfirmForm'));
    dispatch(destroy('ActivationForm'));
    dispatch(initStoreWithTransactionDetails());
    dispatch(isNewBurgerMenu());
    if (isLoginAccount) {
      dispatch(NavigationActions.back());
    }
    if (navigationKeys.length) {
      forEach(navigationKeys, navigateKey =>
        dispatch(NavigationActions.navigate({routeName: navigateKey})),
      );
      dispatch(actionCreators.changeNotificationRoute([]));
    }
  };
}

export function prepareGoAccount(
  isLoginAccount,
  gotoluckyDip = '',
  isFromSearch,
  productName,
  offerNavigate,
) {
  return (dispatch, getState) => {
    const navigationKeys = result(
      getState(),
      'promos.navigateOnPushClicked',
      false,
    );
    const urlLink =
      gotoluckyDip === 'Privacy Policy'
        ? result(getState(), 'config.attention.urlSimobiPrivacyPolicy', '')
        : result(
            getState(),
            'config.attention.urlSimobiOnboardingTnCWithoutCheckbox',
            '',
          );
    dispatch(destroy('loginWithUsernamePassword'));
    dispatch(destroy('loginAccountForm'));
    dispatch(destroy('easyPinCreationForm'));
    dispatch(destroy('easyPinCreationConfirmForm'));
    dispatch(destroy('ActivationForm'));
    dispatch(initStoreWithTransactionDetails());
    dispatch(isNewBurgerMenu());
    if (isLoginAccount) {
      dispatch(NavigationActions.back());
    }
    if (gotoluckyDip !== '') {
      if (gotoluckyDip === 'true') {
        dispatch(NavigationActions.back());
        dispatch(
          NavigationActions.navigate({
            routeName: 'LuckyDipMainPage',
            params: {pathRoute: 'HomeScreen'},
          }),
        );
      } else if (gotoluckyDip === 'LoginLanding') {
        dispatch(NavigationActions.back());
      }
    }
    if (!isEmpty(productName)) {
      dispatch(NavigationActions.back());
      dispatch(genericProductRoutes(productName));
    }
    if (!isEmpty(offerNavigate)) {
      dispatch(NavigationActions.back());
      dispatch(genericSearchNavigate(offerNavigate));
    }
    if (isFromSearch) {
      dispatch(NavigationActions.back());
      dispatch(genericSearchNavigate(gotoluckyDip, urlLink));
    }
    if (navigationKeys.length) {
      forEach(navigationKeys, navigateKey =>
        dispatch(NavigationActions.navigate({routeName: navigateKey})),
      );
      dispatch(actionCreators.changeNotificationRoute([]));
    }
  };
}

export function prepareGoEgift() {
  return (dispatch, getState) => {
    const state = getState();
    const navigationKeys = result(
      getState(),
      'promos.navigateOnPushClicked',
      false,
    );
    const cifCode = state.user.profile.customer.cifCode;
    const accountList = result(state, 'accounts', []);
    dispatch(refreshStorage());
    dispatch(inquirySimasPoin());
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
    dispatch(actionCreators.showSpinner());
    if (startsWith(cifCode, 'NK')) {
      dispatch(NavigationActions.back());
      dispatch(NavigationActions.navigate({routeName: 'EgiftConfirm'}));
    } else {
      if (
        accountList.length === 1 &&
        find(accountList, {accountType: 'emoneyAccount'})
      ) {
        dispatch(NavigationActions.back());
        dispatch(NavigationActions.navigate({routeName: 'EgiftConfirm'}));
      } else {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.back());
        dispatch(NavigationActions.navigate({routeName: 'EgiftConfirm'}));
      }
    }
  };
}

export function prepareGoEmoney(isLoginEmoney) {
  return (dispatch, getState) => {
    const state = getState();
    const navigationKeys = result(
      getState(),
      'promos.navigateOnPushClicked',
      false,
    );
    const cifCode = state.user.profile.customer.cifCode;
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
    dispatch(actionCreators.showSpinner());
    if (isLoginEmoney === true) {
      dispatch(actionCreators.hideSpinner());
      dispatch(
        StackActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({routeName: 'Landing'}),
            NavigationActions.navigate({routeName: 'EmoneyDashboard'}),
          ],
        }),
      );
    } else {
      dispatch(actionCreators.hideSpinner());
      if (startsWith(cifCode, 'NK')) {
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'Landing'}),
              NavigationActions.navigate({routeName: 'EmoneyDashboard'}),
            ],
          }),
        );
      } else {
        dispatch(actionCreators.hideSpinner());
        if (
          accountList.length === 1 &&
          find(accountList, {accountType: 'emoneyAccount'})
        ) {
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'Landing'}),
                NavigationActions.navigate({routeName: 'EmoneyDashboard'}),
              ],
            }),
          );
        } else {
          dispatch(actionCreators.hideSpinner());
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'Landing'}),
                NavigationActions.navigate({routeName: 'EmoneyDashboard'}),
              ],
            }),
          );
        }
      }
    }
  };
}

export function prepareGoEmall(emallData) {
  return dispatch => {
    const emallType = result(emallData, 'type', '');
    if (emallType === 'cgv') {
      dispatch(goCgv(emallData));
    } else {
      dispatch(goTx(emallData));
    }
  };
}

export function clearAndResetPasswordEmall() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const resetPassword = () => {
      hideAlert();
      dispatch(destroy('loginWithUsernamePassword'));
      dispatch(actionCreators.showSpinner());
      Promise.all([clearLocalStorage(), dispatch(clearReducer())]).then(() => {
        dispatch(tokenInit())
          .then(() => dispatch(hsmInit()))
          .then(() => {
            dispatch(getLoginPreference());
            setTimeout(() => {
              dispatch(actionCreators.hideSpinner());
              dispatch(actionCreators.savePositionDeeplink('yes'));
              dispatch(
                StackActions.reset({
                  index: 1,
                  actions: [
                    NavigationActions.navigate({routeName: 'Login'}),
                    NavigationActions.navigate({
                      routeName: 'RegisterAtm',
                      params: {isForgetPassword: true},
                    }),
                  ],
                }),
              );
            }, 1000);
          })
          .catch(() => {
            dispatch(actionCreators.hideSpinner());
            dispatch(actionCreators.savePositionDeeplink('yes'));
            Toast.show('Error clearing data', Toast.LONG);
          });
      });
      Pushwoosh.init({
        pw_appid: pushWooshAppConstants.applicationID,
        project_number: pushWooshAppConstants.FCMID,
      });
      Pushwoosh.register();
      Pushwoosh.setUserId('HWID');
    };
    const modalOptions = {
      heading1: language.ONBOARDING__CLEAR_DEVICE_TITLE,
      text: language.ONBOARDING__CLEAR_DEVICE,
      button1: language.ONBOARDING__CLEAR_CANCEL,
      onButton1Press: hideAlert,
      button2: language.ONBOARDING__CLEAR_OKAY,
      onButton2Press: resetPassword,
      onClose: hideAlert,
    };
    dispatch(
      actionCreators.showSinarmasAlert({...modalOptions, image: 'REFRESH'}),
    );
  };
}

export function confirmEmall(accData, emallData) {
  return dispatch => {
    const emallType = result(emallData, 'type', '');
    if (emallType === 'cgv') {
      dispatch(goCgvConfirm(accData, emallData));
    } else {
      dispatch(goTxConfirm(accData, emallData));
    }
  };
}

export function confirmEmallSimas(isUseSimas, emallData) {
  return dispatch => {
    const emallType = result(emallData, 'type', '');
    if (emallType === 'cgv') {
      dispatch(goCgvConfirmSimas(isUseSimas, emallData));
    } else {
      dispatch(goTxConfirmSimas(isUseSimas, emallData));
    }
  };
}

export function toLandingEmall() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToLogout = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      return api
        .logOut(dispatch)
        .then(() => {
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.cleanAppState());
          dispatch(actionCreators.savePositionDeeplink('yes'));
        })
        .catch(() => {
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.cleanAppState());
          dispatch(actionCreators.savePositionDeeplink('yes'));
        });
    };
    const sinarmasModalOptions = {
      heading1: language.CGV__MODAL_HEADING,
      text: language.CGV__MODAL_TEXT,
      button1: language.CGV__MODAL_CANCEL,
      onButton1Press: hideAlert,
      button2: language.CGV__MODAL_BACK,
      onButton2Press: goToLogout,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function loginBiller(
  {username, password, easyPin},
  isLockedDevice,
  isOrami,
  tokenId = '',
  tokenPaymentNkyc,
  tokenPaymentSplitBillKyc,
  tokenPaymentFundtrfSplitBill,
  tokenPaymentRejectSplitBill,
  tokenPaymentRejectNKYC,
  isResetEasypin = false,
  regisATM = false,
  loginATM = false,
  isUserRegistered = false,
) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    dispatch(populateBanners());
    const smsPriority = Boolean(
      result(getState(), 'config.smsPriority.login', false),
    );
    const randomNumber = randomString(16);
    OBM_EncryptPassword(password ? password : easyPin, randomNumber);

    if (easyPin) {
      easyPin =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    } else {
      password =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    }
    const deviceInfoLogin = {
      name: deviceInfo.name,
      model: deviceInfo.model,
    };
    const version = split(VersionNumber.appVersion, '.');
    const versionScope = version[0] + ',' + version[1];
    const loginAPI = api.loginNew;
    return loginAPI(
      {
        username: normalisePhoneNumber(username),
        password,
        easyPin,
        smsPriority,
        deviceInfoLogin,
        versionScope,
      },
      isLockedDevice,
      dispatch,
    )
      .then(res => {
        const userId = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.id',
          '',
        );
        if (!password && !easyPin) {
          dispatch(actionCreators.updateLastLogin('fingerprint'));
          set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'fingerprint').catch(err => {
            Toast.show(
              getErrorMessage(
                err,
                language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
              ),
              Toast.LONG,
            );
          });
          tracker.trackEvent('LOGIN_FINGERPRINT_SUCCESS', 'ONBOARDING', null, {
            ID: userId,
          });
        } else {
          dispatch(actionCreators.clearLastLogin());
          set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'easypin').catch(err => {
            Toast.show(
              getErrorMessage(
                err,
                language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
              ),
              Toast.LONG,
            );
          });
        }
        const userMember = result(res, 'data.customerSegment', '');
        dispatch(actionCreators.saveUserMemberData(userMember));
        const serverTime = moment(
          result(res, 'data.serverTime', '').toString(),
        );
        const appTime = new Date();
        const diff = moment(appTime, 'DD/MM/YYYY').diff(
          moment(serverTime, 'DD/MM/YYYY'),
        );
        const gapTime = Math.round(moment.duration(diff).asSeconds());
        const userApiKey = result(res.data, 'userApiKey', '');
        const faceRegistered = result(res.data, 'isFaceRegister', false);
        const privateOffers = result(res.data, 'privateOffers', []);
        dispatch(actionCreators.savePrivateOffers(privateOffers));
        dispatch(
          actionCreators.isFaceRegisteredUpdate({
            isFaceRegistered: faceRegistered,
          }),
        );
        const defaultValueAccount = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.accountList',
          {},
        );
        const getdefaultAccount = find(defaultValueAccount, {
          accountType: 'emoneyAccount',
        });
        set(
          storageKeys.ACCOUNT_DATA_DEFAULT,
          middlewareUtils.getAccountDefaultEmoney(getdefaultAccount),
        );
        set(storageKeys.IS_FACE_REGISTERED, {
          isFaceRegistered: faceRegistered,
        }).catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
            ),
            Toast.LONG,
          );
        });
        const stateReduc = getState();
        const tooglePushLoginID = result(
          stateReduc,
          'config.flag.flagPushNotifCifCode',
          'INACTIVE',
        );
        const loginPushwooshID =
          tooglePushLoginID === 'ACTIVE'
            ? result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
                '',
              )
            : result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.loginName',
                '',
              ).toLowerCase();
        const loginSetTagID = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.title',
          '',
        ).toLowerCase();
        const checkCif = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
          '',
        );
        Dynatrace.identifyUser(checkCif);
        const isAutoSave = result(res, 'data.isAutoSave', []);
        const transfer = result(isAutoSave, 'transfer', false);
        const billPay = result(isAutoSave, 'billPay', false);
        const isSaving = result(isAutoSave, 'isSaving', false);
        const DigitalStore = result(isAutoSave, 'DigitalStore', false);
        const QR = result(isAutoSave, 'QR', false);
        dispatch(
          actionCreators.saveAutoSave({
            transfer: transfer,
            billPay: billPay,
            isSaving: isSaving,
            DigitalStore: DigitalStore,
            QR: QR,
          }),
        );
        dispatch(actionCreators.saveUserApiKey(userApiKey));
        dispatch(actionCreators.setGapTimeServer(gapTime));
        dispatch(
          actionCreators.saveTransRefNum(result(res, 'data.transRefNum', '')),
        );
        if (regisATM) {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.attributeMap.iPassport'),
            }),
          );
        } else {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.ipassport'),
            }),
          );
          assembleDataForDashboard(dispatch, res);
        }

        dispatch(populateConfigCacheEFormData());

        dispatch(actionCreators.hideSpinner());
        dispatch(change('loginWithUsernamePassword', 'password', ''));
        tracker.setUser(
          String(result(getState(), 'user.profile.customer.id', deviceInfo.id)),
        );
        const isDemoAccount = /^DEMO-/.test(
          result(res, 'data.ipassport', undefined),
        );
        if ((isLockedDevice || isDemoAccount) && !isResetEasypin) {
          dispatch(registerPushId(loginPushwooshID, loginSetTagID));
          if (tokenId) {
            dispatch(actionCreators.savePositionDeeplink('yes'));
            if (faceRegistered) {
              dispatch(
                StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({routeName: 'Landing'})],
                }),
              );
              if (tokenPaymentNkyc) {
                // dispatch(StackActions.reset({
                //   index: 1,
                //   actions: [
                //     NavigationActions.navigate({routeName: 'Landing'}),
                //     NavigationActions.navigate({routeName: 'EmoneyUpgradeBenefit'}),
                //   ]
                // }));
                dispatch(gotoYouOweDetailDeepLink(tokenId));
              } else if (tokenPaymentSplitBillKyc) {
                dispatch(gotoYouOweDetailDeepLink(tokenId));
              } else if (tokenPaymentFundtrfSplitBill) {
                dispatch(gotoYouBillDetailDeeplink(tokenId));
              } else if (tokenPaymentRejectSplitBill) {
                dispatch(gotoYouBillDetailDeeplink(tokenId));
              } else if (tokenPaymentRejectNKYC) {
                dispatch(gotoYouBillDetailDeeplink(tokenId));
              } else {
                dispatch(tokenPaymentDeeplink(tokenId));
              }
            } else {
              if (tokenPaymentNkyc) {
                const skipFunction = () =>
                  dispatch(gotoYouOweDetailDeepLink(tokenId));
                dispatch(
                  checkCameraPermissionAndNavigate(
                    'CameraPage',
                    {action: 'RegisterLockdown'},
                    true,
                    skipFunction,
                  ),
                );
              } else if (tokenPaymentSplitBillKyc) {
                const skipFunction = () =>
                  dispatch(gotoYouOweDetailDeepLink(tokenId));
                dispatch(
                  checkCameraPermissionAndNavigate(
                    'CameraPage',
                    {action: 'RegisterLockdown'},
                    true,
                    skipFunction,
                  ),
                );
              } else if (tokenPaymentFundtrfSplitBill) {
                const skipFunction = () =>
                  dispatch(gotoYouBillDetailDeeplink(tokenId));
                dispatch(
                  checkCameraPermissionAndNavigate(
                    'CameraPage',
                    {action: 'RegisterLockdown'},
                    true,
                    skipFunction,
                  ),
                );
              } else if (tokenPaymentRejectSplitBill) {
                const skipFunction = () =>
                  dispatch(gotoYouBillDetailDeeplink(tokenId));
                dispatch(
                  checkCameraPermissionAndNavigate(
                    'CameraPage',
                    {action: 'RegisterLockdown'},
                    true,
                    skipFunction,
                  ),
                );
              } else if (tokenPaymentRejectNKYC) {
                const skipFunction = () =>
                  dispatch(gotoYouBillDetailDeeplink(tokenId));
                dispatch(
                  checkCameraPermissionAndNavigate(
                    'CameraPage',
                    {action: 'RegisterLockdown'},
                    true,
                    skipFunction,
                  ),
                );
              } else {
                const skipFunction = () =>
                  dispatch(tokenPaymentDeeplink(tokenId));
                dispatch(
                  checkCameraPermissionAndNavigate(
                    'CameraPage',
                    {action: 'RegisterLockdown'},
                    true,
                    skipFunction,
                  ),
                );
              }
            }
          } else {
            if (faceRegistered) {
              dispatch(setupGenericDeepLink(isOrami));
            } else {
              const skipFunction = () =>
                dispatch(setupGenericDeepLink(isOrami));
              dispatch(
                checkCameraPermissionAndNavigate(
                  'CameraPage',
                  {action: 'RegisterLockdown'},
                  true,
                  skipFunction,
                ),
              );
            }
          }
        } else {
          const mobileNumber = result(
            res,
            'data.ipassportData.ipassDataClient.profileScope.userLogin.mobileNumberMasking',
            '',
          );
          const mobileNumberATM = result(
            res,
            'data.attributeMap.mobileNumberMasking',
            '',
          );
          const payload = JSON.parse(result(res, 'config.data', '{}'));
          if (mobileNumber || mobileNumberATM) {
            if (loginATM) {
              const params = {
                maskedUsername: obfuscateUsername(username),
                isResetEasypin,
              };
              dispatch(resetToLandingAndNavigate('EasyPin', params));
            } else {
              const params = {
                isEasyPinSet: res.data.isEasyPinSet,
                maskedUsername: obfuscateUsername(username),
                disableEasyPinLogin: true,
                TXID: payload.TXID,
                isResetEasypin,
                regisATM,
                newUserMobile: mobileNumberATM,
              };
              dispatch(registerPushId(loginPushwooshID, loginSetTagID));
              dispatch(resetToLandingAndNavigate('OTP', params));
            }
          } else {
            Alert.alert(
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TITLE,
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TEXT,
              [
                {
                  text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                  onPress: () => {
                    dispatch(
                      NavigationActions.navigate({routeName: 'Onboarding'}),
                    );
                  },
                },
              ],
            );
          }
        }
      })
      .catch(err => {
        if (password === '' && easyPin === '') {
          tracker.trackEvent(
            'LOGIN_FINGERPRINT_FAILED',
            'ONBOARDING',
            null,
            {},
          );
        }
        dispatch(actionCreators.hideSpinner());
        isLockedDevice || isUserRegistered
          ? dispatch(change('loginWithUsernamePassword', 'password', ''))
          : dispatch(reset('loginWithUsernamePassword'));
        dispatch(reset('loginEasyPinForm'));
        const errorCode = result(err, 'data.responseCode', '');
        if (errorCode === '05') {
          // Dormant IB user
          Alert.alert(
            language.ONBOARDING__DORMANT_TITLE,
            language.ONBOARDING__DORMANT_TEXT,
            [
              {
                text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                onPress: () => {
                  dispatch(clearAndResetPasswordBurgerMenuNoAlert());
                },
              },
            ],
          );
          return;
        }
        const status = result(err, 'status', 400);
        if (status === 429) {
          Toast.show(
            getErrorMessage(err, language.COMMON__TIMEOUT_TITLE1_F5),
            Toast.LONG,
          );
        } else {
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOG_IN),
            Toast.LONG,
          );
          dispatch(destroy('loginEasyPinFormAccount'));
        }
      });
  };
}

export function checkLogin(idBiller, typeActivation, params = '') {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    getInitKeys()
      .then(res => {
        const referralCodeTransform = transformTokenIos(idBiller);
        const isLogin = !isEmpty(result(getState(), 'user', {}));
        if (typeActivation === '011') {
          if (referralCodeTransform === 'ORAMI') {
            dispatch(actionCreators.saveCcCode('CCO-SIMOBI-002'));
          } else if (referralCodeTransform === 'ALFA') {
            dispatch(actionCreators.saveCcCode('CCA-SIMOBI-002'));
          } else {
            dispatch(actionCreators.saveCcCode('CCI-SIMOBI-002'));
          }
        }

        setTimeout(() => {
          dispatch(actionCreators.hideSpinner());
          const state = getState();
          const arrayLength = Boolean(
            state.appInitKeys &&
              state.appInitKeys.username &&
              state.appInitKeys.tokenClient &&
              state.appInitKeys.tokenServer,
          );
          const referralCodeTransform = transformTokenIos(idBiller);
          if (typeActivation === '011') {
            if (referralCodeTransform === 'ORAMI') {
              dispatch(actionCreators.saveCcCode('CCO-SIMOBI-002'));
            } else if (referralCodeTransform === 'ALFA') {
              dispatch(actionCreators.saveCcCode('CCA-SIMOBI-002'));
            } else {
              dispatch(actionCreators.saveCcCode('CCI-SIMOBI-002'));
            }
          }
          if (params !== '') {
            const firstParams = getFirstParams(params);
            const paramsLink = getPAramslink(params);
            dispatch(
              actionCreators.saveParamsLink([...paramsLink, ...firstParams]),
            );
          }
          if (arrayLength) {
            if (typeActivation === 'tokenPayment') {
              if (isLogin) {
                dispatch(tokenPaymentDeeplink(referralCodeTransform));
              } else {
                dispatch(NavigationActions.navigate({routeName: 'Home'}));
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'EmallLogin',
                    params: {
                      tokenPayment: true,
                      tokenId: referralCodeTransform,
                    },
                  }),
                );
              }
            } else if (typeActivation === 'splitBill') {
              if (isLogin) {
                dispatch(gotoYouOweDetailDeepLink(referralCodeTransform));
              } else {
                dispatch(NavigationActions.navigate({routeName: 'Home'}));
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'EmallLogin',
                    params: {
                      tokenId: referralCodeTransform,
                      tokenPaymentSplitBillKyc: true,
                    },
                  }),
                );
              }
            } else if (typeActivation === 'splitBill-NKYC') {
              if (isLogin) {
                dispatch(actionCreators.hideSpinner());
                // dispatch(gotoYouBillDetailDeeplink(referralCodeTransform));
                dispatch(gotoYouOweDetailDeepLink(referralCodeTransform));
              } else {
                dispatch(NavigationActions.navigate({routeName: 'Home'}));
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'EmallLogin',
                    params: {
                      tokenId: referralCodeTransform,
                      tokenPaymentNkyc: true,
                    },
                  }),
                );
              }
            } else if (typeActivation === 'fundTransfer-SplitBill') {
              if (isLogin) {
                dispatch(gotoYouBillDetailDeeplink(referralCodeTransform));
              } else {
                dispatch(NavigationActions.navigate({routeName: 'Home'}));
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'EmallLogin',
                    params: {
                      tokenId: referralCodeTransform,
                      tokenPaymentFundtrfSplitBill: true,
                    },
                  }),
                );
              }
            } else if (typeActivation === 'rejectSplitBill') {
              if (isLogin) {
                dispatch(gotoYouBillDetailDeeplink(referralCodeTransform));
              } else {
                dispatch(NavigationActions.navigate({routeName: 'Home'}));
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'EmallLogin',
                    params: {
                      tokenId: referralCodeTransform,
                      tokenPaymentRejectSplitBill: true,
                    },
                  }),
                );
                // dispatch(StackActions.reset({
                //   index: 0,
                //   actions: [
                //       // NavigationActions.navigate({routeName: 'TransferScreenBill'}),
                //     NavigationActions.navigate({routeName: 'EmallLogin', params: {tokenId: referralCodeTransform, tokenPaymentRejectSplitBill: true}}),
                //   ]
                // }));
              }
            } else if (typeActivation === 'rejectSplitBill-NKYC') {
              if (isLogin) {
                dispatch(gotoYouBillDetailDeeplink(referralCodeTransform));
              } else {
                dispatch(NavigationActions.navigate({routeName: 'Home'}));
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'EmallLogin',
                    params: {
                      tokenId: referralCodeTransform,
                      tokenPaymentRejectNKYC: true,
                    },
                  }),
                );
              }
            } else {
              dispatch(
                NavigationActions.navigate({
                  routeName: 'EmallLogin',
                  params: {biller: true, typeActivation},
                }),
              );
              dispatch(actionCreators.savebillerCodeDeepLink(idBiller));
              if (typeActivation === '011') {
                dispatch(
                  actionCreators.saveCoupon({
                    referralCodeCC: referralCodeTransform,
                  }),
                );
              }
            }
          } else {
            if (typeActivation === '011') {
              dispatch(
                NavigationActions.navigate({
                  routeName: 'IndigoTnC',
                  params: {referralCodeOrami: referralCodeTransform},
                }),
              );
            } else {
              Toast.show(getErrorMessage(res, 'must login first'), Toast.LONG);
            }
          }
        }, 5000);
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__GET_DATA));
      });
  };
}

export function checkLoginBiller() {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    getInitKeys()
      .then(() => {
        setTimeout(() => {
          dispatch(actionCreators.hideSpinner());
          const state = getState();
          const arrayLength = Boolean(
            state.appInitKeys &&
              state.appInitKeys.username &&
              state.appInitKeys.tokenClient &&
              state.appInitKeys.tokenServer,
          );
          // const referralCodeTransform = transformTokenIos(idBiller);
          if (arrayLength) {
            dispatch(shouldGiveChecklist());
          }
        }, 5000);
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__GET_DATA));
      });
  };
}

export function prepareGoBiller(isOrami) {
  return (dispatch, getState) => {
    const state = getState();
    const deepLinkbillerCode = result(state, 'deepLinkbillerCode', '');
    const populateBiller = result(state, 'billerConfig.billerList', []);
    const targetBiller = find(populateBiller, function (o) {
      return o.billerPreferences.code === deepLinkbillerCode;
    });
    const accountList = result(state, 'accounts', []);
    const navigationKeys = result(
      getState(),
      'promos.navigateOnPushClicked',
      false,
    );
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    dispatch(destroy('loginWithUsernamePassword'));
    dispatch(destroy('loginAccountForm'));
    dispatch(destroy('easyPinCreationForm'));
    dispatch(destroy('easyPinCreationConfirmForm'));
    dispatch(destroy('ActivationForm'));
    dispatch(initStoreWithTransactionDetails());
    if (startsWith(cifCode, 'NK')) {
      dispatch(NavigationActions.navigate({routeName: 'MainEmoney'}));
      if (isOrami === '011') {
        dispatch(NavigationActions.navigate({routeName: 'IndigoTnC'}));
      } else {
        dispatch(genericBillerNavigate(dispatch, targetBiller));
      }
    } else {
      if (
        accountList.length === 1 &&
        find(accountList, {accountType: 'emoneyAccount'})
      ) {
        dispatch(NavigationActions.navigate({routeName: 'MainEmoney'}));
        if (isOrami === '011') {
          dispatch(NavigationActions.navigate({routeName: 'IndigoTnC'}));
        } else {
          dispatch(genericBillerNavigate(dispatch, targetBiller));
        }
      } else {
        dispatch(NavigationActions.navigate({routeName: 'Main'}));
        if (isOrami === '011') {
          dispatch(NavigationActions.navigate({routeName: 'IndigoTnC'}));
        } else {
          dispatch(genericBillerNavigate(dispatch, targetBiller));
        }
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

export function checkLoginAllsegmentFlow(
  typeLockdown,
  pathRouteRaw,
  typeActivation = '',
  typeUtm = '',
  typeCode = '',
  typereferralCode = '',
) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    // const stringEvent = 'PRM_CLK_' + typeUtm + '_PM_' + typereferralCode + '_PD_' + typeCode + '_ACT_' + typeActivation;
    if (typeCode === 'CCO') {
      dispatch(actionCreators.saveCcCode('CCO-SIMOBI-002'));
      // Analytics.logEvent(stringEvent);
    } else if (typeCode === 'CCA') {
      dispatch(actionCreators.saveCcCode('CCA-SIMOBI-002'));
      // Analytics.logEvent(stringEvent);
    } else if (typeCode === 'CCI') {
      dispatch(actionCreators.saveCcCode('CCI-SIMOBI-002'));
      // Analytics.logEvent(stringEvent);
    } else if (typeCode === 'CCP') {
      dispatch(actionCreators.saveCcCode('CCP-SIMOBI-002'));
      // Analytics.logEvent(stringEvent);
    } else if (typeCode === 'CCT') {
      dispatch(actionCreators.saveCcCode('CCT-SIMOBI-002'));
      // Analytics.logEvent(stringEvent);
    } else if (typeCode === 'SAO') {
      dispatch(actionCreators.saveCcCode('SAO-SIMOBI-002'));
      // Analytics.logEvent(stringEvent);
    } else if (typeCode === 'SAT') {
      dispatch(actionCreators.saveCcCode('SA-T-SIMOBI-002'));
      // Analytics.logEvent(stringEvent);
    } else if (typeCode === 'SAA') {
      dispatch(actionCreators.saveCcCode('SAA-SIMOBI-002'));
      // Analytics.logEvent(stringEvent);
    } else if (typeCode === 'SAG') {
      dispatch(actionCreators.saveCcCode('SAG-SIMOBI-002'));
      // Analytics.logEvent(stringEvent);
    } else if (typeCode === 'SAD') {
      dispatch(actionCreators.saveCcCode('SAD-SIMOBI-002'));
      // Analytics.logEvent(stringEvent);
    } else {
      // Analytics.logEvent(stringEvent);
    }
    dispatch(
      actionCreators.saveUtmAndRefferralData({
        referralCode: typereferralCode,
        utm: typeUtm,
        codeProduct: typeCode,
        typeActivation,
      }),
    );
    getInitKeys()
      .then(res => {
        setTimeout(() => {
          dispatch(actionCreators.hideSpinner());
          const state = getState();
          const pathRoute = transformTokenIos(pathRouteRaw);
          const arrayLength = Boolean(
            state.appInitKeys &&
              state.appInitKeys.username &&
              state.appInitKeys.tokenClient &&
              state.appInitKeys.tokenServer,
          );
          // typeLocdown 1(strict/must login) or 2(in front)
          if (typeLockdown === '1') {
            if (arrayLength) {
              dispatch(
                NavigationActions.navigate({
                  routeName: 'EmallLogin',
                  params: {allSegment: true, pathRoute},
                }),
              );
            } else {
              Toast.show(getErrorMessage(res, 'must login first'), Toast.LONG);
            }
          } else if (typeLockdown === '2') {
            if (arrayLength) {
              dispatch(
                NavigationActions.navigate({
                  routeName: 'EmallLogin',
                  params: {allSegment: true, pathRoute},
                }),
              );
            } else {
              dispatch(NavigationActions.navigate({routeName: pathRoute}));
            }
          } else {
            dispatch(NavigationActions.navigate({routeName: pathRoute}));
          }
        }, 5000);
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__GET_DATA));
      });
  };
}

export function loginAllsegment(
  {username, password, easyPin},
  isLockedDevice,
  pathRoute,
  isResetEasypin = false,
  regisATM = false,
  loginATM = false,
  isUserRegistered = false,
) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    dispatch(populateBanners());
    const smsPriority = Boolean(
      result(getState(), 'config.smsPriority.login', false),
    );
    const randomNumber = randomString(16);
    OBM_EncryptPassword(password ? password : easyPin, randomNumber);

    if (easyPin) {
      easyPin =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    } else {
      password =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    }
    const deviceInfoLogin = {
      name: deviceInfo.name,
      model: deviceInfo.model,
    };
    const version = split(VersionNumber.appVersion, '.');
    const versionScope = version[0] + ',' + version[1];
    const loginAPI = api.loginNew;
    return loginAPI(
      {
        username: normalisePhoneNumber(username),
        password,
        easyPin,
        smsPriority,
        deviceInfoLogin,
        versionScope,
      },
      isLockedDevice,
      dispatch,
    )
      .then(res => {
        const userId = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.id',
          '',
        );
        if (!password && !easyPin) {
          dispatch(actionCreators.updateLastLogin('fingerprint'));
          set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'fingerprint').catch(err => {
            Toast.show(
              getErrorMessage(
                err,
                language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
              ),
              Toast.LONG,
            );
          });
          tracker.trackEvent('LOGIN_FINGERPRINT_SUCCESS', 'ONBOARDING', null, {
            ID: userId,
          });
        } else {
          dispatch(actionCreators.clearLastLogin());
          set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'easypin').catch(err => {
            Toast.show(
              getErrorMessage(
                err,
                language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
              ),
              Toast.LONG,
            );
          });
        }
        const userMember = result(res, 'data.customerSegment', '');
        dispatch(actionCreators.saveUserMemberData(userMember));
        const serverTime = moment(
          result(res, 'data.serverTime', '').toString(),
        );
        const appTime = new Date();
        const diff = moment(appTime, 'DD/MM/YYYY').diff(
          moment(serverTime, 'DD/MM/YYYY'),
        );
        const gapTime = Math.round(moment.duration(diff).asSeconds());
        const userApiKey = result(res.data, 'userApiKey', '');
        const faceRegistered = result(res.data, 'isFaceRegister', false);
        const defaultValueAccount = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.accountList',
          {},
        );
        const getdefaultAccount = find(defaultValueAccount, {
          accountType: 'emoneyAccount',
        });
        set(
          storageKeys.ACCOUNT_DATA_DEFAULT,
          middlewareUtils.getAccountDefaultEmoney(getdefaultAccount),
        );
        const privateOffers = result(res.data, 'privateOffers', []);
        dispatch(actionCreators.savePrivateOffers(privateOffers));
        dispatch(
          actionCreators.isFaceRegisteredUpdate({
            isFaceRegistered: faceRegistered,
          }),
        );
        set(storageKeys.IS_FACE_REGISTERED, {
          isFaceRegistered: faceRegistered,
        }).catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
            ),
            Toast.LONG,
          );
        });
        const stateReduc = getState();
        const tooglePushLoginID = result(
          stateReduc,
          'config.flag.flagPushNotifCifCode',
          'INACTIVE',
        );
        const loginPushwooshID =
          tooglePushLoginID === 'ACTIVE'
            ? result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
                '',
              )
            : result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.loginName',
                '',
              ).toLowerCase();
        const loginSetTagID = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.title',
          '',
        ).toLowerCase();
        const checkCif = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
          '',
        );
        Dynatrace.identifyUser(checkCif);
        const isAutoSave = result(res, 'data.isAutoSave', []);
        const transfer = result(isAutoSave, 'transfer', false);
        const billPay = result(isAutoSave, 'billPay', false);
        const isSaving = result(isAutoSave, 'isSaving', false);
        const DigitalStore = result(isAutoSave, 'DigitalStore', false);
        const QR = result(isAutoSave, 'QR', false);
        dispatch(
          actionCreators.saveAutoSave({
            transfer: transfer,
            billPay: billPay,
            isSaving: isSaving,
            DigitalStore: DigitalStore,
            QR: QR,
          }),
        );
        dispatch(actionCreators.saveUserApiKey(userApiKey));
        dispatch(actionCreators.setGapTimeServer(gapTime));
        dispatch(
          actionCreators.saveTransRefNum(result(res, 'data.transRefNum', '')),
        );
        if (regisATM) {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.attributeMap.iPassport'),
            }),
          );
        } else {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.ipassport'),
            }),
          );
          assembleDataForDashboard(dispatch, res);
        }

        dispatch(populateConfigCacheEFormData());

        dispatch(actionCreators.hideSpinner());
        dispatch(change('loginWithUsernamePassword', 'password', ''));
        tracker.setUser(
          String(result(getState(), 'user.profile.customer.id', deviceInfo.id)),
        );
        const isDemoAccount = /^DEMO-/.test(
          result(res, 'data.ipassport', undefined),
        );
        if ((isLockedDevice || isDemoAccount) && !isResetEasypin) {
          dispatch(registerPushId(loginPushwooshID, loginSetTagID));
          if (faceRegistered) {
            dispatch(setupGenericAllsegment(pathRoute));
          } else {
            const skipFunction = () =>
              dispatch(setupGenericAllsegment(pathRoute));
            dispatch(
              checkCameraPermissionAndNavigate(
                'CameraPage',
                {action: 'RegisterLockdown'},
                true,
                skipFunction,
              ),
            );
          }
        } else {
          const mobileNumber = result(
            res,
            'data.ipassportData.ipassDataClient.profileScope.userLogin.mobileNumberMasking',
            '',
          );
          const mobileNumberATM = result(
            res,
            'data.attributeMap.mobileNumberMasking',
            '',
          );
          const payload = JSON.parse(result(res, 'config.data', '{}'));
          if (mobileNumber || mobileNumberATM) {
            if (loginATM) {
              const params = {
                maskedUsername: obfuscateUsername(username),
                isResetEasypin,
              };
              dispatch(resetToLandingAndNavigate('EasyPin', params));
            } else {
              const params = {
                isEasyPinSet: res.data.isEasyPinSet,
                maskedUsername: obfuscateUsername(username),
                disableEasyPinLogin: true,
                TXID: payload.TXID,
                isResetEasypin,
                regisATM,
                newUserMobile: mobileNumberATM,
              };
              dispatch(registerPushId(loginPushwooshID, loginSetTagID));
              dispatch(resetToLandingAndNavigate('OTP', params));
            }
          } else {
            Alert.alert(
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TITLE,
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TEXT,
              [
                {
                  text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                  onPress: () => {
                    dispatch(
                      NavigationActions.navigate({routeName: 'Onboarding'}),
                    );
                  },
                },
              ],
            );
          }
        }
      })
      .catch(err => {
        if (password === '' && easyPin === '') {
          tracker.trackEvent(
            'LOGIN_FINGERPRINT_FAILED',
            'ONBOARDING',
            null,
            {},
          );
        }
        dispatch(actionCreators.hideSpinner());
        isLockedDevice || isUserRegistered
          ? dispatch(change('loginWithUsernamePassword', 'password', ''))
          : dispatch(reset('loginWithUsernamePassword'));
        dispatch(reset('loginEasyPinForm'));
        const errorCode = result(err, 'data.responseCode', '');
        if (errorCode === '05') {
          // Dormant IB user
          Alert.alert(
            language.ONBOARDING__DORMANT_TITLE,
            language.ONBOARDING__DORMANT_TEXT,
            [
              {
                text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                onPress: () => {
                  dispatch(clearAndResetPasswordBurgerMenuNoAlert());
                },
              },
            ],
          );
          return;
        }
        const status = result(err, 'status', 400);
        if (status === 429) {
          Toast.show(
            getErrorMessage(err, language.COMMON__TIMEOUT_TITLE1_F5),
            Toast.LONG,
          );
        } else {
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOG_IN),
            Toast.LONG,
          );
          dispatch(destroy('loginEasyPinFormAccount'));
        }
      });
  };
}

export function prepareGoBillerVoucher(homeDisable = false) {
  return (dispatch, getState) => {
    const state = getState();
    const deepLinkbillerCode = result(state, 'deepLinkbillerCode', '');
    const populateBiller = result(state, 'billerConfig.billerList', []);
    const targetBiller = find(populateBiller, function (o) {
      return o.billerPreferences.code === deepLinkbillerCode;
    });
    const isShownBiller = result(
      targetBiller,
      'billerPreferences.isShown',
      false,
    );
    const isTargetExist = !!result(targetBiller, 'billerPreferences.code', '');
    const accountList = result(state, 'accounts', []);
    const navigationKeys = result(
      getState(),
      'promos.navigateOnPushClicked',
      false,
    );
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    if (startsWith(cifCode, 'NK') && !homeDisable) {
      if (deepLinkbillerCode === '990003') {
        return get(storageKeys.FEEDBACK_CHECKLIST).then(storedFeedBack => {
          if (storedFeedBack) {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({routeName: 'AccountMenu'}),
                ],
              }),
            );
            dispatch(NavigationActions.navigate({routeName: 'Home'}));
            dispatch(NavigationActions.navigate({routeName: 'AlfacartTnc'}));
          } else {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({routeName: 'AccountMenu'}),
                ],
              }),
            );
            dispatch(NavigationActions.navigate({routeName: 'Home'}));
            dispatch(listCategoryProductAlfacart());
          }
        });
      } else {
        if (isTargetExist && isShownBiller) {
          dispatch(genericBillerNavigate(dispatch, targetBiller));
        } else {
          dispatch(
            StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'AccountMenu'})],
            }),
          );
          dispatch(NavigationActions.navigate({routeName: 'Home'}));
        }
      }
    } else {
      if (
        accountList.length === 1 &&
        find(accountList, {accountType: 'emoneyAccount'}) &&
        !homeDisable
      ) {
        if (deepLinkbillerCode === '990003') {
          return get(storageKeys.FEEDBACK_CHECKLIST).then(storedFeedBack => {
            if (storedFeedBack) {
              dispatch(
                StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({routeName: 'AccountMenu'}),
                  ],
                }),
              );
              dispatch(NavigationActions.navigate({routeName: 'Home'}));
              dispatch(NavigationActions.navigate({routeName: 'AlfacartTnc'}));
            } else {
              dispatch(
                StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({routeName: 'AccountMenu'}),
                  ],
                }),
              );
              dispatch(NavigationActions.navigate({routeName: 'Home'}));
              dispatch(listCategoryProductAlfacart());
            }
          });
        } else {
          if (isTargetExist && isShownBiller) {
            dispatch(genericBillerNavigate(dispatch, targetBiller));
          } else {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({routeName: 'AccountMenu'}),
                ],
              }),
            );
            dispatch(NavigationActions.navigate({routeName: 'Home'}));
          }
        }
      } else {
        if (deepLinkbillerCode === '990003') {
          return get(storageKeys.FEEDBACK_CHECKLIST).then(storedFeedBack => {
            if (storedFeedBack === true) {
              dispatch(
                StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({routeName: 'AccountMenu'}),
                  ],
                }),
              );
              dispatch(NavigationActions.navigate({routeName: 'Home'}));
              dispatch(NavigationActions.navigate({routeName: 'AlfacartTnc'}));
            } else {
              dispatch(
                StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({routeName: 'AccountMenu'}),
                  ],
                }),
              );
              dispatch(NavigationActions.navigate({routeName: 'Home'}));
              dispatch(listCategoryProductAlfacart());
            }
          });
        } else {
          if (homeDisable) {
            if (isTargetExist && isShownBiller) {
              dispatch(genericBillerNavigate(dispatch, targetBiller));
            } else {
              dispatch(NavigationActions.navigate({routeName: 'Home'}));
            }
          } else {
            if (isTargetExist && isShownBiller) {
              dispatch(genericBillerNavigate(dispatch, targetBiller));
            } else {
              dispatch(
                StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({routeName: 'AccountMenu'}),
                  ],
                }),
              );
              dispatch(NavigationActions.navigate({routeName: 'Home'}));
            }
          }
        }
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

export function checkLoginCC(
  tokenEmail,
  typeActivation,
  referralCode,
  ccCodereform,
) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    getInitKeys()
      .then(res => {
        setTimeout(() => {
          dispatch(actionCreators.hideSpinner());
          const state = getState();
          const arrayLength = Boolean(
            state.appInitKeys &&
              state.appInitKeys.username &&
              state.appInitKeys.tokenClient &&
              state.appInitKeys.tokenServer,
          );
          const ccCode = transformTokenIos(ccCodereform);
          if (typeActivation === '011') {
            dispatch(actionCreators.saveCcCode(ccCode));
          }
          if (arrayLength) {
            dispatch(
              NavigationActions.navigate({
                routeName: 'EmallLogin',
                params: {biller: true, typeActivation},
              }),
            );
            if (typeActivation === '011') {
              dispatch(
                actionCreators.saveCoupon({
                  referralCodeCC: referralCode,
                  utmSource: tokenEmail,
                }),
              );
            }
          } else {
            if (typeActivation === '011') {
              dispatch(
                NavigationActions.navigate({
                  routeName: 'IndigoTnC',
                  params: {referralCodeOrami: referralCode},
                }),
              );
              dispatch(
                actionCreators.saveCoupon({
                  referralCodeCC: referralCode,
                  utmSource: tokenEmail,
                }),
              );
            } else {
              Toast.show(getErrorMessage(res, 'must login first'), Toast.LONG);
            }
          }
        }, 5000);
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__GET_DATA));
      });
  };
}

export function setLoginStorage(digitalTrx) {
  return dispatch => {
    set(storageKeys.OFFLINEGENERATECODE, {data: digitalTrx});
    dispatch(actionCreators.saveCodeOnboard({data: digitalTrx}));
    return true;
  };
}

export function getGenerateCode() {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    offlineGenerateCode().then(resStorage => {
      dispatch(actionCreators.saveCodeOnboard(resStorage));
      const accountId = String(
        result(resStorage, 'data.accountOffline.0.accId', ''),
      );
      const payload = {accountId: accountId};
      return api
        .generateCode(payload, dispatch)
        .then(res => {
          dispatch(
            NavigationActions.navigate({
              routeName: 'GenerateCodeOffLine',
              params: {
                code: result(res, 'data.lowCode', ''),
                tipeCode: 'lowCode',
              },
            }),
          );
          dispatch(actionCreators.hideSpinner());
        })
        .catch(err => {
          Toast.show(getErrorMessage(err, 'Error load generate code data!'));
          dispatch(actionCreators.hideSpinner());
        });
    });
  };
}

export function getGenerateCodeII() {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    offlineGenerateCode().then(resStorage => {
      dispatch(actionCreators.saveCodeOnboard(resStorage));
      const accountId = String(
        result(resStorage, 'data.accountOffline.0.accId', ''),
      );
      const payload = {accountId: accountId};
      return api
        .generateCodeII(payload, dispatch)
        .then(res => {
          dispatch(
            NavigationActions.navigate({
              routeName: 'GenerateCodeOffLine',
              params: {
                code: result(res, 'data.fastCode', ''),
                tipeCode: 'lowCodeII',
              },
            }),
          );
          dispatch(actionCreators.hideSpinner());
        })
        .catch(err => {
          Toast.show(getErrorMessage(err, 'Error load generate code data!'));
          dispatch(actionCreators.hideSpinner());
        });
    });
  };
}

export function setOfflineStorage() {
  return dispatch =>
    offlineGenerateCode().then(resStorage => {
      dispatch(actionCreators.saveCodeOnboard(resStorage));
      return true;
    });
}

export function checkLoginForDeeplinkPromo(typeActivation) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
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
          const typeActivationTransform = transformTokenIos(typeActivation);
          dispatch(actionCreators.saveTypeActivationDeeplink(typeActivation));
          dispatch(actionCreators.hideSpinner());
          if (arrayLength) {
            if (typeActivationTransform === '020') {
              dispatch(
                NavigationActions.navigate({
                  routeName: 'GeneralLogin',
                  params: {typeActivationTransform},
                }),
              );
            }
          } else {
            if (typeActivationTransform === '020') {
              dispatch(
                StackActions.reset({
                  index: 1,
                  actions: [
                    NavigationActions.navigate({routeName: 'Login'}),
                    NavigationActions.navigate({routeName: 'OTP'}),
                  ],
                }),
              );
            }
          }
        }, 5000);
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__GET_DATA));
      });
  };
}

export function setEasyPinDeeplink(
  easyPinData,
  maskedUsername,
  typeActivation,
  isResetEasypin = false,
  isRegistDeeplink,
) {
  const {easyPinConfirm} = easyPinData;
  return (dispatch, getState) =>
    api
      .easyPinRegister(
        middlewareUtils.prepareEasyPinRegister(easyPinConfirm, isResetEasypin),
        dispatch,
      )
      .then(() =>
        set(storageKeys.USERNAME, maskedUsername)
          .then(() => {
            const params = {maskedUsername, isResetEasypin, isRegistDeeplink};
            const isFaceRegistered = result(
              getState(),
              'isFaceRegistered.isFaceRegistered',
              false,
            );
            const skipped = result(
              getState(),
              'isFaceRegistered.skipped',
              false,
            );
            if (isFaceRegistered || skipped || isRegistDeeplink) {
              dispatch(setupGenericDeeplinkPromo(typeActivation));
              dispatch(destroy('easyPinCreationForm'));
              dispatch(destroy('easyPinCreationConfirmForm'));
            } else {
              const skipFunction = () => {
                dispatch(setupGenericDeeplinkPromo(typeActivation));
                dispatch(destroy('easyPinCreationForm'));
                dispatch(destroy('easyPinCreationConfirmForm'));
              };
              dispatch(
                checkCameraPermissionAndNavigate(
                  'CameraPage',
                  {action: 'RegisterExisting', params},
                  true,
                  skipFunction,
                ),
              );
            }
          })
          .catch(err => {
            Toast.show(
              getErrorMessage(err, language.ERROR_MESSAGE__SET_LOGIN_ACCOUNT),
              Toast.LONG,
            );
            dispatch(destroy('loginWithUsernamePassword'));
          }),
      )
      .catch(err => {
        tracker.trackEvent('NON_FATAL_ERROR', 'SET EASYPIN FAILED', null, {
          label: `ERROR_MSG: ${JSON.stringify(err)}`,
        });
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__SET_EASYPIN_ERROR),
          Toast.LONG,
        );
      });
}

export function loginPromoDeeplink(
  {username, password, easyPin},
  isLockedDevice,
  typeActivation,
  isResetEasypin = false,
  regisATM = false,
  loginATM = false,
  isUserRegistered = false,
) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    dispatch(populateBanners());
    const smsPriority = Boolean(
      result(getState(), 'config.smsPriority.login', false),
    );
    const version = split(VersionNumber.appVersion, '.');
    const versionScope = version[0] + ',' + version[1];
    const loginAPI = api.loginNew;
    return loginAPI(
      {
        username: normalisePhoneNumber(username),
        password,
        easyPin,
        smsPriority,
        versionScope,
      },
      isLockedDevice,
      dispatch,
    )
      .then(res => {
        const userId = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.id',
          '',
        );
        if (!password && !easyPin) {
          dispatch(actionCreators.updateLastLogin('fingerprint'));
          set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'fingerprint').catch(err => {
            Toast.show(
              getErrorMessage(
                err,
                language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
              ),
              Toast.LONG,
            );
          });
          tracker.trackEvent('LOGIN_FINGERPRINT_SUCCESS', 'ONBOARDING', null, {
            ID: userId,
          });
        } else {
          dispatch(actionCreators.clearLastLogin());
          set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'easypin').catch(err => {
            Toast.show(
              getErrorMessage(
                err,
                language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
              ),
              Toast.LONG,
            );
          });
        }
        const userMember = result(res, 'data.customerSegment', '');
        dispatch(actionCreators.saveUserMemberData(userMember));
        const serverTime = moment(
          result(res, 'data.serverTime', '').toString(),
        );
        const appTime = new Date();
        const diff = moment(appTime, 'DD/MM/YYYY').diff(
          moment(serverTime, 'DD/MM/YYYY'),
        );
        const gapTime = Math.round(moment.duration(diff).asSeconds());
        const userApiKey = result(res.data, 'userApiKey', '');
        const faceRegistered = result(res.data, 'isFaceRegister', false);
        dispatch(
          actionCreators.isFaceRegisteredUpdate({
            isFaceRegistered: faceRegistered,
          }),
        );
        const defaultValueAccount = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.accountList',
          {},
        );
        const getdefaultAccount = find(defaultValueAccount, {
          accountType: 'emoneyAccount',
        });
        set(
          storageKeys.ACCOUNT_DATA_DEFAULT,
          middlewareUtils.getAccountDefaultEmoney(getdefaultAccount),
        );
        set(storageKeys.IS_FACE_REGISTERED, {
          isFaceRegistered: faceRegistered,
        }).catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
            ),
            Toast.LONG,
          );
        });
        const stateReduc = getState();
        const tooglePushLoginID = result(
          stateReduc,
          'config.flag.flagPushNotifCifCode',
          'INACTIVE',
        );
        const loginPushwooshID =
          tooglePushLoginID === 'ACTIVE'
            ? result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
                '',
              )
            : result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.loginName',
                '',
              ).toLowerCase();
        const loginSetTagID = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.title',
          '',
        ).toLowerCase();
        const checkCif = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
          '',
        );
        Dynatrace.identifyUser(checkCif);
        const isAutoSave = result(res, 'data.isAutoSave', []);
        const transfer = result(isAutoSave, 'transfer', false);
        const billPay = result(isAutoSave, 'billPay', false);
        const isSaving = result(isAutoSave, 'isSaving', false);
        const DigitalStore = result(isAutoSave, 'DigitalStore', false);
        const QR = result(isAutoSave, 'QR', false);
        dispatch(
          actionCreators.saveAutoSave({
            transfer: transfer,
            billPay: billPay,
            isSaving: isSaving,
            DigitalStore: DigitalStore,
            QR: QR,
          }),
        );
        dispatch(actionCreators.saveUserApiKey(userApiKey));
        dispatch(actionCreators.setGapTimeServer(gapTime));
        dispatch(
          actionCreators.saveTransRefNum(result(res, 'data.transRefNum', '')),
        );
        if (regisATM) {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.attributeMap.iPassport'),
            }),
          );
        } else {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.ipassport'),
            }),
          );
          assembleDataForDashboard(dispatch, res);
        }

        dispatch(populateConfigCacheEFormData());

        dispatch(actionCreators.hideSpinner());
        dispatch(change('loginWithUsernamePassword', 'password', ''));
        tracker.setUser(
          String(result(getState(), 'user.profile.customer.id', deviceInfo.id)),
        );
        const isDemoAccount = /^DEMO-/.test(
          result(res, 'data.ipassport', undefined),
        );
        if ((isLockedDevice || isDemoAccount) && !isResetEasypin) {
          dispatch(registerPushId(loginPushwooshID, loginSetTagID));
          if (faceRegistered) {
            dispatch(setupGenericDeeplinkPromo(typeActivation));
          } else {
            const skipFunction = () =>
              dispatch(setupGenericDeeplinkPromo(typeActivation));
            dispatch(
              checkCameraPermissionAndNavigate(
                'CameraPage',
                {action: 'RegisterLockdown'},
                true,
                skipFunction,
              ),
            );
          }
        } else {
          const mobileNumber = result(
            res,
            'data.ipassportData.ipassDataClient.profileScope.userLogin.mobileNumberMasking',
            '',
          );
          const mobileNumberATM = result(
            res,
            'data.attributeMap.mobileNumberMasking',
            '',
          );
          const payload = JSON.parse(result(res, 'config.data', '{}'));
          if (mobileNumber || mobileNumberATM) {
            if (loginATM) {
              const params = {
                maskedUsername: obfuscateUsername(username),
                isResetEasypin,
              };
              dispatch(resetToLandingAndNavigate('EasyPin', params));
            } else {
              const params = {
                isEasyPinSet: res.data.isEasyPinSet,
                maskedUsername: obfuscateUsername(username),
                disableEasyPinLogin: true,
                TXID: payload.TXID,
                isResetEasypin,
                regisATM,
                newUserMobile: mobileNumberATM,
              };
              dispatch(registerPushId(loginPushwooshID, loginSetTagID));
              dispatch(resetToLandingAndNavigate('OTP', params));
            }
          } else {
            Alert.alert(
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TITLE,
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TEXT,
              [
                {
                  text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                  onPress: () => {
                    dispatch(
                      NavigationActions.navigate({routeName: 'Onboarding'}),
                    );
                  },
                },
              ],
            );
          }
        }
      })
      .catch(err => {
        if (password === '' && easyPin === '') {
          tracker.trackEvent(
            'LOGIN_FINGERPRINT_FAILED',
            'ONBOARDING',
            null,
            {},
          );
        }
        dispatch(actionCreators.hideSpinner());
        isLockedDevice || isUserRegistered
          ? dispatch(change('loginWithUsernamePassword', 'password', ''))
          : dispatch(reset('loginWithUsernamePassword'));
        dispatch(reset('loginEasyPinForm'));
        const errorCode = result(err, 'data.responseCode', '');
        if (errorCode === '05') {
          // Dormant IB user
          Alert.alert(
            language.ONBOARDING__DORMANT_TITLE,
            language.ONBOARDING__DORMANT_TEXT,
            [
              {
                text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                onPress: () => {
                  dispatch(clearAndResetPasswordBurgerMenuNoAlert());
                },
              },
            ],
          );
          return;
        }
        const status = result(err, 'status', 400);
        if (status === 429) {
          Toast.show(
            getErrorMessage(err, language.COMMON__TIMEOUT_TITLE1_F5),
            Toast.LONG,
          );
        } else {
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOG_IN),
            Toast.LONG,
          );
          dispatch(destroy('loginEasyPinFormAccount'));
        }
      });
  };
}

export function checkLoginSaving(
  referralCodeOrami,
  typeActivation,
  usernameOrami,
  emailUser,
  handphoneNumberRaw,
) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    setTimeout(() => {
      dispatch(actionCreators.hideSpinner());
      const phoneNumber = transformTokenIos(handphoneNumberRaw);
      if (typeActivation === '021') {
        dispatch(actionCreators.saveCcCode('SAO-SIMOBI-002'));
      }
      dispatch(
        actionCreators.saveParamsLinkSavingOrCC({
          phoneNumber,
          referralCodeOrami,
          usernameOrami,
          emailUser,
        }),
      );
      dispatch(NavigationActions.navigate({routeName: 'SavingTnC'}));
    }, 5000);
  };
}

export function checkLoginEmoney(tokenEmail, typeActivation) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    setTimeout(() => {
      dispatch(actionCreators.hideSpinner());
      dispatch(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'VerifyEmailEmoney',
              params: {tokenEmail, typeActivation},
            }),
          ],
        }),
      );
    }, 2000);
  };
}

export function logoutAndReleaseDevice() {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    Promise.all([clearLocalStorage(), dispatch(clearReducer())]).then(() => {
      dispatch(destroy('loginWithUsernamePassword'));
      dispatch(tokenInit())
        .then(() => dispatch(hsmInit()))
        .then(() => {
          dispatch(getLoginPreference());
          const newModalOptions = {
            heading1: language.ONBOARDING__CLEAR_DEVICE_SUCCESS,
            button1: language.ONBOARDING__OKAY,
            onButton1Press: hideAlert,
            onClose: hideAlert,
          };
          setTimeout(() => {
            dispatch(actionCreators.hideSpinner());
            dispatch(
              actionCreators.showSinarmasAlert({
                ...newModalOptions,
                image: 'CHECK',
              }),
            );
          }, 1000);
        })
        .catch(() => {
          dispatch(actionCreators.hideSpinner());
          Toast.show('Error clearing data', Toast.LONG);
        });
    });

    Pushwoosh.init({
      pw_appid: pushWooshAppConstants.applicationID,
      project_number: pushWooshAppConstants.FCMID,
    });

    Pushwoosh.register();
    Pushwoosh.setUserId('HWID');
  };
}

export function verifyOTPReleaseDevice(payload) {
  return (dispatch, getState) => {
    const state = getState();
    payload = {
      ...payload,
      deviceInfo: {
        name: deviceInfo.name,
        model: deviceInfo.model,
      },
    };
    api
      .otpVerifyChangeDevice(payload, dispatch)
      .then(resOtp => {
        const responseCode = result(resOtp, 'data.responseCode', '01') === '00';
        if (responseCode) {
          api
            .confirmReleaseDeviceQR(payload, dispatch)
            .then(resRelease => {
              const dataRelease = result(resRelease, 'data', {});
              let additionalApiPayload = {
                ...result(state, 'additionalApiPayload', {}),
                tokenServer: result(
                  dataRelease,
                  'updateValidOTPStatusMap.tokenServer',
                  '',
                ),
              };
              dispatch(actionCreators.setAPIPayloadParam(additionalApiPayload));
              const responseCodeOtp =
                result(resOtp, 'data.responseCode', '01') === '00';
              responseCodeOtp ? dispatch(newLockDownDevice(dataRelease)) : null;
            })
            .catch(err => {
              Toast.show(
                getErrorMessage(
                  err,
                  language.ERROR_MESSAGE__COULD_NOT_VERFIY_OTP,
                ),
                Toast.LONG,
              );
            });
        }
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_VERFIY_OTP),
          Toast.LONG,
        );
      });
  };
}

export function verifyOTPReleaseDeviceRevamp(payload) {
  return (dispatch, getState) => {
    const state = getState();
    const transRefNum = result(state, 'transRefNum');
    payload = {
      ...payload,
      deviceInfo: {
        name: deviceInfo.name,
        model: deviceInfo.model,
      },
      transRefNum: transRefNum,
    };
    return api
      .confirmReleaseDeviceQRRevamp(payload, dispatch)
      .then(resRelease => {
        const dataRelease = result(resRelease, 'data', {});
        let additionalApiPayload = {
          ...result(state, 'additionalApiPayload', {}),
          tokenServer: result(
            dataRelease,
            'changeDeviceLockdownMap.tokenServer',
            '',
          ),
        };
        dispatch(actionCreators.setAPIPayloadParam(additionalApiPayload));
        const responseCodeOtp =
          result(resRelease, 'data.responseCode', '01') === '00';
        responseCodeOtp ? dispatch(newLockDownDevice(dataRelease)) : null;
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_VERFIY_OTP),
          Toast.LONG,
        );
      });
  };
}

export function newLockDownDevice(dataRelease) {
  return dispatch => {
    set(
      storageKeys.USERNAME,
      result(dataRelease, 'changeDeviceLockdownMap.username', ''),
    );
    set(
      storageKeys.TOKEN_SERVER,
      result(dataRelease, 'changeDeviceLockdownMap.tokenServer', ''),
    );
    getInitKeys().then(values => {
      const data = {};
      data[storageKeys.USERNAME] = result(
        dataRelease,
        'changeDeviceLockdownMap.username',
        '',
      );
      data[storageKeys.TOKEN_CLIENT] = values[1];
      data[storageKeys.TOKEN_SERVER] = result(
        dataRelease,
        'changeDeviceLockdownMap.tokenServer',
        '',
      );
      set(storageKeys.LOGIN_WITH_RELEASE_DEVICE, true);
      dispatch(actionCreators.saveAppInitKeys(data));
      dispatch(
        StackActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({routeName: 'Landing'}),
            NavigationActions.navigate({
              routeName: 'LoginChangeDeviceResult',
              params: {dataRelease},
            }),
          ],
        }),
      );
    });
  };
}

export function finishLockDownDevice(swag) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    swag = swag.substring(0, swag.length - 3);
    dispatch(
      StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({routeName: 'Landing'}),
          NavigationActions.navigate({routeName: 'LoginWithEasyPin'}),
        ],
      }),
    );
    return api
      .logOutChangeDevice({ipassport: swag}, dispatch)
      .then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.cleanAppState());
        dispatch(populateOffersCache());
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.cleanAppState());
        dispatch(populateConfigData());
      });
  };
}

export function getBalanceEmoneyBeforeLogin() {
  return dispatch => {
    dispatch(actionCreators.updateEmoney({status: 'loading'}));
    return api
      .getBalanceEmoneyLanding({}, dispatch)
      .then(res => {
        dispatch(actionCreators.updateEmoney(res.data.accounts));
        dispatch(actionCreators.updateBalanceEmoney(res.data.accounts));
      })
      .catch(() => {
        dispatch(actionCreators.updateEmoney({status: 'error'}));
      });
  };
}

export function checkLockdownDevice() {
  return (dispatch, getState) => {
    const state = getState();
    const arrayLength = Boolean(
      state.appInitKeys &&
        state.appInitKeys.username &&
        state.appInitKeys.tokenClient &&
        state.appInitKeys.tokenServer,
    );
    arrayLength;
  };
}

export function gotoRegisterEmoney() {
  return dispatch => {
    dispatch(NavigationActions.navigate({routeName: 'RegisterEmoneyScreen'}));
  };
}

export function checkAccountType(values, simasCaptcha) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const mobileNumber = result(
      state,
      'form.registerByPhoneForm.values.phone',
      '',
    );
    const captchaInput = result(values, 'captchaInput', '');
    const captchaId = result(simasCaptcha, 'captchaId', '').toString();
    const payload = {mobileNumber, captchaInput, captchaId};
    return api
      .checkAccountList(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const responseCode = result(res, 'data.responseCode', '');
        const accTypeListData = result(res, 'data', {});
        if (responseCode === '00') {
          dispatch(actionCreators.saveAccType(accTypeListData));
          dispatch(checkResetByAccountType(values, simasCaptcha));
        } else {
          Toast.show(language.EMONEY__RESET_PASSWORD, Toast.SHORT);
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        const captcha = generateCaptchaTransformer();
        dispatch(actionCreators.setCaptcha(captcha));
        const dataRes = result(err, 'data', {});
        dispatch(actionCreators.saveAccType(dataRes));
        dispatch(change('registerByPhoneForm', 'captchaInput', ''));
        Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
      });
  };
}

export function addOrder() {
  return (dispatch, getState) => {
    const state = getState();
    const tutorialProduct = result(state, 'tutorialProduct', {});
    const tutorialON = result(tutorialProduct, 'tutorialON', false);
    const order = result(tutorialProduct, 'order', 0);
    let updateNumber = order + 1;
    const dataSave = {
      tutorialON: tutorialON,
      order: updateNumber,
    };
    dispatch(actionCreators.saveTutorialProduct(dataSave));
  };
}

export function finishOrder() {
  return dispatch => {
    set(storageKeys.TOOLTIP_NEW_FEATURES, true);
    const dataSave = {
      tutorialON: false,
      order: null,
    };
    dispatch(actionCreators.saveTutorialProduct(dataSave));
  };
}

export function addOrderOnboard() {
  return (dispatch, getState) => {
    const state = getState();
    const tutorialOnboard = result(state, 'tutorialOnboard', {});
    const tutorialON = result(tutorialOnboard, 'tutorialON', false);
    const order = result(tutorialOnboard, 'order', 0);

    let updateNumber = order + 1;
    const dataSave = {
      tutorialON: tutorialON,
      order: updateNumber,
    };
    dispatch(actionCreators.saveTutorialOnboard(dataSave));
  };
}

export function finishOrderOnboard() {
  return dispatch => {
    const dataSave = {
      tutorialON: false,
      order: null,
    };
    dispatch(actionCreators.saveTutorialOnboard(dataSave));
  };
}

export function autoSaveFeedBackChecklist(isAutoSave, checked, type) {
  return dispatch => {
    const payload = {isAutoSave, type};
    return api
      .getAutoSave(payload, dispatch)
      .then(res => {
        const isAutoSave = result(res, 'data.isAutoSave', []);
        const transfer = result(isAutoSave, 'transfer', false);
        const billPay = result(isAutoSave, 'billPay', false);
        const isSaving = result(isAutoSave, 'isSaving', false);
        const DigitalStore = result(isAutoSave, 'DigitalStore', false);
        const QR = result(isAutoSave, 'QR', false);
        dispatch(actionCreators.hideSpinner());
        dispatch(
          actionCreators.saveAutoSave({
            transfer: transfer,
            billPay: billPay,
            isSaving: isSaving,
            DigitalStore: DigitalStore,
            QR: QR,
            checked: checked,
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err), Toast.LONG);
      });
  };
}

export function deeplinkPromo(promoFix, productCode, phoneNumberFix) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    getInitKeys()
      .then(() => {
        setTimeout(() => {
          dispatch(actionCreators.hideSpinner());
          const state = getState();
          const phoneNumber = transformTokenIos(phoneNumberFix);
          const arrayLength = Boolean(
            state.appInitKeys &&
              state.appInitKeys.username &&
              state.appInitKeys.tokenClient &&
              state.appInitKeys.tokenServer,
          );
          if (!arrayLength) {
            dispatch(
              actionCreators.saveUTM({
                utm: promoFix,
                productCode,
                phoneNum: phoneNumber,
              }),
            );
            get(storageKeys.TNC_LOCKDOWN).then(res => {
              if (!res) {
                if (productCode === 'Emoney') {
                  dispatch(
                    NavigationActions.navigate({
                      routeName: 'EmoneyRegistration',
                    }),
                  );
                } else if (startsWith(productCode, 'SA')) {
                  dispatch(getSavingProductsItemsForDeeplink(productCode));
                } else if (productCode === 'loan') {
                  dispatch(getListLoanProduct());
                } else {
                  dispatch(getCreditCardProductsItemsForDeeplink());
                }
              }
            });
          } else {
            const isLogin = !isEmpty(result(state, 'user', {}));
            if (productCode === 'Emoney') {
              Toast.show(
                'You already have a eMoney/Simas Digi account',
                Toast.Long,
              );
            } else if (startsWith(productCode, 'SA')) {
              Toast.show(
                'You already have a eMoney/Simas Digi account',
                Toast.Long,
              );
            } else if (productCode === 'loan') {
              if (isLogin) {
                dispatch(getListLoanProduct());
              } else {
                dispatch(
                  actionCreators.saveUTM({
                    utm: promoFix,
                    productCode,
                    phoneNum: phoneNumber,
                  }),
                );
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'LoginWithEasyPin',
                    params: {productCode, utm: promoFix},
                  }),
                );
              }
            } else {
              if (isLogin) {
                dispatch(getCreditCardProductsItemsForDeeplink(isLogin));
              } else {
                dispatch(
                  actionCreators.saveUTM({
                    utm: promoFix,
                    productCode,
                    phoneNum: phoneNumber,
                  }),
                );
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'LoginWithEasyPin',
                    params: {productCode, utm: promoFix},
                  }),
                );
              }
            }
          }
        }, 5000);
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__GET_DATA));
      });
  };
}

export function checkUserAccount(noCard = false) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const accountNumber = result(
      state,
      'form.resetPassForm.values.accNumber',
      '',
    );
    const mobileNumber = result(
      state,
      'form.resetPassForm.values.phoneNumber',
      '',
    );
    const email = result(state, 'form.resetPassForm.values.emailAddress', '');
    const idKtp = result(state, 'form.resetPassForm.values.ktpNumber', '');
    const birthDate = result(state, 'form.resetPassForm.values.birthDate', '');
    const captchaInput = result(
      state,
      'form.resetPassForm.values.captchaInput',
      '',
    );
    const captchaId = result(state, 'captcha.captchaId', '').toString();
    const payload = {
      accountNumber,
      mobileNumber,
      email,
      idKtp,
      birthDate,
      captchaInput,
      captchaId,
    };
    return api
      .resetPassWithoutCard(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const responseCode = result(res, 'data.responseCode', '');
        const typeActivation = transformToken(
          result(res, 'data.typeActivation', ''),
        );
        const tokenEmail = transformToken(result(res, 'data.emailToken', ''));
        const ipassport = result(res, 'data.ipassport', '');
        if (responseCode === '00') {
          const captcha = generateCaptcha();
          dispatch(actionCreators.setCaptcha(captcha));
          dispatch(change('resetPassForm', 'captchaInput', ''));
          dispatch(
            NavigationActions.navigate({
              routeName: 'ResetPasswordEmailToken',
              params: {
                typeActivation: typeActivation,
                tokenEmail: tokenEmail,
                email: email,
                noCard: noCard,
                ipassport: ipassport,
              },
            }),
          );
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        const captcha = generateCaptcha();
        dispatch(actionCreators.setCaptcha(captcha));
        dispatch(change('resetPassForm', 'captchaInput', ''));
        Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
      });
  };
}

export function loginOBMLinkUtm(
  {username, password, easyPin},
  isLockedDevice,
  isOBM,
  isResetEasypin = false,
  regisATM = false,
  loginATM = false,
  isUserRegistered = false,
) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const smsPriority = Boolean(
      result(getState(), 'config.smsPriority.login', false),
    );
    const randomNumber = randomString(16);
    OBM_EncryptPassword(password ? password : easyPin, randomNumber);

    if (easyPin) {
      easyPin =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    } else if (password) {
      password =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    }
    const deviceInfoLogin = {
      name: deviceInfo.name,
      model: deviceInfo.model,
    };
    const version = split(VersionNumber.appVersion, '.');
    const versionScope = version[0] + ',' + version[1];
    const loginAPI = api.loginNew;
    dispatch(actionCreators.generateRandomNumber(randomNumber));
    return loginAPI(
      {
        username: normalisePhoneNumber(username),
        password,
        easyPin,
        smsPriority,
        deviceInfoLogin,
        versionScope,
      },
      isLockedDevice,
      dispatch,
    )
      .then(res => {
        const dataCore = result(res, 'data', {});
        const payeeList = result(getState(), 'payees', []);
        if (isEmpty(payeeList)) {
          dispatch(getTargetAccount());
        }
        // const os = Platform.OS;
        // const message = 'Login-Success';
        // Analytics.logEvent('LOGIN_ATTEMPT', {device: os, status: message});
        const setNewCredentialOBM = result(
          res,
          'data.setNewCredentialOBM',
          'ALL',
        );
        const profileScope = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope',
          '',
        );
        if (username === '62999') {
          dispatch(actionCreators.activeDemoAccount(true));
        }
        const digitalTrx = result(res, 'data.digitalTransactionService', {});
        dispatch(setLoginStorage(digitalTrx));
        dispatch(actionCreators.saveGenerateCode(digitalTrx));
        const userId = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.id',
          '',
        );
        if (!password && !easyPin) {
          dispatch(actionCreators.updateLastLogin('fingerprint'));
          set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'fingerprint').catch(err => {
            Toast.show(
              getErrorMessage(
                err,
                language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
              ),
              Toast.LONG,
            );
          });
          tracker.trackEvent('LOGIN_FINGERPRINT_SUCCESS', 'ONBOARDING', null, {
            ID: userId,
          });
        } else {
          dispatch(actionCreators.clearLastLogin());
          set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'easypin').catch(err => {
            Toast.show(
              getErrorMessage(
                err,
                language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
              ),
              Toast.LONG,
            );
          });
        }
        const privateOffers = result(res.data, 'privateOffers', []);
        dispatch(actionCreators.savePrivateOffers(privateOffers));
        const serverTime = moment(
          result(res, 'data.serverTime', '').toString(),
        );
        const appTime = new Date();
        const diff = moment(appTime, 'DD/MM/YYYY').diff(
          moment(serverTime, 'DD/MM/YYYY'),
        );
        const gapTime = Math.round(moment.duration(diff).asSeconds());
        const userApiKey = result(res.data, 'userApiKey', '');
        const faceRegistered = result(res.data, 'isFaceRegister', false);
        const defaultValueAccount = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.accountList',
          {},
        );
        const getdefaultAccount = find(defaultValueAccount, {
          accountType: 'emoneyAccount',
        });
        set(
          storageKeys.ACCOUNT_DATA_DEFAULT,
          middlewareUtils.getAccountDefaultEmoney(getdefaultAccount),
        );
        dispatch(
          actionCreators.isFaceRegisteredUpdate({
            isFaceRegistered: faceRegistered,
          }),
        );
        set(storageKeys.IS_FACE_REGISTERED, {
          isFaceRegistered: faceRegistered,
        }).catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
            ),
            Toast.LONG,
          );
        });
        const stateReduc = getState();
        const tooglePushLoginID = result(
          stateReduc,
          'config.flag.flagPushNotifCifCode',
          'INACTIVE',
        );
        const loginPushwooshID =
          tooglePushLoginID === 'ACTIVE'
            ? result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
                '',
              )
            : result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.loginName',
                '',
              ).toLowerCase();
        const loginSetTagID = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.title',
          '',
        ).toLowerCase();
        const isAutoSave = result(res, 'data.isAutoSave', []);
        const transfer = result(isAutoSave, 'transfer', false);
        const billPay = result(isAutoSave, 'billPay', false);
        const isSaving = result(isAutoSave, 'isSaving', false);
        const DigitalStore = result(isAutoSave, 'DigitalStore', false);
        const QR = result(isAutoSave, 'QR', false);
        dispatch(
          actionCreators.saveAutoSave({
            transfer: transfer,
            billPay: billPay,
            isSaving: isSaving,
            DigitalStore: DigitalStore,
            QR: QR,
          }),
        );
        dispatch(actionCreators.saveConfigTime(res.data));
        dispatch(actionCreators.saveUserApiKey(userApiKey));
        dispatch(actionCreators.setGapTimeServer(gapTime));
        dispatch(
          actionCreators.saveTransRefNum(result(res, 'data.transRefNum', '')),
        );
        if (regisATM) {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.attributeMap.iPassport'),
            }),
          );
        } else {
          const ipassport = result(res, 'data.ipassport');
          const iPassport = result(res, 'data.attributeMap.iPassport');
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: isEmpty(ipassport) ? iPassport : ipassport,
            }),
          );
          assembleDataForDashboard(dispatch, res);
        }

        dispatch(populateConfigCacheEFormData());

        dispatch(actionCreators.hideSpinner());
        dispatch(change('loginWithUsernamePassword', 'password', ''));
        tracker.setUser(
          String(result(getState(), 'user.profile.customer.id', deviceInfo.id)),
        );
        const isDemoAccount = /^DEMO-/.test(
          result(res, 'data.ipassport', undefined),
        );
        if ((isLockedDevice || isDemoAccount) && !isResetEasypin) {
          dispatch(registerPushId(loginPushwooshID, loginSetTagID));
          if (faceRegistered) {
            if (size(dataCore) !== 0) {
              if (setNewCredentialOBM === 'EASYPIN_OBM') {
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'EasyPinVerify',
                    params: {
                      nextRouteName: 'Dashboard',
                      setNewCredentialOBM: setNewCredentialOBM,
                      isOBM,
                    },
                  }),
                );
              } else if (setNewCredentialOBM === 'PASSWORD') {
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'ValidatePassword',
                    params: {
                      nextRouteName: 'Dashboard',
                      isOBMPassword: true,
                      isOBM,
                      profileScope,
                    },
                  }),
                );
              } else if (setNewCredentialOBM === 'ALL') {
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'ValidatePassword',
                    params: {
                      nextRouteName: 'Dashboard',
                      isOBMAll: true,
                      isOBM,
                      profileScope,
                    },
                  }),
                );
              } else {
                dispatch(deeplinkPromoETB());
              }
            } else {
              Toast.show(language.ERROR_MESSAGE__COULD_NOT_LOG_IN, Toast.LONG);
            }
          } else {
            const skipFunction = () => {
              if (setNewCredentialOBM === 'EASYPIN_OBM') {
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'EasyPinVerify',
                    params: {
                      nextRouteName: 'Dashboard',
                      setNewCredentialOBM: setNewCredentialOBM,
                      isOBM,
                      isOBMEasyPin: true,
                    },
                  }),
                );
              } else if (setNewCredentialOBM === 'PASSWORD') {
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'ValidatePassword',
                    params: {
                      nextRouteName: 'Dashboard',
                      isOBMPassword: true,
                      isOBM,
                      profileScope,
                    },
                  }),
                );
              } else if (setNewCredentialOBM === 'ALL') {
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'ValidatePassword',
                    params: {
                      nextRouteName: 'Dashboard',
                      isOBMAll: true,
                      isOBM,
                      profileScope,
                    },
                  }),
                );
              } else {
                dispatch(deeplinkPromoETB());
              }
            };
            dispatch(
              checkCameraPermissionAndNavigate(
                'CameraPage',
                {action: 'RegisterLockdown'},
                true,
                skipFunction,
              ),
            );
          }
        } else {
          const mobileNumber = result(
            res,
            'data.ipassportData.ipassDataClient.profileScope.userLogin.mobileNumberMasking',
            '',
          );
          const mobileNumberATM = result(
            res,
            'data.attributeMap.mobileNumberMasking',
            '',
          );
          const payload = JSON.parse(result(res, 'config.data', '{}'));
          if (mobileNumber || mobileNumberATM) {
            if (loginATM) {
              const params = {
                maskedUsername: obfuscateUsername(username),
                isResetEasypin,
              };
              dispatch(registerPushId(loginPushwooshID, loginSetTagID));
              dispatch(resetToLandingAndNavigate('EasyPin', params));
            } else {
              const params = {
                isEasyPinSet: res.data.isEasyPinSet,
                maskedUsername: obfuscateUsername(username),
                disableEasyPinLogin: true,
                TXID: payload.TXID,
                isResetEasypin,
                regisATM,
                newUserMobile: mobileNumberATM,
              };
              dispatch(resetToLandingAndNavigate('OTP', params));
            }
            set(storageKeys.MOBILE_NUMBER, mobileNumber).catch(err => {
              Toast.show(
                getErrorMessage(
                  err,
                  language.ERROR_MESSAGE__COULD_NOT_STORE_MOBILE_NUMBER,
                ),
                Toast.LONG,
              );
            });
          } else {
            Alert.alert(
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TITLE,
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TEXT,
              [
                {
                  text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                },
              ],
            );
          }
        }
      })
      .catch(err => {
        // const os = Platform.OS;
        // const message = 'Login-Failed';
        // Analytics.logEvent('LOGIN_ATTEMPT', {device: os, status: message});
        const errorOBM = result(err, 'data.migrateToOBM', '');
        if (errorOBM === 'true') {
          dispatch(NavigationActions.navigate({routeName: 'ObmMigrate'}));
        }
        if (password === '' && easyPin === '') {
          tracker.trackEvent(
            'LOGIN_FINGERPRINT_FAILED',
            'ONBOARDING',
            null,
            {},
          );
        }
        dispatch(actionCreators.hideSpinner());
        isLockedDevice || isUserRegistered
          ? dispatch(change('loginWithUsernamePassword', 'password', ''))
          : dispatch(reset('loginWithUsernamePassword'));
        dispatch(destroy('loginEasyPinForm'));
        const errorCode = result(err, 'data.responseCode', '');
        if (errorCode === '05') {
          // Dormant IB user
          Alert.alert(
            language.ONBOARDING__DORMANT_TITLE,
            language.ONBOARDING__DORMANT_TEXT,
            [
              {
                text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                onPress: () => {
                  dispatch(clearAndResetPasswordBurgerMenuNoAlert());
                },
              },
            ],
          );
          return;
        }
        if (errorOBM === 'true') {
          null;
        } else {
          const status = result(err, 'status', 400);
          if (status === 429) {
            Toast.show(
              getErrorMessage(err, language.COMMON__TIMEOUT_TITLE1_F5),
              Toast.LONG,
            );
          } else {
            Toast.show(
              getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOG_IN),
              Toast.LONG,
            );
            dispatch(destroy('loginEasyPinFormAccount'));
          }
        }
      });
  };
}

export function deeplinkPromoETB(isLogin = false) {
  return (dispatch, getState) => {
    const state = getState();
    const productCode = result(state, 'utmCode.productCode', '');
    if (!isLogin) {
      dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'Landing'})],
        }),
      );
    }
    if (productCode === 'loan') {
      dispatch(getListLoanProduct());
    } else {
      dispatch(getCreditCardProductsItemsForDeeplink());
    }
  };
}

export function loginToSpecialDeals(
  {username, password, easyPin},
  isLockedDevice,
  isOBM,
  isResetEasypin = false,
  regisATM = false,
  loginATM = false,
  isUserRegistered = false,
  offers,
) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    dispatch(populateBanners());
    const smsPriority = Boolean(
      result(getState(), 'config.smsPriority.login', false),
    );
    const version = split(VersionNumber.appVersion, '.');
    const versionScope = version[0] + ',' + version[1];
    const randomNumber = randomString(16);
    OBM_EncryptPassword(password ? password : easyPin, randomNumber);
    if (easyPin) {
      easyPin =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    } else if (password) {
      password =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    }
    const deviceInfoLogin = {
      name: deviceInfo.name,
      model: deviceInfo.model,
    };
    dispatch(actionCreators.showSpinner());
    const loginAPI = api.loginNew;
    return loginAPI(
      {
        username: normalisePhoneNumber(username),
        password,
        easyPin,
        smsPriority,
        deviceInfoLogin,
        versionScope,
      },
      isLockedDevice,
      dispatch,
    )
      .then(res => {
        const dataCore = result(res, 'data', {});
        const userMember = result(res, 'data.customerSegment', '');
        dispatch(actionCreators.saveUserMemberData(userMember));
        dispatch(actionCreators.hideSpinner());
        const setNewCredentialOBM = result(
          res,
          'data.setNewCredentialOBM',
          'ALL',
        );
        const profileScope = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope',
          '',
        );
        const userId = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.id',
          '',
        );
        if (!password && !easyPin) {
          dispatch(actionCreators.updateLastLogin('fingerprint'));
          set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'fingerprint').catch(err => {
            Toast.show(
              getErrorMessage(
                err,
                language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
              ),
              Toast.LONG,
            );
          });
          tracker.trackEvent('LOGIN_FINGERPRINT_SUCCESS', 'ONBOARDING', null, {
            ID: userId,
          });
        } else {
          dispatch(actionCreators.clearLastLogin());
          set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'easypin').catch(err => {
            Toast.show(
              getErrorMessage(
                err,
                language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
              ),
              Toast.LONG,
            );
          });
        }
        const serverTime = moment(
          result(res, 'data.serverTime', '').toString(),
        );
        const appTime = new Date();
        const diff = moment(appTime, 'DD/MM/YYYY').diff(
          moment(serverTime, 'DD/MM/YYYY'),
        );
        const gapTime = Math.round(moment.duration(diff).asSeconds());
        const userApiKey = result(res.data, 'userApiKey', '');
        const faceRegistered = result(res.data, 'isFaceRegister', false);
        const defaultValueAccount = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.accountList',
          {},
        );
        const getdefaultAccount = find(defaultValueAccount, {
          accountType: 'emoneyAccount',
        });
        set(
          storageKeys.ACCOUNT_DATA_DEFAULT,
          middlewareUtils.getAccountDefaultEmoney(getdefaultAccount),
        );
        const privateOffers = result(res.data, 'privateOffers', []);
        dispatch(actionCreators.savePrivateOffers(privateOffers));
        dispatch(
          actionCreators.isFaceRegisteredUpdate({
            isFaceRegistered: faceRegistered,
          }),
        );
        set(storageKeys.IS_FACE_REGISTERED, {
          isFaceRegistered: faceRegistered,
        }).catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
            ),
            Toast.LONG,
          );
        });
        const stateReduc = getState();
        const tooglePushLoginID = result(
          stateReduc,
          'config.flag.flagPushNotifCifCode',
          'INACTIVE',
        );
        const loginPushwooshID =
          tooglePushLoginID === 'ACTIVE'
            ? result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
                '',
              )
            : result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.loginName',
                '',
              ).toLowerCase();
        const loginSetTagID = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.title',
          '',
        ).toLowerCase();
        const isAutoSave = result(res, 'data.isAutoSave', []);
        const transfer = result(isAutoSave, 'transfer', false);
        const billPay = result(isAutoSave, 'billPay', false);
        const isSaving = result(isAutoSave, 'isSaving', false);
        const DigitalStore = result(isAutoSave, 'DigitalStore', false);
        const QR = result(isAutoSave, 'QR', false);
        dispatch(
          actionCreators.saveAutoSave({
            transfer: transfer,
            billPay: billPay,
            isSaving: isSaving,
            DigitalStore: DigitalStore,
            QR: QR,
          }),
        );
        dispatch(actionCreators.saveUserApiKey(userApiKey));
        dispatch(actionCreators.setGapTimeServer(gapTime));
        dispatch(
          actionCreators.saveTransRefNum(result(res, 'data.transRefNum', '')),
        );
        if (regisATM) {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.attributeMap.iPassport'),
            }),
          );
        } else {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.ipassport'),
            }),
          );
          assembleDataForDashboard(dispatch, res);
        }

        dispatch(populateConfigCacheEFormData());

        dispatch(actionCreators.hideSpinner());
        dispatch(change('loginWithUsernamePassword', 'password', ''));
        tracker.setUser(
          String(result(getState(), 'user.profile.customer.id', deviceInfo.id)),
        );
        const isDemoAccount = /^DEMO-/.test(
          result(res, 'data.ipassport', undefined),
        );
        if ((isLockedDevice || isDemoAccount) && !isResetEasypin) {
          dispatch(registerPushId(loginPushwooshID, loginSetTagID));
          if (faceRegistered) {
            if (size(dataCore) !== 0) {
              if (setNewCredentialOBM === 'EASYPIN_OBM') {
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'EasyPinVerify',
                    params: {
                      nextRouteName: 'Dashboard',
                      setNewCredentialOBM: setNewCredentialOBM,
                      isOBM,
                    },
                  }),
                );
              } else if (setNewCredentialOBM === 'PASSWORD') {
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'ValidatePassword',
                    params: {
                      nextRouteName: 'Dashboard',
                      isOBMPassword: true,
                      isOBM,
                      profileScope,
                    },
                  }),
                );
              } else if (setNewCredentialOBM === 'ALL') {
                dispatch(
                  NavigationActions.navigate({
                    routeName: 'ValidatePassword',
                    params: {
                      nextRouteName: 'Dashboard',
                      isOBMAll: true,
                      isOBM,
                      profileScope,
                    },
                  }),
                );
              } else {
                dispatch(prepareGoSpecialDeals(offers));
              }
            } else {
              Toast.show(language.ERROR_MESSAGE__COULD_NOT_LOG_IN, Toast.LONG);
            }
          } else {
            const skipFunction = () => {
              if (size(dataCore) !== 0) {
                if (setNewCredentialOBM === 'EASYPIN_OBM') {
                  dispatch(
                    NavigationActions.navigate({
                      routeName: 'EasyPinVerify',
                      params: {
                        nextRouteName: 'Dashboard',
                        setNewCredentialOBM: setNewCredentialOBM,
                        isOBM,
                        isOBMEasyPin: true,
                      },
                    }),
                  );
                } else if (setNewCredentialOBM === 'PASSWORD') {
                  dispatch(
                    NavigationActions.navigate({
                      routeName: 'ValidatePassword',
                      params: {
                        nextRouteName: 'Dashboard',
                        isOBMPassword: true,
                        isOBM,
                        profileScope,
                        offers,
                      },
                    }),
                  );
                } else if (setNewCredentialOBM === 'ALL') {
                  dispatch(
                    NavigationActions.navigate({
                      routeName: 'ValidatePassword',
                      params: {
                        nextRouteName: 'Dashboard',
                        isOBMAll: true,
                        isOBM,
                        profileScope,
                      },
                    }),
                  );
                } else {
                  dispatch(prepareGoSpecialDeals(offers));
                }
              } else {
                Toast.show(
                  language.ERROR_MESSAGE__COULD_NOT_LOG_IN,
                  Toast.LONG,
                );
              }
            };
            dispatch(
              checkCameraPermissionAndNavigate(
                'CameraPage',
                {action: 'RegisterLockdown'},
                true,
                skipFunction,
              ),
            );
          }
        } else {
          const mobileNumber = result(
            res,
            'data.ipassportData.ipassDataClient.profileScope.userLogin.mobileNumberMasking',
            '',
          );
          const mobileNumberATM = result(
            res,
            'data.attributeMap.mobileNumberMasking',
            '',
          );
          const payload = JSON.parse(result(res, 'config.data', '{}'));
          if (mobileNumber || mobileNumberATM) {
            if (loginATM) {
              const params = {
                maskedUsername: obfuscateUsername(username),
                isResetEasypin,
              };
              dispatch(resetToLandingAndNavigate('EasyPin', params));
            } else {
              const params = {
                isEasyPinSet: res.data.isEasyPinSet,
                maskedUsername: obfuscateUsername(username),
                disableEasyPinLogin: true,
                TXID: payload.TXID,
                isResetEasypin,
                regisATM,
                newUserMobile: mobileNumberATM,
              };
              dispatch(resetToLandingAndNavigate('OTP', params));
            }
          } else {
            Alert.alert(
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TITLE,
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TEXT,
              [
                {
                  text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                  onPress: () => {
                    dispatch(
                      NavigationActions.navigate({routeName: 'Onboarding'}),
                    );
                  },
                },
              ],
            );
          }
        }
      })
      .catch(err => {
        if (password === '' && easyPin === '') {
          tracker.trackEvent(
            'LOGIN_FINGERPRINT_FAILED',
            'ONBOARDING',
            null,
            {},
          );
        }
        dispatch(actionCreators.hideSpinner());
        isLockedDevice || isUserRegistered
          ? dispatch(change('loginWithUsernamePassword', 'password', ''))
          : dispatch(reset('loginWithUsernamePassword'));
        dispatch(reset('loginEasyPinForm'));
        const errorCode = result(err, 'data.responseCode', '');
        if (errorCode === '05') {
          // Dormant IB user
          Alert.alert(
            language.ONBOARDING__DORMANT_TITLE,
            language.ONBOARDING__DORMANT_TEXT,
            [
              {
                text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                onPress: () => {
                  dispatch(clearAndResetPasswordBurgerMenuNoAlert());
                },
              },
            ],
          );
          return;
        }
        const status = result(err, 'status', 400);
        if (status === 429) {
          Toast.show(
            getErrorMessage(err, language.COMMON__TIMEOUT_TITLE1_F5),
            Toast.LONG,
          );
        } else {
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOG_IN),
            Toast.LONG,
          );
          dispatch(destroy('loginEasyPinFormAccount'));
        }
      });
  };
}

export function prepareGoSpecialDeals(offers) {
  return (dispatch, getState) => {
    const navigationKeys = result(
      getState(),
      'promos.navigateOnPushClicked',
      false,
    );
    const newsAbout = result(offers, 'navigateTo.0', '');
    const isMgm = newsAbout === 'Referral';
    const isCreditCard = newsAbout === 'CreditCard';
    dispatch(destroy('loginWithUsernamePassword'));
    dispatch(destroy('loginAccountForm'));
    dispatch(destroy('easyPinCreationForm'));
    dispatch(destroy('easyPinCreationConfirmForm'));
    dispatch(destroy('ActivationForm'));
    dispatch(destroy('loginEasyPinSpecialDeals'));
    dispatch(initStoreWithTransactionDetails());
    dispatch(isNewBurgerMenu());
    if (isMgm) {
      dispatch(NavigationActions.back());
      dispatch(goReferralCode());
    }
    if (isCreditCard) {
      dispatch(NavigationActions.back());
      dispatch(getCreditCardProductsItems());
    } else {
      dispatch(NavigationActions.back());
    }
    if (navigationKeys.length) {
      forEach(navigationKeys, navigateKey =>
        dispatch(NavigationActions.navigate({routeName: navigateKey})),
      );
      dispatch(actionCreators.changeNotificationRoute([]));
    }
  };
}

export function prepareGoSearch(
  isLoginAccount,
  gotoluckyDip = '',
  isFromSearch,
  productName,
) {
  return (dispatch, getState) => {
    const navigationKeys = result(
      getState(),
      'promos.navigateOnPushClicked',
      false,
    );
    const urlLink =
      gotoluckyDip === 'Privacy Policy'
        ? result(getState(), 'config.attention.urlSimobiPrivacyPolicy', '')
        : result(
            getState(),
            'config.attention.urlSimobiOnboardingTnCWithoutCheckbox',
            '',
          );
    dispatch(destroy('loginWithUsernamePassword'));
    dispatch(destroy('loginAccountForm'));
    dispatch(destroy('easyPinCreationForm'));
    dispatch(destroy('easyPinCreationConfirmForm'));
    dispatch(destroy('ActivationForm'));
    dispatch(initStoreWithTransactionDetails());
    dispatch(isNewBurgerMenu());
    if (isLoginAccount) {
      dispatch(NavigationActions.back());
    }
    if (gotoluckyDip !== '') {
      if (gotoluckyDip === 'true') {
        dispatch(NavigationActions.back());
        dispatch(
          NavigationActions.navigate({
            routeName: 'LuckyDipMainPage',
            params: {pathRoute: 'HomeScreen'},
          }),
        );
      }
      if (productName === 'loan') {
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'Landing'}),
              NavigationActions.navigate({routeName: 'ProductSeall'}),
            ],
          }),
        );
        dispatch(getListLoanProductFromKycUser());
      }
      if (productName === 'cc') {
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'Landing'}),
              NavigationActions.navigate({routeName: 'ProductSeall'}),
            ],
          }),
        );
        dispatch(getCreditCardProductsItemsFromKycUser());
      }
      if (productName === 'sa') {
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'Landing'}),
              NavigationActions.navigate({routeName: 'ProductSeall'}),
            ],
          }),
        );
        dispatch(getLoginSavingProductsItems());
      }
      if (productName === 'insurance') {
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'Landing'}),
              NavigationActions.navigate({routeName: 'ProductSeall'}),
            ],
          }),
        );
        dispatch(insuranceLoginProduct());
      }
      if (productName === 'splitbill') {
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'Landing'}),
              NavigationActions.navigate({routeName: 'ProductSeall'}),
            ],
          }),
        );
        dispatch(goToSplitBillMenuLoginProduct());
      }
      if (productName === 'exrate') {
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'Landing'}),
              NavigationActions.navigate({routeName: 'ProductSeall'}),
            ],
          }),
        );
        dispatch(NavigationActions.navigate({routeName: 'ValasItem'}));
      }
      if (productName === 'td') {
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'Landing'}),
              NavigationActions.navigate({routeName: 'ProductSeall'}),
            ],
          }),
        );
        dispatch(getTdConfigNkycUser());
      } else if (gotoluckyDip === 'LoginLanding') {
        dispatch(NavigationActions.back());
      }
    }
    if (isFromSearch) {
      dispatch(
        StackActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({routeName: 'Landing'}),
            NavigationActions.navigate({routeName: 'MenuHeaderSearch'}),
          ],
        }),
      );
      dispatch(genericSearchNavigate(gotoluckyDip, urlLink));
    }
    if (navigationKeys.length) {
      forEach(navigationKeys, navigateKey =>
        dispatch(NavigationActions.navigate({routeName: navigateKey})),
      );
      dispatch(actionCreators.changeNotificationRoute([]));
    }
  };
}

export function loginToDashboard(
  {username, password, easyPin},
  isLockedDevice,
  isOBM,
  isResetEasypin = false,
  regisATM = false,
  loginATM = false,
  isUserRegistered = false,
  gotoluckyDip = 'false',
  isProfile,
  isFromSearch,
  productName,
  offerNavigate,
) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    dispatch(populateBanners());
    const smsPriority = Boolean(
      result(getState(), 'config.smsPriority.login', false),
    );
    const randomNumber = randomString(16);
    OBM_EncryptPassword(password ? password : easyPin, randomNumber);

    if (easyPin) {
      easyPin =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    } else if (password) {
      password =
        'encryptedPassword:' +
        OBM_GetEncryptedPassword() +
        '|encodingParameter:' +
        OBM_GetEncodingParameter() +
        '|randomNumber:' +
        randomNumber;
    }

    const deviceInfoLogin = {
      name: deviceInfo.name,
      model: deviceInfo.model,
    };
    const version = split(VersionNumber.appVersion, '.');
    const versionScope = version[0] + ',' + version[1];
    const loginAPI = api.loginNew;
    return loginAPI(
      {
        username: normalisePhoneNumber(username),
        password,
        easyPin,
        smsPriority,
        deviceInfoLogin,
        versionScope,
      },
      isLockedDevice,
      dispatch,
    )
      .then(res => {
        const payeeList = result(getState(), 'payees', []);
        const userMember = result(res, 'data.customerSegment', '');
        dispatch(actionCreators.saveUserMemberData(userMember));
        if (isProfile === true) {
          dispatch(couponCustomerCounting());
          dispatch(getDataOrderWithoutSpinner());
        }
        if (isEmpty(payeeList)) {
          dispatch(getTargetAccount());
        }
        const setNewCredentialOBM = result(
          res,
          'data.setNewCredentialOBM',
          'ALL',
        );
        const profileScope = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope',
          '',
        );
        dispatch(updatePicture());
        dispatch(actionCreators.clearLastLogin());
        set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'easypin').catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
            ),
            Toast.LONG,
          );
        });
        const serverTime = moment(
          result(res, 'data.serverTime', '').toString(),
        );
        const appTime = new Date();
        const diff = moment(appTime, 'DD/MM/YYYY').diff(
          moment(serverTime, 'DD/MM/YYYY'),
        );
        const gapTime = Math.round(moment.duration(diff).asSeconds());
        const userApiKey = result(res.data, 'userApiKey', '');
        const stateReduc = getState();
        const tooglePushLoginID = result(
          stateReduc,
          'config.flag.flagPushNotifCifCode',
          'INACTIVE',
        );
        const loginPushwooshID =
          tooglePushLoginID === 'ACTIVE'
            ? result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
                '',
              )
            : result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.loginName',
                '',
              ).toLowerCase();
        const loginSetTagID = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.title',
          '',
        ).toLowerCase();
        const isAutoSave = result(res, 'data.isAutoSave', []);
        const transfer = result(isAutoSave, 'transfer', false);
        const billPay = result(isAutoSave, 'billPay', false);
        const isSaving = result(isAutoSave, 'isSaving', false);
        const DigitalStore = result(isAutoSave, 'DigitalStore', false);
        const QR = result(isAutoSave, 'QR', false);
        dispatch(
          actionCreators.saveAutoSave({
            transfer: transfer,
            billPay: billPay,
            isSaving: isSaving,
            DigitalStore: DigitalStore,
            QR: QR,
          }),
        );
        dispatch(actionCreators.saveUserApiKey(userApiKey));
        dispatch(actionCreators.setGapTimeServer(gapTime));
        dispatch(
          actionCreators.saveTransRefNum(result(res, 'data.transRefNum', '')),
        );
        dispatch(actionCreators.saveConfigTime(res.data));
        const privateOffers = result(res.data, 'privateOffers', []);
        dispatch(actionCreators.savePrivateOffers(privateOffers));
        if (regisATM) {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.attributeMap.iPassport'),
            }),
          );
        } else {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.ipassport'),
            }),
          );
          assembleDataForDashboard(dispatch, res);
        }

        dispatch(populateConfigCacheEFormData());

        dispatch(actionCreators.hideSpinner());
        dispatch(change('loginWithUsernamePassword', 'password', ''));
        tracker.setUser(
          String(result(getState(), 'user.profile.customer.id', deviceInfo.id)),
        );
        const isDemoAccount = /^DEMO-/.test(
          result(res, 'data.ipassport', undefined),
        );
        if ((isLockedDevice || isDemoAccount) && !isResetEasypin) {
          dispatch(registerPushId(loginPushwooshID, loginSetTagID));
          const skipFunction = () => {
            if (setNewCredentialOBM === 'EASYPIN_OBM') {
              dispatch(
                NavigationActions.navigate({
                  routeName: 'EasyPinVerify',
                  params: {
                    nextRouteName: 'Dashboard',
                    setNewCredentialOBM: setNewCredentialOBM,
                    isOBM,
                    isOBMEasyPin: true,
                  },
                }),
              );
            } else if (setNewCredentialOBM === 'PASSWORD') {
              dispatch(
                NavigationActions.navigate({
                  routeName: 'ValidatePassword',
                  params: {
                    nextRouteName: 'Dashboard',
                    isOBMPassword: true,
                    isOBM,
                    profileScope,
                    gotoluckyDip,
                    isFromSearch,
                    productName,
                  },
                }),
              );
            } else if (setNewCredentialOBM === 'ALL') {
              dispatch(
                NavigationActions.navigate({
                  routeName: 'ValidatePassword',
                  params: {
                    nextRouteName: 'Dashboard',
                    isOBMAll: true,
                    isOBM,
                    profileScope,
                    isLoginAccount: true,
                  },
                }),
              );
            } else {
              dispatch(
                prepareGoAccount(
                  false,
                  gotoluckyDip,
                  isFromSearch,
                  productName,
                  offerNavigate,
                ),
              );
              dispatch(getLuckyDipTicket());
            }
          };
          dispatch(
            checkCameraPermissionAndNavigate(
              'CameraPage',
              {action: 'RegisterLockdown'},
              true,
              skipFunction,
            ),
          );
        } else {
          const mobileNumber = result(
            res,
            'data.ipassportData.ipassDataClient.profileScope.userLogin.mobileNumberMasking',
            '',
          );
          const mobileNumberATM = result(
            res,
            'data.attributeMap.mobileNumberMasking',
            '',
          );
          const payload = JSON.parse(result(res, 'config.data', '{}'));
          if (mobileNumber || mobileNumberATM) {
            if (loginATM) {
              const params = {
                maskedUsername: obfuscateUsername(username),
                isResetEasypin,
              };
              dispatch(resetToLandingAndNavigate('EasyPin', params));
            } else {
              const params = {
                isEasyPinSet: res.data.isEasyPinSet,
                maskedUsername: obfuscateUsername(username),
                disableEasyPinLogin: true,
                TXID: payload.TXID,
                isResetEasypin,
                regisATM,
                newUserMobile: mobileNumberATM,
              };
              dispatch(registerPushId(loginPushwooshID, loginSetTagID));
              dispatch(resetToLandingAndNavigate('OTP', params));
            }
          } else {
            Alert.alert(
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TITLE,
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TEXT,
              [
                {
                  text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                  onPress: () => {
                    dispatch(
                      NavigationActions.navigate({routeName: 'Onboarding'}),
                    );
                  },
                },
              ],
            );
          }
        }
      })
      .catch(err => {
        if (password === '' && easyPin === '') {
          tracker.trackEvent(
            'LOGIN_FINGERPRINT_FAILED',
            'ONBOARDING',
            null,
            {},
          );
        }
        dispatch(actionCreators.hideSpinner());
        isLockedDevice || isUserRegistered
          ? dispatch(change('loginWithUsernamePassword', 'password', ''))
          : dispatch(reset('loginWithUsernamePassword'));
        dispatch(reset('loginEasyPinForm'));
        const errorCode = result(err, 'data.responseCode', '');
        if (errorCode === '05') {
          // Dormant IB user
          Alert.alert(
            language.ONBOARDING__DORMANT_TITLE,
            language.ONBOARDING__DORMANT_TEXT,
            [
              {
                text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                onPress: () => {
                  dispatch(clearAndResetPasswordBurgerMenuNoAlert());
                },
              },
            ],
          );
          return;
        }
        const status = result(err, 'status', 400);
        if (status === 429) {
          Toast.show(
            getErrorMessage(err, language.COMMON__TIMEOUT_TITLE1_F5),
            Toast.LONG,
          );
        } else {
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOG_IN),
            Toast.LONG,
          );
          dispatch(destroy('loginEasyPinFormAccount'));
        }
      });
  };
}

export function populateConfigCacheEFormData() {
  return (dispatch, getState) =>
    getConfigListEForm()
      .then(config => {
        if (!isEmpty(config)) {
          const state = getState();
          const version = result(config, 'version', '');
          const versionAppConfig = result(
            state,
            'config.versionListConfigEform',
            '',
          );

          if (version !== versionAppConfig) {
            return api.getListConfigEForm(dispatch).then(res => {
              set(storageKeys.CONFIG_LIST_EFORM, res.data);
              dispatch(actionCreators.saveListConfigEForm(res.data));
            });
          } else {
            dispatch(actionCreators.saveListConfigEForm(config));
          }
        } else {
          return api.getListConfigEForm(dispatch).then(res => {
            set(storageKeys.CONFIG_LIST_EFORM, res.data);
            dispatch(actionCreators.saveListConfigEForm(res.data));
          });
        }
      })
      .catch(() => Promise.resolve());
}

export function populateConfigCacheConfigEmoney() {
  return (dispatch, getState) =>
    getConfigEmoney()
      .then(config => {
        const state = getState();
        const configVersion = result(state, 'configVersion', '');
        const version = result(config, 'version', '');
        if (!isEmpty(config)) {
          if (version !== configVersion) {
            return api.emoneyConfig({}, dispatch).then(res => {
              const data = result(res, 'data.emoneyConfig', {});
              const emoneyConfig = {emoneyConfig: data, version: configVersion};
              set(storageKeys.CONFIG_EMONEY, emoneyConfig);
              dispatch(actionCreators.saveConfigEmoney(emoneyConfig));
            });
          } else {
            dispatch(actionCreators.saveConfigEmoney(config));
          }
        } else {
          return api.emoneyConfig({}, dispatch).then(res => {
            const data = result(res, 'data.emoneyConfig', {});
            const emoneyConfig = {emoneyConfig: data, version: configVersion};
            set(storageKeys.CONFIG_EMONEY, emoneyConfig);
            dispatch(actionCreators.saveConfigEmoney(emoneyConfig));
          });
        }
      })
      .catch(() => Promise.resolve());
}
