import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import {result, find, isEmpty, lowerCase, replace, toUpper} from 'lodash';
import * as middlewareUtils from '../../utils/middleware.util';
import {storageKeys, set} from '../../utils/storage.util';
import {getErrorMessage, currencyFormatter, getTransferTime, getDayName, getTransactionType, getTransferPossibleAccountsBIFast, getMaskingAccount} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import {Toast} from '../../utils/RNHelpers.util.js';
import {destroy, change, reset} from 'redux-form';
import {language} from '../../config/language';
import moment from 'moment';
import {resetToDashboardFrom, refreshStorageNew, populateConfigData, errorResponseResult, getTargetAccount, updateBalances, getTargetAccountRemittance, getTargetAccountProxyAddress} from './common.thunks';
import {logout} from './onboarding.thunks.js';
import {randomString, OBM_EncryptPassword, OBM_GetEncodingParameter, OBM_GetEncryptedPassword} from '../../utils/vendor/pinEncryption.util';
import {login} from './onboarding.thunks';
import {getLuckyDipTicket} from './luckyDip.thunks';
import {updateInvoiceSplitBillTF, reminderMaxBalanceSplitBill} from '../../state/thunks/splitBill.thunks';
import md5 from 'md5';
import {popUpRewardMgm} from './common.thunks';

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

export function confirmTransfer (formValues, payee, transType, getCurrency, currencyRate, newformValues, isValas = false, isKyc, isBiFast = false, isSplitBill, dataTransRefNum, invoiceNumber) {
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
    const accountList = getTransferPossibleAccountsBIFast(result(getState(), 'accounts', []), 'ft');
    const confirmTransferPayload = isBiFast ? middlewareUtils.prepareConfirmTransferBiFastPayload(formValues, payee, transType, time, transferMethodType, isValas, accountList) :
      middlewareUtils.prepareConfirmTransferPayload(formValues, payee, transType, time, transferMethodType, isValas);
    const isNewAccount = result(payee, 'id', '') === '' || result(payee, 'id', '') === null;
    const tokenConfig = result(getState(), 'config.tokenConfig', []);
    const listReceiver = result(getState(), 'splitBillByReceiver', {});
    dispatch(actionCreators.getListReceiver({...listReceiver, isFormSplitBill: true}));
    const {transferMode} = formValues;
    const {transferType} = payee;
    const mode = transferMode || transferType;
    const isOwnAccount = mode === 'own';
    const CONFIRMTRANSFER = transferMode === 'bifast' || isBiFast ? api.confirmTransferBiFast : api.confirmTransfer;

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
    return CONFIRMTRANSFER(confirmTransferPayload, additional, dispatch).
      then((res) => {
        const uniqueCode = result(res, 'data.uniqueCode', '');
        dispatch(actionCreators.saveUniqeCode(uniqueCode));
        const resData = result(res, 'data', {});
        const biFastInBank = result(resData, 'bifastinbank', '');
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
          if (isSplitBill) {
            dispatch(NavigationActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({
                  routeName: 'TransferScreenBill'
                }),
                NavigationActions.navigate({
                  routeName: 'ConfirmScreenSplitBill',
                  params: {
                    formValues,
                    payee,
                    resData,
                    shouldSendSmsOtp,
                    isKyc,
                    isSplitBill,
                    dataTransRefNum,
                    invoiceNumber
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
                    isKyc,
                    isBiFast
                  }
                })
              ]
            }));
            if (biFastInBank === 'inbank') {
              dispatch(popUpInBank(resData));
            }
          }
          dispatch(destroy('fundTransfer'));
          dispatch(destroy('addPayee'));
        }
        dispatch(actionCreators.hideSpinner());
      }).catch((err) => {
        const responseCode = result(err, 'data.responseCode', '');
        const responseMessageHeader = result(err, 'data.responseMessageHeader', '');
        const responseMessage = result(err, 'data.responseMessage', '');
        if (responseCode === '80' && transferMode === 'bifast') {
          const hideAlert = () => {
            dispatch(actionCreators.hideSinarmasAlert());
            dispatch(actionCreators.hideSpinner());
          };
          const sinarmasModalOptions = {
            heading1: responseMessageHeader,
            text: responseMessage,
            button1: language.MGM__POP_UP_DONE,
            onButton1Press: hideAlert,
            onClose: hideAlert,
          };
          dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'FAILEDBIFASTACCOUNT'}));
        } else {
          dispatch(actionCreators.hideSpinner());
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL), Toast.LONG);
        }
      });
  };
}

