import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import result from 'lodash/result';
import * as middlewareUtils from '../../utils/middleware.util';
import {storageKeys, set} from '../../utils/storage.util';
import {getErrorMessage, checkFlipImage} from '../../utils/transformer.util';
import {StackActions, NavigationActions} from 'react-navigation';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import tracker from '../../utils/googleAnalytics.util';
import {
  verifyLoginFaceRecognition,
  prepareCompletedOnboarding,
  prepareGoDashboard,
} from './onboarding.thunks';
import {resetToDashboardFrom} from './common.thunks';
import {resetToLandingAndNavigate} from './navigation.thunks';

export function registerFace(image, orientationCode, params) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const userId = result(getState(), 'user.profile.customer.id', 0);
    const ipassport = result(getState(), 'user.ipassport', '');
    const orientation = '0';
    const flipImage = checkFlipImage(orientationCode);
    const payload = middlewareUtils.prepareRegisterFace(
      image,
      orientation,
      flipImage,
    );
    return api
      .registerFace(payload, dispatch)
      .then(() => {
        tracker.trackEvent(
          'FACE_RECOGNITION_REGISTRATION',
          'FACE_REGISTRATION_SUCCESS',
          null,
          {label: `userId:${userId}, ipassport: :${ipassport}`},
        );
        dispatch(actionCreators.hideSpinner());
        dispatch(
          actionCreators.isFaceRegisteredUpdate({isFaceRegistered: true}),
        );
        set(storageKeys.IS_FACE_REGISTERED, {isFaceRegistered: true}).catch(
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
        dispatch(resetToLandingAndNavigate('EasyPin', params));
        dispatch(actionCreators.clearTransRefNum());
      })
      .catch(err => {
        tracker.trackEvent(
          'FACE_RECOGNITION_REGISTRATION',
          'FACE_REGISTRATION_FAILED',
          null,
          {
            label: `userId:${userId}, ipassport: :${ipassport}, ERROR_MSG: ${JSON.stringify(
              err,
            )}`,
          },
        );
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__REGISTER_FACE));
      });
  };
}

export function registerFaceExisting(image, orientationCode, params) {
  return (dispatch, getState) => {
    const orientation = '0';
    const flipImage = checkFlipImage(orientationCode);
    const payload = middlewareUtils.prepareRegisterFace(
      image,
      orientation,
      '',
      '',
      flipImage,
    );
    dispatch(actionCreators.showSpinner());
    const userId = result(getState(), 'user.profile.customer.id', 0);
    const ipassport = result(getState(), 'user.ipassport', '');
    return api
      .registerFace(payload, dispatch)
      .then(() => {
        tracker.trackEvent(
          'FACE_RECOGNITION_REGISTRATION',
          'FACE_REGISTRATION_SUCCESS',
          null,
          {label: `userId:${userId}, ipassport: :${ipassport}`},
        );
        dispatch(actionCreators.hideSpinner());
        dispatch(
          actionCreators.isFaceRegisteredUpdate({isFaceRegistered: true}),
        );
        set(storageKeys.IS_FACE_REGISTERED, {isFaceRegistered: true}).catch(
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
        dispatch(
          prepareCompletedOnboarding(
            params.maskedUsername,
            params.isResetEasypin,
          ),
        );
        dispatch(actionCreators.clearTransRefNum());
      })
      .catch(err => {
        tracker.trackEvent(
          'FACE_RECOGNITION_REGISTRATION',
          'FACE_REGISTRATION_FAILED',
          null,
          {
            label: `userId:${userId}, ipassport: :${ipassport}, ERROR_MSG: ${JSON.stringify(
              err,
            )}`,
          },
        );
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__REGISTER_FACE));
      });
  };
}

export function registerFaceLockdown(image, orientationCode) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const typeActivationDeeplink = result(
      getState(),
      'typeActivationDeeplink',
      '',
    );
    const smsOtp = result(getState(), 'form.OTPForm.values.OTP');
    const transRefNum = getState().transRefNum;
    const orientation = '0';
    const flipImage = checkFlipImage(orientationCode);
    const payload = middlewareUtils.prepareRegisterFace(
      image,
      orientation,
      smsOtp,
      transRefNum,
      flipImage,
    );
    const userId = result(getState(), 'user.profile.customer.id', 0);
    const ipassport = result(getState(), 'user.ipassport', '');
    return api
      .registerFace(payload, dispatch)
      .then(() => {
        tracker.trackEvent(
          'FACE_RECOGNITION_REGISTRATION',
          'FACE_REGISTRATION_SUCCESS',
          null,
          {label: `userId:${userId}, ipassport: :${ipassport}`},
        );
        dispatch(actionCreators.hideSpinner());
        dispatch(
          actionCreators.isFaceRegisteredUpdate({isFaceRegistered: true}),
        );
        set(storageKeys.IS_FACE_REGISTERED, {isFaceRegistered: true}).catch(
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
        if (typeActivationDeeplink === '020') {
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'Login'}),
                NavigationActions.navigate({routeName: 'SmartfrenTnC'}),
              ],
            }),
          );
        } else {
          dispatch(prepareGoDashboard());
        }
        dispatch(actionCreators.clearTransRefNum());
      })
      .catch(err => {
        tracker.trackEvent(
          'FACE_RECOGNITION_REGISTRATION',
          'FACE_REGISTRATION_FAILED',
          null,
          {
            label: `userId:${userId}, ipassport: :${ipassport}, ERROR_MSG: ${JSON.stringify(
              err,
            )}`,
          },
        );
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__REGISTER_FACE));
      });
  };
}

