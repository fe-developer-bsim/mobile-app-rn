import * as middleware from '../middleware.util';
import set from 'lodash/set';

import {response as loginData} from './mockdata/middleware-fixtures/login.json';
import {response as balancesData} from './mockdata/middleware-fixtures/balances.json';

import {accounts as filteredAccountsData} from './mockdata/expected/accounts.testdata.json';
import {payees as filteredPayeesData} from './mockdata/expected/payees.testdata.json';
import cleanedUpBalances from './mockdata/expected/balances.testdata.json';
import {user as userMetaData} from './mockdata/expected/user.testdata.json';
import genericBillTypePayload from './mockdata/payload/genericBillerType-pay.json';
import genericBillTypeEnqueryPayload from './mockdata/payload/genericBillerType-enquery.json';
import genericBillTypeOneExpected from './mockdata/expected/genericBillTypeOne.testdata.json';
import genericBillTypeTwoExpected from './mockdata/expected/genericBillTypeTwo.testdata.json';
import genericBillTypeThreeExpected from './mockdata/expected/genericBillTypeThree.testdata.json';
import genericBillTypeSevenExpected from './mockdata/expected/genericBillTypeSeven.testdata.json';
import genericBillTypeEightExpected from './mockdata/expected/genericBillTypeEight.testdata.json';
import genericBillTypeNineExpected from './mockdata/expected/genericBillTypeNine.testdata.json';
import genericBillTypeTenExpected from './mockdata/expected/genericBillTypeTen.testdata.json';

import * as encrypt from '../secure.util';
jest.mock('../device.util');
encrypt.encryptText = jest.fn((text) => text);
encrypt.encryptNewText = jest.fn((oldText, newText) => newText);