export function transfer (transferFormData, payeeAccount, type, resData, isValas = false, currencyRate, isKyc, isBiFast, isSplitBill, dataTransRefNum, invoiceNumber) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const transferTime = result(transferFormData, 'transferTime', '') === '' ? '' : moment(transferFormData.transferTime).format('DD MMM YYYY');
    const recurring = result(transferFormData, 'schedule', '') === '4' ? moment(transferFormData.transferTime).format('DD') : '';
    const data = {...transferFormData, transferTime, recurring};
    const sourceAccount = transferFormData.myAccount;
    const transferType = result(resData, 'transferTransaction.mode', '');
    const isBfr = result(resData, 'isBfr', '');
    let showTime = new Date();
    let time = '';
    const {timeConfig} = getState();
    const cutOffMsg = result(resData, 'transferTransaction.cutOffMsg', '');
    const state = getState();
    const gapTime = result(state, 'gapTimeServer', 0);
    const serverTimeNew = String(moment(showTime).add(gapTime, 'seconds').format('HH:mm'));
    const sendDate = moment(serverTimeNew, 'HH:mm').isBefore(moment(result(timeConfig, 'startTimeSkn_CUTOFF'), 'HH:mm')) && cutOffMsg === null || moment(serverTimeNew, 'HH:mm').isBefore(moment(result(timeConfig, 'startTimeRtgs_CUTOFF'), 'HH:mm')) && cutOffMsg === null
    || moment(serverTimeNew, 'HH:mm').isAfter(moment(result(timeConfig, 'startTimeSkn_CUTOFF'), 'HH:mm')) && cutOffMsg === null || moment(serverTimeNew, 'HH:mm').isAfter(moment(result(timeConfig, 'startTimeRtgs_CUTOFF'), 'HH:mm')) && cutOffMsg === null ? timeConfig.coreBusinessDateV3 : timeConfig.coreNextBusinessSknDateV3 || timeConfig.coreNextBusinessRtgsDateV3;
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
    if (transferType === 'network' || transferType === 'inbank' || transferType === 'own' || transferType === 'bifast' || isBiFast) {
      isFundTransfer = 'yes';
    } else if (time === 'today' && transferType === 'skn' || time === 'today' && transferType === 'rtgs') {
      isFundTransfer = 'yes';
    } else if (time === 'nextWorking'  && transferType === 'skn' || time === 'nextWorking' && transferType === 'rtgs' || transferType === 'bifast' || isBiFast) {
      isFundTransfer = 'PENDING';
    }
    let currency = '';
    if (isValas) {
      const currencyDeterminant = String(result(transferFormData, 'currency.name', String(result(sourceAccount, 'currency', ''))));
      const currencyTarget =  isValas ? currencyDeterminant : String(result(sourceAccount, 'currency', ''));
      currency = currencyTarget;
    } else {
      currency = result(transferFormData, 'myAccount.currency', '');
    }
    const targetAccount = result(resData, 'transferTransaction.targetAccountObject', {});
    const isSimas = result(targetAccount, 'detailNetworkCode', '') === '153';
    const isUnknownAccount = result(targetAccount, 'accountType', '') === 'UnknownAccount' || isEmpty(result(targetAccount, 'accountType', ''));
    const targetAccountType = isSimas ?
      isUnknownAccount ? result(targetAccount, 'bankName', 'NA') : result(targetAccount, 'accountType', 'NA') :
      result(targetAccount, 'bankName', 'NA');
    const storeState = getState();
    const {amount} = transferFormData;
    const smsOtp = result(storeState, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(storeState, 'form.AuthenticateForm.values.simasToken', '');
    const transferReferenceNumber = storeState.transRefNum;

    const transferReferenceNumberSplitbill = dataTransRefNum;

    const accountNumber = result(payeeAccount, 'accountNumber', '');
    const phoneNumber = type === 'cardlessWithdrawal' ? accountNumber.substring(2, accountNumber.length) : accountNumber;
    const subheadingShow = type === 'cardlessWithdrawal' ? null : targetAccountType;
    const detailsShow = type === 'cardlessWithdrawal' ? phoneNumber : result(payeeAccount, 'accNo', '') || accountNumber;
    let modalOptions;
    if (isSplitBill) {
      modalOptions = {
        heading: `${sourceAccount.name}`,
        subheading: subheadingShow,
        details: detailsShow,
        amount: isValas ? `${currency} ${amount}` : `Rp ${currencyFormatter(amount)}`,
        transactionId: transferReferenceNumberSplitbill,
        accountFrom: sourceAccount,
        currencyValas: isValas ? currency : currency,
        currencyRate,
        resData,
        isFundTransfer
      };
    } else {
      modalOptions = {
        heading: `${sourceAccount.name}`,
        subheading: subheadingShow,
        details: detailsShow,
        amount: isValas ? `${currency} ${amount}` : `Rp ${currencyFormatter(amount)}`,
        transactionId: transferReferenceNumber,
        accountFrom: type === 'cardlessWithdrawal' ? sourceAccount : getMaskingAccount(sourceAccount),
        currencyValas: isValas ? currency : currency,
        currencyRate,
        resData,
        isFundTransfer
      };
    }
    // let modalOptions = {
    // heading: `${sourceAccount.name}`,
    // subheading: subheadingShow,
    // details: detailsShow,
    // amount: isValas ? `${currency} ${amount}` : `Rp ${currencyFormatter(amount)}`,
    // transactionId: transferReferenceNumber,
    // accountFrom: sourceAccount,
    // currencyValas: isValas ? currency : currency,
    // currencyRate,
    // resData,
    // isFundTransfer
    // };
    const allTransfers = result(storeState, 'lastFundTransactions.allTransactions', []);
    const allTransactions = result(storeState, 'lastCreditCardTransactions.allTransactions', []);
    let trxType;
    const dayRecurr = getDayName(moment(transferFormData.transferTime));
    const daySkn = getDayName(showTime);
    const initiatedTime = transferTime === '' ? daySkn + ', ' + moment(showTime).format('DD MMM YYYY') : dayRecurr + ', ' + moment(transferFormData.transferTime).format('DD MMM YYYY');
    const dataDetail = middlewareUtils.prepareDataDetailTransferCC(transferFormData, payeeAccount, type, resData, initiatedTime);
    const iscounterTrxData = result(storeState, 'counterTrxData', true);
    const isNewAccount = result(payeeAccount, 'id', '') === '' || result(payeeAccount, 'id', '') === null;
    dispatch(actionCreators.showPaymentModal({
      ...modalOptions,
      transactionType: trxType,
      type: 'LOADING'
    }));
    const isFavorite = result(storeState, 'billerDescFav.isFavorite', '');
    let easyPin = result(storeState, 'form.AuthenticateForm.values.easypin', '');
    const randomNumber = randomString(16);
    OBM_EncryptPassword(easyPin, randomNumber);
    if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
    const dataUpdateInvoiceSB = {dataTransRefNum};
    const flagMgm = result(storeState, 'config.hideNotifMGM', '');
    const flagMgmOn = lowerCase(flagMgm) === 'yes';
    const transferTypeRemittance = result(resData, 'transferTransaction.transactionType', '');
    const transferMode = result(transferFormData, 'transferMode', '');
    const transferPayload = isSplitBill ?
      middlewareUtils.prepareTransferPayload(data, payeeAccount,
        transferReferenceNumberSplitbill, easyPin,
        smsOtp, simasToken, type, isFavorite, resData, currency, isSplitBill)
      : transferTypeRemittance === 'remmitance' ?
        middlewareUtils.prepareRemittancePayload(data, payeeAccount,
          transferReferenceNumber, easyPin,
          smsOtp, simasToken, type, isFavorite, resData, currency)
        : isBiFast ?
          middlewareUtils.prepareTransferBiFastPayload(data, payeeAccount,
            transferReferenceNumber, easyPin,
            smsOtp, simasToken, type, isFavorite, resData, currency)
          :
          middlewareUtils.prepareTransferPayload(data, payeeAccount,
            transferReferenceNumber, easyPin,
            smsOtp, simasToken, type, isFavorite, resData, currency);
    const TRANSFER = transferTypeRemittance === 'remmitance' ? api.transferRemittance : transferMode === 'bifast' || isBiFast ? api.transferBiFast : api.transfer;
    return TRANSFER(transferPayload, dispatch).then((res) => {
      const transRefNum = result(res, 'data.transRefNum', '');
      const subs1 = transRefNum.substring(3, 5);
      const ipassportUser = result(state, 'user.ipassport', '');
      const ipassportAdditional = result(state, 'additionalApiPayload.ipassport', '');
      const ipassport = ipassportUser === '' || ipassportUser === null ? ipassportAdditional : ipassportUser;
      const subs2 = transRefNum.substring(transRefNum.length - 2, transRefNum.length);
      const subs3 = ipassport.substring(4, 9);
      const transactionCode = subs1 + subs2 + subs3;
      const uniCode = md5(transactionCode) === result(res, 'data.checkingCode', '');
      const responseCode = result(res, 'data.responseCode', '');
      if (responseCode === '00' && uniCode) {
        const id = result(res, 'data.id', '');
        const resDataTrf = result(res, 'data', {});
        if (type === 'cardlessWithdrawal') {
          trxType = 'Cardless Withdrawal';
          dispatch(resetToDashboardFrom('TransferScreen'));
        } else if (type === 'creditCard') {
          if (isBfr === true) {
            if (isNewAccount) {
              trxType = 'Credit Card Payment';
              dispatch(resetToDashboardFrom('TransferScreen'));
            } else {
              trxType = 'Credit Card Payment';
              dispatch(resetToDashboardFrom('Landing'));
            }
          } else {
            trxType = 'Credit Card Payment';
            dispatch(NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: 'Landing'
                })]
            }));
          }
        } else {
          if (isKyc === true) {
            trxType = 'Transfer';
            // dispatch(resetToDashboardFrom('TransferScreen'));
            if (isSplitBill) {
              dispatch(NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({routeName: 'HomeScreenSplitBill'}),
                ]
              }));
            } else {
              dispatch(resetToDashboardFrom('TransferScreen'));
            }
          } else {
            trxType = 'Transfer';
            // dispatch(resetToDashboardFrom('TransferScreen'));
            if (isSplitBill) {
              dispatch(NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({routeName: 'HomeScreenSplitBill'}),
                ]
              }));
            } else {
              dispatch(resetToDashboardFrom('TransferScreen'));
            }
          }
        }
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.showPaymentModal({
          ...modalOptions,
          transactionType: trxType,
          type: 'SUCCESS',
          dataDetail,
          resDataTrf
        }));
        if (isBfr === true) {
          const isBillPay = true;
          dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNewOnboarding', params: {isValas, resDataTrf, isBillPay}}));
        } else if (isSplitBill) {
          dispatch(NavigationActions.navigate({routeName: 'PaymentStatusRevampOnboarding', params: {isValas, resDataTrf}}));
        } else {
          dispatch(NavigationActions.navigate({routeName: type === 'creditCard' ?  'PaymentStatusNew' : transferTypeRemittance === 'remmitance' ? 'PaymentStatusRemittanceOnboarding' : 'PaymentStatusRevampOnboarding', params: {isValas, resDataTrf}}));
        }
        if (!flagMgmOn) {
          dispatch(popUpRewardMgm());
        }
        dispatch(actionCreators.clearTransRefNum());
        dispatch(refreshStorageNew());
        dispatch(updateBalances());
        dispatch(getTargetAccount());
        isSplitBill ? dispatch(updateInvoiceSplitBillTF(dataUpdateInvoiceSB)) : null;
        dispatch(actionCreators.clearExchangeCurrency());
        transferTypeRemittance === 'remmitance' ? dispatch(getTargetAccountRemittance()) : isBiFast ? dispatch(getTargetAccountProxyAddress()) : dispatch(getTargetAccount());
        if (type === 'creditCard') {
          dispatch(destroy('CreditCardConfirmation'));
          dispatch(destroy('CreditCardPayment'));
          dispatch(destroy('creditcard'));
          dispatch(actionCreators.clearBillerDescFav());
          dispatch(actionCreators.updateLastCreditCardPayment(middlewareUtils.getCreditCardTransferHistory(id, payeeAccount)));
          allTransactions.push({
            accNo: payeeAccount.accNo,
            name: payeeAccount.name,
            bank: payeeAccount.bank,
            id: (id) ? id : result(payeeAccount, 'id')
          });
          set(storageKeys['ALL_CREDIT_CARD_TRANSACTIONS'], allTransactions).catch((err) => {
            Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION), Toast.LONG);
          });
        } else {
          dispatch(destroy('fundTransfer'));
          dispatch(destroy('fundTransferSchedule'));
          dispatch(destroy('fundTransferMethod'));
          dispatch(destroy('addPayee'));
          dispatch(destroy('CardLessWithdrawalConfirmation'));
          dispatch(destroy('CardLessWithdrawalPayment'));
          dispatch(destroy('CardLessWithdrawalAccount'));
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
        }
      } else {
        transferTypeRemittance === 'remmitance' ? dispatch(getTargetAccountRemittance()) : isBiFast ? dispatch(getTargetAccountProxyAddress()) : dispatch(getTargetAccount());
        const easyPinAttempt = result(res, 'data.easypinAttempt', '');
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
        } else {
          trxType = 'Transfer';
          if (type === 'creditCard') {
            dispatch(resetToDashboardFrom('Landing'));
          } else {
            dispatch(resetToDashboardFrom('TransferScreen'));
          }
          dispatch(actionCreators.hideSpinner());
          if (isBfr === true) {
            const isBillPay = true;
            dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNewOnboarding', params: {isValas, isBillPay}}));
          } else {
            dispatch(NavigationActions.navigate({routeName: type === 'creditCard' ?  'PaymentStatusNew' : 'PaymentStatusRevampOnboarding', params: {isValas}}));
          }
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          const resultDisplay = result(res, 'data.result.displayList', []);
          const errorText = getErrorMessage(res, language.ERROR_MESSAGE__COULD_NOT_TRANSFER);
          if (res.AddPayeeFailed) {
            modalOptions = {...modalOptions,
              transactionType: 'Add Payee'
            };
          } else if (type === 'creditCard') {
            modalOptions = {...modalOptions,
              transactionType: trxType
            };
            dispatch(destroy('CreditCardConfirmation'));
            dispatch(destroy('CreditCardPayment'));
            dispatch(destroy('creditcard'));
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
          dispatch(errorResponseResult(res, modalOptions, resultDisplay, errorText, result(transferFormData, 'myAccount', {})));
          if (iscounterTrxData === false) {
            dispatch(refreshStorageNew());
          } else {
            dispatch(updateBalances());
            dispatch(getLuckyDipTicket());
          }
          dispatch(actionCreators.clearBillerDescFav());
          dispatch(actionCreators.clearTransRefNum());
        }
      }
    }).
      catch((err) => {
        const resCode = result(err, 'data.responseCode', '');
        dispatch(getTargetAccount());
        transferTypeRemittance === 'remmitance' ? dispatch(getTargetAccountRemittance()) : isBiFast ? dispatch(getTargetAccountProxyAddress()) : dispatch(getTargetAccount());
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
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
        } else {
          trxType = 'Transfer';
          if (type === 'creditCard') {
            if (isBfr === true) {
              if (isNewAccount) {
                trxType = 'Credit Card Payment';
                dispatch(resetToDashboardFrom('TransferScreen'));
              } else {
                trxType = 'Credit Card Payment';
                dispatch(resetToDashboardFrom('Landing'));
              }
            } else {
              trxType = 'Credit Card Payment';
              dispatch(NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({
                    routeName: 'Landing'
                  })]
              }));
            }
          } else {
            if (isSplitBill) {
              if (resCode === '61') {
                dispatch(reminderMaxBalanceSplitBill(invoiceNumber));
              }
              dispatch(NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({routeName: 'HomeScreenSplitBill'}),
                ]
              }));
            } else {
              dispatch(resetToDashboardFrom('TransferScreen'));
            }
          }
          dispatch(actionCreators.hideSpinner());
          if (isBfr === true) {
            const isBillPay = true;
            dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNewOnboarding', params: {isValas, isBillPay}}));
          } else if (isSplitBill) {
            dispatch(NavigationActions.navigate({routeName: 'PaymentStatusRevampOnboarding', params: {isValas}}));
          } else {
            dispatch(NavigationActions.navigate({routeName: type === 'creditCard' ?  'PaymentStatusNew' : transferTypeRemittance === 'remmitance' ? 'PaymentStatusRemittanceOnboarding' : 'PaymentStatusRevampOnboarding', params: {isValas}}));
          }
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          const resultDisplay = result(err, 'data.result.displayList', []);
          const errorText = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_TRANSFER);
          if (err.AddPayeeFailed) {
            modalOptions = {...modalOptions,
              transactionType: 'Add Payee'
            };
          } else if (type === 'creditCard') {
            modalOptions = {...modalOptions,
              transactionType: trxType
            };
            dispatch(destroy('CreditCardConfirmation'));
            dispatch(destroy('CreditCardPayment'));
            dispatch(destroy('creditcard'));
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
          dispatch(actionCreators.clearExchangeCurrency());
        }
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

