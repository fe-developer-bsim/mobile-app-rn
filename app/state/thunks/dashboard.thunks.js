import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import * as middlewareUtils from '../../utils/middleware.util';
import {getErrorMessage, currencyFormatter, getFilteredBillerData, selectedBank, listLang, normalisePhoneNumber, checkShariaAccount, getAccountType, generateEmoneyOnboard, formatForexAmount, currencySymbol, getTransferTime, getDayName, upperCase, paginator, getCutOffTimeReksadana, formatForexAmountPaymentStatus} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import {Toast} from '../../utils/RNHelpers.util.js';
import {destroy, reset, change} from 'redux-form';
import {language} from '../../config/language';
import {populateConfigData, populateBillerData, getCreditCardInquiry, resetToDashboardFrom, refreshStorageNew, errorResponseResult, triggerAuthNavigate, updateBalances, popUpRewardMgm, refreshStorage} from './common.thunks';
import {set, storageKeys, getIsCashGuideModalShow, getProfilePicture, getIsNewMenu, getLastOffersPinjamanGO, get, getPrivateOffersTD, getPrivateOffersLP2} from '../../utils/storage.util';
import {closeEmoneyNonKYC, prepareGoBillerVoucher} from './onboarding.thunks';
import {DeviceEventEmitter, Linking} from 'react-native';
import {prepareGoDashboardCgv} from './cgv.thunks';
import isEmpty from 'lodash/isEmpty';
import {find, findIndex, map, sortBy, filter, result, forEach, size} from 'lodash';
import React from 'react';
import {getListLoanProduct} from './EForm.thunks';
import moment from 'moment';
import upgradeEmoneyImg from '../../assets/images/Upgrade-Emoney.png';
import {saveLoanDataPgoAcceptOnly} from './loan.thunks';
import {logout} from './onboarding.thunks.js';
import {getDataForSIlPolis} from '../../utils/middleware.util';
import {goDigitalSigning} from '../../state/thunks/ESigning.thunks';
import {lowerCase} from 'lodash';
import {randomString, OBM_EncryptPassword, OBM_GetEncodingParameter, OBM_GetEncryptedPassword} from '../../utils/vendor/pinEncryption.util';
import DeviceInfo from 'react-native-device-info';
import {pushWooshAppConstants} from '../../config/env.config';
import {Platform} from 'react-native';
import noBanner from '../../assets/images/block.png';
import AesCrypto from '@figureai/react-native-aes-kit';


// DASHBOARD: TD
export function getTdDisclaimer () {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const lang = result(state, 'currentLanguage.id', 'en');
    return api.getTdDisclaimer(lang, dispatch).
      then((response) => {
        dispatch(NavigationActions.navigate({routeName: 'TdDisclaimer', params: {...response.data}}));
        dispatch(actionCreators.hideSpinner());
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_GET_TIME_DEPOSIT_CONFIG), Toast.LONG);
      });
  };
}

export function getTdConfig () {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    dispatch(destroy('TdForm'));
    return api.tdConfig(dispatch).
      then((response) => {
        const tdConfig = middlewareUtils.prepareTdConfig(response.data);
        dispatch(actionCreators.updateTdConfigConv(tdConfig));
      }).
      then(() => api.tdsConfig(dispatch)).
      then((response) => {
        const tdsConfig = middlewareUtils.prepareTdConfig(response.data);     
        dispatch(actionCreators.updateTdConfigSharia(tdsConfig));
        const lang = result(state, 'currentLanguage.id', 'en');
        return api.getTdDisclaimer(lang, dispatch).then((response) => {
          dispatch(NavigationActions.navigate({routeName: 'TdForm', params: {openTdHolidayWarning: String(response.data.extraNoteList)}}));
          dispatch(actionCreators.hideSpinner());
        }).
          catch((err) => {
            dispatch(actionCreators.hideSpinner());
            Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_GET_TIME_DEPOSIT_CONFIG), Toast.LONG);
          });
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_GET_TIME_DEPOSIT_CONFIG), Toast.LONG);
      });
  };
}

export function faqTd (tdFormValues) {
  return (dispatch, getState) => {
    const state = getState();
    const isShariaAccount = checkShariaAccount(result(state, 'form.TdForm.values.accountNo', {}));
    dispatch(actionCreators.showSpinner());
    const confConv = result(state, 'config.attention.urlTCTD', {});
    const confSha = result(state, 'config.attention.urlTCTDS', {});
    dispatch(NavigationActions.navigate({routeName: 'TdFAQ', params: {confConv, confSha, tdFormValues, isShariaAccount}}));
    dispatch(actionCreators.hideSpinner());
  };
}

export function confirmTd () {
  return (dispatch, getState) => {
    const state = getState();
    const tdFormValues = result(state, 'form.TdForm.values', {});
    const isShariaAccount = checkShariaAccount(result(state, 'form.TdForm.values.accountNo', {}));
    const depositConfig = (isShariaAccount) ? result(state, 'tdConfig.conventionalConfig.depositPeriodList', []) : result(state, 'tdConfig.shariaConfig.depositPeriodList', []);
    const payload = middlewareUtils.prepareConfirmTdPayload(tdFormValues, depositConfig);
    dispatch(actionCreators.showSpinner());
    const confirmTdApi = (isShariaAccount) ? api.tdsConfirmation : api.tdConfirmation;
    return dispatch(populateConfigData()).
      then(() => confirmTdApi(payload, dispatch)).
      then((response) => {
        dispatch(NavigationActions.navigate({routeName: 'TdSummary', params: {tdSummary: response.data, isShariaAccount: isShariaAccount, tdFormValues: tdFormValues}}));
        dispatch(actionCreators.hideSpinner());
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_CONFIRM_TIME_DEPOSIT), Toast.LONG);
      });
  };
}

export function createTd (isShariaAccount, accountNo) {
  return (dispatch, getState) => {
    const storeState = getState();
    const smsOtp = result(storeState, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(storeState, 'form.AuthenticateForm.values.simasToken', '');
    const payload = middlewareUtils.prepareCreateTDPayload(storeState.transRefNum, smsOtp, simasToken);
    const modalOptions = {transactionType: language.TIME_DEPOSIT__PROGRESS_MSG, transactionId: storeState.transRefNum, accountFrom: accountNo};
    dispatch(actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}));
    const createTdApi = (isShariaAccount) ? api.tdsTransaction : api.tdTransaction;
    const flagMgm = result(storeState, 'config.hideNotifMGM', '');
    const flagMgmOn = lowerCase(flagMgm) === 'yes';
    const isSearch = result(storeState, 'valueTDSearch', false);
    dispatch(actionCreators.showSpinner());
    return createTdApi(payload, dispatch).
      then((response) => {
        const currency = result(response, 'data.currency', '');
        const amount = currency === 'IDR' ? currencyFormatter(response.data.initialDeposit) : formatForexAmount(response.data.initialDeposit, currency);
        const dataDetail = middlewareUtils.prepareDataDetailOpenTD(response.data, amount, isShariaAccount);
        dispatch(actionCreators.hideSpinner());
        dispatch(refreshStorageNew());
        dispatch(actionCreators.showPaymentModal({
          ...modalOptions, type: 'SUCCESS',
          subheading: language.TIME_DEPOSIT__TD_ACCOUNT_NUMBER + ' ' + response.data.newAccountNumber,
          amount: currencySymbol(currency) + ' ' + amount,
          dataDetail
        }));
        dispatch(destroy('TdForm'));
        dispatch(destroy('tdConfirmationForm'));
        dispatch(destroy('tdConfirmationForm'));
        dispatch(actionCreators.clearTransRefNum());
        dispatch(resetToDashboardFrom('TdForm'));
        if (isSearch) {
          dispatch(NavigationActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'Landing'}),
              NavigationActions.navigate({routeName: 'PaymentStatusNew'})
            ]
          }));
        } else {
          dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
        }
        // dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
        if (!flagMgmOn) {
          dispatch(popUpRewardMgm());
        }
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
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
          const resultDisplay = result(err, 'data.result.displayList', []);
          const errorText = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_CREATE_TD);
          dispatch(errorResponseResult(err, modalOptions, resultDisplay, errorText, accountNo));
          dispatch(destroy('TdForm'));
          dispatch(destroy('tdConfirmationForm'));
          dispatch(actionCreators.clearTransRefNum());
          dispatch(resetToDashboardFrom('TdForm'));
          if (isSearch) {
            dispatch(NavigationActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'Landing'}),
                NavigationActions.navigate({routeName: 'PaymentStatusNew'})
              ]
            }));
          } else {
            dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
          }
          // dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
        }
      });
  };
}

// DASHBOARD: CREDIT CARD

export function getCreditCardInquiryDashboard (selectedAccount) {
  return (dispatch, getState) => {
    const accNo = result(selectedAccount, 'accountNumber');
    // const {config, payees} = getState();
    const {payees, valueBankList} = getState();
    const bankList = result(valueBankList, 'bankList', []);
    const bank = selectedBank(accNo, bankList);
    const payee = filter(payees, {'accountNumber': accNo});
    dispatch(actionCreators.showSpinner());
    return Promise.all([dispatch(populateBillerData()), dispatch(populateConfigData())]).
      then(() => {
        dispatch(actionCreators.hideSpinner());
        const name = (payee.length > 0) ? result(payee, '[0].name') : dispatch(getPayeeNameCcDashboard(result(bank, '[0]'), accNo));
        return name;
      }).
      then((name) => {
        const biller = getFilteredBillerData(result(getState(), 'billerConfig'), 'CC');
        const id = result(payee, '[0].id');
        dispatch(getCreditCardInquiry(result(bank, '[0]'), accNo, biller, name, id));
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_UPDATE_BILLER_CONFIG), Toast.LONG);
      });
  };
}

export function getPayeeNameCcDashboard (bank, accNo) {
  return (dispatch, getState) => {
    const isLogin = !isEmpty(result(getState(), 'user', {}));
    const transferMethodType = isLogin ? '' : '1';
    let additional = [];
    if (isLogin) {
      additional = ['ipassport', 'TXID', 'lang'];
    } else {
      additional = ['TXID', 'lang', 'tokenClient', 'tokenServer', 'transferMethodType'];
    }
    const payload = middlewareUtils.prepareGetPayeeName({bankId: bank.id, accountNumber: accNo, transferMethodType});
    dispatch(actionCreators.showSpinner());
    return api.getPayeeName(payload, additional, dispatch).then((res) => {
      const name = res.data.targetName;
      return name;
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__ERROR_GETTING_PAYEE_NAME), Toast.LONG);
    });
  };
}

export function linkCreditCard () {
  return (dispatch) => {
    dispatch(actionCreators.hideSpinner());
    return api.linkCreditCard(dispatch).then((res) => {
      const responseCode = result(res, 'data.responseCode', '');
      if (responseCode === '00') {
        dispatch(refreshStorageNew());
      }
      dispatch(actionCreators.hideSpinner());
    }).catch(() => {
      dispatch(actionCreators.hideSpinner());
    });
  };
}

export function closeTD (request) {
  return (dispatch, getState) => {
    const storeState = getState();
    const transRefNum = result(storeState, 'transRefNum');
    const payload = middlewareUtils.prepareCloseTD({transRefNum, ...request});
    const modalOptions = {transactionType: language.TIME_DEPOSIT__CLOSE_PROGRESS_MSG, transactionId: transRefNum};
    const flagMgm = result(storeState, 'config.hideNotifMGM', '');
    const flagMgmOn = lowerCase(flagMgm) === 'yes';
    dispatch(actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}));
    dispatch(actionCreators.showSpinner());
    return api.closeTimeDeposit(payload, dispatch).then((response) => {
      dispatch(NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({routeName: 'Landing'}),
          NavigationActions.navigate({routeName: 'PaymentStatusNew'})
        ]
      }));
      if (!flagMgmOn) {
        dispatch(popUpRewardMgm());
      }
      dispatch(actionCreators.hideSpinner());
      const isClosingTd = 'yes';
      const tdAccount = result(response, 'data', {});
      const currency = currencySymbol(result(request, 'currency', ''));
      const amount = result(request, 'currency', '') === 'IDR' ? currencyFormatter(result(request, 'principal', '')) : result(request, 'principal', '');
      dispatch(actionCreators.showPaymentModal({
        ...modalOptions, type: 'SUCCESS',
        subheading: language.TIME_DEPOSIT__TD_ACCOUNT_NUMBER + ' ' + response.data.newAccountNumber,
        amount: currency + ' ' + `${amount}`,
        maturityDate: String(result(response, 'data.maturityDate')),
        isClosingTd,
        accountFrom: tdAccount,
      }));
      dispatch(refreshStorageNew());
      dispatch(destroy('dashboard'));
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
        dispatch(destroy('dashboard'));
        if (!flagMgmOn) {
          dispatch(popUpRewardMgm());
        }
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.showPaymentModal({...modalOptions, type: 'FAILED'}));
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_CLOSE_TIME_DEPOSIT), Toast.LONG);
      }
    });
  };
}

export function investmentData () {
  return (dispatch) => {
    api.getwealthManagement(dispatch).
      then((res) => {
        dispatch(actionCreators.saveInvestmentAccount(res.data));
      }).
      catch((err) => {
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT));
      });
  };
}

export function investmentDataView1 (item) {
  return (dispatch) => {
    const code = result(item, 'code', '');
    return api.getwealthManagementView(code, dispatch).then((res) => {
      const investmentAllData = result(res, 'data.inqPortfolioByType.wealthManagementMap', {});
      dispatch(NavigationActions.navigate({routeName: 'Investment', params: {...investmentAllData}}));
    }).catch((err) => {
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT));
    });
  };
}

export function investmentDataView (item) {
  return (dispatch, getState) => {
    const storeState = getState();
    const code = result(item, 'codeRevamp', '');
    const type = result(item, 'type', '');
    const modeChoose = 'link';
    const portfolio = (result(storeState, 'investmentAccounts.portfolio', {}));
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const investmentDataViewNew = () => {
      dispatch(actionCreators.showSpinner());
      dispatch(actionCreators.hideSinarmasAlert());
      return api.getwealthManagementView(code, dispatch).then((res) => {
        dispatch(actionCreators.hideSinarmasAlert());
        const dataMagnaLink = result(res, 'data.wealthManagementJsonNew.Data Magna Link', []).filter((d) => !Object.values(d).every((v) => v === null));
        const dataPrimeLink = result(res, 'data.wealthManagementJsonNew.Data Prime Link', []).filter((d) => !Object.values(d).every((v) => v === null));
        const investmentAllData = result(res, 'data.wealthManagementJsonNew', {});
        dispatch(NavigationActions.navigate({routeName: 'Investment', params: {investmentAllData, type, code, dataMagnaLink, dataPrimeLink}}));
        dispatch(actionCreators.hideSpinner());
      }).catch((err) => {
        dispatch(actionCreators.hideSpinner());
        const responseCodeToggle = result(err, 'data.responseCode', '');
        if (responseCodeToggle === '03') {
          dispatch(actionCreators.hideSpinner());
          Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
        } else {
          api.getwealthManagementLinkUnlink(code, modeChoose, portfolio, dispatch).then((ress) => {
            const responseCode = result(ress, 'data.responseCode', '');
            if (responseCode === '00') {
              api.getwealthManagementView(code, dispatch).then((res) => {
                dispatch(actionCreators.hideSinarmasAlert());
                const dataMagnaLink = result(res, 'data.wealthManagementJsonNew.Data Magna Link', []).filter((d) => !Object.values(d).every((v) => v === null));
                const dataPrimeLink = result(res, 'data.wealthManagementJsonNew.Data Prime Link', []).filter((d) => !Object.values(d).every((v) => v === null));
                const investmentAllData = result(res, 'data.wealthManagementJsonNew', {});
                dispatch(NavigationActions.navigate({routeName: 'Investment', params: {investmentAllData, type, code, dataMagnaLink, dataPrimeLink}}));
              }).catch((err) => {
                const responseCodeToggle = result(err, 'data.responseCode', '');
                if (responseCodeToggle === '03') {
                  dispatch(actionCreators.hideSpinner());
                  Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
                } else {
                  dispatch(actionCreators.hideSinarmasAlert());
                  const typeErrorDetail = language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT2 + listLang(result(item, 'code', ''));
                  const typeError = language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT;
                  const modalOption = {heading: typeErrorDetail, subheading: language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT_PRODUCT, transactionType: typeError};
                  dispatch(actionCreators.showPaymentModal({...modalOption, type: 'FAILED'}));
                  dispatch(NavigationActions.navigate({routeName: 'PaymentStatus'}));
                }
              });
            } else {
              dispatch(actionCreators.hideSinarmasAlert());
              const typeErrorDetail = language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT2 + listLang(result(item, 'code', ''));
              const typeError = language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT;
              const modalOption = {heading: typeErrorDetail, subheading: language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT_PRODUCT, transactionType: typeError};
              dispatch(actionCreators.showPaymentModal({...modalOption, type: 'FAILED'}));
              dispatch(NavigationActions.navigate({routeName: 'PaymentStatus'}));
            }
          }).catch(() => {
            dispatch(actionCreators.hideSpinner());
            const typeErrorDetail = language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT2 + listLang(result(item, 'code', ''));
            const typeError = language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT;
            const modalOption = {heading: typeErrorDetail, subheading: language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT_PRODUCT, transactionType: typeError};
            dispatch(actionCreators.showPaymentModal({...modalOption, type: 'FAILED'}));
            dispatch(NavigationActions.navigate({routeName: 'PaymentStatus'}));
          });
        }
      });
    };
    const modalOptions = {
      heading1: language.INVESTMENT__ALERT_HEADER,
      text: language.INVESTMENT__ALERT_SUBHEADER,
      button1: language.INVESTMENT__ALERT_HEADER_BUTTON_NOT,
      onButton1Press: hideAlert,
      button2: language.INVESTMENT__ALERT_OK_BUTTON,
      onButton2Press: investmentDataViewNew,
      onClose: hideAlert,
      disabled: true
    };
    dispatch(actionCreators.showSinarmasAlert({...modalOptions}));

  };
}

