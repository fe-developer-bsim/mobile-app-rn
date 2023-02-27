import result from 'lodash/result';
import filter from 'lodash/filter';
import map from 'lodash/map';
import find from 'lodash/find';
import sortBy from 'lodash/sortBy';
import {getPayeeType, stringify, formatFieldPostal, dateFormatter, formatYearMonthDate, currencyFormatter, generateLanguageGenericBiller,
  getDataPassanger, getDataSegment, getFarePayload, currencySymbol, formatForexAmountPaymentStatus, removeNonAscii, formatFieldAmountWithDecimal} from './transformer.util';
import {encryptText} from '../utils/secure.util';
import {deviceInfo} from '../utils/device.util';
import isArray from 'lodash/isArray';
import startCase from 'lodash/startCase';
import isEmpty from 'lodash/isEmpty';
import {language} from '../config/language';
import moment from 'moment';
import {randomString, OBM_EncryptPassword, OBM_GetEncodingParameter, OBM_GetEncryptedPassword, OBM_EncryptChangePassword} from '../utils/vendor/pinEncryption.util';
import startsWith from 'lodash/startsWith';
import omit from 'lodash/omit';
import isNaN from 'lodash/isNaN';


export const getAccounts = (loginRawData) => {
  const defaultValue = [];
  return sortBy(result(loginRawData, 'ipassportData.ipassDataClient.profileScope.accountList', defaultValue), 'accountNumber');
};

export const getAccountsCC = (loginRawData) => {
  const defaultValue = [];
  return sortBy(result(loginRawData, 'ipassportData.ipassDataClient.profileScope.creditCardList', defaultValue), 'accountNumber');
};
export const getPayees = (loginRawData, data) => {
  const defaultValue = [];
  const extract = result(loginRawData, 'ipassportData.ipassDataClient.profileScope.listOfAllTransferList', defaultValue);
  const payeeData = isEmpty(extract) ? data : extract;
  return map(payeeData, (eachPayee) => ({
    ...eachPayee,
    'id': eachPayee.id,
    'accountNumber': eachPayee.accountNumber || String(eachPayee.id),
    'transferType': eachPayee.transferType || null,
    'label': eachPayee.label || null,
    'targetType': eachPayee.targetType || null,
    'currency': eachPayee.currency || null,
    'modeFlag': eachPayee.modeFlag || null,
    'name': eachPayee.name || null,
    'accountType': eachPayee.accountType || null,
    'bank': {
      bankName: eachPayee.bank || null
    }
  }));
};

export const getBalances = (balancesRawData) => {
  const defaultValue = [];
  const extract = result(balancesRawData, 'accounts', defaultValue);
  return map(extract, (eachBalance) => ({
    workingBalance: eachBalance.WorkingBalance,
    availableBalance: eachBalance.AvailableBalance,
    currentBalance: eachBalance.CurrentBalance,
    accountNumber: eachBalance.AccountNumber,
    currency: eachBalance.Currency
  }));
};

export const getUserMetaData = (loginRawData, tempRC) => {
  const ipassport = result(loginRawData, 'ipassport', null);
  return {
    ipassport,
    ipassportMetaCode: result(loginRawData, `${ipassport}`, null),
    loginTime: result(loginRawData, 'ipassportData.ipassDataClient.loginTime', null),
    lastAccess: result(loginRawData, 'ipassportData.ipassDataClient.lastAccess', null),
    profile: result(loginRawData, 'ipassportData.ipassDataClient.profileScope.userLogin', {}),
    transRefNum: result(loginRawData, 'transRefNum'),
    referralCode: tempRC !== '' ? tempRC : result(loginRawData, 'referralCode'),
  };
};

export const getDefaultAccount = (loginRawData) => {
  const accountList = result(loginRawData, 'ipassportData.ipassDataClient.profileScope.accountList', []);
  const defaultAccount = find(accountList, (account) => account.isDefaultAccount === 'YES');
  return isEmpty(defaultAccount) ? {} : defaultAccount;
};

export const getTransactionHistory = (transactionsRawData) => {
  const transactions = result(transactionsRawData, 'statementList.contentList', []);
  const accountTransactions = result(transactionsRawData, 'statementList.headerMap', {});
  return transactions.slice().reverse().
    filter((transaction) => transaction.TransactionReferenceNumber).
    map((transaction) => ({
      amount: transaction.DebitAmount || transaction.CreditAmount,
      description: transaction.Description,
      date: transaction.TransactionDate,
      credit: !!transaction.CreditAmount,
      statementId: result(transaction, 'StatementId', ''),
      transactionCode: result(transaction, 'TransactionCode', ''),
      accountTransactions: accountTransactions,
    }));
};

export const getMiniStatement = (transactionsRawData) => result(transactionsRawData, 'miniStatementData', []).
  slice().reverse().filter((transaction) => transaction.amount).
  map((trans) => ({...trans, credit: trans.creditOrDebit === 'C'}));

export const getCacheMiniStatement = (transactionsRawData) => result(transactionsRawData, 'miniStatementData', []).
  slice().filter((transaction) => transaction.amount).
  map((trans) => ({...trans, credit: trans.creditOrDebit === 'C'}));

export const getMiniStatementCreditCard = (creditCardRawData) => {
  const resultData = result(find(result(creditCardRawData, 'accountStatement', []), {recordList: []}), 'recordList', []);
  return resultData.filter((recordData) => result(recordData, 'trxAmtSign', '')).map((recordData) => ({
    amount: result(recordData, 'trxAmt', ''),
    credit: result(recordData, 'trxAmtSign', '') !== 'D',
    description: result(recordData, 'desc', ''),
    date: result(recordData, 'trxDate', ''),
    style: {}
  }));
};

export const getMiniStatementCreditCardNew = (creditCardRawData) => {
  const resultData = result(creditCardRawData, 'accountStatement', []);
  return resultData.map((recordData) => ({
    amount: result(recordData, 'trxAmt', ''),
    credit: startsWith(result(recordData, 'trxAmt', ''), '-'),
    description: result(recordData, 'desc', ''),
    date: result(recordData, 'txnDate', ''),
    arn: result(recordData, 'ARN', ''),
    value: result(recordData, 'apprCode', ''),
    label: result(recordData, 'desc', ''),
    sublabel: result(recordData, 'trxAmt', ''),
    posted: result(recordData, 'flagPost', ''),
    installable: result(recordData, 'isInstallable', ''),
    style: {}
  }));
};

export const getMiniStatementCreditCardInstallment = (creditCardRawData) => {
  const resultData = result(creditCardRawData, 'accountStatement', []);
  const filteredData = filter(resultData, {'isInstallable': 'Y'});

  return filteredData.map((filteredData) => ({
    value: result(filteredData, 'apprCode', ''),
    arn: result(filteredData, 'ARN', ''),
    credit: result(filteredData, 'trxAmtSign', '') !== 'D',
    label: result(filteredData, 'desc', ''),
    sublabel: result(filteredData, 'trxAmt', ''),
    date: result(filteredData, 'postingDate', ''),
    posted: result(filteredData, 'flagPost', ''),
    installable: result(filteredData, 'isInstallable', ''),
    style: {}
  }));
};

export const getCreditCardInstallmentPeriode = (data) => data.map((resultData) => ({
  term: result(resultData, 'term', ''),
  interestAmount: result(resultData, 'interestAmount', ''),
  schmeDesc: result(resultData, 'schmeDesc', ''),
  installmentAmount: result(resultData, 'installmentAmount', ''),
  installmentDate: result(resultData, 'installmentDate', ''),
  principalAmount: result(resultData, 'principalAmount', ''),
  interestRate: result(resultData, 'interestRate', ''),
  schmeId: result(resultData, 'schmeId', ''),
  installmentMonth: result(resultData, 'installmentMonth', ''),
  monthlyAdminFee: result(resultData, 'monthlyAdminFee', ''),
  installmentHandleFee: result(resultData, 'installmentHandleFee', ''),
  totalInstallment: result(resultData, 'totalInstallment', '')
}));

export const prepareConfirmTransferPayload = (formValues, payee, transType, time, transferMethodType, isValas = false) => {
  const {myAccount, amount, note, transferMode} = formValues;
  const {transferType} = payee;
  const payeeType = getPayeeType(payee);
  const targetAccountType = (payeeType === 'external') ? 'external' : 'inbanktransfer';
  const mode = transferMode || transferType;
  const isNewAccount = result(payee, 'id', '') === '' || result(payee, 'id', '') === null;
  const isOnline = mode === 'inbank' || mode === 'network';
  const cardlessModeDefault = false;
  const cardlessMode = transType === 'cardlessWithdrawal' ? true : cardlessModeDefault;
  const isScheduledFundTransfer = time.transferTime !== '';
  const network = targetAccountType === 'external' && result(myAccount, 'accountType', '') === 'emoneyAccount';
  const bankId = result(payee, 'bank.id', '') === '' ? result(payee, 'bank.bankId', '') : result(payee, 'bank.id', '');
  const isEmoney = result(myAccount, 'accountType', '');
  const currencyDeterminant = String(result(formValues, 'currency.name', String(result(myAccount, 'currency', ''))));
  const currencyTarget =  isValas ? currencyDeterminant : String(result(myAccount, 'currency', ''));
  const payload = {
    'accountFrom': String(result(myAccount, 'id', '')),
    'targetAccount': String(result(payee, 'id', '')),
    'transferList': String(result(payee, 'id', '')),
    'amount': String(amount),
    'mode': network ? 'network' : mode,
    'currency': currencyTarget,
    'modeCategory': String(payeeType),
    'targetAccountType': String(targetAccountType),
    'description': String(note) || '',
    'cardlessMode': cardlessMode,
    'isScheduledFundTransfer': isScheduledFundTransfer,
    'isRepeat': formValues.schedule > 0,
    'repeatType': String(result(formValues, 'schedule', '')),
    'recurring': String(time.recurring),
    'maxRecurrence': String(result(formValues, 'times', '')),
    'transferDate': String(time.transferTime),
    'isUsingSimobiPlus': true,
    'transferMethodType': String(transferMethodType),
    'newConfirmTransfer': isNewAccount ? {
      version: 'v4',
      targetBankId: String(bankId),
      accountNumber: String(payee.accountNumber || payee.accNo),
      targetAccountName: isEmoney === 'emoneyAccount' ? '' : String(!isOnline ? result(payee, 'name', '') : ''),
      description: String(result(payee, 'description', '')),
      mode: mode
    } : null
  };
  return payload;
};

export const prepareConfirmTransferQrPayload = (formValues, payee, transType, time, transferMethodType, isValas = false, jsonData, isCashout, isOnUs, isDana) => {
  const {myAccount, amount, note, transferMode} = formValues;
  const {transferType} = payee;
  const payeeType = getPayeeType(payee);
  const targetAccountType = (payeeType === 'external') ? 'external' : 'inbanktransfer';
  const mode = transferMode || transferType;
  const isNewAccount = result(payee, 'id', '') === '' || result(payee, 'id', '') === null;
  const isOnline = mode === 'inbank' || mode === 'network';
  const cardlessModeDefault = false;
  const cardlessMode = transType === 'cardlessWithdrawal' ? true : cardlessModeDefault;
  const isScheduledFundTransfer = time.transferTime !== '';
  const bankId = result(payee, 'bank.id', '') === '' ? result(payee, 'bank.bankId', '') : result(payee, 'bank.id', '');
  const isEmoney = result(myAccount, 'accountType', '');
  const currencyDeterminant = String(result(formValues, 'currency.name', String(result(myAccount, 'currency', ''))));
  const currencyTarget =  isValas ? currencyDeterminant : String(result(myAccount, 'currency', ''));
  const qrAccountNumber = parseInt(result(jsonData, '40.02', ''));
  const checkQrAccount = isNaN(qrAccountNumber);
  const payload = {
    'accountFrom': String(result(myAccount, 'value', '')),
    'targetAccount': isCashout ? String(result(jsonData, '40.02', '')) : String(result(payee, 'id', '')),
    'transferList': isCashout ? String(result(jsonData, '40.02', '')) : String(result(payee, 'id', '')),
    'amount': String(amount),
    'mode': !isOnUs ? 'network' : mode,
    'modeInbank': isCashout ? 'inbank' : null,
    'currency': currencyTarget,
    'modeCategory': String(payeeType),
    'targetAccountType': String(targetAccountType),
    'description': String(note) || '',
    'cardlessMode': cardlessMode,
    'isScheduledFundTransfer': isScheduledFundTransfer,
    'isRepeat': formValues.schedule > 0,
    'repeatType': String(result(formValues, 'schedule', '')),
    'recurring': String(time.recurring),
    'maxRecurrence': String(result(formValues, 'times', '')),
    'transferDate': String(time.transferTime),
    'isUsingSimobiPlus': true,
    'transferMethodType': String(transferMethodType),
    'newConfirmTransfer': isNewAccount && !isCashout ? {
      version: 'v4',
      targetBankId: String(bankId),
      accountNumber: isDana || checkQrAccount ? '1234567890' : isCashout ? String(result(jsonData, '40.02', '')) : String(payee.accountNumber || payee.accNo),
      targetAccountName: isEmoney === 'emoneyAccount' ? '' : String(!isOnline ? result(payee, 'name', '') : ''),
      description: String(result(payee, 'description', '')),
      mode: !isOnUs ? 'network' : mode
    } : null,
    'additionalQR': isCashout ?  null : jsonData
  };
  return payload;
};

export const prepareTransferPayload = (transferFormData, payeeAccount, transRefNum, easyPin, smsOtp, simasToken, transType, isFavorite, resData, currency, isSplitBill) => {
  const {myAccount, amount, note, transferMode} = transferFormData; // easyPin also
  const {transferType} = payeeAccount;
  const payeeType = getPayeeType(payeeAccount);
  const targetAccountType = (payeeType === 'external') ? 'external' : 'inbanktransfer';
  const cardlessModeDefault = false;
  const cardlessMode = transType === 'cardlessWithdrawal' ? true : cardlessModeDefault;
  const isScheduledFundTransfer = result(transferFormData, 'transferTime', '') !== '';
  const network = targetAccountType === 'external' && result(myAccount, 'accountType', '') === 'emoneyAccount';
  const isNewAccount = result(payeeAccount, 'id', '') === '' || result(payeeAccount, 'id', '') === null;
  const bankId = result(payeeAccount, 'bank.id', '') === '' ? result(payeeAccount, 'bank.bankId', '') : result(payeeAccount, 'bank.id', '');
  const mode = transferMode || transferType;
  const isOnline = mode === 'inbank' || mode === 'network';
  const isEmoney = result(myAccount, 'accountType', '');
  const targetAcc = result(resData, 'payeeId', '');
  let payload;
  if (isSplitBill) {
    payload = {
      'accountFrom': String(myAccount.id),
      'targetAccount': String(targetAcc),
      'transferList': String(targetAcc),
      'currency': String(currency),
      'amount': String(amount),
      'mode': network ? 'network' : String(transferMode || transferType),
      'modeCategory': String(payeeType),
      'targetAccountType': String(targetAccountType),
      'description': String(note) || '',
      'easyPin': String(easyPin),
      'mPinInputed': String(smsOtp),
      'transRefNum': String(transRefNum),
      'tokenInputed': String(simasToken),
      'cardlessMode': cardlessMode,
      'isScheduledFundTransfer': isScheduledFundTransfer,
      'isRepeat': transferFormData.schedule > 0,
      'repeatType': String(result(transferFormData, 'schedule', '')),
      'recurring': String(transferFormData.recurring),
      'maxRecurrence': String(result(transferFormData, 'times', '')),
      'transferDate': String(transferFormData.transferTime),
      'isUsingSimobiPlus': true,
      'isFavorite': String(isFavorite),
      'newConfirmTransfer': isNewAccount ? {
        accountId: String(resData.payeeId),
        targetBankId: String(bankId),
        accountNumber: String(payeeAccount.accountNumber || payeeAccount.accNo),
        targetAccountName: isEmoney === 'emoneyAccount' ? '' : String(!isOnline ? result(payeeAccount, 'name', '') : ''),
        description: String(result(payeeAccount, 'description', '')),
        mode: mode
      } : null
    };
  } else {
    payload = {
      'accountFrom': String(myAccount.id),
      'targetAccount': String(targetAcc),
      'transferList': String(targetAcc),
      'currency': String(currency),
      'amount': String(amount),
      'mode': network ? 'network' : String(transferMode || transferType),
      'modeCategory': String(payeeType),
      'targetAccountType': String(targetAccountType),
      'description': String(note) || '',
      'easyPin': String(easyPin),
      'mPinInputed': String(smsOtp),
      'transRefNum': String(transRefNum),
      'tokenInputed': String(simasToken),
      'cardlessMode': cardlessMode,
      'isScheduledFundTransfer': isScheduledFundTransfer,
      'isRepeat': transferFormData.schedule > 0,
      'repeatType': String(result(transferFormData, 'schedule', '')),
      'recurring': String(transferFormData.recurring),
      'maxRecurrence': String(result(transferFormData, 'times', '')),
      'transferDate': String(transferFormData.transferTime),
      'isUsingSimobiPlus': true,
      'isFavorite': String(isFavorite),
      'newConfirmTransfer': isNewAccount ? {
        accountId: String(resData.payeeId),
        targetBankId: String(bankId),
        accountNumber: String(payeeAccount.accountNumber || payeeAccount.accNo),
        targetAccountName: isEmoney === 'emoneyAccount' ? '' : String(!isOnline ? result(payeeAccount, 'name', '') : ''),
        description: String(result(payeeAccount, 'description', '')),
        mode: mode
      } : null
    };
  }
  return payload;
};

export const prepareTransferPayloadQr = (transferFormData, payeeAccount, transRefNum, easyPin, smsOtp, simasToken, transType, isFavorite, resData, currency, isQrTransfer, jsonData, isOnUs, isDana) => {
  const {myAccount, amount, note, transferMode} = transferFormData; // easyPin also
  const {transferType} = payeeAccount;
  const payeeType = getPayeeType(payeeAccount);
  const targetAccountType = (payeeType === 'external') ? 'external' : 'inbanktransfer';
  const cardlessModeDefault = false;
  const cardlessMode = transType === 'cardlessWithdrawal' ? true : cardlessModeDefault;
  const isScheduledFundTransfer = result(transferFormData, 'transferTime', '') !== '';
  const network = targetAccountType === 'external' && result(myAccount, 'accountType', '') === 'emoneyAccount';
  const isNewAccount = result(payeeAccount, 'id', '') === '' || result(payeeAccount, 'id', '') === null;
  const bankId = result(payeeAccount, 'bank.id', '') === '' ? result(payeeAccount, 'bank.bankId', '') : result(payeeAccount, 'bank.id', '');
  const mode = transferMode || transferType;
  const isOnline = mode === 'inbank' || mode === 'network';
  const isEmoney = result(myAccount, 'accountType', '');
  const targetAcc = result(resData, 'payeeId', '');
  const qrAccountNumber = result(jsonData, '40.02', '');
  const checkQrAccount = !isNaN(qrAccountNumber);
  const payload = {
    'accountFrom': isQrTransfer ? String(myAccount.value) : String(myAccount.id),
    'targetAccount': String(targetAcc),
    'transferList': String(targetAcc),
    'currency': String(currency),
    'amount': String(Number(amount).toFixed(0)),
    'mode': (isQrTransfer && !isOnUs) ? 'network' : network ? 'network' : String(transferMode || transferType),
    'modeCategory': String(payeeType),
    'targetAccountType': String(targetAccountType),
    'description': String(note) || '',
    'easyPin': String(easyPin),
    'mPinInputed': String(smsOtp),
    'transRefNum': String(transRefNum),
    'tokenInputed': String(simasToken),
    'cardlessMode': cardlessMode,
    'isScheduledFundTransfer': isScheduledFundTransfer,
    'isRepeat': transferFormData.schedule > 0,
    'repeatType': String(result(transferFormData, 'schedule', '')),
    'recurring': String(transferFormData.recurring),
    'maxRecurrence': String(result(transferFormData, 'times', '')),
    'transferDate': String(transferFormData.transferTime),
    'isUsingSimobiPlus': true,
    'isFavorite': String(isFavorite),
    'newConfirmTransfer': isNewAccount ? {
      accountId: String(resData.payeeId),
      targetBankId: String(bankId),
      accountNumber: isDana || checkQrAccount ? '1234567890' : String(payeeAccount.accountNumber || payeeAccount.accNo),
      targetAccountName: isEmoney === 'emoneyAccount' ? '' : String(!isOnline ? result(payeeAccount, 'name', '') : ''),
      description: String(result(payeeAccount, 'description', '')),
      mode: (isQrTransfer && !isOnUs) ? 'network' : mode
    } : null,
    'additionalQR': isQrTransfer ? jsonData : null
  };
  return payload;
};