export function setupFundTransfer (payee, amount, isSplitBill, dataTransRefNum, invoiceNumber) {
  return (dispatch) => {
    const amountBill = amount === null ? '' : amount;
    dispatch(actionCreators.showSpinner());
    return (dispatch(populateConfigData())).
      then(() => {
        dispatch(actionCreators.hideSpinner());
        if (isSplitBill) {
          dispatch(NavigationActions.navigate({
            routeName: 'FundTransferPaymentSplitBill',
            params: {
              payee, isKyc: true, amountBill, isSplitBill, dataTransRefNum, invoiceNumber
            }
          }));
        } else {
          dispatch(NavigationActions.navigate({
            routeName: 'FundTransferPayment',
            params: {
              payee, isKyc: true, amountBill
            }
          }));
        }
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

export function confirmTransferRemittance (formValues, payee, transType, getCurrency, currencyRate, newformValues, isValas = false, isKyc, dataTransactionRemittance) {
  return (dispatch, getState) => {
    const state = getState();
    const transferTime = result(formValues, 'transferTime', '') === '' ? '' : moment(formValues.transferTime).format('DD MMM YYYY');
    const recurring = result(formValues, 'schedule', '') === '4' ? moment(formValues.transferTime).format('DD') : '';
    const time = {transferTime, recurring};
    const isLogin = !isEmpty(result(getState(), 'user', {}));
    const transferMethodType = isLogin ? '' : '1';
    const dataRemittance = state;
    let easyPin = result(state, 'form.fundTransferType.values.easyPin', '');
    const randomNumber = randomString(16);
    OBM_EncryptPassword(easyPin, randomNumber);
    if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
    const confirmTransferPayload = middlewareUtils.prepareConfirmRemittancePayload(formValues, payee, transType, time, transferMethodType, isValas, dataRemittance, dataTransactionRemittance, easyPin);
    const isNewAccount = result(payee, 'id', '') === '' || result(payee, 'id', '') === null;
    const tokenConfig = result(getState(), 'config.tokenConfig', []);
    const isOwnAccount = false;
    const amountValastoIDR = result(dataTransactionRemittance, 'amountInBaseCurrency', '');
    const amount = amountValastoIDR;
    const shouldSendSmsOtp = getTransactionType(amount, tokenConfig, isOwnAccount) === '0';
    let additional = [];
    if (isLogin) {
      additional = ['ipassport', 'TXID', 'lang', 'tokenClient', 'tokenServer'];
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
    return api.confirmRemittance(confirmTransferPayload, additional, dispatch).
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
                  shouldSendSmsOtp,
                }
              })
            ]
          }));
          dispatch(destroy('fundTransfer'));
          dispatch(destroy('addPayee'));
        } else if (transType === 'fundTransferRemittance') {
          dispatch(NavigationActions.navigate({
            routeName: 'RemittanceTransferConfirmation',
            params: {
              formValues,
              payee,
              resData,
              shouldSendSmsOtp,
              isKyc,
              dataTransactionRemittance
            }
          }));
          dispatch(destroy('remittanceTransfer'));
          dispatch(actionCreators.clearExchangeCurrency());
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

export function setupFundTransferSetLimit (payeeNumber, payeeName, bank, currency, id, targetType, transferType, accountType) {
  return (dispatch) => (dispatch(populateConfigData())).
    then(() => {
      dispatch(actionCreators.hideSpinner());
      dispatch(NavigationActions.navigate({
        routeName: 'SetEditLimitFundTransfer',
        params: {
          payeeNumber, payeeName, bank, currency, id, targetType, transferType, accountType
        }
      }));
    }).
    catch((err) => {
      dispatch(actionCreators.hideSpinner());
      const errorMessage = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_SETUP_TRANSFER);
      Toast.show(errorMessage, Toast.LONG);
    });
}

