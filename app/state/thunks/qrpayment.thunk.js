import * as middlewareUtils from '../../utils/middleware.util';
import * as actionCreators from '../actions/index.actions';
import api from '../../utils/api.util';
import {Toast} from '../../utils/RNHelpers.util.js';
import {getErrorMessage, currencyFormatter, parseTLV, parseTLVTcico, generateLuhn, validateTags, isValidCrc, getTransferPossibleAccountsNoEmoney, toTLVs, checkErrorTransferQr, generateMethodTransfer, makeTlv, checkShariaAccount, toTLVsCicoFix, removeDot} from '../../utils/transformer.util';
import {language} from '../../config/language';
import {destroy, reset} from 'redux-form';
import {resetToDashboardFrom, errorResponseResult} from './common.thunks';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import groupBy from 'lodash/groupBy';
import {NativeModules} from 'react-native';
import split from 'lodash/split';
import last from 'lodash/last';
import {storageKeys, set, getQREULA} from '../../utils/storage.util';
import {Buffer} from 'buffer';
import {getDefaultAccount} from './fundTransfer.thunks';
import VersionNumber from 'react-native-version-number';
import {logout} from './onboarding.thunks.js';

export function goToSDK () {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    return dispatch(getUserApiKey()).then((userApiKey) => {
      NativeModules.QrPayment.callCameraScanner(userApiKey, (invoice) => {
        if (invoice === '' || // response from Android / iOS
          invoice === '(null)#(null)#(null)#(null)#(null)#(null)#(null)#(null)#(null)#(null)#(null)#' || // response from iOS
          invoice === '###########') { // response from Android
          dispatch(actionCreators.hideSpinner()); // swapping logic because cannot validate for negation invoice
        } else {
          dispatch(NavigationActions.navigate({routeName: 'QRPayment', params: {invoice}}));
          dispatch(actionCreators.hideSpinner());
        }
      });
    });
  };
}

export function getUserApiKey () {
  return (dispatch, getState) => {
    const state = getState();
    if (result(state, 'userApiKey', '')) {
      return Promise.resolve(state.userApiKey);
    } else {
      return api.getUserApiKey({}, dispatch).then((res) => {
        const userApiKey = result(res.data, 'userApiKey');
        dispatch(actionCreators.saveUserApiKey(userApiKey));
        return userApiKey;
      }).catch(() => {
        // Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__ERROR_GETTING_USER_API_KEY), Toast.LONG);
      });
    }
  };
}

export function qrPayment (request) {
  return (dispatch, getState) => {
    const state = getState();
    const userApiKey = result(state, 'userApiKey', '');
    const transRefNum = result(state, 'transRefNum', '');
    const modalOptions = {transactionType: language.PAY_BY_QR__TITLE, transactionId: transRefNum};
    dispatch(resetToDashboardFrom('PayScreen'));
    dispatch(actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}));
    dispatch(NavigationActions.navigate({routeName: 'PaymentStatus'}));
    const payload = middlewareUtils.prepareQRPaymentPayload({...request, userApiKey});
    return api.qrPayment(payload, dispatch).then((res) => {
      dispatch(actionCreators.clearTransRefNum());
      dispatch(destroy('QRPayment'));
      const invoicePaid = result(res.data, 'responseDimo.items', []);
      const amountInvoiceObj = find(invoicePaid, {id: 'DE4'});
      const amountFromDIMO = String(result(amountInvoiceObj, 'value', ''));
      const amount = amountFromDIMO.substring(0, amountFromDIMO.length - 2);
      dispatch(actionCreators.showPaymentModal({
        ...modalOptions,
        type: 'SUCCESS',
        amount: `Rp ${currencyFormatter(amount)}`
      }));
    }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.clearTransRefNum());
        dispatch(destroy('QRPayment'));
        dispatch(actionCreators.showPaymentModal({...modalOptions, type: 'FAILED'}));
        if (isEmpty(result(err, 'data.responseMessage', ''))) {
          const goToHistory = () => {
            dispatch(NavigationActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'Landing'}),
                NavigationActions.navigate({routeName: 'TransactionsFilter', params: {accountInfo: result(request, 'myAccount', {})}})
              ]
            }));
            dispatch(actionCreators.hideSinarmasAlert());
          };
          const sinarmasModalOptions = {
            heading1: language.COMMON__TIMEOUT_TITLE1,
            heading2: language.COMMON__TIMEOUT_TITLE2,
            text: language.COMMON__TIMEOUT_MESSAGE,
            button1: language.COMMON__TIMEOUT_BUTTON,
            onButton1Press: goToHistory,
            closeOnTouchOutside: false
          };
          dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
        } else {
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BY_QR_CODE), Toast.LONG);
        }
      });
  };
}

