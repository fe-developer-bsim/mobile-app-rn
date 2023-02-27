import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import result from 'lodash/result';
import {isEmpty} from 'lodash';
import * as middlewareUtils from '../../utils/middleware.util';
import {getErrorMessage, filterTransactions} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import {Toast, Alert} from '../../utils/RNHelpers.util.js';
import {language} from '../../config/language';
import moment from 'moment';
import {SERVER_URL, endpoints} from '../../config/api.config';
import {Linking} from 'react-native';

// TAB CASA TRANSACTION HISTORY
export function updateMiniTransactions (accountNumber) {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    return api.getMiniStatement({accountNumber}, dispatch).
      then((res) => {
        dispatch(actionCreators.hideSpinner());
        const transactions = middlewareUtils.getMiniStatement(res.data);
        return dispatch(actionCreators.updateLast10Trans(transactions));
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_UPDATE_TRANSACTION), Toast.LONG);
      });
  };
}

export function updateTransactionHistory (transactionType, accountNumber) {
  return (dispatch, getState) => {
    const filters = result(getState(), 'transactions.filters', {});
    if (!accountNumber || !transactionType) {
      return Toast.show(getErrorMessage({}, language.ERROR_MESSAGE__UNKNOWN_TRANSACTION_TYPE), Toast.LONG);
    }
    let filterAction = null;
    dispatch(actionCreators.showSpinner());
    dispatch(actionCreators.clearTransactions());
    const payload = middlewareUtils.prepareTransactionHistoryPayload(accountNumber, transactionType, false);
    switch (transactionType) {
    case 'lastMonth' : {
      filterAction = actionCreators.updateLastMonthTrans;
      break;
    }
    case 'last2Months' : {
      filterAction = actionCreators.updateLast2MonthsTrans;
      break;
    }
    case 'last3Months' : {
      filterAction = actionCreators.updateLast3MonthsTrans;
      break;
    }
    case 'last10' : {
      filterAction = actionCreators.updateLast10Trans;
      break;
    }
    default: {
      filterAction = actionCreators.updateLastMonthTrans;
    }
    }
    return api.getTransactionHistory(payload, dispatch).
      then((res) => {
        dispatch(actionCreators.hideSpinner());
        const transactions = middlewareUtils.getTransactionHistory(res.data);
        const filteredTransactions = filterTransactions(transactions, filters);
        dispatch(filterAction(filteredTransactions));
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_TRANSACTION_HISTORY), Toast.LONG);
      });
  };
}

export function updateTransactionHistoryNew (transactionType, accountNumber, sendToEmail) {
  return (dispatch, getState) => {
    const filters = result(getState(), 'transactions.filters', {});
    const ipassport = result(getState(), 'user.ipassport');
    const lang = result(getState(), 'currentLanguage.id', 'en');
    const month = result(filters, 'selectedRange.value', '');
    const email = result(getState(), 'user.profile.email');
    let filterAction = null;
    let sFromDate = '';
    let sToDate = '';
    if (transactionType === 'selectDateRange') {
      if (moment(filters.selectedStartDate).isSameOrBefore(filters.selectedEndDate)) {
        sFromDate = moment(filters.selectedStartDate).format('YYYY-MM-DD');
        sToDate = moment(filters.selectedEndDate).format('YYYY-MM-DD');
      } else {
        sFromDate = moment(filters.selectedEndDate).format('YYYY-MM-DD');
        sToDate = moment(filters.selectedStartDate).format('YYYY-MM-DD');
      }
    }
    dispatch(actionCreators.showSpinner());
    dispatch(actionCreators.clearTransactions());
    const payload = middlewareUtils.prepareTransactionHistoryPayloadNew(accountNumber, transactionType, sFromDate, sToDate, sendToEmail, false, ipassport, lang, month);
    switch (transactionType) {
    case 'today': {
      filterAction = actionCreators.updateTodayTrans;
      break;
    }
    case 'selectDateRange': {
      filterAction = actionCreators.updateDateRangeTrans;
      break;
    }
    case 'currentMonth': {
      filterAction = actionCreators.updateCurrentMonthTrans;
      break;
    }
    default: {
      filterAction = actionCreators.updateCurrentMonthTrans;
    }
    }
    return api.getTransactionHistoryNew(payload, dispatch).
      then((res) => {
        const transactions = middlewareUtils.getTransactionHistory(res.data);
        const filteredTransactions = filterTransactions(transactions, filters);
        dispatch(filterAction(filteredTransactions));
        const resStatus = result(res, 'status', 200); // prod cannot read status, default value needed
        if (sendToEmail) {
          const emailStatus = result(res, 'data.emailStatus', '');
          if (isEmpty(emailStatus)) {
            Toast.show(`${language.TRANSACTION_FILTER__MAIL_SUCCESS_NEW} ${email}`, Toast.LONG);
          } else {
            Toast.show(emailStatus, Toast.LONG);
          }
        }
        dispatch(actionCreators.hideSpinner());
        return {...res, resStatus};
      }).catch((err) => {
        if (!accountNumber || !transactionType) {
          Toast.show(getErrorMessage({}, language.ERROR_MESSAGE__UNKNOWN_TRANSACTION_TYPE), Toast.LONG);
        } else {
          Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_TRANSACTION_HISTORY), Toast.LONG);
        }
        dispatch(actionCreators.hideSpinner());
        return err;
      });
  };
}