export function popUpSetLimitShortCut (payeeNumber, payeeName, bank, currency, id, targetType, transferType, accountType, uriImg) {
  return (dispatch) => {
    const nextSetLimit = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      dispatch(setupFundTransferSetLimit(payeeNumber, payeeName, bank, currency, id, targetType, transferType, accountType));
    };
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const uriImage = uriImg;
    const sinarmasModalOptions = {
      text: language.DISCLAIMER_SET_LIMIT_POP_UP,
      button1: 'OK',
      onButton1Press: nextSetLimit,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'DELETE', uriImage}));
  };
}

export function setupFundTransferSetLimitConfirm (payee) {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    return (dispatch(populateConfigData())).
      then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate({
          routeName: 'SetLimitFromTransferConfirmation',
          params: {
            payee
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

export function setupFromSetLimit (name, accountNumber, accountType, bank, currency, id, targetType, transferType, uriImg) {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const uriImage = uriImg;
    const sinarmasModalOptions = {
      text: language.DISCLAIMER_SET_LIMIT_POP_UP,
      button1: 'OK',
      onButton1Press: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'DELETE', uriImage}));
    return (dispatch(populateConfigData())).
      then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate({
          routeName: 'SetEditLimitFromSetLimit',
          params: {
            name, accountNumber, accountType, bank, currency, id, targetType, transferType
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
export function fromTransferFundToListLimit (payeeNumber, payeeName) {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    return (dispatch(populateConfigData())).
      then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate({
          params: {
            payeeNumber, payeeName
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

export function easyPinDataToAddLimitTransactionFund (payeeName, payeeNumber, bank, currency, id, targetType, transferType, accountType) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const debitAccountNumber = result(state, 'form.fundTransfer.values.myAccount.accountNumber', '') || result(state, 'defaultAccount.accountNumber', '');
    const debitAccountName = result(state,  'form.fundTransfer.values.myAccount.name', '') || result(state, 'defaultAccount.name', '');
    const creditAccountName = payeeName;
    const creditAccountNumber = payeeNumber;
    const limitPerDay = result(state, 'form.autoFilledSetLimitTransferFund.values.limitPerDay', '');
    const limitPerTransaction = result(state, 'form.autoFilledSetLimitTransferFund.values.limitPerTransaction', '');
    const payeeBank = bank;
    const payeeCurrency = currency;
    const payeeId = id;
    const payeeTargetType = targetType;
    const payeeTransferType = transferType;
    const payeeAccountType = accountType;
    const payload = {debitAccountNumber, debitAccountName, creditAccountNumber, creditAccountName, limitPerDay, limitPerTransaction, payeeBank, payeeCurrency, payeeId, payeeTargetType, payeeTransferType, payeeAccountType};
    dispatch(actionCreators.saveAddLimitTransaction({payload}));
    dispatch(NavigationActions.navigate({routeName: 'EasyPinSetLimitEditFund'}));
    dispatch(actionCreators.hideSpinner());
  };
}

export function easyPinDataToAddLimitTransactionConfirm (payeeName, payeeNumber, payeeTargetAccNo, payeeTargetAccName) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const debitAccountNumber = payeeName;
    const debitAccountName = payeeNumber;
    const creditAccountName = payeeTargetAccName;
    const creditAccountNumber = payeeTargetAccNo;
    const limitPerDay = result(state, 'form.autoFilledSetLimitConfirm.values.limitPerDay', '');
    const limitPerTransaction = result(state, 'form.autoFilledSetLimitConfirm.values.limitPerTransaction', '');
    const payload = {debitAccountNumber, debitAccountName, creditAccountNumber, creditAccountName, limitPerDay, limitPerTransaction};
    dispatch(actionCreators.saveAddLimitTransaction({payload}));
    dispatch(NavigationActions.navigate({routeName: 'EasyPinSetLimitEditFundConfirm'}));
    dispatch(actionCreators.hideSpinner());
  };
}

export function setupFundTransferSetLimitVerify (payeeName, payeeNumber, bank, currency, id, targetType, transferType, accountType) {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    return (dispatch(populateConfigData())).
      then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate({
          params: {
            payeeName, payeeNumber, bank, currency, id, targetType, transferType, accountType
          }
        }));
        dispatch(easyPinDataToAddLimitTransactionFund(payeeName, payeeNumber, bank, currency, id, targetType, transferType, accountType));
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        const errorMessage = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_SETUP_TRANSFER);
        Toast.show(errorMessage, Toast.LONG);
      });
  };
}

export function setupFundTransferSetLimitVerifyConfirm (payeeName, payeeNumber, payeeTargetAccNo, payeeTargetAccName) {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    return (dispatch(populateConfigData())).
      then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate({
          params: {
            payeeName,
            payeeNumber,
            payeeTargetAccNo,
            payeeTargetAccName
          }
        }));
        dispatch(easyPinDataToAddLimitTransactionConfirm(payeeName, payeeNumber, payeeTargetAccNo, payeeTargetAccName));
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        const errorMessage = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_SETUP_TRANSFER);
        Toast.show(errorMessage, Toast.LONG);
      });
  };
}

