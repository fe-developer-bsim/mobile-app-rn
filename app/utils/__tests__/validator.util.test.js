import * as Utils from '../validator.util';
import {language} from '../../config/language';

describe('validateRequiredFields Utility', () => {
  it('CustomerId, required error', () => {
    const dummyValues = {consumerNo: '', waterBiller: {id: 1157, name: 'PDAM', prefix: null, validation: ''}};
    const dummyFields = ['waterBiller', 'consumerNo'];
    const expected = {consumerNo: language.VALIDATION__REQUIRED_FIELD};
    expect(Utils.validateRequiredFields(dummyValues, dummyFields)).toEqual(expected);
  });
});

describe('validateBalance Utility', () => {
  it('Balance below transaction amount', () => {
    const dummyAmount = '100000';
    const dummyBalance = '1000';
    const expected = language.VALIDATE__NOT_ENOUGHT_BALANCE;
    expect(Utils.validateBalance(dummyBalance, dummyAmount)).toEqual(expected);
  });
  it('Balance > amount', () => {
    const dummyAmount = '0';
    const dummyBalance = '1000';
    const expected = undefined;
    expect(Utils.validateBalance(dummyBalance, dummyAmount)).toEqual(expected);
  });
});

describe('Validator Utility', () => {
  it('validateCreatePassword: Should validate create password', () => {
    expect(Utils.validateCreatePassword('123', '123')).toEqual(language.VALIDATION__DIFFERENT_NEW_PASSWORD);
    expect(Utils.validateCreatePassword('123', '1234')).toEqual(language.ERROR_MESSAGE__PASSWORD_COULD_NOT_SET);
  });
  it('validateFieldsMatch: Should return error if fields doesn\'t match', () => {
    expect(Utils.validateFieldsMatch('123', '1234')).toEqual(language.VALIDATE__VALIDATE__FIELDS_MATCH);
    expect(Utils.validateFieldsMatch('123', '123')).toBeUndefined();
  });
  it('validatePinCodeLength: Should return error if field length is less than 6', () => {
    expect(Utils.validatePinCodeLength('123')).toEqual(language.VALIDATE__PINCODE_FIXED_LENGHT);
    expect(Utils.validatePinCodeLength('123456')).toBeUndefined();
  });
  it('isInRange: accepts minval, maxval, val and return error if not in range', () => {
    expect(Utils.isInRange(0, 400, 100)).toBeUndefined();
    expect(Utils.isInRange('0', '400', '100')).toBeUndefined();
    expect(Utils.isInRange(300, 400, 100)).toEqual(`${language.VALIDATE__LESS_THAN_MIN} Rp 300`);
    expect(Utils.isInRange(300, 400, 500)).toEqual(`${language.VALIDATE__GREATER_THAN_MAX} Rp 400`);
    expect(Utils.isInRange(undefined)).toEqual(undefined);
  });
  it('validateNumber: should validate number', () => {
    expect(Utils.validateNumber('+122112')).toEqual(language.VALIDATE__NUMBER);
    expect(Utils.validateNumber(null)).toEqual(language.VALIDATE__NUMBER);
    expect(Utils.validateNumber(0)).toBeUndefined();
    expect(Utils.validateNumber('122112')).toBeUndefined();
    expect(Utils.validateNumber(122112)).toBeUndefined();
  });
  it('validateWaterbillConsumerNo: customerId length below 15 and should be only number', () => {
    expect(Utils.validateWaterbillConsumerNo('123456789012345')).toBeUndefined();
    expect(Utils.validateWaterbillConsumerNo('1234567890123456')).toEqual(language.VALIDATE__WATER_BILL_CONSUMER_NO_LENGTH);
    expect(Utils.validateWaterbillConsumerNo('+20123456')).toEqual(language.VALIDATE__NUMBER);
  });
  it('validateCreditCard: account number length below 16, should match prefix and should be only number', () => {
    expect(Utils.validateCreditCard('4893731234567890')).toBeUndefined();
    expect(Utils.validateCreditCard('1234567890123456')).toBeUndefined();
    expect(Utils.validateCreditCard('1234567890123')).toEqual(language.VALIDATE__VALID_CREDIT_CARD);
    expect(Utils.validateCreditCard('+20123456')).toEqual(language.VALIDATE__NUMBER);
  });
  it('isInRangeEmoney: accepts minval, maxval, val and return error if not in range', () => {
    expect(Utils.isInRangeEmoney(0, 400, 100)).toBeUndefined();
    expect(Utils.isInRangeEmoney('0', '400', '100')).toBeUndefined();
    expect(Utils.isInRangeEmoney(300, 400, 100)).toEqual(`${language.VALIDATE__LESS_THAN_MIN} Rp 300`);
    expect(Utils.isInRangeEmoney(300, 400, 500)).toEqual(`${language.VALIDATE__GREATER_THAN_MAX} Rp 400`);
    expect(Utils.isInRangeEmoney(undefined)).toEqual(undefined);
  });
});