export function investmentDataViewSIL (item) {
  return (dispatch, getState) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const investmentDataViewNew = () => {
      const state = getState();
      const lang = upperCase(result(state, 'currentLanguage.id', 'id'));
      dispatch(actionCreators.showSpinner());
      dispatch(actionCreators.hideSinarmasAlert());
      return api.getInquirySIL({...item, lang}, dispatch).then((res) => {
        dispatch(actionCreators.hideSinarmasAlert());
        const inquirySILData = result(res, 'data', {});
        dispatch(actionCreators.saveInquirySIL(inquirySILData));
        dispatch(NavigationActions.navigate({routeName: 'InquirySILScreen'}));
        dispatch(actionCreators.hideSpinner());
      }).catch(() => {
        dispatch(actionCreators.hideSpinner());
        const typeErrorDetail = language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT2 + listLang(result(item, 'code', ''));
        const typeError = language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT;
        const modalOption = {heading: typeErrorDetail, subheading: language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT_PRODUCT, transactionType: typeError};
        dispatch(actionCreators.showPaymentModal({...modalOption, type: 'FAILED'}));
        dispatch(NavigationActions.navigate({routeName: 'PaymentStatus'}));
      });
    };
    const modalOptions = {
      heading1: language.INQUIRY__SIL_MODAL_TITLE,
      text: language.INQUIRY__SIL_MODAL_SUBTITLE,
      button1: language.INQUIRY__SIL_MODAL_BUTTON_CANCEL,
      onButton1Press: hideAlert,
      button2: language.INQUIRY__SIL_MODAL_BUTTON_OK,
      onButton2Press: investmentDataViewNew,
      onClose: hideAlert,
      disabled: true
    };
    dispatch(actionCreators.showSinarmasAlert({...modalOptions}));

  };
}

export function redeemSmartfren () {
  return (dispatch, getState) => {
    const state = getState();
    const account = result(state, 'accounts', {});
    const cashback = result(state, 'config.smartfrenPromo', '');
    dispatch(NavigationActions.navigate({routeName: 'RedeemSmartfren', params: {account, cashback}}));
    dispatch(actionCreators.hideSpinner());
  };
}

export function redeemSmartfrenConfirm () {
  return (dispatch, getState) => {
    const state = getState();
    const form = result(state, 'form.RedeemSmartfren.values', {});
    const cashback = result(state, 'config.smartfrenPromo', '');
    dispatch(NavigationActions.navigate({routeName: 'RedeemSmartfrenConfirm', param: {form, cashback}}));
    dispatch(actionCreators.hideSpinner());
  };
}

export function redeemSmartfrenResult () {
  return (dispatch, getState) => {
    const state = getState();
    const smsOtp = result(state, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(state, 'form.AuthenticateForm.values.simasToken', '');
    const transRefNum = state.transRefNum;
    const data = {
      'mdn': normalisePhoneNumber(result(state, 'form.RedeemSmartfren.values.smartfrenNumber', '')),
      'ktp': result(state, 'form.RedeemSmartfren.values.noKTP', ''),
      'noAcc': result(state, 'form.RedeemSmartfren.values.accNumber', ''),
    };
    dispatch(actionCreators.hideSpinner());
    const payload = middlewareUtils.prepareSFRedeem(transRefNum, smsOtp, simasToken, data);
    let modalOptions = {
      heading: language.REDEEM__SMARTFREN__HEADING__RESULT,
      transactionType: language.REDEEM__SMARTFREN__TYPE__RESULT,
      transactionId: transRefNum,
    };
    dispatch(actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}));
    dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'HomeScreen'}),
      ]
    }));
    dispatch(actionCreators.hideSpinner());
    dispatch(NavigationActions.navigate({routeName: 'PaymentStatus'}));
    return api.sfRedeem(payload, dispatch).then(() => {
      dispatch(actionCreators.hideSpinner());
      modalOptions.heading = language.REDEEM__SMARTFREN__HEADING__RESULT__SUCCESS;
      dispatch(refreshStorageNew());
      dispatch(actionCreators.showPaymentModal({...modalOptions, type: 'SUCCESS'}));
      dispatch(destroy('RedeemSmartfren'));
      dispatch(destroy('RedeemSmartfrenConfirm'));
      dispatch(actionCreators.clearTransRefNum());
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      const responseCode = result(err, 'data.responseCode', '99');
      if (responseCode === '01') {
        modalOptions.heading = language.REDEEM__SMARTFREN__HEADING__RESULT__ERROR__EASY;
      } else if (responseCode === '02') {
        modalOptions.heading = language.REDEEM__SMARTFREN__HEADING__RESULT__ERROR__NOT__REGISTERED;
      } else {
        modalOptions.heading = language.REDEEM__SMARTFREN__HEADING__RESULT__ERROR;
      }
      dispatch(actionCreators.showPaymentModal({...modalOptions, type: 'FAILED'}));
      dispatch(destroy('RedeemSmartfren'));
      dispatch(destroy('RedeemSmartfrenConfirm'));
      dispatch(actionCreators.clearTransRefNum());
      Toast.show(getErrorMessage(err, language.REDEEM__SMARTFREN__ERROR));
    });
  };
}

export function getBalanceEmoney () {
  return (dispatch, getState) => {
    const state = getState();
    const emoneyAccNo = result(state, 'user.profile.customer.cifCode', '');
    dispatch(actionCreators.updateEmoney({status: 'loading'}));
    api.getBalanceEmoney({cif: emoneyAccNo}, dispatch).then((res) => {
      dispatch(actionCreators.updateEmoney(res.data.accounts));
      dispatch(actionCreators.updateBalanceEmoney(res.data.accounts));
    }).catch(() => {
      dispatch(actionCreators.updateEmoney({status: 'error'}));
    });
  };
}

export function showUpgradeEmoney () {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'TermsEmoney'}));
  };
}

export function showUpgradeFull () {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'EmoneyUpgradeFullBank'}));
  };
}

export function validateCloseEmoney () {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    dispatch(actionCreators.updateEmoney({status: 'loading'}));
    dispatch(updateBalances()).then(() => {
      dispatch(NavigationActions.navigate({routeName: 'EmoneyCloseRoutes'}));
      dispatch(actionCreators.hideSpinner());
    }).catch(() => {
      dispatch(actionCreators.hideSpinner());
      dispatch(actionCreators.updateEmoney({status: 'error'}));
    });
  };
}

export function triggerCloseEmoney (deleteEmoney) {
  return (dispatch) => {
    const params = {onSubmit: deleteEmoney, amount: '', isOtp: true, isEasypin: false};
    const currentAmount = 0;
    dispatch(triggerAuthNavigate('closeEmoney', currentAmount, false, 'AuthEmoneyClose', params)); // null for replace billamount, absolute must easypin
  };
}

export function deleteEmoney () {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const transRefNum = result(state, 'transRefNum', '');
    const cif = result(state, 'user.profile.customer.cifCode', '');
    const accessFrom = 'v3';
    const mPinInputed = result(state, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(state, 'form.AuthenticateForm.values.simasToken', '');
    const payload = {transRefNum, cifCode: cif, accessFrom, mPinInputed, simasToken};
    return api.closeEmoneyAccount(payload, dispatch).
      then(() => {
        dispatch(actionCreators.clearEmoney());
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'ConfirmClosingEmoney'}),
          ]
        }));
        dispatch(NavigationActions.back());
        dispatch(NavigationActions.navigate({routeName: 'CloseEmoneyFinish'}));
        dispatch(actionCreators.hideSpinner());
        set(storageKeys['TNC_LOCKDOWN'], false);
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        const errorMessage = getErrorMessage(err, language.RECURRING__TIME_OUT_OR_NO_DATA);
        Toast.show(errorMessage, Toast.LONG);
      });
  };
}

export function closeEmoneyAcc () {
  return (dispatch, getState) => {
    const state = getState();

    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goTothunkEmoneyClose = () => {
      dispatch(deleteEmoney());
    };
    const goToDelete = () => {
      dispatch(triggerCloseEmoney(goTothunkEmoneyClose));
      dispatch(actionCreators.hideSinarmasAlert());
    };


    const accounts = result(state, 'accounts', []);
    if (accounts.length > 1) {
      const sinarmasModalOptions = {
        heading1: language.EMONEY__CLOSING_MODAL_TITLE,
        text: language.EMONEY__CLOSING_MODAL_SUBTITLE_2,
        button1: language.EMONEY__MODAL_CANCEL,
        onButton1Press: hideAlert,
        button1Color: 'black',
        button2: language.EMONEY__MODAL_OK,
        onButton2Press: goToDelete,
        onClose: hideAlert
      };
      dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
    } else {
      const sinarmasModalOptions = {
        heading1: language.EMONEY__CLOSING_MODAL_TITLE,
        text: language.EMONEY__CLOSING_MODAL_SUBTITLE_1,
        button1: language.EMONEY__MODAL_CANCEL,
        onButton1Press: hideAlert,
        button1Color: 'black',
        button2: language.EMONEY__MODAL_OK,
        onButton2Press: goToDelete,
        onClose: hideAlert
      };
      dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
    }

  };
}

export function closeEmoneyGoToLogin () {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    return api.logOut(dispatch).then(() => {
      dispatch(actionCreators.hideSpinner());
      dispatch(actionCreators.cleanAppState());
      dispatch(actionCreators.savePositionDeeplink('yes'));
    }).catch(() => {
      dispatch(actionCreators.hideSpinner());
      dispatch(actionCreators.cleanAppState());
      dispatch(actionCreators.savePositionDeeplink('yes'));
    });
  };
}

export function closeEmoneyGoToIntro () {
  return (dispatch) => {
    dispatch(closeEmoneyNonKYC());
  };
}

export function finalizeEmoneyExistingtoBank () {
  return (dispatch, getState) => {
    const state = getState();
    const transRefNum = result(state, 'transRefNum', '');
    const accessFrom = 'v3';
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const mPinInputed = result(state, 'form.AuthenticateForm.values.otp', '');
    const payload = {cifCode, transRefNum, accessFrom, mPinInputed};
    dispatch(actionCreators.showSpinner());
    return api.registerEmoney(payload, dispatch).then((res) => {
      const responseCode = result(res, 'data.responseCode', '');
      const responseMessage = result(res, 'data.responseMessage', '');
      if (responseCode === '00') {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'FinalizeEmoney'}),
          ]
        }));
        Toast.show(responseMessage, Toast.LONG);
      } else {
        dispatch(actionCreators.hideSpinner());
        Toast.show(responseMessage, Toast.LONG);
      }
    });
  };
}

export function inboxPushCounter () {
  return (dispatch) => {
    DeviceEventEmitter.addListener('pushReceived', (message = {}) => {
      dispatch(actionCreators.saveInboxCounter({message}));
    });
  };
}

export function openInbox (isSearch) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    let additional = [];
    if (isLogin) {
      additional = ['ipassport'];
    } else {
      additional = ['tokenClient', 'tokenServer'];
    }
    const application = pushWooshAppConstants.applicationID;
    const deviceType = Platform.OS === 'android' ? 3 : Platform.OS === 'ios' ? 1 : null;
    const v = '5.8.1';
    const hwid = DeviceInfo.getUniqueID();
    const payload = {hwid, application, deviceType, v};
    return api.getInbox(payload, additional, dispatch).then((res) => {
      const data = result(res, 'data.response.messages', {});
      dispatch(actionCreators.clearInboxCounter());
      dispatch(actionCreators.hideSpinner());
      if (isSearch) {
        dispatch(NavigationActions.navigate({routeName: 'PushNotifInbox', params: {data}}));
      } else {
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Landing'}),
          ]
        }));
        dispatch(NavigationActions.navigate({routeName: 'PushNotifInbox', params: {data}}));
      }
    });
  };
}

export function getInbox (nextData) {
  return (dispatch) => {
    let nextPage = result(nextData, 'nextPage') || 1;
    const currentData = result(nextData, 'paramsData', []);
    const newDataCreated = currentData.map(function (el, key) {
      const o = Object.assign({}, el);
      o.test_status = key;
      return o;
    });
    let firstData = paginator(newDataCreated, nextPage, 10);
    const newData = result(nextData, 'pushNotifList.data', []);
    if (nextPage > 1) {
      firstData.data.push(...newData);
    }
    dispatch(actionCreators.saveNotifList(firstData));
    dispatch(actionCreators.hideSpinner());
  };

}

export function cardlessGuide () {
  return (dispatch) => {
    getIsCashGuideModalShow().then((response) => {
      const res = result(response, 'disabling', 'false');
      if (res === 'false') {
        dispatch(actionCreators.showCashModal('true'));
      } else {
        dispatch(actionCreators.hideCashModal());
      }
    }).catch((err) => {
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__GET_DATA));
    });
  };
}

export function cardlessGuideOver () {
  return (dispatch) => {
    dispatch(actionCreators.hideCashModal());
    set(storageKeys['GETCASHGUIDEMODAL'], {disabling: 'true'});
  };
}

export function goDashboard () {
  return (dispatch) => {
    dispatch(actionCreators.clearTransRefNum());
    dispatch(prepareGoDashboardCgv());
  };
}

export function getLanding () {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToLogout = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      return api.logOut(dispatch).then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.cleanAppState());
        dispatch(actionCreators.savePositionDeeplink('yes'));
      }).catch(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.cleanAppState());
        dispatch(actionCreators.savePositionDeeplink('yes'));
      });
    };
    const sinarmasModalOptions = {
      heading1: language.CGV__MODAL_HEADING,
      text: language.CGV__MODAL_TEXT,
      button1: language.CGV__MODAL_CANCEL,
      onButton1Press: hideAlert,
      button2: language.CGV__MODAL_BACK,
      onButton2Press: goToLogout,
      onClose: hideAlert
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function getLandingEgift () {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToLogout = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      return api.logOut(dispatch).then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.cleanAppState());
        dispatch(actionCreators.savePositionDeeplink('yes'));
      }).catch(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.cleanAppState());
        dispatch(actionCreators.savePositionDeeplink('yes'));
      });
    };
    const sinarmasModalOptions = {
      heading1: language.EGIFT__MODAL_HEADING,
      text: language.EGIFT__MODAL_TEXT,
      button1: language.EGIFT__MODAL_CANCEL,
      onButton1Press: hideAlert,
      button2: language.EGIFT__MODAL_BACK,
      onButton2Press: goToLogout,
      onClose: hideAlert
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function isNewBurgerMenu () {
  return (dispatch) => {
    getIsNewMenu().then((response) => {
      const res = result(response, 'disabling', 'false');
      if (res === 'false') {
        dispatch(actionCreators.showNewMenuIcon({showed: true}));
      } else {
        dispatch(actionCreators.hideNewMenuIcon());
      }
    }).catch((err) => {
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__GET_DATA));
    });
  };
}
export function generatePicture (data) {
  return (dispatch) => {
    const base64data = result(data, 'base64', '');
    const payload = {image: base64data};
    dispatch(actionCreators.showSpinner());
    return api.addPicture(payload, dispatch).then((res) => {
      const base64 = result(res, 'data.image', '');
      set(storageKeys['PROFILE_PICTURE'], base64);
      dispatch(actionCreators.savePicture({base64: base64data}));
      dispatch(actionCreators.hideSpinner());
      Toast.show(language.SUCCESS__CHANGE_PHOTO, Toast.LONG);
    }).catch(() => {
      Toast.show(language.FAIL__CHANGE_PHOTO, Toast.LONG);
    });
  };
}

export function updatePicture () {
  return (dispatch) => {
    getProfilePicture().then((res) => {
      if (res === null || res === '' || res === 'null') {
        const payload = {};
        return api.updatePicture(payload, dispatch).then((res) => {
          const base64 = result(res, 'data.image', '');
          set(storageKeys['PROFILE_PICTURE'], base64);
          dispatch(actionCreators.savePicture({base64: base64}));
        });
      } else {
        dispatch(actionCreators.savePicture({base64: res}));
      }
    });
  };
}

export function deletePicture () {
  return (dispatch) => {
    const payload = {image: null};
    dispatch(actionCreators.showSpinner());
    return api.addPicture(payload, dispatch).then((res) => {
      const base64 = result(res, 'data.profilePicture', '');
      set(storageKeys['PROFILE_PICTURE'], base64);
      dispatch(actionCreators.savePicture({base64: base64}));
      dispatch(actionCreators.hideSpinner());
      Toast.show(language.SUCCESS__DELETE_PHOTO, Toast.LONG);
    }).catch(() => {
      Toast.show(language.FAIL__DELETE_PHOTO, Toast.LONG);
    });
  };
}

export function setNewBurgerMenu () {
  return (dispatch) => {
    dispatch(actionCreators.hideNewMenuIcon());
    set(storageKeys['IS_NEW_MENU'], {disabling: 'true'});
  };
}

export function customerLockModal () {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const gotoHomeLock = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'HomeScreen'})
        ]
      }));
    };
    const sinarmasModalOptions = {
      heading1: language.REKSADANA_DISCLAIMER_CONFIRMATION_TITLE,
      text: 'Customer as Mutual Fund is be-ing blocked',
      button1: language.ONBOARDING__OKAY,
      onButton1Press: gotoHomeLock,
      onClose: hideAlert,
      button1Color: 'black'
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'DISCLAIMER'}));
  };
}

