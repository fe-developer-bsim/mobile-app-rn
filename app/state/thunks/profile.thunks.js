import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import {result, forEach} from 'lodash';
import * as middlewareUtils from '../../utils/middleware.util';
import {Toast, Alert} from '../../utils/RNHelpers.util.js';
import {getErrorMessage, wrapMethodInFunction, getCurrentRouteName, getFilteredCgv, generateCgvLabel} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import {destroy} from 'redux-form';
import {language} from '../../config/language';
import {checkHSMandNavigate, checkCameraPermissionAndNavigate, populateConfigData, prepareGoSimasPoinHistory} from './common.thunks';
import {getTdConfig} from './dashboard.thunks';
import {storageKeys, set} from '../../utils/storage.util';
import RNANAndroidSettingsLibrary from 'react-native-android-settings-library';
import {Platform, Linking} from 'react-native';
import moment from 'moment';
import {randomString, OBM_EncryptPassword, OBM_GetEncodingParameter, OBM_GetEncryptedPassword, OBM_EncryptChangePassword} from '../../utils/vendor/pinEncryption.util';
import {deviceInfo} from '../../utils/device.util';
import {prepareGoDashboard, prepareGoEgift, prepareGoEmoney, prepareGoAccount, prepareGoSearch, prepareGoSpecialDeals} from './onboarding.thunks';


// PROFILE

export function verifyPassword (password, nextRouteName, isSetNewCredential, isOBMPassword, isOBM, isOBMAll, profileScope, forgotPassword, isSimasPoin, isLoginEgift, isLoginEmoney, isLoginAccount, isSearch, isOBMDashboard, isFromSearch, offers, routeMenuSearch, productName) {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    const randomNumber = randomString(16);
    OBM_EncryptPassword(password, randomNumber);
    password = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
    const deviceInfoLogin = {
      'name': deviceInfo.name,
      'model': deviceInfo.model
    };
    return api.verifyPassword(password, profileScope, deviceInfoLogin, dispatch).
      then(() => {
        dispatch(actionCreators.hideSpinner());
        if (isOBMPassword === true) {
          dispatch(destroy('validatePasswordForm'));
          if (routeMenuSearch === 'Login') {
            dispatch(prepareGoDashboard(routeMenuSearch));
          } if (isSimasPoin === true) {
            dispatch(prepareGoSimasPoinHistory());
          } if (isLoginEgift === true) {
            dispatch(prepareGoEgift());
          } if (isLoginEmoney === true) {
            dispatch(prepareGoEmoney(isLoginEmoney));
          } if (isLoginAccount === true) {
            dispatch(prepareGoAccount(isLoginAccount));
          } if (offers) {
            dispatch(prepareGoSpecialDeals(offers));
          } else {
            if (isLoginEmoney === true) {
              dispatch(prepareGoEmoney(isLoginEmoney));
            } else if (isOBMDashboard === 'LoginLanding') {
              dispatch(NavigationActions.navigate({routeName: 'Landing'}));
            } else if (isFromSearch !== '') {
              dispatch(prepareGoSearch(false, isOBMDashboard, isFromSearch, productName));
            } else {
              dispatch(prepareGoDashboard());
            }
          }
        } if (isOBMAll === true) {
          const isOBMDashboard = true;
          dispatch(destroy('validatePasswordForm'));
          dispatch(NavigationActions.navigate({routeName: 'EasyPinVerify', params: {isOBMDashboard: true}}));
          dispatch(actionCreators.saveOBM(isOBMDashboard));
        } else {
          dispatch(NavigationActions.navigate({routeName: nextRouteName, params: {password, isSetNewCredential, isSearch, offers}}));
        }
      }).catch((err) => {
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
        if (easyPinAttempt === 'invalid') {
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.CONFIRMATION_PASSWORD);
        } else if (easyPinAttempt === 'blocked') {
          dispatch(actionCreators.cleanAppState());
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.ERROR_MESSAGE_BLOCKED_EASYPIN_TRANSACTION);
        } else {
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__INVALID_PASSWORD), Toast.LONG);
          dispatch(actionCreators.hideSpinner());
        }
     
      });
  };
}