describe('middleware utility', () => {
  it('getAccount: gets account details from raw data', () => {
    expect(middleware.getAccounts(loginData)).toEqual(filteredAccountsData);
  });

  it('getPayees: gets payee details from raw data', () => {
    expect(middleware.getPayees(loginData)).toEqual(filteredPayeesData);
  });

  it('getBalances: gets balances from raw data', () => {
    expect(middleware.getBalances(balancesData)).toEqual(cleanedUpBalances);
  });

  it('getUserMetaData: gets user meta details from raw data', () => {
    expect(middleware.getUserMetaData(loginData)).toEqual(userMetaData);
  });

  it('getTransactionHistory: should return generic data structure', () => {
    const transactions = [
      {TransactionReferenceNumber: 1, DebitAmount: 12, Description: 'yo', TransactionDate: '21/03/17'},
      {TransactionReferenceNumber: null},
      {TransactionReferenceNumber: 2, CreditAmount: 10, Description: 'lo', TransactionDate: '21/03/17'}];
    const expected = [{'accountTransactions': {}, 'amount': 10,
      'credit': true,
      'date': '21/03/17',
      'description': 'lo',
      'statementId': '',
      'transactionCode': ''
    },
    {'accountTransactions': {}, amount: 12, 'credit': false,
      'date': '21/03/17',
      'description': 'yo',
      'statementId': '',
      'transactionCode': ''}];
    const transactionsRawData = set({}, 'statementList.contentList', transactions);
    expect(middleware.getTransactionHistory(transactionsRawData)).toEqual(expected);
  });
  it('getMiniStatement: should return generic data structure', () => {
    const transactionsRawData = set({}, 'miniStatementData', [{
      'amount': 10,
      'creditOrDebit': 'C',
      'date': '21/03/17',
      'description': 'lo'}, {amount: null}]);
    const expected = [{'amount': 10,
      'credit': true,
      'creditOrDebit': 'C',
      'date': '21/03/17',
      'description': 'lo'}];
    expect(middleware.getMiniStatement(transactionsRawData)).toEqual(expected);
  });
  it('getCacheMiniStatement: should return generic data structure', () => {
    const transactionsRawData = set({}, 'miniStatementData', [{
      'amount': 10,
      'creditOrDebit': 'C',
      'date': '21/03/17',
      'description': 'lo'}, {amount: null}]);
    const expected = [{'amount': 10,
      'credit': true,
      'creditOrDebit': 'C',
      'date': '21/03/17',
      'description': 'lo'}];
    expect(middleware.getCacheMiniStatement(transactionsRawData)).toEqual(expected);
  });
  it('getMiniStatementCreditCard: should return generic data structure', () => {
    const creditCardRawData = set({}, 'accountStatement', [{
      'recordList': [{
        'trxAmt': '80,000.00',
        'foreignTrxAmt': '80,000.00',
        'desc': 'KAZOKU SINARMAS LAND P   ',
        'PANUsed': '4893722000020223   ',
        'apprCode': '505048',
        'postDate': '23 May 2017',
        'trxAmtSign': 'D',
        'trxCurrCode': '360',
        'ARN': '70048932307000000000014',
        'Month': '201701',
        'trxDate': '23 May 2017'
      }, {
        'trxAmt': '90,000.00',
        'foreignTrxAmt': '90,000.00',
        'desc': 'KAZOKU SINARMAS LAND P   ',
        'PANUsed': '4893722000020223   ',
        'apprCode': '693811',
        'postDate': '23 May 2017',
        'trxAmtSign': 'D',
        'trxCurrCode': '360',
        'ARN': '70048932307000000000015',
        'Month': '201701',
        'trxDate': '23 May 2017'
      }, {
        'trxAmt': '450,000.00',
        'foreignTrxAmt': '450,000.00',
        'desc': 'ANNUAL FEE / PRORATE FEE ',
        'PANUsed': '4893722000020223   ',
        'apprCode': '      ',
        'postDate': '22 May 2017',
        'trxAmtSign': 'D',
        'trxCurrCode': '360',
        'ARN': '                       ',
        'Month': '201701',
        'trxDate': '22 May 2017'
      }],
    }]);
    const expected = [{
      'amount': '80,000.00',
      'credit': false,
      'date': '23 May 2017',
      'description': 'KAZOKU SINARMAS LAND P   ',
      'style': {},
    }, {
      'amount': '90,000.00',
      'credit': false,
      'date': '23 May 2017',
      'description': 'KAZOKU SINARMAS LAND P   ',
      'style': {},
    }, {
      'amount': '450,000.00',
      'credit': false,
      'date': '22 May 2017',
      'description': 'ANNUAL FEE / PRORATE FEE ',
      'style': {},
    }];
    expect(middleware.getMiniStatementCreditCard(creditCardRawData)).toEqual(expected);
  });
  it('getTimeDeposit: should return generic data structure', () => {
    const timeDepositRawData = {
      'OpeningBalance': '0,00',
      'RolloverIntRate': '',
      'WorkingBalance': '8.000.002,00',
      'MaturityDate': '2017-05-06T17:00:00Z',
      'LockedAmount': '0,00',
      'AccountNumber': '0900000000023138',
      'Name': 'RKIQ LEQJ VOQJ',
      'responseCode': '00',
      'ClosingBalance': '-',
      'AvailableBalance': '-',
      'MaturityInstruction': 'PAYMENT TO NOMINATED ACCOUNT',
      'ClearingAmount': '0,00',
      'Currency': 'IDR',
      'InterestRate': '10.00',
      'MaturityType': 'Non ARO',
      'Principal': '8000002.00'
    };
    const expected = {
      maturityDate: '2017-05-06T17:00:00Z',
      interestRate: '10.00',
      maturityType: 'Non ARO',
      principal: '8000002.00',
      isSharia: false,
      currency: 'IDR'
    };
    expect(middleware.getTimeDeposit(timeDepositRawData)).toEqual(expected);
  });
  it('getCreditCard: should return generic data structure', () => {
    const creditCardRawData = {
      responseMessage: 'Show balance inquiry credit card success',
      responseCode: '00',
      dueDate: '20170715',
      balances: [
        {
          amount: '620,000.00',
          currencyCode: 'IDR',
          accountType: 'Credit Card',
          amountSign: 'C',
          amountType: 'Minimum Repayment'
        },
        {
          amount: '620,000.00',
          currencyCode: 'IDR',
          accountType: 'Credit Card',
          amountSign: 'C',
          amountType: 'Last Statement Balance'
        },
        {
          amount: '49,000,000.00',
          currencyCode: 'IDR',
          accountType: 'Credit Card',
          amountSign: 'C',
          amountType: 'Credit Limit'
        },
        {
          amount: '450,000.00',
          currencyCode: 'IDR',
          accountType: 'Credit Card',
          amountSign: 'D',
          amountType: 'Current Outstanding'
        },
        {
          amount: '49,450,000.00',
          currencyCode: 'IDR',
          accountType: 'Credit Card',
          amountSign: 'C',
          amountType: 'Available Balance'
        }
      ]
    };
    const selectedAccount = {
      ccountMode: null,
      accountNumber: '4893722000020223',
      accountType: 'CreditCardAccount',
      accountTypeCode: '30',
      allowFlag: '',
      balances: undefined,
      bank: 'PT BANK SINARMAS',
      currency: 'IDR',
      expiryDate: '202105',
      id: 125060,
      label: '4893722000020223/IDR/CreditCardAccount/MATTHEW FLINCH',
      name: 'MATTHEW FLINCH'
    };
    const expected = {
      accountNumber: '4893722000020223',
      dueDate: '2017/07/15',
      cardExpired: '2021/05',
      creditAvailable: '49,450,000.00',
      creditLimit: '49,000,000.00',
      outstandingBalance: '450,000.00'
    };
    expect(middleware.getCreditCard(creditCardRawData, selectedAccount)).toEqual(expected);
  });
  xit('prepareChangePasswordPayload: should prepare payload for change pw', () => {
    const oldPassword = 'xyz';
    const values = {newPassword: 'abc', confirmNewPassword: 'abc'};
    const expected = {OBMParameter: {encodingParameter: '', encryptedPassword: '', generateCredential: 10, randomNumber: '1925287A1F8A9FB5'}, oldPassword: 'xyz', newPassword: 'abc', confirmNewPassword: 'abc', deviceInfo: {'model': 'testmodel', 'name': 'testname'}};
    expect(middleware.prepareChangePasswordPayload(oldPassword, values)).toEqual(expected);
  });
  it('prepareTransactionHistoryPayload', () => {
    const accountNumber = '122121';
    const transactionType = 'lastMonth';
    const expected = {
      'accountNumber': '122121',
      'period': '1MonthAgo',
      'sendToMailBox': 'true',
    };
    expect(middleware.prepareTransactionHistoryPayload(accountNumber, transactionType, true)).toEqual(expected);
  });

  it('prepareTransactionHistoryPayloadNew', () => {
    const accountNumber = '122121';
    const transactionType = 'currentMonth';
    const sFromDate = '2021-02-01';
    const sToDate = '2021-03-01';
    const sendToMailBox = true;
    const downloadPdf = true;
    const ipassport = 'SMP-22798091617939475908';
    const lang = 'id';
    const month = 'February 2021';
    const expected = '?lang=id&ipassport=SMP-22798091617939475908&period=curMonth&accountNumber=122121&sendToMailBox=true&month=February 2021&download=true&sToDate=2021-03-01&sFromDate=2021-02-01';
    expect(middleware.prepareTransactionHistoryPayloadNew(accountNumber, transactionType, sFromDate, sToDate, sendToMailBox, downloadPdf, ipassport, lang, month)).toEqual(expected);
  });

  it('prepateTransRefNumPayload', () => {
    const transactionId = 123;
    expect(middleware.prepateTransRefNumPayload(transactionId)).toEqual({'activateOtp': true, 'billerUniqueCode': undefined, 'billpayMethodType': 'undefined', 'isbillerOtp': undefined, 'transRefNum': 'undefined', 'transactionType': '123', 'transferMethodType': 'undefined'});
    expect(middleware.prepateTransRefNumPayload(transactionId, false)).toEqual({'activateOtp': false, 'billerUniqueCode': undefined, 'billpayMethodType': 'undefined', 'isbillerOtp': undefined, 'transRefNum': 'undefined', 'transactionType': '123', 'transferMethodType': 'undefined'});
    expect(middleware.prepateTransRefNumPayload(transactionId, null)).toEqual({'activateOtp': false, 'billerUniqueCode': undefined, 'billpayMethodType': 'undefined', 'isbillerOtp': undefined, 'transRefNum': 'undefined', 'transactionType': '123', 'transferMethodType': 'undefined'});
  });

  it('prepareTimeDeposit', () => {
    const account = {id: 123, test: '111'};
    expect(middleware.prepareTimeDeposit(account)).toEqual({accountFrom: '123'});
  });

  it('prepareMiniStatement', () => {
    const account = {accountNumber: 123, test: '111'};
    expect(middleware.prepareMiniStatement(account)).toEqual({accountNumber: '123'});
  });

  it('prepareCreditCart', () => {
    const account = {id: '125060', accountNumber: '111'};
    expect(middleware.prepareCreditCart(account)).toEqual({accountId: 125060});
  });

  it('prepareCreateTDPayload', () => {
    const transRefNum = 12343;
    const smsOtp = 1234;
    expect(middleware.prepareCreateTDPayload(transRefNum, smsOtp, 12345, 1212)).toEqual(
      {
        'mPinInputed': '1234',
        'transRefNum': '12343',
        'easyPin': '12345',
        'tokenInputed': '1212'
      });
  });

  it('prepareConfirmTdPayload', () => {
    const  data = {
      accountNo: {
        id: 111,
        bankBranch: {
          code: 222
        }
      },
      amount: 123456,
      maturityType: {
        value: 1234
      }
    };
    const depositPeriodList = {
      'id': 137,
      'type': 'deposit_period',
      'code': '01M',
      'name': 'Deposit Period 1 Bulan',
      'priority': null,
      'description': 'Deposit Period 1 Bulan',
      'shortname': 'DPD',
      'status': null,
      'filter': null
    };

    expect(middleware.prepareConfirmTdPayload(data, depositPeriodList)).toEqual({
      'accountFrom': '111',
      'bankBranch': '222',
      'productType': 'timeDeposit',
      'currency': '',
      'initialDeposit': '123456',
      'depositPeriod': '[object Object]',
      'maturityInstruction': '1234'
    });
  });

  it('prepareTdConfig', () => {
    const tdConfig = {
      depositPeriodList: [1, 2],
      maturityInstructionList: [2, 3]
    };
    expect(middleware.prepareTdConfig(tdConfig)).toEqual(
      {
        'depositPeriodList': [1, 2],
        'maturityInstructionList': [2, 3]
      }
    );
  });

  xit('prepareEasyPinRegister', () => {
    const easyPin = 'test';
    expect(middleware.prepareEasyPinRegister(easyPin, true)).toEqual(
      {
        easyPin: 'test',
        deviceInfo: {
          'name': 'testname',
          'model': 'testmodel'
        },
        OBMParameter: {
          encodingParameter: '',
          encryptedPassword: '',
          generateCredential: [],
          randomNumber: '6B60F58A9618F85C'
        },
        isResetEasypin: true
      }
    );
  });

  it('prepareMobileTopup', () => {
    const biller = {
      id: 12,
      billerPreferences: {billerType: 'test'},

    };
    const account = {
      id: 1
    };
    const topupAmount = {
      id: 'test123'
    };
    expect(middleware.prepareMobileTopup(biller, 'testmob', topupAmount, account, '0000000', '123456', '1212', 'abc123')).toEqual(
      {
        idbillPay: 12,
        billerType: 'test',
        accountFrom: '1',
        subscriberNoInput: 'testmob',
        amount: 'test123',
        transRefNum: 'abc123',
        mPinInputed: '123456',
        easyPin: '0000000',
        tokenInputed: '1212'
      }
    );
  });

  it('prepareConfirmTransfer', () => {
    expect(middleware.prepareConfirmTransfer(123, 234)).toEqual(
      {
        'payeeId': '123',
        'mode': '234',
        'language': 'EN'
      }
    );
  });

  it('prepareAddNewPayee', () => {
    const payeeInBank = {
      bank: {
        id: 153
      },
      accountNumber: 1234,
      name: 'nametest',
    };
    const payeeExternalBank = {
      bank: {
        id: 123
      },
      accountNumber: 1234,
      name: 'nametest',
    };
    const resData = {
      payeeId: 123
    };

    expect(middleware.prepareAddNewPayee(payeeInBank, '12345', 1000, '1212', 'testtn', resData)).toEqual(
      {
        'accountId': '123',
        'cardlessMode': false,
        'easyPin': '12345',
        'language': 'EN',
        'mPinInputed': '1000',
        'tokenInputed': '1212',
        'transRefNum': 'testtn',
        'transferMethodType': 'undefined'
      }
    );
    expect(middleware.prepareAddNewPayee(payeeExternalBank, '12345', 1000, '1212', 'testtn', resData)).toEqual(
      {
        'accountId': '123',
        'cardlessMode': false,
        'easyPin': '12345',
        'language': 'EN',
        'mPinInputed': '1000',
        'tokenInputed': '1212',
        'transRefNum': 'testtn',
        'transferMethodType': 'undefined'
      }
    );
  });

  it('prepareGetPayeeName', () => {
    const formData = {
      bankId: 123,
      accountNumber: 98723
    };
    expect(middleware.prepareGetPayeeName(formData)).toEqual(
      {
        'targetBankId': '123',
        'accountNumber': '98723',
        'securityTypeCode': '11',
        'language': 'EN'
      }
    );
  });

  it('prepareElectricityPayload', () => {
    const electricityPayload = {
      meterNo: 123456,
      biller: {
        id: 123,
        billerPreferences: {
          billerType: 1234
        }
      },
      selectedAccount: {
        id: 111
      },
      smsOtp: 1234567,
      transRefNum: 'test',
      easyPin: '12343455',
      simasToken: '1212',
      denomination: {
        value: 1223
      }
    };
    expect(middleware.prepareElectricityPayload(electricityPayload)).toEqual(
      {
        'subscriberNoInput': '123456',
        'idbillPay': 123,
        'billerType': '1234',
        'accountFrom': '111',
        'mPinInputed': '1234567',
        'transRefNum': 'test',
        'easyPin': '12343455',
        'amount': '1223', // for prepaid
        'billAmount': '1223', // for postpaid/non-taglist
        'tokenInputed': '1212'
      }
    );
  });

  it('prepareElectricityEnquiryPayload', () => {
    const prepareElectricityEnquiryPayload = {
      meterNo: 123,
      selectedBiller: {
        id: 1000,
        billerPreferences: {
          billerType: 'test'
        }
      }
    };
    expect(middleware.prepareElectricityEnquiryPayload(prepareElectricityEnquiryPayload)).toEqual(
      {
        'subscriberNoInput': '123',
        'idbillPay': 1000,
        'billerType': 'test'
      }
    );
  });

  it('preparePostpaidTransactionPayload', () => {
    const transactionData = {
      selectedAccount: {
        id: 123
      },
      biller: {
        id: 1000
      },
      mobileNo: 1234,
      billAmount: 120,
      easyPin: '000123',
      smsOtp: '5431',
      transRefNum: '1243',
      simasToken: '1212'
    };
    expect(middleware.preparePostpaidTransactionPayload(transactionData)).toEqual(
      {
        'idbillPay': 1000,
        'billerType': '1',
        'accountFrom': '123',
        'subscriberNoInput': '1234',
        'billAmount': '120',
        'easyPin': '000123',
        'mPinInputed': '5431',
        'transRefNum': '1243',
        'tokenInputed': '1212'
      }
    );
  });

  it('preparePostpaidEnquiryPayload', () => {
    const selectedBiller = {
      id: 123,
      billerPreferences: {
        billerType: 1234
      }
    };
    expect(middleware.preparePostpaidEnquiryPayload('0982362', selectedBiller)).toEqual(
      {
        'subscriberNoInput': '0982362',
        'idbillPay': 123,
        'billerType': '1234',
        'lang': 'en'
      }
    );
  });

  it('prepareWaterTransactionPayload', () => {
    const waterTransactionFormData = {
      waterBiller: {
        id: 123
      },
      accountNo: {
        id: 1234
      },
      consumerNo: 1111,
      areaCode: {
        id: 2222
      },
      billAmount: 3333,
      easyPin: 4444,
      smsOtp: 5555,
      simasToken: 1212,
      transRefNum: 6666
    };
    expect(middleware.prepareWaterTransactionPayload(waterTransactionFormData)).toEqual(
      {
        'idbillPay': 123,
        'billerType': '10',
        'accountFrom': '1234',
        'subscriberNoInput': '1111',
        'areaCode': '2222',
        'billAmount': '3333',
        'easyPin': '4444',
        'mPinInputed': '5555',
        'tokenInputed': '1212',
        'transRefNum': '6666'
      }
    );
  });

  it('prepareWaterEnquiryPayload', () => {
    const waterEnquiryFormData = {
      waterBiller: {
        id: 123
      },
      consumerNo: 1111,
      areaCode: {
        id: 2222
      },
    };
    expect(middleware.prepareWaterEnquiryPayload(waterEnquiryFormData)).toEqual(
      {
        'subscriberNoInput': '1111',
        'idbillPay': 123,
        'billerType': '10',
        'areaCode': '2222'
      }
    );
  });

  it('prepareTransferPayload', () => {
    const transferFormData = {
      myAccount: {
        id: 123,
        currency: 'IDR'
      },
      amount: 111,
      'cardlessMode': false,
      note: 'test123',
      transferMode: 'skn',
      easyPin: 123333,
      smsOtp: 22222,
      simasToken: 121212,
      schedule: '4',
      times: '2',
      transferTime: '17 Aug 1995',
      recurring: '17'
    };
    const internalPayee = {
      id: 234,
      transferType: 'inbank'
    };

    const externalPayee = {
      id: 222,
      transferType: 'skn'
    };
    expect(middleware.prepareTransferPayload(transferFormData, externalPayee, '123566', '123566', '123566', '123566')).toEqual(
      {
        'accountFrom': '123',
        'amount': '111',
        'cardlessMode': false,
        'currency': 'undefined',
        'description': 'test123',
        'easyPin': '123566',
        'isRepeat': true,
        'isScheduledFundTransfer': true,
        'isUsingSimobiPlus': true,
        'mPinInputed': '123566',
        'maxRecurrence': '2',
        'mode': 'skn',
        'modeCategory': 'external',
        'newConfirmTransfer': null,
        'recurring': '17',
        'repeatType': '4',
        'targetAccount': '',
        'targetAccountType': 'external',
        'tokenInputed': '123566',
        'transRefNum': '123566',
        'transferDate': '17 Aug 1995',
        'transferList': '',
        'isFavorite': 'undefined'
      }
    );
    expect(middleware.prepareTransferPayload(transferFormData, internalPayee, '123566', '123566', '123566', '123566')).toEqual(
      {
        'accountFrom': '123',
        'amount': '111',
        'cardlessMode': false,
        'currency': 'undefined',
        'description': 'test123',
        'easyPin': '123566',
        'isRepeat': true,
        'isScheduledFundTransfer': true,
        'isUsingSimobiPlus': true,
        'mPinInputed': '123566',
        'maxRecurrence': '2',
        'mode': 'skn',
        'modeCategory': 'internal',
        'recurring': '17',
        'newConfirmTransfer': null,
        'repeatType': '4',
        'targetAccount': '',
        'targetAccountType': 'inbanktransfer',
        'tokenInputed': '123566',
        'transRefNum': '123566',
        'transferDate': '17 Aug 1995',
        'transferList': '',
        'isFavorite': 'undefined'
      }
    );
  });

  it('prepareCcTransactionHistoryPayload', () => {
    const accountNumber = '1234567890123456';
    const sendEmailFalse = false;
    const sendEmailTrue = true;
    expect(middleware.prepareCcTransactionHistoryPayload(accountNumber, sendEmailFalse)).toEqual(
      {
        'accountNumber': '1234567890123456',
        'sendEmail': 'false'
      }
    );
    expect(middleware.prepareCcTransactionHistoryPayload(accountNumber, sendEmailTrue)).toEqual(
      {
        'accountNumber': '1234567890123456',
        'sendEmail': 'true'
      }
    );
  });
  it('getAppVersionDetails', () => {
    const response = {'minimumVersion': '0.9',
      'latestVersion': '1.0',
      'dueDate': '03/06/2017', // We are not using due date in out application
      'description': 'some desc',
      'dayCount': 1};
    const expected = {'desc': 'some desc', 'minVersion': '0.9', 'storeVersion': '1.0', 'dayCount': 1};
    expect(middleware.getAppVersionDetails(response)).toEqual(expected);
  });
  it('prepareAppVersionPayload', () => {
    const payload = {'currentAppVersion': '5.1.1',
      'currentPlatform': 'ios'};
    const expected = {'currentVersion': '5.1.1',
      'devicePlatform': 'iOS'};
    expect(middleware.prepareAppVersionPayload(payload)).toEqual(expected);
  });

  it('prepareRequestCreditCardOptionPayload', () => {
    const requestCreditCardOptionPayload = {
      account: {
        accountNumber: '0004123456781012',
        accountType: 'CreditCardAccount',
        balances: {
          accountNumber: '0004123456781012',
          availableBalance: 10000000,
          currency: 'IDR',
          currentBalance: 10000000,
          workingBalance: 40000000
        },
        currency: 'IDR',
        id: 123053,
        label: '0008332673/IDR/CreditCardAccount/M FERDIANSYAH',
        name: 'M FERDIANSYAH',
        targetType: {
          code: null
        },
        transferType: 'own'
      },
      creditCardBirth: '27/02/1988',
      creditCardName: 'FEDRI ARIANTO',
      label: 'ECommerce',
      limit: '',
      menu: 'E-Commerce',
      smsOtp: '123456',
      status: {
        label: 'Aktif',
        value: 'On'
      },
      subtitle: 'Masukkan status yang dipilih, nama, dan tanggal lahir pemegang kartu kredit untuk mengaktifkan / menonaktifkan E-Commerce',
      title: 'Mengaktifkan / Menonaktifkan E-Commerce',
      transRefNum: 'MB-201705291496047423825005'
    };
    const expectedOptionPayload = {
      transRefNum: 'MB-201705291496047423825005',
      intlTrx: null,
      ecommerce: 'On',
      cashAdvance: null,
      accountId: 123053,
      mPin: '123456',
      cardName: 'FEDRI ARIANTO',
      birthdate: '27/02/1988'
    };
    expect(middleware.prepareRequestCreditCardOptionPayload(null)).toEqual({
      transRefNum: 'undefined',
      intlTrx: null,
      ecommerce: null,
      cashAdvance: null,
      accountId: NaN,
      mPin: 'undefined',
      cardName: 'undefined',
      birthdate: 'undefined'
    });
    expect(middleware.prepareRequestCreditCardOptionPayload(undefined)).toEqual({
      transRefNum: 'undefined',
      intlTrx: null,
      ecommerce: null,
      cashAdvance: null,
      accountId: NaN,
      mPin: 'undefined',
      cardName: 'undefined',
      birthdate: 'undefined'
    });
    expect(middleware.prepareRequestCreditCardOptionPayload(requestCreditCardOptionPayload)).toEqual(expectedOptionPayload);
  });

  it('prepareRequestCreditCardLimitPayload', () => {
    const requestCreditCardLimitPayload = {
      account: {
        accountNumber: '0004123456781012',
        accountType: 'CreditCardAccount',
        balances: {
          accountNumber: '0004123456781012',
          availableBalance: 10000000,
          currency: 'IDR',
          currentBalance: 10000000,
          workingBalance: 40000000
        },
        currency: 'IDR',
        id: 123053,
        label: '0008332673/IDR/CreditCardAccount/M FERDIANSYAH',
        name: 'M FERDIANSYAH',
        targetType: {
          code: null
        },
        transferType: 'own'
      },
      creditCardBirth: '01/02/1990',
      creditCardName: 'FERDIANSYAH',
      label: 'ChangeLimit',
      limit: '100000000',
      menu: 'Ganti Limit',
      smsOtp: '123456',
      status: '',
      subtitle: 'Masukkan limit, nama, dan tanggal lahir pemegang kartu kredit untuk Ganti Limit',
      title: 'Ganti Limit',
      transRefNum: 'MB-201705291496047423825005'
    };
    const expectedLimitPayload = {
      accountId: 123053,
      birthdate: '01/02/1990',
      cardName: 'FERDIANSYAH',
      newLimit: '100000000',
      mPin: '123456',
      transRefNum: 'MB-201705291496047423825005'
    };
    expect(middleware.prepareRequestCreditCardChangeLimitPayload(null)).toEqual({
      accountId: NaN,
      birthdate: 'undefined',
      cardName: 'undefined',
      newLimit: 'undefined',
      mPin: 'undefined',
      transRefNum: 'undefined'
    });
    expect(middleware.prepareRequestCreditCardChangeLimitPayload(undefined)).toEqual({
      accountId: NaN,
      birthdate: 'undefined',
      cardName: 'undefined',
      newLimit: 'undefined',
      mPin: 'undefined',
      transRefNum: 'undefined'
    });
    expect(middleware.prepareRequestCreditCardChangeLimitPayload(requestCreditCardLimitPayload)).toEqual(expectedLimitPayload);
  });

  it('prepareRequestBlockCreditCardPayload', () => {
    const requestBlockCreditCardPayload = {
      accountNumber: {
        accountNumber: '0004123456781012',
        accountType: 'CreditCardAccount',
        balances: {
          accountNumber: '0004123456781012',
          availableBalance: 10000000,
          currency: 'IDR',
          currentBalance: 10000000,
          workingBalance: 40000000
        },
        currency: 'IDR',
        id: 123053,
        label: '0008332673/IDR/CreditCardAccount/M FERDIANSYAH',
        name: 'M FERDIANSYAH',
        targetType: {
          code: null
        },
        transferType: 'own'
      },
      smsOtp: '123456',
      transRefNum: 'MB-201705291496040837617010'
    };
    const expected = {
      accountId: 123053,
      mPin: '123456',
      transRefNum: 'MB-201705291496040837617010'
    };
    expect(middleware.prepareRequestBlockCreditCardPayload(null)).toEqual({
      accountId: NaN,
      mPin: 'undefined',
      transRefNum: 'undefined'
    });
    expect(middleware.prepareRequestBlockCreditCardPayload(undefined)).toEqual({
      accountId: NaN,
      mPin: 'undefined',
      transRefNum: 'undefined'
    });
    expect(middleware.prepareRequestBlockCreditCardPayload(requestBlockCreditCardPayload)).toEqual(expected);
  });

  it('prepareCloseTD', () => {
    const payload = {
      accountNumber: '0900000000023227',
      currency: 'IDR',
      interestRate: '10.00',
      isSharia: false,
      maturityDate: '2017-08-11T07:00:00Z',
      maturityType: 'NON ARO',
      principal: '8000000.00',
      easyPin: '123456',
      transRefNum: 'MB-BP-21208260255315852'
    };
    const expected = {
      breakDateStr: '2017-08-11',
      closeMode: 'futureDate',
      easyPin: '123456',
      reason: '',
      tdAccNumber: '0900000000023227',
      transRefNum: 'MB-BP-21208260255315852',
    };
    expect(middleware.prepareCloseTD(payload)).toEqual(expected);
  });

  it('prepareGenericBillerTypeOnePayload: gets payload data', () => {
    expect(middleware.prepareGenericBillerTypeOnePayload(genericBillTypePayload)).toEqual(genericBillTypeOneExpected);
  });

  it('prepareGenericBillerTypeTwoPayload: gets payload data', () => {
    expect(middleware.prepareGenericBillerTypeTwoPayload(genericBillTypePayload)).toEqual(genericBillTypeTwoExpected);
  });

  it('prepareGenericBillerTypeThreePayload: gets payload data', () => {
    expect(middleware.prepareGenericBillerTypeThreePayload(genericBillTypePayload)).toEqual(genericBillTypeThreeExpected);
  });

  it('prepareGenericBillerTypeSevenPayload: gets payload data', () => {
    expect(middleware.prepareGenericBillerTypeSevenPayload(genericBillTypePayload)).toEqual(genericBillTypeSevenExpected);
  });

  it('prepareGenericBillerTypeEightPayload: gets payload data', () => {
    expect(middleware.prepareGenericBillerTypeEightPayload(genericBillTypePayload)).toEqual(genericBillTypeEightExpected);
  });

  it('prepareGenericBillerTypeNinePayload: gets payload data', () => {
    expect(middleware.prepareGenericBillerTypeNinePayload(genericBillTypePayload)).toEqual(genericBillTypeNineExpected);
  });

  it('prepareGenericBillerTypeTenPayload: gets payload data', () => {
    expect(middleware.prepareGenericBillerTypeTenPayload(genericBillTypePayload)).toEqual(genericBillTypeTenExpected);
  });

  it('prepareGenericBillerTypeOneEnquiryPayload: gets payload data', () => {
    const expected = {'subscriberNoInput': '400099899', 'idbillPay': 1073, 'billerType': '1'};
    expect(middleware.prepareGenericBillerTypeOneEnquiryPayload(genericBillTypeEnqueryPayload)).toEqual(expected);
  });

  it('prepareGenericBillerTypeSixEnquiryPayload: gets payload data', () => {
    const expected = {'idbillPay': 1073, 'billerType': '1'};
    expect(middleware.prepareGenericBillerTypeSixEnquiryPayload(genericBillTypeEnqueryPayload)).toEqual(expected);
  });

  it('prepareGenericBillerTypeSevenEnquiryPayload: gets payload data', () => {
    const expected = {'subscriberNoInput': '400099899', 'idbillPay': 1073, 'billerType': '1'};
    expect(middleware.prepareGenericBillerTypeSevenEnquiryPayload(genericBillTypeEnqueryPayload)).toEqual(expected);
  });

  it('prepareGenericBillerTypeEightEnquiryPayload: gets payload data', () => {
    const expected = {'subscriberNoInput': '400099899', 'idbillPay': 1073, 'billerType': '1'};
    expect(middleware.prepareGenericBillerTypeEightEnquiryPayload(genericBillTypeEnqueryPayload)).toEqual(expected);
  });

  it('prepareGenericBillerTypeNineEnquiryPayload: gets payload data', () => {
    const expected = {'subscriberNoInput': '400099899', 'idbillPay': 1073, 'billerType': '1'};
    expect(middleware.prepareGenericBillerTypeNineEnquiryPayload(genericBillTypeEnqueryPayload)).toEqual(expected);
  });

  it('prepareGenericBillerTypeTenEnquiryPayload: gets payload data', () => {
    const expected = {'areaCode': 'undefined', 'billerType': '1', 'idbillPay': 1073, 'subscriberNoInput': '400099899', 'yearPeriod': null};
    expect(middleware.prepareGenericBillerTypeTenEnquiryPayload(genericBillTypeEnqueryPayload)).toEqual(expected);
  });

  it('prepareDataDetail: gets payload data', () => {
    const payload1 = {'subscriberNoInput': '400099899', 'amountNumber': 1000, 'totalBankCharge': 2000, 'totalAmountDebited': 3000};
    const payload2 = {'billerPreferences': {'paymentSubscriberNoKey': 'purchasePayment.plnCustomerIdentityKey'}};
    const expected = [
      {'value': '400099899', 'key': 'GENERIC_BILLER__PURCHASEPAYMENT_PLNCUSTOMERIDENTITYKEY'},
      {'value': '1.000', 'key': 'DETAIL__AMOUNT'},
      {'value': '2.000', 'key': 'DETAIL__BANK_CHARGE'},
      {'value': '3.000', 'key': 'DETAIL__TOTAL_AMOUNT_DEBITED'},
    ];
    expect(middleware.prepareDataDetail(payload1, payload2)).toEqual(expected);
  });

  // prepareQRPaymentPayload AND prepareContentsQRPaymentPayload CAN'T TEST IT BECAUSE ON INVOICE DATA, THERE'S CURRENT DATE AND TIME
  xit('prepareQRPaymentPayload', () => {
    const payload = {
      easyPin: '123456',
      invoice: [
        'Zzt3fOqmTGli',
        'Zzt3fOqmTGli',
        '6432',
        '6432',
        '0',
        '',
        '0',
        '',
        '0',
        '0',
        '0'
      ],
      myAccount: {
        accountMode: null,
        accountNumber: '0002751704',
        accountType: 'SavingAccount',
        accountTypeCode: '6000',
        allowFlag: 'ft|bp|oa|td',
        balances: {
          accountNumber: '0002751704',
          availableBalance: 50889151114.63,
          currency: 'IDR',
          currentBalance: 50889151114.63,
          workingBalance: 50944201115.63
        },
        bank: 'PT BANK SINARMAS',
        bankBranch: {
          address: 'Wisma Eka Jiwa lt dasar Ruko 01-02|',
          code: 'ID0010006',
          id: 6,
          name: 'KC Mangga Dua'
        },
        currency: 'IDR',
        display: '0002751704 • SavingAccount • GAQQU IQGUMI',
        expiryDate: null,
        id: 123252,
        label: '0002751704/IDR/SavingAccount/GAQQU IQGUMI',
        name: 'GAQQU IQGUMI'
      },
      userApiKey: '5081d0771cfd18fcb0d786fdf669195c0da25e51'
    };
    const expected = {
      accountFrom: '123252',
      contents: [
        {
          id: 'DE4',
          value: '00000000000000643200'
        }, {
          id: 'DE7',
          value: '0805080138'
        }, {
          id: 'DE32',
          value: '153'
        }, {
          id: 'DE33',
          value: '153'
        }, {
          id: 'DE43',
          value: 'Payment Plain'
        }, {
          id: 'DE48',
          value: '5081d0771cfd18fcb0d786fdf669195c0da25e51'
        }, {
          id: 'DE54',
          value: '000000000000000000'
        }, {
          id: 'DE61',
          value: 'Zzt3fOqmTGli'
        }, {
          id: 'DE62',
          value: '                                        000000000000000                                                            000000000000000000000000'
        }, {
          id: 'DE98',
          value: '33'
        }
      ],
      easyPin: '123456',
      mPinInputed: 'undefined'
    };
    expect(middleware.prepareQRPaymentPayload(payload)).toEqual(expected);
  });

  xit('prepareContentsQRPaymentPayload', () => {
    const payload = [
      'Zzt3fOqmTGli',
      'Payment Plain',
      '6432',
      '6432',
      '0',
      '',
      '0',
      '',
      '0',
      '0',
      '0'
    ];
    const expected = [
      {
        id: 'DE4',
        value: '00000000000000643200'
      }, {
        id: 'DE7',
        value: '0805080138'
      }, {
        id: 'DE32',
        value: '153'
      }, {
        id: 'DE33',
        value: '153'
      }, {
        id: 'DE43',
        value: 'Payment Plain'
      }, {
        id: 'DE48',
        value: '5081d0771cfd18fcb0d786fdf669195c0da25e51'
      }, {
        id: 'DE54',
        value: '000000000000000000'
      }, {
        id: 'DE61',
        value: 'Zzt3fOqmTGli'
      }, {
        id: 'DE62',
        value: '                                        000000000000000                                                            000000000000000000000000'
      }, {
        id: 'DE98',
        value: '33'
      }
    ];
    expect(middleware.prepareContentsQRPaymentPayload(payload, '5081d0771cfd18fcb0d786fdf669195c0da25e51')).toEqual(expected);
  });


  it('prepareQRPaymentInvoicePayload', () => {
    const payload = {
      'contents': {},
      'tipAmount': '2000',
      'accountFrom': '076789',
      'mPinInputed': '123456',
      'transRefNum': 'xx-00',
      'easyPin': '123456',
      'tokenInputed': '123456',
      'discount': '40%',
      'totalCouponAmount': '300000',
      'totalAmount': '180000'
    };
    const expected = {'accountFrom': 'undefined', 'contents': {}, 'discount': '40%', 'easyPin':
   '123456', 'mPinInputed': 'undefined', 'tipAmount': '2000', 'tokenInputed': '',
    'totalAmount': '180000', 'totalCouponAmount': '300000', 'transRefNum': 'xx-00'};
    expect(middleware.prepareQRPaymentInvoicePayload(payload)).toEqual(expected);
  });

  it('prepareEasyPinRegisterMigrate', () => {
    const easyPin = 'test';
    expect(middleware.prepareEasyPinRegisterMigrate(easyPin)).toEqual(
      {
        easyPin: 'test',
        deviceInfo: {
          'name': 'testname',
          'model': 'testmodel'
        }}
    );
  });

  it('prepareEasyPinRegisterMigrate', () => {
    const easyPin = 'test';
    expect(middleware.prepareEasyPinRegisterMigrate(easyPin)).toEqual(
      {
        easyPin: 'test',
        deviceInfo: {
          'name': 'testname',
          'model': 'testmodel'
        }}
    );
  });

  it('prepareRegisterFace', () => {
    const image = 'wasd';
    const smsOtp = '123123';
    const transRefNum = 'qa123';
    const orientation = '0';
    const flipImage = true;
    expect(middleware.prepareRegisterFace(image, orientation, smsOtp, transRefNum, flipImage)).toEqual(
      {
        'faceRecognition': 'wasd',
        'mPinInputed': '123123',
        'transRefNum': 'qa123',
        'isUsingSms': true,
        'orientation': '0',
        'flipImage': true,
      }
    );
  });

  it('prepareDetectFace', () => {
    const image = 'wasd';
    const orientation = '0';
    const flipImage = true;
    expect(middleware.prepareDetectFace(image, orientation, flipImage)).toEqual(
      {
        'faceRecognition': 'wasd',
        'orientation': '0',
        'flipImage': true,
      }
    );
  });

  it('prepareGetMerchantList', () => {
    const payload = {
      'latitude': '123',
      'longitude': '321'
    };
    const expected = {
      'additionalUrl': '/rest/nearbyStore.html?issuerCode=168&lat=123&lng=321&radius=1500&logo=true&limit=50'
    };
    expect(middleware.prepareGetMerchantList(payload)).toEqual(expected);
  });

  it('prepareInsurancePA', () => {
    const AJSMSIG = 'wasd';
    const transRefNum = '1234';
    const easyPin = '123456';
    const smsOtp = '123456';
    const simasToken = '123456';
    const expected = {
      AJSMSIG: 'wasd',
      mPinInputed: '123456',
      transRefNum: '1234',
      easyPin: '123456',
      tokenInputed: '123456'
    };
    expect(middleware.prepareInsurancePA(AJSMSIG, transRefNum, easyPin, smsOtp, simasToken)).toEqual(expected);
  });

  it('getEFormNTB', () => {
    const expected = {
      formid: '12345',
      fullName: 'wasd wasd',
      birthDate: '10/10/1212',
      idCardNumber: '12334556',
      email: undefined,
      mobilePhoneNumberId: undefined,
      postalCode: undefined,
      'checkbox-toc': true,
      captchaInput: undefined,
      captchaId: '1234',
      lang: 'ID',
      benefitProgram: undefined,
    };
    const data = {
      formid: '12345',
      fullName: 'wasd wasd',
      birthDate: '10/10/1212',
      idCardNumber: '12334556',
      benefitProgram: undefined,
      captchaInput: undefined,
      'checkbox-toc': true,
      captchaId: '1234',
      lang: 'ID',
      email: undefined,
      mobilePhoneNumberId: undefined,
      postalCode: undefined,
    };
    expect(middleware.getEFormNTB(data)).toEqual(expected);
  });

  it('getMobileTopupHistory', () => {
    const expected = {
      subscriberNoInput: '1234',
      amount: '10000',
      biller: {
        id: '10',
        name: 'test',
        billerPreferences: {},
        denomList: [],
      }
    };
    const data = {
      subscriberNoInput: '1234',
      amount: '10000',
      biller: {
        id: '10',
        name: 'test',
        billerPreferences: {},
        denomList: [],
      }
    };
    expect(middleware.getMobileTopupHistory(data)).toEqual(expected);
  });

  it('getMobilePostpaidHistory', () => {
    const expected = {
      mobileNo: '081234567890',
      biller: {
        id: '10',
        name: 'test'
      }
    };
    const data = {
      mobileNo: '081234567890',
      biller: {
        id: '10',
        name: 'test'
      }
    };
    expect(middleware.getMobilePostpaidHistory(data)).toEqual(expected);
  });

  it('getElectricityBillHistory', () => {
    const expected = {
      meterNo: '1234',
      biller: {
        id: '10',
        name: 'test',
        billerPreferences: {
          billerType: '1',
          code: '321',
        }
      }
    };
    const data = {
      meterNo: '1234',
      biller: {
        id: '10',
        name: 'test',
        billerPreferences: {
          billerType: '1',
          code: '321',
        }
      }
    };
    expect(middleware.getElectricityBillHistory(data)).toEqual(expected);
  });

  it('getWaterBillHistory', () => {
    const expected = {
      areaCode: '1234',
      consumerNo: '101010',
      waterBiller: {}
    };
    const data = {
      areaCode: '1234',
      consumerNo: '101010',
      waterBiller: {}
    };
    expect(middleware.getWaterBillHistory(data)).toEqual(expected);
  });

  it('getCreditCardTransferHistory', () => {
    const expected = {
      accNo: '1234',
      name: 'test',
      bank: 'simas',
      id: '101010'
    };
    const data = {
      accNo: '1234',
      name: 'test',
      bank: 'simas'
    };
    const id = '101010';
    expect(middleware.getCreditCardTransferHistory(id, data)).toEqual(expected);
  });

  it('getFundTransferHistory', () => {
    const expected = {
      accountNumber: '1234',
      name: 'test',
      bank: 'simas',
      id: '101010'
    };
    const data = {
      accountNumber: '1234',
      name: 'test',
      bank: 'simas'
    };
    const id = '101010';
    expect(middleware.getFundTransferHistory(id, data)).toEqual(expected);
  });

  it('prepareOpenAndromaxConfirm', () => {
    const expected = {
      'emailAddress': 'test@test.com',
      'accountFrom': '12345',
      'productType': 'savingSmartfren',
      'currency': 'IDR',
      'bankBranch': 'rock sea',
      'initialDeposit': '300000'
    };
    const data = {
      email: 'test@test.com',
      accountNo: {
        id: '12345'
      },
      bankCode: 'rock sea',
      amount: '300000'
    };
    expect(middleware.prepareOpenAndromaxConfirm(data)).toEqual(expected);
  });

  it('prepareOpenAndromaxAccount', () => {
    const expected = {
      'transRefNum': '1234',
      'easyPin': '123123',
    };
    const data = {
      transRefNum: '1234',
      easyPin: '123123',
    };
    expect(middleware.prepareOpenAndromaxAccount(data)).toEqual(expected);
  });

  it('preparePaydayLoanDisburse', () => {
    const expected = {
      'mPinInputed': '123123',
      'transRefNum': '1234',
      'easyPin': '123123',
      'tokenInputed': '123123',
      'disburse': {}
    };
    expect(middleware.preparePaydayLoanDisburse('1234', '123123', '123123', '123123', {})).toEqual(expected);
  });

  it('getDatiForPL', () => {
    const data = [
      {DESC1: 'wasd', DESC2: '1234'}
    ];
    const expected = [
      {DESC1: 'wasd', DESC2: '1234'}
    ];
    expect(middleware.getDatiForPL(data)).toEqual(expected);
  });

  it('getTransactionEmoneyHistory: should return generic data structure', () => {
    const transactions = [
      {TransactionReferenceNumber: 1, DebitAmount: 12, Description: 'yo', TransactionDate: '21/03/17'},
      {TransactionReferenceNumber: 2, CreditAmount: 10, Description: 'lo', TransactionDate: '21/03/17'}];
    const expected = [];
    const transactionsRawData = set({}, 'statementList.contentList', transactions);
    expect(middleware.getTransactionEmoneyHistory(transactionsRawData)).toEqual(expected);
  });

  it('prepareTransactionHistoryEmoneyPayload: should return generic data structure', () => {
    const accountNumber = '1234';
    const expected = {accountNumber, sendToMailBox: 'true', period: '1MonthAgo'};
    expect(middleware.prepareTransactionHistoryEmoneyPayload(accountNumber, {})).toEqual(expected);
  });

  it('getDataOptions: should return data options', () => {
    const data = [{code: 'wasd', name: 'test'}];
    const expected = [{value: 'wasd', label: 'test'}];
    expect(middleware.getDataOptions(data)).toEqual(expected);
  });

  it('getListOptions: should return list options', () => {
    const data = [{code: 'wasd', name: 'test', id: '123'}];
    const expected = [{value: 'wasd', label: 'test', id: '123'}];
    expect(middleware.getListOptions(data)).toEqual(expected);
  });

  it('prepareCgvTransaction: should return cgv payment payload', () => {
    const expected = {
      transactionType: '123123',
      activateOtp: true,
      mPinInputed: '123123',
      transRefNum: '123123',
      easyPin: '123123',
      tokenInputed: '123123',
      amount: '123123',
      accountFrom: '1234556',
      cinemaCode: '123123',
      bookingCode: '123123',
      scheduleCode: '123123',
      paymentSeatInfoList: '123123'
    };
    expect(middleware.prepareCgvTransaction('123123',
      '123123',
      '123123',
      '123123',
      '123123',
      '1234556',
      '123123',
      '123123',
      '123123',
      '123123',
      '123123',
      true)).toEqual(expected);
  });

  it('getQrMerchantList: should return list options', () => {
    const expected = {lat: '',
      lng: '',
      search: 'title',
      kotaid: String('153'),
      filter: 'type',
      cat: '',
      page: String('1'),
      numrow: '20'};
    expect(middleware.getQrMerchantList([{'coords': {latitude: '', longitude: ''}}], '1', '153', 'type', 'title')).toEqual(expected);
  });

  it('prepareDataDetailTransferCC: should return transfer detail cardlessWithdrawal', () => {
    const transferFormData = {note: 'test', myAccount: {productType: 'testAccount', accountNumber: '1234'}};
    const payeeAccount = {phoneNumber: '081234', description: 'testAccount'};
    const type = 'cardlessWithdrawal';
    const resData = {transferTransaction: {bankCharge: 2000, mode: 'skn', amount: 1000000}};
    const initiatedTime = '18 Aug 1989';
    const mockedDate = new Date(1989, 7, 18);
    global.Date = jest.fn(() => mockedDate); // eslint-disable-line no-undef
    const expected = [
      {'key': 'CARDLESSWITHDRAWAL__WITHDRAWAL_FROM', 'value': 'Test Account\n1234'},
      {'key': 'CARDLESSWITHDRAWAL__WITHDRAWAL_USING', 'value': '081234\nTest Account'},
      {'key': 'CARDLESSWITHDRAWAL__INITIATION_DATE', 'value': 'Fri Aug 18 1989'},
      {'key': 'CARDLESSWITHDRAWAL__NOTES', 'value': 'test'},
      {'key': 'CARDLESSWITHDRAWAL__FEES', 'value': '2.000\nSkn'},
      {'key': 'CARDLESSWITHDRAWAL__WITHDRAWAL_AMOUNT', 'value': '0'}];
    expect(middleware.prepareDataDetailTransferCC(transferFormData, payeeAccount, type, resData, initiatedTime)).toEqual(expected);
  });

  it('prepareDataDetailTransferCC: should return transfer detail creditCard', () => {
    const transferFormData = {note: 'test', myAccount: {productType: 'testAccount', accountNumber: '1234'}};
    const payeeAccount = {phoneNumber: '081234', description: 'testAccount'};
    const type = 'creditCard';
    const resData = {transferTransaction: {bankCharge: 2000, mode: 'skn', amount: 1000000,
      targetAccountObject: {
        accountNumber: '1234',
        bankName: 'Bank Sinarmas',
        name: 'DA'
      }}};
    global.Date = jest.fn(() => mockedDate); // eslint-disable-line no-undef
    const expected = [
      {'key': 'CREDIT_CARD__PAYING_FROM', 'value': 'Test Account\n1234'},
      {'key': 'CREDIT_CARD__ACCOUNT_HOLDER', 'value': 'DA'},
      {'key': 'CREDIT_CARD__ACCOUNT_NUMBER', 'value': '1234\nBank Sinarmas'},
      {'key': 'CREDIT_CARD__TRANSFER_MODE', 'value': 'Skn'},
      {'key': 'CREDIT_CARD__PAYMENT_FEE', 'value': '2.000'},
      {'key': 'CREDIT_CARD__PAYMENT_AMOUNT', 'value': '0'}];
    expect(middleware.prepareDataDetailTransferCC(transferFormData, payeeAccount, type, resData)).toEqual(expected);
  });

  it('prepareDataDetailTransferCC: should return transfer detail non-scheduled', () => {
    const transferFormData = {note: 'test', myAccount: {productType: 'testAccount', accountNumber: '1234'}};
    const payeeAccount = {phoneNumber: '081234', description: 'testAccount'};
    const type = 'transfer';
    const resData = {transferTransaction: {bankCharge: 2000, mode: 'skn', amount: 1000000,
      targetAccountObject: {
        accountNumber: '1234',
        bankName: 'Bank Sinarmas',
        name: 'DA'
      }}};
    global.Date = jest.fn(() => mockedDate); // eslint-disable-line no-undef
    const expected = [{'key': 'TRANSFER__TRANSFER_FROM', 'value': 'Test Account\n1234'},
      {'key': 'TRANSFER__TRANSFER_TO', 'value': 'DA\nBANK SINARMAS\n1234'},
      {'key': 'TRANSFER__INITIATION_DATE', 'value': ''},
      {'key': 'TRANSFER__NOTES', 'value': 'test'}, {'key': 'TRANSFER__TRANSFER_FEE', 'value': '2.000\nSkn'},
      {'key': 'TRANSFER__TRANSFER_AMOUNT', 'value': '0'}];
    expect(middleware.prepareDataDetailTransferCC(transferFormData, payeeAccount, type, resData)).toEqual(expected);
  });

  it('prepareDataDetailTransferCC: should return transfer detail scheduled', () => {
    const transferFormData = {note: 'test', myAccount: {productType: 'testAccount', accountNumber: '1234'}};
    const payeeAccount = {phoneNumber: '081234', description: 'testAccount'};
    const type = 'transfer';
    const resData = {transferTransaction: {bankCharge: 2000, mode: 'skn', amount: 1000000,
      targetAccountObject: {
        accountNumber: '1234',
        bankName: 'Bank Sinarmas',
        name: 'DA'
      }}, detailScheduledTransfer: {
      transferScheduled: '17 Aug 2018',
      transferRepetition: 5
    }};
    global.Date = jest.fn(() => mockedDate); // eslint-disable-line no-undef
    const expected = [
      {'key': 'TRANSFER__TRANSFER_FROM', 'value': 'Test Account\n1234'},
      {'key': 'TRANSFER__TRANSFER_TO', 'value': 'DA\nBANK SINARMAS\n1234'},
      {'key': 'TRANSFER__INITIATION_DATE', 'value': '16 Aug 2018'},
      {'key': 'TRANSFER__RECURRING', 'value': 5},
      {'key': 'TRANSFER__TIME', 'value': '17 Aug 2018'},
      {'key': 'TRANSFER__NOTES', 'value': 'test'},
      {'key': 'TRANSFER__TRANSFER_FEE', 'value': '2.000\nSkn'},
      {'key': 'TRANSFER__TRANSFER_AMOUNT', 'value': '0'}];
    expect(middleware.prepareDataDetailTransferCC(transferFormData, payeeAccount, type, resData, '16 Aug 2018')).toEqual(expected);
  });

  it('getATMList: should return list options', () => {
    const expected = {
      latitudeUser: '',
      longitudeUser: ''
    };
    expect(middleware.getATMList('12345', '12345')).toEqual(expected);
  });
});

