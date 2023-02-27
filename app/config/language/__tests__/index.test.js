import Bahasa from '../Bahasa';
import English from '../English';
import {map, result, filter} from 'lodash';

describe('Language constants', () => {
  it('sequence and no of English translations should be equal to number of Bahasa translations', () => {
    const countEnglish = Object.keys(English);
    const countBahasa = Object.keys(Bahasa);
    expect(countEnglish).toEqual(countBahasa);
  });

  it('should have a version info showing what version is the language file in', () => {
    // A KEY with LANG_VERSION should be present in both the language files (English and Bahasa) so that we can track the language version
    expect(English.LANG_VERSION).not.toBeUndefined();
    expect(Bahasa.LANG_VERSION).not.toBeUndefined();
  });

  it('the language version should be same for both english and bahasa', () => {
    expect(English.LANG_VERSION).toEqual(Bahasa.LANG_VERSION);
  });

  xit('checks untranslated language', () => {
    const exception = ['COMMON__EMAIL', 'LANG_VERSION', 'DASHBOARD__ACCOUNT_IDR', 'INSURANCE_PA_EMAIL', 'INSURANCE_PA_MOBILE_PHONE_PA', 
      'INSURANCE_PA_EMAIL_PH', 'INSURANCE_PA_CITY_PH', 'INSURANCE_PA_MOBILE_PHONE_PA', 'INSURANCE_PA_EMAIL', 'INSURANCE_PA_EMAIL_PH'];
    const listUntranslated = map(Bahasa, (obj, k) => {
      const engCounterpart = result(English, k, '');
      const retVal = {[`${k}`]: obj};
      if (engCounterpart === obj && !result(exception, k, '')) return retVal;
    });
    const expected = [];
    const finalList = filter(listUntranslated, (o) =>  o !== undefined);
    expect(JSON.stringify(finalList)).toEqual(JSON.stringify(expected));
  });
});