export function checkEULA () {
  return (dispatch) => {
    getQREULA().then((res) => {
      if (res) {
        dispatch(checkUserApiKey());
      } else {
        dispatch(showEULA());
      }
    });
  };
}

export function showEULA () {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const acceptEULA = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      set(storageKeys['QREULA'], true).
        then(() => {
          dispatch(checkUserApiKey());
        }).
        catch((err) => {
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION), Toast.LONG);
        });
    };
    const modalOptions = {
      heading1: language.PAY_BY_QR__TERMS_AND_CONDITIONS,
      text: language.PAY_BY_QR__EULA,
      button1: language.PAY_BY_QR__EULA_CANCEL,
      onButton1Press: hideAlert,
      button2: language.PAY_BY_QR__EULA_AGREE,
      onButton2Press: acceptEULA,
      onClose: hideAlert};
    dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
  };
}

export function checkUserApiKey () {
  return (dispatch, getState) => {
    const {userApiKey, user} = getState();
    const isLogin = !isEmpty(user);
    if (isLogin) {
      dispatch(NavigationActions.navigate({routeName: 'QRScanner', params: {userApiKey}}));
    } else {
      dispatch(NavigationActions.navigate({routeName: 'QRScannerLanding', params: {userApiKey}}));
    }

  };
}

export function getInvoiceDetail (qrData) {
  return (dispatch, getState) => {
    const state = getState();
    const url = result(qrData, 'data', '');
    const userApiKey = result(state, 'userApiKey', '');
    const amount = result(qrData, 'amount', 0);
    const invoiceId = last(split(url, '/'));
    dispatch(actionCreators.showSpinner());
    dispatch(NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({routeName: 'PayScreen'}),
        NavigationActions.navigate({routeName: 'QRInvoiceDetail', params: {invoiceId}})
      ]
    }));
    const payload = middlewareUtils.prepareInvoiceQRPayload({userApiKey, invoiceId, amount});
    return api.invoiceQR(payload, dispatch).then((res) => {
      if (result(res, 'data.result', 'failed').toLowerCase() === 'success') {
        dispatch(actionCreators.saveQRInvoice(res.data));
        dispatch(actionCreators.hideSpinner());
      } else {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'PayScreen'})
          ]
        }));
        Toast.show(getErrorMessage(res, language.ERROR_MESSAGE__COULD_NOT_GET_INVOICE), Toast.LONG);
      }
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'PayScreen'})
        ]
      }));
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_GET_INVOICE), Toast.LONG);
    });
  };
}

export function getQrStatus (payload) {
  return (dispatch) =>
    api.getQrStatus(payload, dispatch).then((res) => res).catch(() => {
      // Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__ERROR_GETTING_USER_API_KEY), Toast.LONG);
    });
}

export function saveQrData (data = {}) {
  return (dispatch) => {
    dispatch(actionCreators.saveQrGpnData({dataQrGpn: data}));
  };
}