export const prepareWaterEnquiryPayload = (waterEnquiryFormData) => ({
  'subscriberNoInput': String(waterEnquiryFormData.consumerNo),
  'idbillPay': Number(result(waterEnquiryFormData, 'waterBiller.id')),
  'billerType': '10',
  'areaCode': String(waterEnquiryFormData.areaCode.id)
});


export const prepareWaterTransactionPayload = (waterTransactionFormData) => ({
  'idbillPay': waterTransactionFormData.waterBiller.id,
  'billerType': '10',
  'accountFrom': String(waterTransactionFormData.accountNo.id),
  'subscriberNoInput': String(waterTransactionFormData.consumerNo),
  'areaCode': String(waterTransactionFormData.areaCode.id),
  'billAmount': String(waterTransactionFormData.billAmount),
  'easyPin': String(waterTransactionFormData.easyPin),
  'mPinInputed': String(waterTransactionFormData.smsOtp),
  'tokenInputed': String(waterTransactionFormData.simasToken),
  'transRefNum': String(waterTransactionFormData.transRefNum)
});

export const preparePostpaidEnquiryPayload = (mobileNo, selectedBiller) => ({
  'subscriberNoInput': String(mobileNo),
  'idbillPay': Number(result(selectedBiller, 'id')),
  'billerType': String(result(selectedBiller, 'billerPreferences.billerType')),
  'lang': 'en'
});

export const preparePostpaidTransactionPayload = (transactionData) => ({
  'idbillPay': transactionData.biller.id,
  'billerType': '1',
  'accountFrom': String(transactionData.selectedAccount.id),
  'subscriberNoInput': String(transactionData.mobileNo),
  'billAmount': String(transactionData.billAmount),
  'easyPin': String(transactionData.easyPin),
  'mPinInputed': String(transactionData.smsOtp),
  'tokenInputed': String(transactionData.simasToken),
  'transRefNum': String(transactionData.transRefNum)
});

export const prepareElectricityEnquiryPayload = (electricityEnquiryFormData) => ({
  'subscriberNoInput': String(electricityEnquiryFormData.meterNo),
  'idbillPay': Number(result(electricityEnquiryFormData, 'selectedBiller.id')),
  'billerType': String(result(electricityEnquiryFormData, 'selectedBiller.billerPreferences.billerType'), '')
});

export const prepareElectricityPayload = (electricityPayload = {}) => ({
  'subscriberNoInput': String(electricityPayload.meterNo),
  'idbillPay': Number(result(electricityPayload, 'biller.id')),
  'billerType': String(result(electricityPayload, 'biller.billerPreferences.billerType', '')),
  'accountFrom': String(result(electricityPayload, 'selectedAccount.id')),
  'mPinInputed': String(result(electricityPayload, 'smsOtp')),
  'transRefNum': String(result(electricityPayload, 'transRefNum')),
  'easyPin': String(electricityPayload.easyPin),
  'tokenInputed': String(electricityPayload.simasToken),
  'amount': String(result(electricityPayload, 'denomination.value', electricityPayload.billAmount)), // for prepaid
  'billAmount': String(result(electricityPayload, 'denomination.value', electricityPayload.billAmount)) // for postpaid/non-taglist
});

export const prepareGetPayeeName = (formData) => (
  {
    'targetBankId': String(formData.bankId),
    'accountNumber': String(formData.accountNumber),
    'securityTypeCode': '11',
    'language': 'EN',
  });


export const prepareAddNewPayee = (payee, easyPin, otp, simasToken, transRefNum, resData, transType, transferMethodType) => {
  const cardlessModeDefault = false;
  const cardlessMode = transType === 'cardlessWithdrawal' ? true : cardlessModeDefault;
  const payload =
    {
      'accountId': String(result(resData, 'payeeId', '')),
      'language': 'EN',
      'easyPin': String(easyPin),
      'mPinInputed': String(otp),
      'tokenInputed': String(simasToken),
      'transRefNum': String(transRefNum),
      'cardlessMode': cardlessMode,
      'transferMethodType': String(transferMethodType)
    };
  return payload;
};


export const prepareConfirmTransfer = (payeeId, mode) => ({
  'payeeId': String(payeeId),
  'mode': String(mode),
  'language': 'EN'
});

export const prepareMobileTopup = (biller, mobileNo, topupAmount, account, easyPin, smsOtp, simasToken, transRefNum) => ({
  idbillPay: result(biller, 'id'),
  billerType: result(biller, 'billerPreferences.billerType'),
  accountFrom: String(account.id),
  subscriberNoInput: mobileNo,
  amount: result(topupAmount, 'id'),
  transRefNum,
  mPinInputed: smsOtp,
  easyPin,
  tokenInputed: simasToken
});


export const prepareEasyPinRegister = (easypin, isResetEasypin, token, ipassport, isFromEmoney, transRefNum, ipassportEmoney) => {
  const randomNumber = randomString(16);
  OBM_EncryptPassword(easypin, randomNumber);
  const payload = {
    'easyPin': 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber,
    'isResetEasypin': isResetEasypin,
    'token': token,
    'ipassport': isFromEmoney ? ipassportEmoney : ipassport,
    'isFromEmoney': isFromEmoney,
    'transRefNum': transRefNum,
    'deviceInfo': {
      'name': deviceInfo.name,
      'model': deviceInfo.model
    }
  };
  return payload;
};


export const prepareTdConfig = (tdConfig) => ({
  'depositPeriodList': tdConfig.depositPeriodList,
  'maturityInstructionList': tdConfig.maturityInstructionList,
  'minimumDeposit': tdConfig.minimumDeposit,
  'rate': tdConfig.rate,
  'tenorRate': tdConfig.tenorRate,
  'minimumDepositValas': tdConfig.minimumDepositValas,
  'rateValas': tdConfig.rateValas,
  'tenorRateAUD': tdConfig.tenorRateAUD,
  'tenorRateCNY': tdConfig.tenorRateCNY,
  'tenorRateEUR': tdConfig.tenorRateEUR,
  'tenorRateJPY': tdConfig.tenorRateJPY,
  'tenorRateSGD': tdConfig.tenorRateSGD,
  'tenorRateUSD': tdConfig.tenorRateUSD,
  'nisbahBank': tdConfig.nisbahBank,
  'nisbahCust': tdConfig.nisbahCust,
  'ecrRate': tdConfig.ecrRate,
});

export const prepareConfirmTdPayload = (data, depositPeriodList) => ({
  'accountFrom': String(result(data, 'accountNo.id', '')),
  'bankBranch': String(result(data, 'accountNo.bankBranch.code', '')),
  'productType': 'timeDeposit',
  'currency': String(result(data, 'accountNo.currency', '')),
  'initialDeposit': String(result(data, 'amount', '')),
  'depositPeriod': String(result(data, 'periodeList.code', '') ? result(data, 'periodeList.code', '') : depositPeriodList),
  'maturityInstruction': String(result(data, 'maturityType.value', ''))
});

export const prepareCreateTDPayload = (transRefNum, smsOtp, easyPin, simasToken) => ({
  'mPinInputed': String(smsOtp),
  'transRefNum': String(transRefNum),
  'easyPin': String(easyPin),
  'tokenInputed': String(simasToken)
});

export const prepareMiniStatement = (account) => ({
  accountNumber: String(account.accountNumber)
});

export const prepareTimeDeposit = (account) => ({
  accountFrom: stringify(account.id)
});

export const prepareCreditCart = (account) => ({
  accountId: parseInt(account.id)
});

export const prepareCreditCardBalance = (id) => ({
  accountId: parseInt(id)
});

export const getTimeDeposit = (timeDepositRawData) => ({
  maturityDate: timeDepositRawData.MaturityDate,
  interestRate: timeDepositRawData.NisbahCust || timeDepositRawData.InterestRate,
  maturityType: timeDepositRawData.MaturityType,
  maturityTypeNew: timeDepositRawData.MaturityTypeNew,
  principal: timeDepositRawData.Principal,
  isSharia: !!timeDepositRawData.NisbahCust,
  currency: timeDepositRawData.Currency,
  periode: timeDepositRawData.Periode,
  ecrRate: timeDepositRawData.ecrRate,
  NisbahBank: timeDepositRawData.NisbahBank,
});

export const getCreditCard = (creditCardRawData, selectedAccount) => {
  const dataArray = result(creditCardRawData, 'balances', []);
  const outstandingBalance = result(find(dataArray, {amountType: 'Current Outstanding'}), 'amount', '');
  const dueDate = dateFormatter(result(creditCardRawData, 'dueDate', ''), 'YYYY/MM/DD');
  const accountNumber = result(selectedAccount, 'accountNumber', '');
  const creditAvailable = result(find(dataArray, {amountType: 'Available Balance'}), 'amount', '');
  const creditLimit = result(find(dataArray, {amountType: 'Credit Limit'}), 'amount', '');
  const cardExpired = formatYearMonthDate(result(selectedAccount, 'expiryDate', ''));
  return {
    outstandingBalance: outstandingBalance,
    dueDate: dueDate,
    accountNumber: accountNumber,
    creditAvailable: creditAvailable,
    creditLimit: creditLimit,
    cardExpired: cardExpired
  };
};

export const getCreditCardCA = (creditCardRawData, selectedAccount) => {
  const dataArray = result(creditCardRawData, 'balances', []);
  const outstandingBalance = result(find(dataArray, {amountType: 'Current Outstanding'}), 'amount', '');
  const dueDate = dateFormatter(result(creditCardRawData, 'dueDate', ''), 'YYYY/MM/DD');
  const accountNumber = result(selectedAccount, 'accountNumber', '');
  const creditAvailable = result(find(dataArray, {amountType: 'Cash Advance Available'}), 'amount', '');
  const creditLimit = result(find(dataArray, {amountType: 'Credit Limit'}), 'amount', '');
  const cardExpired = formatYearMonthDate(result(selectedAccount, 'expiryDate', ''));
  return {
    outstandingBalance: outstandingBalance,
    dueDate: dueDate,
    accountNumber: accountNumber,
    creditAvailable: creditAvailable,
    creditLimit: creditLimit,
    cardExpired: cardExpired
  };
};

export const prepateTransRefNumPayload = (transactionId, shouldSendSmsOtp = true, transRefNum, transferMethodType, billpayMethodType, isbillerOtp, billerUniqueCode) => ({
  transactionType: String(transactionId),
  activateOtp: Boolean(shouldSendSmsOtp),
  transRefNum: String(transRefNum),
  transferMethodType: String(transferMethodType),
  billpayMethodType: String(billpayMethodType),
  isbillerOtp: isbillerOtp,
  billerUniqueCode: billerUniqueCode,
});

export const prepareChangePasswordPayload = (oldPassword, values, password) => {
  const randomNumber = randomString(16);
  OBM_EncryptChangePassword(oldPassword, values.confirmNewPassword, randomNumber);
  OBM_EncryptPassword(password, randomNumber);
  const payload = {
    'oldPassword': 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber,
    'newPassword': 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber,
    'confirmNewPassword': 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber,
    'deviceInfo': {
      'name': deviceInfo.name,
      'model': deviceInfo.model
    }
  };
  return payload;
};

export const prepareTransactionHistoryPayload = (accountNumber, transactionType, sendToMailBox = false) => {
  const transactionTypeMap = {
    lastMonth: '1MonthAgo',
    last2Months: '2MonthAgo',
    last3Months: '3MonthAgo'
  };
  return {
    accountNumber,
    period: transactionTypeMap[transactionType] || '1MonthAgo',
    sendToMailBox: String(!!sendToMailBox)
  };
};

export const prepareTransactionHistoryPayloadNew = (accountNumber, transactionType, sFromDate, sToDate, sendToMailBox, downloadPdf, ipassport, lang, month) => {
  const transactionTypeMap = {
    currentMonth: 'curMonth',
    today: 'today',
    selectMonth: 'monthly',
    selectDateRange: 'range',
  };
  return '?lang=' + lang + '&ipassport=' + ipassport + '&period=' + transactionTypeMap[transactionType] +
  '&accountNumber=' + accountNumber + '&sendToMailBox=' + String(!!sendToMailBox) + '&month=' + month +
  '&download=' + String(!!downloadPdf) + '&sToDate=' + sToDate + '&sFromDate=' + sFromDate;
};

export const prepareCcTransactionHistoryPayload = (accountNumber, sendEmail = false) => ({
  'accountNumber': String(accountNumber),
  'sendEmail': String(!!sendEmail)
});

export const prepareCcInstallmentHistoryPayload = (accountNumber) => ({
  'accountNumber': String(accountNumber)
});

export const prepareDownloadCcTransactionHistoryPayload = (accountNumber, month) => ({
  'accountNumber': String(accountNumber),
  'month': String(month)
});

export const prepareCcInstallmentPeriode = (accountNumber, amount) => ({
  'pan': String(accountNumber),
  'amount': String(amount)
});

export const prepareCcChangeInstallment = (accountNumber, amount, serverToken, transRefNum, sessionId, arn, schmeId, periode, formValues) => ({
  'pan': String(accountNumber),
  'txnAmt': String(amount),
  'serverToken': String(serverToken),
  'transrefnum': String(transRefNum),
  'sessionId': String(sessionId),
  'arn': String(arn),
  'schmeId': String(schmeId),
  'term': String(result(periode, 'term')),
  'installmentAmount': String(result(periode, 'installmentAmount[0]')),
  'interestRate': String(result(periode, 'interestRate[0]')),
  'txnDesc': String(result(formValues, 'label')),
  'txnDate': String(result(formValues, 'date'))
});

export const prepareCcGetTxnManage = (accountNumber) => ({
  'pan': String(accountNumber)
});

export const prepareCcTxnManage = (accountNumber, serverToken, transRefNum, sessionId, flagECommerce, flagCav, flagOverSeas, allowEcommTxn, allowCavTxn, allowOverseaTxn) => ({
  'pan': String(accountNumber),
  'serverToken': String(serverToken),
  'transrefnum': String(transRefNum),
  'sessionId': String(sessionId),
  'flagECommerce': String(flagECommerce),
  'flagCav': String(flagCav),
  'flagOverSeas': String(flagOverSeas),
  'allowEcommTxn': String(allowEcommTxn),
  'allowCavTxn': String(allowCavTxn),
  'allowOverseaTxn': String(allowOverseaTxn)
});

export const prepareCreditCardInquiryPayload = (ccEnquiryFormData) => ({
  'subscriberNoInput': String(ccEnquiryFormData.accNo),
  'idbillPay': Number(result(ccEnquiryFormData, 'billerPreferences.id')),
  'billerType': String(result(ccEnquiryFormData, 'billerPreferences.billerType')),
  'billerCode': String(result(ccEnquiryFormData, 'billerPreferences.code')),
  'billpayMethodType': String(result(ccEnquiryFormData, 'billpayMethodType')),
});

export const prepareCreditCardPayload = (ccFormData) => ({
  'idbillPay': Number(result(ccFormData, 'billerPreferences.id')),
  'billerType': String(result(ccFormData, 'billerPreferences.billerType')),
  'accountFrom': String(result(ccFormData, 'selectedAccount.id')),
  'amount': String(result(ccFormData, 'amount')),
  'subscriberNoInput': String(result(ccFormData, 'accNo')),
  'transRefNum': String(result(ccFormData, 'transRefNum')),
  'descInput': '',
  'securityTypeCode': '1',
  'billAmount': '',
  'variableBankCharges': '',
  'billPeriod': '',
  'smsOtp': String(result(ccFormData, 'smsOtp')),
  'easyPin': String(result(ccFormData, 'easyPin'))
});

export const getAppVersionDetails = (versionData) => ({
  minVersion: result(versionData, 'minimumVersion', ''),
  storeVersion: result(versionData, 'latestVersion', ''),
  desc: result(versionData, 'description', ''),
  dayCount: result(versionData, 'dayCount', null)
});

export const prepareAppVersionPayload = ({currentPlatform, currentAppVersion}) => ({
  currentVersion: currentAppVersion,
  devicePlatform: currentPlatform === 'ios' ? 'iOS' : 'Android'
});

export const prepareRequestBlockCreditCardPayload = (requestBlockCreditCardPayload = {}) => ({
  accountId: Number(result(requestBlockCreditCardPayload, 'accountNumber.id')),
  mPin: String(result(requestBlockCreditCardPayload, 'smsOtp')),
  transRefNum: String(result(requestBlockCreditCardPayload, 'transRefNum'))
});

export const prepareRequestCreditCardOptionPayload = (requestCreditCardOptionPayload = {}) => {
  const menu = result(requestCreditCardOptionPayload, 'label');
  return {
    accountId: Number(result(requestCreditCardOptionPayload, 'account.id')),
    cardName: String(result(requestCreditCardOptionPayload, 'creditCardName')),
    mPin: String(result(requestCreditCardOptionPayload, 'smsOtp')),
    transRefNum: String(result(requestCreditCardOptionPayload, 'transRefNum')),
    birthdate: String(result(requestCreditCardOptionPayload, 'creditCardBirth')),
    intlTrx: menu === 'TrxInt' ? String(result(requestCreditCardOptionPayload, 'status.value')) : null,
    ecommerce: menu === 'ECommerce' ? String(result(requestCreditCardOptionPayload, 'status.value')) : null,
    cashAdvance: menu === 'CashDrawal' ? String(result(requestCreditCardOptionPayload, 'status.value')) : null
  };
};

export const prepareRequestCreditCardChangeLimitPayload = (requestCreditCardLimitPayload = {}) => ({
  accountId: Number(result(requestCreditCardLimitPayload, 'account.id')),
  cardName: String(result(requestCreditCardLimitPayload, 'creditCardName')),
  mPin: String(result(requestCreditCardLimitPayload, 'smsOtp')),
  transRefNum: String(result(requestCreditCardLimitPayload, 'transRefNum')),
  birthdate: String(result(requestCreditCardLimitPayload, 'creditCardBirth')),
  newLimit: String(result(requestCreditCardLimitPayload, 'limit'))
});

