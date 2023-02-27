/* eslint-disable */
import result from 'lodash/result';
import find from 'lodash/find';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import capitalize from 'lodash/capitalize';
import uniqBy from 'lodash/uniqBy';
import maxBy from 'lodash/maxBy';
import groupBy from 'lodash/groupBy';
import sumBy from 'lodash/sumBy';
import mapValues from 'lodash/mapValues';
import {fundMatrix, fundTransferTimes} from '../config/appConstants.config';
import sortBy from 'lodash/sortBy';
import negate from 'lodash/negate';
import moment from 'moment';
import map from 'lodash/map';
import shuffle from 'lodash/shuffle';
import {language} from '../config/language';
import includes from 'lodash/includes';
import compact from 'lodash/compact';
import forEach from 'lodash/forEach';
import trim from 'lodash/trim';
import {random, repeat} from 'lodash';
import startsWith from 'lodash/startsWith';
import * as env from '../config/env.config';
import {Platform, Toast} from '../utils/RNHelpers.util';
import {crc16ccitt} from 'crc';
import creditCardPlatinum from '../assets/images/credit-card-platinum.png';
import creditCardGold from '../assets/images/credit-card-gold.png';
import creditCardSilver from '../assets/images/credit-card-silver.png';
import creditCardIndigo from '../assets/images/credit-card-indigo.png';
import creditCardOrami from '../assets/images/credit-card-orami.png';
import creditCardAku from '../assets/images/credit-card-aku.png';
import upperFirst from 'lodash/upperFirst';
import indexOf from 'lodash/indexOf';
import luhn from 'luhn-js';
import {billerIconGenerator} from '../utils/billerIcon.util';
import airAsia from '../assets/images/air-asia.png';
import batikAir from '../assets/images/batik-air.png';
import citilink from '../assets/images/citilink.png';
import garuda from '../assets/images/garuda-indonesia.png';
import jetstar from '../assets/images/jetstar.png';
import jnam from '../assets/images/jnam.png';
import kalstar from '../assets/images/kalstar-aviation.png';
import multiFlight from '../assets/images/multi-flight.png';
import sriwijayaAir from '../assets/images/sriwijaya-air.png';
import wingsAir from '../assets/images/wings-air.png';
import lionAir from '../assets/images/lion-air.png';
import malindoAir from '../assets/images/malindo-air.png';
import SHA256 from 'crypto-js/sha256';
import {Clipboard} from 'react-native';
import noop from 'lodash/noop';
import alto from '../assets/images/new-logo-alto.png';
import atmBersama from '../assets/images/new-logo-atmb.jpg';
import prima from '../assets/images/prima.png';
import emoney1 from '../assets/images/pay-at-tokopedia.jpg';
import emoney2 from '../assets/images/emoney.jpg';
import emoney3 from '../assets/images/pay-bills.jpg';
import emoney4 from '../assets/images/gopay.jpg';
import jsonPostalCode from '../fixtures/postalCode.json';
import reverse from 'lodash/reverse';
import round from 'lodash/round';
import replace from 'lodash/replace';
import alfamartBack from '../assets/images/alfamartBack.png';
import oramiBack from '../assets/images/oramiBack.png';
import indigoBack from '../assets/images/indigoBack.png';
import backdump from '../assets/images/backdump.png';
import platinumBack from '../assets/images/platinumBack.png';
import goldBack from '../assets/images/goldBack.png';
import productCC from '../assets/images/ProductCC.png';
import productSaving from '../assets/images/productSA.png';
import productInsurance from '../assets/images/productInsurance.png';
import productTD from '../assets/images/productopenTD.png';
import productExRate from '../assets/images/productRate.png';
import productRefer from '../assets/images/prooductRefer.png';
import productSplitBill from '../assets/images/productSplitbill.png';
import productLoan from '../assets/images/productLoan.png';
import omit from 'lodash/omit';
import smartSaving from '../assets/images/sunline-card.png';

// GENERAL utility methods
export const wrapObjectInFunction = (obj) => () => obj;

export const wrapMethodInFunction = (method, ...args) => () => method(...args);

export const findInArray = (array, keyToFind, valTofind) => (array.filter((data) => data[keyToFind] === valTofind)[0]) || {};

export const filterObjectProperties = (sourceObject = {}, keys = []) => {
  const filtered = {};
  keys.forEach((eachKey) => {
    filtered[eachKey] = sourceObject[eachKey];
  });
  return filtered;
};

// BILLER utility methods
export const getFilteredBillerData = (billerConfig = {}, type = 'TOPUP') => {
  const filteredBillers = find(billerConfig.billerAllowListRevamp, {name: type});
  if (!filteredBillers) {
    return [];
  }
  const billerData = filteredBillers.listOfBiller.
    map((billerCode) => find(billerConfig.billerList, (biller) => (biller.billerPreferences.code === billerCode)));
  return billerData;
};

export const getFilteredBillerDataRevamp = (billerConfig = {}, type = 'TOPUP') => {
  const filteredBillers = find(billerConfig.billerAllowListRevamp, {name: type});
  if (!filteredBillers) {
    return [];
  }
  const billerData = filteredBillers.listOfBiller.
    map((billerCode) => find(billerConfig.billerList, (biller) => (biller.billerPreferences.code === billerCode)));
  return billerData;
};

export const getBillerForMobile = (billerData = [], mobileNo) => {
  let selectedBiller = {};
  billerData.every((biller) => {
    const prepix = result(biller, 'prefix', '');
    if (prepix) {
      const regex = new RegExp(prepix);
      if (regex.test(mobileNo)) {
        selectedBiller = biller;
        return false; // break the loop;
      }
      return true;
    }
    return true;
  });
  return selectedBiller;
};

// REDUX FORM utility methods
export const normaliseContactPicker = (contact) => formatMobileNumber(contact.phone);
export const lowerCase = (str = '') => String(str).toLowerCase();
export const upperCase = (str = '') => String(str).toUpperCase();

export const formatFieldAmount = (value) => {
  const amount = (!value && parseInt(value) !== 0) ? '' :
    value.toString().replace(/([,.])+/g, '');
  const expectedSeparator = Math.floor(amount.length / 3);
  const separator = '.';
  const separatorAmount = (amount.split(separator).length - 1);
  const regexRightFormat = /(\.)(?=(\d{3}))/g; // if id/en
  if (regexRightFormat.test(value) && expectedSeparator === separatorAmount) return value;
  else {
    const replaceRegex = /(\d)(?=(\d{3})+(?!\d))/g;
    const replaceValue = '$1' + separator;
    const returnValue = (!value && parseInt(value) !== 0) ? '' :
      value.toString().replace(replaceRegex, replaceValue);
    return returnValue;
  }
};

export const formatFieldAmountCB = (value) => {
  const amount = (!value && parseInt(value) !== 0) ? '' :
        value.toString().replace(/([,.])+/g, '');
  const expectedSeparator = Math.floor(amount.length / 3);
  const separator = '.';
  const separatorAmount = (amount.split(separator).length - 1);
  const regexRightFormat = /(\.)(?=(\d{3}))/g; // if id/en
  if (regexRightFormat.test(value) && expectedSeparator === separatorAmount) return value;
  else {
    const replaceRegex = /(\d)(?=(\d{3})+(?!\d))/g;
    const replaceValue = '$1' + separator;
    const returnValue = (!value && parseInt(value) !== 0) ? '' :
          value.toString().replace(replaceRegex, replaceValue);
    return returnValue;
  }
};

export const formatFieldAmountWithDecimal = (value) => {
  const amount = (!value && parseInt(value) !== 0) ? '' :
    value.toString().replace(/([,.])+/g, '');
  const expectedSeparator = Math.floor(amount.length / 3);
  const separator = '.';
  const separatorAmount = (amount.split(separator).length - 1);
  const regexRightFormat = /(\,)(?=(\d{3}))/g; // if id/en
  if (regexRightFormat.test(value) && expectedSeparator === separatorAmount) return value;
  else {
    const replaceRegex = /(\d)(?=(\d{3})+(?!\d))/g;
    const replaceValue = '$1' + separator;
    const returnValue = (!value && parseInt(value) !== 0) ? '' :
      value.toString().replace(replaceRegex, replaceValue);
    return returnValue;
  }
};

export const currenyCrossBorder = (number) => {
  if (number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  } else {
    return '';
  }
}
// export const formatFieldAmountWithDecimal = (value) => {
//   const regexRightFormat = /(,)(?=(\d{3}))/g;
//   if (regexRightFormat.test(value)) return value;
//   else {
//     const replaceRegex = /(\d)(?=(\d{3})+(?!\d))/g;
//     return (!value && parseInt(value) !== 0) ? '' :
//           Number(value).toFixed(2).replace(replaceRegex, '$1,');
//   }
// };

export const currencyFormatter = (unformatted) => (
  !unformatted && parseInt(unformatted) !== 0) ? '--' : formatFieldAmount(Math.floor(unformatted));

export const balanceFormatter = (unformatted) => (
  !unformatted && parseInt(unformatted) !== 0) ? '--' : formatFieldAmountWithDecimal(unformatted);

export const stringify  = (str = '') => String(str) || ''; // will be used in redux-form field's normalize function

export const getAccountAmount = (acc) => Math.floor(Number(result(acc, 'balances.availableBalance')));

export const getUnformattedAccountAmount = (acc) => Number(result(acc, 'balances.availableBalance'));

export const generatePayee = (accountNo, name, bank, payeeType, ownEmoney, payeeCurrency) => ({
  'id': null,
  'accountNumber': accountNo,
  'name': name,
  bank, // is not present in already existing payee
  transferType: ownEmoney ? 'own' : (bank.isSinarmas || result(bank, 'bankId', '').toString() === '90') ? 'inbank'  : 'external',
  'currency': payeeCurrency,
  'modeFlag': null,
  'isNewPayee': true, // This will be used to differentiate between new and existing payee
  payeeType
});

export const generatePayeeBiFast = (accountNo, name, bank, payeeType, ownEmoney, payeeCurrency, isBiFast, biFastPayee, accNoCust) => ({
  'id': null,
  'accountNumber': accountNo,
  'name': name,
  bank, // is not present in already existing payee
  transferType: ownEmoney ? 'own' : (bank.isSinarmas || result(bank, 'bankId', '').toString() === '90') ? 'inbank'  : 'external',
  'currency': payeeCurrency,
  'modeFlag': null,
  'isNewPayee': true, // This will be used to differentiate between new and existing payee
  payeeType,
  isBiFast,
  biFastPayee,
  accNoCust
});

export const generatePayeeQr = (accountNo, name, bank, payeeType, ownEmoney, payeeCurrency, isOnUs) => ({
  'id': null,
  'accountNumber': accountNo,
  'name': name,
  bank, // is not present in already existing payee
  transferType: isOnUs ? 'inbank'  : 'external',
  'currency': payeeCurrency,
  'modeFlag': null,
  'isNewPayee': true, // This will be used to differentiate between new and existing payee
  payeeType
});

export const generatePayeeRemittance = (accountNo, name, bank, payeeType, ownEmoney, payeeCurrency, dataForm, senderData, foundPayee) => ({
  'id': null,
  'accountNumber': accountNo,
  'name': name,
  bank, // is not present in already existing payee
  transferType: ownEmoney,
  'currency': payeeCurrency,
  'modeFlag': null,
  'isNewPayee': !isEmpty(foundPayee) ? null : true, // This will be used to differentiate between new and existing payee
  payeeType,
  dataForm,
  senderData,
});

export const getPayeeType = (payee) => {
  if (!payee) {
    return 'none';
  }
  const {transferType} = payee;
  if (transferType === 'inbank' || transferType === 'own') {
    return 'internal';
  } else if (transferType === 'remittance') {
    return 'remittance';
  }
  return 'external';
};

export const normalizeTransferType = (transferType = {}) => transferType.value;

export const formatTransferType = (transferTypeString, when) => ({
  label: result(fundTransferTimes, when, '') + ' (' + result(fundMatrix, `${transferTypeString}.text`, '--') + ')',
  sublabel: 'Rp ' + currencyFormatter(result(fundMatrix, `${transferTypeString}.fees`, null)),
  value: transferTypeString
});

export const transformToTransferTypeRadioData = (transferTypeArray) => transferTypeArray.map(
  ({type, when}) => formatTransferType(type, when)
);

export const formatTransferTypeWithAmount = (transferTypeString, when, amount, transferChargeConfig, payee, viewSkn) => {
  const range = find(transferChargeConfig, (config) => config.mode === transferTypeString);
  const disabled = amount < parseInt(result(range, 'minAmount', '0')) || amount > parseInt(result(range, 'maxAmount', '10000'));
  const biFastEnabled = result(payee, 'isNewPayee', false) === true  ? lowerCase(result(payee, 'bank.biFastEnabled', '')) !== 'yes' || disabled : lowerCase(result(payee, 'biFastEnabled', '')) !== 'yes' || disabled;
  const disabledNew = transferTypeString === 'bifast' ? biFastEnabled : disabled
  return ({
    label: transferTypeString === 'rtgs' ? language.TRANSFER__RTGS_TITLE + ' (' + result(fundMatrix, `${transferTypeString}.text`, '--') + ')' : result(fundTransferTimes, when, '') + ' (' + result(fundMatrix, `${transferTypeString}.text`, '--') + ')',
    sublabelTitle: language.TRANSFER__FEE,
    sublabel: 'Rp ' + currencyFormatter(result(fundMatrix, `${transferTypeString}.fees`, null)),
    value: transferTypeString,
    disabled: disabledNew,
    viewSkn
  });
};

export const transformToTransferTypeRadioDataWithAmount = (transferTypeArray, amount, transferChargeConfig, payee, viewSkn) => transferTypeArray.map(
  ({type, when}) => formatTransferTypeWithAmount(type, when, amount, transferChargeConfig, payee, viewSkn)
);

export const getFundTransferMatrix = (mode = '') => fundMatrix[lowerCase(mode)] || {};

export const getOptimalTransferMethods = (sknTime = moment('15:00', 'HH:mm'), rtgsTime = moment('16:00', 'HH:mm'), currentTime = moment(), workingBusinessDay = moment(), dayStartTime = moment('00:00', 'HH:mm')) => {
  const isWeekend = [6, 7].includes(currentTime.isoWeekday());
  const isPublicHoliday = !(moment(currentTime).isSame(workingBusinessDay, 'day'));
  if (isWeekend) {
    return [{type: 'bifast', when: 'instantly'}, {type: 'skn', when: 'nextWorking'}, {type: 'network', when: 'instantly'}, {type: 'rtgs', when: 'nextWorking'}];
  }
  if (isPublicHoliday) {
    return [{type: 'bifast', when: 'instantly'}, {type: 'skn', when: 'nextWorking'}, {type: 'network', when: 'instantly'}, {type: 'rtgs', when: 'nextWorking'}];
  }
  // Otherwise on any normal day - Weekday
  if (currentTime.isAfter(sknTime) && currentTime.isAfter(rtgsTime) && currentTime.isAfter(dayStartTime)) {
    return [{type: 'bifast', when: 'instantly'}, {type: 'skn', when: 'nextWorking'}, {type: 'network', when: 'instantly'}, {type: 'rtgs', when: 'nextWorking'}];
  }
  if (currentTime.isBefore(sknTime) && currentTime.isAfter(rtgsTime) && currentTime.isAfter(dayStartTime)) {
    return [{type: 'bifast', when: 'instantly'}, {type: 'skn', when: 'today'}, {type: 'network', when: 'instantly'}, {type: 'rtgs', when: 'nextWorking'}];
  }
  if (currentTime.isAfter(sknTime) && currentTime.isBefore(rtgsTime) && currentTime.isAfter(dayStartTime)) {
    return [{type: 'bifast', when: 'instantly'}, {type: 'skn', when: 'nextWorking'}, {type: 'network', when: 'instantly'}, {type: 'rtgs', when: 'today'}];
  }
  return [{type: 'bifast', when: 'instantly'}, {type: 'skn', when: 'today'}, {type: 'network', when: 'instantly'}, {type: 'rtgs', when: 'today'}];
};

export const getTransferTime = (sknTime = moment('15:00', 'HH:mm'), rtgsTime = moment('16:00', 'HH:mm'), currentTime = moment(), workingBusinessDay = moment(), dayStartTimeSkn = moment('00:00', 'HH:mm'), dayStartTimeRtgs = moment('00:00', 'HH:mm'), transferType,  cutOffMsg) => {
  const isWeekend = [6, 7].includes(currentTime.isoWeekday());
  const isPublicHoliday = !(moment(currentTime).isSame(workingBusinessDay, 'day')) || cutOffMsg !== null;
  if (isWeekend || isPublicHoliday || (currentTime.isAfter(sknTime) && transferType === 'skn' || currentTime.isBefore(dayStartTimeSkn)  && transferType === 'skn' && cutOffMsg === null) || (currentTime.isAfter(rtgsTime) && transferType === 'rtgs' || currentTime.isBefore(dayStartTimeRtgs) && transferType === 'rtgs' && cutOffMsg === null)) {
    return 'nextWorking';
  } else {
    return 'today';
  }
};

export const getTransferTimeMethod = (sknTime = moment('15:00', 'HH:mm'), rtgsTime = moment('16:00', 'HH:mm'), currentTime = moment(), workingBusinessDay = moment(), dayStartTimeSkn = moment('00:00', 'HH:mm'), dayStartTimeRtgs = moment('00:00', 'HH:mm'), transferType) => {
  const isWeekend = [6, 7].includes(currentTime.isoWeekday());
  const isPublicHoliday = !(moment(currentTime).isSame(workingBusinessDay, 'day'));
  if (isWeekend || isPublicHoliday || (currentTime.isAfter(sknTime) && transferType === 'skn' || currentTime.isBefore(dayStartTimeSkn) && transferType === 'skn') || (currentTime.isAfter(rtgsTime) && transferType === 'rtgs' || currentTime.isBefore(dayStartTimeRtgs) && transferType === 'rtgs')) {
    return 'nextWorking';
  } else {
    return 'today';
  }
};

export const getCutOffTimeReksadana = (cutOffTime, currentTime = moment(), dayStartTime = moment('00:00', 'HH:mm')) => {
  const cutOffReksadana = moment(cutOffTime, 'HH:mm');
  if ((currentTime.isAfter(cutOffReksadana) && currentTime.isAfter(dayStartTime))) {
    return 'nextWorking';
  } else {
    return 'today';
  }
};

export const getOptimalCCMethods = (sknTime = moment('15:00', 'HH:mm'), rtgsTime = moment('16:00', 'HH:mm'), currentTime = moment(), workingBusinessDay = moment(), dayStartTime = moment('00:00', 'HH:mm'), isNetworkSupport = false, isSknSupport = false, isRtgsSupport = false) => {
  const isWeekend = [6, 7].includes(currentTime.isoWeekday());
  const isPublicHoliday = !(moment(currentTime).isSame(workingBusinessDay, 'day'));
  if (isWeekend || isPublicHoliday) {
    if (isNetworkSupport && isSknSupport && isRtgsSupport) {
      return [{type: 'network', when: 'instantly'}, {type: 'skn', when: 'nextWorking'}, {type: 'rtgs', when: 'nextWorking'}];
    } else if (isNetworkSupport && isSknSupport && !isRtgsSupport) {
      return [{type: 'network', when: 'instantly'}, {type: 'skn', when: 'nextWorking'}];
    } else if (isNetworkSupport && !isSknSupport && isRtgsSupport) {
      return [{type: 'network', when: 'instantly'}, {type: 'rtgs', when: 'nextWorking'}];
    } else if (!isNetworkSupport && isSknSupport && isRtgsSupport) {
      return [{type: 'skn', when: 'nextWorking'}, {type: 'rtgs', when: 'nextWorking'}];
    } else if (isNetworkSupport && !isSknSupport && !isRtgsSupport) {
      return [{type: 'network', when: 'instantly'}];
    } else if (!isNetworkSupport && isSknSupport && !isRtgsSupport) {
      return [{type: 'skn', when: 'nextWorking'}];
    } else if (!isNetworkSupport && !isSknSupport && isRtgsSupport) {
      return [{type: 'rtgs', when: 'nextWorking'}];
    } else {
      return [];
    }
  }

  // Otherwise on any normal day - Weekday
  if (currentTime.isAfter(sknTime) && currentTime.isAfter(rtgsTime) && currentTime.isAfter(dayStartTime)) {
    if (isNetworkSupport && isSknSupport && isRtgsSupport) {
      return [{type: 'network', when: 'instantly'}, {type: 'skn', when: 'nextWorking'}, {type: 'rtgs', when: 'nextWorking'}];
    } else if (isNetworkSupport && isSknSupport && !isRtgsSupport) {
      return [{type: 'network', when: 'instantly'}, {type: 'skn', when: 'nextWorking'}];
    } else if (isNetworkSupport && !isSknSupport && isRtgsSupport) {
      return [{type: 'network', when: 'instantly'}, {type: 'rtgs', when: 'nextWorking'}];
    } else if (!isNetworkSupport && isSknSupport && isRtgsSupport) {
      return [{type: 'skn', when: 'nextWorking'}, {type: 'rtgs', when: 'nextWorking'}];
    } else if (isNetworkSupport && !isSknSupport && !isRtgsSupport) {
      return [{type: 'network', when: 'instantly'}];
    } else if (!isNetworkSupport && isSknSupport && !isRtgsSupport) {
      return [{type: 'skn', when: 'nextWorking'}];
    } else if (!isNetworkSupport && !isSknSupport && isRtgsSupport) {
      return [{type: 'rtgs', when: 'nextWorking'}];
    } else {
      return [];
    }
  }
  if (currentTime.isBefore(sknTime) && currentTime.isAfter(rtgsTime) && currentTime.isAfter(dayStartTime)) {
    if (isNetworkSupport && isSknSupport && isRtgsSupport) {
      return [{type: 'skn', when: 'today'}, {type: 'network', when: 'instantly'}, {type: 'rtgs', when: 'nextWorking'}];
    } else if (isNetworkSupport && isSknSupport && !isRtgsSupport) {
      return [{type: 'skn', when: 'today'}, {type: 'network', when: 'instantly'}];
    } else if (isNetworkSupport && !isSknSupport && isRtgsSupport) {
      return [{type: 'network', when: 'instantly'}, {type: 'rtgs', when: 'nextWorking'}];
    } else if (!isNetworkSupport && isSknSupport && isRtgsSupport) {
      return [{type: 'skn', when: 'today'}, {type: 'rtgs', when: 'nextWorking'}];
    } else if (isNetworkSupport && !isSknSupport && !isRtgsSupport) {
      return [{type: 'network', when: 'instantly'}];
    } else if (!isNetworkSupport && isSknSupport && !isRtgsSupport) {
      return [{type: 'skn', when: 'today'}];
    } else if (!isNetworkSupport && !isSknSupport && isRtgsSupport) {
      return [{type: 'rtgs', when: 'nextWorking'}];
    } else {
      return [];
    }
  }
  if (currentTime.isAfter(sknTime) && currentTime.isBefore(rtgsTime) && currentTime.isAfter(dayStartTime)) {
    if (isNetworkSupport && isSknSupport && isRtgsSupport) {
      return [{type: 'network', when: 'instantly'}, {type: 'skn', when: 'nextWorking'}, {type: 'rtgs', when: 'today'}];
    } else if (isNetworkSupport && isSknSupport && !isRtgsSupport) {
      return [{type: 'network', when: 'instantly'}, {type: 'skn', when: 'nextWorking'}];
    } else if (isNetworkSupport && !isSknSupport && isRtgsSupport) {
      return [{type: 'network', when: 'instantly'}, {type: 'rtgs', when: 'today'}];
    } else if (!isNetworkSupport && isSknSupport && isRtgsSupport) {
      return [{type: 'skn', when: 'nextWorking'}, {type: 'rtgs', when: 'today'}];
    } else if (isNetworkSupport && !isSknSupport && !isRtgsSupport) {
      return [{type: 'network', when: 'instantly'}];
    } else if (!isNetworkSupport && isSknSupport && !isRtgsSupport) {
      return [{type: 'skn', when: 'nextWorking'}];
    } else if (!isNetworkSupport && !isSknSupport && isRtgsSupport) {
      return [{type: 'rtgs', when: 'today'}];
    } else {
      return [];
    }
  }

  if (isNetworkSupport && isSknSupport && isRtgsSupport) {
    return [{type: 'skn', when: 'today'}, {type: 'network', when: 'instantly'}, {type: 'rtgs', when: 'today'}];
  } else if (isNetworkSupport && isSknSupport && !isRtgsSupport) {
    return [{type: 'skn', when: 'today'}, {type: 'network', when: 'instantly'}];
  } else if (isNetworkSupport && !isSknSupport && isRtgsSupport) {
    return [{type: 'network', when: 'instantly'}, {type: 'rtgs', when: 'today'}];
  } else if (!isNetworkSupport && isSknSupport && isRtgsSupport) {
    return [{type: 'skn', when: 'today'}, {type: 'rtgs', when: 'today'}];
  } else if (isNetworkSupport && !isSknSupport && !isRtgsSupport) {
    return [{type: 'network', when: 'instantly'}];
  } else if (!isNetworkSupport && isSknSupport && !isRtgsSupport) {
    return [{type: 'skn', when: 'today'}];
  } else if (!isNetworkSupport && !isSknSupport && isRtgsSupport) {
    return [{type: 'rtgs', when: 'today'}];
  } else {
    return [];
  }
};

export const sortPayees = (payees) => sortBy(payees, (p) => lowerCase(p.name));

export const payeesFromTransactions = (transactionList, payees) => {
  const frequentAccountNumbers = map(transactionList, 'accountNumber');
  return filter(payees, (p) => frequentAccountNumbers.includes(p.accountNumber));
};

export const payeesAddSecondaryText = (payees) => {
  const payeesWithSecondaryText = payees.map((payee) => {
    payee.secondaryText = result(payee, 'bank.bankName') || payee.accountType;
    return payee;
  });
  return payeesWithSecondaryText;
};

// RECENT PAYMENTS utility methods
export const getFrequentPayments = (allTransactions, uniqueKey) => uniqBy([...allTransactions].reverse(), uniqueKey).slice(0, 3);
export const updateBillAmount = (payments, payload, uniqueKey) => payments.map((payment) => {
  if (payload[uniqueKey] === payment[uniqueKey]) {
    return {...payment, ...payload};
  } else return payment;
});

// TYPEAHEAD utility methods
export const filterObjects = (listOfObjects = [], searchString = '') => {
  const lowerCaseSearchString = lowerCase(searchString);
  if (searchString) {
    return filter(listOfObjects, (item) => {
      const valueList = Object.values(item);
      return !!find(valueList, (value) => (lowerCase(value).includes(lowerCaseSearchString)));
    });
  }
  return listOfObjects;
};

// TYPEAHEAD utility methods
export const filterObjectsBiller = (listOfObjects = [], searchString = '') => {
  const lowerCaseSearchString = lowerCase(searchString);
  if (searchString) {
    const searchString =  filter(listOfObjects, (item) => {
      const itemName = result(item, 'name', '');
      return itemName.toLowerCase().match(lowerCaseSearchString)
    });
    return searchString;
  }
  return listOfObjects;
};

// SERVICE CONFIRMATION CARD utility methods
export const formatBillDetails = (rawBillMetadataArray = []) => {
  const formatted = {};
  rawBillMetadataArray.forEach((eachDetail) => {
    if (!isEmpty(eachDetail['key']) && !isEmpty(eachDetail['value'])) {
      const value = lowerCase(eachDetail['value']);
      const k = lowerCase(eachDetail['key']);
      if (value) {
        formatted[capitalize(k)] = capitalize(value);
      }
    } else if (!isEmpty(eachDetail['key']) && isEmpty(eachDetail['value'])) {
      const k = lowerCase(eachDetail['key']);
      formatted[capitalize(k)] = '';
    }
  });
  return formatted;
};

export const formatDataDetailList = (rawBillMetadataArray = []) => {
  const formatted = {};
  rawBillMetadataArray.forEach((eachDetail) => {
    if (!isEmpty(eachDetail['key']) && !isEmpty(eachDetail['value'])) {
      const value = eachDetail['value'];
      const k = lowerCase(eachDetail['key']);
      if (value) {
        formatted[upperCase(k)] = upperFirst(value);
      }
    } else if (!isEmpty(eachDetail['key']) && isEmpty(eachDetail['value'])) {
      const k = lowerCase(eachDetail['key']);
      formatted[upperCase(k)] = '';
    }
  });
  return formatted;
};

export const listViewComparator = (row1, row2) => (row1 !== row2);

