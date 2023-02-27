import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import result from 'lodash/result';
import * as middlewareUtils from '../../utils/middleware.util';
import {storageKeys, set} from '../../utils/storage.util';
import {getErrorMessage, currencyFormatter} from '../../utils/transformer.util';
import {Toast} from '../../utils/RNHelpers.util.js';
import {NavigationActions} from 'react-navigation';
import {destroy, reset} from 'redux-form';
import {language} from '../../config/language';
import {resetToDashboardFrom, refreshStorageNew, updateBalances} from './common.thunks';
import {getLuckyDipTicket} from './luckyDip.thunks';

// CREDIT CARD BILLPAYMENT

export function payCreditCard (values, accNo, billDetails, biller) {
  return (dispatch, getState) => {
    const storeState = getState();
    const selectedAccount = result(storeState, 'form.creditcard.values.myAccount', '');
    const transRefNum = storeState.transRefNum;
    const billerName = result(biller, '[0].name', '');
    const billerPreferences = result(biller, '[0].billerPreferences', '');
    const amount = result(storeState, 'form.creditcard.values.amount', '');
    const smsOtp = result(storeState, 'form.creditcard.values.smsOtp', '');
    const easyPin = result(storeState, 'form.creditcard.values.easyPin', '');
    const payload = middlewareUtils.prepareCreditCardPayload({easyPin, smsOtp, accNo, ...billDetails, amount, selectedAccount, billerPreferences, transRefNum});
    const modalOptions = {heading: `${billDetails.customerName}`, subheading: `${billerName}`, details: `${accNo}`, amount: `Rp ${currencyFormatter(payload.amount)}`, transactionType: language.CREDIT_CARD__CREDIT_CARD_PAYMENT,  transactionId: transRefNum};
    dispatch(actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}));
    dispatch(resetToDashboardFrom('PayScreen'));
    dispatch(NavigationActions.navigate({routeName: 'PaymentStatus'}));
    const allTransactions = result(storeState, 'lastCreditCardTransactions.allTransactions', []);
    const iscounterTrxData = result(storeState, 'counterTrxData', true);
    return api.creditCardTransaction(payload, dispatch).
      then((res) => {
        dispatch(actionCreators.updateLastCreditCardPayment({accNo, name: billDetails.customerName}));
        const resultDisplay = result(res, 'data.result.displayList', []);
        dispatch(actionCreators.showPaymentModal({...modalOptions, resultDisplay, type: 'SUCCESS'}));
        dispatch(actionCreators.clearTransRefNum());
        if (iscounterTrxData === false) {
          dispatch(refreshStorageNew());
        } else {
          dispatch(updateBalances());
          dispatch(getLuckyDipTicket());
        }
        allTransactions.push({accNo, name: billDetails.customerName});
        set(storageKeys['ALL_CREDIT_CARD_TRANSACTIONS'], allTransactions).catch((err) => {
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION), Toast.LONG);
        });
        dispatch(destroy('creditcard'));
      }).
      catch((err) => {
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
        if (easyPinAttempt === 'errHsm') {
          dispatch(actionCreators.hideSpinner());  
          dispatch(reset('AuthenticateForm')); 
          Toast.show(language.ERROR_MESSAGE_SYSTEM_UNDER_MAINTENANCE);             
        } else {
          const resultDisplay = result(err, 'data.result.displayList', []);
          dispatch(actionCreators.showPaymentModal({...modalOptions, resultDisplay, type: 'FAILED'}));
          dispatch(destroy('creditcard'));
          dispatch(actionCreators.clearTransRefNum());
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_CREDIT_CARD_BILL), Toast.LONG);
        }
      });
  };
}