export const prepareCloseTD = (requestCloseTDPayload = {}) => ({
  tdAccNumber: String(result(requestCloseTDPayload, 'accountNumber')),
  closeMode: String(result(requestCloseTDPayload, 'closeMode', 'futureDate')),
  reason: String(result(requestCloseTDPayload, 'reason', '')),
  breakDateStr: String(dateFormatter(result(requestCloseTDPayload, 'maturityDate'), 'YYYY-MM-DD')),
  transRefNum: String(result(requestCloseTDPayload, 'transRefNum')),
  easyPin: String(result(requestCloseTDPayload, 'easyPin')),
});

export const prepareQRPaymentPayload = (requestQRPaymentPayload = {}) => ({
  transRefNum: String(result(requestQRPaymentPayload, 'transRefNum')),
  accountFrom: String(result(requestQRPaymentPayload, 'myAccount.id')),
  mPinInputed: String(result(requestQRPaymentPayload, 'smsOtp')),
  easyPin: String(result(requestQRPaymentPayload, 'easyPin')),
  contents: prepareContentsQRPaymentPayload(
    result(requestQRPaymentPayload, 'invoice', []),
    result(requestQRPaymentPayload, 'userApiKey', '')
  ),
  currency: String(result(requestQRPaymentPayload, 'myAccount.currency')),
});

export const prepareContentsQRPaymentPayload = (requestContentsQRPaymentPayload = [], userApiKey) => {
  if (isArray(requestContentsQRPaymentPayload)) {
    if (requestContentsQRPaymentPayload.length !== 0) {
      const lengthPaidAmount = 16 - requestContentsQRPaymentPayload[3].length;
      let paidAmount = '';
      for (let i = 0; i < lengthPaidAmount; i++) {
        paidAmount = paidAmount + `${'0'}`;
      }
      const paidAmountFinal = `${paidAmount}${requestContentsQRPaymentPayload[3]}${'00'}`;

      const lengthAmountOfDiscount = 12 - requestContentsQRPaymentPayload[4].length;
      let amountOfDiscount = '';
      for (let i = 0; i < lengthAmountOfDiscount; i++) {
        amountOfDiscount = amountOfDiscount + `${'0'}`;
      }
      const amountOfDiscountFinal = `${amountOfDiscount}${requestContentsQRPaymentPayload[4]}`;

      const lengthNumberOfCoupon = 3 - requestContentsQRPaymentPayload[6].length;
      let numberOfCoupon = '';
      for (let i = 0; i < lengthNumberOfCoupon; i++) {
        numberOfCoupon = numberOfCoupon + `${'0'}`;
      }
      const numberOfCouponFinal = `${numberOfCoupon}${requestContentsQRPaymentPayload[6]}`;

      const lengthDiscountType = 20 - requestContentsQRPaymentPayload[5].length;
      let discountType = '';
      for (let i = 0; i < lengthDiscountType; i++) {
        discountType = discountType + `${' '}`;
      }
      const discountTypeFinal = `${requestContentsQRPaymentPayload[5]}${discountType}`;

      const lengthLoyaltyProgramName = 40 - requestContentsQRPaymentPayload[7].length;
      let loyaltyProgramName = '';
      for (let i = 0; i < lengthLoyaltyProgramName; i++) {
        loyaltyProgramName = loyaltyProgramName + `${' '}`;
      }
      const loyaltyProgramNameFinal = `${requestContentsQRPaymentPayload[7]}${loyaltyProgramName}`;

      const lengthPointRedeemed = 12 - requestContentsQRPaymentPayload[9].length;
      let pointRedeemed = '';
      for (let i = 0; i < lengthPointRedeemed; i++) {
        pointRedeemed = pointRedeemed + `${'0'}`;
      }
      const pointRedeemedFinal = `${pointRedeemed}${requestContentsQRPaymentPayload[9]}`;

      const lengthAmountRedeemed = 12 - requestContentsQRPaymentPayload[10].length;
      let amountRedeemed = '';
      for (let i = 0; i < lengthAmountRedeemed; i++) {
        amountRedeemed = amountRedeemed + `${'0'}`;
      }
      const amountRedeemedFinal = `${amountRedeemed}${requestContentsQRPaymentPayload[10]}`;

      const lengthTipAmount = 18 - requestContentsQRPaymentPayload[8].length;
      let tipAmount = '';
      for (let i = 0; i < lengthTipAmount; i++) {
        tipAmount = tipAmount + `${'0'}`;
      }
      const tipAmountFinal = `${tipAmount}${requestContentsQRPaymentPayload[8]}`;

      let merchantAPIKey = '';
      for (let i = 0; i < 40; i++) {
        merchantAPIKey = merchantAPIKey + `${' '}`;
      }

      const lengthMerchantName = 40 - requestContentsQRPaymentPayload[1].length;
      let merchantName = '';
      for (let i = 0; i < lengthMerchantName; i++) {
        merchantName = merchantName + `${' '}`;
      }
      const merchantNameFinal = `${requestContentsQRPaymentPayload[1]}${merchantName}`;

      return [{
        'id': 'DE4',
        'value': paidAmountFinal
      }, {
        'id': 'DE7',
        'value': String(dateFormatter(new Date().getTime(), 'MMDDhhmmss'))
      }, {
        'id': 'DE32',
        'value': '153'
      }, {
        'id': 'DE33',
        'value': '153'
      }, {
        'id': 'DE43',
        'value': merchantNameFinal
      }, {
        'id': 'DE48',
        'value': String(userApiKey)
      }, {
        'id': 'DE54',
        'value': tipAmountFinal
      }, {
        'id': 'DE61',
        'value': String(requestContentsQRPaymentPayload[0])
      }, {
        'id': 'DE62',
        'value': `${merchantAPIKey}${amountOfDiscountFinal}${numberOfCouponFinal}${discountTypeFinal}${loyaltyProgramNameFinal}${pointRedeemedFinal}${amountRedeemedFinal}`
      }, {
        'id': 'DE98',
        'value': '33'
      }];
    } else {
      return [];
    }
  } else {
    return [];
  }
};

export const getFundTransferHistory = (id, rawData) => ({
  accountNumber: result(rawData, 'accountNumber'),
  name: result(rawData, 'name'),
  bank: result(rawData, 'bank'),
  id: (id) ? id : result(rawData, 'id')
});

export const getCreditCardTransferHistory = (id, rawData) => ({
  accNo: result(rawData, 'accNo'),
  name: result(rawData, 'name'),
  bank: result(rawData, 'bank'),
  id: (id) ? id : result(rawData, 'id')
});

export const getWaterBillHistory = (rawData) => ({
  areaCode: result(rawData, 'areaCode'),
  consumerNo: result(rawData, 'consumerNo'),
  waterBiller: result(rawData, 'waterBiller')
});

export const getElectricityBillHistory = (rawData) => ({
  meterNo: result(rawData, 'meterNo', ''),
  biller: {
    id: result(rawData, 'biller.id'),
    name: result(rawData, 'biller.name'),
    billerPreferences: {
      billerType: result(rawData, 'biller.billerPreferences.billerType', ''),
      code: result(rawData, 'biller.billerPreferences.code', ''),
    }
  }
});

export const getMobilePostpaidHistory = (rawData) => ({
  mobileNo: result(rawData, 'mobileNo'),
  biller: {
    id: result(rawData, 'biller.id'),
    name: result(rawData, 'biller.name')
  }
});

export const getMobileTopupHistory = (rawData) => ({
  subscriberNoInput: result(rawData, 'subscriberNoInput'),
  amount: result(rawData, 'amount'),
  biller: {
    id: result(rawData, 'biller.id'),
    name: result(rawData, 'biller.name'),
    billerPreferences: result(rawData, 'biller.billerPreferences'),
    denomList: result(rawData, 'biller.denomList'),
  }
});

export const getEFormNTB = (rawData) => ({
  'formid': result(rawData, 'formid'),
  'fullName': result(rawData, 'fullName'),
  'birthDate': result(rawData, 'birthDate'),
  'idCardNumber': result(rawData, 'idCardNumber'),
  'postalCodeId': result(rawData, 'formData.formData.formData.postalCode'),
  'email': result(rawData, 'formData.formData.formData.email'),
  'mobilePhoneNumberId': result(rawData, 'formData.formData.formData.phone'),
  'benefitProgram': result(rawData, 'formData.formData.savingType.value') ? result(rawData, 'formData.formData.savingType.value') : result(rawData, 'formData.typeSaving.value'),
  'checkbox-toc': true,
  'captchaInput': result(rawData, 'captchaInput.captchaInput'),
  'captchaId': result(rawData, 'captchaId'),
  'lang': 'ID'
});
export const prepareGenericBillerTypeOneEnquiryPayload = (genericBillerTypeOneEnquiryFormData) => ({
  // 'subscriberNoInput': '510400064594',
  // 'idbillPay': 40,
  // 'billerType': '1'
  'subscriberNoInput': String(result(genericBillerTypeOneEnquiryFormData, 'subscriberNo')),
  'idbillPay': Number(result(genericBillerTypeOneEnquiryFormData, 'selectedBiller.id')),
  'billerType': String(result(genericBillerTypeOneEnquiryFormData, 'selectedBiller.billerPreferences.billerType'), '')
});

export const prepareGenericBillerTypeOnePayload = (billerTypeOnePayload = {}) => {
  let easyPin = String(result(billerTypeOnePayload, 'easyPin', ''));
  const randomNumber = randomString(16);
  OBM_EncryptPassword(easyPin, randomNumber);
  if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
  return (
    {
      'subscriberNoInput': String(result(billerTypeOnePayload, 'subscriberNo', '')),
      'idbillPay': Number(result(billerTypeOnePayload, 'biller.id')),
      'billerType': String(result(billerTypeOnePayload, 'biller.billerPreferences.billerType', '')),
      'accountFrom': String(result(billerTypeOnePayload, 'selectedAccount.id')),
      'mPinInputed': String(result(billerTypeOnePayload, 'smsOtp')),
      'transRefNum': String(result(billerTypeOnePayload, 'transRefNum')),
      'amount': String(result(billerTypeOnePayload, 'amount', '0')),
      'billAmount': String(result(billerTypeOnePayload, 'billAmount', '0')),
      'descInput': String(result(billerTypeOnePayload, 'description', '')),
      'securityTypeCode': '1',
      'tokenInputed': String(result(billerTypeOnePayload, 'simasToken', '')),
      'isFavorite': String(result(billerTypeOnePayload, 'isFavorite', '')),
      'easyPin': easyPin,
      'uniqueCode': String(result(billerTypeOnePayload, 'uniqueCode', '')),
    });
};

export const prepareGenericBillerTypeSixEnquiryPayload = (genericBillerTypeOneEnquiryFormData) => ({
  'idbillPay': Number(result(genericBillerTypeOneEnquiryFormData, 'selectedBiller.id')),
  'billerType': String(result(genericBillerTypeOneEnquiryFormData, 'selectedBiller.billerPreferences.billerType'), '')
});

export const prepareGenericBillerTypeSixPayload = (billerTypeSixPayload = {}) => {
  const isUsingPackageCode = result(billerTypeSixPayload, 'biller.billerPreferences.isUsingPackageCode', '');
  const isPrepaidOpenAmount = result(billerTypeSixPayload, 'biller.billerPreferences.isPrepaidOpenAmount', '');
  const billerInqMenu = result(billerTypeSixPayload, 'biller.billerPreferences.billerInqMenu', '');
  let easyPin = String(result(billerTypeSixPayload, 'easyPin', ''));
  const randomNumber = randomString(16);
  OBM_EncryptPassword(easyPin, randomNumber);
  if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
  if (isUsingPackageCode === '1') {
    return ({
      'subscriberNoInput': String(result(billerTypeSixPayload, 'subscriberNo', '')),
      'idbillPay': Number(result(billerTypeSixPayload, 'biller.id', '')),
      'billerType': String(result(billerTypeSixPayload, 'biller.billerPreferences.billerType', '')),
      'accountFrom': String(result(billerTypeSixPayload, 'selectedAccount.id', '')),
      'mPinInputed': String(result(billerTypeSixPayload, 'smsOtp', '')),
      'transRefNum': String(result(billerTypeSixPayload, 'transRefNum', '')),
      'amount': String(result(billerTypeSixPayload, 'amount', '0', '')),
      'packageCode': String(result(billerTypeSixPayload, 'packageCode', '')),
      'denomInput': String(result(billerTypeSixPayload, 'amount', '0')),
      'securityTypeCode': '1',
      'subProductCode': String(result(billerTypeSixPayload, 'subProductCode', '')),
      'tokenInputed': String(result(billerTypeSixPayload, 'simasToken', '')),
      'descInput': String(result(billerTypeSixPayload, 'description', '')),
      'isFavorite': String(result(billerTypeSixPayload, 'isFavorite', '')),
      'easyPin': easyPin,
      'uniqueCode': String(result(billerTypeSixPayload, 'uniqueCode', '')),
      'isbillerOtp': result(billerTypeSixPayload, 'isbillerOtp', false),
      'billerUniqueCode': String(result(billerTypeSixPayload, 'billerUniqueCode', '')),
    });
  } else if (isPrepaidOpenAmount === '1') {
    return ({
      'subscriberNoInput': String(result(billerTypeSixPayload, 'subscriberNo', '')),
      'idbillPay': Number(result(billerTypeSixPayload, 'biller.id', '')),
      'billerType': String(result(billerTypeSixPayload, 'biller.billerPreferences.billerType', '')),
      'accountFrom': String(result(billerTypeSixPayload, 'selectedAccount.id', '')),
      'mPinInputed': String(result(billerTypeSixPayload, 'smsOtp', '')),
      'transRefNum': String(result(billerTypeSixPayload, 'transRefNum', '')),
      'easyPin': easyPin,
      'amount': String(result(billerTypeSixPayload, 'amount', '0')),
      'denomInput': String(result(billerTypeSixPayload, 'amount', '0')),
      'securityTypeCode': '1',
      'tokenInputed': String(result(billerTypeSixPayload, 'simasToken', '')),
      'descInput': String(result(billerTypeSixPayload, 'description', '')),
      'isFavorite': String(result(billerTypeSixPayload, 'isFavorite', '')),
      'uniqueCode': String(result(billerTypeSixPayload, 'uniqueCode', '')),
      'isbillerOtp': result(billerTypeSixPayload, 'isbillerOtp', false),
      'billerUniqueCode': String(result(billerTypeSixPayload, 'billerUniqueCode', '')),
    });
  } else if (billerInqMenu) {
    return ({
      'subscriberNoInput': String(result(billerTypeSixPayload, 'subscriberNo', '')),
      'idbillPay': Number(result(billerTypeSixPayload, 'biller.id', '')),
      'billerType': String(result(billerTypeSixPayload, 'biller.billerPreferences.billerType', '')),
      'accountFrom': String(result(billerTypeSixPayload, 'selectedAccount.id', '')),
      'mPinInputed': String(result(billerTypeSixPayload, 'smsOtp', '')),
      'transRefNum': String(result(billerTypeSixPayload, 'transRefNum', '')),
      'easyPin': easyPin,
      'amount': String(result(billerTypeSixPayload, 'amount', '0')),
      'denomInput': String(result(billerTypeSixPayload, 'amount', '0')),
      'securityTypeCode': '1',
      'tokenInputed': String(result(billerTypeSixPayload, 'simasToken', '')),
      'descInput': String(result(billerTypeSixPayload, 'description', '')),
      'isFavorite': String(result(billerTypeSixPayload, 'isFavorite', '')),
      'uniqueCode': String(result(billerTypeSixPayload, 'uniqueCode', '')),
      'isbillerOtp': result(billerTypeSixPayload, 'isbillerOtp', false),
      'billerUniqueCode': String(result(billerTypeSixPayload, 'billerUniqueCode', '')),
    });
  } else {
    return ({
      'subscriberNoInput': String(result(billerTypeSixPayload, 'subscriberNo', '')),
      'idbillPay': Number(result(billerTypeSixPayload, 'biller.id', '')),
      'billerType': String(result(billerTypeSixPayload, 'biller.billerPreferences.billerType', '')),
      'accountFrom': String(result(billerTypeSixPayload, 'selectedAccount.id', '')),
      'mPinInputed': String(result(billerTypeSixPayload, 'smsOtp', '')),
      'transRefNum': String(result(billerTypeSixPayload, 'transRefNum', '')),
      'easyPin': easyPin,
      'amount': String(result(billerTypeSixPayload, 'denomination.id', '0')),
      'denomInput': String(result(billerTypeSixPayload, 'denomination.id', '0')),
      'securityTypeCode': '1',
      'tokenInputed': String(result(billerTypeSixPayload, 'simasToken', '')),
      'descInput': String(result(billerTypeSixPayload, 'description', '')),
      'isFavorite': String(result(billerTypeSixPayload, 'isFavorite', '')),
      'uniqueCode': String(result(billerTypeSixPayload, 'uniqueCode', '')),
      'isbillerOtp': result(billerTypeSixPayload, 'isbillerOtp', false),
      'billerUniqueCode': String(result(billerTypeSixPayload, 'billerUniqueCode', '')),
    });
  }
};

export const prepareGenericBillerTypeTenEnquiryPayload = (genericBillerTypeTenEnquiryFormData) => {
  if (String(result(genericBillerTypeTenEnquiryFormData, 'selectedBiller.billerPreferences.isOpenMonth')) === '1') {
    return ({
      'subscriberNoInput': String(result(genericBillerTypeTenEnquiryFormData, 'month.value')) + String(result(genericBillerTypeTenEnquiryFormData, 'subscriberNo')),
      'idbillPay': Number(result(genericBillerTypeTenEnquiryFormData, 'selectedBiller.id')),
      'billerType': String(result(genericBillerTypeTenEnquiryFormData, 'selectedBiller.billerPreferences.billerType'), '')
    });
  } else {
    return ({
      'subscriberNoInput': String(result(genericBillerTypeTenEnquiryFormData, 'subscriberNo')),
      'idbillPay': Number(result(genericBillerTypeTenEnquiryFormData, 'selectedBiller.id')),
      'billerType': String(result(genericBillerTypeTenEnquiryFormData, 'selectedBiller.billerPreferences.billerType'), ''),
      'areaCode': String(result(genericBillerTypeTenEnquiryFormData, 'areaCode.id'), ''),
      'yearPeriod': String(result(genericBillerTypeTenEnquiryFormData, 'selectedBiller.name'), '') === 'PBB' ? String(result(genericBillerTypeTenEnquiryFormData, 'billPeriod.id'), '') : null,
    });
  }
};

