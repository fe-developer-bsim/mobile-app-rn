import referralCode from '../referralCode.reducer';
import {SHARE_REFERRAL_CODE, CLEAR_SHARE_REFERRAL_CODE} from '../../actions/index.actions';

describe('Reducer: referralCode', () => {

  it('Should return default state by default', () => {
    expect(referralCode('', '')).toEqual('');
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SHARE_REFERRAL_CODE,
      payload: 'xx-000'
    };
    const expectedResult = 'xx-000';
    expect(referralCode('', action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_SHARE_REFERRAL_CODE
    };
    const expectedResult = '';
    expect(referralCode('', action)).toEqual(expectedResult);
  });

});
