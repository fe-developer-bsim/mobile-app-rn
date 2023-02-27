import isDeeplinkExist from '../isDeeplinkExist.reducer';
import {SHARE_DEEPLINK_FLAG, CLEAR_SHARE_REFERRAL_FLAG} from '../../actions/index.actions';

describe('Reducer: ccCode', () => {
  it('Should return default state by default', () => {
    expect(isDeeplinkExist(undefined, '')).toEqual('');
  });
  it('Should save cc code', () => {
    expect(isDeeplinkExist('', {type: SHARE_DEEPLINK_FLAG, payload: '123'})).toEqual('123');
  });
  it('Should clear cc code', () => {
    expect(isDeeplinkExist('123', {type: CLEAR_SHARE_REFERRAL_FLAG})).toEqual('');
  });
  describe('Reducer: referralCode', () => {

    it('Should return default state by default', () => {
      expect(isDeeplinkExist('', '')).toEqual('');
    });

    it('Should set transaction Reference Number', () => {
      const action = {
        type: SHARE_DEEPLINK_FLAG,
        payload: 'xx-000'
      };
      const expectedResult = 'xx-000';
      expect(isDeeplinkExist('', action)).toEqual(expectedResult);
    });

    it('Should reset transaction Reference Number', () => {
      const action = {
        type: CLEAR_SHARE_REFERRAL_FLAG
      };
      const expectedResult = '';
      expect(isDeeplinkExist('', action)).toEqual(expectedResult);
    });

  });
});
