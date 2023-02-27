/* eslint-disable */;
import each from 'lodash/each';
import forEach from 'lodash/forEach';
import {language} from '../config/language';
import isEmpty from 'lodash/isEmpty';
import {formatFieldAmount, generateLanguageGenericBiller, generateRegex, currencySymbol, currencyFormatter, formatForexAmount} from './transformer.util';
import result from 'lodash/result';
import maxBy from 'lodash/maxBy';
import find from 'lodash/find';
import split from 'lodash/split';
import includes from 'lodash/includes';
import startsWith from 'lodash/startsWith';
import findIndex from 'lodash/findIndex';
import moment from 'moment';

const validateRequiredFields = (values, fields) => {
  const errors = {};
  each(fields, ((field) => {
    if ((!values[field] && values[field] !== 0) || isEmpty(values[field])) {
      errors[field] = language.VALIDATION__REQUIRED_FIELD;
    }
  }));
  return errors;
};

const validateRequiredString = (values, fields) => {
  const errors = {};
  each(fields, ((field) => {
    if (values[field] === '' || values[field] === undefined || values[field] === null || startsWith(values[field], ' ')) {
      errors[field] = language.VALIDATION__REQUIRED_FIELD_STRING;
    }
  }));
  return errors;
};

const isValidPassword = (value, userName, passwordPolicyRegex, passwordPolicyMessage) => {
  let validateMessage = null;
  if (passwordPolicyRegex && passwordPolicyMessage) {
    const regxRules = passwordPolicyRegex.split('|');
    const regxMessage = passwordPolicyMessage.split('|');
    for (let index = 0; index < regxRules.length; index++) {
      const regxRulesFix = generateRegex(regxRules[index], userName);
      if (!regxRulesFix.test(value)) {
        validateMessage = regxMessage[index];
        break;
      }
    }
  } else {
    validateMessage = String(language.ERROR_MESSAGE__PASSWORD_COULD_NOT_SET);
  }
  return validateMessage;
};

const isValidUsername = (value) => {
  const userNameRegx = /(?=^.[0-9a-zA-Z]{7,20}$)(?=.*\d)(?=.*[a-zA-Z]).*/;
  return userNameRegx.test(value);
};

const validateMobile = (mobileNo, validation) => {
  const regex = validation && new RegExp(validation);
  const result = (regex && regex.test(mobileNo));
  if (!result) {
    return language.VALIDATE__VALID_MOBILE_NO;
  }
  return;
};

const validateSubscriberNo = (subscriberNo, validation, subscriberText) => {
  const regex = validation && new RegExp(validation);
  const result = (regex && regex.test(subscriberNo));
  const subscriberNoText = language[generateLanguageGenericBiller(subscriberText)];
  let message = null;

  if (!result && validation !== '') {
    if (subscriberNoText !== '' && subscriberNoText !== 'undefined') {
      message = language.VALIDATE__VALID_GENERIC_BILL_FIRST + ' ' + subscriberNoText + ' ' + language.VALIDATE__VALID_GENERIC_BILL_LAST;
    } else {
      message = language.VALIDATE__VALID_SUBSCRIBER_NO;
    }
    return message;
  }
  return;
};

const validateCreditCard = (accNo) => {
  if (validateNumber(accNo)) {
    return validateNumber(accNo);
  }
  if (accNo.length < 16) {
    return language.VALIDATE__VALID_CREDIT_CARD;
  }
  return;
};

const isInRange = (minval, maxval, val, currency) => {
  const min = parseFloat(minval);
  const value = parseFloat(val);
  const max = parseFloat(maxval);
  const currencySym = currencySymbol(currency);
  if (min && value < min) {
    return language.VALIDATE__LESS_THAN_MIN + ' ' + currencySym + ' ' + formatFieldAmount(min);
  }
  if (value > max) {
    return language.VALIDATE__GREATER_THAN_MAX + ' ' + currencySym + ' ' + formatFieldAmount(max);
  }

  return;
};

const isModulus = (val, dev) => {
  const value = parseFloat(val);
  const devide = parseFloat(dev);
  if (value % devide > 0) {
    return language.CARDLESSWITHDRAWAL__AMOUNT_MUST_BE_MULTIPLE + ' Rp ' + formatFieldAmount(devide);
  }
  return;
};


const isInRangeRTGS = (val = 0, transferChargeConfig = [], transferMode = '') => {
  if (transferMode === 'rtgs') {
    let min = parseFloat(0);
    let max = parseFloat(0);
    let value = parseFloat(val);
    forEach(transferChargeConfig, function (values) {
      if (result(values, 'mode', '') === 'rtgs') {
        min = parseFloat(result(values, 'minAmount', 0));
        max = parseFloat(result(values, 'maxAmount', 0));
        value = parseFloat(val);
      }
    });
    if (min && value <= min) {
      return language.VALIDATE__LESS_THAN_MIN_RTGS + ' : Rp ' + formatFieldAmount(min);
    }
    if (max && value > max) {
      return language.VALIDATE__GREATER_THAN_MAX_RTGS + ' : Rp ' + formatFieldAmount(max);
    }
  }
  return;
};

const validateMaxTransferAmount = (val = 0, transferChargeConfig = []) => {
  const max = Number(result(transferChargeConfig, 'max_amount', ''));
  if (max && val > max) {
    return language.VALIDATE__GREATER_THAN_MAX_RTGS + ' : Rp ' + formatFieldAmount(max);
  } else {
    return;
  }
};


const validateMaxTransferNetwork = (val = 0, transferChargeConfig = []) => {
  const max = Number(result(transferChargeConfig, 'max_amount', ''));
  if (max && val > max) {
    return language.VALIDATE__GREATER_THAN_MAX_RTGS + ' : Rp ' + formatFieldAmount(max);
  } else {
    return;
  }
};

const validateNumber = (input) => (/(^[0-9]*$)/).test(input) ? undefined : language.VALIDATE__NUMBER;

const validateWaterbillConsumerNo = (consumerNo) => {
  if (validateNumber(consumerNo)) {
    return validateNumber(consumerNo);
  }
  if (consumerNo.length > 15) {
    return language.VALIDATE__WATER_BILL_CONSUMER_NO_LENGTH;
  }
  return;
};