export function simasSekuritas (item) {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const simasSekuritasPortfolioView = () => {
      dispatch(actionCreators.showSpinner());
      dispatch(actionCreators.hideSinarmasAlert());
      return api.summaryDetailLastTransReksadana(dispatch).then((res) => {
        const dataSummary = result(res, 'data.data', []);
        const isCutOffTimeDay = result(res, 'data.isCutOffTimeDay');
        const toogleQuery = result(res, 'data', []);


        dispatch(actionCreators.saveReksadanaTransaction([...dataSummary]));
        const customerLock = result(dataSummary, '0.detailPortfolio.portfolio.0.Customer_Lock', '');
        if (customerLock === 'Yes') {
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.CUSTOMER_IS_LOCK, Toast.LONG);
        } else {
          dispatch(actionCreators.saveisCutOffTimeDay({isCutOffTimeDay: isCutOffTimeDay}));
          dispatch(NavigationActions.navigate({routeName: 'SimasSekuritasView', params: {toogleQuery: toogleQuery}}));
        }
        dispatch(actionCreators.hideSpinner());
      }).catch((err) => {
        dispatch(actionCreators.hideSpinner());
        const checkingUserMedalion = result(err, 'data.responseCode');
        if (checkingUserMedalion === '02') {
          dispatch(actionCreators.hideSpinner());
          const typeErrorDetail = language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT2 + listLang(result(item, 'code', ''));
          const typeError = language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT;
          const modalOption = {heading: typeErrorDetail, subheading: language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT_PRODUCT, transactionType: typeError};
          dispatch(actionCreators.showPaymentModal({...modalOption, type: 'FAILED'}));
          dispatch(NavigationActions.navigate({routeName: 'PaymentStatus'}));
        } else {
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__GET_DATA));
          dispatch(actionCreators.hideSpinner());
        }
      });
    };
    const modalOptions = {
      heading1: language.INQUIRY__SIL_MODAL_TITLE,
      text: language.INQUIRY__SIL_MODAL_SUBTITLE,
      button1: language.INQUIRY__SIL_MODAL_BUTTON_CANCEL,
      onButton1Press: hideAlert,
      button2: language.INQUIRY__SIL_MODAL_BUTTON_OK,
      onButton2Press: simasSekuritasPortfolioView,
      onClose: hideAlert,
      disabled: true
    };
    dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
  };
}

export function subscriptionReksadana (formValues, item) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const isCutOffTimeDay = result(item, 'isCutOffTimeDay');
    const summary = result(item, 'summaryPortfolio', {});
    const fundNamesSplit = result(summary, 'Fund_Name', '');
    const selectedAccount = result(formValues, 'myAccount', '');
    const mPinInputed = result(state, 'form.AuthenticateForm.values.otp', '');
    const transRefNum = result(state, 'transRefNum', '');
    const fundCode = result(item, 'summaryPortfolio.Fund_Code', '');
    const trnDate = moment(new Date()).format('DD-MMM-YYYY');
    const trnTime = moment(new Date()).format('HH:mm');
    const amount = result(formValues, 'amount', 0);
    const fee = '0';
    const bankAccount = result(formValues, 'myAccount.accountNumber', '');
    const trxId = result(item, 'detailPortfolio.portfolio.0.trxId', '');
    const exchangeHours = isCutOffTimeDay ? '0' : '1';
    const merchantCode = '6014';
    const referenceId = result(state, 'transRefNum', '');
    const channelId = 'simas1';
    const isBuyReksadana = 'yes';
    const transactionType = language.PAYMENT__STATUS_TRANSACTION_SUBSCRIPTION + [`${fundNamesSplit}`];
    const fundCurrency = result(item, 'detailPortfolio.portfolio.0.Fund_Currency');
    const modalOptions = {
      amount: fundCurrency === 'IDR' ? `Rp ${currencyFormatter(amount)}` : `$ ${formatForexAmount(amount, fundCurrency)}`,
      transactionType,
      transactionId: transRefNum,
      accountFrom: selectedAccount,
      isBuyReksadana,
      referenceId,
      item
    };
    dispatch(actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}));
    let easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    const randomNumber = randomString(16);
    OBM_EncryptPassword(easyPin, randomNumber);
    if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
    const flagMgm = result(state, 'config.hideNotifMGM', '');
    const flagMgmOn = lowerCase(flagMgm) === 'yes';
    const payload = {
      merchantCode,
      easyPin, mPinInputed, transRefNum, fundCode, referenceId,
      trnDate, trnTime, amount, fee, bankAccount, channelId, trxId, exchangeHours,
    };

    return api.subscriptionReksadana(payload, dispatch).
      then((res) => {
        dispatch(actionCreators.hideSpinner());
        const accountTo = result(res, 'data', {});
        const resultDisplay = result(res, 'data.result.displayList', []);
        if (exchangeHours === '0') {
          dispatch(actionCreators.showPaymentModal({...modalOptions, resultDisplay, type: 'SUCCESS', accountTo}));
        } else {
          dispatch(actionCreators.showPaymentModal({...modalOptions, resultDisplay, type: 'PENDING', accountTo}));
        }
        dispatch(destroy('buyReksadana'));
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Landing'}),
          ]
        }));
        dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNewOnboarding', params: {isBuyReksadana}}));
        if (!flagMgmOn) {
          dispatch(popUpRewardMgm());
        }
        dispatch(actionCreators.clearTransRefNum());
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        dispatch(destroy('buyReksadana'));
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Landing'}),
          ]
        }));
        const isBuyReksadana = 'yes';
        dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNewOnboarding', params: {isBuyReksadana}}));
        if (!flagMgmOn) {
          dispatch(popUpRewardMgm());
        }
        const resultDisplay = result(err, 'data.result.displayList', []);
        const errorText = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL);
        dispatch(errorResponseResult(err, modalOptions, resultDisplay, errorText, selectedAccount));
        dispatch(actionCreators.clearTransRefNum());
      });
  };
}

export function checkCutOffTimeReksadana (item, goToNextRoute, toogle, dataNavQuery) {
  return (dispatch, getState) => {

    const state = getState();
    const isCutOffTimeDay = result(item, 'isCutOffTimeDay');
    const cutOffTime = result(item, 'detailPortfolio.portfolio.0.Fund_CutOff', '');
    let time = [];
    time = getCutOffTimeReksadana(moment(cutOffTime, 'HH:mm'));
    const nextRoute = goToNextRoute === 'goToBuy' ? 'BuyReksadanaView' : 'SellReksadanaView';
    const subsLock = result(item, 'detailPortfolio.portfolio.0.Subscription_Lock', '');
    const redemptLock = result(item, 'detailPortfolio.portfolio.0.Redemption_Lock', '');
    const productLock = result(item, 'detailPortfolio.portfolio.0.Product_Account_Lock', '');
    const toogleLanguage = result(state, 'currentLanguage.id', '');
    const toogleWordingId = result(dataNavQuery, 'toogleWordingId', '');
    const toogleWordingEn = result(dataNavQuery, 'toogleWordingEn', '');
    const currentLanguage = toogleLanguage === 'id' ? toogleWordingId : toogleWordingEn;


    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      dispatch(actionCreators.hideSpinner());
    };
    const goToNext = () => {
      set(storageKeys['POPUPMEDALLION'], {dontShow: checked});
      dispatch(actionCreators.hideSinarmasAlert());
      dispatch(NavigationActions.navigate({
        routeName: nextRoute,
        params: {item: item, time: time}
      }));
      dispatch(actionCreators.hideSpinner());
    };
    let checked = false;
    const checkboxChange = (res) => {
      checked = !res;
    };
    const goToPopUpSubs = () => {
      if (checked === true) {
        const modalOptionsSubs = {
          heading1: language.REKSADANA_DISCLAIMER_CONFIRMATION_TITLE,
          text: language.REKSADANA_DISCLAIMER_CONFIRMATION,
          button1: language.ONBOARDING__CLEAR_CANCEL,
          onButton1Press: hideAlert,
          button2: language.ONBOARDING__OKAY,
          onButton2Press: goToNext,
          onClose: hideAlert,
          button1Color: 'black'
        };
        set(storageKeys['POPUPMEDALLION'], {dontShow: checked});
        dispatch(actionCreators.hideSinarmasAlert());
        dispatch(actionCreators.showSpinner());
        setTimeout(() => {
          dispatch(actionCreators.hideSinarmasAlert());
          dispatch(actionCreators.showSinarmasAlert({...modalOptionsSubs, image: 'MEDALION_DISCLAIMER'}));
        }, 2000);
      } else {
        dispatch(actionCreators.hideSpinner());
        Toast.show(language.EROR__CHECKBOX_IS_EMPTY, Toast.LONG);
      }
    };
    dispatch(actionCreators.hideSpinner());

    const checkedCondition = () => {
      if (checked === true) {
        dispatch(actionCreators.hideSinarmasAlert());
        dispatch(NavigationActions.navigate({
          routeName: nextRoute,
          params: {item: item, time: time}
        }));
      } else {
        dispatch(actionCreators.hideSpinner());
        Toast.show(language.EROR__CHECKBOX_IS_EMPTY, Toast.LONG);
      }
    };

    // const toogleMedalion = result(item, '')

    const sinarmasModalOptionsSubs = {
      heading1: language.REKSADANA_DISCLAIMER_CONFIRMATION_TITLE,
      textReksadana: language.REKSADANA_DISCLAIMER_CONFIRMATION_2,
      textLinkReksadana: language.INQUIRY__REKSADANA_MODAL_TITLE_2,
      textLinkReksadana2: language.INQUIRY__REKSADANA_SUBTITLE_2,
      checkboxChange,
      checkboxPosition: 'BOTTOM',
      checkboxLabel: language.REKSADANA_DISCLAIMER_CONFIRMATION_3,
      button1: language.ONBOARDING__CLEAR_CANCEL,
      onButton1Press: hideAlert,
      button2: language.ONBOARDING__OKAY,
      onButton2Press: goToPopUpSubs,
      onClose: hideAlert,
      button1Color: 'black',
    };
    const sinarmasModalOptions = {
      heading1: language.REKSADANA_DISCLAIMER_CONFIRMATION_TITLE,
      textReksadana: language.REKSADANA_DISCLAIMER_CONFIRMATION,
      button1: language.ONBOARDING__CLEAR_CANCEL,
      onButton1Press: hideAlert,
      button2: language.ONBOARDING__OKAY,
      onButton2Press: goToNext,
      onClose: hideAlert,
      button1Color: 'black'
    };

    const sinarmasModalOptions2 = {
      heading1: language.REKSADANA_DISCLAIMER_CONFIRMATION_TITLE,
      textReksadana: language.REKSADANA_DISCLAIMER_CONFIRMATION_2,
      textLinkReksadana: language.INQUIRY__REKSADANA_MODAL_TITLE_2,
      textLinkReksadana2: language.INQUIRY__REKSADANA_SUBTITLE_2,
      checkboxChange,
      checkboxPosition: 'BOTTOM',
      checkboxLabel: language.REKSADANA_DISCLAIMER_CONFIRMATION_3,
      button1: language.ONBOARDING__CLEAR_CANCEL,
      onButton1Press: hideAlert,
      button2: language.ONBOARDING__OKAY,
      onButton2Press: checkedCondition,
      onClose: hideAlert,
      button1Color: 'black',
    };

    const sinarmasModalOptionToogle = {
      heading1: language.HEADER__UNDER_CONSTRUCTION,
      text: currentLanguage,
      button1: language.BUTTON__UNDER_CONSTRUCTION,
      onButton1Press: hideAlert,
      button1Color: 'black',
    };

    if (productLock === 1) {
      dispatch(actionCreators.hideSpinner());
      Toast.show(language.PRODUCT__ACCOUNT_IS_LOCK, Toast.LONG);
    } else {
      if (goToNextRoute === 'goToBuy') {
        if (subsLock === 'Yes') {
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.SUBSCRIPT__LOCK, Toast.LONG);
        } else {
          if (toogle === 'true') {
            dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptionToogle, image: 'TOOGLE_MEDALION'}));
          } else {
            if (isCutOffTimeDay === false) {
              dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptionsSubs, image: 'MEDALION_DISCLAIMER2'}));
            } else {
              dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions2, image: 'MEDALION_DISCLAIMER2'}));
            }
          }
        }
      } else {
        if (redemptLock === 'Yes') {
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.REDEEMPT__LOCK, Toast.LONG);
        } else {

          if (toogle === 'true') {
            dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptionToogle, image: 'TOOGLE_MEDALION'}));
          } else {
            if (isCutOffTimeDay === false) {
              dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'MEDALION_DISCLAIMER'}));
            } else {
              dispatch(NavigationActions.navigate({
                routeName: nextRoute,
                params: {item: item, time: time}
              }));
            }
          }
        }
      }
    }
  };

}

export function redemptionReksadana (formValues, item, totalEarnings, totalFee, isRedeemAll) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const storeState = getState();
    const redemAll = isRedeemAll ? '1' : '0';
    const isCutOffTimeDay = result(item, 'isCutOffTimeDay');
    const time = isCutOffTimeDay ? '0' : '1';
    const summary = result(item, 'summaryPortfolio', {});
    const fundNamesSplit = result(summary, 'Fund_Name', '');
    const transRefNum = storeState.transRefNum;
    const fundCode = result(item, 'summaryPortfolio.Fund_Code', '');
    const trnDate = moment(new Date()).format('DD-MMM-YYYY');
    const trnTime = moment(new Date()).format('HH:mm');
    const bankAccount = result(formValues, 'accountNumber', '');
    const estEarnings = parseInt(Math.round(totalEarnings - totalFee));
    const isSellReksadana = 'yes';
    const channelId = 'simas1';
    let unit = result(formValues, 'amount', '');
    const responseUnit = result(storeState, 'saveisResponseUnit.responseUnit', '');
    unit = responseUnit;
    const transactionType = language.PAYMENT__STATUS_SELL_TRANSACTION_TYPE + [`${fundNamesSplit}`];
    const fundCurrency = result(item, 'detailPortfolio.portfolio.0.Fund_Currency');
    const modalOptions = {
      heading: `${result(formValues, 'name', '')}`,
      unit: fundCurrency === 'IDR' ? `Rp ${currencyFormatter(estEarnings)}` : `$ ${currencyFormatter(estEarnings, fundCurrency)}`,
      transactionId: transRefNum,
      transactionType,
      isSellReksadana,
      accountFrom: formValues,
      item,
      bankAccount,
      totalEarnings,
      responseUnit,
    };
    dispatch(actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}));
    let easyPin = result(storeState, 'form.AuthenticateForm.values.easypin', '');
    const randomNumber = randomString(16);
    OBM_EncryptPassword(easyPin, randomNumber);
    if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
    const flagMgm = result(storeState, 'config.hideNotifMGM', '');
    const flagMgmOn = lowerCase(flagMgm) === 'yes';
    const payload = {
      easyPin, transRefNum, fundCode,
      trnDate, trnTime, unit, totalFee, bankAccount, channelId, redemAll
    };

    return api.redemptionReksadana(payload, dispatch).
      then((res) => {
        dispatch(actionCreators.hideSpinner());
        const accountTo = result(res, 'data', {});
        const resultDisplay = result(res, 'data.result.displayList', []);
        if (time === '0') {
          dispatch(actionCreators.showPaymentModal({...modalOptions, resultDisplay, type: 'SUCCESS', accountTo, totalFee}));
        } else {
          dispatch(actionCreators.showPaymentModal({...modalOptions, resultDisplay, type: 'PENDING', accountTo, totalFee}));
        }
        dispatch(destroy('sellReksadana'));
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Landing'}),
          ]
        }));
        dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNewOnboarding', params: {totalFee, isSellReksadana}}));
        if (!flagMgmOn) {
          dispatch(popUpRewardMgm());
        }
        dispatch(actionCreators.clearTransRefNum());
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        dispatch(destroy('sellReksadana'));
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Landing'}),
          ]
        }));
        const isSellReksadana = 'yes';
        dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNewOnboarding', params: {isSellReksadana}}));
        if (!flagMgmOn) {
          dispatch(popUpRewardMgm());
        }
        const resultDisplay = result(err, 'data.result.displayList', []);
        const errorText = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL);
        dispatch(errorResponseResult(err, modalOptions, resultDisplay, errorText));
        dispatch(actionCreators.clearTransRefNum());
      });
  };
}

export function checkCutOffTimeSellReksadana (item, goToNextRoute) {
  return (dispatch) => {
    let time = '';
    const cutOffTime = result(item, 'detailPortfolio.portfolio.0.Fund_CutOff', '');
    time = getCutOffTimeReksadana(moment(cutOffTime, 'HH:mm'));
    const nextRoute = goToNextRoute === 'goToBuy' ? 'BuyReksadanaView' : 'SellReksadanaView';
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToNext = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      dispatch(NavigationActions.navigate({
        routeName: nextRoute,
        params: {item: item, time: time}
      }));
    };
    const sinarmasModalOptions = {
      heading1: language.REKSADANA_DISCLAIMER_CONFIRMATION_TITLE,
      text: language.REKSADANA_DISCLAIMER_CONFIRMATION,
      button1: language.ONBOARDING__CLEAR_CANCEL,
      onButton1Press: hideAlert,
      button2: language.ONBOARDING__OKAY,
      onButton2Press: goToNext,
      onClose: hideAlert,
      button1Color: 'black'
    };
    if (time === 'nextWorking') {
      dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'MEDALION_DISCLAIMER'}));
    } else {
      dispatch(NavigationActions.navigate({
        routeName: nextRoute,
        params: {item: item, time: time}
      }));
    }
  };
}

export function getFavBiller () {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const billpayMethodType = isLogin ? null : '1';
    const payload = {billpayMethodType};
    const billerList = result(state, 'billerConfig.billerList', {});
    dispatch(actionCreators.saveBillerFavorite({status: 'loading'}));
    if (isEmpty(billerList)) {
      return api.getFavBiller(payload, dispatch).then((res) => {
        const dataBiller = result(res, 'data.allTransaction.savedBillPaymentList', []);
        const dataSaving = result(res, 'data.allTransaction.targetAccountList', []);
        const data = [...dataBiller, ...dataSaving];
        dispatch(actionCreators.saveBillerFavorite({...data, status: 'success'}));
      }).catch(() => {
        dispatch(actionCreators.saveBillerFavorite({status: 'error'}));
      });
    } else {
      return api.getFavBiller(payload, dispatch).then((res) => {
        const dataBiller = result(res, 'data.allTransaction.savedBillPaymentList', []);
        const dataSaving = result(res, 'data.allTransaction.targetAccountList', []);
        const data = [...dataBiller, ...dataSaving];
        dispatch(actionCreators.saveBillerFavorite({...data, status: 'success'}));
      }).catch(() => {
        dispatch(actionCreators.saveBillerFavorite({status: 'error'}));
      });
    }
  };
}

