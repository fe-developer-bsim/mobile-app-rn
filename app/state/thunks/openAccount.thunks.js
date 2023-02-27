import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import result from 'lodash/result';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import * as middlewareUtils from '../../utils/middleware.util';
import {getErrorMessage} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import {destroy} from 'redux-form';
import {refreshStorageNew, resetToDashboardFrom} from './common.thunks';

export function goToAndromaxForm () {
  return (dispatch, getState) => {
    const state = getState();
    const accounts = result(state, 'accounts', []);
    const smartfrenAccount = find(accounts, {'accountTypeCode': '6026'});
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    if (smartfrenAccount === undefined || isEmpty(smartfrenAccount)) {
      dispatch(actionCreators.showSpinner());
      return api.openAccountConfig(dispatch).then((res) => {
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.setOpenAccountConfig(res.data));
        dispatch(NavigationActions.navigate({routeName: 'OpenAndromaxForm'}));
      }).catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__GET_ACCOUNT_CONFIG_FAILED));
      });
    } else {
      const newModalOptions = {
        heading1: language.ANDROMAX_SIMOBIPLUS__SAVING_ALERT_MSG,
        text: language.ANDROMAX_SIMOBIPLUS__SAVING_ALERT_TEXT,
        button1: language.ANDROMAX_SIMOBIPLUS__OKAY,
        onButton1Press: hideAlert,
        onClose: hideAlert
      };
      dispatch(actionCreators.showSinarmasAlert({...newModalOptions}));
    }
  };
}

export function confirmOpenAndromax (values, amount, bankCode) {
  return (dispatch) => {
    const email = result(values, 'email', '');
    const accountNo = result(values, 'accountNo', '');
    const payload = middlewareUtils.prepareOpenAndromaxConfirm({email, accountNo, bankCode, amount});
    dispatch(actionCreators.showSpinner());
    return api.openAccountConfirmation(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      dispatch(NavigationActions.navigate({routeName: 'OpenAndromaxConfirmation', params: {email, accountNo, responseData: res.data, bankCode, amount}}));
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__GET_ACCOUNT_CONFIG_FAILED));
    });
  };
}

export function openAccountAndromax () {
  return (dispatch, getState) => {
    const state = getState();
    const easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    const transRefNum = state.transRefNum;
    const payload = middlewareUtils.prepareOpenAndromaxAccount({transRefNum, easyPin});
    let modalOptions = {
      heading: language.OPEN_NEW_ACCOUNT__IN_PROCESS,
      transactionType: language.OPEN_NEW_ACCOUNT__ACCOUNT_OPENING,
      transactionId: transRefNum
    };
    dispatch(actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}));
    dispatch(resetToDashboardFrom('OpenAndromaxScreen'));
    dispatch(NavigationActions.navigate({routeName: 'PaymentStatus'}));
    return api.openAccount(payload, dispatch).then(() => {
      modalOptions.logout = true;
      modalOptions.heading = language.OPEN_NEW_ACCOUNT__ELIGIBLE;
      dispatch(refreshStorageNew());
      dispatch(actionCreators.showPaymentModal({...modalOptions, type: 'SUCCESS'}));
      dispatch(destroy('OpenAndromaxForm'));
      dispatch(actionCreators.clearTransRefNum());
    }).catch((err) => {
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__GET_ACCOUNT_CONFIG_FAILED));
      modalOptions.heading = language.OPEN_NEW_ACCOUNT__ERROR;
      dispatch(refreshStorageNew());
      dispatch(actionCreators.showPaymentModal({...modalOptions, type: 'FAILED'}));
      dispatch(actionCreators.clearTransRefNum());
    });
  };
}