export function changePassword (values, isSearch) {
  return (dispatch, getState) => {
    const oldPassword = result(getState(), 'form.validatePasswordForm.values.password', '');
    const payload = middlewareUtils.prepareChangePasswordPayload(oldPassword, values);
    return api.changePassword(payload, dispatch).
      then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(destroy('validatePasswordForm'));
        dispatch(destroy('CreateNewPassword'));
        Alert.alert(language.PROFILE__CHANGE_PW_MODAL_TITLE, language.PROFILE__CHANGE_PW_MODAL_MSG, [{
          text: language.PROFILE__EASYPIN_MODAL_OK,
          onPress: wrapMethodInFunction(dispatch, NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: isSearch ? 'Landing' : 'HomeScreen'})]
          }))
        }]);
      }).catch((err) => {
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_CHANGE_PASSWORD), Toast.LONG);
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function verifyEasyPin (easyPinRaw) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const sessionId = result(state, 'additionalApiPayload.sessionCode', {});
    let easyPin = result(easyPinRaw, 'easyPin', '');
    const randomNumber = randomString(16);
    OBM_EncryptPassword(easyPin, randomNumber);
    if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
    else null;

    const deviceInfoLogin = {
      'name': deviceInfo.name,
      'model': deviceInfo.model
    };
    return api.verifyEasyPin(easyPin, deviceInfoLogin, sessionId, dispatch).
      then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(prepareGoDashboard());
      }).catch((err) => {
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__INVALID_PASSWORD), Toast.LONG);
        dispatch(destroy('easyPinVerifyForm'));
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function changeEasyPin (values, isSearch) {
  return (dispatch) => {
    let oldEasyPin = result(values, 'oldEasyPin', '');
    let easyPin = result(values, 'easyPin', '');
    dispatch(actionCreators.showSpinner());
    return dispatch(populateConfigData()).
      then(() => {
        const randomNumber = randomString(16);
        const oldEasyPinTemp = oldEasyPin;
        OBM_EncryptPassword(oldEasyPinTemp, randomNumber);
        if (oldEasyPin) oldEasyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
        else null;
        OBM_EncryptChangePassword(oldEasyPinTemp, easyPin, randomNumber);
        if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
        else null;

        const deviceInfoLogin = {
          'name': deviceInfo.name,
          'model': deviceInfo.model
        };
        return api.updateEasyPin({oldEasyPin, easyPin, deviceInfoLogin}, dispatch);
      }).
      then(() => {
        dispatch(actionCreators.hideSpinner());
        Alert.alert(language.PROFILE__EASYPIN_MODAL_TITLE, language.PROFILE__EASYPIN_MODAL_MSG, [{
          text: language.PROFILE__EASYPIN_MODAL_OK,
          onPress: () => {
            dispatch(destroy('UpdateEasyPin'));
            dispatch(NavigationActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: isSearch ? 'Landing' : 'HomeScreen'})]
            }));
          }
        }]);
      }).catch((err) => {
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
        if (easyPinAttempt === 'invalid') {
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.CONFIRMATION_EASYPIN);
        } else if (easyPinAttempt === 'blocked') { // failed 3 times
          dispatch(actionCreators.cleanAppState());
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.ERROR_MESSAGE_BLOCKED_EASYPIN_TRANSACTION);
        } else {
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__SET_EASYPIN_ERROR), Toast.LONG);
          dispatch(actionCreators.hideSpinner());
        }

      });
  };
}

export function offerClickHandler (offer) {
  return (dispatch, getState) => {
    const navigationKeys = result(offer, 'navigateTo', []);
    let currentScreen = getCurrentRouteName(result(getState(), 'nav', {}));
    const isLogin = !!result(getState(), 'user.ipassport', '');
    if (!isLogin) {
      dispatch(actionCreators.changeNotificationRoute(navigationKeys));
      dispatch(NavigationActions.back());
      dispatch(checkHSMandNavigate('LOGIN'));
    } else {
      while (!['HomeScreen', 'TransferScreen', 'PayScreen', 'HelpScreen'].includes(currentScreen) && currentScreen !== 'Onboarding') {
        // Keep going back until any of the tabs are selected.
        dispatch(NavigationActions.back({preventDebounce: true})); // preventDebounce is to skip debounce middleware
        currentScreen = getCurrentRouteName(result(getState(), 'nav', {}));
      }
      dispatch(NavigationActions.navigate({routeName: 'Home'}));
      if (result(navigationKeys, '0', '') === 'TdForm') {
        dispatch(getTdConfig());
      } else {
        forEach(navigationKeys, (navigateKey) => dispatch(NavigationActions.navigate({routeName: navigateKey})));
      }

    }
  };
}

export function changeFaceRecognition (usingFaceRecog, isSearch) {
  return (dispatch, getState) => {
    const isFaceRegistered = result(getState(), 'isFaceRegistered.isFaceRegistered', false);
    const usingFingerprint = result(getState(), 'fingerprint', false);
    if (usingFaceRecog && !isFaceRegistered) {
      dispatch(actionCreators.showSpinner());
      dispatch(NavigationActions.back());
      dispatch(checkCameraPermissionAndNavigate('ProfileCameraPage', {action: 'RegisterDrawer'}, false));
    } else  {
      dispatch(actionCreators.isUsingFaceRecogUpdate(usingFaceRecog));
      const loginSetting = {
        faceRecognition: usingFaceRecog,
        fingerprint: usingFingerprint
      };
      set(storageKeys['LOGIN_SETTING'], loginSetting).catch((err) => {
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION), Toast.LONG);
      });
      dispatch(NavigationActions.navigate({routeName: isSearch ? 'Landing' : 'HomeScreen'}));
    }
  };
}

