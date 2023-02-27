import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import {result, find, isEmpty, replace, toUpper, omit} from 'lodash';
import * as middlewareUtils from '../../utils/middleware.util';
import {getErrorMessage, getTransactionType, upperCase} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import {Toast} from '../../utils/RNHelpers.util.js';
import {destroy, change, reset} from 'redux-form';
import {language} from '../../config/language';
import moment from 'moment';
import {populateConfigData, getTargetAccount, getTargetAccountRemittance, triggerAuthNavigate, getTransRefNumAndOTPNavigate} from './common.thunks';
import {logout} from './onboarding.thunks.js';
import {randomString, OBM_EncryptPassword, OBM_GetEncodingParameter, OBM_GetEncryptedPassword} from '../../utils/vendor/pinEncryption.util';
import {login} from './onboarding.thunks';

// TRANSFER JOURNEY THUNKS
export function getPayeeName () {
  return (dispatch, getState) => {
    const {bank = {}, payeeAccNo = '', payeeType = {}} = result(getState(), 'form.addPayee.values', {});
    const bankId = result(bank, 'id', '') === '' ? result(bank, 'bankId', '') : result(bank, 'id', '');
    const accNo = (payeeType.value !== 'emoney' ||  payeeAccNo.substring(0, 4) === '3808') ? payeeAccNo : result(bank, 'companyCode', '08') === '08' ? result(bank, 'prefixEmoney', '38') + payeeAccNo : result(bank, 'prefixEmoney', '38') + result(bank, 'companyCode', '08') + payeeAccNo;
    const isLogin = !isEmpty(result(getState(), 'user', {}));
    const transferMethodType = isLogin ? '' : '1';
    let additional = [];
    if (isLogin) {
      additional = ['ipassport', 'TXID', 'lang'];
    } else {
      additional = ['TXID', 'lang', 'tokenClient', 'tokenServer', 'transferMethodType'];
    }
    if (!isEmpty(bank) && payeeAccNo !== '') {
      dispatch(change('addPayee', 'payeeName', ''));
      if (accNo.length > 0 && (bank.isSinarmas || bank.networkEnabled === 'yes' || payeeType.value === 'emoney')) {
        const payload = middlewareUtils.prepareGetPayeeName({
          bankId,
          accountNumber: accNo,
          transferMethodType
        });
        dispatch(actionCreators.showSpinner());
        return api.getPayeeName(payload, additional, dispatch).then((payeeDetails) => {
          const uniqueCode = result(payeeDetails, 'data.uniqueCode', '');
          const payeeStatus = result(payeeDetails, 'data', {});
          dispatch(actionCreators.saveUniqeCode(uniqueCode));
          dispatch(actionCreators.savePayee(payeeStatus));
          dispatch(actionCreators.hideSpinner());
          dispatch(change('addPayee', 'originalName', payeeDetails.data.targetName));
          dispatch(change('addPayee', 'payeeName', payeeDetails.data.targetName));
          dispatch(change('addPayee', 'payeeNameDisabled', false));
        }).catch((err) => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__ERROR_GETTING_PAYEE_NAME), Toast.LONG);
        });
      }
    }
  };
}

export function getEmoneyPayeeName (payeeAccNo) {
  return (dispatch, getState) => {
    const state = getState();
    const bankList = result(state, 'configEmoney.emoneyConfig.listTransferConfig', []);
    const bank = find(bankList, (bank) => bank.companyCode === '08');
    const accNo = (payeeAccNo.substring(0, 4) === '3808') ? payeeAccNo : '38' + payeeAccNo;
    const isLogin = !isEmpty(result(getState(), 'user', {}));
    const transferMethodType = isLogin ? '' : '1';
    let additional = [];
    if (isLogin) {
      additional = ['ipassport', 'TXID', 'lang'];
    } else {
      additional = ['TXID', 'lang', 'tokenClient', 'tokenServer', 'transferMethodType'];
    }
    if (!isEmpty(bank) && payeeAccNo !== '') {
      dispatch(change('addPayee', 'payeeName', ''));
      if (accNo.length > 0) {
        const payload = middlewareUtils.prepareGetPayeeName({
          bankId: result(bank, 'bankId', 90),
          accountNumber: accNo,
          transferMethodType
        });
        dispatch(actionCreators.showSpinner());
        return api.getPayeeName(payload, additional, dispatch).then((payeeDetails) => {
          dispatch(actionCreators.hideSpinner());
          dispatch(NavigationActions.navigate({routeName: 'AddPayee', params: {payeeAccNo, emoneyPayeeData: {...payeeDetails.data, bank}}}));
        }).catch((err) => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__ERROR_GETTING_PAYEE_NAME), Toast.LONG);
        });
      }
    }
  };
}

export function addNewPayee (payee, easyPin, otp, simasToken, transRefNum, resData, transType) {
  return ((dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const transferMethodType = isLogin ? '' : '1';
    if (!payee.id) {
      return api.addNewPayee(middlewareUtils.prepareAddNewPayee(payee, easyPin, otp, simasToken, transRefNum, resData, transType, transferMethodType), dispatch).
        then((res) => {
          const newPayee = res.data;
          dispatch(actionCreators.addPayee(newPayee.payee));
          return newPayee.payee;
        }).catch((err) => {
          throw {...err,
            AddPayeeFailed: true
          };
        });
    }
    return Promise.resolve(payee);
  });
}