export function qrInvoicePayment (request) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const transRefNum = result(state, 'transRefNum', '');
    let invoiceDetail = result(state, 'QRInvoice', '');
    const selectedCoupon = result(request, 'selectedCoupon', 0);
    invoiceDetail.content.couponList = invoiceDetail.content.couponList.slice(0, selectedCoupon);
    const tipAmount = result(invoiceDetail, 'content.tipEnabled', false) &&
                      result(request, 'tipAmount.value', 0) === 'manual' ?
      result(request, 'tipAmountManual', 0) :
      result(request, 'tipAmount.value', 0);
    const easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    const smsOtp = result(state, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(state, 'form.AuthenticateForm.values.simasToken', '');
    const selectedAccount = result(request, 'accountNo', {});
    const billerName = result(invoiceDetail, 'content.receiver', '');
    const invoiceId = result(invoiceDetail, 'content.invoiceId', '');
    const totalAmount = result(request, 'totalAmount', 0);
    const discount = result(request, 'discount', 0);
    const totalCouponAmount = result(request, 'totalCouponAmount', 0);
    const payload = middlewareUtils.prepareQRPaymentInvoicePayload({invoiceDetail,
      tipAmount, selectedAccount, easyPin, smsOtp, simasToken, transRefNum, totalCouponAmount, discount, totalAmount});
    const modalOptions = {transactionType: language.PAY_BY_QR__TITLE, transactionId: transRefNum, subheading: `${billerName}`, heading: `${invoiceId}`, accountFrom: selectedAccount};
    dispatch(actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}));
    return api.qrPayment(payload, dispatch).then((res) => {
      if (result(res, 'data.responseCode', '') === '00') {
        const userApiKey = result(state, 'userApiKey', '');
        const payloadQrStatus = middlewareUtils.prepareGetQrStatus({userApiKey, invoiceId});
        if (result(invoiceDetail, 'content.currentLoyaltyProgram.loyaltyProgram.loyaltyProgramType', '') === 'POINTS') {
          dispatch(getQrStatus(payloadQrStatus)).then((resStatus) => {
            dispatch(resetToDashboardFrom('PayScreen'));
            dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
            if (result(resStatus, 'data.result', '') === 'success') {
              dispatch(actionCreators.showPaymentModal({
                ...modalOptions,
                type: 'SUCCESS',
                amount: `Rp ${currencyFormatter(totalAmount)}`,
                qrStatus: result(resStatus, 'data.content.fidelitizInfo', {})
              }));
            } else {
              dispatch(actionCreators.showPaymentModal({
                ...modalOptions,
                type: 'SUCCESS',
                amount: `Rp ${currencyFormatter(totalAmount)}`,
                qrStatus: {response: 'error'}
              }));
            }
            dispatch(actionCreators.clearTransRefNum());
            dispatch(actionCreators.clearQRInvoice());
            dispatch(destroy('QRInputAmount'));
            dispatch(destroy('QRInvoiceDetail'));
            dispatch(destroy('QRConfirmation'));
          }).catch(() => {
            dispatch(resetToDashboardFrom('PayScreen'));
            dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
            dispatch(actionCreators.clearTransRefNum());
            dispatch(actionCreators.clearQRInvoice());
            dispatch(destroy('QRInputAmount'));
            dispatch(destroy('QRInvoiceDetail'));
            dispatch(destroy('QRConfirmation'));
          });
        } else {
          dispatch(resetToDashboardFrom('PayScreen'));
          dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
          dispatch(actionCreators.showPaymentModal({
            ...modalOptions,
            type: 'SUCCESS',
            amount: `Rp ${currencyFormatter(totalAmount)}`
          }));
        }
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.clearTransRefNum());
        dispatch(actionCreators.clearQRInvoice());
        dispatch(destroy('QRInputAmount'));
        dispatch(destroy('QRInvoiceDetail'));
        dispatch(destroy('QRConfirmation'));
      } else {
        dispatch(resetToDashboardFrom('PayScreen'));
        dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
        dispatch(actionCreators.showPaymentModal({...modalOptions, type: 'FAILED'}));
        if (isEmpty(result(res, 'data.responseMessage', ''))) {
          const goToHistory = () => {
            dispatch(NavigationActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'Landing'}),
                NavigationActions.navigate({routeName: 'TransactionsFilter', params: {accountInfo: selectedAccount}})
              ]
            }));
            dispatch(actionCreators.hideSinarmasAlert());
          };
          const sinarmasModalOptions = {
            heading1: language.COMMON__TIMEOUT_TITLE1,
            heading2: language.COMMON__TIMEOUT_TITLE2,
            text: language.COMMON__TIMEOUT_MESSAGE,
            button1: language.COMMON__TIMEOUT_BUTTON,
            onButton1Press: goToHistory,
            closeOnTouchOutside: false
          };
          dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
        } else {
          Toast.show(getErrorMessage(res, language.ERROR_MESSAGE__COULD_NOT_PAY_BY_QR_CODE), Toast.LONG);
        }
      }

    }).
      catch((err) => {
        dispatch(resetToDashboardFrom('PayScreen'));
        dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.clearTransRefNum());
        dispatch(actionCreators.clearQRInvoice());
        dispatch(destroy('QRInputAmount'));
        dispatch(destroy('QRInvoiceDetail'));
        dispatch(destroy('QRConfirmation'));
        dispatch(actionCreators.showPaymentModal({...modalOptions, type: 'FAILED'}));
        if (isEmpty(result(err, 'data.responseMessage', ''))) {
          const goToHistory = () => {
            dispatch(NavigationActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'Landing'}),
                NavigationActions.navigate({routeName: 'TransactionsFilter', params: {accountInfo: selectedAccount}}),
              ]
            }));
            dispatch(actionCreators.hideSinarmasAlert());
          };
          const sinarmasModalOptions = {
            heading1: language.COMMON__TIMEOUT_TITLE1,
            heading2: language.COMMON__TIMEOUT_TITLE2,
            text: language.COMMON__TIMEOUT_MESSAGE,
            button1: language.COMMON__TIMEOUT_BUTTON,
            onButton1Press: goToHistory,
            closeOnTouchOutside: false
          };
          dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
        } else {
          const resultDisplay = result(err, 'data.result.displayList', []);
          const errorText = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BY_QR_CODE);
          dispatch(errorResponseResult(err, modalOptions, resultDisplay, errorText, selectedAccount));
        }
      });
  };
}