const validateBalance = (balance, amount, productType, isSplitBill) => {
  const availableBalance = parseFloat(balance);
  const transactionAmount = parseFloat(amount);
  if (transactionAmount > availableBalance) {
    if (productType === 'saving') {
      return language.SAVING__ACCOUNT_NOT_ENOUGH_BALANCE;
    } else if (productType === 'Credit Card') {
      return language.CREDITCARD__MAX_LIMIT;
    } else {
      if (isSplitBill) {
        return language.SPLITBILL__LESS_BALANCE;
      } else {
        return language.VALIDATE__NOT_ENOUGHT_BALANCE;
      }
    }
  }
  return;
};

const validateFieldsMatch = (field, confirmField) => {
  if (field !== confirmField) {
    return language.VALIDATE__VALIDATE__FIELDS_MATCH;
  }
  return;
};

const validateCreatePassword = (newPassword, oldPassword, userName, passwordPolicyRegex, passwordPolicyMessage) => {
  if (oldPassword === newPassword) {
    return language.VALIDATION__DIFFERENT_NEW_PASSWORD;
  }
  const messageError = isValidPassword(newPassword, userName, passwordPolicyRegex, passwordPolicyMessage);
  if (messageError) {
    return String(messageError);
  }
  return;
};

const validatePinCodeLength = (field) => {
  if (!field || field.length < 6) {
    return language.VALIDATE__PINCODE_FIXED_LENGHT;
  }
  return;
};

const validatePostalCodeLength = (field) => {
  if (!field || field.length < 5) {
    return language.VALIDATE_POSTAL_CODE_LENGTH;
  }
  return;
};

const validateDateFormat = (value) => {
  const rightFormat = /[0-9]{2}[/][0-9]{2}[/][0-9]{4}/g;
  if (!rightFormat.test(value)) {
    return language.VALIDATE__DATE_MUST_BE_MATCH_A_FORMAT;
  }
  return;
};

const validateName = (name) => {
  const rightFormat = /[^a-zA-Z. ]/g;
  if (rightFormat.test(name)) {
    return language.VALIDATE__NAME_MUST_BE_MATCH_A_FORMAT;
  }
  return;
};

const validateMaxTransactionAmount = (amount, tokenConfig, isOwnAccount) => {
  const maxAmountObject = maxBy(tokenConfig, (config) => {
    const max = isOwnAccount === 'own' || isOwnAccount === true ? parseInt(config.max_amount_own) : parseInt(config.max_amount);
    return max;
  });
  const maxAmount = isOwnAccount === 'own' || isOwnAccount === true ? result(maxAmountObject, 'max_amount_own') : result(maxAmountObject, 'max_amount');
  if (parseInt(maxAmount) === -1) {
    return;
  } else if (parseInt(amount) > parseInt(maxAmount)) {
    return language.VALIDATE__GREATER_THAN_MAX + ' : ' + 'Rp' + ' ' + formatFieldAmount(maxAmount);
  }
  return;
};

const validateIdNumber = (idCardNumber) => {
  const formatIdCard = /(^[0-9]*$)/;
  if (!formatIdCard.test(idCardNumber)) {
    return language.VALIDATE__NUMBER;
  } else if (idCardNumber.length !== 16) {
    return language.IDENTITYFIFTHFORM__ID_CARD_NUMBER_LIMIT;
  }
  return;
};

const validatePhoneNumber = (phone) => {
  const formatPhone = /^[0-9]*$/;
  if (startsWith(phone, '628')) {
    if ((phone.length < 10 || !formatPhone.test(phone))) {
      return language.IDENTITYFIFTHFORM__PHONE_ERROR;
    }
    return;
  } else if (startsWith(phone, '08')) {
    if ((phone.length < 10 || !formatPhone.test(phone))) {
      return language.IDENTITYFIFTHFORM__PHONE_ERROR;
    }
    return;
  } else {
    return language.FIELD_PHONE_NUMBER__ERROR_STARTING;
  }
};

const validateEmail = (email) => {
  const formatEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!formatEmail.test(email)) {
    return language.IDENTITYFIFTHFORM__EMAIL_ERROR;
  } else {
    if (includes(email, ' ')) {
      return language.IDENTITYFIFTHFORM__EMAIL_ERROR;
    } else {
      return;
    }
  }
};

const validateNameEform = (name) => {
  const rightFormat = /[^a-zA-Z. ]/g;
  if (rightFormat.test(name)) {
    return language.IDENTITYFIFTHFORM__NAME_ERROR;
  }
  return;
};

const validateTC = (termAndCondition) => {
  if (!termAndCondition) {
    return language.IDENTITYFIFTHFORM__NAME_ERROR;
  }
  return;
};
const validatePackageCode = (value) => {
  const packageCodeRegx = /^[0-9]{2}$/;
  const checkRegx = packageCodeRegx.test(value);
  if (!checkRegx) {
    return language.VALIDATE__PACKAGECODE;
  }
  return;
};

const validateMaxAmount = (amount) => {
  if (amount > 500000000) {
    return language.VALIDATE__MAX_AMOUNT;
  }
  return;
};

const validateNpwpLength = (field) => {
  if (!field || field.length < 15) {
    return language.VALIDATE_NPWP_CODE_LENGTH;
  }
  return;
};

const validateNpwpLengthEtaxFormat = (field) => {
  const finalField = !field ? '' : field.replace(/([,.-])+/g, '');
  if (!finalField || finalField.length < 15) {
    return language.VALIDATE_NPWP_CODE_LENGTH;
  }
  return;
};

const validateAmountEtax = (input) => {
  if (input <= 0) {
    return language.VALIDATE__INPUT_MIN_AMOUNT_ETAX;
  } 
  return;
};

const validateNikLength = (field) => {
  if (!field || field.length < 16) {
    return language.VALIDATE_NIK_CODE_LENGTH;
  }
  return;
};

const validateSmartfrenNumber = (phone) => {
  const prefixPhone = phone.substring(0, 4);
  const smartfrenPrefixList = [
    '0881', '0882', '0883', '0887', '0888', '0889'
  ];
  const isValidNumber = smartfrenPrefixList.indexOf(prefixPhone);
  const formatPhone = /^[0-9\-\+\s\(\)]*$/;
  if (phone.length < 10 || !formatPhone.test(phone)) {
    return language.IDENTITYFIFTHFORM__PHONE_ERROR;
  } else if (isValidNumber < 0) {
    return language.IDENTITYFIFTHFORM__SMARTFREN__NUMBER__ERROR;
  }
  return;
};

