import * as actionCreators from '../actions/index.actions';
import api from '../../utils/api.util';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import {result} from 'lodash';
import * as middlewareUtils from '../../utils/middleware.util';
import {destroy, change, reset} from 'redux-form';
import {StackActions, NavigationActions} from 'react-navigation';
import {
  resetToDashboardFrom,
  refreshStorage,
  refreshStorageNew,
  updateBalances,
  errorResponseResult,
} from '../../state/thunks/common.thunks';
import noBanner from '../../assets/images/block.png';
import {logout} from './onboarding.thunks.js';
import {getErrorMessage} from '../../utils/transformer.util';

export function confirmBlockCreditCard() {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const smsPriority = Boolean(
      result(getState(), 'config.smsPriority.payment_send', false),
    );
    return api
      .confirmBlockCreditCard({smsPriority}, dispatch)
      .then(response => {
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.saveTransRefNum(response.data.transRefNum));
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

export function requestBlockCreditCard(accountNumber) {
  return (dispatch, getState) => {
    const storeState = getState();
    const smsOtp = result(storeState, 'form.AuthenticateForm.values.otp', '');
    const transRefNum = storeState.transRefNum;
    const payload = middlewareUtils.prepareRequestBlockCreditCardPayload({
      accountNumber,
      smsOtp,
      transRefNum,
    });
    const modalOptions = {
      transactionType: language.TIME_DEPOSIT__CLOSE_PROGRESS_MSG,
      transactionId: transRefNum,
    };
    dispatch(
      actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}),
    );
    dispatch(actionCreators.showSpinner());
    return api
      .requestBlockCreditCard(payload, dispatch)
      .then(response => {
        dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
        const modalOptions = {
          heading1: language.DASHBOARD__BLOCK_CREDIT_CARD_SUCCESS,
          text:
            result(response, 'data.responseCode', '') === '00'
              ? language.DASHBOARD__BLOCK_CREDIT_CARD_SUCCESS_MESSAGE
              : '',
          button1: language.GENERIC__OK,
          onButton1Press: () => dispatch(actionCreators.hideSinarmasAlert()),
          closeOnTouchOutside: false,
          isManageCc: true,
        };
        dispatch(
          actionCreators.showPaymentModal({
            ...modalOptions,
            type: 'SUCCESS',
            subheading:
              language.TIME_DEPOSIT__TD_ACCOUNT_NUMBER +
              ' ' +
              response.data.newAccountNumber,
            responseMessage: String(result(response, 'data.responseMessage')),
            accountFrom: accountNumber,
          }),
        );
        dispatch(actionCreators.hideSpinner());
        dispatch(destroy('BlockCreditCardForm'));
        dispatch(destroy('CreditCardManageForm'));
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        dispatch(destroy('BlockCreditCardForm'));
        dispatch(destroy('CreditCardManageForm'));
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

export function confirmCreditCardOption() {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const smsPriority = Boolean(
      result(getState(), 'config.smsPriority.payment_send', false),
    );
    return api
      .confirmCreditCardOption({smsPriority}, dispatch)
      .then(response => {
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.saveTransRefNum(response.data.transRefNum));
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

export function requestCreditCardOption(request) {
  return (dispatch, getState) => {
    const storeState = getState();
    const smsOtp = result(storeState, 'form.AuthenticateForm.values.otp', '');
    const transRefNum = result(storeState, 'transRefNum');
    const payload = middlewareUtils.prepareRequestCreditCardOptionPayload({
      ...request,
      smsOtp,
      transRefNum,
    });
    const isFromcc = true;
    dispatch(actionCreators.showSpinner());
    return api
      .requestCreditCardOption(payload, dispatch)
      .then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(
          StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: 'homeRoutes',
                params: {isFromcc},
              }),
            ],
          }),
        );
        dispatch(NavigationActions.back());
        dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
        dispatch(
          actionCreators.showPaymentModal({
            ...modalOptions,
            type: 'SUCCESS',
            responseMessage: result(request, 'successMessage', ''),
            isManageCc: true,
          }),
        );
        const modalOptions = {
          heading1: request.successTitle,
          text: request.successMessage,
          button1: language.GENERIC__OK,
          onButton1Press: () => dispatch(actionCreators.hideSinarmasAlert()),
          closeOnTouchOutside: false,
        };
        dispatch(destroy('CreditCardManageConfirmationForm'));
        dispatch(destroy('CreditCardManageInputForm'));
        dispatch(actionCreators.hideSpinner());
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        dispatch(destroy('CreditCardManageConfirmationForm'));
        dispatch(destroy('CreditCardManageInputForm'));
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

export function confirmCreditCardChangeLimit() {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const smsPriority = Boolean(
      result(getState(), 'config.smsPriority.payment_send', false),
    );
    return api
      .confirmCreditCardChangeLimit({smsPriority}, dispatch)
      .then(response => {
        const modalOptions = {
          heading1: language.DASHBOARD__BLOCK_CREDIT_CARD_SUCCESS,
          text:
            result(response, 'data.responseCode', '') === '00'
              ? language.DASHBOARD__BLOCK_CREDIT_CARD_SUCCESS_MESSAGE
              : '',
          button1: language.GENERIC__OK,
          onButton1Press: () => dispatch(actionCreators.hideSinarmasAlert()),
          closeOnTouchOutside: false,
        };
        dispatch(
          actionCreators.showPaymentModal({
            ...modalOptions,
            type: 'SUCCESS',
            subheading:
              language.TIME_DEPOSIT__TD_ACCOUNT_NUMBER +
              ' ' +
              response.data.newAccountNumber,
            transactionId: response.data.transRefNum,
            onClose: () => dispatch(resetToDashboardFrom('homeRoutes')),
            responseMessage:
              language.DASHBOARD__CREDIT_CARD_CHANGE_LIMIT_REQUEST,
            isManageCc: true,
          }),
        );
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.saveTransRefNum(response.data.transRefNum));
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

export function requestCreditCardChangeLimit(request) {
  return (dispatch, getState) => {
    const storeState = getState();
    const smsOtp = result(storeState, 'form.AuthenticateForm.values.otp', '');
    const transRefNum = result(storeState, 'transRefNum');
    const isFromcc = true;
    const payload = middlewareUtils.prepareRequestCreditCardChangeLimitPayload({
      ...request,
      smsOtp,
      transRefNum,
    });
    dispatch(actionCreators.showSpinner());
    return api
      .requestCreditCardChangeLimit(payload, dispatch)
      .then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(
          StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: 'homeRoutes',
                params: {isFromcc},
              }),
            ],
          }),
        );
        dispatch(NavigationActions.back());
        dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
        const modalOptions = {
          heading1: language.DASHBOARD__BLOCK_CREDIT_CARD_SUCCESS,
          button1: language.GENERIC__OK,
          onButton1Press: () => dispatch(actionCreators.hideSinarmasAlert()),
          closeOnTouchOutside: false,
          isManageCc: true,
        };
        dispatch(
          actionCreators.showPaymentModal({
            ...modalOptions,
            type: 'SUCCESS',
            responseMessage: result(request, 'successMessage', ''),
            isManageCc: true,
          }),
        );
        dispatch(destroy('CreditCardManageConfirmationForm'));
        dispatch(destroy('CreditCardManageInputForm'));
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
        dispatch(destroy('CreditCardManageConfirmationForm'));
        dispatch(destroy('CreditCardManageInputForm'));
      });
  };
}

