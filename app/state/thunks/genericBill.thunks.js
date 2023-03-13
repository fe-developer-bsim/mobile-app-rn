import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import result from 'lodash/result';
import * as middlewareUtils from '../../utils/middleware.util';
import {
  getErrorMessage,
  currencyFormatter,
  getTransactionType,
  generalCode,
} from '../../utils/transformer.util';
import {StackActions, NavigationActions} from 'react-navigation';
import {Toast} from '../../utils/RNHelpers.util.js';
import {destroy, reset} from 'redux-form';
import {language} from '../../config/language';
import isEmpty from 'lodash/isEmpty';
import {
  OtherResponseInquiry,
  errorResponseResult,
  inquirySimasPoin,
  getBillpayHistory,
  couponCustomerCounting,
  triggerAuthNavigate,
  assembleDataForDashboard,
  clearFromdeeplinkState,
  refreshStorageNew,
  getTransRefNumAndOTPNavigate,
  updateBalances,
  getSimasPoinLogin,
} from './common.thunks';
import {
  login,
  prepareGoDashboard,
  getBalanceEmoneyBeforeLogin,
} from './onboarding.thunks';
import moment from 'moment';
import find from 'lodash/find';
import {logout} from './onboarding.thunks.js';
import {getDefaultEmoney} from '../../utils/storage.util';
import lowerCase from 'lodash/lowerCase';
import indexOf from 'lodash/indexOf';
// import firebase from 'react-native-firebase';
// import {Platform} from 'react-native';

import {getLuckyDipTicket} from './luckyDip.thunks';
import md5 from 'md5';
import toLower from 'lodash/toLower';
import {popUpRewardMgm} from './common.thunks';
import {getAutodebitList} from './dashboard.thunks';

// let Analytics = firebase.analytics();

// DONE, Aetra
export function getAmountForGenericBillerTypeOne(
  subscriberNo,
  selectedBiller,
  favBiller,
  dataEtax,
) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const isFromAD = result(state, 'flagAutoDebit.isAddNew', false);
    const billpayMethodType = isLogin ? null : '1';
    const isEtax = result(dataEtax, 'isEtax', false);
    const payload = {
      billpayMethodType,
      isFromAD,
      ...middlewareUtils.prepareGenericBillerTypeOneEnquiryPayload({
        subscriberNo,
        selectedBiller,
      }),
    };
    dispatch(actionCreators.showSpinner());
    if (isLogin) {
      return api
        .enquireGenericBill(payload, dispatch)
        .then(res => {
          dispatch(actionCreators.hideSpinner());
          if (isEtax) {
            dispatch(
              NavigationActions.navigate({
                routeName: 'IdBillingFormPayment',
                params: {
                  subscriberNo,
                  billDetails: res.data,
                  dataConfirmation: dataEtax.dataConfirmation,
                  biller: selectedBiller,
                  favBiller: favBiller,
                },
              }),
            );
          } else {
            dispatch(
              NavigationActions.navigate({
                routeName: 'BillerTypeOnePayment',
                params: {
                  subscriberNo,
                  billDetails: res.data,
                  biller: selectedBiller,
                  favBiller: favBiller,
                },
              }),
            );
          }
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          const defaultMessage =
            language.ERROR_MESSAGE__COULD_NOT_GET_AMOUNT_GENERIC_BILLER;
          OtherResponseInquiry(err, defaultMessage);
        });
    } else {
      return api
        .enquireGenericBill(payload, dispatch)
        .then(res => {
          dispatch(actionCreators.saveInquiryBiller({res}));
          return res;
        })
        .then(res => {
          dispatch(actionCreators.hideSpinner());
          if (isEtax) {
            dispatch(
              NavigationActions.navigate({
                routeName: 'IdBillingFormPayment',
                params: {
                  subscriberNo,
                  billDetails: res.data,
                  dataConfirmation: dataEtax.dataConfirmation,
                  biller: selectedBiller,
                  favBiller: favBiller,
                },
              }),
            );
          } else {
            dispatch(
              NavigationActions.navigate({
                routeName: 'BillerTypeOnePayment',
                params: {
                  subscriberNo,
                  billDetails: res.data,
                  biller: selectedBiller,
                  favBiller: favBiller,
                },
              }),
            );
          }
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          const defaultMessage =
            language.ERROR_MESSAGE__COULD_NOT_GET_AMOUNT_GENERIC_BILLER;
          OtherResponseInquiry(err, defaultMessage);
        });
    }
  };
}

export function confirmGenericBillTypeOne(data, fromConfirmationPage = false) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const isUsingVoucherUI = result(state, 'isUsingVoucherUI', '0');
    const values = result(data, 'values', {});
    const isEtax = result(data, 'isEtax', false);
    const etaxAmount = result(data, 'values.jumlahSetor', '');
    const etaxDesc = result(data, 'values.berita', '');
    const isUseSimas = result(values, 'accountNo.isUseSimas');
    const biller = result(data, 'biller', '');
    const checkingCIF = result(state, 'checkingCIFbeforeLogin', false);
    const limitBeforeLogin = result(
      state,
      'config.limitConfigAutoDebetAccount',
      '',
    );
    const searchIndexComma = indexOf(limitBeforeLogin, ',');
    const setLimitCIF = checkingCIF
      ? limitBeforeLogin.substring(0, searchIndexComma)
      : limitBeforeLogin.substring(
          searchIndexComma + 1,
          limitBeforeLogin.length,
        );
    const idAccountSelected = result(values, 'accountNo.id', '');
    const allAccounts = result(state, 'accounts', []);
    const flagEmoneyraw = find(allAccounts, function (val) {
      const productAccountName = result(val, 'id', '');
      return idAccountSelected === productAccountName;
    });
    const isDefaultAccount = find(allAccounts, function (val) {
      const productDefault = lowerCase(result(val, 'isDefaultAccount', ''));
      return productDefault === 'yes';
    });
    const switchAccountToogleBE =
      toLower(result(state, 'config.flag.primaryToogleAccount', 'inactive')) ===
      'active';
    const flagEmoney =
      result(flagEmoneyraw, 'accountType', '') === 'emoneyAccount';
    const allAmount = result(data, 'resDataTemp.amount', 0);
    const defaultToogle = result(state, 'primaryToogleAccount', false);
    const checkBalance = !isLogin
      ? result(state, 'defaultAccount.balances.availableBalance', '')
      : result(values, 'accountNo.balances.availableBalance', '');
    const checkAmountBalanceFLag =
      Number(setLimitCIF) < Number(allAmount)
        ? false
        : Number(checkBalance) < Number(allAmount);
    const selectedAccount =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      !isLogin &&
      checkAmountBalanceFLag
        ? isDefaultAccount
        : result(values, 'accountNo', '');
    const selectedAccountIdCoupon =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      !isLogin &&
      checkAmountBalanceFLag
        ? String(result(isDefaultAccount, 'id', ''))
        : String(result(values, 'accountNo.id', ''));
    const subscriberNo = result(data, 'subscriberNo', '');
    const billAmount = result(values, 'billAmount', '');
    const uniqueCode = result(data, 'uniqueCode', '');
    const billpayMethodType = isLogin ? null : '1';
    const numberRandom = result(state, 'inquiryBL.res.data.numberRandom', 0);
    const description = isEtax
      ? etaxDesc
      : result(state, 'form.BillerTypeOneIndexForm.values.description', '');
    const amount = isEtax
      ? etaxAmount
      : result(data, 'typeVA', '') !== 'CLOSED'
      ? result(values, 'amount', '')
      : result(values, 'billAmount', '');
    const isNewBiller = result(data, 'isNewBiller', true);
    const nextRun = result(data, 'autoDebitDate', '');
    const payload = {
      billpayMethodType,
      numberRandom,
      nextRun,
      ...middlewareUtils.prepareGenericBillerTypeOnePayload({
        biller,
        selectedAccount,
        subscriberNo,
        description,
        amount,
        billAmount,
        uniqueCode,
      }),
    };
    dispatch(actionCreators.showSpinner());
    if (isUsingVoucherUI !== '1') {
      if (!fromConfirmationPage) {
        dispatch(actionCreators.deleteCoupon());
      }
    }
    dispatch(actionCreators.saveBillerDescFav({description: description}));
    return api
      .confirmGenericBill(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.deleteUsingCouponUI());
        const resData = result(res, 'data', {});
        const billerCode = result(biller, 'billerPreferences.code', '');
        dispatch(actionCreators.savebillerCode({billerCode}));
        const type = 'billPayment';
        const transactionAmount = result(
          resData,
          'amountNumber',
          '0',
        ).toString();
        const billpayMethodType = isLogin ? null : '1';
        const payloadCoupon = {
          billerCode,
          type,
          transactionAmount,
          billpayMethodType,
          accountId: selectedAccountIdCoupon,
        };
        const transRefNum = result(state, 'transRefNum', '');
        const ownership = result(state, 'couponCheck.ownership', '');
        const voucherId = result(state, 'couponCheck.voucherId', '').toString();
        const payloadCouponCheckingValidity = {
          transactionAmount,
          transRefNum,
          voucherId,
          type,
          ownership,
          billerCode,
          billpayMethodType,
          accountId: selectedAccountIdCoupon,
        };
        const routeName = isEtax
          ? 'IdBillingFormPaymentConfirmation'
          : 'BillerTypeOneConfirmation';
        const navigation = {
          routeName: routeName,
          formIndex: 'BillerTypeOneIndexForm',
          formPayment: 'BillerTypeOnePayment',
          params: {
            isUseSimas,
            subscriberNo,
            biller,
            ...values,
            resData,
            confirmData: data,
            isNewBiller,
          },
        };
        if (isLogin) {
          dispatch(
            getVoucher(
              [],
              payloadCoupon,
              payloadCouponCheckingValidity,
              navigation,
              false,
              fromConfirmationPage,
              isUseSimas,
            ),
          );
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL),
          Toast.LONG,
        );
      });
  };
}

export function detailGenericBillTypeOne(data) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const isUsingVoucherUI = result(state, 'isUsingVoucherUI', '0');
    const values = result(data, 'values', {});
    const isEtax = result(data, 'isEtax', false);
    const biller = result(data, 'biller', '');
    const selectedAccount = result(values, 'accountNo', '');
    const subscriberNo = result(data, 'subscriberNo', '');
    const description = isEtax
      ? etaxDesc
      : result(state, 'form.BillerTypeOneIndexForm.values.description', '');
    const amount = isEtax
      ? result(data, 'etaxAmount', 0)
      : result(data, 'typeVA', '') !== 'CLOSED'
      ? result(values, 'amount', '')
      : result(values, 'billAmount', '');
    const etaxDesc = result(data, 'values.berita', '');
    const billAmount = result(values, 'billAmount', '');
    const uniqueCode = result(data, 'uniqueCode', '');
    const numberRandom = result(state, 'inquiryBL.res.data.numberRandom', 0);
    const isNewBiller = result(data, 'isNewBiller', true);
    const payload = {
      billpayMethodType: '1',
      numberRandom,
      ...middlewareUtils.prepareGenericBillerTypeOnePayload({
        biller,
        selectedAccount,
        subscriberNo,
        description,
        amount,
        billAmount,
        uniqueCode,
      }),
    };
    dispatch(actionCreators.showSpinner());
    if (isUsingVoucherUI !== '1') {
      dispatch(actionCreators.deleteCoupon());
    }
    dispatch(actionCreators.saveBillerDescFav({description: description}));
    return api
      .detailGenericBill(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.deleteUsingCouponUI());
        const resData = result(res, 'data', {});
        const billerCode = result(biller, 'billerPreferences.code', '');
        dispatch(actionCreators.savebillerCode({billerCode}));
        const selectedAccountCoupon = String(
          result(values, 'accountNo.id', ''),
        );
        const type = 'billPayment';
        const transactionAmount = result(
          resData,
          'amountNumber',
          '0',
        ).toString();
        const billpayMethodType = isLogin ? null : '1';
        const payloadCoupon = {
          billerCode,
          type,
          transactionAmount,
          billpayMethodType,
          accountId: selectedAccountCoupon,
        };
        const transRefNum = result(state, 'transRefNum', '');
        const ownership = result(state, 'couponCheck.ownership', '');
        const voucherId = result(state, 'couponCheck.voucherId', '').toString();
        const payloadCouponCheckingValidity = {
          transactionAmount,
          transRefNum,
          voucherId,
          type,
          ownership,
          billerCode,
          billpayMethodType,
          accountId: selectedAccountCoupon,
        };
        const routeName = isEtax
          ? 'IdBillingFormPaymentConfirmation'
          : 'BillerTypeOneConfirmation';
        const navigation = {
          routeName: routeName,
          formIndex: 'BillerTypeOneIndexForm',
          formPayment: 'BillerTypeOnePayment',
          params: {
            subscriberNo,
            biller,
            ...values,
            resData,
            confirmData: data,
            isNewBiller,
          },
        };
        dispatch(
          getVoucher(
            [],
            payloadCoupon,
            payloadCouponCheckingValidity,
            navigation,
            false,
          ),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        dispatch(clearFromdeeplinkState());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL),
          Toast.LONG,
        );
      });
  };
}

export function payGenericBillTypeOne(objectData, isBillPay) {
  return (dispatch, getState) => {
    const storeState = getState();
    const resData = result(objectData, 'resData', {});
    const smsOtp = result(storeState, 'form.AuthenticateForm.values.otp', '');
    const easyPin = result(
      storeState,
      'form.AuthenticateForm.values.easypin',
      '',
    );
    const simasToken = result(
      storeState,
      'form.AuthenticateForm.values.simasToken',
      '',
    );
    const biller = result(objectData, 'biller', '');
    const checkingCIF = result(storeState, 'checkingCIFbeforeLogin', false);
    const limitBeforeLogin = result(
      storeState,
      'config.limitConfigAutoDebetAccount',
      '',
    );
    const searchIndexComma = indexOf(limitBeforeLogin, ',');
    const setLimitCIF = checkingCIF
      ? limitBeforeLogin.substring(0, searchIndexComma)
      : limitBeforeLogin.substring(
          searchIndexComma + 1,
          limitBeforeLogin.length,
        );
    const amount = result(objectData, 'amount', '');
    const billAmount = result(objectData, 'billAmount', '');
    const idAccountSelected = result(objectData, 'accountNo.id', '');
    const allAccounts = result(storeState, 'accounts', []);
    const flagEmoneyraw = find(allAccounts, function (val) {
      const productAccountName = result(val, 'id', '');
      return idAccountSelected === productAccountName;
    });
    const isDefaultAccount = find(allAccounts, function (val) {
      const productDefault = lowerCase(result(val, 'isDefaultAccount', ''));
      return productDefault === 'yes';
    });
    const switchAccountToogleBE =
      toLower(
        result(storeState, 'config.flag.primaryToogleAccount', 'inactive'),
      ) === 'active';
    const flagEmoney =
      result(flagEmoneyraw, 'accountType', '') === 'emoneyAccount';
    const allAmount = result(objectData, 'resData.amount', 0);
    const defaultToogle = result(storeState, 'primaryToogleAccount', false);
    const checkBalance = isBillPay
      ? result(storeState, 'defaultAccount.balances.availableBalance', '')
      : result(objectData, 'accountNo.balances.availableBalance', '');
    const checkAmountBalanceFLag =
      Number(setLimitCIF) < Number(allAmount)
        ? false
        : Number(checkBalance) < Number(allAmount);
    const selectedAccount =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      isBillPay &&
      checkAmountBalanceFLag
        ? isDefaultAccount
        : result(objectData, 'accountNo', '');
    const isUseSimas = result(selectedAccount, 'isUseSimas');
    const subscriberNo = result(objectData, 'subscriberNo', '');
    const billerList = result(objectData, 'resData.result.displayList', []);
    const isTokopedia =
      result(biller, 'billerPreferences.code', '') === '810133';
    // const code = result(biller, 'billerPreferences.code', '');
    const transRefNum = storeState.transRefNum;
    const lang = result(storeState, 'currentLanguage.id', 'id');
    const isFavorite = result(storeState, 'billerDescFav.isFavorite', '');
    const billerFavorite = result(storeState, 'billerFavorite', {});
    const descFav = find(
      billerFavorite,
      fav => subscriberNo === fav.subscriberNo,
    );
    const descInput =
      result(descFav, 'description', '') === ''
        ? result(objectData, 'resData.descInput', '')
        : result(descFav, 'description', '');
    let description = '';
    if (isFavorite === 'yes') {
      description =
        result(storeState, 'billerDescFav.description', '') === ''
          ? descInput
          : result(storeState, 'billerDescFav.description', '');
    } else {
      description =
        result(storeState, 'billerDescFav.description', '') === ''
          ? result(objectData, 'resData.descInput', '')
          : result(storeState, 'billerDescFav.description', '');
    }
    const transactionType =
      lang === 'id'
        ? language.GENERIC_BILLER__PAYMENT + biller.name
        : biller.name + language.GENERIC_BILLER__PAYMENT;
    const payloadRaw = middlewareUtils.prepareGenericBillerTypeOnePayload({
      smsOtp,
      simasToken,
      subscriberNo,
      biller,
      amount,
      billAmount,
      selectedAccount,
      transRefNum,
      description,
      isFavorite,
      easyPin,
    });
    const voucherId = result(
      storeState,
      'couponCheck.voucherId',
      '',
    ).toString();
    const ownership = result(storeState, 'couponCheck.ownership', '');
    const additionalInfoMap = {voucherId, ownership};
    const isAutoDebet = result(storeState, 'flagAutoDebit.isRegular', false);
    const nextRun = result(objectData, 'nextAutodebit', '');
    const autoDebitDate = result(storeState, 'flagAutoDebit.date', '');
    const autoDebitStartDate = moment(nextRun, 'YYYY-MM-DD').format(
      'DD MMM YYYY',
    );
    const payload = {...payloadRaw, additionalInfoMap, ownership, isAutoDebet};
    const isGenericBiller = 'yes';
    const custPoin = result(storeState, 'couponCheck.custPoin', '');
    const custPoinCurrenncy = result(storeState, 'couponCheck.currency', '');
    const iscounterTrxData = result(storeState, 'counterTrxData', true);
    const isNewBiller = result(objectData, 'isNewBiller', true);
    const modalOptions = {
      heading: `${subscriberNo}`,
      subheading: `${biller.name}`,
      amount: `Rp ${currencyFormatter(payload.billAmount)}`,
      transactionType,
      transactionId: transRefNum,
      accountFrom: selectedAccount,
      billerList: billerList,
      resData: resData,
      isGenericBiller,
      custPoin,
      generalCode: generalCode(objectData),
      isUseSimas,
      custPoinCurrenncy,
      isAutodebitRegis: isAutoDebet,
      autoDebitStartDate,
      autoDebitDate,
      isNewBiller,
    };
    const descriptionCouponSuccess = result(
      storeState,
      'couponCheck.description',
      '',
    );
    const flagMgm = result(storeState, 'config.hideNotifMGM', '');
    const flagMgmOn = lowerCase(flagMgm) === 'yes';
    dispatch(actionCreators.saveCouponSuccessStatus(descriptionCouponSuccess));
    dispatch(
      actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}),
    );
    dispatch(actionCreators.showSpinner());
    return api
      .resultGenericBill(payload, dispatch)
      .then(res => {
        const transRefNum = result(res, 'data.transRefNum', '');
        const subs1 = transRefNum.substring(6, 8);
        const ipassport = result(
          storeState,
          'additionalApiPayload.ipassport',
          '',
        );
        const subs2 = transRefNum.substring(
          transRefNum.length - 2,
          transRefNum.length,
        );
        const subs3 = ipassport.substring(4, 9);
        const transactionCode = subs1 + subs2 + subs3;
        const respon = result(res, 'data.responseCode', '');
        const code = md5(transactionCode);
        const checkCode = result(res, 'data.checkingCode', '');
        const uniCode = code === checkCode;
        dispatch(actionCreators.hideSpinner());
        if (respon === '00' && uniCode) {
          if (voucherId !== '' || isUseSimas) {
            dispatch(inquirySimasPoin());
          }
          if (isBillPay) {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
                params: {isBillPay},
              }),
            );
          } else {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
              }),
            );
          }
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          // const billCode = code.concat('-Success');
          // const os = Platform.OS;
          // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
          dispatch(getBillpayHistory());
          const resultDisplay = result(res, 'data.result.displayList', []);
          if (iscounterTrxData === false) {
            dispatch(refreshStorageNew());
          } else {
            dispatch(updateBalances());
            dispatch(getLuckyDipTicket());
          }
          dispatch(couponCustomerCounting());
          dispatch(
            actionCreators.showPaymentModal({
              ...modalOptions,
              resultDisplay,
              type: 'SUCCESS',
            }),
          );
          dispatch(destroy('BillerTypeOneIndexForm'));
          dispatch(destroy('BillerTypeOnePayment'));
          dispatch(destroy('BillerTypeOneConfirmationForm'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.deleteCoupon());
          dispatch(actionCreators.clearBillerDescFav());
          dispatch(actionCreators.clearPGOStatus());
        } else {
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
          }
        }
      })
      .catch(err => {
        // const billCode = code.concat('-Failes');
        // const os = Platform.OS;
        // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
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
          dispatch(actionCreators.hideSpinner());
          dispatch(getBillpayHistory());
          if (isBillPay) {
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
                params: {isBillPay},
              }),
            );
          } else {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
              }),
            );
          }
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          const resultDisplay = result(err, 'data.result.displayList', []);
          const responseCode = result(err, 'data.responseCode', '');
          let errorText = getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_PAY_BILL,
          );
          if (responseCode === '98' && isTokopedia) {
            errorText = language.RESPONSE_MESSAGE__RC_98_WIFI_ID;
          } else if (responseCode === '51') {
            errorText = language.RESPONSE_MESSAGE__RC_51;
          }
          dispatch(
            errorResponseResult(
              err,
              modalOptions,
              resultDisplay,
              errorText,
              selectedAccount,
            ),
          );
          dispatch(destroy('BillerTypeOneIndexForm'));
          dispatch(destroy('BillerTypeOnePayment'));
          dispatch(destroy('BillerTypeOneConfirmationForm'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.deleteCoupon());
          dispatch(actionCreators.clearBillerDescFav());
          dispatch(actionCreators.clearPGOStatus());
        }
      });
  };
}