export function goFavBiller () {
  return (dispatch) => {
    dispatch(populateBillerData());
    dispatch(NavigationActions.navigate({routeName: 'FavBiller', params: {isRoute: 'Account'}}));
  };
}

export function openFavBiller () {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'FavBiller', params: {favFilter: 'biller', isRoute: 'PayScreen'}}));
  };
}

export function openTrfBiller () {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'FavBiller', params: {favFilter: 'trf'}}));
  };
}

export function getAutodebitList () {
  return (dispatch) => {
    const payload = {};
    dispatch(actionCreators.saveAutoDebitList({status: 'loading'}));
    return api.getAutoDebitList(payload, dispatch).then((res) => {
      const data = result(res, 'data.result.autoDebetList', []);
      dispatch(actionCreators.saveAutoDebitList({list: data, status: 'success'}));
    }).catch(() => {
      dispatch(actionCreators.saveAutoDebitList({status: 'error'}));
    });
  };
}

export function getAutoDebitHistory (data) {
  return (dispatch) => {
    const payload = {
      merchantCode: result(data, 'merchantCode', ''),
      accountNumber: result(data, 'accountNumber', ''),
      subsNumber: result(data, 'subscriberNumber', ''),
    };
    dispatch(actionCreators.showSpinner());
    return api.getAutoDebitHistory(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const ADHistory = result(res, 'data.resultHistory', []);
      dispatch(actionCreators.saveAutoDebitHistory(ADHistory));
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.AUTODEBIT__HISTORY_NOT_FOUND), Toast.LONG);
    });
  };
}

export function goAutoDebitList () {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'ListAutodebit'}));
  };
}

export function searchAutoDebitList () {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'SearchAutodebit'}));
  };
}

export function deleteAutoDebitList (data) {
  return (dispatch) => {
    const subscriberID = result(data, 'item.subscriberNumber', '');
    const accountNo = result(data, 'item.accountNumber', '');
    const payeeCode = result(data, 'item.merchantCode', '');
    const merchantName = result(data, 'item.merchantName', '');
    const payload = {accountNo, subscriberID, payeeCode};
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const buttonYes = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      dispatch(actionCreators.showSpinner());
      return api.deleteAutoDebitListNew(payload, dispatch).then(() => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(language.AUTODEBIT__LIST_DELETE_SUCCESS, Toast.LONG);
        dispatch(getAutodebitList());
      }).
        catch(() => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.AUTODEBIT__LIST_DELETE_ERROR, Toast.LONG);
        });
    };
    const sinarmasModalOptions = {
      heading1: language.AUTODEBIT__LIST_DEL_HEADER,
      heading2: merchantName + ' - ' + subscriberID + ' ?',
      text: language.AUTODEBIT__LIST_DEL_TEXT,
      button1: language.GENERIC__CANCEL,
      button2: language.GENERIC__YES,
      onButton1Press: hideAlert,
      onButton2Press: buttonYes,
      onClose: hideAlert
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function goToVAtransfer (virtualAccount, isDisableHome) {
  return (dispatch) => {
    dispatch(actionCreators.savePgoStatus('yes'));
    dispatch(actionCreators.savebillerCodeDeepLink('009903'));
    dispatch(actionCreators.saveParamsLink([{keyId: 'subscriberNo', valueId: virtualAccount}]));
    dispatch(actionCreators.showSpinner());
    return Promise.all([dispatch(populateBillerData()), dispatch(populateConfigData())]).
      then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(prepareGoBillerVoucher(isDisableHome));
      }).
      catch(() => {
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function succesGetLoanPGO () {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const buttonYes = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      dispatch(saveLoanDataPgoAcceptOnly());
    };
    const sinarmasModalOptions = {
      heading1: language.PGO__SUCCESS_APLY,
      text: language.PGO__SUCCESS_APLY_TEXT,
      button1: language.PGO__SUCCESS_BUTTON,
      onButton1Press: buttonYes,
      onClose: hideAlert
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function rejectGetLoanPGO (statusLoan) {
  return (dispatch) => {
    if (statusLoan === 'AUDIT_SUCCESS') {
      const hideAlert = () => {
        dispatch(NavigationActions.back());
        dispatch(actionCreators.hideSinarmasAlert());
      };
      const hideAlertOnly = () => {
        dispatch(actionCreators.hideSinarmasAlert());
      };
      const sinarmasModalOptions = {
        heading1: language.PGO__REJECT_LOAN,
        text: language.PGO__REJECT_LOAN_TEXT,
        button1: language.PGO__REJECT_BUTTON,
        onButton1Press: hideAlert,
        onClose: hideAlertOnly
      };
      dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
    } else {
      dispatch(NavigationActions.back());
    }
  };
}

export function showVCC (selectedAccount) {
  return (dispatch, getState) => {
    const state = getState();
    const panNumber = result(selectedAccount, 'accountNumber');
    let easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    const randomNumber = randomString(16);
    OBM_EncryptPassword(easyPin, randomNumber);
    if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
    const iv = '1112131415161718';
    const key = '0102030405060708';
    dispatch(NavigationActions.back());
    dispatch(actionCreators.showSpinner());
    return api.getVccTwo({panNumber, key, iv, easyPin}, dispatch).then((res) => {
      const cvv2 = result(res, 'data.cvv2');
      dispatch(actionCreators.hideSpinner());
      AesCrypto.decrypt(cvv2, key, iv).then((cvvNumber) => {
        dispatch(actionCreators.saveCVVNumber({selectedAccount, cvvNumber}));
        dispatch(actionCreators.hideSpinner());
      }).catch((err) => {
        dispatch(actionCreators.hideSpinner());
        dispatch(cvvFailed(selectedAccount, err));
      });
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      dispatch(cvvFailed(selectedAccount, err));
    });
  };
}

export function cvvFailed (selectedAccount, err) {
  return (dispatch) => {
    const isPin = result(err, 'data.responseCode', '');
    const hideAlert = () => {
      dispatch(refreshStorageNew());
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.DASHBOARD__CVV_FAILED,
      text: isPin === '17' ? language.DASHBOARD__EASYPIN_FAILED : language.DASHBOARD__CVV_FAILED_MSG,
      button1: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
      closeOnTouchOutside: false,
      image: noBanner,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}


export function getAmountSimasInvestLink (data, amount) {
  return (dispatch) => {
    const summaryDetail = result(data, 'navigation.state.params.summaryDetail', {});
    const infoPolis = result(data, 'navigation.state.params.infoPolis', {});
    const amountInvestasiLink = amount;
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToEmFundConfirm = () => {
      dispatch(NavigationActions.navigate({routeName: 'InquirySilEmFundConfirmScreen', params: {amount: amountInvestasiLink, infoPolis: infoPolis, summaryDetail: summaryDetail}})),
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      text: language.INQUIRY__SIL_EM_FUND_CONFIRM_WORD + currencyFormatter(amountInvestasiLink) + language.INQUIRY__SIL_EM_FUND_CONFIRM_WORD2,
      button1: language.ONBOARDING__CLEAR_CANCEL,
      onButton1Press: hideAlert,
      button2: language.ONBOARDING__OKAY,
      onClose: hideAlert,
      onButton2Press: goToEmFundConfirm,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function succesPayLoanPGO () {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const buttonYes = () => {
      dispatch(getListLoanProduct());
    };
    const sinarmasModalOptions = {
      heading1: language.PGO__POPUP_SUCCESS_REPAY_TITLE,
      text: language.PGO__POPUP_SUCCESS_REPAY_SUBTITLE,
      button1: language.PGO__SUCCESS_PAYMENT_POPUP,
      button2: language.GENERIC__YES,
      onButton1Press: buttonYes,
      onButton2Press: hideAlert,
      onClose: hideAlert
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function confirmActivate (selectedAccount) {
  return (dispatch, getState) => {
    const state = getState();
    const easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    const panNumber = result(selectedAccount, 'accountNumber');
    const payload = {panNumber, easyPin};
    dispatch(actionCreators.showSpinner());
    return api.creditcardActivation(payload, dispatch).then(() => {
      dispatch(NavigationActions.back());
      dispatch(refreshStorage());
      dispatch(actionCreators.hideSpinner());
      dispatch(activateCCSuccess());
    }).catch((err) => {
      dispatch(NavigationActions.back());
      dispatch(actionCreators.hideSpinner());
      dispatch(activateCCFailed(selectedAccount, err));
    });
  };
}

export function activateCCSuccess () {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.DASHBOARD__CREDIT_ACTIVATE_SUCCESS,
      text: language.DASHBOARD__CREDIT_ACTIVATE_SUCCESS_TEXT,
      button1: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
      closeOnTouchOutside: false,
      image: noBanner,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}


export function getPinjamanGO () {
  return (dispatch) => {
    getLastOffersPinjamanGO().then((res) => {
      res === null ? set(storageKeys['GET_OFFER_PGO'], {dontShow: false}) : res;
    });
    dispatch(getPinjamanGOOffers());
  };
}

export function getPinjamanGOOffers () {
  return (dispatch, getState) => {
    const {config, currentLanguage} = getState();
    const uriImage = result(currentLanguage, 'id', '') === 'en' ? result(config, 'attention.urlData.3.url_en', '').toString() : result(config, 'attention.urlData.3.url_id', '').toString();
    let checked = false;
    const hideAlert = () => {
      set(storageKeys['GET_OFFER_PGO'], {dontShow: checked});
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const chooseLoan = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      dispatch(getListLoanProduct());
    };
    const checkboxChange = (res) => {
      checked = !res;
    };
    return getLastOffersPinjamanGO().then((res) => {
      if ((!result(res, 'dontShow', false))) {
        const modalOptions = {
          button1: language.PRODUCTS__APPLY,
          onButton1Press: chooseLoan,
          checkboxChange,
          onClose: hideAlert,
          checkboxLabel: language.LANDING__DONT_SHOW_AGAIN,
          text1: language.EMONEY__INFORMATION,
          text1Black: true
        };
        dispatch(actionCreators.showSinarmasAlert({...modalOptions, image: 'WARNING', uriImage}));
      }
    });
  };
}

export function simasLinkInvestasiEmFund (objectData) {
  return (dispatch, getState) => {
    const state = getState();
    const lang = result(state, 'currentLanguage.id', 'id');
    const selectedAccount = result(objectData, 'state.params.infoPolis.informasiRekening.rekeningNo', '');
    const transRefNum = result(state, 'transRefNum', '');
    const isSilEmFund = 'yes';
    const withdrawalAmount = result(objectData, 'state.params.amount', 0).toString();
    const keyPolicy = result(objectData, 'state.params.infoPolis.keyPolis', '');
    const keyTopUpId = result(objectData, 'state.params.summaryDetail.keyTopUpId');
    const accNumber = result(objectData, 'state.params.infoPolis.informasiRekening.rekeningNo', '');
    const accountList = result(state, 'accounts', []);
    const accProduct = getAccountType(accountList, accNumber);
    const savingAcc = result(accProduct, '[0]', {});
    const accProductType = result(savingAcc, 'productType', '');
    const transactionType = lang === 'id' ? 'Penarikan Emergency Fund' : 'Emergency Fund Withdrawal';
    const smsToken = result(state, 'form.AuthenticateForm.values.otp', '');
    const productCode = result(objectData, 'state.params.infoPolis.produkCode', '');
    const nomorPolis = result(objectData, 'state.params.infoPolis.nomorPolis', '');
    const alokasiPremi = result(objectData, 'state.params.summaryDetail.alokasiPremi', '');
    const flagMgm = result(state, 'config.hideNotifMGM', '');
    const flagMgmOn = lowerCase(flagMgm) === 'yes';
    const accObj = {
      newAccountNumber: accNumber,
      customerName: result(objectData, 'state.params.infoPolis.informasiRekening.rekeningNama'),
      productName: accProductType
    };
    const modalOptions = {
      amount: `Rp ${currencyFormatter(withdrawalAmount)}`,
      transactionType,
      transactionId: transRefNum,
      accountFrom: selectedAccount,
      isSilEmFund: isSilEmFund,
      nomorPolis: nomorPolis,
      alokasiPremi: alokasiPremi,
    };
    dispatch(actionCreators.showPaymentModal({...modalOptions, type: 'LOADING'}));
    dispatch(actionCreators.showSpinner());

    const payload = {
      keyPolicy, keyTopUpId, withdrawalAmount, productCode, nomorPolis, smsToken
    };
    return api.getEmFundSIL(payload, dispatch).
      then((res) => {
        const accountTo = accObj;
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Landing'})
          ]
        }));
        dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
        if (!flagMgmOn) {
          dispatch(popUpRewardMgm());
        }
        const resultDisplay = result(res, 'data.result.displayList', []);
        dispatch(actionCreators.showPaymentModal({...modalOptions, resultDisplay, type: 'PENDING', accountTo}));
        dispatch(destroy('PolicyNumber'));
        dispatch(destroy('emFund'));
        dispatch(destroy('investasiLink'));
        dispatch(destroy('InquirySilEmFundConfirmScreen'));
        dispatch(actionCreators.clearTransRefNum());
      }).
      catch((err) => {
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
        if (easyPinAttempt === 'invalid') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          if (smsToken !== '') {
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
          dispatch(NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'Landing'})
            ]
          }));
          dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          const resultDisplay = result(err, 'data.result.displayList', []);
          const errorText = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL);
          dispatch(errorResponseResult(err, modalOptions, resultDisplay, errorText, selectedAccount));
          dispatch(destroy('PolicyNumber'));
          dispatch(destroy('emFund'));
          dispatch(destroy('investasiLink'));
          dispatch(actionCreators.clearTransRefNum());
        }
      });
  };
}
export function getMmqData () {
  return (dispatch) => {
    const payload = '';
    return api.getInquiryMMQ(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const rc = result(res, 'data.responseCode', '');
      if (rc === '00') {
        dispatch(actionCreators.saveInquiryMMQ(res.data.getMMQMap));
      }
    }).catch(() => {
      dispatch(actionCreators.hideSpinner());
    });
  };
}

export function getMmqDataDetail (accountInfo) {
  return (dispatch) => {
    const txId = result(accountInfo, 'Nomor_Transaksi', '');
    const payload = {txId};
    dispatch(actionCreators.showSpinner());
    return api.getMMQDetail(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const data = result(res, 'data.getMMQDetailMap.listData.dataset', {});
      dispatch(actionCreators.saveMMQDetail(res.data.getMMQDetailMap));
      dispatch(NavigationActions.navigate({routeName: 'MMQGetDetailsPage', params: {data, accountInfo}}));
    }).catch(() => {
      dispatch(actionCreators.hideSpinner());
    });
  };
}

