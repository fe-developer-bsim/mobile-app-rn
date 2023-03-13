import {StackActions, NavigationActions} from 'react-navigation';
import * as actionCreators from '../actions/index.actions.js';
import {language} from '../../config/language';
import result from 'lodash/result';
import * as middlewareUtils from '../../utils/middleware.util';
import {storageKeys, set} from '../../utils/storage.util';
import api from '../../utils/api.util';
import {Toast} from '../../utils/RNHelpers.util.js';
import {destroy, reset} from 'redux-form';
import {getErrorMessage, generateLuhn, parseTLV, validateTags, isValidCrc, chewTag, currencyFormatter, parseTLVTcico, generatePayeeQr, getTransferTime, getDayName} from '../../utils/transformer.util';
import {errorResult, resetToDashboardFrom, triggerAuthNavigate, updateBalances, refreshStorageNew, getTargetAccount, popUpRewardMgm, errorResponseResult}  from './common.thunks';
import {filter, noop, isEmpty, lowerCase, find, indexOf, toLower} from 'lodash';
import {logout} from './onboarding.thunks.js';
import moment from 'moment';
// import firebase from 'react-native-firebase';
// import {Platform} from 'react-native';
import {randomString, OBM_EncryptPassword, OBM_GetEncodingParameter, OBM_GetEncryptedPassword} from '../../utils/vendor/pinEncryption.util';
import {getLuckyDipTicket} from './luckyDip.thunks';
import {goToYouBill} from '../../state/thunks/splitBill.thunks'; 
import {Platform} from 'react-native';

// let Analytics = firebase.analytics();

export function getQROnboard () {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'QROnboard'}));
  };
}

export function getQRGpn (value) {
  return (dispatch) => {
    const payload = {value};
    dispatch(actionCreators.showSpinner());
    const isBeforeLogin = false;
    return api.getMerchantList({...payload, isBeforeLogin}, dispatch).then((res) => {
      dispatch(NavigationActions.navigate({routeName: 'QRGpnScreen', params: result(res, 'data.merchantList')}));
      dispatch(actionCreators.updateQrMerchant(res.data.merchantList));
      dispatch(actionCreators.hideSpinner());
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      isEmpty(err.data) ? null : Toast.show(getErrorMessage(err, result(err, 'data.responseMessage', '')));
    });
  };
}

export function getQRGpnReopen (value) {
  return (dispatch, getState) => {
    const payload = {value};
    const storeState = getState();
    const isSearch = result(storeState, 'valueOpenMerchantSearch', false);
    if (isSearch) {
      dispatch(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'Landing'}),
        ]
      }));
    } else {
      dispatch(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'HomeScreen'}),
        ]
      }));
    }
    dispatch(actionCreators.showSpinner());
    const isBeforeLogin = false;
    return api.getMerchantList({...payload, isBeforeLogin}, dispatch).then((res) => {
      dispatch(NavigationActions.navigate({routeName: 'QRGpnScreen', params: result(res, 'data.merchantList')}));
      dispatch(actionCreators.updateQrMerchant(res.data.merchantList));
      dispatch(actionCreators.hideSpinner());
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, result(err, 'data.responseMessage', '')));
    });
  };
}

export function getMerchantTerminal (merchantId, terminal_id, store_label, pan, username, city, postal_code, merchant_status) {
  return (dispatch) => {
    const payload =
      {
        'merchant_id': merchantId,
        'order': 'ASC',
        'start': 0,
        'count': 10,
        'terminal_id': terminal_id,
        'pan': pan,
        'username': username
      };
    dispatch(actionCreators.showSpinner());
    return api.getTerminalList(payload, dispatch).then((res) => {
      const terminalList = result(res, 'data.result');
      dispatch(NavigationActions.navigate({routeName: 'QRMerchantTerminal', params: {merchantId: merchantId, terminal_id: terminal_id, terminalList: terminalList, store_label: store_label, pan: pan, username: username, city: city, postal_code: postal_code, merchant_status: merchant_status}}));
      dispatch(actionCreators.hideSpinner());
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, result(err, 'data.responseMessage', '')));
    });
  };
}

export function getMerchantStore (merchantId, merchant_name, merchant_criteria, merchant_status) {
  return (dispatch) => {
    const payload =
      {
        'merchant_id': merchantId,
        'order': 'ASC',
      };
    dispatch(actionCreators.showSpinner());
    return api.getStoreQRList(payload, dispatch).then((res) => {
      const terminalList = result(res, 'data.result');
      dispatch(NavigationActions.navigate({routeName: 'QRStoreList', params: {merchantId: merchantId, merchant_name: merchant_name, merchant_criteria: merchant_criteria, terminalList: terminalList, merchant_status: merchant_status}}));
      dispatch(actionCreators.hideSpinner());
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, result(err, 'data.responseMessage', '')));
    });
  };
}

export function getMerchantDetail (merchantId) {
  return (dispatch, getState) => {
    const state = getState();
    const data = result(state, 'qrMerchant', []);
    const detailData = filter(data, {'merchant_id': merchantId});
    dispatch(NavigationActions.navigate({routeName: 'QRMerchantDetail', params: {merchantId: merchantId, detailData: detailData}}));
  };
}

export function getStoreDetail (merchantId, terminalId) {
  return (dispatch, getState) => {
    const state = getState();
    const payload =
      {
        'merchant_id': merchantId,
        'order': 'ASC',
      };
    dispatch(actionCreators.showSpinner());
    return api.getStoreQRList(payload, dispatch).then((res) => {
      const terminalList = result(res, 'data.result');
      const data = result(state, 'qrMerchant', []);
      const detailData = filter(data, {'merchant_id': merchantId});
      const detailStore = filter(terminalList, {'terminal_id': terminalId});
      dispatch(NavigationActions.navigate({routeName: 'QRMerchantDetail', params: {merchantId: merchantId, detailData: detailData, detailStore: detailStore}}));
      dispatch(actionCreators.hideSpinner());
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, result(err, 'data.responseMessage', '')));
    });
  };
}

export function deleteTerminal (data) {
  return (dispatch, getState) => {
    const state = getState();
    const transRefNum = result(state, 'transRefNum', '');
    const mPinInputed = result(state, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(state, 'form.AuthenticateForm.values.simasToken', '');
    const merchant_pan = result(data, 'pan', '');
    const pan = result(data, 'pan', '');
    const terminal_id = result(data, 'terminal_id', '');
    const username = result(data, 'username', '');
    const payload = {merchant_pan: merchant_pan, mPinInputed, simasToken, transRefNum, pan, username, terminal_id};
    dispatch(actionCreators.showSpinner());
    return api.getTerminalDelete(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const responseCode = result(res, 'data.responseCode', '99');
      if (responseCode === '00') {
        dispatch(NavigationActions.navigate({routeName: 'QRTerminalDelStatus', params: {data: data}}));
        dispatch(actionCreators.hideSpinner());
      }
    }).
      catch((err) => {
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
        if (easyPinAttempt === 'invalid') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          Toast.show(language.ERROR_MESSAGE_INVALID_EASYPIN_TRANSACTION);
        } else if (easyPinAttempt === 'blocked') {
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.clearTransRefNum());
          Toast.show(language.ERROR_MESSAGE_BLOCKED_EASYPIN_TRANSACTION);
          dispatch(logout());
        } else {
          dispatch(actionCreators.hideSpinner());
          Toast.show(getErrorMessage(err, result(err, 'data.responseMessage', '')));
        }
      });
  };
}

export function getTerminalEdit (data) {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'QRTerminalEdit', params: {data: data}}));
  };
}

export function getTerminalEditConfirm (detailData) {
  return (dispatch, getState) => {
    const state = getState();
    const form = result(state, 'form.QRTerminalEdit.values', {});
    dispatch(NavigationActions.navigate({routeName: 'QRTerminalEditConfirm', params: {form, detailData: detailData}}));
  };
}

export function getTerminalEditResult (detailData) {
  return (dispatch, getState) => {
    const state = getState();
    const smsOtp = result(state, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(state, 'form.AuthenticateForm.values.simasToken', '');
    const transRefNum = state.transRefNum;
    const data = {
      'merchant_pan': result(detailData, 'pan', ''),
      'username': result(state, 'form.QRTerminalEdit.values.username', '') === '' ? result(detailData, 'username', '') : result(state, 'form.QRTerminalEdit.values.username', ''),
      'mobile_number': result(state, 'form.QRTerminalEdit.values.mobile_number', '') === '' ? result(detailData, 'mobile_number', '') : result(state, 'form.QRTerminalEdit.values.mobile_number', ''),
      'merchant_pan_name': result(state, 'form.QRTerminalEdit.values.merchant_pan_name', '') === '' ? result(detailData, 'merchant_pan_name', '') : result(state, 'form.QRTerminalEdit.values.merchant_pan_name', ''),
      'pan': result(detailData, 'pan', ''),

    };
    const payload = middlewareUtils.prepareTerminalEdit(transRefNum, smsOtp, simasToken, data);
    dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'HomeScreen'}),
      ]
    }));
    dispatch(actionCreators.showSpinner());
    return api.getTerminalEdit(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const responseCode = result(res, 'data.response_code', '99');
      if (responseCode === '00') {
        dispatch(NavigationActions.navigate({routeName: 'QRTerminalEditStatus', params: {data: detailData}}));
        dispatch(actionCreators.hideSpinner());
      } else {
        dispatch(NavigationActions.navigate({routeName: 'QRTerminalEditStatus'}));
        dispatch(actionCreators.hideSpinner());
      }
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      dispatch(destroy('QRTerminalEdit'));
      dispatch(destroy('QRTerminalEditConfirm'));
      dispatch(actionCreators.clearTransRefNum());
      Toast.show(getErrorMessage(err, result(err, 'data.responseMessage', '')));
    });
  };
}

export function resetTerminal (detailData) {
  return (dispatch, getState) => {
    const state = getState();
    const transRefNum = result(state, 'transRefNum', '');
    const mPinInputed = result(state, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(state, 'form.AuthenticateForm.values.simasToken', '');
    const merchant_pan = result(detailData, 'pan', '');
    const merchant_name = result(detailData, 'merchant_pan_name', '');
    const username = result(detailData, 'username', '');
    const payload = {merchant_pan: merchant_pan, merchant_name: merchant_name, mPinInputed, simasToken, transRefNum, username};
    dispatch(actionCreators.showSpinner());
    return api.getTerminalReset(payload, dispatch).then(() => {
      dispatch(NavigationActions.navigate({routeName: 'QRTerminalResetStatus', params: {data: detailData}}));
      dispatch(actionCreators.hideSpinner());
    }).
      catch((err) => {
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
        if (easyPinAttempt === 'invalid') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          Toast.show(language.ERROR_MESSAGE_INVALID_EASYPIN_TRANSACTION);
        } else if (easyPinAttempt === 'blocked') {
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.clearTransRefNum());
          Toast.show(language.ERROR_MESSAGE_BLOCKED_EASYPIN_TRANSACTION);
          dispatch(logout());
        } else {
          dispatch(actionCreators.hideSpinner());
          Toast.show(getErrorMessage(err, result(err, 'data.responseMessage', '')));
        }
      });
  };
}

export function QRRegisterStatus () {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'QRRegisterStatus'}));
  };
}

export function QRRegisterComplete () {
  return (dispatch) => {
    dispatch(getQRGpnReopen());
  };
}

export function QRStatusComplete () {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'HomeScreen'}));
  };
}

export function QRCustomer () {
  return (dispatch) => {
    dispatch(destroy('QRInvoiceForm'));
    dispatch(destroy('QRconfirm'));
    dispatch(NavigationActions.navigate({routeName: 'GPNIssuer'}));
  };
}