export function confirmTransfer (formValues, payee, transType, getCurrency, currencyRate, newformValues, isValas = false, isKyc) {
  return (dispatch, getState) => {
    const currencyDeterminant = result(currencyRate, 'currencyDeterminant', '');
    const currencyTarget = result(currencyRate, 'currency', '');
    const currencySource = result(currencyRate, 'currencySource', '');
    const currencyObject = result(currencyRate, 'currencyObject[0]', {});
    const currencyObjectAdditional = result(currencyRate, 'currencyObjectAdditional[0]', {});
    const sellRateSpread = result(currencyObject, 'spreadSellRate', 0);
    const sellRateSpreadAdditional = result(currencyObjectAdditional, 'spreadSellRate', 0);
    const transferTime = result(formValues, 'transferTime', '') === '' ? '' : moment(formValues.transferTime).format('DD MMM YYYY');
    const recurring = result(formValues, 'schedule', '') === '4' ? moment(formValues.transferTime).format('DD') : '';
    const time = {transferTime, recurring};
    const isLogin = !isEmpty(result(getState(), 'user', {}));
    const transferMethodType = isLogin ? '' : '1';
    const confirmTransferPayload = middlewareUtils.prepareConfirmTransferPayload(formValues, payee, transType, time, transferMethodType, isValas);
    const isNewAccount = result(payee, 'id', '') === '' || result(payee, 'id', '') === null;
    const tokenConfig = result(getState(), 'config.tokenConfig', []);
    const isOwnAccount = false;
    let amountValastoIDR = result(formValues, 'amount');
    if (currencyDeterminant === currencyTarget) {
      if (currencyTarget === 'IDR') {
        amountValastoIDR = result(formValues, 'amount');
      } else if (currencyTarget === 'USD') {
        if (sellRateSpread === null || sellRateSpread === 0) {
          amountValastoIDR = result(formValues, 'amount') * sellRateSpreadAdditional;
        } else {
          amountValastoIDR = result(formValues, 'amount') * sellRateSpread;
        }
      } else if (currencyTarget !== 'USD' && currencyTarget !== 'IDR') {
        if (sellRateSpread === null || sellRateSpread === 0) {
          amountValastoIDR = result(formValues, 'amount') * sellRateSpreadAdditional;
        } else { 
          amountValastoIDR = result(formValues, 'amount') * sellRateSpread;
        }
      }
    } else if (currencyDeterminant === currencySource) {
      if (currencySource === 'IDR') {
        amountValastoIDR = result(formValues, 'amount');
      } else if (currencySource === 'USD') {
        if (sellRateSpread === null || sellRateSpread === 0) {
          amountValastoIDR = result(formValues, 'amount') * sellRateSpreadAdditional;
        } else {
          amountValastoIDR = result(formValues, 'amount') * sellRateSpread;
        }
      } else if (currencySource !== 'USD' && currencySource !== 'IDR') {
        if (sellRateSpread === null || sellRateSpread === 0) {
          amountValastoIDR = result(formValues, 'amount') * sellRateSpreadAdditional;
        } else {
          amountValastoIDR = result(formValues, 'amount') * sellRateSpread;
        }
      }
    }
    const amount = isValas ? amountValastoIDR : result(formValues, 'amount');
    const shouldSendSmsOtp = getTransactionType(amount, tokenConfig, isOwnAccount) === '0';
    let additional = [];
    if (isLogin) {
      additional = ['ipassport', 'TXID', 'lang'];
    } else {
      additional = ['TXID', 'lang', 'tokenClient', 'tokenServer', 'uniqueCode'];
    }
    if (shouldSendSmsOtp === false && isNewAccount === false) {
      if (!isLogin) {
        dispatch(silentLoginBillpay());
      }
    }
    dispatch(actionCreators.clearBillerDescFav());
    dispatch(actionCreators.showSpinner());
    return api.confirmTransfer(confirmTransferPayload, additional, dispatch).
      then((res) => {
        const uniqueCode = result(res, 'data.uniqueCode', '');
        dispatch(actionCreators.saveUniqeCode(uniqueCode));
        const resData = result(res, 'data', {});
        if (transType === 'creditCard') {
          if (!isLogin) {
            dispatch(NavigationActions.reset({
              index: 2,
              actions: [
                NavigationActions.navigate({
                  routeName: 'Landing'
                }),
                NavigationActions.navigate({
                  routeName: 'CreditCard'
                }),
                NavigationActions.navigate({
                  routeName: 'CreditCardConfirmation',
                  params: {
                    formValues,
                    payee,
                    resData,
                    shouldSendSmsOtp
                  }
                })
              ]
            }));
            dispatch(destroy('CreditCardPayment'));
            dispatch(destroy('creditcard'));
          } else {
            dispatch(NavigationActions.navigate({routeName: 'CreditCardConfirmation', params: {
              formValues,
              payee,
              resData,
              shouldSendSmsOtp
            }}));
            dispatch(destroy('creditcard'));
          }
        } else if (transType === 'cardlessWithdrawal') {
          dispatch(NavigationActions.reset({
            index: 2,
            actions: [
              NavigationActions.navigate({
                routeName: 'TransferScreen'
              }),
              NavigationActions.navigate({
                routeName: 'CardLessWithdrawalIndex'
              }),
              NavigationActions.navigate({
                routeName: 'CardLessWithdrawalConfirmation',
                params: {
                  formValues,
                  payee,
                  resData,
                  shouldSendSmsOtp
                }
              })
            ]
          }));
          dispatch(destroy('CardLessWithdrawalPayment'));
          dispatch(destroy('CardLessWithdrawalAccount'));
        } else if (isValas) {
          dispatch(NavigationActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({
                routeName: 'TransferScreen'
              }),
              NavigationActions.navigate({
                routeName: 'FundTransferValasConfirmation',
                params: {
                  formValues,
                  payee,
                  resData,
                  getCurrency,
                  currencyRate,
                  newformValues,
                  isValas,
                  shouldSendSmsOtp
                }
              })
            ]
          }));
          dispatch(destroy('fundTransfer'));
          dispatch(destroy('addPayee'));
        } else {
          dispatch(NavigationActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({
                routeName: 'TransferScreen'
              }),
              NavigationActions.navigate({
                routeName: 'FundTransferConfirmation',
                params: {
                  formValues,
                  payee,
                  resData,
                  shouldSendSmsOtp,
                  isKyc
                }
              })
            ]
          }));
          dispatch(destroy('fundTransfer'));
          dispatch(destroy('addPayee'));
        }
        dispatch(actionCreators.hideSpinner());
      }).catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL), Toast.LONG);
      });
  };
}

export function deleteSelectedPayee (payee, cifCode, loginName) {
  return (dispatch, getState) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const transferMethodType = isLogin ? '' : '1';
    const goDelete = () => {
      const targetAccontNumber = result(payee, 'accountNumber', '');
      const targetType = result(payee, 'targetType.code', '');
      const payload = {cifCode, targetAccontNumber, targetType, loginName, transferMethodType};
      dispatch(actionCreators.hideSinarmasAlert());
      return api.deleteFromPayeeList(payload, dispatch).
        then(() => {
          dispatch(getTargetAccount()).then(() => {
            Toast.show(language.TRANSFER__DELETE_PAYEE_SUCCESS);
          });
        }).
        catch((err) => {
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_DELETE_PAYEE), Toast.LONG);
        });
    };
    const sinarmasModalOptions = {
      heading1: language.TRANSFER__DELETE_PAYEE_MODAL_TITLE,
      text: language.TRANSFER__DELETE_PAYEE_MODAL_TEXT,
      button1: language.FAVORITE__CANCEL_BUTTON,
      onButton1Press: hideAlert,
      button2: language.ONBOARDING__OKAY,
      onButton2Press: goDelete,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function setupFundTransfer (payee) {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    return (dispatch(populateConfigData())).
      then(() => {
        dispatch(actionCreators.hideSpinner());

        dispatch(NavigationActions.navigate({
          routeName: 'FundTransferPayment',
          params: {
            payee, isKyc: true
          }
        }));
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        const errorMessage = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_SETUP_TRANSFER);
        Toast.show(errorMessage, Toast.LONG);
      });
  };
}

