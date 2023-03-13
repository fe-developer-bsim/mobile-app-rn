import * as actionCreators from '../actions/index.actions.js';
import {storageKeys, getInitKeys} from '../../utils/storage.util';
import api from '../../utils/api.util';
import * as middlewareUtils from '../../utils/middleware.util';
import {
  getErrorMessage,
  getSavingFormName,
  getFieldName,
  generateCaptchaOpenProduct as generateCaptcha,
  formatMobileNumberEmoneyRegistration,
  changeFormByCode,
  currencyFormatter,
} from '../../utils/transformer.util';
import {StackActions, NavigationActions} from 'react-navigation';
import {Toast} from '../../utils/RNHelpers.util.js';
import {language, setCurrentLang} from '../../config/language';
import tracker from '../../utils/googleAnalytics.util';
import {initializeRSA} from '../../utils/secure.util';
import {ENV} from '../../config/env.config';
import moment from 'moment';
import {change, destroy, reset} from 'redux-form';
import {
  sortBy,
  forEach,
  split,
  result,
  endsWith,
  startsWith,
  isEmpty,
  find,
  lowerCase,
} from 'lodash';
import {Platform} from 'react-native';
import Permissions from 'react-native-permissions';
import {
  errorResponseResult,
  refreshStorageNew,
  popUpRewardMgm,
} from './common.thunks';
import {logout} from '../../state/thunks/onboarding.thunks';

// let Analytics = firebase.analytics();

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
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

export function populateConfigData() {
  return (dispatch, getState) => {
    const storeState = getState();
    if (result(storeState, 'config.bankList', []).length === 0) {
      return api.getAppConfig(dispatch).then(res => {
        const timeOutSession = Number(result(res, 'data.timeoutSession', 5));
        dispatch(actionCreators.saveTimeReducer(timeOutSession * 60));
        dispatch(actionCreators.setAppTimeout(timeOutSession * 60));
        dispatch(actionCreators.configPopulateData(res.data));
      });
    }
    return Promise.resolve(); // So that the function always return a valid promise
  };
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
        dispatch(
          actionCreators.setAPIPayloadParam({
            E2EE_RANDOM,
            publicKey,
            sessionId,
          }),
        );
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

          dispatch(
            actionCreators.setAPIPayloadParam({
              E2EE_RANDOM,
              publicKey,
              sessionId,
            }),
          );
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
    return Promise.resolve();
  };
}

export function resetAndNavigate(route, params) {
  return dispatch => {
    dispatch(actionCreators.hideDrawer());
    dispatch(NavigationActions.navigate({routeName: route, params}));
  };
}

// check phone and email
export function checkPhoneforSaving() {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const mobileNumber = formatMobileNumberEmoneyRegistration(
      result(state, 'form.identifyUserSavingForm.values.phone', ''),
    );
    const email = result(state, 'form.identifyUserSavingForm.values.email', '');
    const captchaInput = result(
      state,
      'form.identifyUserSavingForm.values.captchaInput',
      '',
    );
    const captchaId = result(state, 'captcha.captchaId', '').toString();
    const payload = {mobileNumber, email, captchaInput, captchaId};
    return api
      .checkPhoneForCC(payload, dispatch)
      .then(res => {
        const responseCode = result(res, 'data.responseCode', '');
        if (responseCode === '00') {
          const captcha = generateCaptcha();
          dispatch(actionCreators.setCaptcha(captcha));
          dispatch(requestOtpEform());
        } else {
          dispatch(phoneRegistered());
          const captcha = generateCaptcha();
          dispatch(actionCreators.setCaptcha(captcha));
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        const captcha = generateCaptcha();
        dispatch(actionCreators.setCaptcha(captcha));
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__POPULATE_REDEEM),
          Toast.LONG,
        );
      });
  };
}