export function WithdrawalForm (res) {
  return (dispatch) => {
    let jsonData = parseTLV(result(res, 'data', ''));
    jsonData = JSON.parse(jsonData);
    dispatch(NavigationActions.navigate({routeName: 'WithdrawalForm', jsonData: jsonData}));
  };
}


export function invoiceGPN (res, isGalery) {
  return (dispatch, getState) => {
    dispatch(destroy('QRInvoiceForm'));
    const state = getState();
    const dataQR = parseTLV(result(res, 'data', ''));
    let jsonData = dataQR;
    jsonData = JSON.parse(jsonData);
    const isCrossBorder = result(jsonData, '53', '') !== '360';
    const validTag = validateTags(jsonData);
    const bankList = result(state, 'valueBankList.bankList', '');
    const validCRC = isValidCrc(res, isGalery);
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const isLogin = !isEmpty(result(state, 'user', {}));
    if (!isLogin) {
      dispatch(getDefaultAccount());
    }
    const notEmpty51and26 = !isEmpty(result(jsonData, '26', {})) || !isEmpty(result(jsonData, '51', {}));
    if (isCrossBorder) {
      const is63Valid = result(validCRC, 'is63Valid', false);
      const isValidCrc = result(validCRC, 'isValidCrc', false);
      if (is63Valid && isValidCrc) {
        dispatch(saveQrData(jsonData));
        dispatch(NavigationActions.navigate({routeName: 'QRInvoice', params: {data: jsonData, bankList, qrData: result(res, 'data', {}), isCrossBorder}}));
      } else {
        dispatch(actionCreators.hideSpinner());
        const modalOptions = {
          button1: 'OK',
          onButton1Press: hideAlert,
          closeOnTouchOutside: true,
          onClose: hideAlert,
          heading1: language.QR_GPN_NOT_REGISTERED_QR
        };
        dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
      } 
    } else {
      if (((result(validCRC, 'is63Valid', false) &&  result(validCRC, 'isValidCrc', false)) && (!isEmpty(jsonData)) && (validTag < 0)) && notEmpty51and26) {
        dispatch(saveQrData(jsonData));
        dispatch(NavigationActions.navigate({routeName: 'QRInvoice', params: {data: jsonData, bankList, qrData: result(res, 'data', {})}}));
      } else {
        dispatch(actionCreators.hideSpinner());
        const modalOptions = {
          button1: 'OK',
          onButton1Press: hideAlert,
          closeOnTouchOutside: true,
          onClose: hideAlert,
          heading1: language.QR_GPN_NOT_REGISTERED_QR
        };
        dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
      }
    }
  };
}

