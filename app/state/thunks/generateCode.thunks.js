import {StackActions, NavigationActions} from 'react-navigation';
import {destroy, reset} from 'redux-form';
import {
  storageKeys,
  set,
  offlineGenerateCode,
  offlineGenerateCodeClick,
  randomGenerateCode,
  getPopUpLKD,
} from '../../utils/storage.util';
import * as actionCreators from '../actions/index.actions.js';
import {result} from 'lodash';
import api from '../../utils/api.util';
import {Toast} from '../../utils/RNHelpers.util.js';
import {
  getErrorMessage,
  addZero,
  upperCase,
} from '../../utils/transformer.util';
import BackgroundTimer from 'react-native-background-timer';
import {populateBillerData} from './common.thunks';
import {logout} from './onboarding.thunks.js';
import {language} from '../../config/language';

export function goToGenerateMain(param, update) {
  return dispatch => {
    offlineGenerateCodeClick().then(res => {
      dispatch(populateBillerData());
      if (update) {
        const routeName =
          param === '0'
            ? 'GenerateForm0'
            : param === '1'
            ? 'GenerateForm1'
            : 'GenerateFormX';
        dispatch(destroy('GenerateForm'));
        dispatch(
          NavigationActions.navigate({
            routeName: routeName,
            params: {trxType: param},
          }),
        );
        dispatch(updateFirstClick(param));
      } else {
        const data = result(res, 'data.' + `${param}`, false);
        const routeName =
          param === '0'
            ? 'GenerateForm0'
            : param === '1'
            ? 'GenerateForm1'
            : 'GenerateFormX';
        if (data) {
          dispatch(destroy('GenerateForm'));
          dispatch(
            NavigationActions.navigate({
              routeName: routeName,
              params: {trxType: param},
            }),
          );
        } else {
          dispatch(destroy('GenerateForm'));
          dispatch(
            NavigationActions.navigate({
              routeName: 'GenerateForm',
              params: {data, param},
            }),
          );
        }
      }
    });
  };
}

export function goToOfflineMain(data, param) {
  return (dispatch, getState) => {
    const state = getState();
    const paramActiveMenu = {
      flagLKDPurchase:
        upperCase(result(state, 'config.flag.flagLKDPurchase', 'INACTIVE')) ===
        upperCase('ACTIVE'),
      flagLKDCashOut:
        upperCase(result(state, 'config.flag.flagLKDCashOut', 'INACTIVE')) ===
        upperCase('ACTIVE'),
    };
    dispatch(
      NavigationActions.navigate({
        routeName: 'MainGenerateCodeOffline',
        params: {data, param, state, paramActiveMenu},
      }),
    );
  };
}

export function goToOnlineMainAll(data, param) {
  return (dispatch, getState) => {
    const state = getState();
    const paramActiveMenu = {
      flagLKDPurchase:
        upperCase(result(state, 'config.flag.flagLKDPurchase', 'INACTIVE')) ===
        upperCase('ACTIVE'),
      flagLKDCashOut:
        upperCase(result(state, 'config.flag.flagLKDCashOut', 'INACTIVE')) ===
        upperCase('ACTIVE'),
    };
    dispatch(
      NavigationActions.navigate({
        routeName: 'GenerateCodeOnlineMainAll',
        params: {data, param, state, paramActiveMenu},
      }),
    );
  };
}

export function generateCodeConfirmation(title, code, isLogin, payload) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const trxType = result(state, 'generateCode.trxType', '');
    let clientToken = '';
    let serverToken = '';
    payload = {...payload};
    dispatch(destroy('GenerateConfirmation'));
    dispatch(actionCreators.showSpinner());
    return api
      .generateCode(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.showSpinner());
        const servertime = Date.parse(result(res, 'data.serverTime', ''));
        const firstCode = code;
        code = code + servertime;
        code = result(res, 'data.fastCode', '')
          ? result(res, 'data.fastCode', '')
          : result(res, 'data.lowCode', '');
        dispatch(NavigationActions.back());
        dispatch(
          NavigationActions.navigate({
            routeName: 'GenerateCodeOnline',
            params: {
              state,
              code,
              title,
              isLogin,
              trxType,
              firstCode,
              payload,
              serverToken,
              clientToken,
            },
          }),
        );
        dispatch(actionCreators.hideSpinner());
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__POPULATE_REDEEM),
          Toast.LONG,
        );
        dispatch(actionCreators.hideSpinner());
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
        if (easyPinAttempt === 'invalid') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          Toast.show(language.ERROR_MESSAGE_INVALID_EASYPIN_TRANSACTION);
        } else if (easyPinAttempt === 'blocked') {
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.clearTransRefNum());
          Toast.show(language.ERROR_MESSAGE_BLOCKED_EASYPIN_TRANSACTION);
          dispatch(logout());
        } else if (easyPinAttempt === 'errHsm') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          Toast.show(language.ERROR_MESSAGE_SYSTEM_UNDER_MAINTENANCE);
        } else {
          dispatch(actionCreators.hideSpinner());
          const errorMessage = getErrorMessage(
            err,
            language.RECURRING__TIME_OUT_OR_NO_DATA,
          );
          Toast.show(errorMessage, Toast.LONG);
        }
      });
  };
}
export function setLoginStorage(digitalTrx) {
  return () => {
    set(storageKeys.OFFLINEGENERATECODE, {data: digitalTrx});
  };
}