const sortAccountsByCurrency = (accounts) => {
  const currencyPriority = ['IDR', 'USD', 'EUR', 'SGD', 'AUD', 'JPY', 'CNY', 'NZD'];
  return sortBy(accounts, (o) => currencyPriority.indexOf(o.currency));
};

const isIDRAccount = (account) => result(account, 'currency', '').toUpperCase() === 'IDR';

export const groupAccountsByType = (accounts, accountsCC) => {
  // GROUP ACCOUNTS BY ACCOUNTTYPE
  const sortedAccounts = sortAccountsByCurrency(accounts);
  const groupedAccounts = groupBy(sortedAccounts, (account) => (result(account, 'accountType', '').toLowerCase()));
  const savingAccounts = [...result(groupedAccounts, 'savingaccount', []), ...result(groupedAccounts, 'currentaccount', [])];
  return {
    savingAccount: groupedAccounts.simassavingplanaccount && savingAccounts ? [...savingAccounts, ...groupedAccounts.simassavingplanaccount] : savingAccounts ? [...savingAccounts] : groupedAccounts.simassavingplanaccount ? [...groupedAccounts.simassavingplanaccount] : [],
    savingAccountOnly: groupedAccounts.savingaccount || [],
    currentAccount: groupedAccounts.currentaccount || [],
    timeDepositAccount: groupedAccounts.timedepositaccount || [],
    creditCardAccount: accountsCC || [],
    forex: sortedAccounts.filter(negate(isIDRAccount)),
    rdn: result(groupedAccounts, 'rekening dana nasabah (rdn)') || []
  };
};

export const getTransferPossibleAccounts = (accounts = [], transType, targetAccount = {}) => {
  const regexTransType = new RegExp(transType, 'i');
  const isPossibleAccount = (account) => regexTransType.test(result(account, 'allowFlag', '').toLowerCase());
  const filteredAcc = accounts.filter(isPossibleAccount);
  const emoneyAccount = find(accounts, {accountType: 'emoneyAccount'}) || {};
  const payeeAcccount = find(accounts, {accountNumber: result(targetAccount, 'accountNumber', '')}) || {};
  const removedAccount = isEmpty(payeeAcccount) ? filteredAcc : filter(filteredAcc, (acc) => acc.accountNumber !== payeeAcccount.accountNumber);
  const transferType = result(targetAccount, 'transferType', '');
  const currency = result(targetAccount, 'currency', '');
  let currencyAccountMulti = [];
  if (transferType === 'inbank' || transferType === 'own') {
    currencyAccountMulti = currency === 'USD' || currency === 'IDR' ? removedAccount : filter(removedAccount, (acc) => acc.currency === 'USD' || acc.currency === 'IDR' || acc.currency === currency);
  } else {
    currencyAccountMulti =  filter(removedAccount, (acc) => acc.currency === 'IDR');
  }
  const groupedCurrencyAccountsMulti = groupBy(currencyAccountMulti, (account) => (result(account, 'accountType', '').toLowerCase()));
  if (isEmpty(emoneyAccount)) {
    const savingAccounts = result(groupedCurrencyAccountsMulti, 'savingaccount', []);
    const currentAccounts = result(groupedCurrencyAccountsMulti, 'currentaccount', []);
    return [...savingAccounts, ...currentAccounts];
  } else  if (currency !== 'IDR' && !isEmpty(currency)) {
    const savingAccounts = result(groupedCurrencyAccountsMulti, 'savingaccount', []);
    const currentAccounts = result(groupedCurrencyAccountsMulti, 'currentaccount', []);
    return [...savingAccounts, ...currentAccounts];
  } else {
    const savingAccounts = result(groupedCurrencyAccountsMulti, 'savingaccount', []);
    const currentAccounts = result(groupedCurrencyAccountsMulti, 'currentaccount', []);
    return [emoneyAccount, ...savingAccounts, ...currentAccounts];
  }
};

export const getTransferPossibleAccountsSetLimit = (accounts = [], transType, targetAccount = {}) => {
  const regexTransType = new RegExp(transType, 'i');
  const isPossibleAccount = (account) => regexTransType.test(result(account, 'allowFlag', '').toLowerCase());
  const filteredAcc = accounts.filter(isPossibleAccount);
  const payeeAcccount = find(accounts, {accountNumber: result(targetAccount, 'accountNumber', '')}) || {};
  const removedAccount = isEmpty(payeeAcccount) ? filteredAcc : filter(filteredAcc, (acc) => acc.accountNumber !== payeeAcccount.accountNumber);
  const transferType = result(targetAccount, 'transferType', '');
  const currency = result(targetAccount, 'currency', '');
  let currencyAccountMulti = [];
  if (transferType === 'inbank' || transferType === 'own') {
    currencyAccountMulti = currency === 'USD' || currency === 'IDR' ? removedAccount : filter(removedAccount, (acc) => acc.currency === 'USD' || acc.currency === 'IDR' || acc.currency === currency);
  } else {
    currencyAccountMulti =  filter(removedAccount, (acc) => acc.currency === 'IDR');
  }
  const groupedCurrencyAccountsMulti = groupBy(currencyAccountMulti, (account) => (result(account, 'accountType', '').toLowerCase()));
  if (isEmpty()) {
    const savingAccounts = result(groupedCurrencyAccountsMulti, 'savingaccount', []);
    const currentAccounts = result(groupedCurrencyAccountsMulti, 'currentaccount', []);
    return [...savingAccounts, ...currentAccounts];
  } else  if (currency !== 'IDR' && !isEmpty(currency)) {
    const savingAccounts = result(groupedCurrencyAccountsMulti, 'savingaccount', []);
    const currentAccounts = result(groupedCurrencyAccountsMulti, 'currentaccount', []);
    return [...savingAccounts, ...currentAccounts];
  } else {
    const savingAccounts = result(groupedCurrencyAccountsMulti, 'savingaccount', []);
    const currentAccounts = result(groupedCurrencyAccountsMulti, 'currentaccount', []);
    return [...savingAccounts, ...currentAccounts];
  }
};

export const getBillerPossibleAccounts = (accounts = [], transType, targetAccount = {}) => {
  const regexTransType = new RegExp(transType, 'i');
  const isPossibleAccount = (account) => result(account, 'currency', '').toUpperCase() === 'IDR' && regexTransType.test(result(account, 'allowFlag', '').toLowerCase()) && result(account, 'accountTypeCode', '') !== '1070';
  const filteredAcc = accounts.filter(isPossibleAccount);
  const emoneyAccount = find(accounts, {accountType: 'emoneyAccount'}) || {};
  // const simasPoinAccount = find(accounts, {accountType: 'SimasPoinAccount'}) || {};
  const payeeAcccount = find(accounts, {accountNumber: result(targetAccount, 'accountNumber', '')}) || {};
  const removedAccount = isEmpty(payeeAcccount) ? filteredAcc : filter(filteredAcc, (acc) => acc.accountNumber !== payeeAcccount.accountNumber);

  const groupedAccounts = groupBy(removedAccount, (account) => (result(account, 'accountType', '').toLowerCase()));
  if (isEmpty(emoneyAccount)) {
    const simasPoinAccount = result(groupedAccounts, 'simaspoinaccount', []);
    const savingAccounts = result(groupedAccounts, 'savingaccount', []);
    const currentAccounts = result(groupedAccounts, 'currentaccount', []);
    return [...savingAccounts, ...currentAccounts, ...simasPoinAccount];
  } else {
    const simasPoinAccount = result(groupedAccounts, 'simaspoinaccount', []);
    const savingAccounts = result(groupedAccounts, 'savingaccount', []);
    const currentAccounts = result(groupedAccounts, 'currentaccount', []);
    return [emoneyAccount, ...savingAccounts, ...currentAccounts, ...simasPoinAccount];
  }
};

export const getAccountSavingOnly = (accounts = [], transType, targetAccount = {}) => {
  const regexTransType = new RegExp(transType, 'i');
  const isPossibleAccount = (account) => result(account, 'currency', '').toUpperCase() === 'IDR' && regexTransType.test(result(account, 'allowFlag', '').toLowerCase()) && result(account, 'accountTypeCode', '') !== '1070';
  const filteredAcc = accounts.filter(isPossibleAccount);
  const payeeAcccount = find(accounts, {accountNumber: result(targetAccount, 'accountNumber', '')}) || {};
  const removedAccount = isEmpty(payeeAcccount) ? filteredAcc : filter(filteredAcc, (acc) => acc.accountNumber !== payeeAcccount.accountNumber);
  const emoneyAccount = find(accounts, {accountType: 'emoneyAccount'}) || {};

  const groupedAccounts = groupBy(removedAccount, (account) => (result(account, 'accountType', '').toLowerCase()));
  const savingAccounts = result(groupedAccounts, 'savingaccount', []);

  if (isEmpty(emoneyAccount)) {
    return [...savingAccounts];
  } else {
    return [emoneyAccount, ...savingAccounts];
  }
};

export const getBillerPossibleAccountsSetLimit = (accounts = [], transType, targetAccount = {}) => {
  const regexTransType = new RegExp(transType, 'i');
  const isPossibleAccount = (account) => result(account, 'currency', '').toUpperCase() === 'IDR' && regexTransType.test(result(account, 'allowFlag', '').toLowerCase());
  const filteredAcc = accounts.filter(isPossibleAccount);
  // const simasPoinAccount = find(accounts, {accountType: 'SimasPoinAccount'}) || {};
  const payeeAcccount = find(accounts, {accountNumber: result(targetAccount, 'accountNumber', '')}) || {};
  const removedAccount = isEmpty(payeeAcccount) ? filteredAcc : filter(filteredAcc, (acc) => acc.accountNumber !== payeeAcccount.accountNumber);

  const groupedAccounts = groupBy(removedAccount, (account) => (result(account, 'accountType', '').toLowerCase()));
  if (isEmpty()) {
    const simasPoinAccount = result(groupedAccounts, 'simaspoinaccount', []);
    const savingAccounts = result(groupedAccounts, 'savingaccount', []);
    const currentAccounts = result(groupedAccounts, 'currentaccount', []);
    return [...savingAccounts, ...currentAccounts, ...simasPoinAccount];
  } else {
    const simasPoinAccount = result(groupedAccounts, 'simaspoinaccount', []);
    const savingAccounts = result(groupedAccounts, 'savingaccount', []);
    const currentAccounts = result(groupedAccounts, 'currentaccount', []);
    return [...savingAccounts, ...currentAccounts, ...simasPoinAccount];
  }
};

export const getPushBillPossibleAccounts = (accounts = []) => {
  const emoneyAccount = find(accounts, {accountType: 'emoneyAccount'}) || {};
  return {emoneyAccount};
};

export const getTransferPossibleAccountsLKD = (accounts = [], transType, targetAccount = {}) => {
  const regexTransType = new RegExp(transType, 'i');
  const isPossibleAccount = (account) => result(account, 'currency', '').toUpperCase() === 'IDR' && regexTransType.test(result(account, 'allowFlag', '').toLowerCase());
  const filteredAcc = accounts.filter(isPossibleAccount);
  const emoneyAccount = find(accounts, {accountType: 'emoneyAccount'}) || {};
  const payeeAcccount = find(accounts, {accountNumber: result(targetAccount, 'accountNumber', '')}) || {};
  const removedAccount = isEmpty(payeeAcccount) ? filteredAcc : filter(filteredAcc, (acc) => acc.accountNumber !== payeeAcccount.accountNumber);
  const groupedAccounts = groupBy(removedAccount, (account) => (result(account, 'accountType', '').toLowerCase()));
  if (isEmpty(emoneyAccount)) {
    const savingAccounts = result(groupedAccounts, 'emoneyAccount', []);
    const currentAccounts = result(groupedAccounts, 'currentaccount', []);
    return [...savingAccounts, ...currentAccounts];
  } else {
    const savingAccounts = result(groupedAccounts, 'emoneyAccount', []);
    const currentAccounts = result(groupedAccounts, 'currentaccount', []);
    return [emoneyAccount, ...savingAccounts, ...currentAccounts];
  }
};

export const getTransferPossibleAccountsTd = (accounts = [], transType, targetAccount = {}) => {
  const regexTransType = new RegExp(transType, 'i');
  const isPossibleAccount = (account) => result(account, 'currency', '').toUpperCase() !== 'SGD' && result(account, 'currency', '').toUpperCase() !== 'EUR' && regexTransType.test(result(account, 'allowFlag', '').toLowerCase());
  const filteredAcc = accounts.filter(isPossibleAccount);
  // const emoneyAccount = find(accounts, {accountType: 'emoneyAccount'}) || {};
  const payeeAcccount = find(accounts, {accountNumber: result(targetAccount, 'accountNumber', '')}) || {};
  const removedAccount = isEmpty(payeeAcccount) ? filteredAcc : filter(filteredAcc, (acc) => acc.accountNumber !== payeeAcccount.accountNumber);
  const groupedAccounts = groupBy(removedAccount, (account) => (result(account, 'accountType', '').toLowerCase()));
  const savingAccounts = result(groupedAccounts, 'savingaccount', []);
  const currentAccounts = result(groupedAccounts, 'currentaccount', []);
  return [...savingAccounts, ...currentAccounts];
};

export const getTransferPossibleAccountsNoEmoney = (accounts = [], transType, targetAccount = {}) => {
  const regexTransType = new RegExp(transType, 'i');
  const isPossibleAccount = (account) => result(account, 'currency', '').toUpperCase() === 'IDR' && regexTransType.test(result(account, 'allowFlag', '').toLowerCase());
  const filteredAcc = accounts.filter(isPossibleAccount);
  const payeeAcccount = find(accounts, {accountNumber: result(targetAccount, 'accountNumber', '')}) || {};
  const removedAccount = isEmpty(payeeAcccount) ? filteredAcc : filter(filteredAcc, (acc) => acc.accountNumber !== payeeAcccount.accountNumber);

  const groupedAccounts = groupBy(removedAccount, (account) => (result(account, 'accountType', '').toLowerCase()));
  const savingAccounts = result(groupedAccounts, 'savingaccount', []);
  const currentAccounts = result(groupedAccounts, 'currentaccount', []);
  return [...savingAccounts, ...currentAccounts];
};

export const getTransferPossibleAccountsSavingEmoneyCPM = (accounts = [], transType, targetAccount = {}) => {
  const regexTransType = new RegExp(transType, 'i');
  const isPossibleAccount = (account) => result(account, 'currency', '').toUpperCase() === 'IDR' && regexTransType.test(result(account, 'allowFlag', '').toLowerCase());
  const filteredAcc = accounts.filter(isPossibleAccount);
  const emoneyAccount = find(accounts, {accountType: 'emoneyAccount'}) || {};

  const payeeAcccount = find(accounts, {accountNumber: result(targetAccount, 'accountNumber', '')}) || {};
  const removedAccount = isEmpty(payeeAcccount) ? filteredAcc : filter(filteredAcc, (acc) => acc.accountNumber !== payeeAcccount.accountNumber);
  const groupedAccounts = groupBy(removedAccount, (account) => (result(account, 'accountType', '').toLowerCase()));

  if (isEmpty(emoneyAccount)) {
    const savingAccounts = result(groupedAccounts, 'savingaccount', []);
    const currentAccounts = result(groupedAccounts, 'currentaccount', []);
    return [...savingAccounts, ...currentAccounts];
  } else {
    const savingAccounts = result(groupedAccounts, 'savingaccount', []);
    const currentAccounts = result(groupedAccounts, 'currentaccount', []);
    return [emoneyAccount, ...savingAccounts, ...currentAccounts];
  }
};



const getBalanceTotal = (accounts, sumByLogic) => mapValues(accounts, (accountsForType) => sumBy(accountsForType, sumByLogic));

export const getGroupedAccountsSum = (accounts) => {
  if (!accounts || !Object.keys(accounts).length) return {};
  const IDRSummer = (account) => isIDRAccount(account) ? result(account, 'balances.availableBalance') : 0;
  const idrAccountsSum = getBalanceTotal(accounts, IDRSummer);
  const forexAccounts = groupBy(accounts.forex, (account) => (result(account, 'currency', '').toUpperCase()));
  const forexTotals = getBalanceTotal(forexAccounts, 'balances.availableBalance');
  return {...idrAccountsSum, forex: forexTotals};
};

export const transformTransactions = (transaction) => {
  const bucketsMap = {
    billPayments: 'bill pay',
    withdrawals: 'withdrawal',
    transfers: 'transfer'
  };
  let type = 'others';
  Object.keys(bucketsMap).every((bucketsMapKey) => {
    if (transaction.description.toLowerCase().includes(bucketsMap[bucketsMapKey])) {
      type = bucketsMapKey;
      return false; // breaks the loop
    } else {
      return true;
    }
  });
  return {...transaction, type};
};

export const filterTransactions = (transactions = [], filters) => {
  const transformedTransactions = transactions.map(transformTransactions);
  if (!(filters.others || filters.transfers || filters.withdrawals || filters.billPayments)) { // Do not filter if nothing is selected
    return transformedTransactions;
  }
  const selectedFilters = [];
  ['billPayments', 'withdrawals', 'transfers', 'others'].forEach((key) => {
    if (filters[key]) {
      selectedFilters.push(key);
    }
  });
  return filter(transformedTransactions, (trans) => selectedFilters.includes(trans.type));
};

export const getErrorMessage = (err, defaultMessage) => {
  if (result(err, 'data.notConnected', false)) { // Error message is being handled by the top bar if not connected to internet
    return;
  }
  if (typeof (err) === 'string') return err;
  const responseMessage = result(err, 'data.responseMessage', '');
  return isEmpty(responseMessage) ? defaultMessage : String(responseMessage);
};

export const generateAccountLabel = (accounts, payeeAccountNumber) => {
  const filteredAccount = filter(accounts, (acc) => acc.accountNumber !== payeeAccountNumber);
  const transformedAccounts = filteredAccount.map((acc) => {
    const display = `${acc.accountNumber || '--'} • ${acc.productType || '--'} • ${acc.name || '--'}`;
    return {
      ...acc,
      display
    };
  });
  return transformedAccounts;
};

export const generateAccountLabelQrTransfer = (accounts, payeeAccountNumber) => {
  const filteredAccount = filter(accounts, (acc) => acc.accountNumber !== payeeAccountNumber);
  const transformedAccounts = filteredAccount.map((acc) => {
    const display = `${acc.productType || '--'} - ${acc.accountNumber || '--'} `;
    return {
      ...acc,
      display
    };
  });
  return transformedAccounts;
};

export const generatePeriodLabelSharia = (period, periodTenor, tenorRateSyariah, tenorNisbahBank, tenorNisbahCust, isShariaAccount, currency, newRateSha) => {
  const filteredPeriod = filter(period, (per) =>  per.code !== null && (per.code <= '12M'));
  const transformedPeriod = filteredPeriod.map((per) => {
    let listRate = {};
    map(newRateSha, (obj) => {
      const rate = obj.substr(4, obj.length);
      const curr = obj.substring(0, 3);
      listRate = {...listRate, [`${curr}`]: rate};
    });
    const perCode = result(per, 'code', '01M');
    const tenorRate = currency === 'IDR' && isShariaAccount ? result(tenorRateSyariah, perCode, 6.5) : currency === 'IDR' ? result(periodTenor, perCode, 6.5) : currency === 'USD' ? listRate.USD : currency === 'AUD' ? listRate.AUD : currency === 'CNY' ? listRate.CNY : currency === 'EUR' ? listRate.EUR : currency === 'JPY' ? listRate.JPY : currency === 'SGD' ? listRate.SGD : listRate.IDR;
    const nisbahBank = currency === 'IDR' && isShariaAccount ? result(tenorNisbahBank, perCode, 6.5) : null;
    const nisbahCust = currency === 'IDR' && isShariaAccount ? result(tenorNisbahCust, perCode, 6.5) : null;
    const rateCode = `, ${language.TIME_DEPOSIT__INTEREST_LABEL_SHARIAH} ${tenorRate}% p.a`;
    const rateNisbahBank = ` ${language.TIME_DEPOSIT__NISBAH_BANK_SHARIAH} ${nisbahBank}%`;
    const rateNisbahCust = ` - ${language.TIME_DEPOSIT__NISBAH_CUST_SHARIAH} ${nisbahCust}%`;
    const display = `${language[('TIME_DEPOSIT_PERIOD_' + (result(per, 'code', '01M'))).toUpperCase()]}${rateNisbahCust}${rateNisbahBank}${rateCode}`;
    return {
      ...per,
      display,
      tenorRate,
      nisbahBank,
      nisbahCust
    };
  });
  return transformedPeriod;
};

export const generatePeriodLabel = (period, periodTenor, isShariaAccount, currency, newRate) => {
  const filteredPeriod = filter(period, (per) => per.code !== null);
  const transformedPeriod = filteredPeriod.map((per) => {
    let listRate = {};  
    const perCode = result(per, 'code', '01M');
   const tenorRate = perCode === '01M' ? result(newRate, '01M', 0) : perCode === '03M' ? result(newRate, '03M', 0) : perCode === '06M' ? result(newRate, '06M', 0) : perCode === '12M' ? result(newRate, '12M', 0) : perCode === '18M' ? result(newRate, '18M', 0) : perCode === '24M' ? result(newRate, '24M', 0) : perCode === '36M' ? result(newRate, '36M', 0) : result(newRate, '01M', 0);
    const rateCode = isShariaAccount ? '' : ` - ${language.TIME_DEPOSIT__INTEREST_LABEL} ${tenorRate}% p.a`;
    const display = `${language[('TIME_DEPOSIT_PERIOD_' + (result(per, 'code', '01M'))).toUpperCase()]}${rateCode}`;
    return {
      ...per,
      display
    };
  });
  return transformedPeriod;
};

export function getCurrentRouteName (navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

export function paginator (items, current_page, per_page_items) {
  let page = current_page || 1,
    per_page = per_page_items || 10,
    offset = (page - 1) * per_page,

    paginatedItems = items.slice(offset).slice(0, per_page_items),
    total_pages = Math.ceil(items.length / per_page);

  return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: (total_pages > page) ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems
  };
}

export const dateFormatter = (unformatted, format = 'DD/MM/YYYY') => moment(unformatted).format(format);

export const historyDateFormatter = (unformatted, format = 'DD MMM YYYY') => moment(unformatted, 'DD/MM/YYYY').format(format);

export const getTdInterest = (principal_amount, rate)  => parseInt((principal_amount * rate * 30) / (365 * 100));

export const getTdTypeOptions = (maturityInstructionList = []) => {
  const maturityListOptions =  map(maturityInstructionList, (maturityItem) => {
    if (result(maturityItem, 'code', '') !== null) {
      var labelAroType = language[('TIME_DEPOSIT_ARO_' + result(maturityItem, 'code', '')).toUpperCase()];
      return {label: labelAroType, value: result(maturityItem, 'id', '')};
    } else {
      return null;
    }
  });
  return compact(maturityListOptions);
};

export const getTdPeriod = (depositPeriodList = []) => {
  const depositPeriod =  map(depositPeriodList, (deposit) => {
    if (result(deposit, 'code', '') !== '') {
      var labelAroType = language[('PERIOD_LIST__' + result(deposit, 'code', '')).toUpperCase()];
      return {label: labelAroType, value: result(deposit, 'id', '')};
    } else {
      return null;
    }
  });
  return compact(depositPeriod);
};

export const normalizeAmount = (value, previousValue) => {
  const regex = /^\$?[\d,\.]+(\.\d*)?$/;
  const zeroRegex = /(^0{1,})\w+/g;
  if (!value) {
    return '';
  } else if (regex.test(value) && !zeroRegex.test(value)) {
    return value.replace(/[,\.]+/g, '');
  }
  return previousValue;
};

export const normalizeAmountCrossBorder = (value, previousValue) => {
  const regex = /^\$?[\d,\.]+(\.\d*)?$/;
  const zeroRegex = /(^0{1,})\w+/g;
  if (!value) {
    return '';
  } else if (regex.test(value) && !zeroRegex.test(value)) {
    return value.replace(',', '');
  }
  return previousValue;
};

export const normalizeNumber = (value) => {
  if (!value) {
    return '';
  } else {
    return value.replace(/[^\d]/g, '');
  }
};

export const normalizeNumberNoChar = (value) => {
  if (!value) {
    return '';
  } else {
    return value.replace(/[^0-9 ]+/g, '');
  }
};

export const getTdAccounts = (accounts) => filter(accounts, (account) => includes(result(account, 'allowFlag', ''), 'td'));

export const checkShariaAccount = (account) => includes(result(account, 'allowFlag', ''), 'tds');

export const getTabBarVisibility = (childOptions) => (childOptions && childOptions.visible !== 'undefined') ? childOptions.visible : true;

export const prepareTopups = (topups) => topups.map((topup) => ({...topup, display: `Rp ${currencyFormatter(topup.id)}`}));

export const formatCreditCardPaymentMode = (outstandingBalance) => {
  const paymentMethods = [
    {
      label: language.CREDIT_CARD__OUTSTANDING_BALANCE,
      sublabel: 'Rp ' + currencyFormatter(outstandingBalance),
      value: 'outstanding'
    },
    {
      label: language.CREDIT_CARD__OTHER,
      sublabel: '',
      value: 'other'
    }
  ];
  return paymentMethods;
};

export const obfuscateUsername = (username) => {
  if (!username || typeof username !== 'string') {
    throw {
      'data': {
        'responseMessage': language.ERROR_MESSAGE__UNABLE_TO_OBFUSCATE_USERNAME
      }
    };
  } else {
    let obfuscatedUsername = username.split('');
    const startIndexToObfuscate = 2;
    const obfuscationChar = '*';
    const lastIndexToObfuscate = username.length - 3; // this isn't a problem with the edge cases because we're mandating minimum length of the username
    obfuscatedUsername = obfuscatedUsername.map((element, index) => {
      if (index >= startIndexToObfuscate && index <= lastIndexToObfuscate) {
        return obfuscationChar;
      } else {
        return element;
      }
    });
    return obfuscatedUsername.join('');
  }
};

export const formatFieldNote = (value) => value ? value.replace(/[^a-zA-Z0-9 ]+/g, '') : '';

export const formatFieldDecimal = (value) => value ? value.replace(/[^0-9.]+/g, '') : '';

export const getOTPFromMsg = (sms = {}, key = '') => {
  const message = result(sms, 'body', '');
  const validator = /(sms token SimobiPlus)/;
  const parsedTxKey = result(message.match(validator), '[0]', null);
  if (parsedTxKey !== key) {
    return null;
  }
  const otpRegex = /^[\d]{6}/;
  const otp = message.match(otpRegex);
  return result(otp, '[0]', null);
};

export const normalisePhoneNumber = (mobileNumber) => {
  if (!mobileNumber) {
    return;
  }
  let newPhoneNumber = String(mobileNumber);
  const areaCode = newPhoneNumber.substring(0, 3);
  const phoneNumberLength = newPhoneNumber.length;
  if (areaCode.substring(0, 3) === '+62') {
    newPhoneNumber = mobileNumber.substring(1, 3) + mobileNumber.substring(3, phoneNumberLength);
  } else if (areaCode.substring(0, 1) === '0') {
    newPhoneNumber = '62' + mobileNumber.substring(1, phoneNumberLength);
  } else if (areaCode.substring(0, 1) === '8') {
    newPhoneNumber = '62' + mobileNumber.substring(0, phoneNumberLength);
  }
  return newPhoneNumber;
};

export const formatMobileNumber = (mobile = '') => {
  const stringifiedNumber = String(mobile);
  const formatterNumber = stringifiedNumber[0] === '8' ? `0${mobile}` : stringifiedNumber; // Add 0 if the no starts with '8'
  return formatterNumber.replace(/[^0-9]+/g, '');
};

export const isEasyPinTransaction = (amount, transConfig = []) => {
  const easyPinLimit = result(find(transConfig, {rank: '5'}), 'max_amount', 0);
  return parseInt(amount) <= parseInt(easyPinLimit);
};

export const checkBillAmountCc = (billAmount, billAmountCc) => {
  const outstandingBalance = parseInt(billAmount) !== 0 ? billAmount : billAmountCc;
  return outstandingBalance;
};

// export const getCcHistoryUrl = (creditCardNumber, iPass, lang, period) => {
//   const url = env.URL + '/download-billing-statement-creditcard?ipassport=' + encodeURIComponent(iPass) + '&lang=' + lang + '&period=' + period + '&sendEmail=false&accountNumber=' + encodeURIComponent(creditCardNumber);
//   return url;
// };

export const getCcHistoryUrl = (creditCardNumber, iPass, lang, period) => {
  const url = env.URL + '/download-billing-statement-creditcard?ipassport=' + iPass + '&lang=' + lang + '&period=' + period + '&sendEmail=false&accountNumber=' + creditCardNumber;
  return url;
};