export function blockCC(selectedAccount) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    const status = result(selectedAccount, 'cardStatus', '');
    const cardbase = result(selectedAccount, 'cardBase', '');
    const inactive = status === '0' && cardbase === 'virtualCreditCard';
    const statact = status === '1' || inactive ? 'B' : 'U';
    const panNumber = result(selectedAccount, 'accountNumber', '');
    const actCode = statact;
    const msgStat = 'DC';
    const reason = 'BC';
    if (statact !== 'U') {
      dispatch(NavigationActions.back());
    }
    dispatch(actionCreators.showSpinner());
    return api
      .creditcardBlockUnblock(
        {panNumber, actCode, msgStat, reason, easyPin},
        dispatch,
      )
      .then(() => {
        dispatch(refreshStorage());
        if (statact === 'U') {
          dispatch(NavigationActions.back());
        }
        dispatch(actionCreators.hideSpinner());
        dispatch(blockCCSuccess(selectedAccount));
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        dispatch(blockCCFailed(selectedAccount, err));
      });
  };
}

export function blockCCSuccess(selectedAccount) {
  return dispatch => {
    const status = result(selectedAccount, 'cardStatus', '');
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1:
        status === '1' || status === '0'
          ? language.DASHBOARD__CREDIT_BLOCK_SUCCESS
          : language.DASHBOARD__CREDIT_UNBLOCK_SUCCESS,
      text:
        status === '1' || status === '0'
          ? language.DASHBOARD__CREDIT_BLOCK_SUCCESS_2
          : language.DASHBOARD__CREDIT_UNBLOCK_SUCCESS_TEXT,
      button1: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
      closeOnTouchOutside: false,
      image: noBanner,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function blockCCFailed(selectedAccount, err) {
  return dispatch => {
    const status = result(selectedAccount, 'cardStatus', '');
    dispatch(NavigationActions.back());
    const isPin = result(err, 'data.responseCode', '');
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1:
        status === '1' || status === '0'
          ? language.DASHBOARD__CREDIT_BLOCK_FAILED
          : language.DASHBOARD__CREDIT_UNBLOCK_FAILED,
      text:
        isPin === '17' && status === '1'
          ? language.DASHBOARD__EASYPIN_FAILED
          : isPin === '17' && status === '2'
          ? language.DASHBOARD__EASYPIN_FAILED
          : status === '2'
          ? language.DASHBOARD__CREDIT_BLOCK_SUCCESS_FAILED
          : status === '1' || status === '0'
          ? language.DASHBOARD__CREDIT_UNBLOCK_SUCCESS_FAILED
          : null,
      button1: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
      closeOnTouchOutside: false,
      image: noBanner,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function createPin(selectedAccount) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const panNumber = result(
      selectedAccount,
      'selectedAccount.accountNumber',
      '',
    );
    const inputPIN = result(
      state,
      'form.PinCreationConfirmForm.values.PinConfirm',
      '',
    );
    const easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    const payload = {panNumber, inputPIN, easyPin};
    dispatch(NavigationActions.back());
    dispatch(actionCreators.showSpinner());
    return api
      .createPINVCC(payload, dispatch)
      .then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.back());
        dispatch(pinSuccess(selectedAccount));
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.back());
        dispatch(pinFailed(selectedAccount, err));
      });
  };
}