export function QRMerchantInquiry (merchantId) {
  return (dispatch) => {
    const isBeforeLogin = false;
    const payload = {isTerminal: false, merchant_id: merchantId, isBeforeLogin};
    if (merchantId.substring(0, 4) === 'REFF') {
      dispatch(actionCreators.showSpinner());
      const isBeforeLogin = false;
      return api.getMerchantList({...payload, isBeforeLogin}, dispatch).then(() => {
        dispatch(actionCreators.hideSpinner());
        alert('Registration merchant still on process');
      }).catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, result(err, 'data.responseMessage', '')));
      });
    }
  };
}

export function goToRefundCreate (merchantId) {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'QRRefundCreate', params: {merchantId}}));
  };
}

export function goToRefundCode (merchantId) {
  return (dispatch) => {
    const payload = {merchant_id: merchantId};
    dispatch(actionCreators.showSpinner());
    return api.getRefundCode(payload, dispatch).then((res) => {
      const codeList = result(res, 'data.merchantList');
      dispatch(NavigationActions.navigate({routeName: 'QRRefundCode', params: {merchantId, codeList}}));
      dispatch(actionCreators.hideSpinner());
    }).catch((err) => {
      const easyPinAttempt = result(err, 'data.easypinAttempt', '');
      if (easyPinAttempt === 'invalid') {
        dispatch(actionCreators.hideSpinner());
        dispatch(reset('AuthenticateForm'));
        Toast.show(language.ERROR_MESSAGE_INVALID_EASYPIN_TRANSACTION);
      } else if (easyPinAttempt === 'blocked') {
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.clearTransRefNum());
        Toast.show(language.ERROR_MESSAGE_BLOCKED_EASYPIN_TRANSACTION);
        dispatch(logout());
      } else {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, result(err, 'data.responseMessage', '')));
      }
    });
  };
}

export function getRefundCode (merchantId) {
  return (dispatch, getState) => {
    const state = getState();
    const smsOtp = result(state, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(state, 'form.AuthenticateForm.values.simasToken', '');
    const transRefNum = state.transRefNum;
    const form = result(state, 'form.QRRefundCreate.values', {});
    const data = {
      'merchant_id': merchantId,
      'amount': result(state, 'form.QRRefundCreate.values.refundAmount', ''),
      'count': result(state, 'form.QRRefundCreate.values.refundCount', ''),
    };
    const easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    const payload = middlewareUtils.prepareRefundCode(transRefNum, easyPin, smsOtp, simasToken, data);
    dispatch(actionCreators.showSpinner());
    return api.getGenerateRefundCode(payload, dispatch).then(() => {
      dispatch(destroy('QRRefundCreate'));
      dispatch(NavigationActions.navigate({routeName: 'QRRefundStatus', params: {form}}));
      dispatch(actionCreators.hideSpinner());
    }).catch((err) => {
      const easyPinAttempt = result(err, 'data.easypinAttempt', '');
      if (easyPinAttempt === 'invalid') {
        dispatch(actionCreators.hideSpinner());
        dispatch(reset('AuthenticateForm'));
        Toast.show(language.ERROR_MESSAGE_INVALID_EASYPIN_TRANSACTION);
      } else if (easyPinAttempt === 'blocked') {
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.clearTransRefNum());
        Toast.show(language.ERROR_MESSAGE_BLOCKED_EASYPIN_TRANSACTION);
        dispatch(logout());
      } else {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, result(err, 'data.responseMessage', '')));
      }
    });
  };
}

export function goToRefundInfo (data) {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'QRRefundInfo', params: {data: data}}));
  };
}

export function QRInvoice (res) {
  return (dispatch, getState) => {
    const state = getState();
    const transRefNum = state.transRefNum;
    dispatch(NavigationActions.navigate({routeName: 'QRInvoice', params: {data: res, transRefNum}}));
  };
}

export function inquryQRMpm (data, jsonDt) {
  return (dispatch) => {
    // const defaultBank = result(jsonDt, '26', {});
    const isTemp = true;
    if (!isTemp) {
      const amountVal = Number(result(data, 'amountVal', 0)).toFixed(2);
      const tipAmountManual = Number(result(data, 'tipAmountManual', 0));
      const isNanTip = isNaN(tipAmountManual);
      const tag57 = Number(result(jsonDt, '57', 0));
      const tag55 = result(jsonDt, '55', '00');
      const tip = ((isNanTip || ((tag57 > 0) && (tag55 === '03')) ? (amountVal * tag57) / 100 : tipAmountManual)).toFixed(2);
      const invoiceID = result(jsonDt, '62.01', '');
      const payload = {
        accountFrom: result(data, 'accountNo.id', ''),
        accountName: result(data, 'accountNo.name', ''),
        accountNumber: result(data, 'accountNo.accountNumber', ''),
        amount: (Number(amountVal) + Number(tip)).toFixed(2),
        tipAmount: Number(tip).toFixed(2),
        merchantDataMap: jsonDt,
        cpanLuhn: result(jsonDt, '26.01', '') === '' ? '' : generateLuhn(result(jsonDt, '26.01', '')),
        amountNumber: Number(amountVal).toFixed(2),
        accountTo: result(data, 'bankAcc.val', '') === '' ? '' : generateLuhn(result(data, 'bankAcc.val', '')),
        invoiceId: invoiceID ? invoiceID : Math.random().toString().substring(3, 15) + Math.random().toString().substring(2, 5),
      };
      const dtSend = middlewareUtils.prepareInquiryGPN(payload);
      return api.inquiryGpnTag51(dtSend, dispatch).then(() => {
      }).catch((err) => {
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_GET_PAN));
        dispatch(actionCreators.hideSpinner());
      });
    } else if (isTemp) {
      dispatch(QRInvoiceConfirm(data, jsonDt));
    }
  };
}

export function QRInvoiceConfirm (data, jsonDt, qrData, isCrossBorder, resulData) {
  return (dispatch, getState) => {
    const state = getState();
    const isUsingVoucherUI = result(state, 'isUsingVoucherUI', '0');
    const transRefNum = state.transRefNum;
    const billerCode = '123456';
    const type = 'billPayment';
    const transactionAmount = result(data, 'amountVal', '');
    const accountId = String(result(data, 'accountNo.id', ''));
    const payloadCoupon = {billerCode, type, transactionAmount, accountId};
    const ownership = result(state, 'couponCheck.ownership', '');
    const voucherId = result(state, 'couponCheck.voucherId', '').toString();
    const maxAmountOnUsperTrx = result(state, 'config.LIMITQRGPN.mapGPNOnUs.maxPerTrx', 5000000);
    const maxAmountOffUsperTrx = result(state, 'config.LIMITQRGPN.mapGPNOffUs.maxPerTrx', 2000000);
    const bankCode = result(jsonDt, '26.01', '');
    const isBsim = bankCode.substring(5, 8) === '153';
    const checkAmount = isBsim ? maxAmountOnUsperTrx : maxAmountOffUsperTrx;
    const payloadCouponCheckingValidity = {transactionAmount, transRefNum, voucherId, type, ownership, billerCode, accountId};
    if (transactionAmount > checkAmount) {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(language.MAX_AMOUNT_QR_TRX), Toast.LONG);
    } else {
      if (isUsingVoucherUI !== '1') {
        return api.getSuggestVoucher(payloadCoupon, dispatch).then((responseSuggest) => {
          const dataRes = result(responseSuggest, 'data.selectedVoucher', {});
          const decideCoupon = result(dataRes, 'voucher.ownership', 'public');
          if (!isEmpty(dataRes)) {
            const amount = decideCoupon === 'private' ? result(dataRes, 'voucher.amount', '0') : result(dataRes, 'amount', '0');
            const voucherId = result(dataRes, 'id', '').toString();
            const modifierType = decideCoupon === 'private' ? result(dataRes, 'voucher.modifierType', '0') : result(dataRes, 'modifierType', '');
            const fixAmount = modifierType === 'percent' ? amount.toString() + '%' : currencyFormatter(amount);
            const endTimehour = decideCoupon === 'private' ? result(dataRes, 'voucher.endTime', '0').toString().substring(0, 2) : result(dataRes, 'endTime', '').toString().substring(0, 2);
            const endTimemin = decideCoupon === 'private' ? result(dataRes, 'voucher.endTime', '0').toString().substring(2, 4) : result(dataRes, 'endTime', '').toString().substring(2, 4);
            const decideStartTimeHour = decideCoupon === 'private' ? result(dataRes, 'voucher.startTime', '0').toString() : result(dataRes, 'startTime', '').toString();
            const startTimehour = decideStartTimeHour === '0' ? '00' : decideStartTimeHour.substring(0, 2);
            const startTimemin = decideStartTimeHour === '0' ? '00' : decideStartTimeHour.substring(2, 4);
            const endTimeMod = endTimehour + ':' + endTimemin;
            const startTimeMod = startTimehour + ':' + startTimemin;
            const currency = decideCoupon === 'private' ? result(dataRes, 'voucher.currency', '') : result(dataRes, 'currency', '');
            const cashbackDetail = currency === 'simaspoin' ? language.GENERIC__SIMAS_POIN : language.GENERIC__CASHBACK_RP;
            const custAmount = language.GENERIC__TITLE_COUPON + ' ' + fixAmount + ' ' + cashbackDetail;
            const ownership = decideCoupon === 'private' ? result(dataRes, 'voucher.ownership', '0') : result(dataRes, 'ownership', '');
            const endDatesub = decideCoupon === 'private' ? result(dataRes, 'expiredDateString', '0') : result(dataRes, 'endDateString', 0).toString();
            const startDatesub = decideCoupon === 'private' ? result(dataRes, 'createdDateString', '0') : result(dataRes, 'startDateString', 0).toString();
            const subendDate = moment(endDatesub).format('YYYY/MM/DD');
            const subnewDate = moment(startDatesub).format('YYYY/MM/DD');
            const custPoin = fixAmount;
            dispatch(actionCreators.saveCoupon({voucherId, description: custAmount, ownership, subnewDate, subendDate, endTimeMod, startTimeMod, currency, custPoin}));
          }
          dispatch(NavigationActions.navigate({routeName: 'QRConfirm', params: {data, jsonDt, transRefNum, qrData, isCrossBorder, resulData}})),
          dispatch(actionCreators.hideSpinner());
        }).catch(() => {

          dispatch(NavigationActions.navigate({routeName: 'QRConfirm', params: {data, jsonDt, transRefNum, qrData, isCrossBorder, resulData}})),
          dispatch(actionCreators.hideSpinner());
        });
      } {
        return api.checkVoucherValidity(payloadCouponCheckingValidity, dispatch).then((res) => {
          const responseCode = result(res, 'data.responseCode', '');
          if (responseCode === '00') {
            dispatch(NavigationActions.navigate({routeName: 'QRConfirm', params: {data, jsonDt, transRefNum, qrData, isCrossBorder, resulData}})),
            dispatch(actionCreators.hideSpinner());
          } else {
            dispatch(actionCreators.deleteCoupon());
            dispatch(NavigationActions.navigate({routeName: 'QRConfirm', params: {data, jsonDt, transRefNum, qrData, isCrossBorder, resulData}})),
            dispatch(actionCreators.hideSpinner());
          }
        }).
          catch(() => {
            dispatch(actionCreators.deleteCoupon());
            dispatch(NavigationActions.navigate({routeName: 'QRConfirm', params: {data, jsonDt, transRefNum, qrData, isCrossBorder}})),
            dispatch(actionCreators.hideSpinner());
            dispatch(destroy('QRInvoiceForm'));
            dispatch(destroy('QRconfirm'));
          });
      }
    }
  };
}