xit('prepareActivation', () => {
  const name = 'test';
  const password = 'test';
  const regisTemp = 'test';
  expect(middleware.prepareActivation(name, password, regisTemp)).toEqual({
    loginName: 'test',
    password: 'test',
    confirmPassword: 'test',
    registTemp: 'test',
  });
});

it('prepareCgvTransaction: should return cgv payment payload', () => {
  const expected = [{
    transactionType: '123123',
    activateOtp: true,
    mPinInputed: '123123',
    transRefNum: '123123',
    easyPin: '123123',
    tokenInputed: '123123',
    amount: '123123',
    accountFrom: '1234556',
    cinemaCode: '123123',
    bookingCode: '123123',
    scheduleCode: '123123',
    paymentSeatInfoList: '123123',
    balances: {}
  }];
  expect(middleware.getDataAccountLS([{
    transactionType: '123123',
    activateOtp: true,
    mPinInputed: '123123',
    transRefNum: '123123',
    easyPin: '123123',
    tokenInputed: '123123',
    amount: '123123',
    accountFrom: '1234556',
    cinemaCode: '123123',
    bookingCode: '123123',
    scheduleCode: '123123',
    paymentSeatInfoList: '123123',
    balances: {avalaibleBalance: 10000}
  }])).toEqual(expected);
});