export function payBillerEtax(objectData, isBillPay) {
  return (dispatch, getState) => {
    const storeState = getState();
    const resData = result(objectData, 'resData', {});
    const smsOtp = result(storeState, 'form.AuthenticateForm.values.otp', '');
    const easyPin = result(
      storeState,
      'form.AuthenticateForm.values.easypin',
      '',
    );
    const simasToken = result(
      storeState,
      'form.AuthenticateForm.values.simasToken',
      '',
    );
    const biller = result(objectData, 'biller', '');
    const checkingCIF = result(storeState, 'checkingCIFbeforeLogin', false);
    const limitBeforeLogin = result(
      storeState,
      'config.limitConfigAutoDebetAccount',
      '',
    );
    const searchIndexComma = indexOf(limitBeforeLogin, ',');
    const setLimitCIF = checkingCIF
      ? limitBeforeLogin.substring(0, searchIndexComma)
      : limitBeforeLogin.substring(
          searchIndexComma + 1,
          limitBeforeLogin.length,
        );
    const amount = result(objectData, 'amount', '');
    const billAmount = result(objectData, 'billAmount', '');
    const idAccountSelected = result(objectData, 'accountNo.id', '');
    const allAccounts = result(storeState, 'accounts', []);
    const flagEmoneyraw = find(allAccounts, function (val) {
      const productAccountName = result(val, 'id', '');
      return idAccountSelected === productAccountName;
    });
    const isDefaultAccount = find(allAccounts, function (val) {
      const productDefault = lowerCase(result(val, 'isDefaultAccount', ''));
      return productDefault === 'yes';
    });
    const switchAccountToogleBE =
      toLower(
        result(storeState, 'config.flag.primaryToogleAccount', 'inactive'),
      ) === 'active';
    const flagEmoney =
      result(flagEmoneyraw, 'accountType', '') === 'emoneyAccount';
    const allAmount = result(objectData, 'resData.amount', 0);
    const defaultToogle = result(storeState, 'primaryToogleAccount', false);
    const checkBalance = isBillPay
      ? result(storeState, 'defaultAccount.balances.availableBalance', '')
      : result(objectData, 'accountNo.balances.availableBalance', '');
    const checkAmountBalanceFLag =
      Number(setLimitCIF) < Number(allAmount)
        ? false
        : Number(checkBalance) < Number(allAmount);
    const selectedAccount =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      isBillPay &&
      checkAmountBalanceFLag
        ? isDefaultAccount
        : result(objectData, 'accountNo', '');
    const isUseSimas = result(selectedAccount, 'isUseSimas');
    const subscriberNo = result(objectData, 'subscriberNo', '');
    const billerList = result(objectData, 'resData.result.displayList', []);
    const isTokopedia =
      result(biller, 'billerPreferences.code', '') === '810133';
    // const code = result(biller, 'billerPreferences.code', '');
    const transRefNum = storeState.transRefNum;
    const lang = result(storeState, 'currentLanguage.id', 'id');
    const isFavorite = result(storeState, 'billerDescFav.isFavorite', '');
    const billerFavorite = result(storeState, 'billerFavorite', {});
    const descFav = find(
      billerFavorite,
      fav => subscriberNo === fav.subscriberNo,
    );
    const descInput =
      result(descFav, 'description', '') === ''
        ? result(objectData, 'resData.descInput', '')
        : result(descFav, 'description', '');
    let description = '';
    if (isFavorite === 'yes') {
      description =
        result(storeState, 'billerDescFav.description', '') === ''
          ? descInput
          : result(storeState, 'billerDescFav.description', '');
    } else {
      description =
        result(storeState, 'billerDescFav.description', '') === ''
          ? result(objectData, 'resData.descInput', '')
          : result(storeState, 'billerDescFav.description', '');
    }
    const transactionType =
      lang === 'id'
        ? language.GENERIC_BILLER__PAYMENT + ' ' + biller.name
        : biller.name + language.GENERIC_BILLER__PAYMENT;
    const payloadRaw = middlewareUtils.prepareGenericBillerTypeOnePayload({
      smsOtp,
      simasToken,
      subscriberNo,
      biller,
      amount,
      billAmount,
      selectedAccount,
      transRefNum: '',
      description,
      isFavorite,
      easyPin,
    });
    const voucherId = result(
      storeState,
      'couponCheck.voucherId',
      '',
    ).toString();
    const ownership = result(storeState, 'couponCheck.ownership', '');
    const additionalInfoMap = {voucherId, ownership};
    const isAutoDebet = result(storeState, 'flagAutoDebit.isRegular', false);
    const nextRun = result(objectData, 'nextAutodebit', '');
    const autoDebitDate = result(storeState, 'flagAutoDebit.date', '');
    const autoDebitStartDate = moment(nextRun, 'YYYY-MM-DD').format(
      'DD MMM YYYY',
    );
    const payload = {...payloadRaw, additionalInfoMap, ownership, isAutoDebet};
    const isGenericBiller = 'yes';
    const custPoin = result(storeState, 'couponCheck.custPoin', '');
    const custPoinCurrenncy = result(storeState, 'couponCheck.currency', '');
    const iscounterTrxData = result(storeState, 'counterTrxData', true);
    const etaxData = result(objectData, 'confirmData', {});
    const isNewBiller = result(objectData, 'isNewBiller', true);
    const modalOptions = {
      heading: `${subscriberNo}`,
      subheading: `${biller.name}`,
      amount: `Rp ${currencyFormatter(payload.billAmount)}`,
      transactionType,
      transactionId: transRefNum,
      accountFrom: selectedAccount,
      billerList: billerList,
      resData: resData,
      isGenericBiller,
      custPoin,
      generalCode: generalCode(objectData),
      isUseSimas,
      custPoinCurrenncy,
      etaxData,
      isAutodebitRegis: isAutoDebet,
      autoDebitStartDate,
      autoDebitDate,
      isNewBiller,
    };
    const descriptionCouponSuccess = result(
      storeState,
      'couponCheck.description',
      '',
    );
    const flagMgm = result(storeState, 'config.hideNotifMGM', '');
    const flagMgmOn = lowerCase(flagMgm) === 'yes';
    dispatch(actionCreators.saveCouponSuccessStatus(descriptionCouponSuccess));
    dispatch(
      actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}),
    );
    const isEtax = result(objectData, 'confirmData.isEtax', false);
    dispatch(actionCreators.showSpinner());
    return api
      .resultGenericBill(payload, dispatch)
      .then(res => {
        const etaxPaymentData = result(res, 'data.billPaymentMap', {});
        const transRefNum = result(res, 'data.transRefNum', '');
        const subs1 = transRefNum.substring(6, 8);
        const ipassport = result(
          storeState,
          'additionalApiPayload.ipassport',
          '',
        );
        const subs2 = transRefNum.substring(
          transRefNum.length - 2,
          transRefNum.length,
        );
        const subs3 = ipassport.substring(4, 9);
        const transactionCode = subs1 + subs2 + subs3;
        const respon = result(res, 'data.responseCode', '');
        const code = md5(transactionCode);
        const checkCode = result(res, 'data.checkingCode', '');
        const uniCode = code === checkCode;
        dispatch(actionCreators.hideSpinner());
        if (respon === '00' && uniCode) {
          if (voucherId !== '' || isUseSimas) {
            dispatch(inquirySimasPoin());
          }
          const routeName = isEtax
            ? 'NewPaymentStatusNewOnboarding'
            : 'PaymentStatusNewOnboarding';

          if (isBillPay) {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: routeName,
                params: {isBillPay},
              }),
            );
          } else {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(NavigationActions.navigate({routeName: routeName}));
          }
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          // const billCode = code.concat('-Success');
          // const os = Platform.OS;
          // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
          dispatch(getBillpayHistory());
          const resultDisplay = result(res, 'data.result.displayList', []);
          if (iscounterTrxData === false) {
            dispatch(refreshStorageNew());
          } else {
            dispatch(updateBalances());
            dispatch(getLuckyDipTicket());
          }
          dispatch(couponCustomerCounting());
          dispatch(
            actionCreators.showPaymentModal({
              ...modalOptions,
              resultDisplay,
              etaxPaymentData,
              type: 'SUCCESS',
            }),
          );
          dispatch(destroy('BillerTypeOneIndexForm'));
          dispatch(destroy('BillerTypeOnePayment'));
          dispatch(destroy('BillerTypeOneConfirmationForm'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.deleteCoupon());
          dispatch(actionCreators.clearBillerDescFav());
          dispatch(actionCreators.clearPGOStatus());
        } else {
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
          }
        }
      })
      .catch(err => {
        // const billCode = code.concat('-Failes');
        // const os = Platform.OS;
        // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
        const errCode = result(err, 'data.responseCode', '');
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
        const etaxPaymentData = result(err, 'data.billPaymentMap', {});
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
          if (errCode === '98' && isEtax) {
            dispatch(actionCreators.hideSpinner());
            const routeName = isEtax
              ? 'NewPaymentStatusNewOnboarding'
              : 'PaymentStatusNewOnboarding';
            if (isBillPay) {
              dispatch(
                StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({routeName: 'Landing'})],
                }),
              );
              dispatch(
                NavigationActions.navigate({
                  routeName: routeName,
                  params: {isBillPay},
                }),
              );
            } else {
              dispatch(
                StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({routeName: 'Landing'})],
                }),
              );
              dispatch(NavigationActions.navigate({routeName: routeName}));
            }
            dispatch(
              actionCreators.showPaymentModal({
                ...modalOptions,
                resultDisplay,
                etaxPaymentData,
                type: 'PENDING',
              }),
            );
          } else {
            dispatch(actionCreators.hideSpinner());
            dispatch(getBillpayHistory());
            if (isBillPay) {
              dispatch(
                NavigationActions.navigate({
                  routeName: 'PaymentStatusNewOnboarding',
                  params: {isBillPay},
                }),
              );
            } else {
              dispatch(
                StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({routeName: 'Landing'})],
                }),
              );
              dispatch(
                NavigationActions.navigate({
                  routeName: 'PaymentStatusNewOnboarding',
                }),
              );
            }
          }
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          const resultDisplay = result(err, 'data.result.displayList', []);
          const responseCode = result(err, 'data.responseCode', '');
          let errorText = getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_PAY_BILL,
          );
          if (responseCode === '98' && isTokopedia) {
            errorText = language.RESPONSE_MESSAGE__RC_98_WIFI_ID;
          } else if (responseCode === '51') {
            errorText = language.RESPONSE_MESSAGE__RC_51;
          }
          if (!isEtax) {
            dispatch(
              errorResponseResult(
                err,
                modalOptions,
                resultDisplay,
                errorText,
                selectedAccount,
              ),
            );
          }
          dispatch(destroy('BillerTypeOneIndexForm'));
          dispatch(destroy('BillerTypeOnePayment'));
          dispatch(destroy('BillerTypeOneConfirmationForm'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.deleteCoupon());
          dispatch(actionCreators.clearBillerDescFav());
          dispatch(actionCreators.clearPGOStatus());
        }
      });
  };
}

// BILLER TYPE TWO, BAZNAZ INFAQ
export function confirmGenericBillTypeTwo(data, fromConfirmationPage = false) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const isUsingVoucherUI = confirmGenericBillTypeTwo
      ? '1'
      : result(state, 'isUsingVoucherUI', '0');
    const values = result(data, 'values', {});
    const isUseSimas = result(values, 'accountNo.isUseSimas');
    const biller = result(data, 'biller', '');
    const checkingCIF = result(state, 'checkingCIFbeforeLogin', false);
    const limitBeforeLogin = result(
      state,
      'config.limitConfigAutoDebetAccount',
      '',
    );
    const searchIndexComma = indexOf(limitBeforeLogin, ',');
    const setLimitCIF = checkingCIF
      ? limitBeforeLogin.substring(0, searchIndexComma)
      : limitBeforeLogin.substring(
          searchIndexComma + 1,
          limitBeforeLogin.length,
        );
    const idAccountSelected = result(values, 'accountNo.id', '');
    const allAccounts = result(state, 'accounts', []);
    const flagEmoneyraw = find(allAccounts, function (val) {
      const productAccountName = result(val, 'id', '');
      return idAccountSelected === productAccountName;
    });
    const isDefaultAccount = find(allAccounts, function (val) {
      const productDefault = lowerCase(result(val, 'isDefaultAccount', ''));
      return productDefault === 'yes';
    });
    const switchAccountToogleBE =
      toLower(result(state, 'config.flag.primaryToogleAccount', 'inactive')) ===
      'active';
    const flagEmoney =
      result(flagEmoneyraw, 'accountType', '') === 'emoneyAccount';
    const allAmount = result(data, 'resDataTemp.amount', 0);
    const defaultToogle = result(state, 'primaryToogleAccount', false);
    const checkBalance = !isLogin
      ? result(state, 'defaultAccount.balances.availableBalance', '')
      : result(values, 'accountNo.balances.availableBalance', '');
    const checkAmountBalanceFLag =
      Number(setLimitCIF) < Number(allAmount)
        ? false
        : Number(checkBalance) < Number(allAmount);
    const selectedAccount =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      !isLogin &&
      checkAmountBalanceFLag
        ? isDefaultAccount
        : result(values, 'accountNo', '');
    const selectedAccountIdCoupon =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      !isLogin &&
      checkAmountBalanceFLag
        ? String(result(isDefaultAccount, 'id', ''))
        : String(result(values, 'accountNo.id', ''));
    const subscriberNo = result(data, 'subscriberNo', '');
    const description = result(
      state,
      'form.BillerTypeTwoIndexForm.values.description',
      '',
    );
    const amount = result(values, 'amount', '');
    const nextRun = result(data, 'autoDebitDate', '');
    const payload = {
      nextRun,
      ...middlewareUtils.prepareGenericBillerTypeTwoPayload({
        biller,
        selectedAccount,
        subscriberNo,
        description,
        amount,
      }),
    };
    dispatch(actionCreators.showSpinner());
    if (isUsingVoucherUI !== '1') {
      if (!fromConfirmationPage) {
        dispatch(actionCreators.deleteCoupon());
      }
    }
    dispatch(actionCreators.saveBillerDescFav({description: description}));
    return api
      .confirmGenericBill(payload, dispatch)
      .then(res => {
        const billerCode = result(biller, 'billerPreferences.code', '');
        dispatch(actionCreators.savebillerCode({billerCode}));
        dispatch(actionCreators.deleteUsingCouponUI());
        const resData = result(res, 'data', {});
        const dataDetail = middlewareUtils.prepareDataDetail(resData, biller);
        const type = 'billPayment';
        const transactionAmount = result(
          resData,
          'amountNumber',
          '0',
        ).toString();
        const billpayMethodType = isLogin ? null : '1';
        const payloadCoupon = {
          billerCode,
          type,
          transactionAmount,
          billpayMethodType,
          accountId: selectedAccountIdCoupon,
        };
        const transRefNum = result(state, 'transRefNum', '');
        const ownership = result(state, 'couponCheck.ownership', '');
        const voucherId = result(state, 'couponCheck.voucherId', '').toString();
        const payloadCouponCheckingValidity = {
          transactionAmount,
          transRefNum,
          voucherId,
          type,
          ownership,
          billerCode,
          billpayMethodType,
          accountId: selectedAccountIdCoupon,
        };
        const navigation = {
          routeName: 'BillerTypeTwoConfirmation',
          formIndex: 'BillerTypeTwoIndexForm',
          formPayment: 'BillerTypeTwoPayment',
          params: {
            isUseSimas,
            subscriberNo,
            biller,
            ...values,
            resData,
            dataDetail,
            confirmData: data,
          },
        };
        if (isLogin) {
          dispatch(
            getVoucher(
              dataDetail,
              payloadCoupon,
              payloadCouponCheckingValidity,
              navigation,
              false,
              fromConfirmationPage,
              isUseSimas,
            ),
          );
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        // Toast.show(language.ERROR_MESSAGE_INVALID_SMS_PIN_TRANSACTION);
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL),
          Toast.LONG,
        );
      });
  };
}

export function detailGenericBillTypeTwo(data) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const isUsingVoucherUI = result(state, 'isUsingVoucherUI', '0');
    const values = result(data, 'values', {});
    const biller = result(data, 'biller', '');
    const selectedAccount = result(values, 'accountNo', '');
    const subscriberNo = result(data, 'subscriberNo', '');
    const description = result(
      state,
      'form.BillerTypeTwoIndexForm.values.description',
      '',
    );
    const amount = result(values, 'amount', '');
    const payload = {
      billpayMethodType: '1',
      ...middlewareUtils.prepareGenericBillerTypeTwoPayload({
        biller,
        selectedAccount,
        subscriberNo,
        description,
        amount,
      }),
    };
    dispatch(actionCreators.showSpinner());
    if (isUsingVoucherUI !== '1') {
      dispatch(actionCreators.deleteCoupon());
    }
    dispatch(actionCreators.saveBillerDescFav({description: description}));
    return api
      .detailGenericBill(payload, dispatch)
      .then(res => {
        const billerCode = result(biller, 'billerPreferences.code', '');
        dispatch(actionCreators.savebillerCode({billerCode}));
        dispatch(actionCreators.deleteUsingCouponUI());
        const selectedAccountCoupon = String(
          result(values, 'accountNo.id', ''),
        );
        const resData = result(res, 'data', {});
        const dataDetail = middlewareUtils.prepareDataDetail(resData, biller);
        const type = 'billPayment';
        const transactionAmount = result(
          resData,
          'amountNumber',
          '0',
        ).toString();
        const billpayMethodType = isLogin ? null : '1';
        const payloadCoupon = {
          billerCode,
          type,
          transactionAmount,
          billpayMethodType,
          accountId: selectedAccountCoupon,
        };
        const transRefNum = result(state, 'transRefNum', '');
        const ownership = result(state, 'couponCheck.ownership', '');
        const voucherId = result(state, 'couponCheck.voucherId', '').toString();
        const payloadCouponCheckingValidity = {
          transactionAmount,
          transRefNum,
          voucherId,
          type,
          ownership,
          billerCode,
          billpayMethodType,
          accountId: selectedAccountCoupon,
        };
        // const isOwnAccount = false;
        // const tokenConfig = (result(getState(), 'config.tokenConfig', []));
        // const shouldSendSmsOtp = getTransactionType(amount, tokenConfig, isOwnAccount) === '0';
        const navigation = {
          routeName: 'BillerTypeTwoConfirmation',
          formIndex: 'BillerTypeTwoIndexForm',
          formPayment: 'BillerTypeTwoPayment',
          params: {
            subscriberNo,
            biller,
            ...values,
            resData,
            dataDetail,
            confirmData: data,
          },
        };
        dispatch(
          getVoucher(
            dataDetail,
            payloadCoupon,
            payloadCouponCheckingValidity,
            navigation,
            false,
          ),
        );
        // if (shouldSendSmsOtp === false) {
        //   const navigation = {routeName: 'BillerTypeTwoConfirmation', formIndex: 'BillerTypeTwoIndexForm', formPayment: 'BillerTypeTwoPayment', params: {subscriberNo, biller, ...values, resData, dataDetail, confirmData: data}};
        //   dispatch(getVoucher(dataDetail, payloadCoupon, payloadCouponCheckingValidity, navigation, false));
        // } else {
        //   dispatch(actionCreators.hideSpinner());
        //   Toast.show(language.BRFORE_LOGIN__DISCLAIMER_AMOUNT, Toast.LONG);
        // }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL),
          Toast.LONG,
        );
      });
  };
}

export function payGenericBillTypeTwo(objectData, isBillPay) {
  return (dispatch, getState) => {
    const storeState = getState();
    const resData = result(objectData, 'resData', {});
    const smsOtp = result(storeState, 'form.AuthenticateForm.values.otp', '');
    const easyPin = result(
      storeState,
      'form.AuthenticateForm.values.easypin',
      '',
    );
    const simasToken = result(
      storeState,
      'form.AuthenticateForm.values.simasToken',
      '',
    );
    const biller = result(objectData, 'biller', '');
    const checkingCIF = result(storeState, 'checkingCIFbeforeLogin', false);
    const limitBeforeLogin = result(
      storeState,
      'config.limitConfigAutoDebetAccount',
      '',
    );
    const searchIndexComma = indexOf(limitBeforeLogin, ',');
    const setLimitCIF = checkingCIF
      ? limitBeforeLogin.substring(0, searchIndexComma)
      : limitBeforeLogin.substring(
          searchIndexComma + 1,
          limitBeforeLogin.length,
        );
    const idAccountSelected = result(objectData, 'accountNo.id', '');
    const allAccounts = result(storeState, 'accounts', []);
    const flagEmoneyraw = find(allAccounts, function (val) {
      const productAccountName = result(val, 'id', '');
      return idAccountSelected === productAccountName;
    });
    const isDefaultAccount = find(allAccounts, function (val) {
      const productDefault = lowerCase(result(val, 'isDefaultAccount', ''));
      return productDefault === 'yes';
    });
    const switchAccountToogleBE =
      toLower(
        result(storeState, 'config.flag.primaryToogleAccount', 'inactive'),
      ) === 'active';
    const flagEmoney =
      result(flagEmoneyraw, 'accountType', '') === 'emoneyAccount';
    const allAmount = result(objectData, 'resData.amount', 0);
    const defaultToogle = result(storeState, 'primaryToogleAccount', false);
    const checkBalance = isBillPay
      ? result(storeState, 'defaultAccount.balances.availableBalance', '')
      : result(objectData, 'accountNo.balances.availableBalance', '');
    const checkAmountBalanceFLag =
      Number(setLimitCIF) < Number(allAmount)
        ? false
        : Number(checkBalance) < Number(allAmount);
    const selectedAccount =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      isBillPay &&
      checkAmountBalanceFLag
        ? isDefaultAccount
        : result(objectData, 'accountNo', '');
    const isUseSimas = result(selectedAccount, 'isUseSimas');
    const subscriberNo = result(objectData, 'subscriberNo', '');
    const transRefNum = storeState.transRefNum;
    const amount = result(objectData, 'amount', '');
    const lang = result(storeState, 'currentLanguage.id', 'id');
    const isFavorite = result(storeState, 'billerDescFav.isFavorite', '');
    const billerFavorite = result(storeState, 'billerFavorite', {});
    const descFav = find(
      billerFavorite,
      fav => subscriberNo === fav.subscriberNo,
    );
    const descInput =
      result(descFav, 'description', '') === ''
        ? result(objectData, 'resData.descInput', '')
        : result(descFav, 'description', '');
    // const code = result(biller, 'billerPreferences.code', '');
    let description = '';
    if (isFavorite === 'yes') {
      description =
        result(storeState, 'billerDescFav.description', '') === ''
          ? descInput
          : result(storeState, 'billerDescFav.description', '');
    } else {
      description =
        result(storeState, 'billerDescFav.description', '') === ''
          ? result(objectData, 'resData.descInput', '')
          : result(storeState, 'billerDescFav.description', '');
    }
    const transactionType =
      lang === 'id'
        ? language.GENERIC_BILLER__PAYMENT + biller.name
        : biller.name + language.GENERIC_BILLER__PAYMENT;
    const payloadRaw = middlewareUtils.prepareGenericBillerTypeTwoPayload({
      smsOtp,
      simasToken,
      subscriberNo,
      biller,
      amount,
      selectedAccount,
      transRefNum,
      description,
      isFavorite,
      easyPin,
    });
    const voucherId = result(
      storeState,
      'couponCheck.voucherId',
      '',
    ).toString();
    const ownership = result(storeState, 'couponCheck.ownership', '');
    const additionalInfoMap = {voucherId, ownership};
    const isAutoDebet = result(storeState, 'flagAutoDebit.isRegular', false);
    const nextRun = result(objectData, 'nextAutodebit', '');
    const autoDebitDate = result(storeState, 'flagAutoDebit.date', '');
    const autoDebitStartDate = moment(nextRun, 'YYYY-MM-DD').format(
      'DD MMM YYYY',
    );
    const payload = {...payloadRaw, additionalInfoMap, ownership, isAutoDebet};
    const isGenericBiller = 'yes';
    const modalOptions = {
      heading: `${subscriberNo}`,
      subheading: `${biller.name}`,
      amount: `Rp ${currencyFormatter(amount)}`,
      transactionType,
      transactionId: transRefNum,
      accountFrom: selectedAccount,
      resData: resData,
      isGenericBiller,
      isUseSimas,
      isAutodebitRegis: isAutoDebet,
      autoDebitStartDate,
      autoDebitDate,
    };
    const descriptionCouponSuccess = result(
      storeState,
      'couponCheck.description',
      '',
    );
    const flagMgm = result(storeState, 'config.hideNotifMGM', '');
    const flagMgmOn = lowerCase(flagMgm) === 'yes';
    dispatch(actionCreators.saveCouponSuccessStatus(descriptionCouponSuccess));
    dispatch(
      actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}),
    );
    dispatch(actionCreators.showSpinner());
    return api
      .resultGenericBill(payload, dispatch)
      .then(res => {
        const transRefNum = result(res, 'data.transRefNum', '');
        const subs1 = transRefNum.substring(6, 8);
        const ipassport = result(
          storeState,
          'additionalApiPayload.ipassport',
          '',
        );
        const subs2 = transRefNum.substring(
          transRefNum.length - 2,
          transRefNum.length,
        );
        const subs3 = ipassport.substring(4, 9);
        const transactionCode = subs1 + subs2 + subs3;
        const respon = result(res, 'data.responseCode', '');
        const code = md5(transactionCode);
        const checkCode = result(res, 'data.checkingCode', '');
        const uniCode = code === checkCode;
        dispatch(actionCreators.hideSpinner());
        if (respon === '00' && uniCode) {
          if (voucherId !== '' || isUseSimas) {
            dispatch(inquirySimasPoin());
          }
          if (isBillPay) {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
                params: {isBillPay},
              }),
            );
          } else {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
              }),
            );
          }
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          // const billCode = code.concat('-Success');
          // const os = Platform.OS;
          // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
          dispatch(getBillpayHistory());
          const resultDisplay = result(res, 'data.result.displayList', []);
          const dataDetail = result(objectData, 'dataDetail', {});
          dispatch(refreshStorageNew());
          dispatch(updateBalances());
          dispatch(couponCustomerCounting());
          dispatch(
            actionCreators.showPaymentModal({
              ...modalOptions,
              resultDisplay,
              type: 'SUCCESS',
              dataDetail,
            }),
          );
          dispatch(destroy('BillerTypeTwoIndexForm'));
          dispatch(destroy('BillerTypeTwoPayment'));
          dispatch(destroy('BillerTypeTwoConfirmationForm'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.deleteCoupon());
          dispatch(actionCreators.clearBillerDescFav());
        } else {
          // eslint-disable-next-line no-undef
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
          }
        }
      })
      .catch(err => {
        // const billCode = code.concat('-Failed');
        // const os = Platform.OS;
        // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
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
          dispatch(actionCreators.hideSpinner());
          dispatch(getBillpayHistory());
          if (isBillPay) {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
                params: {isBillPay},
              }),
            );
          } else {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
              }),
            );
          }
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          const resultDisplay = result(err, 'data.result.displayList', []);
          let errorText = getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_PAY_BILL,
          );
          const responseCode = result(err, 'data.responseCode', '');
          if (responseCode === '51') {
            errorText = language.RESPONSE_MESSAGE__RC_51;
          }
          dispatch(
            errorResponseResult(
              err,
              modalOptions,
              resultDisplay,
              errorText,
              selectedAccount,
            ),
          );
          dispatch(destroy('BillerTypeTwoIndexForm'));
          dispatch(destroy('BillerTypeTwoPayment'));
          dispatch(destroy('BillerTypeTwoConfirmationForm'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.deleteCoupon());
          dispatch(actionCreators.clearBillerDescFav());
        }
      });
  };
}