export function getRedemptionFee (formValues, item, editableInput) {
  return (dispatch, getState) => {
    const state = getState();
    const transRefNum = result(state, 'transRefNum', '');
    const fundCode = result(item, 'summaryPortfolio.Fund_Code', '');
    const trnDate = moment(new Date()).format('DD-MMM-YYYY');
    const unit = result(formValues, 'amount', '');
    const payload = {transRefNum, fundCode, trnDate, unit};
    dispatch(actionCreators.showSpinner());
    return api.getRedemptionFee(payload, dispatch).then((res) => {
      const totalFee = result(res, 'data.responseSOAMedallion.object.totalFee', 0);
      const responseUnit = result(res, 'data.responseUnit', '');
      dispatch(actionCreators.hideSpinner());
      dispatch(actionCreators.saveisResponseUnit({responseUnit: responseUnit}));
      dispatch(NavigationActions.navigate({
        routeName: 'SellReksadanaConfirmation',
        params: {formValues: formValues, item: item, totalFee: totalFee, editableInput: editableInput, responseUnit: responseUnit}
      }));
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function emoneyUpgradeModal () {
  return (dispatch) => {
    const uriImage = upgradeEmoneyImg;
    const goEmoneyForm = () => {
      dispatch(NavigationActions.navigate({routeName: 'EmoneyUpgradeForm'}));
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const modalOptions = {
      heading1: language.EMONEY__MODAL_UPGRADE,
      text: language.EMONEY__MODAL_UPGRADE_2,
      button1: language.EMONEY__TXT_UPGRADE,
      onButton1Press: goEmoneyForm,
      onClose: hideAlert,
      imgUpgrade: uriImage
    };
    dispatch(actionCreators.showSinarmasAlert({...modalOptions, image: 'EMONEYUPGRADE'}));
  };
}

export function emoneyOnboard () {
  return (dispatch, getState) => {
    const user = result(getState(), 'user', '');
    const emoneyMap = generateEmoneyOnboard(user);
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const hideForever = () => {
      set(storageKeys['WELCOME_EMONEY'], false);
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const modalOptions = {
      heading1: language.EMONEY__MODAL_UPGRADE,
      text: language.EMONEY__MODAL_UPGRADE_2,
      button1: language.EMONEY__OK,
      onClose: hideAlert,
      onButton1Press: hideForever,
      closeOnTouchOutside: false
    };
    get(storageKeys['WELCOME_EMONEY']).then((res) => {
      if (res === true) {
        dispatch(actionCreators.showSinarmasAlert({...modalOptions, image: 'EMONEYONBOARD', emoneyOnboard: emoneyMap}));
      } else {
        set(storageKeys['WELCOME_EMONEY'], false);
      }
    });
  };
}

export function succesSignLoanPGO () {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.PGO__POPUP_SUCCESS_SIGN_TITLE,
      text: language.PGO__POPUP_SUCCESS_SIGN_SUBTITLE,
      button1: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function holdOpenTimeDeposit () {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const modalOptions = {
      heading1: language.DASHBOARD__HOLD_OPEN_DEPOSIT_TITLE,
      text: language.DASHBOARD__HOLD_OPEN_DEPOSIT,
      button1: language.EMONEY__MODAL_OK,
      onButton1Press: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
  };
}

export function showDefaultAccountModal (account) {
  const accountStatus = result(account, 'accountStatus', '');
  return (dispatch) => {
    const setDefaultAccount = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      const accountId = result(account, 'id', '');
      dispatch(actionCreators.showSpinner());
      return api.setDefaultAccount({accountId, isDefault: 'YES'}, dispatch).
        then(() => {
          dispatch(refreshStorageNew()).then(() => {
            dispatch(actionCreators.hideSpinner());
            Toast.show('Default account set');
          });
        }).catch(() => {
          dispatch(actionCreators.hideSpinner());
          Toast.show('failed to set default account');
          dispatch(actionCreators.hideSinarmasAlert());
        });
    };
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    if (accountStatus !== 'dormant') {
      const sinarmasModalOptions = {
        heading1: language.DEFAULT_ACCOUNT__SET,
        text: language.MODAL__OPTION_SET_DEFAULT_ACCOUNT,
        text2: language.MODAL__OPTION_SET_DEFAULT_ACCOUNT,
        button1: language.EMONEY__MODAL_CANCEL,
        onButton1Press: hideAlert,
        button2: language.GENERIC__YES,
        onButton2Press: setDefaultAccount,
        onClose: hideAlert
      };
      dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
    } else if (accountStatus === 'dormant') {
      const sinarmasModalOptions = {
        heading1: language.POPUP__DORMANT_HEADER,
        text: language.POPUP__DORMANT_TEXT,
        button1: language.GENERIC__OK,
        onButton1Press: hideAlert,
        onClose: hideAlert,
      };
      dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
    }
  };
}

export function showDefaultAccountInfo () {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };

    const sinarmasModalOptions = {
      heading1: language.DEFAULT_ACCOUNT__TEXT,
      text: language.DEFAULT_ACCOUNT__TEXT_NEW,
      button1: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function confirmTransferSil (formValues, payee, transType, values, infoPolis) {
  return (dispatch, getState) => {
    const transferTime = result(formValues, 'transferTime', '') === '' ? '' : moment(formValues.transferTime).format('DD MMM YYYY');
    const recurring = result(formValues, 'schedule', '') === '4' ? moment(formValues.transferTime).format('DD') : '';
    const time = {transferTime, recurring};
    const isLogin = !isEmpty(result(getState(), 'user', {}));
    const transferMethodType = isLogin ? '' : '1';
    const additional = ['ipassport', 'TXID', 'lang'];
    const confirmTransferPayload = middlewareUtils.prepareConfirmTransferPayloadSIL({...formValues, ...values, transferMode: 'inbank'}, payee, transType, time, transferMethodType, infoPolis);
    dispatch(actionCreators.clearBillerDescFav());
    return api.confirmTransfer(confirmTransferPayload, additional, dispatch).
      then((res) => {
        const resData = result(res, 'data', {});
        dispatch(NavigationActions.navigate({routeName: 'ConfirmationTransferSILScreen', params: {formValues: {...formValues, ...values}, payee: {...payee}, infoPolis: {...infoPolis}, resData}}));
        dispatch(destroy('CreditCardPayment'));
        dispatch(destroy('creditcard'));
        dispatch(actionCreators.hideSpinner());
      }).catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL), Toast.LONG);
      });
  };
}

export function getPayeeNameSIL (infoPolis, formValues, values) {
  return (dispatch, getState) => {
    const state = getState();
    const vanumM = String(result(values, 'income.value', ''));
    const vanumP = '0';
    const vanumJ = String(result(values, 'maturitytipe.value', ''));
    const vanumS = String(result(values, 'work.value', ''));
    const accNo = result(infoPolis, 'noVa', '') + vanumM + vanumP + vanumJ + vanumS;
    const bankList = result(state, 'valueBankList.bankList', []);
    const bankIdRaw = find(bankList,  {'bankCode': '153'});
    const listPayees = result(state, 'payees', []);
    const isTargetAccountExist = find(listPayees,  {'accountNumber': accNo});
    const bankId = result(bankIdRaw, 'id', '');
    const isLogin = !isEmpty(result(getState(), 'user', {}));
    const transferMethodType = isLogin ? '' : '1';
    const additional = ['ipassport', 'TXID', 'lang'];
    const payload = middlewareUtils.prepareGetPayeeName({
      bankId,
      accountNumber: accNo,
      transferMethodType
    });

    dispatch(actionCreators.showSpinner());
    api.getPayeeName(payload, additional, dispatch).then((payeeDetails) => {
      const accountName = result(payeeDetails, 'data.targetName');
      const payee = {
        id: result(isTargetAccountExist, 'id', '') !== '' ? result(isTargetAccountExist, 'id', '') : null,
        accountNumber: accNo,
        name: accountName,
        bank: bankIdRaw,
        transferType: 'inbank',
        currency: result(infoPolis, 'mataUang', ''),
        modeFlag: 'null',
        isNewPayee: true,
      };
      dispatch(confirmTransferSil(formValues, payee, 'fundTransfer', values, infoPolis));
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__ERROR_GETTING_PAYEE_NAME), Toast.LONG);
    });
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

export function transferSIL (transferFormData, payeeAccount, type, resData, silFlagInfo) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const transferTime = result(transferFormData, 'transferTime', '') === '' ? '' : moment(transferFormData.transferTime).format('DD MMM YYYY');
    const recurring = result(transferFormData, 'schedule', '') === '4' ? moment(transferFormData.transferTime).format('DD') : '';
    const data = {...transferFormData, transferTime, recurring};
    const sourceAccount = transferFormData.myAccount;
    const transferType = result(resData, 'transferTransaction.mode', '');
    let showTime = new Date();
    let time = '';
    const {config, inputPolisIndividu} = getState();
    const state = getState();
    const isSilIdrUsd = result(state, 'silIdrUsd', '');
    const sendDate = moment(config.coreBusinessDateV3).isAfter(moment(config.serverTime), 'day') ? config.coreBusinessDateV3 : config.coreNextBusinessDateV3;
    if (transferType === 'skn' || transferType === 'rtgs') {
      const appTime = new Date();
      const gapTime = result(this, 'props.gapTimeServer', 0);
      const serverTimeNew = String(moment(appTime).add(gapTime, 'seconds').format('HH:mm'));
      time = getTransferTime(moment(result(config, 'cutOffTimeSkn'), 'HH:mm'),
        moment(result(config, 'cutOffTimeRtgs'), 'HH:mm'),
        moment(serverTimeNew, 'HH:mm'), // TODO get currentTime from server
        moment(result(config, 'coreBusinessDate')),
        moment('00:00', 'HH:mm'),
        transferType);
      if (time === 'nextWorking') {
        showTime = sendDate;
      }
    }
    const targetAccount = result(resData, 'transferTransaction.targetAccountObject', {});
    const isSimas = result(targetAccount, 'detailNetworkCode', '') === '153';
    const isUnknownAccount = result(targetAccount, 'accountType', '') === 'UnknownAccount' || isEmpty(result(targetAccount, 'accountType', ''));
    const targetAccountType = isSimas ?
      isUnknownAccount ? result(targetAccount, 'bankName', 'NA') : result(targetAccount, 'accountType', 'NA') :
      result(targetAccount, 'bankName', 'NA');
    const storeState = getState();
    const {amount} = transferFormData;
    const easyPin = result(storeState, 'form.AuthenticateForm.values.easypin', '');
    const smsOtp = result(storeState, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(storeState, 'form.AuthenticateForm.values.simasToken', '');
    const transferReferenceNumber = storeState.transRefNum;
    const accountNumber = result(payeeAccount, 'accountNumber', '');
    const phoneNumber = type === 'cardlessWithdrawal' ? accountNumber.substring(2, accountNumber.length) : accountNumber;
    const subheadingShow = type === 'cardlessWithdrawal' ? null : targetAccountType;
    const detailsShow = type === 'cardlessWithdrawal' ? phoneNumber : result(payeeAccount, 'accNo', '') || accountNumber;
    const tenor = silFlagInfo === 'new business' ? result(state, 'form.SilIustrasiForm2.values.income.label', '') : result(state, 'form.investasiLinkTopUp.values.income.label', '');
    const currencyTopUp = result(payeeAccount, 'currency', '');
    const isMultiSil = 'yes';

    let modalOptions = {
      heading: `${sourceAccount.name}`,
      subheading: subheadingShow,
      details: detailsShow,
      amount: isSilIdrUsd !== '' ? `${isSilIdrUsd} ${currencyFormatter(amount)}` : `${currencyTopUp} ${formatForexAmountPaymentStatus(amount, currencyTopUp)}`,
      transactionId: transferReferenceNumber,
      accountFrom: sourceAccount,
      inputPolis: inputPolisIndividu,
      isSilIdrUsd: isSilIdrUsd,
      isMultiSil,
      infoPolis: silFlagInfo
    };

    let trxType;
    const dayRecurr = getDayName(moment(transferFormData.transferTime));
    const daySkn = getDayName(showTime);
    const initiatedTime = transferTime === '' ? daySkn + ', ' + moment(showTime).format('DD MMM YYYY') : dayRecurr + ', ' + moment(transferFormData.transferTime).format('DD MMM YYYY');
    const dataDetail = middlewareUtils.prepareDataDetailTransferCC(transferFormData, payeeAccount, type, resData, initiatedTime, isSilIdrUsd, silFlagInfo);
    dispatch(actionCreators.showPaymentModal({
      ...modalOptions,
      transactionType: trxType,
      type: 'LOADING'
    }));
    const isFavorite = result(storeState, 'billerDescFav.isFavorite', '');
    const flagMgm = result(storeState, 'config.hideNotifMGM', '');
    const flagMgmOn = lowerCase(flagMgm) === 'yes';
    const transferPayload = middlewareUtils.prepareTransferPayloadSIL(data,
      {...payeeAccount},
      transferReferenceNumber,
      easyPin, smsOtp, simasToken, type, isFavorite, silFlagInfo, isSilIdrUsd, resData);
    return api.transfer({...transferPayload, tenor}, dispatch).
      then((id) => {
        trxType = silFlagInfo === 'new business' ? 'New Business' : 'Top Up';
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.showPaymentModal({
          ...modalOptions,
          transactionType: trxType,
          type: 'SUCCESS',
          dataDetail
        }));
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Landing'}),
          ]
        }));
        dispatch(NavigationActions.navigate({routeName: 'PaymentStatusRevampOnboarding'}));
        if (!flagMgmOn) {
          dispatch(popUpRewardMgm());
        }
        dispatch(actionCreators.clearTransRefNum());
        dispatch(refreshStorageNew());
        dispatch(deleteSelectedPayeeSilAUTO(payeeAccount));
        dispatch(destroy('fundTransfer'));
        dispatch(destroy('fundTransferSchedule'));
        dispatch(destroy('fundTransferMethod'));
        dispatch(destroy('addPayee'));
        dispatch(destroy('CardLessWithdrawalConfirmation'));
        dispatch(destroy('CardLessWithdrawalPayment'));
        dispatch(destroy('CardLessWithdrawalAccount'));
        dispatch(destroySILForm());
        dispatch(actionCreators.clearBillerDescFav());
        dispatch(actionCreators.updateLastTransactions(middlewareUtils.getFundTransferHistory(id, payeeAccount)));
      }).
      catch((err) => {
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
        dispatch(deleteSelectedPayeeSilAUTO(payeeAccount));
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
          trxType = silFlagInfo === 'new business' ? 'New Business' : 'Top Up';
          dispatch(actionCreators.hideSpinner());
          dispatch(NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'Landing'}),
            ]
          }));
          dispatch(NavigationActions.navigate({routeName: 'PaymentStatusRevampOnboarding'}));
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          const resultDisplay = result(err, 'data.result.displayList', []);

          const errorText = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_TRANSFER);
          if (err.AddPayeeFailed) {
            modalOptions = {...modalOptions,
              transactionType: silFlagInfo === 'new business' ? 'New Business' : 'Top Up'
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
              transactionType: silFlagInfo === 'new business' ? 'New Business' : 'Top Up'
            };
            dispatch(destroy('fundTransfer'));
            dispatch(destroy('addPayee'));
            dispatch(destroy('CardLessWithdrawalConfirmation'));
            dispatch(destroy('CardLessWithdrawalPayment'));
            dispatch(destroy('CardLessWithdrawalAccount'));
            dispatch(destroySILForm());
          }
          dispatch(errorResponseResult(err, modalOptions, resultDisplay, errorText, result(transferFormData, 'myAccount', {})));
          dispatch(refreshStorageNew());
          dispatch(actionCreators.clearBillerDescFav());
          dispatch(actionCreators.clearTransRefNum());
        }
      });
  };
}

export function deleteSelectedPayeeSilAUTO (payee) {
  return (dispatch, getState) => {
    const state = getState();
    const targetAccontNumber = result(payee, 'accountNumber', '');
    const cifCode = String(result(state, 'user.profile.customer.cifCode', ''));
    const loginName = String(result(state, 'user.profile.loginName', ''));
    const targetType = 'inbanktransfer';
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

export function saveCarouselIndex (carouselIndex) {
  return (dispatch) => {
    dispatch(actionCreators.saveIndex(carouselIndex));
  };
}
export function goToTopupPageSIL (summaryDetail, infoPolis) {
  return (dispatch) => {
    dispatch(destroy('investasiLinkTopUp'));
    dispatch(destroy('silTopUpAccount'));
    dispatch(NavigationActions.navigate({routeName: 'InquirySilTopUpScreen', params: {summaryDetail, infoPolis}}));
  };
}

export function informationPopup () {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };

    const sinarmasModalOptions = {
      heading1: language.QR__CPM_INFORMATION_1,
      text: language.QR__CPM_INFORMATION_2,
      text1: language.QR__CPM_INFORMATION_4,
      text2: language.QR__CPM_INFORMATION_6,
      text3: language.QR__CPM_INFORMATION_5,
      isInstructions: true,
      button1: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}
export function activateCCFailed (selectedAccount, err) {
  return (dispatch) => {
    const isPin = result(err, 'data.responseCode', '');
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.DASHBOARD__CREDIT_ACTIVATE_FAILED,
      text: isPin === '17' ? language.DASHBOARD__EASYPIN_FAILED : language.DASHBOARD__CREDIT_ACTIVATE_FAILED_TEXT,
      button1: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
      closeOnTouchOutside: false,
      image: noBanner,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}


export function checkActiveCard () {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToNext = () => {
      dispatch(goToActivatePage());
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToActivatePage = () => {
      const status = 'Inactive';
      const payload = {status};
      dispatch(actionCreators.showSpinner());
      return api.getInquiryCardInfo(payload, dispatch).then((res) => {
        const data = result(res, 'data.card', []);
        dispatch(actionCreators.saveInquiryCardInfo(res.data.card));
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate({routeName: 'ActiveList', params: {data}}));
      }).catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
      });
    };
    const sinarmasModalOptions = {
      heading1: language.POPUP_ARE_YOU_SURE_HEADING,
      text: language.POPUP__OPEN_MENU_ACTIVATE_ATM_CARD,
      button1: language.GENERIC__NO,
      button2: language.GENERIC__YES,
      onButton1Press: hideAlert,
      onButton2Press: goToNext,
      onClose: hideAlert
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'OpenMenuActivateAtmCard'}));
  };
}

export function investmentDataViewSmartSIL (data) {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'InquiryBuyPolis', params: {data}}));
    dispatch(destroy('InquiryBuyPolis'));
  };
}

export function getInfoProduct () {
  return (dispatch, getState) => {
    const state = getState();
    const lang = result(state, 'currentLanguage.id', 'id');
    dispatch(actionCreators.showSpinner());
    return api.getProductList(lang, dispatch).
      then((res) => {
        dispatch(actionCreators.saveProductList(res.data));
        const infoProduct = result(res, 'data', []);
        const isSilIdrUsd = result(state, 'silIdrUsd', '');
        if (isSilIdrUsd === 'IDR') {
          dispatch(NavigationActions.navigate({routeName: 'SmartInvestaLinkBuyPolis',  params: {infoProduct}}));
        } else {
          dispatch(NavigationActions.navigate({routeName: 'SmartInvestaLinkBuyPolis', params: {infoProduct}}));
        }
        dispatch(actionCreators.hideSpinner());
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT), Toast.LONG);
      });
  };
}


export function getMoneyInsuredSil () {
  return (dispatch, getState) => {
    const state = getState();
    const isIdrUsd = result(state, 'silIdrUsd', '');
    if (isIdrUsd === 'IDR') {
      const listCodeProduct = result(state, 'getProductListSil.listProduct', {});
      const productCodeList = map(listCodeProduct, 'productId');
      const productCode = result(productCodeList, '0', '');
      const totalPremi = result(state, 'form.SilIustrasiForm2.values.amount', '');
      const payload = {productCode, totalPremi};
      dispatch(actionCreators.showSpinner());
      return api.getMoneyInsuredSil(payload, dispatch).then((res) => {
        dispatch(actionCreators.saveMoneyInsuredSil(res.data));
        dispatch(actionCreators.hideSpinner());
      }).catch((err) => {
        dispatch(actionCreators.saveMoneyInsuredSil(err.data));
        dispatch(actionCreators.hideSpinner());
      });

    } else {
      const listCodeProduct = result(state, 'getProductListSil.listProduct', {});
      const productCodeList = map(listCodeProduct, 'productId');
      const productCode = result(productCodeList, '1', '');
      const totalPremi = result(state, 'form.SilIustrasiForm2.values.amount', '');
      const payload = {productCode, totalPremi};
      dispatch(actionCreators.showSpinner());
      return api.getMoneyInsuredSil(payload, dispatch).then((res) => {
        dispatch(actionCreators.saveMoneyInsuredSil(res.data));
        dispatch(actionCreators.hideSpinner());
      }).catch((err) => {
        dispatch(actionCreators.saveMoneyInsuredSil(err.data));
        dispatch(actionCreators.hideSpinner());
      });
    }
  };
}