export function setupFundTransferFundTrxSetLimit (payee) {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    return (dispatch(populateConfigData())).
      then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate({

          routeName: 'FundTransferConfirmationSetLimit',
          params: {
            payee
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

export function confirmTransferSetLimit (formValues, payee, isKyc) {
  return (dispatch, getState) => {
    const transferTime = result(formValues, 'transferTime', '') === '' ? '' : moment(formValues.transferTime).format('DD MMM YYYY');
    const recurring = result(formValues, 'schedule', '') === '4' ? moment(formValues.transferTime).format('DD') : '';
    const time = {transferTime, recurring};
    const isLogin = !isEmpty(result(getState(), 'user', {}));
    const transferMethodType = isLogin ? '' : '1';
    const confirmTransferPayload = middlewareUtils.prepareConfirmTransferPayloadSetLimit(formValues, payee,  time, transferMethodType);
    const tokenConfig = result(getState(), 'config.tokenConfig', []);
    const isOwnAccount = false;
    const amount =  result(formValues, 'amount');
    const shouldSendSmsOtp = getTransactionType(amount, tokenConfig, isOwnAccount) === '0';
    let additional = [];
    if (isLogin) {
      additional = ['ipassport', 'TXID', 'lang'];
    } else {
      additional = ['TXID', 'lang', 'tokenClient', 'tokenServer', 'uniqueCode'];
    }
    if (shouldSendSmsOtp === false) {
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
        dispatch(NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({
              routeName: 'LandingSetLimit'
            }),
            NavigationActions.navigate({
              routeName: 'FundTransferConfirmationSetLimit',
              params: {
                formValues,
                payee,
                resData,
                shouldSendSmsOtp,
                isKyc,
              }
            })
          ]
        }));
        dispatch(destroy('fundTransfer'));
        dispatch(destroy('addPayee'));
        dispatch(actionCreators.hideSpinner());
      }).catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL), Toast.LONG);
      });
  };
}