export function exportTransactionHistory (accountNumber) {
  return (dispatch, getState) => {
    const filters = result(getState(), 'transactions.filters', {});
    const email = result(getState(), 'user.profile.email');
    const transactionType = result(filters, 'selectedRange.value');
    if (transactionType === 'last10') {
      return Alert.alert(language.GENERIC__SORRY, language.TRANSACTION_FILTER__LAST10_ERROR);
    }
    const payload = middlewareUtils.prepareTransactionHistoryPayload(accountNumber, transactionType, true);
    return Alert.alert(language.TRANSACTION_FILTER__DOWNLOAD_HEADING, `${language.TRANSACTION_FILTER__DOWNLOAD_CONTENT}: ${email}`, [{
      text: language.GENERIC__CANCEL
    }, {
      text: language.TRANSACTION_FILTER__EXPORT,
      onPress: () => {
        dispatch(actionCreators.showSpinner());
        api.getTransactionHistory(payload, dispatch).
          then(() => {
            dispatch(actionCreators.hideSpinner());
            Toast.show(language.TRANSACTION_FILTER__MAIL_SUCCESS, Toast.LONG);
          }).
          catch((err) => {
            dispatch(actionCreators.hideSpinner());
            Toast.show(getErrorMessage(err, language.TRANSACTION_FILTER__MAIL_FAILURE), Toast.LONG);
          });
      }
    }]);
  };
}


export function downloadTransactionHistory (transactionType, accountNumber) {
  return (dispatch, getState) => {
    const filters = result(getState(), 'transactions.filters', {});
    const ipassport = result(getState(), 'user.ipassport');
    const lang = result(getState(), 'currentLanguage.id', 'en');
    const month = result(filters, 'selectedRange.value', '');
    let sFromDate = '';
    let sToDate = '';
    if (transactionType === 'selectDateRange') {
      if (moment(filters.selectedStartDate).isSameOrBefore(filters.selectedEndDate)) {
        sFromDate = moment(filters.selectedStartDate).format('YYYY-MM-DD');
        sToDate = moment(filters.selectedEndDate).format('YYYY-MM-DD');
      } else {
        sFromDate = moment(filters.selectedEndDate).format('YYYY-MM-DD');
        sToDate = moment(filters.selectedStartDate).format('YYYY-MM-DD');
      }
    }
    const url = SERVER_URL + endpoints['TRANSACTIONS_HISTORY_NEW'];
    const payload = middlewareUtils.prepareTransactionHistoryPayloadNew(accountNumber, transactionType, sFromDate, sToDate, false, true, ipassport, lang, month);
    dispatch(actionCreators.showSpinner());
    if (!accountNumber || !transactionType) {
      setTimeout(() => {
        dispatch(actionCreators.hideSpinner());
        return Toast.show(getErrorMessage({}, language.ERROR_MESSAGE__UNKNOWN_TRANSACTION_TYPE), Toast.LONG);
      }, 1000);
    } else {
      return Linking.openURL(url + payload).then(() => {
        dispatch(actionCreators.hideSpinner());
      }).catch((err) => {
        Toast.show(getErrorMessage(err, language.TRANSACTION_FILTER__DOWNLOAD_FAILURE), Toast.LONG);
        dispatch(actionCreators.hideSpinner());
      });
    }
  };
}