// BILLER TYPE THREE, ASURANSI SINARMAS
export function confirmGenericBillTypeThree(
  data,
  fromConfirmationPage = false,
) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const isUsingVoucherUI = confirmGenericBillTypeThree
      ? '1'
      : result(state, 'isUsingVoucherUI', '0');
    const values = result(data, 'values', {});
    const isEtax = result(data, 'isEtax', false);
    const etaxAmount = result(data, 'values.jumlahSetor', '');
    const etaxDesc = result(data, 'values.berita', '');
    const isUseSimas = result(values, 'accountNo.isUseSimas');
    const biller = result(data, 'biller', '');
    const checkingCIF = result(state, 'checkingCIFbeforeLogin', false);
    const limitBeforeLogin = result(
      state,
      'config.limitConfigAutoDebetAccount',
      '',
    );
    const searchIndexComma = indexOf(limitBeforeLogin, ',');
    const setLimitCIF = checkingCIF
      ? limitBeforeLogin.substring(0, searchIndexComma)
      : limitBeforeLogin.substring(
          searchIndexComma + 1,
          limitBeforeLogin.length,
        );
    const idAccountSelected = result(values, 'accountNo.id', '');
    const allAccounts = result(state, 'accounts', []);
    const flagEmoneyraw = find(allAccounts, function (val) {
      const productAccountName = result(val, 'id', '');
      return idAccountSelected === productAccountName;
    });
    const isDefaultAccount = find(allAccounts, function (val) {
      const productDefault = lowerCase(result(val, 'isDefaultAccount', ''));
      return productDefault === 'yes';
    });
    const switchAccountToogleBE =
      toLower(result(state, 'config.flag.primaryToogleAccount', 'inactive')) ===
      'active';
    const flagEmoney =
      result(flagEmoneyraw, 'accountType', '') === 'emoneyAccount';
    const allAmount = result(data, 'resDataTemp.amount', 0);
    const defaultToogle = result(state, 'primaryToogleAccount', false);
    const checkBalance = !isLogin
      ? result(state, 'defaultAccount.balances.availableBalance', '0')
      : result(values, 'accountNo.balances.availableBalance', '0');
    const checkAmountBalanceFLag =
      Number(setLimitCIF) < Number(allAmount)
        ? false
        : Number(checkBalance) < Number(allAmount);
    const selectedAccount =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      !isLogin &&
      checkAmountBalanceFLag
        ? isDefaultAccount
        : result(values, 'accountNo', '');
    const selectedAccountIdCoupon =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      !isLogin &&
      checkAmountBalanceFLag
        ? String(result(isDefaultAccount, 'id', ''))
        : String(result(values, 'accountNo.id', ''));
    const subscriberNo = result(data, 'subscriberNo', '');
    const description = isEtax
      ? etaxDesc
      : result(state, 'form.BillerTypeThreeIndexForm.values.description', '');
    const amount = isEtax ? etaxAmount : result(values, 'amount', '');
    const nextRun = result(data, 'autoDebitDate', '');
    const payload = {
      nextRun,
      ...middlewareUtils.prepareGenericBillerTypeThreePayload({
        biller,
        selectedAccount,
        subscriberNo,
        description,
        amount,
      }),
    };
    dispatch(actionCreators.showSpinner());
    if (isUsingVoucherUI !== '1') {
      if (!fromConfirmationPage) {
        dispatch(actionCreators.deleteCoupon());
      }
    }
    dispatch(actionCreators.saveBillerDescFav({description: description}));
    return api
      .confirmGenericBill(payload, dispatch)
      .then(res => {
        const billerCode = result(biller, 'billerPreferences.code', '');
        dispatch(actionCreators.savebillerCode({billerCode}));
        const resData = result(res, 'data', {});
        const dataDetail = middlewareUtils.prepareDataDetail(resData, biller);
        dispatch(actionCreators.deleteUsingCouponUI());
        const type = 'billPayment';
        const transactionAmount = result(
          resData,
          'amountNumber',
          '0',
        ).toString();
        const billpayMethodType = isLogin ? null : '1';
        const payloadCoupon = {
          billerCode,
          type,
          transactionAmount,
          billpayMethodType,
          accountId: selectedAccountIdCoupon,
        };
        const transRefNum = result(state, 'transRefNum', '');
        const ownership = result(state, 'couponCheck.ownership', '');
        const voucherId = result(state, 'couponCheck.voucherId', '').toString();
        const payloadCouponCheckingValidity = {
          transactionAmount,
          transRefNum,
          voucherId,
          type,
          ownership,
          billerCode,
          billpayMethodType,
          accountId: selectedAccountIdCoupon,
        };
        const routeName = isEtax
          ? 'IdBillingFormPaymentConfirmation'
          : 'BillerTypeThreeConfirmation';
        const navigation = {
          routeName: routeName,
          formIndex: 'BillerTypeThreeIndexForm',
          formPayment: 'BillerTypeThreePayment',
          params: {
            isUseSimas,
            subscriberNo,
            biller,
            ...values,
            resData,
            dataDetail,
            confirmData: data,
          },
        };
        if (isLogin) {
          dispatch(
            getVoucher(
              dataDetail,
              payloadCoupon,
              payloadCouponCheckingValidity,
              navigation,
              false,
              fromConfirmationPage,
              isUseSimas,
            ),
          );
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL),
          Toast.LONG,
        );
      });
  };
}

export function detailGenericBillTypeThree(data) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const isUsingVoucherUI = result(state, 'isUsingVoucherUI', '0');
    const values = result(data, 'values', {});
    const isEtax = result(data, 'isEtax', false);
    const etaxAmount = result(data, 'values.jumlahSetor', '');
    const etaxDesc = result(data, 'values.berita', '');
    const biller = result(data, 'biller', '');
    const selectedAccount = result(values, 'accountNo', '');
    const subscriberNo = result(data, 'subscriberNo', '');
    const description = isEtax
      ? etaxDesc
      : result(state, 'form.BillerTypeThreeIndexForm.values.description', '');
    const amount = isEtax ? etaxAmount : result(values, 'amount', '');
    const payload = {
      billpayMethodType: '1',
      ...middlewareUtils.prepareGenericBillerTypeThreePayload({
        biller,
        selectedAccount,
        subscriberNo,
        description,
        amount,
      }),
    };
    dispatch(actionCreators.showSpinner());
    if (isUsingVoucherUI !== '1') {
      dispatch(actionCreators.deleteCoupon());
    }
    dispatch(actionCreators.saveBillerDescFav({description: description}));
    return api
      .detailGenericBill(payload, dispatch)
      .then(res => {
        const billerCode = result(biller, 'billerPreferences.code', '');
        dispatch(actionCreators.savebillerCode({billerCode}));
        const resData = result(res, 'data', {});
        const dataDetail = middlewareUtils.prepareDataDetail(resData, biller);
        dispatch(actionCreators.deleteUsingCouponUI());
        const selectedAccountCoupon = String(
          result(values, 'accountNo.id', ''),
        );
        const type = 'billPayment';
        const transactionAmount = result(
          resData,
          'amountNumber',
          '0',
        ).toString();
        const billpayMethodType = isLogin ? null : '1';
        const payloadCoupon = {
          billerCode,
          type,
          transactionAmount,
          billpayMethodType,
          accountId: selectedAccountCoupon,
        };
        const transRefNum = result(state, 'transRefNum', '');
        const ownership = result(state, 'couponCheck.ownership', '');
        const voucherId = result(state, 'couponCheck.voucherId', '').toString();
        const isOwnAccount = false;
        const tokenConfig = result(getState(), 'config.tokenConfig', []);
        const shouldSendSmsOtp =
          getTransactionType(amount, tokenConfig, isOwnAccount) === '0';
        const payloadCouponCheckingValidity = {
          transactionAmount,
          transRefNum,
          voucherId,
          type,
          ownership,
          billerCode,
          billpayMethodType,
          accountId: selectedAccountCoupon,
        };
        const routeName = isEtax
          ? 'IdBillingFormPaymentConfirmation'
          : 'BillerTypeThreeConfirmation';
        const navigation = {
          routeName: routeName,
          formIndex: 'BillerTypeThreeIndexForm',
          formPayment: 'BillerTypeThreePayment',
          params: {
            subscriberNo,
            biller,
            ...values,
            resData,
            dataDetail,
            confirmData: data,
            shouldSendSmsOtp,
          },
        };
        dispatch(
          getVoucher(
            dataDetail,
            payloadCoupon,
            payloadCouponCheckingValidity,
            navigation,
            false,
          ),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL),
          Toast.LONG,
        );
      });
  };
}

export function payGenericBillTypeThree(objectData, isBillPay) {
  return (dispatch, getState) => {
    const storeState = getState();
    const resData = result(objectData, 'resData', {});
    const smsOtp = result(storeState, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(
      storeState,
      'form.AuthenticateForm.values.simasToken',
      '',
    );
    const biller = result(objectData, 'biller', '');
    const checkingCIF = result(storeState, 'checkingCIFbeforeLogin', false);
    const limitBeforeLogin = result(
      storeState,
      'config.limitConfigAutoDebetAccount',
      '',
    );
    const searchIndexComma = indexOf(limitBeforeLogin, ',');
    const setLimitCIF = checkingCIF
      ? limitBeforeLogin.substring(0, searchIndexComma)
      : limitBeforeLogin.substring(
          searchIndexComma + 1,
          limitBeforeLogin.length,
        );
    const idAccountSelected = result(objectData, 'accountNo.id', '');
    const allAccounts = result(storeState, 'accounts', []);
    const flagEmoneyraw = find(allAccounts, function (val) {
      const productAccountName = result(val, 'id', '');
      return idAccountSelected === productAccountName;
    });
    const isDefaultAccount = find(allAccounts, function (val) {
      const productDefault = lowerCase(result(val, 'isDefaultAccount', ''));
      return productDefault === 'yes';
    });
    const switchAccountToogleBE =
      toLower(
        result(storeState, 'config.flag.primaryToogleAccount', 'inactive'),
      ) === 'active';
    const flagEmoney =
      result(flagEmoneyraw, 'accountType', '') === 'emoneyAccount';
    const allAmount = result(objectData, 'resData.amount', 0);
    const defaultToogle = result(storeState, 'primaryToogleAccount', false);
    const checkBalance = isBillPay
      ? result(storeState, 'defaultAccount.balances.availableBalance', '')
      : result(objectData, 'accountNo.balances.availableBalance', '');
    const checkAmountBalanceFLag =
      Number(setLimitCIF) < Number(allAmount)
        ? false
        : Number(checkBalance) < Number(allAmount);
    const selectedAccount =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      isBillPay &&
      checkAmountBalanceFLag
        ? isDefaultAccount
        : result(objectData, 'accountNo', '');
    const isUseSimas = result(selectedAccount, 'isUseSimas');
    const subscriberNo = result(objectData, 'subscriberNo', '');
    const amount = result(objectData, 'amount', '');
    const billPeriod = result(objectData, 'billPeriod.id', '');
    const transRefNum = storeState.transRefNum;
    const lang = result(storeState, 'currentLanguage.id', 'id');
    const isFavorite = result(storeState, 'billerDescFav.isFavorite', '');
    const billerFavorite = result(storeState, 'billerFavorite', {});
    const easyPin = result(
      storeState,
      'form.AuthenticateForm.values.easypin',
      '',
    );
    const descFav = find(
      billerFavorite,
      fav => subscriberNo === fav.subscriberNo,
    );
    const descInput =
      result(descFav, 'description', '') === ''
        ? result(objectData, 'resData.descInput', '')
        : result(descFav, 'description', '');
    // const code = result(biller, 'billerPreferences.code', '');
    let description = '';
    if (isFavorite === 'yes') {
      description =
        result(storeState, 'billerDescFav.description', '') === ''
          ? descInput
          : result(storeState, 'billerDescFav.description', '');
    } else {
      description =
        result(storeState, 'billerDescFav.description', '') === ''
          ? result(objectData, 'resData.descInput', '')
          : result(storeState, 'billerDescFav.description', '');
    }
    const transactionType =
      lang === 'id'
        ? language.GENERIC_BILLER__PAYMENT + biller.name
        : biller.name + language.GENERIC_BILLER__PAYMENT;
    const payloadRaw = middlewareUtils.prepareGenericBillerTypeThreePayload({
      smsOtp,
      simasToken,
      subscriberNo,
      biller,
      selectedAccount,
      transRefNum,
      description,
      amount,
      billPeriod,
      isFavorite,
      easyPin,
    });
    const voucherId = result(
      storeState,
      'couponCheck.voucherId',
      '',
    ).toString();
    const ownership = result(storeState, 'couponCheck.ownership', '');
    const additionalInfoMap = {voucherId, ownership};
    const isAutoDebet = result(storeState, 'flagAutoDebit.isRegular', false);
    const nextRun = result(objectData, 'nextAutodebit', '');
    const autoDebitDate = result(storeState, 'flagAutoDebit.date', '');
    const autoDebitStartDate = moment(nextRun, 'YYYY-MM-DD').format(
      'DD MMM YYYY',
    );
    const payload = {...payloadRaw, additionalInfoMap, ownership, isAutoDebet};
    const isGenericBiller = 'yes';
    const iscounterTrxData = result(storeState, 'counterTrxData', true);
    const modalOptions = {
      heading: `${subscriberNo}`,
      subheading: `${biller.name}`,
      amount: `Rp ${currencyFormatter(amount)}`,
      transactionType,
      transactionId: transRefNum,
      accountFrom: selectedAccount,
      resData: resData,
      isGenericBiller,
      isUseSimas,
      isAutodebitRegis: isAutoDebet,
      autoDebitStartDate,
      autoDebitDate,
    };
    const descriptionCouponSuccess = result(
      storeState,
      'couponCheck.description',
      '',
    );
    const flagMgm = result(storeState, 'config.hideNotifMGM', '');
    const flagMgmOn = lowerCase(flagMgm) === 'yes';
    dispatch(actionCreators.saveCouponSuccessStatus(descriptionCouponSuccess));
    dispatch(
      actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}),
    );
    dispatch(actionCreators.showSpinner());
    return api
      .resultGenericBill(payload, dispatch)
      .then(res => {
        const transRefNum = result(res, 'data.transRefNum', '');
        const subs1 = transRefNum.substring(6, 8);
        const ipassport = result(
          storeState,
          'additionalApiPayload.ipassport',
          '',
        );
        const subs2 = transRefNum.substring(
          transRefNum.length - 2,
          transRefNum.length,
        );
        const subs3 = ipassport.substring(4, 9);
        const transactionCode = subs1 + subs2 + subs3;
        const respon = result(res, 'data.responseCode', '');
        const code = md5(transactionCode);
        const checkCode = result(res, 'data.checkingCode', '');
        const uniCode = code === checkCode;
        dispatch(actionCreators.hideSpinner());
        dispatch(getBillpayHistory());
        if (respon === '00' && uniCode) {
          if (voucherId !== '' || isUseSimas) {
            dispatch(inquirySimasPoin());
          }
          if (isBillPay) {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
                params: {isBillPay},
              }),
            );
          } else {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
              }),
            );
          }
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          // const billCode = code.concat('-Success');
          // const os = Platform.OS;
          // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
          dispatch(getBillpayHistory());
          const resultDisplay = result(res, 'data.result.displayList', []);
          const dataDetail = result(objectData, 'dataDetail', {});
          dispatch(couponCustomerCounting());
          if (iscounterTrxData === false) {
            dispatch(refreshStorageNew());
          } else {
            dispatch(updateBalances());
            dispatch(getLuckyDipTicket());
          }
          dispatch(
            actionCreators.showPaymentModal({
              ...modalOptions,
              resultDisplay,
              type: 'SUCCESS',
              dataDetail,
            }),
          );
          dispatch(destroy('BillerTypeThreeIndexForm'));
          dispatch(destroy('BillerTypeThreePayment'));
          dispatch(destroy('BillerTypeThreeConfirmationForm'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.deleteCoupon());
          dispatch(actionCreators.clearBillerDescFav());
        } else {
          // eslint-disable-next-line no-undef
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
          }
        }
      })
      .catch(err => {
        // const billCode = code.concat('-Failed');
        // const os = Platform.OS;
        // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
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
          dispatch(actionCreators.hideSpinner());
          dispatch(getBillpayHistory());
          dispatch(getBillpayHistory());
          if (isBillPay) {
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
                params: {isBillPay},
              }),
            );
          } else {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
              }),
            );
          }
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          const resultDisplay = result(err, 'data.result.displayList', []);
          let errorText = getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_PAY_BILL,
          );
          const responseCode = result(err, 'data.responseCode', '');
          if (responseCode === '51') {
            errorText = language.RESPONSE_MESSAGE__RC_51;
          }
          dispatch(
            errorResponseResult(
              err,
              modalOptions,
              resultDisplay,
              errorText,
              selectedAccount,
            ),
          );
          dispatch(destroy('BillerTypeThreeIndexForm'));
          dispatch(destroy('BillerTypeThreePayment'));
          dispatch(destroy('BillerTypeThreeConfirmationForm'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.deleteCoupon());
          dispatch(actionCreators.clearBillerDescFav());
        }
      });
  };
}

// BILLER TYPE SIX, TELKOMSEL PREPAID
export function getEnquiryForGenericBillerTypeSix(
  values,
  selectedBiller,
  favBiller,
) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const billpayMethodType = isLogin ? null : '1';
    const isBillerInqMenu = result(
      selectedBiller,
      'billerPreferences.billerInqMenu',
      false,
    );
    const payload = {
      billpayMethodType,
      ...middlewareUtils.prepareGenericBillerTypeSixEnquiryPayload({
        selectedBiller,
      }),
    };
    if (isBillerInqMenu) {
      dispatch(actionCreators.showSpinner());
      if (isLogin) {
        return api
          .enquireGenericBill(payload, dispatch)
          .then(res => {
            dispatch(refreshStorageNew());
            return res;
          })
          .then(res => {
            dispatch(actionCreators.hideSpinner());
            dispatch(
              NavigationActions.navigate({
                routeName: 'BillerTypeSixPayment',
                params: {
                  ...values,
                  biller: selectedBiller,
                  billDetails: res.data,
                  favBiller: favBiller,
                },
              }),
            );
          })
          .catch(err => {
            dispatch(actionCreators.hideSpinner());
            const defaultMessage =
              language.ERROR_MESSAGE__COULD_NOT_GET_AMOUNT_GENERIC_BILLER;
            OtherResponseInquiry(err, defaultMessage);
          });
      } else {
        return api
          .enquireGenericBill(payload, dispatch)
          .then(res => {
            dispatch(actionCreators.saveInquiryBiller({res}));
            return res;
          })
          .then(res => {
            dispatch(actionCreators.hideSpinner());
            dispatch(
              NavigationActions.navigate({
                routeName: 'BillerTypeSixPayment',
                params: {
                  ...values,
                  biller: selectedBiller,
                  billDetails: res.data,
                  favBiller: favBiller,
                },
              }),
            );
          })
          .catch(err => {
            dispatch(actionCreators.hideSpinner());
            const defaultMessage =
              language.ERROR_MESSAGE__COULD_NOT_GET_AMOUNT_GENERIC_BILLER;
            OtherResponseInquiry(err, defaultMessage);
          });
      }
    } else {
      dispatch(actionCreators.showSpinner());
      if (isLogin) {
        dispatch(actionCreators.hideSpinner());
        dispatch(
          NavigationActions.navigate({
            routeName: 'BillerTypeSixPayment',
            params: {...values, biller: selectedBiller, favBiller: favBiller},
          }),
        );
      } else {
        dispatch(actionCreators.hideSpinner());
        dispatch(
          NavigationActions.navigate({
            routeName: 'BillerTypeSixPayment',
            params: {...values, biller: selectedBiller, favBiller: favBiller},
          }),
        );
      }
    }
  };
}

