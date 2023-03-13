import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import {result} from 'lodash';
import {getErrorMessage} from '../../utils/transformer.util';
import {StackActions, NavigationActions} from 'react-navigation';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import moment from 'moment';
import {change} from 'redux-form';
import {logout} from '../thunks/onboarding.thunks';
import {Platform} from 'react-native';
import {checkEULA} from '../thunks/qrpayment.thunk';
import Permissions from 'react-native-permissions';
import {
  randomString,
  OBM_EncryptPassword,
  OBM_GetEncodingParameter,
  OBM_GetEncryptedPassword,
} from '../../utils/vendor/pinEncryption.util';

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

export function checkCameraPermission(routeName) {
  return dispatch => {
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
    dispatch(NavigationActions.navigate({routeName}));
  };
}

export function userAccountExisted() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToAtmRegister = () => {
      Promise.all([dispatch(logout())]).then(() => {
        dispatch(NavigationActions.navigate({routeName: 'RegisterAtm'}));
      });
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.ACCOUNT__REGISTERED,
      text: language.ACCOUNT__REGISTERED2,
      button1: language.GENERIC__CANCEL,
      onButton1Press: hideAlert,
      button2: language.GENERATE_CODE_FORM_BUTTON_NEXT,
      onButton2Press: goToAtmRegister,
      onClose: hideAlert,
      button1Color: 'black',
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function generatePhotoKTP(data) {
  return (dispatch, getState) => {
    const state = getState();
    const ktpId = result(
      state,
      'form.EmoneyImageConfirmation.values.ktpId',
      '',
    );
    const dob = moment(
      result(state, 'form.EmoneyImageConfirmation.values.birthDate', ''),
    ).format('YYYY-MM-DD');
    const maritalStatus = 'bypass';
    const mothersMaiden = 'bypass';
    const payload = {ktpId, dob, maritalStatus, mothersMaiden};
    dispatch(actionCreators.showSpinner());

    return api
      .dukcapilKTP(payload, dispatch)
      .then(res => {
        const responseCode = result(res, 'data.responseCode', '');
        const responseMessage = result(res, 'data.responseMessage', '');
        const token = result(res, 'data.token', '');

        if (responseCode === '00') {
          const ID = result(
            state,
            'form.EmoneyImageConfirmation.values.ktpId',
            '',
          );
          dispatch(actionCreators.showSpinner());
          return api
            .getCustomerProfile({ID, token}, dispatch)
            .then(res => {
              const responseCode = result(res, 'data.responseCode', '');
              const responseMessage = result(res, 'data.responseMessage', '');
              const resCustProfile = result(
                res,
                'data.responseGetCustomerProfileForUpgradeMap',
                {},
              );
              const isExist = result(resCustProfile, 'isExist', 'false');
              if (responseCode === '00') {
                if (isExist !== 'true') {
                  dispatch(actionCreators.hideSpinner());
                  dispatch(change('CameraKTPForm', 'imageData', data));
                  dispatch(change('CameraKTPForm', 'tokenDukcapil', token));
                  dispatch(NavigationActions.back());
                } else {
                  dispatch(actionCreators.hideSpinner());
                  dispatch(userAccountExisted());
                }
              } else {
                Toast.show(responseMessage, Toast.LONG);
                dispatch(actionCreators.hideSpinner());
              }
            })
            .catch(err => {
              Toast.show(
                getErrorMessage(err, language.EMONEY__EDW_PROFILE_FAILED),
                Toast.LONG,
              );
              dispatch(actionCreators.hideSpinner());
            });
        } else {
          Toast.show(responseMessage, Toast.LONG);
          dispatch(actionCreators.hideSpinner());
        }
      })
      .catch(err => {
        Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function generatePhotoKTPSelfie(data) {
  return dispatch => {
    dispatch(change('CameraSelfieKTPForm', 'imageData', data));
    dispatch(NavigationActions.back());
  };
}

export function generatePhotoSelfie(data) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const ktp = result(state, 'form.EmoneyImageConfirmation.values.ktpId', '');
    const selfiePhoto = result(data, 'base64', '');
    const tokenDukcapil = result(
      state,
      'form.CameraKTPForm.values.tokenDukcapil',
      '',
    );
    const payload = {ktp, selfiePhoto, tokenDukcapil};
    return api
      .checkSelfieImage(payload, dispatch)
      .then(res => {
        const responseCode = result(res, 'data.responseCode', '');
        const responseMessage = result(res, 'data.responseMessage', '');
        const selfieScore = result(res, 'data.selfieScore', '');
        const token = result(res, 'data.token', '');
        dispatch(actionCreators.hideSpinner());
        if (responseCode === '00') {
          dispatch(change('CameraSelfieForm', 'imageData', data));
          dispatch(change('CameraSelfieForm', 'selfieScore', selfieScore));
          dispatch(change('CameraSelfieForm', 'tokenSelfie', token));
          dispatch(NavigationActions.back());
        } else {
          Toast.show(responseMessage, Toast.LONG);
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

export const emoneyQRpermissions = () => dispatch => {
  if (Platform.OS === 'android') {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
      .then(status => {
        if ([PermissionsAndroid.RESULTS.GRANTED, true].includes(status)) {
          dispatch(checkEULA());
        } else {
          Toast.show(language.PERMISSION_ERROR__CONTACTS);
        }
      })
      .catch(() => {
        Toast.show(language.PERMISSION_ERROR__CONTACTS);
      });
  } else {
    Permissions.check('ios.permission.CAMERA').then(response => {
      if (response === 'granted') {
        dispatch(checkEULA());
      } else {
        Permissions.request('ios.permission.CAMERA').then(response => {
          if (response === 'granted') {
            dispatch(checkEULA());
          } else {
            Toast.show(language.PERMISSION__CAMERA, Toast.LONG);
          }
        });
      }
    });
  }
};

export function upgradeKYCNew() {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const ktpPhoto = result(
      state,
      'form.CameraKTPForm.values.imageData.base64',
      '',
    );
    const selfieWithKtpPhoto = result(
      state,
      'form.CameraSelfieKTPForm.values.imageData.base64',
      '',
    );
    const selfiePhoto = result(
      state,
      'form.CameraSelfieForm.values.imageData.base64',
      '',
    );
    const selfieScore = result(
      state,
      'form.CameraSelfieForm.values.selfieScore',
      '',
    );
    const nik = result(state, 'form.EmoneyImageConfirmation.values.ktpId', '');
    const dob = moment(
      result(state, 'form.EmoneyImageConfirmation.values.birthDate', ''),
    ).format('YYYY-MM-DD');
    const email = result(state, 'form.UpgradeEmoneyEmailForm.values.email', '');
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
    const transRefNum = result(state, 'transRefNum', '');
    const tokenDukcapil = result(
      state,
      'form.CameraKTPForm.values.tokenDukcapil',
      '',
    );
    const tokenEmail = result(state, 'form.OTPEmail.values.tokenEmail', '');
    const tokenSelfie = result(
      state,
      'form.CameraSelfieForm.values.tokenSelfie',
      '',
    );
    const payload = {
      ktpPhoto,
      selfiePhoto,
      selfieWithKtpPhoto,
      selfieScore,
      nik,
      dob,
      email,
      easyPin,
      transRefNum,
      tokenDukcapil,
      tokenEmail,
      tokenSelfie,
    };
    return api
      .upgradeKYCNew(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const responseCode = result(res, 'data.responseCode', '');
        if (responseCode === '00') {
          dispatch(
            NavigationActions.navigate({
              routeName: 'EmoneyUpgradeSuccessScreen',
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

export function requestEmailToken() {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const email = result(state, 'form.UpgradeEmoneyEmailForm.values.email', '');
    const typeEmailToken = '001'; // have ipassport
    const payload = {email, typeEmailToken};
    return api
      .sendEmailToken(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const responseCode = result(res, 'data.responseCode', '');
        if (responseCode === '00') {
          dispatch(
            NavigationActions.navigate({
              routeName: 'EmoneyUpgradeEmailVerification',
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

export function resendEmailToken() {
  return (dispatch, getState) => {
    const state = getState();
    const email = result(state, 'form.UpgradeEmoneyEmailForm.values.email', '');
    const typeEmailToken = '001'; // have ipassport
    const payload = {email, typeEmailToken};
    return api.sendEmailToken(payload, dispatch).catch(error => {
      Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function validateEmailToken() {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const otpCode = result(state, 'form.OTPEmail.values.emailToken', '');
    const typeEmailToken = '001'; // have ipassport
    const payload = {otpCode, typeEmailToken};
    return api
      .validateEmailToken(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const responseCode = result(res, 'data.responseCode', '');
        const token = result(res, 'data.token', '');
        if (responseCode === '00') {
          dispatch(change('OTPEmail', 'emailValid', true));
          dispatch(change('OTPEmail', 'tokenEmail', token));
          dispatch(
            StackActions.reset({
              index: 2,
              actions: [
                NavigationActions.navigate({routeName: 'Landing'}),
                NavigationActions.navigate({routeName: 'EmoneyUpgradeBenefit'}),
                NavigationActions.navigate({routeName: 'EmoneyUpgradeCamera'}),
              ],
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