// CREDIT CARD TRANSACTION HISTORY
export function updateCreditCardTransactionHistory (creditCardDetail, selectedAccount) {
  return (dispatch, getState) => {
    const state = getState();
    const iPass = result(state, 'additionalApiPayload.ipassport');
    const lang = result(state, 'additionalApiPayload.language');
    const accountNumber = result(selectedAccount, 'accountNumber', '');
    dispatch(actionCreators.showSpinner());
    dispatch(actionCreators.clearTransactions());
    const payload = middlewareUtils.prepareCcTransactionHistoryPayload(accountNumber, false);
    return api.creditCardStatement(payload, dispatch).
      then((res) => {
        dispatch(actionCreators.hideSpinner());
        const filterAction = actionCreators.updateCcHistory;
        dispatch(filterAction(middlewareUtils.getMiniStatementCreditCardNew(res.data)));
        dispatch(NavigationActions.navigate({routeName: 'CcHistoryFund', params: {selectedAccount, iPass, lang, creditCardDetail}}));
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_TRANSACTION_HISTORY), Toast.LONG);
      });
  };
}

export function exportCreditCardHistory (creditCardNumber) {
  return (dispatch, getState) => {
    const email = result(getState(), 'user.profile.email');
    return Alert.alert(language.CREDIT_CARD__DOWNLOAD_HEADING, `${language.CREDIT_CARD__DOWNLOAD_CONTENT}: ${email}`, [{
      text: language.GENERIC__CANCEL
    }, {
      text: language.TRANSACTION_FILTER__EXPORT,
      onPress: () => {
        dispatch(actionCreators.showSpinner());
        const payload = middlewareUtils.prepareCcTransactionHistoryPayload(creditCardNumber, true);
        api.getCreditCardTransactionHistory(payload, dispatch).
          then(() => {
            dispatch(actionCreators.hideSpinner());
            Toast.show(language.CREDIT_CARD__MAIL_SUCCESS, Toast.LONG);
          }).
          catch((err) => {
            dispatch(actionCreators.hideSpinner());
            Toast.show(getErrorMessage(err, language.CREDIT_CARD__MAIL_FAILURE), Toast.LONG);
          });
      }
    }]);
  };
}

export function getDetailTransactionHistory (statementId, transactionCode, accountTransactions) {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    const payload = {statementId};
    return api.getDetailTransactionHistory(payload, dispatch).
      then((res) => {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate({routeName: 'DetailTransactionPage', params: {detailData: res, transactionCode: transactionCode, statementId: statementId, accountTransactions: accountTransactions}}));
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_TRANSACTION_HISTORY));
      });
  };
}