export function QRCashoutInquiry (values, jsonDt, isCashout) {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    const accountNo = result(jsonDt, '40.02', '');
    const from_account = result(values, 'sourceAcc.value', '');
    const mpan = result(jsonDt, '40.01', '');
    const mpanLuhn = generateLuhn(mpan);
    const amount = result(values, 'amountVal', '');
    const merchantDataMap = {...jsonDt, 'cpan_luhn': mpanLuhn};
    const payload = {accountNo, from_account, merchantDataMap, amount};
    return api.inquiryCashout(payload, dispatch).
      then((res) => {
        const responseCode = result(res, 'data.responseCode', '');
        const inquiryRes = result(res, 'data.inquiryResult', {});
        if (responseCode === '00') {
          dispatch(actionCreators.hideSpinner());
          dispatch(NavigationActions.navigate({routeName: 'QRTcicoConfirm', params: {data: values, jsonDt, inquiryRes, isCashout}}));
        } else if (responseCode === '51') {
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.SAVING__ACCOUNT_NOT_ENOUGH_BALANCE, Toast.LONG);
        } else {
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.ERROR_MESSAGE__COULD_NOT_PAY_BILL, Toast.LONG);
        }
      }).catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL), Toast.LONG);
      });
  };
}

export function qrCashoutTransfer (data) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const transferReferenceNumber = state.transRefNum;
    const myAccount = result(data, 'data.sourceAcc', {});
    const amountVal = Number(result(data, 'data.amountVal', 0)).toFixed(2);
    const transRefNum = state.transRefNum;
    const currency = result(data, 'data.sourceAcc.currency', '');
    const additionalDataPrivate = result(data, 'inquiryRes.additional_data__private', '');
    const toAccType = additionalDataPrivate.substring(additionalDataPrivate.length, additionalDataPrivate.length - 2);
    const resData = result(data, 'inquiryRes', '');
    let modalOptions = {
      heading: `${myAccount.name}`,
      amount: `Rp ${currencyFormatter(amountVal)}`,
      transactionId: transferReferenceNumber,
      accountFrom: myAccount,
      currencyValas: currency,
      currencyRate: '',
      resData,
    };
    const parseJsonData = result(data, 'jsonDt', {});
    let jsonData = {};
    jsonData = {...parseJsonData, 'processingType': toAccType, 'additional_data__private': additionalDataPrivate, 'cpan_luhn': generateLuhn(result(data, 'jsonDt.40.01', ''))};
    const mPinInputed = result(state, 'form.AuthenticateForm.values.otp', '');
    const tokenInputed = result(state, 'form.AuthenticateForm.values.simasToken', '');
    const payload = {
      accountFrom: result(data, 'data.sourceAcc.value', ''),
      amount: (Number(amountVal)),
      merchantDataMap: jsonData,
      accountTo: generateLuhn(result(data, 'jsonDt.40.01', '')),
    };
    const dtSend = middlewareUtils.prepareCashoutTransaction(transRefNum, mPinInputed, tokenInputed, payload);
    return api.transactionQRcashout(dtSend, dispatch).
      then((res) => {
        const resData = result(res, 'data', {});
        const cashoutTransactionNumber = result(res, 'data.transactionReferenceNumber', '');
        const responseCode = result(resData, 'responseCode', '');
        if (responseCode === '00') {
          dispatch(actionCreators.showPaymentModal({
            ...modalOptions,
            transactionType: 'QrCashout',
            type: 'SUCCESS',
            dataDetail: dtSend,
            resDataTrf: resData
          }));
          dispatch(actionCreators.hideSpinner());
          dispatch(resetToDashboardFrom('QRScannerLanding'));      
          dispatch(NavigationActions.navigate({routeName: 'NewPaymentStatusRevampOnboarding', params: {resDataTrf: resData, data}}));
        } else if (responseCode === '68') {
          dispatch(actionCreators.showPaymentModal({
            ...modalOptions,
            transactionType: 'QrCashout',
            type: 'PENDING',
            dataDetail: dtSend,
            resDataTrf: resData
          }));
          dispatch(actionCreators.hideSpinner());
          dispatch(resetToDashboardFrom('QRScannerLanding'));      
          dispatch(NavigationActions.navigate({routeName: 'NewPaymentStatusRevampOnboarding', params: {resDataTrf: resData, data}}));
        } else {
          dispatch(actionCreators.showPaymentModal({
            ...modalOptions,
            transactionType: 'QrCashout',
            type: 'FAILED',
            dataDetail: dtSend,
            resDataTrf: resData
          }));
          dispatch(actionCreators.hideSpinner());
          dispatch(resetToDashboardFrom('QRScannerLanding'));
          dispatch(NavigationActions.navigate({routeName: 'QrPaymentStatusOnboarding', params: {transRefNum: cashoutTransactionNumber, jsonData, data}}));
          Toast.show(language.ERROR_MESSAGE__COULD_NOT_PAY_BILL, Toast.LONG);
        }
      }).catch((err) => {
        dispatch(actionCreators.hideSpinner());
        const resData = result(err, 'data', {});
        const cashoutTransactionNumber = result(err, 'data.transactionReferenceNumber', '');
        const responseCode = result(resData, 'responseCode', '');
        const easyPinAttempt = result(resData, 'easypinAttempt', '');
        if (easyPinAttempt === 'invalid') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          if (mPinInputed !== '') {
            Toast.show(language.ERROR_MESSAGE_INVALID_SMS_PIN_TRANSACTION);
          } else {
            Toast.show(language.ERROR_MESSAGE_INVALID_EASYPIN_TRANSACTION);
          }
        } else if (easyPinAttempt === 'blocked') {
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.ERROR_MESSAGE_BLOCKED_EASYPIN_TRANSACTION);
          dispatch(actionCreators.clearTransRefNum());
          setTimeout(() => {
            dispatch(logout());
          }, 0);
        } else if (easyPinAttempt === 'errHsm') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          Toast.show(language.ERROR_MESSAGE_SYSTEM_UNDER_MAINTENANCE);
        } else if (responseCode === '68') {
          dispatch(resetToDashboardFrom('QRScannerLanding'));
          dispatch(actionCreators.showPaymentModal({
            ...modalOptions,
            transactionType: 'QrCashout',
            type: 'PENDING',
            dataDetail: dtSend,
            resDataTrf: resData
          }));
          dispatch(actionCreators.hideSpinner());
          dispatch(NavigationActions.navigate({routeName: 'NewPaymentStatusRevampOnboarding', params: {resDataTrf: resData, data}}));
        } else {
          dispatch(resetToDashboardFrom('QRScannerLanding'));
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL), Toast.LONG);
          dispatch(NavigationActions.navigate({routeName: 'QrPaymentStatusOnboarding', params: {transRefNum: cashoutTransactionNumber, jsonData, data}}));
        }
      });
  };
}

export function QRTcicoInvoiceConfirm (data, jsonDt, isCashout, payeeList, qrData, bankListData) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const transRefNum = state.transRefNum;
    const getBankCode = result(jsonDt, '40.01', '');
    const bankCode = getBankCode.substring(5, 8);
    const foundBank = find(bankListData,  {'bankCode': bankCode});
    const isLogin = !isEmpty(result(getState(), 'user', {}));
    const payeeAccNo = result(jsonDt, '40.02', '');
    const amountFromValues = result(data, 'amountVal', '');
    const note = result(data, 'notes', '');
    const amountQr = result(jsonDt, '54', '');
    const foundPayee = find(payeeList, {accountNumber: payeeAccNo});
    const accNo = payeeAccNo;
    const ownAccount = result(foundPayee, 'transferType', '') === 'own';
    const payeeName = result(jsonDt, '59', '');
    const getCurrency = result(jsonDt, '53', '');
    const payeeCurrency = getCurrency === '360' ? 'IDR' : '';
    const ownEmoney = false;
    const transType = 'fundTransfer';
    const isOnUs = bankCode === '153';
    const payee = generatePayeeQr(accNo, payeeName, foundBank, {}, ownEmoney, payeeCurrency, isOnUs);
    let jsonData = parseTLVTcico(qrData);
    jsonData = JSON.parse(jsonData);
    const cpan = result(jsonData, '40.01', '');
    const isCashout = result(jsonData, '62.08', '') === 'CWDL';
    const cpanLuhn = generateLuhn(cpan);
    jsonData = {...jsonData, 'cpan_luhn': cpanLuhn};
    const selectedPayee = !isEmpty(foundPayee) ? foundPayee : payee;
    const isDana = bankCode === '915';
    const myAccount = result(data, 'sourceAcc', {});
    const transferMethodType = isLogin ? '' : '1';
    const amount = isEmpty(amountFromValues) ? amountQr : amountFromValues;
    const formValues = {myAccount, amount, note, transferMode: isOnUs && ownAccount ? 'own' : isOnUs && !ownAccount ? 'inbank' : 'network'};
    const confirmTransferPayload = middlewareUtils.prepareConfirmTransferQrPayload(formValues, selectedPayee, transType, '', transferMethodType, false, jsonData, isCashout, isOnUs, isDana);
    let additional = [];
    if (isLogin) {
      additional = ['ipassport', 'TXID', 'lang'];
    } else {
      additional = ['TXID', 'lang', 'tokenClient', 'tokenServer', 'uniqueCode'];
    }
    return api.confirmTransferQr(confirmTransferPayload, additional, dispatch).
      then((res) => {
        dispatch(actionCreators.hideSpinner());
        const uniqueCode = result(res, 'data.uniqueCode', '');
        dispatch(actionCreators.saveUniqeCode(uniqueCode));
        const resData = result(res, 'data', {});
        dispatch(NavigationActions.navigate({routeName: 'QRTcicoConfirm', params: {data, jsonDt, transRefNum, isCashout, selectedPayee, resData, qrData}})),
        dispatch(destroy('QRInvoiceForm'));
        dispatch(destroy('QRconfirm'));
      }).catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL), Toast.LONG);
      });
  };
}

export function QRTerminalRegister (merchantId, merchant_criteria, terminalList) {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'QRTerminalRegister', params: {merchantId: merchantId, merchant_criteria: merchant_criteria, terminalList: terminalList}}));
  };
}

export function QRTerminalConfirmation (merchantId, merchant_criteria, terminalList) {
  return (dispatch, getState) => {
    const state = getState();
    const form = result(state, 'form.QRTerminalRegister.values', {});
    dispatch(NavigationActions.navigate({routeName: 'QRTerminalConfirmation', params: {form, merchantId: merchantId, merchant_criteria: merchant_criteria, terminalList: terminalList}}));
  };
}