const validatePrefixBiller = (subscriberNo = '', prefixBiller = '') => {
  const prefixList = prefixBiller === null ? {} : split(prefixBiller.replace(/[^\d|]/g, ''), '|');
  const isValidNumber = findIndex(prefixList, (prefix) => subscriberNo.startsWith(prefix));
  if (isValidNumber < 0 && !isEmpty(prefixList)) {
    return language.VALIDATE__VALID_SUBSCRIBER_NO;
  } else {
    return;
  }
};

const validate21yearsold = (dateValue = '', serverTime, code = '0') => {
  const min = code === '2' ? 17 : 21;
  const server = moment((serverTime));
  const mininumDate = server.subtract(min, 'years');
  const birthday = dateValue;
  if (moment(birthday).isBefore(mininumDate) || !dateValue) {
    return '';
  } else {
    return code === '2' ? language.CREDITCARD__AGE__ERROR_MARRIED : language.CREDITCARD__AGE__ERROR;
  }
};

const validate17yearsold = (dateValue = '', serverTime) => {
  const min = 17;
  const server = moment((serverTime));
  const mininumDate = server.subtract(min, 'years');
  const birthday = dateValue;
  if (moment(birthday).isBefore(mininumDate) || !dateValue) {
    return '';
  } else {
    return language.CREDITCARD__AGE__ERROR_MARRIED;
  }
};

const validateMonthlyIncome = (monthlyIncome) => {
  if (parseInt(monthlyIncome) < 3000000 || !monthlyIncome) {
    return language.CREDITCARD__MONTHY_INCOME_ERROR;
  } else {
    return;
  }
};

const isPrk = (prkList, account) => {
  const prefixList = split(prkList, ',');
  const accountTypeCode = result(account, 'accountTypeCode', '');
  const prkAccount = find(prefixList, (val) => val === accountTypeCode);
  return prkAccount !== undefined;
};

const checkLimitCreateCC = (limit, type) => {
  if (type === 'CCI-SIMOBI-002') {
    if (parseInt(limit) < 450000 || parseInt(limit) > 1800000000) {
      return language.CREATE_ACCOUNT__INDIGO_LIMIT;
    } else {
      return '';
    }
  } else if (type === 'CCO-SIMOBI-002') {
    if (parseInt(limit) < 450000 || parseInt(limit) > 1800000000) {
      return language.CREATE_ACCOUNT__ORAMI_LIMIT;
    } else {
      return '';
    }
  } else if (type === 'CCA-SIMOBI-002') {
    if (parseInt(limit) < 450000 || parseInt(limit) > 1800000000) {
      return language.CREATE_ACCOUNT__ALFAMART_LIMIT;
    } else {
      return '';
    }
  } else {
    return '';
  }
};

const getTotalDeposit = (limit) => {
  let totalDeposit = 0;
  if (parseInt(limit) >= 450000 && parseInt(limit) <= 1800000000) {
    totalDeposit = (100 / 90) * parseInt(limit);
  }
  return totalDeposit;
};

const isValidTerminalName = (value) => {
  const userNameRegx = /(?=^.[0-9a-zA-Z]{5,12}$)(?=.*\d)(?=.*[a-zA-Z]).*/;
  if (userNameRegx.test(value) === false) {
    return language.QR_GPN__TERMINAL_VALIDATOR;
  }
  return;
};

const validateAlphanumeric = (idCardNumber, errorString) => {
  const regex = /(^[0-9a-zA-Z]*$)/;
  if (!regex.test(idCardNumber)) {
    return errorString;
  }
  return;
};

const maxCharacter = (maxval, val) => {
  const max = parseInt(maxval);
  let valLength = 0;
  if (val) {
    valLength = parseInt(val.length);
  }
  if (valLength > max) {
    return language.TX_TRAVEL_VALIDATE_GREATER_THAN_MAX + max;
  }
  return;
};

const validateBirthDate = (tipe, val) => {
  const today = moment(new Date(), 'M/D/YYYY');
  const born = moment(val, 'M/D/YYYY');
  const diffYears = (born.diff(today, 'years')) * -1;

  if (tipe === 'ADULT') {
    if (diffYears < 12) {
      return language.TX_TRAVEL_VALIDATE_ADULT_AGE;
    } else {
      return;
    }
  } else if (tipe === 'CHILD') {
    if ((diffYears < 2) || (diffYears > 11)) {
      return language.TX_TRAVEL_VALIDATE_CHILD_AGE;
    } else {
      return;
    }
  } else if (tipe === 'INFANT') {
    if ((diffYears < 0) || (diffYears > 2)) {
      return language.TX_TRAVEL_VALIDATE_INFANT_AGE;
    } else {
      return;
    }
  } else {
    return;
  }
};

// true for min, false for max
const validateDateRange = (toBeChecked, rangeDate, minOrMax, canBeEqual, format = 'DD MMM YYYY') => {
  const checkedDate = moment(toBeChecked, format);
  let comparedDate = moment(rangeDate, format);
  comparedDate = !canBeEqual ? minOrMax ? moment(comparedDate.add(1, 'd'), format) : moment(comparedDate.add(-1, 'd'), format) : moment(rangeDate, format);
  if (minOrMax) {
    // upper bound
    if (checkedDate.diff(comparedDate, 'd') < 0) {
      return language.VALIDATE_DATE_RANGE__LOW_DATE;
    }
  } else {
    // lower bound
    if (checkedDate.diff(comparedDate, 'd') > 0) {
      return language.VALIDATE_DATE_RANGE__HIGH_DATE;
    }
  }
  return;
};

const validateTotalDurationInDays = (chosenDate, limitDate, format, minOrMax, maxDuration = '') => validateTotalDuration(chosenDate, limitDate, format, minOrMax, maxDuration, 'day');

const validateTotalDurationInYears = (chosenDate, limitDate, format, minOrMax, maxDuration = '') => validateTotalDuration(chosenDate, limitDate, format, minOrMax, maxDuration, 'year');

const validateTotalDurationInMonths = (chosenDate, limitDate, format, minOrMax, maxDuration = '') => validateTotalDuration(chosenDate, limitDate, format, minOrMax, maxDuration, 'month');