export function invoiceTcico (res) {
  return (dispatch, getState) => {
    dispatch(destroy('QRInvoiceForm'));
    const {user} = getState();
    const isLogin = !isEmpty(user);
    let jsonData = parseTLVTcico(result(res, 'data', ''));
    jsonData = JSON.parse(jsonData);
    const getBankCode = result(jsonData, '40.01', '');
    const bankCode = getBankCode.substring(5, 8);
    const tag08 = result(jsonData, '62.08', '');
    const isTransferOnUs = tag08 === 'BOOK';
    const isTransferOffUs = tag08 === 'DMCT';
    const checErrorOffUs = bankCode !== '153' && isTransferOnUs;
    const isCashWdl = tag08 === 'CWDL';
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };

    if ((isTransferOffUs || isTransferOnUs) && !checErrorOffUs)  {
      const isErr = checkErrorTransferQr(jsonData, res);
      if (isErr) {
        dispatch(actionCreators.hideSpinner());
        const modalOptions = {
          button1: 'OK',
          onButton1Press: hideAlert,
          closeOnTouchOutside: true,
          onClose: hideAlert,
          heading1: language.QR_GPN_NOT_REGISTERED_QR
        };
        dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
      } else {
        if (isLogin) {
          dispatch(NavigationActions.navigate({routeName: 'QRInvoiceTcico', params: {data: jsonData, qrData: result(res, 'data', {})}}));
        } else {
          dispatch(actionCreators.showSinarmasAlert({
            button1: 'OK',
            onButton1Press: hideAlert,
            closeOnTouchOutside: true,
            onClose: hideAlert,
            heading1: language.QR_TRANSFER_TITLE,
            text: language.QR_TCICO_BL_EXPLANATION}));
        }
      }
    } else if (isCashWdl) {
      if (isLogin) {
        dispatch(NavigationActions.navigate({routeName: 'QRInvoiceTcicoCashout', params: {data: jsonData, qrData: result(res, 'data', {})}}));
      } else {
        dispatch(actionCreators.showSinarmasAlert({
          button1: 'OK',
          onButton1Press: hideAlert,
          closeOnTouchOutside: true,
          onClose: hideAlert,
          heading1: language.QR_CASHOUT_TITLE,
          text: language.QR_TCICO_BL_EXPLANATION}));
      }
    } else {
      dispatch(actionCreators.hideSpinner());
      const modalOptions = {
        button1: 'OK',
        onButton1Press: hideAlert,
        closeOnTouchOutside: true,
        onClose: hideAlert,
        heading1: language.QR_GPN_NOT_REGISTERED_QR
      };
      dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
    }
  };
}

export function getGenerateCode () {
  return (dispatch, getState) => {
    const state = getState();
    const account = getTransferPossibleAccountsNoEmoney(result(state, 'accounts', []), 'ft');
    const slectedAcc = groupBy(account, {accountType: 'SavingAccount'});
    const accountId = result(slectedAcc, 'true.0.id', '');
    const merchantId = 456;
    const payload = {accountId, merchantId};
    return api.getCodeQRCPM(payload, dispatch).then((res) => {
      const dataCode = result(res, 'data');
      dispatch(actionCreators.saveQRTag63(dataCode));
    }).catch((err) => {
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__ERROR_GETTING_USER_API_KEY), Toast.LONG);
    });
  };
}