export function registerFaceLockdownDrawer(image, orientationCode) {
  return (dispatch, getState) => {
    const smsOtp = result(getState(), 'form.OTPFormCommon.values.OTP');
    const transRefNum = getState().transRefNum;
    const orientation = '0';
    const flipImage = checkFlipImage(orientationCode);
    const payload = middlewareUtils.prepareRegisterFace(
      image,
      orientation,
      smsOtp,
      transRefNum,
      flipImage,
    );
    const usingFingerprint = result(getState(), 'fingerprint', false);
    const userId = result(getState(), 'user.profile.customer.id', 0);
    const ipassport = result(getState(), 'user.ipassport', '');
    dispatch(actionCreators.showSpinner());
    return api
      .registerFace(payload, dispatch)
      .then(() => {
        tracker.trackEvent(
          'FACE_RECOGNITION_REGISTRATION',
          'FACE_REGISTRATION_SUCCESS',
          null,
          {label: `userId:${userId}, ipassport: :${ipassport}`},
        );
        dispatch(actionCreators.hideSpinner());
        dispatch(
          actionCreators.isFaceRegisteredUpdate({isFaceRegistered: true}),
        );
        set(storageKeys.IS_FACE_REGISTERED, {isFaceRegistered: true}).catch(
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
        dispatch(actionCreators.isUsingFaceRecogUpdate(true));
        const loginSetting = {
          faceRecognition: true,
          fingerprint: usingFingerprint,
        };
        set(storageKeys.LOGIN_SETTING, loginSetting).catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
            ),
            Toast.LONG,
          );
        });
        dispatch(resetToDashboardFrom('ProfileCameraPage'));
        Toast.show(language.FACE__REGISTERED);
        dispatch(actionCreators.clearTransRefNum());
      })
      .catch(err => {
        tracker.trackEvent(
          'FACE_RECOGNITION_REGISTRATION',
          'FACE_REGISTRATION_FAILED',
          null,
          {
            label: `userId:${userId}, ipassport: :${ipassport}, ERROR_MSG: ${JSON.stringify(
              err,
            )}`,
          },
        );
        dispatch(actionCreators.hideSpinner());
        dispatch(resetToDashboardFrom('ProfileCameraPage'));
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__REGISTER_FACE));
      });
  };
}

export function authenticateFaceRegisterLogin(image, orientationCode) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    const payload = middlewareUtils.prepateTransRefNumPayload('face', true);
    return api
      .getTransRefNum({smsPriority: false, ...payload}, dispatch)
      .then(response => {
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.saveTransRefNum(response.data.transRefNum));
        dispatch(
          NavigationActions.navigate({
            routeName: 'OTP',
            params: {registerFace: true, image, orientationCode},
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

export function authenticateFaceRegister(image, orientationCode) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    const payload = middlewareUtils.prepateTransRefNumPayload('face', true);
    return api
      .getTransRefNum({smsPriority: false, ...payload}, dispatch)
      .then(response => {
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.saveTransRefNum(response.data.transRefNum));
        dispatch(
          NavigationActions.navigate({
            routeName: 'CommonOTP',
            params: {registerFace: true, image, orientationCode},
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

export function detectLiveFace(data) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    const image = result(data, 'image', '');
    const orientationCode = result(data, 'orientationCode', '');
    const action = result(data, 'action', '');
    const params = result(data, 'params', {});
    const isLockedDevice = result(data, 'isLockedDevice', false);
    const orientation = '0';
    const flipImage = checkFlipImage(orientationCode);
    const payload = middlewareUtils.prepareDetectFace(
      image,
      orientation,
      flipImage,
    );
    if (action === 'Login') {
      dispatch(
        verifyLoginFaceRecognition(image, orientationCode, isLockedDevice),
      );
    } else {
      return api
        .detectFace(payload, dispatch)
        .then(() => {
          dispatch(actionCreators.hideSpinner());
          if (action === 'Register') {
            dispatch(registerFace(image, orientationCode, params));
          } else if (action === 'RegisterExisting') {
            dispatch(registerFaceExisting(image, orientationCode, params));
          } else if (action === 'RegisterLockdown') {
            dispatch(authenticateFaceRegisterLogin(image, orientationCode));
          } else if (action === 'RegisterDrawer') {
            dispatch(authenticateFaceRegister(image, orientationCode));
          }
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__DETECT_FACE),
            Toast.LONG,
          );
        });
    }
  };
}