export function pinSuccess() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.DASHBOARD__CREDIT_CREATE_PIN_SUCCESS,
      text: language.DASHBOARD__CREDIT_CREATE_PIN_SUCCESS_TEXT,
      button1: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
      closeOnTouchOutside: false,
      image: noBanner,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function pinFailed(SelectedAccount, err) {
  return dispatch => {
    const isPin = result(err, 'data.responseCode', '');
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.DASHBOARD__CREDIT_CREATE_PIN_FAILED,
      text:
        isPin === '17'
          ? language.DASHBOARD__EASYPIN_FAILED
          : language.DASHBOARD__CREDIT_CREATE_PIN_SUCCESS_FAILED,
      button1: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
      closeOnTouchOutside: false,
      image: noBanner,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function getExistingData(selectedAccount) {
  return dispatch => {
    const panNumber = result(selectedAccount, 'accountNumber', '');
    const payload = {panNumber};

    dispatch(actionCreators.showSpinner());
    return api
      .getAddressCC(payload, dispatch)
      .then(res => {
        const checkpointData = result(res, 'data.data.dataDukcapil', {});
        const checkpointData2 = result(res, 'data.data.dataFromCore', {});
        dispatch(actionCreators.saveCheckpoint(checkpointData));
        dispatch(actionCreators.hideSpinner());
        dispatch(
          change('CCForm2', 'province2', result(checkpointData, '0~3~2', '')),
        );
        dispatch(
          change('CCForm2', 'city2', result(checkpointData, '0~3~3', '')),
        );
        dispatch(
          change('CCForm2', 'district2', result(checkpointData, '0~3~5', '')),
        );
        dispatch(
          change('CCForm2', 'country2', result(checkpointData, '0~3~1', '')),
        );
        dispatch(
          change(
            'CCForm2',
            'subDistrict2',
            result(checkpointData, '0~3~4', ''),
          ),
        );
        dispatch(
          change(
            'CCForm2',
            'streetAddress',
            result(checkpointData, '0~3~8', ''),
          ),
        );
        dispatch(
          change(
            'CCForm2',
            'postalCode2',
            result(checkpointData2, '0~6~18', ''),
          ),
        );
        dispatch(change('CCForm2', 'rt2', result(checkpointData, '0~3~7', '')));
        dispatch(
          change(
            'CCForm2',
            'streetAddress2',
            result(checkpointData, '0~2~8', ''),
          ),
        );
        dispatch(
          NavigationActions.navigate({
            routeName: 'CreditCardManageDeliveryScreen',
            params: {selectedAccount},
          }),
        );
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function getExistingDataNew(selectedAccount) {
  return dispatch => {
    const panNumber = result(selectedAccount, 'accountNumber', '');

    dispatch(actionCreators.showSpinner());
    return api
      .getAddressCCNew({panNumber}, dispatch)
      .then(res => {
        const checkpointData = result(res, 'data.address', {});
        dispatch(actionCreators.saveCheckpoint(checkpointData));
        dispatch(actionCreators.hideSpinner());
        dispatch(
          NavigationActions.navigate({
            routeName: 'CreditCardManageDeliveryScreen',
            params: {selectedAccount},
          }),
        );
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function sendCCAddress(selectedAccount) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const panNumber = result(selectedAccount, 'accountNumber', '');
    const CrdDelivOpt = result(
      state,
      'form.cardDelivery.values.deliveryMode.type',
      '',
    );
    const easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    const payload = {panNumber, CrdDelivOpt, easyPin};
    dispatch(actionCreators.showSpinner());
    return api
      .printCardVCC(payload, dispatch)
      .then(() => {
        dispatch(refreshStorageNew());
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.back());
        dispatch(sendSuccess(selectedAccount));
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.back());
        dispatch(sendFailed(selectedAccount, err));
      });
  };
}

export function getCreditCardHistory(selectedAccount) {
  return dispatch => {
    const accountNumber = result(selectedAccount, 'accountNumber', '');
    dispatch(actionCreators.showSpinner());
    dispatch(actionCreators.clearTransactions());
    const payload =
      middlewareUtils.prepareCcInstallmentHistoryPayload(accountNumber);
    return api
      .creditCardStatement(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const filterAction = actionCreators.updateCcHistory;
        const trans = dispatch(
          filterAction(
            middlewareUtils.getMiniStatementCreditCardInstallment(res.data),
          ),
        );
        const CCtransaction = trans.payload;
        dispatch(
          NavigationActions.navigate({
            routeName: 'CreditCardConvertInstallment',
            params: {selectedAccount, CCtransaction},
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_TRANSACTION_HISTORY,
          ),
          Toast.LONG,
        );
      });
  };
}

export function getInstallmentPeriode(selectedAccount, amount, formValues) {
  return dispatch => {
    const accountNumber = result(selectedAccount, 'accountNumber', '');
    dispatch(actionCreators.showSpinner());
    const payload = middlewareUtils.prepareCcInstallmentPeriode(
      accountNumber,
      amount,
    );
    return api
      .creditCardSetInstallment(payload, dispatch)
      .then(() => {
        dispatch(actionCreators.hideSpinner());
        // const resultData = result(res, 'data.eppCodeList', []);
        // const trans = middlewareUtils.getCreditCardInstallmentPeriode(resultData);
        // const cCperiode = trans;
        // const interest = result(resultData, 'interestAmount', []);
        dispatch(
          NavigationActions.navigate({
            routeName: 'CreditCardManageSetInstallment',
            params: {selectedAccount, formValues},
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__GET_PERIODE),
          Toast.LONG,
        );
      });
  };
}

export function getInstallmentPeriodeNew(selectedAccount, amount) {
  return dispatch => {
    const accountNumber = result(selectedAccount, 'accountNumber', '');
    dispatch(actionCreators.showSpinner());
    const payload = middlewareUtils.prepareCcInstallmentPeriode(
      accountNumber,
      amount,
    );
    return api
      .creditCardSetInstallment(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const resultData = result(res, 'data.eppCodeList', []);
        const trans =
          middlewareUtils.getCreditCardInstallmentPeriode(resultData);
        dispatch(actionCreators.saveCCPeriod(trans));
      })
      .catch(() => {
        const isDisable = true;
        dispatch(actionCreators.saveInstallmentToogle(isDisable));
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function getInstallmentPeriodeManage(
  selectedAccount,
  amount,
  formValues,
) {
  return dispatch => {
    const accountNumber = result(selectedAccount, 'accountNumber', '');
    dispatch(actionCreators.showSpinner());
    const payload = middlewareUtils.prepareCcInstallmentPeriode(
      accountNumber,
      amount,
    );
    return api
      .creditCardSetInstallment(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const resultData = result(res, 'data.eppCodeList', []);
        const trans =
          middlewareUtils.getCreditCardInstallmentPeriode(resultData);
        dispatch(actionCreators.saveCCPeriod(trans));
        dispatch(
          NavigationActions.navigate({
            routeName: 'CreditCardManageSetInstallment',
            params: {selectedAccount, formValues},
          }),
        );
      })
      .catch(() => {
        const isDisable = true;
        dispatch(actionCreators.saveInstallmentToogle(isDisable));
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function changeToInstallmet(
  selectedAccount,
  amount,
  arn,
  schmeId,
  periode,
  formValues,
) {
  return (dispatch, getState) => {
    const state = getState();
    const accountNumber = result(selectedAccount, 'accountNumber', '');
    const serverToken = result(state, 'appInitKeys.tokenServer', {});
    const transRefNum = result(state, 'transRefNum');
    const sessionId = result(state, 'additionalApiPayload.sessionCode', {});
    dispatch(actionCreators.showSpinner());
    const payload = middlewareUtils.prepareCcChangeInstallment(
      accountNumber,
      amount,
      serverToken,
      transRefNum,
      sessionId,
      arn,
      schmeId,
      periode,
      formValues,
    );
    return api
      .creditCardChangeInstallment(payload, dispatch)
      .then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Landing'})],
          }),
        );
        dispatch(
          NavigationActions.navigate({
            routeName: 'CreditCardTransactionSuccess',
            params: {selectedAccount, periode, formValues},
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        if (err.data.responseCode === '17') {
          dispatch(reset('AuthenticateForm'));
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__CONVERT_INSTALLMENT),
            Toast.LONG,
          );
        } else if (err.data.responseCode === '01') {
          dispatch(actionCreators.clearTransRefNum());
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__SAVE_TXN),
            Toast.LONG,
          );
          dispatch(logout());
        } else {
          dispatch(NavigationActions.back(null));
          dispatch(NavigationActions.back(null));
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__CONVERT_INSTALLMENT),
            Toast.LONG,
          );
        }
      });
  };
}

export function GetTxnManage(selectedAccount) {
  return dispatch => {
    const accountNumber = result(selectedAccount, 'accountNumber', '');
    dispatch(actionCreators.showSpinner());
    const payload = middlewareUtils.prepareCcGetTxnManage(accountNumber);
    return api
      .creditCardGetTxnManage(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.saveCCTransManage(res.data));
        const TxnValue = res.data;
        dispatch(
          NavigationActions.navigate({
            routeName: 'CreditCardTransactionManagement',
            params: {selectedAccount, TxnValue},
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__GET_TXN),
          Toast.LONG,
        );
      });
  };
}

export function GetTxnManageStatus(selectedAccount) {
  return dispatch => {
    const accountNumber = result(selectedAccount, 'accountNumber', '');
    dispatch(actionCreators.showSpinner());
    const payload = middlewareUtils.prepareCcGetTxnManage(accountNumber);
    return api
      .creditCardGetTxnManage(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.saveCCTransManage(res.data));
        // const TxnValue = res.data;
        // dispatch(NavigationActions.navigate({routeName: 'CreditCardTransactionManagement', params: {selectedAccount, TxnValue}}));
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__GET_TXN),
          Toast.LONG,
        );
      });
  };
}

