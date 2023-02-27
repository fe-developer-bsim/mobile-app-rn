import moment from 'moment';
import {Toast} from '../../utils/RNHelpers.util.js';
import {goTo, resetToDashboardFrom, getBillpayHistory, refreshStorageNew} from './common.thunks.js';
import {getErrorMessage} from '../../utils/transformer.util.js';
import result from 'lodash/result';
import {language} from '../../config/language';
import * as actionCreators from '../../state/actions/index.actions';
import api from '../../utils/api.util';
import {NavigationActions} from 'react-navigation';
import {storageKeys, get} from '../../utils/storage.util.js';
import {destroy} from 'redux-form';
import {fields as regisField} from '../../components/Genflix/GenflixRegistration.component.js';

export const GenflixUsernameQuery = (username) => (dispatch) => {
  const queryPayload = {email: username};
  return api.genflixQuery(queryPayload, dispatch).then(() => Promise.resolve({isUser: true})).catch((err) => {
    // 93 = MEMBER_NOT_FOUND
    const responseCode = result(err, 'data.responseCode', {});
    return responseCode === '93' ? Promise.resolve({isUser: false}) : Promise.reject(getErrorMessage(err, language.ERROR_MESSAGE__UNKNOWN_ERROR));
  });
};

export const GenflixUsernameRegistration = (username, password, accountInfo) => (dispatch, getState) => {
  const state = getState();
  const package_plan = '';
  const accountNumber = result(accountInfo, 'accountNumber', '');
  const easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
  const smsOtp = result(state, 'form.AuthenticateForm.values.otp', '');
  const simasToken = result(state, 'form.AuthenticateForm.values.simasToken', '');
  const genflixRegistrationPayload = {easyPin, smsOtp, simasToken, email: username, password, package_plan, accountNumber};
  return get(storageKeys['LANGUAGE']).then((lang) => api.genflixRegistration({...genflixRegistrationPayload, lang}, dispatch).then((res) => {
    Toast.show(`${language.GENFLIX__REGISTRATION_MESSAGE} ${username} ${language.GENFLIX__REGISTRATION_SUCCESSFUL}`, Toast.LONG);
    const data = result(res, 'data.data', {});
    const email = result(data, 'email', username);
    dispatch(actionCreators.setGenflixSubscriptionData({...data}));
    Toast.show(`${language.GENFLIX__REGISTRATION_MESSAGE} ${email} ${language.GENFLIX__REGISTRATION_SUCCESSFUL}`, Toast.LONG);
    const orderId = result(res, 'data.data.order_id', '');
    const date = result(res, 'resRegist.date', moment(new Date()).format('DD MM YYYY'));
    const dataDetail = [{key: 'GENFLIX__SUBSCRIPTION_ID', value: orderId}, {key: 'GENFLIX__DATE', value: date}];
    return Promise.resolve({...res, dataDetail});
  })).catch((err) => 
    Promise.reject(err)); 
};  

export const GenflixPaymentConfirmation = (username, password, account) => (dispatch) => {
  dispatch(actionCreators.setGenflixInfo({username, password, account}));
  const name = language.GENFLIX__NAME;
  const biller = {name};
  const params = {account, biller};
  dispatch(goTo('genflixConfirmation', params));
};

export const GenflixInit = () => (dispatch) => { 
  dispatch(actionCreators.showSpinner());
  return api.getEmail(dispatch).then((res) => {
    const data = result(res, 'data', {});
    const verifyToRegistration = () => (dispatch) => {
      dispatch(NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({routeName: 'PayScreen'}),
          NavigationActions.navigate({routeName: 'genflixInit'}),
        ]
      }));
    };
    const transactionId = 'genflixRegistration';
    const keyRoute = 'Pay';
    const params = {onSubmit: verifyToRegistration, keyRoute};
    dispatch(actionCreators.setGenflixInitData({...data}));
    dispatch(actionCreators.hideSpinner());
    return Promise.resolve({...data, params, transactionId});
  }).catch((err) => Promise.reject(err));
};

export const GenflixResult = (resData) => (dispatch, getState) => {
  const state = getState();
  dispatch(actionCreators.showSpinner());
  const isAutoDebit = 'yes';
  const biller = result(resData, 'biller', '');
  const transactionType = biller.name;
  dispatch(actionCreators.showSpinner());
  const genflixInfo = result(state, 'genflixData.genflixCustomerInfo', {});
  const username = result(genflixInfo, 'username', '');
  const password = result(genflixInfo, 'password', '');
  const account = result(genflixInfo, 'account', {});
  const transRefNum = state.transRefNum;
  const selectedAccount = result(resData, 'accountNo', '');
  let modalOptions = {
    subheading: `${biller.name}`,
    transactionType,
    transactionId: transRefNum,
    accountFrom: selectedAccount,
    isAutoDebit
  };
  dispatch(actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}));
  dispatch(actionCreators.showSpinner());
  return dispatch(GenflixUsernameRegistration(username, password, account)).then((res) => {
    modalOptions = {...modalOptions, heading: result(res, 'data.order_id', '')};
    dispatch(actionCreators.hideSpinner());
    dispatch(resetToDashboardFrom('PayScreen'));
    dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
    dispatch(getBillpayHistory());
    const dataDetail = result(res, 'dataDetail', []);
    dispatch(refreshStorageNew());
    dispatch(actionCreators.showPaymentModal({...modalOptions, dataDetail, type: 'SUCCESS'}));
    dispatch(actionCreators.clearTransRefNum());
    dispatch(destroyGenflixForms());
    dispatch(actionCreators.hideSpinner());
  }, dispatch(handleTxError({modalOptions}))).catch(handleTxError({modalOptions}));
};

const handleTxError = (props) => (dispatch) => (err) =>  {
  Toast.show(getErrorMessage(err.data, language.ERROR_MESSAGE__COULD_NOT_FINALIZE_AUTODEBIT));
  const modalOptions = result(props, 'modalOptions', {});
  dispatch(actionCreators.hideSpinner());
  dispatch(resetToDashboardFrom('PayScreen'));
  const errorText = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL);
  const dataDetail = [{key: 'COMMON__ERROR_MESSAGE', value: errorText}];
  dispatch(actionCreators.showPaymentModal({...modalOptions, dataDetail, type: 'FAILED'}));
  dispatch(destroyGenflixForms());
  dispatch(actionCreators.clearTransRefNum());
  dispatch(actionCreators.deleteCoupon());
  dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
};

const destroyGenflixForms = () => (dispatch) => {
  dispatch(destroy(regisField.formName));
  dispatch(destroy('AuthenticateForm'));
};
  