export function QRTerminalResult (merchantId, merchant_criteria, terminalList) {
  return (dispatch, getState) => {
    const state = getState();
    const smsOtp = result(state, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(state, 'form.AuthenticateForm.values.simasToken', '');
    const transRefNum = state.transRefNum;
    const isUMI = result(state, 'config.qrGPNConfig.maxRegisterTerminal.UMI', 1);
    const isUKE = result(state, 'config.qrGPNConfig.maxRegisterTerminal.UKE', 1);
    const isUME = result(state, 'config.qrGPNConfig.maxRegisterTerminal.UME', 1);
    const isUBE = result(state, 'config.qrGPNConfig.maxRegisterTerminal.UBE', 1);
    const terminalCounts = terminalList.length;
    let data = {};
    data = {
      'merchant_pan_name': result(state, 'form.QRTerminalRegister.values.merchant_pan_name', ''),
      'username': result(state, 'form.QRTerminalRegister.values.username', ''),
      'mobile_number': result(state, 'form.QRTerminalRegister.values.mobile_number', ''),
      'isTerminal': true,
      'user_status': '',
      'merchant_id': merchantId,
    };
    if (merchant_criteria === 'UMI') {
      if (terminalCounts <= isUMI) {
        data = {
          ...data, 'user_status': 'on_process'
        };
      } else {
        data = {
          ...data, 'user_status': 'inactive'
        };
      }
    } else if (merchant_criteria === 'UKE') {
      if (terminalCounts <= isUKE) {
        data = {
          ...data, 'user_status': 'on_process'
        };
      } else {
        data = {
          ...data, 'user_status': 'inactive'
        };
      }
    } else if (merchant_criteria === 'UME') {
      if (terminalCounts <= isUME) {
        data = {
          ...data, 'user_status': 'on_process'
        };
      } else {
        data = {
          ...data, 'user_status': 'inactive'
        };
      }
    } else {
      if (terminalCounts <= isUBE) {
        data = {
          ...data, 'user_status': 'on_process'
        };
      } else {
        data = {
          ...data, 'user_status': 'inactive'
        };
      }
    }
    const payload = middlewareUtils.prepareGpnTerminal(transRefNum, smsOtp, simasToken, data);
    dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'HomeScreen'}),
      ]
    }));
    dispatch(actionCreators.showSpinner());
    return api.getGpnMerchant(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const responseCode = result(res, 'data.response_code', '99');
      if (responseCode === '00') {
        dispatch(NavigationActions.navigate({routeName: 'QRTerminalStatus'}));
      } else {
        dispatch(NavigationActions.navigate({routeName: 'QRTerminalStatus'}));
      }
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      dispatch(destroy('QRMerchantRegister'));
      dispatch(destroy('QRRegisterConfirmation'));
      dispatch(actionCreators.clearTransRefNum());
      Toast.show(getErrorMessage(err, result(err, 'data.responseMessage', '')));
    });
  };
}

export function QRdynamicPage (res) {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'QRdynamicPage', params: res}));
  };
}

export function QRMerchantRegister () {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'QRMerchantRegister'}));
  };
}

export function QRRegisterConfirmation (isRegisterStore, isRegisterTerminal, merchantId, terminal_id, pan) {
  return (dispatch, getState) => {
    const state = getState();
    const form = result(state, 'form.formQRGPN.values', {});
    const form2 = result(state, 'form.QRMerchantRegister3.values', {});
    dispatch(NavigationActions.navigate({routeName: 'QRRegisterConfirmation', params: {form, form2, isRegisterStore, isRegisterTerminal, merchantId, terminal_id, pan}}));
    dispatch(actionCreators.hideSpinner());
  };
}

export function QRRegisterResult (isRegisterStore, isRegisterTerminal, merchantId, terminal_id, pan) {
  return (dispatch, getState) => {
    const state = getState();
    const smsOtp = result(state, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(state, 'form.AuthenticateForm.values.simasToken', '');
    const transRefNum = state.transRefNum;
    const registerData = {
      'merchant_id': merchantId,
      'terminal_id': terminal_id,
      'pan': pan,
      'merchant_name': result(state, 'form.formQRGPN.values.merchantName', ''),
      'merchant_type': result(state, 'form.formQRGPN.values.businessLine.name', ''),
      'merchant_criteria': result(state, 'form.formQRGPN.values.criteria.merchantCode', ''),
      'merchant_owner': result(state, 'form.formQRGPN.values.nameOwner', ''),
      'merchant_KTP': result(state, 'form.formQRGPN.values.nikOwner', ''),
      'npwp_owner': result(state, 'form.formQRGPN.values.merchantNpwp', ''),
      'merchant_SIUP': result(state, 'form.formQRGPN.values.merchantSiup', ''),
      'merchant_TDP': result(state, 'form.formQRGPN.values.merchantTdp', ''),
      'merchant_net_worth': result(state, 'form.formQRGPN.values.criteria.netWorth', ''),
      'merchant_annual_sales_volume': result(state, 'form.formQRGPN.values.criteria.salesPerAnum', ''),
      'merchant_num_of_employee': result(state, 'form.formQRGPN.values.criteria.numberOfEmployees', ''),
      'merchant_daily_sales_volume': result(state, 'form.formQRGPN.values.merchantSales', ''),
      'merchant_phone': result(state, 'form.formQRGPN.values.merchantPhone', ''),
      'merchant_email': result(state, 'form.formQRGPN.values.merchantEmail', ''),
      'merchant_address': result(state, 'form.QRMerchantRegister3.values.merchantAddress', ''),
      'merchant_kelurahan': result(state, 'form.QRMerchantRegister3.values.district.name', ''),
      'merchant_kecamatan': result(state, 'form.QRMerchantRegister3.values.subDistrict.name', ''),
      'merchant_prov': result(state, 'form.QRMerchantRegister3.values.province.name', ''),
      'merchant_city': result(state, 'form.QRMerchantRegister3.values.city.name', ''),
      'merchant_country_code': '62',
      'postal_code': result(state, 'form.QRMerchantRegister3.values.postalCode', ''),
      'accountNo': result(state, 'form.formQRGPN.values.accountNo.accountNumber', ''),

      'merchant_pan_name': result(state, 'form.formQRGPN.values.cashierName', ''),
      'username': result(state, 'form.formQRGPN.values.loginCashierName', ''),
      'mobile_number': result(state, 'form.formQRGPN.values.securityPhone', ''),
      'store_label': result(state, 'form.QRMerchantRegister3.values.storeName', ''),
      'store_phone_num': result(state, 'form.QRMerchantRegister3.values.storePhone', ''),
      'province': result(state, 'form.QRMerchantRegister3.values.province.name', ''),
      'city': result(state, 'form.QRMerchantRegister3.values.city.name', ''),
      'kelurahan': result(state, 'form.QRMerchantRegister3.values.district.name', ''),
      'kecamatan': result(state, 'form.QRMerchantRegister3.values.subDistrict.name', ''),
      'store_postal_code': result(state, 'form.QRMerchantRegister3.values.postalCode', ''),
      'store_phone_address': result(state, 'form.QRMerchantRegister3.values.merchantAddress', ''),
      'store_location': result(state, 'form.QRMerchantRegister3.values.storeLocation.name', ''),
      'ownership': result(state, 'form.QRMerchantRegister3.values.ownership.name', ''),
      'nmid': result(state, 'form.QRMerchantRegister3.values.merchantNmid', ''),
    };
    const easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    const payload = middlewareUtils.prepareGpnRegister(transRefNum, easyPin, smsOtp, simasToken, registerData, isRegisterStore, isRegisterTerminal);
    dispatch(actionCreators.showSpinner());
    return api.registerQRGpn(payload, dispatch).then((res) => {
      const responseCode = result(res, 'data.responseCode', '99');
      const merchantId = result(res, 'data.merchantId', '');
      const errMsg = result(res, 'data.responseMessage', '');
      if (responseCode === '00') {
        dispatch(actionCreators.hideSpinner());
        dispatch(destroy('formQRGPN'));
        dispatch(destroy('QRMerchantRegister3'));
        dispatch(NavigationActions.navigate({routeName: 'QRRegisterStatus', params: {merchantId: merchantId, isSuccess: 'yes', isRegisterTerminal: isRegisterTerminal}}));
      } else {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate({routeName: 'QRRegisterStatus', params: {merchantId: merchantId, isSuccess: 'no', isRegisterTerminal: isRegisterTerminal, errMsg: errMsg}}));
      }
    }).catch(() => {
      dispatch(actionCreators.hideSpinner());
      dispatch(destroy('QRMerchantRegister1'));
      dispatch(destroy('QRMerchantRegister2'));
      dispatch(destroy('QRMerchantRegister3'));
      dispatch(destroy('QRMerchantRegister4'));
      dispatch(destroy('QRRegisterConfirmation'));
      dispatch(actionCreators.clearTransRefNum());
      dispatch(NavigationActions.navigate({routeName: 'QRRegisterStatus', params: {isSuccess: 'no'}}));
    });
  };
}

export function showQRTrf () {
  return (dispatch) => {
    dispatch(destroy('QRTransfer'));
    dispatch(NavigationActions.navigate({routeName: 'showQRTrf'}));
  };
}

export function QRWithdrawalConfirm (values, jsonDt) {
  return (dispatch, getState) => {
    const state = getState();
    const form = result(state, 'form.WithdrawalForm.values', {});
    dispatch(NavigationActions.navigate({routeName: 'QRWithdrawalConfirm', params: values, jsonDt: jsonDt, form: form}));
  };
}

export function QRChooseMenu () {
  return (dispatch) => {
    dispatch(destroy('QRInvoiceForm'));
    dispatch(NavigationActions.navigate({routeName: 'GPNIssuer'}));
  };
}

export function WithdrawalForOther () {
  return (dispatch) => {
    dispatch(destroy('QRInvoiceForm'));
    dispatch(NavigationActions.navigate({routeName: 'CardLessWithdrawalIndex'}));
  };
}

export function QRCustomerS (choosenMenu) {
  return (dispatch) => {
    dispatch(destroy('QRInvoiceForm'));
    dispatch(NavigationActions.navigate({routeName: 'QRScanScreen', choosenMenu: choosenMenu}));
  };
}

export function availUsername () {
  return (dispatch, getState) => {
    const state = getState();
    const username = result(state, 'form.formQRGPN.values.loginCashierName', '');
    const payload = {username};

    if (username) {
      dispatch(actionCreators.showSpinner());
      return api.usernameAvailability(payload, dispatch).
        then((res) => {
          const status = result(res, 'data.responseCode', '');
          if (status === '00') {
            dispatch(actionCreators.saveUsernameAvail({status: '1'}));
            dispatch(actionCreators.hideSpinner());
          } else if (status === '94') {
            dispatch(actionCreators.saveUsernameAvail({status: '2'}));
            dispatch(actionCreators.hideSpinner());
          }
        }).
        catch(() => {
          Toast.show(language.QR_GPN__USERNAME_FAILED, Toast.LONG);
          dispatch(actionCreators.saveUsernameAvail({status: '0'}));
          dispatch(actionCreators.hideSpinner());
        });
    } else {
      dispatch(actionCreators.saveUsernameAvail({status: '0'}));
      dispatch(actionCreators.hideSpinner());
    }
  };
}

export function availStorename () {
  return (dispatch, getState) => {
    const state = getState();
    const store_label = result(state, 'form.QRMerchantRegister3.values.storeName', '');
    const payload = {store_label};
    return api.storenameAvailability(payload, dispatch).
      then((res) => {
        const nameStatus = result(res, 'data.response_code', '');
        if (nameStatus === '00') {
          dispatch(actionCreators.saveStoreAvail({nameStatus: true}));
        } else if (nameStatus === '94') {
          dispatch(actionCreators.saveStoreAvail({nameStatus: false}));
        }

      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_SEND_SMS_VERIFICATION), Toast.LONG);
      });
  };
}