export function goToShowQR (dataQR) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const account = getTransferPossibleAccountsNoEmoney(result(state, 'accounts', []), 'ft');
    const accountId = isEmpty(dataQR) ? result(account, '0.id', '') : dataQR.accId;
    const merchantId = 456;
    const sessionId = result(state, 'additionalApiPayload.sessionCode', {});
    const serverToken = result(state, 'appInitKeys.tokenServer', {});
    const isNewRequest = 'YES';
    const payload = {accountId, merchantId, sessionId, serverToken, isNewRequest};
    return api.getCodeQRCPM(payload, dispatch).then((codeRes) => {
      const dataCode = result(codeRes, 'data.code');
      const name = isEmpty(dataQR) ? result(codeRes, 'data.fullName', '') : dataQR.name;
      const fixName = name.length > 26 ? name.substring(0, 26) : name;
      const toHexName = Buffer.from(fixName, 'utf8');
      const hexName = toHexName.toString('hex');
      const dataCpan = result(codeRes, 'data.customer_pan', '').length % 2 !== 0 ? result(codeRes, 'data.customer_pan', '') + 'F' : result(codeRes, 'data.customer_pan', '');
      const rawCpan = result(codeRes, 'data.customer_pan', '');
      const tag9F25 = rawCpan.substring(rawCpan.length - 4, rawCpan.length);
      const tag63utf = Buffer.from(dataCode, 'utf8');
      const tag63hex = tag63utf.toString('hex');
      const additionaldata = 'Q002';
      const emailuser = result(state, 'user.profile.email', '');
      const email = !isEmpty(result(state, 'insuranceDataTravel', {})) ? result(state, 'insuranceDataTravel.email', '') : emailuser;
      const fixEmail = isEmpty(email) || email === null ? 'noemail@noemail.com' : email;
      const transformEmail = 'mailto:' + fixEmail;
      const emailutf = Buffer.from(transformEmail, 'utf8');
      const emailhex = emailutf.toString('hex');
      const appVer = removeDot(VersionNumber.appVersion);
      const subAppVer = appVer.substring(appVer.length - 2, appVer.length);
      const appVerutf = Buffer.from(subAppVer, 'utf8');
      const appVerhex = appVerutf.toString('hex');
      const toHexAddData = Buffer.from(additionaldata, 'utf8');
      const tag9F76 = toHexAddData.toString('hex');
      const dataTag = {
        '85': '4350563031',
        '61': {
          '4F': 'a0000006022020',
          '50': '5152495343504d',
          '5A': dataCpan,
          '5F20': hexName,
          '5F2D': '6964656E',
          '9F25': tag9F25,
          '9F08': appVerhex,
          '5F50': emailhex,
          '9F76': tag9F76,
          '63': {
            '9F74': tag63hex
          }
        },
      };
      const normalizeTag = toTLVs(dataTag);
      const cutString = normalizeTag.substring(0, normalizeTag.length - 14);
      const tagHex = '85054350563031' + cutString;
      const data = Buffer.from(tagHex, 'hex').toString('base64');
      const isNewQR = result(dataQR, 'isNewQR', false);
      const addGeneartedTotal = result(dataQR, 'addGeneartedTotal', 0);
      const isGenerated = true;
      const timeGenerated = new Date();
      dispatch(actionCreators.hideSpinner());
      dispatch(actionCreators.saveQRTag63({data, dataQR, isNewQR, isGenerated, addGeneartedTotal, timeGenerated}));
      dispatch(NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({routeName: 'QRScannerLanding'}),
          NavigationActions.navigate({routeName: 'MyQRScreen'})
        ]
      }));
    }).catch((err) => {
      const easyPinAttempt = result(err, 'data.easypinAttempt', '');
      if (easyPinAttempt === 'invalid') {
        dispatch(actionCreators.hideSpinner());
        dispatch(reset('AuthenticateForm'));
        Toast.show(language.ERROR_MESSAGE_INVALID_EASYPIN_TRANSACTION);
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
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__ERROR_GETTING_USER_API_KEY), Toast.LONG);
      }
    });
  };
}