export function getUserDetailForNBPolis () {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const lang = result(state, 'currentLanguage.id', 'id');
    const payload = '';
    return api.getDropList(lang, dispatch).
      then((res) => {
        dispatch(actionCreators.saveDropList(res.data));
        dispatch(actionCreators.hideSpinner());
      }).
      then(() => api.getUserDetailForNB(payload, dispatch).then((res) => {
        dispatch(actionCreators.saveInquiryPolis(res.data));
        const dataDetailNB = result(res, 'data', '');
        const isSilIdrUsd = result(state, 'silIdrUsd', '');
        if (isSilIdrUsd === 'IDR') {
          dispatch(NavigationActions.navigate({routeName: 'SmartInvestaLinkIDR', params: {dataDetailNB}}));
        } else {
          dispatch(NavigationActions.navigate({routeName: 'SmartInvestaLinkUSD', params: {dataDetailNB}}));
        }
        dispatch(actionCreators.hideSpinner());
      }).
        catch((err) => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT), Toast.LONG);
        })).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        const responseCode = result(err, 'data.responseCode', '');
        if (responseCode === '99') {
          const opTimeFOREX = result(state, 'config.opTimeFOREX', '');
          const startTimeForex  = opTimeFOREX.substring(0, opTimeFOREX.indexOf('||'));
          const cutOffTimeForex = opTimeFOREX.substring(opTimeFOREX.length - 5, opTimeFOREX.length);
          dispatch(NavigationActions.navigate({routeName: 'SilForexHours', params: {startTimeForex, cutOffTimeForex}}));
        }
      });
  };
}

export function getProfileQuestion () {
  return (dispatch, getState) => {
    const payload = '';
    const state = getState();
    dispatch(actionCreators.showSpinner());
    return api.getProfileQuestion(payload, dispatch).then((res) => {
      dispatch(actionCreators.saveRiskQuestionSil(res.data));
      const questionRisk = result(res, 'data', '');
      const isSilIdrUsd = result(state, 'silIdrUsd', '');
      if (isSilIdrUsd === 'IDR') {
        dispatch(NavigationActions.navigate({routeName: 'SmartInvestaLinkRiskQuestionIdr', params: {questionRisk}}));
      } else {
        dispatch(NavigationActions.navigate({routeName: 'SmartInvestaLinkRiskQuestionUsd', params: {questionRisk}}));
      }
      dispatch(actionCreators.hideSpinner());
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT));
    });
  };
}

export function getHealthQuestionFunc () {
  return (dispatch, getState) => {
    const payload = '';
    const state = getState();
    dispatch(actionCreators.showSpinner());
    return api.getHealthQuestion(payload, dispatch).then((res) => {
      dispatch(actionCreators.saveHealhQuestion(res.data.healthQuestion));
      const isSilIdrUsd = result(state, 'silIdrUsd', '');
      if (isSilIdrUsd === 'IDR') {
        dispatch(NavigationActions.navigate({routeName: 'SmartInvestaLinkHealthIdr'}));
      } else {
        dispatch(NavigationActions.navigate({routeName: 'SmartInvestaLinkHealthUsd'}));
      }
      dispatch(actionCreators.hideSpinner());
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT));
    });
  };
}

export function getCityListSil () {
  return (dispatch, getState) => {
    const state = getState();
    const payload = '';
    dispatch(actionCreators.showSpinner());
    return api.getCityListSil(payload, dispatch).then((res) => {
      const cityList = sortBy(result(res, 'data.cityList', []), 'cityName');
      dispatch(actionCreators.saveCityListSil(cityList));
      const isSilIdrUsd = result(state, 'silIdrUsd', '');
      if (isSilIdrUsd === 'IDR') {
        dispatch(NavigationActions.navigate({routeName: 'SmartInvestaLinkPolisForm2IDR'}));
      } else {
        dispatch(NavigationActions.navigate({routeName: 'SmartInvestaLinkPolisForm2USD'}));
      }
      dispatch(actionCreators.hideSpinner());
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT));
    });
  };
}

export function saveSILDATA (itemtoBeSaved) {
  return (dispatch, getState) => {
    const state = getState();
    const silStorage = result(state, 'silStorage', []);
    const formName = result(itemtoBeSaved, 'formName', '');
    const findingOldItem = findIndex(silStorage, (item) => item.formName === formName);
    if (findingOldItem === -1) {
      const newData = [...silStorage, itemtoBeSaved];
      dispatch(actionCreators.saveSilStorage(newData));
    } else {
      silStorage[findingOldItem] = itemtoBeSaved;
      dispatch(actionCreators.saveSilStorage(silStorage));
    }
  };
}

export function getinputPolisIndividu () {
  return (dispatch, getState) => {
    const state = getState();
    const isSilIdrUsd = result(state, 'silIdrUsd', '');
    const silIlustrasiForm1 = result(state, 'silStorage[0].dataBody', {});
    const silIlustrasiForm2 = result(state, 'silStorage[1].dataBody', {});
    const sileSPAJForm1 = result(state, 'silStorage[2].dataBody', {});
    const sileSPAJForm2 = result(state, 'silStorage[3].dataBody', {});
    const sileSPAJForm3 = result(state, 'silStorage[4].dataBody', {});
    const sileSPAJForm4 = result(state, 'silStorage[5].dataBody', {});
    const sileSPAJform5 = result(state, 'silStorage[6].dataBody', {});
    const sileSPAJform6 = result(state, 'silStorage[7].dataBody', {});
    const cif = result(state, 'user.profile.customer.cifCode', '');

    const pemegangPolis = {
      'cif': cif,
      'address': result(sileSPAJForm2, 'streetAddress', ''),
      'bankRekening': result(sileSPAJForm3, 'sourceOfFund.accountNumber', ''),
      'city': parseInt(result(sileSPAJForm2, 'cityObject.cityId', 0)),
      'country': result(sileSPAJForm1, 'warganegara.id', ''),
      'email': result(silIlustrasiForm1, 'email'),
      'fullName': result(state, 'smartInvestasiLinkPolis.namaLengkap', ''),
      'graduated': result(sileSPAJForm1, 'pendidikan.value', ''),
      'graduatedOther': result(sileSPAJForm1, 'pendidikan.label', ''),
      'handphone': result(sileSPAJForm2, 'mobileNumber', ''),
      'handphoneWA': result(state, 'smartInvestasiLinkPolis.noHp', ''),
      'identity': result(state, 'smartInvestasiLinkPolis.nik', ''),
      'motherName': result(state, 'smartInvestasiLinkPolis.motherMaidenName', ''),
      'namaRekening': result(sileSPAJForm3, 'sourceOfFund.name', ''),
      'branchId': result(sileSPAJForm3, 'sourceOfFund.bankBranch.code', ''),
      'penghasilan': result(sileSPAJForm3, 'penghasilanKantor.value', ''),
      'placeBirth': result(state, 'smartInvestasiLinkPolis.tempatLahir', ''),
      'postalCode': result(sileSPAJForm2, 'postalCode', ''),
      'relation': '1',
      'religion': result(sileSPAJForm1, 'agama.value', ''),
      'religionOther': result(sileSPAJForm1, 'agama.label', ''),
      'birthDate': moment(result(state, 'smartInvestasiLinkPolis.tanggalLahir', '')).format('DD/MM/YYYY'),
      'statsMarital': result(sileSPAJForm1, 'maritalStatus.value', ''),
      'buktiIdentity': 1,
      'bankId': '156',
    };

    const productInsured = {
      'mti': parseInt(result(silIlustrasiForm2, 'income.label', 0)),
      'premi': parseInt(result(silIlustrasiForm2, 'amount', 0)),
      'productId': isSilIdrUsd === 'IDR' ? parseInt(result(state, 'getProductListSil.listProduct[0].productId', 0)) : parseInt(result(state, 'getProductListSil.listProduct[1].productId', 0)),
      'subProductId': isSilIdrUsd === 'IDR' ? parseInt(result(state, 'getProductListSil.listProduct[0].listProdDetail[0].subproductId', 0)) : parseInt(result(state, 'getProductListSil.listProduct[1].listProdDetail[0].subproductId', 0)),
      'namaProduk': isSilIdrUsd === 'IDR' ? result(state, 'getProductListSil.listProduct[0].productName', '') : result(state, 'getProductListSil.listProduct[1].productName', ''),
      'tanggalAwalMTI': moment(new Date()).format('DD/MM/YYYY'),
      'caraBayar': parseInt(result(state, 'getProductListSil.listProduct[0].listProdDetail[0].listPayMode[0].payModeId', 0)),
      'rollOver': parseInt(result(silIlustrasiForm2, 'investa.value', 0)),
      'premiTopUpSingle': 0,
      'premiTopUpBerkala': 0,
      'flagBulanan': result(state, 'getProductListSil.listProduct[0].listProdDetail[0].listMtiPayMethod[0].id', ''),
      'listRider': []
    };
    const beneficieryList = [{
      'sex': parseInt(result(sileSPAJForm4, 'gender.value', 0)),
      'fullName': result(sileSPAJForm4, 'fullName', ''),
      'manfaat': 100,
      'relation': parseInt(result(sileSPAJForm4, 'polisRelation.value', 0)),
      'birthDate': result(sileSPAJForm4, 'birthdate', '')
    }];
    const gender = lowerCase(result(state, 'smartInvestasiLinkPolis.jenisKelamin', ''));
    const chooseGender = getDataForSIlPolis(result(state, 'getDropList.dropDownList.jenisKelamin', {}));
    if (gender === 'woman' || gender === 'wanita') {
      const jenisKelamin = parseInt(result(chooseGender, '[0].value', ''));
      pemegangPolis['sex'] = jenisKelamin;
    } else if (gender === 'man' || gender === 'pria') {
      const jenisKelamin = parseInt(result(chooseGender, '[1].value', ''));
      pemegangPolis['sex'] = jenisKelamin;
    }

    const noTelp = result(sileSPAJForm2, 'phoneNumber', '');
    const sizeTelp = size(noTelp);
    const noTeleponRumahku = noTelp.substring(0, 2) === '62';
    if (noTeleponRumahku === true) {
      const noTelpRumah = noTelp.substring(noTelp.length - 7, noTelp.length);
      pemegangPolis['phoneHome'] = noTelpRumah;
      const kdPhoneHome = noTelp.substring(0, 4);
      pemegangPolis['kdPhoneHome'] = kdPhoneHome;
    } else if (noTeleponRumahku === false && sizeTelp === 10) {
      const noTelpRumah = noTelp.substring(noTelp.length - 7, noTelp.length);
      pemegangPolis['phoneHome'] = noTelpRumah;
      const kdPhoneHome = noTelp.substring(0, 3);
      pemegangPolis['kdPhoneHome'] = kdPhoneHome;
    } else if (noTeleponRumahku === false && sizeTelp === 11) {
      const noTelpRumah = noTelp.substring(noTelp.length - 8, noTelp.length);
      pemegangPolis['phoneHome'] = noTelpRumah;
      const kdPhoneHome = noTelp.substring(0, 3);
      pemegangPolis['kdPhoneHome'] = kdPhoneHome;
    }

    const pekerjaan = result(sileSPAJForm3, 'pekerjaan.label', '');
    if (pekerjaan === 'Lainnya') {
      const pekerjaanLainnya = result(sileSPAJForm3, 'pekerjaanLainnya', '');
      pemegangPolis['jobDesc'] = pekerjaanLainnya;
    } else {
      pemegangPolis['jobDesc'] = pekerjaan;
    }

    const investId = isSilIdrUsd === 'IDR' ? result(state, 'getProductListSil.listProduct[0].listProdDetail[0].listFund[0].fundId', '') : result(state, 'getProductListSil.listProduct[1].listProdDetail[0].listFund[0].fundId', '');
    const percent = 100;
    const fundInvest = [{
      investId,
      percent
    }];

    const checkboxArray = result(sileSPAJform5, 'checkboxArray.checkboxArray', []);

    const label = map(checkboxArray, (item) => item.label);
    const questionareTtg = map(checkboxArray, (item) => item.questionareTtg);
    const explain0 = {
      'questionareId': parseInt(result(sileSPAJform5, 'answers0.questionareId', 0)),
      'questionarePpFlag': parseInt(result(sileSPAJform5, 'answers0.questionarePpFlag', 0)),
      'questionareTtgFlag': parseInt(result(sileSPAJform5, 'answers0.questionareTtgFlag', 0)),
      'questionarePp': result(sileSPAJform5, 'explain0', ''),
      'questionareTtg': result(sileSPAJform5, 'explain0', '')
    };

    const checkboxArrayList = {
      'questionareId': parseInt(result(sileSPAJform5, 'answers1.questionareId', 0)),
      'questionarePpFlag': parseInt(result(sileSPAJform5, 'answers1.questionarePpFlag', 0)),
      'questionareTtgFlag': parseInt(result(sileSPAJform5, 'answers1.questionareTtgFlag', 0)),
      'label': label.toString(),
      'questionareTtg': questionareTtg.toString(),
      'questionarePp': questionareTtg.toString()
    };

    const explain2 = {
      'questionareId': parseInt(result(sileSPAJform5, 'answers2.questionareId', 0)),
      'questionarePpFlag': parseInt(result(sileSPAJform5, 'answers2.questionarePpFlag', 0)),
      'questionareTtgFlag': parseInt(result(sileSPAJform5, 'answers2.questionareTtgFlag', 0)),
      'questionarePp': result(sileSPAJform5, 'explain2', ''),
      'questionareTtg': result(sileSPAJform5, 'explain2', '')
    };
    const answer0_form6 = result(sileSPAJform6, 'answer0', {});
    const answer1_form6 = result(sileSPAJform6, 'answer1', {});
    const answer2_form6 = result(sileSPAJform6, 'answer2', {});
    const answer3_form6 = result(sileSPAJform6, 'answer3', {});
    const answer4_form6 = result(sileSPAJform6, 'answer4', {});
    const questionareAnswerList = [explain0, checkboxArrayList, explain2, answer0_form6, answer1_form6,
      answer2_form6, answer3_form6, answer4_form6,
    ];
    forEach(questionareAnswerList, (item) => {
      if (item.questionarePp === '' || item.questionarePpFlag === 0) {
        delete item.questionarePp;
      }
      if (item.questionareTtg === '' || item.questionarePpFlag === 0) {
        delete item.questionareTtg;
      }
      delete item.value;
      delete item.label;
    });
    const requestSil = {
      pemegangPolis,
      'tertanggung': pemegangPolis,
      beneficieryList,
      productInsured,
      fundInvest,
      questionareAnswerList,
    };
    const payload = {
      requestSil
    };
    dispatch(actionCreators.showSpinner());
    return api.inputPolisIndividu(payload, dispatch).then((res) => {
      dispatch(actionCreators.saveInputIndividu(res.data));
      dispatch(goDigitalSigning());
      dispatch(actionCreators.hideSpinner());
    }).catch((err) => {
      dispatch(actionCreators.saveInputIndividu(err.data));
      Toast.show(result(err, 'data.responseMessage', ''));
      dispatch(actionCreators.hideSpinner());
    });
  };
}