export function TxnManage(
  selectedAccount,
  flagECommerce,
  flagCav,
  flagOverSeas,
  allowEcommTxn,
  allowCavTxn,
  allowOverseaTxn,
) {
  return (dispatch, getState) => {
    const state = getState();
    const accountNumber = result(selectedAccount, 'accountNumber', '');
    const serverToken = result(state, 'appInitKeys.tokenServer', {});
    const transRefNum = result(state, 'transRefNum');
    const sessionId = result(state, 'additionalApiPayload.sessionCode', {});
    dispatch(actionCreators.showSpinner());
    const payload = middlewareUtils.prepareCcTxnManage(
      accountNumber,
      serverToken,
      transRefNum,
      sessionId,
      flagECommerce,
      flagCav,
      flagOverSeas,
      allowEcommTxn,
      allowCavTxn,
      allowOverseaTxn,
    );
    return api
      .creditCardTxnManage(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.saveCCTransManage(res.data));
        dispatch(NavigationActions.back());
        Toast.show(
          language.DASHBOARD__CREDIT_CARD_MANAGEMENT_UPDATE,
          Toast.LONG,
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        if (err.data.responseCode === '17') {
          dispatch(reset('AuthenticateForm'));
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__SAVE_TXN),
            Toast.LONG,
          );
        } else if (err.data.responseCode === '01') {
          dispatch(actionCreators.clearTransRefNum());
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__SAVE_TXN),
            Toast.LONG,
          );
          dispatch(logout());
        } else {
          dispatch(NavigationActions.back());
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__SAVE_TXN),
            Toast.LONG,
          );
        }
      });
  };
}

