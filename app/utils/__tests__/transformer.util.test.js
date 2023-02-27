/* eslint-disable */;
import React from 'react';
import * as Utils from '../transformer.util';
import set from 'lodash/set';
import dummyNavigationState from './mockdata/router.testdata.json';
import moment from 'moment';
import {language} from '../../config/language';
import * as env from '../../config/env.config';
import creditCardPlatinum from '../../assets/images/credit-card-platinum.png';
import creditCardGold from '../../assets/images/credit-card-gold.png';
import creditCardSilver from '../../assets/images/credit-card-silver.png';
import creditCardIndigo from '../../assets/images/credit-card-indigo.png';
import airAsia from '../../assets/images/air-asia.png';
import batikAir from '../../assets/images/batik-air.png';
import citilink from '../../assets/images/citilink.png';
import garuda from '../../assets/images/garuda-indonesia.png';
import jetstar from '../../assets/images/jetstar.png';
import jnam from '../../assets/images/jnam.png';
import kalstar from '../../assets/images/kalstar-aviation.png';
import multiFlight from '../../assets/images/multi-flight.png';
import sriwijayaAir from '../../assets/images/sriwijaya-air.png';
import wingsAir from '../../assets/images/wings-air.png';
import lionAir from '../../assets/images/lion-air.png';
jest.mock('../../config/appConstants.config');

describe('Transformer Utility', () => {
  const dummytrans = [{
    consumerNo: '12',
    areaCode: '2005'
  }, {
    consumerNo: '12',
    areaCode: '205'
  }, {
    consumerNo: '13',
    areaCode: '223'
  }];
  Object.freeze(dummytrans);
  it('Should return unique reversed transactions, last trans first', () => {
    const expected = [{
      consumerNo: '13',
      areaCode: '223'
    }, {
      consumerNo: '12',
      areaCode: '205'
    }];
    expect(Utils.getFrequentPayments(dummytrans, 'consumerNo')).toEqual(expected);
  });
  it('Should return last three unique transactions', () => {
    const payload = [...dummytrans, {
      consumerNo: '14',
      areaCode: '2005'
    }, {
      consumerNo: '16',
      areaCode: '2005'
    }, {
      consumerNo: '19',
      areaCode: '2005'
    }];
    expect(Utils.getFrequentPayments(payload, 'consumerNo').length).toBe(3);
  });
  it('Reducer: should update balances', () => {
    const payload = {consumerNo: '13', billAmount: 1232};
    const expected = [{
      consumerNo: '12',
      areaCode: '2005'
    }, {
      consumerNo: '12',
      areaCode: '205'
    }, {
      consumerNo: '13',
      areaCode: '223',
      billAmount: 1232
    }];
    expect(Utils.updateBillAmount(dummytrans, payload, 'consumerNo')).toEqual(expected);
  });
  it('Should return new label format and filter same payeeAccountNumber', () => {
    const accounts = [{
      accountNumber: '14',
      name: 'name 1',
      productType: 'test 1'
    }, {
      accountNumber: '16',
      name: 'name 2',
      productType: 'test 2'
    }, {
      accountNumber: '19',
      name: 'name 3',
      productType: 'test 3'
    }];
    const payeeAccountNumber = '14';
    const expected = [{
      accountNumber: '16',
      name: 'name 2',
      productType: 'test 2',
      display: '16 • test 2 • name 2'
    }, {
      accountNumber: '19',
      name: 'name 3',
      productType: 'test 3',
      display: '19 • test 3 • name 3'
    }];
    expect(Utils.generateAccountLabel(accounts, payeeAccountNumber)).toEqual(expected);

  });
  it('Should return new label format', () => {
    const accounts = [{
      accountNumber: '14',
      name: 'name 1',
      productType: 'test 1'
    }, {
      accountNumber: '16',
      name: 'name 2',
      productType: 'test 2'
    }, {
      accountNumber: '19',
      name: 'name 3',
      productType: 'test 3'
    }];
    const expected = [{'accountNumber': '14',
      'productType': 'test 1',
      'display': '14 • test 1 • name 1',
      'name': 'name 1'},
    {'accountNumber': '16',
      'productType': 'test 2',
      'display': '16 • test 2 • name 2',
      'name': 'name 2'},
    {'accountNumber': '19',
      'productType': 'test 3',
      'display': '19 • test 3 • name 3',
      'name': 'name 3'}];
    expect(Utils.generateAccountLabel(accounts)).toEqual(expected);
    expect(Utils.generateAccountLabel({})).toEqual([]);
  });

  it('normalisePhoneNumber: Should normalise phone no and add 62', () => {
    expect(Utils.normalisePhoneNumber('+62813232323')).toEqual('62813232323');
    expect(Utils.normalisePhoneNumber('0813232323')).toEqual('62813232323');
    expect(Utils.normalisePhoneNumber('813232323')).toEqual('62813232323');
    expect(Utils.normalisePhoneNumber('62813232323')).toEqual('62813232323');
    expect(Utils.normalisePhoneNumber('someUsername')).toEqual('someUsername');
    expect(Utils.normalisePhoneNumber(undefined)).toBeUndefined();
    expect(Utils.normalisePhoneNumber(null)).toBeUndefined();
    expect(Utils.normalisePhoneNumber(1232132)).toEqual('1232132');
  });

  it('isEasyPinTransaction: should accept config and amount ad return if the transaction should trigger easypin or not', () => {
    const transConfig = [{
      'token_id': '3',
      'token_type': 'Easy Pin',
      'rank': '5',
      'min_amount': '0',
      'max_amount': '1234'
    }, {
      'token_id': '0',
      'token_type': 'SMS OTP',
      'rank': '4',
      'min_amount': '5000000',
      'max_amount': '25000000'
    }];
    expect(Utils.isEasyPinTransaction(1234, transConfig)).toEqual(true);
    expect(Utils.isEasyPinTransaction(1000, transConfig)).toEqual(true);
    expect(Utils.isEasyPinTransaction('1000', transConfig)).toEqual(true);
    expect(Utils.isEasyPinTransaction(12345, transConfig)).toEqual(false);
    expect(Utils.isEasyPinTransaction(12345, undefined)).toEqual(false);
  });
  it('isLockedDevice: Should accept appInitKeys and return device lock status', () => {
    expect(Utils.isLockedDevice({username: 'johndoe', tokenClient: '2432324cfds', tokenServer: 'hjkg234t32g4u324'})).toBe(true);
    expect(Utils.isLockedDevice({tokenClient: '2432324cfds', tokenServer: 'hjkg234t32g4u324'})).toBe(false);
    expect(Utils.isLockedDevice({})).toBe(false);
    expect(Utils.isLockedDevice(undefined)).toBe(false);
    expect(Utils.isLockedDevice(null)).toBe(false);
  });
  it('getAllOffersExcept: returns all offers expect the one which is passed in the first arg', () => {
    const clickedOffer = {a: 3, offerID: 'test'};
    const allOffers = [{a: 3, offerID: 'test'}, {a: 5, offerID: 'abc'}, {a: 6, offerID: 'xyz'}];
    const expected = [{a: 5, offerID: 'abc'}, {a: 6, offerID: 'xyz'}];
    expect(Utils.getAllOffersExcept(clickedOffer, allOffers)).toEqual(expected);
    expect(Utils.getAllOffersExcept(undefined, undefined)).toEqual([]);
    expect(Utils.getAllOffersExcept(clickedOffer, undefined)).toEqual([]);
    expect(Utils.getAllOffersExcept(undefined, allOffers)).toEqual(allOffers);
    expect(Utils.getAllOffersExcept({a: 3, offerID: 'testa'}, allOffers)).toEqual(allOffers);
  });
});

