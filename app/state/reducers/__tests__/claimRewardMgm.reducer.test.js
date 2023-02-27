import claimRewardMgm from '../claimRewardMgm.reducer';
import {TRANSACTIONS_UPDATE_TODAY_REWARD, TRANSACTIONS_CLEAN_CLEAR_TODAY_MGM} from '../../actions/index.actions';

describe('Reducer: claimRewardMgm', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(claimRewardMgm(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: TRANSACTIONS_CLEAN_CLEAR_TODAY_MGM};
    expect(claimRewardMgm(previousState, action)).toEqual(initialState);
  });
  it('Should update claimRewardMgm', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: TRANSACTIONS_UPDATE_TODAY_REWARD, payload: {test: 'wa'}};
    expect(claimRewardMgm(previousState, action)).toEqual(nextState);
  });
});