export function requestOtpEform() {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const mobileNumber = result(
      state,
      'form.identifyUserSavingForm.values.phone',
      '',
    );
    const payload = {
      mobileNumber,
      transactionType: 'savingAccountGold',
      activateOtp: true,
      smsPriority: false,
    };
    return api
      .requestOtpEform(payload, dispatch)
      .then(res => {
        const transRefNum = result(res, 'data.transRefNum', '');
        dispatch(actionCreators.saveTransRefNum(transRefNum));
        dispatch(NavigationActions.navigate({routeName: 'SavingAccountOTP'}));
        dispatch(actionCreators.hideSpinner());
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
  };
}

export function resendOtpEform() {
  return (dispatch, getState) => {
    const state = getState();
    const mobileNumber = result(
      state,
      'form.identifyUserSavingForm.values.phone',
      '',
    );
    const payload = {
      mobileNumber,
      transactionType: 'savingAccountGold',
      activateOtp: true,
      smsPriority: false,
    };
    return api.requestOtpEform(payload, dispatch).catch(err => {
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

export function verifyOtpEform() {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const mobileNumber = result(
      state,
      'form.identifyUserSavingForm.values.phone',
      '',
    );
    const email = result(state, 'form.identifyUserSavingForm.values.email', '');
    const referralCode = result(
      state,
      'form.identifyUserSavingForm.values.referralCode',
      '',
    );
    const smsOtp = result(state, 'form.OTPEForm.values.OTP', '');
    const transRefNum = result(state, 'transRefNum', '');
    const lang = result(state, 'currentLanguage.id', 'id');
    const payload = {
      mobileNumber,
      mPinInputed: smsOtp,
      securityMode: '1',
      transRefNum,
      lang,
    };
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then(
        res => {
          if (!res) {
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
            ).then(result => {
              if (result === 'granted') {
                return api
                  .verifyOtpEform(payload, dispatch)
                  .then(() => {
                    dispatch(
                      actionCreators.saveOpenAccountData({
                        mobileNumber,
                        email,
                        referralCode,
                      }),
                    );
                    dispatch(NavigationActions.back());
                    setTimeout(() => {
                      dispatch(
                        NavigationActions.navigate({
                          routeName: 'SavingKTPCamera',
                        }),
                      );
                    }, 0);
                    dispatch(actionCreators.clearTransRefNum());
                    dispatch(actionCreators.hideSpinner());
                  })
                  .catch(err => {
                    dispatch(actionCreators.hideSpinner());
                    Toast.show(
                      getErrorMessage(err, language.CREATE_ACCOUNT__OTP_ERROR),
                      Toast.LONG,
                    );
                  });
              } else {
                return Promise.resolve();
              }
            });
          } else {
            return api
              .verifyOtpEform(payload, dispatch)
              .then(() => {
                dispatch(
                  actionCreators.saveOpenAccountData({
                    mobileNumber,
                    email,
                    referralCode,
                  }),
                );
                dispatch(NavigationActions.back());
                setTimeout(() => {
                  dispatch(
                    NavigationActions.navigate({routeName: 'SavingKTPCamera'}),
                  );
                }, 0);
                dispatch(actionCreators.clearTransRefNum());
                dispatch(actionCreators.hideSpinner());
              })
              .catch(err => {
                dispatch(actionCreators.hideSpinner());
                Toast.show(
                  getErrorMessage(err, language.CREATE_ACCOUNT__OTP_ERROR),
                  Toast.LONG,
                );
              });
          }
        },
      );
    } else {
      Permissions.check('ios.permission.CAMERA').then(response => {
        if (response === 'granted') {
          return api
            .verifyOtpEform(payload, dispatch)
            .then(() => {
              dispatch(
                actionCreators.saveOpenAccountData({
                  mobileNumber,
                  email,
                  referralCode,
                }),
              );
              dispatch(NavigationActions.back());
              setTimeout(() => {
                dispatch(
                  NavigationActions.navigate({routeName: 'SavingKTPCamera'}),
                );
              }, 0);
              dispatch(actionCreators.clearTransRefNum());
              dispatch(actionCreators.hideSpinner());
            })
            .catch(err => {
              dispatch(actionCreators.hideSpinner());
              Toast.show(
                getErrorMessage(err, language.CREATE_ACCOUNT__OTP_ERROR),
                Toast.LONG,
              );
            });
        } else {
          Permissions.request('ios.permission.CAMERA').then(response => {
            if (response === 'granted') {
              return api
                .verifyOtpEform(payload, dispatch)
                .then(() => {
                  dispatch(
                    actionCreators.saveOpenAccountData({
                      mobileNumber,
                      email,
                      referralCode,
                    }),
                  );
                  dispatch(NavigationActions.back());
                  setTimeout(() => {
                    dispatch(
                      NavigationActions.navigate({
                        routeName: 'SavingKTPCamera',
                      }),
                    );
                  }, 0);
                  dispatch(actionCreators.clearTransRefNum());
                  dispatch(actionCreators.hideSpinner());
                })
                .catch(err => {
                  dispatch(actionCreators.hideSpinner());
                  Toast.show(
                    getErrorMessage(err, language.CREATE_ACCOUNT__OTP_ERROR),
                    Toast.LONG,
                  );
                });
            } else {
              Toast.show(
                'Go to settings, allow Simobi+ to access device camera',
                Toast.LONG,
              );
              return Promise.resolve();
            }
          });
        }
      });
    }
  };
}

export function phoneRegistered() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSpinner());
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToLanding = () => {
      dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'Login'})],
        }),
      );
      dispatch(actionCreators.clearCaptcha());
      dispatch(actionCreators.hideSinarmasAlert());
    };

    const sinarmasModalOptions = {
      heading1: language.CREDITCARD__ALREADY_REGISTERED,
      text: language.CREDITCARD__ALREADY_REGISTERED_LOGIN,
      button1: language.GENERIC__CANCEL,
      onButton1Press: hideAlert,
      button2: language.MODAL_ALREADY_HAVE_REGISTERED_EMONEY_LOG_IN,
      onButton2Press: goToLanding,
      onClose: hideAlert,
      button1Color: 'black',
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function openSavingAccount(nav) {
  return (dispatch, getState) => {
    const state = getState();
    const loginRoute = result(nav, 'routes.0.routeName', 'Onboarding');
    const isLogin =
      !isEmpty(result(state, 'user', {})) &&
      (result(nav, 'index', 0) > 0 || loginRoute === 'Main');
    const accountList = result(state, 'accounts', []);
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const emoneyKycOnly =
      !find(accountList, {accountType: 'SavingAccount'}) &&
      find(accountList, {accountType: 'emoneyAccount'}) &&
      !startsWith(cifCode, 'NK');

    if (isLogin) {
      if (!startsWith(cifCode, 'NK')) {
        if (emoneyKycOnly) {
          dispatch(NavigationActions.navigate({routeName: 'SavingKTPCamera'}));
        } else {
          dispatch(NavigationActions.navigate({routeName: 'SavingEmailForm'}));
        }
      } else {
        dispatch(NavigationActions.navigate({routeName: 'SavingKTPCamera'}));
      }
    } else {
      dispatch(NavigationActions.navigate({routeName: 'CreateCCAccount'}));
    }
  };
}

export function generatePhotoKTP(base64) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const accountList = result(state, 'accounts', []);
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const nav = result(state, 'nav', {});
    const loginRoute = result(nav, 'routes.0.routeName', 'Onboarding');
    const isLogin =
      !isEmpty(result(state, 'user', {})) &&
      (result(nav, 'index', 0) > 0 || loginRoute === 'Main');
    const emoneyKycOnly =
      !find(accountList, {accountType: 'SavingAccount'}) &&
      find(accountList, {accountType: 'emoneyAccount'}) &&
      !startsWith(cifCode, 'NK');

    const emoneyAccount = find(accountList, {accountType: 'emoneyAccount'});
    const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
    const mobileNumber = emoneyNoAcc.substring(2, emoneyNoAcc.length);

    const lang = result(state, 'currentLanguage.id', '');
    const requestData = {
      mobileNumber,
      photoBase64: result(base64, 'base64', ''),
      namePhoto: '0~1~1',
      lang,
    };
    const targetUrl = 'generatePhoto';
    const type = 'post';
    const auth = 'EFORMCENTRAL|s3cuR3p455w0rD3f0rM';

    const username = 'EFORMCENTRAL';
    const password = 's3cuR3p455w0rD3f0rM';

    const isNotEncrypt = result(state, 'config.InactiveEncryptEformKey', null);
    let payload = {};
    let apiName = '';

    if (isNotEncrypt === null) {
      payload = {requestData, targetUrl, type, auth};
      apiName = 'eformGeneral';
    } else {
      payload = {requestData, targetUrl, type, username, password};
      apiName = 'eformGeneralNoAuth';
    }

    return api[apiName](payload, dispatch)
      .then(res => {
        const data = result(res, 'data.pathLocationPhoto');
        dispatch(actionCreators.saveOpenAccountDataKtp(data));
        if (isLogin) {
          if (!startsWith(cifCode, 'NK')) {
            if (emoneyKycOnly) {
              setTimeout(() => {
                dispatch(
                  StackActions.reset({
                    index: 1,
                    actions: [
                      NavigationActions.navigate({routeName: 'Landing'}),
                      NavigationActions.navigate({
                        routeName: 'SavingAccountForm1',
                      }),
                    ],
                  }),
                );
              }, 1000);
            } else {
              setTimeout(() => {
                dispatch(
                  StackActions.reset({
                    index: 1,
                    actions: [
                      NavigationActions.navigate({routeName: 'Landing'}),
                      NavigationActions.navigate({
                        routeName: 'SavingAccountForm1',
                      }),
                    ],
                  }),
                );
              }, 1000);
            }
          } else {
            setTimeout(() => {
              dispatch(
                StackActions.reset({
                  index: 1,
                  actions: [
                    NavigationActions.navigate({routeName: 'Landing'}),
                    NavigationActions.navigate({
                      routeName: 'SavingAccountForm1',
                    }),
                  ],
                }),
              );
            }, 1000);
          }
        } else {
          setTimeout(() => {
            dispatch(
              StackActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({routeName: 'Login'}),
                  NavigationActions.navigate({routeName: 'SavingAccountForm1'}),
                ],
              }),
            );
          }, 1000);
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

export function generatePhotoNPWP(base64) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const accountList = result(state, 'accounts', []);
    const emoneyAccount = find(accountList, {accountType: 'emoneyAccount'});
    const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
    const mobileNumber = emoneyNoAcc.substring(2, emoneyNoAcc.length);

    const lang = result(state, 'currentLanguage.id', '');
    const requestData = {
      mobileNumber,
      photoBase64: result(base64, 'base64', ''),
      namePhoto: '2~3~1',
      lang,
    };
    const targetUrl = 'generatePhoto';
    const type = 'post';
    const auth = 'EFORMCENTRAL|s3cuR3p455w0rD3f0rM';

    const username = 'EFORMCENTRAL';
    const password = 's3cuR3p455w0rD3f0rM';

    const isNotEncrypt = result(state, 'config.InactiveEncryptEformKey', null);
    let payload = {};
    let apiName = '';

    if (isNotEncrypt === null) {
      payload = {requestData, targetUrl, type, auth};
      apiName = 'eformGeneral';
    } else {
      payload = {requestData, targetUrl, type, username, password};
      apiName = 'eformGeneralNoAuth';
    }

    return api[apiName](payload, dispatch)
      .then(res => {
        const data = result(res, 'data.pathLocationPhoto');
        dispatch(actionCreators.saveOpenAccountDataNpwp(data));
        dispatch(change('CameraNPWPForm', 'imageData', data));
        dispatch(createCreditCardForm('SUBMIT', 'SavingAccountFinalize'));
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

export function accountRegistered() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSpinner());
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToRegisterAtm = () => {
      Promise.all([dispatch(logout())]).then(() => {
        dispatch(NavigationActions.navigate({routeName: 'RegisterAtm'}));
      });
      dispatch(actionCreators.clearCaptcha());
      dispatch(actionCreators.hideSinarmasAlert());
    };

    const sinarmasModalOptions = {
      heading1: language.ACCOUNT__REGISTERED,
      text: language.ACCOUNT__REGISTERED2,
      button1: language.GENERIC__CANCEL,
      onButton1Press: hideAlert,
      button2: language.GENERATE_CODE_FORM_BUTTON_NEXT,
      onButton2Press: goToRegisterAtm,
      onClose: hideAlert,
      button1Color: 'black',
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function checkKtpDukcapil(navigation) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const ktpId = result(state, 'form.SavingForm1.values.ktpId', '');
    const maritalStatus = result(
      state,
      'form.SavingForm1.values.maritalStatus.code',
      '',
    );
    const dob = moment(
      result(state, 'form.SavingForm1.values.birthDate', ''),
    ).format('YYYY-MM-DD');
    const mothersMaiden = result(
      state,
      'form.SavingForm1.values.mothersMaiden',
      '',
    );
    const payload = {ktpId, maritalStatus, dob, mothersMaiden};

    return api
      .dukcapilKTP(payload, dispatch)
      .then(res => {
        const responseCode = result(res, 'data.responseCode', '');
        const dataDukcapil = result(res, 'data.dataDukcapil', '');
        const name = result(res, 'data.name', '');
        dispatch(actionCreators.saveDukcapil(dataDukcapil));
        dispatch(actionCreators.saveOpenAccountDataName(name));
        dispatch(actionCreators.hideSpinner());
        if (responseCode === '00') {
          dispatch(checkFromEDW(navigation, res));
        } else {
          const formid = result(state, 'ccCode', '');
          const accountList = result(state, 'accounts', []);
          const emoneyAccount = find(accountList, {
            accountType: 'emoneyAccount',
          });
          const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
          const phoneNumber = emoneyNoAcc.substring(2, emoneyNoAcc.length);
          const mobileNumber =
            formatMobileNumberEmoneyRegistration(
              result(state, 'openAccountData.mobileNumber', ''),
            ) !== ''
              ? formatMobileNumberEmoneyRegistration(
                  result(state, 'openAccountData.mobileNumber', ''),
                )
              : formatMobileNumberEmoneyRegistration(phoneNumber);
          const flow = 'NTB';
          const messageError = result(res, 'data.responseMessage', '');
          const referralCode =
            result(state, 'openAccountData.referralCode', '') === ''
              ? ' '
              : result(state, 'openAccountData.referralCode', '');
          const cifCode =
            result(state, 'user.profile.customer.cifCode', '') === ''
              ? ' '
              : result(state, 'user.profile.customer.cifCode', '');
          const lang = result(state, 'currentLanguage.id', '');
          const requestData = {
            formid,
            ktpId,
            mobileNumber,
            flow,
            messageError,
            referralCode,
            cifCode,
            lang,
          };
          const targetUrl = 'rejectDataSave';
          const type = 'post';
          const auth = 'EFORMCENTRAL|s3cuR3p455w0rD3f0rM';

          const username = 'EFORMCENTRAL';
          const password = 's3cuR3p455w0rD3f0rM';

          const isNotEncrypt = result(
            state,
            'config.InactiveEncryptEformKey',
            null,
          );
          let payload = {};
          let apiName = '';

          if (isNotEncrypt === null) {
            payload = {requestData, targetUrl, type, auth};
            apiName = 'eformGeneral';
          } else {
            payload = {requestData, targetUrl, type, username, password};
            apiName = 'eformGeneralNoAuth';
          }

          dispatch(actionCreators.showSpinner());
          return api[apiName](payload, dispatch).then(() => {
            dispatch(actionCreators.hideSpinner());
            dispatch(
              StackActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({routeName: 'Landing'}),
                  NavigationActions.navigate({
                    routeName: 'SavingDukcapilNotMatch',
                  }),
                ],
              }),
            );
          });
        }
      })
      .catch(err => {
        const errorCode = result(err, 'data.data.responseCode', '99');
        dispatch(actionCreators.hideSpinner());
        if (errorCode === '98') {
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'Landing'}),
                NavigationActions.navigate({
                  routeName: 'SavingDukcapilNotMatch',
                }),
              ],
            }),
          );
        } else {
          Toast.show(
            getErrorMessage(err, language.APP_ERROR__TITLE),
            Toast.LONG,
          );
        }
      });
  };
}