export function setupCardlessWithdrawal (payee) {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    return (dispatch(populateConfigData())).
      then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate({
          routeName: 'CardLessWithdrawalPayment',
          params: {
            payee
          }
        }));
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        const errorMessage = getErrorMessage(err, language.CARDLESSWITHDRAWAL__COULD_NOT_SETUP);
        Toast.show(errorMessage, Toast.LONG);
      });
  };
}

export function inquiryRecurringTransfer () {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const cif = result(state, 'user.profile.customer.cifCode', '');
    const payload = {cif: cif};
    return api.getRecurringTransferHistory(payload, dispatch).
      then((res) => {
        dispatch(actionCreators.hideSpinner());
        const data = result(res, 'data.data.dataSFT', []);
        dispatch(actionCreators.updateRecurringData(data));
        dispatch(NavigationActions.navigate({routeName: 'RecurringDetailList'}));
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        const errorMessage = getErrorMessage(err, language.RECURRING__TIME_OUT_OR_NO_DATA);
        Toast.show(errorMessage, Toast.LONG);
      });
  };
}

export function editRecurringTransfer (data) {
  return (dispatch, getState) => {
    const state = getState();
    const transRefNum = result(state, 'transRefNum', '');
    const accessFrom = 'v3';
    const mPinInputed = result(state, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(state, 'form.AuthenticateForm.values.simasToken', '');
    const amount = parseInt(result(state, 'form.RecurringEditForm.values.amountRecurring', ''));
    dispatch(actionCreators.showSpinner());
    const payload = {accessFrom, mPinInputed, simasToken, transRefNum, data: {...data, amount: amount}};
    return api.posteditingRecurringTransferHistory(payload, dispatch).
      then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate({routeName: 'AccountMenu'}));
        dispatch(destroy('AuthTransferRecurring'));
        dispatch(destroy('RecurringEditing'));
        dispatch(destroy('RecurringDetailList'));
        Toast.show(language.RECURRING__SUCCESS_MESSAGE, Toast.LONG);
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
          const errorMessage = getErrorMessage(err, language.RECURRING__TIME_OUT_OR_NO_DATA);
          Toast.show(errorMessage, Toast.LONG);
        }
      });
  };
}

export function deleteRecurringTransfer (data) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const transRefNum = result(state, 'transRefNum', '');
    const accessFrom = 'v3';
    const mPinInputed = result(state, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(state, 'form.AuthenticateForm.values.simasToken', '');
    const refNum = result(data, 'transactionReferenceNumber', '');
    const payload = {transactionReferenceNumber: refNum, accessFrom, mPinInputed, simasToken, transRefNum, data: {...data}};
    return api.deleteRecurringTransferHistory(payload, dispatch).
      then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'AccountMenu'})
          ]
        }));
        dispatch(destroy('AuthTransferRecurring'));
        dispatch(destroy('RecurringEditing'));
        dispatch(destroy('RecurringDetailList'));
        Toast.show(language.RECURRING__SUCCESS_MESSAGE, Toast.LONG);
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
          const errorMessage = getErrorMessage(err, language.RECURRING__TIME_OUT_OR_NO_DATA);
          Toast.show(errorMessage, Toast.LONG);
        }
      });
  };
}

export function getPayeeNameFavorite (bank) {
  return (dispatch, getState) => {
    const payeeType = result(getState(), 'form.FavoriteBillerForm.values.payeeType', {});
    const payeeAccNo = result(getState(), 'form.FavoriteBillerForm.values.payeeAccNo', {});
    const bankId = result(bank, 'id', '') === '' ? result(bank, 'bankId', '') : result(bank, 'id', '');
    const accNo = (payeeType.value !== 'emoney' ||  payeeAccNo.substring(0, 4) === '3808') ? payeeAccNo : result(bank, 'companyCode', '08') === '08' ? result(bank, 'prefixEmoney', '38') + payeeAccNo : result(bank, 'prefixEmoney', '38') + result(bank, 'companyCode', '08') + payeeAccNo;
    const isLogin = !isEmpty(result(getState(), 'user', {}));
    const transferMethodType = isLogin ? '' : '1';
    let additional = [];
    if (isLogin) {
      additional = ['ipassport', 'TXID', 'lang'];
    } else {
      additional = ['TXID', 'lang', 'tokenClient', 'tokenServer', 'transferMethodType'];
    }
    if (!isEmpty(bank) && payeeAccNo !== '') {
      dispatch(change('FavoriteBillerForm', 'payeeName', ''));
      if (accNo.length > 0 && (bank.isSinarmas || bank.networkEnabled === 'yes' || payeeType.value === 'emoney')) {
        const payload = middlewareUtils.prepareGetPayeeName({
          bankId,
          accountNumber: accNo,
          transferMethodType
        });
        dispatch(actionCreators.showSpinner());
        return api.getPayeeName(payload, additional, dispatch).then((payeeDetails) => {
          dispatch(actionCreators.hideSpinner());
          dispatch(change('FavoriteBillerForm', 'originalName', payeeDetails.data.targetName));
          dispatch(change('FavoriteBillerForm', 'payeeName', payeeDetails.data.targetName));
          dispatch(change('FavoriteBillerForm', 'payeeNameDisabled', false));
        }).catch((err) => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__ERROR_GETTING_PAYEE_NAME), Toast.LONG);
        });
      }
    }
  };
}

// GET all account for transfer before login
export function getDefaultAccount () {
  return (dispatch, getState) => {
    const isAllAccount = true;
    const tokenClient = result(getState(), 'additionalApiPayload.tokenClient', '');
    const tokenServer = result(getState(), 'additionalApiPayload.tokenServer', '');
    const payload = {isAllAccount, tokenClient, tokenServer};
    return api.getDefaultAccount(payload, dispatch).
      then((res) => {
        dispatch(actionCreators.updateAccounts(res.data.AccountMap));
        return Promise.resolve(res);
      }).
      catch((err) =>
        Promise.reject(err));
  };
}

export function silentLoginBillpay () {
  return (dispatch) => {
    dispatch(login({}, true, false, false, false, false, true, 1, 1)).then(() => {
    }).catch((err) => {
      const responseMessage = result(err, 'data.responseMessage', language.ERROR_MESSAGE_VALID_SESSION);
      Toast.show(responseMessage);
    });
  };
}