export function transferSetLimit (transferFormData, payee, myAccount, type, resData, isValas = false, currencyRate, isKyc) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const transferTime = result(transferFormData, 'transferTime', '') === '' ? '' : moment(transferFormData.transferTime).format('DD MMM YYYY');
    const recurring = result(transferFormData, 'schedule', '') === '4' ? moment(transferFormData.transferTime).format('DD') : '';
    const data = {...transferFormData, transferTime, recurring};
    const sourceAccount = myAccount;
    const sourceAccountName = result(myAccount, 'name', '');
    const transferType = result(resData, 'transferTransaction.mode', '');
    const isBfr = result(resData, 'isBfr', '');
    let showTime = new Date();
    let time = '';
    const {timeConfig} = getState();
    const cutOffMsg = result(resData, 'transferTransaction.cutOffMsg', '');
    const state = getState();
    const gapTime = result(state, 'gapTimeServer', 0);
    const serverTimeNew = String(moment(showTime).add(gapTime, 'seconds').format('HH:mm'));
    const sendDate = moment(serverTimeNew, 'HH:mm').isBefore(moment(result(timeConfig, 'startTimeSkn_CUTOFF'), 'HH:mm')) && cutOffMsg === null || moment(serverTimeNew, 'HH:mm').isBefore(moment(result(timeConfig, 'startTimeRtgs_CUTOFF'), 'HH:mm')) && cutOffMsg === null
    || moment(serverTimeNew, 'HH:mm').isAfter(moment(result(timeConfig, 'startTimeSkn_CUTOFF'), 'HH:mm')) && cutOffMsg === null || moment(serverTimeNew, 'HH:mm').isAfter(moment(result(timeConfig, 'startTimeRtgs_CUTOFF'), 'HH:mm')) && cutOffMsg === null ? timeConfig.coreBusinessDateV3 : timeConfig.coreNextBusinessSknDateV3 || timeConfig.coreNextBusinessRtgsDateV3;
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
    let currency = 'IDR';
    const targetAccount = result(resData, 'transferTransaction.targetAccountObject', {});
    const isSimas = result(targetAccount, 'detailNetworkCode', '') === '153';
    const isUnknownAccount = result(targetAccount, 'accountType', '') === 'UnknownAccount' || isEmpty(result(targetAccount, 'accountType', ''));
    const targetAccountType = isSimas ?
      isUnknownAccount ? result(targetAccount, 'bankName', 'NA') : result(targetAccount, 'accountType', 'NA') :
      result(targetAccount, 'bankName', 'NA');
    const storeState = getState();
    const {amount} = transferFormData;
    const smsOtp = result(storeState, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(storeState, 'form.AuthenticateForm.values.simasToken', '');
    const transferReferenceNumber = storeState.transRefNum;
    const accountNumber = result(payee, 'payeeAccount.accountNumber', '');
    const phoneNumber = type === 'cardlessWithdrawal' ? accountNumber.substring(2, accountNumber.length) : accountNumber;
    const subheadingShow = type === 'cardlessWithdrawal' ? null : targetAccountType;
    const detailsShow = type === 'cardlessWithdrawal' ? phoneNumber : result(payee, 'payeeAccount.accNo', '') || accountNumber;
    let modalOptions = {
      heading: `${sourceAccountName}`,
      subheading: subheadingShow,
      details: detailsShow,
      amount: isValas ? `${currency} ${amount}` : `Rp ${currencyFormatter(amount)}`,
      transactionId: transferReferenceNumber,
      accountFrom: sourceAccount,
      currencyValas: isValas ? currency : currency,
      currencyRate,
      resData,
      isFundTransfer,
    };
    const allTransfers = result(storeState, 'lastFundTransactions.allTransactions', []);
    const allTransactions = result(storeState, 'lastCreditCardTransactions.allTransactions', []);
    let trxType;
    const dayRecurr = getDayName(moment(transferFormData.transferTime));
    const daySkn = getDayName(showTime);
    const initiatedTime = transferTime === '' ? daySkn + ', ' + moment(showTime).format('DD MMM YYYY') : dayRecurr + ', ' + moment(transferFormData.transferTime).format('DD MMM YYYY');
    const dataDetail = middlewareUtils.prepareDataDetailTransferSetLimit(transferFormData, payee, myAccount, type, resData, initiatedTime);
    const iscounterTrxData = result(storeState, 'counterTrxData', true);
    const isNewAccount = result(payee, 'payeeAccount.id', '') === '' || result(payee, 'payeeAccount.id', '') === null;
    dispatch(actionCreators.showPaymentModal({
      ...modalOptions,
      transactionType: trxType,
      type: 'LOADING'
    }));
    const isFavorite = result(storeState, 'billerDescFav.isFavorite', '');
    let easyPin = result(storeState, 'form.AuthenticateForm.values.easypin', '');
    const randomNumber = randomString(16);
    OBM_EncryptPassword(easyPin, randomNumber);
    if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
    const transferPayload = middlewareUtils.prepareTransferPayloadSetLimit(data, payee,
      transferReferenceNumber, easyPin,
      smsOtp, simasToken, type, isFavorite, resData, currency);
    return api.transfer(transferPayload, dispatch).then((res) => {
      const id = result(res, 'data.id', '');
      const resDataTrf = result(res, 'data', {});
      if (type === 'cardlessWithdrawal') {
        trxType = 'Cardless Withdrawal';
        dispatch(resetToDashboardFrom('TransferScreenSetLimit'));
      } else if (type === 'creditCard') {
        if (isBfr === true) {
          if (isNewAccount) {
            trxType = 'Credit Card Payment';
            dispatch(resetToDashboardFrom('TransferScreenSetLimit'));
          } else {
            trxType = 'Credit Card Payment';
            dispatch(resetToDashboardFrom('LandingSetLimit'));
          }
        }         else {
          trxType = 'Credit Card Payment';
          dispatch(NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: 'LandingSetLimit'
              })]
          }));
        }
      } else {
        if (isKyc === true) {
          trxType = 'Transfer';
          dispatch(resetToDashboardFrom('TransferScreenSetLimit'));
        } else {
          trxType = 'Transfer';
          dispatch(resetToDashboardFrom('TransferScreenSetLimit'));
        }
      }
      dispatch(actionCreators.hideSpinner());
      dispatch(actionCreators.showPaymentModal({
        ...modalOptions,
        transactionType: trxType,
        type: 'SUCCESS',
        dataDetail,
        resDataTrf
      }));
      if (isBfr === true) {
        const isBillPay = true;
        dispatch(NavigationActions.navigate({routeName: 'PaymentStatusRevampOnboarding', params: {isValas, resDataTrf, isBillPay}}));

      } else {
        dispatch(NavigationActions.navigate({routeName: type === 'creditCard' ?  'PaymentStatusRevampOnboarding' : 'PaymentStatusRevampOnboarding', params: {isValas, resDataTrf}}));
      }
      dispatch(actionCreators.clearTransRefNum());
      dispatch(refreshStorageNew());
      dispatch(updateBalances());
      dispatch(getTargetAccount());
      if (type === 'creditCard') {
        dispatch(destroy('CreditCardConfirmation'));
        dispatch(destroy('CreditCardPayment'));
        dispatch(destroy('creditcard'));
        dispatch(actionCreators.clearBillerDescFav());
        dispatch(actionCreators.updateLastCreditCardPayment(middlewareUtils.getCreditCardTransferHistory(id, payee)));
        allTransactions.push({
          accNo: result(payee, 'payeeAccount.accountNumber', ''),
          name: result(payee, 'payeeAccount.name', ''),
          bank: result(payee, 'payeeAccount.bank', ''),
          id: (id) ? id : result(payee, 'payeeAccount.id')
        });
        set(storageKeys['ALL_CREDIT_CARD_TRANSACTIONS'], allTransactions).catch((err) => {
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION), Toast.LONG);
        });
      } else {
        dispatch(destroy('fundTransfer'));
        dispatch(destroy('fundTransferSchedule'));
        dispatch(destroy('fundTransferMethod'));
        dispatch(destroy('addPayee'));
        dispatch(destroy('CardLessWithdrawalConfirmation'));
        dispatch(destroy('CardLessWithdrawalPayment'));
        dispatch(destroy('CardLessWithdrawalAccount'));
        dispatch(actionCreators.clearBillerDescFav());
        dispatch(actionCreators.updateLastTransactions(middlewareUtils.getFundTransferHistory(id, payee)));
        allTransfers.push({
          accountNumber: result(payee, 'payeeAccount.accountNumber', ''),
          name: result(payee, 'payeeAccount.name', ''),
          bank: result(payee, 'payeeAccount.bank', ''),
          id: (id) ? id : result(payee, 'payeeAccount.id')
        });
        set(storageKeys['ALL_PAYEES'], allTransfers).catch((err) => {
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_STORE_RECENT_PAYEE_DETAILS), Toast.LONG);
        });
      }
    }).
      catch((err) => {
        dispatch(getTargetAccount());
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
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
        } else {
          trxType = 'Transfer';
          if (type === 'creditCard') {
            dispatch(resetToDashboardFrom('LandingSetLimit'));
          } else {
            dispatch(resetToDashboardFrom('TransferScreenSetLimit'));
          }
          dispatch(actionCreators.hideSpinner());
          if (isBfr === true) {
            const isBillPay = true;
            dispatch(NavigationActions.navigate({routeName: 'PaymentStatusRevampOnboarding', params: {isValas, isBillPay}}));
          } else {
            dispatch(NavigationActions.navigate({routeName: 'PaymentStatusRevampOnboarding', params: {isValas}}));
          }
          const resultDisplay = result(err, 'data.result.displayList', []);
          const errorText = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_TRANSFER);
          if (err.AddPayeeFailed) {
            modalOptions = {...modalOptions,
              transactionType: 'Add Payee'
            };
          } else if (type === 'creditCard') {
            modalOptions = {...modalOptions,
              transactionType: trxType
            };
            dispatch(destroy('CreditCardConfirmation'));
            dispatch(destroy('CreditCardPayment'));
            dispatch(destroy('creditcard'));
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
          dispatch(errorResponseResult(err, modalOptions, resultDisplay, errorText, result(myAccount, {})));
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


export function goToEditSetLimitFundTransfer (payeeName, payeeNumber, bank, currency, id, targetType, transferType, accountType) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const transRefNum = result(state, 'transRefNum');
    let easyPin = result(state, 'form.SetLimitEasyPinEditFund.values.easyPinsetLimit', '');
    const randomNumber = randomString(16);
    OBM_EncryptPassword(easyPin, randomNumber);
    if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
    const mPinInputed = result(state, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(state, 'form.AuthenticateForm.values.simasToken', '');
    const ipassport = result(getState(), 'user.ipassport', '');
    const debitAccountNumber = result(state, 'setLimitTransactionAdd.payload.payload.debitAccountNumber', '');
    const debitAccountName = result(state, 'setLimitTransactionAdd.payload.payload.debitAccountName', '');
    const creditAccountNumber = result(state, 'setLimitTransactionAdd.payload.payload.creditAccountNumber', '');
    const creditAccountName =  result(state, 'setLimitTransactionAdd.payload.payload.creditAccountName', '');
    const limitPerDay = result(state, 'setLimitTransactionAdd.payload.payload.limitPerDay', 0).toString();
    const limitPerTransaction = result(state, 'setLimitTransactionAdd.payload.payload.limitPerTransaction', 0).toString();
    const lang = result(state, 'currentLanguage.id', 'en');
    const payload = {easyPin, transRefNum, simasToken, ipassport, creditAccountNumber, debitAccountNumber, limitPerDay, limitPerTransaction, lang, mPinInputed, creditAccountName, debitAccountName};
    return api.addLimitTransaction(payload, dispatch).then(() => {
      dispatch(actionCreators.hideSpinner());
      dispatch(NavigationActions.navigate());
      dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'FundTransferPaymentFromSetLimit',
            params: {
              payeeName, payeeNumber, bank, currency, id, targetType, transferType, accountType, debitAccountName, debitAccountNumber}
          }),
        ]
      }));
    }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_SEND_SMS_VERIFICATION), Toast.LONG);
      });
  };
}