it('preparePaydayLoanDisburse', () => {
  const expected = {
    transRefNum: '123123',
    easyPin: '123123',
    tokenInputed: '123123',
    amount: '123123',
    accountFrom: '1234556',
    cinemaCode: '123123',
    bookingCode: '123123',
    scheduleCode: '123123',
    currentToken: '1'
  };
  expect(middleware.getLatestLuckyDipCurrentTicket({
    transRefNum: '123123',
    easyPin: '123123',
    tokenInputed: '123123',
    amount: '123123',
    accountFrom: '1234556',
    cinemaCode: '123123',
    bookingCode: '123123',
    scheduleCode: '123123',
    currentToken: '123123'
  }, '1')).toEqual(expected);
});

it('preparePaydayLoanDisburse', () => {
  const expected = {
    transRefNum: '123123',
    easyPin: '123123',
    tokenInputed: '123123',
    amount: '123123',
    accountFrom: '1234556',
    cinemaCode: '123123',
    bookingCode: '123123',
    scheduleCode: '123123',
    currentTokenPlatinum: '10'
  };
  expect(middleware.getLatestLuckyDipInfo({
    transRefNum: '123123',
    easyPin: '123123',
    tokenInputed: '123123',
    amount: '123123',
    accountFrom: '1234556',
    cinemaCode: '123123',
    bookingCode: '123123',
    scheduleCode: '123123',
    currentToken: '123123',
    currentTokenPlatinum: '10949'
  }, 'platinum', '10')).toEqual(expected);
});