describe('validateDateFormat Utility', () => {
  it('Date mush be formated', () => {
    expect(Utils.validateDateFormat('07071994')).toEqual(language.VALIDATE__DATE_MUST_BE_MATCH_A_FORMAT);
    expect(Utils.validateDateFormat('07/07/1994')).toEqual(undefined);
    expect(Utils.validateDateFormat('')).toEqual(language.VALIDATE__DATE_MUST_BE_MATCH_A_FORMAT);
    expect(Utils.validateDateFormat(null)).toEqual(language.VALIDATE__DATE_MUST_BE_MATCH_A_FORMAT);
  });
});

describe('validateName Utility', () => {
  it('Name mush be formated', () => {
    expect(Utils.validateName('8962349623bbs,xsm')).toEqual(language.VALIDATE__NAME_MUST_BE_MATCH_A_FORMAT);
    expect(Utils.validateName('Lala Karmela')).toEqual(undefined);
    expect(Utils.validateName('')).toEqual(undefined);
    expect(Utils.validateName(null)).toEqual(undefined);
  });
});

describe('validateMaxTransactionAmount Utility', () => {
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
  it('Max amount should be based on transaction type and max amount of corresponding type', () => {
    expect(Utils.validateMaxTransactionAmount(500000001, tokenConfig, false)).toEqual(`${language.VALIDATE__GREATER_THAN_MAX} : Rp 500.000.000`);
    expect(Utils.validateMaxTransactionAmount(500000000, tokenConfig, false)).toEqual(undefined);
    expect(Utils.validateMaxTransactionAmount(500000001, tokenConfig, true)).toEqual(undefined);
  });
});

describe('isValidUsername Utility', () => {
  it('Name mush be formated', () => {
    expect(Utils.isValidUsername('')).toEqual(false);
    expect(Utils.isValidUsername(null)).toEqual(false);
    expect(Utils.isValidUsername('123')).toEqual(false);
    expect(Utils.isValidUsername('abc')).toEqual(false);
    expect(Utils.isValidUsername('semangat45')).toEqual(true);
  });
});

describe('isValidPassword Utility', () => {
  const regex = '(?=.*[a-zA-Z])|.*[0-9].*|^((?!badword).)*$/i|^.{8,20}$';
  const messageError = 'Password must contain at least 1 letter|Password must contain at least 1 numeric|Password must not contain your user name|Password length must be 8-20 characters';
  it('Password must be right on rule', () => {
    expect(Utils.isValidPassword('', '', '', '')).toEqual(language.ERROR_MESSAGE__PASSWORD_COULD_NOT_SET);
    expect(Utils.isValidPassword('', 'username', '', '')).toEqual(language.ERROR_MESSAGE__PASSWORD_COULD_NOT_SET);
    expect(Utils.isValidPassword('password', '', '', '')).toEqual(language.ERROR_MESSAGE__PASSWORD_COULD_NOT_SET);
    expect(Utils.isValidPassword('password', 'username', '', '')).toEqual(language.ERROR_MESSAGE__PASSWORD_COULD_NOT_SET);
    expect(Utils.isValidPassword('password', 'username', regex, '')).toEqual(language.ERROR_MESSAGE__PASSWORD_COULD_NOT_SET);
    expect(Utils.isValidPassword('password', 'username', '', messageError)).toEqual(language.ERROR_MESSAGE__PASSWORD_COULD_NOT_SET);

    expect(Utils.isValidPassword('semangat', 'username', regex, messageError)).toEqual('Password must contain at least 1 numeric');
    expect(Utils.isValidPassword('123', 'username', regex, messageError)).toEqual('Password must contain at least 1 letter');
    expect(Utils.isValidPassword('username123', 'username123', regex, messageError)).toEqual('Password must not contain your user name');
    expect(Utils.isValidPassword('se12', 'username', regex, messageError)).toEqual('Password length must be 8-20 characters');
  });
});