export function checkFromEDW(navigation = {}, resData = {}) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const ID = result(state, 'form.SavingForm1.values.ktpId', '');
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const token = result(resData, 'data.token', '');
    const payload = {ID, token};
    return api
      .getCustomerProfile(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const responseCode = result(res, 'data.responseCode', '');
        const resCustProfile = result(
          res,
          'data.responseGetCustomerProfileForUpgradeMap',
          {},
        );
        const isExist = result(resCustProfile, 'isExist', 'false');
        if (responseCode === '00') {
          if (isExist === 'true') {
            dispatch(accountRegistered(cifCode));
          } else {
            dispatch(
              change(
                'SavingForm1',
                'ktpId2',
                result(res, 'data.dataDukcapil.0~2~5', ''),
              ),
            );
            dispatch(
              change(
                'SavingForm1',
                'maritalStatus2',
                result(res, 'data.dataDukcapil.0~2~6', ''),
              ),
            );
            dispatch(
              change(
                'SavingForm1',
                'dob2',
                result(res, 'data.dataDukcapil.0~2~7', ''),
              ),
            );
            dispatch(
              change(
                'SavingForm1',
                'mothersMaiden2',
                result(res, 'data.dataDukcapil.0~2~8', ''),
              ),
            );
            dispatch(
              change(
                'SavingForm1',
                'birthPlace',
                result(res, 'data.dataDukcapil.0~2~9', ''),
              ),
            );

            dispatch(
              change(
                'SavingForm2',
                'country2',
                result(res, 'data.dataDukcapil.0~3~1', ''),
              ),
            );
            dispatch(
              change(
                'SavingForm2',
                'province2',
                result(res, 'data.dataDukcapil.0~3~2', ''),
              ),
            );
            dispatch(
              change(
                'SavingForm2',
                'city2',
                result(res, 'data.dataDukcapil.0~3~3', ''),
              ),
            );
            dispatch(
              change(
                'SavingForm2',
                'district2',
                result(res, 'data.dataDukcapil.0~3~4', ''),
              ),
            );
            dispatch(
              change(
                'SavingForm2',
                'subDistrict2',
                result(res, 'data.dataDukcapil.0~3~5', ''),
              ),
            );
            dispatch(
              change(
                'SavingForm2',
                'postalCode2',
                result(res, 'data.dataDukcapil.0~3~6', ''),
              ),
            );
            dispatch(
              change(
                'SavingForm2',
                'streetAddress2',
                result(res, 'data.dataDukcapil.0~3~8', ''),
              ),
            );

            const rtrw2 = split(
              result(res, 'data.dataDukcapil.0~3~7', ''),
              '/',
              2,
            );
            const rt2 = rtrw2[0] || '';
            const rw2 = rtrw2[1] || '';
            dispatch(change('SavingForm2', 'rt2', rt2));
            dispatch(change('SavingForm2', 'rw2', rw2));

            const checkpoint = result(
              navigation,
              'state.params.checkpoint',
              false,
            );
            const statusForm = 'NEXT';
            const pageName = 'SavingAccountForm2';
            dispatch(getCheckpointSA(statusForm, pageName, checkpoint));
          }
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.EMONEY__EDW_PROFILE_FAILED),
          Toast.LONG,
        );
      });
  };
}