describe('General Utils', () => {
  it('wrapObjectInFunction: wraps a object in function', () => {
    const test = {
      a: 1
    };
    const testOutput = Utils.wrapObjectInFunction(test);
    expect(typeof testOutput).toBe('function');
    expect(testOutput().a).toBe(1);
  });
  it('wrapMethodInFunction: wraps a method in function', () => {
    const test = jest.fn();
    const testOutput = Utils.wrapMethodInFunction(test);
    expect(typeof testOutput).toBe('function');
    testOutput();
    expect(test).toBeCalled();
  });
  it('findInArray: finds an object in the passed array of objects with passed key and value as parameters', () => {
    const dummyArray = [{name: 'john', somKey: 'xyz'}, {name: 'doe', somKey: 'abc'}];
    expect(Utils.findInArray(dummyArray, 'name', 'john')).toEqual({name: 'john', somKey: 'xyz'});
  });
  it('getFilteredBillerData: get filtered biller data based on passed billerConfig and type', () => {
    const billerConfig = {
      billerAllowList: [{
        listOfBiller: [111, 222],
        name: 'TOPUP'
      }],
      billerAllowListRevamp: [{
        listOfBiller: [111, 222],
        name: 'TOPUP'
      }],
      billerList: [{
        billerPreferences: {
          code: 111,
          somKey: 'someVal'
        }
      }, {
        billerPreferences: {
          code: 222,
          somKey: 'lorem'
        }
      }, {
        billerPreferences: {
          code: 333,
          somKey: 'ipsum'
        }
      }]
    };
    const expectedResult = [{
      billerPreferences: {
        code: 111,
        somKey: 'someVal'
      }
    }, {
      billerPreferences: {
        code: 222,
        somKey: 'lorem'
      }
    }];

    expect(Utils.getFilteredBillerData(billerConfig, 'TOPUP')).toEqual(expectedResult);
  });
  it('getBillerForMobile: get biller data for mobile no', () => {
    const billerData = [{
      prefix: '^(815|816|855|856|857|858|0815|0816|0855|0856|0857|0858)',
      id: 0
    }, {
      prefix: '^(811|812|813|821|822|852|853|851|0811|0812|0813|0821|0822|0852|0853|0851)',
      id: 1
    }];

    expect(Utils.getBillerForMobile(billerData, '8153445432432')).toEqual(billerData[0]);
    expect(Utils.getBillerForMobile(billerData, '8113445432432')).toEqual(billerData[1]);
  });
  it('Should return accounts by accountType', () => {
    const accounts = [{
      accountNumber: '0002838796',
      accountType: 'SavingAccount',
      currency: 'IDR'
    }, {
      accountNumber: '0002838797',
      accountType: 'SavingAccount',
      currency: 'IDR'
    },
    {
      accountNumber: '0002838798',
      accountType: 'SavingAccount',
      currency: 'SGD'
    }, {
      accountNumber: '3243243243',
      accountType: 'CurrentAccount',
      currency: 'IDR'
    }, {
      accountNumber: '0002838792',
      accountType: 'CurrentAccount',
      currency: 'SGD'
    }, {
      accountNumber: '0002838790',
      accountType: 'TimeDepositAccount',
      currency: 'IDR'
    }, {
      accountNumber: '4320291239122912',
      accountType: 'CreditCardAccount',
      currency: 'IDR'
    }, {
      accountNumber: '0001234556',
      accountType: 'Rekening Dana Nasabah (RDN)',
      currency: 'IDR'
    }];
    const expected = {
      savingAccountOnly: [{
        accountNumber: '0002838796',
        accountType: 'SavingAccount',
        currency: 'IDR'
      }, {
        accountNumber: '0002838797',
        accountType: 'SavingAccount',
        currency: 'IDR'
      }, {
        accountNumber: '0002838798',
        accountType: 'SavingAccount',
        currency: 'SGD'
      }],
      savingAccount: [{
        accountNumber: '0002838796',
        accountType: 'SavingAccount',
        currency: 'IDR'
      }, {
        accountNumber: '0002838797',
        accountType: 'SavingAccount',
        currency: 'IDR'
      }, {
        accountNumber: '0002838798',
        accountType: 'SavingAccount',
        currency: 'SGD'
      }, {
        accountNumber: '3243243243',
        accountType: 'CurrentAccount',
        currency: 'IDR'
      }, {
        accountNumber: '0002838792',
        accountType: 'CurrentAccount',
        currency: 'SGD'
      }],
      currentAccount: [{
        accountNumber: '3243243243',
        accountType: 'CurrentAccount',
        currency: 'IDR'
      }, {
        accountNumber: '0002838792',
        accountType: 'CurrentAccount',
        currency: 'SGD'
      }],
      timeDepositAccount: [{
        accountNumber: '0002838790',
        accountType: 'TimeDepositAccount',
        currency: 'IDR'
      }],
      creditCardAccount: [],
      forex: [{
        accountNumber: '0002838798',
        accountType: 'SavingAccount',
        currency: 'SGD'
      }, {
        accountNumber: '0002838792',
        accountType: 'CurrentAccount',
        currency: 'SGD'
      }],
      rdn: [
        {
          accountNumber: '0001234556',
          accountType: 'Rekening Dana Nasabah (RDN)',
          currency: 'IDR'
        }
      ]
    };
    expect(Utils.groupAccountsByType(accounts)).toEqual(expected);
  });

  it('getTransferPossibleAccounts : Should return savings and current accounts', () => {
    const accounts = [{
      accountNumber: '0002838796',
      accountType: 'SavingAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    }, {
      accountNumber: '0002838797',
      accountType: 'SavingAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    },
    {
      accountNumber: '0002838798',
      accountTyp: 'SavingAccount',
      allowFlag: 'ft',
      currency: 'SGD',
    }, {
      accountNumber: '3243243243',
      accountType: 'CurrentAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    }, {
      accountNumber: '0002838792',
      accountType: 'CurrentAccount',
      currency: 'SGD',
      allowFlag: 'ft'
    }, {
      accountNumber: '0002838790',
      accountType: 'TimeDepositAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    }, {
      accountNumber: '4320291239122912',
      accountType: 'CreditCardAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    }];
    const expected = [{
      accountNumber: '0002838796',
      accountType: 'SavingAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    }, {
      accountNumber: '0002838797',
      accountType: 'SavingAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    }, {
      accountNumber: '3243243243',
      accountType: 'CurrentAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    }];
    expect(Utils.getTransferPossibleAccounts(accounts, 'ft')).toEqual(expected);
    expect(Utils.getTransferPossibleAccounts([], 'ft')).toEqual([]);
  });

  it('getTransferPossibleAccountsSetLimit : Should return savings and current accounts', () => {
    const accounts = [{
      accountNumber: '0002838796',
      accountType: 'SavingAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    }, {
      accountNumber: '0002838797',
      accountType: 'SavingAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    },
    {
      accountNumber: '0002838798',
      accountTyp: 'SavingAccount',
      allowFlag: 'ft',
      currency: 'SGD',
    }, {
      accountNumber: '3243243243',
      accountType: 'CurrentAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    }, {
      accountNumber: '0002838792',
      accountType: 'CurrentAccount',
      currency: 'SGD',
      allowFlag: 'ft'
    }, {
      accountNumber: '0002838790',
      accountType: 'TimeDepositAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    }, {
      accountNumber: '4320291239122912',
      accountType: 'CreditCardAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    }];
    const expected = [{
      accountNumber: '0002838796',
      accountType: 'SavingAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    }, {
      accountNumber: '0002838797',
      accountType: 'SavingAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    }, {
      accountNumber: '3243243243',
      accountType: 'CurrentAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    }];
    expect(Utils.getTransferPossibleAccountsSetLimit(accounts, 'ft')).toEqual(expected);
    expect(Utils.getTransferPossibleAccountsSetLimit([], 'ft')).toEqual([]);
  });

  it('andromaxAccount : Should return savings and current accounts', () => {
    const accounts = [{
      accountNumber: '0002838796',
      accountType: 'SavingAccount',
      currency: 'IDR',
      accountTypeCode: '6026'
    }, {
      accountNumber: '0002838797',
      accountType: 'SavingAccount',
      currency: 'IDR',
      accountTypeCode: '6026'
    },
    {
      accountNumber: '0002838798',
      accountType: 'SavingAccount',
      currency: 'SGD',
      accountTypeCode: '6011'
    }, {
      accountNumber: '3243243243',
      accountType: 'CurrentAccount',
      currency: 'IDR',
      accountTypeCode: '6026'
    }, {
      accountNumber: '0002838792',
      accountType: 'CurrentAccount',
      currency: 'SGD',
      accountTypeCode: '6011'
    }, {
      accountNumber: '0002838790',
      accountType: 'TimeDepositAccount',
      currency: 'IDR',
      accountTypeCode: '6011'
    }, {
      accountNumber: '4320291239122912',
      accountType: 'CreditCardAccount',
      currency: 'IDR',
      accountTypeCode: '6011'
    }];
    const expected = [{
      accountNumber: '0002838796',
      accountType: 'SavingAccount',
      currency: 'IDR',
      accountTypeCode: '6026'
    }, {
      accountNumber: '0002838797',
      accountType: 'SavingAccount',
      currency: 'IDR',
      accountTypeCode: '6026'
    }, {
      accountNumber: '3243243243',
      accountType: 'CurrentAccount',
      currency: 'IDR',
      accountTypeCode: '6026'
    }];
    expect(Utils.andromaxAccount(accounts)).toEqual(expected);
    expect(Utils.andromaxAccount()).toEqual([]);
  });

  it('obfuscateUsername: Should hide middle letters in username', () => {
    expect(Utils.obfuscateUsername('rahul')).toBe('ra*ul');
    expect(Utils.obfuscateUsername('johndoe')).toBe('jo***oe');
    expect(() => Utils.obfuscateUsername(null)).toThrow();
    expect(() => Utils.obfuscateUsername(undefined)).toThrow();
    expect(() => Utils.obfuscateUsername('')).toThrow();
    expect(() => Utils.obfuscateUsername(234432)).toThrow();
  });
  it('Should return IDR SUM by accountType', () => {
    const accounts = {
      savingAccount: [{
        accountNumber: '0002838796',
        accountType: 'SavingAccount',
        currency: 'IDR',
        balances: {
          availableBalance: 30000.05,
        }
      }, {
        accountNumber: '0002838797',
        accountType: 'SavingAccount',
        currency: 'IDR',
        balances: {
          availableBalance: 20000.05,
        }
      }],
      currentAccount: [{
        accountNumber: '0002838792',
        accountType: 'CurrentAccount',
        currency: 'IDR',
        balances: {
          availableBalance: 40000.55,
        }
      }],
      timeDepositAccount: [{
        accountNumber: '0002838790',
        accountType: 'TimeDepositAccount',
        currency: 'IDR',
        balances: {
          availableBalance: 200.55,
        }
      }],
      creditCardAccount: [{
        accountNumber: '4320291239122912',
        accountType: 'CreditCardAccount',
        currency: 'IDR',
        balances: {
          availableBalance: 2000000.55,
        }
      }],
      forex: [{
        accountNumber: '0002838708',
        accountType: 'TimeDepositAccount',
        currency: 'SGD',
        balances: {
          availableBalance: 200.55,
        }
      }, {
        accountNumber: '0002838708',
        accountType: 'SavingAccount',
        currency: 'SGD',
        balances: {
          availableBalance: 200.55,
        }
      }]
    };
    const expected = {
      savingAccount: 50000.10,
      currentAccount: 40000.55,
      timeDepositAccount: 200.55,
      creditCardAccount: 2000000.55,
      forex: {
        SGD: 401.1
      }
    };
    expect(Utils.getGroupedAccountsSum(accounts)).toEqual(expected);
    expect(Utils.getGroupedAccountsSum({})).toEqual({});
  });
  it('transformTransactions: Should put transactions in buckets for filtering', () => {
    expect(Utils.transformTransactions({description: 'Bill Pay'}).type).toEqual('billPayments');
    expect(Utils.transformTransactions({description: 'Bill Payment'}).type).toEqual('billPayments');
    expect(Utils.transformTransactions({description: 'Cash Withdrawal'}).type).toEqual('withdrawals');
    expect(Utils.transformTransactions({description: 'ATM Withdrawal'}).type).toEqual('withdrawals');
    expect(Utils.transformTransactions({description: 'ATM Withdrawal'}).type).toEqual('withdrawals');
    expect(Utils.transformTransactions({description: 'Transfer'}).type).toEqual('transfers');
    expect(Utils.transformTransactions({description: 'Fund Transfer'}).type).toEqual('transfers');
  });
  it('filterTransactions: Filter transactions', () => {
    const transactions = [
      {type: 'billPayments', description: 'Bill Pay'},
      {type: 'withdrawals', description: 'Cash Withdrawal'},
      {type: 'transfers', description: 'Transfer'},
      {type: 'others', description: 'something'},
    ];
    expect(Utils.filterTransactions(transactions, {billPayments: true})).toEqual([transactions[0]]);
    expect(Utils.filterTransactions(transactions, {withdrawals: true})).toEqual([transactions[1]]);
    expect(Utils.filterTransactions(transactions, {transfers: true})).toEqual([transactions[2]]);
    expect(Utils.filterTransactions(transactions, {others: true})).toEqual([transactions[3]]);
    expect(Utils.filterTransactions(transactions, {billPayments: true, others: true})).toEqual([transactions[0], transactions[3]]);
    expect(Utils.filterTransactions(transactions, {withdrawals: true, transfers: true})).toEqual([transactions[1], transactions[2]]);
    expect(Utils.filterTransactions(transactions, {})).toEqual(transactions);
  });

  it('getErrorMessage: gets error message', () => {
    expect(Utils.getErrorMessage(null, 'Test')).toEqual('Test');
    const err = set({}, 'data.responseMessage', 'seomerror');
    expect(Utils.getErrorMessage(err, 'Test')).toEqual('seomerror');
    const errWithArray = set({}, 'data.responseMessage', []);
    expect(Utils.getErrorMessage(errWithArray, 'Test')).toEqual('Test');
    const errWithObject = set({}, 'data.responseMessage', {});
    expect(Utils.getErrorMessage(errWithObject, 'Test')).toEqual('Test');
    const offlineError = set({}, 'data.notConnected', true);
    expect(Utils.getErrorMessage(offlineError, 'Test')).toBeUndefined();
    const otherEroor = set({}, 'data.notConnected', false);
    expect(Utils.getErrorMessage(otherEroor, 'Test')).toEqual('Test');
  });

  it('currencyFormatter: formats currency', () => {
    expect(Utils.currencyFormatter(0)).toEqual('0');
    expect(Utils.currencyFormatter('0')).toEqual('0');
    expect(Utils.currencyFormatter(123213)).toEqual('123.213');
    expect(Utils.currencyFormatter(undefined)).toEqual('--');
    expect(Utils.currencyFormatter(null)).toEqual('--');
    expect(Utils.currencyFormatter(NaN)).toEqual('--');
    expect(Utils.currencyFormatter(123213.232)).toEqual('123.213');
    expect(Utils.currencyFormatter('123213.232')).toEqual('123.213');
  });

  it('balanceFormatter: formats currency with decimal', () => {
    expect(Utils.balanceFormatter(0.00)).toEqual('0');
    expect(Utils.balanceFormatter('0.00')).toEqual('0.00');
    expect(Utils.balanceFormatter(123213.12)).toEqual('123.213.12');
    expect(Utils.balanceFormatter(undefined)).toEqual('--');
    expect(Utils.balanceFormatter(null)).toEqual('--');
    expect(Utils.balanceFormatter(NaN)).toEqual('--');
    expect(Utils.balanceFormatter(123213.232)).toEqual('123.213.232');
    expect(Utils.balanceFormatter('123213.232')).toEqual('123.213.232');
  });

  it('getAccountAmount: returns availableBalance', () => {
    expect(Utils.getAccountAmount({balances: {availableBalance: 21}})).toEqual(21);
    expect(Utils.getAccountAmount({balances: {availableBalance: 0}})).toEqual(0);
    expect(Utils.getAccountAmount({balances: {availableBalance: undefined}})).toEqual(NaN);
    expect(Utils.getAccountAmount(undefined)).toEqual(NaN);
  });

  it('getUnformattedAccountAmount: returns availableBalance with decimal', () => {
    expect(Utils.getUnformattedAccountAmount({balances: {availableBalance: 21.20}})).toEqual(21.20);
    expect(Utils.getUnformattedAccountAmount({balances: {availableBalance: 0}})).toEqual(0.00);
    expect(Utils.getUnformattedAccountAmount({balances: {availableBalance: undefined}})).toEqual(NaN);
    expect(Utils.getUnformattedAccountAmount(undefined)).toEqual(NaN);
  });

  it('normalizeTransferType: converts transfertype radio object into the string that the store needs', () => {
    expect(Utils.normalizeTransferType({label: 'test', value: 'test123'})).toEqual('test123');
  });

  it('formatTransferType: converts transfertype value in store to radio object', () => {
    expect(Utils.formatTransferType('skn', 'today')).toEqual({
      'label': 'Transfer today (skn)',
      'sublabel': 'Rp 5.000',
      'value': 'skn'
    });
  });

  it('transformToTransferTypeRadioData: converts a list of transfertype values into radio object', () => {
    expect(Utils.transformToTransferTypeRadioData([
      {type: 'skn', when: 'tomorrow'},
      {type: 'network', when: 'today'}
    ])).toEqual(
      [
        {'label': 'Transfer tomorrow (skn)', 'sublabel': 'Rp 5.000', 'value': 'skn'},
        {'label': 'Transfer today (network)', 'sublabel': 'Rp 7.500', 'value': 'network'}
      ]
    );
  });

  it('getOptimalTransferMethods: get optimal transfer types based on time', () => {
    const sknTime = moment('15:00', 'HH:mm');
    const rtgsTime = moment('16:00', 'HH:mm');
    const startTime = moment('00:00', 'HH:mm').isoWeekday(2);
    const currentTimeNetworkOptimal = moment('20:00', 'HH:mm').isoWeekday(2); // means its a working day
    const currentTimeSknOptimal = moment('14:00', 'HH:mm').isoWeekday(2);
    const currentTimeRtgsOptimal = moment('15:30', 'HH:mm').isoWeekday(2);
    const sundayTime = moment('14:00', 'HH:mm').isoWeekday(7); // 7 means sunday
    const saturdayTime = moment('12:00', 'HH:mm').isoWeekday(6); // 6 means saturday
    const holidayBussinessDay = moment(currentTimeSknOptimal).add(1, 'day'); // means that next day is the business day and current day is a holiday.

    expect(Utils.getOptimalTransferMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeNetworkOptimal, currentTimeNetworkOptimal, startTime)).toEqual([{type: 'bifast', when: 'instantly'}, {'type': 'skn', 'when': 'nextWorking'}, {'type': 'network', 'when': 'instantly'}, {'type': 'rtgs', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalTransferMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeSknOptimal, currentTimeSknOptimal, startTime)).toEqual([{type: 'bifast', when: 'instantly'}, {'type': 'skn', 'when': 'today'}, {'type': 'network', 'when': 'instantly'}, {'type': 'rtgs', 'when': 'today'}]);
    expect(Utils.getOptimalTransferMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeRtgsOptimal, currentTimeRtgsOptimal, startTime)).toEqual([{type: 'bifast', when: 'instantly'}, {'type': 'skn', 'when': 'nextWorking'}, {'type': 'network', 'when': 'instantly'}, {'type': 'rtgs', 'when': 'today'}]);
    expect(Utils.getOptimalTransferMethods(sknTime.isoWeekday(7), rtgsTime.isoWeekday(7), sundayTime, currentTimeSknOptimal, startTime)).toEqual([{type: 'bifast', when: 'instantly'}, {'type': 'skn', 'when': 'nextWorking'}, {'type': 'network', 'when': 'instantly'}, {'type': 'rtgs', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalTransferMethods(sknTime.isoWeekday(6), rtgsTime.isoWeekday(6), saturdayTime, currentTimeSknOptimal, startTime)).toEqual([{type: 'bifast', when: 'instantly'}, {'type': 'skn', 'when': 'nextWorking'}, {'type': 'network', 'when': 'instantly'}, {'type': 'rtgs', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalTransferMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeSknOptimal, holidayBussinessDay, startTime)).toEqual([{type: 'bifast', when: 'instantly'}, {'type': 'skn', 'when': 'nextWorking'}, {'type': 'network', 'when': 'instantly'}, {'type': 'rtgs', 'when': 'nextWorking'}]);
  });

  it('getOptimalCCMethods: get optimal credit card payment types based on time', () => {
    const sknTime = moment('15:00', 'HH:mm');
    const rtgsTime = moment('16:00', 'HH:mm');
    const startTime = moment('00:00', 'HH:mm').isoWeekday(2);
    const currentTimeNetworkOptimal = moment('20:00', 'HH:mm').isoWeekday(2); // means its a working day
    const currentTimeSknOptimal = moment('14:00', 'HH:mm').isoWeekday(2);
    const currentTimeRtgsOptimal = moment('15:30', 'HH:mm').isoWeekday(2);
    const sundayTime = moment('14:00', 'HH:mm').isoWeekday(7); // 7 means sunday
    const saturdayTime = moment('12:00', 'HH:mm').isoWeekday(6); // 6 means saturday
    const holidayBussinessDay = moment(currentTimeSknOptimal).add(1, 'day'); // means that next day is the business day and current day is a holiday.
    const networkEnabled = true;
    const sknEnabled = true;
    const rtgsEnabled = true;
    const networkDisabled = false;
    const sknDisabled = false;
    const rtgsDisabled = false;
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeNetworkOptimal, currentTimeNetworkOptimal, startTime, networkEnabled, sknEnabled, rtgsEnabled)).toEqual([{'type': 'network', 'when': 'instantly'}, {'type': 'skn', 'when': 'nextWorking'}, {'type': 'rtgs', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeNetworkOptimal, currentTimeNetworkOptimal, startTime, networkEnabled, sknEnabled, rtgsDisabled)).toEqual([{'type': 'network', 'when': 'instantly'}, {'type': 'skn', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeNetworkOptimal, currentTimeNetworkOptimal, startTime, networkEnabled, sknDisabled, rtgsEnabled)).toEqual([{'type': 'network', 'when': 'instantly'}, {'type': 'rtgs', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeNetworkOptimal, currentTimeNetworkOptimal, startTime, networkDisabled, sknEnabled, rtgsEnabled)).toEqual([{'type': 'skn', 'when': 'nextWorking'}, {'type': 'rtgs', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeNetworkOptimal, currentTimeNetworkOptimal, startTime, networkEnabled, sknDisabled, rtgsDisabled)).toEqual([{'type': 'network', 'when': 'instantly'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeNetworkOptimal, currentTimeNetworkOptimal, startTime, networkDisabled, sknEnabled, rtgsDisabled)).toEqual([{'type': 'skn', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeNetworkOptimal, currentTimeNetworkOptimal, startTime, networkDisabled, sknDisabled, rtgsEnabled)).toEqual([{'type': 'rtgs', 'when': 'nextWorking'}]);

    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeSknOptimal, currentTimeSknOptimal, startTime, networkEnabled, sknEnabled, rtgsEnabled)).toEqual([{'type': 'skn', 'when': 'today'}, {'type': 'network', 'when': 'instantly'}, {'type': 'rtgs', 'when': 'today'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeSknOptimal, currentTimeSknOptimal, startTime, networkEnabled, sknEnabled, rtgsDisabled)).toEqual([{'type': 'skn', 'when': 'today'}, {'type': 'network', 'when': 'instantly'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeSknOptimal, currentTimeSknOptimal, startTime, networkEnabled, sknDisabled, rtgsEnabled)).toEqual([{'type': 'network', 'when': 'instantly'}, {'type': 'rtgs', 'when': 'today'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeSknOptimal, currentTimeSknOptimal, startTime, networkDisabled, sknEnabled, rtgsEnabled)).toEqual([{'type': 'skn', 'when': 'today'}, {'type': 'rtgs', 'when': 'today'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeSknOptimal, currentTimeSknOptimal, startTime, networkEnabled, sknDisabled, rtgsDisabled)).toEqual([{'type': 'network', 'when': 'instantly'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeSknOptimal, currentTimeSknOptimal, startTime, networkDisabled, sknEnabled, rtgsDisabled)).toEqual([{'type': 'skn', 'when': 'today'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeSknOptimal, currentTimeSknOptimal, startTime, networkDisabled, sknDisabled, rtgsEnabled)).toEqual([{'type': 'rtgs', 'when': 'today'}]);

    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeRtgsOptimal, currentTimeRtgsOptimal, startTime, networkEnabled, sknEnabled, rtgsEnabled)).toEqual([{'type': 'network', 'when': 'instantly'}, {'type': 'skn', 'when': 'nextWorking'}, {'type': 'rtgs', 'when': 'today'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeRtgsOptimal, currentTimeRtgsOptimal, startTime, networkEnabled, sknEnabled, rtgsDisabled)).toEqual([{'type': 'network', 'when': 'instantly'}, {'type': 'skn', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeRtgsOptimal, currentTimeRtgsOptimal, startTime, networkEnabled, sknDisabled, rtgsEnabled)).toEqual([{'type': 'network', 'when': 'instantly'}, {'type': 'rtgs', 'when': 'today'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeRtgsOptimal, currentTimeRtgsOptimal, startTime, networkDisabled, sknEnabled, rtgsEnabled)).toEqual([{'type': 'skn', 'when': 'nextWorking'}, {'type': 'rtgs', 'when': 'today'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeRtgsOptimal, currentTimeRtgsOptimal, startTime, networkEnabled, sknDisabled, rtgsDisabled)).toEqual([{'type': 'network', 'when': 'instantly'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeRtgsOptimal, currentTimeRtgsOptimal, startTime, networkDisabled, sknEnabled, rtgsDisabled)).toEqual([{'type': 'skn', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeRtgsOptimal, currentTimeRtgsOptimal, startTime, networkDisabled, sknDisabled, rtgsEnabled)).toEqual([{'type': 'rtgs', 'when': 'today'}]);

    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(7), rtgsTime.isoWeekday(7), sundayTime, currentTimeSknOptimal, startTime, networkEnabled, sknEnabled, rtgsEnabled)).toEqual([{'type': 'network', 'when': 'instantly'}, {'type': 'skn', 'when': 'nextWorking'}, {'type': 'rtgs', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(7), rtgsTime.isoWeekday(7), sundayTime, currentTimeSknOptimal, startTime, networkEnabled, sknEnabled, rtgsDisabled)).toEqual([{'type': 'network', 'when': 'instantly'}, {'type': 'skn', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(7), rtgsTime.isoWeekday(7), sundayTime, currentTimeSknOptimal, startTime, networkEnabled, sknDisabled, rtgsEnabled)).toEqual([{'type': 'network', 'when': 'instantly'}, {'type': 'rtgs', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(7), rtgsTime.isoWeekday(7), sundayTime, currentTimeSknOptimal, startTime, networkDisabled, sknEnabled, rtgsEnabled)).toEqual([{'type': 'skn', 'when': 'nextWorking'}, {'type': 'rtgs', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(7), rtgsTime.isoWeekday(7), sundayTime, currentTimeSknOptimal, startTime, networkEnabled, sknDisabled, rtgsDisabled)).toEqual([{'type': 'network', 'when': 'instantly'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(7), rtgsTime.isoWeekday(7), sundayTime, currentTimeSknOptimal, startTime, networkDisabled, sknEnabled, rtgsDisabled)).toEqual([{'type': 'skn', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(7), rtgsTime.isoWeekday(7), sundayTime, currentTimeSknOptimal, startTime, networkDisabled, sknDisabled, rtgsEnabled)).toEqual([{'type': 'rtgs', 'when': 'nextWorking'}]);

    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(6), rtgsTime.isoWeekday(6), saturdayTime, currentTimeSknOptimal, startTime, networkEnabled, sknEnabled, rtgsEnabled)).toEqual([{'type': 'network', 'when': 'instantly'}, {'type': 'skn', 'when': 'nextWorking'}, {'type': 'rtgs', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(6), rtgsTime.isoWeekday(6), saturdayTime, currentTimeSknOptimal, startTime, networkEnabled, sknEnabled, rtgsDisabled)).toEqual([{'type': 'network', 'when': 'instantly'}, {'type': 'skn', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(6), rtgsTime.isoWeekday(6), saturdayTime, currentTimeSknOptimal, startTime, networkEnabled, sknDisabled, rtgsEnabled)).toEqual([{'type': 'network', 'when': 'instantly'}, {'type': 'rtgs', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(6), rtgsTime.isoWeekday(6), saturdayTime, currentTimeSknOptimal, startTime, networkDisabled, sknEnabled, rtgsEnabled)).toEqual([{'type': 'skn', 'when': 'nextWorking'}, {'type': 'rtgs', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(6), rtgsTime.isoWeekday(6), saturdayTime, currentTimeSknOptimal, startTime, networkEnabled, sknDisabled, rtgsDisabled)).toEqual([{'type': 'network', 'when': 'instantly'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(6), rtgsTime.isoWeekday(6), saturdayTime, currentTimeSknOptimal, startTime, networkDisabled, sknEnabled, rtgsDisabled)).toEqual([{'type': 'skn', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(6), rtgsTime.isoWeekday(6), saturdayTime, currentTimeSknOptimal, startTime, networkDisabled, sknDisabled, rtgsEnabled)).toEqual([{'type': 'rtgs', 'when': 'nextWorking'}]);

    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeSknOptimal, holidayBussinessDay, startTime, networkEnabled, sknEnabled, rtgsEnabled)).toEqual([{'type': 'network', 'when': 'instantly'}, {'type': 'skn', 'when': 'nextWorking'}, {'type': 'rtgs', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeSknOptimal, holidayBussinessDay, startTime, networkEnabled, sknEnabled, rtgsDisabled)).toEqual([{'type': 'network', 'when': 'instantly'}, {'type': 'skn', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeSknOptimal, holidayBussinessDay, startTime, networkEnabled, sknDisabled, rtgsEnabled)).toEqual([{'type': 'network', 'when': 'instantly'}, {'type': 'rtgs', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeSknOptimal, holidayBussinessDay, startTime, networkDisabled, sknEnabled, rtgsEnabled)).toEqual([{'type': 'skn', 'when': 'nextWorking'}, {'type': 'rtgs', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeSknOptimal, holidayBussinessDay, startTime, networkEnabled, sknDisabled, rtgsDisabled)).toEqual([{'type': 'network', 'when': 'instantly'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeSknOptimal, holidayBussinessDay, startTime, networkDisabled, sknEnabled, rtgsDisabled)).toEqual([{'type': 'skn', 'when': 'nextWorking'}]);
    expect(Utils.getOptimalCCMethods(sknTime.isoWeekday(2), rtgsTime.isoWeekday(2), currentTimeSknOptimal, holidayBussinessDay, startTime, networkDisabled, sknDisabled, rtgsEnabled)).toEqual([{'type': 'rtgs', 'when': 'nextWorking'}]);
  });

  it('getFundTransferMatrix: get fund transfer matrix per skn', () => {
    const mode = 'skn';
    expect(Utils.getFundTransferMatrix(mode)).toEqual({'fees': 5000, 'max': 500000000, 'min': 1000, 'text': 'skn'});
  });

  it('stringify: will stringify the value passed', () => {
    const test = 123;
    expect(Utils.stringify(test)).toEqual('123');
  });
  it('prepareTopups: add display key to list of topup containing formatted currency', () => {
    expect(Utils.prepareTopups([{id: 20000}])).toEqual([{id: 20000, display: 'Rp 20.000'}]);
    expect(Utils.prepareTopups([{id: '20000'}])).toEqual([{id: '20000', display: 'Rp 20.000'}]);
  });

  it('payeesFromTransactions: get payee list from recent transactions', () => {
    const transactions = [
      {
        amount: '23849',
        note: 'test',
        transferMode: 'inbank',
        smsOtp: '503756',
        id: 369996,
        accountNumber: '9900187995',
        transferType: 'inbank',
        name: 'SWARAJ',
        accountType: 'Tab Simas Stmt iB Mudharabah',
        label: '9900187995/IDR/Tab Simas Stmt iB Mudharabah/SWARAJ',
        currency: 'IDR',
        modeFlag: null
      }
    ];
    const payeeList = [
      {
        id: 369997,
        accountNumber: '9900187855',
        transferType: 'inbank',
        name: 'AYUSHI NIGAM',
        accountType: 'Tabungan Simas Gold iB Statement',
        label: '9900187855/IDR/Tabungan Simas Gold iB Statement/AYUSHI NIGAM',
        targetType: {
          code: 'inbanktransfer'
        },
        currency: 'IDR',
        modeFlag: null
      },
      {
        id: 369998,
        accountNumber: '9910296978',
        transferType: 'inbank',
        name: 'IJQOV FATUQ',
        accountType: 'Tabungan Simas iB - Perj Spritual',
        label: '9910296978/IDR/Tabungan Simas iB - Perj Spritual/IJQOV FATUQ',
        targetType: {
          code: 'inbanktransfer'
        },
        currency: 'IDR',
        modeFlag: null
      },
      {
        id: 369996,
        accountNumber: '9900187995',
        transferType: 'inbank',
        name: 'SWARAJ',
        accountType: 'Tab Simas Stmt iB Mudharabah',
        label: '9900187995/IDR/Tab Simas Stmt iB Mudharabah/SWARAJ',
        targetType: {
          code: 'inbanktransfer'
        },
        currency: 'IDR',
        modeFlag: null
      }
    ];
    expect(Utils.payeesFromTransactions(transactions, payeeList)).toEqual([payeeList[2]]);
  });

  it('payeesAddSecondaryText: Adds a secondaryText key to the payees in the payeeList', () => {
    expect(Utils.payeesAddSecondaryText([{'accountType': 'test', 'bank': {'bankName': null}}])).toEqual([{'accountType': 'test', 'bank': {'bankName': null}, 'secondaryText': 'test'}]);
    expect(Utils.payeesAddSecondaryText([{'accountType': undefined, 'bank': {'bankName': null}}])).toEqual([{'accountType': undefined, 'bank': {'bankName': null}, 'secondaryText': undefined}]);
    expect(Utils.payeesAddSecondaryText([{'accountType': undefined, 'bank': {'bankName': 'testB'}}])).toEqual([{'accountType': undefined, 'bank': {'bankName': 'testB'}, 'secondaryText': 'testB'}]);
  });

  it('formatBillDetails: should format display list items', () => {
    const rawBillMetadataArray = [{key: 'TestT', value: 'TValueT'}];
    expect(Utils.formatBillDetails(rawBillMetadataArray)).toEqual({
      Testt: 'Tvaluet'
    });
  });

  it('formatDataDetailList: should format data detail list items', () => {
    const rawBillMetadataArray = [{key: 'TESTT', value: 'TValueT'}];
    expect(Utils.formatDataDetailList(rawBillMetadataArray)).toEqual({
      TESTT: 'TValueT'
    });
  });

  it('listViewComparator: compare two list items', () => {
    const x1 = 1, x2 = 1;
    expect(Utils.listViewComparator(x1, x2)).toBe(false);
    expect(Utils.listViewComparator(x1, 3)).toBe(true);
  });

  it('filterObjectProperties: filters a portion of object based on keys passed', () => {
    const src = {
      a: 1,
      b: 2,
      c: 3
    };
    expect(Utils.filterObjectProperties(src, ['a', 'b'])).toEqual({a: 1, b: 2});
    expect(Utils.filterObjectProperties(src)).toEqual({});
    expect(Utils.filterObjectProperties(src, [])).toEqual({});
    expect(Utils.filterObjectProperties({a: 1}, ['b'])).toEqual({});
    expect(Utils.filterObjectProperties({}, ['b'])).toEqual({});
  });
});

// TODO: remove multiple describes and use only it

describe('Router Utility', () => {
  it('Should return the current route', () => {
    const expected = 'InvestScreen';
    expect(Utils.getCurrentRouteName(dummyNavigationState)).toEqual(expected);
    expect(Utils.getCurrentRouteName(null)).toEqual(null);
  });
});

describe('Interest Utility', () => {
  it('Should return the simple interest', () => {
    const dummyRate = 10;
    const dummyPrincipal = 1000;
    const expected = 8;
    expect(Utils.getTdInterest(dummyPrincipal, dummyRate)).toEqual(expected);
    expect(Utils.getTdInterest(undefined, undefined)).toEqual(NaN);
  });
});

describe('getTdTypeOptions: TD Maturity type Utility', () => {
  it('Should return td maturity list option', () => {
    const dummyMaturityList = [
      {code: 'non',
        id: 1
      }, {
        code: 'p',
        id: 2
      }];
    const expected = [{
      label: language.TIME_DEPOSIT_ARO_NON,
      value: 1
    }, {
      label: language.TIME_DEPOSIT_ARO_P,
      value: 2
    }];
    expect(Utils.getTdTypeOptions(dummyMaturityList)).toEqual(expected);
  });
  it('Should return empty maturity list option', () => {
    const dummyMaturityList = [
      {code: 'noop',
        id: 1
      }, {
        code: 'noop',
        id: 2
      }];
    const expected = [{
      label: undefined,
      value: 1
    }, {
      label: undefined,
      value: 2
    }];
    expect(Utils.getTdTypeOptions(dummyMaturityList)).toEqual(expected);
    expect(Utils.getTdTypeOptions(undefined)).toEqual([]);
    expect(Utils.getTdTypeOptions(null)).toEqual([]);
    expect(Utils.getTdTypeOptions([])).toEqual([]);
  });
});

describe('getTdAccounts: TD accounts', () => {
  it('Should return all conventional and sharia td account', () => {
    const dummyAccount = [{
      allowFlag: 'ab|td',
      id: 1
    }, {
      allowFlag: 'cd|ef',
      id: 2
    }];
    const expected = [{
      allowFlag: 'ab|td',
      id: 1
    }];
    expect(Utils.getTdAccounts(dummyAccount)).toEqual(expected);
    expect(Utils.getTdAccounts(undefined)).toEqual([]);
  });
});

describe('checkShariaAccount: Check Sharia account', () => {
  it('Should return true for sharia account', () => {
    const dummyAccount = {
      allowFlag: 'ab|tds',
      id: 1
    };
    expect(Utils.checkShariaAccount(dummyAccount)).toBeTruthy();
    expect(Utils.checkShariaAccount(undefined)).toBeFalsy();
  });
});

describe('getTabBarVisibility: returns tab bar visiblitiy', () => {
  it('Should return the tab bar visiblitiy based on nested child visiblitiy', () => {
    expect(Utils.getTabBarVisibility({visible: false})).toEqual(false);
    expect(Utils.getTabBarVisibility()).toEqual(true);
    expect(Utils.getTabBarVisibility({visible: true})).toEqual(true);
    expect(Utils.getTabBarVisibility(undefined)).toEqual(true);
  });
});

describe('Check formatFieldAmount ', () => {
  it('Should change formatted value', () => {
    expect(Utils.formatFieldAmount('10000.1')).toEqual('10.000.1');
    expect(Utils.formatFieldAmount('100.000')).toEqual('100.000');
    expect(Utils.formatFieldAmount('100.000.00')).toEqual('100.000.00');
    expect(Utils.formatFieldAmount()).toEqual('');
    expect(Utils.formatFieldAmount(undefined)).toEqual('');
    expect(Utils.formatFieldAmount(null)).toEqual('');
  });
});

describe('Check normalizeAmount', () => {
  it('Should return unformatted value', () => {
    const valueParam = '10,000';
    const previousValue = '1,000';
    const expected = '10000';
    expect(Utils.normalizeAmount(valueParam, previousValue)).toEqual(expected);
    expect(Utils.normalizeAmount(null, previousValue)).toEqual('');
    expect(Utils.normalizeAmount(undefined, undefined)).toEqual('');
  });
});

describe('Check groupAccountsByType', () => {
  it('Should return grouped accounts', () => {
    const dummyParams = [{
      accountNumber: '0002838796',
      accountType: 'savingAccount',
      currency: 'IDR'
    }, {
      accountNumber: '0002838797',
      accountType: 'savingaccount',
      currency: 'IDR'
    },
    {
      accountNumber: '0002838798',
      accountType: 'SavingAccount',
      currency: 'SGD'
    }, {
      accountNumber: '3243243243',
      accountType: 'CurrentAccount',
      currency: 'IDR'
    }, {
      accountNumber: '0002838792',
      accountType: 'CurrentAccount',
      currency: 'SGD'
    }, {
      accountNumber: '0002838790',
      accountType: 'TimeDepositAccount',
      currency: 'IDR'
    }, {
      accountNumber: '4320291239122912',
      accountType: 'CreditCardAccount',
      currency: 'IDR'
    }, {
      accountNumber: '0001234556',
      accountType: 'Rekening Dana Nasabah (RDN)',
      currency: 'IDR'
    }];
    const expected = {
      savingAccountOnly: [{
        accountNumber: '0002838796',
        accountType: 'savingAccount',
        currency: 'IDR'
      }, {
        accountNumber: '0002838797',
        accountType: 'savingaccount',
        currency: 'IDR'
      }, {
        accountNumber: '0002838798',
        accountType: 'SavingAccount',
        currency: 'SGD'
      }],
      savingAccount: [{
        accountNumber: '0002838796',
        accountType: 'savingAccount',
        currency: 'IDR'
      }, {
        accountNumber: '0002838797',
        accountType: 'savingaccount',
        currency: 'IDR'
      }, {
        accountNumber: '0002838798',
        accountType: 'SavingAccount',
        currency: 'SGD'
      }, {
        accountNumber: '3243243243',
        accountType: 'CurrentAccount',
        currency: 'IDR'
      }, {
        accountNumber: '0002838792',
        accountType: 'CurrentAccount',
        currency: 'SGD'
      }],
      currentAccount: [{
        accountNumber: '3243243243',
        accountType: 'CurrentAccount',
        currency: 'IDR'
      }, {
        accountNumber: '0002838792',
        accountType: 'CurrentAccount',
        currency: 'SGD'
      }],
      timeDepositAccount: [{
        accountNumber: '0002838790',
        accountType: 'TimeDepositAccount',
        currency: 'IDR'
      }],
      creditCardAccount: [],
      forex: [{
        accountNumber: '0002838798',
        accountType: 'SavingAccount',
        currency: 'SGD'
      }, {
        accountNumber: '0002838792',
        accountType: 'CurrentAccount',
        currency: 'SGD'
      }],
      rdn: [{
        accountNumber: '0001234556',
        accountType: 'Rekening Dana Nasabah (RDN)',
        currency: 'IDR'
      }]
    };
    expect(Utils.groupAccountsByType(dummyParams)).toEqual(expected);
  });
});

describe('Check formatFieldNote', () => {
  it('Should return number and characters only', () => {
    const valueParam1 = 'abcde 12345,./;';
    const expected1 = 'abcde 12345';
    expect(Utils.formatFieldNote(valueParam1)).toEqual(expected1);
    expect(Utils.normalizeAmount(null)).toEqual('');
  });
});

describe('Check getOTPFromMsg', () => {
  it('Should return OTP from SMS', () => {
    const message = '123456 sms token SimobiPlus. Never share this code, it is confidential! Call 1500153';
    const expected = '123456';
    expect(Utils.getOTPFromMsg({body: message, originatingAddress: 'B-SINARMAS'}, 'sms token SimobiPlus')).toEqual(expected);
  });
  it('Should return null from SMS if originatingAddress is not B-SINARMAS', () => {
    const message = '123456 sms token SimobiPlus. Never share this code, it is confidential! Call 1500153';
    const expected = null;
    expect(Utils.getOTPFromMsg({body: message})).toEqual(expected);
  });
  it('Should return null from SMS if key doesn\' match', () => {
    const message = '123456 sms token SimobiPlus. Never share this code, it is confidential! Call 1500153';
    const expected = null;
    expect(Utils.getOTPFromMsg({body: message, originatingAddress: 'B-SINARMAS'}, 'sms otp SimobiPlus')).toEqual(expected);
  });
  it('Should not return OTP if key is not present in the msg body', () => {
    const message = '123456 Never share this code, it is confidential! Call 1500153';
    const expected = null;
    expect(Utils.getOTPFromMsg({body: message, originatingAddress: 'B-SINARMAS'})).toEqual(expected);
  });
});


describe('Check formatCreditCardPaymentMethods', () => {
  it('Should return formatted paymentMethods', () => {
    const outstandingBalance = 100000;
    const expected = [
      {
        label: language.CREDIT_CARD__OUTSTANDING_BALANCE,
        sublabel: 'Rp 100.000',
        value: 'outstanding'
      },
      {
        label: language.CREDIT_CARD__OTHER,
        sublabel: '',
        value: 'other'
      }
    ];
    expect(Utils.formatCreditCardPaymentMode(outstandingBalance)).toEqual(expected);
  });
});

describe('Check checkBillAmountCc', () => {
  it('Should return billAmount', () => {
    const billAmount = 100000;
    const billAmountCC = '200000';
    const expected = 100000;
    expect(Utils.checkBillAmountCc(billAmount, billAmountCC)).toEqual(expected);
  });
  it('Should return billAmountCC', () => {
    const billAmount = 0;
    const billAmountCC = '200000';
    const expected = '200000';
    expect(Utils.checkBillAmountCc(billAmount, billAmountCC)).toEqual(expected);
  });
  it('Should return billAmountCC', () => {
    const billAmount = 0.0;
    const billAmountCC = '200000';
    const expected = '200000';
    expect(Utils.checkBillAmountCc(billAmount, billAmountCC)).toEqual(expected);
  });
});

describe('Credit card number format', () => {
  it('Should add space after 4 digits', () => {
    const ccNumber = '1234567891234567';
    const expected = '1234 5678 9123 4567';
    expect(Utils.creditCardNumberFormat(ccNumber)).toEqual(expected);
    expect(Utils.creditCardNumberFormat('')).toEqual('');
  });
});

describe('formatMobileNumber: should format mobile numbers for bill payments', function () {
  it('should add 0 if the number starts with 8, remove non-numeric chars', () => {
    expect(Utils.formatMobileNumber(81132487329)).toEqual('081132487329');
    expect(Utils.formatMobileNumber('+6232-432-432343p')).toEqual('6232432432343');
    expect(Utils.formatMobileNumber()).toEqual('');
    expect(Utils.formatMobileNumber(null)).toEqual('');
  });
});

describe('getCcHistoryUrl :  shuld return url for pdf download', () => {
  xit('Should show last 4 digits', () => {
    const creditCardNumber = '1234567891234567';
    const iPass = 'SMP-21206841496047655080';
    const lang = 'en';
    const period = 'currPeriod';
    const envUrl = 'https://uat.mydibi.com/PersonalBanking/rest/v3/action';
    const expected = envUrl + '/download-billing-statement-creditcard?ipassport=SMP-21206841496047655080&lang=en&period=currPeriod&sendEmail=false&accountNumber=1234567891234567';
    expect(Utils.getCcHistoryUrl(creditCardNumber, iPass, lang, period)).toEqual(expected);
  });
});

describe('getInterceptorTrackerLabel: should return label for event tracking og failed apis', () => {
  it('should work', () => {
    const errorResponse = {
      data: {responseCode: '02'},
      config: {
        data: '{"TXID": "23432432432"}',
        endpoint: 'VERSION_CHECK'
      }
    };
    expect(Utils.getInterceptorTrackerLabel(errorResponse, 12)).toBe('TXID: 23432432432, ID: 12, RC: 02');
  });
});

describe('normalizeDate: should format date for credit card manage', function () {
  it('should be dd/mm/yyyy', () => {
    expect(Utils.normalizeDate('07', '0')).toEqual('07/');
    expect(Utils.normalizeDate('07/07', '07/0')).toEqual('07/07/');
    expect(Utils.normalizeDate('07/07.1994', '07/07.199')).toEqual('07/071994');
    expect(Utils.normalizeDate('07071994', '0707199')).toEqual('07/07/1994');
    expect(Utils.normalizeDate('07/07/1994', '07/07/199')).toEqual('07/07/1994');
    expect(Utils.normalizeDate('07', '07/')).toEqual('07');
    expect(Utils.normalizeDate('', '')).toEqual('');
    expect(Utils.normalizeDate(null, null)).toEqual('');
  });
});

describe('isLessThanOutstanding: should check if amount is less than outstanding balance', () => {
  it('should return true or false', () => {
    expect(Utils.isLessThanOutstanding('10000', '100000')).toEqual(true);
    expect(Utils.isLessThanOutstanding(null, '100000')).toEqual(true);
    expect(Utils.isLessThanOutstanding('100000', '10000')).toEqual(false);
    expect(Utils.isLessThanOutstanding('100000', '100000')).toEqual(false);
  });
});

describe('formatYearMonthDate: should format month and year for credit card manage', function () {
  it('should be yyyy/mm', () => {
    expect(Utils.formatYearMonthDate('202105')).toEqual('2021/05');
    expect(Utils.formatYearMonthDate('2021/05')).toEqual('2021/05');
    expect(Utils.formatYearMonthDate()).toEqual('');
    expect(Utils.formatYearMonthDate(null)).toEqual('');
  });
});

describe('currencySymbol: should show symbol by currency', function () {
  it('should return Rp', () => {
    expect(Utils.currencySymbol('IDR')).toEqual('Rp');
  });
  it('should return Rp', () => {
    expect(Utils.currencySymbol('USD')).toEqual('$');
  });
  it('should return Rp', () => {
    expect(Utils.currencySymbol('EUR')).toEqual('€');
  });
  it('should return Rp', () => {
    expect(Utils.currencySymbol('SGD')).toEqual('$');
  });
  it('should return Rp', () => {
    expect(Utils.currencySymbol('AUD')).toEqual('$');
  });
  it('should return Rp', () => {
    expect(Utils.currencySymbol('JPY')).toEqual('¥');
  });
  it('should return Rp', () => {
    expect(Utils.currencySymbol('CNY')).toEqual('¥');
  });
});

describe('formatForexAmount: should show correct decimal by currency', function () {
  it('should return Rp 10000.1', () => {
    expect(Utils.formatForexAmount(10000.1, 'IDR')).toEqual('10.000.1');
  });
  it('should return $ 20.99', () => {
    expect(Utils.formatForexAmount(20.99, 'USD')).toEqual('20.99');
  });
  it('should return € 30.99', () => {
    expect(Utils.formatForexAmount(30.99, 'EUR')).toEqual('30.99');
  });
  it('should return $ 40.99', () => {
    expect(Utils.formatForexAmount(40.99, 'SGD')).toEqual('40.99');
  });
  it('should return $ 50.99', () => {
    expect(Utils.formatForexAmount(50.99, 'AUD')).toEqual('50.99');
  });
  it('should return ¥ 100', () => {
    expect(Utils.formatForexAmount(100, 'JPY')).toEqual('100');
  });
  it('should return ¥ 200', () => {
    expect(Utils.formatForexAmount(200, 'CNY')).toEqual('200');
  });
});

describe('formatForexAmountMiniStatement: should show correct decimal by currency', function () {
  it('should return Rp 10000.1', () => {
    expect(Utils.formatForexAmountMiniStatement(10000.1, 'IDR')).toEqual('10.000.1');
  });
  it('should return $ 20.99', () => {
    expect(Utils.formatForexAmountMiniStatement(20.99, 'USD')).toEqual('20.99');
  });
  it('should return € 30.99', () => {
    expect(Utils.formatForexAmountMiniStatement(30.99, 'EUR')).toEqual('30.99');
  });
  it('should return $ 40.99', () => {
    expect(Utils.formatForexAmountMiniStatement(40.99, 'SGD')).toEqual('40.99');
  });
  it('should return $ 50.99', () => {
    expect(Utils.formatForexAmountMiniStatement(50.99, 'AUD')).toEqual('50.99');
  });
  it('should return ¥ 100.99', () => {
    expect(Utils.formatForexAmountMiniStatement(100.99, 'JPY')).toEqual('100.99');
  });
  it('should return ¥ 200.99', () => {
    expect(Utils.formatForexAmountMiniStatement(200.99, 'CNY')).toEqual('200.99');
  });
});

describe('waterBillPlaceholder: should show correct placeholder by biller name', function () {
  it('should return Ex: 080008000800 or Cth: 080008000800', () => {
    expect(Utils.waterBillPlaceholder('009937')).toEqual(language.WATER_BILL__CUSTOMER_ID_PDAM_PLACEHOLDER);
  });
  it('should return Ex: 000123456 or Cth: 000123456', () => {
    expect(Utils.waterBillPlaceholder('009936')).toEqual(language.WATER_BILL__CUSTOMER_ID_PALYJA_PLACEHOLDER);
  });
  it('should return Ex: 12345678 or Cth: 12345678', () => {
    expect(Utils.waterBillPlaceholder('009928')).toEqual(language.WATER_BILL__CUSTOMER_ID_AETRA_PLACEHOLDER);
  });
});

describe('getBannerLink: should return the correct link for the location', function () {
  const banners = [{
    'imageLink': 'test1',
    'location': 'TRANSFER'
  }, {
    'imageLink': 'test2',
    'location': 'TD_DASHBOARD'
  }];
  it('should return banner link for TD_DASHBOARD', () => {
    expect(Utils.getBannerLink(banners, 'TD_DASHBOARD')).toBe('test2');
  });
  it('should return banner link for TRANSFER', () => {
    expect(Utils.getBannerLink(banners, 'TRANSFER')).toBe('test1');
  });
});

it('getTransactionType: should return token id from token config based on max amount and highest rank number', () => {
  const tokenConfig =
    [
      {
        'token_id': '3',
        'token_type': 'Easy Pin',
        'rank': '5',
        'min_amount': '1',
        'max_amount': '5000000',
        'min_amount_own': '1',
        'max_amount_own': '-1'
      },
      {
        'token_id': '0',
        'token_type': 'SMS OTP',
        'rank': '4',
        'min_amount': '0',
        'max_amount': '500000000',
        'min_amount_own': '0',
        'max_amount_own': '-1'
      },
      {
        'token_id': '1',
        'token_type': 'Simas Token',
        'rank': '3',
        'min_amount': '0',
        'max_amount': '200000000'
      }
    ];
  expect(Utils.getTransactionType(100000, tokenConfig, false)).toEqual('3');
  expect(Utils.getTransactionType(5000001, tokenConfig, false)).toEqual('0');
  expect(Utils.getTransactionType(500000001, tokenConfig, true)).toEqual('3');
});


describe('generate captcha', function () {
  jest.unmock('lodash');
  const lodash = require.requireActual('lodash');
  it('generateCaptcha: generate random captcha Id and return it', () => {
    lodash.random = jest.fn(() => 1);
    expect(Utils.generateCaptcha(1)).toEqual({captchaId: 1000, captchaImg: env.URL + '/captcha?id=1000'});
  });
});

describe('generate tipList', function () {
  const expected = [
    {label: 'Rp 0', value: 0},
    {label: 'Rp 2,000', value: 2000},
    {label: 'Rp 5,000', value: 5000},
    {label: 'Rp 10,000', value: 10000},
    {label: 'Input Manually', value: 'manual'}];
  const content = {
    'result': 'success',
    'content': {
      'currency': 'IDR'
    }
  };
  it('generateTipList: generate static tip list', () => {
    expect(Utils.generateTipList(content)).toEqual(expected);
  });
});

describe('generate biller service list', function () {
  const expected = [{
    'iconName': 'water-payment', 'iconSize': 20, 'layers':
    [{'iconName': 'Water_01', 'iconSize': 40, 'iconStyle': {'color': '#0787e3'}},
      {'iconName': 'Water_02', 'iconSize': 40, 'iconStyle': {'color': '#333333'}},
      {'iconName': 'Water_03', 'iconSize': 40, 'iconStyle': {'color': '#949494'}}],
    'onPress': undefined, 'title': 'Air'}];
  const array = ['0'];
  it('generateBillerMenu: generate service menu driven by backend', () => {
    expect(Utils.generateBillerMenu(array, {navigateTo: jest.fn()})).toEqual(expected);
  });
});

describe('checkAdminBank', function () {
  const content1 = null;
  const content2 = 20000;
  const content3 = '';
  const expected1 = 0;
  const expected2 = 20000;
  const expected3 = 0;
  it('checkAdminBank', () => {
    expect(Utils.checkAdminBank(content1)).toEqual(expected1);
    expect(Utils.checkAdminBank(content2)).toEqual(expected2);
    expect(Utils.checkAdminBank(content3)).toEqual(expected3);
  });
});

it('generateLanguageGenericBiller: should generate language generic biller', () => {
  const content1 = '';
  const content2 = 'payment.subscriberNo.key';
  const expected1 = 'GENERIC_BILLER__';
  const expected2 = 'GENERIC_BILLER__PAYMENT_SUBSCRIBERNO_KEY';
  expect(Utils.generateLanguageGenericBiller(content1)).toEqual(expected1);
  expect(Utils.generateLanguageGenericBiller(content2)).toEqual(expected2);
});

it('generateLanguageGenericBillerPlaceHolder: should generate language placeholder generic biller', () => {
  const content1 = '';
  const content2 = 'payment.subscriberNo.key';
  const expected1 = 'GENERIC_BILLER____PLACEHOLDER';
  const expected2 = 'GENERIC_BILLER__PAYMENT_SUBSCRIBERNO_KEY__PLACEHOLDER';
  expect(Utils.generateLanguageGenericBillerPlaceHolder(content1)).toEqual(expected1);
  expect(Utils.generateLanguageGenericBillerPlaceHolder(content2)).toEqual(expected2);
});

it('generateRegex: should generate regex', () => {
  const content1 = '';
  const content2 = '(?=.*[a-z])';
  const content3 = '^((?!badword).)*$/i';
  const expected1 = /(?:)/;
  const expected2 = /(?=.*[a-z])/;
  const expected3 = /^((?!username).)*$/i;
  const expected4 = /(?:)/;
  const expected5 = /^((?!).)*$/i;
  expect(Utils.generateRegex(content1, 'username')).toEqual(expected1);
  expect(Utils.generateRegex(content2, 'username')).toEqual(expected2);
  expect(Utils.generateRegex(content3, 'username')).toEqual(expected3);
  expect(Utils.generateRegex(content1, '')).toEqual(expected4);
  expect(Utils.generateRegex(content2, '')).toEqual(expected2);
  expect(Utils.generateRegex(content3, '')).toEqual(expected5);
});

it('listLang', () => {
  const data = 'data';
  expect(Utils.listLang('portofolio_mutualfund')).toEqual(language.SINARMAS_REKSADANA);
  expect(Utils.listLang('SinarmasSekuritas')).toEqual(language.SINARMAS_SEKURITAS);
  expect(Utils.listLang('portofolio_bancassurance')).toEqual(language.SINARMAS_BANCASSURANCE);
  expect(Utils.listLang('sinarmasMSIG')).toEqual(language.SINARMAS_MSIG);
  expect(Utils.listLang(data)).toEqual(data);
});

it('getDayName: should return day name in selected language', () => {
  expect(Utils.getDayName(1512691200000)).toEqual(language.DAY__FRIDAY);
});

it('countCoupons: should return formatted couponList', () => {
  const data = [
    {
      validityEndDate: 123123
    },
    {
      validityEndDate: 123123
    },
    {
      validityEndDate: 321321
    }
  ];
  const expected = [
    {
      key: '123123',
      value: [{validityEndDate: 123123}, {validityEndDate: 123123}]
    },
    {
      key: '321321',
      value: [{validityEndDate: 321321}]
    }
  ];
  expect(Utils.countCoupons(data)).toEqual(expected);
});

it('formatPremi: should return formatted data', () => {
  const data = {
    name: 'wasd',
    code: '1234'
  };
  const expected = {
    label: 'wasd',
    sublabel: '',
    value: '1234'
  };
  expect(Utils.formatPremi(data)).toEqual(expected);
});

it('checkPremi: should check premi data', () => {
  const data = [
    {
      name: 'wasd',
      code: '1234'
    }
  ];
  const expected = [
    {
      label: 'wasd',
      sublabel: '',
      value: '1234'
    }
  ];
  expect(Utils.checkPremi(data)).toEqual(expected);
});

it('generateLoanStatus: should generate loan status based on code', () => {
  expect(Utils.generateLoanStatus('1')).toEqual(language.LOAN__STATUS_CURRENT);
  expect(Utils.generateLoanStatus('2')).toEqual(language.LOAN__STATUS_SPECIAL_MENTION);
  expect(Utils.generateLoanStatus('3')).toEqual(language.LOAN__STATUS_SUBSTANDARD);
  expect(Utils.generateLoanStatus('4')).toEqual(language.LOAN__STATUS_DOUBTFUL);
  expect(Utils.generateLoanStatus('5')).toEqual(language.LOAN__STATUS_LOSS);
});

it('generateOrientation: should generate degree to rotate', () => {
  expect(Utils.generateOrientation(3, 'android')).toEqual('180');
  expect(Utils.generateOrientation(5, 'android')).toEqual('90');
  expect(Utils.generateOrientation(7, 'android')).toEqual('270');
  expect(Utils.generateOrientation(1, 'android')).toEqual('0');
  expect(Utils.generateOrientation(3, 'ios')).toEqual('180');
  expect(Utils.generateOrientation(6, 'ios')).toEqual('270');
  expect(Utils.generateOrientation(1, 'ios')).toEqual('0');
});

it('checkFlipImage: should check if need to flip image', () => {
  expect(Utils.checkFlipImage(2, 'android')).toEqual(true);
  expect(Utils.checkFlipImage(4, 'android')).toEqual(true);
  expect(Utils.checkFlipImage(5, 'android')).toEqual(true);
  expect(Utils.checkFlipImage(7, 'android')).toEqual(true);
  expect(Utils.checkFlipImage(1, 'android')).toEqual(false);
  expect(Utils.checkFlipImage(3, 'ios')).toEqual(false);
});

it('checkSyaria: should check if account is syaria', () => {
  expect(Utils.checkSyaria('9912345678')).toEqual(true);
  expect(Utils.checkSyaria('1234567')).toEqual(false);
});

it('generateCcImage: should return iamge based on bin', () => {
  expect(Utils.generateCcImage('4893721234567890')).toEqual(creditCardPlatinum);
  expect(Utils.generateCcImage('4893731234567890')).toEqual(creditCardGold);
  expect(Utils.generateCcImage('4893741234567890')).toEqual(creditCardIndigo);
  expect(Utils.generateCcImage('4893771234567890')).toEqual(creditCardSilver);
});

it('formatResultAmount: should return formatted amount', () => {
  expect(Utils.formatResultAmount('123!@a2')).toEqual('1232');
});

it('checkMinus: return true if have -', () => {
  expect(Utils.checkMinus('-123')).toEqual(true);
  expect(Utils.checkMinus('123')).toEqual(false);
});

it('emoneyAccountNumber: format emoney account number', () => {
  expect(Utils.emoneyAccountNumber('38081212341234')).toEqual('38 0812 1234 1234');
  expect(Utils.emoneyAccountNumber('3808121234123')).toEqual('38 0812 1234 123');
});

it('formatTransferPayeeType: return payee type', () => {
  const expected = [
    {
      label: language.TRANSFER__EMONEY,
      value: 'emoney'
    },
    {
      label: language.TRANSFER__BANK_ACCOUNT,
      value: 'bank'
    }
  ];
  expect(Utils.formatTransferPayeeType()).toEqual(expected);
});

it('generateEmoneyProvider: format emoney provider', () => {
  const data = [{
    test: 'wasd',
    companyName: 'simas'
  }];
  const expected = [{
    test: 'wasd',
    companyName: 'simas',
    display: 'simas',
  }];
  expect(Utils.generateEmoneyProvider(data)).toEqual(expected);
});

it('formatMobileNumberEmoney: format emoney mobile number', () => {
  expect(Utils.formatMobileNumberEmoney('0821123123123')).toEqual('0821123123123');
  expect(Utils.formatMobileNumberEmoney('+62821123123123')).toEqual('0821123123123');
  expect(Utils.formatMobileNumberEmoney('+62 8211 2312 3123')).toEqual('0821123123123');
  expect(Utils.formatMobileNumberEmoney('+62-8211-2312-3123')).toEqual('0821123123123');
});

it('generateEmoneyProvider: format emoney provider', () => {
  const data = 'rudyfong12@gmail.com';
  const expected = 'rudyf*****@gmail.com';
  expect(Utils.maskedEmail(data)).toEqual(expected);
});

it('formatMobileNumberEmoney: format emoney mobile number', () => {
  expect(Utils.formatMobileNumberEmoneyRegistration('0821123123123')).toEqual('62821123123123');
  expect(Utils.formatMobileNumberEmoneyRegistration('+62821123123123')).toEqual('62821123123123');
  expect(Utils.formatMobileNumberEmoneyRegistration('+62 8211 2312 3123')).toEqual('62821123123123');
  expect(Utils.formatMobileNumberEmoneyRegistration('+62-8211-2312-3123')).toEqual('62821123123123');
});

it('tlvParser: parse TLV', () => {
  const toeq = {'tag': '08', 'val': '123123123', 'length': 9, 'lastLeng': 45, 'origin': '0821123123123'};
  expect(Utils.tlvParser('0821123123123', 20)).toEqual(toeq);
});

it('crcRes: crcRes', () => {
  const toeq = '0821123123123';
  expect(Utils.crcRes('0821123123123')).toEqual(toeq);
});

it('getBankName: getBankName', () => {
  const toeq = [{'bankCode': '153', 'bankName': 'Bank Sinarmas'}];
  expect(Utils.getBankName([{'bankCode': '153', 'bankName': 'Bank Sinarmas'}, {'bankCode': '009', 'bankName': 'Bank BCA'}], '153')).toEqual(toeq);
});

xit('chewTag: chewTag', () => {
  const toeq1 = {'00': '12', '01': '32', 'QR-TLV': '000212010232'};
  const toeq2 = {};
  expect(Utils.chewTag('000212010232', '00')).toEqual(toeq1);
  expect(Utils.chewTag('', '00')).toEqual(toeq2);
});

it('isValidCrc: isValidCrc', () => {
  const toeq1 = {'crc': '0232', 'crcRes': '9BF1', 'is63Valid': false, 'isValidCrc': false};
  const toeq2 = {'crc': 'CD19', 'crcRes': 'B317', 'is63Valid': true, 'isValidCrc': false};
  expect(Utils.isValidCrc({'data': '000212010232'})).toEqual(toeq1);
  expect(Utils.isValidCrc({'data': '0002120102326304CD19'})).toEqual(toeq2);
});

it('generateLuhn: generateLuhn', () => {
  const toeq1 = '0098392731';
  expect(Utils.generateLuhn('009839273')).toEqual(toeq1);
});

it('toTLVFormat: toTLVFormat', () => {
  const toeq1 = '\"001\"|';
  expect(Utils.toTLVFormat('001')).toEqual(toeq1);
});

it('generateBankList: generateBankList', () => {
  const jsonDt = {
    '26': {
      '00': 'COM.BANKSINARMAS.WWW',
      '01': '936001531002905634',
      '02': '081293288843',
      '03': 'UMI'
    },
    '52': '5311',
    '53': '360',
    '54': '32355',
    '55': '02',
    '56': '0',
    '58': 'ID',
    '59': 'Tempe ko Agus',
    '60': 'Jakarta Barat',
    '61': '13456',
    '62': {
      '02': '081293288843',
      '03': 'Tempe ko Agus'
    },
    '63': 'D096',
    '26-TLV': '0020COM.BANKSINARMAS.WWW011893600153100290563402120812932888430303UMI',
    '62-TLV': '02120812932888430313Tempe ko Agus',
    '00': '01',
    '01': '12'
  };
  const bankList = [
    {
      'id': 90,
      'sknCC': false,
      'sknEnabled': 'yes',
      'modeFlag': '111',
      'rtgsCC': false,
      'bankName': 'PT. BANK SINARMAS, TBK.',
      'networkEnabled': 'yes',
      'prefixCC': '^(489370|489371|489372|489373|489374)',
      'networkCC': false,
      'bankCode': '153',
      'rtgsEnabled': 'yes',
      'isSinarmas': true
    },
    {
      'id': 91,
      'sknCC': false,
      'sknEnabled': 'yes',
      'modeFlag': '110',
      'rtgsCC': false,
      'bankName': 'PT. BANK SINARMAS, TBK. UUS',
      'networkEnabled': null,
      'prefixCC': '^(489370|489371|489372|489373|489374)',
      'networkCC': false,
      'bankCode': '153',
      'rtgsEnabled': 'yes',
      'isSinarmas': true
    },
    {
      'id': 1,
      'sknCC': false,
      'sknEnabled': 'yes',
      'modeFlag': '111',
      'rtgsCC': false,
      'bankName': 'PT. BANK RAKYAT INDONESIA, TBK.',
      'networkEnabled': 'yes',
      'prefixCC': '^(436502)',
      'networkCC': true,
      'bankCode': '002',
      'rtgsEnabled': 'yes',
      'isSinarmas': false
    }
  ];
  const res = [
    {
      'bankId': '153',
      'bankName': 'PT. BANK SINARMAS, TBK.',
      'val': '936001531002905634',
      'display': 'PT. BANK SINARMAS, TBK.'
    }
  ];
  expect(Utils.generateBankList(jsonDt, '', bankList)).toEqual(res);
});

it('getTransferPossibleShariaAccounts : Should return savings and current accounts, and not return sharia accounts', () => {
  const accounts = [{
    accountNumber: '0002838796',
    accountType: 'SavingAccount',
    currency: 'IDR'
  }, {
    accountNumber: '0002838797',
    accountType: 'SavingAccount',
    currency: 'IDR'
  },
  {
    accountNumber: '0002838798',
    accountType: 'SavingAccount',
    currency: 'SGD'
  }, {
    accountNumber: '3243243243',
    accountType: 'CurrentAccount',
    currency: 'IDR'
  }, {
    accountNumber: '0002838792',
    accountType: 'CurrentAccount',
    currency: 'SGD'
  }, {
    accountNumber: '0002838790',
    accountType: 'TimeDepositAccount',
    currency: 'IDR'
  }, {
    accountNumber: '4320291239122912',
    accountType: 'CreditCardAccount',
    currency: 'IDR'
  }, {
    accountNumber: '0002751704',
    accountType: 'SavingAccount',
    currency: 'IDR',
    allowFlag: 'ft|bp|oa|tds',
  }];
  const expected = [{
    accountNumber: '0002838796',
    accountType: 'SavingAccount',
    currency: 'IDR'
  }, {
    accountNumber: '0002838797',
    accountType: 'SavingAccount',
    currency: 'IDR'
  }, {
    accountNumber: '3243243243',
    accountType: 'CurrentAccount',
    currency: 'IDR'
  }];
  expect(Utils.getTransferPossibleShariaAccounts(accounts)).toEqual(expected);
  expect(Utils.getTransferPossibleShariaAccounts()).toEqual([]);
});

it('getFormName: get form name for credit card', () => {
  expect(Utils.getFormName('0~1')).toEqual('ktpImage');
  expect(Utils.getFormName('0~2')).toEqual('CCForm1');
  expect(Utils.getFormName('0~3')).toEqual('CCForm2');
  expect(Utils.getFormName('0~4')).toEqual('CCForm2');
  expect(Utils.getFormName('0~5')).toEqual('CCForm3');
  expect(Utils.getFormName('1~1')).toEqual('CCForm4');
  expect(Utils.getFormName('1~2')).toEqual('CCForm5');
  expect(Utils.getFormName('2~1')).toEqual('CCForm6');
  expect(Utils.getFormName('2~2')).toEqual('CCForm7');
  expect(Utils.getFormName('2~3')).toEqual('npwpImage');
  expect(Utils.getFormName('2~4')).toEqual('CCForm8');
  expect(Utils.getFormName('2~5')).toEqual('CCForm9');
  expect(Utils.getFormName('2~6')).toEqual('cardDelivery');
});

it('getFieldName: get field name for credit card', () => {
  expect(Utils.getFieldName({code: '0~1~1'})).toEqual('ktpImage');
  expect(Utils.getFieldName({code: '0~2~1'})).toEqual('ktpId');
  expect(Utils.getFieldName({code: '0~2~2'})).toEqual('maritalStatus');
  expect(Utils.getFieldName({code: '0~2~3'})).toEqual('birthDate');
  expect(Utils.getFieldName({code: '0~2~4'})).toEqual('mothersMaiden');
  expect(Utils.getFieldName({code: '0~2~5'})).toEqual('ktpId2');
  expect(Utils.getFieldName({code: '0~2~6'})).toEqual('maritalStatus2');
  expect(Utils.getFieldName({code: '0~2~7'})).toEqual('birthDate2');
  expect(Utils.getFieldName({code: '0~2~8'})).toEqual('mothersMaiden2');
  expect(Utils.getFieldName({code: '0~3~1'})).toEqual('country2');
  expect(Utils.getFieldName({code: '0~3~2'})).toEqual('province2');
  expect(Utils.getFieldName({code: '0~3~3'})).toEqual('city2');
  expect(Utils.getFieldName({code: '0~3~4'})).toEqual('district2');
  expect(Utils.getFieldName({code: '0~3~5'})).toEqual('subDistrict2');
  expect(Utils.getFieldName({code: '0~3~6'})).toEqual('postalCode2');
  expect(Utils.getFieldName({code: '0~3~7'})).toEqual('rtRw2');
  expect(Utils.getFieldName({code: '0~3~8'})).toEqual('streetAddress2');
  expect(Utils.getFieldName({code: '0~4~1'})).toEqual('country');
  expect(Utils.getFieldName({code: '0~4~2'})).toEqual('province');
  expect(Utils.getFieldName({code: '0~4~3'})).toEqual('city');
  expect(Utils.getFieldName({code: '0~4~4'})).toEqual('district');
  expect(Utils.getFieldName({code: '0~4~5'})).toEqual('subDistrict');
  expect(Utils.getFieldName({code: '0~4~6'})).toEqual('postalCode');
  expect(Utils.getFieldName({code: '0~4~7'})).toEqual('rtRw');
  expect(Utils.getFieldName({code: '0~4~8'})).toEqual('streetAddress');
  expect(Utils.getFieldName({code: '0~5~1'})).toEqual('work');
  expect(Utils.getFieldName({code: '0~5~2'})).toEqual('monthlyIncome');
  expect(Utils.getFieldName({code: '0~5~3'})).toEqual('sourceOfFund');
  expect(Utils.getFieldName({code: '1~1~1'})).toEqual('workTitle');
  expect(Utils.getFieldName({code: '1~1~2'})).toEqual('workPosition');
  expect(Utils.getFieldName({code: '1~1~3'})).toEqual('industry');
  expect(Utils.getFieldName({code: '1~1~4'})).toEqual('companyName');
  expect(Utils.getFieldName({code: '1~1~5'})).toEqual('companyAddress');
  expect(Utils.getFieldName({code: '1~1~6'})).toEqual('companyPhoneNumber');
  expect(Utils.getFieldName({code: '1~1~7'})).toEqual('companyCountry');
  expect(Utils.getFieldName({code: '1~1~8'})).toEqual('companyProvince');
  expect(Utils.getFieldName({code: '1~1~9'})).toEqual('companyCity');
  expect(Utils.getFieldName({code: '1~1~10'})).toEqual('companyDistrict');
  expect(Utils.getFieldName({code: '1~1~11'})).toEqual('companySubDistrict');
  expect(Utils.getFieldName({code: '1~1~12'})).toEqual('companyPostalCode');
  expect(Utils.getFieldName({code: '1~1~13'})).toEqual('companyRtRw');
  expect(Utils.getFieldName({code: '1~2~1'})).toEqual('lastEducation');
  expect(Utils.getFieldName({code: '1~2~2'})).toEqual('purposeOfOpening');
  expect(Utils.getFieldName({code: '1~2~3'})).toEqual('numberOfDebit');
  expect(Utils.getFieldName({code: '1~2~4'})).toEqual('debitPerMonth');
  expect(Utils.getFieldName({code: '1~2~5'})).toEqual('numberOfCredit');
  expect(Utils.getFieldName({code: '1~2~6'})).toEqual('creditPerMonth');
  expect(Utils.getFieldName({code: '1~2~7'})).toEqual('numberOfDependant');
  expect(Utils.getFieldName({code: '2~1~1'})).toEqual('cardName');
  expect(Utils.getFieldName({code: '2~1~2'})).toEqual('creditLimit');
  expect(Utils.getFieldName({code: '2~1~3'})).toEqual('currentAddressStatus');
  expect(Utils.getFieldName({code: '2~1~4'})).toEqual('currentAddressSince');
  expect(Utils.getFieldName({code: '2~1~5'})).toEqual('creditTotal');
  expect(Utils.getFieldName({code: '2~1~6'})).toEqual('sourceOfFundPayment');
  expect(Utils.getFieldName({code: '2~1~7'})).toEqual('paymentType');
  expect(Utils.getFieldName({code: '2~2~1'})).toEqual('npwpNumber');
  expect(Utils.getFieldName({code: '2~2~2'})).toEqual('reasonNoNPWP');
  expect(Utils.getFieldName({code: '2~3~1'})).toEqual('npwpImage');
  expect(Utils.getFieldName({code: '2~4~1'})).toEqual('workStatus');
  expect(Utils.getFieldName({code: '2~4~2'})).toEqual('startWork');
  expect(Utils.getFieldName({code: '2~4~3'})).toEqual('latestPayslipImage');
  expect(Utils.getFieldName({code: '2~4~4'})).toEqual('startBusiness');
  expect(Utils.getFieldName({code: '2~4~5'})).toEqual('savingStatement1');
  expect(Utils.getFieldName({code: '2~4~6'})).toEqual('savingStatement2');
  expect(Utils.getFieldName({code: '2~4~7'})).toEqual('savingStatement3');
  expect(Utils.getFieldName({code: '2~5~1'})).toEqual('emergencyFullName');
  expect(Utils.getFieldName({code: '2~5~2'})).toEqual('emergencyRelationship');
  expect(Utils.getFieldName({code: '2~5~3'})).toEqual('emergencyPhone');
  expect(Utils.getFieldName({code: '2~5~4'})).toEqual('emergencyCountry');
  expect(Utils.getFieldName({code: '2~5~5'})).toEqual('emergencyProvince');
  expect(Utils.getFieldName({code: '2~5~6'})).toEqual('emergencyCity');
  expect(Utils.getFieldName({code: '2~5~7'})).toEqual('emergencyDistrict');
  expect(Utils.getFieldName({code: '2~5~8'})).toEqual('emergencySubDistrict');
  expect(Utils.getFieldName({code: '2~5~9'})).toEqual('emergencyPostalCode');
  expect(Utils.getFieldName({code: '2~5~10'})).toEqual('emergencyRtRw');
  expect(Utils.getFieldName({code: '2~5~11'})).toEqual('emergencyStreetAddress');
  expect(Utils.getFieldName({code: '2~6~1'})).toEqual('cardDelivery');
});

xit('getTitleName: get title name for credit card', () => {
  expect(Utils.getTitleName({key: 'country'})).toEqual(language.EMONEY__COUNTRY);
  expect(Utils.getTitleName({key: 'province'})).toEqual(language.EMONEY__PROVINCE);
  expect(Utils.getTitleName({key: 'city'})).toEqual(language.EMONEY__CITY);
  expect(Utils.getTitleName({key: 'district'})).toEqual(language.EMONEY__DISTRICT);
  expect(Utils.getTitleName({key: 'subDistrict'})).toEqual(language.EMONEY__SUB_DISTRICT);
  expect(Utils.getTitleName({key: 'postalCode'})).toEqual(language.EMONEY__POSTAL_CODE);
  expect(Utils.getTitleName({key: 'rtRw'})).toEqual(language.CHECKPOINT_RTRW);
  expect(Utils.getTitleName({key: 'streetAddress'})).toEqual(language.CREDITCARD__STREET_ADDRESS);
  expect(Utils.getTitleName({key: 'work'})).toEqual(language.CHECKPOINT_WORK);
  expect(Utils.getTitleName({key: 'monthlyIncome'})).toEqual(language.CREDITCARD__MONTHLY_INCOME);
  expect(Utils.getTitleName({key: 'sourceOfFund'})).toEqual(language.CREDITCARD__SOURCE_OF_FUND);
  expect(Utils.getTitleName({key: 'workTitle'})).toEqual(language.CREDITCARD__WORK_TITLE);
  expect(Utils.getTitleName({key: 'workPosition'})).toEqual(language.CREDITCARD__WORK_POSITION);
  expect(Utils.getTitleName({key: 'industry'})).toEqual(language.CREDITCARD__INDUSTRY);
  expect(Utils.getTitleName({key: 'companyName'})).toEqual(language.CREDITCARD__COMPANY_NAME);
  expect(Utils.getTitleName({key: 'companyAddress'})).toEqual(language.CREDITCARD__COMPANY_ADDRESS);
  expect(Utils.getTitleName({key: 'companyPhoneNumber'})).toEqual(language.CREDITCARD__COMPANY_PHONE_NUMBER);
  expect(Utils.getTitleName({key: 'companyCountry'})).toEqual(language.EMONEY__COUNTRY);
  expect(Utils.getTitleName({key: 'companyProvince'})).toEqual(language.EMONEY__PROVINCE);
  expect(Utils.getTitleName({key: 'companyCity'})).toEqual(language.EMONEY__CITY);
  expect(Utils.getTitleName({key: 'companyDistrict'})).toEqual(language.EMONEY__DISTRICT);
  expect(Utils.getTitleName({key: 'companySubDistrict'})).toEqual(language.EMONEY__SUB_DISTRICT);
  expect(Utils.getTitleName({key: 'companyPostalCode'})).toEqual(language.EMONEY__POSTAL_CODE);
  expect(Utils.getTitleName({key: 'companyRT'})).toEqual(language.EMONEY__RT);
  expect(Utils.getTitleName({key: 'companyRW'})).toEqual(language.EMONEY__RW);
  expect(Utils.getTitleName({key: 'lastEducation'})).toEqual(language.HINT__LAST_EDUCATION);
  expect(Utils.getTitleName({key: 'purposeOfOpening'})).toEqual(language.CREDITCARD__PURPOSE_OF_OPENING);
  expect(Utils.getTitleName({key: 'numberOfDebit'})).toEqual(language.CREDITCARD__NUMBER_OF_DEBIT);
  expect(Utils.getTitleName({key: 'debitPerMonth'})).toEqual(language.CREDITCARD__DEBIT_PER_MONTH);
  expect(Utils.getTitleName({key: 'numberOfCredit'})).toEqual(language.CREDITCARD__NUMBER_OF_CREDIT);
  expect(Utils.getTitleName({key: 'creditPerMonth'})).toEqual(language.CREDITCARD__CREDIT_PER_MONTH);
  expect(Utils.getTitleName({key: 'numberOfDependant'})).toEqual(language.CREDITCARD__NUMBER_OF_DEPENDANT);
  expect(Utils.getTitleName({key: 'npwpNumber'})).toEqual(language.CREDITCARD__NPWP_NUMBER);
  expect(Utils.getTitleName({key: 'reasonNoNPWP'})).toEqual(language.HINT__DONT_HAVE_NPWP);
  expect(Utils.getTitleName({key: 'cardName'})).toEqual(language.CHECKPOINT_CARD_NAME);
  expect(Utils.getTitleName({key: 'creditLimit'})).toEqual(language.CREDITCARD__CREDIT_LIMIT);
  expect(Utils.getTitleName({key: 'currentAddressStatus'})).toEqual(language.CHECKPOINT_CURRENT_ADDRESS_STATUS);
  expect(Utils.getTitleName({key: 'currentAddressSince'})).toEqual(language.CREDITCARD__CURRENT_ADDRESS_SINCE);
  expect(Utils.getTitleName({key: 'creditTotal'})).toEqual(language.CHECKPOINT_TOTAL_CARDS);
  expect(Utils.getTitleName({key: 'sourceOfFundPayment'})).toEqual(language.CREDITCARD__PAYMENT_TYPE);
  expect(Utils.getTitleName({key: 'workStatus'})).toEworkStatusqual(language.CREDITCARD__WORK_STATUS);
  expect(Utils.getTitleName({key: 'startWork'})).toEqual(language.CREDITCARD__START_WORK);
  expect(Utils.getTitleName({key: 'latestPayslipImage'})).toEqual(language.CHECKPOINT_PAYSLIP);
  expect(Utils.getTitleName({key: 'startBusiness'})).toEqual(language.CREDITCARD__START_BUSINESS);
  expect(Utils.getTitleName({key: 'savingStatement1'})).toEqual(language.CREDITCARD__SAVING_STATEMENT_1);
  expect(Utils.getTitleName({key: 'savingStatement2'})).toEqual(language.CREDITCARD__SAVING_STATEMENT_2);
  expect(Utils.getTitleName({key: 'savingStatement3'})).toEqual(language.CREDITCARD__SAVING_STATEMENT_3);
  expect(Utils.getTitleName({key: 'emergencyFullName'})).toEqual(language.CREDITCARD__EMERGENCY_FULLNAME);
  expect(Utils.getTitleName({key: 'emergencyRelationship'})).toEqual(language.CREDITCARD__EMERGENCY_RELATIONSHIP);
  expect(Utils.getTitleName({key: 'emergencyPhone'})).toEqual(language.CREDITCARD__EMERGENCY_PHONE);
  expect(Utils.getTitleName({key: 'emergencyCountry'})).toEqual(language.EMONEY__COUNTRY);
  expect(Utils.getTitleName({key: 'emergencyProvince'})).toEqual(language.EMONEY__PROVINCE);
  expect(Utils.getTitleName({key: 'emergencyCity'})).toEqual(language.EMONEY__CITY);
  expect(Utils.getTitleName({key: '2~5~7'})).toEqual(language.EMONEY__DISTRICT);
  expect(Utils.getTitleName({key: 'emergencyDistrict'})).toEqual(language.EMONEY__SUB_DISTRICT);
  expect(Utils.getTitleName({key: 'emergencyPostalCode'})).toEqual(language.EMONEY__POSTAL_CODE);
  expect(Utils.getTitleName({key: 'emergencyRT'})).toEqual(language.EMONEY__RT);
  expect(Utils.getTitleName({key: 'emergencyRW'})).toEqual(language.EMONEY__RW);
  expect(Utils.getTitleName({key: 'emergencyStreetAddress'})).toEqual(language.CREDITCARD__STREET_ADDRESS);
});

it('generateLocationSelection: generate location selection for open account', () => {
  const addressForm = {};
  const workingAddressForm = {};
  const expected =  [{label: 'Alamat sekarang', 'sublabel': '\n\nINDONESIA'},
    {'label': 'Alamat KTP'},
    {'label': 'Alamat kerja', 'sublabel': ''}];
  expect(Utils.generateLocationSelection(addressForm, workingAddressForm)).toEqual(expected);
});

it('tlvParser: parse TLV', () => {
  const amount = '5,000';
  expect(Utils.amountRegex(5000)).toEqual(amount);
});

it('getFilteredCgv: generate location selection for open account', () => {
  const dataCgv = [
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #8',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 794969,
      'showDate': '20180806',
      'showEndTime': '1302',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1100',
      'studioCode': '1008'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #8',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 794970,
      'showDate': '20180806',
      'showEndTime': '1602',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1400',
      'studioCode': '1008'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #8',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 794971,
      'showDate': '20180806',
      'showEndTime': '1902',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1700',
      'studioCode': '1008'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #8',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 794972,
      'showDate': '20180806',
      'showEndTime': '2227',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '2025',
      'studioCode': '1008'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #8',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 794973,
      'showDate': '20180806',
      'showEndTime': '2547',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '2345',
      'studioCode': '1008'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #1',
      'cinemaCode': '020',
      'cinemaName': 'Slipi Jaya',
      'movieTypeCode': '01',
      'scheduleCode': 795197,
      'showDate': '20180806',
      'showEndTime': '1302',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1100',
      'studioCode': '1001'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #1',
      'cinemaCode': '020',
      'cinemaName': 'Slipi Jaya',
      'movieTypeCode': '01',
      'scheduleCode': 795198,
      'showDate': '20180806',
      'showEndTime': '1517',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1315',
      'studioCode': '1001'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #1',
      'cinemaCode': '020',
      'cinemaName': 'Slipi Jaya',
      'movieTypeCode': '01',
      'scheduleCode': 795199,
      'showDate': '20180806',
      'showEndTime': '1732',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1530',
      'studioCode': '1001'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #1',
      'cinemaCode': '020',
      'cinemaName': 'Slipi Jaya',
      'movieTypeCode': '01',
      'scheduleCode': 795200,
      'showDate': '20180806',
      'showEndTime': '1947',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1745',
      'studioCode': '1001'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #1',
      'cinemaCode': '020',
      'cinemaName': 'Slipi Jaya',
      'movieTypeCode': '01',
      'scheduleCode': 795201,
      'showDate': '20180806',
      'showEndTime': '2202',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '2000',
      'studioCode': '1001'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #1',
      'cinemaCode': '020',
      'cinemaName': 'Slipi Jaya',
      'movieTypeCode': '01',
      'scheduleCode': 795202,
      'showDate': '20180806',
      'showEndTime': '2417',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '2215',
      'studioCode': '1001'
    }];
  const expected =  [{'cinemaName': 'Central Park', 'listByMovie': [{'cinemaCode': '006', 'cinemaName': 'Central Park', 'duration': 112, 'genre': 'HORROR ', 'movieCode': '18015800', 'movieName': 'SABRINA', 'movieTypeCode': '01', 'movieTypeName': '2D', 'scheduleCode': 794969, 'showDate': '20180806', 'showEndTime': '1302', 'showStartTime': '1100', 'studioCode': '1008', 'studioName': 'Audi #8'}, {'cinemaCode': '006', 'cinemaName': 'Central Park', 'duration': 112, 'genre': 'HORROR ', 'movieCode': '18015800', 'movieName': 'SABRINA', 'movieTypeCode': '01', 'movieTypeName': '2D', 'scheduleCode': 794970, 'showDate': '20180806', 'showEndTime': '1602', 'showStartTime': '1400', 'studioCode': '1008', 'studioName': 'Audi #8'}, {'cinemaCode': '006', 'cinemaName': 'Central Park', 'duration': 112, 'genre': 'HORROR ', 'movieCode': '18015800', 'movieName': 'SABRINA', 'movieTypeCode': '01', 'movieTypeName': '2D', 'scheduleCode': 794971, 'showDate': '20180806', 'showEndTime': '1902', 'showStartTime': '1700', 'studioCode': '1008', 'studioName': 'Audi #8'}, {'cinemaCode': '006', 'cinemaName': 'Central Park', 'duration': 112, 'genre': 'HORROR ', 'movieCode': '18015800', 'movieName': 'SABRINA', 'movieTypeCode': '01', 'movieTypeName': '2D', 'scheduleCode': 794972, 'showDate': '20180806', 'showEndTime': '2227', 'showStartTime': '2025', 'studioCode': '1008', 'studioName': 'Audi #8'}, {'cinemaCode': '006', 'cinemaName': 'Central Park', 'duration': 112, 'genre': 'HORROR ', 'movieCode': '18015800', 'movieName': 'SABRINA', 'movieTypeCode': '01', 'movieTypeName': '2D', 'scheduleCode': 794973, 'showDate': '20180806', 'showEndTime': '2547', 'showStartTime': '2345', 'studioCode': '1008', 'studioName': 'Audi #8'}], 'movieCode': '18015800', 'movieName': 'SABRINA'}];
  const tipe = 'cinema';
  const code = '006';
  expect(Utils.getFilteredCgv(dataCgv, tipe, code)).toEqual(expected);
});


it('getFilteredType: generate location selection for open account', () => {
  const movie = {
    'movieCode': '020',
    'listByMovie': [
      {
        'genre': 'HORROR ',
        'studioName': 'Audi #1',
        'cinemaCode': '020',
        'cinemaName': 'Slipi Jaya',
        'movieTypeCode': '01',
        'scheduleCode': 795197,
        'showDate': '20180806',
        'showEndTime': '1302',
        'movieName': 'SABRINA',
        'duration': 112,
        'movieTypeName': '2D',
        'movieCode': '18015800',
        'showStartTime': '1100',
        'studioCode': '1001',
        'movieCategoryCode': '1005',
        'movieCategoryName': '4DX2D',
      },
      {
        'genre': 'HORROR ',
        'studioName': 'Audi #1',
        'cinemaCode': '020',
        'cinemaName': 'Slipi Jaya',
        'movieTypeCode': '01',
        'scheduleCode': 795198,
        'showDate': '20180806',
        'showEndTime': '1517',
        'movieName': 'SABRINA',
        'duration': 112,
        'movieTypeName': '2D',
        'movieCode': '18015800',
        'showStartTime': '1315',
        'studioCode': '1001',
        'movieCategoryCode': '1005',
        'movieCategoryName': '4DX2D',
      },
      {
        'genre': 'HORROR ',
        'studioName': 'Audi #1',
        'cinemaCode': '020',
        'cinemaName': 'Slipi Jaya',
        'movieTypeCode': '01',
        'scheduleCode': 795199,
        'showDate': '20180806',
        'showEndTime': '1732',
        'movieName': 'SABRINA',
        'duration': 112,
        'movieTypeName': '2D',
        'movieCode': '18015800',
        'showStartTime': '1530',
        'studioCode': '1001',
        'movieCategoryCode': '1005',
        'movieCategoryName': '4DX2D',
      },
      {
        'genre': 'HORROR ',
        'studioName': 'Audi #1',
        'cinemaCode': '020',
        'cinemaName': 'Slipi Jaya',
        'movieTypeCode': '01',
        'scheduleCode': 795200,
        'showDate': '20180806',
        'showEndTime': '1947',
        'movieName': 'SABRINA',
        'duration': 112,
        'movieTypeName': '2D',
        'movieCode': '18015800',
        'showStartTime': '1745',
        'studioCode': '1001',
        'movieCategoryCode': '1005',
        'movieCategoryName': '4DX2D',
      },
      {
        'genre': 'HORROR ',
        'studioName': 'Audi #1',
        'cinemaCode': '020',
        'cinemaName': 'Slipi Jaya',
        'movieTypeCode': '01',
        'scheduleCode': 795201,
        'showDate': '20180806',
        'showEndTime': '2202',
        'movieName': 'SABRINA',
        'duration': 112,
        'movieTypeName': '2D',
        'movieCode': '18015800',
        'showStartTime': '2000',
        'studioCode': '1001',
        'movieCategoryCode': '1005',
        'movieCategoryName': '4DX2D',
      },
      {
        'genre': 'HORROR ',
        'studioName': 'Audi #1',
        'cinemaCode': '020',
        'cinemaName': 'Slipi Jaya',
        'movieTypeCode': '01',
        'scheduleCode': 795202,
        'showDate': '20180806',
        'showEndTime': '2417',
        'movieName': 'SABRINA',
        'duration': 112,
        'movieTypeName': '2D',
        'movieCode': '18015800',
        'showStartTime': '2215',
        'studioCode': '1001',
        'movieCategoryCode': '1005',
        'movieCategoryName': '4DX2D',
      }
    ],
    'movieName': 'SABRINA',
    'cinemaName': 'Slipi Jaya'
  };
  const expected =  [
    {
      'movieType': '4DX2D',
      'listByType': [
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795197,
          'showDate': '20180806',
          'showEndTime': '1302',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1100',
          'studioCode': '1001',
          'movieCategoryCode': '1005',
          'movieCategoryName': '4DX2D',
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795198,
          'showDate': '20180806',
          'showEndTime': '1517',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1315',
          'studioCode': '1001',
          'movieCategoryCode': '1005',
          'movieCategoryName': '4DX2D',
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795199,
          'showDate': '20180806',
          'showEndTime': '1732',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1530',
          'studioCode': '1001',
          'movieCategoryCode': '1005',
          'movieCategoryName': '4DX2D',
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795200,
          'showDate': '20180806',
          'showEndTime': '1947',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1745',
          'studioCode': '1001',
          'movieCategoryCode': '1005',
          'movieCategoryName': '4DX2D',
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795201,
          'showDate': '20180806',
          'showEndTime': '2202',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '2000',
          'studioCode': '1001',
          'movieCategoryCode': '1005',
          'movieCategoryName': '4DX2D',
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795202,
          'showDate': '20180806',
          'showEndTime': '2417',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '2215',
          'studioCode': '1001',
          'movieCategoryCode': '1005',
          'movieCategoryName': '4DX2D',
        }
      ]
    }
  ];
  expect(Utils.getFilteredType(movie)).toEqual(expected);
});

it('getFilteredStudio: generate location selection for open account', () => {
  const tipe = {
    'movieType': '2D',
    'listByType': [
      {
        'genre': 'HORROR ',
        'studioName': 'Audi #1',
        'cinemaCode': '020',
        'cinemaName': 'Slipi Jaya',
        'movieTypeCode': '01',
        'scheduleCode': 795197,
        'showDate': '20180806',
        'showEndTime': '1302',
        'movieName': 'SABRINA',
        'duration': 112,
        'movieTypeName': '2D',
        'movieCode': '18015800',
        'showStartTime': '1100',
        'studioCode': '1001'
      },
      {
        'genre': 'HORROR ',
        'studioName': 'Audi #1',
        'cinemaCode': '020',
        'cinemaName': 'Slipi Jaya',
        'movieTypeCode': '01',
        'scheduleCode': 795198,
        'showDate': '20180806',
        'showEndTime': '1517',
        'movieName': 'SABRINA',
        'duration': 112,
        'movieTypeName': '2D',
        'movieCode': '18015800',
        'showStartTime': '1315',
        'studioCode': '1001'
      },
      {
        'genre': 'HORROR ',
        'studioName': 'Audi #1',
        'cinemaCode': '020',
        'cinemaName': 'Slipi Jaya',
        'movieTypeCode': '01',
        'scheduleCode': 795199,
        'showDate': '20180806',
        'showEndTime': '1732',
        'movieName': 'SABRINA',
        'duration': 112,
        'movieTypeName': '2D',
        'movieCode': '18015800',
        'showStartTime': '1530',
        'studioCode': '1001'
      },
      {
        'genre': 'HORROR ',
        'studioName': 'Audi #1',
        'cinemaCode': '020',
        'cinemaName': 'Slipi Jaya',
        'movieTypeCode': '01',
        'scheduleCode': 795200,
        'showDate': '20180806',
        'showEndTime': '1947',
        'movieName': 'SABRINA',
        'duration': 112,
        'movieTypeName': '2D',
        'movieCode': '18015800',
        'showStartTime': '1745',
        'studioCode': '1001'
      },
      {
        'genre': 'HORROR ',
        'studioName': 'Audi #1',
        'cinemaCode': '020',
        'cinemaName': 'Slipi Jaya',
        'movieTypeCode': '01',
        'scheduleCode': 795201,
        'showDate': '20180806',
        'showEndTime': '2202',
        'movieName': 'SABRINA',
        'duration': 112,
        'movieTypeName': '2D',
        'movieCode': '18015800',
        'showStartTime': '2000',
        'studioCode': '1001'
      },
      {
        'genre': 'HORROR ',
        'studioName': 'Audi #1',
        'cinemaCode': '020',
        'cinemaName': 'Slipi Jaya',
        'movieTypeCode': '01',
        'scheduleCode': 795202,
        'showDate': '20180806',
        'showEndTime': '2417',
        'movieName': 'SABRINA',
        'duration': 112,
        'movieTypeName': '2D',
        'movieCode': '18015800',
        'showStartTime': '2215',
        'studioCode': '1001'
      }
    ]
  };

  const expected =  [
    {
      'studioName': 'Audi #1',
      'timeList': [
        {
          'showStartTime': '1100',
          'value': {
            'genre': 'HORROR ',
            'studioName': 'Audi #1',
            'cinemaCode': '020',
            'cinemaName': 'Slipi Jaya',
            'movieTypeCode': '01',
            'scheduleCode': 795197,
            'showDate': '20180806',
            'showEndTime': '1302',
            'movieName': 'SABRINA',
            'duration': 112,
            'movieTypeName': '2D',
            'movieCode': '18015800',
            'showStartTime': '1100',
            'studioCode': '1001'
          }
        },
        {
          'showStartTime': '1315',
          'value': {
            'genre': 'HORROR ',
            'studioName': 'Audi #1',
            'cinemaCode': '020',
            'cinemaName': 'Slipi Jaya',
            'movieTypeCode': '01',
            'scheduleCode': 795198,
            'showDate': '20180806',
            'showEndTime': '1517',
            'movieName': 'SABRINA',
            'duration': 112,
            'movieTypeName': '2D',
            'movieCode': '18015800',
            'showStartTime': '1315',
            'studioCode': '1001'
          }
        },
        {
          'showStartTime': '1530',
          'value': {
            'genre': 'HORROR ',
            'studioName': 'Audi #1',
            'cinemaCode': '020',
            'cinemaName': 'Slipi Jaya',
            'movieTypeCode': '01',
            'scheduleCode': 795199,
            'showDate': '20180806',
            'showEndTime': '1732',
            'movieName': 'SABRINA',
            'duration': 112,
            'movieTypeName': '2D',
            'movieCode': '18015800',
            'showStartTime': '1530',
            'studioCode': '1001'
          }
        },
        {
          'showStartTime': '1745',
          'value': {
            'genre': 'HORROR ',
            'studioName': 'Audi #1',
            'cinemaCode': '020',
            'cinemaName': 'Slipi Jaya',
            'movieTypeCode': '01',
            'scheduleCode': 795200,
            'showDate': '20180806',
            'showEndTime': '1947',
            'movieName': 'SABRINA',
            'duration': 112,
            'movieTypeName': '2D',
            'movieCode': '18015800',
            'showStartTime': '1745',
            'studioCode': '1001'
          }
        },
        {
          'showStartTime': '2000',
          'value': {
            'genre': 'HORROR ',
            'studioName': 'Audi #1',
            'cinemaCode': '020',
            'cinemaName': 'Slipi Jaya',
            'movieTypeCode': '01',
            'scheduleCode': 795201,
            'showDate': '20180806',
            'showEndTime': '2202',
            'movieName': 'SABRINA',
            'duration': 112,
            'movieTypeName': '2D',
            'movieCode': '18015800',
            'showStartTime': '2000',
            'studioCode': '1001'
          }
        },
        {
          'showStartTime': '2215',
          'value': {
            'genre': 'HORROR ',
            'studioName': 'Audi #1',
            'cinemaCode': '020',
            'cinemaName': 'Slipi Jaya',
            'movieTypeCode': '01',
            'scheduleCode': 795202,
            'showDate': '20180806',
            'showEndTime': '2417',
            'movieName': 'SABRINA',
            'duration': 112,
            'movieTypeName': '2D',
            'movieCode': '18015800',
            'showStartTime': '2215',
            'studioCode': '1001'
          }
        }
      ]
    }
  ];
  expect(Utils.getFilteredStudio(tipe)).toEqual(expected);
});

it('getFilterDate: generate location selection for open account', () => {
  const date = '20180806';
  const dataCgv = [
    {
      'movieCode': '006',
      'listByMovie': [
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #8',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 794969,
          'showDate': '20180806',
          'showEndTime': '1302',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1100',
          'studioCode': '1008'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #8',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 794970,
          'showDate': '20180806',
          'showEndTime': '1602',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1400',
          'studioCode': '1008'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #8',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 794971,
          'showDate': '20180806',
          'showEndTime': '1902',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1700',
          'studioCode': '1008'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #8',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 794972,
          'showDate': '20180806',
          'showEndTime': '2227',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '2025',
          'studioCode': '1008'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #8',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 794973,
          'showDate': '20180806',
          'showEndTime': '2547',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '2345',
          'studioCode': '1008'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #7',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 795298,
          'showDate': '20180807',
          'showEndTime': '1537',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1335',
          'studioCode': '1007'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #7',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 795299,
          'showDate': '20180807',
          'showEndTime': '1842',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1640',
          'studioCode': '1007'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #8',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 795303,
          'showDate': '20180807',
          'showEndTime': '1512',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1310',
          'studioCode': '1008'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #8',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 795304,
          'showDate': '20180807',
          'showEndTime': '1747',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1545',
          'studioCode': '1008'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #8',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 795305,
          'showDate': '20180807',
          'showEndTime': '2012',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1810',
          'studioCode': '1008'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #8',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 795306,
          'showDate': '20180807',
          'showEndTime': '2257',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '2055',
          'studioCode': '1008'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #10',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 795312,
          'showDate': '20180807',
          'showEndTime': '1332',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1130',
          'studioCode': '1010'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #10',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 795313,
          'showDate': '20180807',
          'showEndTime': '1647',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1445',
          'studioCode': '1010'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Satin #11',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 795318,
          'showDate': '20180807',
          'showEndTime': '2237',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '2035',
          'studioCode': '1011'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #9',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 795356,
          'showDate': '20180808',
          'showEndTime': '1217',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1015',
          'studioCode': '1009'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #9',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 795357,
          'showDate': '20180808',
          'showEndTime': '1452',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1250',
          'studioCode': '1009'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #9',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 795358,
          'showDate': '20180808',
          'showEndTime': '1732',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1530',
          'studioCode': '1009'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #9',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 795359,
          'showDate': '20180808',
          'showEndTime': '2027',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1825',
          'studioCode': '1009'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #9',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 795360,
          'showDate': '20180808',
          'showEndTime': '2302',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '2100',
          'studioCode': '1009'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #9',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 795361,
          'showDate': '20180808',
          'showEndTime': '2602',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '2400',
          'studioCode': '1009'
        }
      ],
      'movieName': 'SABRINA',
      'cinemaName': 'Central Park'
    },
    {
      'movieCode': '020',
      'listByMovie': [
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795197,
          'showDate': '20180806',
          'showEndTime': '1302',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1100',
          'studioCode': '1001'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795198,
          'showDate': '20180806',
          'showEndTime': '1517',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1315',
          'studioCode': '1001'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795199,
          'showDate': '20180806',
          'showEndTime': '1732',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1530',
          'studioCode': '1001'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795200,
          'showDate': '20180806',
          'showEndTime': '1947',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1745',
          'studioCode': '1001'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795201,
          'showDate': '20180806',
          'showEndTime': '2202',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '2000',
          'studioCode': '1001'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795202,
          'showDate': '20180806',
          'showEndTime': '2417',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '2215',
          'studioCode': '1001'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795221,
          'showDate': '20180807',
          'showEndTime': '1302',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1100',
          'studioCode': '1001'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795222,
          'showDate': '20180807',
          'showEndTime': '1517',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1315',
          'studioCode': '1001'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795223,
          'showDate': '20180807',
          'showEndTime': '1732',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1530',
          'studioCode': '1001'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795224,
          'showDate': '20180807',
          'showEndTime': '1947',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1745',
          'studioCode': '1001'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795225,
          'showDate': '20180807',
          'showEndTime': '2202',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '2000',
          'studioCode': '1001'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795226,
          'showDate': '20180807',
          'showEndTime': '2417',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '2215',
          'studioCode': '1001'
        }
      ],
      'movieName': 'SABRINA',
      'cinemaName': 'Slipi Jaya'
    }
  ];

  const expected =  [
    {
      'movieCode': '006',
      'listByMovie': [
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #8',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 794969,
          'showDate': '20180806',
          'showEndTime': '1302',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1100',
          'studioCode': '1008'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #8',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 794970,
          'showDate': '20180806',
          'showEndTime': '1602',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1400',
          'studioCode': '1008'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #8',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 794971,
          'showDate': '20180806',
          'showEndTime': '1902',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1700',
          'studioCode': '1008'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #8',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 794972,
          'showDate': '20180806',
          'showEndTime': '2227',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '2025',
          'studioCode': '1008'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #8',
          'cinemaCode': '006',
          'cinemaName': 'Central Park',
          'movieTypeCode': '01',
          'scheduleCode': 794973,
          'showDate': '20180806',
          'showEndTime': '2547',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '2345',
          'studioCode': '1008'
        }
      ],
      'movieName': 'SABRINA',
      'cinemaName': 'Central Park'
    },
    {
      'movieCode': '020',
      'listByMovie': [
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795197,
          'showDate': '20180806',
          'showEndTime': '1302',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1100',
          'studioCode': '1001'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795198,
          'showDate': '20180806',
          'showEndTime': '1517',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1315',
          'studioCode': '1001'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795199,
          'showDate': '20180806',
          'showEndTime': '1732',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1530',
          'studioCode': '1001'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795200,
          'showDate': '20180806',
          'showEndTime': '1947',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '1745',
          'studioCode': '1001'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795201,
          'showDate': '20180806',
          'showEndTime': '2202',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '2000',
          'studioCode': '1001'
        },
        {
          'genre': 'HORROR ',
          'studioName': 'Audi #1',
          'cinemaCode': '020',
          'cinemaName': 'Slipi Jaya',
          'movieTypeCode': '01',
          'scheduleCode': 795202,
          'showDate': '20180806',
          'showEndTime': '2417',
          'movieName': 'SABRINA',
          'duration': 112,
          'movieTypeName': '2D',
          'movieCode': '18015800',
          'showStartTime': '2215',
          'studioCode': '1001'
        }
      ],
      'movieName': 'SABRINA',
      'cinemaName': 'Slipi Jaya'
    }
  ];
  expect(Utils.getFilterDate(dataCgv, date)).toEqual(expected);
});

it('generateCgvLabel: generate location selection for open account', () => {
  const listCgv = [
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #8',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 794969,
      'showDate': '20180806',
      'showEndTime': '1302',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1100',
      'studioCode': '1008'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #8',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 794970,
      'showDate': '20180806',
      'showEndTime': '1602',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1400',
      'studioCode': '1008'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #8',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 794971,
      'showDate': '20180806',
      'showEndTime': '1902',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1700',
      'studioCode': '1008'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #8',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 794972,
      'showDate': '20180806',
      'showEndTime': '2227',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '2025',
      'studioCode': '1008'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #8',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 794973,
      'showDate': '20180806',
      'showEndTime': '2547',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '2345',
      'studioCode': '1008'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #1',
      'cinemaCode': '020',
      'cinemaName': 'Slipi Jaya',
      'movieTypeCode': '01',
      'scheduleCode': 795197,
      'showDate': '20180806',
      'showEndTime': '1302',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1100',
      'studioCode': '1001'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #1',
      'cinemaCode': '020',
      'cinemaName': 'Slipi Jaya',
      'movieTypeCode': '01',
      'scheduleCode': 795198,
      'showDate': '20180806',
      'showEndTime': '1517',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1315',
      'studioCode': '1001'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #1',
      'cinemaCode': '020',
      'cinemaName': 'Slipi Jaya',
      'movieTypeCode': '01',
      'scheduleCode': 795199,
      'showDate': '20180806',
      'showEndTime': '1732',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1530',
      'studioCode': '1001'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #1',
      'cinemaCode': '020',
      'cinemaName': 'Slipi Jaya',
      'movieTypeCode': '01',
      'scheduleCode': 795200,
      'showDate': '20180806',
      'showEndTime': '1947',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1745',
      'studioCode': '1001'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #1',
      'cinemaCode': '020',
      'cinemaName': 'Slipi Jaya',
      'movieTypeCode': '01',
      'scheduleCode': 795201,
      'showDate': '20180806',
      'showEndTime': '2202',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '2000',
      'studioCode': '1001'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #1',
      'cinemaCode': '020',
      'cinemaName': 'Slipi Jaya',
      'movieTypeCode': '01',
      'scheduleCode': 795202,
      'showDate': '20180806',
      'showEndTime': '2417',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '2215',
      'studioCode': '1001'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #1',
      'cinemaCode': '020',
      'cinemaName': 'Slipi Jaya',
      'movieTypeCode': '01',
      'scheduleCode': 795221,
      'showDate': '20180807',
      'showEndTime': '1302',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1100',
      'studioCode': '1001'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #1',
      'cinemaCode': '020',
      'cinemaName': 'Slipi Jaya',
      'movieTypeCode': '01',
      'scheduleCode': 795222,
      'showDate': '20180807',
      'showEndTime': '1517',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1315',
      'studioCode': '1001'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #1',
      'cinemaCode': '020',
      'cinemaName': 'Slipi Jaya',
      'movieTypeCode': '01',
      'scheduleCode': 795223,
      'showDate': '20180807',
      'showEndTime': '1732',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1530',
      'studioCode': '1001'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #1',
      'cinemaCode': '020',
      'cinemaName': 'Slipi Jaya',
      'movieTypeCode': '01',
      'scheduleCode': 795224,
      'showDate': '20180807',
      'showEndTime': '1947',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1745',
      'studioCode': '1001'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #1',
      'cinemaCode': '020',
      'cinemaName': 'Slipi Jaya',
      'movieTypeCode': '01',
      'scheduleCode': 795225,
      'showDate': '20180807',
      'showEndTime': '2202',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '2000',
      'studioCode': '1001'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #1',
      'cinemaCode': '020',
      'cinemaName': 'Slipi Jaya',
      'movieTypeCode': '01',
      'scheduleCode': 795226,
      'showDate': '20180807',
      'showEndTime': '2417',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '2215',
      'studioCode': '1001'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #7',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 795298,
      'showDate': '20180807',
      'showEndTime': '1537',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1335',
      'studioCode': '1007'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #7',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 795299,
      'showDate': '20180807',
      'showEndTime': '1842',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1640',
      'studioCode': '1007'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #8',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 795303,
      'showDate': '20180807',
      'showEndTime': '1512',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1310',
      'studioCode': '1008'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #8',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 795304,
      'showDate': '20180807',
      'showEndTime': '1747',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1545',
      'studioCode': '1008'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #8',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 795305,
      'showDate': '20180807',
      'showEndTime': '2012',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1810',
      'studioCode': '1008'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #8',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 795306,
      'showDate': '20180807',
      'showEndTime': '2257',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '2055',
      'studioCode': '1008'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #10',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 795312,
      'showDate': '20180807',
      'showEndTime': '1332',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1130',
      'studioCode': '1010'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #10',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 795313,
      'showDate': '20180807',
      'showEndTime': '1647',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1445',
      'studioCode': '1010'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Satin #11',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 795318,
      'showDate': '20180807',
      'showEndTime': '2237',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '2035',
      'studioCode': '1011'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #9',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 795356,
      'showDate': '20180808',
      'showEndTime': '1217',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1015',
      'studioCode': '1009'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #9',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 795357,
      'showDate': '20180808',
      'showEndTime': '1452',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1250',
      'studioCode': '1009'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #9',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 795358,
      'showDate': '20180808',
      'showEndTime': '1732',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1530',
      'studioCode': '1009'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #9',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 795359,
      'showDate': '20180808',
      'showEndTime': '2027',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '1825',
      'studioCode': '1009'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #9',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 795360,
      'showDate': '20180808',
      'showEndTime': '2302',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '2100',
      'studioCode': '1009'
    },
    {
      'genre': 'HORROR ',
      'studioName': 'Audi #9',
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'movieTypeCode': '01',
      'scheduleCode': 795361,
      'showDate': '20180808',
      'showEndTime': '2602',
      'movieName': 'SABRINA',
      'duration': 112,
      'movieTypeName': '2D',
      'movieCode': '18015800',
      'showStartTime': '2400',
      'studioCode': '1009'
    }
  ];
  const tipe = undefined;
  const expected =  [
    {
      'code': '006',
      'name': 'Central Park',
      'display': 'Central Park'
    }
  ];
  expect(Utils.generateCgvLabel(listCgv, tipe)).toEqual(expected);
});

it('filterCity: generate location selection for open account', () => {
  const data = [
    {
      'cinemaCode': '001',
      'cinemaName': 'Paris Van Java',
      'cinemaPhoneNumber': null,
      'cityName': 'Bandung',
      'provinceCode': '1057',
      'cityCode': '009',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/001.JPG',
      'cinemaAddress': 'JL.SUKAJADI NO.137-139 CIPEDES SUKAJADI BANDUNG',
      'longitude': 107.5936166,
      'provinceName': 'Jawa Barat',
      'latitude': -6.8892843
    },
    {
      'cinemaCode': '007',
      'cinemaName': 'Bekasi Cyber Park',
      'cinemaPhoneNumber': null,
      'cityName': 'Bekasi',
      'provinceCode': '1057',
      'cityCode': '013',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/007.JPG',
      'cinemaAddress': 'BEKASI CYBER PARK 3RD FLOOR, JL. KH. NOOR ALIE NO.177, BEKASI BARAT',
      'longitude': 106.9912163,
      'provinceName': 'Jawa Barat',
      'latitude': -6.2233677
    },
    {
      'cinemaCode': '011',
      'cinemaName': 'Miko Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Bandung',
      'provinceCode': '1057',
      'cityCode': '009',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/011.JPG',
      'cinemaAddress': 'JL. KOPO NO. 599, RT 001 RW 004, CIRANJANG, BABAKAN CIPARAY, BANDUNG',
      'longitude': 107.58058,
      'provinceName': 'Jawa Barat',
      'latitude': -6.959888
    },
    {
      'cinemaCode': '014',
      'cinemaName': 'BEC Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Bandung',
      'provinceCode': '1057',
      'cityCode': '009',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/014.JPG',
      'cinemaAddress': 'ISTANA BEC BANDUNG LANTAI 3A, JL. PURNAWARMAN NO. 7-11 BANDUNG, JAWA BARAT 40117',
      'longitude': 107.609047,
      'provinceName': 'Jawa Barat',
      'latitude': -6.90804
    },
    {
      'cinemaCode': '016',
      'cinemaName': 'Grage City Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Cirebon',
      'provinceCode': '1057',
      'cityCode': '017',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/016.JPG',
      'cinemaAddress': 'GRAGE CITY MALL LT.3, KAWASAN GRAGE CITY MALL, JL. AHMAD YANI, PENGGAMBIRAN, CIR EBON JAWA BARAT',
      'longitude': 108.570836,
      'provinceName': 'Jawa Barat',
      'latitude': -6.739919
    },
    {
      'cinemaCode': '019',
      'cinemaName': 'Festive Walk',
      'cinemaPhoneNumber': null,
      'cityName': 'Karawang',
      'provinceCode': '1057',
      'cityCode': '051',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/019.JPG',
      'cinemaAddress': 'KAWASAN CBD GALUH MAS KARAWANG',
      'longitude': 107.291289,
      'provinceName': 'Jawa Barat',
      'latitude': -6.327407
    },
    {
      'cinemaCode': '029',
      'cinemaName': '23 Paskal Shopping Center',
      'cinemaPhoneNumber': null,
      'cityName': 'Bandung',
      'provinceCode': '1057',
      'cityCode': '009',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/029.JPG',
      'cinemaAddress': 'JL. PASIR KALIKI RUKO PASKAL HIPER SQUARE BLOK D NO. 18, ANDIR KOTA BANDUNG, JAW A BARAT',
      'longitude': 107.594263,
      'provinceName': 'Jawa Barat',
      'latitude': -6.91529
    },
    {
      'cinemaCode': '030',
      'cinemaName': 'Depok Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Depok',
      'provinceCode': '1057',
      'cityCode': '019',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/030.JPG',
      'cinemaAddress': 'JALAN RAYA MARGONDA KAV.88, KEMIRIMUKA, DEPOK',
      'longitude': 106.826936,
      'provinceName': 'Jawa Barat',
      'latitude': -6.386982
    },
    {
      'cinemaCode': '036',
      'cinemaName': 'Bekasi Trade Center',
      'cinemaPhoneNumber': null,
      'cityName': 'Bekasi',
      'provinceCode': '1057',
      'cityCode': '013',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/036.JPG',
      'cinemaAddress': 'GAPURA PRIMA MALL BEKASI',
      'longitude': 107.021037,
      'provinceName': 'Jawa Barat',
      'latitude': -6.259654
    },
    {
      'cinemaCode': '038',
      'cinemaName': 'Metro Indah Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Bandung',
      'provinceCode': '1057',
      'cityCode': '009',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/038.JPG',
      'cinemaAddress': 'METRO INDAH MALL BANDUNG, JL. SOEKARNO - HATTA NO.590, SEKEJATO, BUAHBATU, KOTA BANDUNG',
      'longitude': 107.659731,
      'provinceName': 'Jawa Barat',
      'latitude': -6.941485
    },
    {
      'cinemaCode': '040',
      'cinemaName': 'Lagoon Avenue Bekasi',
      'cinemaPhoneNumber': null,
      'cityName': 'Bekasi',
      'provinceCode': '1057',
      'cityCode': '013',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/040.JPG',
      'cinemaAddress': 'MALL GRAND KAMALA LAGOON Lantai Transfer Floor Unit No. T #01',
      'longitude': 106.979007,
      'provinceName': 'Jawa Barat',
      'latitude': -6.250288
    },
    {
      'cinemaCode': '042',
      'cinemaName': 'Transmart Cirebon',
      'cinemaPhoneNumber': null,
      'cityName': 'Cirebon',
      'provinceCode': '1057',
      'cityCode': '017',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/042.JPG',
      'cinemaAddress': 'Transmart Cipto Cirebon, Pekiringan, Kesambi, Cirebon City, West Java 45131',
      'longitude': 108.549108,
      'provinceName': 'Jawa Barat',
      'latitude': -6.720398
    },
    {
      'cinemaCode': '046',
      'cinemaName': 'Technomart',
      'cinemaPhoneNumber': null,
      'cityName': 'Karawang',
      'provinceCode': '1057',
      'cityCode': '051',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/046.JPG',
      'cinemaAddress': 'Technomart, Jl. Arteri Galuh MAS, Puseurjaya, Telukjambe Timur, Kabupaten Karawa ng, Jawa Barat 41361',
      'longitude': 107.292929,
      'provinceName': 'Jawa Barat',
      'latitude': -6.328216
    },
    {
      'cinemaCode': '002',
      'cinemaName': 'Grand Indonesia',
      'cinemaPhoneNumber': null,
      'cityName': 'Jakarta Pusat',
      'provinceCode': '1058',
      'cityCode': '002',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/002.JPG',
      'cinemaAddress': 'JL. MH. THAMRIN NO.1',
      'longitude': 106.821675,
      'provinceName': 'DKI Jakarta',
      'latitude': -6.1945985
    },
    {
      'cinemaCode': '003',
      'cinemaName': 'Pacific Place',
      'cinemaPhoneNumber': null,
      'cityName': 'Jakarta Selatan',
      'provinceCode': '1058',
      'cityCode': '003',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/003.JPG',
      'cinemaAddress': 'GEDUNG ONE PACIFIC PLACE JL JEND SUDIRMAN KAV 52-53 SENAYAN KEBAYORAN BARU JAKA RTA SELATAN',
      'longitude': 106.810067,
      'provinceName': 'DKI Jakarta',
      'latitude': -6.225017
    },
    {
      'cinemaCode': '004',
      'cinemaName': 'Mall of Indonesia',
      'cinemaPhoneNumber': null,
      'cityName': 'Jakarta Utara',
      'provinceCode': '1058',
      'cityCode': '005',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/004.JPG',
      'cinemaAddress': 'JL BOULEVARD BARAT RAYA, KELAPA GADING BARAT JAKARTA UTARA',
      'longitude': 106.8943692,
      'provinceName': 'DKI Jakarta',
      'latitude': -6.1188502
    },
    {
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'cinemaPhoneNumber': null,
      'cityName': 'Jakarta Barat',
      'provinceCode': '1058',
      'cityCode': '001',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/006.JPG',
      'cinemaAddress': 'JL. S. PARMAN KAV. 28, TANJUNG DUREN SELATAN - GROGOL PETAMBURAN, JAKARTA BARAT - DKI JAKARTA',
      'longitude': 106.47291,
      'provinceName': 'DKI Jakarta',
      'latitude': -6.10388
    },
    {
      'cinemaCode': '020',
      'cinemaName': 'Slipi Jaya',
      'cinemaPhoneNumber': null,
      'cityName': 'Jakarta Barat',
      'provinceCode': '1058',
      'cityCode': '001',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/020.JPG',
      'cinemaAddress': 'Plaza Slipi Jaya lt.4, Jl. Let. Jend. S. Parman Kav.17-18, Slipi - Palmerah, Jak arta Barat',
      'longitude': 106.796288,
      'provinceName': 'DKI Jakarta',
      'latitude': -6.189182
    },
    {
      'cinemaCode': '025',
      'cinemaName': 'Green Pramuka Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Jakarta Pusat',
      'provinceCode': '1058',
      'cityCode': '002',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/025.JPG',
      'cinemaAddress': 'GREEN PRAMUKA SQUARE, JL. JEND. AHMAD YANI KAV.49',
      'longitude': 106.874389,
      'provinceName': 'DKI Jakarta',
      'latitude': -6.189533
    },
    {
      'cinemaCode': '028',
      'cinemaName': 'Bella Terra Lifestyle Center',
      'cinemaPhoneNumber': null,
      'cityName': 'Jakarta Utara',
      'provinceCode': '1058',
      'cityCode': '005',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/028.JPG',
      'cinemaAddress': 'BELLA TERRA LIFESTYLE CENTER, JAKARTA UTARA, JL. BOULEVARD RAYA KAV.1, KELAPA GA DING',
      'longitude': 106.894248,
      'provinceName': 'DKI Jakarta',
      'latitude': -6.174994
    },
    {
      'cinemaCode': '035',
      'cinemaName': 'Transmart Cempaka Putih',
      'cinemaPhoneNumber': null,
      'cityName': 'Jakarta Pusat',
      'provinceCode': '1058',
      'cityCode': '002',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/035.JPG',
      'cinemaAddress': 'TRANSMART Cempaka Putih, Cempaka Putih Timur, Cempaka Putih, Jl. A. Yani No.83, RT.10/RW.7, Cemp. Putih Tim., Cemp. Putih, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10510',
      'longitude': 106.877045,
      'provinceName': 'DKI Jakarta',
      'latitude': -6.168928
    },
    {
      'cinemaCode': '037',
      'cinemaName': 'Aeon Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Jakarta Timur',
      'provinceCode': '1058',
      'cityCode': '004',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/037.JPG',
      'cinemaAddress': 'AEON MALL ( JAKARTA GARDEN CITY )',
      'longitude': 106.952314,
      'provinceName': 'DKI Jakarta',
      'latitude': -6.172672
    },
    {
      'cinemaCode': '005',
      'cinemaName': 'Teras Kota',
      'cinemaPhoneNumber': null,
      'cityName': 'Tangerang',
      'provinceCode': '1059',
      'cityCode': '044',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/005.JPG',
      'cinemaAddress': 'TERASKOTA ENTERTAINMENT CENTER , JL. PAHLAWAN SERIBU BSD CITY, KEL. LENGKONG GUD ANG, SERPONG - TANGERANG SELATAN, BANTEN',
      'longitude': 106.667442,
      'provinceName': 'Banten',
      'latitude': -6.295737
    },
    {
      'cinemaCode': '015',
      'cinemaName': 'Bandara City Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Tangerang',
      'provinceCode': '1059',
      'cityCode': '044',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/015.JPG',
      'cinemaAddress': 'Bandara City Mall lt.2, Jl. Raya Perancis, Dadap Tangerang 15211',
      'longitude': 106.692062,
      'provinceName': 'Banten',
      'latitude': -6.092144
    },
    {
      'cinemaCode': '022',
      'cinemaName': 'Ecoplaza Citraraya Cikupa',
      'cinemaPhoneNumber': null,
      'cityName': 'Tangerang',
      'provinceCode': '1059',
      'cityCode': '044',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/022.JPG',
      'cinemaAddress': 'JL. ECOPOLIS BOULEVARD SELATAN 2ND FLOOR, CITRA RAYA - TANGERANG 15719',
      'longitude': 106.5242606,
      'provinceName': 'Banten',
      'latitude': -6.249664
    },
    {
      'cinemaCode': '045',
      'cinemaName': 'Transmart Bintaro',
      'cinemaPhoneNumber': null,
      'cityName': 'Tangerang Selatan',
      'provinceCode': '1059',
      'cityCode': '043',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/045.JPG',
      'cinemaAddress': 'TRANSMART Graha Binataro, Jl Graha Raya, Blok CP 03 A, Kelurahan Pakujaya, Serpo ng Utara',
      'longitude': 106.675745,
      'provinceName': 'Banten',
      'latitude': -6.240305
    },
    {
      'cinemaCode': '008',
      'cinemaName': 'Plaza Balikpapan',
      'cinemaPhoneNumber': null,
      'cityName': 'Balikpapan',
      'provinceCode': '1060',
      'cityCode': '007',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/008.JPG',
      'cinemaAddress': 'Balikpapan Plaza lt.1, Balikpapan, Jl. Jend. Sudirman Klandasan Ilir',
      'longitude': 116.838435,
      'provinceName': 'Kalimantan Timur',
      'latitude': -1.277784
    },
    {
      'cinemaCode': '009',
      'cinemaName': 'Kepri Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Batam',
      'provinceCode': '1061',
      'cityCode': '011',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/009.JPG',
      'cinemaAddress': 'Jl. Jend. Sudirman, Simpang Mukakuning - Sukajadi Batam',
      'longitude': 104.036991,
      'provinceName': 'Kepulauan Riau',
      'latitude': 1.101445
    },
    {
      'cinemaCode': '010',
      'cinemaName': 'Harbour Bay',
      'cinemaPhoneNumber': null,
      'cityName': 'Batam',
      'provinceCode': '1061',
      'cityCode': '011',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/010.JPG',
      'cinemaAddress': 'Harbour Bay lt.3, Batam, Jl. Duyung Batu Ampar',
      'longitude': 104.0014642,
      'provinceName': 'Kepulauan Riau',
      'latitude': 1.1541421
    },
    {
      'cinemaCode': '013',
      'cinemaName': 'Jwalk Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Yogyakarta',
      'provinceCode': '1062',
      'cityCode': '049',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/013.JPG',
      'cinemaAddress': 'SAHID J-WALK LANTAI 3, KAWASAN SAHID YOGYA LIFESTYLE CITY, JL. BABASARI NO.2 CAT UR TUNGGAL, DEPOK, SLEMAN, YOGYAKARTA',
      'longitude': 110.24521,
      'provinceName': 'DI Yogyakarta',
      'latitude': -7.46474
    },
    {
      'cinemaCode': '017',
      'cinemaName': 'Hartono Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Yogyakarta',
      'provinceCode': '1062',
      'cityCode': '049',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/017.JPG',
      'cinemaAddress': 'HARTONO MALL LT.2, JL. RING ROAD UTARA, CONDONG CATUR DEPOK, SLEMAN - YOGYAKARTA',
      'longitude': 110.23567,
      'provinceName': 'DI Yogyakarta',
      'latitude': -7.45324
    },
    {
      'cinemaCode': '031',
      'cinemaName': 'Transmart Maguwo',
      'cinemaPhoneNumber': null,
      'cityName': 'Yogyakarta',
      'provinceCode': '1062',
      'cityCode': '049',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/031.JPG',
      'cinemaAddress': 'TRANSMART Maguwo, Jl. Raya Solo KM 8 No. 234, Maguwoharjo, Depok Sub-District, S leman Regency, Special Region of Yogyakarta 55282',
      'longitude': 110.419986,
      'provinceName': 'DI Yogyakarta',
      'latitude': -7.78279
    },
    {
      'cinemaCode': '018',
      'cinemaName': 'Marvell City',
      'cinemaPhoneNumber': null,
      'cityName': 'Surabaya',
      'provinceCode': '1063',
      'cityCode': '041',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/018.JPG',
      'cinemaAddress': 'MARVELL CITY MALL LT.3, JL. NGAGEL NO.123, WONOKROMO, SURABAYA - JAWA TIMUR',
      'longitude': 112.7456389,
      'provinceName': 'Jawa Timur',
      'latitude': -7.2888162
    },
    {
      'cinemaCode': '023',
      'cinemaName': 'Sunrise Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Mojokerto',
      'provinceCode': '1063',
      'cityCode': '029',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/023.JPG',
      'cinemaAddress': 'JL. BENTENG PANCASILA NO.9, KOTA MOJOKERTO',
      'longitude': 112.443415,
      'provinceName': 'Jawa Timur',
      'latitude': -7.471004
    },
    {
      'cinemaCode': '048',
      'cinemaName': 'BG Junction',
      'cinemaPhoneNumber': null,
      'cityName': 'Surabaya',
      'provinceCode': '1063',
      'cityCode': '041',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/048.JPG',
      'cinemaAddress': 'Surabaya Jalan Keranggan No.8A',
      'longitude': 112.733369,
      'provinceName': 'Jawa Timur',
      'latitude': -7.254971
    },
    {
      'cinemaCode': '053',
      'cinemaName': 'Blitar Square',
      'cinemaPhoneNumber': null,
      'cityName': 'Blitar',
      'provinceCode': '1063',
      'cityCode': '059',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/053.JPG',
      'cinemaAddress': null,
      'longitude': 112.166816,
      'provinceName': 'Jawa Timur',
      'latitude': -8.098573
    },
    {
      'cinemaCode': '021',
      'cinemaName': 'Grand Kawanua City',
      'cinemaPhoneNumber': null,
      'cityName': 'Manado',
      'provinceCode': '1064',
      'cityCode': '026',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/021.JPG',
      'cinemaAddress': 'Grand Kawanua City Walk Manado lt. 1, Jl. Mr. A.A maramis, Kayuwatu/Kairagi II',
      'longitude': 124.900439,
      'provinceName': 'Sulawesi Utara',
      'latitude': 1.504217
    },
    {
      'cinemaCode': '024',
      'cinemaName': 'Focal Point',
      'cinemaPhoneNumber': null,
      'cityName': 'Medan',
      'provinceCode': '1065',
      'cityCode': '028',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/024.JPG',
      'cinemaAddress': 'TAMAN SETIA BUDI INDAH BLOK V NO.11, ASAM KUMBANG - MEDAN SELAYANG, KOTA MEDAN',
      'longitude': 98.625684,
      'provinceName': 'Sumatera Utara',
      'latitude': 3.566832
    },
    {
      'cinemaCode': '026',
      'cinemaName': 'Rita Supermall',
      'cinemaPhoneNumber': null,
      'cityName': 'Purwokerto',
      'provinceCode': '1066',
      'cityCode': '050',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/026.JPG',
      'cinemaAddress': 'JL. JENDRAL SUDIRMAN NO.296, SOEKANEGARA, PURWOKERTO TIMUR, JAWA TENGAH',
      'longitude': 109.1174513,
      'provinceName': 'Jawa Tengah',
      'latitude': -6.8698217
    },
    {
      'cinemaCode': '032',
      'cinemaName': 'Transmart Tegal',
      'cinemaPhoneNumber': null,
      'cityName': 'Tegal',
      'provinceCode': '1066',
      'cityCode': '048',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/032.JPG',
      'cinemaAddress': 'TRANSMART Tegal, Jl. Kolonel Soegiono, Kemandungan, Tegal Bar., Kota Tegal, Jawa Tengah 52112',
      'longitude': 109.123097,
      'provinceName': 'Jawa Tengah',
      'latitude': -6.868005
    },
    {
      'cinemaCode': '041',
      'cinemaName': 'Transmart Solo',
      'cinemaPhoneNumber': null,
      'cityName': 'Solo',
      'provinceCode': '1066',
      'cityCode': '042',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/041.JPG',
      'cinemaAddress': 'Transmart Solo Pabelan, Jl. Raya A. Yani no. 234, Pabelan Kartosuro, Pabelan, Ka rtasura, Kabupaten Sukoharjo, Jawa Tengah 57162',
      'longitude': 110.773891,
      'provinceName': 'Jawa Tengah',
      'latitude': -7.557537
    },
    {
      'cinemaCode': '027',
      'cinemaName': 'Social Market',
      'cinemaPhoneNumber': null,
      'cityName': 'Palembang',
      'provinceCode': '1067',
      'cityCode': '032',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/027.JPG',
      'cinemaAddress': 'lantai 2, Jl. Veteran, Palembang',
      'longitude': 104.766732,
      'provinceName': 'Sumatera Selatan',
      'latitude': -2.975414
    },
    {
      'cinemaCode': '039',
      'cinemaName': 'Transmart Palembang',
      'cinemaPhoneNumber': null,
      'cityName': 'Palembang',
      'provinceCode': '1067',
      'cityCode': '032',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/039.JPG',
      'cinemaAddress': 'Transmart Palembang, Jl. Brigjen. HM Dhani Effendi, Palembang',
      'longitude': 104.747126,
      'provinceName': 'Sumatera Selatan',
      'latitude': -2.981127
    },
    {
      'cinemaCode': '033',
      'cinemaName': 'Transmart Pekanbaru',
      'cinemaPhoneNumber': null,
      'cityName': 'Pekanbaru',
      'provinceCode': '1068',
      'cityCode': '034',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/033.JPG',
      'cinemaAddress': 'TRANSMART Pekanbaru, Jl. Musyawarah No.11, Labuh Baru Tim., Payung Sekaki, Kota Pekanbaru, Riau 28292',
      'longitude': 101.42012,
      'provinceName': 'Riau',
      'latitude': 0.503309
    },
    {
      'cinemaCode': '034',
      'cinemaName': 'Transmart Mataram',
      'cinemaPhoneNumber': null,
      'cityName': 'Mataram',
      'provinceCode': '1069',
      'cityCode': '027',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/034.JPG',
      'cinemaAddress': 'TRANSMART Mataram, Jl. Selaparang No.60, Mayura, Cakranegara, Kota Mataram, Nusa Tenggara Bar. 83239',
      'longitude': 116.145899,
      'provinceName': 'Nusa Tenggara Barat',
      'latitude': -8.590729
    },
    {
      'cinemaCode': '043',
      'cinemaName': 'Transmart Lampung',
      'cinemaPhoneNumber': null,
      'cityName': 'Lampung',
      'provinceCode': '1070',
      'cityCode': '008',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/043.JPG',
      'cinemaAddress': 'Transmart Lampung, Jl. Sultan Agung No.283, Way Halim Permai, Way Halim, Kota Ba ndar Lampung, Lampung 35132',
      'longitude': 105.282415,
      'provinceName': 'Lampung',
      'latitude': -5.382942
    },
    {
      'cinemaCode': '044',
      'cinemaName': 'Daya Grand Square',
      'cinemaPhoneNumber': null,
      'cityName': 'Makassar',
      'provinceCode': '1071',
      'cityCode': '024',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/044.JPG',
      'cinemaAddress': 'DAYA GRAND SQUARE , JL. PERINTIS KEMERDEKAAN KM.14, DAYA - MAKASAR',
      'longitude': 119.510554,
      'provinceName': 'Sulawesi Selatan',
      'latitude': -5.11006
    }
  ];
  const code = undefined;
  const expected =  [{'code': '007', 'name': 'Balikpapan'}, {'code': '009', 'name': 'Bandung'}, {'code': '011', 'name': 'Batam'}, {'code': '013', 'name': 'Bekasi'}, {'code': '059', 'name': 'Blitar'}, {'code': '017', 'name': 'Cirebon'}, {'code': '019', 'name': 'Depok'}, {'code': '001', 'name': 'Jakarta Barat'}, {'code': '002', 'name': 'Jakarta Pusat'}, {'code': '003', 'name': 'Jakarta Selatan'}, {'code': '004', 'name': 'Jakarta Timur'}, {'code': '005', 'name': 'Jakarta Utara'}, {'code': '051', 'name': 'Karawang'}, {'code': '008', 'name': 'Lampung'}, {'code': '024', 'name': 'Makassar'}, {'code': '026', 'name': 'Manado'}, {'code': '027', 'name': 'Mataram'}, {'code': '028', 'name': 'Medan'}, {'code': '029', 'name': 'Mojokerto'}, {'code': '032', 'name': 'Palembang'}, {'code': '034', 'name': 'Pekanbaru'}, {'code': '050', 'name': 'Purwokerto'}, {'code': '042', 'name': 'Solo'}, {'code': '041', 'name': 'Surabaya'}, {'code': '044', 'name': 'Tangerang'}, {'code': '043', 'name': 'Tangerang Selatan'}, {'code': '048', 'name': 'Tegal'}, {'code': '049', 'name': 'Yogyakarta'}];
  expect(Utils.filterCity(data, code)).toEqual(expected);
});

it('generateCgvCityLabel: generate location selection for open account', () => {
  const cityList = [
    {
      'code': '009',
      'name': 'Bandung'
    },
    {
      'code': '013',
      'name': 'Bekasi'
    },
    {
      'code': '017',
      'name': 'Cirebon'
    },
    {
      'code': '051',
      'name': 'Karawang'
    },
    {
      'code': '019',
      'name': 'Depok'
    },
    {
      'code': '002',
      'name': 'Jakarta Pusat'
    },
    {
      'code': '003',
      'name': 'Jakarta Selatan'
    },
    {
      'code': '005',
      'name': 'Jakarta Utara'
    },
    {
      'code': '001',
      'name': 'Jakarta Barat'
    },
    {
      'code': '004',
      'name': 'Jakarta Timur'
    },
    {
      'code': '044',
      'name': 'Tangerang'
    },
    {
      'code': '043',
      'name': 'Tangerang Selatan'
    },
    {
      'code': '007',
      'name': 'Balikpapan'
    },
    {
      'code': '011',
      'name': 'Batam'
    },
    {
      'code': '049',
      'name': 'Yogyakarta'
    },
    {
      'code': '041',
      'name': 'Surabaya'
    },
    {
      'code': '029',
      'name': 'Mojokerto'
    },
    {
      'code': '059',
      'name': 'Blitar'
    },
    {
      'code': '026',
      'name': 'Manado'
    },
    {
      'code': '028',
      'name': 'Medan'
    },
    {
      'code': '050',
      'name': 'Purwokerto'
    },
    {
      'code': '048',
      'name': 'Tegal'
    },
    {
      'code': '042',
      'name': 'Solo'
    },
    {
      'code': '032',
      'name': 'Palembang'
    },
    {
      'code': '034',
      'name': 'Pekanbaru'
    },
    {
      'code': '027',
      'name': 'Mataram'
    },
    {
      'code': '008',
      'name': 'Lampung'
    },
    {
      'code': '024',
      'name': 'Makassar'
    }
  ];
  const expected =  [
    {
      'code': '009',
      'name': 'Bandung',
      'display': 'Bandung'
    },
    {
      'code': '013',
      'name': 'Bekasi',
      'display': 'Bekasi'
    },
    {
      'code': '017',
      'name': 'Cirebon',
      'display': 'Cirebon'
    },
    {
      'code': '051',
      'name': 'Karawang',
      'display': 'Karawang'
    },
    {
      'code': '019',
      'name': 'Depok',
      'display': 'Depok'
    },
    {
      'code': '002',
      'name': 'Jakarta Pusat',
      'display': 'Jakarta Pusat'
    },
    {
      'code': '003',
      'name': 'Jakarta Selatan',
      'display': 'Jakarta Selatan'
    },
    {
      'code': '005',
      'name': 'Jakarta Utara',
      'display': 'Jakarta Utara'
    },
    {
      'code': '001',
      'name': 'Jakarta Barat',
      'display': 'Jakarta Barat'
    },
    {
      'code': '004',
      'name': 'Jakarta Timur',
      'display': 'Jakarta Timur'
    },
    {
      'code': '044',
      'name': 'Tangerang',
      'display': 'Tangerang'
    },
    {
      'code': '043',
      'name': 'Tangerang Selatan',
      'display': 'Tangerang Selatan'
    },
    {
      'code': '007',
      'name': 'Balikpapan',
      'display': 'Balikpapan'
    },
    {
      'code': '011',
      'name': 'Batam',
      'display': 'Batam'
    },
    {
      'code': '049',
      'name': 'Yogyakarta',
      'display': 'Yogyakarta'
    },
    {
      'code': '041',
      'name': 'Surabaya',
      'display': 'Surabaya'
    },
    {
      'code': '029',
      'name': 'Mojokerto',
      'display': 'Mojokerto'
    },
    {
      'code': '059',
      'name': 'Blitar',
      'display': 'Blitar'
    },
    {
      'code': '026',
      'name': 'Manado',
      'display': 'Manado'
    },
    {
      'code': '028',
      'name': 'Medan',
      'display': 'Medan'
    },
    {
      'code': '050',
      'name': 'Purwokerto',
      'display': 'Purwokerto'
    },
    {
      'code': '048',
      'name': 'Tegal',
      'display': 'Tegal'
    },
    {
      'code': '042',
      'name': 'Solo',
      'display': 'Solo'
    },
    {
      'code': '032',
      'name': 'Palembang',
      'display': 'Palembang'
    },
    {
      'code': '034',
      'name': 'Pekanbaru',
      'display': 'Pekanbaru'
    },
    {
      'code': '027',
      'name': 'Mataram',
      'display': 'Mataram'
    },
    {
      'code': '008',
      'name': 'Lampung',
      'display': 'Lampung'
    },
    {
      'code': '024',
      'name': 'Makassar',
      'display': 'Makassar'
    }
  ];
  expect(Utils.generateCgvCityLabel(cityList)).toEqual(expected);
});

it('filterCityByCode: generate location selection for open account', () => {
  const cityList = [
    {
      'cinemaCode': '001',
      'cinemaName': 'Paris Van Java',
      'cinemaPhoneNumber': null,
      'cityName': 'Bandung',
      'provinceCode': '1057',
      'cityCode': '009',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/001.JPG',
      'cinemaAddress': 'JL.SUKAJADI NO.137-139 CIPEDES SUKAJADI BANDUNG',
      'longitude': 107.5936166,
      'provinceName': 'Jawa Barat',
      'latitude': -6.8892843
    },
    {
      'cinemaCode': '007',
      'cinemaName': 'Bekasi Cyber Park',
      'cinemaPhoneNumber': null,
      'cityName': 'Bekasi',
      'provinceCode': '1057',
      'cityCode': '013',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/007.JPG',
      'cinemaAddress': 'BEKASI CYBER PARK 3RD FLOOR, JL. KH. NOOR ALIE NO.177, BEKASI BARAT',
      'longitude': 106.9912163,
      'provinceName': 'Jawa Barat',
      'latitude': -6.2233677
    },
    {
      'cinemaCode': '011',
      'cinemaName': 'Miko Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Bandung',
      'provinceCode': '1057',
      'cityCode': '009',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/011.JPG',
      'cinemaAddress': 'JL. KOPO NO. 599, RT 001 RW 004, CIRANJANG, BABAKAN CIPARAY, BANDUNG',
      'longitude': 107.58058,
      'provinceName': 'Jawa Barat',
      'latitude': -6.959888
    },
    {
      'cinemaCode': '014',
      'cinemaName': 'BEC Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Bandung',
      'provinceCode': '1057',
      'cityCode': '009',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/014.JPG',
      'cinemaAddress': 'ISTANA BEC BANDUNG LANTAI 3A, JL. PURNAWARMAN NO. 7-11 BANDUNG, JAWA BARAT 40117',
      'longitude': 107.609047,
      'provinceName': 'Jawa Barat',
      'latitude': -6.90804
    },
    {
      'cinemaCode': '016',
      'cinemaName': 'Grage City Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Cirebon',
      'provinceCode': '1057',
      'cityCode': '017',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/016.JPG',
      'cinemaAddress': 'GRAGE CITY MALL LT.3, KAWASAN GRAGE CITY MALL, JL. AHMAD YANI, PENGGAMBIRAN, CIR EBON JAWA BARAT',
      'longitude': 108.570836,
      'provinceName': 'Jawa Barat',
      'latitude': -6.739919
    },
    {
      'cinemaCode': '019',
      'cinemaName': 'Festive Walk',
      'cinemaPhoneNumber': null,
      'cityName': 'Karawang',
      'provinceCode': '1057',
      'cityCode': '051',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/019.JPG',
      'cinemaAddress': 'KAWASAN CBD GALUH MAS KARAWANG',
      'longitude': 107.291289,
      'provinceName': 'Jawa Barat',
      'latitude': -6.327407
    },
    {
      'cinemaCode': '029',
      'cinemaName': '23 Paskal Shopping Center',
      'cinemaPhoneNumber': null,
      'cityName': 'Bandung',
      'provinceCode': '1057',
      'cityCode': '009',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/029.JPG',
      'cinemaAddress': 'JL. PASIR KALIKI RUKO PASKAL HIPER SQUARE BLOK D NO. 18, ANDIR KOTA BANDUNG, JAW A BARAT',
      'longitude': 107.594263,
      'provinceName': 'Jawa Barat',
      'latitude': -6.91529
    },
    {
      'cinemaCode': '030',
      'cinemaName': 'Depok Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Depok',
      'provinceCode': '1057',
      'cityCode': '019',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/030.JPG',
      'cinemaAddress': 'JALAN RAYA MARGONDA KAV.88, KEMIRIMUKA, DEPOK',
      'longitude': 106.826936,
      'provinceName': 'Jawa Barat',
      'latitude': -6.386982
    },
    {
      'cinemaCode': '036',
      'cinemaName': 'Bekasi Trade Center',
      'cinemaPhoneNumber': null,
      'cityName': 'Bekasi',
      'provinceCode': '1057',
      'cityCode': '013',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/036.JPG',
      'cinemaAddress': 'GAPURA PRIMA MALL BEKASI',
      'longitude': 107.021037,
      'provinceName': 'Jawa Barat',
      'latitude': -6.259654
    },
    {
      'cinemaCode': '038',
      'cinemaName': 'Metro Indah Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Bandung',
      'provinceCode': '1057',
      'cityCode': '009',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/038.JPG',
      'cinemaAddress': 'METRO INDAH MALL BANDUNG, JL. SOEKARNO - HATTA NO.590, SEKEJATO, BUAHBATU, KOTA BANDUNG',
      'longitude': 107.659731,
      'provinceName': 'Jawa Barat',
      'latitude': -6.941485
    },
    {
      'cinemaCode': '040',
      'cinemaName': 'Lagoon Avenue Bekasi',
      'cinemaPhoneNumber': null,
      'cityName': 'Bekasi',
      'provinceCode': '1057',
      'cityCode': '013',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/040.JPG',
      'cinemaAddress': 'MALL GRAND KAMALA LAGOON Lantai Transfer Floor Unit No. T #01',
      'longitude': 106.979007,
      'provinceName': 'Jawa Barat',
      'latitude': -6.250288
    },
    {
      'cinemaCode': '042',
      'cinemaName': 'Transmart Cirebon',
      'cinemaPhoneNumber': null,
      'cityName': 'Cirebon',
      'provinceCode': '1057',
      'cityCode': '017',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/042.JPG',
      'cinemaAddress': 'Transmart Cipto Cirebon, Pekiringan, Kesambi, Cirebon City, West Java 45131',
      'longitude': 108.549108,
      'provinceName': 'Jawa Barat',
      'latitude': -6.720398
    },
    {
      'cinemaCode': '046',
      'cinemaName': 'Technomart',
      'cinemaPhoneNumber': null,
      'cityName': 'Karawang',
      'provinceCode': '1057',
      'cityCode': '051',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/046.JPG',
      'cinemaAddress': 'Technomart, Jl. Arteri Galuh MAS, Puseurjaya, Telukjambe Timur, Kabupaten Karawa ng, Jawa Barat 41361',
      'longitude': 107.292929,
      'provinceName': 'Jawa Barat',
      'latitude': -6.328216
    },
    {
      'cinemaCode': '002',
      'cinemaName': 'Grand Indonesia',
      'cinemaPhoneNumber': null,
      'cityName': 'Jakarta Pusat',
      'provinceCode': '1058',
      'cityCode': '002',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/002.JPG',
      'cinemaAddress': 'JL. MH. THAMRIN NO.1',
      'longitude': 106.821675,
      'provinceName': 'DKI Jakarta',
      'latitude': -6.1945985
    },
    {
      'cinemaCode': '003',
      'cinemaName': 'Pacific Place',
      'cinemaPhoneNumber': null,
      'cityName': 'Jakarta Selatan',
      'provinceCode': '1058',
      'cityCode': '003',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/003.JPG',
      'cinemaAddress': 'GEDUNG ONE PACIFIC PLACE JL JEND SUDIRMAN KAV 52-53 SENAYAN KEBAYORAN BARU JAKA RTA SELATAN',
      'longitude': 106.810067,
      'provinceName': 'DKI Jakarta',
      'latitude': -6.225017
    },
    {
      'cinemaCode': '004',
      'cinemaName': 'Mall of Indonesia',
      'cinemaPhoneNumber': null,
      'cityName': 'Jakarta Utara',
      'provinceCode': '1058',
      'cityCode': '005',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/004.JPG',
      'cinemaAddress': 'JL BOULEVARD BARAT RAYA, KELAPA GADING BARAT JAKARTA UTARA',
      'longitude': 106.8943692,
      'provinceName': 'DKI Jakarta',
      'latitude': -6.1188502
    },
    {
      'cinemaCode': '006',
      'cinemaName': 'Central Park',
      'cinemaPhoneNumber': null,
      'cityName': 'Jakarta Barat',
      'provinceCode': '1058',
      'cityCode': '001',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/006.JPG',
      'cinemaAddress': 'JL. S. PARMAN KAV. 28, TANJUNG DUREN SELATAN - GROGOL PETAMBURAN, JAKARTA BARAT - DKI JAKARTA',
      'longitude': 106.47291,
      'provinceName': 'DKI Jakarta',
      'latitude': -6.10388
    },
    {
      'cinemaCode': '020',
      'cinemaName': 'Slipi Jaya',
      'cinemaPhoneNumber': null,
      'cityName': 'Jakarta Barat',
      'provinceCode': '1058',
      'cityCode': '001',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/020.JPG',
      'cinemaAddress': 'Plaza Slipi Jaya lt.4, Jl. Let. Jend. S. Parman Kav.17-18, Slipi - Palmerah, Jak arta Barat',
      'longitude': 106.796288,
      'provinceName': 'DKI Jakarta',
      'latitude': -6.189182
    },
    {
      'cinemaCode': '025',
      'cinemaName': 'Green Pramuka Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Jakarta Pusat',
      'provinceCode': '1058',
      'cityCode': '002',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/025.JPG',
      'cinemaAddress': 'GREEN PRAMUKA SQUARE, JL. JEND. AHMAD YANI KAV.49',
      'longitude': 106.874389,
      'provinceName': 'DKI Jakarta',
      'latitude': -6.189533
    },
    {
      'cinemaCode': '028',
      'cinemaName': 'Bella Terra Lifestyle Center',
      'cinemaPhoneNumber': null,
      'cityName': 'Jakarta Utara',
      'provinceCode': '1058',
      'cityCode': '005',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/028.JPG',
      'cinemaAddress': 'BELLA TERRA LIFESTYLE CENTER, JAKARTA UTARA, JL. BOULEVARD RAYA KAV.1, KELAPA GA DING',
      'longitude': 106.894248,
      'provinceName': 'DKI Jakarta',
      'latitude': -6.174994
    },
    {
      'cinemaCode': '035',
      'cinemaName': 'Transmart Cempaka Putih',
      'cinemaPhoneNumber': null,
      'cityName': 'Jakarta Pusat',
      'provinceCode': '1058',
      'cityCode': '002',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/035.JPG',
      'cinemaAddress': 'TRANSMART Cempaka Putih, Cempaka Putih Timur, Cempaka Putih, Jl. A. Yani No.83, RT.10/RW.7, Cemp. Putih Tim., Cemp. Putih, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10510',
      'longitude': 106.877045,
      'provinceName': 'DKI Jakarta',
      'latitude': -6.168928
    },
    {
      'cinemaCode': '037',
      'cinemaName': 'Aeon Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Jakarta Timur',
      'provinceCode': '1058',
      'cityCode': '004',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/037.JPG',
      'cinemaAddress': 'AEON MALL ( JAKARTA GARDEN CITY )',
      'longitude': 106.952314,
      'provinceName': 'DKI Jakarta',
      'latitude': -6.172672
    },
    {
      'cinemaCode': '005',
      'cinemaName': 'Teras Kota',
      'cinemaPhoneNumber': null,
      'cityName': 'Tangerang',
      'provinceCode': '1059',
      'cityCode': '044',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/005.JPG',
      'cinemaAddress': 'TERASKOTA ENTERTAINMENT CENTER , JL. PAHLAWAN SERIBU BSD CITY, KEL. LENGKONG GUD ANG, SERPONG - TANGERANG SELATAN, BANTEN',
      'longitude': 106.667442,
      'provinceName': 'Banten',
      'latitude': -6.295737
    },
    {
      'cinemaCode': '015',
      'cinemaName': 'Bandara City Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Tangerang',
      'provinceCode': '1059',
      'cityCode': '044',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/015.JPG',
      'cinemaAddress': 'Bandara City Mall lt.2, Jl. Raya Perancis, Dadap Tangerang 15211',
      'longitude': 106.692062,
      'provinceName': 'Banten',
      'latitude': -6.092144
    },
    {
      'cinemaCode': '022',
      'cinemaName': 'Ecoplaza Citraraya Cikupa',
      'cinemaPhoneNumber': null,
      'cityName': 'Tangerang',
      'provinceCode': '1059',
      'cityCode': '044',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/022.JPG',
      'cinemaAddress': 'JL. ECOPOLIS BOULEVARD SELATAN 2ND FLOOR, CITRA RAYA - TANGERANG 15719',
      'longitude': 106.5242606,
      'provinceName': 'Banten',
      'latitude': -6.249664
    },
    {
      'cinemaCode': '045',
      'cinemaName': 'Transmart Bintaro',
      'cinemaPhoneNumber': null,
      'cityName': 'Tangerang Selatan',
      'provinceCode': '1059',
      'cityCode': '043',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/045.JPG',
      'cinemaAddress': 'TRANSMART Graha Binataro, Jl Graha Raya, Blok CP 03 A, Kelurahan Pakujaya, Serpo ng Utara',
      'longitude': 106.675745,
      'provinceName': 'Banten',
      'latitude': -6.240305
    },
    {
      'cinemaCode': '008',
      'cinemaName': 'Plaza Balikpapan',
      'cinemaPhoneNumber': null,
      'cityName': 'Balikpapan',
      'provinceCode': '1060',
      'cityCode': '007',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/008.JPG',
      'cinemaAddress': 'Balikpapan Plaza lt.1, Balikpapan, Jl. Jend. Sudirman Klandasan Ilir',
      'longitude': 116.838435,
      'provinceName': 'Kalimantan Timur',
      'latitude': -1.277784
    },
    {
      'cinemaCode': '009',
      'cinemaName': 'Kepri Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Batam',
      'provinceCode': '1061',
      'cityCode': '011',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/009.JPG',
      'cinemaAddress': 'Jl. Jend. Sudirman, Simpang Mukakuning - Sukajadi Batam',
      'longitude': 104.036991,
      'provinceName': 'Kepulauan Riau',
      'latitude': 1.101445
    },
    {
      'cinemaCode': '010',
      'cinemaName': 'Harbour Bay',
      'cinemaPhoneNumber': null,
      'cityName': 'Batam',
      'provinceCode': '1061',
      'cityCode': '011',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/010.JPG',
      'cinemaAddress': 'Harbour Bay lt.3, Batam, Jl. Duyung Batu Ampar',
      'longitude': 104.0014642,
      'provinceName': 'Kepulauan Riau',
      'latitude': 1.1541421
    },
    {
      'cinemaCode': '013',
      'cinemaName': 'Jwalk Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Yogyakarta',
      'provinceCode': '1062',
      'cityCode': '049',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/013.JPG',
      'cinemaAddress': 'SAHID J-WALK LANTAI 3, KAWASAN SAHID YOGYA LIFESTYLE CITY, JL. BABASARI NO.2 CAT UR TUNGGAL, DEPOK, SLEMAN, YOGYAKARTA',
      'longitude': 110.24521,
      'provinceName': 'DI Yogyakarta',
      'latitude': -7.46474
    },
    {
      'cinemaCode': '017',
      'cinemaName': 'Hartono Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Yogyakarta',
      'provinceCode': '1062',
      'cityCode': '049',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/017.JPG',
      'cinemaAddress': 'HARTONO MALL LT.2, JL. RING ROAD UTARA, CONDONG CATUR DEPOK, SLEMAN - YOGYAKARTA',
      'longitude': 110.23567,
      'provinceName': 'DI Yogyakarta',
      'latitude': -7.45324
    },
    {
      'cinemaCode': '031',
      'cinemaName': 'Transmart Maguwo',
      'cinemaPhoneNumber': null,
      'cityName': 'Yogyakarta',
      'provinceCode': '1062',
      'cityCode': '049',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/031.JPG',
      'cinemaAddress': 'TRANSMART Maguwo, Jl. Raya Solo KM 8 No. 234, Maguwoharjo, Depok Sub-District, S leman Regency, Special Region of Yogyakarta 55282',
      'longitude': 110.419986,
      'provinceName': 'DI Yogyakarta',
      'latitude': -7.78279
    },
    {
      'cinemaCode': '018',
      'cinemaName': 'Marvell City',
      'cinemaPhoneNumber': null,
      'cityName': 'Surabaya',
      'provinceCode': '1063',
      'cityCode': '041',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/018.JPG',
      'cinemaAddress': 'MARVELL CITY MALL LT.3, JL. NGAGEL NO.123, WONOKROMO, SURABAYA - JAWA TIMUR',
      'longitude': 112.7456389,
      'provinceName': 'Jawa Timur',
      'latitude': -7.2888162
    },
    {
      'cinemaCode': '023',
      'cinemaName': 'Sunrise Mall',
      'cinemaPhoneNumber': null,
      'cityName': 'Mojokerto',
      'provinceCode': '1063',
      'cityCode': '029',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/023.JPG',
      'cinemaAddress': 'JL. BENTENG PANCASILA NO.9, KOTA MOJOKERTO',
      'longitude': 112.443415,
      'provinceName': 'Jawa Timur',
      'latitude': -7.471004
    },
    {
      'cinemaCode': '048',
      'cinemaName': 'BG Junction',
      'cinemaPhoneNumber': null,
      'cityName': 'Surabaya',
      'provinceCode': '1063',
      'cityCode': '041',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/048.JPG',
      'cinemaAddress': 'Surabaya Jalan Keranggan No.8A',
      'longitude': 112.733369,
      'provinceName': 'Jawa Timur',
      'latitude': -7.254971
    },
    {
      'cinemaCode': '053',
      'cinemaName': 'Blitar Square',
      'cinemaPhoneNumber': null,
      'cityName': 'Blitar',
      'provinceCode': '1063',
      'cityCode': '059',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/053.JPG',
      'cinemaAddress': null,
      'longitude': 112.166816,
      'provinceName': 'Jawa Timur',
      'latitude': -8.098573
    },
    {
      'cinemaCode': '021',
      'cinemaName': 'Grand Kawanua City',
      'cinemaPhoneNumber': null,
      'cityName': 'Manado',
      'provinceCode': '1064',
      'cityCode': '026',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/021.JPG',
      'cinemaAddress': 'Grand Kawanua City Walk Manado lt. 1, Jl. Mr. A.A maramis, Kayuwatu/Kairagi II',
      'longitude': 124.900439,
      'provinceName': 'Sulawesi Utara',
      'latitude': 1.504217
    },
    {
      'cinemaCode': '024',
      'cinemaName': 'Focal Point',
      'cinemaPhoneNumber': null,
      'cityName': 'Medan',
      'provinceCode': '1065',
      'cityCode': '028',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/024.JPG',
      'cinemaAddress': 'TAMAN SETIA BUDI INDAH BLOK V NO.11, ASAM KUMBANG - MEDAN SELAYANG, KOTA MEDAN',
      'longitude': 98.625684,
      'provinceName': 'Sumatera Utara',
      'latitude': 3.566832
    },
    {
      'cinemaCode': '026',
      'cinemaName': 'Rita Supermall',
      'cinemaPhoneNumber': null,
      'cityName': 'Purwokerto',
      'provinceCode': '1066',
      'cityCode': '050',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/026.JPG',
      'cinemaAddress': 'JL. JENDRAL SUDIRMAN NO.296, SOEKANEGARA, PURWOKERTO TIMUR, JAWA TENGAH',
      'longitude': 109.1174513,
      'provinceName': 'Jawa Tengah',
      'latitude': -6.8698217
    },
    {
      'cinemaCode': '032',
      'cinemaName': 'Transmart Tegal',
      'cinemaPhoneNumber': null,
      'cityName': 'Tegal',
      'provinceCode': '1066',
      'cityCode': '048',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/032.JPG',
      'cinemaAddress': 'TRANSMART Tegal, Jl. Kolonel Soegiono, Kemandungan, Tegal Bar., Kota Tegal, Jawa Tengah 52112',
      'longitude': 109.123097,
      'provinceName': 'Jawa Tengah',
      'latitude': -6.868005
    },
    {
      'cinemaCode': '041',
      'cinemaName': 'Transmart Solo',
      'cinemaPhoneNumber': null,
      'cityName': 'Solo',
      'provinceCode': '1066',
      'cityCode': '042',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/041.JPG',
      'cinemaAddress': 'Transmart Solo Pabelan, Jl. Raya A. Yani no. 234, Pabelan Kartosuro, Pabelan, Ka rtasura, Kabupaten Sukoharjo, Jawa Tengah 57162',
      'longitude': 110.773891,
      'provinceName': 'Jawa Tengah',
      'latitude': -7.557537
    },
    {
      'cinemaCode': '027',
      'cinemaName': 'Social Market',
      'cinemaPhoneNumber': null,
      'cityName': 'Palembang',
      'provinceCode': '1067',
      'cityCode': '032',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/027.JPG',
      'cinemaAddress': 'lantai 2, Jl. Veteran, Palembang',
      'longitude': 104.766732,
      'provinceName': 'Sumatera Selatan',
      'latitude': -2.975414
    },
    {
      'cinemaCode': '039',
      'cinemaName': 'Transmart Palembang',
      'cinemaPhoneNumber': null,
      'cityName': 'Palembang',
      'provinceCode': '1067',
      'cityCode': '032',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/039.JPG',
      'cinemaAddress': 'Transmart Palembang, Jl. Brigjen. HM Dhani Effendi, Palembang',
      'longitude': 104.747126,
      'provinceName': 'Sumatera Selatan',
      'latitude': -2.981127
    },
    {
      'cinemaCode': '033',
      'cinemaName': 'Transmart Pekanbaru',
      'cinemaPhoneNumber': null,
      'cityName': 'Pekanbaru',
      'provinceCode': '1068',
      'cityCode': '034',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/033.JPG',
      'cinemaAddress': 'TRANSMART Pekanbaru, Jl. Musyawarah No.11, Labuh Baru Tim., Payung Sekaki, Kota Pekanbaru, Riau 28292',
      'longitude': 101.42012,
      'provinceName': 'Riau',
      'latitude': 0.503309
    },
    {
      'cinemaCode': '034',
      'cinemaName': 'Transmart Mataram',
      'cinemaPhoneNumber': null,
      'cityName': 'Mataram',
      'provinceCode': '1069',
      'cityCode': '027',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/034.JPG',
      'cinemaAddress': 'TRANSMART Mataram, Jl. Selaparang No.60, Mayura, Cakranegara, Kota Mataram, Nusa Tenggara Bar. 83239',
      'longitude': 116.145899,
      'provinceName': 'Nusa Tenggara Barat',
      'latitude': -8.590729
    },
    {
      'cinemaCode': '043',
      'cinemaName': 'Transmart Lampung',
      'cinemaPhoneNumber': null,
      'cityName': 'Lampung',
      'provinceCode': '1070',
      'cityCode': '008',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/043.JPG',
      'cinemaAddress': 'Transmart Lampung, Jl. Sultan Agung No.283, Way Halim Permai, Way Halim, Kota Ba ndar Lampung, Lampung 35132',
      'longitude': 105.282415,
      'provinceName': 'Lampung',
      'latitude': -5.382942
    },
    {
      'cinemaCode': '044',
      'cinemaName': 'Daya Grand Square',
      'cinemaPhoneNumber': null,
      'cityName': 'Makassar',
      'provinceCode': '1071',
      'cityCode': '024',
      'cinemaImageUrl': 'https://www.cgv.id/uploads/cinemas/044.JPG',
      'cinemaAddress': 'DAYA GRAND SQUARE , JL. PERINTIS KEMERDEKAAN KM.14, DAYA - MAKASAR',
      'longitude': 119.510554,
      'provinceName': 'Sulawesi Selatan',
      'latitude': -5.11006
    }
  ];
  const code = '001';
  const expected =  [];
  expect(Utils.filterCityByCode(cityList, code)).toEqual(expected);
});

it('formatDot: will remove dot and rest of the value', () => {
  const test = '10000.00';
  expect(Utils.formatDot(test)).toEqual('10000');
});

it('formatDot: will remove dot and rest of the value', () => {
  const test = 'type=10000';
  expect(Utils.transformToken(test)).toEqual('10000');
});

xit('generatePaymentRoute: generate route and form name', () => {
  expect(Utils.generatePaymentRoute({billerPreferences: {billerType: '1'}})).toEqual({
    route: 'BillerTypeOne',
    formName: 'BillerTypeOneIndexForm'
  });
  expect(Utils.generatePaymentRoute({billerPreferences: {billerType: '2'}})).toEqual({
    route: 'BillerTypeTwo',
    formName: 'BillerTypeTwoIndexForm'
  });
  expect(Utils.generatePaymentRoute({billerPreferences: {billerType: '3'}})).toEqual({
    route: 'BillerTypeThree',
    formName: 'BillerTypeThreeIndexForm'
  });
  expect(Utils.generatePaymentRoute({billerPreferences: {billerType: '6'}})).toEqual({
    route: 'BillerTypeSix',
    formName: 'BillerTypeSixIndexForm'
  });
  expect(Utils.generatePaymentRoute({billerPreferences: {billerType: '7'}})).toEqual({
    route: 'BillerTypeSeven',
    formName: 'BillerTypeSevenIndexForm'
  });
  expect(Utils.generatePaymentRoute({billerPreferences: {billerType: '8'}})).toEqual({
    route: 'BillerTypeEight',
    formName: 'BillerTypeEightIndexForm'
  });
  expect(Utils.generatePaymentRoute({billerPreferences: {billerType: '9'}})).toEqual({
    route: 'BillerTypeNine',
    formName: 'BillerTypeNineIndexForm'
  });
  it('getFarePayload: get fare flight ', () => {
    const dataFare = {
      'Id': 'd0f86b31-34c0-4e0d-98de-245a0fee14c1',
      'Airline': 2,
      'AirlineImageUrl': 'http://portalvhds11000v9mfhk0k.blob.core.windows.net/airline/JT-mail.png',
      'AirlineName': 'Lion',
      'Number': 'JT 610',
      'Origin': 'CGK',
      'Destination': 'PGK',
      'Fare': 433000,
      'IsMultiClass': false,
      'IsConnecting': false,
      'IsAvailable': true,
      'FlightType': 'NonGds',
      'DepartDate': '2018-09-21',
      'DepartTime': '06:10',
      'ArriveDate': '2018-09-21',
      'ArriveTime': '07:20',
      'TotalTransit': 0,
      'ClassObjects': [
        {
          'Id': '285a623f-dc6e-4780-a45d-216eba7e9491',
          'FlightId': 'd0f86b31-34c0-4e0d-98de-245a0fee14c1',
          'Code': 'V',
          'Category': 'Economy',
          'Seat': 7,
          'Fare': 330000,
          'Tax': 103000,
          'FareBasisCode': null
        }
      ],
      'ConnectingFlights': [],
      'FareBreakdowns': null,
      'GroupingId': null,
      'fullDepart': '2018-09-20T23:10:00.000Z',
      'fullArrive': '2018-09-21T00:20:00.000Z',
      'duration': 1
    };
    const passeger = {
      'Adult': '1',
      'Child': '0',
      'Infant': '0',
      'total': 1,
      'flag': 'oneWay'
    };
    const expected = {
      'Airline': '2',
      'Adult': '1',
      'Child': '0',
      'Infant': '0',
      'ClassId': '285a623f-dc6e-4780-a45d-216eba7e9491',
      'FlightId': 'd0f86b31-34c0-4e0d-98de-245a0fee14c1',
      'Fare': '330000',
      'Tax': '103000'
    };
    expect(Utils.getFarePayload(dataFare, passeger)).toEqual(expected);
  });

  it('getDataSegment: make data segment ', () => {
    const data = {
      'Id': 'd0f86b31-34c0-4e0d-98de-245a0fee14c1',
      'Airline': 2,
      'AirlineImageUrl': 'http://portalvhds11000v9mfhk0k.blob.core.windows.net/airline/JT-mail.png',
      'AirlineName': 'Lion',
      'Number': 'JT 610',
      'Origin': 'CGK',
      'Destination': 'PGK',
      'Fare': 433000,
      'IsMultiClass': false,
      'IsConnecting': false,
      'IsAvailable': true,
      'FlightType': 'NonGds',
      'DepartDate': '2018-09-21',
      'DepartTime': '06:10',
      'ArriveDate': '2018-09-21',
      'ArriveTime': '07:20',
      'TotalTransit': 0,
      'ClassObjects': [
        {
          'Id': '285a623f-dc6e-4780-a45d-216eba7e9491',
          'FlightId': 'd0f86b31-34c0-4e0d-98de-245a0fee14c1',
          'Code': 'V',
          'Category': 'Economy',
          'Seat': 7,
          'Fare': 330000,
          'Tax': 103000,
          'FareBasisCode': null
        }
      ],
      'ConnectingFlights': [],
      'FareBreakdowns': null,
      'GroupingId': null,
      'fullDepart': '2018-09-20T23:10:00.000Z',
      'fullArrive': '2018-09-21T00:20:00.000Z',
      'duration': 1
    };
    const type = 'departure';
    const expected = [
      {
        'ClassId': '285a623f-dc6e-4780-a45d-216eba7e9491',
        'Airline': '2',
        'FlightNumber': 'JT 610',
        'Origin': 'CGK',
        'DepartDate': '2018-09-21',
        'DepartTime': '06:10',
        'Destination': 'PGK',
        'ArriveDate': '2018-09-21',
        'ArriveTime': '07:20',
        'ClassCode': 'V',
        'FlightId': 'd0f86b31-34c0-4e0d-98de-245a0fee14c1',
        'Num': '0',
        'Seq': '0'
      }
    ];
    expect(Utils.getDataSegment(data, type)).toEqual(expected);
  });

  it('getDataPassanger: make data passeger ', () => {
    const data = {
      '1': {
        'formValues': {
          'passengerId': 1,
          'tittle': {
            'name': 'MS',
            'display': 'MS'
          },
          'firstName': 'Erdi',
          'lastName': 'Isnanu',
          'birthDate': '1994-11-19T17:00:00.000Z',
          'nationality': 'ID',
          'phone': '081929911999',
          'homePhone': '0213020200',
          'email': 'isnanu@gmail.com',
          'idNumber': '1249239299912938',
          'IdExpiry': '2023-12-23T17:00:00.000Z',
          'setAsContact': true
        },
        'type': 'adult',
        'disable': false
      },
      '99': {
        'formValues': {
          'passengerId': 1,
          'tittle': {
            'name': 'MS',
            'display': 'MS'
          },
          'firstName': 'Erdi',
          'lastName': 'Isnanu',
          'birthDate': '1994-11-19T17:00:00.000Z',
          'nationality': 'ID',
          'phone': '081929911999',
          'homePhone': '0213020200',
          'email': 'isnanu@gmail.com',
          'idNumber': '1249239299912938',
          'IdExpiry': '2023-12-23T17:00:00.000Z',
          'setAsContact': false
        },
        'type': 'contact',
        'disable': false
      }
    };
    const expected = [
      {
        'Index': '1',
        'Type': '1',
        'Title': 'MS',
        'FirstName': 'Erdi',
        'LastName': 'Isnanu',
        'BirthDate': '1994-11-20',
        'Nationality': '',
        'AdultAssoc': null,
        'Email': 'isnanu@gmail.com',
        'HomePhone': '0213020200',
        'MobilePhone': '081929911999',
        'OtherPhone': null,
        'IdNumber': '1249239299912938',
        'IdExpiry': '2023-12-24',
        'PassportExpire': null,
        'PassportNumber': '',
        'PassportOrigin': ''
      }
    ];
    expect(Utils.getDataPassanger(data)).toEqual(expected);
  });

  it('checkContact: check contact ', () => {
    const data = {};
    const expected = false;
    expect(Utils.checkContact(data)).toEqual(expected);
  });

  it('txTravelTittle: list passeger tittle ', () => {
    const data = '';
    const expected = [
      {
        'code': '1',
        'name': 'Mr',
        'display': 'Mr'
      },
      {
        'code': '2',
        'name': 'Mrs',
        'display': 'Mrs'
      },
      {
        'code': '3',
        'name': 'Ms',
        'display': 'Ms'
      }
    ];
    expect(Utils.txTravelTittle(data)).toEqual(expected);
  });

  it('generateFlightImage: should return image based on bin', () => {
    expect(Utils.generateFlightImage('Sriwijaya')).toEqual(sriwijayaAir);
    expect(Utils.generateFlightImage('Lion')).toEqual(lionAir);
    expect(Utils.generateFlightImage('Citilink')).toEqual(citilink);
    expect(Utils.generateFlightImage('AirAsia')).toEqual(airAsia);
    expect(Utils.generateFlightImage('Wings')).toEqual(wingsAir);
    expect(Utils.generateFlightImage('Garuda')).toEqual(garuda);
    expect(Utils.generateFlightImage('Batik')).toEqual(batikAir);
    expect(Utils.generateFlightImage('Multi')).toEqual(multiFlight);
    expect(Utils.generateFlightImage('Jetstar')).toEqual(jetstar);
    expect(Utils.generateFlightImage('Kalstar')).toEqual(kalstar);
    expect(Utils.generateFlightImage('NAM')).toEqual(jnam);
  });

  it('filterObjectsPasseger: filter passeger', () => {
    const listOfObjects = [
      {
        firstName: 'eeee',
        lastName: 'aaaa',
      },
      {
        firstName: 'vvv',
        lastName: 'ccc',
      }
    ];
    const searchString = 'e';

    const expected = [
      {
        firstName: 'eeee',
        lastName: 'aaaa',
      },
    ];
    expect(Utils.filterObjectsPasseger(listOfObjects, searchString)).toEqual(expected);
  });

  it('filterObjects: filter passeger', () => {
    const listOfObjects = [
      {
        firstName: 'eeee',
        lastName: 'aaaa',
      },
      {
        firstName: 'vvv',
        lastName: 'ccc',
      }
    ];
    const searchString = 'e';

    const expected = [
      {
        firstName: 'eeee',
        lastName: 'aaaa',
      },
    ];
    expect(Utils.filterObjects(listOfObjects, searchString)).toEqual(expected);
  });

  it('diffTime: filter passeger', () => {
    const start = '08:00';
    const end = '11:00';
    const expected = '3 hr 00 m';
    expect(Utils.diffTime(start, end)).toEqual(expected);
  });

  it('getNationality: filter passeger', () => {
    const listCountry = [{
      name: 'Indonesia',
      code: 'ID'
    }];
    const name = 'Indonesia';
    const expected = {'code': 'ID', 'name': 'Indonesia'};
    expect(Utils.getNationality(listCountry, name)).toEqual(expected);
  });

  it('changeDataTravel: filter passeger', () => {
    const data = [{'Adult': {}}, {'Child': {}}];
    const expected = [{'index': '99', 'type': 'contact'}];
    expect(Utils.changeDataTravel(data)).toEqual(expected);
  });

  it('openAccountCoreData: filter passeger', () => {
    const coreData = 'Erdi';
    const expected = {
      name: 'Erdi',
      code: '1000'
    };
    expect(Utils.openAccountCoreData(coreData)).toEqual(expected);
  });

});

it('transformTokenIos: transformTokenIos ', () => {
  const data = {};
  const expected = {};
  expect(Utils.transformTokenIos(data)).toEqual(expected);
});

it('getLastThirtyDaysTrx: getLastThirtyDaysTrx ', () => {
  const data = {};
  const expected = [{lastTrxResult: []}];
  expect(Utils.getLastThirtyDaysTrx(data)).toEqual(expected);
});

it('getBrandEgift: getBrandEgift ', () => {
  const data = {};
  const expected = [];
  expect(Utils.getBrandEgift(data)).toEqual(expected);
});

it('prepare deeplink params', () => {
  const name = 'aroved%7Cuser%3Duser';
  const expected = [{'keyId': 'user', 'valueId': 'user'}];
  expect(Utils.getPAramslink(name)).toEqual(expected);
});

it('prepare substring', () => {
  const name = 'test%3D123456';
  const expected = 'test=123456';
  expect(Utils.transformTokenValue(name)).toEqual(expected);
});

describe('isEmptyOrNull', () => {
  describe('empty values', () => {
    it('array values - should return true', () => {
      const array = [];
      const expected = true;
      expect(Utils.isEmptyOrNull(array)).toEqual(expected);
    });
    it('object values - should return true', () => {
      const object = {};
      const expected = true;
      expect(Utils.isEmptyOrNull(object)).toEqual(expected);
    });
    describe('string values - should return true', () => {
      const string = '';
      const expected = true;
      expect(Utils.isEmptyOrNull(string)).toEqual(expected);
    });
    describe('int values - should return true', () => {
      const int = 0;
      const expected = true;
      expect(Utils.isEmptyOrNull(int)).toEqual(expected);
    });
    describe('nullVal values - should return true', () => {
      const nullVal = null;
      const expected = true;
      expect(Utils.isEmptyOrNull(nullVal)).toEqual(expected);
    });
    describe('NaNVal values - should return true', () => {
      const NaNVal = NaN;
      const expected = true;
      expect(Utils.isEmptyOrNull(NaNVal)).toEqual(expected);
    });
    it('undefined values - should return true', () => {
      const undefinedVal = undefined;
      const expected = true;
      expect(Utils.isEmptyOrNull(undefinedVal)).toEqual(expected);
    });
  });
  describe('non-empty values', () => {
    it('array values - should return false', () => {
      const array = [1];
      const expected = false;
      expect(Utils.isEmptyOrNull(array)).toEqual(expected);
    });
    it('object values - should return false', () => {
      const object = {val: 1};
      const expected = false;
      expect(Utils.isEmptyOrNull(object)).toEqual(expected);
    });
    it('int values - should return false', () => {
      const int = 1;
      const expected = false;
      expect(Utils.isEmptyOrNull(int)).toEqual(expected);
    });
    it('string values - should return false', () => {
      const string = 'Hello World';
      const expected = false;
      expect(Utils.isEmptyOrNull(string)).toEqual(expected);
    });
  });
});

it('getVarName - get its variable name', () => {
  const variable = 'someVal';
  const expected = 'variable';
  expect(Utils.getVarName({variable})).toEqual(expected);
});

describe('cutOffDisplayStr', () => {
  it('longer value (string length > limit), should return 1234...', () => {
    const string = '12345678';
    const charLimit = 7;
    const expected = '1234...';
    expect(Utils.cutOffDisplayStr(string, charLimit)).toEqual(expected);
  });

  it('exact value (string length = limit), should return 12345678', () => {
    const string = '12345678';
    const charLimit = 8;
    const expected = '12345678';
    expect(Utils.cutOffDisplayStr(string, charLimit)).toEqual(expected);
  });

  it('short value (string length < limit), should return 12345678', () => {
    const string = '12345678';
    const charLimit = 20;
    const expected = '12345678';
    expect(Utils.cutOffDisplayStr(string, charLimit)).toEqual(expected);
  });
});

describe('recursiveMap', () => {
  it('Input: non-nested objects - no custom views', () => {
    const input = {header: 'this is header', subHeader: 'this is subHeader'};
    const view = (text) => text;
    const expected = Object.values(input);
    expect(Utils.recursiveMap(input, view)).toEqual(expected);
  });
  it('Input: non-nested objects - with custom views', () => {
    const input = {header: 'this is header', subHeader: 'this is subHeader'};
    const customView = (text) => text + text;
    const view = (text) => text;
    const expected = ['this is header', 'this is subHeaderthis is subHeader'];
    expect(Utils.recursiveMap(input, view, '', ['subHeader'], {subHeader: customView})).toEqual(expected);
  });
  it('Input : undefined', () => {
    const view = (text) => text;
    expect(Utils.recursiveMap(undefined, view)).toEqual(undefined);
  });
});

describe('isEmptyFields', () => {
  it('test with special conditions', () => {
    const customer = {
      'ktpId': '123456789123456',
      'mobilenumber': '081600100100',
      'email': '',
      'no': '2209029',
      'name': 'AUTO REGIS SEBELAS',
      'dob': '06/01/1990',
      'gender': 'U',
      'cifCode': '2209029'
    };
    const mapping = {name: 'CustName', ktpId: 'InsuredIdNo', dob: 'DateOfBirth',
      gender: 'Gender', mobilenumber: 'HandPhone', email: 'Email'};
    const specialCondition = (obj, key) => key === 'gender' && obj === 'U';
    const expected = {'CustName': false, 'DateOfBirth': false, 'Email': true, 'Gender': true, 'HandPhone': false, 'InsuredIdNo': false, 'cifCode': false, 'no': false};
    expect(Utils.checkIfEmpty(customer, mapping, specialCondition)).toEqual(expected);
  });

  it('test without special conditions (generic check)', () => {
    const customer = {
      'ktpId': '123456789123456',
      'mobilenumber': '081600100100',
      'email': '',
      'no': '2209029',
      'name': 'AUTO REGIS SEBELAS',
      'dob': '06/01/1990',
      'gender': 'U',
      'cifCode': '2209029'
    };
    const mapping = {name: 'CustName', ktpId: 'InsuredIdNo', dob: 'DateOfBirth',
      gender: 'Gender', mobilenumber: 'HandPhone', email: 'Email'};
    const expected = {'CustName': false, 'DateOfBirth': false, 'Email': true, 'Gender': false, 'HandPhone': false, 'InsuredIdNo': false, 'cifCode': false, 'no': false};
    expect(Utils.checkIfEmpty(customer, mapping)).toEqual(expected);
  });
});

// Generate Code
describe('filterBymerchantType', () => {
  xit('Filter merchant by merchantCode', () => {
    const merchantList = [
      {
        'limitMerchant': 2000000,
        'merchName': 'Asuransi Sinarmas',
        'merchIcon': 'icon/1215168804328-logoSimas2.gif',
        'merchId': 2,
        'transactionAllowType': [
          1,
          2
        ]
      },
      {
        'limitMerchant': 3000000,
        'merchName': 'Asuransi Jiwa Sinarmas',
        'merchIcon': 'icon/1215168830640-logoSimas2.gif',
        'merchId': 2,
        'transactionAllowType': [
          2,
          3
        ]
      },
      {
        'limitMerchant': 4000000,
        'merchName': 'Firstmedia',
        'merchIcon': 'icon/1244446520554-1stmedia.jpg',
        'merchId': 2,
        'transactionAllowType': [
          3,
          4
        ]
      },
    ];
    const type = '3';
    const expected = [
      {
        'limitMerchant': 3000000,
        'merchName': 'Asuransi Jiwa Sinarmas',
        'merchIcon': 'icon/1215168830640-logoSimas2.gif',
        'merchId': 2,
        'transactionAllowType': [
          2,
          3
        ]
      },
      {
        'limitMerchant': 4000000,
        'merchName': 'Firstmedia',
        'merchIcon': 'icon/1244446520554-1stmedia.jpg',
        'merchId': 2,
        'transactionAllowType': [
          3,
          4
        ]
      }
    ];
    expect(Utils.filterBymerchantType(merchantList, type)).toEqual(expected);
  });
});

describe('addZero', () => {
  it('Return new character include new zero number ', () => {
    const val = '127761';
    const max = '10';
    const expected = '0000127761';
    expect(Utils.addZero(val, max)).toEqual(expected);
  });
});

describe('encodeData', () => {
  it('Encoding full data ', () => {
    const data = '00001277613002001035010';
    const serverToken = '0cbf55b7236bdeb09d6f0559f453909e667c9eb549902320274d506eea215c6c';
    const clientToken = 'a67a9e24400180fcac2520ddc5bb5c1918334bf010954dfb5fc602ec4588ad63';
    const expected = 'AN4ZY9X2XPCPF7PAI';
    expect(Utils.encodeData(data, serverToken, clientToken)).toEqual(expected);
  });
});

describe('encodeGeneratedCode', () => {
  it('Encoding data ', () => {
    const number = '00001277613002001';
    const expected = 'N4ZY9X2X';
    expect(Utils.encodeGeneratedCode(number)).toEqual(expected);
  });
});

describe('mine', () => {
  it('Encoding data ', () => {
    const data = 'N4ZY9X2XPCP8';
    const serverToken = '0cbf55b7236bdeb09d6f0559f453909e667c9eb549902320274d506eea215c6c';
    const clientToken = 'a67a9e24400180fcac2520ddc5bb5c1918334bf010954dfb5fc602ec4588ad63';
    const expected = 'HG86';
    expect(Utils.mine(data, serverToken, clientToken)).toEqual(expected);
  });
});

describe('convert', () => {
  it('Encoding data ', () => {
    const b = '16';
    const expected = 'N';
    expect(Utils.convert(b)).toEqual(expected);
  });
});

describe('substring special char', () => {
  it('Encoding data ', () => {
    const b = '?16';
    const expected = '16';
    expect(Utils.transformTokenSpecialChar(b)).toEqual(expected);
  });
});

describe('convert', () => {
  it('Encoding data ', () => {
    const b = 'nama=rudy%7Cemail%3Drudy@gmail.com';
    const expected = [{keyId: 'nama', valueId: 'rudy'}];
    expect(Utils.getFirstParams(b)).toEqual(expected);
  });
});

describe('convert', () => {
  it('Encoding data ', () => {
    const b = [{redeemCounter: 20}];
    const expected = 20;
    expect(Utils.getCountCoupon(b)).toEqual(expected);
  });
});

describe('convert', () => {
  it('Encoding data ', () => {
    const b = '?eeeeee';
    const expected = 'eeeeee';
    expect(Utils.transformTokenSpecialChar(b)).toEqual(expected);
  });
});

describe('convert', () => {
  it('Encoding data ', () => {
    const b = 'eeeeee=eueueueu';
    const expected = [{'keyId': 'eeeeee', 'valueId': ''}];
    expect(Utils.getFirstParams(b)).toEqual(expected);
  });
});

describe('convert', () => {
  it('getTransferPossibleAccounts : Should return savings and current accounts', () => {
    const accounts = [{
      accountNumber: '0002838796',
      accountType: 'SavingAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    }, {
      accountNumber: '0002838797',
      accountType: 'SavingAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    },
    {
      accountNumber: '3243243243',
      accountType: 'CurrentAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    }, {
      accountNumber: '0002838790',
      accountType: 'TimeDepositAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    }, {
      accountNumber: '4320291239122912',
      accountType: 'CreditCardAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    }];
    const expected = [{
      accountNumber: '0002838796',
      accountType: 'SavingAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    }, {
      accountNumber: '0002838797',
      accountType: 'SavingAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    }, {
      accountNumber: '3243243243',
      accountType: 'CurrentAccount',
      currency: 'IDR',
      allowFlag: 'ft'
    }];
    expect(Utils.getTransferPossibleAccountsToSetDefaultAccount(accounts, 'ft')).toEqual(expected);
    expect(Utils.getTransferPossibleAccountsToSetDefaultAccount([], 'ft')).toEqual([]);
  });
  describe('convert', () => {
    it('Encoding data ', () => {
      const b = 'Category-01';
      const expected = 'Category-01';
      expect(Utils.getCategoryAlfacart(b)).toEqual(expected);
    });
  });
  describe('convert', () => {
    it('Encoding data ', () => {
      const baseItem = [{nameProduct: 'Alfamidi'}, {nameProduct: 'alfacart'}];
      const expected = [{nameProduct: 'Alfamidi'}];
      expect(Utils.filterSearchForAlfaCart(baseItem, 'alfamidi', 'nameProduct')).toEqual(expected);
    });
  });
});