export const getCcEStatement = (accountNumber, iPass, lang, month) => {
  const url = env.URL + '/cc-get-download-estatement?ipassport=' + iPass + '&lang=' + lang + '&month=' + month + '&accountNumber=' + accountNumber;
  return url;
};

export const creditCardNumberFormat = (number = '') => number.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');

export const isLockedDevice = (appInitKeys) => Boolean(appInitKeys && appInitKeys.username && appInitKeys.tokenClient && appInitKeys.tokenServer);

export const getInterceptorTrackerLabel = (errorResponse, userId) => {
  const requestData = JSON.parse(result(errorResponse, 'config.data', '{}'));
  const TXID = result(requestData, 'TXID', 'NOT FOUND');
  const responseCode = result(errorResponse, 'data.responseCode', 'NOT FOUND');
  return `TXID: ${TXID}, ID: ${userId}, RC: ${responseCode}`;
};

export const normalizeDate = (value, previousValue) => {
  if (String(previousValue).length > String(value).length) {
    return value;
  } else {
    const regexRightFormat = /(\d{2})[/](\d{2})[[/](\d{4})/g;
    const regexForTwoDigit = /(\d{2})/g;
    const regexForThreeDigit = /(\d{2})(\d{1})/g;
    const regexForFourDigit = /(\d{2})(\d{2})/g;
    const regexForFiveDigit = /(\d{2})[/](\d{2})/g;
    const regexForEightDigit = /(\d{2})(\d{2})(\d{4})/g;
    const regexForTenDigit = /(\d{8})(\d{2})/g;
    const regexExceptDigitAndSlash = /[^\d/]/g;

    const newValue = regexRightFormat.test(value) ? value : String(value).replace(regexExceptDigitAndSlash, '');
    return newValue.length === 2 ? String(newValue).replace(regexForTwoDigit, '$1/') :
      newValue.length === 3 ? String(newValue).replace(regexForThreeDigit, '$1/$2') :
        newValue.length === 4 ? String(newValue).replace(regexForFourDigit, '$1/$2/') :
          newValue.length === 5 ? String(newValue).replace(regexForFiveDigit, '$1/$2/') :
            newValue.length === 8 ? String(newValue).replace(regexForEightDigit, '$1/$2/$3') :
              newValue.length === 10 ? String(newValue).replace(regexForTenDigit, '$1').replace(regexForEightDigit, '$1/$2/$3') : newValue;
  }
};

export const isLessThanOutstanding = (amount, outstanding) => {
  const showInformation = (Number(amount) < Number(outstanding)) || amount === null;
  return showInformation;
};

export const formatYearMonthDate = (value) => {
  const regexRightFormat = /(\d{4})[/]/g;
  if (regexRightFormat.test(value)) return value;
  else {
    const replaceRegex = /(\d{4})(\d{2})/;
    return !value && parseInt(value) !== 0 ? '' : String(value).replace(replaceRegex, '$1/$2');
  }
};

export const selectedBank = (accNo, bankList) => {
  const bank = (filter(bankList,
    function (bank) {
      const regex = bank.prefixCC && new RegExp(bank.prefixCC);
      const result = (regex && regex.test(accNo));
      return result;
    }));
  return bank;
};

export const isSknPayee = (accNo, bankList) => {
  const bank = selectedBank(accNo, bankList);
  return result(bank, '[0].sknCC', false);
};

export const isNetworkPayee = (accNo, bankList) => {
  const bank = selectedBank(accNo, bankList);
  return result(bank, '[0].networkCC', false);
};

export const isSimasPayee = (accNo, bankList) => {
  const bank = selectedBank(accNo, bankList);
  return result(bank, '[0].isSinarmas', false);
};

export const isNetworkEnabled = (accNo, bankList) => {
  const bank = selectedBank(accNo, bankList);
  return result(bank, '[0].networkEnabled', false);
};

export const isInBin  = (accNo, bankList) => {
  const result = selectedBank(accNo, bankList);
  if (result.length <= 0) {
    return false;
  }
  return true;
};

export const currencySymbol = (currency) => {
  const currencyMap = {
    IDR: 'Rp',
    USD: '$',
    EUR: '€',
    SGD: '$',
    AUD: '$',
    JPY: '¥',
    CNY: '¥',
    NZD: '$',
  };
  return currencyMap[currency] || 'Rp';
};

export const getCurrencyQr = (currencyCode) => {
  let currencySymbol;
  switch (currencyCode) {
  case '360': {
    currencySymbol = 'Rp';
    break;
  } case '764': {
    currencySymbol = '฿';
    break;
  } case '458': {
    currencySymbol = 'RM';
    break;
  } case '702': {
    currencySymbol = '$';
    break;
  } case '392': {
    currencySymbol = '¥';
    break;
  } case '156': {
    currencySymbol = '¥';
    break;
  } case '978': {
    currencySymbol = '€';
    break;
  } case '36': {
    currencySymbol = '$';
    break;
  }
  default:
    return '?';
  }
  return currencySymbol;
};

export const getCurrencyNameQR = (currencyCode) => {
  let currencySymbol;
  switch (currencyCode) {
  case '360': {
    currencySymbol = 'IDR';
    break;
  } case '764': {
    currencySymbol = 'THB';
    break;
  } case '458': {
    currencySymbol = 'MYR';
    break;
  } case '702': {
    currencySymbol = 'SGD';
    break;
  } case '392': {
    currencySymbol = 'JPY';
    break;
  } case '156': {
    currencySymbol = 'CNY';
    break;
  } case '978': {
    currencySymbol = 'EUR';
    break;
  } case '36': {
    currencySymbol = 'AUD';
    break;
  }
  default:
    return '';
  }
  return currencySymbol;
};

export const minimumCurrency = (currency, minCurrency) => {
  const currencyMap = {
    IDR: minCurrency.IDR,
    USD: minCurrency.USD,
    EUR: minCurrency.EUR,
    SGD: minCurrency.SGD,
    AUD: minCurrency.AUD,
    JPY: minCurrency.JPY,
    CNY: minCurrency.CNY,
    NZD: minCurrency.NZD,
  };
  return currencyMap[minCurrency];
};

export const formatForexAmount = (value, currency = 'IDR') => {
  const decimalCurrencyMap = {
    IDR: 0,
    USD: 2,
    EUR: 2,
    SGD: 2,
    AUD: 2,
    JPY: 0,
    CNY: 0,
    THB: 2,
    NZD: 2
  };
  if (currency === 'IDR') {
    const amount = (!value && parseInt(value) !== 0) ? '' :
      value.toString().replace(/([,.])+/g, '');
    const expectedSeparator = Math.floor(amount.length / 3);
    const separator = '.';
    const separatorAmount = (amount.split(separator).length - 1);
    const regexRightFormat = /(\.)(?=(\d{3}))/g; // if id/en
    if (regexRightFormat.test(value) && expectedSeparator === separatorAmount) return value;
    else {
      const replaceRegex = /(\d)(?=(\d{3})+(?!\d))/g;
      const replaceValue = '$1' + separator;
      const returnValue = (!value && parseInt(value) !== 0) ? '' :
        value.toString().replace(replaceRegex, replaceValue);
      return returnValue;
    }
  } else {
    if (!value && parseInt(value) !== 0) {
      return '0';
    }
    const regexRightFormat = /(,)(?=(\d{3}))/g;
    if (regexRightFormat.test(value)) {
      return value;
    }
    const replaceRegex = /(\d)(?=(\d{3})+(?!\d))/g;
    return Number(value).toFixed(decimalCurrencyMap[currency]).replace(replaceRegex, '$1,');
  }
};

export const formatForexAmountMiniStatement = (value, currency = 'IDR') => {
  const decimalCurrencyMap = {
    IDR: 0,
    USD: 2,
    EUR: 2,
    SGD: 2,
    AUD: 2,
    JPY: 2,
    CNY: 2,
    NZD: 2
  };
  if (currency === 'IDR') {
    const amount = (!value && parseInt(value) !== 0) ? '' :
      value.toString().replace(/([,.])+/g, '');
    const expectedSeparator = Math.floor(amount.length / 3);
    const separator = '.';
    const separatorAmount = (amount.split(separator).length - 1);
    const regexRightFormat = /(\.)(?=(\d{3}))/g; // if id/en
    if (regexRightFormat.test(value) && expectedSeparator === separatorAmount) return value;
    else {
      const replaceRegex = /(\d)(?=(\d{3})+(?!\d))/g;
      const replaceValue = '$1' + separator;
      const returnValue = (!value && parseInt(value) !== 0) ? '' :
        value.toString().replace(replaceRegex, replaceValue);
      return returnValue;
    }
  } else {
    if (!value && parseInt(value) !== 0) {
      return '0';
    }
    const regexRightFormat = /(,)(?=(\d{3}))/g;
    if (regexRightFormat.test(value)) {
      return value;
    }
    const replaceRegex = /(\d)(?=(\d{3})+(?!\d))/g;
    return Number(value).toFixed(decimalCurrencyMap[currency]).replace(replaceRegex, '$1,');
  }
};

export const formatForexAmountPaymentStatus = (value, currency = 'IDR') => {
  const decimalCurrencyMap = {
    IDR: 0,
    USD: 2,
    EUR: 2,
    SGD: 2,
    AUD: 2,
    JPY: 2,
    CNY: 2,
    NZD: 2,
  };
  if (currency === 'IDR') {
    const amount = (!value && parseInt(value) !== 0) ? '' :
      value.toString().replace(/([,.])+/g, '');
    const expectedSeparator = Math.floor(amount.length / 3);
    const separator = '.';
    const separatorAmount = (amount.split(separator).length - 1);
    const regexRightFormat = /(\.)(?=(\d{3}))/g; // if id/en
    if (regexRightFormat.test(value) && expectedSeparator === separatorAmount) return value;
    else {
      const replaceRegex = /(\d)(?=(\d{3})+(?!\d))/g;
      const replaceValue = '$1' + separator;
      const returnValue = (!value && parseInt(value) !== 0) ? '' :
        value.toString().replace(replaceRegex, replaceValue);
      return returnValue;
    }
  } else {
    if (!value && parseInt(value) !== 0) {
      return '0';
    }
    const regexRightFormat = /(,)(?=(\d{3}))/g;
    if (regexRightFormat.test(value)) {
      return value;
    }
    const replaceRegex = /(\d)(?=(\d{3})+(?!\d))/g;
    return Number(value).toFixed(decimalCurrencyMap[currency]).replace(replaceRegex, '$1,');
  }
};

export const waterBillPlaceholder = (value) => {
  const billerNameMap = {
    '009937': language.WATER_BILL__CUSTOMER_ID_PDAM_PLACEHOLDER,
    '009936': language.WATER_BILL__CUSTOMER_ID_PALYJA_PLACEHOLDER,
    '009928': language.WATER_BILL__CUSTOMER_ID_AETRA_PLACEHOLDER
  };
  return billerNameMap[value];
};

export const formatFieldName = (value) => value ? value.replace(/[^a-zA-Z. ]+/g, '') : '';

export const formatFieldAccount = (value) => value ? value.replace(/[^0-9]+/g, '') : '';

export const formatDot = (value) => value ? value.replace(/\.[^.]*$/g, '') : '';

export const getBannerLink = (banners, location) => {
  const foundBanner = find(banners, {location}) || {};
  return foundBanner.imageLink;
};

export const getAllOffersExcept = (clickedOffer = {}, allOffers = []) => {
  const offers = allOffers.filter((offer) => offer.offerID !== clickedOffer.offerID);
  return offers;
};

export const getAllAccountsExcept = (allAccounts = []) => {
  let filteredAccounts = [];
  allAccounts.forEach((account) => {
    const accountTypeCode = result(account, 'accountTypeCode', '');
    const accountNumber = result(account, 'accountNumber', '');
    const isSyaria = checkSyaria(accountNumber);

    if (!isSyaria && (accountTypeCode !== '3808')) {
      filteredAccounts.push(account);
    }
  });
  return filteredAccounts;
};

export const getAllAccountsExceptSyaCPM = (allAccounts = []) => {
  let filteredAccounts = [];
  allAccounts.forEach((account) => {
    const accountNumber = result(account, 'accountNumber', '');
    const isSyaria = checkSyaria(accountNumber);
    if (!isSyaria) {
      filteredAccounts.push(account);
    }
  });
  return filteredAccounts;
};

export const validateCurrentDate = () => {
  const date = new Date().getDay();
  return date === 6 || date === 7;
};

export const getTransactionType = (amount, tokenConfig = [], isOwnAccount = false) => {
  const type = result(maxBy(filter(tokenConfig, (config) => {
    const maxAmount = isOwnAccount && config.max_amount_own ? parseInt(config.max_amount_own) : parseInt(config.max_amount);
    const minAmount = isOwnAccount && config.min_amount_own ? parseInt(config.min_amount_own) : parseInt(config.min_amount);
    return (parseInt(amount) <= parseInt(maxAmount) && parseInt(amount) >= parseInt(minAmount)) || parseInt(maxAmount) === -1;
  }), (filteredConfig) => filteredConfig.rank), 'token_id');
  return isNaN(parseInt(amount)) ? '3' : type; // 3 is easypin
};


export const smsOTP = (amount, tokenConfig = [], isOwnAccount = false) => {
  const type = result(maxBy(filter(tokenConfig, (config) => {
    const maxAmount = isOwnAccount && config.max_amount_own ? parseInt(config.max_amount_own) : parseInt(config.max_amount);
    const minAmount = isOwnAccount && config.min_amount_own ? parseInt(config.min_amount_own) : parseInt(config.min_amount);
    return (parseInt(amount) <= parseInt(maxAmount) && parseInt(amount) >= parseInt(minAmount)) || parseInt(maxAmount) === -1;
  }), (filteredConfig) => filteredConfig.rank), 'token_id');
  return isNaN(parseInt(amount)) ? '3' : type; // 3 is easypin
};

export const scrambleKeyboard = (scramble = true) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  if (scramble) {
    return shuffle(keys);
  }
  return keys;
};

export const generateCaptcha = () => {
  const id = random(1, true) * 1000;
  const captchaImg = env.URL + '/captcha?id=' + id;
  return {captchaId: id, captchaImg};
};

export const generateCaptchaOpenProduct = () => {
  const id = random(1, true) * 1000;
  const captchaImgOpenProduct = env.URL + '/captcha?id=' + id;
  return {captchaId: id, captchaImgOpenProduct};
};

export const generateCaptchaForNTB = () => {
  const id =  new Date().getTime();
  const captchaImg = env.URLCAPTCHA + '/captcha.do?mode=simple&id=' + id;
  return {captchaId: id, captchaImg};
};

export const generateLanguageGenericBiller = (string = '') => {
  const regex = /[.\s]+/g;
  return 'GENERIC_BILLER__' + string.replace(regex, '_').toUpperCase();
};

export const generateLanguageGenericBillerPlaceHolder = (string = '') => {
  const regex = /[.\s]+/g;
  return 'GENERIC_BILLER__' + string.replace(regex, '_').toUpperCase() + '__PLACEHOLDER';
};

export const generateRegex = (string = '', userName = '') => {
  const regexText = string.replace('badword', userName);
  const regex = /[/\s]+/g;
  let regexTextFinal = null;
  if (!regex) {
    regexTextFinal = new RegExp(regexText);
  } else {
    const specialRegex = regexText.split('/');
    regexTextFinal =  new RegExp(specialRegex[0], specialRegex[1]);
  }
  return regexTextFinal;
};

export const removeComma = (string = '') => {
  const regex = /,/g;
  return string.replace(regex, '');
};

export const removeDot = (string = '') => {
  const regex = /\./g;
  return string.replace(regex, '');
};


export const scheduleTransferListEN = [
  {label: 'One Time', value: 'oneTime'},
  {label: 'Everyday', value: 'everyday'},
  {label: 'Once A Week', value: 'onceAWeek'},
  {label: 'Once Every Two Weeks', value: 'onceEveryTwoWeeks'},
  {label: 'Once A Month', value: 'onceAMonth'}
];

export const scheduleTransferListID = [
  {label: 'Tidak diulang', value: 'oneTime'},
  {label: 'Setiap hari', value: 'everyday'},
  {label: 'Seminggu sekali', value: 'onceAWeek'},
  {label: '2 Minggu sekali', value: 'onceEveryTwoWeeks'},
  {label: 'Sebulan sekali', value: 'onceAMonth'}
];

export const  monthList = [
  {label: '1', value: '01'}, {label: '2', value: '02'}, {label: '3', value: '03'}, {label: '4', value: '04'},
  {label: '5', value: '05'}, {label: '6', value: '06'}, {label: '7', value: '07'}, {label: '8', value: '08'},
  {label: '9', value: '09'}, {label: '10', value: '10'}, {label: '11', value: '11'}, {label: '12', value: '12'}
];

export const getFilteredBillerDataByType = (billerConfig, type = '1') =>
  filter(billerConfig.billerList, {billerPreferences: {billerType: type}});

export const generateDenomination = (biller) => {
  const isUsingPackageCode = result(biller, 'billerPreferences.isUsingPackageCode', '');
  const billerName = result(biller, 'name', '');
  const denomList = result(biller, 'denomList', []);
  if (billerName === 'ShopeePay') {
    return map(denomList, (denom) => ({id: denom.id, label: `${denom.label}`, filter: denom.filter}));
  } else if (isUsingPackageCode === '1') {
    return map(denomList, (denom) => ({id: denom.id, label: `${denom.label} - Rp ${denom.filter}`, filter: denom.filter}));
  } else {
    return denomList;
  }
};

export const generatePackageCode = (biller, billDetails) => {
  const billerInqMenu = result(biller, 'billerPreferences.billerInqMenu', false);
  const packageCodeList = result(billDetails, 'displayList', []);
  if (billerInqMenu) {
    return map(packageCodeList, (packageCode) => ({id: (packageCode.key).substring(0, 2), label: packageCode.key}));
  } else {
    return packageCodeList;
  }
};

export const generateTipList = (QRInvoice) => [
  {label: currencySymbol(result(QRInvoice, 'content.currency', 'IDR')) + ' 0', value: 0},
  {label: currencySymbol(result(QRInvoice, 'content.currency', 'IDR')) + ' 2,000', value: 2000},
  {label: currencySymbol(result(QRInvoice, 'content.currency', 'IDR')) + ' 5,000', value: 5000},
  {label: currencySymbol(result(QRInvoice, 'content.currency', 'IDR')) + ' 10,000', value: 10000},
  {label: 'Input Manually', value: 'manual'}];

export const checkAdminBank = (adminBankBack) => adminBankBack ? adminBankBack : 0;

export const getFilteredBillerByCode = (billerConfig, type = '810128') => {
  const filteredBillers = find(billerConfig.billerList, {billerPreferences: {code: type}});
  if (!filteredBillers) {
    return [];
  }
  return filteredBillers;
};

export const generateBillerMenu = (billerMenuOrder = [0, 1, 2, 3, 4, 5, 6, 7], functions, isVerified) => {
  let serviceList = [];
  // CASE:
  // #0:water
  // #1:pln
  // #2:postpaid
  // #3:cc
  // #4:prepaid
  // #5:qr
  // #6:gopay
  // #7:ovo
  // #8:tokopedia
  // #9:smartfren
  // #99:other

  // navigateTo: (based on biller-config)
  // #0: water
  // #1: electricity

  forEach(billerMenuOrder, ((value) => {
    switch (value) {
    case '0': {
      serviceList.push({
        iconName: 'water-payment',
        title: language.PAY_BILLS__WATER,
        onPress: functions.navigateTo('GenericBiller', 'WATER'),
        iconSize: 20,
        layers: billerIconGenerator('0')
      });
      break;
    }
    case '1': {
      serviceList.push({
        iconName: 'electricity-payment',
        title: language.PAY_BILLS__ELECTRICITY,
        onPress: functions.navigateTo('GenericBiller', 'ELECTRICITY'),
        iconSize: 20,
        layers: billerIconGenerator('1')
      });
      break;
    }
    case '2': {
      serviceList.push({
        iconName: 'mobile-postpaid',
        title: language.PAY_BILLS__MOBILE_POSTPAID,
        onPress: functions.navigateTo('BillerTypeOne'),
        iconSize: 20,
        layers: billerIconGenerator('2')
      });
      break;
    }
    case '3': {
      serviceList.push({
        iconName: 'card-number-input',
        title: language.PAY_BILLS__CREDIT_CARD,
        onPress: isVerified ? functions.navigateTo('CreditCard') : functions.messageNK(),
        iconSize: 20,
        layers: billerIconGenerator('3', isVerified),
        disable: !isVerified,
      });
      break;
    }
    case '4': {
      serviceList.push({
        iconName: 'mobile-topup',
        title: language.PAY_BILLS__MOBILE_TOP_UP,
        onPress: functions.navigateTo('BillerTypeSix'),
        iconSize: 20,
        layers: billerIconGenerator('4')
      });
      break;
    }
    case '6': {
      serviceList.push({
        iconName: 'gopay-icon',
        title: language.PAY_BILLS__GOPAY,
        onPress: functions.goToBiller('GOJEK'),
        iconSize: 40,
        layers: billerIconGenerator('6'),
      });
      break;
    }
    case '7': {
      serviceList.push({
        iconName: 'gopay-icon',
        title: language.PAY_BILLS__OVO,
        onPress: functions.goToBiller('OVO'),
        iconSize: 40,
        layers: billerIconGenerator('7'),
      });
      break;
    }
    case '8': {
      serviceList.push({
        iconName: 'gopay-icon',
        title: language.PAY_BILLS__TOKOPEDIA,
        onPress: functions.goToBiller('TOKOPEDIA'),
        iconSize: 40,
        layers: billerIconGenerator('8')
      });
      break;
    }
    case '9': {
      serviceList.push({
        iconName: 'others-icon',
        title: language.PAY_BILLS__SMARTFREN,
        onPress: functions.goToBiller('SMARTFREN PAKET DATA'),
        iconSize: 40,
        layers: billerIconGenerator('9')
      });
      break;
    }
    case '10': {
      serviceList.push({
        iconName: 'BuddhaTzuChi',
        title: language.PAY_BILLS__BUDDHA_TZU_CHI,
        onPress: functions.goToBiller('BUDDHA TZU CHI'),
        iconSize: 32,
        layers: billerIconGenerator('10')
      });
      break;
    }
    case '11': {
      serviceList.push({
        iconName: 'link-aja',
        title: language.PAY_BILLS__LINK_AJA,
        onPress: functions.goToBiller('LINKAJA'),
        iconSize: 32,
        layers: billerIconGenerator('11')
      });
      break;
    }
    case '99': {
      serviceList.push({
        iconName: 'others-icon',
        title: language.PAY_BILLS__OTHER,
        onPress: functions.navigateTo('GenericBiller'),
        iconSize: 40,
        layers: billerIconGenerator('99')
      });
      break;
    }
    default:
      break;
    }
  }
  ));
  return serviceList;
};

export const generateBillerMenuBeforeLogin = (billerMenuOrder = [0, 1, 2, 3, 4, 5, 6, 7], functions) => {
  let serviceList = [];
  forEach(billerMenuOrder, ((value) => {
    switch (value) {
    case '0': {
      serviceList.push({
        iconName: 'water-payment',
        title: language.PAY_BILLS__WATER,
        onPress: functions.navigateTo('GenericBiller', 'WATER'),
        iconSize: 40,
        layers: billerIconGenerator('0')
      });
      break;
    }
    case '1': {
      serviceList.push({
        iconName: 'electricity-payment',
        title: language.PAY_BILLS__ELECTRICITY,
        onPress: functions.navigateTo('GenericBiller', 'ELECTRICITY'),
        iconSize: 32,
        layers: billerIconGenerator('1')
      });
      break;
    }
    case '2': {
      serviceList.push({
        iconName: 'mobile-postpaid',
        title: language.PAY_BILLS__MOBILE_POSTPAID,
        onPress: functions.navigateTo('BillerTypeOne'),
        iconSize: 32,
        layers: billerIconGenerator('2')
      });
      break;
    }
    case '3': {
      serviceList.push({
        iconName: 'card-number-input',
        title: language.PAY_BILLS__CREDIT_CARD,
        onPress: functions.navigateTo('CreditCard'),
        iconSize: 20,
        layers: billerIconGenerator('3')
      });
      break;
    }
    case '4': {
      serviceList.push({
        iconName: 'mobile-topup',
        title: language.PAY_BILLS__MOBILE_TOP_UP,
        onPress: functions.navigateTo('BillerTypeSix'),
        iconSize: 32,
        layers: billerIconGenerator('4')
      });
      break;
    }
    case '5': {
      serviceList.push({
        iconName: 'pay-by-qr',
        title: language.PAY_BY_QR__TITLE,
        onPress: functions.onQR,
        iconSize: 32,
        layers: billerIconGenerator('5')
      });
      break;
    }
    case '6': {
      serviceList.push({
        iconName: 'gopay-icon',
        title: language.PAY_BILLS__GOPAY,
        onPress: functions.goToBiller('GOJEK'),
        iconSize: 32,
        layers: billerIconGenerator('6')
      });
      break;
    }
    case '7': {
      serviceList.push({
        iconName: 'gopay-icon',
        title: language.PAY_BILLS__OVO,
        onPress: functions.goToBiller('OVO'),
        iconSize: 40,
        layers: billerIconGenerator('7')
      });
      break;
    }
    case '8': {
      serviceList.push({
        iconName: 'gopay-icon',
        title: language.PAY_BILLS__TOKOPEDIA,
        onPress: functions.goToBiller('TOKOPEDIA'),
        iconSize: 40,
        layers: billerIconGenerator('8')
      });
      break;
    }
    case '99': {
      serviceList.push({
        iconName: 'others-icon',
        title: language.PAY_BILLS__OTHER,
        onPress: functions.navigateTo('GenericBiller'),
        iconSize: 40,
        layers: billerIconGenerator('99')
      });
      break;
    }
    default:
      break;
    }
  }
  ));
  return serviceList;
};

export const listLang = (data) => {
  if (data === 'portofolio_mutualfund') {
    data = language.SINARMAS_REKSADANA;
  } else if (data === 'SinarmasSekuritas') {
    data = language.SINARMAS_SEKURITAS;
  } else if (data === 'portofolio_bancassurance') {
    data = language.SINARMAS_BANCASSURANCE;
  } else if (data === 'sinarmasMSIG') {
    data = language.SINARMAS_MSIG;
  } else if (data === 'ASJ') {
    data = language.SINARMAS_ASJ;
  } else if (data === 'starInvestama') {
    data = language.SINARMAS_AJSI;
  } else {
    data;
  }
  return data;
};


export const getTransferFee = (rawBillMetadataArray = [], transferType) => {
  let transferFee = 0;
  rawBillMetadataArray.forEach((eachDetail) => {
    if (lowerCase(eachDetail['mode']) === lowerCase(transferType)) {
      transferFee = eachDetail['charge'];
    }
  });
  return transferFee;
};

export const getDayName = (day) => {
  let dayName = moment(day).format('dddd');
  if (dayName.toLowerCase() === 'monday') {
    dayName = language.DAY__MONDAY;
  } else if (dayName.toLowerCase() === 'tuesday') {
    dayName = language.DAY__TUESDAY;
  } else if (dayName.toLowerCase() === 'wednesday') {
    dayName = language.DAY__WEDNESDAY;
  } else if (dayName.toLowerCase() === 'thursday') {
    dayName = language.DAY__THURSDAY;
  } else if (dayName.toLowerCase() === 'friday') {
    dayName = language.DAY__FRIDAY;
  } else if (dayName.toLowerCase() === 'saturday') {
    dayName = language.DAY__SATURDAY;
  } else if (dayName.toLowerCase() === 'sunday') {
    dayName = language.DAY__SUNDAY;
  }
  return dayName;
};

export const countCoupons = (couponList) => {
  const coupons = groupBy(couponList, (coupon) => (result(coupon, 'validityEndDate', '')));
  let display = [];
  forEach(coupons, (value, key) => {
    display.push({
      key,
      value
    });
  });
  return display;
};

export const maxAmountValidate = (amount) => amount > 500000000;

export const generateDropDownList = (period, selected) => {
  let filteredPeriod = {};
  if (selected) {
    filteredPeriod = filter(period, (per) => per.code === selected);
  } else {
    filteredPeriod = filter(period, (per) => per.code !== null);
  }

  const transformedPeriod = filteredPeriod.map((per) => {
    const display = result(per, 'name', '');
    return {
      ...per,
      display
    };
  });

  return transformedPeriod;
};

export const formatPremi = (data) => ({
  label: result(data, 'name', ''),
  sublabel: '',
  value: result(data, 'code', ''),
});

export const checkPremi = (premi) => premi.map(
  (data, i) => formatPremi(data, i)
);