export const prepareGenericBillerTypeTenPayload = (billerTypeTenPayload = {}) => {
  let easyPin = String(result(billerTypeTenPayload, 'easyPin', ''));
  const randomNumber = randomString(16);
  OBM_EncryptPassword(easyPin, randomNumber);
  if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
  const subscriberNo = String(result(billerTypeTenPayload, 'selectedBiller.billerPreferences.isOpenMonth')) === '1' ?
    String(result(billerTypeTenPayload, 'month.value')) + String(result(billerTypeTenPayload, 'subscriberNo')) :
    String(result(billerTypeTenPayload, 'subscriberNo', ''));
  return ({
    'subscriberNoInput': String(subscriberNo),
    'idbillPay': Number(result(billerTypeTenPayload, 'biller.id', '')),
    'billerType': String(result(billerTypeTenPayload, 'biller.billerPreferences.billerType', '')),
    'accountFrom': String(result(billerTypeTenPayload, 'selectedAccount.id', '')),
    'mPinInputed': String(result(billerTypeTenPayload, 'smsOtp', '')),
    'transRefNum': String(result(billerTypeTenPayload, 'transRefNum', '')),
    'easyPin': easyPin,
    'amount': String(result(billerTypeTenPayload, 'amount', '0')),
    'billAmount': String(result(billerTypeTenPayload, 'billAmount', '0')),
    'descInput': String(result(billerTypeTenPayload, 'description', '')),
    'securityTypeCode': '1',
    'tokenInputed': String(result(billerTypeTenPayload, 'simasToken', '')),
    'areaCode': String(result(billerTypeTenPayload, 'areaCode.id', '')),
    'isFavorite': String(result(billerTypeTenPayload, 'isFavorite', '')),
  });
};

export const prepareGenericBillerTypeThreePayload = (billerTypeThreePayload = {}) => {
  let easyPin = String(result(billerTypeThreePayload, 'easyPin', ''));
  const randomNumber = randomString(16);
  OBM_EncryptPassword(easyPin, randomNumber);
  if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;

  return (
    {
      'subscriberNoInput': String(result(billerTypeThreePayload, 'subscriberNo', '')),
      'idbillPay': Number(result(billerTypeThreePayload, 'biller.id', '')),
      'billerType': String(result(billerTypeThreePayload, 'biller.billerPreferences.billerType', '')),
      'accountFrom': String(result(billerTypeThreePayload, 'selectedAccount.id', '')),
      'mPinInputed': String(result(billerTypeThreePayload, 'smsOtp', '')),
      'transRefNum': String(result(billerTypeThreePayload, 'transRefNum', '')),
      'easyPin': easyPin,
      'amount': String(result(billerTypeThreePayload, 'amount', '0')),
      'descInput': String(result(billerTypeThreePayload, 'description', '')),
      'securityTypeCode': '1',
      'tokenInputed': String(result(billerTypeThreePayload, 'simasToken', '')),
      'billPeriod': String(result(billerTypeThreePayload, 'billPeriod', '')),
      'isFavorite': String(result(billerTypeThreePayload, 'isFavorite', '')),
    });
};

export const prepareGenericBillerTypeTwoPayload = (billerTypeTwoPayload = {}) => {
  let easyPin = String(result(billerTypeTwoPayload, 'easyPin', ''));
  const randomNumber = randomString(16);
  OBM_EncryptPassword(easyPin, randomNumber);
  if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
  return (
    {
      'subscriberNoInput': String(result(billerTypeTwoPayload, 'subscriberNo', '')),
      'idbillPay': Number(result(billerTypeTwoPayload, 'biller.id', null)),
      'billerType': String(result(billerTypeTwoPayload, 'biller.billerPreferences.billerType', '')),
      'accountFrom': String(result(billerTypeTwoPayload, 'selectedAccount.id', '')),
      'mPinInputed': String(result(billerTypeTwoPayload, 'smsOtp', '')),
      'transRefNum': String(result(billerTypeTwoPayload, 'transRefNum', '')),
      'amount': String(result(billerTypeTwoPayload, 'amount', '0')),
      'descInput': String(result(billerTypeTwoPayload, 'description', '')),
      'securityTypeCode': '1',
      'tokenInputed': String(result(billerTypeTwoPayload, 'simasToken', '')),
      'isFavorite': String(result(billerTypeTwoPayload, 'isFavorite', '')),
      'easyPin': easyPin,
    });
};

export const prepareGenericBillerTypeEightEnquiryPayload = (genericBillerTypeEightEnquiryFormData) => ({
  'subscriberNoInput': String(result(genericBillerTypeEightEnquiryFormData, 'subscriberNo')),
  'idbillPay': Number(result(genericBillerTypeEightEnquiryFormData, 'selectedBiller.id')),
  'billerType': String(result(genericBillerTypeEightEnquiryFormData, 'selectedBiller.billerPreferences.billerType'), '')
});

export const prepareGenericBillerTypeEightPayload = (billerTypeEightPayload = {}) => {
  let easyPin = String(result(billerTypeEightPayload, 'easyPin', ''));
  const randomNumber = randomString(16);
  OBM_EncryptPassword(easyPin, randomNumber);
  if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
  return (
    {
      'subscriberNoInput': String(result(billerTypeEightPayload, 'subscriberNo', '')),
      'idbillPay': Number(result(billerTypeEightPayload, 'biller.id', '')),
      'billerType': String(result(billerTypeEightPayload, 'biller.billerPreferences.billerType', '')),
      'accountFrom': String(result(billerTypeEightPayload, 'selectedAccount.id', '')),
      'easyPin': easyPin,
      'mPinInputed': String(result(billerTypeEightPayload, 'smsOtp', '')),
      'transRefNum': String(result(billerTypeEightPayload, 'transRefNum', '')),
      'amount': String(result(billerTypeEightPayload, 'billAmount', '0')),
      'billAmount': String(result(billerTypeEightPayload, 'billAmount', '0')),
      'descInput': String(result(billerTypeEightPayload, 'description', '')),
      'securityTypeCode': '1',
      'tokenInputed': String(result(billerTypeEightPayload, 'simasToken', '')),
      'isFavorite': String(result(billerTypeEightPayload, 'isFavorite', '')),
      'uniqueCode': String(result(billerTypeEightPayload, 'uniqueCode', '')),
    });
};

export const prepareGenericBillerTypeNineEnquiryPayload = (genericBillerTypeNineEnquiryFormData) => ({
  'subscriberNoInput': String(result(genericBillerTypeNineEnquiryFormData, 'subscriberNo')),
  'idbillPay': Number(result(genericBillerTypeNineEnquiryFormData, 'selectedBiller.id')),
  'billerType': String(result(genericBillerTypeNineEnquiryFormData, 'selectedBiller.billerPreferences.billerType'), '')
});

export const prepareGenericBillerTypeNinePayload = (billerTypeNinePayload = {}) => {
  let easyPin = String(result(billerTypeNinePayload, 'easyPin', ''));
  const randomNumber = randomString(16);
  OBM_EncryptPassword(easyPin, randomNumber);
  if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
  return (
    {
      'subscriberNoInput': String(result(billerTypeNinePayload, 'subscriberNo', '')),
      'idbillPay': Number(result(billerTypeNinePayload, 'biller.id', '')),
      'billerType': String(result(billerTypeNinePayload, 'biller.billerPreferences.billerType', '')),
      'accountFrom': String(result(billerTypeNinePayload, 'selectedAccount.id', '')),
      'easyPin': easyPin,
      'mPinInputed': String(result(billerTypeNinePayload, 'smsOtp', '')),
      'transRefNum': String(result(billerTypeNinePayload, 'transRefNum', '')),
      'amount': String(result(billerTypeNinePayload, 'denomination.id', '0')),
      'denomInput': String(result(billerTypeNinePayload, 'denomination.id', '0')),
      'securityTypeCode': '1',
      'tokenInputed': String(result(billerTypeNinePayload, 'simasToken', '')),
      'descInput': String(result(billerTypeNinePayload, 'description', '')),
      'isFavorite': String(result(billerTypeNinePayload, 'isFavorite', '')),
    });
};

export const prepareGetMerchantList = (position) => ({
  'additionalUrl': '/rest/nearbyStore.html?issuerCode=168&lat=' + String(result(position, 'latitude', '')) + '&lng=' + String(result(position, 'longitude', '')) + '&radius=1500&logo=true&limit=50'
});

export const prepareQRPaymentInvoicePayload = (invoiceData = {}) => ({
  'contents': result(invoiceData, 'invoiceDetail', {}),
  'tipAmount': String(result(invoiceData, 'tipAmount', '')),
  'accountFrom': String(result(invoiceData, 'selectedAccount.id')),
  'mPinInputed': String(result(invoiceData, 'smsOtp')),
  'transRefNum': String(result(invoiceData, 'transRefNum')),
  'easyPin': String(result(invoiceData, 'easyPin')),
  'tokenInputed': String(result(invoiceData, 'simasToken', '')),
  'discount': String(result(invoiceData, 'discount', '')),
  'totalCouponAmount': String(result(invoiceData, 'totalCouponAmount', '')),
  'totalAmount': String(result(invoiceData, 'totalAmount', ''))
});

export const prepareGenericBillerTypeSevenEnquiryPayload = (genericBillerTypeSevenEnquiryFormData) => ({
  'subscriberNoInput': String(genericBillerTypeSevenEnquiryFormData.subscriberNo),
  'idbillPay': Number(result(genericBillerTypeSevenEnquiryFormData, 'selectedBiller.id')),
  'billerType': String(result(genericBillerTypeSevenEnquiryFormData, 'selectedBiller.billerPreferences.billerType'), '')
});

export const prepareGenericBillerTypeSevenPayload = (billerTypeSevenPayload = {}) => {
  let easyPin = String(result(billerTypeSevenPayload, 'easyPin', ''));
  const randomNumber = randomString(16);
  OBM_EncryptPassword(easyPin, randomNumber);
  if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
  return (
    {
      'subscriberNoInput': String(result(billerTypeSevenPayload, 'subscriberNo', '')),
      'idbillPay': Number(result(billerTypeSevenPayload, 'biller.id', '')),
      'billerType': String(result(billerTypeSevenPayload, 'biller.billerPreferences.billerType', '')),
      'accountFrom': String(result(billerTypeSevenPayload, 'selectedAccount.id', '')),
      'mPinInputed': String(result(billerTypeSevenPayload, 'smsOtp', '')),
      'transRefNum': String(result(billerTypeSevenPayload, 'transRefNum', '')),
      'tokenInputed': String(result(billerTypeSevenPayload, 'simasToken', '')),
      'securityTypeCode': '1',
      'amount': String(result(billerTypeSevenPayload, 'denomination.value', result(billerTypeSevenPayload, 'billAmount', ''))), // for prepaid
      'billAmount': String(result(billerTypeSevenPayload, 'denomination.value', result(billerTypeSevenPayload, 'billAmount', ''))), // for postpaid/non-taglist
      'descInput': String(result(billerTypeSevenPayload, 'description', '')),
      'isFavorite': String(result(billerTypeSevenPayload, 'isFavorite', '')),
      'easyPin': easyPin,
    });
};

export const prepareDataDetail = (data = {}, biller = {}) => {
  const dataDetailList = data;
  const subscriberNoText = generateLanguageGenericBiller(result(biller, 'billerPreferences.paymentSubscriberNoKey') || result(biller, 'billerPreferences.purchaseSubscriberNoKey', ''));
  return [
    {'value': result(dataDetailList, 'subscriberNoInput', ''), 'key': subscriberNoText},
    {'value': String(currencyFormatter(result(dataDetailList, 'amountNumber', ''))), 'key': 'DETAIL__AMOUNT'},
    {'value': String(currencyFormatter(result(dataDetailList, 'totalBankCharge', ''))), 'key': 'DETAIL__BANK_CHARGE'},
    {'value': String(currencyFormatter(result(dataDetailList, 'totalAmountDebited', ''))), 'key': 'DETAIL__TOTAL_AMOUNT_DEBITED'},
  ];
};


export const prepareDataDetailTransferCC = (transferFormData = {}, payeeAccount = {}, type = '', resData = {}, initiatedTime = '') => {
  if (type === 'cardlessWithdrawal') {
    return [
      {'key': 'CARDLESSWITHDRAWAL__WITHDRAWAL_FROM', 'value': startCase(result(transferFormData, 'myAccount.productType', 'NIL')) + '\n' + result(transferFormData, 'myAccount.accountNumber', 'NIL')},
      {'key': 'CARDLESSWITHDRAWAL__WITHDRAWAL_USING', 'value': result(payeeAccount, 'phoneNumber', 'NA') + '\n' + startCase(result(payeeAccount, 'description', 'NA'))},
      {'key': 'CARDLESSWITHDRAWAL__INITIATION_DATE', 'value': new Date().toDateString()},
      {'key': 'CARDLESSWITHDRAWAL__NOTES', 'value': result(transferFormData, 'note', '')},
      {'key': 'CARDLESSWITHDRAWAL__FEES', 'value': currencyFormatter(result(resData, 'transferTransaction.bankCharge', 0)) + '\n' + startCase(result(resData, 'transferTransaction.mode', ''))},
      {'key': 'CARDLESSWITHDRAWAL__WITHDRAWAL_AMOUNT', 'value': currencyFormatter(result(transferFormData, 'amount', 0))},
    ];
  } else   if (type === 'creditCard') {
    const targetAccount = result(resData, 'transferTransaction.targetAccountObject', {});
    return [
      {'key': 'CREDIT_CARD__PAYING_FROM', 'value': startCase(result(transferFormData, 'myAccount.productType', 'NIL')) + '\n' + result(transferFormData, 'myAccount.accountNumber', 'NIL')},
      {'key': 'CREDIT_CARD__ACCOUNT_HOLDER', 'value': startCase(result(targetAccount, 'name', 'NA'))},
      {'key': 'CREDIT_CARD__ACCOUNT_NUMBER', 'value': result(targetAccount, 'accountNumber', 'NA') + '\n' + startCase(result(targetAccount, 'bankName', 'NA'))},
      {'key': 'CREDIT_CARD__TRANSFER_MODE', 'value': startCase(result(resData, 'transferTransaction.mode', ''))},
      {'key': 'CREDIT_CARD__PAYMENT_FEE', 'value': currencyFormatter(result(resData, 'transferTransaction.bankCharge', 0))},
      {'key': 'CREDIT_CARD__PAYMENT_AMOUNT', 'value': currencyFormatter(result(transferFormData, 'amount', 0))},
    ];
  } else {
    const targetAccount = result(resData, 'transferTransaction.targetAccountObject', {});
    const isSimas = result(targetAccount, 'detailNetworkCode', '') === '153';
    const isUnknownAccount = result(targetAccount, 'accountType', '') === 'UnknownAccount' || isEmpty(result(targetAccount, 'accountType', ''));
    const targetAccountType = isSimas ?
      isUnknownAccount ? result(targetAccount, 'bankName', 'NA').toUpperCase() : startCase(result(targetAccount, 'accountType', 'NA'))
      : result(targetAccount, 'bankName', 'NA').toUpperCase();
    const schedule = result(resData, 'detailScheduledTransfer.transferScheduled', '');
    const repeat = result(resData, 'detailScheduledTransfer.transferRepetition', 0);
    if (type === 'topUpSil') {
      const currentCurrency = result(payeeAccount, 'currency', '');
      const amount = formatForexAmountPaymentStatus(result(transferFormData, 'amount', ''), currentCurrency);
      const exchangeRate = result(resData, 'transferTransaction.currencyRateDisplay', 0);
      const equvalenTo = result(resData, 'transferTransaction.amountInDebitCurr', 0);
      return [
        {'key': 'TOPUPSIL__TRANSFER_FROM', 'value': startCase(result(transferFormData, 'myAccount.productType', 'NIL')) + '\n' + result(transferFormData, 'myAccount.accountNumber', 'NIL')},
        {'key': 'TRANSFER__TRANSFER_TO', 'value': startCase(result(targetAccount, 'name', 'NA')) + '\n' + targetAccountType + '\n' + result(targetAccount, 'accountNumber', 'NA')},
        {'key': 'TRANSFER__INITIATION_DATE', 'value': initiatedTime},
        {'key': 'TRANSFER__NOTES', 'value': result(transferFormData, 'note', '')},
        {'key': 'TRANSFER__TRANSFER_FEE', 'value': currencyFormatter(result(resData, 'transferTransaction.bankCharge', 0)) + '\n' + startCase(result(resData, 'transferTransaction.mode', ''))},
        {'key': 'TRANSFER__TRANSFER_AMOUNT', 'value': amount},
        {'key': 'TRANSFER__CURRENCY', 'value': currentCurrency},
        {'key': 'TRANSFER__EXCHANGE_RATE', 'value': exchangeRate},
        {'key': 'TRANSFER__EQUIVALEN_TO', 'value': equvalenTo},
      ];
    } else if (type === 'nbSil') {
      const currentCurrency = result(payeeAccount, 'currency', '');
      const amount = formatForexAmountPaymentStatus(result(transferFormData, 'amount', ''), currentCurrency);
      const exchangeRate = result(resData, 'transferTransaction.currencyRateDisplay', 0);
      const equvalenTo = result(resData, 'transferTransaction.amountInDebitCurr', 0);
      return [
        {'key': 'NBSIL__TRANSFER_FROM', 'value': startCase(result(transferFormData, 'myAccount.productType', 'NIL')) + '\n' + result(transferFormData, 'myAccount.accountNumber', 'NIL')},
        {'key': 'TRANSFER__TRANSFER_TO', 'value': startCase(result(targetAccount, 'name', 'NA')) + '\n' + targetAccountType + '\n' + result(targetAccount, 'accountNumber', 'NA')},
        {'key': 'TRANSFER__INITIATION_DATE', 'value': initiatedTime},
        {'key': 'TRANSFER__NOTES', 'value': result(transferFormData, 'note', '')},
        {'key': 'TRANSFER__TRANSFER_FEE', 'value': currencyFormatter(result(resData, 'transferTransaction.bankCharge', 0)) + '\n' + startCase(result(resData, 'transferTransaction.mode', ''))},
        {'key': 'TRANSFER__TRANSFER_AMOUNT', 'value': amount},
        {'key': 'TRANSFER__CURRENCY', 'value': currentCurrency},
        {'key': 'TRANSFER__EXCHANGE_RATE', 'value': exchangeRate},
        {'key': 'TRANSFER__EQUIVALEN_TO', 'value': equvalenTo},
      ];
    } else if (type === 'remmitance') {
      if (repeat === 0) {
        return [
          {'key': 'TRANSFER__TRANSFER_FROM', 'value': startCase(result(transferFormData, 'myAccount.productType', 'NIL')) + '\n' + result(transferFormData, 'myAccount.accountNumber', 'NIL')},
          {'key': 'TRANSFER__TRANSFER_TO', 'value': startCase(result(targetAccount, 'name', 'NA')) + '\n' + targetAccountType + '\n' + result(targetAccount, 'accountNumber', 'NA')},
          {'key': 'TRANSFER__INITIATION_DATE', 'value': initiatedTime},
          {'key': 'TRANSFER__NOTES', 'value': result(transferFormData, 'note', '')},
          {'key': 'TRANSFER__TRANSFER_FEE', 'value': currencyFormatter(result(resData, 'transferTransaction.bankCharge', 0)) + '\n' + startCase(result(resData, 'transferTransaction.mode', ''))},
          {'key': 'TRANSFER__TRANSFER_AMOUNT', 'value': currencyFormatter(result(transferFormData, 'amount', 0))},
        ];
      } else {
        return [
          {'key': 'TRANSFER__TRANSFER_FROM', 'value': startCase(result(transferFormData, 'myAccount.productType', 'NIL')) + '\n' + result(transferFormData, 'myAccount.accountNumber', 'NIL')},
          {'key': 'TRANSFER__TRANSFER_TO', 'value': startCase(result(targetAccount, 'name', 'NA')) + '\n' + targetAccountType + '\n' + result(targetAccount, 'accountNumber', 'NA')},
          {'key': 'TRANSFER__INITIATION_DATE', 'value': initiatedTime},
          {'key': 'TRANSFER__RECURRING', 'value': repeat},
          {'key': 'TRANSFER__TIME', 'value': schedule},
          {'key': 'TRANSFER__NOTES', 'value': result(transferFormData, 'note', '')},
          {'key': 'TRANSFER__TRANSFER_FEE', 'value': currencyFormatter(result(resData, 'transferTransaction.bankCharge', 0)) + '\n' + startCase(result(resData, 'transferTransaction.mode', ''))},
          {'key': 'TRANSFER__TRANSFER_AMOUNT', 'value': currencyFormatter(result(transferFormData, 'amount', 0))},
        ];
      }
    } else if (type === 'topUpStarInvestama') {
      const currentCurrency = result(payeeAccount, 'currency', '');
      const amount = formatForexAmountPaymentStatus(result(transferFormData, 'amount', ''), currentCurrency);
      return [
        {'key': 'TOPUPSTARINVESTAMA__TRANSFER_FROM', 'value': startCase(result(transferFormData, 'myAccount.productType', 'NIL')) + '\n' + result(transferFormData, 'myAccount.accountNumber', 'NIL')},
        {'key': 'TRANSFER__TRANSFER_TO', 'value': startCase(result(targetAccount, 'name', 'NA')) + '\n' + targetAccountType + '\n' + result(targetAccount, 'accountNumber', 'NA')},
        {'key': 'TRANSFER__INITIATION_DATE', 'value': initiatedTime},
        {'key': 'TRANSFER__NOTES', 'value': result(transferFormData, 'note', '')},
        {'key': 'TRANSFER__TRANSFER_FEE', 'value': currencyFormatter(result(resData, 'transferTransaction.bankCharge', 0)) + '\n' + startCase(result(resData, 'transferTransaction.mode', ''))},
        {'key': 'TRANSFER__TRANSFER_AMOUNT', 'value': amount},
        {'key': 'TRANSFER__CURRENCY', 'value': result(payeeAccount, 'currency', 'IDR')},
      ];
    } else {
      if (repeat === 0) {
        return [
          {'key': 'TRANSFER__TRANSFER_FROM', 'value': startCase(result(transferFormData, 'myAccount.productType', 'NIL')) + '\n' + result(transferFormData, 'myAccount.accountNumber', 'NIL')},
          {'key': 'TRANSFER__TRANSFER_TO', 'value': startCase(result(targetAccount, 'name', 'NA')) + '\n' + targetAccountType + '\n' + result(targetAccount, 'accountNumber', 'NA')},
          {'key': 'TRANSFER__INITIATION_DATE', 'value': initiatedTime},
          {'key': 'TRANSFER__NOTES', 'value': result(transferFormData, 'note', '')},
          {'key': 'TRANSFER__TRANSFER_FEE', 'value': currencyFormatter(result(resData, 'transferTransaction.bankCharge', 0)) + '\n' + startCase(result(resData, 'transferTransaction.mode', ''))},
          {'key': 'TRANSFER__TRANSFER_AMOUNT', 'value': currencyFormatter(result(transferFormData, 'amount', 0))},
        ];
      } else {
        return [
          {'key': 'TRANSFER__TRANSFER_FROM', 'value': startCase(result(transferFormData, 'myAccount.productType', 'NIL')) + '\n' + result(transferFormData, 'myAccount.accountNumber', 'NIL')},
          {'key': 'TRANSFER__TRANSFER_TO', 'value': startCase(result(targetAccount, 'name', 'NA')) + '\n' + targetAccountType + '\n' + result(targetAccount, 'accountNumber', 'NA')},
          {'key': 'TRANSFER__INITIATION_DATE', 'value': initiatedTime},
          {'key': 'TRANSFER__RECURRING', 'value': repeat},
          {'key': 'TRANSFER__TIME', 'value': schedule},
          {'key': 'TRANSFER__NOTES', 'value': result(transferFormData, 'note', '')},
          {'key': 'TRANSFER__TRANSFER_FEE', 'value': currencyFormatter(result(resData, 'transferTransaction.bankCharge', 0)) + '\n' + startCase(result(resData, 'transferTransaction.mode', ''))},
          {'key': 'TRANSFER__TRANSFER_AMOUNT', 'value': currencyFormatter(result(transferFormData, 'amount', 0))},
        ];
      }
    }
  }
};