describe('validatePackageCode Utility', () => {
  it('PackageCode must be right', () => {
    expect(Utils.validatePackageCode('')).toEqual(language.VALIDATE__PACKAGECODE);
    expect(Utils.validatePackageCode('s')).toEqual(language.VALIDATE__PACKAGECODE);
    expect(Utils.validatePackageCode('1')).toEqual(language.VALIDATE__PACKAGECODE);
    expect(Utils.validatePackageCode('.')).toEqual(language.VALIDATE__PACKAGECODE);
    expect(Utils.validatePackageCode('s.')).toEqual(language.VALIDATE__PACKAGECODE);
    expect(Utils.validatePackageCode('1.')).toEqual(language.VALIDATE__PACKAGECODE);
    expect(Utils.validatePackageCode('ss')).toEqual(language.VALIDATE__PACKAGECODE);
    expect(Utils.validatePackageCode('..')).toEqual(language.VALIDATE__PACKAGECODE);
    expect(Utils.validatePackageCode('sss')).toEqual(language.VALIDATE__PACKAGECODE);
    expect(Utils.validatePackageCode('111')).toEqual(language.VALIDATE__PACKAGECODE);
    expect(Utils.validatePackageCode('...')).toEqual(language.VALIDATE__PACKAGECODE);
    expect(Utils.validatePackageCode('01')).toEqual(undefined);
  });
});

describe('validateMaxAmount Utility', () => {
  it('Amount above limit', () => {
    const dummyAmount = '500000001';
    const expected = language.VALIDATE__MAX_AMOUNT;
    expect(Utils.validateMaxAmount(dummyAmount)).toEqual(expected);
  });
  it('Amount below limit', () => {
    const dummyAmount = '5000000';
    expect(Utils.validateMaxAmount(dummyAmount)).toEqual(undefined);
  });
});

describe('validateTC Utility', () => {
  it('Validate term condition error', () => {
    const expected = language.IDENTITYFIFTHFORM__NAME_ERROR;
    expect(Utils.validateTC(false)).toEqual(expected);
  });
  it('Validate term condition', () => {
    expect(Utils.validateTC(true)).toEqual(undefined);
  });
});

describe('validateNameEform Utility', () => {
  it('Validate name Eform error', () => {
    const expected = language.IDENTITYFIFTHFORM__NAME_ERROR;
    expect(Utils.validateNameEform('wasd1234')).toEqual(expected);
  });
  it('Validate name Eform', () => {
    expect(Utils.validateNameEform('Testtest')).toEqual(undefined);
  });
});

describe('validateEmail Utility', () => {
  it('Validate email Eform error', () => {
    const expected = language.IDENTITYFIFTHFORM__EMAIL_ERROR;
    expect(Utils.validateEmail('wasd1234')).toEqual(expected);
  });
  it('Validate email Eform', () => {
    expect(Utils.validateEmail('test@yahoo.com')).toEqual(undefined);
  });
});

describe('validatePhoneNumber Utility', () => {
  it('Validate phone Eform error', () => {
    const expected = language.FIELD_PHONE_NUMBER__ERROR_STARTING;
    expect(Utils.validatePhoneNumber('wasd1234')).toEqual(expected);
  });
  it('Validate phone Eform', () => {
    expect(Utils.validatePhoneNumber('081234567890')).toEqual(undefined);
  });
});

describe('validateSmartfrenNumber Utility', () => {
  it('Validate phone Eform error', () => {
    const expected = language.IDENTITYFIFTHFORM__PHONE_ERROR;
    expect(Utils.validateSmartfrenNumber('wasd1234')).toEqual(expected);
  });
  it('Validate Smart Number error', () => {
    const expected = language.IDENTITYFIFTHFORM__SMARTFREN__NUMBER__ERROR;
    expect(Utils.validateSmartfrenNumber('088412345687')).toEqual(expected);
  });
});