export function getLoginStorage(trxType) {
  return (dispatch, getState) => {
    const state = getState();
    trxType = trxType ? trxType : result(state, 'generateCode.trxType', '');
    offlineGenerateCode().then(res => {
      dispatch(
        actionCreators.saveGenerateCode({
          data: result(res, 'data', {}),
          trxType,
        }),
      );
      return res;
    });
  };
}

export function updateFirstClick(param) {
  return () => {
    let dt = {};
    offlineGenerateCodeClick().then(res => {
      const firstData = result(res, 'data', {});
      dt = firstData;
      dt[`${param}`] = true;
      set(storageKeys.OFFLINEGENERATECODECLICK, {data: dt});
    });
  };
}

export function goToGenerateTnc(data, param) {
  return dispatch => {
    let checked = false;
    const checkboxChange = res => {
      checked = !res;
    };
    const goToGenerateForm = () => {
      set(storageKeys.POPUPLKD, {dontShow: checked});
      dispatch(destroy('GenerateForm'));
      dispatch(
        NavigationActions.navigate({
          routeName: 'GenerateForm',
          params: {data, param},
        }),
      );
      dispatch(actionCreators.hideSinarmasAlert());
    };
    return getPopUpLKD().then(res => {
      if (!result(res, 'dontShow', false)) {
        const sinarmasModalOptions = {
          heading1: language.GENERATE_CODE__WITHDRAW,
          text: language.GENERATE_CODE_TNC_TEXT,
          checkboxLabel: language.LANDING__DONT_SHOW_AGAIN,
          button1: language.BUTTON_OK,
          onButton1Press: goToGenerateForm,
          checkboxChange,
        };
        dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
      } else {
        dispatch(
          NavigationActions.navigate({
            routeName: 'GenerateForm',
            params: {data, param},
          }),
        );
      }
    });
  };
}

export function goToGenerateTimeout(payload, isLogin, code, tipeCode) {
  return (dispatch, getState) => {
    const state = getState();
    const trxType = result(state, 'generateCode.trxType', '');
    if (isLogin) {
      dispatch(actionCreators.showSpinner());
      if (trxType === '0') {
        dispatch(
          StackActions.reset({
            index: 0,
            actions: [
              dispatch(destroy('GenerateForm')),
              dispatch(destroy('GenerateConfirmation')),
              dispatch(destroy('GenerateCodeOnline')),
              NavigationActions.navigate({
                routeName: 'CardLessWithdrawalIndex',
                params: {trxType: trxType},
              }),
            ],
          }),
        );
      } else if (trxType === '1') {
        dispatch(
          StackActions.reset({
            index: 0,
            actions: [
              dispatch(destroy('GenerateForm')),
              dispatch(destroy('GenerateConfirmation')),
              dispatch(destroy('GenerateCodeOnline')),
              NavigationActions.navigate({
                routeName: 'CardLessWithdrawalIndex',
                params: {trxType: trxType},
              }),
            ],
          }),
        );
      }
    } else {
      dispatch(actionCreators.showSpinner());
      dispatch(goToTimeout(trxType, payload, isLogin, code));
    }

    randomGenerateCode().then(res => {
      const codeNow = result(res, 'code', '');
      const newCode = codeNow ? parseInt(codeNow) + 1 : 1;

      updateStorageRandom(newCode);
      const originCode = code.substring(0, code.length - 3);
      code = String(originCode + addZero(newCode, 3));
      if (tipeCode) {
        offlineGenerateCode().then(resStorage => {
          dispatch(actionCreators.saveCodeOnboard(resStorage));
          const accountId = String(
            result(resStorage, 'data.accountOffline.0.accId', ''),
          );
          const payload = {accountId: accountId};
          dispatch(goToTimeout(trxType, payload, isLogin, code, tipeCode));
        });
      } else {
        dispatch(goToTimeout(trxType, payload, isLogin, code));
      }
    });
  };
}