export function receiveCreditCardProvince() {
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
    const code = result(formValues[`${fieldName}`], 'code', '');
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

export function getDistrictList(formName, fieldName) {
  return (dispatch, getState) => {
    const state = getState();
    const formValues = state.form[`${formName}`].values;
    const code = result(formValues[`${fieldName}`], 'code', '');
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

export function getSubDistrictList(formName, fieldName) {
  return (dispatch, getState) => {
    const state = getState();
    const formValues = state.form[`${formName}`].values;
    const code = result(formValues[`${fieldName}`], 'code', '');
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

export function prefilledFromDukcapil(navigation) {
  return (dispatch, getState) => {
    const state = getState();

    const usingKtpData = result(
      state,
      'form.SavingForm2.values.usingKtpData',
      true,
    );
    const listDukcapil = result(state, 'listDukcapil', {});

    if (usingKtpData === true) {
      dispatch(
        change('SavingForm2', 'province', {
          code: result(listDukcapil, '0~3~2', ''),
          name: result(listDukcapil, '0~3~2', ''),
          value: result(listDukcapil, '0~3~2', ''),
        }),
      );
      dispatch(
        change('SavingForm2', 'city', {
          code: result(listDukcapil, '0~3~3', ''),
          name: result(listDukcapil, '0~3~3', ''),
          value: result(listDukcapil, '0~3~3', ''),
        }),
      );
      dispatch(
        change('SavingForm2', 'district', {
          code: result(listDukcapil, '0~3~4', ''),
          name: result(listDukcapil, '0~3~4', ''),
          value: result(listDukcapil, '0~3~4', ''),
        }),
      );
      dispatch(
        change('SavingForm2', 'subDistrict', {
          code: result(listDukcapil, '0~3~5', ''),
          name: result(listDukcapil, '0~3~5', ''),
          value: result(listDukcapil, '0~3~5', ''),
          zipCode: result(listDukcapil, '0~3~6', ''),
        }),
      );
      const postalCode = result(listDukcapil, '0~3~6', '');
      if (postalCode === '') {
        const inputtedPostalCode = result(
          state,
          'form.PostalCodeForm.values.postalCode',
          '',
        );
        dispatch(change('SavingForm2', 'postalCode', inputtedPostalCode));
      } else {
        dispatch(change('SavingForm2', 'postalCode', postalCode));
      }
      const rtrw = split(result(listDukcapil, '0~3~7', ''), '/');
      dispatch(change('SavingForm2', 'rt', rtrw[0]));
      dispatch(change('SavingForm2', 'rw', rtrw[1]));
      dispatch(
        change(
          'SavingForm2',
          'streetAddress',
          result(listDukcapil, '0~3~8', ''),
        ),
      );
    }

    const checkpoint = result(navigation, 'state.params.checkpoint', false);
    const existing = result(navigation, 'state.params.existing', false);
    const statusForm = 'NEXT';
    const pageName = 'SavingAccountForm3';
    dispatch(createCreditCardForm(statusForm, pageName, checkpoint, existing));
  };
}

export function getCheckpointSA(statusForm, pageName, checkpoint) {
  return (dispatch, getState) => {
    const state = getState();
    const idNumber = result(state, 'form.SavingForm1.values.ktpId', '');
    const accountList = result(state, 'accounts', []);
    const emoneyAccount = find(accountList, {accountType: 'emoneyAccount'});
    const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
    const phoneNumber = emoneyNoAcc.substring(2, emoneyNoAcc.length);
    const mobileNumber = formatMobileNumberEmoneyRegistration(phoneNumber);
    const productType = 'savingAccount';
    const postalCode = result(state, 'listDukcapil.0~3~6', '');
    const formCode = result(state, 'ccCode', '');
    const lang = result(state, 'currentLanguage.id', '');
    const requestData = {mobileNumber, ktpId: idNumber, productType, lang};
    const targetUrl = 'getData';
    const type = 'post';
    const auth = 'EFORMCENTRAL|s3cuR3p455w0rD3f0rM';

    const username = 'EFORMCENTRAL';
    const password = 's3cuR3p455w0rD3f0rM';

    const isNotEncrypt = result(state, 'config.InactiveEncryptEformKey', null);
    let payload = {};
    let apiName = '';

    if (isNotEncrypt === null) {
      payload = {requestData, targetUrl, type, auth};
      apiName = 'eformGeneral';
    } else {
      payload = {requestData, targetUrl, type, username, password};
      apiName = 'eformGeneralNoAuth';
    }

    dispatch(actionCreators.showSpinner());
    return api[apiName](payload, dispatch)
      .then(res => {
        if (result(res, 'data.responseCode', '') === '00') {
          const checkpointData = result(
            res,
            'data.data.dataQuery.0.rawData.dataSubmit',
            {},
          );
          const checkpointPageName = result(
            res,
            'data.data.dataQuery.0.pageName',
            '',
          );
          const checkpointEmail = result(
            res,
            'data.data.dataQuery.0.email',
            '',
          );

          const statusAddress = result(
            res,
            'data.data.dataQuery.0.statusAddress',
            '',
          );
          let useKtp = false;
          if (statusAddress === 'CHECKED') {
            useKtp = true;
          } else {
            useKtp = false;
          }
          dispatch(change('SavingForm2', 'usingKtpData', useKtp));
          dispatch(change('EmailForm', 'email', checkpointEmail));

          forEach(checkpointData, data => {
            forEach(data, form => {
              const formName = getSavingFormName(form.code);
              const formData = result(form, 'value', {});
              forEach(formData, item => {
                if (item.value !== '') {
                  if (item.code === '0~4~7') {
                    const rtrw = split(item.value, '/');
                    dispatch(change(formName, 'rt', rtrw[0]));
                    dispatch(change(formName, 'rw', rtrw[1]));
                  } else if (item.code === '1~1~13') {
                    const rtrw = split(item.value, '/');
                    dispatch(change(formName, 'companyRT', rtrw[0]));
                    dispatch(change(formName, 'companyRW', rtrw[1]));
                  } else {
                    if (item.code === '0~3~6') {
                      dispatch(
                        change(
                          formName,
                          'postalCode',
                          result(item, 'value.code', ''),
                        ),
                      );
                    } else if (item.code === '1~1~12') {
                      dispatch(
                        change(
                          formName,
                          'companyPostalCode',
                          result(item, 'value.code', ''),
                        ),
                      );
                    } else if (item.code === '2~5~9') {
                      dispatch(
                        change(
                          formName,
                          'emergencyPostalCode',
                          result(item, 'value.code', ''),
                        ),
                      );
                    }
                    const fieldName = getFieldName(item);
                    let value = result(item, 'value', null);
                    dispatch(change(formName, fieldName, value));
                  }
                }
              });
            });
          });
          const state = getState();
          const npwpNumber = result(
            state,
            'form.SavingForm7.values.npwpNumber',
            '',
          );
          const npwpForm = result(state, 'form.CameraNPWPForm.values', '');
          const pageName = changeFormByCode(
            checkpointPageName,
            formCode,
            npwpNumber,
            npwpForm,
          );

          let CCFormData2Filtered = {values: {}};
          forEach(
            result(state, 'form.SavingForm2.values', {}),
            (value, key) => {
              if (!endsWith(key, '2')) {
                CCFormData2Filtered.values[`${key}`] = value;
              }
            },
          );
          const allData = [
            result(state, 'form.SavingForm1', {}),
            CCFormData2Filtered,
            result(state, 'form.SavingForm3', {}),
            result(state, 'form.SavingForm4', {}),
            result(state, 'form.SavingForm5', {}),
            result(state, 'form.SavingForm7', {}),
          ];
          let progress = 0;
          forEach(allData, data => {
            if (!isEmpty(result(data, 'values', {}))) {
              progress++;
            }
          });

          const imageNpwp = result(
            state,
            'form.npwpImage.values.npwpImage',
            '',
          );

          if (npwpNumber !== '' && imageNpwp !== '') {
            dispatch(change('SavingForm7', 'reasonNoNPWP', ''));
          } else if (npwpNumber === '' && imageNpwp !== '') {
            dispatch(change('CameraNPWPForm', 'npwpImage', ''));
          }

          const remainingProgress = 10 - progress;
          const dataQuery = result(res, 'data.data.dataQuery', {});
          dispatch(
            actionCreators.saveCheckpoint({
              ...dataQuery,
              remainingProgress,
              progress,
              pageName,
              statusAddress,
            }),
          );
          dispatch(actionCreators.hideSpinner());
          const npwpImage = result(
            checkpointData,
            'stage2.2.value.0.value',
            '',
          );
          const ktpImage = result(checkpointData, 'stage0.0.value.0.value', '');
          dispatch(actionCreators.saveOpenAccountData({npwpImage, ktpImage}));
          dispatch(NavigationActions.navigate({routeName: 'SavingCheckpoint'}));
        } else {
          const email = result(state, 'user.profile.email', '');
          if (
            postalCode === '' ||
            isNaN(postalCode) ||
            postalCode.length < 5 ||
            email === ''
          ) {
            dispatch(actionCreators.hideSpinner());
            dispatch(
              NavigationActions.navigate({routeName: 'SavingMissingForm'}),
            );
          } else {
            dispatch(createCreditCardForm(statusForm, pageName, checkpoint));
          }
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
      });
  };
}

export function createCreditCardForm(
  statusForm,
  pageName,
  checkpoint = false,
  existing = false,
) {
  return (dispatch, getState) => {
    if (pageName.toLowerCase().includes('camera')) {
      if (Platform.OS === 'android') {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then(
          res => {
            if (!res) {
              PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
              ).then(result => {
                if (result !== 'granted') {
                  dispatch(actionCreators.hideSpinner());
                  return Promise.resolve();
                } else {
                  dispatch(actionCreators.hideSpinner());
                }
              });
            }
          },
        );
      } else {
        Permissions.check('ios.permission.CAMERA').then(response => {
          if (response !== 'granted') {
            Permissions.request('ios.permission.CAMERA').then(response => {
              if (response !== 'granted') {
                dispatch(actionCreators.hideSpinner());
                Toast.show(
                  'Go to settings, allow Simobi+ to access device camera',
                  Toast.LONG,
                );
                return Promise.resolve();
              } else {
                dispatch(actionCreators.hideSpinner());
              }
            });
          }
        });
      }
    }

    const state = getState();
    dispatch(actionCreators.showSpinner());
    const formid = result(state, 'ccCode', '');
    const name =
      result(state, 'openAccountData.name', '') === ''
        ? result(state, 'user.profile.name', '')
        : result(state, 'openAccountData.name', '');
    const referralCode = result(state, 'openAccountData.referralCode', '');
    const email = result(state, 'form.EmailForm.values.email', '');
    const id = result(state, 'openAccountData.id', '');
    const accountList = result(state, 'accounts', []);
    const emoneyAccount = find(accountList, {accountType: 'emoneyAccount'});
    const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
    const phoneNumber = emoneyNoAcc.substring(2, emoneyNoAcc.length);
    const mobileNumber = formatMobileNumberEmoneyRegistration(phoneNumber);

    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const accessFrom = 'v3';
    const transRefNum = result(state, 'transRefNum', '');

    // KTP Camera
    const ktpImage = result(state, 'openAccountData.ktpImage', '');

    const coreData = result(state, 'openAccountData.coreData', []);

    // First Form
    const ktpId =
      result(state, 'form.SavingForm1.values.ktpId', '') === ''
        ? result(state, 'openAccountData.ktpId', '')
        : result(state, 'form.SavingForm1.values.ktpId', '');
    const maritalStatus = result(
      state,
      'form.SavingForm1.values.maritalStatus',
      '',
    );
    const dob =
      result(state, 'form.SavingForm1.values.birthDate', '') === ''
        ? ''
        : moment(result(state, 'form.SavingForm1.values.birthDate', '')).format(
            'YYYY-MM-DD',
          );
    const mothersMaiden = result(
      state,
      'form.SavingForm1.values.mothersMaiden',
      '',
    );
    const ktpId2 = result(state, 'form.SavingForm1.values.ktpId2', '');
    const maritalStatus2 = result(
      state,
      'form.SavingForm1.values.maritalStatus2',
      '',
    );
    const dob2 = result(state, 'form.SavingForm1.values.dob2', '');
    const mothersMaiden2 = result(
      state,
      'form.SavingForm1.values.mothersMaiden2',
      '',
    );
    const birthPlace = result(state, 'form.SavingForm1.values.birthPlace', '');
    const religion = result(state, 'listDukcapil.0~2~10', '');
    const gender = result(state, 'listDukcapil.0~2~11', '');

    // Second Form
    const country = isEmpty(result(state, 'form.SavingForm2.values', {}))
      ? ''
      : 'Indonesia';
    const province = result(state, 'form.SavingForm2.values.province', '');
    const city = result(state, 'form.SavingForm2.values.city', '');
    const district = result(state, 'form.SavingForm2.values.district', '');
    const subDistrict = result(
      state,
      'form.SavingForm2.values.subDistrict',
      '',
    );
    const postalCode = result(state, 'form.SavingForm2.values.postalCode', '');
    const rt = result(state, 'form.SavingForm2.values.rt', '');
    const rw = result(state, 'form.SavingForm2.values.rw', '');
    const rtRw = rt === '' && rw === '' ? '' : rt + '/' + rw;
    const streetAddress = result(
      state,
      'form.SavingForm2.values.streetAddress',
      '',
    );

    const usingKtpData = result(
      state,
      'form.SavingForm2.values.usingKtpData',
      true,
    );
    const statusAddress = usingKtpData ? 'CHECKED' : 'UNCHECKED';

    const country2 = result(state, 'form.SavingForm2.values.country2', '');
    const province2 = result(state, 'form.SavingForm2.values.province2', '');
    const city2 = result(state, 'form.SavingForm2.values.city2', '');
    const district2 = result(state, 'form.SavingForm2.values.district2', '');
    const subDistrict2 = result(
      state,
      'form.SavingForm2.values.subDistrict2',
      '',
    );
    const postalCode2 = result(
      state,
      'form.SavingForm2.values.postalCode2',
      '',
    );
    const rt2 = result(state, 'form.SavingForm2.values.rt2', '');
    const rw2 = result(state, 'form.SavingForm2.values.rw2', '');
    const rtRw2 = rt2 === '' && rw2 === '' ? '' : rt2 + '/' + rw2;
    const streetAddress2 = result(
      state,
      'form.SavingForm2.values.streetAddress2',
      '',
    );

    // Third Form
    const work = result(state, 'form.SavingForm3.values.work', '');
    const monthlyIncome = result(
      state,
      'form.SavingForm3.values.monthlyIncome',
      '',
    );
    const sourceOfFund = result(
      state,
      'form.SavingForm3.values.sourceOfFund',
      '',
    );

    // Fourth Form
    const workTitle = result(state, 'form.SavingForm4.values.workTitle', '');
    const workPosition = result(
      state,
      'form.SavingForm4.values.workPosition',
      '',
    );
    const industry = result(state, 'form.SavingForm4.values.industry', '');
    const companyName = result(
      state,
      'form.SavingForm4.values.companyName',
      '',
    );
    const companyAddress = result(
      state,
      'form.SavingForm4.values.companyAddress',
      '',
    );
    const companyPhoneNumber = result(
      state,
      'form.SavingForm4.values.companyPhoneNumber',
      '',
    );
    const companyCountry = isEmpty(result(state, 'form.SavingForm4.values', {}))
      ? ''
      : 'Indonesia';
    const companyProvince = result(
      state,
      'form.SavingForm4.values.companyProvince',
      '',
    );
    const companyCity = result(
      state,
      'form.SavingForm4.values.companyCity',
      '',
    );
    const companyDistrict = result(
      state,
      'form.SavingForm4.values.companyDistrict',
      '',
    );
    const companySubDistrict = result(
      state,
      'form.SavingForm4.values.companySubDistrict',
      '',
    );
    const companyPostalCode = result(
      state,
      'form.SavingForm4.values.companyPostalCode',
      '',
    );
    const companyrt = result(state, 'form.SavingForm4.values.companyRT', '');
    const companyrw = result(state, 'form.SavingForm4.values.companyRW', '');
    const companyRtRw =
      companyrt === '' && companyrw === '' ? '' : companyrt + '/' + companyrw;

    // Fifth Form
    const lastEducation = result(
      state,
      'form.SavingForm5.values.lastEducation',
      '',
    );
    const purposeOfOpening = result(
      state,
      'form.SavingForm5.values.purposeOfOpening',
      '',
    );
    const numberOfDebit = result(
      state,
      'form.SavingForm5.values.numberOfDebit',
      '',
    );
    const debitPerMonth = result(
      state,
      'form.SavingForm5.values.debitPerMonth',
      '',
    );
    const numberOfCredit = result(
      state,
      'form.SavingForm5.values.numberOfCredit',
      '',
    );
    const creditPerMonth = result(
      state,
      'form.SavingForm5.values.creditPerMonth',
      '',
    );
    const numberOfDependant = cifCode.includes('NK')
      ? result(state, 'form.SavingForm5.values.numberOfDependant', '')
      : result(state, 'form.SavingForm3.values.numberOfDependant2', '');

    // Sixth Form
    const npwpNumber = result(state, 'form.SavingForm7.values.npwpNumber', '');
    const reasonNoNPWP =
      npwpNumber === ''
        ? result(state, 'form.SavingForm7.values.reasonNoNPWP', '')
        : '';

    // NPWP Camera
    const npwpImage =
      result(state, 'openAccountData.npwpImage', '') === ''
        ? result(state, 'form.CameraNPWPForm.values.imageData', '')
        : result(state, 'openAccountData.npwpImage', '');

    const checkpointPage = checkpoint
      ? result(state, 'checkpoint.pageName', '')
      : pageName;

    const dataAdditional = {
      usernameOrami: result(state, 'paramsDeeplinkObject.usernameOrami', ''),
    };

    const formData = {
      formid,
      name,
      email,
      mobileNumber,
      ktpId,
      cifCode,
      pageName: checkpointPage,
      statusAddress,
      referralCode,
      id,
      dataSubmit: {
        stage0: [
          {
            code: '0~1',
            value: [
              {
                code: '0~1~1',
                value: ktpImage,
              },
            ],
          },
          {
            code: '0~2',
            value: [
              {
                code: '0~2~1',
                value: ktpId,
              },
              {
                code: '0~2~2',
                value: maritalStatus,
              },
              {
                code: '0~2~3',
                value: dob,
              },
              {
                code: '0~2~4',
                value: mothersMaiden,
              },
              {
                code: '0~2~5',
                value: ktpId2,
              },
              {
                code: '0~2~6',
                value: maritalStatus2,
              },
              {
                code: '0~2~7',
                value: dob2,
              },
              {
                code: '0~2~8',
                value: mothersMaiden2,
              },
              {
                code: '0~2~9',
                value: birthPlace,
              },
              {
                code: '0~2~10',
                value: religion,
              },
              {
                code: '0~2~11',
                value: gender,
              },
            ],
          },
          {
            code: '0~3',
            value: [
              {
                code: '0~3~1',
                value: country2,
              },
              {
                code: '0~3~2',
                value: province2,
              },
              {
                code: '0~3~3',
                value: city2,
              },
              {
                code: '0~3~4',
                value: district2,
              },
              {
                code: '0~3~5',
                value: subDistrict2,
              },
              {
                code: '0~3~6',
                value: postalCode2,
              },
              {
                code: '0~3~7',
                value: rtRw2,
              },
              {
                code: '0~3~8',
                value: streetAddress2,
              },
            ],
          },
          {
            code: '0~4',
            value: [
              {
                code: '0~4~1',
                value: country,
              },
              {
                code: '0~4~2',
                value: province,
              },
              {
                code: '0~4~3',
                value: city,
              },
              {
                code: '0~4~4',
                value: district,
              },
              {
                code: '0~4~5',
                value: subDistrict,
              },
              {
                code: '0~4~6',
                value: postalCode,
              },
              {
                code: '0~4~7',
                value: rtRw,
              },
              {
                code: '0~4~8',
                value: streetAddress,
              },
            ],
          },
          {
            code: '0~5',
            value: [
              {
                code: '0~5~1',
                value: work,
              },
              {
                code: '0~5~2',
                value: monthlyIncome,
              },
              {
                code: '0~5~3',
                value: sourceOfFund,
              },
            ],
          },
          {code: '0~6', value: coreData},
        ],

        stage1: [
          {
            code: '1~1',
            value: [
              {
                code: '1~1~1',
                value: workTitle,
              },
              {
                code: '1~1~2',
                value: workPosition,
              },
              {
                code: '1~1~3',
                value: industry,
              },
              {
                code: '1~1~4',
                value: companyName,
              },
              {
                code: '1~1~5',
                value: companyAddress,
              },
              {
                code: '1~1~6',
                value: companyPhoneNumber,
              },
              {
                code: '1~1~7',
                value: companyCountry,
              },
              {
                code: '1~1~8',
                value: companyProvince,
              },
              {
                code: '1~1~9',
                value: companyCity,
              },
              {
                code: '1~1~10',
                value: companyDistrict,
              },
              {
                code: '1~1~11',
                value: companySubDistrict,
              },
              {
                code: '1~1~12',
                value: companyPostalCode,
              },
              {
                code: '1~1~13',
                value: companyRtRw,
              },
            ],
          },
          {
            code: '1~2',
            value: [
              {
                code: '1~2~1',
                value: lastEducation,
              },
              {
                code: '1~2~2',
                value: purposeOfOpening,
              },
              {
                code: '1~2~3',
                value: numberOfDebit,
              },
              {
                code: '1~2~4',
                value: debitPerMonth,
              },
              {
                code: '1~2~5',
                value: numberOfCredit,
              },
              {
                code: '1~2~6',
                value: creditPerMonth,
              },
              {
                code: '1~2~7',
                value: numberOfDependant.toString(),
              },
            ],
          },
        ],
        stage2: [
          {
            code: '2~2',
            value: [
              {
                code: '2~2~1',
                value: npwpNumber,
              },
              {
                code: '2~2~2',
                value: reasonNoNPWP,
              },
            ],
          },
          {
            code: '2~3',
            value: [
              {
                code: '2~3~1',
                value: npwpImage,
              },
            ],
          },
        ],
      },
      dataAdditional,
    };
    const lang = result(state, 'currentLanguage.id', '');
    const requestData = {transRefNum, accessFrom, formData, statusForm, lang};
    const targetUrl = 'registration';
    const type = 'post';
    const auth = 'EFORMCENTRAL|s3cuR3p455w0rD3f0rM';

    const username = 'EFORMCENTRAL';
    const password = 's3cuR3p455w0rD3f0rM';

    const isNotEncrypt = result(state, 'config.InactiveEncryptEformKey', null);
    let payload = {};
    let apiName = '';

    if (isNotEncrypt === null) {
      payload = {requestData, targetUrl, type, auth};
      apiName = 'eformGeneral';
    } else {
      payload = {requestData, targetUrl, type, username, password};
      apiName = 'eformGeneralNoAuth';
    }

    return api[apiName](payload, dispatch)
      .then(res => {
        const dataId = result(res, 'data.id', '');
        dispatch(actionCreators.saveOpenAccountDataId(dataId));
        if (pageName === 'SavingAccountFinalize') {
          dispatch(actionCreators.clearOpenAccountData());
        }
        if (checkpoint) {
          if (pageName === 'SavingNPWPCamera') {
            let dataCheckpoint = result(state, 'checkpoint', {});
            const newPageName = pageName;
            dispatch(
              actionCreators.saveCheckpoint({
                ...dataCheckpoint,
                pageName: newPageName,
              }),
            );
          }
          dispatch(NavigationActions.back());
          dispatch(actionCreators.hideSpinner());
        } else if (pageName === 'SavingAccountForm1') {
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'Landing'}),
                NavigationActions.navigate({routeName: pageName}),
              ],
            }),
          );
        } else if (statusForm === 'SUBMIT') {
          dispatch(actionCreators.hideSpinner());
          // const utmSource = result(state, 'utmAndDataLink', {});
          // const utm = result(utmSource, 'utm', '');
          // const referralCode = result(utmSource, 'referralCode', '');
          // const typeActivation = result(utmSource, 'typeActivation', '');
          // const codeProduct = result(utmSource, 'codeProduct', '');
          // const stringEvent = 'PRM_SBT_' + utm + '_PM_' + referralCode + '_PD_' + codeProduct + '_ACT_' + typeActivation;
          // if (utm !== '' && referralCode !== '') {
          //   Analytics.logEvent(stringEvent);
          // }
          const name = result(res, 'data.name', '');
          const ticketCode = result(res, 'data.ktpId', '');
          const mobileNumber = result(res, 'data.mobileNumber', '');
          dispatch(
            NavigationActions.navigate({
              routeName: pageName,
              params: {name, ticketCode, mobileNumber},
            }),
          );
          dispatch(actionCreators.clearParamsLinkSavingOrCC({}));
        } else {
          dispatch(actionCreators.hideSpinner());
          dispatch(
            NavigationActions.navigate({
              routeName: pageName,
              params: {existing},
              pageName,
            }),
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

export function createSavingAccount(formValues) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const lang = result(state, 'currentLanguage.id', 'id');
    const securityMode = '3';
    const selectedAccount = result(formValues, 'myAccount', '');
    const bankBranch = result(formValues, 'myAccount.bankBranch.code', '');
    const debitAccountNumber = result(
      formValues,
      'myAccount.accountNumber',
      '',
    );
    const currency = result(formValues, 'myAccount.currency', '');
    const emailAddress = result(state, 'form.EmailForm.values.email', '');
    const name = result(state, 'user.profile.name', '');
    const transRefNum = result(state, 'transRefNum', '');
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const productType = result(state, 'productData.productType', '');
    const initialDeposit = result(state, 'productData.productDeposit', '');

    const payload = {
      securityMode,
      transRefNum,
      cifCode,
      name,
      productType,
      bankBranch,
      debitAccountNumber,
      currency,
      initialDeposit,
      emailAddress,
    };
    const transactionType =
      lang === 'id'
        ? language.SAVING__ACCOUNT_TRANSACTION_TYPE
        : language.SAVING__ACCOUNT_TRANSACTION_TYPE;
    const isSaving = 'yes';
    const modalOptions = {
      amount: `Rp ${currencyFormatter(initialDeposit)}`,
      transactionType,
      transactionId: transRefNum,
      accountFrom: selectedAccount,
      isSaving,
      initialDeposit,
    };
    const flagMgm = result(state, 'config.hideNotifMGM', '');
    const flagMgmOn = lowerCase(flagMgm) === 'yes';
    dispatch(
      actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}),
    );
    dispatch(actionCreators.showSpinner());
    return api
      .registerSavingAccount(payload, dispatch)
      .then(res => {
        const isPending = result(res, 'data.isPending', false);
        const accountTo = result(res, 'data', {});
        const resultDisplay = result(res, 'data.result.displayList', []);
        dispatch(actionCreators.hideSpinner());
        dispatch(refreshStorageNew());
        const type = isPending ? 'PENDING' : 'SUCCESS';
        dispatch(
          actionCreators.showPaymentModal({
            ...modalOptions,
            resultDisplay,
            type: type,
            accountTo,
          }),
        );
        dispatch(destroy('SourceAccountForm'));
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'AccountMenu'}),
              NavigationActions.navigate({routeName: 'PaymentStatusNew'}),
            ],
          }),
        );
        if (!flagMgmOn) {
          dispatch(popUpRewardMgm());
        }
        dispatch(actionCreators.clearTransRefNum());
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
          dispatch(destroy('SourceAccountForm'));
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'AccountMenu'}),
                NavigationActions.navigate({routeName: 'PaymentStatusNew'}),
              ],
            }),
          );
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          const resultDisplay = result(err, 'data.result.displayList', []);
          const errorText = getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_PAY_BILL,
          );
          dispatch(
            errorResponseResult(
              err,
              modalOptions,
              resultDisplay,
              errorText,
              selectedAccount,
            ),
          );
        }
      });
  };
}