describe('validateIdNumber Utility', () => {
  it('Validate id Eform number', () => {
    const expected = language.VALIDATE__NUMBER;
    expect(Utils.validateIdNumber('wasd1234')).toEqual(expected);
  });
  it('Validate id Eform length', () => {
    expect(Utils.validateIdNumber('1234123412341234')).toEqual(undefined);
  });
});

describe('validatePostalCodeLength Utility', () => {
  it('Validate phone Eform error', () => {
    const expected = language.VALIDATE_POSTAL_CODE_LENGTH;
    expect(Utils.validatePostalCodeLength('1234')).toEqual(expected);
  });
  it('Validate phone Eform', () => {
    expect(Utils.validatePostalCodeLength('12345')).toEqual(undefined);
  });
});

describe('isInRangeRTGS Utility', () => {
  const config = [{charge: 30000, maxAmount: 500000000, minAmount: 5000, mode: 'rtgs'}];
  it('isInRangeRTGS no error', () => {
    expect(Utils.isInRangeRTGS('50001', config, 'rtgs')).toEqual(undefined);
  });
  it('isInRangeRTGS max error', () => {
    const expectedMax = language.VALIDATE__GREATER_THAN_MAX_RTGS + ' : Rp 500.000.000';
    expect(Utils.isInRangeRTGS('500000001', config, 'rtgs')).toEqual(expectedMax);
  });
  it('isInRangeRTGS min error', () => {
    const expectedMin = language.VALIDATE__LESS_THAN_MIN_RTGS + ' : Rp 5.000';
    expect(Utils.isInRangeRTGS('1000', config, 'rtgs')).toEqual(expectedMin);
  });
});

describe('validateMaxTransferAmount Utility', () => {
  it('validateMaxTransferAmount no error', () => {
    expect(Utils.validateMaxTransferAmount('50001')).toEqual(undefined);
  });
  it('validateMaxTransferAmount error', () => {
    expect(Utils.validateMaxTransferAmount('500000001')).toEqual(undefined);
  });
});

describe('isPrk Utility', () => {
  const config = '1070';
  it('not prk account', () => {
    const account = {
      accountTypeCode: '1000'
    };
    expect(Utils.isPrk(config, account)).toEqual(false);
  });
  it('is prk account', () => {
    const account = {
      accountTypeCode: '1070'
    };
    expect(Utils.isPrk(config, account)).toEqual(true);
  });
});

describe('checkLimitCreateCC Utility', () => {
  it('Indigo product below limit or above', () => {
    expect(Utils.checkLimitCreateCC(440000, 'CCI-SIMOBI-002')).toEqual(language.CREATE_ACCOUNT__INDIGO_LIMIT);
    expect(Utils.checkLimitCreateCC(1800000001, 'CCI-SIMOBI-002')).toEqual(language.CREATE_ACCOUNT__INDIGO_LIMIT);
  });
  it('Indigo product', () => {
    expect(Utils.checkLimitCreateCC(500000, 'CCI-SIMOBI-002')).toEqual('');
  });
  it('Platinum product', () => {
    expect(Utils.checkLimitCreateCC(500000, 'CCP-SIMOBI-002')).toEqual('');
  });
  it('Orami product', () => {
    expect(Utils.checkLimitCreateCC(500000, 'CCO-SIMOBI-002')).toEqual('');
  });
});