export function getCreditCardDetail(selectedAccount) {
  return dispatch => {
    const payload = middlewareUtils.prepareCreditCart(selectedAccount);
    dispatch(actionCreators.showSpinner());
    return api
      .getCreditCard(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const CCDetail = middlewareUtils.getCreditCardCA(
          res.data,
          selectedAccount,
        );
        dispatch(
          NavigationActions.navigate({
            routeName: 'CreditCardCashAdvance',
            params: {selectedAccount, CCDetail},
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_GET_CC_DETAIL),
          Toast.LONG,
        );
      });
  };
}

export function getCashAdvanceFee(ccAccount, destAcc, amount, note) {
  return dispatch => {
    const payload = middlewareUtils.prepareCcCashAdvanceFee(
      {amount},
      ccAccount,
      destAcc,
    );
    dispatch(actionCreators.showSpinner());
    return api
      .creditCardCashAdvanceFee(payload, dispatch)
      .then(res => {
        const resData = res.data;
        dispatch(
          NavigationActions.navigate({
            routeName: 'CreditCardCashAdvanceConfirm',
            params: {ccAccount, destAcc, amount, note, resData},
          }),
        );
        dispatch(actionCreators.hideSpinner());
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_GET_CA_FEE),
          Toast.LONG,
        );
      });
  };
}