export function getListSavingProduct() {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const ipassport = result(getState(), 'user.ipassport', '');
    const newIpass = isLogin ? ipassport : null;
    const payload = {ipassport: newIpass};
    api
      .getSavingProducts(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.saveListSaving(result(res, 'data.config', [])));
        dispatch(
          NavigationActions.navigate({routeName: 'ChooseSavingAccount'}),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
      });
  };
}

export function prefilledDukcapilSavingAccount(data, maritalStatus) {
  return dispatch => {
    dispatch(change('SavingForm1', 'ktpId', result(data, '0~2~5', '')));
    dispatch(change('SavingForm1', 'maritalStatus', maritalStatus));
    dispatch(change('SavingForm1', 'birthDate', result(data, '0~2~7', '')));
    dispatch(change('SavingForm1', 'mothersMaiden', result(data, '0~2~8', '')));

    dispatch(change('SavingForm1', 'ktpId2', result(data, '0~2~5', '')));
    dispatch(
      change('SavingForm1', 'maritalStatus2', result(data, '0~2~6', '')),
    );
    dispatch(change('SavingForm1', 'dob2', result(data, '0~2~7', '')));
    dispatch(
      change('SavingForm1', 'mothersMaiden2', result(data, '0~2~8', '')),
    );
    dispatch(change('SavingForm1', 'birthPlace', result(data, '0~2~9', '')));

    dispatch(change('SavingForm2', 'country2', result(data, '0~3~1', '')));
    dispatch(change('SavingForm2', 'province2', result(data, '0~3~2', '')));
    dispatch(change('SavingForm2', 'city2', result(data, '0~3~3', '')));
    dispatch(change('SavingForm2', 'district2', result(data, '0~3~4', '')));
    dispatch(change('SavingForm2', 'subDistrict2', result(data, '0~3~5', '')));
    dispatch(change('SavingForm2', 'postalCode2', result(data, '0~3~6', '')));
    dispatch(
      change('SavingForm2', 'streetAddress2', result(data, '0~3~8', '')),
    );

    const rtrw2 = split(result(data, '0~3~7', ''), '/', 2);
    const rt2 = rtrw2[0] || '';
    const rw2 = rtrw2[1] || '';
    dispatch(change('SavingForm2', 'rt2', rt2));
    dispatch(change('SavingForm2', 'rw2', rw2));
  };
}