export function changeFingerprint (usingFingerprint, isSearch) {
  return (dispatch, getState) => {
    const state = getState();
    const hasFingerprint = result(state, 'hasFingerprint', false);
    if (hasFingerprint === 'noFinger' && usingFingerprint) {
      if (Platform.OS === 'android') {
        RNANAndroidSettingsLibrary.open('ACTION_SECURITY_SETTINGS');
      } else {
        Linking.canOpenURL('App-Prefs:').then((supported) => {
          if (supported) {
            return Linking.openURL('App-Prefs:');
          }
        });
      }
      dispatch(NavigationActions.back());
    } else {
      const usingFaceRecog = result(state, 'faceRecognition', false);
      dispatch(actionCreators.isUsingFingerprintUpdate(usingFingerprint));
      const loginSetting = {
        faceRecognition: usingFaceRecog,
        fingerprint: usingFingerprint
      };
      set(storageKeys['LOGIN_SETTING'], loginSetting).catch((err) => {
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION), Toast.LONG);
      });
      dispatch(NavigationActions.navigate({routeName: isSearch ? 'Landing' : 'HomeScreen'}));
    }
  };
}

export function changeFaceRecognitionOff (usingFaceRecog) {
  return (dispatch, getState) => {
    const usingFingerprint = result(getState(), 'fingerprint', false);
    dispatch(actionCreators.isUsingFaceRecogUpdate(usingFaceRecog));
    const loginSetting = {
      faceRecognition: usingFaceRecog,
      fingerprint: usingFingerprint
    };
    set(storageKeys['LOGIN_SETTING'], loginSetting).catch((err) => {
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION), Toast.LONG);
    });
  };
}

export function changeFingerprintOff (usingFingerprint) {
  return (dispatch, getState) => {
    const usingFaceRecog = result(getState(), 'faceRecognition', false);
    dispatch(actionCreators.isUsingFingerprintUpdate(usingFingerprint));
    const loginSetting = {
      faceRecognition: usingFaceRecog,
      fingerprint: usingFingerprint
    };
    set(storageKeys['LOGIN_SETTING'], loginSetting).catch((err) => {
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION), Toast.LONG);
    });
  };
}

export function movieClick (data, tipe) {
  return (dispatch) => {
    const movieData = data;
    dispatch(NavigationActions.navigate({routeName: 'CgvMovieDetail', params: {movieData: movieData, tipe: tipe}}));
  };
}

export function CgvSchedule (data, tipe) {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    const cinemaCode = result(data, 'cinemaCode', '');
    const movieCode = result(data, 'movieCode', '');
    let payload = {};

    const today = moment().format('YYYYMMDD');
    const currentDate = new Date();
    const oneMonth = new Date(currentDate.setDate(currentDate.getDate() + 30));
    const nextMonth = moment(oneMonth).format('YYYYMMDD');

    let dayList = [];
    let nextDay = new Date();
    while (nextDay <= oneMonth) {
      dayList = [...dayList, {date: moment(nextDay).format('YYYYMMDD'), dateDay: moment(nextDay).format('DD'), day: moment(nextDay).format('dddd').substring(0, 3), month: moment(nextDay).format('MMMM'), year: nextDay.getFullYear()}];
      nextDay = new Date(nextDay.setDate(nextDay.getDate() + 1));
    }

    tipe === 'movie' ?
      payload = {
        'startDate': today,
        'endDate': nextMonth,
        'cinemaCode': '',
        'movieCode': movieCode
      } :
      payload = {
        'startDate': today,
        'endDate': nextMonth,
        'cinemaCode': cinemaCode,
        'movieCode': ''
      };

    const code = tipe === 'movie' ? movieCode : cinemaCode;

    return api.getCgvSchedule(payload, dispatch).then((res) => {
      const scheduleInfoList = result(res, 'data.scheduleInfoList');
      const cgvList = generateCgvLabel(scheduleInfoList);
      const mapingSchedule = getFilteredCgv(scheduleInfoList, tipe, code);
      dispatch(NavigationActions.navigate({routeName: 'CgvSchedule', params: {cinemaData: data, mapingSchedule: mapingSchedule, tipe: tipe, cgvList: cgvList, dayList: dayList}}));
      dispatch(actionCreators.hideSpinner());
    }).catch((err) => {
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__ERROR_GETTING_CGV_SCHEDULE), Toast.LONG);
      dispatch(actionCreators.hideSpinner());
    });
  };
}
