import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import result from 'lodash/result';
import find from 'lodash/find';
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

// ELECTRICITY BILLPAYMENT
export function getAmountForElectricity(meterNo, selectedBiller) {
  return dispatch => {
    const payload = middlewareUtils.prepareElectricityEnquiryPayload({
      meterNo,
      selectedBiller,
    });
    dispatch(actionCreators.showSpinner());
    dispatch(actionCreators.saveNumberMeter(meterNo));
    return api
      .enquireElectricityBill(payload, dispatch)
      .then(res => {
        dispatch(refreshStorageNew());
        return res;
      })
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        dispatch(
          NavigationActions.navigate({
            routeName: 'ElectricityPayment',
            params: {billDetails: res.data, biller: selectedBiller},
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        const defaultMessage =
          language.ERROR_MESSAGE__COULD_NOT_GET_AMOUNT_ELECTRICITY;
        OtherResponseInquiry(err, defaultMessage);
      });
  };
}

export function payElectricityBill(biller, billDetails) {
  return (dispatch, getState) => {
    const storeState = getState();
    const smsOtp = result(storeState, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(
      storeState,
      'form.AuthenticateForm.values.simasToken',
      '',
    );
    const selectedAccount = result(
      storeState,
      'form.ElectricityBillerPayment.values.accountNo',
      '',
    );
    const denomination = result(
      storeState,
      'form.ElectricityBillerPayment.values.denomination',
      '',
    );
    const meterNo = result(storeState, 'numberMeter', '');
    const lastElectricityPayment = result(
      storeState,
      'lastElectricityPayments.allTransactions',
    );
    dispatch(actionCreators.showSpinner());
    const transRefNum = storeState.transRefNum;
    const payloadRaw = middlewareUtils.prepareElectricityPayload({
      smsOtp,
      simasToken,
      biller,
      ...billDetails,
      selectedAccount,
      meterNo,
      denomination,
      transRefNum,
    });
    const voucherId = result(
      storeState,
      'couponCheck.voucherId',
      '',
    ).toString();
    const ownership = result(storeState, 'couponCheck.ownership', '');
    const additionalInfoMap = {voucherId, ownership};
    const payload = {...payloadRaw, additionalInfoMap, ownership};
    const modalOptions = {
      subheading: `${biller.name}`,
      amount: `Rp ${currencyFormatter(payload.billAmount)}`,
      transactionType: language.ELECTRICITY__ELECTRICITY_PAYMENT,
      transactionId: transRefNum,
      accountFrom: selectedAccount,
    };
    dispatch(
      actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}),
    );
    return api
      .resultElectricityBill(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        dispatch(resetToDashboardFrom('PayScreen'));
        if (voucherId !== '') {
          dispatch(inquirySimasPoin());
        }
        dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
        dispatch(
          actionCreators.updateLastElectricityPayments(
            middlewareUtils.getElectricityBillHistory({
              biller,
              billDetails,
              meterNo,
            }),
          ),
        );
        lastElectricityPayment.push(
          middlewareUtils.getElectricityBillHistory({
            biller,
            billDetails,
            meterNo,
          }),
        );
        set(
          storageKeys.ALL_ELECTRICITY_TRANSACTIONS,
          lastElectricityPayment,
        ).catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
            ),
            Toast.LONG,
          );
        });
        const resultDisplay = result(res, 'data.result.displayList', []);
        const token =
          find(result(res, 'data.result.displayList', []), {
            key: 'STROOM/TOKEN',
          }) || {};
        dispatch(refreshStorageNew());
        dispatch(
          actionCreators.showPaymentModal({
            ...modalOptions,
            token: result(token, 'value', ''),
            resultDisplay,
            type: 'SUCCESS',
          }),
        );
        dispatch(destroy('ElectricityForm'));
        dispatch(destroy('ElectricityBillerPayment'));
        dispatch(destroy('ElectricityConfirmationForm'));
        dispatch(actionCreators.clearTransRefNum());
        dispatch(actionCreators.clearNumberMeter());
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
            language.ERROR_MESSAGE__COULD_NOT_PAY_ELECTRICITY_BILL,
          );
          dispatch(
            errorResponseResult(
              err,
              modalOptions,
              resultDisplay,
              errorText,
              selectedAccount,
            ),
          );
          dispatch(destroy('ElectricityAccountForm'));
          dispatch(destroy('ElectricityBillerPayment'));
          dispatch(destroy('ElectricityConfirmationForm'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.deleteCoupon());
        }
      });
  };
}

export function confirmationElectricityBill(
  biller,
  billDetails,
  isPrepaidBiller,
) {
  return (dispatch, getState) => {
    const storeState = getState();
    const smsOtp = result(storeState, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(
      storeState,
      'form.AuthenticateForm.values.simasToken',
      '',
    );
    const selectedAccount = result(
      storeState,
      'form.ElectricityBillerPayment.values.accountNo',
      '',
    );
    const denomination = result(
      storeState,
      'form.ElectricityBillerPayment.values.denomination',
      {},
    );
    const meterNo = result(
      storeState,
      'form.ElectricityForm.values.meterNo',
      '',
    );
    const transRefNum = storeState.transRefNum;
    const payload = middlewareUtils.prepareElectricityPayload({
      smsOtp,
      simasToken,
      biller,
      ...billDetails,
      selectedAccount,
      meterNo,
      denomination,
      transRefNum,
    });
    dispatch(actionCreators.showSpinner());
    return api
      .confirmationElectricityBill(payload, dispatch)
      .then(res => {
        const billerCode = result(biller, 'billerPreferences.code', '');
        dispatch(actionCreators.savebillerCode({billerCode}));
        dispatch(actionCreators.deleteCoupon());
        const confirmationDisplay = result(res, 'data.result.displayList', []);
        const confirmationDisplayTop = result(res, 'data', {});
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.deleteCoupon());
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'PayScreen'}),
              NavigationActions.navigate({
                routeName: 'ElectricityConfirmation',
                params: {
                  biller,
                  billDetails,
                  denomination,
                  isPrepaidBiller,
                  accountNo: selectedAccount,
                  confirmationDisplay,
                  confirmationDisplayTop,
                },
              }),
            ],
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_PAY_ELECTRICITY_BILL,
          ),
          Toast.LONG,
        );
      });
  };
}