export function confirmGenericBillTypeSix(
  data,
  fromConfirmationPage = false,
  isbiller,
  dataLogin,
  otpYes,
) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const uniqueCode = result(state, 'inquiryBL.res.data.uniqueCode', '');
    const billpayMethodType = isLogin ? null : '1';
    const isUsingVoucherUI = result(state, 'isUsingVoucherUI', '0');
    const values = result(data, 'values', {});
    const isUseSimas = result(values, 'accountNo.isUseSimas');
    const biller = result(data, 'biller', '');
    const billerCode = result(biller, 'billerPreferences.code', '');
    const checkingCIF = result(state, 'checkingCIFbeforeLogin', false);
    const limitBeforeLogin = result(
      state,
      'config.limitConfigAutoDebetAccount',
      '',
    );
    const searchIndexComma = indexOf(limitBeforeLogin, ',');
    const setLimitCIF = checkingCIF
      ? limitBeforeLogin.substring(0, searchIndexComma)
      : limitBeforeLogin.substring(
          searchIndexComma + 1,
          limitBeforeLogin.length,
        );
    const idAccountSelected = result(values, 'accountNo.id', '');
    const allAccounts = result(state, 'accounts', []);
    const flagEmoneyraw = find(allAccounts, function (val) {
      const productAccountName = result(val, 'id', '');
      return idAccountSelected === productAccountName;
    });
    const isDefaultAccount = find(allAccounts, function (val) {
      const productDefault = lowerCase(result(val, 'isDefaultAccount', ''));
      return productDefault === 'yes';
    });
    const flagEmoney =
      result(flagEmoneyraw, 'accountType', '') === 'emoneyAccount';

    let subscriberNo = result(data, 'subscriberNo', '');
    const description = result(
      state,
      'form.BillerTypeSixIndexForm.values.description',
      '',
    );
    const denomination = result(values, 'denomination', {});
    const isUsingPackageCode =
      result(biller, 'billerPreferences.isUsingPackageCode', '') === '1';
    const isMerchantWithSubProductCode =
      result(biller, 'billerPreferences.isMerchantWithSubProductCode', '') ===
      '1';
    const isPrepaidOpenAmount =
      result(biller, 'billerPreferences.isPrepaidOpenAmount', '') === '1';
    const billerInqMenu = result(
      biller,
      'billerPreferences.billerInqMenu',
      false,
    );
    const txDate = moment(new Date()).format('hh:mm:ss');
    const billerUniqueCode = isLogin
      ? null
      : txDate.toString().replace(/([:])+/g, '');
    const isbillerOtp = isLogin ? false : isbiller;
    dispatch(actionCreators.getReferralCode(billerUniqueCode));
    let packageCode = '',
      amount = '',
      subProductCode = '';
    if (isUsingPackageCode) {
      packageCode = result(denomination, 'id', '');
      amount = result(denomination, 'filter', '');
    } else if (isMerchantWithSubProductCode) {
      subProductCode = result(denomination, 'id', '');
      amount = result(denomination, 'filter', '');
    } else if (isPrepaidOpenAmount) {
      amount = result(values, 'amount', '');
    } else {
      amount = result(denomination, 'id', '');
    }
    if (billerInqMenu) {
      packageCode = result(values, 'packageCode.id', '');
      if (packageCode.length === 1) {
        subscriberNo = '0' + packageCode + subscriberNo;
      } else {
        subscriberNo = packageCode + subscriberNo;
      }
    }
    const allAmount = amount;
    const switchAccountToogleBE =
      toLower(result(state, 'config.flag.primaryToogleAccount', 'inactive')) ===
      'active';
    const defaultToogle = result(state, 'primaryToogleAccount', false);
    const checkBalance = !isLogin
      ? result(state, 'defaultAccount.balances.availableBalance', '0')
      : result(values, 'accountNo.balances.availableBalance', '0');
    const checkAmountBalanceFLag =
      Number(setLimitCIF) < Number(allAmount)
        ? false
        : Number(checkBalance) < Number(allAmount);
    const selectedAccount =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      !isLogin &&
      checkAmountBalanceFLag
        ? isDefaultAccount
        : result(values, 'accountNo', '');
    const selectedAccountIdCoupon =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      !isLogin &&
      checkAmountBalanceFLag
        ? String(result(isDefaultAccount, 'id', ''))
        : String(result(values, 'accountNo.id', ''));
    const nextRun = result(data, 'autoDebitDate', '');
    const payload = {
      billpayMethodType,
      nextRun,
      ...middlewareUtils.prepareGenericBillerTypeSixPayload({
        subscriberNo,
        biller,
        selectedAccount,
        amount,
        denomination,
        packageCode,
        subProductCode,
        description,
        uniqueCode,
        isbillerOtp,
        billerUniqueCode,
      }),
    };
    if (billerInqMenu) {
      subscriberNo = subscriberNo.substring(
        packageCode.length,
        subscriberNo.length,
      );
    }
    dispatch(actionCreators.saveBillerDescFav({description: description}));
    dispatch(actionCreators.showSpinner());
    if (isUsingVoucherUI !== '1') {
      if (!fromConfirmationPage) {
        dispatch(actionCreators.deleteCoupon());
      }
    }
    const isOvoSimasPoin = billerCode === '812277' && isUseSimas;
    const isGopaySimasPoin = billerCode === '810128' && isUseSimas;
    const isLinkAjaSimasPoin = billerCode === '001022' && isUseSimas;
    const isShopeePaySimasPoin = billerCode === '002240' && isUseSimas;
    if (
      isOvoSimasPoin ||
      isGopaySimasPoin ||
      isLinkAjaSimasPoin ||
      isShopeePaySimasPoin
    ) {
      dispatch(actionCreators.hideSpinner());
      Toast.show(language.SIMAS_POIN_AS_SOF_PROHIBITED_BILLER);
    } else {
      return api
        .confirmGenericBill(payload, dispatch)
        .then(res => {
          if (otpYes) {
            dispatch(getSimasPoinLogin(dataLogin));
          }
          dispatch(actionCreators.hideSpinner());
          const resData = result(res, 'data', {});
          dispatch(actionCreators.deleteUsingCouponUI());
          const billerCode = result(biller, 'billerPreferences.code', '');
          dispatch(actionCreators.savebillerCode({billerCode}));
          const dataDetail = isEmpty(resData.result.displayList)
            ? middlewareUtils.prepareDataDetail(resData, biller)
            : [];
          const type = 'billPayment';
          const transactionAmount = result(
            resData,
            'amountNumber',
            '0',
          ).toString();
          const billpayMethodType = isLogin ? null : '1';
          const payloadCoupon = {
            billerCode,
            type,
            transactionAmount,
            billpayMethodType,
            accountId: selectedAccountIdCoupon,
          };
          const transRefNum = result(state, 'transRefNum', '');
          const ownership = result(state, 'couponCheck.ownership', '');
          const voucherId = result(
            state,
            'couponCheck.voucherId',
            '',
          ).toString();
          const payloadCouponCheckingValidity = {
            transactionAmount,
            transRefNum,
            voucherId,
            type,
            ownership,
            billerCode,
            billpayMethodType,
            accountId: selectedAccountIdCoupon,
          };
          const navigation = {
            routeName: 'BillerTypeSixConfirmation',
            formIndex: 'BillerTypeSixIndexForm',
            formPayment: 'BillerTypeSixPayment',
            params: {
              isUseSimas,
              subscriberNo,
              biller,
              ...values,
              resData,
              dataDetail,
              confirmData: data,
            },
          };
          if (isLogin) {
            dispatch(
              getVoucher(
                dataDetail,
                payloadCoupon,
                payloadCouponCheckingValidity,
                navigation,
                false,
                fromConfirmationPage,
                isUseSimas,
              ),
            );
          }
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          dispatch(clearFromdeeplinkState());
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL),
            Toast.LONG,
          );
        });
    }
  };
}

export function detailGenericBillTypeSix(data) {
  return (dispatch, getState) => {
    const state = getState();
    const isUsingVoucherUI = result(state, 'isUsingVoucherUI', '0');
    const values = result(data, 'values', {});
    const biller = result(data, 'biller', '');
    const selectedAccount = result(values, 'accountNo', '');
    let subscriberNo = result(data, 'subscriberNo', '');
    const description = result(
      state,
      'form.BillerTypeSixIndexForm.values.description',
      '',
    );
    const denomination = result(values, 'denomination', {});
    const isUsingPackageCode =
      result(biller, 'billerPreferences.isUsingPackageCode', '') === '1';
    const billerCode = result(biller, 'billerPreferences.code', '');
    const isUseSimas = result(data, 'isUseSimas');
    const isOvoSimasPoin = billerCode === '812277' && isUseSimas;
    const isGopaySimasPoin = billerCode === '810128' && isUseSimas;
    const isShopeePaySimasPoin = billerCode === '002240' && isUseSimas;
    const isMerchantWithSubProductCode =
      result(biller, 'billerPreferences.isMerchantWithSubProductCode', '') ===
      '1';
    const isPrepaidOpenAmount =
      result(biller, 'billerPreferences.isPrepaidOpenAmount', '') === '1';
    const billerInqMenu = result(
      biller,
      'billerPreferences.billerInqMenu',
      false,
    );
    let packageCode = '',
      amount = '',
      subProductCode = '';
    if (isUsingPackageCode) {
      packageCode = result(denomination, 'id', '');
      amount = result(denomination, 'filter', '');
    } else if (isMerchantWithSubProductCode) {
      subProductCode = result(denomination, 'id', '');
      amount = result(denomination, 'filter', '');
    } else if (isPrepaidOpenAmount) {
      amount = result(values, 'amount', '');
    } else {
      amount = result(denomination, 'id', '');
    }
    if (billerInqMenu) {
      packageCode = result(values, 'packageCode.id', '');
      if (packageCode.length === 1) {
        subscriberNo = '0' + packageCode + subscriberNo;
      } else {
        subscriberNo = packageCode + subscriberNo;
      }
    }
    const payload = {
      billpayMethodType: '1',
      ...middlewareUtils.prepareGenericBillerTypeSixPayload({
        subscriberNo,
        biller,
        selectedAccount,
        amount,
        denomination,
        packageCode,
        subProductCode,
        description,
      }),
    };
    if (billerInqMenu) {
      subscriberNo = subscriberNo.substring(
        packageCode.length,
        subscriberNo.length,
      );
    }
    dispatch(actionCreators.saveBillerDescFav({description: description}));
    dispatch(actionCreators.showSpinner());
    if (isUsingVoucherUI !== '1') {
      dispatch(actionCreators.deleteCoupon());
    }
    if (isOvoSimasPoin || isGopaySimasPoin || isShopeePaySimasPoin) {
      dispatch(actionCreators.hideSpinner());
      Toast.show(language.SIMAS_POIN_AS_SOF_PROHIBITED_BILLER);
    } else {
      return api
        .detailGenericBill(payload, dispatch)
        .then(res => {
          const resData = result(res, 'data', {});
          dispatch(actionCreators.deleteUsingCouponUI());
          const billerCode = result(biller, 'billerPreferences.code', '');
          dispatch(actionCreators.savebillerCode({billerCode}));
          const selectedAccountCoupon = String(
            result(values, 'accountNo.id', ''),
          );
          const dataDetail = isEmpty(resData.displayList)
            ? middlewareUtils.prepareDataDetail(resData, biller)
            : [];
          const type = 'billPayment';
          const transactionAmount = result(
            resData,
            'amountNumber',
            '0',
          ).toString();
          const isLogin = !isEmpty(result(state, 'user', {}));
          const billpayMethodType = isLogin ? null : '1';
          const payloadCoupon = {
            billerCode,
            type,
            transactionAmount,
            billpayMethodType,
            accountId: selectedAccountCoupon,
          };
          const transRefNum = result(state, 'transRefNum', '');
          const ownership = result(state, 'couponCheck.ownership', '');
          const voucherId = result(
            state,
            'couponCheck.voucherId',
            '',
          ).toString();
          const payloadCouponCheckingValidity = {
            transactionAmount,
            transRefNum,
            voucherId,
            type,
            ownership,
            billerCode,
            billpayMethodType,
            accountId: selectedAccountCoupon,
          };
          const navigation = {
            routeName: 'BillerTypeSixConfirmation',
            formIndex: 'BillerTypeSixIndexForm',
            formPayment: 'BillerTypeSixPayment',
            params: {
              subscriberNo,
              biller,
              ...values,
              resData,
              dataDetail,
              confirmData: data,
            },
          };
          dispatch(
            getVoucher(
              dataDetail,
              payloadCoupon,
              payloadCouponCheckingValidity,
              navigation,
              false,
            ),
          );
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL),
            Toast.LONG,
          );
        });
    }
  };
}

export function payGenericBillTypeSix(objectData, isBillPay) {
  return (dispatch, getState) => {
    const storeState = getState();
    const resData = result(objectData, 'resData', {});
    const smsOtp = result(storeState, 'form.AuthenticateForm.values.otp', '');
    const easyPin = result(
      storeState,
      'form.AuthenticateForm.values.easypin',
      '',
    );
    const simasToken = result(
      storeState,
      'form.AuthenticateForm.values.simasToken',
      '',
    );
    const biller = result(objectData, 'biller', '');
    const checkingCIF = result(storeState, 'checkingCIFbeforeLogin', false);
    const limitBeforeLogin = result(
      storeState,
      'config.limitConfigAutoDebetAccount',
      '',
    );
    const searchIndexComma = indexOf(limitBeforeLogin, ',');
    const setLimitCIF = checkingCIF
      ? limitBeforeLogin.substring(0, searchIndexComma)
      : limitBeforeLogin.substring(
          searchIndexComma + 1,
          limitBeforeLogin.length,
        );
    const idAccountSelected = result(objectData, 'accountNo.id', '');
    const allAccounts = result(storeState, 'accounts', []);
    const flagEmoneyraw = find(allAccounts, function (val) {
      const productAccountName = result(val, 'id', '');
      return idAccountSelected === productAccountName;
    });
    const isDefaultAccount = find(allAccounts, function (val) {
      const productDefault = lowerCase(result(val, 'isDefaultAccount', ''));
      return productDefault === 'yes';
    });
    let subscriberNo = result(objectData, 'subscriberNo', '');
    const denomination = result(objectData, 'denomination', {});
    const isUsingPackageCode =
      result(biller, 'billerPreferences.isUsingPackageCode', '') === '1';
    const isMerchantWithSubProductCode =
      result(biller, 'billerPreferences.isMerchantWithSubProductCode', '') ===
      '1';
    const isPrepaidOpenAmount =
      result(biller, 'billerPreferences.isPrepaidOpenAmount', '') === '1';
    const billerInqMenu = result(
      biller,
      'billerPreferences.billerInqMenu',
      false,
    );
    const isWifiID = result(biller, 'billerPreferences.code', '') === '061801';
    const lang = result(storeState, 'currentLanguage.id', 'id');
    const isFavorite = result(storeState, 'billerDescFav.isFavorite', '');
    const billerFavorite = result(storeState, 'billerFavorite', {});
    const descFav = find(
      billerFavorite,
      fav => subscriberNo === fav.subscriberNo,
    );
    const descInput =
      result(descFav, 'description', '') === ''
        ? result(objectData, 'resData.descInput', '')
        : result(descFav, 'description', '');
    // const code = result(biller, 'billerPreferences.code', '');
    let description = '';
    if (isFavorite === 'yes') {
      description =
        result(storeState, 'billerDescFav.description', '') === ''
          ? descInput
          : result(storeState, 'billerDescFav.description', '');
    } else {
      description =
        result(storeState, 'billerDescFav.description', '') === ''
          ? result(objectData, 'resData.descInput', '')
          : result(storeState, 'billerDescFav.description', '');
    }
    const transactionType =
      lang === 'id'
        ? language.GENERIC_BILLER__PAYMENT + biller.name
        : biller.name + language.GENERIC_BILLER__PAYMENT;
    let packageCode = '',
      amount = '',
      subProductCode = '';
    if (isUsingPackageCode) {
      packageCode = result(denomination, 'id', '');
      amount = result(denomination, 'filter', '');
    } else if (isMerchantWithSubProductCode) {
      subProductCode = result(denomination, 'id', '');
      amount = result(denomination, 'filter', '');
    } else if (isPrepaidOpenAmount) {
      amount = result(objectData, 'amount', '');
    } else if (billerInqMenu) {
      amount = result(objectData, 'resData.amount', '');
    } else {
      amount = result(denomination, 'id', '');
    }
    const transRefNum = storeState.transRefNum;
    if (billerInqMenu) {
      packageCode = result(objectData, 'packageCode.id', '');
      subscriberNo = packageCode + subscriberNo;
    }
    const switchAccountToogleBE =
      toLower(
        result(storeState, 'config.flag.primaryToogleAccount', 'inactive'),
      ) === 'active';
    const flagEmoney =
      result(flagEmoneyraw, 'accountType', '') === 'emoneyAccount';
    const allAmount = amount;
    const defaultToogle = result(storeState, 'primaryToogleAccount', false);
    const checkBalance = isBillPay
      ? result(storeState, 'defaultAccount.balances.availableBalance', '')
      : result(objectData, 'accountNo.balances.availableBalance', '');
    const checkAmountBalanceFLag =
      Number(setLimitCIF) < Number(allAmount)
        ? false
        : Number(checkBalance) < Number(allAmount);
    const selectedAccount =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      isBillPay &&
      checkAmountBalanceFLag
        ? isDefaultAccount
        : result(objectData, 'accountNo', '');
    const isUseSimas = result(selectedAccount, 'isUseSimas');
    const payloadRaw = middlewareUtils.prepareGenericBillerTypeSixPayload({
      smsOtp,
      simasToken,
      subscriberNo,
      biller,
      selectedAccount,
      transRefNum,
      amount,
      denomination,
      packageCode,
      subProductCode,
      description,
      isFavorite,
      easyPin,
    });
    if (billerInqMenu) {
      subscriberNo = subscriberNo.substring(
        packageCode.length,
        subscriberNo.length,
      );
    }
    const voucherId = result(
      storeState,
      'couponCheck.voucherId',
      '',
    ).toString();
    const ownership = result(storeState, 'couponCheck.ownership', '');
    const additionalInfoMap = {voucherId, ownership};
    const isAutoDebet = result(storeState, 'flagAutoDebit.isRegular', false);
    const nextRun = result(objectData, 'nextAutodebit', '');
    const autoDebitDate = result(storeState, 'flagAutoDebit.date', '');
    const autoDebitStartDate = moment(nextRun, 'YYYY-MM-DD').format(
      'DD MMM YYYY',
    );
    const payload = {...payloadRaw, additionalInfoMap, ownership, isAutoDebet};
    const isGenericBiller = 'yes';
    const custPoin = result(storeState, 'couponCheck.custPoin', '');
    const custPoinCurrenncy = result(storeState, 'couponCheck.currency', '');
    const modalOptions = {
      heading: `${subscriberNo}`,
      subheading: `${biller.name}`,
      amount: `Rp ${currencyFormatter(amount)}`,
      transactionType,
      transactionId: transRefNum,
      accountFrom: selectedAccount,
      resData: resData,
      isGenericBiller,
      custPoin,
      generalCode: generalCode(objectData),
      isUseSimas,
      custPoinCurrenncy,
      isAutodebitRegis: isAutoDebet,
      autoDebitStartDate,
      autoDebitDate,
    };
    const descriptionCouponSuccess = result(
      storeState,
      'couponCheck.description',
      '',
    );
    const flagMgm = result(storeState, 'config.hideNotifMGM', '');
    const flagMgmOn = lowerCase(flagMgm) === 'yes';
    dispatch(actionCreators.saveCouponSuccessStatus(descriptionCouponSuccess));
    dispatch(
      actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}),
    );
    dispatch(actionCreators.showSpinner());
    return api
      .resultGenericBill(payload, dispatch)
      .then(res => {
        const transRefNum = result(res, 'data.transRefNum', '');
        const subs1 = transRefNum.substring(6, 8);
        const ipassport = result(
          storeState,
          'additionalApiPayload.ipassport',
          '',
        );
        const subs2 = transRefNum.substring(
          transRefNum.length - 2,
          transRefNum.length,
        );
        const subs3 = ipassport.substring(4, 9);
        const transactionCode = subs1 + subs2 + subs3;
        const respon = result(res, 'data.responseCode', '');
        const code = md5(transactionCode);
        const checkCode = result(res, 'data.checkingCode', '');
        const uniCode = code === checkCode;
        dispatch(actionCreators.hideSpinner());
        dispatch(getBillpayHistory());
        if (respon === '00' && uniCode) {
          if (voucherId !== '' || isUseSimas) {
            dispatch(inquirySimasPoin());
          }
          if (isBillPay) {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusRevampOnboarding',
                params: {isBillPay},
              }),
            );
          } else {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusRevampOnboarding',
              }),
            );
          }
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          // const billCode = code.concat('-Success');
          // const os = Platform.OS;
          // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
          dispatch(getBillpayHistory());
          const resultDisplay = result(res, 'data.result.displayList', []);
          const dataDetail = result(objectData, 'dataDetail', {});
          dispatch(refreshStorageNew());
          dispatch(updateBalances());
          dispatch(couponCustomerCounting());
          dispatch(
            actionCreators.showPaymentModal({
              ...modalOptions,
              resultDisplay,
              type: 'SUCCESS',
              dataDetail,
            }),
          );
          dispatch(destroy('BillerTypeSixIndexForm'));
          dispatch(destroy('BillerTypeSixPayment'));
          dispatch(destroy('BillerTypeSixConfirmationForm'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.deleteCoupon());
          dispatch(actionCreators.clearBillerDescFav());
        } else {
          // eslint-disable-next-line no-undef
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
          }
        }
      })
      .catch(err => {
        // const billCode = code.concat('-Failed');
        // const os = Platform.OS;
        // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
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
          dispatch(actionCreators.hideSpinner());
          dispatch(getBillpayHistory());
          if (isBillPay) {
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
                params: {isBillPay, err},
              }),
            );
          } else {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusRevampOnboarding',
                params: {err},
              }),
            );
          }
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          const responseCode = result(err, 'data.responseCode', '');
          let errorText = getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_PAY_BILL,
          );
          if (responseCode === '98' && isWifiID) {
            errorText = language.RESPONSE_MESSAGE__RC_98_WIFI_ID;
          } else if (responseCode === '51') {
            errorText = language.RESPONSE_MESSAGE__RC_51;
          }
          dispatch(
            errorResponseResult(err, modalOptions, errorText, selectedAccount),
          );
          dispatch(destroy('BillerTypeSixIndexForm'));
          dispatch(destroy('BillerTypeSixPayment'));
          dispatch(destroy('BillerTypeSixConfirmationForm'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.deleteCoupon());
          dispatch(actionCreators.clearBillerDescFav());
        }
      });
  };
}

// BILLER TYPE SEVEN, PLN PREPAID
export function getAmountForGenericBillerTypeSeven(
  subscriberNo,
  selectedBiller,
  favBiller,
) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const isFromAD = result(state, 'flagAutoDebit.isAddNew', false);
    const billpayMethodType = isLogin ? null : '1';
    const payload = {
      billpayMethodType,
      isFromAD,
      ...middlewareUtils.prepareGenericBillerTypeSevenEnquiryPayload({
        subscriberNo,
        selectedBiller,
      }),
    };
    dispatch(actionCreators.showSpinner());
    if (isLogin) {
      return api
        .enquireGenericBill(payload, dispatch)
        .then(res => {
          dispatch(actionCreators.hideSpinner());
          dispatch(
            NavigationActions.navigate({
              routeName: 'BillerTypeSevenPayment',
              params: {
                subscriberNo,
                billDetails: res.data,
                biller: selectedBiller,
                favBiller: favBiller,
              },
            }),
          );
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          const defaultMessage =
            language.ERROR_MESSAGE__COULD_NOT_GET_AMOUNT_GENERIC_BILLER;
          OtherResponseInquiry(err, defaultMessage);
        });
    } else {
      return api
        .enquireGenericBill(payload, dispatch)
        .then(res => {
          dispatch(actionCreators.saveInquiryBiller({res}));
          return res;
        })
        .then(res => {
          dispatch(actionCreators.hideSpinner());
          dispatch(
            NavigationActions.navigate({
              routeName: 'BillerTypeSevenPayment',
              params: {
                subscriberNo,
                billDetails: res.data,
                biller: selectedBiller,
                favBiller: favBiller,
              },
            }),
          );
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          const defaultMessage =
            language.ERROR_MESSAGE__COULD_NOT_GET_AMOUNT_GENERIC_BILLER;
          OtherResponseInquiry(err, defaultMessage);
        });
    }
  };
}

