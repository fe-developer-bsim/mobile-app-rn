import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import result from 'lodash/result';
import noop from 'lodash/noop';
import * as middlewareUtils from '../../utils/middleware.util';
import {storageKeys, set} from '../../utils/storage.util';
import {getErrorMessage, currencyFormatter} from '../../utils/transformer.util';
import {StackActions, NavigationActions} from 'react-navigation';
import {Toast} from '../../utils/RNHelpers.util.js';
import {destroy, reset} from 'redux-form';
import {language} from '../../config/language';
import {
  resetToDashboardFrom,
  refreshStorageNew,
  OtherResponseInquiry,
  errorResponseResult,
  inquirySimasPoin,
} from './common.thunks';

// WATER BILLPAYMENT
export function payWaterBill(bill) {
  return (dispatch, getState) => {
    const storeState = getState();
    const voucherId = result(
      storeState,
      'couponCheck.voucherId',
      '',
    ).toString();
    const easyPin = result(
      storeState,
      'form.AuthenticateForm.values.easypin',
      '',
    );
    const smsOtp = result(storeState, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(
      storeState,
      'form.AuthenticateForm.values.simasToken',
      '',
    );
    const formFields = result(
      storeState,
      'form.WaterBillerSelectionForm.values',
      {},
    );
    const accountNo = result(
      storeState,
      'form.WaterBillerPayment.values.accountNo',
      {},
    );
    const lastWaterPayment = result(
      storeState,
      'lastWaterPayments.allWaterPayments',
      '',
    );
    const transRefNum = storeState.transRefNum;
    const ownership = result(storeState, 'couponCheck.ownership', '');
    const additionalInfoMap = {voucherId, ownership};
    const payloadRaw = middlewareUtils.prepareWaterTransactionPayload({
      ...formFields,
      ...bill,
      accountNo,
      transRefNum,
      easyPin,
      smsOtp,
      simasToken,
    });
    const payload = {...payloadRaw, additionalInfoMap, ownership};
    const modalOptions = {
      subheading: `${formFields.waterBiller.name}`,
      amount: `Rp ${currencyFormatter(bill.billAmount)}`,
      heading: formFields.consumerNo,
      transactionId: transRefNum,
      transactionType: language.WATER_BILL__WATER_PAYMENT,
      accountFrom: accountNo,
    };
    dispatch(
      actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}),
    );
    dispatch(actionCreators.showSpinner());
    return api
      .resultWaterBill(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        dispatch(resetToDashboardFrom('PayScreen'));
        if (voucherId !== '') {
          dispatch(inquirySimasPoin());
        }
        dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
        dispatch(
          actionCreators.updateLastWaterPayments(
            middlewareUtils.getWaterBillHistory(formFields),
          ),
        );
        lastWaterPayment.push(middlewareUtils.getWaterBillHistory(formFields));
        set(storageKeys.ALL_WATER_TRANSACTIONS, lastWaterPayment).catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
            ),
            Toast.LONG,
          );
        });
        dispatch(refreshStorageNew());
        const resultDisplay = result(res, 'data.result.displayList', []);
        dispatch(
          actionCreators.showPaymentModal({
            ...modalOptions,
            resultDisplay,
            type: 'SUCCESS',
          }),
        );
        dispatch(destroy('WaterBillerSelectionForm'));
        dispatch(destroy('WaterBillerPayment'));
        dispatch(destroy('WaterBillerSummary'));
        dispatch(actionCreators.clearTransRefNum());
        dispatch(actionCreators.deleteCoupon());
      })
      .catch(err => {
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
          const errorText = getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_PAY_WATER_BILL,
          );
          dispatch(
            errorResponseResult(
              err,
              modalOptions,
              resultDisplay,
              errorText,
              accountNo,
            ),
          );
          dispatch(destroy('WaterBillerSelectionForm'));
          dispatch(destroy('WaterBillerPayment'));
          dispatch(destroy('WaterBillerSummary'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.deleteCoupon());
        }
      });
  };
}

export function enquireWaterBill() {
  return (dispatch, getState) => {
    const state = getState();
    const values = result(state, 'form.WaterBillerSelectionForm.values', {});
    dispatch(actionCreators.showSpinner());
    return api
      .enquireWaterBill(
        middlewareUtils.prepareWaterEnquiryPayload(values),
        dispatch,
      )
      .then(res => {
        const billerCode = result(
          values,
          'waterBiller.billerPreferences.code',
          '',
        );
        dispatch(actionCreators.savebillerCode({billerCode}));
        dispatch(
          NavigationActions.navigate({
            routeName: 'WaterBillPayment',
            params: {bill: res.data},
          }),
        );
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.deleteCoupon());
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        const defaultMessage = language.ERROR_MESSAGE__COULD_NOT_GET_WATER_BILL;
        OtherResponseInquiry(err, defaultMessage);
        dispatch(actionCreators.deleteCoupon());
      });
  };
}

export function updateWaterBillAmount() {
  return (dispatch, getState) => {
    const storeState = getState();
    const recentWaterPayments = result(
      storeState,
      'lastWaterPayments.recentWaterPayments',
      [],
    );
    let promises = [];
    recentWaterPayments.map(payment => {
      const payload = middlewareUtils.prepareWaterEnquiryPayload(payment);
      dispatch(actionCreators.showSpinner());
      const promiseToPush = api
        .enquireWaterBill(payload, dispatch)
        .then(res => {
          dispatch(actionCreators.hideSpinner());
          dispatch(
            actionCreators.updateLastWaterPaymentsBill({
              consumerNo: payment.consumerNo,
              ...res.data,
            }),
          );
        });
      promises.push(promiseToPush);
    });
    return Promise.all(promises)
      .then(noop)
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_GET_WATER_BILL_AMOUNT,
          ),
          Toast.LONG,
        );
      });
  };
}

export function confirmationWaterBill(bill) {
  return (dispatch, getState) => {
    const storeState = getState();
    const easyPin = result(
      storeState,
      'form.AuthenticateForm.values.easypin',
      '',
    );
    const smsOtp = result(storeState, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(
      storeState,
      'form.AuthenticateForm.values.simasToken',
      '',
    );
    const formFields = result(
      storeState,
      'form.WaterBillerSelectionForm.values',
      {},
    );
    const accountNo = result(
      storeState,
      'form.WaterBillerPayment.values.accountNo',
      {},
    );
    const transRefNum = storeState.transRefNum;
    const payload = middlewareUtils.prepareWaterTransactionPayload({
      ...formFields,
      ...bill,
      accountNo,
      transRefNum,
      easyPin,
      smsOtp,
      simasToken,
    });
    dispatch(actionCreators.showSpinner());
    return api
      .confirmationWaterBill(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const confirmationDisplay = result(res, 'data.result.displayList', []);
        const totalAmount = result(res, 'data.amount', 0);
        const bankCharge = result(res, 'data.bankCharge', 0);
        dispatch(actionCreators.deleteCoupon());
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'PayScreen'}),
              NavigationActions.navigate({
                routeName: 'WaterBillSummary',
                params: {confirmationDisplay, bill, totalAmount, bankCharge},
              }),
            ],
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        dispatch(destroy('WaterBillerSelectionForm'));
        dispatch(destroy('WaterBillerPayment'));
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_PAY_WATER_BILL,
          ),
          Toast.LONG,
        );
      });
  };
}
