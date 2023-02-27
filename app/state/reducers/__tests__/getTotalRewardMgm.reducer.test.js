import totalRewardMgm from '../getTotalRewardMgm.reducer';
import {SAVE_TOTAL_REWARD, CLEAR_TOTAL_REWARD} from '../../actions/index.actions';

describe('Reducer: totalRewardMgm', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(totalRewardMgm(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_TOTAL_REWARD};
    expect(totalRewardMgm(previousState, action)).toEqual(initialState);
  });
  it('Should update totalRewardMgm', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_TOTAL_REWARD, payload: {test: 'wa'}};
    expect(totalRewardMgm(previousState, action)).toEqual(nextState);
  });
});