export function updateTransactionEmoneyHistory (transactionType, accountNumber) {
  return (dispatch, getState) => {
    const filters = result(getState(), 'transactions.filters', {});
    let filterAction = null;
    dispatch(actionCreators.showSpinner());
    dispatch(actionCreators.clearTransactionsEmoney());
    const payload = middlewareUtils.prepareTransactionHistoryEmoneyPayload(accountNumber, transactionType);
    switch (transactionType) {
    case 'lastMonth' : {
      filterAction = actionCreators.updateLastMonthTransEmoney;
      break;
    }
    case 'last2Months' : {
      filterAction = actionCreators.updateLast2MonthsTransEmoney;
      break;
    }
    case 'last3Months' : {
      filterAction = actionCreators.updateLast3MonthsTransEmoney;
      break;
    }
    case 'last10' : {
      filterAction = actionCreators.updateLast10TransEmoney;
      break;
    }
    default: {
      filterAction = actionCreators.updateLastMonthTransEmoney;
    }
    }
    return api.getTransactionEmoneyHistory(payload, dispatch).
      then((res) => {
        dispatch(actionCreators.hideSpinner());
        const transactions = middlewareUtils.getTransactionEmoneyHistory(res.data);
        const filteredTransactions = filterTransactions(transactions, filters);
        if (transactionType === 'last10') {
          const last10trx = filteredTransactions.slice(0, 10);
          dispatch(filterAction(last10trx));
        } else {
          dispatch(filterAction(filteredTransactions));
        }
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_TRANSACTION_HISTORY), Toast.LONG);
      });
  };
}

export function getDetailTransactionEmoneyHistory (statementId, transactionCode, accountTransactions, description, creditAmount, debitAmount) {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    const payload = {statementId};
    return api.getDetailTransactionEmoneyHistory(payload, dispatch).
      then((res) => {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate({routeName: 'TransactionDetailEmoneyScreen', params: {detailData: res, transactionCode: transactionCode, statementId: statementId, accountTransactions: accountTransactions, description: description, creditAmount, debitAmount}}));
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_TRANSACTION_HISTORY));
      });
  };
}

export function detailLockedAmount (selectedAccount) {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    const accountNumber = selectedAccount;
    const payload = {accountNumber};
    return api.getDetailLockedAmount(payload, dispatch).
      then((res) => {
        const data = result(res, 'data.DataDetailLockDana');
        dispatch(actionCreators.saveDetailLockedDana(data));
        dispatch(actionCreators.hideSpinner());
      }).
      catch(() => {
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function miniTransactionEmoneyHistory (transactionType, accountNumber) {
  return (dispatch) => {
    let filterAction = null;
    dispatch(actionCreators.showSpinner());
    dispatch(actionCreators.clearTransactionsEmoney());
    const payload = middlewareUtils.prepareTransactionHistoryEmoneyPayload(accountNumber, transactionType);
    switch (transactionType) {
    case 'lastMonth' : {
      filterAction = actionCreators.updateLastMonthTransEmoney;
      break;
    }
    case 'last2Months' : {
      filterAction = actionCreators.updateLast2MonthsTransEmoney;
      break;
    }
    case 'last3Months' : {
      filterAction = actionCreators.updateLast3MonthsTransEmoney;
      break;
    }
    case 'last10' : {
      filterAction = actionCreators.updateLast10TransEmoney;
      break;
    }
    default: {
      filterAction = actionCreators.updateLastMonthTransEmoney;
    }
    }
    return api.getTransactionEmoneyHistory(payload, dispatch).
      then((res) => {
        dispatch(actionCreators.hideSpinner());
        const transactions = middlewareUtils.getTransactionEmoneyHistory(res.data);
        dispatch(filterAction(transactions));
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_TRANSACTION_HISTORY), Toast.LONG);
      });
  };
}

export function updateMiniTransactionsEmoney (transactionType, accountNumber) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const filters = result(getState(), 'transactions.filters', {});
    const payload = middlewareUtils.prepareTransactionHistoryEmoneyPayload(accountNumber, transactionType);
    return api.getTransactionEmoneyHistory(payload, dispatch).
      then((res) => {
        dispatch(actionCreators.hideSpinner());
        const transactions = middlewareUtils.getTransactionEmoneyHistory(res.data);
        const filteredTransactions = filterTransactions(transactions, filters);
        return dispatch(actionCreators.updateLast10TransEmoney(filteredTransactions));
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_UPDATE_TRANSACTION), Toast.LONG);
      });
  };
}