export function confirmGenericBillTypeSeven(
  data,
  fromConfirmationPage = false,
) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const uniqueCode = result(state, 'inquiryBL.res.data.uniqueCode', '');
    const numberRandom = result(state, 'inquiryBL.res.data.numberRandom', 0);
    const billpayMethodType = isLogin ? null : '1';
    const isUsingVoucherUI = result(state, 'isUsingVoucherUI', '0');
    const values = result(data, 'values', {});
    const isUseSimas = result(values, 'accountNo.isUseSimas');
    const biller = result(data, 'biller', '');
    const checkingCIF = result(state, 'checkingCIFbeforeLogin', false);
    const limitBeforeLogin = result(
      state,
      'config.limitConfigAutoDebetAccount',
      '',
    );
    const searchIndexComma = indexOf(limitBeforeLogin, ',');
    const setLimitCIF = checkingCIF
      ? limitBeforeLogin.substring(0, searchIndexComma)
      : limitBeforeLogin.substring(
          searchIndexComma + 1,
          limitBeforeLogin.length,
        );
    const idAccountSelected = result(values, 'accountNo.id', '');
    const allAccounts = result(state, 'accounts', []);
    const flagEmoneyraw = find(allAccounts, function (val) {
      const productAccountName = result(val, 'id', '');
      return idAccountSelected === productAccountName;
    });
    const isDefaultAccount = find(allAccounts, function (val) {
      const productDefault = lowerCase(result(val, 'isDefaultAccount', ''));
      return productDefault === 'yes';
    });
    const switchAccountToogleBE =
      toLower(result(state, 'config.flag.primaryToogleAccount', 'inactive')) ===
      'active';
    const flagEmoney =
      result(flagEmoneyraw, 'accountType', '') === 'emoneyAccount';
    const allAmount = result(data, 'resDataTemp.amount', 0);
    const defaultToogle = result(state, 'primaryToogleAccount', false);
    const checkBalance = !isLogin
      ? result(state, 'defaultAccount.balances.availableBalance', '0')
      : result(values, 'accountNo.balances.availableBalance', '0');
    const checkAmountBalanceFLag =
      Number(setLimitCIF) < Number(allAmount)
        ? false
        : Number(checkBalance) < Number(allAmount);
    const selectedAccount =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      !isLogin &&
      checkAmountBalanceFLag
        ? isDefaultAccount
        : result(values, 'accountNo', '');
    const selectedAccountIdCoupon =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      !isLogin &&
      checkAmountBalanceFLag
        ? String(result(isDefaultAccount, 'id', ''))
        : String(result(values, 'accountNo.id', ''));
    const subscriberNo = result(data, 'subscriberNo', '');
    const description = result(
      state,
      'form.BillerTypeSevenIndexForm.values.description',
      '',
    );
    const billAmount = result(values, 'billAmount', '');
    const denomination = result(values, 'denomination', '');
    const nextRun = result(data, 'autoDebitDate', '');
    const payload = {
      billpayMethodType,
      uniqueCode,
      numberRandom,
      nextRun,
      ...middlewareUtils.prepareGenericBillerTypeSevenPayload({
        biller,
        selectedAccount,
        subscriberNo,
        description,
        billAmount,
        denomination,
      }),
    };
    dispatch(actionCreators.showSpinner());
    if (isUsingVoucherUI !== '1') {
      if (!fromConfirmationPage) {
        dispatch(actionCreators.deleteCoupon());
      }
    }
    dispatch(actionCreators.saveBillerDescFav({description: description}));
    return api
      .confirmGenericBill(payload, dispatch)
      .then(res => {
        const resData = result(res, 'data', {});
        dispatch(actionCreators.deleteUsingCouponUI());
        const billerCode = result(biller, 'billerPreferences.code', '');
        dispatch(actionCreators.savebillerCode({billerCode}));
        const dataDetail = middlewareUtils.prepareDataDetail(resData, biller);
        const type = 'billPayment';
        const transactionAmount = result(
          resData,
          'amountNumber',
          '0',
        ).toString();
        const billpayMethodType = isLogin ? null : '1';
        const payloadCoupon = {
          billerCode,
          type,
          transactionAmount,
          billpayMethodType,
          accountId: selectedAccountIdCoupon,
        };
        const transRefNum = result(state, 'transRefNum', '');
        const ownership = result(state, 'couponCheck.ownership', '');
        const voucherId = result(state, 'couponCheck.voucherId', '').toString();
        const payloadCouponCheckingValidity = {
          transactionAmount,
          transRefNum,
          voucherId,
          type,
          ownership,
          billerCode,
          billpayMethodType,
          accountId: selectedAccountIdCoupon,
        };
        const navigation = {
          routeName: 'BillerTypeSevenConfirmation',
          formIndex: 'BillerTypeSevenIndexForm',
          formPayment: 'BillerTypeSevenPayment',
          params: {
            isUseSimas,
            subscriberNo,
            biller,
            ...values,
            denomination,
            resData,
            dataDetail,
            confirmData: data,
          },
        };
        if (isLogin) {
          dispatch(
            getVoucher(
              dataDetail,
              payloadCoupon,
              payloadCouponCheckingValidity,
              navigation,
              false,
              fromConfirmationPage,
              isUseSimas,
            ),
          );
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL),
          Toast.LONG,
        );
      });
  };
}

export function detailGenericBillTypeSeven(data) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const isUsingVoucherUI = result(state, 'isUsingVoucherUI', '0');
    const numberRandom = result(state, 'inquiryBL.res.data.numberRandom', 0);
    const values = result(data, 'values', {});
    const biller = result(data, 'biller', '');
    const selectedAccount = result(values, 'accountNo', '');
    const subscriberNo = result(data, 'subscriberNo', '');
    const description = result(
      state,
      'form.BillerTypeSevenIndexForm.values.description',
      '',
    );
    const billAmount = result(values, 'billAmount', '');
    const denomination = result(values, 'denomination', '');
    const payload = {
      billpayMethodType: '1',
      numberRandom,
      ...middlewareUtils.prepareGenericBillerTypeSevenPayload({
        biller,
        selectedAccount,
        subscriberNo,
        description,
        billAmount,
        denomination,
      }),
    };
    dispatch(actionCreators.showSpinner());
    if (isUsingVoucherUI !== '1') {
      dispatch(actionCreators.deleteCoupon());
    }
    dispatch(actionCreators.saveBillerDescFav({description: description}));
    return api
      .detailGenericBill(payload, dispatch)
      .then(res => {
        const resData = result(res, 'data', {});
        dispatch(actionCreators.deleteUsingCouponUI());
        const billerCode = result(biller, 'billerPreferences.code', '');
        dispatch(actionCreators.savebillerCode({billerCode}));
        const selectedAccountCoupon = String(
          result(values, 'accountNo.id', ''),
        );
        const dataDetail = middlewareUtils.prepareDataDetail(resData, biller);
        const type = 'billPayment';
        const transactionAmount = result(
          resData,
          'amountNumber',
          '0',
        ).toString();
        const billpayMethodType = isLogin ? null : '1';
        const payloadCoupon = {
          billerCode,
          type,
          transactionAmount,
          billpayMethodType,
          accountId: selectedAccountCoupon,
        };
        const transRefNum = result(state, 'transRefNum', '');
        const ownership = result(state, 'couponCheck.ownership', '');
        const voucherId = result(state, 'couponCheck.voucherId', '').toString();
        const payloadCouponCheckingValidity = {
          transactionAmount,
          transRefNum,
          voucherId,
          type,
          ownership,
          billerCode,
          billpayMethodType,
          accountId: selectedAccountCoupon,
        };
        const navigation = {
          routeName: 'BillerTypeSevenConfirmation',
          formIndex: 'BillerTypeSevenIndexForm',
          formPayment: 'BillerTypeSevenPayment',
          params: {
            subscriberNo,
            biller,
            ...values,
            denomination,
            resData,
            dataDetail,
            confirmData: data,
          },
        };
        dispatch(
          getVoucher(
            dataDetail,
            payloadCoupon,
            payloadCouponCheckingValidity,
            navigation,
            false,
          ),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL),
          Toast.LONG,
        );
      });
  };
}

export function payGenericBillTypeSeven(objectData, isBillPay) {
  return (dispatch, getState) => {
    const storeState = getState();
    const resData = result(objectData, 'resData', {});
    const smsOtp = result(storeState, 'form.AuthenticateForm.values.otp', '');
    const easyPin = result(
      storeState,
      'form.AuthenticateForm.values.easypin',
      '',
    );
    const simasToken = result(
      storeState,
      'form.AuthenticateForm.values.simasToken',
      '',
    );
    const biller = result(objectData, 'biller', '');
    const checkingCIF = result(storeState, 'checkingCIFbeforeLogin', false);
    const limitBeforeLogin = result(
      storeState,
      'config.limitConfigAutoDebetAccount',
      '',
    );
    const searchIndexComma = indexOf(limitBeforeLogin, ',');
    const setLimitCIF = checkingCIF
      ? limitBeforeLogin.substring(0, searchIndexComma)
      : limitBeforeLogin.substring(
          searchIndexComma + 1,
          limitBeforeLogin.length,
        );
    const idAccountSelected = result(objectData, 'accountNo.id', '');
    const allAccounts = result(storeState, 'accounts', []);
    const flagEmoneyraw = find(allAccounts, function (val) {
      const productAccountName = result(val, 'id', '');
      return idAccountSelected === productAccountName;
    });
    const isDefaultAccount = find(allAccounts, function (val) {
      const productDefault = lowerCase(result(val, 'isDefaultAccount', ''));
      return productDefault === 'yes';
    });
    const switchAccountToogleBE =
      toLower(
        result(storeState, 'config.flag.primaryToogleAccount', 'inactive'),
      ) === 'active';
    const flagEmoney =
      result(flagEmoneyraw, 'accountType', '') === 'emoneyAccount';
    const allAmount = result(objectData, 'resData.amount', 0);
    const defaultToogle = result(storeState, 'primaryToogleAccount', false);
    const checkBalance = isBillPay
      ? result(storeState, 'defaultAccount.balances.availableBalance', '')
      : result(objectData, 'accountNo.balances.availableBalance', '');
    const checkAmountBalanceFLag =
      Number(setLimitCIF) < Number(allAmount)
        ? false
        : Number(checkBalance) < Number(allAmount);
    const selectedAccount =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      isBillPay &&
      checkAmountBalanceFLag
        ? isDefaultAccount
        : result(objectData, 'accountNo', '');
    const isUseSimas = result(selectedAccount, 'isUseSimas');
    const subscriberNo = result(objectData, 'subscriberNo', '');
    const transRefNum = storeState.transRefNum;
    const billAmount = result(objectData, 'denomination.value');
    const denomination = result(objectData, 'denomination', '');
    const lang = result(storeState, 'currentLanguage.id', 'id');
    const isFavorite = result(storeState, 'billerDescFav.isFavorite', '');
    const billerFavorite = result(storeState, 'billerFavorite', {});
    const descFav = find(
      billerFavorite,
      fav => subscriberNo === fav.subscriberNo,
    );
    const descInput =
      result(descFav, 'description', '') === ''
        ? result(objectData, 'resData.descInput', '')
        : result(descFav, 'description', '');
    // const code = result(biller, 'billerPreferences.code', '');
    let description = '';
    if (isFavorite === 'yes') {
      description =
        result(storeState, 'billerDescFav.description', '') === ''
          ? descInput
          : result(storeState, 'billerDescFav.description', '');
    } else {
      description =
        result(storeState, 'billerDescFav.description', '') === ''
          ? result(objectData, 'resData.descInput', '')
          : result(storeState, 'billerDescFav.description', '');
    }
    const transactionType =
      lang === 'id'
        ? language.GENERIC_BILLER__PAYMENT + biller.name
        : biller.name + language.GENERIC_BILLER__PAYMENT;
    const payloadRaw = middlewareUtils.prepareGenericBillerTypeSevenPayload({
      smsOtp,
      simasToken,
      subscriberNo,
      biller,
      selectedAccount,
      transRefNum,
      description,
      billAmount,
      denomination,
      isFavorite,
      easyPin,
    });
    const voucherId = result(
      storeState,
      'couponCheck.voucherId',
      '',
    ).toString();
    const ownership = result(storeState, 'couponCheck.ownership', '');
    const additionalInfoMap = {voucherId, ownership};
    const isAutoDebet = result(storeState, 'flagAutoDebit.isRegular', false);
    const nextRun = result(objectData, 'nextAutodebit', '');
    const autoDebitDate = result(storeState, 'flagAutoDebit.date', '');
    const autoDebitStartDate = moment(nextRun, 'YYYY-MM-DD').format(
      'DD MMM YYYY',
    );
    const payload = {...payloadRaw, additionalInfoMap, ownership, isAutoDebet};
    const isGenericBiller = 'yes';
    const iscounterTrxData = result(storeState, 'counterTrxData', true);
    const modalOptions = {
      heading: `${subscriberNo}`,
      subheading: `${biller.name}`,
      amount: `Rp ${currencyFormatter(payload.billAmount)}`,
      transactionType,
      transactionId: transRefNum,
      accountFrom: selectedAccount,
      resData: resData,
      isGenericBiller,
      isUseSimas,
      isAutodebitRegis: isAutoDebet,
      autoDebitStartDate,
      autoDebitDate,
    };
    const descriptionCouponSuccess = result(
      storeState,
      'couponCheck.description',
      '',
    );
    const flagMgm = result(storeState, 'config.hideNotifMGM', '');
    const flagMgmOn = lowerCase(flagMgm) === 'yes';
    dispatch(actionCreators.saveCouponSuccessStatus(descriptionCouponSuccess));
    dispatch(
      actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}),
    );
    dispatch(actionCreators.showSpinner());
    return api
      .resultGenericBill(payload, dispatch)
      .then(res => {
        const transRefNum = result(res, 'data.transRefNum', '');
        const subs1 = transRefNum.substring(6, 8);
        const ipassport = result(
          storeState,
          'additionalApiPayload.ipassport',
          '',
        );
        const subs2 = transRefNum.substring(
          transRefNum.length - 2,
          transRefNum.length,
        );
        const subs3 = ipassport.substring(4, 9);
        const transactionCode = subs1 + subs2 + subs3;
        const respon = result(res, 'data.responseCode', '');
        const code = md5(transactionCode);
        const checkCode = result(res, 'data.checkingCode', '');
        const uniCode = code === checkCode;
        dispatch(actionCreators.hideSpinner());
        if (respon === '00' && uniCode) {
          if (voucherId !== '' || isUseSimas) {
            dispatch(inquirySimasPoin());
          }
          if (isBillPay) {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
                params: {isBillPay},
              }),
            );
          } else {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
              }),
            );
          }
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          // const billCode = code.concat('-Success');
          // const os = Platform.OS;
          // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
          dispatch(getBillpayHistory());
          const resultDisplay = result(res, 'data.result.displayList', []);
          const dataDetail = result(objectData, 'dataDetail', {});
          if (iscounterTrxData === false) {
            dispatch(refreshStorageNew());
          } else {
            dispatch(updateBalances());
            dispatch(getLuckyDipTicket());
          }
          dispatch(couponCustomerCounting());
          dispatch(
            actionCreators.showPaymentModal({
              ...modalOptions,
              resultDisplay,
              type: 'SUCCESS',
              dataDetail,
            }),
          );
          dispatch(destroy('BillerTypeSevenIndexForm'));
          dispatch(destroy('BillerTypeSevenPayment'));
          dispatch(destroy('BillerTypeSevenConfirmationForm'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.deleteCoupon());
          dispatch(actionCreators.clearBillerDescFav());
        } else {
          // eslint-disable-next-line no-undef
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
          }
        }
      })
      .catch(err => {
        // const billCode = code.concat('-Failed');
        // const os = Platform.OS;
        // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
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
          dispatch(actionCreators.hideSpinner());
          dispatch(getBillpayHistory());
          if (isBillPay) {
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
                params: {isBillPay},
              }),
            );
          } else {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
              }),
            );
          }
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          const resultDisplay = result(err, 'data.result.displayList', []);
          let errorText = getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_PAY_BILL,
          );
          const responseCode = result(err, 'data.responseCode', '');
          if (responseCode === '51') {
            errorText = language.RESPONSE_MESSAGE__RC_51;
          }
          dispatch(
            errorResponseResult(
              err,
              modalOptions,
              resultDisplay,
              errorText,
              selectedAccount,
            ),
          );
          dispatch(destroy('BillerTypeSevenIndexForm'));
          dispatch(destroy('BillerTypeSevenPayment'));
          dispatch(destroy('BillerTypeSevenConfirmationForm'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.deleteCoupon());
          dispatch(actionCreators.clearBillerDescFav());
        }
      });
  };
}

// BILLER TYPE EIGHT, KAI
export function getAmountForGenericBillerTypeEight(
  subscriberNo,
  selectedBiller,
  favBiller,
) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const isFromAD = result(state, 'flagAutoDebit.isAddNew', false);
    const billpayMethodType = isLogin ? null : '1';
    const payload = {
      billpayMethodType,
      isFromAD,
      ...middlewareUtils.prepareGenericBillerTypeEightEnquiryPayload({
        subscriberNo,
        selectedBiller,
      }),
    };
    dispatch(actionCreators.showSpinner());
    if (isLogin) {
      return api
        .enquireGenericBill(payload, dispatch)
        .then(res => {
          dispatch(actionCreators.hideSpinner());
          dispatch(
            NavigationActions.navigate({
              routeName: 'BillerTypeEightPayment',
              params: {
                subscriberNo,
                billDetails: res.data,
                biller: selectedBiller,
                favBiller: favBiller,
              },
            }),
          );
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          const defaultMessage =
            language.ERROR_MESSAGE__COULD_NOT_GET_AMOUNT_GENERIC_BILLER;
          OtherResponseInquiry(err, defaultMessage);
        });
    } else {
      return api
        .enquireGenericBill(payload, dispatch)
        .then(res => {
          dispatch(actionCreators.saveInquiryBiller({res}));
          return res;
        })
        .then(res => {
          dispatch(actionCreators.hideSpinner());
          dispatch(
            NavigationActions.navigate({
              routeName: 'BillerTypeEightPayment',
              params: {
                subscriberNo,
                billDetails: res.data,
                biller: selectedBiller,
                favBiller: favBiller,
              },
            }),
          );
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          const defaultMessage =
            language.ERROR_MESSAGE__COULD_NOT_GET_AMOUNT_GENERIC_BILLER;
          OtherResponseInquiry(err, defaultMessage);
        });
    }
  };
}

export function confirmGenericBillTypeEight(
  data,
  fromConfirmationPage = false,
) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const uniqueCode = result(state, 'inquiryBL.res.data.uniqueCode', '');
    const numberRandom = result(state, 'inquiryBL.res.data.numberRandom', 0);
    const billpayMethodType = isLogin ? null : '1';
    const isUsingVoucherUI = result(state, 'isUsingVoucherUI', '0');
    const values = result(data, 'values', {});
    const isUseSimas = result(values, 'accountNo.isUseSimas');
    const biller = result(data, 'biller', {});
    const checkingCIF = result(state, 'checkingCIFbeforeLogin', false);
    const limitBeforeLogin = result(
      state,
      'config.limitConfigAutoDebetAccount',
      '',
    );
    const searchIndexComma = indexOf(limitBeforeLogin, ',');
    const setLimitCIF = checkingCIF
      ? limitBeforeLogin.substring(0, searchIndexComma)
      : limitBeforeLogin.substring(
          searchIndexComma + 1,
          limitBeforeLogin.length,
        );
    const billDetails = result(data, 'billDetails', {});
    const idAccountSelected = result(values, 'accountNo.id', '');
    const allAccounts = result(state, 'accounts', []);
    const flagEmoneyraw = find(allAccounts, function (val) {
      const productAccountName = result(val, 'id', '');
      return idAccountSelected === productAccountName;
    });
    const isDefaultAccount = find(allAccounts, function (val) {
      const productDefault = lowerCase(result(val, 'isDefaultAccount', ''));
      return productDefault === 'yes';
    });
    const switchAccountToogleBE =
      toLower(result(state, 'config.flag.primaryToogleAccount', 'inactive')) ===
      'active';
    const flagEmoney =
      result(flagEmoneyraw, 'accountType', '') === 'emoneyAccount';
    const allAmount = result(data, 'resDataTemp.amount', 0);
    const defaultToogle = result(state, 'primaryToogleAccount', false);
    const checkBalance = !isLogin
      ? result(state, 'defaultAccount.balances.availableBalance', '0')
      : result(values, 'accountNo.balances.availableBalance', '0');
    const checkAmountBalanceFLag =
      Number(setLimitCIF) < Number(allAmount)
        ? false
        : Number(checkBalance) < Number(allAmount);
    const selectedAccount =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      !isLogin &&
      checkAmountBalanceFLag
        ? isDefaultAccount
        : result(values, 'accountNo', '');
    const selectedAccountIdCoupon =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      !isLogin &&
      checkAmountBalanceFLag
        ? String(result(isDefaultAccount, 'id', ''))
        : String(result(values, 'accountNo.id', ''));
    const subscriberNo = result(data, 'subscriberNo', '');
    const description = result(
      state,
      'form.BillerTypeEightIndexForm.values.description',
      '',
    );
    const billAmount = result(billDetails, 'billAmount', '');
    const nextRun = result(data, 'autoDebitDate', '');
    const payload = {
      billpayMethodType,
      numberRandom,
      nextRun,
      ...middlewareUtils.prepareGenericBillerTypeEightPayload({
        biller,
        selectedAccount,
        subscriberNo,
        description,
        billAmount,
        uniqueCode,
      }),
    };
    dispatch(actionCreators.showSpinner());
    if (isUsingVoucherUI !== '1') {
      if (!fromConfirmationPage) {
        dispatch(actionCreators.deleteCoupon());
      }
    }
    dispatch(actionCreators.saveBillerDescFav({description: description}));
    return api
      .confirmGenericBill(payload, dispatch)
      .then(res => {
        const resData = result(res, 'data', {});
        dispatch(actionCreators.deleteUsingCouponUI());
        const billerCode = result(biller, 'billerPreferences.code', '');
        dispatch(actionCreators.savebillerCode({billerCode}));
        const dataDetail = middlewareUtils.prepareDataDetail(resData, biller);
        const type = 'billPayment';
        const transactionAmount = result(
          resData,
          'amountNumber',
          '0',
        ).toString();
        const billpayMethodType = isLogin ? null : '1';
        const payloadCoupon = {
          billerCode,
          type,
          transactionAmount,
          billpayMethodType,
          accountId: selectedAccountIdCoupon,
        };
        const transRefNum = result(state, 'transRefNum', '');
        const ownership = result(state, 'couponCheck.ownership', '');
        const voucherId = result(state, 'couponCheck.voucherId', '').toString();
        const payloadCouponCheckingValidity = {
          transactionAmount,
          transRefNum,
          voucherId,
          type,
          ownership,
          billerCode,
          billpayMethodType,
          accountId: selectedAccountIdCoupon,
        };
        const navigation = {
          routeName: 'BillerTypeEightConfirmation',
          formIndex: 'BillerTypeEightIndexForm',
          formPayment: 'BillerTypeEightPayment',
          params: {
            isUseSimas,
            subscriberNo,
            biller,
            ...values,
            resData,
            dataDetail,
            confirmData: data,
          },
        };
        if (isLogin) {
          dispatch(
            getVoucher(
              dataDetail,
              payloadCoupon,
              payloadCouponCheckingValidity,
              navigation,
              false,
              fromConfirmationPage,
              isUseSimas,
            ),
          );
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL),
          Toast.LONG,
        );
      });
  };
}