export function getParam () {
  return (dispatch) => {
    const payload = {'pushToken': '123456', 'clientCheck': 'WEB_BROWSER'};
    return api.getParamQRGPN(payload, dispatch).then((res) => {
      const data = result(res, 'data', {});
      dispatch(actionCreators.saveQRparams(data));
    }).
      catch(() => {
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function qrTransfer (data) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const resData = result(data, 'resData', {});
    const storeState = getState();
    const payeeAccount = result(data, 'selectedPayee', {});
    const myAccount = result(data, 'data.sourceAcc', {});
    const getAmount = result(data, 'data.amountVal', '');
    const amount = isEmpty(result(data, 'jsonDt.54', '')) ? getAmount : result(data, 'jsonDt.54', '');
    const note = result(data, 'data.notes', '');
    const currency = result(data, 'data.sourceAcc.currency', '');
    const qrData = result(data, 'qrData', '');
    const smsOtp = result(storeState, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(storeState, 'form.AuthenticateForm.values.simasToken', '');
    const transferReferenceNumber = storeState.transRefNum;
    const type = 'fundTransfer';
    const isFavorite = false;
    let jsonData = parseTLVTcico(qrData);
    jsonData = JSON.parse(jsonData);
    const cpan = result(jsonData, '40.01', '');
    const cpanLuhn = generateLuhn(cpan);
    const additionalDataPrivate = result(resData, 'transferTransaction.targetAccountObject.additionalDataPrivate', '');
    const toAccType = isEmpty(additionalDataPrivate) || additionalDataPrivate === null ? '' : additionalDataPrivate.substring(additionalDataPrivate.length, additionalDataPrivate.length - 2);
    jsonData = {...jsonData, 'cpan_luhn': cpanLuhn, 'processingType': toAccType, 'additional_data__private': additionalDataPrivate};
    const bankCode = cpan.substring(5, 8);
    const isOnUs = bankCode === '153';
    const isDana = bankCode === '915';
    const isBfr = result(resData, 'isBfr', '');
    const targetAccount = result(resData, 'transferTransaction.targetAccountObject', {});
    const isSimas = result(targetAccount, 'detailNetworkCode', '') === '153';
    const isUnknownAccount = result(targetAccount, 'accountType', '') === 'UnknownAccount' || isEmpty(result(targetAccount, 'accountType', ''));
    const targetAccountType = isSimas ?
      isUnknownAccount ? result(targetAccount, 'bankName', 'NA') : result(targetAccount, 'accountType', 'NA') :
      result(targetAccount, 'bankName', 'NA');
    const subheadingShow = targetAccountType;
    const accountNumber = result(payeeAccount, 'accountNumber', '');
    const detailsShow =  result(payeeAccount, 'accNo', '') || accountNumber;
    const transferType = result(resData, 'transferTransaction.mode', '');
    let showTime = new Date();
    let time = '';
    const {timeConfig} = getState();
    const cutOffMsg = result(resData, 'transferTransaction.cutOffMsg', '');
    const state = getState();
    const gapTime = result(state, 'gapTimeServer', 0);
    const serverTimeNew = String(moment(showTime).add(gapTime, 'seconds').format('HH:mm'));
    const sendDate = moment(serverTimeNew, 'HH:mm').isBefore(moment(result(timeConfig, 'startTimeSkn_CUTOFF'), 'HH:mm')) || moment(serverTimeNew, 'HH:mm').isBefore(moment(result(timeConfig, 'startTimeRtgs_CUTOFF'), 'HH:mm'))  && cutOffMsg === null ? timeConfig.coreBusinessDateV3 : timeConfig.coreNextBusinessSknDateV3 || timeConfig.coreNextBusinessRtgsDateV3;
    if (transferType === 'skn' || transferType === 'rtgs') {
      const appTime = new Date();
      const gapTime = result(this, 'props.gapTimeServer', 0);
      const serverTimeNew = String(moment(appTime).add(gapTime, 'seconds').format('HH:mm'));
      time = getTransferTime(moment(result(timeConfig, 'cutOffTimeSkn'), 'HH:mm'),
        moment(result(timeConfig, 'cutOffTimeRtgs'), 'HH:mm'),
        moment(serverTimeNew, 'HH:mm'), // TODO get currentTime from server
        moment(result(timeConfig, 'coreBusinessDate')),
        moment(result(timeConfig, 'startTimeSkn_CUTOFF'), 'HH:mm'),
        moment(result(timeConfig, 'startTimeRtgs_CUTOFF'), 'HH:mm'),
        transferType, cutOffMsg);
      if (time === 'nextWorking') {
        showTime = sendDate;
      }
    }
    let isFundTransfer = '';
    if (transferType === 'network' || transferType === 'inbank' || transferType === 'own') {
      isFundTransfer = 'yes';
    } else if (time === 'today' && transferType === 'skn' || time === 'today' && transferType === 'rtgs') {
      isFundTransfer = 'yes';
    } else if (time === 'nextWorking'  && transferType === 'skn' || time === 'nextWorking' && transferType === 'rtgs') {
      isFundTransfer = 'PENDING';
    }
    const isValas = false;
    let modalOptions = {
      heading: `${myAccount.name}`,
      subheading: subheadingShow,
      details: detailsShow,
      amount: isValas ? `${currency} ${amount}` : `Rp ${currencyFormatter(amount)}`,
      transactionId: transferReferenceNumber,
      accountFrom: myAccount,
      currencyValas: isValas ? currency : currency,
      currencyRate: '',
      resData,
      isFundTransfer: isFundTransfer
    };
    const allTransfers = result(storeState, 'lastFundTransactions.allTransactions', []);
    let trxType;
    const daySkn = getDayName(showTime);
    const initiatedTime = daySkn + ', ' + moment(showTime).format('DD MMM YYYY');
    const dataDetail = middlewareUtils.prepareDataDetailTransferQR(myAccount, resData, initiatedTime, note, amount);
    const isQrTransfer = true;
    dispatch(actionCreators.showPaymentModal({
      ...modalOptions,
      transactionType: trxType,
      type: 'LOADING'
    }));
    let easyPin = result(storeState, 'form.AuthenticateForm.values.easypin', '');
    const randomNumber = randomString(16);
    OBM_EncryptPassword(easyPin, randomNumber);
    if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
    const transferFormData = {myAccount, amount, note, transferMode: isOnUs ? 'inbank' : 'network'};
    const transferPayload = middlewareUtils.prepareTransferPayloadQr(transferFormData, payeeAccount,
      transferReferenceNumber, easyPin, smsOtp, simasToken, type, isFavorite, data.resData, currency, isQrTransfer, jsonData, isOnUs, isDana);
    const iscounterTrxData = result(storeState, 'counterTrxData', true);
    return api.transferQr(transferPayload, dispatch).then((res) => {
      const id = result(res, 'data.id', '');
      const resDataTrf = result(res, 'data', {});
      const responseCode = result(res, 'data.responseCode', '');
      trxType = 'Transfer';
      dispatch(deleteSelectedPayeeQRAuto(payeeAccount, isOnUs));
      dispatch(resetToDashboardFrom('QRScannerLanding'));      
      dispatch(actionCreators.hideSpinner());
      dispatch(actionCreators.showPaymentModal({
        ...modalOptions,
        transactionType: trxType,
        type: 'SUCCESS',
        dataDetail,
        resDataTrf
      }));
      if (responseCode === '00') {
        dispatch(NavigationActions.navigate({routeName: 'NewPaymentStatusRevampOnboarding', params: {isValas, resDataTrf, data}}));
        dispatch(actionCreators.clearTransRefNum());
        dispatch(refreshStorageNew());
        dispatch(updateBalances());
        dispatch(getTargetAccount());
        dispatch(destroy('QRInvoiceForm'));
        dispatch(actionCreators.clearBillerDescFav());
        dispatch(actionCreators.updateLastTransactions(middlewareUtils.getFundTransferHistory(id, payeeAccount)));
        allTransfers.push({
          accountNumber: payeeAccount.accountNumber,
          name: payeeAccount.name,
          bank: payeeAccount.bank,
          id: (id) ? id : result(payeeAccount, 'id')
        });
        set(storageKeys['ALL_PAYEES'], allTransfers).catch((err) => {
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_STORE_RECENT_PAYEE_DETAILS), Toast.LONG);
        });
      } else if (responseCode === '68') {
        dispatch(NavigationActions.navigate({routeName: 'NewPaymentStatusRevampOnboarding', params: {isValas, resDataTrf, data}}));
        dispatch(actionCreators.clearTransRefNum());
        dispatch(refreshStorageNew());
        dispatch(updateBalances());
        dispatch(getTargetAccount());
        dispatch(destroy('QRInvoiceForm'));
        dispatch(actionCreators.clearBillerDescFav());
        dispatch(actionCreators.updateLastTransactions(middlewareUtils.getFundTransferHistory(id, payeeAccount)));
        allTransfers.push({
          accountNumber: payeeAccount.accountNumber,
          name: payeeAccount.name,
          bank: payeeAccount.bank,
          id: (id) ? id : result(payeeAccount, 'id')
        });
        set(storageKeys['ALL_PAYEES'], allTransfers).catch((err) => {
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_STORE_RECENT_PAYEE_DETAILS), Toast.LONG);
        });
      } else {
        dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNewOnboarding', params: {isValas, resDataTrf, isBillPay: false}}));
      }
    }).
      catch((err) => {
        dispatch(deleteSelectedPayeeQRAuto(payeeAccount, isOnUs));
        dispatch(getTargetAccount());
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
        const responseCode = result(err, 'data.responseCode', '');
        if (easyPinAttempt === 'invalid') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          if (smsOtp !== '') {
            Toast.show(language.ERROR_MESSAGE_INVALID_SMS_PIN_TRANSACTION);
          } else {
            Toast.show(language.ERROR_MESSAGE_INVALID_EASYPIN_TRANSACTION);
          }
        } else if (easyPinAttempt === 'blocked') {
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.clearTransRefNum());
          Toast.show(language.ERROR_MESSAGE_BLOCKED_EASYPIN_TRANSACTION);
          dispatch(logout());
        } else if (easyPinAttempt === 'errHsm') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          Toast.show(language.ERROR_MESSAGE_SYSTEM_UNDER_MAINTENANCE);
        } else if (responseCode === '68') {
          const resDataTrf = result(err, 'data', {});
          const trxType = 'Transfer';
          const id = result(err, 'data.id', '');
          dispatch(actionCreators.showPaymentModal({
            ...modalOptions,
            transactionType: trxType,
            type: 'PENDING',
            dataDetail,
            resDataTrf
          }));
          dispatch(actionCreators.hideSpinner());
          dispatch(resetToDashboardFrom('QRScannerLanding'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(refreshStorageNew());
          dispatch(updateBalances());
          dispatch(getTargetAccount());
          dispatch(destroy('QRInvoiceForm'));
          dispatch(actionCreators.clearBillerDescFav());
          dispatch(actionCreators.updateLastTransactions(middlewareUtils.getFundTransferHistory(id, payeeAccount)));
          allTransfers.push({
            accountNumber: payeeAccount.accountNumber,
            name: payeeAccount.name,
            bank: payeeAccount.bank,
            id: (id) ? id : result(payeeAccount, 'id')
          });
          set(storageKeys['ALL_PAYEES'], allTransfers).catch((err) => {
            Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_STORE_RECENT_PAYEE_DETAILS), Toast.LONG);
          }); 
          dispatch(NavigationActions.navigate({routeName: 'NewPaymentStatusRevampOnboarding', params: {isValas, resDataTrf, data}}));
        } else {
          trxType = 'Transfer';
          if (type === 'creditCard') {
            dispatch(resetToDashboardFrom('Landing'));
          } else {
            dispatch(resetToDashboardFrom('QRScannerLanding'));      
          }
          dispatch(actionCreators.hideSpinner());
          if (isBfr === true) {
            const isBillPay = true;
            dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNewOnboarding', params: {isBillPay}}));
          } else {
            dispatch(NavigationActions.navigate({routeName: type === 'creditCard' ?  'PaymentStatusNew' : 'PaymentStatusRevampOnboarding', params: {}}));
          }
          const resultDisplay = result(err, 'data.result.displayList', []);
          const errorText = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_TRANSFER);
          if (err.AddPayeeFailed) {
            modalOptions = {...modalOptions,
              transactionType: 'Add Payee'
            };
          } else {
            modalOptions = {...modalOptions,
              transactionType: 'Transfer',
              dataDetail
            };
            dispatch(destroy('fundTransfer'));
            dispatch(destroy('addPayee'));
            dispatch(destroy('CardLessWithdrawalConfirmation'));
            dispatch(destroy('CardLessWithdrawalPayment'));
            dispatch(destroy('CardLessWithdrawalAccount'));
          }
          dispatch(errorResponseResult(err, modalOptions, resultDisplay, errorText, result(transferFormData, 'myAccount', {})));
          if (iscounterTrxData === false) {
            dispatch(refreshStorageNew());
          } else {
            dispatch(updateBalances());
            dispatch(getLuckyDipTicket());
          }
          dispatch(actionCreators.clearBillerDescFav());
          dispatch(actionCreators.clearTransRefNum());
        }
      });
  };
}