export function goToShowQRTcico (savedQRData, newQRData, isFromMenu, depositType = '', isNewGenerated) {
  return (dispatch, getState) => {
    const data = result(savedQRData, 'data', '');
    let jsonData = parseTLVTcico(data);
    jsonData = JSON.parse(jsonData);
    const qrType = result(jsonData, '62.08', '');
    if (isNewGenerated || isEmpty(savedQRData) || qrType !== depositType) {
      const state = getState();
      const accountList = getTransferPossibleAccountsNoEmoney(result(state, 'accounts', []), 'ft');
      let name = isFromMenu ? result(newQRData, 'accountNo.name', '') : newQRData.name;
      let nameQr;
      if (name.length > 25) {
        nameQr = name.substring(0, 15);
      } else {
        nameQr = name;
      }
      const accountId = isFromMenu ? result(newQRData, 'accountNo.id', '') : newQRData.accId;
      const merchantId = 456;
      const getAmount = isFromMenu ? result(newQRData, 'amount', '') : result(newQRData, 'amount', '');
      const amount = isEmpty(getAmount) ? '' : getAmount;
      const transferMethod = isFromMenu ? result(newQRData, 'transferMethod.type', '') : result(newQRData, 'transferMethod', '');
      const getCodeMethod =  depositType === 'CDPT' ? 'CDPT' : isEmpty(transferMethod) ? 'BOOK' : generateMethodTransfer(transferMethod);
      const accountNumber = isFromMenu ? result(newQRData, 'accountNo.accountNumber', '') : newQRData.accountNumber;
      const foundPayee = find(accountList, {accountNumber});
      const isSyariah = checkShariaAccount(foundPayee);
      const account = isSyariah ? 1 : 0;
      const type = depositType === 'CDPT' ? 'CDPT' : getCodeMethod === 'BOOK' || getCodeMethod === 'DMCT' ? 'BOOK' : getCodeMethod;
      const payload = {
        accountId: accountId.toString(),
        merchantId: merchantId.toString(),
        type: type,
        account: account.toString(),
        amount: amount
      };
      dispatch(actionCreators.showSpinner());
      return api.generateCodeQrTcico(payload, dispatch).then((codeRes) => {
        const dataCode = result(codeRes, 'data');
        const dataCpan = result(dataCode, 'beneficiaryPanMap.customer_pan', '');
        const bPanNumber = dataCpan.substring(0, dataCpan.length - 1);
        const uniqCode = result(dataCode, 'referenceLabelMap.referenceLabel', '');
        const postalCode = result(dataCode, 'postalCode', '');
        const beneficiaryCity = result(dataCode, 'beneficiaryCity', '');
        const city = beneficiaryCity === '' || isEmpty(beneficiaryCity) ? 'Jakarta' : beneficiaryCity;
        let cityQr;
        if (city.length > 15) {
          cityQr = city.substring(0, 15);
        } else {
          cityQr = city;
        }
        const tag40 = {
          '40': {
            '00': 'COM.BANKSINARMAS.WWW',
            '01': bPanNumber,
            '02': accountNumber
          }
        };
        const tlv40 = result(tag40, '40', {});
        const tag62 = isEmpty(uniqCode) ? {
          '62': {
            '08': getCodeMethod,
          }
        } : {
          '62': {
            '08': getCodeMethod,
            '99': {
              '00': '00',
              '01': uniqCode
            }
          }
        };
        const tlv62 = result(tag62, '62', {});
        // const toTlv62 = toTLVsCico(tlv62);
        const QRTLV = isEmpty(amount) ? {
          '00': '01',
          '01': '12',
          '40': tlv40,
          '52': '4829',
          '53': '360',
          '58': 'ID',
          '59': nameQr,
          '60': cityQr,
          '61': postalCode,
          '62': tlv62,
        } : {
          '00': '01',
          '01': '12',
          '40': tlv40,
          '52': '4829',
          '53': '360',
          '54': amount,
          '58': 'ID',
          '59': nameQr,
          '60': cityQr,
          '61': postalCode,
          '62': tlv62,
        };
        const qrTlvFull = toTLVsCicoFix(QRTLV);
        const cutstring = qrTlvFull.substring(0, qrTlvFull.length - 12);
        const normalizeTag = '000201010212' + cutstring;
        const searchIndex99 = normalizeTag.indexOf('6259');
        const newCutString = normalizeTag.substring(0, searchIndex99 + 4);
        const cutString62 = normalizeTag.substring(searchIndex99 + 4, normalizeTag.length);
        const cutString99 = cutString62.substring(0, cutString62.length - 8);
        const getString08 = cutString62.substring(cutString62.length, cutString62.length - 8);
        const new99 = getString08 + cutString99;
        const finalString = newCutString + new99;
        const hasil = makeTlv(finalString);
        const data = hasil;
        const isGenerated = true;
        let jsonData = parseTLVTcico(data);
        jsonData = JSON.parse(jsonData);
        const cpan = result(jsonData, '40.01', '');
        const cpanLuhn = generateLuhn(cpan);
        jsonData = {...jsonData, 'cpan_luhn': cpanLuhn};
        const isNewQR = result(newQRData, 'isNewQR', false);
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.saveQRTcico({data, newQRData, isGenerated}));
        dispatch(destroy('MyQRForm'));
        // if (isNewQR === true) {
        //   dispatch(NavigationActions.back());
        //   dispatch(NavigationActions.reset({
        //     index: 1,
        //     actions: [
        //       NavigationActions.navigate({routeName: 'AccountMenu'}),
        //       NavigationActions.navigate({routeName: 'QrTcico', params: {data, newQRData}})
        //     ]
        //   }));
        if (isFromMenu && !isNewQR) {
          dispatch(NavigationActions.navigate({routeName: 'QrTcico', params: {data, newQRData}}));
        }

      }).catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__ERROR_GETTING_USER_API_KEY), Toast.LONG);
      });
    } else {
      dispatch(NavigationActions.navigate({routeName: 'QrTcico'}));
    }
    // }
  };
}