export const generateCardlessWithdrawal = (phoneNumber, bank, description, prefixCardlessWithdrawal) => ({
  'id': null,
  'name': 'CARDLESS WITHDRAWAL',
  'transferType': 'inbank',
  'accountNumber': prefixCardlessWithdrawal + phoneNumber,
  'phoneNumber': phoneNumber,
  'bank': bank,
  'description': description,
  'accountType': 'UnknownAccount',
  'currency': 'IDR',
  'isNewPayee': true,
  'targetType': {
    'code': 'cardlessWithdrawalTransfer'
  }
});

export const getDropDownList = (itemList) => generateLabelKey(itemList, {display: 'name', val: 'code'}, 'code');

export const generateLabelKey = (list, labelKey, idParam) => {
  const newList = filter(list, (listVal) => result(listVal, idParam, '') !== null);
  const transformedList = newList.map((listVal) => {
    let retMap = {};
    map(labelKey, (obj, key) => {
      retMap = {...retMap, [`${key}`]: result(listVal, obj, '')};
    });
    return {...retMap, ...listVal};
  });
  return transformedList;
};

export const generateMethodTransfer = (item) => {
  let method = '';
  if (item === 'Transfer Internal') {
    method = 'BOOK';
  } else if (item === 'Transfer External') {
    method = 'DMCT';
  } else if (item === 'Transfer Cross Border') {
    method = 'XBCT';
  } else if (item === 'Cash Deposit') {
    method = 'CDPT';
  }
  return method;
};

export const generateAccountListLabel = (accountList) => { // format = productType - accountNumber
  const transformedList = accountList.map((account) => {
    let transformedAccount = {};
    transformedAccount = {...transformedAccount, 'accountLabel': result(account, 'productType', '') + ' - ' + result(account, 'accountNumber', '')};
    return {...transformedAccount, ...account};
  });
  return transformedList;
};

export function PlanInsurancePrice (plan) {
  const labelPlanOption = language.TRAVEL__PLAN__PRICE;
  switch (plan) {
  // Domestic
  case 'PLAN A': {
    return `${labelPlanOption} 50.000.000`;
  } case 'PLAN B': {
    return `${labelPlanOption} 100.000.000`;
  } case 'PLAN C': {
    return `${labelPlanOption} 200.000.000`;
  } case 'PLAN D': {
    return `${labelPlanOption} 400.000.000`;
  }

  // Overseas Individu
  case 'BS_SLVR1_I': {
    return `${labelPlanOption} 230.000.000`;
  } case 'BS_SLVR2_I': {
    return `${labelPlanOption} 345.000.000`;
  } case 'BS_SLVR3_I': {
    return `${labelPlanOption} 460.000.000`;
  } case 'BS_GOLD_I': {
    return `${labelPlanOption} 575.000.000`;
  } case 'BS_PLT_I': {
    return `${labelPlanOption} 1.150.000.000`;
  }

  // Overseas Family
  case 'BS_SLVR1_F': {
    return `${labelPlanOption} 230.000.000`;
  } case 'BS_SLVR2_F': {
    return `${labelPlanOption} 345.000.000`;
  } case 'BS_SLVR3_F': {
    return `${labelPlanOption} 460.000.000`;
  } case 'BS_GOLD_F': {
    return `${labelPlanOption} 575.000.000`;
  } case 'BS_PLT_F': {
    return `${labelPlanOption} 1.150.000.000`;
  }
  default:
    return '';
  }
}

export const andromaxAccount = (accounts = []) => {
  const isPossibleAccount = (account) => (result(account, 'currency', '').toUpperCase() === 'IDR') && (result(account, 'accountTypeCode', '') === '6026');
  const filteredAcc = accounts.filter(isPossibleAccount);
  const groupedAccounts = groupBy(filteredAcc, (account) => (result(account, 'accountType', '').toLowerCase()));
  const savingAccounts = result(groupedAccounts, 'savingaccount', []);
  const currentAccounts = result(groupedAccounts, 'currentaccount', []);
  return [...savingAccounts, ...currentAccounts];
};

export const generateLoanStatus = (code) => {
  if (code === '2') {
    return language.LOAN__STATUS_SPECIAL_MENTION;
  } else if (code === '3') {
    return language.LOAN__STATUS_SUBSTANDARD;
  } else if (code === '4') {
    return language.LOAN__STATUS_DOUBTFUL;
  } else if (code === '5') {
    return language.LOAN__STATUS_LOSS;
  } else {
    return language.LOAN__STATUS_CURRENT;
  }
};

export const generateOrientation = (orientationCode, currentPlatform = '') => {
  const platform = currentPlatform === '' ? Platform.OS : currentPlatform;
  const orientationString = orientationCode.toString();
  if (platform === 'android') {
    if (orientationString === '3' || orientationString === '4') {
      return '180';
    } else if (orientationString === '5' || orientationString === '6') {
      return '90';
    } else if (orientationString === '7' || orientationString === '8') {
      return '270';
    }
    return '0';
  } else {
    if (orientationString === '3') {
      return '180';
    } else if (orientationString === '6') {
      return '270';
    }
    return '0';
  }
};

