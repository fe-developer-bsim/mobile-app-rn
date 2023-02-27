import rewardBalanceMgm from '../getRewardBalanceMgm.reducer';
import {SAVE_REWARD_BALANCE, CLEAR_REWARD_BALANCE} from '../../actions/index.actions';

describe('Reducer: rewardBalanceMgm', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(rewardBalanceMgm(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_REWARD_BALANCE};
    expect(rewardBalanceMgm(previousState, action)).toEqual(initialState);
  });
  it('Should update rewardBalanceMgm', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_REWARD_BALANCE, payload: {test: 'wa'}};
    expect(rewardBalanceMgm(previousState, action)).toEqual(nextState);
  });
});
