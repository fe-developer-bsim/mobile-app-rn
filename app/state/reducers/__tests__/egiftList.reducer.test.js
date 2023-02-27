import egift from '../egiftList.reducer';
import {SAVE_EGIFT_LIST, CLEAR_EGIFT_LIST} from '../../actions/index.actions';

describe('Reducer: egift', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(egift(undefined, {})).toEqual(initialState);
  });
  it('Should update egift list', () => {
    const nextState = [1, 2, 3];
    const action = {type: SAVE_EGIFT_LIST, payload: [1, 2, 3]};
    expect(egift([1, 2, 3], action)).toEqual(nextState);
  });
  it('Should clear egift list', () => {
    const nextState = [];
    const action = {type: CLEAR_EGIFT_LIST};
    expect(egift([], action)).toEqual(nextState);
  });
});