export const prepareDataDetailTransferQR = (transferFormData = {}, resData = {}, initiatedTime = '', note, amount) => {
  const targetAccount = result(resData, 'transferTransaction.targetAccountObject', {});
  const isSimas = result(targetAccount, 'detailNetworkCode', '') === '153';
  const isUnknownAccount = result(targetAccount, 'accountType', '') === 'UnknownAccount' || isEmpty(result(targetAccount, 'accountType', ''));
  const targetAccountType = isSimas ?
    isUnknownAccount ? result(targetAccount, 'bankName', 'NA').toUpperCase() : startCase(result(targetAccount, 'accountType', 'NA'))
    : result(targetAccount, 'bankName', 'NA').toUpperCase();
  const schedule = result(resData, 'detailScheduledTransfer.transferScheduled', '');
  const repeat = result(resData, 'detailScheduledTransfer.transferRepetition', 0);
  return [
    {'key': 'TRANSFER__TRANSFER_FROM', 'value': startCase(result(transferFormData, 'myAccount.productType', 'NIL')) + '\n' + result(transferFormData, 'myAccount.accountNumber', 'NIL')},
    {'key': 'TRANSFER__TRANSFER_TO', 'value': startCase(result(targetAccount, 'name', 'NA')) + '\n' + targetAccountType + '\n' + result(targetAccount, 'accountNumber', 'NA')},
    {'key': 'TRANSFER__INITIATION_DATE', 'value': initiatedTime},
    {'key': 'TRANSFER__RECURRING', 'value': repeat},
    {'key': 'TRANSFER__TIME', 'value': schedule},
    {'key': 'TRANSFER__NOTES', 'value': note},
    {'key': 'TRANSFER__TRANSFER_FEE', 'value': currencyFormatter(result(resData, 'transferTransaction.bankCharge', 0)) + '\n' + startCase(result(resData, 'transferTransaction.mode', ''))},
    {'key': 'TRANSFER__TRANSFER_AMOUNT', 'value': currencyFormatter(amount)},
  ];
};


export const prepareDataDetailTransferSetLimit = (transferFormData = {}, payeeAccount = {},  myAccount = {}, type = '', resData = {}, initiatedTime = '') => {
  if (type === 'cardlessWithdrawal') {
    return [
      {'key': 'CARDLESSWITHDRAWAL__WITHDRAWAL_FROM', 'value': result(myAccount, 'name', '') + '\n' + result(myAccount, 'productType', '') + '\n' + result(myAccount, 'accountNumber', '')},
      {'key': 'CARDLESSWITHDRAWAL__WITHDRAWAL_USING', 'value': result(payeeAccount, 'phoneNumber', 'NA') + '\n' + startCase(result(payeeAccount, 'description', 'NA'))},
      {'key': 'CARDLESSWITHDRAWAL__INITIATION_DATE', 'value': new Date().toDateString()},
      {'key': 'CARDLESSWITHDRAWAL__NOTES', 'value': result(transferFormData, 'note', '')},
      {'key': 'CARDLESSWITHDRAWAL__FEES', 'value': currencyFormatter(result(resData, 'transferTransaction.bankCharge', 0)) + '\n' + startCase(result(resData, 'transferTransaction.mode', ''))},
      {'key': 'CARDLESSWITHDRAWAL__WITHDRAWAL_AMOUNT', 'value': currencyFormatter(result(transferFormData, 'amount', 0))},
    ];
  } else   if (type === 'creditCard') {
    const targetAccount = result(resData, 'transferTransaction.targetAccountObject', {});
    return [
      {'key': 'CREDIT_CARD__PAYING_FROM', 'value': result(myAccount, 'name', '') + '\n' + result(myAccount, 'productType', '') + '\n' + result(myAccount, 'accountNumber', '')},
      {'key': 'CREDIT_CARD__ACCOUNT_HOLDER', 'value': startCase(result(targetAccount, 'name', 'NA'))},
      {'key': 'CREDIT_CARD__ACCOUNT_NUMBER', 'value': result(targetAccount, 'accountNumber', 'NA') + '\n' + startCase(result(targetAccount, 'bankName', 'NA'))},
      {'key': 'CREDIT_CARD__TRANSFER_MODE', 'value': startCase(result(resData, 'transferTransaction.mode', ''))},
      {'key': 'CREDIT_CARD__PAYMENT_FEE', 'value': currencyFormatter(result(resData, 'transferTransaction.bankCharge', 0))},
      {'key': 'CREDIT_CARD__PAYMENT_AMOUNT', 'value': currencyFormatter(result(transferFormData, 'amount', 0))},
    ];
  } else {
    const targetAccount = result(resData, 'transferTransaction.targetAccountObject', {});
    const isSimas = result(targetAccount, 'detailNetworkCode', '') === '153';
    const isUnknownAccount = result(targetAccount, 'accountType', '') === 'UnknownAccount' || isEmpty(result(targetAccount, 'accountType', ''));
    const targetAccountType = isSimas ?
      isUnknownAccount ? result(targetAccount, 'bankName', 'NA').toUpperCase() : startCase(result(targetAccount, 'accountType', 'NA'))
      : result(targetAccount, 'bankName', 'NA').toUpperCase();
    const repeat = result(resData, 'detailScheduledTransfer.transferRepetition', 0);
    if (type === 'topUpSil') {
      const currentCurrency = result(payeeAccount, 'currency', '');
      const amount = formatForexAmountPaymentStatus(result(transferFormData, 'amount', ''), currentCurrency);
      const exchangeRate = result(resData, 'transferTransaction.currencyRateDisplay', 0);
      const equvalenTo = result(resData, 'transferTransaction.amountInDebitCurr', 0);
      return [
        {'key': 'TOPUPSIL__TRANSFER_FROM', 'value': startCase(result(transferFormData, 'myAccount.productType', 'NIL')) + '\n' + result(transferFormData, 'myAccount.accountNumber', 'NIL')},
        {'key': 'TRANSFER__TRANSFER_TO', 'value': startCase(result(targetAccount, 'name', 'NA')) + '\n' + targetAccountType + '\n' + result(targetAccount, 'accountNumber', 'NA')},
        {'key': 'TRANSFER__INITIATION_DATE', 'value': initiatedTime},
        {'key': 'TRANSFER__NOTES', 'value': result(transferFormData, 'note', '')},
        {'key': 'TRANSFER__TRANSFER_FEE', 'value': currencyFormatter(result(resData, 'transferTransaction.bankCharge', 0)) + '\n' + startCase(result(resData, 'transferTransaction.mode', ''))},
        {'key': 'TRANSFER__TRANSFER_AMOUNT', 'value': amount},
        {'key': 'TRANSFER__CURRENCY', 'value': currentCurrency},
        {'key': 'TRANSFER__EXCHANGE_RATE', 'value': exchangeRate},
        {'key': 'TRANSFER__EQUIVALEN_TO', 'value': equvalenTo},
      ];
    } else if (type === 'nbSil') {
      const currentCurrency = result(payeeAccount, 'currency', '');
      const amount = formatForexAmountPaymentStatus(result(transferFormData, 'amount', ''), currentCurrency);
      const exchangeRate = result(resData, 'transferTransaction.currencyRateDisplay', 0);
      const equvalenTo = result(resData, 'transferTransaction.amountInDebitCurr', 0);
      return [
        {'key': 'NBSIL__TRANSFER_FROM', 'value': startCase(result(transferFormData, 'myAccount.productType', 'NIL')) + '\n' + result(transferFormData, 'myAccount.accountNumber', 'NIL')},
        {'key': 'TRANSFER__TRANSFER_TO', 'value': startCase(result(targetAccount, 'name', 'NA')) + '\n' + targetAccountType + '\n' + result(targetAccount, 'accountNumber', 'NA')},
        {'key': 'TRANSFER__INITIATION_DATE', 'value': initiatedTime},
        {'key': 'TRANSFER__NOTES', 'value': result(transferFormData, 'note', '')},
        {'key': 'TRANSFER__TRANSFER_FEE', 'value': currencyFormatter(result(resData, 'transferTransaction.bankCharge', 0)) + '\n' + startCase(result(resData, 'transferTransaction.mode', ''))},
        {'key': 'TRANSFER__TRANSFER_AMOUNT', 'value': amount},
        {'key': 'TRANSFER__CURRENCY', 'value': currentCurrency},
        {'key': 'TRANSFER__EXCHANGE_RATE', 'value': exchangeRate},
        {'key': 'TRANSFER__EQUIVALEN_TO', 'value': equvalenTo},
      ];
    } else {
      if (repeat === 0) {
        return [
          {'key': 'TRANSFER__TRANSFER_FROM', 'value': result(myAccount, 'name', '') + '\n' + result(myAccount, 'productType', '') + '\n' + result(myAccount, 'accountNumber', '')},
          {'key': 'TRANSFER__TRANSFER_TO', 'value': startCase(result(targetAccount, 'name', 'NA')) + '\n' + targetAccountType + '\n' + result(targetAccount, 'accountNumber', 'NA')},
          {'key': 'TRANSFER__INITIATION_DATE', 'value': initiatedTime},
          {'key': 'TRANSFER__NOTES', 'value': result(transferFormData, 'note', '')},
          {'key': 'TRANSFER__TRANSFER_FEE', 'value': currencyFormatter(result(resData, 'transferTransaction.bankCharge', 0)) + '\n' + startCase(result(resData, 'transferTransaction.mode', ''))},
          {'key': 'TRANSFER__TRANSFER_AMOUNT', 'value': currencyFormatter(result(transferFormData, 'amount', 0))},
        ];
      } else {
        return [
          {'key': 'TRANSFER__TRANSFER_FROM', 'value': result(myAccount, 'name', '') + '\n' + result(myAccount, 'productType', '') + '\n' + result(myAccount, 'accountNumber', '')},
          {'key': 'TRANSFER__TRANSFER_TO', 'value': startCase(result(targetAccount, 'name', 'NA')) + '\n' + targetAccountType + '\n' + result(targetAccount, 'accountNumber', 'NA')},
          {'key': 'TRANSFER__INITIATION_DATE', 'value': initiatedTime},
          {'key': 'TRANSFER__NOTES', 'value': result(transferFormData, 'note', '')},
          {'key': 'TRANSFER__TRANSFER_FEE', 'value': currencyFormatter(result(resData, 'transferTransaction.bankCharge', 0)) + '\n' + startCase(result(resData, 'transferTransaction.mode', ''))},
          {'key': 'TRANSFER__TRANSFER_AMOUNT', 'value': currencyFormatter(result(transferFormData, 'amount', 0))},
        ];
      }
    }
  }
};

export const prepareDataDetailOpenTD = (dataDetail = {}, amount, isShariaAccount) => [
  {'key': 'TIME_DEPOSIT__AMOUNT', 'value': currencySymbol(dataDetail.currency) + ' ' + amount},
  {'key': 'TIME_DEPOSIT__TYPE', 'value': result(dataDetail, 'maturityInstruction', '')},
  {'key': 'TIME_DEPOSIT__ACCOUNT_NUMBER', 'value': result(dataDetail, 'newAccountNumber', '')},
  {'key': 'TIME_DEPOSIT__MONTHLY_PAYOUT_DATE', 'value': dateFormatter(result(dataDetail, 'completionDate', ''), 'DD MMM YYYY')},
  {'key': isShariaAccount ? 'TIME_DEPOSIT__RATE_OF_NISBAH' : 'TIME_DEPOSIT__MATURITY_INTEREST_RATE', 'value': result(dataDetail, 'interestRate', '') + language.TIME_DEPOSIT__INTEREST_RATE},
  {'key': isShariaAccount && 'TIME_DEPOSIT__INTEREST_LABEL_SHARIAH', 'value': result(dataDetail, 'ecrRate', '') + language.TENOR_RATE_SYARIAH},

];

export const prepareEasyPinRegisterMigrate = (easypin, migration, encryptedToken) => ({
  easyPin: encryptText(easypin),
  migration: migration,
  encryptedToken: encryptedToken,
  deviceInfo: {
    'name': deviceInfo.name,
    'model': deviceInfo.model
  }
});

export const prepareRegisterFace = (image, orientation, smsOtp = '', transRefNum = '', flipImage = false) => ({
  'faceRecognition': String(image),
  'mPinInputed': String(smsOtp),
  'transRefNum': String(transRefNum),
  'isUsingSms': Boolean(smsOtp !== ''),
  'orientation': String(orientation),
  'flipImage': Boolean(flipImage),
});

export const prepareDetectFace = (image, orientation, flipImage) => ({
  'faceRecognition': String(image),
  'orientation': String(orientation),
  'flipImage': Boolean(flipImage),
});

export const prepareInsurancePA = (AJSMSIG, transRefNum, easyPin, smsOtp, simasToken) => ({
  AJSMSIG: AJSMSIG,
  mPinInputed: String(smsOtp),
  transRefNum: String(transRefNum),
  easyPin: String(easyPin),
  tokenInputed: String(simasToken)
});

export const prepareInsuranceTravel = (travelData, transRefNum, smsOtp, simasToken, easyPin) => ({
  travelData,
  'mPinInputed': String(smsOtp),
  'transRefNum': String(transRefNum),
  'easyPin': String(easyPin),
  'tokenInputed': String(simasToken)
});

export const prepareSFRedeem = (transRefNum, easyPin, smsOtp, simasToken, data) => ({
  mPinInputed: String(smsOtp),
  transRefNum: String(transRefNum),
  easyPin: String(easyPin),
  tokenInputed: String(simasToken),
  data: {
    'mdn': data.mdn,
    'ktp': data.ktp,
    'noAcc': data.noAcc,
    'trxId': data.transRefNum,
    'systemId': 'Simobi',
    'userId': 'userSimobi',
  },
});

export const prepareOpenAndromaxConfirm = (data) => ({
  'emailAddress': String(data.email),
  'accountFrom': String(data.accountNo.id),
  'productType': 'savingSmartfren',
  'currency': 'IDR',
  'bankBranch': String(data.bankCode),
  'initialDeposit': String(data.amount)
});

export const prepareOpenAndromaxAccount = (data) => ({
  'transRefNum': String(data.transRefNum),
  'easyPin': String(data.easyPin),
});

export const getDatiForPL = (datiRawData) => map(datiRawData, (eachData) => ({
  DESC2: formatFieldPostal(eachData.DESC2),
  DESC1: eachData.DESC1
}));

export const preparePaydayLoanDisburse = (transRefNum, easyPin, smsOtp, simasToken, payload) => ({
  mPinInputed: String(smsOtp),
  transRefNum: String(transRefNum),
  easyPin: String(easyPin),
  tokenInputed: String(simasToken),
  disburse: payload
});

