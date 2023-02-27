jest.mock('../http.util', () => ({
  post: jest.fn((...args) => Promise.resolve({data: args})),
  postV4: jest.fn((...args) => Promise.resolve({data: args})),
  get: jest.fn((...args) => Promise.resolve({data: args})),
  postEFormCentral: jest.fn((...args) => Promise.resolve({data: args})),
  postCGVPayment: jest.fn((...args) => Promise.resolve({data: args})),
  postEStore: jest.fn((...args) => Promise.resolve({data: args})),
  postFace: jest.fn((...args) => Promise.resolve({data: args})),
  getForQR: jest.fn((...args) => Promise.resolve({data: args})),
  postForCaptcha: jest.fn((...args) => Promise.resolve({data: args})),
  postForQrPayment: jest.fn((...args) => Promise.resolve({data: args})),
  postNewQr: jest.fn((...args) => Promise.resolve({data: args})),
  getEStore: jest.fn((...args) => Promise.resolve({data: args})),
  postV1: jest.fn((...args) => Promise.resolve({data: args})),
  postV3: jest.fn((...args) => Promise.resolve({data: args})),
}));
jest.mock('../vendor/rsaNative', () => ({rsaEncode: jest.fn((toEncrypt) => Promise.resolve(toEncrypt))}));

import apiUtils from '../api.util';
import Http from '../http.util';

const checkApi = (endpoint, method, expectedPayload = {}, additionalPayloadKeys = undefined) => {
  const latestCall = Http[method].mock.calls[Http[method].mock.calls.length - 1];
  const payload = latestCall[1] || {};
  const defaultPayloadParam = latestCall[2] || [];
  if (method === 'get') {
    expect(latestCall[0]).toEqual(endpoint);
  } else if (method === 'getEStore') {
    expect(latestCall[0]).toEqual(endpoint);
  } else {
    expect(latestCall[0]).toEqual(endpoint);
    expect(payload).toEqual(expectedPayload);
    expect(defaultPayloadParam.additional).toEqual(additionalPayloadKeys);
  }
};

