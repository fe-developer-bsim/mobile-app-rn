import {AppState} from 'react-native';
import api from '../../utils/api.util';
import * as middlewareUtils from '../../utils/middleware.util';
import {getErrorMessage, getCurrentRouteName} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import {Toast, SnackBar, Platform} from '../../utils/RNHelpers.util.js';
import {language} from '../../config/language';
import tracker from '../../utils/googleAnalytics.util';
import {generateClientToken, generateServerToken, generateSessionCode} from '../../utils/secure.util';
import {currentPlatform, currentAppVersion} from '../../utils/device.util.js';
import {setupAppInitKeys, getCache, populateConfigDataReload} from './common.thunks';
import {populateOffersPrivate} from './common.thunks';
import {storageKeys, set, getLanguage, getLastLogin, getLoginSetting} from '../../utils/storage.util';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import {popUp} from './onboarding.thunks';
import * as actionCreators from '../actions/index.actions.js';
import TouchID from 'react-native-touch-id';
import {ENV} from '../../config/env.config';
import {setModulusExponent} from '../../utils/vendor/pinEncryption.util';
import VersionNumber from 'react-native-version-number';
// APP INIT/SETUP THUNKS

export function prepareAppInitKeys () {
  return (dispatch) => {
    dispatch(setupAppInitKeys()).
      catch((err) => {
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__INIT_KEYS_ERROR), Toast.LONG);
      });
  };
}

export function tokenInit () {
  return (dispatch) => generateClientToken(dispatch).
    then(() => generateServerToken(dispatch)).
    then(() => dispatch(prepareAppInitKeys())).
    then(() => generateSessionCode(dispatch)).
    catch((err) => tracker.trackEvent('NON_FATAL_ERROR', 'READING_ASYNC_CACHE FAILED', null, {label: `ERROR_MSG: ${JSON.stringify(err)}`}));
}

export function checkAppVersion () {
  return (dispatch) => {
    const payload = middlewareUtils.prepareAppVersionPayload({currentPlatform, currentAppVersion});
    return api.versionCheck(payload, dispatch).
      then((res) => {
        const versionDetails = middlewareUtils.getAppVersionDetails(res.data);
        const updateNote = result(res, 'data.updateNote', {});
        const responseCode = result(res, 'data.responseCode', '01');
        const currentVersion = result(res, 'data.currentVersion').replace(/[.]+/g, '');
        const deviceVersion = (VersionNumber.appVersion).replace(/[.]+/g, '');
        if (Number(deviceVersion) === Number(currentVersion)) {
          const isReload = true;
          dispatch(populateConfigDataReload(isReload));
        } else if (Number(deviceVersion) > Number(currentVersion)) {
          const isReload = true;
          dispatch(populateConfigDataReload(isReload));
        }
        let isOptionalUpdate = true;
        if (responseCode === '00') {
          isOptionalUpdate = false;
        } else if (responseCode === '02') {
          isOptionalUpdate = true;
        } else {
          return;
        }
        dispatch(NavigationActions.navigate({routeName: 'AppVersionUpdator', params: {...versionDetails, isOptionalUpdate, updateNote}}));
      }).
      catch((err) => {
        console.log('checkAppVersion API failed, error:', err);  // eslint-disable-line no-console
      });
  };
}

export function navigateOnNotification (message = {}) {
  return (dispatch, getState) => {
    const isActive = Platform.OS === 'android' ? message.foreground :  AppState.currentState === 'active';
    const iosUserData = JSON.parse(result(message, 'u', '{}'));
    const isAndroid = Platform.OS === 'android';
    const offerID = isAndroid ? result(message, 'userdata.offerID', '') : result(iosUserData, 'offerID', '');
    const msgTitle = isAndroid ? result(message, 'title', '') : result(message, 'aps.alert', '');
    const isOffersScreen = getCurrentRouteName(result(getState(), 'nav', {})) === 'Offers';
    if (isActive) {
      var snackbarConfig = {position: 'top'};
      if (offerID && !isOffersScreen) {
        snackbarConfig = {
          position: 'top',
          cancelText: 'VIEW',
          onCancel: () => {
            SnackBar.dismiss();
            dispatch(populateOffersPrivate(offerID));
          }
        };
      }
      return SnackBar.show(msgTitle, snackbarConfig);
    } else if (offerID && !isOffersScreen) {
      return dispatch(populateOffersPrivate(offerID));
    } else {
      return;
    }
  };
}