export function createSimasTara(data) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const lang = result(state, 'currentLanguage.id', 'id');
    const securityMode = '3';
    const selectedAccount = result(
      state,
      'form.SimasTaraSimulation.values.AccNo',
      '',
    );
    const transRefNum = result(state, 'transRefNum', '');
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const name = result(state, 'user.profile.name', '');
    const productType = result(state, 'productData.productType', '');
    const bankBranch = result(
      state,
      'form.SimasTaraSimulation.values.AccNo.bankBranch.code',
      '',
    );
    const debitAccountNumber = result(
      state,
      'form.SimasTaraSimulation.values.AccNo.accountNumber',
      '',
    );
    const period = parseInt(result(data, 'counting', '')) * 12;
    const accountPeriod = period + 'M';
    const currency = result(
      state,
      'form.SimasTaraSimulation.values.AccNo.currency',
      '',
    );
    const emailAddress = result(state, 'form.EmailForm.values.email', '');
    const initialDeposit = result(data, 'amountSlider', '').toString();
    const estimatedRate = result(data, 'interest', '').toString();
    const payload = {
      securityMode,
      transRefNum,
      cifCode,
      name,
      productType,
      bankBranch,
      debitAccountNumber,
      currency,
      initialDeposit,
      emailAddress,
      accountPeriod,
      estimatedRate,
    };
    const transactionType =
      lang === 'id'
        ? language.SAVING__ACCOUNT_TRANSACTION_TYPE
        : language.SAVING__ACCOUNT_TRANSACTION_TYPE;
    const isSaving = 'SimasTara';
    const modalOptions = {
      amount: `Rp ${currencyFormatter(initialDeposit)}`,
      transactionType,
      transactionId: transRefNum,
      accountFrom: selectedAccount,
      isSaving,
      initialDeposit,
    };
    const flagMgm = result(state, 'config.hideNotifMGM', '');
    const flagMgmOn = lowerCase(flagMgm) === 'yes';
    dispatch(
      actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}),
    );
    dispatch(actionCreators.showSpinner());
    return api
      .registerSavingAccount(payload, dispatch)
      .then(res => {
        const accountTo = result(res, 'data', {});
        const resultDisplay = result(res, 'data.result.displayList', []);
        dispatch(actionCreators.hideSpinner());
        dispatch(refreshStorageNew());
        dispatch(
          actionCreators.showPaymentModal({
            ...modalOptions,
            resultDisplay,
            type: 'SUCCESS',
            accountTo,
          }),
        );
        dispatch(destroy('SimasTaraSimulation'));
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'AccountMenu'}),
              NavigationActions.navigate({routeName: 'PaymentStatusRevamp'}),
            ],
          }),
        );
        if (!flagMgmOn) {
          dispatch(popUpRewardMgm());
        }
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
          dispatch(destroy('SimasTaraSimulation'));
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'AccountMenu'}),
                NavigationActions.navigate({routeName: 'PaymentStatusRevamp'}),
              ],
            }),
          );
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          const resultDisplay = result(err, 'data.result.displayList', []);
          const errorText = getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_PAY_BILL,
          );
          dispatch(
            errorResponseResult(
              err,
              modalOptions,
              resultDisplay,
              errorText,
              selectedAccount,
            ),
          );
        }
      });
  };
}