const validateTotalDurationInHours = (chosenDate, limitDate, format, minOrMax, maxDuration = '') => validateTotalDuration(chosenDate, limitDate, format, minOrMax, maxDuration, 'hour');

const validateTotalDuration = (chosenDate, limitDate, format, minOrMax, maxDuration = '',
  timeConstraint /* this is for determining whether the duration is days, months, hours, years, etc */) => {
  if (isNaN(parseInt(maxDuration))) return;
  const limit = parseInt(maxDuration);
  const max = moment(limitDate, format);
  const min = moment(chosenDate, format);
  const diff = Math.abs(max.diff(min, timeConstraint));
  if (minOrMax) {
    // lower bound
    if (diff < limit) return `${language.VALIDATE_DURATION__UNDER_LIMIT} ${limit} ${
      timeConstraint === 'day' ? language.VALIDATE_DURATION__DAYS :
        timeConstraint === 'month' ? language.VALIDATE_DURATION__MONTHS :
          timeConstraint === 'year' ? language.VALIDATE_DURATION__YEARS :
            timeConstraint === 'hour' ? language.VALIDATE_DURATION__HOURS :
              'time'}`;
  } else {
    // upper bound
    if (diff > limit) return `${language.VALIDATE_DURATION__OVER_LIMIT} ${limit} ${
      timeConstraint === 'day' ? language.VALIDATE_DURATION__DAYS :
        timeConstraint === 'month' ? language.VALIDATE_DURATION__MONTHS :
          timeConstraint === 'year' ? language.VALIDATE_DURATION__YEARS :
            timeConstraint === 'hour' ? language.VALIDATE_DURATION__HOURS :
              'time'}`;
  }
  return;
};

const validateTravelInsuranceReturnDate = (retDate, goDate, format, limit) => {
  const isValidDate = validateDateRange(retDate, goDate, true, false, format);
  if (isValidDate) return isValidDate;
  return validateTotalDurationInDays(retDate, goDate, format, false, limit);
};

const validateZipCode = (zipCode) => {
  const zipCodeFormat = /(^[0-9]*$)/;
  const minLength = 5;
  const maxLength = minLength;
  const value = validateValue(zipCode, zipCodeFormat, language.VALIDATE__NUMBER);
  const length = validateLength(zipCode, minLength, maxLength);
  if (value) return value;
  if (length) return length;
  return;
};

const validateValue = (value, regex, errorMsg = language.GENERIC__ERROR_VALIDATION) => {
  if (!regex.test(value)) {
    return errorMsg;
  }
  return;
};

const validateLength = (val, minNumber = 0, maxNumber = (val.length) ? (val.length) : 20) => {
  const usedVal = (val) ? val : '';
  const errorMsg = (number, minOrMax) => language.MIN_NUMBER__ERROR1 + ' ' + ((minOrMax) ? language.GENERIC__MINIMUM : language.GENERIC__MAXIMUM) + ' ' + number + ' ' + language.MIN_NUMBER__ERROR2;
  if (minNumber === maxNumber && usedVal.length !== minNumber) return language.MIN_NUMBER__ERROR1 + ' ' + minNumber + ' ' + language.MIN_NUMBER__ERROR2;
  if (usedVal.length < minNumber)
    return errorMsg(minNumber, true);
  else if (usedVal.length > maxNumber)
    return errorMsg(maxNumber, false);
  return;
};

const validateNamecashier = (name) => {
  const validateMin = (name.length < 6);
  if (validateMin) {
    return language.QR_GPN__TERMINAL_VALIDATOR;
  }
};

const validateCheckbox = (checked) => {
  if (!checked) return language.ERROR_MESSAGE__TNC_CHECKBOX;
};

const validateGenflixPassword = (password, isHidden) => {
  if (isHidden) return;
  return validateLength(password, 8, 20);
};

const validateMinAmount = (amount, minAmount, sendAccountAvailableBalance, chooseAcc, isTypeCurrency) => {
  if (amount !== '' && sendAccountAvailableBalance === '' && chooseAcc) {
    return '';
  } else if (amount !== '' && sendAccountAvailableBalance !== '' && !chooseAcc) {
    if (amount < minAmount) {
      return language.VALIDATE__MIN_AMOUNT_REKSADANA + ' ' + (isTypeCurrency) + ' ' + (currencyFormatter(minAmount));
    } else if (amount > sendAccountAvailableBalance) {
      return language.VALIDATE__NOT_ENOUGHT_BALANCE;
    }
  } else if (amount !== '' && sendAccountAvailableBalance === '' && !chooseAcc) {
    if (amount < minAmount) {
      return language.VALIDATE__MIN_AMOUNT_REKSADANA + ' ' + (minAmount);
    } else {
      return '';
    }
  }
  return '';
};

const validateMinRedemp = (unitInput, redempMinUnit, redempMinAmount, totalUnit, editableInput, NABPerUnit, numberOfUnit, redemptMinBalanceUnit) => {
  const toNumberUnitInput = Number(unitInput);
  const toNumberTotalUnit = Number(numberOfUnit);
  if (editableInput) {
    return '';
  } else {
    if (toNumberUnitInput < redempMinUnit) {
      return language.REKSADANA_SELL_MIN_BALL + '' + (redempMinUnit) + ' Unit';
    } 
  } if (toNumberUnitInput > toNumberTotalUnit) {
    return language.REKSADANA_SELL_TITLE__ERR_MSG + '' + (toNumberTotalUnit);
  } else if ((toNumberTotalUnit - toNumberUnitInput) < redemptMinBalanceUnit) {
    return language.REKSADANA_REDEMPTION_BALANCE_MSG + ' ' + (redemptMinBalanceUnit);
  }
};

const validateRtRw = (value) => {
  const regex = /([0-9]{1,3})(\/)([0-9]{1,3})$/g;
  return regex.test(value);
};