export function QRPay (data, defaultAccount, merchantName, isBillpay) {
  return (dispatch, getState) => {
    const state = getState();
    const tipAmountManual = Number(result(data, 'data.tipAmountManual', 0));
    const amountVal = Number(result(data, 'data.amountVal', 0)).toFixed(2);
    const isNanTip = isNaN(tipAmountManual);
    const tag57 = Number(result(data, 'jsonDt.57', 0));
    const tag55 = result(data, 'jsonDt.55', '00');
    const tip = ((isNanTip || ((tag57 > 0) && (tag55 === '03')) ? (amountVal * tag57) / 100 : tipAmountManual)).toFixed(2);
    const transRefNum = state.transRefNum;
    const mPinInputed = result(state, 'form.AuthenticateForm.values.otp', '');
    const tokenInputed = result(state, 'form.AuthenticateForm.values.simasToken', '');
    const invoiceID = result(data, 'jsonDt.62.01', '');
    const idAccountSelected = result(data, 'defaultAccount.id', '');
    const checkingCIF = result(state, 'checkingCIFbeforeLogin', false);
    const limitBeforeLogin = result(state, 'config.limitConfigAutoDebetAccount', '');
    const searchIndexComma = indexOf(limitBeforeLogin, ',');
    const setLimitCIF = checkingCIF ? limitBeforeLogin.substring(0, searchIndexComma) : limitBeforeLogin.substring(searchIndexComma + 1, limitBeforeLogin.length);
    const isLogin = !isEmpty(result(state, 'user', {}));
    const allAccounts = result(state, 'accounts', []);
    const flagEmoneyraw = find(allAccounts, function (val) {
      const productAccountName = result(val, 'id', '');
      return idAccountSelected === productAccountName;
    });
    const isDefaultAccount = find(allAccounts, function (val) {
      const productDefault = lowerCase(result(val, 'isDefaultAccount', ''));
      return productDefault === 'yes';
    });
    const switchAccountToogleBE = toLower(result(state, 'config.flag.primaryToogleAccount', 'inactive')) === 'active';
    const flagEmoney = result(flagEmoneyraw, 'accountType', '') === 'emoneyAccount';
    const allAmount = Number(((isNanTip || ((tag57 > 0) && (tag55 === '03')) ? (amountVal * tag57) / 100 : tipAmountManual))) + Number(result(data, 'data.amountVal', 0));
    const defaultToogle = result(state, 'primaryToogleAccount', false);
    const checkBalance = !isLogin ? result(state, 'defaultAccount.balances.availableBalance', '0') : result(data, 'data.accountNo.balances.availableBalance', '0');
    const checkAmountBalanceFLag = Number(setLimitCIF) < Number(allAmount) ? true  : Number(checkBalance) < Number(allAmount);
    // const selectedAccountIdFrom = !isEmpty(isDefaultAccount) && switchAccountToogleBE && flagEmoney && defaultToogle && checkAmountBalanceFLag && !isLogin ?  result(isDefaultAccount, 'id', '') : result(data, 'defaultAccount.id', '');
    const ownership = result(state, 'couponCheck.ownership', '');
    const voucherId = Number(result(state, 'couponCheck.voucherId', 0)).toString();
    const jsonData = result(data, 'jsonDt', '');
    const additionalInfoMap = {voucherId, ownership};
    const payload = {
      accountFrom: result(data, 'data.accountNo.id', ''),
      amount: (Number(amountVal) + Number(tip)).toFixed(2),
      tipAmount: Number(tip).toFixed(2),
      merchantDataMap: result(data, 'jsonDt', ''),
      amountNumber: Number(amountVal).toFixed(2),
      accountTo: generateLuhn(result(data, 'data.bankAcc.val', '')),
      invoiceId: invoiceID ? invoiceID : Math.random().toString().substring(3, 15) + Math.random().toString().substring(2, 5),
    };
    const dtSend = middlewareUtils.prepareGpnTransaction(transRefNum, mPinInputed, tokenInputed, payload, additionalInfoMap);
    const descriptionCouponSuccess = result(state, 'couponCheck.description', '');
    const iscounterTrxData = result(state, 'counterTrxData', true);
    const accountDefaultSelected = result(state, 'defaultAccount', '');
    const flagMgm = result(state, 'config.hideNotifMGM', '');
    const flagMgmOn = lowerCase(flagMgm) === 'yes';
    dispatch(actionCreators.saveCouponSuccessStatus(descriptionCouponSuccess));
    dispatch(actionCreators.showSpinner());
    return api.transactionQRGpn(dtSend, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      if (iscounterTrxData === false) {
        dispatch(refreshStorageNew());
        dispatch(goToYouBill());
      } else {
        dispatch(updateBalances());
        dispatch(getLuckyDipTicket());
        dispatch(goToYouBill());
      }
      if (isBillpay) {
        dispatch(resetToDashboardFrom('QRScannerLanding'));
        dispatch(NavigationActions.navigate({routeName: 'QrPaymentStatusOnboarding', params: {defaultAccount, isBillpay, data, jsonData, transRefNum}}));
      } else {
        dispatch(resetToDashboardFrom('QRScannerLanding'));
        dispatch(NavigationActions.navigate({routeName: 'QrPaymentStatusOnboarding', params: {jsonData, transRefNum}}));
      }
      if (!flagMgmOn) {
        dispatch(popUpRewardMgm());
      }
      const paymentStatusData = {
        status: 'SUCCESS',
        resultData: result(res, 'data', {}),
        transRefNum: transRefNum,
        accountFrom: result(data, 'data.accountNo', ''),
        accountTo: result(data, 'data.bankAcc.bankName', ''),
        merchantName: merchantName,
      };
      // const billCode = 'QR-Success';
      // const os = Platform.OS;
      // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
      dispatch(actionCreators.updatePaymentStatus({...paymentStatusData, status: 'SUCCESS'}));
      dispatch(actionCreators.clearEgiftCart());
      dispatch(actionCreators.clearTransRefNum());
    }).catch((err) => {
      // const billCode = 'QR-Failed';
      // const os = Platform.OS;
      const resCode = result(err, 'data.responseCode', '');
      // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
      const easyPinAttempt = result(err, 'data.responseCore.easypinAttempt', '');
      if (easyPinAttempt === 'invalid') {
        dispatch(actionCreators.hideSpinner());
        dispatch(reset('AuthenticateForm'));
        if (mPinInputed !== '') {
          Toast.show(language.ERROR_MESSAGE_INVALID_SMS_PIN_TRANSACTION);
        } else {
          Toast.show(language.ERROR_MESSAGE_INVALID_EASYPIN_TRANSACTION);
        }
      } else if (easyPinAttempt === 'blocked') {
        dispatch(actionCreators.hideSpinner());
        Toast.show(language.ERROR_MESSAGE_BLOCKED_EASYPIN_TRANSACTION);
        dispatch(actionCreators.clearTransRefNum());
        setTimeout(() => {
          dispatch(logout());
        }, 0);
      } else if (easyPinAttempt === 'errHsm') {
        dispatch(actionCreators.hideSpinner());
        dispatch(reset('AuthenticateForm'));
        Toast.show(language.ERROR_MESSAGE_SYSTEM_UNDER_MAINTENANCE);
      } else {
        dispatch(actionCreators.hideSpinner());
        const paymentStatusData = {
          status: 'PENDING',
          resultData: result(err, 'data', {}),
          transRefNum: transRefNum,
          accountFrom: result(data, 'data.accountNo', ''),
          accountTo: result(data, 'data.bankAcc.bankName', ''),
          merchantName: merchantName,
        };
        if (resCode === '68') {
          dispatch(actionCreators.updatePaymentStatus({...paymentStatusData, status: 'PENDING_RC68'}));
          if (isBillpay) {
            dispatch(resetToDashboardFrom('QRScannerLanding'));
            dispatch(NavigationActions.navigate({routeName: 'QrPaymentStatusOnboarding', params: {defaultAccount, isBillpay, data, jsonData, transRefNum}}));
          } else {
            dispatch(resetToDashboardFrom('QRScannerLanding'));
            dispatch(NavigationActions.navigate({routeName: 'QrPaymentStatusOnboarding', params: {jsonData, transRefNum}}));
          }
          dispatch(actionCreators.clearTransRefNum());
        } else {
          dispatch(actionCreators.hideSpinner());
          const paymentStatusData = {
            status: 'PENDING',
            resultData: result(err, 'data', {}),
            transRefNum: transRefNum,
            accountFrom: isLogin ? result(data, 'data.accountNo', '') : !isEmpty(isDefaultAccount) && switchAccountToogleBE && flagEmoney && defaultToogle && checkAmountBalanceFLag && !isLogin ? isDefaultAccount  : accountDefaultSelected,
            accountTo: result(data, 'data.bankAcc.bankName', ''),
            merchantName: merchantName,
          };
          dispatch(actionCreators.updatePaymentStatus());
          if (isBillpay) {
            dispatch(resetToDashboardFrom('QRScannerLanding'));
            dispatch(NavigationActions.navigate({routeName: 'QrPaymentStatusOnboarding', params: {isBillpay, transRefNum, jsonData, data, paymentStatusData}}));
          } else {
            dispatch(resetToDashboardFrom('QRScannerLanding'));
            dispatch(NavigationActions.navigate({routeName: 'QrPaymentStatusOnboarding', params: {jsonData, transRefNum, data, paymentStatusData}}));
          }
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          const errorText = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL);
          const resultDisplay = result(err, 'data.result.displayList', []);
          dispatch(errorResult(err, payload, resultDisplay, errorText, result(data, 'data.accountNo', {})));
          dispatch(actionCreators.clearTransRefNum());
        }
      }
    });
  };
}