export function confirmCashAdvance(ccAccount, destAcc, amt, note, fee, total) {
  return (dispatch, getState) => {
    const state = getState();
    const fromAccount = result(ccAccount, 'accountNumber', '');
    const destAccount = result(destAcc, 'accountNumber', '');
    const amount = amt;
    const feeAmount = fee;
    const totalAmount = total;
    const transRefNum = result(state, 'transRefNum');
    const serverToken = result(state, 'appInitKeys.tokenServer', {});
    const iscounterTrxData = result(state, 'counterTrxData', true);
    let trxType;
    const modalOptions = {
      fromAccount: fromAccount,
      destAccount: destAccount,
      amount: amount,
      feeAmount: feeAmount,
      totalAmount: totalAmount,
      transRefNum: transRefNum,
      trxType: language.CREDITCARD__CASH_ADVANCE_TITLE,
    };
    const payload = {
      fromAccount,
      destAccount,
      amount,
      feeAmount,
      transRefNum,
      serverToken,
    };
    dispatch(actionCreators.showSpinner());
    return api
      .creditCardCashAdvance(payload, dispatch)
      .then(res => {
        const resData = res.data;
        dispatch(actionCreators.hideSpinner());
        dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Landing'})],
          }),
        );
        dispatch(
          actionCreators.showPaymentModal({
            ...modalOptions,
            transactionType: trxType,
            type: 'SUCCESS',
          }),
        );
        dispatch(
          NavigationActions.navigate({
            routeName: 'CreditCardCashAdvanceSuccess',
            params: {
              ccAccount,
              destAcc,
              amt,
              fee,
              note,
              transRefNum,
              resData,
              totalAmount,
            },
          }),
        );
        if (iscounterTrxData === false) {
          dispatch(refreshStorageNew());
        } else {
          dispatch(updateBalances());
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
        if (easyPinAttempt === 'invalid') {
          dispatch(reset('AuthenticateForm'));
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_TRANSFER),
            Toast.LONG,
          );
        } else if (easyPinAttempt === 'blocked') {
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.clearTransRefNum());
          Toast.show(language.ERROR_MESSAGE_BLOCKED_EASYPIN_TRANSACTION);
          dispatch(logout());
        } else if (easyPinAttempt === 'errHsm') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          Toast.show(language.ERROR_MESSAGE_SYSTEM_UNDER_MAINTENANCE);
        } else {
          dispatch(
            StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'Landing'})],
            }),
          );
          dispatch(
            NavigationActions.navigate({
              routeName: 'CreditCardCashAdvanceSuccess',
            }),
          );
        }
        let errorText = getErrorMessage(
          err,
          language.ERROR_MESSAGE__COULD_NOT_PAY_BILL,
        );
        dispatch(errorResponseResult(err, modalOptions, trxType, errorText));
      });
  };
}