it('preparePaydayLoanDisburse', () => {
  const expected = {
    transRefNum: '123123',
    easyPin: '123123',
    tokenInputed: '123123',
    amount: '123123',
    accountFrom: '1234556',
    cinemaCode: '123123',
    bookingCode: '123123',
    scheduleCode: '123123',
    currentTokenGold: '1'
  };
  expect(middleware.getLatestLuckyDipInfo({
    transRefNum: '123123',
    easyPin: '123123',
    tokenInputed: '123123',
    amount: '123123',
    accountFrom: '1234556',
    cinemaCode: '123123',
    bookingCode: '123123',
    scheduleCode: '123123',
    currentToken: '123123',
    currentTokenGold: '10949'
  }, 'gold', '1')).toEqual(expected);
});

it('preparePaydayLoanDisburse', () => {
  const expected = {
    transRefNum: '123123',
    easyPin: '123123',
    tokenInputed: '123123',
    amount: '123123',
    accountFrom: '1234556',
    cinemaCode: '123123',
    bookingCode: '123123',
    scheduleCode: '123123',
    currentTokenSilver: '1'
  };
  expect(middleware.getLatestLuckyDipInfo({
    transRefNum: '123123',
    easyPin: '123123',
    tokenInputed: '123123',
    amount: '123123',
    accountFrom: '1234556',
    cinemaCode: '123123',
    bookingCode: '123123',
    scheduleCode: '123123',
    currentToken: '123123',
    currentTokenSilver: '10949'
  }, 'silver', '1')).toEqual(expected);
});