export function QRPayCrossBorder (data, defaultAccount, merchantName, isBillpay) {
  return (dispatch, getState) => {
    const state = getState();
    const tipAmountManual = Number(result(data, 'data.tipAmountManual', 0));
    const amountVal = Number(result(data, 'data.amountVal', 0)).toFixed(2);
    const isNanTip = isNaN(tipAmountManual);
    const tag57 = Number(result(data, 'jsonDt.57', 0));
    const tag55 = result(data, 'jsonDt.55', '00');
    const tip = ((isNanTip || ((tag57 > 0) && (tag55 === '03')) ? (amountVal * tag57) / 100 : tipAmountManual)).toFixed(2);
    const transRefNum = state.transRefNum;
    const mPinInputed = result(state, 'form.AuthenticateForm.values.otp', '');
    const idAccountSelected = result(data, 'defaultAccount.id', '');
    const checkingCIF = result(state, 'checkingCIFbeforeLogin', false);
    const limitBeforeLogin = result(state, 'config.limitConfigAutoDebetAccount', '');
    const searchIndexComma = indexOf(limitBeforeLogin, ',');
    const setLimitCIF = checkingCIF ? limitBeforeLogin.substring(0, searchIndexComma) : limitBeforeLogin.substring(searchIndexComma + 1, limitBeforeLogin.length);
    const isLogin = !isEmpty(result(state, 'user', {}));
    const allAccounts = result(state, 'accounts', []);
    const flagEmoneyraw = find(allAccounts, function (val) {
      const productAccountName = result(val, 'id', '');
      return idAccountSelected === productAccountName;
    });
    const isDefaultAccount = find(allAccounts, function (val) {
      const productDefault = lowerCase(result(val, 'isDefaultAccount', ''));
      return productDefault === 'yes';
    });
    const switchAccountToogleBE = toLower(result(state, 'config.flag.primaryToogleAccount', 'inactive')) === 'active';
    const flagEmoney = result(flagEmoneyraw, 'accountType', '') === 'emoneyAccount';
    const allAmount = Number(((isNanTip || ((tag57 > 0) && (tag55 === '03')) ? (amountVal * tag57) / 100 : tipAmountManual))) + Number(result(data, 'data.amountVal', 0));
    const defaultToogle = result(state, 'primaryToogleAccount', false);
    const checkBalance = !isLogin ? result(state, 'defaultAccount.balances.availableBalance', '0') : result(data, 'data.accountNo.balances.availableBalance', '0');
    const checkAmountBalanceFLag = Number(setLimitCIF) < Number(allAmount) ? true  : Number(checkBalance) < Number(allAmount);
    const selectedAccountIdFrom = !isEmpty(isDefaultAccount) && switchAccountToogleBE && flagEmoney && defaultToogle && checkAmountBalanceFLag && !isLogin ?  result(isDefaultAccount, 'id', '') : result(data, 'defaultAccount.id', '');
    const jsonData = result(data, 'jsonDt', '');
    const QRString = result(data, 'qrData', '');
    const sessionId = result(state, 'additionalApiPayload.sessionCode', {});
    const serverToken = result(state, 'appInitKeys.tokenServer', {});
    const isITMX = result(jsonData, '58', '') === 'TH';
    const isNet = result(jsonData, '58', '') === 'SG';
    const netCPan = result(jsonData, '26.01', '') || result(jsonData, '27.01', '');
    const thCreditPan = result(jsonData, '30.01', '');
    const getThbCreditPan = thCreditPan.slice(thCreditPan.length - 11);
    const getNetsCpan = netCPan.slice(thCreditPan.length - 11);
    const transformThbCpan = '97640000'.concat(getThbCreditPan);
    const transformNetsCpan = '97020000'.concat(getNetsCpan);
    const creditPan = isITMX ? transformThbCpan  : isNet ? transformNetsCpan : result(jsonData, '26.02', '') !== '' ? String(result(jsonData, '26.02', '')) : result(jsonData, '30.02', '') !== '' ? String(result(jsonData, '30.02', '')) : String(result(jsonData, '51.02', ''));
    const merchantId = isITMX ? result(jsonData, '30.01', '') : result(jsonData, '26.02', '') !== '' ? String(result(jsonData, '26.02', '')) : String(result(jsonData, '51.02', ''));
    const bankCodeCredit = result(jsonData, '26.01', '') !== '' ? String(result(jsonData, '26.01', '')) : result(jsonData, '30.01', '') !== '' ? String(result(jsonData, '30.01', '')) : result(jsonData, '51.01', '') !== '' ? String(result(jsonData, '51.01', '')) : '1234';
    const checkLengtCredit = bankCodeCredit.length < 8 ? bankCodeCredit.padEnd(14, '0') : bankCodeCredit;
    const rateRefNum = result(data, 'resulData.rateRefNum', '');
    const convertedAmountIDR  = result(data, 'resulData.convertedAmountIDR', '');
    const conversionRate = result(data, 'resulData.conversionRate', '');
    const dtSend = {
      sessionId: String(sessionId),
      serverToken: String(serverToken),
      debitBankCode: '0153',
      amount: String((Number(amountVal) + Number(tip)).toFixed(2)),
      currencyTransactionCode: String(result(jsonData, '53', '')),
      merchantCity: String(result(jsonData, '60', '')) || ' ',
      merchantCountryCode: String(result(jsonData, '58', '')),
      debitAccount: String(result(data, 'data.accountNo.accountNumber', '')), 
      nmid: ' ',
      terminalId: String(result(jsonData, '62.07', '')) || ' ',
      merchantPhoneNum: String(result(jsonData, '62.02', '')) || ' ',
      creditBankCode: checkLengtCredit.substring(4, 8),
      customerName: String(result(data, 'data.accountNo.name', '')),
      merchantName: result(jsonData, '59', '') === '' ? ' ' : String(result(jsonData, '59', '')),
      merchantCriteria: result(jsonData, '26.03', '') !== '' ? String(result(jsonData, '26.03', '')) : result(jsonData, '30.03', '') !== '' ? String(result(jsonData, '30.03', '')) : result(jsonData, '51.03', '') !== '' ? String(result(jsonData, '51.03', '')) : ' ',
      merchantId: merchantId || ' ',
      merchantCategoryCode: result(jsonData, '52', '') !== '' ? String(result(jsonData, '52', '')) : ' ',
      merchantPostalCode: String(result(data, 'jsonDt.61', '')) || ' ',
      tipsAmount: String(Number(tip).toFixed(2)),
      qrType: String(result(jsonData, '01', '')),
      QRString,
      rateRefNum: String(rateRefNum),
      convertedAmountIDR,
      conversionRate,
      additionalQR: jsonData
    };
    const descriptionCouponSuccess = result(state, 'couponCheck.description', '');
    const iscounterTrxData = result(state, 'counterTrxData', true);
    const accountDefaultSelected = result(state, 'defaultAccount', '');
    dispatch(actionCreators.saveCouponSuccessStatus(descriptionCouponSuccess));
    dispatch(actionCreators.showSpinner());
    return api.transactionQRCrossBorder(dtSend, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      if (iscounterTrxData === false) {
        dispatch(refreshStorageNew());
      } else {
        dispatch(updateBalances());
        dispatch(getLuckyDipTicket());
      }
      dispatch(resetToDashboardFrom('QRScannerLanding'));
      if (Platform.OS === 'android') {
        dispatch(NavigationActions.navigate({routeName: 'QrPaymentStatusOnboardingRevamp', params: {defaultAccount, isBillpay, data, jsonData, transRefNum}}));
      } else {
        dispatch(NavigationActions.navigate({routeName: 'QrPaymentStatusOnboardingRevampSuccess', params: {defaultAccount, isBillpay, data, jsonData, transRefNum}}));
      }
      const paymentStatusData = {
        status: 'SUCCESS',
        resultData: result(res, 'data', {}),
        transRefNum: transRefNum,
        accountFrom: isLogin || !defaultToogle ? result(data, 'data.accountNo', '') : selectedAccountIdFrom,
        accountTo: result(data, 'data.bankAcc.bankName', ''),
        merchantName: merchantName,
        mPan: creditPan,
        merchantId: merchantId
      };
      // const billCode = 'QR-Success';
      // const os = Platform.OS;
      // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
      dispatch(actionCreators.updatePaymentStatus({...paymentStatusData, status: 'SUCCESS'}));
      dispatch(actionCreators.clearEgiftCart());
      dispatch(actionCreators.clearTransRefNum());
    }).catch((err) => {
      // const billCode = 'QR-Failed';
      // const os = Platform.OS;
      // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
      const easyPinAttempt = result(err, 'data.easypinAttempt', '');
      const isPending = result(err, 'data.RC', '') === '0068' || result(err, 'data.RC', '') === '68';
      if (easyPinAttempt === 'invalid') {
        dispatch(actionCreators.hideSpinner());
        dispatch(reset('AuthenticateForm'));
        if (mPinInputed !== '') {
          Toast.show(language.ERROR_MESSAGE_INVALID_SMS_PIN_TRANSACTION);
        } else {
          Toast.show(language.ERROR_MESSAGE_INVALID_EASYPIN_TRANSACTION);
        }
      } else if (easyPinAttempt === 'blocked') {
        dispatch(actionCreators.hideSpinner());
        Toast.show(language.ERROR_MESSAGE_BLOCKED_EASYPIN_TRANSACTION);
        dispatch(actionCreators.clearTransRefNum());
        setTimeout(() => {
          dispatch(logout());
        }, 0);
      } else if (easyPinAttempt === 'errHsm') {
        dispatch(actionCreators.hideSpinner());
        dispatch(reset('AuthenticateForm'));
        Toast.show(language.ERROR_MESSAGE_SYSTEM_UNDER_MAINTENANCE);
      } else if (isPending) { 
        dispatch(actionCreators.hideSpinner());
        const paymentStatusData = {
          status: 'PENDING',
          resultData: result(err, 'data', {}),
          transRefNum: transRefNum,
          accountFrom: result(data, 'data.accountNo', {}),
          accountTo: result(data, 'data.bankAcc.bankName', ''),
          merchantName: merchantName,
          mPan: creditPan,
          merchantId: merchantId
        };
        dispatch(actionCreators.updatePaymentStatus({...paymentStatusData}));
        if (isBillpay) {
          dispatch(resetToDashboardFrom('QRScannerLanding'));
          if (Platform.OS === 'android') {
            dispatch(NavigationActions.navigate({routeName: 'QrPaymentStatusOnboardingRevamp', params: {defaultAccount, isBillpay, data, jsonData, transRefNum}}));
          } else {
            dispatch(NavigationActions.navigate({routeName: 'QrPaymentStatusOnboardingRevampPending', params: {defaultAccount, isBillpay, data, jsonData, transRefNum}}));
          }
        } else {
          dispatch(resetToDashboardFrom('QRScannerLanding'));
          if (Platform.OS === 'android') {
            dispatch(NavigationActions.navigate({routeName: 'QrPaymentStatusOnboardingRevamp', params: {defaultAccount, isBillpay, data, jsonData, transRefNum}}));
          } else {
            dispatch(NavigationActions.navigate({routeName: 'QrPaymentStatusOnboardingRevampPending', params: {defaultAccount, isBillpay, data, jsonData, transRefNum}}));
          }
        }
        dispatch(actionCreators.clearTransRefNum());
      } else {
        dispatch(actionCreators.hideSpinner());
        const failedTransId = result(err, 'data.transactionId', '');
        const paymentStatusData = {
          status: 'PENDING',
          resultData: result(err, 'data', {}),
          transRefNum: failedTransId,
          accountFrom: isLogin ? result(data, 'data.accountNo', '') : !isEmpty(isDefaultAccount) && switchAccountToogleBE && flagEmoney && defaultToogle && checkAmountBalanceFLag && !isLogin ? isDefaultAccount  : accountDefaultSelected,
          accountTo: result(data, 'data.bankAcc.bankName', ''),
          merchantName: merchantName,
          failedRRN: result(err, 'data.rrn', '')
        };
        dispatch(actionCreators.updatePaymentStatus());
        if (isBillpay) {
          dispatch(resetToDashboardFrom('QRScannerLanding'));
          dispatch(NavigationActions.navigate({routeName: 'QrPaymentStatusOnboarding', params: {isBillpay, transRefNum: failedTransId, jsonData, data, paymentStatusData}}));
        } else {
          dispatch(resetToDashboardFrom('QRScannerLanding'));
          dispatch(NavigationActions.navigate({routeName: 'QrPaymentStatusOnboarding', params: {jsonData, transRefNum: failedTransId, data, paymentStatusData}}));
        }
        const errorText = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL);
        const resultDisplay = result(err, 'data.result.displayList', []);
        dispatch(errorResult(err, dtSend, resultDisplay, errorText, result(data, 'data.accountNo', {})));
        dispatch(actionCreators.clearTransRefNum());
      }
    });
  };
}