export function closeSimasTara(
  simasTaraAccNo,
  productType,
  sourceAccNoSimasTara,
) {
  return (dispatch, getState) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToNext = () => {
      dispatch(simasTaraClose());
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const simasTaraClose = () => {
      const state = getState();
      const stAccNumber = simasTaraAccNo;
      const transRefNum = result(state, 'transRefNum', '');
      const payload = {stAccNumber, transRefNum};
      dispatch(actionCreators.showSpinner());
      return api
        .getSimasTaraClose(payload, dispatch)
        .then(() => {
          dispatch(actionCreators.hideSpinner());
          dispatch(refreshStorageNew());
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'Landing'}),
                NavigationActions.navigate({routeName: 'homeRoutes'}),
              ],
            }),
          );
        })
        .catch(error => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(error, language.APP_ERROR__TITLE),
            Toast.LONG,
          );
        });
    };
    const sinarmasModalOptions = {
      heading1: language.SIMAS_TARA_POPUP_HEADING,
      text: language.SIMAS_TARA_POPUP_TEXT1,
      text1:
        productType +
        ' ' +
        sourceAccNoSimasTara +
        ' ' +
        language.SIMAS_TARA_POPUP_TEXT2,
      text2: language.SIMAS_TARA_POPUP_TEXT3,
      button1: language.GENERIC__CANCEL,
      onButton1Press: hideAlert,
      button2: language.GENERIC__OK,
      onButton2Press: goToNext,
      onClose: hideAlert,
    };
    dispatch(
      actionCreators.showSinarmasAlert({
        ...sinarmasModalOptions,
        image: 'CLOSESIMASTARA',
      }),
    );
  };
}

export function getConfigMenuSavingValas() {
  return dispatch => {
    const currency = '';
    const payload = {currency};
    dispatch(actionCreators.showSpinner());
    api
      .getConfigDataSavingValas(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const config = result(res, 'data.config', []);
        dispatch(actionCreators.saveProductsItemSimasValas({config}));
        dispatch(
          NavigationActions.navigate({
            routeName: 'SimasValasProductTypeSelections',
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
      });
  };
}

export function getSavingValasAUD() {
  return dispatch => {
    const currency = 'AUD';
    const payload = {currency};
    dispatch(actionCreators.showSpinner());
    api
      .getConfigDataSavingValas(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const config = result(res, 'data.config', []);
        const value = find(config, function (prodList) {
          return prodList.productCode === 'SAV';
        });
        const currencySavingValas = currency;
        dispatch(
          actionCreators.saveProductsItem({config, currencySavingValas}),
        );
        dispatch(actionCreators.saveProductData(value));
        dispatch(
          actionCreators.saveProductCode(result(value, 'productCode', '')),
        );
        dispatch(
          actionCreators.saveCcCode(
            result(value, 'productCode', '') + '-SIMOBI-002',
          ),
        );
        dispatch(NavigationActions.navigate({routeName: 'ProductsTnC'}));
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
      });
  };
}

export function getSavingValasCNY() {
  return dispatch => {
    const currency = 'CNY';
    const payload = {currency};
    dispatch(actionCreators.showSpinner());
    api
      .getConfigDataSavingValas(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const config = result(res, 'data.config', []);
        const value = find(config, function (prodList) {
          return prodList.productCode === 'SAV';
        });
        const currencySavingValas = currency;
        dispatch(
          actionCreators.saveProductsItem({config, currencySavingValas}),
        );
        dispatch(actionCreators.saveProductData(value));
        dispatch(
          actionCreators.saveProductCode(result(value, 'productCode', '')),
        );
        dispatch(
          actionCreators.saveCcCode(
            result(value, 'productCode', '') + '-SIMOBI-002',
          ),
        );
        dispatch(NavigationActions.navigate({routeName: 'ProductsTnC'}));
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
      });
  };
}