export function detailGenericBillTypeEight(data) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const isUsingVoucherUI = result(state, 'isUsingVoucherUI', '0');
    const numberRandom = result(state, 'inquiryBL.res.data.numberRandom', 0);
    const values = result(data, 'values', {});
    const biller = result(data, 'biller', {});
    const billDetails = result(data, 'billDetails', {});
    const selectedAccount = result(values, 'accountNo', '');
    const subscriberNo = result(data, 'subscriberNo', '');
    const description = result(
      state,
      'form.BillerTypeEightIndexForm.values.description',
      '',
    );
    const billAmount = result(billDetails, 'billAmount', '');
    const payload = {
      billpayMethodType: '1',
      numberRandom,
      ...middlewareUtils.prepareGenericBillerTypeEightPayload({
        biller,
        selectedAccount,
        subscriberNo,
        description,
        billAmount,
      }),
    };
    dispatch(actionCreators.showSpinner());
    if (isUsingVoucherUI !== '1') {
      dispatch(actionCreators.deleteCoupon());
    }
    dispatch(actionCreators.saveBillerDescFav({description: description}));
    return api
      .detailGenericBill(payload, dispatch)
      .then(res => {
        const resData = result(res, 'data', {});
        dispatch(actionCreators.deleteUsingCouponUI());
        const billerCode = result(biller, 'billerPreferences.code', '');
        dispatch(actionCreators.savebillerCode({billerCode}));
        const selectedAccountCoupon = String(
          result(values, 'accountNo.id', ''),
        );
        const dataDetail = middlewareUtils.prepareDataDetail(resData, biller);
        const type = 'billPayment';
        const transactionAmount = result(
          resData,
          'amountNumber',
          '0',
        ).toString();
        const billpayMethodType = isLogin ? null : '1';
        const payloadCoupon = {
          billerCode,
          type,
          transactionAmount,
          billpayMethodType,
          accountId: selectedAccountCoupon,
        };
        const transRefNum = result(state, 'transRefNum', '');
        const ownership = result(state, 'couponCheck.ownership', '');
        const voucherId = result(state, 'couponCheck.voucherId', '').toString();
        const payloadCouponCheckingValidity = {
          transactionAmount,
          transRefNum,
          voucherId,
          type,
          ownership,
          billerCode,
          billpayMethodType,
          accountId: selectedAccountCoupon,
        };
        // const isOwnAccount = false;
        // const tokenConfig = (result(getState(), 'config.tokenConfig', []));
        // const shouldSendSmsOtp = getTransactionType(billAmount, tokenConfig, isOwnAccount) === '0';
        const navigation = {
          routeName: 'BillerTypeEightConfirmation',
          formIndex: 'BillerTypeEightIndexForm',
          formPayment: 'BillerTypeEightPayment',
          params: {
            subscriberNo,
            biller,
            ...values,
            resData,
            dataDetail,
            confirmData: data,
          },
        };
        dispatch(
          getVoucher(
            dataDetail,
            payloadCoupon,
            payloadCouponCheckingValidity,
            navigation,
            false,
          ),
        );
        // if (shouldSendSmsOtp === false) {
        //   const navigation = {routeName: 'BillerTypeEightConfirmation', formIndex: 'BillerTypeEightIndexForm', formPayment: 'BillerTypeEightPayment', params: {subscriberNo, biller, ...values, resData, dataDetail, confirmData: data}};
        //   dispatch(getVoucher(dataDetail, payloadCoupon, payloadCouponCheckingValidity, navigation, false));
        // } else {
        //   dispatch(actionCreators.hideSpinner());
        //   Toast.show(language.BRFORE_LOGIN__DISCLAIMER_AMOUNT, Toast.LONG);
        // }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL),
          Toast.LONG,
        );
      });
  };
}

export function payGenericBillTypeEight(objectData, isBillPay) {
  return (dispatch, getState) => {
    const storeState = getState();
    const resData = result(objectData, 'resData', {});
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
    const biller = result(objectData, 'biller', '');
    const checkingCIF = result(storeState, 'checkingCIFbeforeLogin', false);
    const limitBeforeLogin = result(
      storeState,
      'config.limitConfigAutoDebetAccount',
      '',
    );
    const searchIndexComma = indexOf(limitBeforeLogin, ',');
    const setLimitCIF = checkingCIF
      ? limitBeforeLogin.substring(0, searchIndexComma)
      : limitBeforeLogin.substring(
          searchIndexComma + 1,
          limitBeforeLogin.length,
        );
    const amount = result(objectData, 'resData.amount', '');
    const billAmount = result(objectData, 'resData.billAmount', '');
    const idAccountSelected = result(objectData, 'accountNo.id', '');
    const allAccounts = result(storeState, 'accounts', []);
    const flagEmoneyraw = find(allAccounts, function (val) {
      const productAccountName = result(val, 'id', '');
      return idAccountSelected === productAccountName;
    });
    const isDefaultAccount = find(allAccounts, function (val) {
      const productDefault = lowerCase(result(val, 'isDefaultAccount', ''));
      return productDefault === 'yes';
    });
    const switchAccountToogleBE =
      toLower(
        result(storeState, 'config.flag.primaryToogleAccount', 'inactive'),
      ) === 'active';
    const flagEmoney =
      result(flagEmoneyraw, 'accountType', '') === 'emoneyAccount';
    const allAmount = result(objectData, 'resData.amount', 0);
    const defaultToogle = result(storeState, 'primaryToogleAccount', false);
    const checkBalance = isBillPay
      ? result(storeState, 'defaultAccount.balances.availableBalance', '')
      : result(objectData, 'accountNo.balances.availableBalance', '');
    const checkAmountBalanceFLag =
      Number(setLimitCIF) < Number(allAmount)
        ? false
        : Number(checkBalance) < Number(allAmount);
    const selectedAccount =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      isBillPay &&
      checkAmountBalanceFLag
        ? isDefaultAccount
        : result(objectData, 'accountNo', '');
    const isUseSimas = result(selectedAccount, 'isUseSimas');
    const subscriberNo = result(objectData, 'subscriberNo', '');
    const transRefNum = storeState.transRefNum;
    const lang = result(storeState, 'currentLanguage.id', 'id');
    const isFavorite = result(storeState, 'billerDescFav.isFavorite', '');
    const billerFavorite = result(storeState, 'billerFavorite', {});
    const descFav = find(
      billerFavorite,
      fav => subscriberNo === fav.subscriberNo,
    );
    const descInput =
      result(descFav, 'description', '') === ''
        ? result(objectData, 'resData.descInput', '')
        : result(descFav, 'description', '');
    // const code = result(biller, 'billerPreferences.code', '');
    let description = '';
    if (isFavorite === 'yes') {
      description =
        result(storeState, 'billerDescFav.description', '') === ''
          ? descInput
          : result(storeState, 'billerDescFav.description', '');
    } else {
      description =
        result(storeState, 'billerDescFav.description', '') === ''
          ? result(objectData, 'resData.descInput', '')
          : result(storeState, 'billerDescFav.description', '');
    }
    const transactionType =
      lang === 'id'
        ? language.GENERIC_BILLER__PAYMENT + biller.name
        : biller.name + language.GENERIC_BILLER__PAYMENT;
    const payloadRaw = middlewareUtils.prepareGenericBillerTypeEightPayload({
      easyPin,
      smsOtp,
      simasToken,
      subscriberNo,
      biller,
      amount,
      billAmount,
      selectedAccount,
      transRefNum,
      description,
      isFavorite,
    });
    const voucherId = result(
      storeState,
      'couponCheck.voucherId',
      '',
    ).toString();
    const ownership = result(storeState, 'couponCheck.ownership', '');
    const additionalInfoMap = {voucherId, ownership};
    const isAutoDebet = result(storeState, 'flagAutoDebit.isRegular', false);
    const nextRun = result(objectData, 'nextAutodebit', '');
    const autoDebitDate = result(storeState, 'flagAutoDebit.date', '');
    const autoDebitStartDate = moment(nextRun, 'YYYY-MM-DD').format(
      'DD MMM YYYY',
    );
    const payload = {...payloadRaw, additionalInfoMap, ownership, isAutoDebet};
    const isGenericBiller = 'yes';
    const modalOptions = {
      heading: `${subscriberNo}`,
      subheading: `${biller.name}`,
      amount: `Rp ${currencyFormatter(payload.billAmount)}`,
      transactionType,
      transactionId: transRefNum,
      accountFrom: selectedAccount,
      resData: resData,
      isGenericBiller,
      isUseSimas,
      isAutodebitRegis: isAutoDebet,
      autoDebitDate,
      autoDebitStartDate,
    };
    const descriptionCouponSuccess = result(
      storeState,
      'couponCheck.description',
      '',
    );
    const flagMgm = result(storeState, 'config.hideNotifMGM', '');
    const flagMgmOn = lowerCase(flagMgm) === 'yes';
    dispatch(actionCreators.saveCouponSuccessStatus(descriptionCouponSuccess));
    dispatch(
      actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}),
    );
    dispatch(actionCreators.showSpinner());
    return api
      .resultGenericBill(payload, dispatch)
      .then(res => {
        const transRefNum = result(res, 'data.transRefNum', '');
        const subs1 = transRefNum.substring(6, 8);
        const ipassport = result(
          storeState,
          'additionalApiPayload.ipassport',
          '',
        );
        const subs2 = transRefNum.substring(
          transRefNum.length - 2,
          transRefNum.length,
        );
        const subs3 = ipassport.substring(4, 9);
        const transactionCode = subs1 + subs2 + subs3;
        const respon = result(res, 'data.responseCode', '');
        const code = md5(transactionCode);
        const checkCode = result(res, 'data.checkingCode', '');
        const uniCode = code === checkCode;
        dispatch(actionCreators.hideSpinner());
        if (respon === '00' && uniCode) {
          if (voucherId !== '' || isUseSimas) {
            dispatch(inquirySimasPoin());
          }
          if (isBillPay) {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
                params: {isBillPay},
              }),
            );
          } else {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
              }),
            );
          }
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          // const billCode = code.concat('-Success');
          // const os = Platform.OS;
          // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
          dispatch(getBillpayHistory());
          const resultDisplay = result(res, 'data.result.displayList', []);
          const dataDetail = result(objectData, 'dataDetail', {});
          const biller = result(objectData, 'biller', '');
          const billerCode = result(biller, 'billerPreferences.code', '');
          dispatch(refreshStorageNew());
          dispatch(updateBalances());
          dispatch(couponCustomerCounting());
          dispatch(
            actionCreators.showPaymentModal({
              ...modalOptions,
              resultDisplay,
              type: 'SUCCESS',
              dataDetail,
              billerCode: billerCode,
            }),
          );
          dispatch(destroy('BillerTypeEightIndexForm'));
          dispatch(destroy('BillerTypeEightPayment'));
          dispatch(destroy('BillerTypeEightConfirmationForm'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.deleteCoupon());
          dispatch(actionCreators.clearBillerDescFav());
        } else {
          // eslint-disable-next-line no-undef
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
          }
        }
      })
      .catch(err => {
        // const billCode = code.concat('-Failed');
        // const os = Platform.OS;
        // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
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
          dispatch(actionCreators.hideSpinner());
          dispatch(getBillpayHistory());
          if (isBillPay) {
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
                params: {isBillPay},
              }),
            );
          } else {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
              }),
            );
          }
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          const resultDisplay = result(err, 'data.result.displayList', []);
          let errorText = getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_PAY_BILL,
          );
          const responseCode = result(err, 'data.responseCode', '');
          if (responseCode === '51') {
            errorText = language.RESPONSE_MESSAGE__RC_51;
          }
          dispatch(
            errorResponseResult(
              err,
              modalOptions,
              resultDisplay,
              errorText,
              selectedAccount,
            ),
          );
          dispatch(destroy('BillerTypeEightIndexForm'));
          dispatch(destroy('BillerTypeEightPayment'));
          dispatch(destroy('BillerTypeEightConfirmationForm'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.deleteCoupon());
          dispatch(actionCreators.clearBillerDescFav());
        }
      });
  };
}

// BILLER TYPE NINE, BIG TV PREPAID
export function getAmountForGenericBillerTypeNine(
  subscriberNo,
  selectedBiller,
  favBiller,
) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const isFromAD = result(state, 'flagAutoDebit.isAddNew', false);
    const billpayMethodType = isLogin ? null : '1';
    const payload = {
      billpayMethodType,
      isFromAD,
      ...middlewareUtils.prepareGenericBillerTypeNineEnquiryPayload({
        subscriberNo,
        selectedBiller,
      }),
    };
    dispatch(actionCreators.showSpinner());
    if (isLogin) {
      return api
        .enquireGenericBill(payload, dispatch)
        .then(res => {
          dispatch(actionCreators.hideSpinner());
          dispatch(
            NavigationActions.navigate({
              routeName: 'BillerTypeNinePayment',
              params: {
                subscriberNo,
                billDetails: res.data,
                biller: selectedBiller,
                favBiller: favBiller,
              },
            }),
          );
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          const defaultMessage =
            language.ERROR_MESSAGE__COULD_NOT_GET_AMOUNT_GENERIC_BILLER;
          OtherResponseInquiry(err, defaultMessage);
        });
    } else {
      return api
        .enquireGenericBill(payload, dispatch)
        .then(res => {
          dispatch(actionCreators.saveInquiryBiller({res}));
          return res;
        })
        .then(res => {
          dispatch(actionCreators.hideSpinner());
          dispatch(
            NavigationActions.navigate({
              routeName: 'BillerTypeNinePayment',
              params: {
                subscriberNo,
                billDetails: res.data,
                biller: selectedBiller,
                favBiller: favBiller,
              },
            }),
          );
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          const defaultMessage =
            language.ERROR_MESSAGE__COULD_NOT_GET_AMOUNT_GENERIC_BILLER;
          OtherResponseInquiry(err, defaultMessage);
        });
    }
  };
}

export function confirmGenericBillTypeNine(data, fromConfirmationPage = false) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const uniqueCode = result(state, 'inquiryBL.res.data.uniqueCode', '');
    const billpayMethodType = isLogin ? null : '1';
    const isUsingVoucherUI = result(state, 'isUsingVoucherUI', '0');
    const values = result(data, 'values', {});
    const isUseSimas = result(values, 'accountNo.isUseSimas');
    const biller = result(data, 'biller', '');
    const checkingCIF = result(state, 'checkingCIFbeforeLogin', false);
    const limitBeforeLogin = result(
      state,
      'config.limitConfigAutoDebetAccount',
      '',
    );
    const searchIndexComma = indexOf(limitBeforeLogin, ',');
    const setLimitCIF = checkingCIF
      ? limitBeforeLogin.substring(0, searchIndexComma)
      : limitBeforeLogin.substring(
          searchIndexComma + 1,
          limitBeforeLogin.length,
        );
    const idAccountSelected = result(values, 'accountNo.id', '');
    const allAccounts = result(state, 'accounts', []);
    const flagEmoneyraw = find(allAccounts, function (val) {
      const productAccountName = result(val, 'id', '');
      return idAccountSelected === productAccountName;
    });
    const isDefaultAccount = find(allAccounts, function (val) {
      const productDefault = lowerCase(result(val, 'isDefaultAccount', ''));
      return productDefault === 'yes';
    });
    const switchAccountToogleBE =
      toLower(result(state, 'config.flag.primaryToogleAccount', 'inactive')) ===
      'active';
    const flagEmoney =
      result(flagEmoneyraw, 'accountType', '') === 'emoneyAccount';
    const allAmount = result(data, 'resDataTemp.amount', 0);
    const defaultToogle = result(state, 'primaryToogleAccount', false);
    const checkBalance = !isLogin
      ? result(state, 'defaultAccount.balances.availableBalance', '0')
      : result(values, 'accountNo.balances.availableBalance', '0');
    const checkAmountBalanceFLag =
      Number(setLimitCIF) < Number(allAmount)
        ? false
        : Number(checkBalance) < Number(allAmount);
    const selectedAccount =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      !isLogin &&
      checkAmountBalanceFLag
        ? isDefaultAccount
        : result(values, 'accountNo', '');
    const selectedAccountIdCoupon =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      !isLogin &&
      checkAmountBalanceFLag
        ? String(result(isDefaultAccount, 'id', ''))
        : String(result(values, 'accountNo.id', ''));
    const subscriberNo = result(data, 'subscriberNo', '');
    const description = result(
      state,
      'form.BillerTypeNineIndexForm.values.description',
      '',
    );
    const denomination = result(values, 'denomination', '');
    const nextRun = result(data, 'autoDebitDate', '');
    const payload = {
      billpayMethodType,
      nextRun,
      ...middlewareUtils.prepareGenericBillerTypeNinePayload({
        biller,
        selectedAccount,
        subscriberNo,
        description,
        denomination,
        uniqueCode,
      }),
    };
    dispatch(actionCreators.showSpinner());
    if (isUsingVoucherUI !== '1') {
      if (!fromConfirmationPage) {
        dispatch(actionCreators.deleteCoupon());
      }
    }
    dispatch(actionCreators.saveBillerDescFav({description: description}));
    return api
      .confirmGenericBill(payload, dispatch)
      .then(res => {
        const resData = result(res, 'data', {});
        dispatch(actionCreators.deleteUsingCouponUI());
        const billerCode = result(biller, 'billerPreferences.code', '');
        dispatch(actionCreators.savebillerCode({billerCode}));
        const dataDetail = middlewareUtils.prepareDataDetail(resData, biller);

        const type = 'billPayment';
        const transactionAmount = result(
          resData,
          'amountNumber',
          '0',
        ).toString();
        const billpayMethodType = isLogin ? null : '1';
        const payloadCoupon = {
          billerCode,
          type,
          transactionAmount,
          billpayMethodType,
          accountId: selectedAccountIdCoupon,
        };
        const transRefNum = result(state, 'transRefNum', '');
        const ownership = result(state, 'couponCheck.ownership', '');
        const voucherId = result(state, 'couponCheck.voucherId', '').toString();
        const payloadCouponCheckingValidity = {
          transactionAmount,
          transRefNum,
          voucherId,
          type,
          ownership,
          billerCode,
          billpayMethodType,
          accountId: selectedAccountIdCoupon,
        };
        const navigation = {
          routeName: 'BillerTypeNineConfirmation',
          formIndex: 'BillerTypeNineIndexForm',
          formPayment: 'BillerTypeNinePayment',
          params: {
            isUseSimas,
            subscriberNo,
            biller,
            ...values,
            resData,
            denomination,
            dataDetail,
            confirmData: data,
          },
        };
        if (isLogin) {
          dispatch(
            getVoucher(
              dataDetail,
              payloadCoupon,
              payloadCouponCheckingValidity,
              navigation,
              false,
              fromConfirmationPage,
              isUseSimas,
            ),
          );
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL),
          Toast.LONG,
        );
      });
  };
}

export function detailGenericBillTypeNine(data) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const isUsingVoucherUI = result(state, 'isUsingVoucherUI', '0');
    const values = result(data, 'values', {});
    const biller = result(data, 'biller', '');
    const selectedAccount = result(values, 'accountNo', '');
    const subscriberNo = result(data, 'subscriberNo', '');
    const description = result(
      state,
      'form.BillerTypeNineIndexForm.values.description',
      '',
    );
    const denomination = result(values, 'denomination', '');
    const payload = {
      billpayMethodType: '1',
      ...middlewareUtils.prepareGenericBillerTypeNinePayload({
        biller,
        selectedAccount,
        subscriberNo,
        description,
        denomination,
      }),
    };
    dispatch(actionCreators.showSpinner());
    if (isUsingVoucherUI !== '1') {
      dispatch(actionCreators.deleteCoupon());
    }
    dispatch(actionCreators.saveBillerDescFav({description: description}));
    return api
      .detailGenericBill(payload, dispatch)
      .then(res => {
        const resData = result(res, 'data', {});
        dispatch(actionCreators.deleteUsingCouponUI());
        const billerCode = result(biller, 'billerPreferences.code', '');
        dispatch(actionCreators.savebillerCode({billerCode}));
        const dataDetail = middlewareUtils.prepareDataDetail(resData, biller);
        const selectedAccountCoupon = String(
          result(values, 'accountNo.id', ''),
        );
        const type = 'billPayment';
        const transactionAmount = result(
          resData,
          'amountNumber',
          '0',
        ).toString();
        const billpayMethodType = isLogin ? null : '1';
        const payloadCoupon = {
          billerCode,
          type,
          transactionAmount,
          billpayMethodType,
          accountId: selectedAccountCoupon,
        };
        const transRefNum = result(state, 'transRefNum', '');
        const ownership = result(state, 'couponCheck.ownership', '');
        const voucherId = result(state, 'couponCheck.voucherId', '').toString();
        const payloadCouponCheckingValidity = {
          transactionAmount,
          transRefNum,
          voucherId,
          type,
          ownership,
          billerCode,
          billpayMethodType,
          accountId: selectedAccountCoupon,
        };
        // const isOwnAccount = false;
        // const tokenConfig = (result(getState(), 'config.tokenConfig', []));
        // const shouldSendSmsOtp = getTransactionType(denomination, tokenConfig, isOwnAccount) === '0';
        const navigation = {
          routeName: 'BillerTypeNineConfirmation',
          formIndex: 'BillerTypeNineIndexForm',
          formPayment: 'BillerTypeNinePayment',
          params: {
            subscriberNo,
            biller,
            ...values,
            resData,
            denomination,
            dataDetail,
            confirmData: data,
          },
        };
        dispatch(
          getVoucher(
            dataDetail,
            payloadCoupon,
            payloadCouponCheckingValidity,
            navigation,
            false,
          ),
        );
        // if (shouldSendSmsOtp === false) {
        //   const navigation = {routeName: 'BillerTypeNineConfirmation', formIndex: 'BillerTypeNineIndexForm', formPayment: 'BillerTypeNinePayment', params: {subscriberNo, biller, ...values, resData, denomination, dataDetail, confirmData: data}};
        //   dispatch(getVoucher(dataDetail, payloadCoupon, payloadCouponCheckingValidity, navigation, false));
        // } else {
        //   dispatch(actionCreators.hideSpinner());
        //   Toast.show(language.BRFORE_LOGIN__DISCLAIMER_AMOUNT, Toast.LONG);
        // }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL),
          Toast.LONG,
        );
      });
  };
}

