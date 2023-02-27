import getCityListSil from '../getCityListSil.reducer';
import {SAVE_CITY_LIST_SIL, CLEAR_CITY_LIST_SIL} from '../../actions/index.actions';

describe('Reducer: user', () => {

  it('Should return default state by default', () => {
    expect(getCityListSil([], '')).toEqual([]);
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_CITY_LIST_SIL,
      payload: []
    };
    const expectedResult = [];
    expect(getCityListSil([], action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_CITY_LIST_SIL
    };
    const expectedResult = [];
    expect(getCityListSil([], action)).toEqual(expectedResult);
  });
});