export function checkBlockCard () {
  return (dispatch) => {
    const status = 'Active';
    const payload = {status};
    dispatch(actionCreators.showSpinner());
    return api.getInquiryCardInfo(payload, dispatch).then((res) => {
      const data = result(res, 'data.card', []);
      dispatch(actionCreators.saveInquiryCardInfo(res.data.card));
      dispatch(actionCreators.hideSpinner());
      dispatch(NavigationActions.navigate({routeName: 'BlockList', params: {data}}));
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function saveAccountCustomer (value) {
  return () => {
    const accReadyforStore = middlewareUtils.getDataAccountLS(value);
    set(storageKeys['CUSTOMER_ACC_ALL'], accReadyforStore);
  };
}

export function addNewAtmCard () {
  return (dispatch) => {
    const payload = '';
    dispatch(actionCreators.showSpinner());
    return api.getInquiryCardInfo(payload, dispatch).then((res) => {
      const data = result(res, 'data.card', []);
      const embossedName = result(res, 'data.embossedName', '');
      dispatch(change('AddNewAtmCardConfirmation', 'embossedName', embossedName));
      dispatch(actionCreators.saveInquiryCardInfo(res.data.card));
      dispatch(actionCreators.hideSpinner());
      dispatch(NavigationActions.navigate({routeName: 'AddNewAtmChooseSavings', params: {data}}));
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function getSimasTaraDetail (accountInfo) {
  return (dispatch) => {
    const accountFrom = result(accountInfo, 'id', '').toString();
    const payload = {accountFrom};
    dispatch(actionCreators.showSpinner());
    return api.getSimasTaraDetail(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      dispatch(actionCreators.saveSimasTaraDetail(res.data));
      return res.data;
    }).catch((error) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function confirmTransferSilNB (formValues, payee, transType, isSilIdrUsd, silFlag) {
  return (dispatch) => {
    const transferTime = result(formValues, 'transferTime', '') === '' ? '' : moment(formValues.transferTime).format('DD MMM YYYY');
    const recurring = result(formValues, 'schedule', '') === '4' ? moment(formValues.transferTime).format('DD') : '';
    const time = {transferTime, recurring};
    const confirmTransferPayload = middlewareUtils.prepareConfirmTransferPayloadSIL({...formValues, transferMode: 'inbank'}, payee, transType, time, silFlag);
    dispatch(actionCreators.clearBillerDescFav());
    dispatch(actionCreators.showSpinner());
    const additional = ['ipassport', 'TXID', 'lang'];
    return api.confirmTransfer(confirmTransferPayload, additional, dispatch).
      then((res) => {
        const resData = result(res, 'data', {});
        if (isSilIdrUsd === 'IDR') {
          dispatch(NavigationActions.navigate({routeName: 'ConfirmationPaymentBuyPolisSILIDR', params: {resData, formValues, payee}}));
        } else {
          dispatch(NavigationActions.navigate({routeName: 'ConfirmationPaymentBuyPolisSILUSD', params: {resData, formValues, payee}}));
        }
        dispatch(actionCreators.hideSpinner());
      }).catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL), Toast.LONG);
      });
  };
}

export function destroySILForm () {
  return (dispatch) => {
    const formNames =
      ['confirmationBuyPolis',
        'SileSPAJForm1',
        'SileSPAJForm2',
        'SileSPAJForm3',
        'SileSPAJForm4',
        'SileSPAJForm5',
        'SileSPAJForm6',
        'SilIustrasiForm1',
        'SilIustrasiForm2',
        'buyPaymentSIL',
        'buySilTransfer',
        'silTransfer'
      ];
    map(formNames, (item) => {
      dispatch(destroy(item));
    });
    dispatch(actionCreators.clearSilStorage());
  };
}

export function getPayeeNameSILNB (infoPolis, formValues, isSilIdrUsd) {
  return (dispatch, getState) => {
    const state = getState();
    const accNo = result(infoPolis, 'noVa', '');
    const bankList = result(state, 'valueBankList.bankList', []);
    const bankIdRaw = find(bankList,  {'bankCode': '153'});
    const listPayees = result(state, 'payees', []);
    const isTargetAccountExist = find(listPayees,  {'accountNumber': accNo});
    const bankId = result(bankIdRaw, 'id', '');
    const additional = ['ipassport', 'TXID', 'lang'];
    const payload = middlewareUtils.prepareGetPayeeName({
      bankId,
      accountNumber: accNo
    });
    const silFlag = 'new business';
    dispatch(actionCreators.showSpinner());
    return api.getPayeeName(payload, additional, dispatch).then((payeeDetails) => {
      const accountName = result(payeeDetails, 'data.targetName');
      const payee = {
        id: result(isTargetAccountExist, 'id', '') !== '' ? result(isTargetAccountExist, 'id', '') : null,
        accountNumber: accNo,
        name: accountName,
        bank: bankIdRaw,
        transferType: 'inbank',
        currency: isSilIdrUsd,
        modeFlag: 'null',
        isNewPayee: true,
      };
      dispatch(confirmTransferSilNB(formValues, payee, 'fundTransfer', isSilIdrUsd, silFlag));
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__ERROR_GETTING_PAYEE_NAME), Toast.LONG);
    });
  };
}

export function goToSILForm2 () {
  return (dispatch, getState) => {
    const state = getState();
    const isSilIdrUsd = result(state, 'silIdrUsd', '');
    if (isSilIdrUsd === 'IDR') {
      dispatch(NavigationActions.navigate({routeName: 'SmartInvestaLinkIDRProduct'}));
    } else {
      dispatch(NavigationActions.navigate({routeName: 'SmartInvestaLinkUSDProduct'}));
    }
  };
}

export function investmentDataViewStarInvestama (item) {
  return (dispatch, getState) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const investmentDataViewStar = () => {
      const state = getState();
      const lang = upperCase(result(state, 'currentLanguage.id', 'id'));
      dispatch(actionCreators.showSpinner());
      dispatch(actionCreators.hideSinarmasAlert());
      return api.getInquiryStarInvestama({...item, lang}, dispatch).then((res) => {
        dispatch(actionCreators.hideSinarmasAlert());
        const inquiryStarData = result(res, 'data', {});
        const checkingUser = result(inquiryStarData, 'responseMessage', '');
        if (checkingUser === 'DATA_NOT_FOUND') {
          dispatch(actionCreators.hideSpinner());
          const typeErrorDetail = language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT2 + listLang(result(item, 'code', ''));
          const typeError = language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT;
          const modalOption = {heading: typeErrorDetail, subheading: language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT_PRODUCT, transactionType: typeError};
          dispatch(actionCreators.showPaymentModal({...modalOption, type: 'FAILED'}));
          dispatch(NavigationActions.navigate({routeName: 'PaymentStatus'}));
        } else {
          dispatch(actionCreators.saveInquiryStarInvestama(inquiryStarData));
          dispatch(NavigationActions.navigate({routeName: 'InquiryStarInvestamaScreen'}));
          dispatch(actionCreators.hideSpinner());
        }
      }).catch(() => {
        dispatch(actionCreators.hideSpinner());
        const typeErrorDetail = language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT2 + listLang(result(item, 'code', ''));
        const typeError = language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT;
        const modalOption = {heading: typeErrorDetail, subheading: language.ERROR_MESSAGE__COULD_NOT_LOAD_INVESTMENT_PRODUCT, transactionType: typeError};
        dispatch(actionCreators.showPaymentModal({...modalOption, type: 'FAILED'}));
        dispatch(NavigationActions.navigate({routeName: 'PaymentStatus'}));
      });
    };
    const modalOptions = {
      heading1: language.INQUIRY__SIL_MODAL_TITLE,
      text: language.INQUIRY__SIL_MODAL_SUBTITLE,
      button1: language.INQUIRY__SIL_MODAL_BUTTON_CANCEL,
      onButton1Press: hideAlert,
      button2: language.INQUIRY__SIL_MODAL_BUTTON_OK,
      onButton2Press: investmentDataViewStar,
      onClose: hideAlert,
      disabled: true};
    dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
  };
}

export function goToTopupPageStarInvestama (summaryDetail, infoPolis) {
  return (dispatch) => {
    dispatch(destroy('investasiStarLinkTopUp'));
    dispatch(destroy('starInvestamaTopUpAccount'));
    dispatch(NavigationActions.navigate({routeName: 'InquiryStarInvestamaTopUpScreen', params: {summaryDetail, infoPolis}}));
  };
}

export function getCurrencyMultiSil () {
  return (dispatch) => {
    const payload = '';
    dispatch(actionCreators.showSpinner());
    return api.getCurrencyMulti(payload, dispatch).then((res) => {
      dispatch(actionCreators.saveCurrencySil(res.data));
      dispatch(actionCreators.hideSpinner());
    }).catch((err) => {
      dispatch(actionCreators.saveCurrencySil(err.data));
      Toast.show(result(err, 'data.responseMessage', ''));
      dispatch(actionCreators.hideSpinner());
    });
  };
}

export function checkPrivateOffersType () {
  return (dispatch, getState) => {
    const state = getState();
    const privateOffers = result(state, 'promos.offers.0.PrivateOffers', []);
    const isTDCashBack = find(privateOffers, {offersTitle: 'TDCashBack'});
    const isLandingPage2 = find(privateOffers, {offersTitle: 'LandingPage2'});
    if (!isEmpty(isTDCashBack)) {
      dispatch(privateOffersTD(isTDCashBack));
    } else if (!isEmpty(isLandingPage2)) {
      dispatch(privateOffersLP2(isLandingPage2));
    } else {
      return Promise.resolve();
    }
  };
}


export function privateOffersTD (dataOffers) {
  return (dispatch) => {
    getPrivateOffersTD().then((res) => {
      res === null ? set(storageKeys['GET_PRIVATE_OFFERS_TD'], {dontShow: false}) : res;
    });
    dispatch(showPrivateOffersTD(dataOffers));
  };
}

export function showPrivateOffersTD (dataOffers) {
  return (dispatch) => {
    const uriImage = result(dataOffers, 'iconPath', '');
    let checked = false;
    const hideAlert = () => {
      set(storageKeys['GET_PRIVATE_OFFERS_TD'], {dontShow: checked});
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const checkboxChange = (res) => {
      checked = !res;
    };
    return getPrivateOffersTD().then((res) => {
      if ((!result(res, 'dontShow', false))) {
        const modalOptions = {
          button1: language.GENERIC__OK,
          onButton1Press: hideAlert,
          checkboxChange,
          onClose: hideAlert,
          checkboxLabel: language.LANDING__DONT_SHOW_AGAIN,
        };
        dispatch(actionCreators.showSinarmasAlert({...modalOptions, image: 'WARNING', uriImage}));
      }
    });
  };
}

export function privateOffersLP2 (dataOffers) {
  return (dispatch) => {
    getPrivateOffersLP2().then((res) => {
      res === null ? set(storageKeys['GET_PRIVATE_OFFERS_LP2'], {dontShow: false}) : res;
    });
    dispatch(showPrivateOffersLP2(dataOffers));
  };
}

export function showPrivateOffersLP2 (dataOffers) {
  return (dispatch) => {
    const uriImage = result(dataOffers, 'iconPath', '').toString();
    let checked = false;
    const hideAlert = () => {
      set(storageKeys['GET_PRIVATE_OFFERS_LP2'], {dontShow: checked});
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const checkboxChange = (res) => {
      checked = !res;
    };
    return getPrivateOffersLP2().then((res) => {
      if ((!result(res, 'dontShow', false))) {
        const modalOptions = {
          button1: language.GENERIC__OK,
          onButton1Press: hideAlert,
          checkboxChange,
          onClose: hideAlert,
          checkboxLabel: language.LANDING__DONT_SHOW_AGAIN,
        };
        dispatch(actionCreators.showSinarmasAlert({...modalOptions, image: 'WARNING', uriImage}));
      }
    });
  };
}

export function getPayeeNameStarInvestama (infoPolis, formValues, values) {
  return (dispatch, getState) => {
    const state = getState();
    const vanumM = String(result(values, 'income.value', ''));
    const vanumP = '0';
    const vanumJ = String(result(values, 'maturitytipe.value', ''));
    const vanumS = String(result(values, 'work.value', ''));
    const accNo = result(infoPolis, 'noVa', '') + vanumM + vanumP + vanumJ + vanumS;
    const bankList = result(state, 'valueBankList.bankList', []);
    const bankIdRaw = find(bankList,  {'bankCode': '153'});
    const listPayees = result(state, 'payees', []);
    const isTargetAccountExist = find(listPayees,  {'accountNumber': accNo});
    const bankId = result(bankIdRaw, 'id', '');
    const isLogin = !isEmpty(result(getState(), 'user', {}));
    const transferMethodType = isLogin ? '' : '1';
    const additional = ['ipassport', 'TXID', 'lang'];
    const payload = middlewareUtils.prepareGetPayeeName({
      bankId,
      accountNumber: accNo,
      transferMethodType
    });
    dispatch(actionCreators.showSpinner());
    api.getPayeeName(payload, additional, dispatch).then((payeeDetails) => {
      const accountName = result(payeeDetails, 'data.targetName');
      const payee = {
        id: result(isTargetAccountExist, 'id', '') !== '' ? result(isTargetAccountExist, 'id', '') : null,
        accountNumber: accNo,
        name: accountName,
        bank: bankIdRaw,
        transferType: 'inbank',
        currency: result(infoPolis, 'mataUang', ''),
        modeFlag: 'null',
        isNewPayee: true,
      };
      dispatch(confirmTransferStarInvestama(formValues, payee, 'fundTransfer', values, infoPolis));
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__ERROR_GETTING_PAYEE_NAME), Toast.LONG);
    });
  };
}

export function confirmTransferStarInvestama (formValues, payee, transType, values, infoPolis) {
  return (dispatch, getState) => {
    const transferTime = result(formValues, 'transferTime', '') === '' ? '' : moment(formValues.transferTime).format('DD MMM YYYY');
    const recurring = result(formValues, 'schedule', '') === '4' ? moment(formValues.transferTime).format('DD') : '';
    const time = {transferTime, recurring};
    const isLogin = !isEmpty(result(getState(), 'user', {}));
    const transferMethodType = isLogin ? '' : '1';
    const additional = ['ipassport', 'TXID', 'lang'];
    const confirmTransferPayload = middlewareUtils.prepareConfirmTransferPayload({...formValues, ...values, transferMode: 'inbank'}, payee, transType, time, transferMethodType);
    dispatch(actionCreators.clearBillerDescFav());
    return api.confirmTransfer(confirmTransferPayload, additional, dispatch).
      then((res) => {
        const resData = result(res, 'data', {});
        dispatch(NavigationActions.navigate({routeName: 'ConfirmationTransferStarInvestamaScreen', params: {formValues: {...formValues, ...values}, payee: {...payee}, resData, infoPolis}}));
        dispatch(destroy('CreditCardPayment'));
        dispatch(destroy('creditcard'));
        dispatch(actionCreators.hideSpinner());
      }).catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_PAY_BILL), Toast.LONG);
      });
  };
}

export function transferStarInvestama (transferFormData, payeeAccount, type, resData, infoPolis) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const transferTime = result(transferFormData, 'transferTime', '') === '' ? '' : moment(transferFormData.transferTime).format('DD MMM YYYY');
    const recurring = result(transferFormData, 'schedule', '') === '4' ? moment(transferFormData.transferTime).format('DD') : '';
    const data = {...transferFormData, transferTime, recurring};
    const sourceAccount = transferFormData.myAccount;
    const transferType = result(resData, 'transferTransaction.mode', '');
    let showTime = new Date();
    let time = '';
    const {config} = getState();
    const sendDate = moment(config.coreBusinessDateV3).isAfter(moment(config.serverTime), 'day') ? config.coreBusinessDateV3 : config.coreNextBusinessDateV3;
    if (transferType === 'skn' || transferType === 'rtgs') {
      const appTime = new Date();
      const gapTime = result(this, 'props.gapTimeServer', 0);
      const serverTimeNew = String(moment(appTime).add(gapTime, 'seconds').format('HH:mm'));
      time = getTransferTime(moment(result(config, 'cutOffTimeSkn'), 'HH:mm'),
        moment(result(config, 'cutOffTimeRtgs'), 'HH:mm'),
        moment(serverTimeNew, 'HH:mm'), // TODO get currentTime from server
        moment(result(config, 'coreBusinessDate')),
        moment('00:00', 'HH:mm'),
        transferType);
      if (time === 'nextWorking') {
        showTime = sendDate;
      }
    }
    const targetAccount = result(resData, 'transferTransaction.targetAccountObject', {});
    const isSimas = result(targetAccount, 'detailNetworkCode', '') === '153';
    const isUnknownAccount = result(targetAccount, 'accountType', '') === 'UnknownAccount' || isEmpty(result(targetAccount, 'accountType', ''));
    const targetAccountType = isSimas ?
      isUnknownAccount ? result(targetAccount, 'bankName', 'NA') : result(targetAccount, 'accountType', 'NA') :
      result(targetAccount, 'bankName', 'NA');
    const storeState = getState();
    const {amount} = transferFormData;
    const easyPin = result(storeState, 'form.AuthenticateForm.values.easypin', '');
    const smsOtp = result(storeState, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(storeState, 'form.AuthenticateForm.values.simasToken', '');
    const transferReferenceNumber = storeState.transRefNum;
    const accountNumber = result(payeeAccount, 'accountNumber', '');
    const phoneNumber = type === 'cardlessWithdrawal' ? accountNumber.substring(2, accountNumber.length) : accountNumber;
    const subheadingShow = type === 'cardlessWithdrawal' ? null : targetAccountType;
    const detailsShow = type === 'cardlessWithdrawal' ? phoneNumber : result(payeeAccount, 'accNo', '') || accountNumber;
    const currencyTopUp = result(payeeAccount, 'currency', '');
    const isStarInvestama = 'yes';
    let modalOptions = {
      heading: `${sourceAccount.name}`,
      subheading: subheadingShow,
      details: detailsShow,
      amount: `${currencyTopUp} ${formatForexAmount(amount, currencyTopUp)}`,
      transactionId: transferReferenceNumber,
      accountFrom: sourceAccount,
      infoPolisStarInvestama: infoPolis,
      isStarInvestama
    };

    let trxType;
    const dayRecurr = getDayName(moment(transferFormData.transferTime));
    const daySkn = getDayName(showTime);
    const initiatedTime = transferTime === '' ? daySkn + ', ' + moment(showTime).format('DD MMM YYYY') : dayRecurr + ', ' + moment(transferFormData.transferTime).format('DD MMM YYYY');
    const dataDetail = middlewareUtils.prepareDataDetailTransferCC(transferFormData, payeeAccount, type, resData, initiatedTime);
    dispatch(actionCreators.showPaymentModal({
      ...modalOptions,
      transactionType: trxType,
      type: 'LOADING'
    }));
    const isFavorite = result(storeState, 'billerDescFav.isFavorite', '');
    dispatch(addNewPayee(payeeAccount, easyPin, smsOtp, simasToken, transferReferenceNumber, resData, type)). // ad payee here
      then((newPayee) => {
        const transferPayload = middlewareUtils.prepareTransferPayloadStarInvestama(data,
          {...payeeAccount, ...newPayee},
          transferReferenceNumber,
          easyPin, smsOtp, simasToken, type, isFavorite, infoPolis);
        return api.transfer(transferPayload, dispatch).then(
          () => result(newPayee, 'id', ''));
      }).
      then((id) => {
        trxType = infoPolis === 'new business' ? 'New Business' : 'Top Up';
        dispatch(actionCreators.hideSpinner());
        dispatch(actionCreators.showPaymentModal({
          ...modalOptions,
          transactionType: trxType,
          type: 'SUCCESS',
          dataDetail
        }));

        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Landing'}),
          ]
        }));
        dispatch(NavigationActions.navigate({routeName: 'PaymentStatusRevampOnboarding'}));
        dispatch(actionCreators.clearTransRefNum());
        dispatch(refreshStorageNew());
        dispatch(deleteSelectedPayeeSilAUTO(payeeAccount));
        dispatch(destroy('fundTransfer'));
        dispatch(destroy('fundTransferSchedule'));
        dispatch(destroy('fundTransferMethod'));
        dispatch(destroy('addPayee'));
        dispatch(destroy('CardLessWithdrawalConfirmation'));
        dispatch(destroy('CardLessWithdrawalPayment'));
        dispatch(destroy('CardLessWithdrawalAccount'));
        dispatch(destroySILForm());
        dispatch(actionCreators.clearBillerDescFav());
        dispatch(actionCreators.updateLastTransactions(middlewareUtils.getFundTransferHistory(id, payeeAccount)));
      }).
      catch((err) => {
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
        dispatch(deleteSelectedPayeeSilAUTO(payeeAccount));
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
          trxType = infoPolis === 'new business' ? 'New Business' : 'Top Up';

          dispatch(actionCreators.hideSpinner());
          dispatch(NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'Landing'}),
            ]
          }));
          dispatch(NavigationActions.navigate({routeName: 'PaymentStatusRevampOnboarding'}));
          const resultDisplay = result(err, 'data.result.displayList', []);

          const errorText = getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_TRANSFER);
          if (err.AddPayeeFailed) {
            modalOptions = {...modalOptions,
              transactionType: infoPolis === 'new business' ? 'New Business' : 'Top Up'

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
              transactionType: infoPolis === 'new business' ? 'New Business' : 'Top Up'
            };
            dispatch(destroy('fundTransfer'));
            dispatch(destroy('addPayee'));
            dispatch(destroy('CardLessWithdrawalConfirmation'));
            dispatch(destroy('CardLessWithdrawalPayment'));
            dispatch(destroy('CardLessWithdrawalAccount'));
            dispatch(destroySILForm());
          }
          dispatch(errorResponseResult(err, modalOptions, resultDisplay, errorText, result(transferFormData, 'myAccount', {})));
          dispatch(refreshStorageNew());
          dispatch(actionCreators.clearBillerDescFav());
          dispatch(actionCreators.clearTransRefNum());
        }
      });
  };
}
export function downloadState (creditCardNumber, period, iPass, lang) {
  return (dispatch) => {
    const accountNumber = creditCardNumber;
    const sendEmail = false;
    const payload = {period, accountNumber, sendEmail};
    dispatch(actionCreators.showSpinner());
    return api.downloadStatement2(payload, dispatch).then((res) => {
      dispatch(NavigationActions.navigate({routeName: 'CcDownloadScreens', params: {data: res.data, iPass, lang, creditCardNumber, period}}));
      dispatch(actionCreators.hideSpinner());
    }).catch((err) => {
      dispatch(NavigationActions.navigate({routeName: 'CcDownloadScreens', params: {data: err.data}}));
      dispatch(actionCreators.hideSpinner());
    });
  };
}