export function payGenericBillTypeNine(objectData, isBillPay) {
  return (dispatch, getState) => {
    const storeState = getState();
    const resData = result(objectData, 'resData', {});
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
    const biller = result(objectData, 'biller', '');
    const checkingCIF = result(storeState, 'checkingCIFbeforeLogin', false);
    const limitBeforeLogin = result(
      storeState,
      'config.limitConfigAutoDebetAccount',
      '',
    );
    const searchIndexComma = indexOf(limitBeforeLogin, ',');
    const setLimitCIF = checkingCIF
      ? limitBeforeLogin.substring(0, searchIndexComma)
      : limitBeforeLogin.substring(
          searchIndexComma + 1,
          limitBeforeLogin.length,
        );
    const idAccountSelected = result(objectData, 'accountNo.id', '');
    const allAccounts = result(storeState, 'accounts', []);
    const flagEmoneyraw = find(allAccounts, function (val) {
      const productAccountName = result(val, 'id', '');
      return idAccountSelected === productAccountName;
    });
    const isDefaultAccount = find(allAccounts, function (val) {
      const productDefault = lowerCase(result(val, 'isDefaultAccount', ''));
      return productDefault === 'yes';
    });
    const switchAccountToogleBE =
      toLower(
        result(storeState, 'config.flag.primaryToogleAccount', 'inactive'),
      ) === 'active';
    const flagEmoney =
      result(flagEmoneyraw, 'accountType', '') === 'emoneyAccount';
    const allAmount = result(objectData, 'resData.amount', 0);
    const defaultToogle = result(storeState, 'primaryToogleAccount', false);
    const checkBalance = isBillPay
      ? result(storeState, 'defaultAccount.balances.availableBalance', '')
      : result(objectData, 'accountNo.balances.availableBalance', '');
    const checkAmountBalanceFLag =
      Number(setLimitCIF) < Number(allAmount)
        ? false
        : Number(checkBalance) < Number(allAmount);
    const selectedAccount =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      isBillPay &&
      checkAmountBalanceFLag
        ? isDefaultAccount
        : result(objectData, 'accountNo', '');
    const isUseSimas = result(selectedAccount, 'isUseSimas');
    const subscriberNo = result(objectData, 'subscriberNo', '');
    const transRefNum = storeState.transRefNum;
    const lang = result(storeState, 'currentLanguage.id', 'id');
    const isFavorite = result(storeState, 'billerDescFav.isFavorite', '');
    const billerFavorite = result(storeState, 'billerFavorite', {});
    const descFav = find(
      billerFavorite,
      fav => subscriberNo === fav.subscriberNo,
    );
    const descInput =
      result(descFav, 'description', '') === ''
        ? result(objectData, 'resData.descInput', '')
        : result(descFav, 'description', '');
    // const code = result(biller, 'billerPreferences.code', '');
    let description = '';
    if (isFavorite === 'yes') {
      description =
        result(storeState, 'billerDescFav.description', '') === ''
          ? descInput
          : result(storeState, 'billerDescFav.description', '');
    } else {
      description =
        result(storeState, 'billerDescFav.description', '') === ''
          ? result(objectData, 'resData.descInput', '')
          : result(storeState, 'billerDescFav.description', '');
    }
    const transactionType =
      lang === 'id'
        ? language.GENERIC_BILLER__PAYMENT + biller.name
        : biller.name + language.GENERIC_BILLER__PAYMENT;
    const denomination = result(objectData, 'denomination.id', '');
    const payloadRaw = middlewareUtils.prepareGenericBillerTypeNinePayload({
      easyPin,
      smsOtp,
      simasToken,
      subscriberNo,
      biller,
      denomination,
      selectedAccount,
      transRefNum,
      description,
      isFavorite,
    });
    const voucherId = result(
      storeState,
      'couponCheck.voucherId',
      '',
    ).toString();
    const ownership = result(storeState, 'couponCheck.ownership', '');
    const additionalInfoMap = {voucherId, ownership};
    const isAutoDebet = result(storeState, 'flagAutoDebit.isRegular', false);
    const nextRun = result(objectData, 'nextAutodebit', '');
    const autoDebitDate = result(storeState, 'flagAutoDebit.date', '');
    const autoDebitStartDate = moment(nextRun, 'YYYY-MM-DD').format(
      'DD MMM YYYY',
    );
    const payload = {...payloadRaw, additionalInfoMap, ownership, isAutoDebet};
    const isGenericBiller = 'yes';
    const iscounterTrxData = result(storeState, 'counterTrxData', true);
    const modalOptions = {
      heading: `${subscriberNo}`,
      subheading: `${biller.name}`,
      amount: `Rp ${currencyFormatter(denomination)}`,
      transactionType,
      transactionId: transRefNum,
      accountFrom: selectedAccount,
      resData: resData,
      isGenericBiller,
      isUseSimas,
      isAutodebitRegis: isAutoDebet,
      autoDebitDate,
      autoDebitStartDate,
    };
    const descriptionCouponSuccess = result(
      storeState,
      'couponCheck.description',
      '',
    );
    const flagMgm = result(storeState, 'config.hideNotifMGM', '');
    const flagMgmOn = lowerCase(flagMgm) === 'yes';
    dispatch(actionCreators.saveCouponSuccessStatus(descriptionCouponSuccess));
    dispatch(
      actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}),
    );
    dispatch(actionCreators.showSpinner());
    return api
      .resultGenericBill(payload, dispatch)
      .then(res => {
        const transRefNum = result(res, 'data.transRefNum', '');
        const subs1 = transRefNum.substring(6, 8);
        const ipassport = result(
          storeState,
          'additionalApiPayload.ipassport',
          '',
        );
        const subs2 = transRefNum.substring(
          transRefNum.length - 2,
          transRefNum.length,
        );
        const subs3 = ipassport.substring(4, 9);
        const transactionCode = subs1 + subs2 + subs3;
        const respon = result(res, 'data.responseCode', '');
        const code = md5(transactionCode);
        const checkCode = result(res, 'data.checkingCode', '');
        const uniCode = code === checkCode;
        dispatch(actionCreators.hideSpinner());
        dispatch(getBillpayHistory());
        if (respon === '00' && uniCode) {
          if (voucherId !== '' || isUseSimas) {
            dispatch(inquirySimasPoin());
          }
          if (isBillPay) {
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
                params: {isBillPay},
              }),
            );
          } else {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({routeName: 'PaymentStatusNew'}),
            );
          }
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          // const billCode = code.concat('-Success');
          // const os = Platform.OS;
          // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
          dispatch(getBillpayHistory());
          const resultDisplay = result(res, 'data.result.displayList', []);
          const dataDetail = result(objectData, 'dataDetail', {});
          if (iscounterTrxData === false) {
            dispatch(refreshStorageNew());
          } else {
            dispatch(updateBalances());
            dispatch(getLuckyDipTicket());
          }
          dispatch(couponCustomerCounting());
          dispatch(
            actionCreators.showPaymentModal({
              ...modalOptions,
              resultDisplay,
              type: 'SUCCESS',
              dataDetail,
            }),
          );
          dispatch(destroy('BillerTypeNineIndexForm'));
          dispatch(destroy('BillerTypeNinePayment'));
          dispatch(destroy('BillerTypeNineConfirmationForm'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.deleteCoupon());
          dispatch(actionCreators.clearBillerDescFav());
        } else {
          // eslint-disable-next-line no-undef
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
          }
        }
      })
      .catch(err => {
        // const billCode = code.concat('-Failed');
        // const os = Platform.OS;
        // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
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
          dispatch(actionCreators.hideSpinner());
          dispatch(getBillpayHistory());
          if (isBillPay) {
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNew',
                params: {isBillPay},
              }),
            );
          } else {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({routeName: 'PaymentStatusNew'}),
            );
          }
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          const resultDisplay = result(err, 'data.result.displayList', []);
          let errorText = getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_PAY_BILL,
          );
          const responseCode = result(err, 'data.responseCode', '');
          if (responseCode === '51') {
            errorText = language.RESPONSE_MESSAGE__RC_51;
          }
          dispatch(
            errorResponseResult(
              err,
              modalOptions,
              resultDisplay,
              errorText,
              selectedAccount,
            ),
          );
          dispatch(destroy('BillerTypeNineIndexForm'));
          dispatch(destroy('BillerTypeNinePayment'));
          dispatch(destroy('BillerTypeNineConfirmationForm'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.deleteCoupon());
          dispatch(actionCreators.clearBillerDescFav());
        }
      });
  };
}

// BILLER TYPE TEN, PDAM BANDA ACEH/BONDOWOSO
export function getAmountForGenericBillerTypeTen(formValues, selectedBiller) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const isFromAD = result(state, 'flagAutoDebit.isAddNew', false);
    const billpayMethodType = isLogin ? null : '1';
    const payload = {
      billpayMethodType,
      isFromAD,
      ...middlewareUtils.prepareGenericBillerTypeTenEnquiryPayload({
        ...formValues,
        selectedBiller,
      }),
    };
    dispatch(actionCreators.showSpinner());
    if (isLogin) {
      return api
        .enquireGenericBill(payload, dispatch)
        .then(res => {
          dispatch(actionCreators.hideSpinner());
          dispatch(
            NavigationActions.navigate({
              routeName: 'BillerTypeTenPayment',
              params: {
                subscriberNo: formValues.subscriberNo,
                areaCode: formValues.areaCode,
                month: result(formValues, 'subscriberNo', ''),
                billDetails: res.data,
                biller: selectedBiller,
              },
            }),
          );
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          const defaultMessage =
            language.ERROR_MESSAGE__COULD_NOT_GET_AMOUNT_GENERIC_BILLER;
          OtherResponseInquiry(err, defaultMessage);
        });
    } else {
      return api
        .enquireGenericBill(payload, dispatch)
        .then(res => {
          dispatch(actionCreators.saveInquiryBiller(res.data)); // ganti ini
          return res;
        })
        .then(res => {
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.saveInquiryBiller(res.data));
          dispatch(
            NavigationActions.navigate({
              routeName: 'BillerTypeTenPayment',
              params: {
                subscriberNo: formValues.subscriberNo,
                areaCode: formValues.areaCode,
                month: result(formValues, 'subscriberNo', ''),
                billDetails: res.data,
                biller: selectedBiller,
              },
            }),
          );
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          const defaultMessage =
            language.ERROR_MESSAGE__COULD_NOT_GET_AMOUNT_GENERIC_BILLER;
          OtherResponseInquiry(err, defaultMessage);
        });
    }
  };
}

export function confirmGenericBillTypeTen(data, fromConfirmationPage = false) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const uniqueCode = result(state, 'inquiryBL.uniqueCode', '');
    const numberRandom = result(state, 'inquiryBL.numberRandom', 0);
    const billpayMethodType = isLogin ? null : '1';
    const isUsingVoucherUI = result(state, 'isUsingVoucherUI', '0');
    const values = result(data, 'values', {});
    const isUseSimas = result(values, 'accountNo.isUseSimas');
    const biller = result(data, 'biller', '');
    const checkingCIF = result(state, 'checkingCIFbeforeLogin', false);
    const limitBeforeLogin = result(
      state,
      'config.limitConfigAutoDebetAccount',
      '',
    );
    const searchIndexComma = indexOf(limitBeforeLogin, ',');
    const setLimitCIF = checkingCIF
      ? limitBeforeLogin.substring(0, searchIndexComma)
      : limitBeforeLogin.substring(
          searchIndexComma + 1,
          limitBeforeLogin.length,
        );
    const idAccountSelected = result(values, 'accountNo.id', '');
    const allAccounts = result(state, 'accounts', []);
    const flagEmoneyraw = find(allAccounts, function (val) {
      const productAccountName = result(val, 'id', '');
      return idAccountSelected === productAccountName;
    });
    const isDefaultAccount = find(allAccounts, function (val) {
      const productDefault = lowerCase(result(val, 'isDefaultAccount', ''));
      return productDefault === 'yes';
    });
    const switchAccountToogleBE =
      toLower(result(state, 'config.flag.primaryToogleAccount', 'inactive')) ===
      'active';
    const flagEmoney =
      result(flagEmoneyraw, 'accountType', '') === 'emoneyAccount';
    const allAmount = result(data, 'resDataTemp.amount', 0);
    const defaultToogle = result(state, 'primaryToogleAccount', false);
    const checkBalance = !isLogin
      ? result(state, 'defaultAccount.balances.availableBalance', '0')
      : result(values, 'accountNo.balances.availableBalance', '0');
    const checkAmountBalanceFLag =
      Number(setLimitCIF) < Number(allAmount)
        ? false
        : Number(checkBalance) < Number(allAmount);
    const selectedAccount =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      !isLogin &&
      checkAmountBalanceFLag
        ? isDefaultAccount
        : result(values, 'accountNo', '');
    const selectedAccountIdCoupon =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      !isLogin &&
      checkAmountBalanceFLag
        ? String(result(isDefaultAccount, 'id', ''))
        : String(result(values, 'accountNo.id', ''));
    const subscriberNo = result(data, 'subscriberNo', '');
    const description = result(
      state,
      'form.BillerTypeTenIndexForm.values.description',
      '',
    );
    const amount = result(values, 'amount', '');
    const billAmount = result(values, 'billAmount', '');
    const isNewBiller = result(data, 'isNewBiller', true);
    const nextRun = result(data, 'autoDebitDate', '');
    const payload = {
      billpayMethodType,
      uniqueCode,
      numberRandom,
      nextRun,
      ...middlewareUtils.prepareGenericBillerTypeTenPayload({
        biller,
        selectedAccount,
        subscriberNo,
        description,
        amount,
        billAmount,
        uniqueCode,
      }),
    };
    dispatch(actionCreators.showSpinner());
    if (isUsingVoucherUI !== '1') {
      if (!fromConfirmationPage) {
        dispatch(actionCreators.deleteCoupon());
      }
    }
    dispatch(actionCreators.saveBillerDescFav({description: description}));
    return api
      .confirmGenericBill(payload, dispatch)
      .then(res => {
        const resData = result(res, 'data', {});
        dispatch(actionCreators.deleteUsingCouponUI());
        const billerCode = result(biller, 'billerPreferences.code', '');
        dispatch(actionCreators.savebillerCode({billerCode}));
        const type = 'billPayment';
        const transactionAmount = result(
          resData,
          'amountNumber',
          '0',
        ).toString();
        const billpayMethodType = isLogin ? null : '1';
        const payloadCoupon = {
          billerCode,
          type,
          transactionAmount,
          billpayMethodType,
          accountId: selectedAccountIdCoupon,
        };
        const transRefNum = result(state, 'transRefNum', '');
        const ownership = result(state, 'couponCheck.ownership', '');
        const voucherId = result(state, 'couponCheck.voucherId', '').toString();
        const payloadCouponCheckingValidity = {
          transactionAmount,
          transRefNum,
          voucherId,
          type,
          ownership,
          billerCode,
          billpayMethodType,
          accountId: selectedAccountIdCoupon,
        };
        const navigation = {
          routeName: 'BillerTypeTenConfirmation',
          formIndex: 'BillerTypeTenIndexForm',
          formPayment: 'BillerTypeTenPayment',
          params: {
            isUseSimas,
            subscriberNo,
            biller,
            ...values,
            resData,
            confirmData: data,
            isNewBiller,
          },
        };
        if (isLogin) {
          dispatch(
            getVoucher(
              [],
              payloadCoupon,
              payloadCouponCheckingValidity,
              navigation,
              false,
              fromConfirmationPage,
              isUseSimas,
            ),
          );
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL),
          Toast.LONG,
        );
      });
  };
}

export function detailGenericBillTypeTen(data) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const isUsingVoucherUI = result(state, 'isUsingVoucherUI', '0');
    const numberRandom = result(state, 'inquiryBL.numberRandom', 0);
    const values = result(data, 'values', {});
    const biller = result(data, 'biller', '');
    const selectedAccount = result(values, 'accountNo', '');
    const subscriberNo = result(data, 'subscriberNo', '');
    const description = result(
      state,
      'form.BillerTypeTenIndexForm.values.description',
      '',
    );
    const amount = result(values, 'amount', '');
    const billAmount = result(values, 'billAmount', '');
    const isNewBiller = result(data, 'isNewBiller', true);
    const payload = {
      billpayMethodType: '1',
      numberRandom,
      ...middlewareUtils.prepareGenericBillerTypeTenPayload({
        biller,
        selectedAccount,
        subscriberNo,
        description,
        amount,
        billAmount,
      }),
    };
    dispatch(actionCreators.showSpinner());
    if (isUsingVoucherUI !== '1') {
      dispatch(actionCreators.deleteCoupon());
    }
    dispatch(actionCreators.saveBillerDescFav({description: description}));
    return api
      .detailGenericBill(payload, dispatch)
      .then(res => {
        const resData = result(res, 'data', {});
        dispatch(actionCreators.deleteUsingCouponUI());
        const billerCode = result(biller, 'billerPreferences.code', '');
        dispatch(actionCreators.savebillerCode({billerCode}));
        const selectedAccountCoupon = String(
          result(values, 'accountNo.id', ''),
        );
        const type = 'billPayment';
        const transactionAmount = result(
          resData,
          'amountNumber',
          '0',
        ).toString();
        const billpayMethodType = isLogin ? null : '1';
        const payloadCoupon = {
          billerCode,
          type,
          transactionAmount,
          billpayMethodType,
          accountId: selectedAccountCoupon,
        };
        const transRefNum = result(state, 'transRefNum', '');
        const ownership = result(state, 'couponCheck.ownership', '');
        const voucherId = result(state, 'couponCheck.voucherId', '').toString();
        const payloadCouponCheckingValidity = {
          transactionAmount,
          transRefNum,
          voucherId,
          type,
          ownership,
          billerCode,
          billpayMethodType,
          accountId: selectedAccountCoupon,
        };
        const navigation = {
          routeName: 'BillerTypeTenConfirmation',
          formIndex: 'BillerTypeTenIndexForm',
          formPayment: 'BillerTypeTenPayment',
          params: {
            subscriberNo,
            biller,
            ...values,
            resData,
            confirmData: data,
            isNewBiller,
          },
        };
        dispatch(
          getVoucher(
            [],
            payloadCoupon,
            payloadCouponCheckingValidity,
            navigation,
            false,
          ),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL),
          Toast.LONG,
        );
      });
  };
}

export function payGenericBillTypeTen(objectData, isBillPay) {
  return (dispatch, getState) => {
    const storeState = getState();
    const resData = result(objectData, 'resData', {});
    const smsOtp = result(storeState, 'form.AuthenticateForm.values.otp', '');
    const easyPin = result(
      storeState,
      'form.AuthenticateForm.values.easypin',
      '',
    );
    const simasToken = result(
      storeState,
      'form.AuthenticateForm.values.simasToken',
      '',
    );
    const biller = result(objectData, 'biller', '');
    const checkingCIF = result(storeState, 'checkingCIFbeforeLogin', false);
    const limitBeforeLogin = result(
      storeState,
      'config.limitConfigAutoDebetAccount',
      '',
    );
    const searchIndexComma = indexOf(limitBeforeLogin, ',');
    const setLimitCIF = checkingCIF
      ? limitBeforeLogin.substring(0, searchIndexComma)
      : limitBeforeLogin.substring(
          searchIndexComma + 1,
          limitBeforeLogin.length,
        );
    const amount = result(objectData, 'amount', '');
    const billAmount = result(objectData, 'billAmount', '');
    const idAccountSelected = result(objectData, 'accountNo.id', '');
    const allAccounts = result(storeState, 'accounts', []);
    const flagEmoneyraw = find(allAccounts, function (val) {
      const productAccountName = result(val, 'id', '');
      return idAccountSelected === productAccountName;
    });
    const isDefaultAccount = find(allAccounts, function (val) {
      const productDefault = lowerCase(result(val, 'isDefaultAccount', ''));
      return productDefault === 'yes';
    });
    const switchAccountToogleBE =
      toLower(
        result(storeState, 'config.flag.primaryToogleAccount', 'inactive'),
      ) === 'active';
    const flagEmoney =
      result(flagEmoneyraw, 'accountType', '') === 'emoneyAccount';
    const allAmount = result(objectData, 'resData.amount', 0);
    const defaultToogle = result(storeState, 'primaryToogleAccount', false);
    const checkBalance = isBillPay
      ? result(storeState, 'defaultAccount.balances.availableBalance', '')
      : result(objectData, 'accountNo.balances.availableBalance', '');
    const checkAmountBalanceFLag =
      Number(setLimitCIF) < Number(allAmount)
        ? false
        : Number(checkBalance) < Number(allAmount);
    const selectedAccount =
      !isEmpty(isDefaultAccount) &&
      switchAccountToogleBE &&
      flagEmoney &&
      defaultToogle &&
      isBillPay &&
      checkAmountBalanceFLag
        ? isDefaultAccount
        : result(objectData, 'accountNo', '');
    const isUseSimas = result(selectedAccount, 'isUseSimas');
    const subscriberNo = result(objectData, 'subscriberNo', '');
    const areaCode = result(objectData, 'areaCode', '');
    const transRefNum = storeState.transRefNum;
    const lang = result(storeState, 'currentLanguage.id', 'id');
    const isFavorite = result(storeState, 'billerDescFav.isFavorite', '');
    const billerFavorite = result(storeState, 'billerFavorite', {});
    const descFav = find(
      billerFavorite,
      fav => subscriberNo === fav.subscriberNo,
    );
    const descInput =
      result(descFav, 'description', '') === ''
        ? result(objectData, 'resData.descInput', '')
        : result(descFav, 'description', '');
    // const code = result(biller, 'billerPreferences.code', '');
    let description = '';
    if (isFavorite === 'yes') {
      description =
        result(storeState, 'billerDescFav.description', '') === ''
          ? descInput
          : result(storeState, 'billerDescFav.description', '');
    } else {
      description =
        result(storeState, 'billerDescFav.description', '') === ''
          ? result(objectData, 'resData.descInput', '')
          : result(storeState, 'billerDescFav.description', '');
    }
    const transactionType =
      lang === 'id'
        ? language.GENERIC_BILLER__PAYMENT + biller.name
        : biller.name + language.GENERIC_BILLER__PAYMENT;
    const payloadRaw = middlewareUtils.prepareGenericBillerTypeTenPayload({
      smsOtp,
      simasToken,
      subscriberNo,
      biller,
      amount,
      billAmount,
      selectedAccount,
      transRefNum,
      description,
      areaCode,
      isFavorite,
      easyPin,
    });
    const voucherId = result(
      storeState,
      'couponCheck.voucherId',
      '',
    ).toString();
    const ownership = result(storeState, 'couponCheck.ownership', '');
    const additionalInfoMap = {voucherId, ownership};
    const isAutoDebet = result(storeState, 'flagAutoDebit.isRegular', false);
    const nextRun = result(objectData, 'nextAutodebit', '');
    const autoDebitDate = result(storeState, 'flagAutoDebit.date', '');
    const autoDebitStartDate = moment(nextRun, 'YYYY-MM-DD').format(
      'DD MMM YYYY',
    );
    const payload = {...payloadRaw, additionalInfoMap, ownership, isAutoDebet};
    const isGenericBiller = 'yes';
    const iscounterTrxData = result(storeState, 'counterTrxData', true);
    const isNewBiller = result(objectData, 'isNewBiller', true);
    const modalOptions = {
      heading: `${subscriberNo}`,
      subheading: `${biller.name}`,
      amount: `Rp ${currencyFormatter(payload.billAmount)}`,
      transactionType,
      transactionId: transRefNum,
      accountFrom: selectedAccount,
      resData: resData,
      isGenericBiller,
      isUseSimas,
      isAutodebitRegis: isAutoDebet,
      autoDebitDate,
      autoDebitStartDate,
      isNewBiller,
    };
    const descriptionCouponSuccess = result(
      storeState,
      'couponCheck.description',
      '',
    );
    const flagMgm = result(storeState, 'config.hideNotifMGM', '');
    const flagMgmOn = lowerCase(flagMgm) === 'yes';
    dispatch(actionCreators.saveCouponSuccessStatus(descriptionCouponSuccess));
    dispatch(
      actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}),
    );
    dispatch(actionCreators.showSpinner());
    return api
      .resultGenericBill(payload, dispatch)
      .then(res => {
        const transRefNum = result(res, 'data.transRefNum', '');
        const subs1 = transRefNum.substring(6, 8);
        const ipassport = result(
          storeState,
          'additionalApiPayload.ipassport',
          '',
        );
        const subs2 = transRefNum.substring(
          transRefNum.length - 2,
          transRefNum.length,
        );
        const subs3 = ipassport.substring(4, 9);
        const transactionCode = subs1 + subs2 + subs3;
        const respon = result(res, 'data.responseCode', '');
        const code = md5(transactionCode);
        const checkCode = result(res, 'data.checkingCode', '');
        const uniCode = code === checkCode;
        dispatch(actionCreators.hideSpinner());
        if (respon === '00' && uniCode) {
          if (voucherId !== '' || isUseSimas) {
            dispatch(inquirySimasPoin());
          }
          if (isBillPay) {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
                params: {isBillPay},
              }),
            );
          } else {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
              }),
            );
          }
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          // const billCode = code.concat('-Success');
          // const os = Platform.OS;
          // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
          dispatch(getBillpayHistory());
          const resultDisplay = result(res, 'data.result.displayList', []);
          if (iscounterTrxData === false) {
            dispatch(refreshStorageNew());
          } else {
            dispatch(updateBalances());
            dispatch(getLuckyDipTicket());
          }
          dispatch(couponCustomerCounting());
          dispatch(
            actionCreators.showPaymentModal({
              ...modalOptions,
              resultDisplay,
              type: 'SUCCESS',
            }),
          );
          dispatch(destroy('BillerTypeTenIndexForm'));
          dispatch(destroy('BillerTypeTenPayment'));
          dispatch(destroy('BillerTypeTenConfirmationForm'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.deleteCoupon());
          dispatch(actionCreators.clearBillerDescFav());
        } else {
          // eslint-disable-next-line no-undef
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
          }
        }
      })
      .catch(err => {
        // const billCode = code.concat('-Failed');
        // const os = Platform.OS;
        // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
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
          dispatch(actionCreators.hideSpinner());
          dispatch(getBillpayHistory());
          if (isBillPay) {
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
                params: {isBillPay},
              }),
            );
          } else {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(
              NavigationActions.navigate({
                routeName: 'PaymentStatusNewOnboarding',
              }),
            );
          }
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          const resultDisplay = result(err, 'data.result.displayList', []);
          let errorText = getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_PAY_BILL,
          );
          const responseCode = result(err, 'data.responseCode', '');
          if (responseCode === '51') {
            errorText = language.RESPONSE_MESSAGE__RC_51;
          }
          dispatch(
            errorResponseResult(
              err,
              modalOptions,
              resultDisplay,
              errorText,
              selectedAccount,
            ),
          );
          dispatch(destroy('BillerTypeTenIndexForm'));
          dispatch(destroy('BillerTypeTenPayment'));
          dispatch(destroy('BillerTypeTenConfirmationForm'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.deleteCoupon());
          dispatch(actionCreators.clearBillerDescFav());
        }
      });
  };
}