const validateMaxBalanceEmoney = (amount, balanceEmoney) => {
  let errorBalance;
  const value = parseFloat(amount);
  const valueEmoney = parseFloat(balanceEmoney);
  const isValidBalance = value + valueEmoney;
  if (isValidBalance > 500000) {
    errorBalance = language.VALIDATE__MAX_AMOUNT;
  }
  return errorBalance;
};
const isInRangeEmoney = (minval, maxval, val, toEmoney, payee = {}, accountList) => {
  const min = parseFloat(minval);
  const value = parseFloat(val);
  const max = parseFloat(maxval);
  const emoneyAccount = find(accountList,
    {accountType: 'emoneyAccount', accountNumber: payee.accountNumber});
  const availableBalances = result(emoneyAccount, 'balances.availableBalance', '');
  const availableBalancesNum = parseFloat(availableBalances);
  const sum = availableBalancesNum + value;

  if (min && value < min) {
    return language.VALIDATE__LESS_THAN_MIN + ' Rp ' + formatFieldAmount(min);
  }
  if (value > max) {
    return language.VALIDATE__GREATER_THAN_MAX + ' Rp ' + formatFieldAmount(max);
  }
  if (toEmoney) {
    if (payee.accountType === 'emoneyAccount'  || payee.accountType === 'Emoney Account' || payee.transferType === 'own') {
      if (value > 10000000 || sum > 10000000) {
        return language.VALIDATE__EMONEY_GREATER_THAN;
      }
    }
  }
  return;
};

const validateKtpDukcapil = (idCardNumber) => {
  const formatIdCard = /(^[0-9]*$)/;
  if (!formatIdCard.test(idCardNumber)) {
    return language.VALIDATE__NUMBER;
  } else if (idCardNumber.length !== 16) {
    return language.IDENTITYFIFTHFORM__ID_CARD_NUMBER_LIMIT;
  } else if (idCardNumber.substring(idCardNumber.length - 4) === '0000' || idCardNumber.substring(0, 1) === '0') {
    return language.VALIDATE__KTP_FORMAT;
  }
  return;
};

const isInRangeTd = (minval, maxval, val, currency) => {
  const min = parseFloat(minval);
  const value = parseFloat(val);
  const max = parseFloat(maxval);
  const currencySym = currencySymbol(currency);
  const minVal = currency === 'IDR' ? currencyFormatter(min) : formatForexAmount(min, currency);
  const maxVal = currency === 'IDR' ? currencyFormatter(max) : formatForexAmount(max, currency);
  if (min && value < min) {
    return language.VALIDATE__LESS_THAN_MIN + ' ' + currencySym + ' ' + formatFieldAmount(minVal);
  }
  if (value > max) {
    return language.VALIDATE__GREATER_THAN_MAX + ' ' + currencySym + ' ' + formatFieldAmount(maxVal);
  }
  return;
};

const validateMaxTransactionAmountTd = (amount, tokenConfig, isOwnAccount, currency) => {
  const maxAmountObject = maxBy(tokenConfig, (config) => {
    const max = isOwnAccount === 'own'  || isOwnAccount === true ? parseInt(config.max_amount_own) : parseInt(config.max_amount);
    return max;
  });
  const maxAmount = isOwnAccount === 'own' || isOwnAccount === true ? result(maxAmountObject, 'max_amount_own') : result(maxAmountObject, 'max_amount');
  if (parseInt(maxAmount) === -1) {
    return;
  } else if (parseInt(amount) > parseInt(maxAmount)) {
    return language.VALIDATE__GREATER_THAN_MAX + ' : ' + currency + formatFieldAmount(maxAmount);
  }
  return;
};

const validateTotalPremi = (amount, isSilIdrUsd) => {
  if (isSilIdrUsd === 'IDR') {
    if (amount < 30000000) {
      return language.SIL__MIN_AMOUNT_POLIS_IDR;
    }
  } else if (isSilIdrUsd === 'USD') {
    if (amount === 2000) {
      return;
    } else if (amount > 3000) {
      return;
    } else if (amount >= 2001 && amount <= 2999) {
      return language.SIL__MIN_AMOUNT_POLIS_USD2;
    } else if (amount <= 1999) {
      return language.SIL__MIN_AMOUNT_POLIS_USD;
    }
  }
};

const validatePhoneNumberHome = (phone) => {
  const formatPhone = /^[0-9]*$/;
  if (startsWith(phone, '62')) {
    if ((phone.length < 11 || !formatPhone.test(phone))) {
      return language.IDENTITYFIFTHFORM__PHONE_HOME_ERROR;
    }
    return;
  }   else if (startsWith(phone, '0')) {
    if ((phone.length < 10 || !formatPhone.test(phone))) {
      return language.IDENTITYFIFTHFORM__PHONE_HOME_ERROR;
    }
    return;
  } else {
    return language.FIELD_PHONE_NUMBER_HOME__ERROR_STARTING;
  }
};

const validateRtRw2 = (value) => {
  const rtRw = /(^[0-9]*$)/;
  const values = validateValue(value, rtRw, language.VALIDATE__NUMBER);
  if (values) return values;
  return;
};

const isInRangeValas = (minval, maxval, val, formValues, currencyRate) => {
  const min = parseFloat(minval);
  const value = parseFloat(val);
  const sourceAccount = result(formValues, 'myAccount', {});

  const balanceAccount = result(sourceAccount, 'balances.availableBalance', '');
  const currencySource = result(sourceAccount, 'currency', '');
  const currencyObject = result(currencyRate, 'currencyObject[0]', {});
  const buyRateSpread = result(currencyObject, 'spreadBuyRate', 0);
  const sellRateSpread = result(currencyObject, 'spreadSellRate', 0);
  const currencyDeterminant = result(currencyRate, 'currencyDeterminant', '');
  const currencySym = currencySymbol(currencySource);
  const currency = result(currencyRate, 'currency', '');
  const spreadBuyRateUSD = buyRateSpread === null ? result(currencyObject, 'spreadBuyRateUSD', 0) : result(currencyObject, 'spreadBuyRateUSD', 0);
  const spreadSellRateUSD = sellRateSpread === null ? result(currencyObject, 'spreadSellRateUSD', 0) : result(currencyObject, 'spreadSellRateUSD', 0);

  let transactionAmountValas = value;
  let transactionAmount = value;
  const max = balanceAccount;
  if (currencyDeterminant === currency) {
    if (currency === 'IDR') {
      if (currencySource === 'IDR') {
        // no converting
      } else if (currencySource === 'USD') {
        transactionAmountValas = transactionAmount / buyRateSpread;
      } else if (currencySource !== 'IDR' && currencySource !== 'USD') {
        transactionAmountValas = transactionAmount / buyRateSpread;
      }
    } else if (currency === 'USD') {
      if (currencySource === 'IDR') {
        transactionAmountValas = transactionAmount * sellRateSpread;
      } else if (currencySource === 'USD') {
        // no converting
      } else if (currencySource !== 'IDR' && currencySource !== 'USD') {
        if (currencySource === 'JPY' || currencySource === 'SGD' || currencySource === 'CNY') {
          transactionAmountValas = transactionAmount * spreadSellRateUSD;
        } else {
          transactionAmountValas = transactionAmount / spreadBuyRateUSD;
        }
      }
    } else if (currency !== 'IDR' && currency !== 'USD') {
      if (currencySource === 'IDR') {
        transactionAmountValas = transactionAmount * sellRateSpread;
      } else if (currencySource === 'USD') {
        if (currency === 'JPY' || currency === 'SGD' || currency === 'CNY') {
          transactionAmountValas = transactionAmount / spreadBuyRateUSD;
        } else {
          transactionAmountValas = transactionAmount * spreadSellRateUSD;
        }
      } else if (currencySource !== 'USD' && currencySource !== 'IDR') {
        if (currencySource === currency) {
          // no converting
        }
      }
    }
  }

  if (min && transactionAmountValas < min) {
    return language.VALIDATE__LESS_THAN_MIN + ' ' + currencySym + ' ' + formatFieldAmount(min);
  }
  if (transactionAmountValas > max) {
    return language.VALIDATE__GREATER_THAN_MAX + ' ' + currencySym + ' ' + formatFieldAmount(max);
  }
  return;
};