export function setupSwiftCodeBankInformation (swiftBank, payee) {
  return (dispatch, getState) => {
    const state = getState();
    const user = result(state, 'user.profile', {}); 
    const accountList = result(state, 'accounts', []);
    const profileScope = {userLogin: user, customer: accountList};
    const transRefNum = result(state, 'transRefNum', '');
    const swiftCode = toUpper(swiftBank);
    const payload = {transRefNum, profileScope, swiftCode: swiftCode};
    dispatch(actionCreators.showSpinner());
    return api.validateSwiftCode(payload, dispatch).
      then((res) => {
        const responseCode = result(res, 'data.responseCode', '');
        const swift = result(res, 'data.data.resultSwift.0.swiftCode', '');
        const bankName = result(res, 'data.data.resultSwift.0.bankName', '');
        const country = result(res, 'data.data.resultSwift.0.country', '');
        const bankInformation = {swiftCode: swift, bankName: bankName, country: country};
        if (responseCode === '00') {
          if (!isEmpty(payee)) {
            dispatch(setupRemittanceTransfer(payee));
          } else {
            dispatch(actionCreators.hideSpinner());
            dispatch(NavigationActions.navigate({
              routeName: 'RemittanceBankInformation',
              params: {
                bankInformation, isKyc: true
              }
            }));
          } 
        } else {
          const hideAlert = () => {
            dispatch(actionCreators.hideSinarmasAlert());
            dispatch(actionCreators.hideSpinner());
          };
          const sinarmasModalOptions = {
            heading1: language.REMITTANCE__WRONG_SWIFT_CODE_BOX1,
            button1: language.SERVICE__TRY_AGAIN_BUTTON,
            onButton1Press: hideAlert,
            onClose: hideAlert,
            textWrongSwiftCode1: language.REMITTANCE__WRONG_SWIFT_CODE_BOX2,
          };
          dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'SWIFTCODE'}));
        }
      }).
      catch((err) => {
        const responseCode = result(err, 'data.responseCode', '');
        if (responseCode === '01') {
          const hideAlert = () => {
            dispatch(actionCreators.hideSinarmasAlert());
            dispatch(actionCreators.hideSpinner());
          };
          const sinarmasModalOptions = {
            heading1: language.REMITTANCE__WRONG_SWIFT_CODE_BOX1,
            button1: language.SERVICE__TRY_AGAIN_BUTTON,
            onButton1Press: hideAlert,
            onClose: hideAlert,
            textWrongSwiftCode1: language.REMITTANCE__WRONG_SWIFT_CODE_BOX2,
          };
          dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'SWIFTCODE'}));
        } else {
          dispatch(actionCreators.hideSpinner());
          const errorMessage = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_SETUP_TRANSFER);
          Toast.show(errorMessage, Toast.LONG);
        }
      });
  };
}

export function checkTimeOperationRemittance () {
  return (dispatch, getState) => {
    const state = getState();
    const user = result(state, 'user.profile', {}); 
    const accountList = result(state, 'accounts', []);
    const profileScope = {userLogin: user, accountList: accountList};
    const transRefNum = result(state, 'transRefNum', '');
    dispatch(actionCreators.showSpinner());
    const payload = {transRefNum, profileScope};
    return api.checkOperationTime(payload, dispatch).
      then((res) => {
        const responseCode = result(res, 'data.responseCode', '');
        const responseMessage = result(res, 'data.responseMessage', '');
        const noticeTimeHour = replace(responseMessage, /<br>/, '');
        const toogleFase1 = result(res, 'data.toogleFase1', false);
        dispatch(actionCreators.saveToogleRemittance(toogleFase1));
        if (responseCode === '00') {
          dispatch(actionCreators.hideSpinner());
          dispatch(NavigationActions.navigate({
            routeName: 'RemittanceSwiftCode',
            params: {
              isKyc: true, isRemittance: true,
            }
          }));
        } else {
          const hideAlert = () => {
            dispatch(actionCreators.hideSinarmasAlert());
            dispatch(actionCreators.hideSpinner());
          };
          const sinarmasModalOptions = {
            heading1: language.REMITTANCE_TIME_OPERATION_TITLE,
            button1: language.SERVICE__GOT_IT_BUTTON,
            onButton1Press: hideAlert,
            onClose: hideAlert,
            textRemittance1: noticeTimeHour,
          };
          dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'REMITTANCE_TRANSACTION'}));
        }
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        const errorMessage = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_SETUP_TRANSFER);
        Toast.show(errorMessage, Toast.LONG);
      });
  };
}

export function setupRemittanceTransfer (payee) {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    return (dispatch(populateConfigData())).
      then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate({
          routeName: 'RemittanceTransferPayment',
          params: {
            payee, isKyc: true
          }
        }));
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        const errorMessage = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_SETUP_TRANSFER);
        Toast.show(errorMessage, Toast.LONG);
      });
  };
}

export function getCurrencyPurpose () {
  return (dispatch, getState) => {
    const state = getState();
    const user = result(state, 'user.profile', {}); 
    const accountList = result(state, 'accounts', []);
    const profileScope = {userLogin: user, customer: accountList};
    const transRefNum = result(state, 'transRefNum', '');
    const payload = {transRefNum, profileScope};
    dispatch(actionCreators.showSpinner());
    return api.currencyPurpose(payload, dispatch).then((res) => {
      const currencyPurpose = result(res, 'data.data', {});
      isEmpty(currencyPurpose) ?
        null 
        : dispatch(actionCreators.saveCurrencyPurpose(currencyPurpose));
      dispatch(actionCreators.hideSpinner());
    }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        const errorMessage = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_SETUP_TRANSFER);
        Toast.show(errorMessage, Toast.LONG);
      });
  };
}

export function getSenderRemittance () {
  return (dispatch, getState) => {
    const state = getState();
    const user = result(state, 'user.profile', {}); 
    const accountList = result(state, 'accounts', []);
    const profileScope = {userLogin: user, customer: accountList};
    const transRefNum = result(state, 'transRefNum', '');
    const payload = {transRefNum, profileScope};
    dispatch(actionCreators.showSpinner());
    return api.detailSenderRemittance(payload, dispatch).then((res) => {
      const detailSender = result(res, 'data', {});
      dispatch(actionCreators.saveSenderDataRemittance(detailSender));
      dispatch(actionCreators.hideSpinner());
    }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        const errorMessage = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_SETUP_TRANSFER);
        Toast.show(errorMessage, Toast.LONG);
      });
  };
}