export function inquiryGPN (saveStateTag51 = noop, dtPayload) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const dataQrGpn = result(state, 'qrGpnIssuer.dataQrGpn', '');
    const subscriberNoInput = result(dtPayload, '51.02', '');
    const payload = {
      'subscriberNoInput': subscriberNoInput,
      'merchantDataMap': dtPayload
    };
    return api.inquiryGpnTag51(payload, dispatch).then((res) => {
      const addQr = result(res, 'data.inquiryResult.additionalQR', '');
      if (addQr.length > 6) {
        if (!isEmpty(chewTag(addQr))) {
          dispatch(actionCreators.saveQrGpnData({dataQrGpn, 'inquiryQR': result(res, 'data.inquiryResult.additionalQR', '')}));
          saveStateTag51();
          dispatch(actionCreators.hideSpinner());
        } else {
          Toast.show(language.ERROR_MESSAGE__COULD_GET_PAN);
          dispatch(resetToDashboardFrom('QRScannerLanding'));
          dispatch(actionCreators.hideSpinner());
        }
      } else {
        Toast.show(language.ERROR_MESSAGE__COULD_GET_PAN);
        dispatch(resetToDashboardFrom('QRScannerLanding'));
        dispatch(actionCreators.hideSpinner());
      }
    }).catch((err) => {
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_GET_PAN));
      dispatch(resetToDashboardFrom('QRScannerLanding'));
      dispatch(actionCreators.hideSpinner());
    });
  };
}


export function inquiryQrisCB (value, jsonData, qrData) {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    const amountVal = Number(result(value, 'amountVal', 0));
    const tipAmountManual = Number(result(value, 'tipAmountManual', 0));
    const isNanTip = isNaN(tipAmountManual);
    const tag57 = Number(result(jsonData, '57', 0));
    const isITMX = result(jsonData, '58', '') === 'TH';
    const tag55 = result(value, '55', '00');
    const merchantId = isITMX ? result(jsonData, '30.01', '') : result(jsonData, '26.02', '') !== '' ? String(result(jsonData, '26.02', '')) : String(result(jsonData, '51.02', ''));
    const tip = ((isNanTip || ((tag57 > 0) && (tag55 === '03')) ? (amountVal * tag57) / 100 : tipAmountManual)).toFixed(2);
    const totalAmount = (Number(tip) + Number(amountVal)).toFixed(2);
    const terminalId =  result(jsonData, '62.07', '') || ' ';
    const dtSend = {
      debitBankCode: '0153',
      merchantCountryCode: String(result(jsonData, '58', '')),
      debitAccount: String(result(value, 'accountNo.accountNumber', '')), 
      nmid: ' ',
      amount: String(totalAmount),
      terminalId: terminalId,
      creditBankCode: ' ',
      customerName: String(result(value, 'accountNo.name', '')),
      merchantName: result(jsonData, '59', '') === '' ? '' : String(result(jsonData, '59', '')),
      merchantCriteria: result(jsonData, '26.03', '') !== '' ? String(result(jsonData, '26.03', '')) : result(jsonData, '30.03', '') !== '' ? String(result(jsonData, '30.03', '')) : result(jsonData, '51.03', '') !== '' ? String(result(jsonData, '51.03', '')) : ' ',
      merchantId: merchantId || ' ',
      merchantCategoryCode: result(jsonData, '52', '') !== '' ? String(result(jsonData, '52', '')) : ' ',
      tipsAmount: String(Number(tip).toFixed(2)),
      qrType: String(result(jsonData, '01', '')),
      currencyTransactionCode: String(result(jsonData, '53', '')),
      merchantCity: result(jsonData, '60', '') || ' ',
      QRString: String(qrData),
      additionalQR: jsonData
    };
    const isCrossBorder = true;
    return api.inquiryCrossBorder(dtSend, dispatch).then((res) => {
      const resultData = result(res, 'data', []);
      dispatch(QRInvoiceConfirm(value, jsonData, qrData, isCrossBorder, resultData));

    }).catch((err) => {
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_GET_PAN));
      dispatch(actionCreators.hideSpinner());
    });
  };
}


export function saveQrData (data = {}) {
  return (dispatch) => {
    dispatch(actionCreators.saveQrGpnData({dataQrGpn: data}));
  };
}

export function invoiceGPN (res) {
  return (dispatch, getState) => {
    dispatch(destroy('QRInvoiceForm'));
    const state = getState();
    let jsonData = parseTLV(result(res, 'data', ''));
    jsonData = JSON.parse(jsonData);
    const validTag = validateTags(jsonData);
    const bankList = result(state, 'valueBankList.bankList', '');
    const validCRC = isValidCrc(res);
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const notEmpty51and26 = !isEmpty(result(jsonData, '26', {})) || !isEmpty(result(jsonData, '51', {}));

    if (((result(validCRC, 'is63Valid', false) &&  result(validCRC, 'isValidCrc', false)) && (!isEmpty(jsonData)) && (validTag < 0)) && notEmpty51and26) {
      dispatch(saveQrData(jsonData));
      dispatch(NavigationActions.navigate({routeName: 'QRInvoice', params: {data: jsonData, bankList, qrData: result(res, 'data', {})}}));
    } else {
      const modalOptions = {
        button1: 'OK',
        onButton1Press: hideAlert,
        closeOnTouchOutside: true,
        onClose: hideAlert,
        heading1: language.QR_GPN_NOT_REGISTERED_QR
      };
      dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
      dispatch(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'HomeScreen'}),
        ]
      }));
    }
  };
}

export function deleteSelectedPayeeQRAuto (payee, isOnUs) {
  return (dispatch, getState) => {
    const state = getState();
    const targetAccontNumber = result(payee, 'accountNumber', '');
    const cifCode = String(result(state, 'user.profile.customer.cifCode', ''));
    const loginName = String(result(state, 'user.profile.loginName', ''));
    const targetType = isOnUs ? 'inbanktransfer' : 'networkTransfer';
    const isLogin = !isEmpty(result(state, 'user', {}));
    const transferMethodType = isLogin ? '' : '1';
    const payload = {cifCode, targetAccontNumber, targetType, loginName, transferMethodType};
    dispatch(actionCreators.hideSinarmasAlert());
    return api.deleteFromPayeeList(payload, dispatch).
      then(() => {
      }).
      catch(() => {
      });
  };
}

export function triggerAuthQR (currentAmount, triggerAuthData, isSyariah) {
  return (dispatch, getState) => {
    const state = getState();
    const now = new Date();
    const couponCheck = result(state, 'couponCheck', {});
    const couponUse = result(couponCheck, 'description', '');
    const timeEndCoupon = result(couponCheck, 'endTimeMod', '');
    const timeStartCoupon = result(couponCheck, 'startTimeMod', '');
    const dateEndCoupon = result(couponCheck, 'subendDate', '');
    const dateStartCoupon = result(couponCheck, 'subnewDate', '');
    const usingFromLine = result(couponCheck, 'usingFromLine', '0');
    const minAmount = result(couponCheck, 'minAmount', 0) || 0;
    const maxAmount = result(couponCheck, 'maxAmount', 0) || 0;


    const nowTimeDate = moment(now).format('YYYY/MM/DD');
    const nowTime = moment(now).format('YYYY/MM/DD H:mm');
    const timeDateEnded = dateEndCoupon + ' ' + timeEndCoupon;
    const timeDateStarted = dateStartCoupon + ' ' + timeStartCoupon;
    const diffDateStart = moment(nowTime).diff(moment(timeDateStarted));
    const diffDateEnd = moment(nowTime).diff(moment(timeDateEnded));
    const gapTimeServer = result(state, 'gapTimeServer', 0);
    const gapTimeStart = Math.round(moment.duration(diffDateStart).asSeconds()) - gapTimeServer;
    const gapTimeEnd = Math.round(moment.duration(diffDateEnd).asSeconds()) - gapTimeServer;

    const timeDateEndedElse = nowTimeDate + ' ' + timeEndCoupon;
    const timeDateStartedElse = nowTimeDate + ' ' + timeStartCoupon;
    const diffDateStartElse = moment(nowTime).diff(moment(timeDateStartedElse));
    const diffDateEndElse = moment(nowTime).diff(moment(timeDateEndedElse));
    const gapTimeStartElse = Math.round(moment.duration(diffDateStartElse).asSeconds()) - gapTimeServer;
    const gapTimeEndElse = Math.round(moment.duration(diffDateEndElse).asSeconds()) - gapTimeServer;

    if (!isSyariah) {
      if (couponUse !== '') {
        if (timeEndCoupon === '23:59' && timeStartCoupon === '00:00') {
          if (gapTimeStart > 0 && gapTimeEnd < 0) {

            if (usingFromLine === '1') {
              if ((currentAmount >= minAmount && currentAmount <= maxAmount) || (currentAmount >= minAmount && maxAmount === 0)) {
                dispatch(triggerAuthNavigate('qrGPNPayment', triggerAuthData.amount, true, 'Auth', triggerAuthData.params));
              } else {
                Toast.show(language.GENERIC__AMOUNT_INSUFFICIENT, Toast.LONG);
              }
            } else {
              dispatch(triggerAuthNavigate('qrGPNPayment', triggerAuthData.amount, true, 'Auth', triggerAuthData.params));
            }
          } else {
            Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
          }
        } else {
          if (gapTimeStart > 0 && gapTimeEnd < 0) {
            if (gapTimeStartElse > 0 && gapTimeEndElse < 0) {
              if (usingFromLine === '1') {
                if ((currentAmount >= minAmount && currentAmount <= maxAmount) || (currentAmount >= minAmount && maxAmount === 0)) {
                  dispatch(triggerAuthNavigate('qrGPNPayment', triggerAuthData.amount, true, 'Auth', triggerAuthData.params));

                } else {
                  Toast.show(language.GENERIC__AMOUNT_INSUFFICIENT, Toast.LONG);
                }
              } else {
                dispatch(triggerAuthNavigate('qrGPNPayment', triggerAuthData.amount, true, 'Auth', triggerAuthData.params));

              }
            } else {
              Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
            }
          } else {
            Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
          }
        }
      } else {
        dispatch(triggerAuthNavigate('qrGPNPayment', triggerAuthData.amount, true, 'Auth', triggerAuthData.params));

      }
    } else {
      Toast.show(language.ERROR_MESSAGE_FOR_SYARIAHSAVING_WITH_COUPON, Toast.LONG);
    }
  };
}


export function checkValidityCouponQR (transactionAmount, isLogin, billerCode, selectedAccountIdCoupon, afterCheckCouponFunction) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const type = 'billPayment';
    const billpayMethodType = isLogin ? null : '1';
    const transRefNum = result(state, 'transRefNum', '');
    const ownership = result(state, 'couponCheck.ownership', '');
    const voucherId = result(state, 'couponCheck.voucherId', '').toString();
    const accountId = String(selectedAccountIdCoupon);
    const payloadCouponCheckingValidity = {transactionAmount, transRefNum, voucherId, type, ownership, billerCode, billpayMethodType, accountId};
    return api.checkVoucherValidity(payloadCouponCheckingValidity, dispatch).then((res) => {
      const responseCode = result(res, 'data.responseCode', '');
      dispatch(actionCreators.hideSpinner());
      if (responseCode === '00') {
        afterCheckCouponFunction();
      } else {
        Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
      }
    }).catch(() => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
    });
  };
}