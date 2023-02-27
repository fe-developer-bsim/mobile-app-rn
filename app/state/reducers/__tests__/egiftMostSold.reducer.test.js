import egiftMostSold from '../egiftMostSold.reducer';
import {SAVE_EGIFT_MOST, CLEAR_EGIFT_MOST} from '../../actions/index.actions';

describe('Reducer: user', () => {

  it('Should return default state by default', () => {
    expect(egiftMostSold([], '')).toEqual([]);
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_EGIFT_MOST,
      payload: []
    };
    const expectedResult = [];
    expect(egiftMostSold([], action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_EGIFT_MOST
    };
    const expectedResult = [];
    expect(egiftMostSold([], action)).toEqual(expectedResult);
  });
});