export function deleteSelectedPayeeRemittance (payee) {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goDelete = () => {
      const creditAccountNumber = result(payee, 'accountNumber', '');
      const payload = {creditAccountNumber};
      dispatch(actionCreators.hideSinarmasAlert());
      return api.deleteFromPayeeListRemittance(payload, dispatch).
        then(() => {
          dispatch(getTargetAccountRemittance()).then(() => {
            Toast.show(language.TRANSFER__DELETE_PAYEE_SUCCESS);
          });
        }).
        catch((err) => {
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_DELETE_PAYEE), Toast.LONG);
        });
    };
    const sinarmasModalOptions = {
      heading1: language.TRANSFER__DELETE_PAYEE_MODAL_TITLE,
      text: language.TRANSFER__DELETE_PAYEE_MODAL_TEXT,
      button1: language.FAVORITE__CANCEL_BUTTON,
      onButton1Press: hideAlert,
      button2: language.ONBOARDING__OKAY,
      onButton2Press: goDelete,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function inquiryProxyByEDW () {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    const payload = '';
    return api.inquiryProxyByEDW(payload, dispatch).
      then((res) => {
        const inquiryProxyByEDWData = result(res, 'data', []);
        dispatch(actionCreators.saveInquiryProxyByEDW(inquiryProxyByEDWData));
      }).
      then(() => api.detailByCustNo(payload, dispatch).then((res) => {
        const detailByCustNoData = result(res, 'data', []);
        dispatch(actionCreators.saveDetailByCustNo(detailByCustNoData));
        dispatch(NavigationActions.navigate({routeName: 'ManageBIFast'}));
        dispatch(actionCreators.hideSpinner());
      }).
        catch((err) => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(getErrorMessage(err, language.RECURRING__TIME_OUT_OR_NO_DATA), Toast.LONG);
        })).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.RECURRING__TIME_OUT_OR_NO_DATA), Toast.LONG);
      });
  };
}

export function inquiryProxyByEDWResult () {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    const payload = '';
    return api.inquiryProxyByEDW(payload, dispatch).
      then((res) => {
        const inquiryProxyByEDWData = result(res, 'data', []);
        dispatch(actionCreators.saveInquiryProxyByEDW(inquiryProxyByEDWData));
      }).
      then(() => api.detailByCustNo(payload, dispatch).then((res) => {
        const detailByCustNoData = result(res, 'data', []);
        dispatch(actionCreators.saveDetailByCustNo(detailByCustNoData));
        dispatch(actionCreators.hideSpinner());
      }).
        catch((err) => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(getErrorMessage(err, language.RECURRING__TIME_OUT_OR_NO_DATA), Toast.LONG);
        })).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.RECURRING__TIME_OUT_OR_NO_DATA), Toast.LONG);
      });
  };
}

export function goClaimRewardNow (addProxyAddress, proxyAlias, myAccount, responseCode) {
  return (dispatch, getState) => {
    const state = getState();
    const responseMessageHeader = result(state, 'proxyResolution.responseMessageHeader', '');
    const responseMessageTitle = result(state, 'proxyResolution.responseMessageTitle');
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const gotoHomeLock = () => {
      dispatch(NavigationActions.navigate({routeName: 'NewProxyConfirmationBIFast', params: {addProxyAddress, proxyAlias, myAccount, responseCode}}));
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: responseMessageHeader,
      text: responseMessageTitle,
      button2: language.MGM__BUTTON_CANCEL_TEXT,
      onButton2Press: hideAlert,
      button1: language.GENERIC__YES,
      onButton1Press: gotoHomeLock,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'PROXYRESOLUTION'}));
  };
}

export function popUpOtherBank () {
  return (dispatch, getState) => {
    const state = getState();
    const responseMessageHeader = result(state, 'proxyResolution.responseMessageHeader', '');
    const responseMessageTitle = result(state, 'proxyResolution.responseMessageTitle');
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: responseMessageHeader,
      text: responseMessageTitle,
      button1: language.MGM__POP_UP_DONE,
      onButton1Press: hideAlert,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'PROXYOTHERBANK'}));
  };
}

export function popUpInBank (res) {
  return (dispatch) => {
    const responseMessageHeader = result(res, 'data.responseMessageHeader', '');
    const responseMessageTitle = result(res, 'data.responseMessageTitle');
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: responseMessageHeader,
      text: responseMessageTitle,
      button1: language.MGM__POP_UP_DONE,
      onButton1Press: hideAlert,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'PROXYOTHERBANK'}));
  };
}

export function goToConfirmationParams (addProxyAddress, proxyAlias, myAccount) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const transRefNum = result(state, 'transRefNum');
    const accountCustomer = result(myAccount, 'accountNumber', '');
    const BICCustomer = result(state, 'detailByCustNo.dataResolution.BICCustomer', '');
    const proxyRequestType = result(state, 'detailByCustNo.dataResolution.proxyResolution', '');
    const proxyType = result(state, 'form.addProxyAddress.values.addProxyType.value');
    const proxyValue = proxyAlias;
    const payload = {transRefNum, accountCustomer, BICCustomer, proxyRequestType, proxyType, proxyValue};
    return api.proxyResolution(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const detailByCustNoData = result(res, 'data', []);
      dispatch(actionCreators.saveProxyResolution(detailByCustNoData));
      const responseCode = result(res, 'data.responseCode', '');
      if (responseCode === '91') {
        dispatch(goClaimRewardNow(addProxyAddress, proxyAlias, myAccount, responseCode));
      } else if (responseCode === '92') {
        dispatch(goClaimRewardNow(addProxyAddress, proxyAlias, myAccount, responseCode));
      } else if (responseCode === '93') {
        dispatch(popUpOtherBank(addProxyAddress, proxyAlias, myAccount));
      } else if (responseCode === '94') {
        dispatch(popUpOtherBank(addProxyAddress, proxyAlias, myAccount));
      } else if (responseCode === '95') {
        dispatch(popUpOtherBank(addProxyAddress, proxyAlias, myAccount));
      } else {
        dispatch(NavigationActions.navigate({routeName: 'NewProxyConfirmationBIFast', params: {addProxyAddress, proxyAlias, myAccount}}));

      }
    }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        const errorMessage = getErrorMessage(err, language.RECURRING__TIME_OUT_OR_NO_DATA);
        Toast.show(errorMessage, Toast.LONG);
      });
    
  };
}

export function easyPinBiFast (addProxyAddress, proxyAlias, myAccount, navigation, isEditProxy) {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    dispatch(NavigationActions.navigate({routeName: 'EasyPinBiFast', params: {addProxyAddress, proxyAlias, myAccount, navigation, isEditProxy}}));
    dispatch(actionCreators.hideSpinner());  
  };
}

export function popUpSuccessAddProxy () {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.BIFAST__POP_UP_ADD_SUCCESS_HEADER,
      text: language.BIFAST__POP_UP_ADD_SUCCESS_TITLE,
      button1: language.MGM__POP_UP_DONE,
      onButton1Press: hideAlert,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'PROXYSUCCESS'}));
  };
}