export const getTransactionEmoneyHistory = (transactionsRawData) => {
  const transactions = result(transactionsRawData, 'statementList.contentList', []);
  const accountTransactions = result(transactionsRawData, 'statementList.headerMap', {});
  return transactions.slice().
    filter((transaction) => transaction.statementId).
    map((transaction) => ({
      amount: transaction.debitAmount || transaction.creditAmount,
      debitAmount: transaction.debitAmount,
      creditAmount: transaction.creditAmount,
      description: transaction.description,
      date: transaction.transactionDate,
      credit: !!transaction.creditAmount,
      statementId: result(transaction, 'statementId', ''),
      transactionCode: result(transaction, 'transactionCode', ''),
      accountTransactions: accountTransactions,
    }));
};
export const prepareGpnRegister = (transRefNum, easyPin, smsOtp, simasToken, data, isRegisterStore, isRegisterTerminal) => {
  const randomNumber = randomString(16);
  OBM_EncryptPassword(easyPin, randomNumber);
  const easyPinOBM = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
  return ({
    mPinInputed: String(smsOtp),
    transRefNum: String(transRefNum),
    easyPin: String(easyPinOBM),
    tokenInputed: String(simasToken),
    isRegisterStore: Boolean(isRegisterStore),
    isRegisterTerminal: Boolean(isRegisterTerminal),
    isTerminal: data.isTerminal,
    registerData: {
      'merchant_id': String(data.merchant_id),
      'terminal_id': String(data.terminal_id),
      'accountNo': String(data.accountNo),
      'merchant_name': String(data.merchant_name),
      'merchant_phone': String(data.merchant_phone),
      'merchant_owner': String(data.merchant_owner),
      'merchant_address': String(data.merchant_address),
      'merchant_kelurahan': String(data.merchant_kelurahan),
      'merchant_kecamatan': String(data.merchant_kecamatan),
      'merchant_city': String(data.merchant_city),
      'merchant_prov': String(data.merchant_prov),
      'postal_code': String(data.postal_code),
      'merchant_KTP': String(data.merchant_KTP),
      'merchant_email': String(data.merchant_email),

      'merchant_type': String(data.merchant_type),
      'merchant_criteria': String(data.merchant_criteria),
      'npwp_owner': String(data.npwp_owner),
      'merchant_SIUP': String(data.merchant_SIUP),
      'merchant_TDP': String(data.merchant_TDP),
      'merchant_net_worth': String(data.merchant_net_worth),
      'merchant_annual_sales_volume': String(data.merchant_annual_sales_volume),
      'merchant_num_of_employee': String(data.merchant_num_of_employee),
      'merchant_daily_sales_volume': String(data.merchant_daily_sales_volume),
      'merchant_country_code': String(data.merchant_country_code),

      'merchant_pan_name': String(data.merchant_pan_name),
      'username': String(data.username),
      'mobile_number': String(data.mobile_number),
      'store_label': String(data.store_label),
      'store_phone_num': String(data.store_phone_num),
      'province': String(data.province),
      'city': String(data.city),
      'kelurahan': String(data.kelurahan),
      'kecamatan': String(data.kecamatan),
      'store_postal_code': String(data.store_postal_code),
      'store_address': String(data.store_phone_address),
      'store_location': String(data.store_location),
      'ownership': String(data.ownership),
      'nmid': String(data.nmid),
    },
  });
};

export const prepareGpnTerminal = (transRefNum, easyPin, smsOtp, simasToken, data) => ({
  mPinInputed: String(smsOtp),
  transRefNum: String(transRefNum),
  easyPin: String(easyPin),
  tokenInputed: String(simasToken),
  isTerminal: data.isTerminal,
  merchant_id: String(data.merchant_id),
  data: {
    'merchant_pan_name': String(data.merchant_pan_name),
    'username': String(data.username),
    'mobile_number': String(data.mobile_number),
    'user_status': String(data.user_status),
  },
});

export const prepareTerminalDelete = (transRefNum, easyPin, smsOtp, simasToken, data) => ({
  mPinInputed: String(smsOtp),
  transRefNum: String(transRefNum),
  easyPin: String(easyPin),
  tokenInputed: String(simasToken),
  merchant_pan: String(data.merchant_pan),
});

export const prepareTerminalEdit = (transRefNum, smsOtp, simasToken, data) => ({
  mPinInputed: String(smsOtp),
  transRefNum: String(transRefNum),
  tokenInputed: String(simasToken),
  merchant_pan: String(result(data, 'merchant_pan', '')),
  username: String(data.username),
  mobile_number: String(data.mobile_number),
  merchant_pan_name: String(data.merchant_pan_name),
});

export const prepareTerminalReset = (data) => ({
  merchant_pan: String(data.merchant_pan),
  merchant_name: String(data.merchant_name),
});

export const prepareGpnTransaction = (transRefNum, smsOtp, simasToken, data, additionalInfoMap) => ({
  mPinInputed: String(smsOtp),
  transRefNum: String(transRefNum),
  tokenInputed: String(simasToken),
  accountFrom: String(result(data, 'accountFrom', '')),
  amount: String(result(data, 'amount', '')),
  tipAmount: String(result(data, 'tipAmount', '')),
  subscriberNoInput: String(result(data, 'accountTo', '')),
  merchantDataMap: result(data, 'merchantDataMap', ''),
  amountNumber: String(result(data, 'amountNumber', '')),
  invoiceId: String(result(data, 'invoiceId', '')),
  additionalInfoMap: {
    'voucherId': result(additionalInfoMap, 'voucherId', ''),
    'ownership': result(additionalInfoMap, 'ownership', '')
  }
});

export const prepareGpnTransactionCB = (transRefNum, smsOtp, simasToken, data, additionalInfoMap, isCrossBorder) => ({
  sessionId: isCrossBorder ? String(result(data, 'sessionId', '')) : '',
  serverToken: isCrossBorder ? String(result(data, 'serverToken', '')) : '',
  debitBankCode: '0153',
  amount: String(result(data, 'amount', '')),
  currencyTransactionCode: String(result(data, 'merchantDataMap.53', '')),
  merchantCity: String(result(data, 'merchantDataMap.60', '')),
  merchantCountryCode: String(result(data, 'merchantDataMap.58', '')),
  debitAccount: String(result(data, 'accountNumber', '')),
  nmid: '',
  terminalId: String(result(data, 'merchantDataMap.62.07', '')),
  merchantPhoneNum: String(result(data, 'merchantDataMap.62.02', '')),
  creditBankCode: String(result(data, 'merchantDataMap.30.01', '').substring(4, 8)),
  customerName: String(result(data, 'accountName', '')),
  referenceId: String(result(data, 'invoiceId', '')),
  merchantName: String(result(data, 'merchantDataMap.59', '')),
  creditPan: String(result(data, 'cpanLuhn', '')),
  merchantCriteria: String(result(data, 'merchantDataMap.30.03', '')) || '1234',
  merchantId: String(result(data, 'merchantDataMap.26.02', '')),
  merchantCategoryCode: String(result(data, 'merchantDataMap.52', '')) || '0000',
  merchantPostalCode: String(result(data, 'merchantDataMap.61', '')),
  tipsAmount: String(result(data, 'tipAmount', '')),
  qrType: String(result(data, 'merchantDataMap.01', '')),
  channel: isCrossBorder ? 'QR-CB' : '',
  QRstring: isCrossBorder ? String(result(data, 'QRString', '')) : '',
});

export const prepareInquiryGPN = (data) => ({
  debitBankCode: '0153',
  amount: String(result(data, 'amount', '')),
  currencyTransactionCode: String(result(data, 'merchantDataMap.53', '')),
  merchantCity: String(result(data, 'merchantDataMap.60', '')),
  merchantCountryCode: String(result(data, 'merchantDataMap.58', '')),
  debitAccount: String(result(data, 'accountNumber', '')),
  nmid: String(result(data, 'merchantDataMap.51.02', '')),
  terminalId: String(result(data, 'merchantDataMap.62.07', '')),
  merchantPhoneNum: String(result(data, 'merchantDataMap.62.02', '')),
  creditBankCode: String(result(data, 'merchantDataMap.26.01', '').substring(4, 8)),
  customerName: String(result(data, 'accountName', '')),
  referenceId: String(result(data, 'invoiceId', '')),
  merchantName: String(result(data, 'merchantDataMap.59', '')),
  creditPan: String(result(data, 'cpanLuhn', '')),
  merchantCriteria: String(result(data, 'merchantDataMap.51.03', '')),
  merchantId: String(result(data, 'merchantDataMap.26.02', '')),
  merchantCategoryCode: String(result(data, 'merchantDataMap.52', '')),
  merchantPostalCode: String(result(data, 'merchantDataMap.61', '')),
  tipsAmount: String(result(data, 'tipAmount', '')),
  qrType: String(result(data, 'merchantDataMap.01', '')),
});

export const prepareCrossBorderInquiry = (data, isCrossBorder) => ({
  debitBankCode: '0153',
  amount: String(result(data, 'amount', '')),
  sessionId: String(result(data, 'sessionId', '')),
  serverToken: String(result(data, 'serverToken', '')),
  currencyTransactionCode: String(result(data, 'merchantDataMap.53', '')),
  merchantCity: String(result(data, 'merchantDataMap.60', '')),
  merchantCountryCode: String(result(data, 'merchantDataMap.58', '')),
  debitAccount: String(result(data, 'accountNumber', '')),
  nmid: String(result(data, 'merchantDataMap.51.02', '')),
  terminalId: String(result(data, 'merchantDataMap.62.07', '')),
  merchantPhoneNum: String(result(data, 'merchantDataMap.62.02', '')),
  creditBankCode: String(result(data, 'merchantDataMap.26.01', '').substring(4, 8)),
  customerName: String(result(data, 'accountName', '')),
  referenceId: String(result(data, 'invoiceId', '')),
  merchantName: String(result(data, 'merchantDataMap.59', '')),
  creditPan: String(result(data, 'cpanLuhn', '')),
  merchantCriteria: String(result(data, 'merchantDataMap.51.03', '')),
  merchantId: String(result(data, 'merchantDataMap.26.02', '')),
  merchantCategoryCode: String(result(data, 'merchantDataMap.52', '')),
  merchantPostalCode: String(result(data, 'merchantDataMap.61', '')),
  tipsAmount: String(result(data, 'tipAmount', '')),
  qrType: String(result(data, 'merchantDataMap.01', '')),
  channel: isCrossBorder ? 'QR-' : '',
});

export const prepareCashoutTransaction = (transRefNum, smsOtp, simasToken, data) => ({
  mPinInputed: String(smsOtp),
  transRefNum: String(transRefNum),
  tokenInputed: String(simasToken),
  accountFrom: String(result(data, 'accountFrom', '')),
  amount: String(result(data, 'amount', '')),
  subscriberNoInput: String(result(data, 'accountTo', '')),
  merchantDataMap: result(data, 'merchantDataMap', ''),
});


export const prepareRefundCode = (transRefNum, easyPin, smsOtp, simasToken, data) => {
  const randomNumber = randomString(16);
  OBM_EncryptPassword(easyPin, randomNumber);
  const easyPinOBM = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
  return ({
    mPinInputed: String(smsOtp),
    transRefNum: String(transRefNum),
    easyPin: String(easyPinOBM),
    tokenInputed: String(simasToken),
    merchant_id: String(data.merchant_id),
    amount: String(data.amount),
    count: String(data.count),
  });
};

export const prepareTransactionHistoryEmoneyPayload = (accountNumber, transactionType) => {
  const transactionTypeMap = {
    lastMonth: '1MonthAgo',
    last2Months: '2MonthAgo',
    last3Months: '3MonthAgo'
  };
  return {
    accountNumber,
    sendToMailBox: 'true',
    period: transactionTypeMap[transactionType] || '1MonthAgo',
  };
};

export const getDataOptions = (datiRawData) => map(datiRawData, (eachData) => ({
  value: eachData.code,
  label: eachData.name
}));

export const getListOptions = (datiRawData) => map(datiRawData, (eachData) => ({
  value: eachData.code,
  label: eachData.name,
  id: eachData.id
}));

export const prepareCgvTransaction = (transRefNum, easyPin, smsOtp, simasToken, amount, accountFrom, cinemaCode, bookingCode, scheduleCode, paymentSeatInfoList, transactionId, shouldSendSmsOtp = true) => ({
  transactionType: String(transactionId),
  activateOtp: Boolean(shouldSendSmsOtp),
  mPinInputed: String(smsOtp),
  transRefNum: String(transRefNum),
  easyPin: String(easyPin),
  tokenInputed: String(simasToken),
  amount: String(amount),
  accountFrom: String(accountFrom),
  cinemaCode: String(cinemaCode),
  bookingCode: String(bookingCode),
  scheduleCode: String(scheduleCode),
  paymentSeatInfoList: String(paymentSeatInfoList),
});

export const prepareSavePassenger = (data, tipe) => {
  const bd = result(data, 'birthDate', '') ?  moment(new Date(result(data, 'birthDate', ''))).format('DD/MM/YYYY') : '';
  const idExp = result(data, 'IdExpiry', '') ?  moment(new Date(result(data, 'IdExpiry', ''))).format('DD/MM/YYYY') : '';
  const passExp = result(data, 'expiryPassport', '') ?  moment(new Date(result(data, 'expiryPassport', ''))).format('DD/MM/YYYY') : '';
  const nationality = result(data, 'nationality', '');
  const coi = result(data, 'nationality', '');
  return ({
    'passengerId': String(result(data, 'passengerId', '')),
    'firstName': String(result(data, 'firstName', '')),
    'lastName': String(result(data, 'lastName', '')),
    'title': String(result(data, 'tittle.name', '')),
    'birthDate': String(bd),
    'email': String(result(data, 'email', '')),
    'homePhone': String(result(data, 'homePhone', '')),
    'mobilePhone': String(result(data, 'phone', '')),
    'otherPhone': String(result(data, 'otherPhone', '')),
    'idNumber': String(result(data, 'idNumber', '')),
    'idExpiry': String(idExp),
    'nationality': String(nationality),
    'passportNumber': String(result(data, 'passportNumber', '')),
    'passportExpiry': String(passExp),
    'passportOrigin': String(coi),
    'relation': 'Friend',
    'gender': '',
    'passengerType': String(tipe),
  });
};

export const prepareSaveBooking = (passengerData, segments, type, state) => {
  const passeger = getDataPassanger(passengerData, state);
  const segmentsData = getDataSegment(segments, type);
  return ({
    'Contact': {
      'Title': String(result(passengerData, '99.formValues.tittle.name', '')),
      'FirstName': String(result(passengerData, '99.formValues.firstName', '')),
      'LastName': String(result(passengerData, '99.formValues.lastName', '')),
      'Email': String(result(passengerData, '99.formValues.email', '')),
      'HomePhone': String(result(passengerData, '99.formValues.homePhone', '')),
      'MobilePhone': String(result(passengerData, '99.formValues.phone', '')),
    },
    'Passengers': passeger,
    'Segments': segmentsData,
    'CallbackUri': '8b888e1d-b4cf-493b-903f-caa6f647734c'
  });
};

export const payloadFareDetail = (flightDataDetail, userPassenger) => {
  const results = getFarePayload(flightDataDetail, userPassenger);
  return results;
};

export const getQrMerchantList = (position, page, cityCode, type, title = '') => {
  const data = {lat: result(position, 'coords.latitude', ''),
    lng: result(position, 'coords.longitude', ''),
    search: title,
    kotaid: String(cityCode),
    filter: type,
    cat: '',
    page: String(page),
    numrow: '20'};
  return data;
};

export const getATMList = (position) => {
  const data = {
    latitudeUser: result(position, 'coords.latitude', ''),
    longitudeUser: result(position, 'coords.longitude', '')
  };
  return data;
};

export const prepareActivation = (name, newPassword, registTemp, utm = '') => {
  const randomNumber = randomString(16);
  OBM_EncryptPassword(newPassword, randomNumber);
  const encryptedPassword = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
  const payloadNormal = {
    'loginName': name,
    'password': encryptedPassword,
    'confirmPassword': encryptedPassword,
    'registTemp': registTemp,
    'deviceInfo': {
      'name': deviceInfo.name,
      'model': deviceInfo.model
    }
  };
  const payloadWithUtm = {
    'loginName': name,
    'password': encryptedPassword,
    'confirmPassword': encryptedPassword,
    'registTemp': {...registTemp, 'additional_data': {'utm': utm}},
    'deviceInfo': {
      'name': deviceInfo.name,
      'model': deviceInfo.model
    }
  };
  const payload = isEmpty(utm) ? payloadNormal : payloadWithUtm;
  return payload;
};

export const prepareResetPassword = (password, mobileNumberRaw) => {
  const encryptedPassword = encryptText(password);
  return {
    loginPasswordFirst: encryptedPassword,
    loginPasswordRepeat: encryptedPassword,
    mobileNumber: mobileNumberRaw,
  };
};

export const transformEasypin = (cifCode, transRefNum, easyPin) => {
  const randomNumber = randomString(16);
  OBM_EncryptPassword(easyPin, randomNumber);
  const easyPinOBM = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
  return {
    cifCode: cifCode,
    easyPin: easyPinOBM,
    transRefNum: transRefNum,
  };
};

export const getListPhone = (dataRawPhone) => map(dataRawPhone, (eachData) => ({
  ...getListPhoneFix(result(eachData, 'givenName', ''), result(eachData, 'middleName', ''), result(eachData, 'familyName', ''), result(eachData, 'phoneNumbers', []))
}));

export const getListPhoneFix = (rawNameGiven, rawNameMiddle, rawNameFamily, detailRawData) => {
  const nameRaw =  rawNameGiven + ' ' + rawNameMiddle + ' ' + rawNameFamily;
  let arrayRaw = [];
  const array = map(detailRawData, (eachData) => ({
    name: String(nameRaw),
    tel: result(eachData, 'number', ''),
  }));
  arrayRaw = [...array, ...arrayRaw];
  return arrayRaw;
};

export const getListAppInstalled = (rawData, OS = ' ') => map(rawData, (eachData) => ({
  mName: OS === 'ios' ? result(eachData, 'info.CFBundleDisplayName', ' ') : result(eachData, 'appName', ' '),
  mPackageName: OS === 'ios' ? result(eachData, 'info.CFBundleIdentifier', ' ') : result(eachData, 'packageName', ' '),
  mFirstInstallTime: OS === 'ios' ? ' ' : moment.unix(result(eachData, 'firstInstallTime', ' ') / 1000).format(),
  mVersionName: OS === 'ios' ? result(eachData, 'info.CFBundleShortVersionString', ' ') : result(eachData, 'versionName', ' '),
  mLastUpdateTime: OS === 'ios' ? ' ' : moment.unix(result(eachData, 'lastUpdateTime', ' ') / 1000).format(),
}));

export const selectedVoucher = (dataRaw) => map(dataRaw, (eachData) => ({
  typeVoucher: 'EVOUCHER',
  data: eachData,
  agregator: 'TADA',
  expiredDate: result(eachData, 'expiredDate', '') + ' ' + result(eachData, 'expiredTime', ''),
  redemptionDate: result(eachData, 'drawDate', '')
}));