export function confirmTransferFromSetLimit (formValues, payee, transType, getCurrency, currencyRate, newformValues, isValas = false, isKyc) {
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
                routeName: 'FundTransferConfirmationFromSetLimit',
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

export function getPayeeNameBiFast (biFastProxy, isBiFast) {
  return (dispatch, getState) => {
    const {bank = {}, payeeAccNo = ''} = result(getState(), 'form.addPayee.values', {});
    const accountList = getTransferPossibleAccountsBIFast(result(getState(), 'accounts', []), 'ft');
    const regex = /(^[0-9a-zA-Z]*$)/;
    const isProxy = regex.test(biFastProxy);
    const proxyType = isProxy ? '01' : '02';
    const accNo = result(accountList, '[0].accountNumber');
    const isLogin = !isEmpty(result(getState(), 'user', {}));
    const transferMethodType = isLogin ? '' : '1';

    let additional = [];
    if (isLogin) {
      additional = ['ipassport', 'TXID', 'lang'];
    } else {
      additional = ['TXID', 'lang', 'tokenClient', 'tokenServer', 'transferMethodType'];
    }
    if (isEmpty(bank) && payeeAccNo === '') {
      dispatch(change('addPayee', 'payeeName', ''));
      const payload = middlewareUtils.prepareGetPayeeNameBiFast({
        accountNumber: accNo,
        transferMethodType,
        biFastProxy,
        proxyType,
      });
      dispatch(actionCreators.showSpinner());
      return api.getPayeeNameBiFast(payload, additional, dispatch).then((payeeDetails) => {
        const payeeStatus = result(payeeDetails, 'data', {});
        dispatch(actionCreators.savePayeeBiFast(payeeStatus));
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate({routeName: 'AddPayee', params: {biFastProxy, isBiFast, proxyType, accNo}}));
      }).catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__ERROR_GETTING_PAYEE_NAME), Toast.LONG);
      });
    }
  };
}

export function deleteSelectedPayeeBiFast (payee) {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goDelete = () => {
      const proxyType = result(payee, 'proxyType', '');
      const proxyValue = result(payee, 'proxyValue', '');
      const payload = {proxyType, proxyValue};
      dispatch(actionCreators.hideSinarmasAlert());
      return api.deleteFromPayeeListBiFast(payload, dispatch).
        then(() => {
          dispatch(getTargetAccountProxyAddress()).then(() => {
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

export function popUpInBank (res) {
  return (dispatch) => {
    const responseMessageHeader = result(res, 'bifastMessageHeader', '');
    const responseMessageTitle = result(res, 'bifastMessageTitle', '');
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