const validateBalanceValas = (balance, amount, productType, currencyRate) => {
  const availableBalance = parseFloat(balance);
  const transactionAmount = parseFloat(amount);
  const currencyObject = result(currencyRate, 'currencyObject[0]', {});
  const buyRateSpread = result(currencyObject, 'spreadBuyRate', 0);
  const sellRateSpread = result(currencyObject, 'spreadSellRate', 0);
  const spreadBuyRateUSD = buyRateSpread === null ? result(currencyObject, 'spreadBuyRateUSD', 0) : result(currencyObject, 'spreadBuyRateUSD', 0);
  const spreadSellRateUSD = sellRateSpread === null ? result(currencyObject, 'spreadSellRateUSD', 0) : result(currencyObject, 'spreadSellRateUSD', 0);
  const currencyDeterminant = result(currencyRate, 'currencyDeterminant', '');
  const currency = result(currencyRate, 'currency', '');
  const currencySource = result(currencyRate, 'currencySource', '');
  let availableBalanceValas = availableBalance;
  let transactionAmountValas = transactionAmount;

  if (currencyDeterminant === currency) {
    if (currency === 'IDR') {
      if (currencySource === 'IDR') {
        // no converting
      } else if (currencySource === 'USD') {
        transactionAmountValas = transactionAmount / buyRateSpread;
      } else if (currencySource !== 'IDR' && currencySource !== 'USD') {
        transactionAmountValas = transactionAmount / buyRateSpread;
      }
    } else if (currency === 'USD') {
      if (currencySource === 'IDR') {
        transactionAmountValas = transactionAmount * sellRateSpread;
      } else if (currencySource === 'USD') {
        // no converting
      } else if (currencySource !== 'IDR' && currencySource !== 'USD') {
        if (currencySource === 'JPY' || currencySource === 'SGD' || currencySource === 'CNY') {
          transactionAmountValas = transactionAmount * spreadSellRateUSD;
        } else {
          transactionAmountValas = transactionAmount / spreadBuyRateUSD;
        }
      }
    } else if (currency !== 'IDR' && currency !== 'USD') {
      if (currencySource === 'IDR') {
        transactionAmountValas = transactionAmount * sellRateSpread;
      } else if (currencySource === 'USD') {
        if (currency === 'JPY' || currency === 'SGD' || currency === 'CNY') {
          transactionAmountValas = transactionAmount / spreadBuyRateUSD;
        } else {
          transactionAmountValas = transactionAmount * spreadSellRateUSD;
        }
      } else if (currencySource !== 'USD' && currencySource !== 'IDR') {
        if (currencySource === currency) {
          // no converting
        }
      }
    }
  }
  if (transactionAmountValas > availableBalanceValas) {
    if (productType === 'saving') {
      return language.SAVING__ACCOUNT_NOT_ENOUGH_BALANCE;
    } else {
      return language.VALIDATE__NOT_ENOUGHT_BALANCE;
    }
  }
  return;
};

const validateMaxSubsMedalion = (val = 0, transferChargeConfig = []) => {
  const max = Number(result(transferChargeConfig, 'max_amount', ''));
  if (max && val > max) {
    return language.VALIDATE__GREATER_THAN_MAX_RTGS + ' : Rp ' + formatFieldAmount(max);
  } else {
    return;
  }
};

const validateInputSimasTara = (input) => {
  const formatInput = /(^[0-9]*$)/;
  const formatInputDenganKelipatan = /(^[0-9]*00000$)/;
  if (!formatInput.test(input)) {
    return language.VALIDATE__NUMBER;
  } else if (input > 1000000000) {
    return language.VALIDATE__MAX_AMOUNT_SIMAS_TARA;
  } else if (input < 100000) {
    return language.VALIDATE__INPUT_MIN_AMOUNT_SIMAS_TARA;
  } else if (!formatInputDenganKelipatan.test(input)) {
    return language.VALIDATE__INPUT_AMOUNT_SIMAS_TARA;
  }
  return;
};

const validateNotifSettingsAmount = (amount) => {
  const formAmount = parseInt(amount);
  if (formAmount < 500000) {
    return language.CREDITCARD__NOTIF_MIN_AMOUNT;
  }
};

const validateSiupQRGPN = (criteria, input) => {
  if (!isEmpty(input)) {
    return validateNumber(input);
  }
  if (criteria !== 'Usaha Mikro (UMI)') {
    if (isEmpty(input)) {
      return language.VALIDATE__QR_GPN_SIUP;
    }
  }
  return;
};

const validateTdpQRGPN = (criteria, input) => {
  if (!isEmpty(input)) {
    return validateNumber(input);
  }
  if (criteria !== 'Usaha Mikro (UMI)') {
    if (isEmpty(input)) {
      return language.VALIDATE__QR_GPN_TDP;
    }
  }
  return;
};