export function sendSuccess() {
  return dispatch => {
    const hideAlert = () => {
      dispatch(NavigationActions.back());
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.DASHBOARD__CREDIT_PRINT_SUCCESS,
      text: language.DASHBOARD__CREDIT_PRINT_SUCCESS_TEXT,
      button1: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
      closeOnTouchOutside: false,
      image: noBanner,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function sendFailed(selectedAccount, err) {
  return dispatch => {
    const isPin = result(err, 'data.responseCode', '');
    const hideAlert = () => {
      dispatch(NavigationActions.back());
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.DASHBOARD__CREDIT_PRINT_FAILED,
      text:
        isPin === '17'
          ? language.DASHBOARD__EASYPIN_FAILED
          : language.DASHBOARD__CREDIT_PRINT_SUCCESS_FAILED,
      button1: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
      closeOnTouchOutside: false,
      image: noBanner,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}
export function getNotifSettings(selectedAccount) {
  return dispatch => {
    const accountNumber = result(selectedAccount, 'accountNumber', '');
    const payload = middlewareUtils.prepareCcGetNotif({accountNumber});
    dispatch(actionCreators.showSpinner());
    return api
      .creditCardGetNotif(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const resData = res.data;
        const notifFlag = result(resData, 'allowNotifFlag', '');
        const emailNotifFlag = result(resData, 'allowEmailNotifFlag', '');
        dispatch(
          actionCreators.saveCcNotifSettings({notifFlag, emailNotifFlag}),
        );
        dispatch(
          NavigationActions.navigate({
            routeName: 'CreditCardNotificationSettings',
            params: {selectedAccount, resData},
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

export function setNotifSettings(
  selectedAccount,
  allowNotifFlag,
  allowEmailNotifFlag,
  flagSms,
  flagEmail,
  amount,
) {
  return (dispatch, getState) => {
    const state = getState();
    const accountNumber = result(selectedAccount, 'accountNumber', '');
    const serverToken = result(state, 'appInitKeys.tokenServer', {});
    const transRefNum = result(state, 'transRefNum');
    const sessionId = result(state, 'additionalApiPayload.sessionCode', {});
    const thresholdAmount = amount === '' ? '500000' : amount;
    dispatch(actionCreators.showSpinner());
    const payload = middlewareUtils.prepareCcSetNotif({
      accountNumber,
      serverToken,
      transRefNum,
      sessionId,
      allowNotifFlag,
      allowEmailNotifFlag,
      flagSms,
      flagEmail,
      thresholdAmount,
    });
    return api
      .creditCardSetNotif(payload, dispatch)
      .then(res => {
        // const resData = res.data;
        dispatch(actionCreators.hideSpinner());
        // const notifFlag = result(resData, 'allowNotifFlag', '');
        // const emailNotifFlag = result(resData, 'allowEmailNotifFlag', '');
        dispatch(actionCreators.saveCcNotifSettings(res.data));
        dispatch(NavigationActions.back());
        dispatch(NavigationActions.back());
        Toast.show(language.DASHBOARD__CREDIT_CARD_NOTIF_UPDATE, Toast.LONG);
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        if (err.data.responseCode === '17') {
          dispatch(reset('AuthenticateForm'));
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__NOTIF_UPDATE),
            Toast.LONG,
          );
        } else if (err.data.responseCode === '01') {
          dispatch(actionCreators.clearTransRefNum());
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__SAVE_TXN),
            Toast.LONG,
          );
          dispatch(logout());
        } else {
          dispatch(NavigationActions.back(null));
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__NOTIF_UPDATE),
            Toast.LONG,
          );
        }
      });
  };
}

export function setInstallmentConfirm(formValues, periode, selectedAccount) {
  return dispatch => {
    const pan = result(selectedAccount, 'accountNumber', '');
    const arn = result(formValues, 'arn', '');
    const txnDate = result(formValues, 'date', '');
    const txnDesc = result(periode, 'schmeDesc', '');
    const schmeId = result(periode, 'schmeId', '');
    const term = result(periode, 'term', '');
    const txnAmt = result(formValues, 'amount', '');
    const interestRate = String(result(periode, 'interestRate[0]', ''));
    const installmentAmount = String(
      result(periode, 'installmentAmount[0]', ''),
    );
    const payload = {
      pan,
      arn,
      txnDate,
      txnDesc,
      txnAmt,
      schmeId,
      term,
      interestRate,
      installmentAmount,
    };
    dispatch(actionCreators.showSpinner());
    return api
      .confirmInstallment(payload, dispatch)
      .then(() => {
        dispatch(actionCreators.hideSpinner());
        // const resData = res.data;
        dispatch(
          NavigationActions.navigate({
            routeName: 'CreditCardConfirmInstallment',
            params: {formValues, periode, selectedAccount},
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
