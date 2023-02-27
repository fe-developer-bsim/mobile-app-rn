import referralCodeMgm from '../referralCodeMgm.reducer';
import {SAVE_REFERRAL_CODE_MGM, CLEAR_REFERRAL_CODE_MGM} from '../../actions/index.actions';

describe('Reducer: referralCodeMgm', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(referralCodeMgm(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_REFERRAL_CODE_MGM};
    expect(referralCodeMgm(previousState, action)).toEqual(initialState);
  });
  it('Should update referralCodeMgm', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_REFERRAL_CODE_MGM, payload: {test: 'wa'}};
    expect(referralCodeMgm(previousState, action)).toEqual(nextState);
  });
});