export function goToTimeout() {
  return dispatch => {
    let delay = 0.1;
    this.interval = BackgroundTimer.setInterval(() => {
      delay = delay - 0.1;
      if (delay === 0) {
        BackgroundTimer.clearInterval(this.interval);
        dispatch(actionCreators.hideSpinner());
      }
    }, 1000);
    const hideAlert = () => {
      dispatch(destroy('GenerateForm'));
      dispatch(destroy('GenerateConfirmation'));
      dispatch(destroy('GenerateCodeOnline'));
      dispatch(actionCreators.hideSinarmasAlert());
      dispatch(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'CardLessWithdrawalIndex'}),
          ],
        }),
      );
    };
    const sinarmasModalOptions = {
      heading1: language.GENERATE_CODE_TIMEOUT_FASTCODE_EXPIRED,
      text: language.GENERATE_CODE_TIMEOUT_GET_NEW_CODE,
      button1: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
    };
    dispatch(
      actionCreators.showSinarmasAlert({
        ...sinarmasModalOptions,
        image: 'emoji_sad_black',
      }),
    );
  };
}

export function toGenerateTimeout(trxType, payload, isLogin, code, tipeCode) {
  return dispatch => {
    let delay = 0.1;
    this.interval = BackgroundTimer.setInterval(() => {
      delay = delay - 0.1;
      if (delay === 0) {
        dispatch(
          NavigationActions.navigate({
            routeName: 'GenerateCodeTimeout',
            params: {trxType: trxType, payload, isLogin, code, tipeCode},
          }),
        );
        BackgroundTimer.clearInterval(this.interval);
        dispatch(actionCreators.hideSpinner());
      }
    }, 1000);
  };
}

export function updateStorageRandom(newCode) {
  set(storageKeys.RANDOMGENERATECODE, {
    code: newCode,
    lastGenerate: new Date().getDate(),
  });
  return true;
}

export function goToConfirmation(data) {
  return (dispatch, getState) => {
    const state = getState();
    const transRefNum = state.transRefNum;
    dispatch(
      NavigationActions.navigate({
        routeName: 'QRConfirm',
        params: {data, transRefNum},
      }),
    );
  };
}

export function goToSelectAcc(trxType) {
  return dispatch => {
    if (trxType === '0' || trxType === '3') {
      dispatch(
        NavigationActions.navigate({
          routeName: 'BillerAccountLKD',
          params: {
            formName: 'GenerateForm',
            fieldName: 'accountNo',
            sourceType: 'fundTransfer',
          },
        }),
      );
    } else if (trxType === '1') {
      dispatch(
        NavigationActions.navigate({
          routeName: 'CardLessWithdrawalSourceAccLKD',
          params: {
            formName: 'GenerateForm',
            fieldName: 'accountNo',
            sourceType: 'fundTransfer',
          },
        }),
      );
    }
  };
}

export function goToSelectMerc(data, param) {
  return dispatch => {
    dispatch(
      NavigationActions.navigate({
        routeName: 'BillerAccount',
        params: {data, param},
      }),
    );
  };
}

export function checkReleaseDeviceStatus(code, payload) {
  return dispatch => {
    const isLKD = 'yes';
    return api
      .checkStatusInvoice({...payload, code}, dispatch)
      .then(resData => {
        const responseCode = result(resData, 'data.responseCode', '');
        if (responseCode === '00') {
          dispatch(
            actionCreators.saveTick({code, payload, responseCode: true}),
          );
          dispatch(actionCreators.hideSpinner());
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({
                  routeName: 'CardLessWithdrawalIndex',
                }),
                NavigationActions.navigate({
                  routeName: 'PaymentStatusNewPage',
                  params: {code, payload, resData},
                }),
              ],
            }),
          );
          dispatch(destroy('GenerateForm'));
          dispatch(destroy('GenerateConfirmation'));
          dispatch(destroy('GenerateCodeOnline'));
          dispatch(
            actionCreators.showPaymentModal({
              payload,
              type: 'SUCCESS',
              subheading: 'Sub header',
              accountFrom: '123123',
              isLKD,
            }),
          );
          dispatch(actionCreators.clearEgiftCart());
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.hideSpinner());
        } else if (responseCode === '98') {
          dispatch(
            actionCreators.saveTick({code, payload, responseCode: true}),
          );
          dispatch(actionCreators.hideSpinner());
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({
                  routeName: 'CardLessWithdrawalIndex',
                }),
                NavigationActions.navigate({
                  routeName: 'PaymentStatusNewPage',
                  params: {code, payload, resData},
                }),
              ],
            }),
          );
          dispatch(destroy('GenerateForm'));
          dispatch(destroy('GenerateConfirmation'));
          dispatch(destroy('GenerateCodeOnline'));
          dispatch(
            actionCreators.showPaymentModal({
              payload,
              type: 'LKDFAILED',
              subheading: 'Sub header',
              accountFrom: '123123',
              isLKD,
            }),
          );
          dispatch(actionCreators.clearEgiftCart());
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.hideSpinner());
        } else {
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.clearEgiftCart());
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.hideSpinner());
        }
      });
  };
}