export function setLanguage () {
  return (dispatch, getState) => {
    dispatch(getCache());
    const EXPOBMprod = '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003';
    const MODOBMprod =  'BA6FD9A895BBDFF27736042B3719ED060465E7CE4D25E5826B620BED78A535A4841C1A5F5BEF08286CBA03A7217CD790AC425C86FAA46FCB9D465C4E1A2805ACC374B46A185EE221D53E98CC5DA456AF5AA50AC24FBB5D34235A2DAA933E64AEFE77C3BD2EFD84A2A57FA6337041DC33642D135F78CCABC7269BF408D03ADA51';
    const EXPOBMdev = '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003';
    const MODOBMdev = 'D6D8A4A5E913EEBE4CBABD910196077F3206584274DC087A295A004F0C81D641CFBCF57C90EA3F75F32CB5C03CB952CB4A29F6171EA09761AB05CCCB7551CAF384EE6514BD9EB0ED5D087BC5473F222A852FE9D769FCA3C36FAFADFFE2D072977040B86EB2A00AE5D23DD860BCF12A4B757BAC0ABE488C035200EBC1058C2AAF';
    const modulusString = ENV === 'production' ? MODOBMprod : MODOBMdev;
    const exponentString = ENV === 'production' ? EXPOBMprod : EXPOBMdev;

    setModulusExponent(modulusString, exponentString);
    const isPopUpON = result(state, 'config.landingPopupToogle', '');
    if (isPopUpON === 'YES') {
      dispatch(popUp());
    }
    const state = getState();
    const langVersion = Number(result(state, 'config.langVersion', 0));
    getLanguage().then((response) => {
      if (result(response, 'langVersion', 0) > 2.1) {
        if (isEmpty(response) || result(response, 'langVersion', 0) < langVersion) {
          return api.getLanguage(dispatch).
            then((res) => {
              const language = {...result(res, 'data.language', {}), langVersion};
              set(storageKeys['LANG'], language).catch((err) => {
                Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION), Toast.LONG);
              });
            }).
            catch((err) => {
              Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_UPDATE_BILLER_CONFIG), Toast.LONG);
            });
        }
      }
    });
  };
}

export function getLoginPreference () {
  return (dispatch) => {
    TouchID.isSupported().then((type) => {
      if (Platform.OS === 'android') {
        if (type === true) {
          dispatch(actionCreators.hasFingerprintUpdate(true));
        }
      } else if (Platform.OS === 'ios') {
        if (type === 'TouchID') {
          dispatch(actionCreators.hasFingerprintUpdate(true));
        }
      }
    }).catch((err) => {
      if (err.name === 'FingerprintScannerNotEnrolled') {
        dispatch(actionCreators.hasFingerprintUpdate('noFinger'));
      } else {
        dispatch(actionCreators.hasFingerprintUpdate(false));
      }
    });
    getLoginSetting().then((response) => {
      dispatch(actionCreators.isUsingFaceRecogUpdate(result(response, 'faceRecognition', false)));
      dispatch(actionCreators.isUsingFingerprintUpdate(result(response, 'fingerprint', false)));
    }).
      catch((err) => {
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__READ_DATA), Toast.LONG);
      });
  };
}

export function getLastSuccessfulLogin () {
  return (dispatch) => {
    getLastLogin().then((response) => {
      dispatch(actionCreators.updateLastLogin(response));
    }).
      catch((err) => {
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__READ_DATA), Toast.LONG);
      });
  };
}