export const getBalancesEmoney = (balancesRawData) => {
  const defaultValue = [];
  const extract = result(balancesRawData, 'accounts', defaultValue);
  const emoneyBalances = find(extract, (balances) => startsWith(balances.AccountNumber, '38'));
  const emoneyConstruct = {
    workingBalance: emoneyBalances.WorkingBalance,
    availableBalance: emoneyBalances.AvailableBalance,
    currentBalance: emoneyBalances.CurrentBalance,
    accountNumber: emoneyBalances.AccountNumber,
    currency: emoneyBalances.Currency
  };
  return emoneyConstruct;
};

export const getDataForSIl = (rawData) => map(rawData, (eachData) => ({
  value: String(result(eachData, 'id', '')),
  label: result(eachData, 'desc', '')
}));

export const getAccountDefaultEmoney = (rawData) => {
  const accountNumberMasking = result(rawData, 'accountNumber', '').substring(0, 3) + 'xxxxx' + result(rawData, 'accountNumber', '').substring(8, result(rawData, 'accountNumber', '').length);
  const data = {
    accountId: result(rawData, 'id', ''),
    accountNumber: accountNumberMasking
  };
  return data;
};

export const getDataAccountLS = (rawData) => map(rawData, (eachData) => {
  const selectionAcc = omit(eachData, ['balances']);
  return ({
    ...selectionAcc,
    balances: {}
  });
}
);

export const getDataForSIlPolis = (rawData) => map(rawData, (eachData) => ({
  value: String(result(eachData, 'id', '')),
  label: result(eachData, 'label', '')
}));

// export const getSourceAccountRadioButton = (rawData) => map(rawData, (eachData) => (
//   {
//     value: String(result(eachData, 'id', '')),
//     accountNumber: result(eachData, 'accountNumber', ''),
//     balances: result(eachData, 'balances.availableBalance', ''),
//     productType: result(eachData, 'productType', ''),
//     currency: result(eachData, 'currency', ''),
//     bank: result(eachData, 'bank', ''),
//     name: result(eachData, 'name', '')
//   }));

export const getCityListforSIL = (rawData) => map(rawData, (eachData) => ({
  value: String(result(eachData, 'cityId', '')),
  label: result(eachData, 'cityName', '')
}));

export const productNameSil = (rawData) => map(rawData, (eachData) => ({
  value: String(result(eachData, 'productId', '')),
  label: result(eachData, 'productName', '')
}));

export const prepareTransferPayloadSIL = (transferFormData, payeeAccount, transRefNum, easyPin, smsOtp, simasToken, transType, isFavorite, silFlagInfo, isSilIdrUsd, resData) => {
  const {myAccount, amount, transferMode} = transferFormData; // easyPin also
  const {transferType} = payeeAccount;
  const payeeType = getPayeeType(payeeAccount);
  const targetAccountType = (payeeType === 'external') ? 'external' : 'inbanktransfer';
  const cardlessModeDefault = false;
  const cardlessMode = transType === 'cardlessWithdrawal' ? true : cardlessModeDefault;
  const isScheduledFundTransfer = result(transferFormData, 'transferTime', '') !== '';
  const network = targetAccountType === 'external' && result(myAccount, 'accountType', '') === 'emoneyAccount';
  const isNewAccount = result(payeeAccount, 'id', '') === '' || result(payeeAccount, 'id', '') === null;
  const bankId = result(payeeAccount, 'bank.id', '') === '' ? result(payeeAccount, 'bank.bankId', '') : result(payeeAccount, 'bank.id', '');
  const mode = transferMode || transferType;
  const isOnline = mode === 'inbank' || mode === 'network';
  const isEmoney = result(myAccount, 'accountType', '');
  const targetAcc = result(resData, 'payeeId', '');
  const payload = {
    'accountFrom': String(myAccount.id),
    'targetAccount': String(targetAcc),
    'transferList': String(targetAcc),
    'currency': String(payeeAccount.currency),
    'amount': String(amount),
    'mode': network ? 'network' : String(transferMode || transferType),
    'modeCategory': String(payeeType),
    'targetAccountType': String(targetAccountType),
    'description': silFlagInfo === 'new business' ? 'NewBusinessSIL' : 'TopUpSIL',
    'easyPin': String(easyPin),
    'mPinInputed': String(smsOtp),
    'transRefNum': String(transRefNum),
    'tokenInputed': String(simasToken),
    'cardlessMode': cardlessMode,
    'isScheduledFundTransfer': isScheduledFundTransfer,
    'isRepeat': transferFormData.schedule > 0,
    'repeatType': String(result(transferFormData, 'schedule', '')),
    'recurring': String(transferFormData.recurring),
    'maxRecurrence': String(result(transferFormData, 'times', '')),
    'transferDate': String(transferFormData.transferTime),
    'isUsingSimobiPlus': true,
    'isFavorite': String(isFavorite),
    'newConfirmTransfer': isNewAccount ? {
      accountId: String(resData.payeeId),
      targetBankId: String(bankId),
      accountNumber: String(payeeAccount.accountNumber || payeeAccount.accNo),
      targetAccountName: isEmoney === 'emoneyAccount' ? '' : String(!isOnline ? result(payeeAccount, 'name', '') : ''),
      description: String(result(payeeAccount, 'description', '')),
      mode: mode
    } : null
  };
  return payload;
};

export const prepareConfirmTransferPayloadSIL = (formValues, payee, transType, time) => {
  const {myAccount, amount, note, transferMode, noVa} = formValues;
  const {transferType} = payee;
  const payeeType = getPayeeType(payee);
  const targetAccountType = (payeeType === 'external') ? 'external' : 'inbanktransfer';
  const mode = transferMode || transferType;
  const isNewAccount = result(payee, 'id', '') === '' || result(payee, 'id', '') === null;
  const isOnline = mode === 'inbank' || mode === 'network';
  const cardlessModeDefault = false;
  const cardlessMode = transType === 'cardlessWithdrawal' ? true : cardlessModeDefault;
  const isScheduledFundTransfer = time.transferTime !== '';
  const network = targetAccountType === 'external' && result(myAccount, 'accountType', '') === 'emoneyAccount';
  const bankId = result(payee, 'bank.id', '') === '' ? result(payee, 'bank.bankId', '') : result(payee, 'bank.id', '');
  const isEmoney = result(myAccount, 'accountType', '');
  const payload = {
    'accountFrom': String(result(myAccount, 'id', '')),
    'targetAccount': String(noVa),
    'transferList': String(noVa),
    'currency': String(payee.currency),
    'amount': String(amount),
    'mode': network ? 'network' : mode,
    'modeCategory': String(payeeType),
    'targetAccountType': String(targetAccountType),
    'description': String(note) || '',
    // 'description': silFlag === 'new business' ? 'NewBusinessSIL' : 'TopUpSIL',
    'cardlessMode': cardlessMode,
    'isScheduledFundTransfer': isScheduledFundTransfer,
    'isRepeat': formValues.schedule > 0,
    'repeatType': String(result(formValues, 'schedule', '')),
    'recurring': String(time.recurring),
    'maxRecurrence': String(result(formValues, 'times', '')),
    'transferDate': String(time.transferTime),
    'isUsingSimobiPlus': true,
    'newConfirmTransfer': isNewAccount ? {
      version: 'v4',
      targetBankId: String(bankId),
      accountNumber: String(payee.accountNumber || payee.accNo),
      targetAccountName: isEmoney === 'emoneyAccount' ? '' : String(!isOnline ? result(payee, 'name', '') : ''),
      description: String(result(payee, 'description', '')),
      mode: mode
    } : null
  };
  return payload;
};

export const getDataAccountList = (rawData) => map(rawData, (eachData) => ({
  value: String(result(eachData, 'id', '')),
  accountMode: result(eachData, 'accountMode', ''),
  expiryDate: result(eachData, 'expiryDate', ''),
  accountTypeCode: result(eachData, 'accountTypeCode', ''),
  isDefaultAccount: result(eachData, 'isDefaultAccount', ''),
  label: result(eachData, 'label', ''),
  balances: result(eachData, 'balances', ''),
  currency: result(eachData, 'currency', ''),
  productType: result(eachData, 'productType', ''),
  id: result(eachData, 'id', ''),
  rdnDetail: result(eachData, 'rdnDetail', ''),
  accountNumber: result(eachData, 'accountNumber', ''),
  allowFlag: result(eachData, 'allowFlag', ''),
  name: result(eachData, 'name', ''),
  accountType: result(eachData, 'accountType', ''),
  bank: result(eachData, 'bank', ''),
  bankBranch: result(eachData, 'bankBranch', []),
}));


export const getLatestLuckyDipCurrentTicket = (data, currentTicket) => {
  const selectionAcc = omit(data, ['currentToken']);
  return ({
    ...selectionAcc,
    currentToken: currentTicket
  });
};

export const prepareCCSourceOfFund = (CCSourceOfFund = {}) => (
  {
    'accountNumber': String(result(CCSourceOfFund, 'accountNumber', '')),
    'amount': String(result(CCSourceOfFund, 'allAmount', '')),
    'billerId': String(result(CCSourceOfFund, 'billerId', '')),
    'eppSchemeId': String(result(CCSourceOfFund, 'schemeId', '')),
  });

export const prepareCcGetNotif = (getNotif = {}) => (
  {
    'pan': String(result(getNotif, 'accountNumber', '')),
  }
);

export const prepareCcSetNotif = (SetNotif = {}) => (
  {
    'serverToken': String(result(SetNotif, 'serverToken', '')),
    'transRefNum': String(result(SetNotif, 'transRefNum', '')),
    'sessionId': String(result(SetNotif, 'sessionId', '')),
    'pan': String(result(SetNotif, 'accountNumber', '')),
    'allowNotifFlag': String(result(SetNotif, 'allowNotifFlag', '')),
    'allowEmailNotifFlag': String(result(SetNotif, 'allowEmailNotifFlag', '')),
    'notifFlag': String(result(SetNotif, 'flagSms', '')),
    'emailNotifFlag': String(result(SetNotif, 'flagEmail', '')),
    'thresholdAmount': String(result(SetNotif, 'thresholdAmount', ''))
  });

export const prepareCcCashAdvanceFee = (fee = {}, ccAccount, destAcc) => {
  const amount = String(result(fee, 'amount', ''));
  const amountDecimal = formatFieldAmountWithDecimal(amount);
  const fromAccount = result(ccAccount, 'accountNumber', '');
  const destAccount = result(destAcc, 'accountNumber', '');
  return (
    {
      'amount': amountDecimal,
      'fromAccount': fromAccount,
      'destAccount': destAccount
    }
  );
};

export const getCreditCardBalanceOnly = (creditCardRawData) => {
  const dataArray = result(creditCardRawData, 'balances', []);
  const outstandingBalance = result(find(dataArray, {amountType: 'Current Outstanding'}), 'amount', '');
  const creditAvailable = result(find(dataArray, {amountType: 'Available Balance'}), 'amount', '');
  const creditLimit = result(find(dataArray, {amountType: 'Credit Limit'}), 'amount', '');
  return {
    outstandingBalance: outstandingBalance,
    creditAvailable: creditAvailable,
    creditLimit: creditLimit,
  };
};

export const prepareConfirmRemittancePayload = (formValues, payee, transType, time, transferMethodType, isValas = false, dataRemittance, dataTransactionRemittance, easyPin) => {
  const {myAccount, transferMode} = formValues;
  const {transferType} = payee;
  const payeeType = getPayeeType(payee);
  const targetAccountType = (payeeType === 'external') ? 'external' : 'inbanktransfer';
  const mode = transferMode || transferType;
  const cardlessModeDefault = false;
  const cardlessMode = transType === 'cardlessWithdrawal' ? true : cardlessModeDefault;
  const isScheduledFundTransfer = time.transferTime !== '';
  const network = targetAccountType === 'external' && result(myAccount, 'accountType', '') === 'emoneyAccount';
  const currencyDeterminant = String(result(formValues, 'currency.name', String(result(myAccount, 'currency', ''))));
  const currencyTarget =  isValas ? currencyDeterminant : mode === 'remmitance' ? String(result(payee, 'currency', '')) : String(result(myAccount, 'currency', ''));
  const isExisting = result(payee, 'dataForm.bankInformationData.isExisting', false);
  const swiftCode = String(isExisting ? result(payee, 'dataForm.bankInformationData.payee.swiftCode', '') : result(payee, 'dataForm.bankInformationData.bankInformation.swiftCode', ''));
  const bankName = String(isExisting ? result(payee, 'dataForm.bankInformationData.payee.bankName', '') : result(payee, 'dataForm.bankInformationData.bankInformation.bankName', ''));
  const country = String(isExisting ? result(payee, 'dataForm.bankInformationData.payee.country', '') : result(payee, 'dataForm.bankInformationData.bankInformation.country', ''));
  const receiverCountry = String(result(payee, 'dataForm.recipientData.countryRecipient', ''));
  const receiverState = String(result(payee, 'dataForm.recipientData.stateRecipient', ''));
  const receiverAddress = String(result(payee, 'dataForm.recipientData.adressRecipient', ''));
  const receiverName = String(result(payee, 'dataForm.recipientData.nameRecipient', ''));
  const purpose = String(result(payee, 'dataForm.recipientData.purposeListRecipient.description', ''));
  const description = String(result(payee, 'dataForm.recipientData.descriptionRecipient', ''));
  const senderName = String(result(payee, 'senderData.senderData.nameSender', ''));
  const senderCity = String(result(payee, 'senderData.senderData.stateSender', ''));
  const senderCountry = String(result(payee, 'senderData.senderData.countrySender', ''));
  const senderAddress = String(result(payee, 'senderData.senderData.adressSender', ''));
  const isNewPayee = result(payee, 'isNewPayee', false);
  const payload = {
    'accountFrom': String(result(myAccount, 'id', '')),
    'accNoReceiver': String(result(payee, 'accountNumber', '')),
    'amount': String(result(formValues, 'amount', '')),
    'mode': network ? 'network' : mode,
    'modeCategory': String(mode),
    'cardlessMode': cardlessMode,
    'isScheduledFundTransfer': isScheduledFundTransfer,
    'isRepeat': formValues.schedule > 0,
    'repeatType': String(result(formValues, 'schedule', '')),
    'recurring': String(time.recurring),
    'maxRecurrence': String(result(formValues, 'times', '')),
    'transferDate': String(time.transferTime),
    'isUsingSimobiPlus': true,
    'easyPin': easyPin,
    'swiftCode': swiftCode,
    'bankName': bankName,
    'country': country,
    'receiverCountry': receiverCountry,
    'receiverState': receiverState,
    'currencyRemmitance': currencyTarget,
    'receiverAddress': receiverAddress,
    'receiverName': receiverName,
    'purpose': purpose,
    'description': description,
    'senderName': senderName,
    'senderCity': senderCity,
    'senderCountry': senderCountry,
    'senderAddress': senderAddress,
    'newConfirmTransfer': isNewPayee ? {
      version: 'v4',
    } : null
  };
  return payload;
};
export const getLatestLuckyDipInfo = (data, code, currentTicketbyCode) => {
  if (code === 'platinum') {
    const selectionAcc = omit(data, ['currentTokenPlatinum', 'currentToken']);
    return ({
      ...selectionAcc,
      currentTokenPlatinum: currentTicketbyCode
    });
  } else if (code === 'gold') {
    const selectionAcc = omit(data, ['currentTokenGold', 'currentToken']);
    return ({
      ...selectionAcc,
      currentTokenGold: currentTicketbyCode
    });
  } else {
    const selectionAcc = omit(data, ['currentTokenSilver', 'currentToken']);
    return ({
      ...selectionAcc,
      currentTokenSilver: currentTicketbyCode
    });
  }
};

export const getMerchantCriteria = (rawData) => map(rawData, (eachData) => (
  {
    value: result(eachData, 'merchantCriteria', ''),
    salesPerAnum: result(eachData, 'salesPerAnum', ''),
    netWorth: result(eachData, 'netWorth', ''),
    numberOfEmployees: result(eachData, 'numberOfEmployees', ''),
    merchantCriteria: result(eachData, 'merchantCriteria', ''),
    merchantCode: result(eachData, 'merchantCode', '')
  }));

export const transformOpeningDataCC = (rawData) => map(rawData, (eachData) => ({
  accountType: 'OpeningCC',
  typeOpening: 'openingCC',
  productCode: 'CC',
  ...eachData
}));

export const transformOpeningDataSA = (rawData) => map(rawData, (eachData) => ({
  accountType: 'OpeningSA',
  typeOpening: 'openingSA',
  productCode: 'SA',
  ...eachData
}));

export const getDataAccountListSplitBill = (rawData) => map(rawData, (eachData) => ({
  value: String(result(eachData, 'id', '')),
  accountMode: result(eachData, 'accountMode', ''),
  expiryDate: result(eachData, 'expiryDate', ''),
  accountTypeCode: result(eachData, 'accountTypeCode', ''),
  isDefaultAccount: result(eachData, 'isDefaultAccount', ''),
  label: result(eachData, 'label', ''),
  balances: result(eachData, 'balances', ''),
  currency: result(eachData, 'currency', ''),
  productType: result(eachData, 'productType', ''),
  id: result(eachData, 'id', ''),
  rdnDetail: result(eachData, 'rdnDetail', ''),
  accountNumber: result(eachData, 'accountNumber', ''),
  allowFlag: result(eachData, 'allowFlag', ''),
  name: result(eachData, 'name', ''),
  accountType: result(eachData, 'accountType', ''),
  bank: result(eachData, 'bank', ''),
  bankBranch: result(eachData, 'bankBranch', []),
}));

export const prepareRemittancePayload = (transferFormData, payeeAccount, transRefNum, easyPin, smsOtp, simasToken, transType, isFavorite, resData) => {
  const {myAccount, amount} = transferFormData; // easyPin also
  const cardlessModeDefault = false;
  const cardlessMode = transType === 'cardlessWithdrawal' ? true : cardlessModeDefault;
  const isScheduledFundTransfer = result(transferFormData, 'transferTime', '') !== '';
  const isNewPayee = result(payeeAccount, 'isNewPayee', false);
  const payload = {
    'accountFrom': String(myAccount.id),
    'currencyRemmitance': String(result(resData, 'transferTransaction.currencyRemmitance', '')),
    'amount': String(amount),
    'mode': String(result(resData, 'transferTransaction.mode', '')),
    'modeCategory': String(result(resData, 'transferTransaction.mode', '')),
    'description': String(result(resData, 'transferTransaction.description', '')),
    'easyPin': String(easyPin),
    'mPinInputed': String(smsOtp),
    'transRefNum': String(transRefNum),
    'tokenInputed': String(simasToken),
    'cardlessMode': cardlessMode,
    'isScheduledFundTransfer': isScheduledFundTransfer,
    'isRepeat': transferFormData.schedule > 0,
    'repeatType': String(result(transferFormData, 'schedule', '')),
    'recurring': String(transferFormData.recurring),
    'maxRecurrence': String(result(transferFormData, 'times', '')),
    'transferDate': String(transferFormData.transferTime),
    'isUsingSimobiPlus': true,
    'swiftCode': String(result(resData, 'transferTransaction.swiftCode')),
    'bankName': String(result(resData, 'transferTransaction.bankName')),
    'country': String(result(resData, 'transferTransaction.country')),
    'accNoReceiver': String(result(resData, 'transferTransaction.creditAccountNumber')),
    'receiverName': String(result(resData, 'transferTransaction.receiverName')),
    'receiverCountry': String(result(payeeAccount, 'dataForm.recipientData.countryRecipient')),
    'receiverState': String(result(resData, 'transferTransaction.receiverState')),
    'receiverAddress': String(result(resData, 'transferTransaction.receiverAddress')),
    'purpose': String(result(resData, 'transferTransaction.purpose')),
    'senderName': String(result(resData, 'transferTransaction.senderName')),
    'senderCountry': String(result(resData, 'transferTransaction.senderCountry')),
    'senderCity': String(result(resData, 'transferTransaction.senderCity')),
    'senderAddress': String(result(resData, 'transferTransaction.senderAddress')),
    'newConfirmTransfer': isNewPayee ? {
      version: 'v4',
    } : null
  };
  return payload;
};