export function popUpFailedProxy () {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.BIFAST__POP_UP_ADD_FAILED_HEADER,
      text: language.BIFAST__POP_UP_ADD_FAILED_TITLE,
      button1: language.MGM__POP_UP_DONE,
      onButton1Press: hideAlert,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'PROXYFAILED'}));
  };
}

export function addRegisterProxyAddress (data) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const transRefNum = result(state, 'transRefNum');
    let easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    // let easyPin = result(state, 'form.BiFastEasyPin.values.easyPinBiFast', '');
    const randomNumber = randomString(16);
    OBM_EncryptPassword(easyPin, randomNumber);
    if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;   
    // const mPinInputed = result(state, 'form.AuthenticateForm.values.otp', '');
    // const ePinInputed = result(state, 'form.EmailAuthenticateForm.values.otp');
    const simasToken = result(state, 'form.AuthenticateForm.values.simasToken', '');
    const AccountLWIdentification_Id = result(data, 'myAccount.accountNumber', '');
    const ProxyRegistration1_RegnTp = result(state, 'detailByCustNo.dataProxy.proxyTypeRegister', '');   
    const ProxyDefinition1_Tp = result(state, 'form.addProxyAddress.values.addProxyType.value');
    const ProxyDefinition1_Val = result(data, 'proxyAlias', '');   
    const ProxyRegistrationAccount1_DsplNm = result(state, 'insuranceDataTravel.name', '');
    const GenericFinancialIdentification1_Id = result(state, 'detailByCustNo.dataResolution.BICCustomer', '');
    const GenericAccountIdentification1_Id = result(data, 'myAccount.accountNumber', '');
    const CashAccountType2ChoiceProxy_Prtry = result(data, 'myAccount.accountType');
    const CashAccount40_Nm = result(data, 'myAccount.name', '');
    const ScndIdDefinition1_Tp = result(state, 'detailByCustNo.responseGetDetailByCustNo.body.response.customerIdTypes');
    const ScndIdDefinition1_Val = result(state, 'detailByCustNo.responseGetDetailByCustNo.body.response.legalIdNumber');
    const ProxyRegistrationAccount1_RegnSts = result(state, 'detailByCustNo.dataProxy.proxyTypeActiveByCust');
    const BI_AddtlCstmrInf_Tp = result(state, 'detailByCustNo.responseGetDetailByCustNo.body.response.customerType');
    const BI_AddtlCstmrInf_Id = result(state, 'detailByCustNo.responseGetDetailByCustNo.body.response.legalIdNumber');
    const BI_AddtlCstmrInf_RsdntSts = result(state, 'detailByCustNo.responseGetDetailByCustNo.body.response.residence');
    const BI_AddtlCstmrInf_TwnNm = result(state, 'detailByCustNo.responseGetDetailByCustNo.body.response.locationCode');
    const payload = {easyPin, transRefNum, simasToken, AccountLWIdentification_Id, ProxyRegistration1_RegnTp, ProxyDefinition1_Tp,
      ProxyDefinition1_Val, ProxyRegistrationAccount1_DsplNm, GenericFinancialIdentification1_Id, GenericAccountIdentification1_Id,
      CashAccountType2ChoiceProxy_Prtry, CashAccount40_Nm, ScndIdDefinition1_Tp, ScndIdDefinition1_Val, ProxyRegistrationAccount1_RegnSts,
      BI_AddtlCstmrInf_Tp, BI_AddtlCstmrInf_Id, BI_AddtlCstmrInf_RsdntSts, BI_AddtlCstmrInf_TwnNm};
    return api.proxyRegister(payload, dispatch).then((res) => {  
      const addProxyRegister = result(res, 'data', []);
      dispatch(actionCreators.saveAddProxyAddress(addProxyRegister));
      dispatch(actionCreators.hideSpinner());        
      dispatch(NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({
            routeName: 'AccountMenu'
          }),
          NavigationActions.navigate({routeName: 'ManageBIFast'})]
      }));
      dispatch(popUpSuccessAddProxy());
      dispatch(inquiryProxyByEDWResult());
      dispatch(destroy('addProxyAddress'));
    }).
      catch((err) => {
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
        if (easyPinAttempt === 'invalid') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_SEND_SMS_VERIFICATION), Toast.LONG);
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
          dispatch(actionCreators.hideSpinner());
          dispatch(NavigationActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({
                routeName: 'AccountMenu'
              }),
              NavigationActions.navigate({routeName: 'ManageBIFast'})]
          }));
          dispatch(popUpFailedProxy());
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_SEND_SMS_VERIFICATION), Toast.LONG);
          dispatch(inquiryProxyByEDWResult());
          dispatch(destroy('addProxyAddress'));
        }
      });
  };
}