const validateNpwpQRGPN = (criteria, input) => {
  if (!isEmpty(input)) {
    return validateNumber(input);
  }
  if (criteria !== 'Usaha Mikro (UMI)') {
    if (isEmpty(input)) {
      return validateNpwpLength(input);
    }
  }
  return;
};

const validateRefundCount = (refundCount) => {
  if (refundCount > 100) {
    return language.VALIDATE__QR_GPN_REFUND_COUNT;
  }
  return;
};

const validateDateBirthdate = (value) => {
  const newDate = new Date();
  const currentDate = moment(newDate).format('DD/MM/YYYY');
  const nowDate = parseInt(currentDate.substring(0, 2));
  const nowMonth = parseInt(currentDate.substring(3, 5));
  const nowYear = parseInt(currentDate.substring(6, 10));
  const rightFormat = /[0-9]{2}[/][0-9]{2}[/][0-9]{4}/g;
  const date = value.substring(0, 2);
  const month = value.substring(3, 5);
  const year = value.substring(6, 10);
  const dateThirty = month === '04' || month === '06' || month === '09' || month === '11';
  const dateThirtyOne = month === '01' || month === '03' || month === '05' || month === '07' || month === '08' || month === '10' || month === '12';
  const kabisatYear = month === '02';
  const itsTrue = date === '00';

  if (!rightFormat.test(value)) {
    return language.VALIDATE__DATE_MUST_BE_MATCH_A_FORMAT;
  } else if (dateThirty) {
    if ((itsTrue || date > nowDate && month >= nowMonth && year >= nowYear)) {
      return language.VALIDATE__BIRTHDATE;
    } else if (date <= '30' && month <= '12' && year <= nowYear) {
      return;
    } else {
      return language.VALIDATE__BIRTHDATE;
    }
  } else if (dateThirtyOne) {
    if ((itsTrue || date > nowDate && month >= nowMonth && year >= nowYear)) {
      return language.VALIDATE__BIRTHDATE;
    } else if (date <= '31' && month <= '12' && year <= nowYear) {
      return;
    } else {
      return language.VALIDATE__BIRTHDATE;
    }
  } else if (kabisatYear) {
    if (itsTrue || date > nowDate && month >= nowMonth && year >= nowYear) {
      return language.VALIDATE__BIRTHDATE;
    } else if (date <= '29' && kabisatYear && Number.isInteger(year / 4) && year <= nowYear) {
      return;
    } else if (date <= '28' && kabisatYear && year <= nowYear) {
      return;
    } else if (date >= '29' && kabisatYear && year <= nowYear) {
      return language.VALIDATE__BIRTHDATE;
    } else {
      return language.VALIDATE__BIRTHDATE;
    }
  } else {
    return language.VALIDATE__BIRTHDATE;
  }
};

const validateInputSetLimit = (input) => {
  const formatInput = /(^[0-9]*$)/; // input angka saja
  if (!formatInput.test(input)) {
    return language.VALIDATE__NUMBER;
  } else if (input > 100000000000) { // input lebih besar dari 100M error, maksimalnya 100M
    return language.MAX_SET_LIMIT_TRANSACTION;
  } else if (input < 500000000) { // input lebih kecil dari 500jt error, minimalnya 500jt
    return language.MIN_SET_LIMIT_TRANSACTION;
  }
  return;
};

const validateMaxTransferAmountSetLimit = (val = 0) => {
  const max = 100000000000;
  if (max && val > max) {
    return language.VALIDATE__GREATER_THAN_MAX_RTGS + ' : Rp ' + formatFieldAmount(max);
  } else {
    return;
  }
};

const validateCreditLimit = (limit) => {
  if (parseInt(limit) < 450000 || parseInt(limit) > 1800000000 || !limit) {
    return language.CREATE_ACCOUNT__INDIGO_LIMIT;
  } else {
    return '';
  }
};

const validateAge = (productCode, dateValue = '', code = '0') => {
  let minAge = '';
  if (productCode.includes('CC')) {
    if (code === '2') {
      minAge = 17;
    } else {
      minAge = 21;
    }
  } else {
    minAge = 17;
  }
  const server = moment(new Date());
  const mininumDate = server.subtract(minAge, 'years');
  const birthday = dateValue;

  if (productCode.includes('CC')) {
    if (moment(birthday).isBefore(mininumDate) || !dateValue) {
      return '';
    } else {
      return code === '2' ? language.CREDITCARD__AGE__ERROR_MARRIED : language.CREDITCARD__AGE__ERROR;
    }
  } else {
    if (moment(birthday).isBefore(mininumDate) || !dateValue) {
      return '';
    } else {
      return language.CREDITCARD__AGE__ERROR_MARRIED;
    }
  }
};

const validateRequiredStringDOB = (values, fields) => {
  const errors = {};
  each(fields, ((field) => {
    if (values[field] === '' || values[field] === undefined || values[field] === null || startsWith(values[field], ' ')) {
      errors[field] = language.VALIDATION__REQUIRED_FIELD;
    }
  }));
  return errors;
};

const validatePhoneNumberSplitBill = (phone) => {
  const formatPhone = /^[0-9]*$/;
  if (startsWith(phone, '628')) {
    if (phone.length < 10) {
      return language.IDENTITYFIFTHFORM__PHONE_V2_ERROR;
    } else if (!formatPhone.test(phone)) {
      return language.IDENTITYFIFTHFORM__PHONE_NUMERIC_ERROR;
    }
    return;
  } else if (startsWith(phone, '08')) {
    if (phone.length < 10) {
      return language.IDENTITYFIFTHFORM__PHONE_V2_ERROR;
    } else if (!formatPhone.test(phone)) {
      return language.IDENTITYFIFTHFORM__PHONE_NUMERIC_ERROR;
    }
    return;
  } else {
    return language.FIELD_PHONE_NUMBER__ERROR_STARTING;
  }
};

const validateBalanceValasRemittance = (balance, amount, productType, currencyRate, exchangeCurrency) => {
  const availableBalance = parseFloat(balance);
  let availableBalanceValas = availableBalance;
  const transactionAmountValas = parseFloat(result(exchangeCurrency, 'totalAmountDebit', 0));
  if (transactionAmountValas > availableBalanceValas) {
    if (productType === 'saving') {
      return language.SAVING__ACCOUNT_NOT_ENOUGH_BALANCE;
    } else {
      return language.VALIDATE__NOT_ENOUGHT_BALANCE;
    }
  }
  return;
};