export function showAlertAmount () {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      text: language.INQUIRY__SIL_EM_FUND_AMOUNT,
      button1: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function getRipleyPersonalPDF (riplayPersonalLink) {
  return () => {
    Linking.canOpenURL(riplayPersonalLink).then((supported) => {
      if (supported) {
        Linking.openURL(riplayPersonalLink);
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_HANDLE_URL, Toast.LONG);
      }
    }).catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_HANDLE_URL), Toast.LONG);
  };
}

export function getRipleyPersonal () {
  return (dispatch, getState) => {
    const state = getState();
    const isSilIdrUsd = result(state, 'silIdrUsd', '');
    const silIlustrasiForm1 = result(state, 'silStorage[0].dataBody', {});
    const silIlustrasiForm2 = result(state, 'silStorage[1].dataBody', {});
    const sileSPAJform5 = result(state, 'silStorage[6].dataBody', {});
    const sileSPAJform6 = result(state, 'silStorage[7].dataBody', {});

    const pemegangPolis = {
      'fullName': result(state, 'smartInvestasiLinkPolis.namaLengkap', ''),
      'birthDate': moment(result(state, 'smartInvestasiLinkPolis.tanggalLahir', '')).format('DD/MM/YYYY'),
      'email': result(silIlustrasiForm1, 'email'),
    };

    const tertanggung = {
      'fullName': result(state, 'smartInvestasiLinkPolis.namaLengkap', ''),
      'birthDate': moment(result(state, 'smartInvestasiLinkPolis.tanggalLahir', '')).format('DD/MM/YYYY'),
      'relation': 1,
    };

    const productInsured = {
      'productId': isSilIdrUsd === 'IDR' ? parseInt(result(state, 'getProductListSil.listProduct[0].productId', 0) + result(state, 'getProductListSil.listProduct[0].listProdDetail[0].subproductId', 0)) : parseInt(result(state, 'getProductListSil.listProduct[1].productId', 0) + result(state, 'getProductListSil.listProduct[1].listProdDetail[0].subproductId', 0)),
      'paymode': '1',
      'rollOver': result(silIlustrasiForm2, 'investa.value', 0),
      'subProductId': isSilIdrUsd === 'IDR' ? parseInt(result(state, 'getProductListSil.listProduct[0].listProdDetail[0].subproductId', 0)) : parseInt(result(state, 'getProductListSil.listProduct[1].listProdDetail[0].subproductId', 0)),
      'kurs': isSilIdrUsd === 'IDR' ? '01' : '02',
      'premi': parseInt(result(silIlustrasiForm2, 'amount', 0)),
      'rpi': parseInt(result(silIlustrasiForm2, 'income.label', 0)),
      'tanggalAwalMTI': moment(new Date()).format('DD/MM/YYYY'),
    };

    const gender = lowerCase(result(state, 'smartInvestasiLinkPolis.jenisKelamin', ''));
    const chooseGender = getDataForSIlPolis(result(state, 'getDropList.dropDownList.jenisKelamin', {}));
    if (gender === 'woman' || gender === 'wanita') {
      const jenisKelamin = parseInt(result(chooseGender, '[0].value', ''));
      pemegangPolis['sex'] = jenisKelamin;
      tertanggung['sex'] = jenisKelamin;
    } else if (gender === 'man' || gender === 'pria') {
      const jenisKelamin = parseInt(result(chooseGender, '[1].value', ''));
      pemegangPolis['sex'] = jenisKelamin;
      tertanggung['sex'] = jenisKelamin;
    }

    const investId = isSilIdrUsd === 'IDR' ? result(state, 'getProductListSil.listProduct[0].listProdDetail[0].listFund[0].fundId', '') : result(state, 'getProductListSil.listProduct[1].listProdDetail[0].listFund[0].fundId', '');
    const percent = 100;
    const fundInvest = [{
      investId,
      percent
    }];

    const checkboxArray = result(sileSPAJform5, 'checkboxArray.checkboxArray', []);

    const label = map(checkboxArray, (item) => item.label);
    const questionareTtg = map(checkboxArray, (item) => item.questionareTtg);
    const explain0 = {
      'questionareId': parseInt(result(sileSPAJform5, 'answers0.questionareId', 0)),
      'questionarePpFlag': parseInt(result(sileSPAJform5, 'answers0.questionarePpFlag', 0)),
      'questionareTtgFlag': parseInt(result(sileSPAJform5, 'answers0.questionareTtgFlag', 0)),
      'questionarePp': result(sileSPAJform5, 'explain0', ''),
      'questionareTtg': result(sileSPAJform5, 'explain0', '')
    };

    const checkboxArrayList = {
      'questionareId': parseInt(result(sileSPAJform5, 'answers1.questionareId', 0)),
      'questionarePpFlag': parseInt(result(sileSPAJform5, 'answers1.questionarePpFlag', 0)),
      'questionareTtgFlag': parseInt(result(sileSPAJform5, 'answers1.questionareTtgFlag', 0)),
      'label': label.toString(),
      'questionareTtg': questionareTtg.toString(),
      'questionarePp': questionareTtg.toString()
    };

    const explain2 = {
      'questionareId': parseInt(result(sileSPAJform5, 'answers2.questionareId', 0)),
      'questionarePpFlag': parseInt(result(sileSPAJform5, 'answers2.questionarePpFlag', 0)),
      'questionareTtgFlag': parseInt(result(sileSPAJform5, 'answers2.questionareTtgFlag', 0)),
      'questionarePp': result(sileSPAJform5, 'explain2', ''),
      'questionareTtg': result(sileSPAJform5, 'explain2', '')
    };
    const answer0_form6 = result(sileSPAJform6, 'answer0', {});
    const answer1_form6 = result(sileSPAJform6, 'answer1', {});
    const answer2_form6 = result(sileSPAJform6, 'answer2', {});
    const answer3_form6 = result(sileSPAJform6, 'answer3', {});
    const answer4_form6 = result(sileSPAJform6, 'answer4', {});
    const questionareAnswerList = [explain0, checkboxArrayList, explain2, answer0_form6, answer1_form6,
      answer2_form6, answer3_form6, answer4_form6,
    ];
    forEach(questionareAnswerList, (item) => {
      if (item.questionarePp === '' || item.questionarePpFlag === 0) {
        delete item.questionarePp;
      }
      if (item.questionareTtg === '' || item.questionarePpFlag === 0) {
        delete item.questionareTtg;
      }
      delete item.value;
      delete item.label;
    });
    const requestSil = {
      pemegangPolis,
      tertanggung,
      productInsured,
      fundInvest,
    };
    const payload = {
      requestSil
    };
    dispatch(actionCreators.showSpinner());
    return api.getRiplayPersonal(payload, dispatch).then((res) => {
      const riplayPersonalLink = result(res, 'data.riplayPersonal.riplayPersonalLink', '');
      dispatch(actionCreators.saveInputIndividu(res.data));
      dispatch(getRipleyPersonalPDF(riplayPersonalLink));
      dispatch(actionCreators.hideSpinner());
    }).catch((err) => {
      dispatch(actionCreators.saveInputIndividu(err.data));
      Toast.show(result(err, 'data.responseMessage', ''));
      dispatch(actionCreators.hideSpinner());
    });
  };
}

export function showDormantOtp (accountNumber) {
  return (dispatch) => {
    const payload = {accountNumber};
    dispatch(actionCreators.showSpinner());
    return api.releaseDormant(payload, dispatch).then(() => {
      dispatch(NavigationActions.back());
      dispatch(actionCreators.hideSpinner());
      dispatch(refreshStorage());
      dispatch(releaseDormantSuccess());
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
        dispatch(NavigationActions.back());
        dispatch(actionCreators.hideSpinner());
        dispatch(releaseDormantFailed());
      }
    });
  };
}

export function releaseDormantSuccess () {
  return (dispatch) => {
    const hideAlert = () => {
      // dispatch(refreshStorage());
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.DORMANT__RELEASE_SUCCESS,
      text: language.DORMANT__RELEASE_SUCCESS_TEXT,
      button1: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
      closeOnTouchOutside: false
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}


export function releaseDormantFailed () {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.DORMANT__RELEASE_FAILED,
      text: language.DORMANT__RELEASE_FAILED_TEXT,
      button1: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
      closeOnTouchOutside: false
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function getTdConfigNkycUser () {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    dispatch(destroy('TdFormNkycUser'));
    return api.tdConfig(dispatch).
      then((response) => {
        const tdConfig = middlewareUtils.prepareTdConfig(response.data);
        dispatch(actionCreators.updateTdConfigConv(tdConfig));
      }).
      then(() => api.tdsConfig(dispatch)).
      then((response) => {
        const tdsConfig = middlewareUtils.prepareTdConfig(response.data);        
        dispatch(actionCreators.updateTdConfigSharia(tdsConfig));
        const lang = result(state, 'currentLanguage.id', 'en');
        return api.getTdDisclaimer(lang, dispatch).then((response) => {
          dispatch(NavigationActions.navigate({routeName: 'TdForm', params: {openTdHolidayWarning: String(response.data.extraNoteList)}}));
          dispatch(actionCreators.hideSpinner());
        }).
          catch((err) => {
            dispatch(actionCreators.hideSpinner());
            Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_GET_TIME_DEPOSIT_CONFIG), Toast.LONG);
          });
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_GET_TIME_DEPOSIT_CONFIG), Toast.LONG);
      });
  };
}

export function getClosingConfig () {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());

    return api.getClosingConfig(dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      dispatch(actionCreators.saveCloseAccountConfig(res.data));
    }).then(() => {
      api.getBalances(dispatch).then((res) => {
        const accounts = {accounts: [...res.data.accounts]};
        dispatch(actionCreators.updateBalances(middlewareUtils.getBalances(accounts)));
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate({routeName: 'CloseCard'}));
      }).catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
        throw err;
      });
    });
  };
}

export function getClosingDetail (values, isOneAcc) {
  return (dispatch, getState) => {
    const state = getState();
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const accountNumber = result(values, 'accountNumber', '');
    const availableBalance = result(values, 'balances.availableBalance', '').toString();
    const totalBalance = result(values, 'balances.workingBalance', '').toString();
    const userName = result(state, 'user.profile.loginName', '');
    const payload = {accountNumber, availableBalance, totalBalance, cifCode, userName, isOneAcc};
    dispatch(actionCreators.showSpinner());

    dispatch(destroy('recipientAccount'));

    return api.getClosingDetails(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const amountTransfers = result(res, 'data.amountTransfer', '').toString();
      const totalBalances = result(res, 'data.totalBalance', '').toString();
      const accountNumbers = result(res, 'data.accountNumber', '');
      const closingFees = result(res, 'data.closingFee', '').toString();
      const accountTypeName = result(res, 'data.accountTypeName', '');
      const accountName = accountNumbers + ' - ' + accountTypeName;
      const status = result(res, 'data.responseCode', '');

      dispatch(actionCreators.saveCloseCardDetails(res.data));

      dispatch(change('recipientAccount', 'amountTransfer', amountTransfers));
      dispatch(change('recipientAccount', 'totalBalance', totalBalances));
      dispatch(change('recipientAccount', 'accountName', accountName));
      dispatch(change('recipientAccount', 'closingFee', closingFees));
      dispatch(change('recipientAccount', 'accountTypeName', accountTypeName));
      dispatch(change('recipientAccount', 'accountNumber', accountNumbers));

      if (status === '00') {
        dispatch(NavigationActions.navigate({routeName: 'ChooseCloseCard'}));
      }      else {
        dispatch(closeCardPopUp(status));
      }
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export const closeCardPopUp = (status) => (dispatch) => {
  const goToVerif = () => {
    dispatch(actionCreators.hideSinarmasAlert());
  };
  if (status === '01') {
    Toast.show(getErrorMessage(language.CLOSE__SAVING_ACCOUNT_TOAST_LINK), Toast.LONG);
  }  else if (status === '02') {
    const sinarmasModalOptions = {
      heading2: language.CLOSE__SAVING_ACCOUNT_ATTENTION,
      text: language.CLOSE__SAVING_ACCOUNT_POPUP_BLOCK,
      button1: language.GENERIC__OK,
      onButton1Press: goToVerif,
      closeOnTouchOutside: false,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  } else if (status === '03') {
    const sinarmasModalOptions = {
      heading2: language.CLOSE__SAVING_ACCOUNT_ATTENTION,
      text: language.CLOSE__SAVING_ACCOUNT_POPUP_JOINT,
      button1: language.GENERIC__OK,
      onButton1Press: goToVerif,
      closeOnTouchOutside: false,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  } else if (status === '05') {
    const sinarmasModalOptions = {
      heading2: language.CLOSE__SAVING_ACCOUNT_ATTENTION,
      text: language.CLOSE__SAVING_ACCOUNT_POPUP_LINKED,
      button1: language.GENERIC__OK,
      onButton1Press: goToVerif,
      closeOnTouchOutside: false,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  } else if (status === '06') {
    const sinarmasModalOptions = {
      heading2: language.CLOSE__SAVING_ACCOUNT_ATTENTION,
      text: language.CLOSE__SAVING_ACCOUNT_POPUP_NOACC,
      button1: language.GENERIC__OK,
      onButton1Press: goToVerif,
      closeOnTouchOutside: false,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  }  else {
    Toast.show(getErrorMessage(language.CLOSE__SAVING_ACCOUNT_TOAST_LINK), Toast.LONG);
  }
};

export function commitClosingAccount () {
  return (dispatch, getState) => {
    const state = getState();

    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const accountNumber = result(state, 'form.recipientAccount.values.accountNumber', '');
    const accountSettlement = result(state, 'form.recipientAccount.values.transferTo.accountNumber', '');
    const loginName = result(state, 'user.profile.loginName', '');
    const amountTransfer = result(state, 'form.recipientAccount.values.amountTransfer', '');

    dispatch(actionCreators.showSpinner());
    let easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    const randomNumber = randomString(16);
    OBM_EncryptPassword(easyPin, randomNumber);
    if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;

    const payload = {easyPin, accountNumber, cifCode, accountSettlement, loginName, amountTransfer};

    return api.commitClosingAccount(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const responseCode = result(res, 'data.responseCode', '');
      const transRefNum = result(res, 'data.transRefNum', '');
      const isClosingAccount = 'yes';
      const accountNumber = result(res, 'data.accountNumber', '');
      const accountName = result(res, 'data.accountName', '');
      const accountType = result(res, 'data.accountType', '');
      const openDate = result(res, 'data.createdDate', '');
      const closeDate = result(res, 'data.closeDate', '');

      if (responseCode === '00') {
        dispatch(actionCreators.showPaymentModal({
          accountFrom: accountNumber,
          type: 'SUCCESS',
          isClosingAccount,
          transactionType: 'Saving account closing',
          transactionId: transRefNum,
          accClosing: accountNumber,
          accNameHolder: accountName,
          accTypeSaving: accountType,
          openingDate: openDate,
          closingDate: closeDate
        }));
        dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
      } else if (responseCode === '01') {
        dispatch(actionCreators.showPaymentModal({
          accountFrom: accountNumber,
          type: 'FAILED',
          isClosingAccount,
          transactionId: transRefNum
        }));
        dispatch(NavigationActions.navigate({routeName: 'PaymentStatusNew'}));
      }

    }).catch((error) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function getNilaiQ () {
  return (dispatch, getState) => {
    const state = getState();
    const lang = result(state, 'currentLanguage.id', 'en');
    const payload = {lang};
    dispatch(actionCreators.showSpinner());
    return api.getNilaiQ(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      dispatch(NavigationActions.navigate({routeName: 'ScoreNilaiQ', params: {valueData: res.data}}));
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__GET_DATA));
    });
  };
}