export function portingRegisterProxyAddress (data) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const transRefNum = result(state, 'transRefNum');
    let easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    // let easyPin = result(state, 'form.BiFastEasyPin.values.easyPinBiFast', '');
    const randomNumber = randomString(16);
    OBM_EncryptPassword(easyPin, randomNumber);
    if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;   
    // const mPinInputed = result(state, 'form.AuthenticateForm.values.otp', '');
    // const ePinInputed = result(state, 'form.EmailAuthenticateForm.values.otp');
    const simasToken = result(state, 'form.AuthenticateForm.values.simasToken', '');
    const AccountLWIdentification_Id = result(data, 'myAccount.accountNumber', '');
    const ProxyRegistration1_RegnTp = result(state, 'detailByCustNo.dataProxy.proxyTypePorting', '');   
    const ProxyDefinition1_Tp = result(state, 'proxyResolution.responseResolution.body.response.ProxyDefinition1_Orgnl_Tp', '');
    const ProxyDefinition1_Val = result(state, 'proxyResolution.responseResolution.body.response.ProxyDefinition1_Orgnl_Val', '');   
    const ProxyRegistrationAccount1_RegnId = result(state, 'proxyResolution.responseResolution.body.response.ProxyLookUpAccount1_RegnId', '');
    const ProxyRegistrationAccount1_DsplNm = result(state, 'proxyResolution.responseResolution.body.response.ProxyLookUpAccount1_DsplNm', '');
    const GenericFinancialIdentification1_Id = result(state, 'proxyResolution.responseResolution.body.response.GenericFinancialIdentification1_Id', '');
    const GenericAccountIdentification1_Id = result(data, 'myAccount.accountNumber', '');
    const CashAccountType2ChoiceProxy_Prtry = result(state, 'proxyResolution.responseResolution.body.response.CashAccountType2ChoiceProxy_Prtry');
    const CashAccount40_Nm = result(state, 'proxyResolution.responseResolution.body.response.CashAccount40_Nm', '');
    const ScndIdDefinition1_Tp = result(state, 'detailByCustNo.responseGetDetailByCustNo.body.response.customerIdTypes');
    const ScndIdDefinition1_Val = result(state, 'detailByCustNo.responseGetDetailByCustNo.body.response.legalIdNumber');
    const ProxyRegistrationAccount1_RegnSts = result(state, 'detailByCustNo.dataProxy.proxyTypeActiveByCust');
    const BI_AddtlCstmrInf_Tp = result(state, 'detailByCustNo.responseGetDetailByCustNo.body.response.customerType');
    const BI_AddtlCstmrInf_Id = result(state, 'detailByCustNo.responseGetDetailByCustNo.body.response.legalIdNumber');
    const BI_AddtlCstmrInf_RsdntSts = result(state, 'detailByCustNo.responseGetDetailByCustNo.body.response.residence');
    const BI_AddtlCstmrInf_TwnNm = result(state, 'detailByCustNo.responseGetDetailByCustNo.body.response.locationCode');
    const payload = {easyPin, transRefNum, simasToken, AccountLWIdentification_Id, ProxyRegistration1_RegnTp, ProxyDefinition1_Tp,
      ProxyDefinition1_Val, ProxyRegistrationAccount1_RegnId, ProxyRegistrationAccount1_DsplNm, GenericFinancialIdentification1_Id, GenericAccountIdentification1_Id,
      CashAccountType2ChoiceProxy_Prtry, CashAccount40_Nm, ScndIdDefinition1_Tp, ScndIdDefinition1_Val, ProxyRegistrationAccount1_RegnSts,
      BI_AddtlCstmrInf_Tp, BI_AddtlCstmrInf_Id, BI_AddtlCstmrInf_RsdntSts, BI_AddtlCstmrInf_TwnNm};
    return api.proxyPorting(payload, dispatch).then((res) => {  
      const addProxyRegister = result(res, 'data', []);
      dispatch(actionCreators.saveAddProxyAddress(addProxyRegister));
      dispatch(actionCreators.hideSpinner());        
      dispatch(NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({
            routeName: 'AccountMenu'
          }),
          NavigationActions.navigate({routeName: 'ManageBIFast'})]
      }));
      dispatch(popUpSuccessAddProxy());
      dispatch(inquiryProxyByEDWResult());
      dispatch(destroy('addProxyAddress'));
    }).
      catch((err) => {
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
        if (easyPinAttempt === 'invalid') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_SEND_SMS_VERIFICATION), Toast.LONG);
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
          dispatch(actionCreators.hideSpinner());
          dispatch(NavigationActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({
                routeName: 'AccountMenu'
              }),
              NavigationActions.navigate({routeName: 'ManageBIFast'})]
          }));
          dispatch(popUpFailedProxy());
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_SEND_SMS_VERIFICATION), Toast.LONG);
          dispatch(inquiryProxyByEDWResult());
          dispatch(destroy('addProxyAddress'));
        }
      });
  };
}

export function inquiryProxyAddress () {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const transRefNum = result(state, 'transRefNum');
    const BICCustomer = result(state, 'detailByCustNo.dataResolution.BICCustomer', '');
    const proxyRequestType = result(state, 'detailByCustNo.dataResolution.proxyResolution', '');
    const regex = /(^[0-9a-zA-Z]*$)/;
    const accountCustomer = result(state, 'form.transferProxy.values.myAccount.accountNumber', '');
    const proxyValue = upperCase(result(state, 'form.ProxyAddressTrf.values.proxyAddress', ''));
    const isProxy = regex.test(proxyValue);
    const proxyType = isProxy ? '01' : '02';
    const payload = {transRefNum, accountCustomer, BICCustomer, proxyRequestType, proxyType, proxyValue};
    return api.proxyResolutionCT(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const isNewPayee = true;
      const detailByCustNoData = result(res, 'data', []);
      const detailNewPayee = {detailByCustNoData, isNewPayee};
      dispatch(actionCreators.saveProxyResolutionCT(detailNewPayee));
      const GenericFinancialIdentification1_Id = result(res, 'data.responseResolution.body.targetBankName');
      const CashAccount40_Nm = result(res, 'data.responseResolution.body.response.CashAccount40_Nm') + ' - ' + result(res, 'data.responseResolution.body.response.GenericAccountIdentification1_Id');
      const isGenericFinancialIdentification1_Id = isEmpty(GenericFinancialIdentification1_Id) ? '' : GenericFinancialIdentification1_Id;
      const isCashAccount40_Nm = CashAccount40_Nm === 'undefined - undefined' ? '' : CashAccount40_Nm;
      dispatch(change('ProxyAddressTrf', 'bankNameCode', isGenericFinancialIdentification1_Id));
      dispatch(change('ProxyAddressTrf', 'accountDetail', isCashAccount40_Nm));
    }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        const errorMessage = getErrorMessage(err, language.RECURRING__TIME_OUT_OR_NO_DATA);
        Toast.show(errorMessage, Toast.LONG);
      });
  };
}

export function goSubmitProxy (params) {
  return (dispatch) => {
    const isOtp = result(params, 'isOtp', '');
    const amount = result(params, 'amount', '');
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const gotoHomeLock = () => {
      dispatch(getTransRefNumAndOTPNavigate('CustomBiFast', true, 'AuthBiFast', params, false));
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const gotoAmount = () => {
      dispatch(triggerAuthNavigate('CustomBiFast', amount, false, 'AuthBiFast', params));
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.BIFAST__POP_UP_CONFIRMATION_HEADER,
      text: language.BIFAST__POP_UP_CONFRIMATION_TITLE,
      button1: language.BIFAST__POP_UP_CONFIRMATION_CHECK_AGAIN,
      onButton1Press: hideAlert,
      button2: language.BIFAST__POP_UP_CONFIRMATION_YES,
      onButton2Press: isOtp ? gotoHomeLock : gotoAmount,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'PROXYRESOLUTION'}));
  };
}

export function goToEditConfirmation (formValues, user, detailByCustNo, selectedAccount, myAccount) {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'EditProxyConfirmationBIFast', params: {formValues, user, detailByCustNo, selectedAccount, myAccount}}));
  };
}

