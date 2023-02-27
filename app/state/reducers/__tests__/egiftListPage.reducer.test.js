import egift from '../egiftListPage.reducer';
import {SAVE_EGIFT_PAGE, CLEAR_EGIFT_PAGE} from '../../actions/index.actions';

describe('Reducer: egift', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(egift(undefined, {})).toEqual(initialState);
  });
  it('Should update egift list', () => {
    const nextState = [1, 2, 3];
    const action = {type: SAVE_EGIFT_PAGE, payload: [1, 2, 3]};
    expect(egift([1, 2, 3], action)).toEqual(nextState);
  });
  it('Should clear egift list', () => {
    const nextState = [];
    const action = {type: CLEAR_EGIFT_PAGE};
    expect(egift([], action)).toEqual(nextState);
  });
});