// GET default account for billpayment before login
export function getbalanceEmoneyDefaultAccount(value) {
  return dispatch =>
    api
      .getBalanceEmoneyLanding({}, dispatch)
      .then(response => {
        const avalilableEmoney = result(
          response,
          'data.accounts.availableBalance',
          '0',
        );
        dispatch(
          actionCreators.saveDefaultAccount({
            balances: {availableBalance: avalilableEmoney},
            ...value,
          }),
        );
        return Promise.resolve(response);
      })
      .catch(err => {
        Toast.show('Error getting default account', Toast.LONG);
        return Promise.resolve(err);
      });
}

export function getDefaultAccount() {
  return (dispatch, getState) =>
    getDefaultEmoney()
      .then(res => {
        const accountNumberCheck = result(res, 'accountNumber', '');
        const accountIdCheck = result(res, 'accountId', '');
        if (accountNumberCheck !== '' && accountIdCheck !== '') {
          const defaultAccount = {
            id: result(res, 'accountId', ''),
            name: result(res, 'name', ''),
            accountNumber: result(res, 'accountNumber', ''),
          };
          dispatch(actionCreators.saveDefaultAccount(defaultAccount));
          dispatch(getbalanceEmoneyDefaultAccount(defaultAccount));
        } else {
          const isAllAccount = false;
          const tokenClient = result(
            getState(),
            'additionalApiPayload.tokenClient',
            '',
          );
          const tokenServer = result(
            getState(),
            'additionalApiPayload.tokenServer',
            '',
          );
          const payload = {isAllAccount, tokenClient, tokenServer};
          return api
            .getDefaultAccount(payload, dispatch)
            .then(res => {
              const defaultAccount = {
                id: result(res, 'data.accountId', ''),
                name: result(res, 'data.name', ''),
                accountNumber: result(res, 'data.accountNumber', ''),
              };
              dispatch(actionCreators.saveDefaultAccount(defaultAccount));
              dispatch(getbalanceEmoneyDefaultAccount(defaultAccount));
            })
            .catch(() => {
              Toast.show('Error getting default account', Toast.LONG);
            });
        }
      })
      .catch(err => {
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__GET_DATA));
      });
}

export function getVoucher(
  _dataDetail,
  payloadCoupon,
  payloadCouponCheckingValidity,
  navigation,
  confirmAfterLogin = false,
  fromConfirmationPage = false,
  isUseSimas,
) {
  return (dispatch, getState) => {
    const state = getState();
    const isUsingVoucherUI = fromConfirmationPage
      ? '1'
      : result(state, 'isUsingVoucherUI', '0');
    if (isUsingVoucherUI !== '1' && !isUseSimas) {
      return api
        .getSuggestVoucher(payloadCoupon, dispatch)
        .then(responseSuggest => {
          const dataRes = result(responseSuggest, 'data.selectedVoucher', {});
          const decideCoupon = result(dataRes, 'voucher.ownership', 'public');
          if (!isEmpty(dataRes)) {
            const amount =
              decideCoupon === 'private'
                ? result(dataRes, 'voucher.amount', '0')
                : result(dataRes, 'amount', '0');
            const voucherId = result(dataRes, 'id', '').toString();
            const modifierType =
              decideCoupon === 'private'
                ? result(dataRes, 'voucher.modifierType', '0')
                : result(dataRes, 'modifierType', '');
            const fixAmount =
              modifierType === 'percent'
                ? amount.toString() + '%'
                : currencyFormatter(amount);
            const endTimehour =
              decideCoupon === 'private'
                ? result(dataRes, 'voucher.endTime', '0')
                    .toString()
                    .substring(0, 2)
                : result(dataRes, 'endTime', '').toString().substring(0, 2);
            const endTimemin =
              decideCoupon === 'private'
                ? result(dataRes, 'voucher.endTime', '0')
                    .toString()
                    .substring(2, 4)
                : result(dataRes, 'endTime', '').toString().substring(2, 4);
            const decideStartTimeHour =
              decideCoupon === 'private'
                ? result(dataRes, 'voucher.startTime', '0').toString()
                : result(dataRes, 'startTime', '').toString();
            const startTimehour =
              decideStartTimeHour === '0'
                ? '00'
                : decideStartTimeHour.substring(0, 2);
            const startTimemin =
              decideStartTimeHour === '0'
                ? '00'
                : decideStartTimeHour.substring(2, 4);
            const endTimeMod = endTimehour + ':' + endTimemin;
            const startTimeMod = startTimehour + ':' + startTimemin;
            const currency =
              decideCoupon === 'private'
                ? result(dataRes, 'voucher.currency', '0')
                : result(dataRes, 'currency', '');
            const cashbackDetail =
              currency === 'simaspoin'
                ? language.GENERIC__SIMAS_POIN
                : language.GENERIC__CASHBACK_RP;
            const custAmount =
              language.GENERIC__TITLE_COUPON +
              ' ' +
              fixAmount +
              ' ' +
              cashbackDetail;
            const ownership =
              decideCoupon === 'private'
                ? result(dataRes, 'voucher.ownership', '0')
                : result(dataRes, 'ownership', '');
            const endDatesub =
              decideCoupon === 'private'
                ? result(dataRes, 'expiredDateString', '0')
                : result(dataRes, 'endDateString', 0).toString();
            const startDatesub =
              decideCoupon === 'private'
                ? result(dataRes, 'createdDateString', '0')
                : result(dataRes, 'startDateString', 0).toString();
            const subendDate = moment(endDatesub).format('YYYY/MM/DD');
            const subnewDate = moment(startDatesub).format('YYYY/MM/DD');
            const custPoin = fixAmount;
            dispatch(
              actionCreators.saveCoupon({
                voucherId,
                description: custAmount,
                ownership,
                subnewDate,
                subendDate,
                endTimeMod,
                startTimeMod,
                custPoin,
                currency,
              }),
            );
          }
          dispatch(actionCreators.hideSpinner());
          dispatch(resetNavBillpay(navigation));
          dispatch(destroy(navigation.formIndex));
          dispatch(destroy(navigation.formPayment));
        })
        .catch(() => {
          dispatch(actionCreators.hideSpinner());
          dispatch(resetNavBillpay(navigation));
          dispatch(destroy(navigation.formIndex));
          dispatch(destroy(navigation.formPayment));
        });
    } else {
      return api
        .checkVoucherValidity(payloadCouponCheckingValidity, dispatch)
        .then(res => {
          const responseCode = result(res, 'data.responseCode', '');
          dispatch(actionCreators.hideSpinner());
          if (responseCode === '00') {
            dispatch(resetNavBillpay(navigation));
            dispatch(destroy(navigation.formIndex));
            dispatch(destroy(navigation.formPayment));
            dispatch(actionCreators.hideSpinner());
          } else {
            dispatch(actionCreators.deleteCoupon());
            dispatch(resetNavBillpay(navigation));
            dispatch(destroy(navigation.formIndex));
            dispatch(destroy(navigation.formPayment));
            dispatch(actionCreators.hideSpinner());
          }
        })
        .catch(() => {
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.deleteCoupon());
          dispatch(resetNavBillpay(navigation));
          dispatch(destroy(navigation.formIndex));
          dispatch(destroy(navigation.formPayment));
        });
    }
  };
}

export function resetNavBillpay(navigation) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const isADebit = result(state, 'flagAutoDebit.isAddNew', false);
    if (isLogin) {
      if (isADebit) {
        dispatch(
          StackActions.reset({
            index: 3,
            actions: [
              NavigationActions.navigate({routeName: 'AccountMenu'}),
              NavigationActions.navigate({routeName: 'ListAutodebit'}),
              NavigationActions.navigate({
                routeName: 'GenericBiller',
                params: {isAutoDebit: true},
              }),
              NavigationActions.navigate({
                routeName: navigation.routeName,
                params: {...navigation.params, isADebit},
              }),
            ],
          }),
        );
      } else {
        dispatch(
          StackActions.reset({
            index: 2,
            actions: [
              NavigationActions.navigate({routeName: 'Landing'}),
              NavigationActions.navigate({routeName: 'GenericBiller'}),
              NavigationActions.navigate({
                routeName: navigation.routeName,
                params: navigation.params,
              }),
            ],
          }),
        );
      }
    } else {
      if (isADebit) {
        dispatch(
          StackActions.reset({
            index: 3,
            actions: [
              NavigationActions.navigate({routeName: 'AccountMenu'}),
              NavigationActions.navigate({routeName: 'ListAutodebit'}),
              NavigationActions.navigate({
                routeName: 'GenericBiller',
                params: {isAutoDebit: true},
              }),
              NavigationActions.navigate({
                routeName: navigation.routeName,
                params: {...navigation.params, isADebit},
              }),
            ],
          }),
        );
      } else {
        dispatch(
          StackActions.reset({
            index: 2,
            actions: [
              NavigationActions.navigate({routeName: 'Landing'}),
              NavigationActions.navigate({routeName: 'GenericBiller'}),
              NavigationActions.navigate({
                routeName: navigation.routeName,
                params: navigation.params,
              }),
            ],
          }),
        );
      }
    }
  };
}

export function silentLoginBillpay(confirmFunction) {
  return dispatch => {
    dispatch(login({}, true, false, false, false, false, true, 1))
      .then(() => {
        confirmFunction();
      })
      .catch(err => {
        const responseMessage = result(
          err,
          'data.responseMessage',
          language.ERROR_MESSAGE_VALID_SESSION,
        );
        Toast.show(responseMessage);
      });
  };
}

export function triggerAuthBillpay(
  currentAmount,
  triggerAuthData,
  isSyariah,
  isbillerOtp,
) {
  return (dispatch, getState) => {
    const state = getState();
    const couponUse = result(state, 'couponCheck.description', '');
    const timeEndCoupon = result(state, 'couponCheck.endTimeMod', '');
    const timeStartCoupon = result(state, 'couponCheck.startTimeMod', '');
    const dateEndCoupon = result(state, 'couponCheck.subendDate', '');
    const dateStartCoupon = result(state, 'couponCheck.subnewDate', '');
    const usingFromLine = result(state, 'couponCheck.usingFromLine', '0');
    const minAmount = result(state, 'couponCheck.minAmount', 0);
    const maxAmount = result(state, 'couponCheck.maxAmount', 0);
    const now = new Date();
    const nowTimeDate = moment(now).format('YYYY/MM/DD');
    const nowTime = moment(now).format('YYYY/MM/DD H:mm');
    const timeDateEnded = dateEndCoupon + ' ' + timeEndCoupon;
    const timeDateStarted = dateStartCoupon + ' ' + timeStartCoupon;
    const diffDateStart = moment(nowTime).diff(moment(timeDateStarted));
    const diffDateEnd = moment(nowTime).diff(moment(timeDateEnded));
    const gapTimeServer = result(state, 'gapTimeServer');
    const gapTimeStart =
      Math.round(moment.duration(diffDateStart).asSeconds()) - gapTimeServer;
    const gapTimeEnd =
      Math.round(moment.duration(diffDateEnd).asSeconds()) - gapTimeServer;

    const timeDateEndedElse = nowTimeDate + ' ' + timeEndCoupon;
    const timeDateStartedElse = nowTimeDate + ' ' + timeStartCoupon;
    const diffDateStartElse = moment(nowTime).diff(moment(timeDateStartedElse));
    const diffDateEndElse = moment(nowTime).diff(moment(timeDateEndedElse));
    const gapTimeStartElse =
      Math.round(moment.duration(diffDateStartElse).asSeconds()) -
      gapTimeServer;
    const gapTimeEndElse =
      Math.round(moment.duration(diffDateEndElse).asSeconds()) - gapTimeServer;
    if (!isSyariah) {
      if (couponUse !== '') {
        if (timeEndCoupon === '23:59' && timeStartCoupon === '00:00') {
          if (gapTimeStart > 0 && gapTimeEnd < 0) {
            if (usingFromLine === '1') {
              if (
                (currentAmount > minAmount && currentAmount < maxAmount) ||
                (currentAmount > minAmount && maxAmount === 0)
              ) {
                dispatch(
                  triggerAuthTypeSix(
                    triggerAuthData.params.isOtp,
                    triggerAuthData,
                    triggerAuthData.params,
                    isbillerOtp,
                  ),
                );
              } else {
                Toast.show(language.GENERIC__AMOUNT_INSUFFICIENT, Toast.LONG);
              }
            } else {
              dispatch(
                triggerAuthTypeSix(
                  triggerAuthData.params.isOtp,
                  triggerAuthData,
                  triggerAuthData.params,
                  isbillerOtp,
                ),
              );
            }
          } else {
            Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
          }
        } else {
          if (gapTimeStart > 0 && gapTimeEnd < 0) {
            if (gapTimeStartElse > 0 && gapTimeEndElse < 0) {
              if (usingFromLine === '1') {
                if (
                  (currentAmount > minAmount && currentAmount < maxAmount) ||
                  (currentAmount > minAmount && maxAmount === 0)
                ) {
                  dispatch(
                    triggerAuthTypeSix(
                      triggerAuthData.params.isOtp,
                      triggerAuthData,
                      triggerAuthData.params,
                      isbillerOtp,
                    ),
                  );
                } else {
                  Toast.show(language.GENERIC__AMOUNT_INSUFFICIENT, Toast.LONG);
                }
              } else {
                dispatch(
                  triggerAuthTypeSix(
                    triggerAuthData.params.isOtp,
                    triggerAuthData,
                    triggerAuthData.params,
                    isbillerOtp,
                  ),
                );
              }
            } else {
              Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
            }
          } else {
            Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
          }
        }
      } else {
        dispatch(
          triggerAuthTypeSix(
            triggerAuthData.params.isOtp,
            triggerAuthData,
            triggerAuthData.params,
            isbillerOtp,
          ),
        );
      }
    } else {
      Toast.show(
        language.ERROR_MESSAGE_FOR_SYARIAHSAVING_WITH_COUPON,
        Toast.LONG,
      );
    }
  };
}

export function loginAfterBillpay(isBillPay) {
  return (dispatch, getState) => {
    const state = getState();
    const loginData = result(state, 'loginData', {});
    dispatch(actionCreators.setIsLoading(isBillPay));
    assembleDataForDashboard(dispatch, loginData);
    dispatch(prepareGoDashboard(false));
  };
}

export function updateUserAfterBillpay(isBillPay) {
  return (dispatch, getState) => {
    const state = getState();
    const loginData = result(state, 'loginData', {});
    dispatch(actionCreators.setIsLoading(isBillPay));
    assembleDataForDashboard(dispatch, loginData);
  };
}

export function triggerAuthTypeSix(
  sendSmsOtp,
  triggerAuthData,
  params,
  isbillerOtp,
) {
  return dispatch => {
    if (sendSmsOtp) {
      dispatch(
        getTransRefNumAndOTPNavigate(
          'billpay',
          true,
          'AuthDashboard',
          params,
          false,
          false,
          false,
          isbillerOtp,
        ),
      );
    } else {
      dispatch(
        triggerAuthNavigate(
          'billpay',
          triggerAuthData.amount,
          false,
          'Auth',
          triggerAuthData.params,
          false,
          isbillerOtp,
        ),
      );
    }
  };
}

export function messageBillerNK() {
  return () => {
    Toast.show(language.EMONEY__CANNOTGETBILL);
  };
}

export function updateEmoneySimasPoin() {
  return dispatch => {
    dispatch(inquirySimasPoin());
    dispatch(getBalanceEmoneyBeforeLogin());
  };
}

export function registerAutoDebit(data) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const transRefNum = result(state, 'transRefNum', '');
    const subscriberNoInput = result(data, 'subscriberNo', '');
    const accountFrom = result(
      data,
      'confirmData.values.accountNo.id',
      '',
    ).toString();
    const idbillPay = result(data, 'biller.billerPreferences.id', '');
    const amount = result(data, 'amount', '0').toString();
    const billAmount = result(data, 'billAmount', '0').toString();
    const denomination = result(
      data,
      'denomination.value',
      result(data, 'denomination.id', ''),
    );
    const mPinInputed = result(
      getState(),
      'form.AuthenticateForm.values.otp',
      '',
    );
    let fixAmount = '';
    if (!isEmpty(denomination)) {
      fixAmount = denomination;
    } else if (billAmount !== '0') {
      fixAmount = billAmount;
    } else {
      fixAmount = amount;
    }
    const payload = {
      subscriberNoInput,
      amount: fixAmount,
      billAmount,
      accountFrom,
      idbillPay,
      mPinInputed,
      transRefNum,
    };

    return api
      .addAutodebit(payload, dispatch)
      .then(res => {
        const state = getState();
        const subscriberNo = result(res, 'data.subscriberID', '');
        const billerName = result(data, 'biller.name', '');
        const currentLang = result(state, 'currentLanguage.id', 'en');
        const transactionType =
          currentLang === 'id'
            ? language.AUTODEBIT__REGIST_TITLE + billerName
            : billerName + language.AUTODEBIT__REGIST_TITLE;
        const accountList = result(state, 'accounts', []);
        const selectedAccountNo = result(res, 'data.accountNo', '');
        const selectedAccount = find(accountList, {
          accountNumber: selectedAccountNo,
        });
        const startDate = result(res, 'data.nextRun', '');
        const autoDebitStartDate = moment(startDate, 'YYYY-MM-DD').format(
          'DD MMM YYYY',
        );
        const autoDebitDate = moment(startDate, 'YYYY-MM-DD').format('DD');
        const isGenericBiller = 'yes';
        const isAutodebitRegis = true;
        const resData = result(data, 'resData', {});
        const dataDetail = result(data, 'dataDetail', []);
        const registerAutodebitOnly = result(
          data,
          'registerAutodebitOnly',
          false,
        );
        const modalOptions = {
          heading: subscriberNo,
          subheading: billerName,
          transactionType,
          transactionId: transRefNum,
          accountFrom: selectedAccount,
          isGenericBiller,
          isAutodebitRegis,
          resData: resData,
          autoDebitDate,
          autoDebitStartDate,
          dataDetail,
          registerAutodebitOnly,
        };
        dispatch(
          actionCreators.showPaymentModal({...modalOptions, type: 'SUCCESS'}),
        );
        dispatch(
          StackActions.reset({
            index: 2,
            actions: [
              NavigationActions.navigate({routeName: 'AccountMenu'}),
              NavigationActions.navigate({routeName: 'ListAutodebit'}),
              NavigationActions.navigate({routeName: 'PaymentStatusNew'}),
            ],
          }),
        );
        dispatch(refreshStorageNew());
        dispatch(updateBalances());
        dispatch(actionCreators.clearTransRefNum());
        dispatch(actionCreators.hideSpinner());
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
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
          dispatch(actionCreators.clearTransRefNum());
          Toast.show(language.ERROR_MESSAGE_BLOCKED_EASYPIN_TRANSACTION);
          dispatch(logout());
        } else if (easyPinAttempt === 'errHsm') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          Toast.show(language.ERROR_MESSAGE_SYSTEM_UNDER_MAINTENANCE);
        } else {
          const billerName = result(data, 'biller.name', '');
          const isAutodebitRegis = true;
          const isGenericBiller = 'yes';
          const registerAutodebitOnly = result(
            data,
            'registerAutodebitOnly',
            false,
          );
          const modalOptions = {
            subheading: billerName,
            transactionId: transRefNum,
            isAutodebitRegis,
            isGenericBiller,
            registerAutodebitOnly,
          };
          dispatch(
            actionCreators.showPaymentModal({...modalOptions, type: 'FAILED'}),
          );
          dispatch(
            StackActions.reset({
              index: 2,
              actions: [
                NavigationActions.navigate({routeName: 'AccountMenu'}),
                NavigationActions.navigate({routeName: 'ListAutodebit'}),
                NavigationActions.navigate({routeName: 'PaymentStatusNew'}),
              ],
            }),
          );
          dispatch(actionCreators.clearTransRefNum());
        }
      });
  };
}

export function editAutoDebit(data) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    const accountNo = result(data, 'accountNumber', '');
    const subscriberID = result(data, 'subscriberNumber', '');
    const fixAmount = result(data, 'fixAmount', '');
    const nextRun = result(data, 'nextRun', '');
    const payeeCode = result(data, 'billerCode', '');
    const payload = {
      accountNo,
      subscriberID,
      fixAmount,
      nextRun,
      payeeCode,
    };
    return api
      .editAutodebit(payload, dispatch)
      .then(response => {
        dispatch(actionCreators.hideSpinner());
        dispatch(getAutodebitList());
        Toast.show(
          result(
            response,
            'data.responseMessage',
            language.AUTODEBIT__EDIT_SUCCESS,
          ),
        );
      })
      .catch(error => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          result(
            error,
            'data.responseMessage',
            language.AUTODEBIT__EDIT_FAILED,
          ),
        );
      });
  };
}

export function checkValidityCouponLogin(
  transactionAmount,
  _isLogin,
  biller,
  selectedAccountIdCoupon,
  afterCheckCouponFunction,
) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const billerCode = result(biller, 'billerPreferences.code', '');
    const type = 'billPayment';
    const transRefNum = result(state, 'transRefNum', '');
    const ownership = result(state, 'couponCheck.ownership', '');
    const voucherId = result(state, 'couponCheck.voucherId', '').toString();
    const accountId = String(selectedAccountIdCoupon);
    const payloadCouponCheckingValidity = {
      transactionAmount,
      transRefNum,
      voucherId,
      type,
      ownership,
      billerCode,
      accountId,
    };
    return api
      .checkVoucherValidity(payloadCouponCheckingValidity, dispatch)
      .then(res => {
        const responseCode = result(res, 'data.responseCode', '');
        dispatch(actionCreators.hideSpinner());
        if (responseCode === '00') {
          afterCheckCouponFunction();
        } else {
          Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
        }
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
      });
  };
}