export function getSavingValasUSD() {
  return dispatch => {
    const currency = 'USD';
    const payload = {currency};
    dispatch(actionCreators.showSpinner());
    api
      .getConfigDataSavingValas(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const config = result(res, 'data.config', []);
        const value = find(config, function (prodList) {
          return prodList.productCode === 'SAV';
        });
        const currencySavingValas = currency;
        dispatch(
          actionCreators.saveProductsItem({config, currencySavingValas}),
        );
        dispatch(actionCreators.saveProductData(value));
        dispatch(
          actionCreators.saveProductCode(result(value, 'productCode', '')),
        );
        dispatch(
          actionCreators.saveCcCode(
            result(value, 'productCode', '') + '-SIMOBI-002',
          ),
        );
        dispatch(NavigationActions.navigate({routeName: 'ProductsTnC'}));
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
      });
  };
}

export function getSavingValasEUR() {
  return dispatch => {
    const currency = 'EUR';
    const payload = {currency};
    dispatch(actionCreators.showSpinner());
    api
      .getConfigDataSavingValas(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const config = result(res, 'data.config', []);
        const value = find(config, function (prodList) {
          return prodList.productCode === 'SAV';
        });
        const currencySavingValas = currency;
        dispatch(
          actionCreators.saveProductsItem({config, currencySavingValas}),
        );
        dispatch(actionCreators.saveProductData(value));
        dispatch(
          actionCreators.saveProductCode(result(value, 'productCode', '')),
        );
        dispatch(
          actionCreators.saveCcCode(
            result(value, 'productCode', '') + '-SIMOBI-002',
          ),
        );
        dispatch(NavigationActions.navigate({routeName: 'ProductsTnC'}));
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
      });
  };
}

export function getSavingValasSGD() {
  return dispatch => {
    const currency = 'SGD';
    const payload = {currency};
    dispatch(actionCreators.showSpinner());
    api
      .getConfigDataSavingValas(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const config = result(res, 'data.config', []);
        const value = find(config, function (prodList) {
          return prodList.productCode === 'SAV';
        });
        const currencySavingValas = currency;
        dispatch(
          actionCreators.saveProductsItem({config, currencySavingValas}),
        );
        dispatch(actionCreators.saveProductData(value));
        dispatch(
          actionCreators.saveProductCode(result(value, 'productCode', '')),
        );
        dispatch(
          actionCreators.saveCcCode(
            result(value, 'productCode', '') + '-SIMOBI-002',
          ),
        );
        dispatch(NavigationActions.navigate({routeName: 'ProductsTnC'}));
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
      });
  };
}

export function convertAmountSavingValas() {
  return (dispatch, getState) => {
    const state = getState();
    const amount = result(state, 'productData.productDeposit', '').toString();
    const currencyAccountFrom = result(
      state,
      'form.SourceAccountValasForm.values.myAccount.currency',
      '',
    );
    const transactionReferenceNumber = result(state, 'transRefNum', '');
    const currencyValas = result(state, 'productItems.currencySavingValas', '');
    const payload = {
      amount,
      currencyAccountFrom,
      currencyValas,
      transactionReferenceNumber,
    };
    dispatch(actionCreators.showSpinner());
    return api
      .getConvertAmountSavingValas(payload, dispatch)
      .then(res => {
        const dataConvertValas = result(res, 'data.convertMap', {});
        dispatch(
          change(
            'SourceAccountValasForm',
            'convertMapValasData',
            dataConvertValas,
          ),
        );
        dispatch(actionCreators.saveDataConvertSimasValas({dataConvertValas}));
        dispatch(NavigationActions.back());
        dispatch(actionCreators.hideSpinner());
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
      });
  };
}

export function getInterestRateSimasTara() {
  return dispatch => {
    const payload = '';
    dispatch(actionCreators.showSpinner());
    return api
      .getRateSimasTara(payload, dispatch)
      .then(res => {
        const interestRateSimasTara = result(res, 'data.interestRate', '');
        dispatch(actionCreators.hideSpinner());
        dispatch(
          NavigationActions.navigate({
            routeName: 'SimasTaraSimulationPage',
            params: {interestRateSimasTara},
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.MANAGE_ATM__ALERT_TIMEOUT),
          Toast.LONG,
        );
      });
  };
}

export function createSavingValasAccount() {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const lang = result(state, 'currentLanguage.id', 'id');
    const securityMode = '3';
    const selectedAccount = result(
      state,
      'form.SourceAccountValasForm.values.myAccount',
      '',
    );
    const bankBranch = result(
      state,
      'form.SourceAccountValasForm.values.myAccount.bankBranch.code',
      '',
    );
    const debitAccountNumber = result(
      state,
      'form.SourceAccountValasForm.values.myAccount.accountNumber',
      '',
    );
    const currency = result(state, 'productItems.currencySavingValas', '');
    const emailAddress = result(state, 'form.EmailForm.values.email', '');
    const name = result(state, 'user.profile.name', '');
    const transRefNum = result(state, 'transRefNum', '');
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const productType = result(state, 'productData.productType', '');
    const initialDeposit = result(state, 'productData.productDeposit', '');
    const treasuryRate =
      initialDeposit === '0'
        ? ''
        : result(
            state,
            'form.SourceAccountValasForm.values.convertMapValasData.temenosTreasuryRate',
            '',
          );

    const payload = {
      securityMode,
      transRefNum,
      cifCode,
      name,
      productType,
      bankBranch,
      debitAccountNumber,
      currency,
      initialDeposit,
      emailAddress,
      treasuryRate,
    };
    const transactionType =
      lang === 'id'
        ? language.SAVING__ACCOUNT_TRANSACTION_TYPE
        : language.SAVING__ACCOUNT_TRANSACTION_TYPE;
    const isSaving = 'yes';
    const modalOptions = {
      amount: `${currency} ${currencyFormatter(initialDeposit)}`,
      transactionType,
      transactionId: transRefNum,
      accountFrom: selectedAccount,
      isSaving,
      initialDeposit,
    };
    dispatch(
      actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}),
    );
    dispatch(actionCreators.showSpinner());
    return api
      .registerSavingAccount(payload, dispatch)
      .then(res => {
        const accountTo = result(res, 'data', {});
        const resultDisplay = result(res, 'data.result.displayList', []);
        dispatch(actionCreators.hideSpinner());
        dispatch(refreshStorageNew());
        dispatch(
          actionCreators.showPaymentModal({
            ...modalOptions,
            resultDisplay,
            type: 'SUCCESS',
            accountTo,
          }),
        );
        dispatch(destroy('SourceAccountValasForm'));
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'AccountMenu'}),
              NavigationActions.navigate({routeName: 'PaymentStatusNew'}),
            ],
          }),
        );
        dispatch(actionCreators.clearTransRefNum());
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
          dispatch(destroy('SourceAccountValasForm'));
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'AccountMenu'}),
                NavigationActions.navigate({routeName: 'PaymentStatusNew'}),
              ],
            }),
          );
          const resultDisplay = result(err, 'data.result.displayList', []);
          const errorText = getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_PAY_BILL,
          );
          dispatch(
            errorResponseResult(
              err,
              modalOptions,
              resultDisplay,
              errorText,
              selectedAccount,
            ),
          );
        }
      });
  };
}

export function getSavingValasNZD() {
  return dispatch => {
    const currency = 'NZD';
    const payload = {currency};
    dispatch(actionCreators.showSpinner());
    api
      .getConfigDataSavingValas(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const config = result(res, 'data.config', []);
        const value = find(config, function (prodList) {
          return prodList.productCode === 'SAV';
        });
        const currencySavingValas = currency;
        dispatch(
          actionCreators.saveProductsItem({config, currencySavingValas}),
        );
        dispatch(actionCreators.saveProductData(value));
        dispatch(
          actionCreators.saveProductCode(result(value, 'productCode', '')),
        );
        dispatch(
          actionCreators.saveCcCode(
            result(value, 'productCode', '') + '-SIMOBI-002',
          ),
        );
        dispatch(NavigationActions.navigate({routeName: 'ProductsTnC'}));
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
      });
  };
}
