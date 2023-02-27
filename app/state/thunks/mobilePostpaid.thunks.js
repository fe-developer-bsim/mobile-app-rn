import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import result from 'lodash/result';
import * as middlewareUtils from '../../utils/middleware.util';
import {storageKeys, set} from '../../utils/storage.util';
import {getErrorMessage, currencyFormatter} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import {Toast} from '../../utils/RNHelpers.util.js';
import {destroy, reset} from 'redux-form';
import {language} from '../../config/language';
import {resetToDashboardFrom, refreshStorageNew, OtherResponseInquiry, errorResponseResult, inquirySimasPoin} from './common.thunks';
import {change} from 'redux-form';

// MOBILE POSTPAID BILLPAYMENT
export function getAmountForPostpaid (mobileNo, selectedBiller) {
  return (dispatch) => {
    const payload = middlewareUtils.preparePostpaidEnquiryPayload(mobileNo, selectedBiller);
    dispatch(actionCreators.showSpinner());
    dispatch(actionCreators.saveMobileNumber(mobileNo));

    return api.enquirePostpaidBill(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      dispatch(NavigationActions.navigate({routeName: 'MobilePostpaidPayment', params: {billDetails: res.data, biller: selectedBiller, mobileNo: mobileNo}}));
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      const defaultMessage = language.ERROR_MESSAGE__COULD_NOT_GET_POSTPAID_AMOUNT;
      OtherResponseInquiry(err, defaultMessage);
    });
  };
}

export function payPostpaidBill (biller, billDetails, accountFrom) {
  return (dispatch, getState) => {
    const storeState = getState();
    const smsOtp = result(storeState, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(storeState, 'form.AuthenticateForm.values.simasToken', '');
    const mobileNo = result(storeState, 'mobileNumber', '');
    const lastPostpaidPayment = result(storeState, 'lastPostpaidPayments.allTransactions', '');
    const transRefNum = storeState.transRefNum;
    const payloadRaw = middlewareUtils.preparePostpaidTransactionPayload({smsOtp, simasToken, transRefNum, biller, ...billDetails, selectedAccount: accountFrom, mobileNo});
    const voucherId = result(storeState, 'couponCheck.voucherId', '').toString();
    const ownership = result(storeState, 'couponCheck.ownership', '');
    const additionalInfoMap = {voucherId, ownership};
    const payload = {...payloadRaw, additionalInfoMap, ownership};
    const modalOptions = {
      subheading: mobileNo,
      amount: `Rp ${currencyFormatter(billDetails.billAmount)}`,
      heading: biller.name,
      transactionType: 'Mobile Postpaid Payment',
      transactionId: transRefNum,
      accountFrom
    };
    dispatch(actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}));
    dispatch(actionCreators.showSpinner());
    return api.resultMobilePostPaid(payload, dispatch).
      then((res) => {
        dispatch(actionCreators.hideSpinner());
        dispatch(resetToDashboardFrom('PayScreen'));
        if (voucherId !== '') {
          dispatch(inquirySimasPoin());
        }
        dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
        dispatch(actionCreators.updateLastPostpaidPayments(middlewareUtils.getMobilePostpaidHistory({biller, billDetails, mobileNo})));
        lastPostpaidPayment.push(middlewareUtils.getMobilePostpaidHistory({biller, billDetails, mobileNo}));
        set(storageKeys['ALL_POSTPAID_TRANSACTIONS'], lastPostpaidPayment).catch((err) => {
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION), Toast.LONG);
        });
        dispatch(refreshStorageNew());
        const resultDisplay = result(res, 'data.result.displayList', []);
        dispatch(actionCreators.showPaymentModal({...modalOptions, resultDisplay, type: 'SUCCESS'}));
        dispatch(destroy('MobilePostpaidForm'));
        dispatch(destroy('MobilePostpaidPaymentForm'));
        dispatch(destroy('MobilePostpaidConfirmationForm'));
        dispatch(actionCreators.clearTransRefNum());
        dispatch(actionCreators.clearMobileNumber());
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
          const errorText = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_POSTPAID_BILL);
          dispatch(errorResponseResult(err, modalOptions, resultDisplay, errorText, accountFrom));
          dispatch(destroy('MobilePostpaidForm'));
          dispatch(destroy('MobilePostpaidPaymentForm'));
          dispatch(destroy('MobilePostpaidConfirmationForm'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.deleteCoupon());
        }
      });
  };
}

export function goToPostpaidPayment (transaction) {
  return (dispatch) => {
    dispatch(change('MobilePostpaidForm', 'mobileNo', transaction.mobileNo));
    dispatch(NavigationActions.navigate({routeName: 'MobilePostpaidPayment', params: transaction}));
  };
}


export function confirmationPostpaidBill (biller, billDetails, mobileNo) {
  return (dispatch, getState) => {
    const storeState = getState();
    const easyPin = result(storeState, 'form.AuthenticateForm.values.easypin', '');
    const smsOtp = result(storeState, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(storeState, 'form.AuthenticateForm.values.simasToken', '');
    const selectedAccount = result(storeState, 'form.MobilePostpaidPaymentForm.values.accountNumber', '');
    const transRefNum = storeState.transRefNum;
    const payload = middlewareUtils.preparePostpaidTransactionPayload({easyPin, smsOtp, simasToken, transRefNum, biller, ...billDetails, selectedAccount, mobileNo});

    return api.confirmationMobilePostPaid(payload, dispatch).
      then((res) => {
        const billerCode = result(biller, 'billerPreferences.code', '');
        dispatch(actionCreators.savebillerCode({billerCode}));
        dispatch(actionCreators.deleteCoupon());
        const confirmationDisplay = result(res, 'data.result.displayList', []);
        const confirmationDisplayTop = result(res, 'data', {});
        dispatch(NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({routeName: 'PayScreen'}),
            NavigationActions.navigate({routeName: 'MobilePostpaidConfirmation',  params: {confirmationDisplay, mobileNo, biller, billDetails, confirmationDisplayTop, selectedAccount}})
          ]
        }));
      }).
      catch((err) => {
        dispatch(destroy('MobilePostpaidForm'));
        dispatch(destroy('MobilePostpaidPaymentForm'));
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_POSTPAID_BILL), Toast.LONG);
      });
  };
}