export const getPayeesRemittance = (loginRawData, data) => {
  const payeeData = data;
  return map(payeeData, (eachPayee) => ({
    ...eachPayee,
    'senderName': eachPayee.senderName,
    'swiftCode': eachPayee.swiftCode,
    'country': eachPayee.country,
    'accountNumber': eachPayee.creditAccountNumber,
    'receiverName': eachPayee.receiverName,
    'bankName': eachPayee.bankName,
    'id': eachPayee.id,
    'createdBy': eachPayee.createdBy,
    'createdDate': eachPayee.createdDate,
    'lastUpdatedBy': eachPayee.lastUpdatedBy,
    'lastUpdatedDate': eachPayee.lastUpdatedDate,
    'isTarget': eachPayee.isTarget,
    'label': eachPayee.label
  }));
};



export const prepareConfirmTransferPayloadSetLimit = (formValues, payee, transType,  time, transferMethodType) => {
  const {amount, note} = formValues;
  const payeeType = 'internal';
  const targetAccountType = 'inbanktransfer';
  const mode = 'inbank';
  const cardlessModeDefault = false;
  const cardlessMode = transType === 'cardlessWithdrawal' ? true : cardlessModeDefault;
  const isScheduledFundTransfer = time.transferTime !== '';
  const payload = {
    'accountFrom': String(result(payee, 'myAccount.id', '')),
    'targetAccount': String(result(payee, 'payeeAccount.id', '')),
    'transferList': String(result(payee, 'payeeAccount.id', '')),
    'amount': String(amount),
    'mode': mode,
    'currency': 'IDR',
    'modeCategory': String(payeeType),
    'targetAccountType': String(targetAccountType),
    'description': String(note) || '',
    'cardlessMode': cardlessMode,
    'isScheduledFundTransfer': isScheduledFundTransfer,
    'isRepeat': formValues.schedule > 0,
    'repeatType': String(result(formValues, 'schedule', '')),
    'recurring': String(time.recurring),
    'maxRecurrence': String(result(formValues, 'times', '')),
    'transferDate': String(time.transferTime),
    'isUsingSimobiPlus': true,
    'transferMethodType': String(transferMethodType),
  };
  return payload;
};


export const prepareTransferPayloadSetLimit = (transferFormData, payee, transRefNum, easyPin, smsOtp, simasToken, transType, isFavorite, resData, currency) => {
  const {amount, note, transferMode} = transferFormData; // easyPin also
  const {transferType} = payee;
  const payeeType = getPayeeType(payee);
  const targetAccountType = (payeeType === 'external') ? 'external' : 'inbanktransfer';
  const cardlessModeDefault = false;
  const cardlessMode = transType === 'cardlessWithdrawal' ? true : cardlessModeDefault;
  const isScheduledFundTransfer = result(transferFormData, 'transferTime', '') !== '';
  const network = targetAccountType === 'external';
  const targetAcc = result(resData, 'payeeId', '');
  const payload = {
    'accountFrom': String(result(resData, 'transferTransaction.debitAccountId', '')),
    'targetAccount': String(targetAcc),
    'transferList': String(targetAcc),
    'currency': String(currency),
    'amount': String(amount),
    'mode': network ? 'network' : String(transferMode || transferType),
    'modeCategory': String(payeeType),
    'targetAccountType': String(targetAccountType),
    'description': String(note) || '',
    'easyPin': String(easyPin),
    'mPinInputed': String(smsOtp),
    'transRefNum': String(transRefNum),
    'tokenInputed': String(simasToken),
    'cardlessMode': cardlessMode,
    'isScheduledFundTransfer': isScheduledFundTransfer,
    'isRepeat': transferFormData.schedule > 0,
    'repeatType': String(result(transferFormData, 'schedule', '')),
    'recurring': String(transferFormData.recurring),
    'maxRecurrence': String(result(transferFormData, 'times', '')),
    'transferDate': String(transferFormData.transferTime),
    'isUsingSimobiPlus': true,
    'isFavorite': String(isFavorite),
  };
  return payload;
};
export const getInstalledAppNew = (rawData, OS = '') => map(rawData, (eachData) => ({
  appName: OS === 'ios' ? removeNonAscii(result(eachData, 'info.CFBundleDisplayName', '')) : removeNonAscii(result(eachData, 'appName', '')),
  firstInstallTime: OS === 'ios' ? '' : result(eachData, 'firstInstallTime', ''),
  lastUpdateTime: OS === 'ios' ? '' : result(eachData, 'lastUpdateTime', ''),
}));

export const getListPhoneNew = (dataRawPhone) => map(dataRawPhone, (eachData) => ({
  ...finalListPhone(result(eachData, 'givenName', ''), result(eachData, 'middleName', ''), result(eachData, 'familyName', ''), result(eachData, 'phoneNumbers', []))
}));

export const finalListPhone = (rawNameGiven, rawNameMiddle, rawNameFamily, detailRawData) => {
  const nameRaw =  rawNameGiven + ' ' + rawNameMiddle + ' ' + rawNameFamily;
  let arrayRaw = [];
  const array = map(detailRawData, (eachData) => ({
    name: removeNonAscii(String(nameRaw)),
    phone: removeNonAscii(result(eachData, 'number', '')),
  }));
  arrayRaw = [...array, ...arrayRaw];
  return arrayRaw;
};

export const prepareAllowIB = (prepAllow = {}) => ({
  'serverToken': String(result(prepAllow, 'serverToken', '')),
  'sessionId': String(result(prepAllow, 'sessionId', '')),
  'allow': String(result(prepAllow, 'allow', '')),
});

export const selectedVoucherGiveAway = (dataRaw) => map(dataRaw, (eachData) => ({
  typeVoucher: 'GIVEAWAY',
  data: eachData,
  agregator: 'TADA',
  expiredDate: result(eachData, 'expiredDate', '') + ' ' + result(eachData, 'expiredTime', ''),
  redemptionDate: result(eachData, 'drawDate', '')
}));

export const getSourceAccountRadioButton = (rawData) => map(rawData, (eachData) => (
  {
    value: String(result(eachData, 'id', '')),
    id: String(result(eachData, 'id', '')),
    accountNumber: result(eachData, 'accountNumber', ''),
    balances: result(eachData, 'balances.availableBalance', ''),
    productType: result(eachData, 'productType', ''),
    currency: result(eachData, 'currency', ''),
    bank: result(eachData, 'bank', ''),
    name: result(eachData, 'name', '')
  }));

export const getReferralListMgm = (transactionsRawData) => {
  const transactions = result(transactionsRawData, 'ListTracker', []);
  return transactions.slice().reverse().
    filter((transaction) => transaction.name).
    map((transaction) => ({
      status: result(transaction, 'status', ''),
      event: result(transaction, 'event', ''),
      name: result(transaction, 'name', ''),
      date: result(transaction, 'date', ''),
    }));
};

export const getHistoryReward = (transactionsRawData) => {
  const transactions = result(transactionsRawData, 'ListPoinStatement', []);
  return transactions.slice().reverse().
    filter((transaction) => transaction.name).
    map((transaction) => ({
      status: result(transaction, 'status', ''),
      event: result(transaction, 'event', ''),
      name: result(transaction, 'name', ''),
      date: result(transaction, 'date', ''),
      poin: result(transaction, 'poin', ''),
      transactionType: result(transaction, 'transactionType', ''),
      idStatement: result(transaction, 'id', ''),
      poinType: result(transaction, 'poinType', ''),
    }));
};

export const prepareReferralListPayload = (periodLabel, customStartDate, customEndDate) => {
  let datePeriode = '';
  if (periodLabel === language.MGM__FILTER_DATE_TODAY) {
    const periode = 'today';
    datePeriode = periode;
  } else if (periodLabel === language.MGM__FILTER_DATE_LAST_7DAYS) {
    const periode = '7days';
    datePeriode = periode;
  } else if (periodLabel === language.MGM__FILTER_DATE_LAST_30DAYS) {
    const periode = '30days';
    datePeriode = periode;
  } else if (periodLabel === language.MGM__FILTER_DATE_THIS_MONTH) {
    const periode = 'curMonth';
    datePeriode = periode;
  } else if (periodLabel === language.MGM__FILTER_DATE_CUSTOM) {
    const periode = 'custom';
    datePeriode = periode;
  }
  return {
    period: datePeriode,
    fromDate: customStartDate,
    toDate: customEndDate,
  };
};

export const transformOpeningDataLOAN = (rawData) => map(rawData, (eachData) => ({
  accountType: 'OpeningLOAN',
  typeOpening: 'openingLOAN',
  productCode: 'LOAN',
  type: 'loanType',
  ...eachData
}));

export const prepareTransferPayloadStarInvestama = (transferFormData, payeeAccount, transRefNum, easyPin, smsOtp, simasToken, transType, isFavorite, silFlag) => {
  const {myAccount, amount, transferMode} = transferFormData; // easyPin also
  const {transferType} = payeeAccount;
  const payeeType = getPayeeType(payeeAccount);
  const targetAccountType = (payeeType === 'external') ? 'external' : 'inbanktransfer';
  const cardlessModeDefault = false;
  const cardlessMode = transType === 'cardlessWithdrawal' ? true : cardlessModeDefault;
  const isScheduledFundTransfer = result(transferFormData, 'transferTime', '') !== '';
  const network = targetAccountType === 'external' && result(myAccount, 'accountType', '') === 'emoneyAccount';
  const payload = {
    'accountFrom': String(myAccount.id),
    'targetAccount': String(payeeAccount.id),
    'transferList': String(payeeAccount.id),
    'currency': String(myAccount.currency),
    'amount': String(amount),
    'mode': network ? 'network' : String(transferMode || transferType),
    'modeCategory': String(payeeType),
    'targetAccountType': String(targetAccountType),
    'description': silFlag === 'new business' ? 'NewBusinessStarInvestama' : 'TopUpStarInvestama',
    'easyPin': String(easyPin),
    'mPinInputed': String(smsOtp),
    'transRefNum': String(transRefNum),
    'tokenInputed': String(simasToken),
    'cardlessMode': cardlessMode,
    'isScheduledFundTransfer': isScheduledFundTransfer,
    'isRepeat': transferFormData.schedule > 0,
    'repeatType': String(result(transferFormData, 'schedule', '')),
    'recurring': String(transferFormData.recurring),
    'maxRecurrence': String(result(transferFormData, 'times', '')),
    'transferDate': String(transferFormData.transferTime),
    'isUsingSimobiPlus': true,
    'isFavorite': String(isFavorite),
  };
  return payload;
};

export const getSourceAccountProxyRadioButton = (rawData) => map(rawData, (eachData) => ({
  ProxyDefinition1_Tp: String(result(eachData, 'ProxyDefinition1_Tp', '')),
  ProxyDefinition1_Val: result(eachData, 'ProxyDefinition1_Val', ''),
  ProxyRegistrationAccount1_RegnId: result(eachData, 'ProxyRegistrationAccount1_RegnId', ''),
  ProxyRegistrationAccount1_DsplNm: result(eachData, 'ProxyRegistrationAccount1_DsplNm', ''),
  GenericFinancialIdentification1_Id: result(eachData, 'GenericFinancialIdentification1_Id', ''),
  GenericAccountIdentification1_Id: result(eachData, 'GenericAccountIdentification1_Id', ''),
  CashAccountType2ChoiceProxy_Prtry: result(eachData, 'CashAccountType2ChoiceProxy_Prtry', ''),
  CashAccount40_Nm: result(eachData, 'CashAccount40_Nm', ''),
  ScndIdDefinition1_Tp: result(eachData, 'ScndIdDefinition1_Tp', ''),
  ScndIdDefinition1_Val: result(eachData, 'ScndIdDefinition1_Val', ''),
  ProxyRegistrationAccount1_RegnSts: result(eachData, 'ProxyRegistrationAccount1_RegnSts', ''),
  BI_AddtlCstmrInf_Tp: result(eachData, 'BI_AddtlCstmrInf_Tp', ''),
  BI_AddtlCstmrInf_Id: result(eachData, 'BI_AddtlCstmrInf_Id', ''),
  BI_AddtlCstmrInf_RsdntSts: result(eachData, 'BI_AddtlCstmrInf_RsdntSts', ''),
  BI_AddtlCstmrInf_TwnNm: result(eachData, 'BI_AddtlCstmrInf_TwnNm', ''),
  AccountLWIdentification_Id: result(eachData, 'GenericAccountIdentification1_Id', ''),
}));

export const getPayeeProxyAddress = (loginRawData, data) => {
  const payeeData = data;
  return map(payeeData, (eachPayee) => ({
    ...eachPayee,
    'id': eachPayee.id,
    'accountNumber': eachPayee.accountNumber || String(eachPayee.id),
    'bicCode': eachPayee.bicCode || null,
    'credPerson': eachPayee.credPerson || null,
    'credAccount': eachPayee.credAccount || null,
    'name': eachPayee.name || null,
    'accountType': eachPayee.accountType || null,
    'isBiFast': true,
  }));
};

export const prepareGetPayeeNameBiFast = (formData) => (
  {
    'accountCustomer': String(formData.accountNumber),
    'securityTypeCode': '11',
    'language': 'EN',
    'proxyType': String(formData.proxyType),
    'proxyValue': String(formData.biFastProxy).toUpperCase(),
  });

export const prepareConfirmTransferBiFastPayload = (formValues, payee, transType, time, transferMethodType, isValas = false, accountList) => {
  const {myAccount, amount, note} = formValues;
  const targetAccountType = 'bifasttransfer';
  const isNewAccount = result(payee, 'id', '') === '' || result(payee, 'id', '') === null;
  const cardlessModeDefault = false;
  const cardlessMode = transType === 'cardlessWithdrawal' ? true : cardlessModeDefault;
  const isScheduledFundTransfer = time.transferTime !== '';
  const currencyDeterminant = String(result(formValues, 'currency.name', String(result(myAccount, 'currency', ''))));
  const currencyTarget =  isValas ? currencyDeterminant : String(result(myAccount, 'currency', ''));
  const targetAccountBank = result(payee, 'biFastPayee.targetAccountBank', '');
  const targetAccountName = result(payee, 'biFastPayee.targetAccountName', '');
  const targetAccountNumber = result(payee, 'biFastPayee.targetAccountNumber', '');
  const proxyType = result(payee, 'biFastPayee.proxyType', '');
  const proxyValue = result(payee, 'biFastPayee.proxyValue', '');
  const accountCustomer = result(payee, 'accNoCust', '');
  const accNo = result(accountList, '[0].accountNumber');
  const payload = {
    'accountFrom': String(result(myAccount, 'id', '')),
    'amount': String(amount),
    'mode': 'bifast',
    'currency': currencyTarget,
    'modeCategory': 'bifast',
    'targetAccountType': String(targetAccountType),
    'description': String(note) || '',
    'cardlessMode': cardlessMode,
    'isScheduledFundTransfer': isScheduledFundTransfer,
    'isRepeat': formValues.schedule > 0,
    'repeatType': String(result(formValues, 'schedule', '')),
    'recurring': String(time.recurring),
    'maxRecurrence': String(result(formValues, 'times', '')),
    'transferDate': String(time.transferTime),
    'isUsingSimobiPlus': true,
    'transferMethodType': String(transferMethodType),
    'targetAccountBank': String(targetAccountBank),
    'targetAccountName': String(targetAccountName),
    'targetAccountNumber': String(targetAccountNumber),
    'proxyType': String(result(payee, 'proxyType', '')) || String(result(payee, 'biFastPayee.proxyType', '')),
    'proxyValue': String(result(payee, 'proxyValue', '')) || String(result(payee, 'biFastPayee.proxyValue', '')),
    'accountCustomer': String(accNo),
    'newConfirmTransfer': isNewAccount ? {
      version: 'v4',
      proxyType: String(proxyType),
      proxyValue: String(proxyValue),
      accountCustomer: String(accountCustomer),
      description: String(result(payee, 'description', '')),
      modeCategory: 'bifast',
    } : null
  };
  return payload;
};

export const prepareTransferBiFastPayload = (transferFormData, payeeAccount, transRefNum, easyPin, smsOtp, simasToken, transType, isFavorite, resData, currency) => {
  const {myAccount, amount, note} = transferFormData; // easyPin also
  const payeeType = 'bifast';
  const targetAccountType = 'bifasttransfer';
  const cardlessModeDefault = false;
  const cardlessMode = transType === 'cardlessWithdrawal' ? true : cardlessModeDefault;
  const isScheduledFundTransfer = result(transferFormData, 'transferTime', '') !== '';
  const isNewAccount = result(payeeAccount, 'id', '') === '' || result(payeeAccount, 'id', '') === null;
  const targetAccountBank = result(payeeAccount, 'biFastPayee.targetAccountBank', '') || result(resData, 'transferTransaction.targetAccountBank', '');
  const targetAccountName = result(payeeAccount, 'biFastPayee.targetAccountName', '') || result(resData, 'transferTransaction.targetAccountName', '');
  const targetAccountNumber = result(payeeAccount, 'biFastPayee.targetAccountNumber', '') || result(resData, 'transferTransaction.targetAccountNumber', '');
  const proxyType = result(payeeAccount, 'biFastPayee.proxyType', '') || result(payeeAccount, 'proxyType', '');
  const proxyValue = result(payeeAccount, 'biFastPayee.proxyValue', '') || result(payeeAccount, 'proxyValue', '');
  const payload = {
    'accountFrom': String(myAccount.id),
    'currency': String(currency),
    'amount': String(amount),
    'mode': String(payeeType),
    'modeCategory': String(payeeType),
    'targetAccountType': String(targetAccountType),
    'description': String(note) || '',
    'easyPin': String(easyPin),
    'mPinInputed': String(smsOtp),
    'transRefNum': String(transRefNum),
    'tokenInputed': String(simasToken),
    'cardlessMode': cardlessMode,
    'isScheduledFundTransfer': isScheduledFundTransfer,
    'isRepeat': transferFormData.schedule > 0,
    'repeatType': String(result(transferFormData, 'schedule', '')),
    'recurring': String(transferFormData.recurring),
    'maxRecurrence': String(result(transferFormData, 'times', '')),
    'transferDate': String(transferFormData.transferTime),
    'isUsingSimobiPlus': true,
    'isFavorite': String(isFavorite),
    'targetAccountBank': String(targetAccountBank),
    'targetAccountName': String(targetAccountName),
    'targetAccountNumber': String(targetAccountNumber),
    'proxyType': String(proxyType),
    'proxyValue': String(proxyValue),
    'newConfirmTransfer': isNewAccount ? {
      accountId: String(resData.payeeId),
    } : null
  };
  return payload;
};
