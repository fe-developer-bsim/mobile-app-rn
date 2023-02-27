import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import result from 'lodash/result';
import * as middlewareUtils from '../../utils/middleware.util';
import {storageKeys, set} from '../../utils/storage.util';
import {getErrorMessage} from '../../utils/transformer.util';
import moment from 'moment';
import {Toast} from '../../utils/RNHelpers.util.js';
import {destroy, reset} from 'redux-form';
import {NavigationActions} from 'react-navigation';
import {language} from '../../config/language';
import {resetToDashboardFrom, refreshStorageNew, errorResponseResult, inquirySimasPoin} from './common.thunks';

// MOBILE TOPUP BILLPAYMENT
export function payMobileTopUp (biller) {
  return (dispatch, getState) => {
    const state = getState();
    const transactionTime = moment().format('DD MMM YYYY');
    const topupAmount = result(state, 'form.MobileTopupForm.values.topupAmount', {});
    const mobileNo = result(state, 'form.MobileTopupForm.values.mobileNo', '');
    const myAccount = result(state, 'form.MobileTopupForm.values.myAccount', {});
    const lastRecharges = result(state, 'lastRecharges.allRecharges', []);
    const smsOtp = result(state, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(state, 'form.AuthenticateForm.values.simasToken', '');
    const voucherId = result(state, 'couponCheck.voucherId', '').toString(); 
    const payloadRaw = middlewareUtils.prepareMobileTopup(biller, mobileNo, topupAmount, myAccount, smsOtp, simasToken, state.transRefNum);
    const ownership = result(state, 'couponCheck.ownership', '');
    const additionalInfoMap = {voucherId, ownership};
    const payload = {...payloadRaw, additionalInfoMap, ownership};
    const modalOptions = {
      subheading: mobileNo,
      amount: topupAmount.label,
      heading: biller.name,
      transactionId: state.transRefNum,
      transactionType: 'Mobile TopUp Payment',
      accountFrom: myAccount
    };
    dispatch(actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}));
    dispatch(actionCreators.showSpinner());
    return api.mobileTopup(payload, dispatch).
      then((res) => {
        dispatch(actionCreators.hideSpinner());
        dispatch(resetToDashboardFrom('PayScreen'));
        if (voucherId !== '') {
          dispatch(inquirySimasPoin());
        }
        dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
        const rechargeDetails = {
          accountFrom: myAccount.accountNumber,
          subscriberNoInput: mobileNo,
          amount: topupAmount,
          date: transactionTime,
          biller
        };
        dispatch(actionCreators.updateLastRecharges(middlewareUtils.getMobileTopupHistory(rechargeDetails)));
        lastRecharges.push(middlewareUtils.getMobileTopupHistory(rechargeDetails));
        set(storageKeys['ALL_RECHARGES'], lastRecharges).catch((err) => {
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION), Toast.LONG);
        });
        dispatch(refreshStorageNew());
        const resultDisplay = result(res, 'data.result.displayList', []);
        dispatch(actionCreators.showPaymentModal({...modalOptions, resultDisplay, type: 'SUCCESS'}));
        dispatch(destroy('MobileTopupForm'));
        dispatch(destroy('MobileTopupConfirmationForm'));
        dispatch(actionCreators.clearTransRefNum());
        dispatch(actionCreators.deleteCoupon());
      }).
      catch((err) => {
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
        if (easyPinAttempt === 'errHsm') {
          dispatch(actionCreators.hideSpinner());  
          dispatch(reset('AuthenticateForm')); 
          Toast.show(language.ERROR_MESSAGE_SYSTEM_UNDER_MAINTENANCE);             
        } else {
          dispatch(actionCreators.hideSpinner());
          dispatch(resetToDashboardFrom('PayScreen'));
          dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
          const resultDisplay = result(err, 'data.result.displayList', []);
          const errorText = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_MOBILE_TOPUP_BILL);
          dispatch(errorResponseResult(err, modalOptions, resultDisplay, errorText, myAccount));
          dispatch(destroy('MobileTopupForm'));
          dispatch(destroy('MobileTopupConfirmationForm'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.deleteCoupon());
        }
      });
  };
}

export function confirmationMobileTopUp (biller) {
  return (dispatch, getState) => {
    const state = getState();

    const topupAmount = result(state, 'form.MobileTopupForm.values.topupAmount', {});
    const mobileNo = result(state, 'form.MobileTopupForm.values.mobileNo', '');
    const myAccount = result(state, 'form.MobileTopupForm.values.myAccount', {});

    const easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    const smsOtp = result(state, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(state, 'form.AuthenticateForm.values.simasToken', '');
    dispatch(actionCreators.showSpinner());
    return api.confirmationMobileTopup(middlewareUtils.prepareMobileTopup(biller, mobileNo, topupAmount, myAccount, easyPin, smsOtp, simasToken, state.transRefNum), dispatch).
      then((res) => {
        const billerCode = result(biller, 'billerPreferences.code', '');
        dispatch(actionCreators.savebillerCode({billerCode}));
        dispatch(actionCreators.deleteCoupon());
        dispatch(actionCreators.hideSpinner());
        const confirmationDisplay = result(res, 'data', {});
        dispatch(NavigationActions.navigate({routeName: 'MobileTopupConfirmation', params: {biller, confirmationDisplay}}));
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        dispatch(destroy('MobileTopupForm'));
        dispatch(destroy('MobileTopupConfirmationForm'));
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_MOBILE_TOPUP_BILL), Toast.LONG);
      });
  };
}