const validateInputAccNoRemittance = (input) => {
  const onlyAlpha = /(^[a-zA-Z]*$)/;
  const formatInput = /(^[0-9A-Z]*$)/;
  if (onlyAlpha.test(input)) {
    return language.VALIDATE__ACC_NO_MUST_BE_ALPHANUMERIC;
  } else if (!formatInput.test(input)) {
    return language.VALIDATE__ACC_NO_MUST_BE_MATCH_A_FORMAT;
  }
  return;
};

const validatePhoneNumberCompany = (phone, errorString) => {
  const formatPhone = /^[0-9]*$/;
  if (startsWith(phone, '0')) {
    if ((startsWith(phone, '00') || !formatPhone.test(phone))) {
      return language.FIELD_PHONE_NUMBER_HOME__ERROR_00;
    } else if ((phone.length < 8 || !formatPhone.test(phone))) {
      return language.IDENTITYFIFTHFORM__PHONE_COMPANY_ERROR;
    }
  } else if (startsWith(phone, '62')) {
    if ((phone.length < 8 || !formatPhone.test(phone))) {
      return language.IDENTITYFIFTHFORM__PHONE_COMPANY_ERROR;
    }
  } else if ((startsWith(phone, '1')) || (startsWith(phone, '2')) || (startsWith(phone, '3')) || (startsWith(phone, '4')) 
            || (startsWith(phone, '5')) || (startsWith(phone, '6')) || (startsWith(phone, '7')) || (startsWith(phone, '8')) || (startsWith(phone, '9'))) {
    if ((startsWith(phone, '1')) || (startsWith(phone, '2')) || (startsWith(phone, '3')) || (startsWith(phone, '4')) 
       || (startsWith(phone, '5')) || (startsWith(phone, '6')) || (startsWith(phone, '7')) || (startsWith(phone, '8')) || (startsWith(phone, '9')) || !formatPhone.test(phone)) {
      return language.FIELD_PHONE_NUMBER_HOME__ERROR_STARTING;
    }
  } else {
    return errorString;
  }
};

const validateCompanyPhoneNumberPD = (phone) => {
  const formatPhone = /^[0-9]*$/;
  if (startsWith(phone, '62')) {
    if (phone.length < 6) {
      return language.PD__PHONE_DIGIT_ERROR;
    } else if (!formatPhone.test(phone)) {
      return language.PD__PHONE_NUMBER_START_ERROR;
    }
    return;
  }   else if (startsWith(phone, '0')) {
    if (phone.length < 6) {
      return language.PD__PHONE_DIGIT_ERROR;
    } else if (!formatPhone.test(phone)) {
      return language.PD__COMPANY_NUMBER_START_ERROR;
    }
    return;
  } else {
    return language.FIELD_PHONE_NUMBER_HOME__ERROR_STARTING;
  }
};

const validatePhoneNumberPD = (phone) => {
  const formatPhone = /^[0-9]*$/;
  if (startsWith(phone, '628')) {
    if (phone.length < 6) {
      return language.PD__PHONE_DIGIT_ERROR;
    } else if (!formatPhone.test(phone)) {
      return language.PD__PHONE_NUMBER_START_ERROR;
    }
    return;
  }   else if (startsWith(phone, '08')) {
    if (phone.length < 6) {
      return language.PD__PHONE_DIGIT_ERROR;
    } else if (!formatPhone.test(phone)) {
      return language.PD__PHONE_NUMBER_START_ERROR;
    }
    return;
  } else {
    return language.FIELD_PHONE_NUMBER_HOME__ERROR_STARTING;
  }
};

export {
  validateRequiredFields,
  isValidPassword,
  isValidUsername,
  validateMobile,
  validateSubscriberNo,
  isInRange,
  isInRangeRTGS,
  validateWaterbillConsumerNo,
  validateBalance,
  validateCreatePassword,
  validateFieldsMatch,
  validatePinCodeLength,
  validateNumber,
  validateCreditCard,
  validateDateFormat,
  validateName,
  validateMaxTransactionAmount,
  validateIdNumber,
  validatePhoneNumber,
  validateEmail,
  validateNameEform,
  validatePostalCodeLength,
  validateTC,
  validatePackageCode,
  validateMaxAmount,
  isModulus,
  validateNpwpLength,
  validateSmartfrenNumber,
  validateRequiredString,
  validateMaxTransferAmount,
  validateMaxTransferNetwork,
  isPrk,
  validate21yearsold,
  validateMonthlyIncome,
  checkLimitCreateCC,
  isValidTerminalName,
  validateAlphanumeric,
  maxCharacter,
  validateBirthDate,
  validateDateRange,
  getTotalDeposit,
  validateZipCode,
  validateLength,
  validateValue,
  validateNamecashier,
  validateCheckbox,
  validateTotalDurationInDays,
  validateTravelInsuranceReturnDate,
  validate17yearsold,
  validateTotalDurationInYears,
  validateTotalDurationInMonths,
  validateTotalDurationInHours,
  validateGenflixPassword,
  validatePrefixBiller,
  validateMinAmount,
  validateMinRedemp,
  validateRtRw,
  validateMaxBalanceEmoney,
  isInRangeEmoney,
  validateKtpDukcapil,
  isInRangeTd,
  validateMaxTransactionAmountTd,
  validateTotalPremi,
  validatePhoneNumberHome,
  validateRtRw2,
  validateInputSimasTara,
  isInRangeValas,
  validateBalanceValas,
  validateMaxSubsMedalion,
  validateInputSetLimit,
  validateNikLength,
  validateSiupQRGPN,
  validateTdpQRGPN,
  validateNpwpQRGPN,
  validateRefundCount,
  validateNotifSettingsAmount,
  validateDateBirthdate,
  validateMaxTransferAmountSetLimit,
  validateCreditLimit,
  validateAge,
  validateRequiredStringDOB,
  validateNpwpLengthEtaxFormat,
  validateBalanceValasRemittance,
  validateAmountEtax,
  validatePhoneNumberSplitBill,
  validateInputAccNoRemittance,
  validatePhoneNumberCompany,
  validatePhoneNumberPD,
  validateCompanyPhoneNumberPD
};