describe('Api Utils', () => {
  it('retrieveHSMInitKeys: HSM_INIT API', () => {
    const expectedAdditionals =  ['TXID', 'sessionCode'];
    const expectedPayload = {'requestInitHsm': 'send'};
    return apiUtils.retrieveHSMInitKeys().then(() => {
      checkApi('HSM_INIT', 'post', expectedPayload, expectedAdditionals);
    });
  });

  xit('login: LOGIN API : if its not a locked device', () => {
    const expectedAdditionals =  ['TXID', 'sessionCode', 'E2EE_RANDOM'];
    const expectedPayload = {pushToken: '123456', clientCheck: 'WEB_BROWSER', username: 'user', activateOtp: true, loginPassword: 'pass', smsPriority: true};
    return apiUtils.login({username: 'user', password: 'pass', easyPin: 'easypin', smsPriority: true}, false).then(() => {
      checkApi('LOGIN', 'post', expectedPayload, expectedAdditionals);
    });
  });

  xit('login: LOGIN API : if its a locked device and easyPin ', () => {
    const expectedAdditionals =  ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam'];
    const expectedPayload = {'clientCheck': 'WEB_BROWSER',  'easyPin': 'easypin', 'pushToken': '123456'};
    return apiUtils.login({username: 'user', easyPin: 'easypin'}, true).then(() => {
      checkApi('LOGIN', 'post', expectedPayload, expectedAdditionals);
    });
  });

  it('verifyATM: VERIFY_ATM_CARD_PIN API', () => {
    const expectedAdditionals =  ['TXID', 'sessionCode'];
    const expectedPayload = {'panPinNumberEncrypt': 'test1234'};
    return apiUtils.verifyATM({cardpin: '1234', cardnumber: 'test'}).then(() => {
      checkApi('VERIFY_ATM_CARD_PIN', 'post', expectedPayload, expectedAdditionals);
    });
  });

  it('otpVerify: OTP_VERIFY API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'versionScope'];
    const expectedPayload = {'mPin': '123456'};
    return apiUtils.otpVerify('123456').then(() => {
      checkApi('OTP_VERIFY', 'post', expectedPayload, expectedAdditionals);
    });
  });

  it('verifyUsername: VERIFY_USERNAME API', () => {
    const expectedAdditionals =  ['TXID'];
    const expectedPayload = {'username': 'testuser'};
    return apiUtils.verifyUsername('testuser').then(() => {
      checkApi('VERIFY_USERNAME', 'post', expectedPayload, expectedAdditionals);
    });
  });

  it('otpResend: OTP_RESEND API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport'];
    const expectedPayload = {'smsPriority': true};
    return apiUtils.otpResend(expectedPayload).then(() => {
      checkApi('OTP_RESEND', 'post', expectedPayload, expectedAdditionals);
    });
  });

  xit('verifyPassword: VERFY_PASSWORD API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM'];
    const expectedPayload = {'userPassword': 'testpass'};
    return apiUtils.verifyPassword('testpass').then(() => {
      checkApi('VERFY_PASSWORD', 'post', expectedPayload, expectedAdditionals);
    });
  });

  xit('createUsernamePassword: CREATE_USERNAME_PASSWORD API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'sessionCode', 'E2EE_RANDOM'];
    const expectedPayload = {'username': 'testuser', 'password': 'testpass'};
    return apiUtils.createUsernamePassword({username: 'testuser', password: 'testpass'}).then(() => {
      checkApi('CREATE_USERNAME_PASSWORD', 'post', expectedPayload, expectedAdditionals);
    });
  });

  it('easyPinRegister: EASY_PIN_REGISTER API', () => {
    const expectedAdditionals =  ['TXID', 'lang', 'tokenClient', 'deviceParam', 'E2EE_RANDOM'];
    const expectedPayload = {'tokenClient': 'XXXtokenClientXXXX', 'easyPin': '123456',
      'deviceParam': 'XXXdeviceParamHereXXXX', 'deviceInfo': {'name': 'RedmiNote3'}};

    return apiUtils.easyPinRegister({'deviceInfo': {'name': 'RedmiNote3'},
      'deviceParam': 'XXXdeviceParamHereXXXX', 'easyPin': '123456',
      'tokenClient': 'XXXtokenClientXXXX'}, jest.fn()).
      then(() => {
        checkApi('EASY_PIN_REGISTER', 'post', expectedPayload, expectedAdditionals);
      });
  });

  xit('updateEasyPin: UPDATE_EASYPIN API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient'];
    const expectedPayload = {'userPassword': 'testPass', 'easyPin': '123456'};

    return apiUtils.updateEasyPin({'easyPin': '123456', 'password': 'testPass'}).
      then(() => {
        checkApi('UPDATE_EASYPIN', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('changePassword: CHANGE_PASSWORD API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient'];
    const expectedPayload = {'oldPassword': 'oldpass', 'newPassword': 'newpass', 'confirmNewPassword': 'newpass'};

    return apiUtils.changePassword({'oldPassword': 'oldpass', 'newPassword': 'newpass', 'confirmNewPassword': 'newpass'}).
      then(() => {
        checkApi('CHANGE_PASSWORD', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('addNewPayee: ADD_PAYEE API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient'];
    const expectedPayload = {'targetBankId': '1', 'accountNumber': '1234456', 'targetAccountName': 'payeename', 'securityTypeCode': '12', 'mPinInputed': '23456'};

    return apiUtils.addNewPayee({'targetBankId': '1', 'accountNumber': '1234456', 'targetAccountName': 'payeename', 'securityTypeCode': '12', 'mPinInputed': '23456'}).
      then(() => {
        checkApi('ADD_PAYEE', 'postV4', expectedPayload, expectedAdditionals);
      });
  });

  it('getTransRefNum: GET_TRANS_REF_NUM API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'easyPin', 'uniqueCode'];
    const expectedPayload = {'transactionType': 'billpay', activateOtp: true, smsPriority: false};

    return apiUtils.getTransRefNum({'transactionType': 'billpay', activateOtp: true, smsPriority: false}).
      then(() => {
        checkApi('GET_TRANS_REF_NUM', 'postV4', expectedPayload, expectedAdditionals);
      });
  });

  it('getPayeeName: GET_PAYEE_NAME API', () => {
    const expectedAdditionals =  undefined;
    const expectedPayload = {'targetBankId': '0', 'accountNumber': '0000269085', 'securityTypeCode': '11'};

    return apiUtils.getPayeeName({'targetBankId': '0', 'accountNumber': '0000269085', 'securityTypeCode': '11'}).
      then(() => {
        checkApi('GET_PAYEE_NAME', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('getAppConfig: APPCONFIG API', () => {
    const endpoint = 'APPCONFIG';
    return apiUtils.getAppConfig().
      then(() => {
        checkApi(endpoint, 'get');
      });
  });

  it('getBalances: BALANCES API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport'];
    const expectedPayload = {};

    return apiUtils.getBalances().
      then(() => {
        checkApi('BALANCES', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('transfer: TRANSFER API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient'];
    const expectedPayload = {'accountFrom': '10322',
      'targetAccount': '121106',
      'transferList': '121106',
      'currency': 'IDR',
      'amount': '10000',
      'mode': 'own',
      'modeCategory': 'internal',
      'targetAccountType': 'inbanktransfer',
      'easyPin': '123456'};

    return apiUtils.transfer({'accountFrom': '10322',
      'targetAccount': '121106',
      'transferList': '121106',
      'currency': 'IDR',
      'amount': '10000',
      'mode': 'own',
      'modeCategory': 'internal',
      'targetAccountType': 'inbanktransfer',
      'easyPin': '123456'}).
      then(() => {
        checkApi('TRANSFER', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('confirmTransfer: CONFIRMATION_TRANSFER API', () => {
    const expectedAdditionals =   {'accNo': 'accNo', 'accountNumber': '123', 'bank': {'id': '90'}, 'id': '369510', 'name': 'test', 'transferType': 'inbank'};
    const expectedPayload = {
      'amount': '2000',
      'myAccount': {
        'currency': 'IDR',
        'id': '123'
      },
      'note': 'ok',
      'transferMode': 'inbank'
    };
    const  formValues = {
      'myAccount': {
        'id': '123',
        'currency': 'IDR'
      },
      'amount': '2000',
      'note': 'ok',
      'transferMode': 'inbank'
    };
    const payee = {
      'transferType': 'inbank',
      'id': '369510',
      'bank': {
        'id': '90'
      },
      'accountNumber': '123',
      'accNo': 'accNo',
      'name': 'test'

    };
    return apiUtils.confirmTransfer(formValues, payee, 'fundTransfer').
      then(() => {
        checkApi('CONFIRMATION_TRANSFER', 'postV4', expectedPayload, expectedAdditionals);
      });
  });

  it('mobileTopup: MOBILE_TOPUP API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin'];
    const expectedPayload = {'idbillPay': 13,
      'billerType': '6',
      'accountFrom': '10322',
      'subscriberNoInput': '628568278229',
      'amount': '50000',
      'mPinInputed': '123456',
      'easyPin': '123456'
    };

    return apiUtils.mobileTopup({'idbillPay': 13,
      'billerType': '6',
      'accountFrom': '10322',
      'subscriberNoInput': '628568278229',
      'amount': '50000',
      'mPinInputed': '123456',
      'easyPin': '123456'
    }).
      then(() => {
        checkApi('MOBILE_TOPUP', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('getbillerConfig: BILLER_CONFIG API', () => {
    const endpoint = 'BILLER_CONFIG';
    return apiUtils.getbillerConfig().
      then(() => {
        checkApi(endpoint, 'get');
      });
  });

  it('enquireWaterBill: WATER_BILL_ENQUIRY API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];
    const expectedPayload = {'subscriberNoInput': '11123434',
      'idbillPay': 1157,
      'billerType': '10',
      'areaCode': '2005'};

    return apiUtils.enquireWaterBill({'subscriberNoInput': '11123434',
      'idbillPay': 1157,
      'billerType': '10',
      'areaCode': '2005'}).
      then(() => {
        checkApi('WATER_BILL_ENQUIRY', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('payWaterBill: WATER_BILL_TRANSACTION API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin'];
    const expectedPayload = {'idbillPay': 1157,
      'billerType': '10',
      'accountFrom': '10322',
      'subscriberNoInput': '11123434',
      'areaCode': '2005',
      'descInput': 'PDAM POSTPAID',
      'billAmount': '182000',
      'securityTypeCode': '11',
      'mPinInputed': '123456'};

    return apiUtils.payWaterBill({'idbillPay': 1157,
      'billerType': '10',
      'accountFrom': '10322',
      'subscriberNoInput': '11123434',
      'areaCode': '2005',
      'descInput': 'PDAM POSTPAID',
      'billAmount': '182000',
      'securityTypeCode': '11',
      'mPinInputed': '123456'}).
      then(() => {
        checkApi('WATER_BILL_TRANSACTION', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('enquirePostpaidBill: POSTPAID_ENQUIRY API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];
    const expectedPayload = {'subscriberNoInput': '0895123450',
      'idbillPay': 17,
      'billerType': '1'};

    return apiUtils.enquirePostpaidBill({'subscriberNoInput': '0895123450',
      'idbillPay': 17,
      'billerType': '1'}).
      then(() => {
        checkApi('POSTPAID_ENQUIRY', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('payPostpaidBill: POSTPAID_TRANSACTION API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin'];
    const expectedPayload = {'idbillPay': 17,
      'billerType': '1',
      'accountFrom': '10322',
      'subscriberNoInput': '0895123450',
      'billAmount': '27580',
      'easyPin': '123456'};

    return apiUtils.payPostpaidBill({'idbillPay': 17,
      'billerType': '1',
      'accountFrom': '10322',
      'subscriberNoInput': '0895123450',
      'billAmount': '27580',
      'easyPin': '123456'}).
      then(() => {
        checkApi('POSTPAID_TRANSACTION', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('enquireElectricityBill: ELECTRICITY_ENQUIRY API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];
    const expectedPayload = {'subscriberNoInput': '440444444444',
      'idbillPay': 41,
      'billerType': '7'};

    return apiUtils.enquireElectricityBill({'subscriberNoInput': '440444444444',
      'idbillPay': 41,
      'billerType': '7'}).
      then(() => {
        checkApi('ELECTRICITY_ENQUIRY', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('payElectricityBill: ELECTRICITY_TRANSACTION API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin'];
    const expectedPayload = {'idbillPay': 40,
      'billerType': '1',
      'accountFrom': '46456',
      'subscriberNoInput': '330333333333',
      'billAmount': '75360',
      'easyPin': '123456'};

    return apiUtils.payElectricityBill({'idbillPay': 40,
      'billerType': '1',
      'accountFrom': '46456',
      'subscriberNoInput': '330333333333',
      'billAmount': '75360',
      'easyPin': '123456'}).
      then(() => {
        checkApi('ELECTRICITY_TRANSACTION', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('getTransactionHistory: TRANSACTIONS_HISTORY API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];
    const expectedPayload = {'accountNumber': '0002838796',
      'sendToMailBox': 'false',
      'period': '1MonthAgo'};

    return apiUtils.getTransactionHistory({'accountNumber': '0002838796',
      'sendToMailBox': 'false',
      'period': '1MonthAgo'}).
      then(() => {
        checkApi('TRANSACTIONS_HISTORY', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('getMiniStatement: TRANSACTIONS_MINI API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];
    const expectedPayload = {'accountNumber': '0002838796'};

    return apiUtils.getMiniStatement({'accountNumber': '0002838796'}).
      then(() => {
        checkApi('TRANSACTIONS_MINI_NEW', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('getTimeDeposit: TIMEDEPOSIT_DETAIL API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];
    const expectedPayload = {'accountNumber': '0002838796'};

    return apiUtils.getTimeDeposit({'accountNumber': '0002838796'}).
      then(() => {
        checkApi('TIMEDEPOSIT_DETAIL', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('logOut: LOGOUT API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport'];
    const expectedPayload = {};

    return apiUtils.logOut().
      then(() => {
        checkApi('LOGOUT', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('getCreditCard: CREDIT_CARD_INQUIRY API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];
    const expectedPayload = {
      'accountId': 125060
    };

    return apiUtils.getCreditCard({'accountId': 125060}).
      then(() => {
        checkApi('CREDIT_CARD_INQUIRY', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('tdConfig: TD_CONFIG API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];
    const expectedPayload = {};

    return apiUtils.tdConfig().
      then(() => {
        checkApi('TD_CONFIG', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('tdConfirmation: TD_CONFIRMATION API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];
    const expectedPayload = {'accountFrom': '9640',
      'bankBranch': 'ID0010008',
      'productType': 'timeDeposit',
      'currency': 'IDR',
      'initialDeposit': '8100001',
      'depositPeriod': '01M',
      'maturityInstruction': '883'};

    return apiUtils.tdConfirmation({'accountFrom': '9640',
      'bankBranch': 'ID0010008',
      'productType': 'timeDeposit',
      'currency': 'IDR',
      'initialDeposit': '8100001',
      'depositPeriod': '01M',
      'maturityInstruction': '883'}).
      then(() => {
        checkApi('TD_CONFIRMATION', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('tdTransaction: TD_TRANSACTION API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin'];
    const expectedPayload = {'transRefNum': 'IB-106245-1491451415079',
      'mPinInputed': '123456'};

    return apiUtils.tdTransaction({'transRefNum': 'IB-106245-1491451415079',
      'mPinInputed': '123456'}).
      then(() => {
        checkApi('TD_TRANSACTION', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('tdsConfig: TDS_CONFIG API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];
    const expectedPayload = {};

    return apiUtils.tdsConfig().
      then(() => {
        checkApi('TDS_CONFIG', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('tdsConfirmation: TDS_CONFIRMATION API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];
    const expectedPayload = {'accountFrom': '9640',
      'bankBranch': 'ID0010008',
      'productType': 'timeDeposit',
      'currency': 'IDR',
      'initialDeposit': '8100001',
      'depositPeriod': '01M',
      'maturityInstruction': '883'};

    return apiUtils.tdsConfirmation({'accountFrom': '9640',
      'bankBranch': 'ID0010008',
      'productType': 'timeDeposit',
      'currency': 'IDR',
      'initialDeposit': '8100001',
      'depositPeriod': '01M',
      'maturityInstruction': '883'}).
      then(() => {
        checkApi('TDS_CONFIRMATION', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('tdsTransaction: TDS_TRANSACTION API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin'];
    const expectedPayload = {'transRefNum': 'IB-106245-1491451415079',
      'mPinInputed': '123456'};

    return apiUtils.tdsTransaction({'transRefNum': 'IB-106245-1491451415079',
      'mPinInputed': '123456'}).
      then(() => {
        checkApi('TDS_TRANSACTION', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('refreshStorage: REFRESH_STORAGE API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport'];
    const expectedPayload = {};

    return apiUtils.refreshStorage().
      then(() => {
        checkApi('REFRESH_STORAGE', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('resendPaymentOTP: RESEND_PAYMENT_OTP API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];
    const expectedPayload = {transRefNum: 'MB-ATL-443048318015', transactionType: 'billpay', smsPriority: false};

    return apiUtils.resendPaymentOTP({transRefNum: 'MB-ATL-443048318015', transactionType: 'billpay', smsPriority: false}).
      then(() => {
        checkApi('RESEND_PAYMENT_OTP', 'postV4', expectedPayload, expectedAdditionals);
      });
  });

  it('inquireCreditCardBill: CC_INQUIRY API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'tokenServer', 'tokenClient'];
    const expectedPayload = {'subscriberNoInput': '4893722000039322',
      'billerCode': '300002',
      'displayType': '5',
      'idbillPay': 47};

    return apiUtils.inquireCreditCardBill({'subscriberNoInput': '4893722000039322',
      'billerCode': '300002',
      'displayType': '5',
      'idbillPay': 47}).
      then(() => {
        checkApi('CC_INQUIRY', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('creditCardTransaction: CC_TRANSACTION API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin'];
    const expectedPayload = {'accountFrom': '123148',
      'amount': '1750317',
      'billAmount': '',
      'billPeriod': '',
      'billerType': '5',
      'descInput': '',
      'easyPin': '123456',
      'idbillPay': 47,
      'securityTypeCode': '1',
      'smsOtp': '',
      'subscriberNoInput': '4893722000039322',
      'transRefNum': '',
      'variableBankCharges': ''};

    return apiUtils.creditCardTransaction({'accountFrom': '123148',
      'amount': '1750317',
      'billAmount': '',
      'billPeriod': '',
      'billerType': '5',
      'descInput': '',
      'easyPin': '123456',
      'idbillPay': 47,
      'securityTypeCode': '1',
      'smsOtp': '',
      'subscriberNoInput': '4893722000039322',
      'transRefNum': '',
      'variableBankCharges': ''}).
      then(() => {
        checkApi('CC_TRANSACTION', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('linkCreditCard: LINK_CREDIT_CARD API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];
    const expectedPayload = {};

    return apiUtils.linkCreditCard({}).
      then(() => {
        checkApi('LINK_CREDIT_CARD', 'post', expectedPayload, expectedAdditionals);
      });
  });
  it('versionCheck: VERSION_CHECK API', () => {
    const expectedAdditionals =  ['TXID', 'lang'];
    const expectedPayload = {};

    return apiUtils.versionCheck({}).
      then(() => {
        checkApi('VERSION_CHECK', 'post', expectedPayload, expectedAdditionals);
      });
  });

  it('versionCheck: VERSION_CHECK API', () => {
    const expectedAdditionals =  ['TXID', 'ipassport'];
    const expectedPayload = {
      rating: 5,
      suggestion: 'testing'
    };
    return apiUtils.sendFeedback({
      rating: 5,
      suggestion: 'testing'
    }).
      then(() => {
        checkApi('FEEDBACK_SUBMIT', 'post', expectedPayload, expectedAdditionals);
      });
  });

  // it will be async check
  xit('getOffers: OFFERS API', (lang) => apiUtils.getOffers(lang).then(() =>
    lang === 'en' ? checkApi('OFFERS_EN', 'get') : checkApi('OFFERS_ID', 'get')
  ));

  it('getBanners: BANNERS API', () => apiUtils.getBanners().then(() => {
    checkApi('BANNERS', 'get');
  }));
});

it('linkPaydayloan: GET_TRAVEL_INSURANCE API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang'];

  return apiUtils.getTravelInsurance({}).
    then(() => {
      checkApi('GET_TRAVEL_INSURANCE', 'post', expectedPayload, expectedAdditionals);
    });
});

it('linkPaydayloan: GET_PA_INSURANCE API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang'];

  return apiUtils.getPAInsurance({}).
    then(() => {
      checkApi('GET_PA_INSURANCE', 'post', expectedPayload, expectedAdditionals);
    });
});

it('linkPaydayloan: CONFIRM_PA_INSURANCE API', () => {
  const expectedPayload = {'payload': {}};
  const expectedAdditionals =  ['ipassport', 'lang'];

  return apiUtils.confirmPAInsurance({}).
    then(() => {
      checkApi('CONFIRM_PA_INSURANCE', 'post', expectedPayload, expectedAdditionals);
    });
});

it('linkPaydayloan: RESULT_PA_INSURANCE API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'TXID', 'tokenClient', 'tokenServer'];

  return apiUtils.resultPAInsurance({}).
    then(() => {
      checkApi('RESULT_PA_INSURANCE', 'post', expectedPayload, expectedAdditionals);
    });
});

it('linkPaydayloan: RESULT_TRAVEL_INSURANCE API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'E2EE_RANDOM', 'tokenClient', 'tokenServer'];

  return apiUtils.resultTravelInsurance({}).
    then(() => {
      checkApi('RESULT_TRAVEL_INSURANCE', 'post', expectedPayload, expectedAdditionals);
    });
});

it('linkPaydayloan: GET_PAYDAY_LOAN API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang'];

  return apiUtils.getPaydayLoan({}).
    then(() => {
      checkApi('GET_PAYDAY_LOAN', 'post', expectedPayload, expectedAdditionals);
    });
});

it('PAYDAYLOAN: SEND_PAYDAYLOAN_FORM API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'TXID'];

  return apiUtils.sendPaydayLoanForm({}).
    then(() => {
      checkApi('SEND_PAYDAYLOAN_FORM', 'post', expectedPayload, expectedAdditionals);
    });
});

it('linkPaydayloan: GET_DATA_PAYDAYLOAN_FORM API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'TXID'];

  return apiUtils.getPaydayLoanData({}).
    then(() => {
      checkApi('GET_DATA_PAYDAYLOAN_FORM', 'post', expectedPayload, expectedAdditionals);
    });
});

it('linkPaydayloan: OPEN_ACCOUNT_CONFIG API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];

  return apiUtils.openAccountConfig({}).
    then(() => {
      checkApi('OPEN_ACCOUNT_CONFIG', 'post', expectedPayload, expectedAdditionals);
    });
});

it('linkPaydayloan: OPEN_ACCOUNT_CONFIRMATION API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];

  return apiUtils.openAccountConfirmation({}).
    then(() => {
      checkApi('OPEN_ACCOUNT_CONFIRMATION', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getLoanList: GET_LOAN_LIST API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang'];

  return apiUtils.getLoanList({}).
    then(() => {
      checkApi('GET_LOAN_LIST', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getLoanList: SF_REDEEM API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'TXID', 'E2EE_RANDOM', 'easyPin'];

  return apiUtils.sfRedeem({}).
    then(() => {
      checkApi('SF_REDEEM', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getLoanList: FETCH_USER_SIMOBI API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];

  return apiUtils.getFetchUserSimobi({}).
    then(() => {
      checkApi('FETCH_USER_SIMOBI', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getLoanList: GET_DETAIL_TRANSACTION API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];

  return apiUtils.getDetailTransactionHistory({}).
    then(() => {
      checkApi('GET_DETAIL_TRANSACTION', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getLoanList: GET_WEALTH_MANAGEMENT_VIEW API', () => {
  const expectedPayload = {code: {}};
  const expectedAdditionals =  ['ipassport', 'lang'];

  return apiUtils.getwealthManagementView({}).
    then(() => {
      checkApi('GET_WEALTH_MANAGEMENT_VIEW', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getLoanList: GET_WEALTH_MANAGEMENT_CONFIG API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang'];

  return apiUtils.getwealthManagement({}).
    then(() => {
      checkApi('GET_WEALTH_MANAGEMENT_CONFIG', 'post', expectedPayload, expectedAdditionals);
    });
});

it('enquireGenericBill: GENERIC_BILLER_ENQUIRY API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'tokenServer', 'tokenClient'];

  return apiUtils.enquireGenericBill({}).
    then(() => {
      checkApi('GENERIC_BILLER_ENQUIRY', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getLoanList: GET_USER_API_KEY API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];

  return apiUtils.getUserApiKey({}).
    then(() => {
      checkApi('GET_USER_API_KEY', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getLoanList: SHARE_REFERRAL_CODE API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];

  return apiUtils.shareReferralCode({}).
    then(() => {
      checkApi('SHARE_REFERRAL_CODE', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getEgiftListPage: GET_EGIFT_PAGINATION API', () => {
  const expectedPayload = {};
  const endpoint = 'GET_EGIFT_PAGINATION';
  const expectedAdditionals = ['lang'];
  return apiUtils.getEgiftListPage({}).
    then(() => {
      checkApi(endpoint, 'postV4', expectedPayload, expectedAdditionals);
    });
});

it('purchaseEgift: PURCHASE_EGIFT API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang', 'ipassport'];
  return apiUtils.purchaseEgift({}, ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang', 'ipassport']).
    then(() => {
      checkApi('PURCHASE_EGIFT', 'postV4', expectedPayload, expectedAdditionals);
    });
});

it('inquirySimasPoin: INQUIRY_SIMAS_POIN API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang', 'easyPin'];

  return apiUtils.inquirySimasPoin({}).
    then(() => {
      checkApi('INQUIRY_SIMAS_POIN', 'postV4', expectedPayload, expectedAdditionals);
    });
});

it('resetPasswordEMoney: RESET_PASSWORD_EMONEY API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];

  return apiUtils.resetPasswordEMoney({}).
    then(() => {
      checkApi('RESET_PASSWORD_EMONEY', 'post', expectedPayload, expectedAdditionals);
    });
});

it('checkingResetPasskyc: CHECKING_RESET_PASSWORD_EMONEY API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];

  return apiUtils.checkingResetPasskyc({}).
    then(() => {
      checkApi('CHECKING_RESET_PASSWORD_EMONEY', 'post', expectedPayload, expectedAdditionals);
    });
});

it('checkResetPasskyc: CHECK_EMONEY_RESET_PASSWORD API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];

  return apiUtils.checkResetPasskyc({}).
    then(() => {
      checkApi('CHECK_EMONEY_RESET_PASSWORD', 'post', expectedPayload, expectedAdditionals);
    });
});

it('fetchPanNumber: FETCH_PAN_NUMBER API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'sessionCode'];

  return apiUtils.fetchPanNumber({}).
    then(() => {
      checkApi('FETCH_PAN_NUMBER', 'post', expectedPayload, expectedAdditionals);
    });
});

it('fetchPinNumber: FETCH_PIN_NUMBER API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'sessionCode', 'ipassport', 'lang'];

  return apiUtils.fetchPinNumber({}).
    then(() => {
      checkApi('FETCH_PIN_NUMBER', 'post', expectedPayload, expectedAdditionals);
    });
});
it('getUserApiKey: GET_USER_API_KEY API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];

  return apiUtils.getUserApiKey({}).
    then(() => {
      checkApi('GET_USER_API_KEY', 'post', expectedPayload, expectedAdditionals);
    });
});
it('payGenericBill: GENERIC_BILLER_TRANSACTION API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin'];

  return apiUtils.payGenericBill({}).
    then(() => {
      checkApi('GENERIC_BILLER_TRANSACTION', 'post', expectedPayload, expectedAdditionals);
    });
});
it('getRecurringTransferHistory: GET_RECURRING_TRANSFER_LIST API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'TXID', 'tokenClient', 'tokenServer', 'isBeforeLogin'];

  return apiUtils.getRecurringTransferHistory({}).
    then(() => {
      checkApi('GET_RECURRING_TRANSFER_LIST', 'post', expectedPayload, expectedAdditionals);
    });
});
it('posteditingRecurringTransferHistory: EDIT_RECURRING_TRANSFER API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'TXID', 'E2EE_RANDOM', 'easyPin', 'tokenClient', 'tokenServer', 'isBeforeLogin'];

  return apiUtils.posteditingRecurringTransferHistory({}).
    then(() => {
      checkApi('EDIT_RECURRING_TRANSFER', 'post', expectedPayload, expectedAdditionals);
    });
});
it('deleteRecurringTransferHistory: DELETE_RECURRING_TRANSFER API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'TXID', 'E2EE_RANDOM', 'easyPin', 'tokenServer', 'isBeforeLogin'];

  return apiUtils.deleteRecurringTransferHistory({}).
    then(() => {
      checkApi('DELETE_RECURRING_TRANSFER', 'post', expectedPayload, expectedAdditionals);
    });
});
it('getBalanceEmoney: GET_BALANCE_EMONEY API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport'];

  return apiUtils.getBalanceEmoney({}).
    then(() => {
      checkApi('GET_BALANCE_EMONEY', 'post', expectedPayload, expectedAdditionals);
    });
});
it('checkRegisterEmoney: CHECK_E_MONEY_REGISTER API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'TXID'];

  return apiUtils.checkRegisterEmoney({}).
    then(() => {
      checkApi('CHECK_E_MONEY_REGISTER', 'post', expectedPayload, expectedAdditionals);
    });
});
it('sendEmailOtpEmoneyRegister: SEND_EMAIL_REGISTER_E_MONEY API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'TXID'];

  return apiUtils.sendEmailOtpEmoneyRegister({}).
    then(() => {
      checkApi('SEND_EMAIL_REGISTER_E_MONEY', 'post', expectedPayload, expectedAdditionals);
    });
});
it('closeEmoneyAccount: CLOSE_EMONEY_ACCOUNT API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'TXID', 'E2EE_RANDOM', 'easyPin'];

  return apiUtils.closeEmoneyAccount({}).
    then(() => {
      checkApi('CLOSE_EMONEY_ACCOUNT', 'post', expectedPayload, expectedAdditionals);
    });
});
it('registerEmoney: GET_EMONEY_OFFERS API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'TXID'];

  return apiUtils.registerEmoney({}).
    then(() => {
      checkApi('GET_EMONEY_OFFERS', 'post', expectedPayload, expectedAdditionals);
    });
});
it('getTransactionEmoneyHistory: GET_STATEMENT_EMONEY API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];

  return apiUtils.getTransactionEmoneyHistory({}).
    then(() => {
      checkApi('GET_STATEMENT_EMONEY', 'post', expectedPayload, expectedAdditionals);
    });
});
it('getDataMyOrder: GET_DATA_MYORDER API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'searchName', 'searchValue', 'tokenClient', 'tokenServer', 'isBeforeLogin'];

  return apiUtils.getDataMyOrder({}).
    then(() => {
      checkApi('GET_DATA_MYORDER', 'postV4', expectedPayload, expectedAdditionals);
    });
});
it('upgradeEmoneyKyc: UPGRADE_EMONEY_KYC API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'easyPin'];

  return apiUtils.upgradeEmoneyKyc({}).
    then(() => {
      checkApi('UPGRADE_EMONEY_KYC', 'post', expectedPayload, expectedAdditionals);
    });
});
it('match ktp data with dukcapil data: CHECK_DUKCAPIL API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang'];

  return apiUtils.dukcapilKTP({}).
    then(() => {
      checkApi('CHECK_DUKCAPIL', 'post', expectedPayload, expectedAdditionals);
    });
});
it('requestOtpEform: REQUEST_OTP_EFORM API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  [];

  return apiUtils.requestOtpEform({}).
    then(() => {
      checkApi('REQUEST_OTP_EFORM', 'post', expectedPayload, expectedAdditionals);
    });
});
it('verifyOtpEform: VERIFY_OTP_EFORM API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  [];

  return apiUtils.verifyOtpEform({}).
    then(() => {
      checkApi('VERIFY_OTP_EFORM', 'post', expectedPayload, expectedAdditionals);
    });
});
it('getProvinceList: GET_PROVINCE_LIST API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  [];

  return apiUtils.getProvinceList({}).
    then(() => {
      checkApi('GET_PROVINCE_LIST', 'post', expectedPayload, expectedAdditionals);
    });
});
it('getCityList: GET_CITY_LIST API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  [];

  return apiUtils.getCityList({}).
    then(() => {
      checkApi('GET_CITY_LIST', 'post', expectedPayload, expectedAdditionals);
    });
});
it('getDistrictList: GET_DISTRICT_LIST API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  [];

  return apiUtils.getDistrictList({}).
    then(() => {
      checkApi('GET_DISTRICT_LIST', 'post', expectedPayload, expectedAdditionals);
    });
});
it('getSubDistrictList: GET_SUBDISTRICT_LIST API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  [];

  return apiUtils.getSubDistrictList({}).
    then(() => {
      checkApi('GET_SUBDISTRICT_LIST', 'post', expectedPayload, expectedAdditionals);
    });
});
it('getCcDataCif: GET_CC_DATA_CIF API', () => {
  const expectedPayload = {};
  const expectedAdditionals = ['ipassport'];

  return apiUtils.getCcDataCif({}).
    then(() => {
      checkApi('GET_CC_DATA_CIF', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getMovieCgv: GET_DATA_MOVIE_CGV API', () => {
  const expectedPayload = {};
  const expectedAdditionals = ['ipassport'];

  return apiUtils.getMovieCgv({}).
    then(() => {
      checkApi('GET_CC_DATA_CIF', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getCinemaCgv: GET_DATA_CINEMA_CGV API', () => {
  const expectedPayload = {};
  const expectedAdditionals = ['ipassport'];

  return apiUtils.getCinemaCgv({}).
    then(() => {
      checkApi('GET_CC_DATA_CIF', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getCgvSchedule: GET_DATA_SCHEDULE_CGV API', () => {
  const expectedPayload = {};
  const expectedAdditionals = ['lang'];

  return apiUtils.getCgvSchedule({}).
    then(() => {
      checkApi('GET_CINEMA_SCHEDULE', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getCgvComingSoon: GET_DATA_COMING_SOON_CGV API', () => {
  const expectedPayload = {};
  const expectedAdditionals = ['lang'];

  return apiUtils.getCgvComingSoon({}).
    then(() => {
      checkApi('GET_CINEMA_SCHEDULE', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getSeatLayout: GET_SEAT_LAYOUT API', () => {
  const expectedPayload = {};
  const expectedAdditionals = ['lang'];

  return apiUtils.getSeatLayout({}).
    then(() => {
      checkApi('GET_SEAT_LAYOUT', 'post', expectedPayload, expectedAdditionals);
    });
});

it('sendOtpActivation: SEND_OTP_ACTIVATION API', () => {
  const expectedPayload = {};
  const expectedAdditionals = ['ipassport', 'lang', 'TXID'];

  return apiUtils.sendOtpActivation({}).
    then(() => {
      checkApi('SEND_OTP_ACTIVATION', 'post', expectedPayload, expectedAdditionals);
    });
});

it('verifyOtpActivation: VERIFY_OTP_ACTIVATION API', () => {
  const expectedPayload = {};
  const expectedAdditionals = ['ipassport', 'lang', 'sessionCode', 'E2EE_RANDOM', 'easyPin'];

  return apiUtils.verifyOtpActivation({}).
    then(() => {
      checkApi('VERIFY_OTP_ACTIVATION', 'post', expectedPayload, expectedAdditionals);
    });
});

it('commonRegistrationActivation: ACTIVATION_COMMON API', () => {
  const expectedPayload = {};
  const expectedAdditionals = ['ipassport', 'lang', 'E2EE_RANDOM', 'deviceParam', 'tokenClient'];

  return apiUtils.commonRegistrationActivation({}).
    then(() => {
      checkApi('ACTIVATION_COMMON', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getSelectedSeat: GET_SELECTED_SEAT API', () => {
  const expectedPayload = {};
  const expectedAdditionals = ['ipassport', 'lang'];

  return apiUtils.getSelectedSeat({}).
    then(() => {
      checkApi('GET_SELECTED_SEAT', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getEgiftDetail: GET_EGIFT_DETAIL API', () => {
  const expectedPayload = {};
  const expectedAdditionals = ['lang'];

  return apiUtils.getEgiftDetail({}).
    then(() => {
      checkApi('GET_EGIFT_DETAIL', 'postV4', expectedPayload, expectedAdditionals);
    });
});

it('getPaymentCinema: GET_PAYMENT_CINEMA API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang', 'ipassport'];
  return apiUtils.getPaymentCinema({}, ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang', 'ipassport']).
    then(() => {
      checkApi('GET_PAYMENT_CINEMA', 'postCGVPayment', expectedPayload, expectedAdditionals);
    });
});

it('getCpan: GET_USER_CPAN API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'easyPin'];

  return apiUtils.getCpan({}).
    then(() => {
      checkApi('GET_USER_CPAN', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getGenerateRefundCode: QR_GENERATE_REFUND_CODE API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'E2EE_RANDOM', 'easyPin'];

  return apiUtils.getGenerateRefundCode({}).
    then(() => {
      checkApi('QR_GENERATE_REFUND_CODE', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getRefundCode: QR_REFUND_CODE API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'TXID'];

  return apiUtils.getRefundCode({}).
    then(() => {
      checkApi('QR_REFUND_CODE', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getMerchantList: QR_MERCHANT_LIST API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang'];

  return apiUtils.getMerchantList({}).
    then(() => {
      checkApi('QR_MERCHANT_LIST', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getTerminalReset: QR_TERMINAL_RESET API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'E2EE_RANDOM', 'easyPin'];

  return apiUtils.getTerminalReset({}).
    then(() => {
      checkApi('QR_TERMINAL_RESET', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getTerminalEdit: QR_TERMINAL_EDIT API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'E2EE_RANDOM', 'easyPin'];

  return apiUtils.getTerminalEdit({}).
    then(() => {
      checkApi('QR_TERMINAL_EDIT', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getTerminalDelete: QR_TERMINAL_DELETE API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'E2EE_RANDOM', 'easyPin'];

  return apiUtils.getTerminalDelete({}).
    then(() => {
      checkApi('QR_TERMINAL_DELETE', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getTerminalList: QR_TERMINAL_LIST API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang'];

  return apiUtils.getTerminalList({}).
    then(() => {
      checkApi('QR_TERMINAL_LIST', 'post', expectedPayload, expectedAdditionals);
    });
});

it('transactionQRGpn: QR_GPN_TRANSACTION API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'TXID', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'easyPin'];

  return apiUtils.transactionQRGpn({}).
    then(() => {
      checkApi('QR_GPN_TRANSACTION', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getGpnMerchant: QR_GPN_MERCHANT API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'TXID', 'E2EE_RANDOM', 'easyPin'];

  return apiUtils.getGpnMerchant({}).
    then(() => {
      checkApi('QR_GPN_MERCHANT', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getEgiftCache: GET_EGIFT_CACHE API', () => {
  const expectedAdditionals =  ['lang'];
  const expectedPayload = {};

  return apiUtils.getEgiftCache({}).
    then(() => {
      checkApi('GET_EGIFT_CACHE', 'postV4', expectedPayload, expectedAdditionals);
    });
});

it('getSimasPoinHistory: GET_SIMASPOIN_HISTORY API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'lang'];

  return apiUtils.getSimasPoinHistory({}).
    then(() => {
      checkApi('GET_SIMASPOIN_HISTORY', 'postV4', expectedPayload, expectedAdditionals);
    });
});

it('qrVoucherDiscount: QR_VOUCHER_DISCOUNT API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  [];

  return apiUtils.qrVoucherDiscount({}).
    then(() => {
      checkApi('QR_VOUCHER_DISCOUNT', 'postNewQr', expectedPayload, expectedAdditionals);
    });
});

it('qrDiscountMerchantList: QR_DISCOUNT_MERCHANT_LIST API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  [];

  return apiUtils.qrDiscountMerchantList({}).
    then(() => {
      checkApi('QR_DISCOUNT_MERCHANT_LIST', 'postNewQr', expectedPayload, expectedAdditionals);
    });
});

it('qrDiscountMerchantDetail: QR_DISCOUNT_MERCHANT_DETAIL API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  [];

  return apiUtils.qrDiscountMerchantDetail({}).
    then(() => {
      checkApi('QR_DISCOUNT_MERCHANT_DETAIL', 'postNewQr', expectedPayload, expectedAdditionals);
    });
});

it('getFlightAvailability: GET_FLIGHT_AVAILABILITY API', () => {
  const expectedPayload = {};
  const expectedAdditionals = ['TXID', 'lang'];

  return apiUtils.getFlightAvailability({}).
    then(() => {
      checkApi('GET_FLIGHT_AVAILABILITY', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getFareDetail: GET_FARE_DETAIL API', () => {
  const expectedPayload = {};
  const expectedAdditionals = ['TXID', 'lang'];

  return apiUtils.getFareDetail({}).
    then(() => {
      checkApi('GET_FARE_DETAIL', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getListPassenger: GET_LIST_PASSENGER API', () => {
  const expectedPayload = {};
  const expectedAdditionals = ['TXID', 'lang'];

  return apiUtils.getListPassenger({}).
    then(() => {
      checkApi('GET_LIST_PASSENGER', 'postEStore', expectedPayload, expectedAdditionals);
    });
});

it('addListPassenger: ADD_LIST_PASSENGER API', () => {
  const expectedPayload = {};
  const expectedAdditionals = ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang', 'easyPin'];

  return apiUtils.addListPassenger({}).
    then(() => {
      checkApi('ADD_LIST_PASSENGER', 'postEStore', expectedPayload, expectedAdditionals);
    });
});

it('getFlightReserv: GET_FLIGHT_RESERV API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['lang'];

  return apiUtils.getFlightReserv({}).
    then(() => {
      checkApi('GET_FLIGHT_RESERV', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getDetailTransactionEmoneyHistory: GET_STATEMENT_EMONEY_DETAIL API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];

  return apiUtils.getDetailTransactionEmoneyHistory({}).
    then(() => {
      checkApi('GET_STATEMENT_EMONEY_DETAIL', 'post', expectedPayload, expectedAdditionals);
    });
});

it('detectFace: DETECT_LIVE_FACE API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang'];

  return apiUtils.detectFace({}).
    then(() => {
      checkApi('DETECT_LIVE_FACE', 'postFace', expectedPayload, expectedAdditionals);
    });
});

it('registerFace: REGISTER_LOGIN_WITH_FACE API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang'];

  return apiUtils.registerFace({}).
    then(() => {
      checkApi('REGISTER_LOGIN_WITH_FACE', 'postFace', expectedPayload, expectedAdditionals);
    });
});

it('getwealthManagementLinkUnlink: GET_WEALTH_MANAGEMENT_LINK_UNLINK API', () => {
  const expectedPayload = {code: {}, modeChoose: undefined, portfolio: undefined};
  const expectedAdditionals =  ['ipassport', 'lang'];

  return apiUtils.getwealthManagementLinkUnlink({}).
    then(() => {
      checkApi('GET_WEALTH_MANAGEMENT_LINK_UNLINK', 'post', expectedPayload, expectedAdditionals);
    });
});

it('resultGenericBill: GENERIC_BILLER_RESULT API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient'];

  return apiUtils.resultGenericBill({}).
    then(() => {
      checkApi('GENERIC_BILLER_RESULT', 'postV4', expectedPayload, expectedAdditionals);
    });
});

it('confirmGenericBill: GENERIC_BILLER_CONFIRMATION API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin'];

  return apiUtils.confirmGenericBill({}).
    then(() => {
      checkApi('GENERIC_BILLER_CONFIRMATION', 'postV4', expectedPayload, expectedAdditionals);
    });
});

it('resultWaterBill: WATERBILL_RESULT API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin'];

  return apiUtils.resultWaterBill({}).
    then(() => {
      checkApi('WATERBILL_RESULT', 'postV4', expectedPayload, expectedAdditionals);
    });
});

it('confirmationWaterBill: WATERBILL_CONFIRMATION API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'easyPin'];

  return apiUtils.confirmationWaterBill({}).
    then(() => {
      checkApi('WATERBILL_CONFIRMATION', 'postV4', expectedPayload, expectedAdditionals);
    });
});

it('resultMobilePostPaid: MOBILE_POSTPAID_RESULT API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin'];

  return apiUtils.resultMobilePostPaid({}).
    then(() => {
      checkApi('MOBILE_POSTPAID_RESULT', 'postV4', expectedPayload, expectedAdditionals);
    });
});

it('confirmationMobilePostPaid: MOBILE_POSTPAID_CONFIRMATION API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'easyPin'];

  return apiUtils.confirmationMobilePostPaid({}).
    then(() => {
      checkApi('MOBILE_POSTPAID_CONFIRMATION', 'postV4', expectedPayload, expectedAdditionals);
    });
});

it('resultMobileTopup: MOBILE_TOPUP_RESULT API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin'];

  return apiUtils.resultMobileTopup({}).
    then(() => {
      checkApi('MOBILE_TOPUP_RESULT', 'postV4', expectedPayload, expectedAdditionals);
    });
});

it('confirmationMobileTopup: MOBILE_TOPUP_CONFIRMATION API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'easyPin'];

  return apiUtils.confirmationMobileTopup({}).
    then(() => {
      checkApi('MOBILE_TOPUP_CONFIRMATION', 'postV4', expectedPayload, expectedAdditionals);
    });
});

it('resultElectricityBill: ELECTRICITY_RESULT API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin'];

  return apiUtils.resultElectricityBill({}).
    then(() => {
      checkApi('ELECTRICITY_RESULT', 'postV4', expectedPayload, expectedAdditionals);
    });
});

it('confirmationElectricityBill: ELECTRICITY_CONFIRMATION API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'easyPin'];

  return apiUtils.confirmationElectricityBill({}).
    then(() => {
      checkApi('ELECTRICITY_CONFIRMATION', 'postV4', expectedPayload, expectedAdditionals);
    });
});

it('getRegexPasswordPolicy: GET_REGEX_PASSWORD_POLICY API', () => {
  const expectedPayload = {};

  return apiUtils.getRegexPasswordPolicy({}).
    then(() => {
      checkApi('GET_REGEX_PASSWORD_POLICY', 'get', expectedPayload);
    });
});

it('getLanguage: GET_LANGUAGE API', () => {
  const expectedPayload = {};

  return apiUtils.getLanguage({}).
    then(() => {
      checkApi('GET_LANGUAGE', 'get', expectedPayload);
    });
});

it('sendEFormNTB: EFORM_NTB API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];

  return apiUtils.sendEFormNTB({}).
    then(() => {
      checkApi('EFORM_NTB', 'postForCaptcha', expectedPayload, expectedAdditionals);
    });
});

it('qrPayment: QR_PAYMENT API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin'];

  return apiUtils.qrPayment({}).
    then(() => {
      checkApi('QR_PAYMENT', 'postForQrPayment', expectedPayload, expectedAdditionals);
    });
});

it('closeTimeDeposit: CLOSE_TD API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang',  'E2EE_RANDOM', 'easyPin'];

  return apiUtils.closeTimeDeposit({}).
    then(() => {
      checkApi('CLOSE_TD', 'post', expectedPayload, expectedAdditionals);
    });
});

it('requestCreditCardChangeLimit: REQUEST_CREDIT_CARD_CREDIT_CARD_OPTION API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];

  return apiUtils.requestCreditCardChangeLimit({}).
    then(() => {
      checkApi('REQUEST_CREDIT_CARD_CREDIT_CARD_OPTION', 'post', expectedPayload, expectedAdditionals);
    });
});

it('confirmCreditCardChangeLimit: CONFIRM_CREDIT_CARD_CHANGE_LIMIT API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];

  return apiUtils.confirmCreditCardChangeLimit({}).
    then(() => {
      checkApi('CONFIRM_CREDIT_CARD_CHANGE_LIMIT', 'post', expectedPayload, expectedAdditionals);
    });
});

it('requestCreditCardOption: REQUEST_CREDIT_CARD_OPTION API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];

  return apiUtils.requestCreditCardOption({}).
    then(() => {
      checkApi('REQUEST_CREDIT_CARD_OPTION', 'post', expectedPayload, expectedAdditionals);
    });
});

it('confirmCreditCardOption: CONFIRM_CREDIT_CARD_OPTION API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];

  return apiUtils.confirmCreditCardOption({}).
    then(() => {
      checkApi('CONFIRM_CREDIT_CARD_OPTION', 'post', expectedPayload, expectedAdditionals);
    });
});

it('requestBlockCreditCard: REQUEST_BLOCK_CREDIT_CARD API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];

  return apiUtils.requestBlockCreditCard({}).
    then(() => {
      checkApi('REQUEST_BLOCK_CREDIT_CARD', 'post', expectedPayload, expectedAdditionals);
    });
});

it('confirmBlockCreditCard: CONFIRM_BLOCK_CREDIT_CARD API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];

  return apiUtils.confirmBlockCreditCard({}).
    then(() => {
      checkApi('CONFIRM_BLOCK_CREDIT_CARD', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getCreditCardTransactionHistory: CREDIT_CARD_TRANSACTION API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang'];

  return apiUtils.getCreditCardTransactionHistory({}).
    then(() => {
      checkApi('CREDIT_CARD_TRANSACTION', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getATMList: ATM_LOCATOR API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['lang'];

  return apiUtils.getATMList({}).
    then(() => {
      checkApi('ATM_LOCATOR', 'post', expectedPayload, expectedAdditionals);
    });
});

it('COUNTRY_ISO: COUNTRY_ISO API', () => {
  const expectedPayload = {};

  return apiUtils.countryIso({}).
    then(() => {
      checkApi('COUNTRY_ISO', 'getEStore', expectedPayload);
    });
});

it('deleteBillpayHistory: DELETE_BILLPAY_HISTORY API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'tokenClient', 'tokenServer'];
  return apiUtils.deleteBillpayHistory({}).
    then(() => {
      checkApi('DELETE_BILLPAY_HISTORY', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getBillpayHistory: GET_BILLPAY_HISTORY API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'tokenClient', 'tokenServer'];
  return apiUtils.getBillpayHistory({}).
    then(() => {
      checkApi('GET_BILLPAY_HISTORY', 'post', expectedPayload, expectedAdditionals);
    });
});

it('deleteFromPayeeList: DELETE_PAYEE_TRANSFER API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'sessionCode', 'E2EE_RANDOM', 'easyPin', 'tokenClient', 'tokenServer'];
  return apiUtils.deleteFromPayeeList({}).
    then(() => {
      checkApi('DELETE_PAYEE_TRANSFER', 'postV4', expectedPayload, expectedAdditionals);
    });
});

it('checkVoucherValidity: GET_VOUCHER_VALIDITY API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'tokenClient', 'tokenServer'];
  return apiUtils.checkVoucherValidity({}).
    then(() => {
      checkApi('GET_VOUCHER_VALIDITY', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getVoucherListDetail: GET_VOUCHER_DETAIL API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang'];
  return apiUtils.getVoucherListDetail({}).
    then(() => {
      checkApi('GET_VOUCHER_DETAIL', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getVoucherList: GET_VOCUHERLIST API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'tokenClient', 'tokenServer', 'isBeforeLogin'];
  return apiUtils.getVoucherList({}).
    then(() => {
      checkApi('GET_VOCUHERLIST', 'post', expectedPayload, expectedAdditionals);
    });
});

it('generateCode: GENERATE CODE API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang', 'easyPin'];
  return apiUtils.generateCode({}).
    then(() => {
      checkApi('GENERATE_CODE', 'postV3', expectedPayload, expectedAdditionals);
    });
});

it('generateOnlineCode: GENERATE CODE API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin'];
  return apiUtils.generateOnlineCode({}).
    then(() => {
      checkApi('GENERATE_ONLINE_CODE', 'postV3', expectedPayload, expectedAdditionals);
    });
});

it('generateCodeII: GENERATE CODE API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'ipassport', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang', 'ipassport', 'easyPin'];
  return apiUtils.generateCodeII({}).
    then(() => {
      checkApi('GENERATE_ONLINE_CODE_II', 'postV3', expectedPayload, expectedAdditionals);
    });
});

it('checkStatusInvoice: CHECK STATUS INVOICE', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang'];
  return apiUtils.checkStatusInvoice({}).
    then(() => {
      checkApi('CHECK_STATUS_INVOICE', 'postV3', expectedPayload, expectedAdditionals);
    });
});

it('getVoucherList: GET_SUGGESTION_VOUCHER API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang', 'tokenClient', 'tokenServer'];
  return apiUtils.getSuggestVoucher({}).
    then(() => {
      checkApi('GET_SUGGESTION_VOUCHER', 'post', expectedPayload, expectedAdditionals);
    });
});

it('getLockdownFlag: GET_LOCKDOWN_FLAG API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang'];
  return apiUtils.getLockdownFlag({}).
    then(() => {
      checkApi('GET_LOCKDOWN_FLAG', 'post', expectedPayload, expectedAdditionals);
    });
});

it('setLockdownFlag: SET_LOCKDOWN_FLAG API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  ['ipassport', 'lang'];
  return apiUtils.setLockdownFlag({}).
    then(() => {
      checkApi('SET_LOCKDOWN_FLAG', 'post', expectedPayload, expectedAdditionals);
    });
});
it('locationUpgradeKyc: LOCATION_UPGRADE_KYC API', () => {
  const expectedPayload = {};
  const expectedAdditionals =  [];

  return apiUtils.locationUpgradeKyc({}).
    then(() => {
      checkApi('LOCATION_UPGRADE_KYC', 'post', expectedPayload, expectedAdditionals);
    });
});