export function proxyUpdate () {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const state = getState();
    const transRefNum = result(state, 'user.transRefNum', '');
    const formValuesData = result(state, 'form.BifastEditMenu.values', {});
    // const updateProxyType = result(formValuesData, 'proxyTypeNumber', {});
    const allValueData = result(formValuesData, 'allValueData', {});
    const selectionAcc = omit(allValueData, ['GenericAccountIdentification1_Id']);
    let easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    // const mPinInputed = result(state, 'form.AuthenticateForm.values.otp', '');
    // const ePinInputed = result(state, 'form.EmailAuthenticateForm.values.otp');
    const accountNumber = result(state, 'form.BifastEditMenu.values.myAccount.accountNumber', '');
    // const mPinInputed = updateProxyType === '02' ? result(state, 'form.EmailAuthenticateForm.values.otp', '') : result(state, 'form.AuthenticateForm.values.otp', '');
    // const easyPinRaw = result(state, 'form.BiFastEasyPin.values', '');
    const ProxyRegistration1_RegnTp = result(state, 'detailByCustNo.dataProxy.proxyTypeUpdate', '');
    // let easyPin = result(easyPinRaw, 'easyPinBiFast', '');
    const randomNumber = randomString(16);
    OBM_EncryptPassword(easyPin, randomNumber);
    if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
 
    const AccountLWIdentification_Id = accountNumber;
    const payload = {
      transRefNum,
      GenericAccountIdentification1_Id: accountNumber,
      ...selectionAcc,
      AccountLWIdentification_Id,
      ProxyRegistration1_RegnTp,
      // mPinInputed,
      easyPin,
      // ePinInputed,
    };
    return api.proxyUpdate(payload, dispatch).then(() => {
      dispatch(actionCreators.hideSpinner());
      dispatch(NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({routeName: 'AccountMenu'}),
          NavigationActions.navigate({routeName: 'ManageBIFast'}),
        ]
      }));
      const modalOptionsSecond = {
        heading1: language.BIFAST__POP_UP_EDIT_SUCCESS_HEADER,
        text: language.BIFAST__POP_UP_EDIT_SUCCESS_TITLE,
        button1: language.MGM__POP_UP_DONE,
        onButton1Press: hideAlert,
        onClose: hideAlert,
      };
      dispatch(actionCreators.showSinarmasAlert({...modalOptionsSecond, image: 'PROXYSUCCESS'}));
      dispatch(inquiryProxyByEDWResult());
      dispatch(destroy('BifastEditMenu'));
    }).
      catch((err) => {
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
        if (easyPinAttempt === 'invalid') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_SEND_SMS_VERIFICATION), Toast.LONG);
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
          dispatch(actionCreators.hideSpinner());
          const goToGenerateForm = () => { 
            dispatch(actionCreators.hideSinarmasAlert());
          };
          const sinarmasModalOptions = {
            heading1: language.BIFAST__POP_UP_EDIT_FAILED_HEADER,
            text: language.BIFAST__POP_UP_EDIT_FAILED_TITLE,
            button1: language.MGM__POP_UP_DONE,
            onButton1Press: goToGenerateForm,
          };
          dispatch(NavigationActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'AccountMenu'}),
              NavigationActions.navigate({routeName: 'ManageBIFast'}),
            ]
          }));
          dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'PROXYFAILED'}));
          dispatch(inquiryProxyByEDWResult());
          dispatch(destroy('BifastEditMenu'));
        }
      });
  };
}

export function unlinkProxy (user, detailByCustNo, selectedAccount, formValues) {
  return (dispatch, getState) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const removeAcc = result(formValues, 'removeAcc', {});
    const goUnlink = () => {
      const state = getState();
      const easyPinRaw = result(state, 'form.AuthenticateForm.values', '');
      const ProxyRegistration1_RegnTp = result(state, 'detailByCustNo.dataProxy.proxyTypeDeregister', '');
      let easyPin = result(easyPinRaw, 'easypin', '');
      const randomNumber = randomString(16);
      OBM_EncryptPassword(easyPin, randomNumber);
      if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
      const transRefNum = result(state, 'transRefNum', '');
      const payload = {
        ...removeAcc,
        transRefNum,
        easyPin,
        ProxyRegistration1_RegnTp
      };
      dispatch(actionCreators.showSpinner());
      return api.proxyUnlink(payload, dispatch).then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({routeName: 'AccountMenu'}),
            NavigationActions.navigate({routeName: 'ManageBIFast'}),
          ]
        }));
        const modalOptionsSecond = {
          heading1: language.BIFAST__POP_UP_UNLINK_SUCCESS_HEADER,
          text: language.BIFAST__POP_UP_UNLINK_SUCCESS_TITLE,
          button1: language.MGM__POP_UP_DONE,
          onButton1Press: hideAlert,
          onClose: hideAlert,
        };
        dispatch(actionCreators.showSinarmasAlert({...modalOptionsSecond, image: 'PROXYSUCCESS'}));
        dispatch(inquiryProxyByEDWResult());
      }).
        catch((err) => {
          const easyPinAttempt = result(err, 'data.easypinAttempt', '');
          if (easyPinAttempt === 'invalid') {
            dispatch(actionCreators.hideSpinner());
            dispatch(reset('AuthenticateForm'));
            Toast.show(getErrorMessage(err, language.ERROR_MESSAGE_INVALID_EASYPIN_TRANSACTION), Toast.LONG);
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
            dispatch(actionCreators.hideSpinner());
            dispatch(NavigationActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'AccountMenu'}),
                NavigationActions.navigate({routeName: 'ManageBIFast'}),
              ]
            }));
            const modalOptionsSecond = {
              heading1: language.BIFAST__POP_UP_UNLINK_FAILED_HEADER,
              text: language.BIFAST__POP_UP_UNLINK_FAILED_TITLE,
              button1: language.MGM__POP_UP_DONE,
              onButton1Press: hideAlert,
              onClose: hideAlert,
            };
            dispatch(actionCreators.showSinarmasAlert({...modalOptionsSecond, image: 'PROXYFAILED'}));
            dispatch(inquiryProxyByEDWResult());
            Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_SEND_SMS_VERIFICATION), Toast.LONG);
          }
        });
    };
    const paramsforEmail = {
      onSubmit: goUnlink,
      isOtp: false,
    };   
    const goUnlinkAuth = () => {
      dispatch(triggerAuthNavigate('editProxy', 0, true, 'AuthDashboard', paramsforEmail));
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const modalOptions = {
      heading1: language.DASHBOARD__CREDIT_CARD_ATTENTION,
      text: language.BIFAST_UNLINK_PROXY_POPUP_QUESTION,
      button1: language.GENERIC__YES,
      onButton1Press: goUnlinkAuth,
      button2: language.INQUIRY__SIL_MODAL_BUTTON_CANCEL,
      onButton2Press: hideAlert,
      onClose: hideAlert,
      disabled: true
    };
    dispatch(actionCreators.showSinarmasAlert({...modalOptions, image: 'PROXYRESOLUTION'}));
  };
}