describe('validateLength', () => {
  it('too few characters (length < minLength) - should return ' + language.MIN_NUMBER__ERROR1 + ' ' + language.GENERIC__MINIMUM + ' ' + 7 + ' ' + language.MIN_NUMBER__ERROR2, () => {
    const val = 'Hello';
    const minLength = 7;
    const expected = language.MIN_NUMBER__ERROR1 + ' ' + language.GENERIC__MINIMUM + ' ' + minLength + ' ' + language.MIN_NUMBER__ERROR2;
    expect(Utils.validateLength(val, minLength)).toEqual(expected);
  });
  it('too many characters (length > maxLength) - should return ' + language.MIN_NUMBER__ERROR1 + ' ' + language.GENERIC__MAXIMUM + ' ' + 3 + ' ' + language.MIN_NUMBER__ERROR2, () => {
    const val = 'Hello';
    const maxLength = 3;
    const expected = language.MIN_NUMBER__ERROR1 + ' ' + language.GENERIC__MAXIMUM + ' ' + maxLength + ' ' + language.MIN_NUMBER__ERROR2;
    expect(Utils.validateLength(val, 0, maxLength)).toEqual(expected);
  });
  it('just enough characters - should return; (undefined)', () => {
    const val = 'Hello';
    const maxLength = 5;
    const expected = undefined;
    expect(Utils.validateLength(val, 0, maxLength)).toEqual(expected);
  });
  describe('must be a certain digit', () => {
    it('too many characters (length > limit)', () => {
      const val = 'Hello';
      const digit = 3;
      const expected = language.MIN_NUMBER__ERROR1 + ' ' + digit + ' ' + language.MIN_NUMBER__ERROR2;
      expect(Utils.validateLength(val, digit, digit)).toEqual(expected);
    });
    it('too few characters (length < limit)', () => {
      const val = 'Hello';
      const digit = 7;
      const expected = language.MIN_NUMBER__ERROR1 + ' ' + digit + ' ' + language.MIN_NUMBER__ERROR2;
      expect(Utils.validateLength(val, digit, digit)).toEqual(expected);
    });
    it('just enough characters (length == limit)', () => {
      const val = 'Hello';
      const digit = 5;
      expect(Utils.validateLength(val, digit, digit)).toEqual(undefined);
    });
  });
});
describe('validateValue', () => {
  describe('needed value is a string', () => {
    it('value is a string', () => {
      const regex = /(^[a-zA-Z]*$)/;
      const val = 'hello';
      expect(Utils.validateValue(val, regex)).toEqual(undefined);
    });
    it('value is an alphanumeric', () => {
      const regex = /(^[a-zA-Z]*$)/;
      const val = 'hello999';
      const expected = language.GENERIC__ERROR_VALIDATION;
      expect(Utils.validateValue(val, regex)).toEqual(expected);
    });
    it('value is a number', () => {
      const regex = /(^[a-zA-Z]*$)/;
      const val = '999';
      const expected = language.GENERIC__ERROR_VALIDATION;
      expect(Utils.validateValue(val, regex)).toEqual(expected);
    });
    it('value is a special character', () => {
      const regex = /(^[a-zA-Z]*$)/;
      const val = ';/`$%^&*()!@#!@$!}{|}{__';
      const expected = language.GENERIC__ERROR_VALIDATION;
      expect(Utils.validateValue(val, regex)).toEqual(expected);
    });
  });
  describe('needed value is a number', () => {
    it('value is a string', () => {
      const regex = /(^[0-9]*$)/;
      const val = 'hello';
      const expected = language.GENERIC__ERROR_VALIDATION;
      expect(Utils.validateValue(val, regex)).toEqual(expected);
    });
    it('value is an alphanumeric', () => {
      const regex = /(^[0-9]*$)/;
      const val = 'hello999';
      const expected = language.GENERIC__ERROR_VALIDATION;
      expect(Utils.validateValue(val, regex)).toEqual(expected);
    });
    it('value is a number', () => {
      const regex = /(^[0-9]*$)/;
      const val = '999';
      expect(Utils.validateValue(val, regex)).toEqual(undefined);
    });
    it('value is a special character', () => {
      const regex = /(^[0-9]*$)/;
      const val = ';/`$%^&*()!@#!@$!}{|}{__';
      const expected = language.GENERIC__ERROR_VALIDATION;
      expect(Utils.validateValue(val, regex)).toEqual(expected);
    });
  });
  describe('needed value is an alphanumeric', () => {
    it('value is a string', () => {
      const regex = /(^[a-zA-Z0-9]*$)/;
      const val = 'hello';
      expect(Utils.validateValue(val, regex)).toEqual(undefined);
    });
    it('value is an alphanumeric', () => {
      const regex = /(^[a-zA-Z0-9]*$)/;
      const val = 'hello999';
      expect(Utils.validateValue(val, regex)).toEqual(undefined);
    });
    it('value is a number', () => {
      const regex = /(^[a-zA-Z0-9]*$)/;
      const val = '999';
      expect(Utils.validateValue(val, regex)).toEqual(undefined);
    });
    it('value is a special character', () => {
      const regex = /(^[a-zA-Z0-9]*$)/;
      const val = ';/`$%^&*()!@#!@$!}{|}{__';
      const expected = language.GENERIC__ERROR_VALIDATION;
      expect(Utils.validateValue(val, regex)).toEqual(expected);
    });
  });
  describe('needed value is a special character', () => {
    xit('value is a string', () => {
      const regex = /((^[a-zA-Z0-9])*$)/;
      const val = 'hello';
      const expected = language.GENERIC__ERROR_VALIDATION;
      expect(Utils.validateValue(val, regex)).toEqual(expected);
    });
    xit('value is an alphanumeric', () => {
      const regex = /((^[a-zA-Z0-9])*$)/;
      const val = 'hello999';
      const expected = language.GENERIC__ERROR_VALIDATION;
      expect(Utils.validateValue(val, regex)).toEqual(expected);
    });
    xit('value is a number', () => {
      const regex = /((^[a-zA-Z0-9])*$)/;
      const val = '999';
      const expected = language.GENERIC__ERROR_VALIDATION;
      expect(Utils.validateValue(val, regex)).toEqual(expected);
    });
    xit('value is a special character', () => {
      const regex = /((^[a-zA-Z0-9])*$)/;
      const val = ';/`$%^&*()!@#!@$!}{|}{__';
      expect(Utils.validateValue(val, regex)).toEqual(undefined);
    });
  });
});

