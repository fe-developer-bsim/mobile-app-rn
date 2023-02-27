import {Toast} from '../../utils/RNHelpers.util.js';
import {getErrorMessage, getCurrentRoute, maskedEmail as mask} from '../../utils/transformer.util.js';
import result from 'lodash/result';
import {language} from '../../config/language';
import * as actionCreators from '../../state/actions/index.actions';
import {NavigationActions} from 'react-navigation';
import api from '../../utils/api.util';
import tracker from '../../utils/googleAnalytics.util';
import {fields} from '../../components/EmailVerification/EmailVerification.component';
import {destroy} from 'redux-form';
import {fields as authFields} from '../../components/Authenticate/EmailAuthenticate.component.js';
import {storageKeys, get} from '../../utils/storage.util.js';

export const verifyEmail = (email, navParams = {}, transactionId = '') => (dispatch) => {
  const maskedEmail = mask(email);
  // send email to backend
  dispatch(actionCreators.showSpinner());
  dispatch(sendEmailOTP(email)).then(() => {
    const params = {shouldSendSmsOtp: true, email, maskedEmail, params: navParams, transactionId};
    dispatch(actionCreators.hideSpinner());
    dispatch(NavigationActions.navigate({routeName: 'EmailAuth', params}));
  }).catch((err) => {
    dispatch(actionCreators.hideSpinner());
    Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__UNKNOWN_ERROR), Toast.LONG);
  });
};

export const resetToVerify = (mainRoute, params = {}) => (dispatch, getState) => {
  const nav = result(getState(), 'nav', {});
  const currAction = result(getCurrentRoute(nav, mainRoute), 'routes', {});
  const mainAction = result(currAction, '0', {});
  dispatch(NavigationActions.reset({
    index: 1,
    actions: [
      NavigationActions.navigate({...mainAction}),
      NavigationActions.navigate({routeName: 'verifyEmail', params})
    ]
  }));
};

export const sendEmailOTP = (email) => (dispatch, getState) => {
  const userId = result(getState(), 'user.profile.customer.id', 0);
  dispatch(actionCreators.showSpinner());
  return get(storageKeys['LANGUAGE']).then((lang) => api.generateEmailOTP({email, lang}, dispatch)).then(() => { 
    dispatch(actionCreators.hideSpinner());
    tracker.trackEvent('RESEND_OTP', 'VERIF_EMAIL', null, {label: `userId:${userId}`});
  }).
    catch((err) => {
      dispatch(actionCreators.hideSpinner());
      return Promise.reject(getErrorMessage(err, language.EMAIL_OTP__CANNOT_SEND_OTP));
    });
};

export const verifyEmailOTP = (otpCode) => (dispatch) => {
  const verifyEmailOTPPayload = {otpCode};
  dispatch(actionCreators.showSpinner());
  return api.validateEmailOTP(verifyEmailOTPPayload, dispatch).then((res) => {
    const responseCode = result(res, 'data.responseCode', '');
    dispatch(actionCreators.hideSpinner());
    return responseCode === '00' ? Promise.resolve() : Promise.reject(getErrorMessage(res, language.ERROR_MESSAGE__UNKNOWN_ERROR));
  }).catch((err) => {
    dispatch(actionCreators.hideSpinner());
    return Promise.reject(getErrorMessage(err, language.ERROR_MESSAGE__UNKNOWN_ERROR)); 
  });
};

export const destroyEmailVerificationForms = () => (dispatch) => {
  dispatch(destroy(fields.formName));
  dispatch(destroy(authFields.formName));
  return Promise.resolve();
};