export const checkFlipImage = (orientationCode, currentPlatform = '') => {
  const platform = currentPlatform === '' ? Platform.OS : currentPlatform;
  const orientationString = orientationCode.toString();
  if (platform === 'android') {
    if (orientationString === '2' || orientationString === '4' || orientationString === '5' || orientationString === '7') {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const formatFieldPostal = (value) => value ? value.replace(/\b[,]+.*$/g, '') : '';

export const precisionRound = (number, precision) => {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};

export const generateLists = (data, payeeAccountNumber) => {
  const filteredAccount = filter(data, (dt) => dt.val !== payeeAccountNumber);
  const transformedAccounts = filteredAccount.map((dt) => {
    const display = `${dt.lab || '--'}`;
    return {
      ...dt,
      display
    };
  });
  return transformedAccounts;
};

export const checkSyaria = (accountNo) => {
  const regex = /([99][0-9]{8})\w+/g;
  return regex.test(accountNo);
};

export const checkSmartSaving = (accountNo) => {
  if (startsWith(accountNo, 'P')) {
    return smartSaving;
  }
};

export const checkNumber = (value) => !isNaN(value);

export const generateCcImage = (accountNo, numberCVV) => {
  const selectedAccounts = result(numberCVV, 'selectedAccount.accountNumber', '');
  if (!isEmpty(numberCVV) && selectedAccounts === accountNo) {
    if (startsWith(selectedAccounts, '489372')) {
      return platinumBack;
    } else if (startsWith(selectedAccounts, '489373')) {
      return goldBack;
    } else if (startsWith(selectedAccounts, '489374')) {
      return indigoBack;
    } else if (startsWith(selectedAccounts, '421469')) {
      return oramiBack;
    } else if (startsWith(selectedAccounts, '421456')) {
      return alfamartBack;
    } else {
      return backdump;
    }
  } else {
    if (startsWith(accountNo, '489372')) {
      return creditCardPlatinum;
    } else if (startsWith(accountNo, '489373')) {
      return creditCardGold;
    } else if (startsWith(accountNo, '489374')) {
      return creditCardIndigo;
    } else if (startsWith(accountNo, '421469')) {
      return creditCardOrami;
    } else if (startsWith(accountNo, '421456')) {
      return creditCardAku;
    } else {
      return creditCardSilver;
    }
  }
};

export const generateCcImagebyType = (accountNo, numberCVV, cardType) => {
  const selectedAccounts = result(numberCVV, 'selectedAccount.accountNumber', '');
  const indigoType = cardType === 'VCCLSG' || cardType === 'VCCLSK' || cardType ===  'VCCLSU' || cardType ===  'VCRIDG' || cardType ===  'VCRTES' || cardType ===  'VRG001' || cardType ===  'VRI001' || cardType ===  'VRI002' || cardType ===  'VRK001' || cardType ===  'VRS001' ||
  cardType ===  'VRS002' || cardType ===  'VRS003' || cardType ===  'VRS004' || cardType === 'VRT001' || cardType === 'VRU001' || cardType === 'VSCIDG' || cardType === 'VSSREG' || cardType === 'VSUIDG' || cardType === 'VSSSMF' || cardType ===  'VSUSMF';
  const platinumType = cardType === 'VCPLTG' || cardType === 'VCPLTK' || cardType === 'VCPLTU' || cardType === 'VCSCCP' || cardType === 'VINDIG' || cardType === 'VPG001' || cardType === 'VPG002' || cardType === 'VPK001' || cardType === 'VPK002' || cardType === 'VPPS01' || cardType === 'VPS001' ||
  cardType === 'VPS002' || cardType === 'VPS003' || cardType === 'VPS004' || cardType === 'VPS005' || cardType === 'VPS007' || cardType === 'VPS008' || cardType === 'VPS009' || cardType === 'VPU001' || cardType === 'VPU002' || cardType === 'VPUVIP' || cardType === 'VPVVIP' || cardType === 'VVVIP2' || cardType === 'VPUPNT'
  || cardType === 'VCPLTO';
  const alfaType = cardType === 'VCALFA' || cardType === 'VNALFA' || cardType === 'VSAL74';

  if (!isEmpty(numberCVV) && selectedAccounts === accountNo) {
    if (startsWith(selectedAccounts, '489372')) {
      return platinumBack;
    } else if (startsWith(selectedAccounts, '489373')) {
      return goldBack;
    } else if (startsWith(selectedAccounts, '489374')) {
      return indigoBack;
    } else if (startsWith(selectedAccounts, '421469')) {
      return oramiBack;
    } else if (startsWith(selectedAccounts, '421456')) {
      return alfamartBack;
    } else {
      return backdump;
    }
  } else {
    if (platinumType || startsWith(selectedAccounts, '489372')) {
      return creditCardPlatinum;
    } else if (startsWith(accountNo, '489373')) {
      return creditCardGold;
    } else if (indigoType || startsWith(selectedAccounts, '489374')) {
      return creditCardIndigo;
    } else if (startsWith(accountNo, '421469')) {
      return creditCardOrami;
    } else if (alfaType || startsWith(selectedAccounts, '421456')) {
      return creditCardAku;
    } else {
      return creditCardSilver;
    }
  }
};

export const formatResultAmount = (value) => value ? value.replace(/[^0-9.]/g, '') : '';

export const checkMinus = (value) => value.indexOf('-') === 0;

export const emoneyAccountNumber = (accNo = '') => accNo.substring(0, 2) + ' ' + accNo.substring(2, 6) + ' ' + accNo.substring(6, 10) + ' ' + accNo.substring(10, accNo.length);

export const formatTransferPayeeType = () => {
  const payeeType = [
    {
      label: language.TRANSFER__EMONEY,
      value: 'emoney'
    },
    {
      label: language.TRANSFER__BANK_ACCOUNT,
      value: 'bank'
    }
  ];
  return payeeType;
};

export const generateEmoneyProvider = (list) => {
  const transformedAccounts = list.map((item) => {
    const display = item.companyName;
    return {
      ...item,
      display
    };
  });
  return transformedAccounts;
};

export const formatMobileNumberEmoney = (mobileNo) => {
  const mobileNumber = trim(mobileNo ? mobileNo.replace(/[^0-9]+/g, '') : '');
  if (startsWith(mobileNumber, '62')) {
    return '0' + mobileNumber.substring(2, mobileNumber.length);
  }
  return mobileNumber;
};

export const maskedEmail = (value) => {
  const cutNameEmail = indexOf(value, '@');
  const namePartOne = value.substring(0, cutNameEmail);
  const namePartTwo = value.substring(cutNameEmail, value.length);
  const nameCountPartOne = cutNameEmail / 2;
  const namePartOneMasking = namePartOne.substring(nameCountPartOne, cutNameEmail);
  const namePartOneNonMasking = namePartOne.substring(0, nameCountPartOne);
  const maskingEmail = namePartOneMasking.replace(/[a-zA-Z0-9]/g, '*');
  const finalEmailMasking = namePartOneNonMasking + maskingEmail + namePartTwo;
  return finalEmailMasking;
};

export const formatMobileNumberEmoneyRegistration = (mobileNo) => {
  const mobileNumber = trim(mobileNo ? mobileNo.replace(/[^0-9]+/g, '') : '');
  if (startsWith(mobileNumber, '0')) {
    return '62' + mobileNumber.substring(1, mobileNumber.length);
  }
  return mobileNumber;
};

export const formatFieldNoSpecialChar = (value) => value ? value.replace(/[^a-zA-Z ]+/g, '') : '';

// QR GPN Payment ------------

export const tlvParser = (data, last) => {
  const tag = data.slice(0, 2);
  const leng = data.slice(2, 4);
  let lastLeng = (4 + parseInt(leng.replace(/^0+/, '')));
  const val = data.slice(4, lastLeng);
  lastLeng = parseInt(last + lastLeng);

  const origin = `${tag}${leng}${val}`;
  const length = (origin.length) - 4;

  return {'tag': tag, 'val': val, 'length': length, 'lastLeng': lastLeng, 'origin': origin};
};

export const crcRes = (crc) => {
  let resCrc = crc;
  if ((crc.length) === 3) {
    resCrc = `0${resCrc}`;
  } else if ((crc.length) === 2) {
    resCrc = `00${resCrc}`;
  } else if ((crc.length) === 1) {
    resCrc = `000${resCrc}`;
  }
  return upperCase(resCrc);
};

export const generateBankList = (accounts, check, listBank) => {
  if (isEmpty(accounts)) {
    const dataErr = [{
      display: language.SELECT_MERCHANT__PLACEHOLDER
    }];
    return dataErr;
  } else {
    let name = '';
    let bankList = {};
    let tag = '';
    let newObj = {};
    const bankLeng = [
      '26', '27', '28', '29', '30', '31', '32', '33', '34', '35',
      '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'
    ];
    bankLeng.map((bl) => {
      tag = `${bl}.01`;
      name = getBankName(listBank, result(accounts, tag, '').substring(5, 8));
      newObj[bl] = {'bankId': result(accounts, tag, '').substring(5, 8), 'bankName': name.length > 0 ? result(name[0], 'bankName') : '', 'val': result(accounts, tag, '')};
      result(accounts, tag, '') !== '' ?
        bankList =  {
          ...bankList, newObj
        } : '';
    });
    bankList = result(bankList, 'newObj', {});
    let transformedAccounts = {};
    let filteredAccount = {};
    filteredAccount = filter(bankList, (bnk) => bnk.bankId !== check);
    transformedAccounts = filteredAccount.map((bnk) => {
      let display = null;
      if (bnk.bankId) {
        display = `${bnk.bankName || '--'}`;
      }
      return {
        ...bnk,
        display
      };
    });
    return transformedAccounts;
  }
};

export const getBankName = (listBank, bankCode) => filter(listBank, (ls) => ls.bankCode === bankCode);

export function chewTag (tlvString, parentTag) {
  let result = {};
  result['QR-TLV'] = tlvString;
  while (tlvString.length >= 4) {
    const tag = tlvString.substr(0, 2);
    const len = Number(tlvString.substr(2, 2));
    if ((isNaN(Number(tag)) || isNaN(len)) || (Number(tag) > 99 || Number(tag < 0)) || (len < 0 || len > 99)) {
      result = {};
      break;
    }
    result[tag] = tlvString.substr(4, len);
    if (parentTag === undefined) {
      const ntag = Number(tag);
      if ((ntag > 25 && ntag < 52) || ntag === 62) {
        result[`${tag}-TLV`] = result[tag];
        result[tag] = chewTag(result[`${tag}-TLV`], tag);
      }
    }
    tlvString = tlvString.substr(len + 4);
  }
  return result;
}


export function chewTagTcico (tlvString, parentTag) {
  let result = {};
  result['QR-TLV'] = tlvString;
  while (tlvString.length >= 4) {
    const tag = tlvString.substr(0, 2);
    const len = Number(tlvString.substr(2, 2));
    if ((isNaN(Number(tag)) || isNaN(len)) || (Number(tag) > 99 || Number(tag < 0)) || (len < 0 || len > 99)) {
      return result;
    }
    result[tag] = tlvString.substr(4, len);
    if (parentTag === undefined) {
      const ntag = Number(tag);
      if ((ntag > 25 && ntag < 52) || ntag === 62) {
        result[`${tag}-TLV`] = result[tag];
        result[tag] = chewTagTcico(result[`${tag}-TLV`], tag);
      }
    }
    tlvString = tlvString.substr(len + 4);
  }
  return result;
}

export const parseTLV = (jsonVar) => {
  const res = chewTag(jsonVar);
  return JSON.stringify(res, undefined, 2);
};

export const parseTLVTcico = (jsonVar) => {
  const res = chewTagTcico(jsonVar);
  return JSON.stringify(res, undefined, 2);
};

export const parseTLVaditional = (jsonVar) => {
  const res = chewTagAditional(jsonVar);
  return JSON.stringify(res, undefined, 2);
};

export function chewTagAditional (tlvString) {
  let result = {};
  result['additional_data__private'] = tlvString;
  while (tlvString.length >= 4) {
    const tag = tlvString.substr(0, 2);
    const len = Number(tlvString.substr(2, 2));
    result[tag] = tlvString.substr(4, len);
    const ntag = Number(tag);
    if ((ntag > 25 && ntag < 52) || ntag === 62) {
      result[`${tag}-TLV`] = result[tag];
      result[tag] = chewTagAditional(result[`${tag}-TLV`], tag);
    }
  }
  return result;
}

export const isValidCrc = (tlv) => {
  const tlvLeng = result(tlv, 'data', {}).length;
  const is63 = result(tlv, 'data', {}).substring((tlvLeng - 8), (tlvLeng - 6)); // check 63 ada atau tidak
  const crc = (result(tlv, 'data', {}).substring((tlvLeng - 4), tlvLeng)).toUpperCase(); // this crc value
  const forCrcCheck = result(tlv, 'data', {}).substring(0, (tlvLeng - 4));
  const checkCrc = (crcRes(crc16ccitt((forCrcCheck)).toString(16))).toUpperCase(); // this crc value
  return {'is63Valid': (is63 === '63'), 'isValidCrc': (crc === checkCrc), 'crc': crc, 'crcRes': checkCrc};
};

export const validateTags = (tagFields) => {
  const tag00 = result(tagFields, '00', '') === '01' ? '01' : 'falsefalse'; // The Payload Format Indicator shall contain a value of "01". All other values are RFU.
  // const tag2601 = result(tagFields, '26.01', 'falsefalse'); // Merchant PAN
  const tag59 = result(tagFields, '59', 'falsefalse'); // Merchant Name

  const validate = [
    tag00,
    // tag2601,
    tag59,
  ];

  const isValid = validate.indexOf('falsefalse');

  return isValid;
};

export const generateLuhn = (luhnNumber) => {
  const luhnRes = luhn.generate(luhnNumber);
  return luhnRes;
};

export const makeTlv = (tlv) => {
  const tlvLeng = tlv.length;
  const is63 = tlv;
  let res1 = '';
  let res = '';
  let resCrc = '';
  if (is63 === '63') {
    res1 = tlv.substring(0, (tlvLeng - 4));
    resCrc = crcRes(crc16ccitt(res1).toString(16));
    res = `${res1}${resCrc}`;
  } else {
    res1 = `${tlv}6304`;
    resCrc = crcRes(crc16ccitt(res1).toString(16));
    res = `${res1}${resCrc}`;
  }

  return res;
};

export const toTLVFormat = (val) => `"${val}"|`;

export const getTransferPossibleShariaAccounts = (accounts = [], transType) => {
  const regexTransType = new RegExp(transType, 'i');
  const isPossibleAccount = (account) => result(account, 'currency', '').toUpperCase() === 'IDR' && regexTransType.test(result(account, 'allowFlag', '').toLowerCase());
  const filteredAcc = accounts.filter(isPossibleAccount);
  const emoneyAccount = find(accounts, {accountType: 'emoneyAccount'}) || {};
  const groupedAccounts = groupBy(filteredAcc, (account) => (result(account, 'accountType', '').toLowerCase()));
  const saving = result(groupedAccounts, 'savingaccount', {});
  const groupedSya = groupBy(saving, (account) => checkShariaAccount(account));
  const groupedSyaria = result(groupedSya, 'false', []);
  const currentAccounts = result(groupedAccounts, 'currentaccount', []);
  if (isEmpty(emoneyAccount)) {
    return [...groupedSyaria, ...currentAccounts];
  } else {
    return [emoneyAccount, ...groupedSyaria, ...currentAccounts];
  }
};

export const getFormName = (code) => {
  let formName = '';
  switch (code) {
  case '0~1': {
    formName = 'ktpImage';
    break;
  }
  case '0~2': {
    formName = 'CCForm1';
    break;
  }
  case '0~3': {
    formName = 'CCForm2';
    break;
  }
  case '0~4': {
    formName = 'CCForm2';
    break;
  }
  case '0~5': {
    formName = 'CCForm3';
    break;
  }
  case '1~1': {
    formName = 'CCForm4';
    break;
  }
  case '1~2': {
    formName = 'CCForm5';
    break;
  }
  case '2~1': {
    formName = 'CCForm6';
    break;
  }
  case '2~2': {
    formName = 'CCForm7';
    break;
  }
  case '2~3': {
    formName = 'npwpImage';
    break;
  }
  case '2~4': {
    formName = 'CCForm8';
    break;
  }
  case '2~5': {
    formName = 'CCForm9';
    break;
  }
  case '2~6': {
    formName = 'cardDelivery';
    break;
  }
  default:
    break;
  }
  return formName;
};

export const getSavingFormName = (code) => {
  let formName = '';
  switch (code) {
  case '0~1': {
    formName = 'ktpImage';
    break;
  }
  case '0~2': {
    formName = 'SavingForm1';
    break;
  }
  case '0~3': {
    formName = 'SavingForm2';
    break;
  }
  case '0~4': {
    formName = 'SavingForm2';
    break;
  }
  case '0~5': {
    formName = 'SavingForm3';
    break;
  }
  case '1~1': {
    formName = 'SavingForm4';
    break;
  }
  case '1~2': {
    formName = 'SavingForm5';
    break;
  }
  case '2~2': {
    formName = 'SavingForm7';
    break;
  }
  case '2~3': {
    formName = 'npwpImage';
    break;
  }
  default:
    break;
  }
  return formName;
};

export const getFieldName = (formData) => {
  let fieldName = '';
  if (formData.code === '0~1~1') {
    fieldName = 'ktpImage';
  } else if (formData.code === '0~2~1') {
    fieldName = 'ktpId';
  } else if (formData.code === '0~2~2') {
    fieldName = 'maritalStatus';
  } else if (formData.code === '0~2~3') {
    fieldName = 'birthDate';
  } else if (formData.code === '0~2~4') {
    fieldName = 'mothersMaiden';
  } else if (formData.code === '0~2~5') {
    fieldName = 'ktpId2';
  } else if (formData.code === '0~2~6') {
    fieldName = 'maritalStatus2';
  } else if (formData.code === '0~2~7') {
    fieldName = 'birthDate2';
  } else if (formData.code === '0~2~8') {
    fieldName = 'mothersMaiden2';
  } else if (formData.code === '0~3~1') {
    fieldName = 'country2';
  } else if (formData.code === '0~3~2') {
    fieldName = 'province2';
  } else if (formData.code === '0~3~3') {
    fieldName = 'city2';
  } else if (formData.code === '0~3~4') {
    fieldName = 'district2';
  } else if (formData.code === '0~3~5') {
    fieldName = 'subDistrict2';
  } else if (formData.code === '0~3~6') {
    fieldName = 'postalCode2';
  } else if (formData.code === '0~3~7') {
    fieldName = 'rtRw2';
  } else if (formData.code === '0~3~8') {
    fieldName = 'streetAddress2';
  } else if (formData.code === '0~4~1') {
    fieldName = 'country';
  } else if (formData.code === '0~4~2') {
    fieldName = 'province';
  } else if (formData.code === '0~4~3') {
    fieldName = 'city';
  } else if (formData.code === '0~4~4') {
    fieldName = 'district';
  } else if (formData.code === '0~4~5') {
    fieldName = 'subDistrict';
  } else if (formData.code === '0~4~6') {
    fieldName = 'postalCode';
  } else if (formData.code === '0~4~7') {
    fieldName = 'rtRw';
  } else if (formData.code === '0~4~8') {
    fieldName = 'streetAddress';
  } else if (formData.code === '0~5~1') {
    fieldName = 'work';
  } else if (formData.code === '0~5~2') {
    fieldName = 'monthlyIncome';
  } else if (formData.code === '0~5~3') {
    fieldName = 'sourceOfFund';
  } else if (formData.code === '1~1~1') {
    fieldName = 'workTitle';
  } else if (formData.code === '1~1~2') {
    fieldName = 'workPosition';
  } else if (formData.code === '1~1~3') {
    fieldName = 'industry';
  } else if (formData.code === '1~1~4') {
    fieldName = 'companyName';
  } else if (formData.code === '1~1~5') {
    fieldName = 'companyAddress';
  } else if (formData.code === '1~1~6') {
    fieldName = 'companyPhoneNumber';
  } else if (formData.code === '1~1~7') {
    fieldName = 'companyCountry';
  } else if (formData.code === '1~1~8') {
    fieldName = 'companyProvince';
  } else if (formData.code === '1~1~9') {
    fieldName = 'companyCity';
  } else if (formData.code === '1~1~10') {
    fieldName = 'companyDistrict';
  } else if (formData.code === '1~1~11') {
    fieldName = 'companySubDistrict';
  } else if (formData.code === '1~1~12') {
    fieldName = 'companyPostalCode';
  } else if (formData.code === '1~1~13') {
    fieldName = 'companyRtRw';
  } else if (formData.code === '1~2~1') {
    fieldName = 'lastEducation';
  } else if (formData.code === '1~2~2') {
    fieldName = 'purposeOfOpening';
  } else if (formData.code === '1~2~3') {
    fieldName = 'numberOfDebit';
  } else if (formData.code === '1~2~4') {
    fieldName = 'debitPerMonth';
  } else if (formData.code === '1~2~5') {
    fieldName = 'numberOfCredit';
  } else if (formData.code === '1~2~6') {
    fieldName = 'creditPerMonth';
  } else if (formData.code === '1~2~7') {
    fieldName = 'numberOfDependant';
  } else if (formData.code === '2~1~1') {
    fieldName = 'cardName';
  } else if (formData.code === '2~1~2') {
    fieldName = 'creditLimit';
  } else if (formData.code === '2~1~3') {
    fieldName = 'currentAddressStatus';
  } else if (formData.code === '2~1~4') {
    fieldName = 'currentAddressSince';
  } else if (formData.code === '2~1~5') {
    fieldName = 'creditTotal';
  } else if (formData.code === '2~1~6') {
    fieldName = 'sourceOfFundPayment';
  } else if (formData.code === '2~1~7') {
    fieldName = 'paymentType';
  } else if (formData.code === '2~2~1') {
    fieldName = 'npwpNumber';
  } else if (formData.code === '2~2~2') {
    fieldName = 'reasonNoNPWP';
  } else if (formData.code === '2~3~1') {
    fieldName = 'npwpImage';
  } else if (formData.code === '2~4~1') {
    fieldName = 'workStatus';
  } else if (formData.code === '2~4~2') {
    fieldName = 'startWork';
  } else if (formData.code === '2~4~3') {
    fieldName = 'latestPayslipImage';
  } else if (formData.code === '2~4~4') {
    fieldName = 'startBusiness';
  } else if (formData.code === '2~4~5') {
    fieldName = 'savingStatement1';
  } else if (formData.code === '2~4~6') {
    fieldName = 'savingStatement2';
  } else if (formData.code === '2~4~7') {
    fieldName = 'savingStatement3';
  } else if (formData.code === '2~5~1') {
    fieldName = 'emergencyFullName';
  } else if (formData.code === '2~5~2') {
    fieldName = 'emergencyRelationship';
  } else if (formData.code === '2~5~3') {
    fieldName = 'emergencyPhone';
  } else if (formData.code === '2~5~4') {
    fieldName = 'emergencyCountry';
  } else if (formData.code === '2~5~5') {
    fieldName = 'emergencyProvince';
  } else if (formData.code === '2~5~6') {
    fieldName = 'emergencyCity';
  } else if (formData.code === '2~5~7') {
    fieldName = 'emergencyDistrict';
  } else if (formData.code === '2~5~8') {
    fieldName = 'emergencySubDistrict';
  } else if (formData.code === '2~5~9') {
    fieldName = 'emergencyPostalCode';
  } else if (formData.code === '2~5~10') {
    fieldName = 'emergencyRtRw';
  } else if (formData.code === '2~5~11') {
    fieldName = 'emergencyStreetAddress';
  } else if (formData.code === '2~6~1') {
    fieldName = 'cardDelivery';
  }
  return fieldName;
};

export const getTitleName = (key) => {
  let title = '';
  if (key === 'country') {
    title = language.EMONEY__COUNTRY;
  } else if (key === 'province') {
    title = language.EMONEY__PROVINCE;
  } else if (key === 'city') {
    title = language.EMONEY__CITY;
  } else if (key === 'district') {
    title = language.EMONEY__DISTRICT;
  } else if (key === 'subDistrict') {
    title = language.EMONEY__SUB_DISTRICT;
  } else if (key === 'postalCode') {
    title = language.EMONEY__POSTAL_CODE;
  } else if (key === 'rtrw') {
    title = language.CHECKPOINT_RTRW;
  } else if (key === 'streetAddress') {
    title = language.CREDITCARD__STREET_ADDRESS;
  } else if (key === 'work') {
    title = language.CHECKPOINT_WORK;
  } else if (key === 'monthlyIncome') {
    title = language.CREDITCARD__MONTHLY_INCOME;
  } else if (key === 'sourceOfFund') {
    title = language.CREDITCARD__SOURCE_OF_FUND;
  } else if (key === 'workTitle') {
    title = language.CREDITCARD__WORK_TITLE;
  } else if (key === 'workPosition') {
    title = language.CREDITCARD__WORK_POSITION;
  } else if (key === 'industry') {
    title = language.CREDITCARD__INDUSTRY;
  } else if (key === 'companyName') {
    title = language.CREDITCARD__COMPANY_NAME;
  } else if (key === 'companyAddress') {
    title = language.CREDITCARD__COMPANY_ADDRESS;
  } else if (key === 'companyPhoneNumber') {
    title = language.CREDITCARD__COMPANY_PHONE_NUMBER;
  } else if (key === 'companyCountry') {
    title = language.EMONEY__COUNTRY;
  } else if (key === 'companyProvince') {
    title = language.EMONEY__PROVINCE;
  } else if (key === 'companyCity') {
    title = language.EMONEY__CITY;
  } else if (key === 'companyDistrict') {
    title = language.EMONEY__DISTRICT;
  } else if (key === 'companySubDistrict') {
    title = language.EMONEY__SUB_DISTRICT;
  } else if (key === 'companyPostalCode') {
    title = language.EMONEY__POSTAL_CODE;
  } else if (key === 'companyRT') {
    title = language.EMONEY__RT;
  } else if (key === 'companyRW') {
    title = language.EMONEY__RW;
  } else if (key === 'lastEducation') {
    title = language.HINT__LAST_EDUCATION;
  } else if (key === 'purposeOfOpening') {
    title = language.CREDITCARD__PURPOSE_OF_OPENING;
  } else if (key === 'numberOfDebit') {
    title = language.CREDITCARD__NUMBER_OF_DEBIT;
  } else if (key === 'debitPerMonth') {
    title = language.CREDITCARD__DEBIT_PER_MONTH;
  } else if (key === 'numberOfCredit') {
    title = language.CREDITCARD__NUMBER_OF_CREDIT;
  } else if (key === 'creditPerMonth') {
    title = language.CREDITCARD__CREDIT_PER_MONTH;
  } else if (key === 'numberOfDependant') {
    title = language.CREDITCARD__NUMBER_OF_DEPENDANT;
  } else if (key === 'npwpNumber') {
    title = language.CREDITCARD__NPWP_NUMBER;
  } else if (key === 'reasonNoNPWP') {
    title = language.HINT__DONT_HAVE_NPWP;
  } else if (key === 'cardName') {
    title = language.CHECKPOINT_CARD_NAME;
  } else if (key === 'creditLimit') {
    title = language.CREDITCARD__CREDIT_LIMIT;
  } else if (key === 'currentAddressStatus') {
    title = language.CHECKPOINT_CURRENT_ADDRESS_STATUS;
  } else if (key === 'currentAddressSince') {
    title = language.CREDITCARD__CURRENT_ADDRESS_SINCE;
  } else if (key === 'creditTotal') {
    title = language.CHECKPOINT_TOTAL_CARDS;
  } else if (key === 'paymentType') {
    title = language.CREDITCARD__PAYMENT_TYPE;
  } else if (key === 'startBusiness') {
    title = language.CREDITCARD__START_BUSINESS;
  } else if (key === 'workStatus') {
    title = language.CREDITCARD__WORK_STATUS;
  } else if (key === 'startWork') {
    title = language.CREDITCARD__START_WORK;
  } else if (key === 'latestPayslipImage') {
    title = language.CHECKPOINT_PAYSLIP;
  } else if (key === 'startBusiness') {
    title = language.CREDITCARD__START_BUSINESS;
  } else if (key === 'savingStatement1') {
    title = language.CREDITCARD__SAVING_STATEMENT_1;
  } else if (key === 'savingStatement2') {
    title = language.CREDITCARD__SAVING_STATEMENT_2;
  } else if (key === 'savingStatement3') {
    title = language.CREDITCARD__SAVING_STATEMENT_3;
  } else if (key === 'emergencyFullName') {
    title = language.CREDITCARD__EMERGENCY_FULLNAME;
  } else if (key === 'emergencyRelationship') {
    title = language.CREDITCARD__EMERGENCY_RELATIONSHIP;
  } else if (key === 'emergencyPhone') {
    title = language.CREDITCARD__EMERGENCY_PHONE;
  } else if (key === 'emergencyCountry') {
    title = language.EMONEY__COUNTRY;
  } else if (key === 'emergencyProvince') {
    title = language.EMONEY__PROVINCE;
  } else if (key === 'emergencyCity') {
    title = language.EMONEY__CITY;
  } else if (key === 'emergencyDistrict') {
    title = language.EMONEY__DISTRICT;
  } else if (key === 'emergencySubDistrict') {
    title = language.EMONEY__SUB_DISTRICT;
  } else if (key === 'emergencyPostalCode') {
    title = language.EMONEY__POSTAL_CODE;
  } else if (key === 'emergencyRT') {
    title = language.EMONEY__RT;
  } else if (key === 'emergencyRW') {
    title = language.EMONEY__RW;
  } else if (key === 'emergencyStreetAddress') {
    title = language.CREDITCARD__STREET_ADDRESS;
  }
  return title;
};

export const maskingMobileNumber = (mobileNo) => {
  const mobileNumber = trim(mobileNo ? mobileNo.replace(/[^0-9]+/g, '') : '');
  if (startsWith(mobileNumber, '0')) {
    const cropped = mobileNumber.substring(1, mobileNumber.length);
    const masked = repeat('*', cropped.length - 4) + cropped.substring(cropped.length - 4, cropped.length);
    return masked;
  } else if (startsWith(mobileNumber, '62')) {
    const cropped = mobileNumber.substring(2, mobileNumber.length);
    const masked = repeat('*', cropped.length - 4) + cropped.substring(cropped.length - 4, cropped.length);
    return masked;
  }
  return mobileNumber;
};

// export const maskingAccountNumber = (accountNumber) => {
//   const accNo = trim(accountNumber ? accountNumber.replace(/[^0-5]+/g, '') : '');
//   if (startsWith(accNo, '0')) {
//     const cropped = accNo.substring(1, accNo.length);
//     const masked = repeat('*', cropped.length - 2) + cropped.substring(cropped.length - 2, cropped.length);
//     return masked;
//   } else if (startsWith(accNo, '')) {
//     const cropped = accNo.substring(2, accNo.length);
//     const masked = repeat('*', cropped.length - 2) + cropped.substring(cropped.length - 2, cropped.length);
//     return masked;
//   }
//   return accNo;
// };


export const generateLocationSelection = (addressForm, workingAddressForm, usingKtpData, existing) => {
  const streetAddress = result(addressForm, 'streetAddress', '') === '' ? '' : result(addressForm, 'streetAddress', '') + '\n';
  const rtrw = result(addressForm, 'rt', '') === '' || result(addressForm, 'rw', '') === '' ? '' : 'RT ' + result(addressForm, 'rt', '') + ' RW ' + result(addressForm, 'rw', '') + '\n';
  const subDistrict = result(addressForm, 'subDistrict.name', '') === '' ? '' : result(addressForm, 'subDistrict.name', '');
  const district = result(addressForm, 'district.name', '') === '' ? '' : ', ' + result(addressForm, 'district.name', '');
  const postalCode = result(addressForm, 'postalCode', '') === '' ? '' : ' ' + result(addressForm, 'postalCode', '');
  const city = result(addressForm, 'city.name', '') === '' ? '' : result(addressForm, 'city.name', '');
  const province = result(addressForm, 'province.name', '') === '' ? '' : result(addressForm, 'province.name', '')  + '\n';

  const currentAddress = streetAddress +
  rtrw +
  subDistrict + district + '\n' +
  city + postalCode + '\n' +
  province +
  'INDONESIA';

  const workAddress = result(workingAddressForm, 'companyAddress', '') === '' ? '' : result(workingAddressForm, 'companyAddress', '') + '\n';
  const workRtrw = result(workingAddressForm, 'companyRT', '') === '' || result(workingAddressForm, 'companyRW', '') === '' ? '' : 'RT ' + result(workingAddressForm, 'companyRT', '') + ' RW ' + result(workingAddressForm, 'companyRW', '') + '\n';
  const workDistrict = result(workingAddressForm, 'companyDistrict.name', '') === '' ? '' : ', ' + result(workingAddressForm, 'companyDistrict.name', '');
  const workSubDistrict = result(workingAddressForm, 'companySubDistrict.name', '') === '' ? '' : result(workingAddressForm, 'companySubDistrict.name', '');
  const workPostalCode = result(workingAddressForm, 'companyPostalCode', '') === '' ? '' : ' ' + result(workingAddressForm, 'companyPostalCode', '');
  const workCity = result(workingAddressForm, 'companyCity.name', '') === '' ? '' : result(workingAddressForm, 'companyCity.name', '');
  const workProvince = result(workingAddressForm, 'companyProvince.name', '') === '' ? '' : result(workingAddressForm, 'companyProvince.name', '')  + '\n';

  const workingAddress = workAddress +
  workRtrw +
  workSubDistrict + workDistrict + '\n' +
  workCity + workPostalCode + '\n' +
  workProvince +
  'INDONESIA';

  if (usingKtpData === 'CHECKED') {
    const radioOptions = [
      {label: language.CREDITCARD__KTP_ADDRESS},
      {label: language.CREDITCARD__WORK_ADDRESS, sublabel: isEmpty(workingAddressForm) ? '' : workingAddress}];
    return radioOptions;
  } else if (existing) {
    const radioOptions = [{label: language.CREDITCARD__CURRENT_ADDRESS, sublabel: currentAddress},
      {label: language.CREDITCARD__WORK_ADDRESS, sublabel: isEmpty(workingAddressForm) ? '' : workingAddress}];
    return radioOptions;
  } else {
    const radioOptions = [{label: language.CREDITCARD__CURRENT_ADDRESS, sublabel: currentAddress},
      {label: language.CREDITCARD__KTP_ADDRESS},
      {label: language.CREDITCARD__WORK_ADDRESS, sublabel: isEmpty(workingAddressForm) ? '' : workingAddress}];
    return radioOptions;
  }
};

export const amountRegex = (value) => value ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '';

// CGV Filter
export const getFilteredCgv = (dataCgv, tipe, code) => {
  const filteredData = filter(dataCgv, (dt) => tipe === 'cinema' ? dt.cinemaCode === code : dt.movieCode === code);
  let dataList = groupBy(filteredData, 'movieCode');
  dataList = tipe === 'cinema' ? groupBy(filteredData, 'movieCode') : groupBy(filteredData, 'cinemaCode');
  let filteredMovieList = [];
  forEach(dataList, (value, key) => {
    filteredMovieList = [...filteredMovieList, {movieCode: key, listByMovie: value, movieName: value[0].movieName, cinemaName: value[0].cinemaName}];
  });
  return filteredMovieList;
};

export const getFilteredType = (movie) => {
  const listByMovie = movie.listByMovie;
  const studioList = groupBy(listByMovie, 'movieCategoryCode');
  let filteredStudioList = [];
  forEach(studioList, (value) => {
    const movieType = value[0].movieCategoryName;
    filteredStudioList = [...filteredStudioList, {movieType, listByType: value}];
  });
  return filteredStudioList;
};

export const getFilteredStudio = (type) => {
  const listByType = type.listByType;
  const studioList = groupBy(listByType, 'studioCode');
  let filteredStudioList = [];
  forEach(studioList, (value) => {
    let timeList = '';
    value.map((value) => {
      timeList = [...timeList, {'showStartTime': value.showStartTime, 'value': value}];
    });
    const studioName = value[0].studioName;
    filteredStudioList = [...filteredStudioList, {studioName, timeList}];
  });
  return filteredStudioList;
};

export const getFilterDate = (dataCgv, date) => {
  let filteredStudioList = [];
  forEach(dataCgv, (value) => {
    filteredStudioList = [...filteredStudioList, {...value, 'listByMovie': filter(value.listByMovie, (dt) => dt.showDate === date)}];
  });

  return filteredStudioList;
};

export const generateCgvLabel = (listCgv, tipe) => {
  const CinemaList = groupBy(listCgv, tipe === 'movie' ? 'cinemaCode' : 'movieCode');
  let filteredList = [];
  forEach(CinemaList, (value) => {
    let code = tipe === 'cinema' ? value[0].movieCode : value[0].cinemaCode;
    let name = tipe === 'cinema' ? value[0].movieName : value[0].cinemaName;
    filteredList = [...filteredList, {code, name}];
  });

  const filteredCgv = filter(filteredList, (cgv) => cgv.code !== null);
  const cgvList = filteredCgv.map((cgv) => {
    const display = `${cgv.name || '--'}`;
    return {
      ...cgv,
      display
    };
  });

  return cgvList;
};

export const filterCity = (data, code) => {
  let cityList = groupBy(data, 'cityName');
  if (code) {
    cityList = filter(cityList, (ct) => ct.code === code);
  }
  let filteredList = [];
  forEach(cityList, (value) => {
    let code = value[0].cityCode;
    let name = value[0].cityName;
    filteredList = [...filteredList, {code, name}];
  });

  filteredList = sortBy(filteredList, 'name');

  return filteredList;
};

export const generateCgvCityLabel = (cityList) => {
  const filteredCity = filter(cityList, (ct) => ct.code !== null);
  const transformedAccounts = filteredCity.map((city) => {
    const display = city.name;
    return {
      ...city,
      display
    };
  });
  return transformedAccounts;
};

export const filterCityByCode = (cityList, code) => {
  let filteredCity = filter(cityList, (ct) => ct.cityName !== '');
  if ((code !== '')) {
    filteredCity = filter(cityList, (ct) => ct.cityName === code);
  }
  return filteredCity;
};

export const txTravelTittle = (selected) => {
  const tittleList = [
    {
      code: '1',
      name: 'Mr'
    },
    {
      code: '2',
      name: 'Mrs'
    },
    {
      code: '3',
      name: 'Ms'
    },
  ];
  let filteredTittle = filter(tittleList, (tl) => tl.code !== null);
  if (selected) {
    filteredTittle = filter(tittleList, (tl) => tl.code === selected);
  }
  const tittleListRes = filteredTittle.map((tittle) => {
    const display = tittle.name;
    return {
      ...tittle,
      display
    };
  });
  return tittleListRes;
};

export const transformToken = (value) => {
  const cutToken = indexOf(value, '=');
  const cutToken3D = indexOf(value, 'D');
  const finalForm = cutToken !== -1 ? value.substring(cutToken + 1, value.length) : value.substring(cutToken3D + 1, value.length);
  return finalForm;
};

export const getBrandEgift = (ItemList) => {
  const brandList = groupBy(ItemList, 'brand');
  let filteredBrandList = [];
  forEach(brandList, (value) => {
    const brandType = value[0].brand;
    filteredBrandList = [...filteredBrandList, {brandType, listByType: value}];
  });
  return filteredBrandList;
};

export const openAccountCoreData = (coreData) => {
  const data = {
    name: coreData,
    code: '1000'
  };
  return data;
};

export const formatPayeeName = (originalName) => (name) => {
  if (startsWith(name, originalName)) {
    return name;
  } else {
    return originalName;
  }
};

export const changeFormByCode = (pageName, formCode, npwpNumber, npwpForm) => {
  const code = formCode.substring(0, 2);
  let newPageName = '';
  if (code === 'CC') {
    if (pageName.includes('Saving')) {
      if (pageName === 'SavingAccountForm7' || pageName === 'SavingNPWPCamera' || pageName === 'SavingAccountFinalize') {
        newPageName = 'CreditCardForm6';
      } else {
        newPageName = pageName.includes('SavingAccount') ? pageName.replace('SavingAccount', 'CreditCard') : pageName.replace('Saving', 'CreditCard');
      }
    } else {
      newPageName = pageName;
    }
  } else {
    if (pageName.includes('CreditCard')) {
      if (pageName === 'CreditCardForm6' || pageName === 'CreditCardForm7' ||
      pageName === 'CreditCardNPWPCamera' || pageName === 'CreditCardForm8' || pageName === 'CreditCardForm9' || pageName === 'CreditCardDelivery ' || pageName === 'CreditCardFinalize') {
        if (npwpNumber !== '' && npwpForm === '') {
          newPageName = 'SavingAccountForm7';
        } else {
          newPageName = 'SavingAccountFinalize';
        }
      } else {
        newPageName = pageName.replace('CreditCard', 'SavingAccount');
      }
    } else {
      if (npwpNumber !== '' && npwpForm === '') {
        newPageName = 'SavingAccountForm7';
      } else {
        newPageName = pageName;
      }
    }
  }
  return newPageName;
};

export const transformTokenIos = (value) => {
  const cutToken = indexOf(value, '&');
  const finalForm = cutToken !== -1 ? value.substring(0, cutToken) : value;
  return finalForm;
};

export const generatePaymentRoute = (biller) => {
  const billerType = biller.billerPreferences.billerType;
  let pageConfig = '';
  switch (billerType) {
  case '1': {
    pageConfig = {
      route: 'BillerTypeOne',
      formName: 'BillerTypeOneIndexForm'
    };
    break;
  }
  case '2': {
    pageConfig = {
      route: 'BillerTypeTwo',
      formName: 'BillerTypeTwoIndexForm'
    };
    break;
  }
  case '3': {
    pageConfig = {
      route: 'BillerTypeThree',
      formName: 'BillerTypeThreeIndexForm'
    };
    break;
  }
  case '6': {
    pageConfig = {
      route: 'BillerTypeSix',
      formName: 'BillerTypeSixIndexForm'
    };
    break;
  }
  case '7': {
    pageConfig = {
      route: 'BillerTypeSeven',
      formName: 'BillerTypeSevenIndexForm'
    };
    break;
  }
  case '8': {
    pageConfig = {
      route: 'BillerTypeEight',
      formName: 'BillerTypeEightIndexForm'
    };
    break;
  }
  case '9': {
    pageConfig = {
      route: 'BillerTypeNine',
      formName: 'BillerTypeNineIndexForm'
    };
    break;
  }
  case '10': {
    pageConfig = {
      route: 'BillerTypeTen',
      formName: 'BillerTypeTenIndexForm'
    };
    break;
  }
  default:
    break;
  }
  return pageConfig;
};

export const cutOffDisplayStr = (str, charLimit = 20) => {
  const retStr = (str) ? str : '';
  const dot = '...';
  return (retStr.length > charLimit) ? (retStr.substring(0, charLimit - dot.length) + dot) : retStr;
};

export const isEmptyOrNull = (value) => typeof (value) === 'object' ? isEmpty(value) : !(value);

// usage: getVarName({var});
export const getVarName = (str) => Object.keys(str)[0];

export const checkContact = (data) => {
  let ret = false;
  forEach(data, (d) => {
    ret = ret ? true : result(d, 'formValues.setAsContact', false);
  });
  return ret;
};

export const getDataPassanger = (data, state) => {
  let passeger = [];
  const dataAdult = result(data, '1.formValues', {});
  forEach(data, (d, k) => {
    const tipe = String(result(d, 'type', ''));
    const type = tipe === 'adult' ? 1 : tipe === 'child' ? 2 : tipe === 'afilant' ? 3 : 0;
    const listCountry = result(state, 'txTravelCountryIso.data.result', []);
    const nationality = result(getNationality(listCountry, result(d, 'formValues.nationality', '')), 'code', '');
    const coi = result(getNationality(listCountry, result(d, 'formValues.coi', '')), 'code', '');
    if (tipe !== 'contact') {
      passeger = [
        ...passeger,
        {
          'Index': String(k),
          'Type': String(type),
          'Title': String(result(d, 'formValues.tittle.name', '')),
          'FirstName': String(result(d, 'formValues.firstName', '')),
          'LastName': String(result(d, 'formValues.lastName', '')),
          'BirthDate': String(moment(result(d, 'formValues.birthDate', '')).format('YYYY-MM-DD')),
          'Nationality': String(nationality),
          'AdultAssoc': null,
          'Email': String(tipe === 'adult' ? result(d, 'formValues.email', '') : result(dataAdult, 'email', '')),
          'HomePhone': String(tipe === 'adult' ? result(d, 'formValues.homePhone', '') : result(dataAdult, 'homePhone', '')),
          'MobilePhone': String(tipe === 'adult' ? result(d, 'formValues.phone', '') : result(dataAdult, 'phone', '')),
          'OtherPhone': null,
          'IdNumber': String(tipe === 'adult' ? result(d, 'formValues.idNumber', '') : result(dataAdult, 'idNumber', '')),
          'IdExpiry': String(moment(tipe === 'adult' ? result(d, 'formValues.IdExpiry', '') : result(dataAdult, 'IdExpiry', '')).format('YYYY-MM-DD')),
          'PassportExpire': result(d, 'formValues.expiryPassport', '') ? String(moment(result(d, 'formValues.expiryPassport', '')).format('YYYY-MM-DD')) : null,
          'PassportNumber': String(result(d, 'formValues.passportNumber', '')),
          'PassportOrigin': String(coi),
        }
      ];
    }
  });
  return passeger;
};

export const diffTime = (start = '', end = '') => {
  start = start.split(':');
  end = end.split(':');
  const startDate = new Date(0, 0, 0, start[0], start[1], 0);
  const endDate = new Date(0, 0, 0, end[0], end[1], 0);
  let diff = endDate.getTime() - startDate.getTime();
  let hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diff / 1000 / 60);

  // If using time pickers with 24 hours format, add the below line get exact hours
  if (hours < 0)
    hours = hours + 24;

  if (hours > 0) {
    return (hours <= 9 ? '' : '') + hours + ' hr ' + (minutes <= 9 ? '0' : '') + minutes + ' m';
  } else {
    return (minutes <= 9 ? '0' : '') + minutes + ' m';
  }
};

export const changeDataTravel = (data) => {
  let index = 1;
  let ret = [];
  forEach(data, (d, k) => {
    let x = 1;
    if (k === 'Adult' || k === 'Child' || k === 'Infant') {
      while (x <= d) {
        ret = [...ret, {
          'index': index,
          'type': lowerCase(k)
        }];
        x = x + 1;
        index = index + 1;
      }
      x = 0;
    }
  });
  ret = [...ret, {
    'index': '99',
    'type': 'contact'
  }];
  return ret;
};


export const getDataSegment = (data, type) => {
  let segments = [];
  let dataSegment = result(data, 'IsConnecting', false) ? result(data, 'ConnectingFlights', {}) : [data];
  forEach(dataSegment, (d, k) => {
    const id = String(result(d, 'ClassObjects[0].Id', ''));
    const Code = String(result(d, 'ClassObjects[0].Code', ''));
    const FlightId = String(result(d, 'ClassObjects[0].FlightId', ''));
    segments = [
      ...segments,
      {
        'ClassId': id,
        'Airline': String(result(d, 'Airline', '')),
        'FlightNumber': String(result(d, 'Number', '')),
        'Origin': String(result(d, 'Origin', '')),
        'DepartDate': String(result(d, 'DepartDate', '')),
        'DepartTime': String(result(d, 'DepartTime', '')),
        'Destination': String(result(d, 'Destination', '')),
        'ArriveDate': String(result(d, 'ArriveDate', '')),
        'ArriveTime': String(result(d, 'ArriveTime', '')),
        'ClassCode': Code,
        'FlightId': FlightId,
        'Num': type === 'departure' ? String('0') :  String('1'),
        'Seq': String(k),
      }
    ];
  });
  return segments;
};

export const getFarePayload = (dataFare, passenger) => {

  const Adult = result(passenger, 'Adult', '0');
  const Child = result(passenger, 'Child', '0');
  const Infant = result(passenger, 'Infant', '0');

  const Airline = String(result(dataFare, 'Airline', 0));
  const isConnecting = result(dataFare, 'IsConnecting', false);
  const isMultiClass = result(dataFare, 'IsMultiClass', false);
  const flightObject = result(dataFare, 'ClassObjects', []);
  const connectedObject = result(dataFare, 'ConnectingFlights', []);

  let FlightId = '';
  let ClassId = '';
  let Fare = 0;
  let Tax = 0;
  let flightIdArray = [];
  let classIdArray = [];

  let payload = {};
  if (isConnecting === false && isMultiClass === false) {
    FlightId = result(flightObject[0], 'FlightId', '');
    ClassId = result(flightObject[0], 'Id', '');
    Fare = String(result(flightObject[0], 'Fare', ''));
    Tax = String(result(flightObject[0], 'Tax', '0'));
  } else if (isConnecting ===  true && isMultiClass === true) {
    forEach(connectedObject, function (value) {
      const ObjectClass = result(value, 'ClassObjects', []);
      forEach(ObjectClass, function (object) {
        flightIdArray.push(result(object, 'FlightId', ''));
        classIdArray.push(result(object, 'Id', ''));
        Fare = Fare + result(object, 'Fare', 0);
        Tax = Tax + result(object, 'Tax', 0);
      });
    });
    FlightId = flightIdArray.join('#');
    ClassId = classIdArray.join('#');
    Fare = String(Fare);
    Tax = String(Tax);
  } else if (isConnecting === true  && isMultiClass === false) {
    FlightId = result(flightObject[0], 'FlightId', '');
    ClassId = result(flightObject[0], 'Id', '');
    Fare = String(result(flightObject[0], 'Fare', ''));
    Tax = String(result(flightObject[0], 'Tax', '0'));
  }

  payload = {Airline, Adult, Child, Infant, ClassId, FlightId, Fare, Tax};
  return payload;
};

export const generateFlightImage = (flightName) => {
  if (flightName === 'Sriwijaya') {
    return sriwijayaAir;
  } else if (flightName === 'Lion') {
    return lionAir;
  } else if (flightName === 'Citilink') {
    return citilink;
  } else if (flightName === 'AirAsia') {
    return airAsia;
  } else if (flightName === 'Wings') {
    return wingsAir;
  } else if (flightName === 'Garuda') {
    return garuda;
  } else if (flightName === 'Jetstar') {
    return jetstar;
  } else if (flightName === 'Kalstar') {
    return kalstar;
  } else if (flightName === 'NAM') {
    return jnam;
  } else if (flightName === 'Batik') {
    return batikAir;
  } else if (flightName === 'Multi') {
    return multiFlight;
  } else if (flightName === 'Malindo') {
    return malindoAir;
  }
};

// Filter for passeger estore
export const filterObjectsPasseger = (listOfObjects = [], searchString = '') => {
  const lowerCaseSearchString = lowerCase(searchString);
  let valueList = {};
  if (searchString) {
    return filter(listOfObjects, (item) => {
      valueList = {...valueList, firstName: item.firstName};
      return !!find(valueList, (value) => (lowerCase(value).includes(lowerCaseSearchString)));
    });
  }
  return listOfObjects;
};

export const filterSearchContact = (listOfObjects = [], searchString = '') => {
  const lowerCaseSearchString = lowerCase(searchString);
  let valueList = {};
  if (searchString) {
    return filter(listOfObjects, (item) => {
      const displayName = result(item, 'displayName', '');
      const phoneNumber = result(item, 'phoneNumbers.0.number', '');
      valueList = {...valueList, displayName, phoneNumber};
      return !!find(valueList, (value) => (lowerCase(value).includes(lowerCaseSearchString)));
    });
  }
  return listOfObjects;
};

export const getNationality = (listCountry, name) => find(listCountry, (val) => (lowerCase(val.name).includes(lowerCase(name))));

// for complex string params
export const getPAramslink = (dataRaw) => {
  let index = 0;
  let result = [];
  let source = '';
  const cutToken = indexOf(dataRaw, '|');
  const cutToken3D = indexOf(dataRaw, 'D');
  const cutTokenpercent = indexOf(dataRaw, '%');
  const finalToken =  cutTokenpercent !== -1 ? dataRaw.substring(cutTokenpercent + 3, dataRaw.length) : cutToken !== -1 ? dataRaw.substring(cutToken + 1, dataRaw.length) : dataRaw.substring(cutToken3D + 1, dataRaw.length);
  while (index !== -1) {
    const cutTokenB = source !== '' ? indexOf(source, '|') : indexOf(finalToken, '|');
    const cutToken3Dform = source !== '' ? indexOf(source, 'C') : indexOf(finalToken, 'C');
    const finalForm = source !== '' && cutTokenB !== -1 ? source.substring(0, cutTokenB) : cutTokenB !== -1 ? finalToken.substring(0, cutTokenB) : source !== '' ? source : finalToken;
    const cutToken3DformToken = cutTokenB !== -1 ? finalForm : source !== '' && cutToken3Dform !== -1 ? source.substring(0, cutToken3Dform - 2) : cutToken3Dform !== -1 ? finalToken.substring(0, cutToken3Dform - 2) : source !== '' ? source : finalToken;
    const lefover = source !== '' && cutTokenB !== -1 ? source.substring(cutTokenB + 1, source.length) : cutTokenB !== -1 ? finalToken.substring(cutTokenB + 1, finalToken.length) : source !== '' ? finalToken : finalForm;
    const lefoverFinal = cutTokenB !== -1 ? lefover : source !== '' && cutToken3Dform !== -1 ? source.substring(cutToken3Dform + 1, source.length) : cutToken3Dform !== -1 ? finalToken.substring(cutToken3Dform + 1, finalToken.length) : source !== '' ? finalToken : finalForm;
    index = cutTokenB !== -1 ? cutTokenB : cutToken3Dform;
    source = transformTokenValue(lefoverFinal);
    const valueRaw = transformTokenValue(cutToken3DformToken);
    const subValue = indexOf(valueRaw, '=');
    const keyId = valueRaw.substring(0, subValue);
    const valueId = valueRaw.substring(subValue + 1,  valueRaw.length);
    result = [...result, {keyId, valueId}];
  }
  return result;
};

export const transformTokenValue = (value) => {
  const cutToken = indexOf(value, '%');
  const finalForm = cutToken !== -1 ? value.substring(0, cutToken) + '=' + value.substring(cutToken + 3, value.length) : value;
  return finalForm;
};

// CAUTION: return value in the form of array
export const recursiveMap = (list, view, keyToFind = '', customKey = {}, customView = {}) => ((typeof (list) !== 'object') ? view(list) : map(list, (object, key) => {
  const retVal = Object.values(customKey).includes(key) ? recursiveMap(object, customView[key], '', customKey, customView) :
    typeof (object) === 'object' ? (keyToFind && object[keyToFind]) ? view(object[keyToFind], key) : recursiveMap(object, view, keyToFind, customKey, customView) : view(object, key);
  return retVal;
}));

// Generate Code

export const filterBymerchantType = (merchantList, type) => {
  let filteredCity = [];
  forEach(merchantList, (value) => {
    const ml = result(value, 'transactionAllowType', []);
    if (ml.indexOf(parseInt(type)) >= -1) {
      filteredCity = [...filteredCity, value];
    }
  });
  return filteredCity;
};

export const yearToDate = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  let day = 0;
  day = String(Math.floor(diff / oneDay));
  day = addZero(day, 3);
  return day;
};

export const addZero = (val, max) => {
  let leng = parseInt(String(val).length);
  let zero = '';
  while (leng < parseInt(max)) {
    zero = zero + '0';
    leng++;
  }
  const res = zero + val;
  return String(res);
};

export const encodeData = (data, serverToken, clientToken) => {
  const dataLength = data.length;
  const lengData2 = dataLength - 6;
  const data1 = String(data).substring(0, lengData2);
  const data2 = String(data).substring(lengData2, dataLength);
  const encode1 = encodeGeneratedCode(data1);
  let encode2 = encodeGeneratedCode(data2);
  encode2 = String(encode2).length < 4 ? 'P' + encode2 : encode2;
  const code = encode1 + encode2;
  const len = encodeGeneratedCode(code.length);
  const sign = mine(code, serverToken, clientToken);

  return String(len + code +  sign);
};

export const encodeGeneratedCode = (number) => {
  const chiper = 'PH7Q3GI6UM4EAY5LNOF2DX8J1KRC9VST0ZWB';
  const base = chiper.length;
  let b = [20];
  let x = number;
  let r = 0;
  let i = 0;
  let c = '';

  do {
    r = parseInt((x % base));
    x = parseInt(x / base);
    b[i] = parseInt(r);
    i++;
  } while ((x > 0) && (b.length < 20));

  let j = 0;
  let reverseLoop = (b.length - 1);

  while (j <= reverseLoop) {
    c = c + convert(b[reverseLoop]);
    reverseLoop--;
  }

  return String(c);
};

export const mine = (data, serverToken, clientToken) => {
  let nonce = -1;
  let enc = null;
  let sha = null;
  do {
    nonce++;
    enc = SHA256(data + serverToken + clientToken + nonce);
    sha = enc;
  } while (!String(sha).startsWith('0000'));
  let sign  = encodeGeneratedCode(nonce);
  return sign;
};

export const convert = (b) => {
  const chiper = 'PH7Q3GI6UM4EAY5LNOF2DX8J1KRC9VST0ZWB';
  if (b <= 36) return chiper.charAt(b);
  return chiper.charAt(0);
};

export const copyToCLipboard = (text) => {
  Toast.show(language.GENERIC__COPIED, Toast.LONG);
  Clipboard.setString(text);
};

export const generateQRLabel = (netWorthList) => {
  let filteredList = [];
  forEach(netWorthList, (value, k) => {
    filteredList = [...filteredList, {code: k, name: value}];
  });
  return filteredList;
};

export const checkIfEmpty = (data, mapping, specialCondition = noop) => {
  let isEmpty = {};
  map(data, (obj, key) => isEmpty = {...isEmpty, [`${result(mapping, key, key)}`]: isEmptyOrNull(specialCondition(obj, key) ? '' : obj)});
  return isEmpty;
};


export const tokenPaymentTransform = (value) => {
  const cutToken = indexOf(value, '=');
  const cutToken3D = indexOf(value, 'D');
  const finalForm = cutToken !== -1 ? value.substring(cutToken + 1, value.length) : value.substring(cutToken3D + 1, value.length);
  return finalForm;
};
export const getCurrentRoute = (navigationState, routeName) => {
  if (!navigationState) {
    return {};
  }
  if (!navigationState.routes) {
    if (navigationState.routeName === routeName) {
      return navigationState;
    } else {
      return {};
    }
  }
  const currRoute = navigationState.routes[navigationState.index];
  return currRoute.routeName === routeName ? currRoute : getCurrentRoute(currRoute, routeName);
};

export const getCountCoupon = (itemList) => {
  let newCountCoupon = 0;
  forEach(itemList, (value) => {
    const totalCountCoupon = result(value, 'redeemCounter', 0);
    newCountCoupon += totalCountCoupon;
  });
  return newCountCoupon;
};

export const transformTokenSpecialChar = (itemList) => {
  const finalForm = itemList.substring(1, itemList.length);
  return finalForm;
};

export const getFirstParams = (value) => {
  const cutToken = indexOf(value, '=');
  const cutToken3D = indexOf(value, 'D');
  const firstForm = cutToken !== -1 ? value.substring(0, cutToken) : value.substring(0, cutToken3D - 3);
  const secondFormRaw = cutToken !== -1 ? value.substring(cutToken + 1, value.length) : value.substring(cutToken3D + 1, value.length);
  const cutTokenPercent = indexOf(secondFormRaw, '%');
  const secondForm = secondFormRaw.substring(0, cutTokenPercent);
  const keyId = firstForm;
  const valueId =  secondForm;
  const finalForm = [{keyId, valueId}];
  return finalForm;
};

export const getAllowDefault = (account) => {
  const allowFlag = result(account, 'allowFlag', '');
  const allowDefault = allowFlag.includes('bp');
  return allowDefault;
};

export const doNothing = (params) => params;

export const getOffersPGOLoan = (listOffers) => {
  const filteredOffers = filter(listOffers, {offersTitle: 'PGOLoan'});
  if (isEmpty(filteredOffers)) {
    return false;
  }
  return true;
};

export const getAccountsForPGO = (allAccounts = []) => {
  let filteredAccounts = [];
  allAccounts.forEach((account) => {
    const accountNumber = result(account, 'accountNumber', '');
    const isSyaria = checkSyaria(accountNumber);

    if (!isSyaria) {
      filteredAccounts.push(account);
    }
  });
  return filteredAccounts;
};

export const getAccountType = (accountList, accNo) => {
  const accountType = accountList.filter((account) => account.accountNumber === accNo);
  return accountType;
};

export const currencyZero = (unformatted) => (
  !unformatted && parseInt(unformatted) !== 0) ? '--' : formatFieldAmount(Math.floor(unformatted)) + ',000';

export const getMemberList = (values) => {
  const member = filter(values, (val) => `${val}`.includes('member'));
  return member;
};

export const sumTotalInput = (values) => {
  let total = 0;
  map(values, (val) => {
    const totalVal = parseInt(result(val, 'Amount', 0));
    total += totalVal;
  });
  return total;
};

export const sumTotalMember = (values) => {
  const member0 = parseInt(result(values, 'member0', 0));
  const member1 = parseInt(result(values, 'member1', 0));
  const member2 = parseInt(result(values, 'member2', 0));
  const member3 = parseInt(result(values, 'member3', 0));
  const member4 = parseInt(result(values, 'member4', 0));
  const member5 = parseInt(result(values, 'member5', 0));
  const member6 = parseInt(result(values, 'member6', 0));
  const member7 = parseInt(result(values, 'member7', 0));
  const member8 = parseInt(result(values, 'member8', 0));
  const member9 = parseInt(result(values, 'member9', 0));
  let total = 0;
  total = member0 + member1 + member2 + member3 + member4 + member5
  + member6 + member7 + member8 + member9;
  return total;
};

export const getChoosenContact = (selectedContacts, contact) => {
  const currentContacts = selectedContacts.filter((sc) => result(sc, 'phoneNumbers.0.number', '') !== result(contact, 'item.phoneNumbers.0.number', ''));
  return currentContacts;
};

export const suggestionTransform = (data) => {
  let newString = '';
  forEach(data, (value) => {
    const stringSuggestion = result(value, 'indexSuggestion', '');
    if (newString === '') {
      newString = stringSuggestion;
    } else {
      newString = newString + ', ' + stringSuggestion;
    }
  });
  return newString;
};

export const stringToBool = (data) => {
  let isNotBool = data;
  if (data === 'NO') {
    isNotBool = false;
  } else {
    isNotBool = true;
  }
  return isNotBool;
};


export const networkOtherBank = (bank) => {
  if (bank === 'alto') {
    return alto;
  } else if (bank === 'atmBersama') {
    return atmBersama;
  } else if (bank === 'prima') {
    return prima;
  }
};

export const generateEmoneyOnboard = (loginName) => {
  const displayName = result(loginName, 'profile.name', '');
  let emoneyOnboardMap = [];
  const emoneyContent1 = {
    emoneyImg: emoney1,
    emoneyText: [{
      text: language.EMONEY_ONBOARD__WELCOME,
      style: 'normal'
    },
    {
      text: displayName,
      style: 'bold'
    }]
  };
  const emoneyContent2 = {
    emoneyImg: emoney2,
    emoneyText: [{
      text: language.EMONEY_ONBOARD__SEND,
      style: 'normal'
    },
    {
      text: language.EMONEY_ONBOARD__PHONENUMBER,
      style: 'normal'
    },
    {
      text: language.EMONEY_ONBOARD__AND,
      style: 'normal'
    },
    {
      text: language.EMONEY_ONBOARD__OTHER,
      style: 'normal'
    }]
  };
  const emoneyContent3 = {
    emoneyImg: emoney3,
    emoneyText: [
      {
        text: language.EMONEY_ONBOARD__WATER,
        style: 'normal'
      },
      {
        text: language.EMONEY_ONBOARD__PAY,
        style: 'normal'
      },
      {
        text: language.EMONEY_ONBOARD__WITH,
        style: 'normal'
      },
      {
        text: language.EMONEY_ONBOARD__EASE,
        style: 'normal'
      }
    ]};
  const emoneyContent4 = {
    emoneyImg: emoney4,
    emoneyText: [
      {
        text: language.EMONEY_ONBOARD__RUN,
        style: 'normal'
      },
      {
        text: language.EMONEY_ONBOARD__TOPUP,
        style: 'normal'
      },
      {
        text: language.EMONEY_ONBOARD__FOR,
        style: 'normal'
      },
      {
        text: language.EMONEY_ONBOARD__TRANSPORT,
        style: 'normal'
      },
      {
        text: language.EMONEY_ONBOARD__NEEDS,
        style: 'normal'
      }
    ]
  };
  emoneyOnboardMap = [emoneyContent1, emoneyContent2, emoneyContent3, emoneyContent4];
  return emoneyOnboardMap;
};

export const getAllAccountsExcludeEmoney = (allAccounts = []) => {
  let filteredAccounts = [];
  allAccounts.forEach((account) => {
    const accountTypeCode = result(account, 'accountTypeCode', '');
    if ((accountTypeCode !== '3808')) {
      filteredAccounts.push(account);
    }
  });
  return filteredAccounts;
};

export const getAllAccountsExcludeEmoneyFT = (allAccounts = []) => {
  let filteredAccounts = [];
  allAccounts.forEach((account) => {
    const accountType = result(account, 'accountType', '');
    const accountNumberCode = !startsWith(result(account, 'accountNumber', ''), '3808');
    if (accountType !== 'emoneyAccount' && accountNumberCode) {
      filteredAccounts.push(account);
    }
  });
  return filteredAccounts;
};

export const getEmoneyKyc = (allAccounts = []) => {
  let filteredAccounts = [];
  allAccounts.forEach((account) => {
    const accountType = result(account, 'accountType', '');

    if (accountType !== 'emoneyAccount') {
      filteredAccounts.push(account);
    } else {
      filteredAccounts.push(account);
    }
  });
  return filteredAccounts;
};


export const getEmoneyAccount = (allAccounts = []) => {
  const filteredAccounts = find(allAccounts, {accountType: 'emoneyAccount'});
  return filteredAccounts;
};

export const generateAccountLabelSplitBill = (accounts, payeeAccountNumber) => {
  const filteredAccount = filter(accounts, (acc) => acc.accountNumber !== payeeAccountNumber);
  const transformedAccounts = filteredAccount.map((acc) => {
    const display = `${acc.productType || '--'} - ${acc.accountNumber || '--'}`;
    return {
      ...acc,
      display
    };
  });
  return transformedAccounts;
};

export const amountMemberSplitBill = (billIndex, dataUser, selectedContacts) => {
  let dataArray = [...selectedContacts];
  dataArray.forEach((item, i) => {
    item.id = i + 1;
  });
  let isContactList = dataArray;
  isContactList.map((value) => {
    const mobileNumber = result(value, 'phoneNumbers', []);
    const mobileNumberArray = result(mobileNumber, '[0].number', '');
    const uPhoneNumbers = result(dataUser, 'phoneNumbers', []);
    const userMobileNumber = result(uPhoneNumbers, '[0].number', '');
    if (userMobileNumber === mobileNumberArray) {
      value['id'] = 0;
    }
  });
  const data = sortBy(isContactList, 'id');
  const finalData = data.slice(1, data.length);
  const filterIndex = filter(billIndex, function (o) {
    return o.indexBill !== 0;
  });
  const isValueEmptyIndex = filterIndex.length < finalData.length;

  let oneLessAmountMember;
  if (isValueEmptyIndex) {
    oneLessAmountMember = true;
  }
  return oneLessAmountMember;
};

export const makePositive = (n) => Number((n * -1).toString().replace('-', ''));
export const getCategoryAlfacart = (category) => {
  if (category === 'Q1') {
    return 'Category-02';
  } else if (category === 'Q3') {
    return 'Category-03';
  } else if (category === 'Q12') {
    return 'Category-04';
  } else if (category === 'Q2') {
    return 'Category-05';
  } else if (category === 'Q4') {
    return 'Category-06';
  } else if (category === 'Q5') {
    return 'Category-07';
  } else if (category === 'Q6') {
    return 'Category-08';
  } else if (category === 'Q7') {
    return 'Category-09';
  } else if (category === 'Q8') {
    return 'Category-10';
  } else if (category === 'Q9') {
    return 'Category-11';
  } else if (category === 'Q10') {
    return 'Category-12';
  } else if (category === 'Q11') {
    return 'Category-13';
  } else if (category === 'Q0') {
    return 'Other';
  } else {
    return 'Category-01';
  }
};
export const replaceComma = (string = '') => {
  const regex = /,/g;
  return string.replace(regex, '.');
};

export const generalCode = (objectData) => {
  const biller = result(objectData, 'biller', '');
  const generatCode = result(biller, 'billerPreferences.code', '');
  const name = result(objectData, 'biller.name', '');

  if (generatCode === '812277') {
    return name; // ovo
  } else if (generatCode === '810128') {
    return name; // gopay
  } else if (generatCode === '002240') {
    return name; // shopeepay
  } else if (generatCode === '010002') {
    return name; // telkomsel pre
  } else if (generatCode === '013002') {
    return name; // xl/axis
  } else if (generatCode === '012102') {
    return name; // three
  } else if (generatCode === '011002') {
    return name; // indosat
  } else if (generatCode === '019003') {
    return name; // smartfren
  } else if (generatCode === '010001') {
    return name; // Telkomsel post
  } else if (generatCode === '013001') {
    return name; // xl
  } else if (generatCode === '012101') {
    return name; // three
  } else if (generatCode === '009918') {
    return name; // indosat
  } else if (generatCode === '019004') {
    return name; // smartfren
  } else if (generatCode === '001022') {
    return name; // link aja
  }
};



export const generateMinTD = (min, currency) => {
  const currencyMap = {
    IDR: result(min, 'IDR', ''),
    USD: result(min, 'USD', ''),
    EUR: result(min, 'EUR', ''),
    SGD: result(min, 'SGD', ''),
    AUD: result(min, 'AUD', ''),
    JPY: result(min, 'JPY', ''),
    CNY: result(min, 'CNY', ''),
  };
  return currencyMap[currency];
};

export const generrateArrayItems = (product, counter) => {
  let selectedItems = [];
  let indexCounter = 0;
  do {
    selectedItems = [...selectedItems, product];
    indexCounter = indexCounter + 1;
  }
  while (indexCounter < counter) ;
  return selectedItems;
};

export const filterSearchForAlfaCart = (baseItem, searchWord, variableName = '') => {
  const filterProductNonTarget = filter(baseItem, function (o) {
    const productName = result(o, [`${variableName}`], '');
    const checkName = includes(lowerCase(productName), lowerCase(searchWord));
    return checkName;
  });
  return filterProductNonTarget;
};


export const getTransferPossibleAccountsSIL = (accounts = [], transType, targetAccount = {}, currency, iscrossCurrency, isSilIdrUsd = '') => {
  const regexTransType = new RegExp(transType, 'i');
  const isPossibleAccount = (account) => {
    if (iscrossCurrency) {
      return (result(account, 'currency', '').toUpperCase() === 'USD' || result(account, 'currency', '').toUpperCase() === 'IDR') && !(startsWith(result(account, 'accountNumber', ''), '99') && result(account, 'accountNumber', '').length === 10) && regexTransType.test(result(account, 'allowFlag', '').toLowerCase());

    } else if (isSilIdrUsd !== '') {
      return result(account, 'currency', '').toUpperCase() === isSilIdrUsd && regexTransType.test(result(account, 'allowFlag', '').toLowerCase()) && !(startsWith(result(account, 'accountNumber', ''), '99') && result(account, 'accountNumber', '').length === 10);
    } else {
      return result(account, 'currency', '').toUpperCase() === currency && regexTransType.test(result(account, 'allowFlag', '').toLowerCase()) && !(startsWith(result(account, 'accountNumber', ''), '99') && result(account, 'accountNumber', '').length === 10);
    }
  };

  const filteredAcc = accounts.filter(isPossibleAccount);
  const payeeAcccount = find(accounts, {accountNumber: result(targetAccount, 'accountNumber', '')}) || {};
  const removedAccount = isEmpty(payeeAcccount) ? filteredAcc : filter(filteredAcc, (acc) => acc.accountNumber !== payeeAcccount.accountNumber);
  const groupedAccounts = groupBy(removedAccount, (account) => (result(account, 'accountType', '').toLowerCase()));
  const savingAccounts = result(groupedAccounts, 'savingaccount', []);
  const currentAccounts = result(groupedAccounts, 'currentaccount', []);
  return [...savingAccounts, ...currentAccounts];
};

export const toTLVs = (obj, parentKey) => {
  let filler = '';
  let temp = '';

  for (const key in obj) {
    // if (!isNaN(key)) continue;
    if (obj.hasOwnProperty(key)) {
      const val = obj[key];
      if (typeof val === 'object') temp += toTLVs(val, key);
      else {
        filler = '';
        let valLength = (val.length / 2).toString(16);
        if ((valLength < 10) || (valLength.length === 1)) filler = '0';
        temp += key + filler + valLength + val;
      }
    }
  }
  filler = '';
  let tempLength = (temp.length / 2).toString(16);
  if ((tempLength < 10) || (tempLength.length === 1)) filler = '0';
  if (parentKey !== undefined) return parentKey + filler + tempLength + temp;
  else return temp;
};

export const toTLVsCico = (obj, parentKey) => {
  let filler = '';
  let temp = '';
  for (const key in obj) {
    if (isNaN(Number(key))) continue;
    if (obj.hasOwnProperty(key)) {
      const val = obj[key];
      if (typeof val === 'object') temp += toTLVs(val, key);
      else {
        if (val === '' || val === undefined || val.length === 0) delete obj.key;
        filler = '';
        if (val.length < 10) filler = '0';
        temp += key + filler + val.length + val;
      }
    }
  }
  filler = '';
  if (temp.length < 10) filler = '0';
  if (parentKey !== undefined) return parentKey + filler + temp.length + temp;
  else return temp;
};

export const toTLVsCicoFix = (obj, parentKey) => {
  let filler = '';
  let temp = '';
  for (const key in obj) {
    if (isNaN(Number(key))) continue;
    if (obj.hasOwnProperty(key)) {
      const val = obj[key];
      if (typeof val === 'object') temp += toTLVsCicoFix(val, key);
      else {
        if (val === '' || val === undefined || val.length === 0) delete obj.key;
        filler = '';
        if (val.length < 10) filler = '0';
        temp += key + filler + val.length + val;
      }
    }
  }
  filler = '';
  if (temp.length < 10) filler = '0';
  if (parentKey !== undefined) return parentKey + filler + temp.length + temp;
  else return temp;
};
export const isNaNAmount = (value) => isNaN(value) ? 0 : value;

export const getTransferPossibleAccountsToSetDefaultAccount = (accounts = [], transType, targetAccount = {}) => {
  const regexTransType = new RegExp(transType, 'i');
  const isPossibleAccount = (account) => regexTransType.test(result(account, 'allowFlag', '').toLowerCase());
  const filteredAcc = accounts.filter(isPossibleAccount);
  const payeeAcccount = find(accounts, {accountNumber: result(targetAccount, 'accountNumber', '')}) || {};
  const removedAccount = isEmpty(payeeAcccount) ? filteredAcc : filter(filteredAcc, (acc) => acc.accountNumber !== payeeAcccount.accountNumber);

  const groupedAccounts = groupBy(removedAccount, (account) => (result(account, 'accountType', '').toLowerCase()));
  const savingAccounts = result(groupedAccounts, 'savingaccount', []);
  const currentAccounts = result(groupedAccounts, 'currentaccount', []);
  return [...savingAccounts, ...currentAccounts];
};

export const generateSavingsAcoountToAdd = (data) => {
  const transformedAccounts = data.map((acc) => {
    const display = `${acc.productType || '--'} - ${acc.accNo || '--'}`;
    return {
      ...acc,
      display
    };
  });
  return transformedAccounts;
};

export const generateInterestSimasTara = (bulan = 0, percentInterest = 0, baseAmount = 0) => {
  let index1 = 0;
  const totalBulan = bulan;
  const percentBulan = percentInterest;
  const staticPerbulan = baseAmount;
  let hasil = 0;
  let bungaNetTotal = 0;
  let bungaGrossTotal = 0;
  while (index1 < totalBulan) {
    const percent = percentBulan / 100 / 12;
    const hasilBulan = staticPerbulan + hasil;
    const totalBunga = round(hasilBulan * percent, 0);
    const bungaNet = round(totalBunga * 0.8, 0);
    hasil = hasilBulan + bungaNet;
    bungaNetTotal = bungaNetTotal + bungaNet;
    bungaGrossTotal = bungaGrossTotal + totalBunga;
    index1 += 1;
  }
  const totalgorssRaw = String(baseAmount * totalBulan + bungaGrossTotal);
  const lastResult = {total: hasil, bungaGrossTotal, bungaNetTotal, totalGross: totalgorssRaw};
  return lastResult;
};

export const getSavingAccount = (allAccounts = []) => {
  const filteredAccounts = find(allAccounts, {accountType: 'SavingAccount'});
  return filteredAccounts;
};

export const toTitleCase = (str) => str.replace(/\w\S*/g, function (txt) {
  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
});

export const checkErrorTransferQr = (jsonData, qrString) => {
  const formatIndicator = result(jsonData, '00', '');
  const pointOfInitiation = result(jsonData, '01', '');
  const checkPointOfInit = pointOfInitiation === '11' || pointOfInitiation === '12' || pointOfInitiation === '';
  const benePanInt = parseInt(result(jsonData, '40.01', ''));
  const benePanStr = result(jsonData, '40.01', '');
  const beneId = result(jsonData, '40.02', '');
  const isNum = /^\d+$/.test(benePanStr);
  const mcc = result(jsonData, '52', '');
  const listMcc = dataMcc();
  const isMcc = listMcc.includes(mcc);
  const iMccNum = /^\d+$/.test(mcc);
  const listCurrencyNum = dataCurrencyNumber();
  const curr = result(jsonData, '53', '');
  const isCurr = listCurrencyNum.includes(curr);
  const isCurrNum = /^\d+$/.test(curr);
  const listCountryCode = dataCounteryCode();
  const cCode = result(jsonData, '58', '');
  const iscCode = listCountryCode.includes(cCode);
  const listCodePost = result(jsonPostalCode, 'dataPos', []);
  const postalCode = result(jsonData, '61', '');
  const isPostalCode = listCodePost.includes(postalCode);
  const beneName = result(jsonData, '59', '').length > 25;
  const beneCity = result(jsonData, '60', '').length > 200;
  const crc = result(jsonData, '63', '');
  const errCrc = crc.length !== 4;
  const checkCrc = isValidCrc(qrString);

  const validCrc = result(checkCrc, 'isValidCrc', false);
  let error;
  if (formatIndicator !== '01') {
    error = true;
  } else if (!checkPointOfInit) {
    error = true;
  } else if (benePanInt.length < 16 || benePanInt.length > 19) {
    error = true;
  } else if (!isNum) {
    error = true;
  } else if (beneId.length > 15) {
    error = true;
  } else if (!isMcc) {
    error = true;
  } else if (!iMccNum) {
    error = true;
  } else if (!isCurr) {
    error = true;
  } else if (!isCurrNum) {
    error = true;
  } else if (!iscCode) {
    error = true;
  } else if (beneName) {
    error = true;
  } else if (beneCity) {
    error = true;
  } else if (!isPostalCode) {
    error = false;
  } else if (!validCrc) {
    error = true;
  } else if (errCrc) {
    error = true;
  } else {
    error = false;
  }
  return error;
  // else if (isEmpty(uniqCodeSub00)) {
  //   error = true;
  // } else if (isErrUniqCode) {
  //   error = true;
  // }

};

export const dataMcc = () => {
  const listMcc = [
    '0742',	'0743',	'0744',	'0763',	'0780',	'1520',	'1711',	'1731',	'1740',	'1750',	'1761',	'1771',
    '1799',	'2741',	'2791',	'2842',	'3103',	'4011',	'4111',	'4112',	'4119',	'4121',	'4131',	'4214',
    '4215',	'4225',	'4411',	'4457',	'4468',	'4511',	'4582',	'4722',	'4784',	'4789',	'4812',	'4814',
    '4815',	'4816',	'4821',	'4829',	'4899',	'4900',	'5013',	'5021',	'5039',	'5044',	'5045',	'5046',
    '5047',	'5051',	'5065',	'5072',	'5074',	'5085',	'5094',	'5099',	'5111',	'5122',	'5131',	'5137',
    '5139',	'5169',	'5172',	'5192',	'5193',	'5198',	'5199',	'5200',	'5211',	'5231',	'5251',	'5261',
    '5262',	'5271',	'5300',	'5309',	'5310',	'5311',	'5331',	'5399',	'5411',	'5422',	'5441',	'5451',
    '5462',	'5499',	'5511',	'5521',	'5531',	'5532',	'5533',	'5541',	'5542',	'5551',	'5561',	'5571',
    '5592',	'5598',	'5599',	'5611',	'5621',	'5631',	'5641',	'5651',	'5655',	'5661',	'5681',	'5691',
    '5697',	'5698',	'5699',	'5712',	'5713',	'5714',	'5715',	'5718',	'5719',	'5722',	'5732',	'5733',
    '5734',	'5735',	'5811',	'5812',	'5813',	'5814',	'5815',	'5816',	'5817',	'5818',	'5912',	'5921',
    '5931',	'5932',	'5933',	'5935',	'5937',	'5940',	'5941',	'5942',	'5943',	'5944',	'5945',	'5946',
    '5947',	'5948',	'5949',	'5950',	'5960',	'5962',	'5963',	'5964',	'5965',	'5966',	'5967',	'5968',
    '5969',	'5970',	'5971',	'5972',	'5973',	'5975',	'5976',	'5977',	'5978',	'5983',	'5992',	'5993',
    '5994',	'5995',	'5996',	'5997',	'5998',	'5999',	'6010',	'6011',	'6012',	'6051',	'6211',	'6300',
    '7011',	'7012',	'7032',	'7033',	'7210',	'7211',	'7216',	'7217',	'7221',	'7230',	'7251',	'7261',
    '7273',	'7276',	'7277',	'7278',	'7296',	'7297',	'7298',	'7299',	'7311',	'7321',	'7322',	'7333',
    '7338',	'7339',	'7342',	'7349',	'7361',	'7372',	'7375',	'7379',	'7392',	'7393',	'7394',	'7395',
    '7399',	'7512',	'7513',	'7519',	'7523',	'7531',	'7534',	'7535',	'7538',	'7542',	'7549',	'7622',
    '7623',	'7629',	'7631',	'7641',	'7692',	'7699',	'7829',	'7832',	'7841',	'7911',	'7922',	'7929',
    '7932',	'7933',	'7941',	'7991',	'7992',	'7993',	'7994',	'7995',	'7996',	'7997',	'7998',	'7999',
    '8011',	'8021',	'8031',	'8041',	'8042',	'8043',	'8049',	'8050',	'8062',	'8071',	'8099',	'8111',
    '8211',	'8220',	'8241',	'8244',	'8249',	'8299',	'8351',	'8398',	'8641',	'8651',	'8661',	'8675',
    '8699',	'8734',	'8911',	'8931',	'8999',	'9211',	'9222',	'9223',	'9311',	'9399',	'9402'
  ];
  return listMcc;
};

export const dataCounteryCode = () => {
  const listCountryCode = [
    'AF',	'AX',	'AL',	'DZ',	'AS',	'AD',	'AO',	'AI',	'AQ',	'AG',	'AR',	'AM',	'AW',	'AU',	'AT',	'AZ',	'BS',
    'BH',	'BD',	'BB',	'BY',	'BE',	'BZ',	'BJ',	'BM',	'BT',	'BO',	'BQ',	'BA',	'BW',	'BV',	'BR',	'IO',	'BN',
    'BG',	'BF',	'BI',	'KH',	'CM',	'CA',	'CV',	'KY',	'CF',	'TD',	'CL',	'CN',	'CX',	'CC',	'CO',	'KM',	'CG',
    'CD',	'CK',	'CR',	'CI',	'HR',	'CU',	'CW',	'CY',	'CZ',	'DK',	'DJ',	'DM',	'DO',	'EC',	'EG',	'SV',	'GQ',
    'ER',	'EE',	'ET',	'FK',	'FO',	'FJ',	'FI',	'FR',	'GF',	'PF',	'TF',	'GA',	'GM',	'GE',	'DE',	'GH',	'GI',
    'GR',	'GL',	'GD',	'GP',	'GU',	'GT',	'GG',	'GN',	'GW',	'GY',	'HT',	'HM',	'VA',	'HN',	'HK',	'HU',	'IS',
    'IN',	'ID',	'IR',	'IQ',	'IE',	'IM',	'IL',	'IT',	'JM',	'JP',	'JE',	'JO',	'KZ',	'KE',	'KI',	'KP',	'KR',
    'KW',	'KG',	'LA',	'LV',	'LB',	'LS',	'LR',	'LY',	'LI',	'LT',	'LU',	'MO',	'MK',	'MG',	'MW',	'MY',	'MV',
    'ML',	'MT',	'MH',	'MQ',	'MR',	'MU',	'YT',	'MX',	'FM',	'MD',	'MC',	'MN',	'ME',	'MS',	'MA',	'MZ',	'MM',
    'NA',	'NR',	'NP',	'NL',	'NC',	'NZ',	'NI',	'NE',	'NG',	'NU',	'NF',	'MP',	'NO',	'OM',	'PK',	'PW',	'PS',
    'PA',	'PG',	'PY',	'PE',	'PH',	'PN',	'PL',	'PT',	'PR',	'QA',	'RE',	'RO',	'RU',	'RW',	'BL',	'SH',	'KN',
    'LC',	'MF',	'PM',	'VC',	'WS',	'SM',	'ST',	'SA',	'SN',	'RS',	'SC',	'SL',	'SG',	'SX',	'SK',	'SI',	'SB',
    'SO',	'ZA',	'GS',	'SS',	'ES',	'LK',	'SD',	'SR',	'SJ',	'SZ',	'SE',	'CH',	'SY',	'TW',	'TJ',	'TZ',	'TH',
    'TL',	'TG',	'TK',	'TO',	'TT',	'TN',	'TR',	'TM',	'TC',	'TV',	'UG',	'UA',	'AE',	'GB',	'US',	'UM',	'UY',
    'UZ',	'VU',	'VE',	'VN',	'VG',	'VI',	'WF',	'EH',	'YE',	'ZM',	'ZW',
  ];
  return listCountryCode;
};

export const dataCurrencyNumber = () => {
  const dataCurrency = [
    '971',	'978',	'008',	'012',	'840',	'978',	'973',	'951',	'951',	'032',	'051',	'533',	'036',
    '978',	'944',	'044',	'048',	'050',	'052',	'933',	'978',	'084',	'952',	'060',	'064',	'356',
    '068',	'984',	'840',	'977',	'072',	'578',	'986',	'840',	'096',	'975',	'952',	'108',	'132',
    '116',	'950',	'124',	'136',	'950',	'950',	'990',	'152',	'156',	'036',	'036',	'970',	'170',
    '174',	'976',	'950',	'554',	'188',	'952',	'191',	'931',	'192',	'532',	'978',	'203',	'208',
    '262',	'951',	'214',	'840',	'818',	'840',	'222',	'950',	'232',	'978',	'230',	'978',	'238',
    '208',	'242',	'978',	'978',	'978',	'953',	'978',	'950',	'270',	'981',	'978',	'936',	'292',
    '978',	'208',	'951',	'978',	'840',	'320',	'826',	'324',	'952',	'328',	'840',	'332',	'036',
    '978',	'340',	'344',	'348',	'352',	'356',	'360',	'960',	'364',	'368',	'978',	'826',	'376',
    '978',	'388',	'392',	'826',	'400',	'398',	'404',	'036',	'408',	'410',	'414',	'417',	'418',
    '978',	'422',	'710',	'426',	'430',	'434',	'756',	'978',	'978',	'446',	'969',	'454',	'458',
    '462',	'952',	'978',	'840',	'978',	'929',	'480',	'978',	'965',	'979',	'484',	'840',	'498',
    '978',	'496',	'978',	'951',	'504',	'943',	'104',	'710',	'516',	'036',	'524',	'978',	'953',
    '554',	'558',	'952',	'566',	'554',	'036',	'840',	'578',	'512',	'586',	'840',	'840',	'590',
    '598',	'600',	'604',	'608',	'554',	'985',	'978',	'840',	'634',	'807',	'978',	'946',	'643',
    '646',	'978',	'654',	'951',	'951',	'978',	'978',	'951',	'882',	'978',	'930',	'682',	'952',
    '941',	'690',	'694',	'702',	'532',	'994',	'978',	'978',	'090',	'706',	'710',	'728',	'978',
    '144',	'938',	'968',	'578',	'748',	'752',	'948',	'947',	'756',	'760',	'901',	'972',	'834',
    '764',	'840',	'952',	'554',	'776',	'780',	'788',	'949',	'934',	'840',	'036',	'800',	'980',
    '784',	'826',	'840',	'997',	'840',	'940',	'858',	'860',	'548',	'937',	'704',	'840',	'840',
    '953',	'504',	'886',	'967',	'932'
  ];
  return dataCurrency;
};

export const getModelDevice = (model, heightIos) => {
  const normalIphone = model === 'iPhone 6' || model === 'iPhone 6 Plus' || model === 'iPhone 7' || model === 'iPhone 7 Plus' || model === 'iPhone 8' || model === 'iPhone 7 Plus' || heightIos === false;
  return normalIphone;
};

export const generateAddressSelectionAddAtm = (dataPilihAlamat) => {
  const streetAddress = result(dataPilihAlamat, 'resultListCurrent.currentAddress', '') === '' ? '' : result(dataPilihAlamat, 'resultListCurrent.currentAddress', '') + ' ';
  const rtrw = result(dataPilihAlamat, 'resultListCurrent.currentRwRt', '') === '' ? '' : 'RW/RT ' + result(dataPilihAlamat, 'resultListCurrent.currentRwRt', '');
  const subDistrict = result(dataPilihAlamat, 'resultListCurrent.currentSubTown', '') === '' ? '' : result(dataPilihAlamat, 'resultListCurrent.currentSubTown', '') + ', ';
  const district = result(dataPilihAlamat, 'resultListCurrent.currentCity', '') === '' ? '' : result(dataPilihAlamat, 'resultListCurrent.currentCity', '');
  const postalCode = result(dataPilihAlamat, 'resultListCurrent.currentPostalCode', '') === '' ? '' : result(dataPilihAlamat, 'resultListCurrent.currentPostalCode', '');
  const province = result(dataPilihAlamat, 'resultListCurrent.currentProvince', '') === '' ? '' : result(dataPilihAlamat, 'resultListCurrent.currentProvince', '') + ' ';

  const currentAddress = streetAddress + rtrw + '\n' +
  subDistrict + district + '\n' +
province + postalCode + '\n' +
  'INDONESIA';

  const fieldCurrentLengkap = streetAddress + rtrw + ', ' + subDistrict + district + ', ' + province + postalCode;

  const fieldCurrentLengkapForValidasi = streetAddress + rtrw + subDistrict + district + province + postalCode;

  const ktpAddress = result(dataPilihAlamat, 'resultListKTP.address', '') === '' ? '' : result(dataPilihAlamat, 'resultListKTP.address', '') + ' ';
  const ktpRtrw = result(dataPilihAlamat, 'resultListKTP.RW/RT', '') === '' ? '' : 'RW/RT ' + result(dataPilihAlamat, 'resultListKTP.RW/RT', '');
  const ktpDistrict = result(dataPilihAlamat, 'resultListKTP.city', '') === '' ? '' : result(dataPilihAlamat, 'resultListKTP.city', '');
  const ktpSubDistrict = result(dataPilihAlamat, 'resultListKTP.subTown', '') === '' ? '' : result(dataPilihAlamat, 'resultListKTP.subTown', '') + ', ';
  const ktpPostalCode = result(dataPilihAlamat, 'resultListKTP.postalCode', '') === '' ? '' : result(dataPilihAlamat, 'resultListKTP.postalCode', '');
  const ktpProvince = result(dataPilihAlamat, 'resultListKTP.province', '') === '' ? '' : result(dataPilihAlamat, 'resultListKTP.province', '') + ' ';

  const ktpAddressDisplay = ktpAddress + ktpRtrw + '\n' +
  ktpSubDistrict + ktpDistrict + '\n' +
  ktpProvince + ktpPostalCode + '\n' +
  'INDONESIA';

  const fieldKtpLengkap = ktpAddress + ktpRtrw + ', ' + ktpSubDistrict + ktpDistrict + ', ' + ktpProvince + ktpPostalCode;

  const fieldKtpLengkapForValidasi = ktpAddress + ktpRtrw + ktpSubDistrict + ktpDistrict + ktpProvince + ktpPostalCode;

  const radioOptions = [{
    label: language.CREDITCARD__CURRENT_ADDRESS,
    sublabel: currentAddress,
    displaySublabelCurrent: currentAddress,
    streetAddress: streetAddress,
    RtRw: rtrw,
    subDistrict: subDistrict,
    district: district,
    postalCode: postalCode,
    province: province,
    currentLengkap: fieldCurrentLengkap,
    LengkapForValidasi: fieldCurrentLengkapForValidasi,
  }, {
    label: language.CREDITCARD__KTP_ADDRESS,
    sublabel: ktpAddressDisplay,
    displaySublabelKTP: ktpAddressDisplay,
    streetAddress: ktpAddress,
    RtRw: ktpRtrw,
    subDistrict: ktpSubDistrict,
    district: ktpDistrict,
    postalCode: ktpPostalCode,
    province: ktpProvince,
    ktpLengkap: fieldKtpLengkap,
    LengkapForValidasi: fieldKtpLengkapForValidasi,
  }];
  return radioOptions;
};

export const generateCurrencyList = (valueList) => {
  const filteredCurrency = reverse(filter(valueList, (val) => val.currency !== null && val.currency !== 'CNY' && val.currency !== 'AUD'));
  const transformedCurrency = filteredCurrency.map((val) => {
    const display = `${val.currency || '--'} - ${val.name || '--'}`;
    return {
      ...val,
      display
    };
  });
  return transformedCurrency;
};

export const formatFieldRemittance = (value) => value ? value.replace(/[^a-zA-Z ]+/g, '') : '';

export const getTransferPossibleAccountsReksadana = (accounts = [], transType, targetAccount = {}) => {
  const regexTransType = new RegExp(transType, 'i');
  const isFundCurrency = result(targetAccount, 'summaryPortfolio.Fund_Currency', '');
  const isPossibleAccount = (account) => {
    if (isFundCurrency === 'USD') {
      return result(account, 'currency', '').toUpperCase() === 'USD' && regexTransType.test(result(account, 'allowFlag', '').toLowerCase());
    } else {
      return result(account, 'currency', '').toUpperCase() === 'IDR' && regexTransType.test(result(account, 'allowFlag', '').toLowerCase());
    }
  };
  const filteredAcc = accounts.filter(isPossibleAccount);
  const payeeAcccount = find(accounts, {accountNumber: result(targetAccount, 'detailPortfolio.portfolio.0.Bank_Account', '')}) || {};
  const removedAccount = isEmpty(payeeAcccount) ? filteredAcc : filter(filteredAcc, (acc) => acc.accountNumber === payeeAcccount.accountNumber);
  const groupedAccounts = groupBy(removedAccount, (account) => (result(account, 'accountType', '').toLowerCase()));
  const savingAccounts = result(groupedAccounts, 'savingaccount', []);
  const currentAccounts = result(groupedAccounts, 'currentaccount', []);

  return [...savingAccounts, ...currentAccounts];
};
export const toCCFormater = (amount) => {
  const amountCC = replace(replace(amount, /([,])+/g, ''), '-', '');
  const toIntAmount = parseInt(amountCC);
  const toStringAmount = toIntAmount.toString();
  const rest = toStringAmount.length % 3;
  let finalCurr = toStringAmount.substr(0, rest);
  const separator = toStringAmount.substr(rest).match(/\d{3}/g);

  if (separator) {
    const b = finalCurr ? '.' : '';
    finalCurr += b + separator.join('.');
  }
  return finalCurr;
};

export const ccAccountNumber = (accNo = '') => accNo.substring(0, 4) + ' ' + accNo.substring(4, 8) + ' ' + accNo.substring(8, 12) + ' ' + accNo.substring(12, accNo.length);

// export const getTransferPossibleAccountsWithCC = (accounts = [], transType, targetAccount = {}) => {
//   const regexTransType = new RegExp(transType, 'i');
//   const isPossibleAccount = (account) => regexTransType.test(result(account, 'allowFlag', '').toLowerCase());
//   const filteredAcc = accounts.filter(isPossibleAccount);
//   const emoneyAccount = find(accounts, {accountType: 'emoneyAccount'}) || {};
//   const ccAccounts = filter(accounts, {accountType: 'CreditCardAccount'}) || {};
//   const payeeAcccount = find(accounts, {accountNumber: result(targetAccount, 'accountNumber', '')}) || {};
//   const removedAccount = isEmpty(payeeAcccount) ? filteredAcc : filter(filteredAcc, (acc) => acc.accountNumber !== payeeAcccount.accountNumber);
//   const transferType = result(targetAccount, 'transferType', '');
//   const currency = result(targetAccount, 'currency', '');
//  let currencyAccountMulti = [];
//   if (transferType === 'inbank' || transferType === 'own') {
//     currencyAccountMulti = currency === 'USD' || currency === 'IDR' ? removedAccount : filter(removedAccount, (acc) => acc.currency === 'USD' || acc.currency === 'IDR' || acc.currency === currency);
//   } else {
//     currencyAccountMulti =  filter(removedAccount, (acc) => acc.currency === 'IDR');
//   }
//   const groupedCurrencyAccountsMulti = groupBy(currencyAccountMulti, (account) => (result(account, 'accountType', '').toLowerCase()));
//   if (isEmpty(emoneyAccount) && isEmpty(ccAccounts)) {
//     const savingAccounts = result(groupedCurrencyAccountsMulti, 'savingaccount', []);
//     const currentAccounts = result(groupedCurrencyAccountsMulti, 'currentaccount', []);
//     return [...savingAccounts, ...currentAccounts];
//   } else if (currency !== 'IDR' && !isEmpty(currency)) {
//     const savingAccounts = result(groupedCurrencyAccountsMulti, 'savingaccount', []);
//     const currentAccounts = result(groupedCurrencyAccountsMulti, 'currentaccount', []);
//     return [...savingAccounts, ...currentAccounts];
//   } else if(isEmpty(emoneyAccount)){
//     const savingAccounts = result(groupedCurrencyAccountsMulti, 'savingaccount', []);
//     const currentAccounts = result(groupedCurrencyAccountsMulti, 'currentaccount', []);
//     return [...savingAccounts, ...currentAccounts, ...ccAccounts];
//   } else if(isEmpty(ccAccounts)){
//     const savingAccounts = result(groupedCurrencyAccountsMulti, 'savingaccount', []);
//     const currentAccounts = result(groupedCurrencyAccountsMulti, 'currentaccount', []);
//     return [emoneyAccount, ...savingAccounts, ...currentAccounts];
//   }
//    else {
//     const savingAccounts = result(groupedCurrencyAccountsMulti, 'savingaccount', []);
//     const currentAccounts = result(groupedCurrencyAccountsMulti, 'currentaccount', []);
//     return [emoneyAccount, ...savingAccounts, ...currentAccounts, ...ccAccounts];
//   }
// };

export const getLastThirtyDaysTrx = (itemList) => {
  let lastTransactionsList = [];
  let lastTrxResult = filter(itemList, (item) => (
    moment(item.trxDate).startOf('day').subtract(30, 'days')
  ));
  lastTransactionsList = [...lastTransactionsList, {lastTrxResult}];
  return lastTransactionsList;
};

export const currencyInitial = (currency) => {
  const currencyMap = {
    IDR: 'Rp',
    USD: 'USD',
    EUR: 'EUR',
    SGD: 'SGD',
    AUD: 'AUD',
    JPY: 'JPY',
    CNY: 'CNY',
    NZD: 'NZD'
  };
  return currencyMap[currency] || 'Rp';
};

export const formatFieldAmountWithDecimalValas = (value, currency) => {
  const amount = (!value && parseInt(value) !== 0) ? '' :
    value.toString().replace(/([,.])+/g, '');
  const expectedSeparator = Math.floor(amount.length / 3);
  const separator = '.';
  const separatorAmount = (amount.split(separator).length - 1);
  const regexRightFormat = /(\.)(?=(\d{3}))/g; // if id/en
  if (currency === 'IDR') {
    if (regexRightFormat.test(value) && expectedSeparator === separatorAmount) {
      let str = value.toFixed(2);
      let strStart = str.slice(0, str.length - 3);
      let strEnd = str.substring(str.length - 3, str.length);
      let strEndChange = strEnd.replace('.', ',');
      let strResult = strStart + strEndChange;
      return strResult;
    } else {
      const replaceRegex = /(\d)(?=(\d{3})+(?!\d))/g;
      const replaceValue = '$1' + separator;
      const returnValue = (!value && parseInt(value) !== 0) ? '' :
        value.toString().replace(replaceRegex, replaceValue);
      let str = returnValue;
      let strStart = str.slice(0, str.length - 3);
      let strEnd = str.substring(str.length - 3, str.length);
      let strEndChange = strEnd.replace('.', ',');
      let strResult = strStart + strEndChange;
      return strResult;
    }
  } else {
    return formatForexAmountPaymentStatus(value, currency);
  }

};

export const formatFieldAmountWithDecimalValasPaymentStatus = (value, currency) => {
  const amount = (!value && parseInt(value) !== 0) ? '' :
    value.toString().replace(/([,.])+/g, '');
  const expectedSeparator = Math.floor(amount.length / 3);
  const separator = '.';
  const separatorAmount = (amount.split(separator).length - 1);
  const regexRightFormat = /(\.)(?=(\d{3}))/g; // if id/en
  if (currency === 'IDR') {
    if (regexRightFormat.test(value) && expectedSeparator === separatorAmount) {
      let str = value.toFixed(2);
      let strStart = str.slice(0, str.length - 3);
      let strEnd = str.substring(str.length - 3, str.length);
      let strEndChange = strEnd.replace('.', ',');
      let strResult = strStart + strEndChange;
      return strResult;
    } else {
      const replaceRegex = /(\d)(?=(\d{3})+(?!\d))/g;
      const replaceValue = '$1' + separator;
      const returnValue = (!value && parseInt(value) !== 0) ? '' :
        value.toString().replace(replaceRegex, replaceValue);
      let str = returnValue;
      let strStart = str.slice(0, str.length - 3).replace(/,/g, '.');
      let strEnd = str.substring(str.length - 3, str.length).replace('.', ',');
      let strResult = strStart + strEnd;
      return strResult;
    }
  } else {
    return formatForexAmountPaymentStatus(value, currency);
  }
};

export const getTransferPossibleAccountsSILMulti = (accounts = [], transType, targetAccount = {}, currency, iscrossCurrency, isSilIdrUsd = '') => {
  const regexTransType = new RegExp(transType, 'i');
  const isPossibleAccount = (account) => {
    if (iscrossCurrency && isSilIdrUsd === 'IDR') {
      return (result(account, 'currency', '').toUpperCase() === 'IDR') && !(startsWith(result(account, 'accountNumber', ''), '99') && result(account, 'accountNumber', '').length === 10) && regexTransType.test(result(account, 'allowFlag', '').toLowerCase());

    } else if (iscrossCurrency && isSilIdrUsd === 'USD') {
      return (result(account, 'currency', '').toUpperCase() === 'USD' || result(account, 'currency', '').toUpperCase() === 'IDR') && !(startsWith(result(account, 'accountNumber', ''), '99') && result(account, 'accountNumber', '').length === 10) && regexTransType.test(result(account, 'allowFlag', '').toLowerCase());

    } else {
      return result(account, 'currency', '').toUpperCase() === currency && regexTransType.test(result(account, 'allowFlag', '').toLowerCase()) && !(startsWith(result(account, 'accountNumber', ''), '99') && result(account, 'accountNumber', '').length === 10);
    }
  };

  const filteredAcc = accounts.filter(isPossibleAccount);
  const payeeAcccount = find(accounts, {accountNumber: result(targetAccount, 'accountNumber', '')}) || {};

  const removedAccount = isEmpty(payeeAcccount) ? filteredAcc : filter(filteredAcc, (acc) => acc.accountNumber !== payeeAcccount.accountNumber);
  // const removedCurrency = filter(removedAccount, (acc) => acc.currency.toUpperCase() === isSilIdrUsd);
  const groupedAccounts = groupBy(removedAccount, (account) => (result(account, 'accountType', '').toLowerCase()));
  const savingAccounts = result(groupedAccounts, 'savingaccount', []);
  const currentAccounts = result(groupedAccounts, 'currentaccount', []);
  return [...savingAccounts, ...currentAccounts];
};

export const formatFieldAmountChange = (value) => {
  const amount = (!value && parseInt(value) !== 0) ? '' :
    value.toString().replace(/([,.])+/g, '--');
  const expectedSeparator = Math.floor(amount.length / 3);
  const separator = ',';
  const separatorAmount = (amount.split(separator).length - 1);

  const regexRightFormat = /(\.)(?=(\d{3}))/g; // if id/en
  if (regexRightFormat.test(value) && expectedSeparator === separatorAmount) return value;
  else {
    const replaceRegex = /(\d)(?=(\d{3})+(?!\d))/g;
    const replaceValue = '$1' + separator;
    const returnValue = (!value && parseInt(value) !== 0) ? '' :
      value.toString().replace(replaceRegex, replaceValue);
    return returnValue;
  }
};

export const currencyFormatterChange =  (unformatted) => (
  !unformatted && parseInt(unformatted) !== 0) ? '--' : formatFieldAmountChange(Math.floor(unformatted));

export const generateAccountLabelSil = (accounts, payeeAccountNumber) => {
  const filteredAccount = filter(accounts, (acc) => acc.accountNumber !== payeeAccountNumber);
  const transformedAccounts = filteredAccount.map((acc) => {
    const display = `${acc.accountNumber || '--'} - ${acc.name || '--'} - ${acc.currency || '--'}`;
    return {
      ...acc,
      display
    };
  });
  return transformedAccounts;
};

export const removeCommaSIL = (string = '') =>
  replace(string, /,/g, '');



export const getAllAccountsExceptEmoney = (allAccounts = []) => {
  let filteredAccounts = [];
  allAccounts.forEach((account) => {
    const accountType = result(account, 'accountType', '');
    const currency = result(account, 'currency', '');
    const isEmoney = checkEmoney(accountType);

    if (!isEmoney
    && (accountType !== 'emoneyAccount')
    && (accountType !== 'Emoney Account')
    && (accountType !== 'UnknownAccount')
    && (accountType !== 'Virtual Account')
    && (currency !==  'AUD')
    && (currency !==  'SGD')
    && (currency !==  'USD')
    && (currency !==  'EUR')
    && (currency !==  'JPY')
    && (currency !==  'CNY')
    ) {
      filteredAccounts.push(account);
    }
  });
  return filteredAccounts;
};


export const checkEmoney = (accountType) => {
  const regex = /([99][0-9]{8})\w+/g;
  return regex.test(accountType);
};
export const generateProductName = (code) => {
  if (code === 'SADG') {
    return 'Simas Digi Savings';
  } else if (code === 'UCCI') {
    return 'Credit Card Indigo';
  } else if (code === 'UCCO') {
    return 'Credit Card Orami';
  } else if (code === 'UCCA') {
    return 'Credit Card Alfamart';
  } else if (code === 'UCCP') {
    return 'Credit Card Platinum';
  } else if (code === 'LoanKPR') {
    return 'Mortgage Loan';
  }
};

export const generateNewAccountLabel = (accounts, payeeAccountNumber) => {
  const filteredAccount = filter(accounts, (acc) => acc.accountNumber !== payeeAccountNumber);
  const transformedAccounts = filteredAccount.map((acc) => {
    const display = `${acc.accountNumber || '--'} - ${acc.productType || '--'} - ${acc.name || '--'}`;
    return {
      ...acc,
      display
    };
  });
  return transformedAccounts;
};

export const formatNpwp = (value) =>  {
  if (value) {
    value = value.replace(/[A-Za-z\W\s_]+/g, '');
    let split = 6;
    const dots = [];

    for (let i = 0, len = value.length; i < len; i += split) {
      split = i >= 2 && i <= 6 ? 3 : i >= 8 && i <= 12 ? 4 : 2;
      dots.push(value.substr(i, split));
    }

    const temp = dots.join('.');
    return temp.length > 12 ? `${temp.substr(0, 12)}-${temp.substr(12, 7)}` : temp;
  } else {
    return;
  }
};

export const getTaxList = (taxType) => {
  let finalData = [];
  forEach(taxType, (value) => {
    const label = result(value, 'label', '');
    const code = result(value, 'code', '');
    const needNpwp = result(value, 'npwpPenyetor', false);
    finalData = [...finalData, {'display': label, 'code': code, 'needNpwp': needNpwp}];
  });
  return finalData;
};

export const getJenisPajak = (taxType) => {
  let finalData = [];
  forEach(taxType, (value) => {
    const label = result(value, 'label', '');
    const code = result(value, 'code', '');
    const displayList = code + ' - ' + label;
    const needNpwp = result(value, 'npwpPenyetor', false);
    finalData = [...finalData, {'display': displayList, 'code': code, 'needNpwp': needNpwp}];
  });
  return finalData;
};

export const inNumber = (amountNumber) => {
  const bilangan = amountNumber;
  let kalimat = '';
  const angka   = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
  const kata    = new Array('', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan');
  const tingkat = new Array('', 'Ribu', 'Juta', 'Milyar', 'Triliun');
  const panjang_bilangan = bilangan.length;

  /* pengujian panjang bilangan */
  if (panjang_bilangan > 15) {
    kalimat = 'Diluar Batas';
  } else {
      /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
    for (i = 1; i <= panjang_bilangan; i++) {
      angka[i] = bilangan.substr(-(i), 1);
    }

    let i = 1;
    let j = 0;

      /* mulai proses iterasi terhadap array angka */
    while (i <= panjang_bilangan) {
      let subkalimat = '';
      let kata1 = '';
      let kata2 = '';
      let kata3 = '';

          /* untuk Ratusan */
      if (angka[i + 2] !== '0') {
        if (angka[i + 2] === '1') {
          kata1 = 'Seratus';
        } else {
          kata1 = kata[angka[i + 2]] + ' Ratus';
        }
      }

          /* untuk Puluhan atau Belasan */
      if (angka[i + 1] !== '0') {
        if (angka[i + 1] === '1') {
          if (angka[i] === '0') {
            kata2 = 'Sepuluh';
          } else if (angka[i] === '1') {
            kata2 = 'Sebelas';
          } else {
            kata2 = kata[angka[i]] + ' Belas';
          }
        } else {
          kata2 = kata[angka[i + 1]] + ' Puluh';
        }
      }

          /* untuk Satuan */
      if (angka[i] !== '0') {
        if (angka[i + 1] !== '1') {
          kata3 = kata[angka[i]];
        }
      }

          /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
      if ((angka[i] !== '0') || (angka[i + 1] !== '0') || (angka[i + 2] !== '0')) {
        subkalimat = kata1 + ' ' + kata2 + ' ' + kata3 + ' ' + tingkat[j] + ' ';
      }

          /* gabungkan variabe sub kalimat (untuk Satu blok 3 angka) ke variabel kalimat */
      kalimat = subkalimat + kalimat;
      i = i + 3;
      j = j + 1;
    }

      /* mengganti Satu Ribu jadi Seribu jika diperlukan */
    if ((angka[5] === '0') && (angka[6] === '0')) {
      kalimat = kalimat.replace('Satu Ribu', 'Seribu');
    }
  }
  return kalimat;
};

export const generateCurrencyRemittance = (valueList) => {
  const filteredCurrency = filter(valueList, (val) => val.code !== null);
  const transformedCurrency = filteredCurrency.map((val) => {
    const display = `${val.code || '--'} - ${val.description || '--'}`;
    return {
      ...val,
      display
    };
  });
  return transformedCurrency;
};

export const generatePurposeRemittance = (valueList) => {
  const filteredPurpose = reverse(filter(valueList, (val) => val.code !== null));
  const transformedPurpose = filteredPurpose.map((val) => {
    const display = `${val.description || '--'}`;
    return {
      ...val,
      display
    };
  });
  const filteredList = sortBy(transformedPurpose, 'description');
  return filteredList;
};

export const getTransferPossibleAccountsRemittance = (accounts = [], transType, targetAccount = {}) => {
  const regexTransType = new RegExp(transType, 'i');
  const isPossibleAccount = (account) => regexTransType.test(result(account, 'allowFlag', '').toLowerCase());
  const filteredAcc = accounts.filter(isPossibleAccount);
  const emoneyAccount = find(accounts, {accountType: 'emoneyAccount'}) || {};
  const payeeAcccount = find(accounts, {accountNumber: result(targetAccount, 'accountNumber', '')}) || {};
  const removedAccount = isEmpty(payeeAcccount) ? filteredAcc : filter(filteredAcc, (acc) => acc.accountNumber !== payeeAcccount.accountNumber);
  const currency = result(targetAccount, 'currency', '');
  const currencyAccountMulti =  filter(removedAccount, (acc) => acc.currency === 'IDR' || acc.currency === 'EUR' || acc.currency === 'JPY' || acc.currency === 'CNY' || acc.currency === 'AUD' || acc.currency === 'SGD' || acc.currency === 'NZD' || acc.currency === 'USD');
  const groupedCurrencyAccountsMulti = groupBy(currencyAccountMulti, (account) => (result(account, 'accountType', '').toLowerCase()));
  if (isEmpty(emoneyAccount)) {
    const savingAccounts = result(groupedCurrencyAccountsMulti, 'savingaccount', []);
    const currentAccounts = result(groupedCurrencyAccountsMulti, 'currentaccount', []);
    return [...savingAccounts, ...currentAccounts];
  } else  if (currency !== 'IDR' && !isEmpty(currency)) {
    const savingAccounts = result(groupedCurrencyAccountsMulti, 'savingaccount', []);
    const currentAccounts = result(groupedCurrencyAccountsMulti, 'currentaccount', []);
    return [...savingAccounts, ...currentAccounts];
  } else {
    const savingAccounts = result(groupedCurrencyAccountsMulti, 'savingaccount', []);
    const currentAccounts = result(groupedCurrencyAccountsMulti, 'currentaccount', []);
    return [...savingAccounts, ...currentAccounts];
  }
};

export const sortPayeesRemittance = (payees) => sortBy(payees, (p) => lowerCase(p.receiverName));

export const getSavingValasPossibleAccounts = (accounts = [], transType, targetAccount = {}) => {
  const regexTransType = new RegExp(transType, 'i');
  const isPossibleAccount = (account) => regexTransType.test(result(account, 'allowFlag', '').toLowerCase());
  const filteredAcc = accounts.filter(isPossibleAccount);
  const emoneyAccount = find(accounts, {accountType: 'emoneyAccount'}) || {};
  const payeeAcccount = find(accounts, {accountNumber: result(targetAccount, 'accountNumber', '')}) || {};
  const removedAccount = isEmpty(payeeAcccount) ? filteredAcc : filter(filteredAcc, (acc) => acc.accountNumber !== payeeAcccount.accountNumber);

  const groupedAccounts = groupBy(removedAccount, (account) => (result(account, 'accountType', '').toLowerCase()));
  if (isEmpty(emoneyAccount)) {
    const savingAccounts = result(groupedAccounts, 'savingaccount', []);
    const currentAccounts = result(groupedAccounts, 'currentaccount', []);
    return [...savingAccounts, ...currentAccounts];
  } else {
    const savingAccounts = result(groupedAccounts, 'savingaccount', []);
    const currentAccounts = result(groupedAccounts, 'currentaccount', []);
    return [emoneyAccount, ...savingAccounts, ...currentAccounts];
  }
};

export const getAllAccountsExceptSavingValas = (allAccounts = [], currencySavingValas) => {
  let filteredAccounts = [];
  allAccounts.forEach((account) => {
    const currencyValas = currencySavingValas;
    const currencyAccount = result(account, 'currency', '');

    if (currencyValas === 'USD' && (currencyAccount === 'IDR' || currencyAccount === currencyValas)) {
      filteredAccounts.push(account);
    } else if (currencyValas === 'AUD' && (currencyAccount === 'IDR' || currencyAccount === currencyValas)) {
      filteredAccounts.push(account);
    } else if (currencyValas === 'CNY' && (currencyAccount === 'IDR' || currencyAccount === currencyValas)) {
      filteredAccounts.push(account);
    } else if (currencyValas === 'EUR' && (currencyAccount === 'IDR' || currencyAccount === currencyValas)) {
      filteredAccounts.push(account);
    } else if (currencyValas === 'SGD' && (currencyAccount === 'IDR' || currencyAccount === currencyValas)) {
      filteredAccounts.push(account);
    } else if (currencyValas === 'NZD' && (currencyAccount === 'IDR' || currencyAccount === currencyValas)) {
      filteredAccounts.push(account);
    }
  });
  return filteredAccounts;
};

export const removeNonAscii = (string = '') => {
  const regex = /[^\x00-\x7F]/g;
  return string.toString().replace(regex, '');
};

export const generatePayeeSetLimit = (payeeAccount, myAccount) => ({
  payeeAccount,
  myAccount
});

export const generatePayeeFromSetLimit = (name, accountNumber, accountType, bank, currency, id, targetType, transferType) => ({
  name,
  accountNumber,
  accountType,
  bank,
  currency,
  id,
  targetType,
  transferType,
  'modeFlag': null,
});


export const generatePayeeOnPage = (payeeNumber, payeeName, payeeBank, payeeCurrency, payeeType, targetAccName, targetAccNo, idTa, foundPayee) => ({
  'id': idTa,
  'accountNumber': payeeNumber,
  'name': payeeName,
  payeeBank, // is not present in already existing payee
  transferType: 'inbank',
  'currency': payeeCurrency,
  'modeFlag': null,
  'isNewPayee': true, // This will be used to differentiate between new and existing payee
  payeeType,
  targetAccName,
  targetAccNo,
  foundPayee,
});
export const filterObjectsRemittance = (listOfObjects = [], searchString = '') => {
  const lowerCaseSearchString = lowerCase(searchString);
  let valueList = {};
  if (searchString) {
    return filter(listOfObjects, (item) => {
      valueList = {...valueList, receiverName: item.receiverName, accountNumber: item.creditAccountNumber};
      return !!find(valueList, (value) => (lowerCase(value).includes(lowerCaseSearchString)));
    });
  }
  return listOfObjects;
};

export const generateRadioOptionFilterRecord = (filterStarDate, filterEndDate) => {
  const currentDate = new Date();
  const filterToday = moment(currentDate).format('D MMMM YYYY');
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  const lastWeek = new Date(year, month, day - 7);
  const filterLast7Days = moment(lastWeek).format('D MMMM YYYY') + ' - ' + moment(currentDate).format('D MMMM YYYY');
  const lastMonth = new Date(year, month, day - 30);
  const filterLast30Days = moment(lastMonth).format('D MMMM YYYY') + ' - ' + moment(currentDate).format('D MMMM YYYY');
  const firstDay = new Date(year, month, 1);
  const filterThisMonth = moment(firstDay).format('D MMMM YYYY') + ' - ' + moment(currentDate).format('D MMMM YYYY');
  const customDate = filterStarDate + ' - ' + filterEndDate;
  const radioOptions = [
    {
      label: language.MGM__FILTER_DATE_TODAY,
      value: 'today',
      sublabel: filterToday,
    }, {
      label: language.MGM__FILTER_DATE_LAST_7DAYS,
      value: 'last7days',
      sublabel: filterLast7Days,
    }, {
      label: language.MGM__FILTER_DATE_LAST_30DAYS,
      value: 'last30days',
      sublabel: filterLast30Days,
    }, {
      label: language.MGM__FILTER_DATE_THIS_MONTH,
      value: 'thisMonth',
      sublabel: filterThisMonth,
    }, {
      label: language.MGM__FILTER_DATE_CUSTOM,
      value: 'custom',
      sublabel: customDate,
    }];
  return radioOptions;
};

export const getTransferPossibleAccountsStarInvestama = (accounts = [], transType, targetAccount = {}, currency, iscrossCurrency) => {
  const regexTransType = new RegExp(transType, 'i');
  const isPossibleAccount = (account) => {
    if (iscrossCurrency) {
      return (result(account, 'currency', '').toUpperCase() === 'USD' || result(account, 'currency', '').toUpperCase() === 'IDR') && !(startsWith(result(account, 'accountNumber', ''), '99') && result(account, 'accountNumber', '').length === 10) && regexTransType.test(result(account, 'allowFlag', '').toLowerCase());
    } else {
      return result(account, 'currency', '').toUpperCase() === currency && regexTransType.test(result(account, 'allowFlag', '').toLowerCase()) && !(startsWith(result(account, 'accountNumber', ''), '99') && result(account, 'accountNumber', '').length === 10);
    }
  };
  const filteredAcc = accounts.filter(isPossibleAccount);
  const payeeAcccount = find(accounts, {accountNumber: result(targetAccount, 'accountNumber', '')}) || {};

  const removedAccount = isEmpty(payeeAcccount) ? filteredAcc : filter(filteredAcc, (acc) => acc.accountNumber !== payeeAcccount.accountNumber);
  const groupedAccounts = groupBy(removedAccount, (account) => (result(account, 'accountType', '').toLowerCase()));
  const savingAccounts = result(groupedAccounts, 'savingaccount', []);
  const currentAccounts = result(groupedAccounts, 'currentaccount', []);
  return [...savingAccounts, ...currentAccounts];
};

export const generateSILProduct = (code) => {
  if (code === 'SIL-IDR') {
    return 'Smart Investa Link (IDR)';
  } else if (code === 'SIL-USD') {
    return 'Simas Investa Link (USD)';
  }
};

export const  dateList = [
  {label: '1', value: '01'}, {label: '2', value: '02'}, {label: '3', value: '03'}, {label: '4', value: '04'},
  {label: '5', value: '05'}, {label: '6', value: '06'}, {label: '7', value: '07'}, {label: '8', value: '08'},
  {label: '9', value: '09'}, {label: '10', value: '10'}, {label: '11', value: '11'}, {label: '12', value: '12'},
  {label: '13', value: '13'}, {label: '14', value: '14'}, {label: '15', value: '15'}, {label: '16', value: '16'},
  {label: '17', value: '17'}, {label: '18', value: '18'}, {label: '19', value: '19'}, {label: '20', value: '20'},
  {label: '21', value: '21'}, {label: '22', value: '22'}, {label: '23', value: '23'}, {label: '24', value: '24'},
  {label: '25', value: '26'}, {label: '27', value: '27'}, {label: '28', value: '28'}, {label: '29', value: '29'},
  {label: '30', value: '30'}, {label: '31', value: '31'},
];

export const formatDetailsShopeepay = (rawBillMetadataArray = []) => {
  const formatted = {};
  rawBillMetadataArray.forEach((eachDetail) => {
    if (!isEmpty(eachDetail['0']) && !isEmpty(eachDetail['0'])) {
      const value = lowerCase(eachDetail['0']);
      const k = lowerCase(eachDetail['1']);
      if (value) {
        formatted[capitalize(k)] = capitalize(value);
      }
    } else if (!isEmpty(eachDetail['0']) && isEmpty(eachDetail['0'])) {
      const k = lowerCase(eachDetail['1']);
      formatted[capitalize(k)] = '';
    }
  });
  return formatted;
};

export const getEtaxYear = (length) => {
  let yearList = [];
  for (let i = 0; i <= length; i++) {
    const date = new Date().getFullYear();
    const subsDate = date - i;
    yearList += subsDate;
  }
  return yearList;
};

export const transformYearFormat = (years) => {
  let finalData = [];
  forEach(years, (value, key) => {
    finalData = [...finalData, {'label': value, 'code': key}];
  });
  return finalData;
};

export const etaxMonthRange = (lang, dateCode = '') => {
  const monthList = [
    {'label': lang === 'id' ? 'Januari' : 'January', 'code': '01'},
    {'label': lang === 'id' ? 'Februari' : 'February', 'code': '02'},
    {'label': lang === 'id' ? 'Maret' : 'March', 'code': '03'},
    {'label': lang === 'id' ? 'April' : 'April', 'code': '04'},
    {'label': lang === 'id' ? 'Mei' : 'May', 'code': '05'},
    {'label': lang === 'id' ? 'Juni' : 'June', 'code': '06'},
    {'label': lang === 'id' ? 'Juli' : 'July', 'code': '07'},
    {'label': lang === 'id' ? 'Agustus' : 'August', 'code': '08'},
    {'label': lang === 'id' ? 'September' : 'September', 'code': '09'},
    {'label': lang === 'id' ? 'Oktober' : 'October', 'code': '10'},
    {'label': lang === 'id' ? 'November' : 'November', 'code': '11'},
    {'label': lang === 'id' ? 'Desember' : 'December', 'code': '12'},
  ];
  const filteredMonth = dateCode !== '' ? find(monthList, {'code': dateCode}) : monthList;
  return filteredMonth;
};

export const generateLocation = (ccCheckpointData) => {
  let addressList = [];
  let radioOptions = [];
  ccCheckpointData.forEach((data) => {
    const address = result(data, 'address', '');
    const country = result(data, 'country', '') === 'ID' ? 'Indonesia' : '';
    const postcode = result(data, 'postCode', '');
    const subDistrict = result(data, 'subDistrict', '');
    const town = result(data, 'town', '');
    const type = result(data, 'type', '');
    const label = type === 'O' ? language.CREDITCARD__WORK_ADDRESS : type === 'H' ? language.CREDITCARD__CURRENT_ADDRESS : language.TAB_TITLE_LANDING__OTHERS;
    const ktpAddress = address + '\n' +
    subDistrict + town + '\n' +
    postcode + '\n' +
    country;
    addressList = {label: label, sublabel: ktpAddress, type: type};
    radioOptions.push(addressList);
  });
  return radioOptions;
};

// export const ccAccountNumber = (accNo = '') => accNo.substring(0, 4) + ' ' + accNo.substring(4, 8) + ' ' + accNo.substring(8, 12) + ' ' + accNo.substring(12, accNo.length);

export const getTransferPossibleAccountsWithCC = (accounts = [], transType, targetAccount = {}) => {
  const regexTransType = new RegExp(transType, 'i');
  const isPossibleAccount = (account) => regexTransType.test(result(account, 'allowFlag', '').toLowerCase());
  const filteredAcc = accounts.filter(isPossibleAccount);
  const emoneyAccount = find(accounts, {accountType: 'emoneyAccount'}) || {};
  const ccAccounts = filter(accounts, {accountType: 'CreditCardAccount'}) || {};
  const vccAccounts = filter(accounts, {accountType: 'VirtualCreditCardAccount'}) || {};
  const payeeAcccount = find(accounts, {accountNumber: result(targetAccount, 'accountNumber', '')}) || {};
  const removedAccount = isEmpty(payeeAcccount) ? filteredAcc : filter(filteredAcc, (acc) => acc.accountNumber !== payeeAcccount.accountNumber);
  // const groupedAccounts = groupBy(removedAccount, (account) => (result(account, 'accountType', '').toLowerCase()));
  const currency = result(targetAccount, 'currency', '');
  const currencyAccountSingle =  filter(removedAccount, (acc) => acc.currency === currency || acc.currency === 'IDR');
  const groupedCurrencyAccountsSingle = groupBy(currencyAccountSingle, (account) => (result(account, 'accountType', '').toLowerCase()));
  // const currencyAccountMulti = filter(removedAccount, (acc) => acc.currency === 'USD' || acc.currency === 'IDR' || acc.currency === currency);
  // const groupedCurrencyAccountsMulti = groupBy(currencyAccountMulti, (account) => (result(account, 'accountType', '').toLowerCase()));

  if (isEmpty(emoneyAccount) && isEmpty(ccAccounts)) {
    const savingAccounts = result(groupedCurrencyAccountsSingle, 'savingaccount', []);
    const currentAccounts = result(groupedCurrencyAccountsSingle, 'currentaccount', []);
    // const currentAccounts = result(groupedCurrencyAccountsSingle, 'currentaccount', []);
    return [...savingAccounts, ...currentAccounts, ...vccAccounts];
  } else if (currency !== 'IDR' && !isEmpty(currency)) {
    const savingAccounts = result(groupedCurrencyAccountsSingle, 'savingaccount', []);
    const currentAccounts = result(groupedCurrencyAccountsSingle, 'currentaccount', []);
    return [...savingAccounts, ...currentAccounts];
  } else if (isEmpty(emoneyAccount)) {
    const savingAccounts = result(groupedCurrencyAccountsSingle, 'savingaccount', []);
    const currentAccounts = result(groupedCurrencyAccountsSingle, 'currentaccount', []);
    return [...savingAccounts, ...currentAccounts, ...ccAccounts, ...vccAccounts];
  } else if (isEmpty(ccAccounts)) {
    const savingAccounts = result(groupedCurrencyAccountsSingle, 'savingaccount', []);
    const currentAccounts = result(groupedCurrencyAccountsSingle, 'currentaccount', []);
    return [emoneyAccount, ...savingAccounts, ...currentAccounts, ...vccAccounts];
  }   else {
    const savingAccounts = result(groupedCurrencyAccountsSingle, 'savingaccount', []);
    const currentAccounts = result(groupedCurrencyAccountsSingle, 'currentaccount', []);
    return [emoneyAccount, ...savingAccounts, ...currentAccounts, ...ccAccounts, ...vccAccounts];
  }
};

export const getTransferPossibleAccountsBIFast = (accounts = [], transType, targetAccount = {}) => {
  const regexTransType = new RegExp(transType, 'i');
  const isPossibleAccount = (account) => regexTransType.test(result(account, 'allowFlag', '').toLowerCase()) && !(startsWith(result(account, 'accountNumber', ''), '99') && result(account, 'accountNumber', '').length === 10);
  const filteredAcc = accounts.filter(isPossibleAccount);
  const payeeAcccount = find(accounts, {accountNumber: result(targetAccount, 'accountNumber', '')}) || {};
  const removedAccount = isEmpty(payeeAcccount) ? filteredAcc : filter(filteredAcc, (acc) => acc.accountNumber !== payeeAcccount.accountNumber);
  const groupedAccounts = groupBy(removedAccount, (account) => (result(account, 'accountType', '').toLowerCase()));
  const savingAccounts = result(groupedAccounts, 'savingaccount', []);
  const currentAccounts = result(groupedAccounts, 'currentaccount', []);
  return [...savingAccounts, ...currentAccounts];
};

export const dataArrayMagnaLink = (dataMagnaLink = []) => {
  let listMagnaLink = [];
  forEach(dataMagnaLink, (value) => {
    let polisType = 'Data Magna Link';
    let polisName = 'Simas Magna Link';
    let dataValue = {value, polisType, polisName};
    listMagnaLink = [...listMagnaLink, dataValue];
  });

  return listMagnaLink;
};

export const dataArrayPrimeLink = (dataPrimeLink = []) => {
  let listPrimeLink = [];
  forEach(dataPrimeLink, (value) => {
    let polisType = 'Data Prime Link';
    let polisName = 'Simas Prime Link';
    let dataValue = {value, polisType, polisName};
    listPrimeLink = [...listPrimeLink, dataValue];
  });

  return listPrimeLink;
};

export const generateNoPolis = (data) => {
  const transformedAccounts = data.map((acc) => {
    const display = `${acc.value.NoPolis || '--'}`;
    return {
      ...acc,
      display
    };
  });
  return transformedAccounts;
};

export const dataProduct = (isNonKyc, hideMGMon) => {
  const radioOptions = [
    {
      product: isNonKyc ? 'sa' : 'cc',
      image: isNonKyc ? productSaving : productCC,
    }, {
      product: isNonKyc ? 'cc' : 'sa',
      image: isNonKyc ? productCC : productSaving,
    }, {
      product: 'loan',
      image: productLoan,
    }, {
      product: isNonKyc ? 'td' : 'insurance',
      image: isNonKyc ? productTD : productInsurance,
    }, {
      product: isNonKyc ? 'insurance' : 'td',
      image: isNonKyc ? productInsurance : productTD,
    }, {
      product: 'exrate',
      image: productExRate,
    },  {
      product: 'mgm',
      image: productRefer,
    }, {
      product: 'splitbill',
      image: productSplitBill,
    }];
  const radioOptionsNonflagMgmOn = [
    {
      product: isNonKyc ? 'sa' : 'cc',
      image: isNonKyc ? productSaving : productCC,
    }, {
      product: isNonKyc ? 'cc' : 'sa',
      image: isNonKyc ? productCC : productSaving,
    }, {
      product: 'loan',
      image: productLoan,
    }, {
      product: isNonKyc ? 'td' : 'insurance',
      image: isNonKyc ? productTD : productInsurance,
    }, {
      product: isNonKyc ? 'insurance' : 'td',
      image: isNonKyc ? productInsurance : productTD,
    }, {
      product: 'exrate',
      image: productExRate,
    }, {
      product: 'splitbill',
      image: productSplitBill,
    }];
  return hideMGMon ? radioOptionsNonflagMgmOn : radioOptions;
};

export const getPPAUrl = (ipassport, getOrderNo) => {
  const url = env.URL + '/pdf-ppa-get?ipassport=' + encodeURIComponent(ipassport) + '&orderNo=' + getOrderNo;
  return url;
};

export const getMaskingAccount = (value) => {
  const account = result(value, 'accountNumber', '');
  const lengthAccount = account.length;
  const subststring = account.substring(lengthAccount - 4, lengthAccount);
  const selectionAcc = omit(value, ['accountNumber']);
  let x = 0;
  let maskingString = '';
  while (x < lengthAccount - 4) {
    maskingString = maskingString + 'x';
    x = x + 1;
  }
  return ({
    ...selectionAcc,
    accountNumber: maskingString +  subststring
  });

};

export const transformEmptyData = (string = '') => {
  if (string) {
    return string;
  } else {
    return '--';
  }
};

export const getAllAccountsExceptGiro = (listAccTypeCode, allAccounts = [], transType) => {
  let filteredAccounts = [];
  const regexTransType = new RegExp(transType, 'i');

  const isPossibleAccount = (account) => {
    const accountNumber = result(account, 'accountNumber', '');
    const isSyaria = checkSyaria(accountNumber);
    const accountType = result(account, 'accountType', '');
    const accountTypeCode = result(account, 'accountTypeCode', '');
    const noEmoney = accountTypeCode !== '3808';

    if (!isSyaria  && accountType !== 'StarPoinAccount' && noEmoney) {
      return filteredAccounts.push(account) && regexTransType.test(result(account, 'allowFlag', '').toLowerCase());
    }
  };

  const filteredAcc = allAccounts.filter(isPossibleAccount);
  const filteredTypeCode = filter(filteredAcc, (x) => !listAccTypeCode.includes(x.accountTypeCode));
  return filteredTypeCode;
};


export const getTransferPossibleAccountsNoGiro = (listAccTypeCode, accounts = [], transType, chosenAccount) => {
  let accountFiltered = [];
  const regexTransType = new RegExp(transType, 'i');
  const isPossibleAccount = (account) => {
    const accountNumber = result(account, 'accountNumber', '');
    const accountType = result(account, 'accountType', '');
    const isSyaria = checkSyaria(accountNumber);

    if (accountNumber !== chosenAccount && !isSyaria && accountType !== 'StarPoinAccount') {
      return accountFiltered.push(account) && regexTransType.test(result(account, 'allowFlag', '').toLowerCase());
    }
  };

  const filteredAcc = accounts.filter(isPossibleAccount);
  const filteredTypeCode = filter(filteredAcc, (acc) => !listAccTypeCode.includes(acc.accountTypeCode));
  const filteredAccCurrency = filter(filteredTypeCode, (acc) => !listAccTypeCode.includes(acc.currency));
  return filteredAccCurrency;
};


export const getTransferPossibleAccountsRemittanceClosing = (accounts = [], transType, chosenAccount, chosenCurrency, targetAccount = {}) => {
  const regexTransType = new RegExp(transType, 'i');
  let accountFiltered = [];
  const isPossibleAccount = (account) => {
    const accountNumber = result(account, 'accountNumber', '');
    if (accountNumber !== chosenAccount) {
      return accountFiltered.push(account) && regexTransType.test(result(account, 'allowFlag', '').toLowerCase());
    }
  };

  const filteredAcc = accounts.filter(isPossibleAccount);
  const payeeAcccount = find(accounts, {accountNumber: result(targetAccount, 'accountNumber', '')}) || {};
  const removedAccount = isEmpty(payeeAcccount) ? filteredAcc : filter(filteredAcc, (acc) => acc.accountNumber !== payeeAcccount.accountNumber);
  const currencyAccountMulti =  filter(removedAccount, (acc) => acc.currency === chosenCurrency);
  const groupedCurrencyAccountsMulti = groupBy(currencyAccountMulti, (account) => (result(account, 'accountType', '').toLowerCase()));

  const savingAccounts = result(groupedCurrencyAccountsMulti, 'savingaccount', []);
  const currentAccounts = result(groupedCurrencyAccountsMulti, 'currentaccount', []);
  return [...savingAccounts, ...currentAccounts];
};