describe('validateTotalDuration', () => {
  describe('upper bound', () => {
    describe('negative test', () => {
      it('in days', () => {
        const retDate = '11/11/2019';
        const goDate = '20/11/2019';
        const format = 'DD/MM/YYYY';
        const limit = 5;
        const bound = false;
        const expected = `${language.VALIDATE_DURATION__OVER_LIMIT} ${limit} ${language.VALIDATE_DURATION__DAYS}`;
        expect(Utils.validateTotalDurationInDays(retDate, goDate, format, bound, limit)).toEqual(expected);
      });
      it('in months', () => {
        const retDate = '11/01/2019';
        const goDate = '11/11/2019';
        const format = 'DD/MM/YYYY';
        const limit = 5;
        const bound = false;
        const expected = `${language.VALIDATE_DURATION__OVER_LIMIT} ${limit} ${language.VALIDATE_DURATION__MONTHS}`;
        expect(Utils.validateTotalDurationInMonths(retDate, goDate, format, bound, limit)).toEqual(expected);
      });
      it('in hours', () => {
        const retDate = '11/01/2019';
        const goDate = '15/01/2019';
        const format = 'DD/MM/YYYY';
        const limit = 72;
        const bound = false;
        const expected = `${language.VALIDATE_DURATION__OVER_LIMIT} ${limit} ${language.VALIDATE_DURATION__HOURS}`;
        expect(Utils.validateTotalDurationInHours(retDate, goDate, format, bound, limit)).toEqual(expected);
      });
      it('in years', () => {
        const retDate = '11/01/2019';
        const goDate = '15/01/2022';
        const format = 'DD/MM/YYYY';
        const limit = 2;
        const bound = false;
        const expected = `${language.VALIDATE_DURATION__OVER_LIMIT} ${limit} ${language.VALIDATE_DURATION__YEARS}`;
        expect(Utils.validateTotalDurationInYears(retDate, goDate, format, bound, limit)).toEqual(expected);
      });
    });
    describe('positive test', () => {
      it('in days', () => {
        const retDate = '11/11/2019';
        const goDate = '12/11/2019';
        const format = 'DD/MM/YYYY';
        const limit = 5;
        const bound = false;
        expect(Utils.validateTotalDurationInDays(retDate, goDate, format, bound, limit)).toEqual(undefined);
      });
      it('in months', () => {
        const retDate = '11/01/2019';
        const goDate = '11/02/2019';
        const format = 'DD/MM/YYYY';
        const limit = 5;
        const bound = false;
        expect(Utils.validateTotalDurationInMonths(retDate, goDate, format, bound, limit)).toEqual(undefined);
      });
      it('in hours', () => {
        const retDate = '11/01/2019';
        const goDate = '12/01/2019';
        const format = 'DD/MM/YYYY';
        const limit = 72;
        const bound = false;
        expect(Utils.validateTotalDurationInHours(retDate, goDate, format, bound, limit)).toEqual(undefined);
      });
      it('in years', () => {
        const retDate = '11/01/2019';
        const goDate = '15/01/2020';
        const format = 'DD/MM/YYYY';
        const limit = 2;
        const bound = false;
        expect(Utils.validateTotalDurationInYears(retDate, goDate, format, bound, limit)).toEqual(undefined);
      });
    });
  });
  describe('lower bound', () => {
    describe('negative test', () => {
      it('in days', () => {
        const retDate = '11/11/2019';
        const goDate = '12/11/2019';
        const format = 'DD/MM/YYYY';
        const limit = 5;
        const bound = true;
        const expected = `${language.VALIDATE_DURATION__UNDER_LIMIT} ${limit} ${language.VALIDATE_DURATION__DAYS}`;
        expect(Utils.validateTotalDurationInDays(retDate, goDate, format, bound, limit)).toEqual(expected);
      });
      it('in hours', () => {
        const retDate = '11/11/2019';
        const goDate = '12/11/2019';
        const format = 'DD/MM/YYYY';
        const limit = 36;
        const bound = true;
        const expected = `${language.VALIDATE_DURATION__UNDER_LIMIT} ${limit} ${language.VALIDATE_DURATION__HOURS}`;
        expect(Utils.validateTotalDurationInHours(retDate, goDate, format, bound, limit)).toEqual(expected);
      });
      it('in months', () => {
        const retDate = '11/11/2019';
        const goDate = '12/11/2019';
        const format = 'DD/MM/YYYY';
        const limit = 36;
        const bound = true;
        const expected = `${language.VALIDATE_DURATION__UNDER_LIMIT} ${limit} ${language.VALIDATE_DURATION__MONTHS}`;
        expect(Utils.validateTotalDurationInMonths(retDate, goDate, format, bound, limit)).toEqual(expected);
      });
      it('in years', () => {
        const retDate = '11/11/2019';
        const goDate = '12/11/2019';
        const format = 'DD/MM/YYYY';
        const limit = 5;
        const bound = true;
        const expected = `${language.VALIDATE_DURATION__UNDER_LIMIT} ${limit} ${language.VALIDATE_DURATION__YEARS}`;
        expect(Utils.validateTotalDurationInYears(retDate, goDate, format, bound, limit)).toEqual(expected);
      });
    });
    describe('positive test', () => {
      it('in days', () => {
        const retDate = '11/11/2019';
        const goDate = '20/11/2019';
        const format = 'DD/MM/YYYY';
        const limit = 5;
        const bound = true;
        expect(Utils.validateTotalDurationInDays(retDate, goDate, format, bound, limit)).toEqual(undefined);
      });
      it('in hours', () => {
        const retDate = '11/11/2019';
        const goDate = '13/11/2019';
        const format = 'DD/MM/YYYY';
        const limit = 36;
        const bound = true;
        expect(Utils.validateTotalDurationInHours(retDate, goDate, format, bound, limit)).toEqual(undefined);
      });
      it('in months', () => {
        const retDate = '11/01/2019';
        const goDate = '11/11/2019';
        const format = 'DD/MM/YYYY';
        const limit = 1;
        const bound = true;
        expect(Utils.validateTotalDurationInMonths(retDate, goDate, format, bound, limit)).toEqual(undefined);
      });
      it('in years', () => {
        const retDate = '11/11/2019';
        const goDate = '12/11/2030';
        const format = 'DD/MM/YYYY';
        const limit = 2;
        const bound = true;
        expect(Utils.validateTotalDurationInYears(retDate, goDate, format, bound, limit)).toEqual(undefined);
      });
    });
  });
});
