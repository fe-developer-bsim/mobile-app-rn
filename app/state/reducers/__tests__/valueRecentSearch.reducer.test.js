import valueRecentSearch from '../valueRecentSearch.reducer';
import {SAVE_VALUE_RECENT_SEARCH, CLEAR_VALUE_RECENT_SEARCH} from '../../actions/index.actions';

describe('Reducer: recurringtransfer', () => {

  it('Should return default state by default', () => {
    expect(valueRecentSearch([], '')).toEqual([]);
  });

  it('Should set biller config', () => {
    const action = {
      type: SAVE_VALUE_RECENT_SEARCH,
      payload: [{wasd: '123'}]
    };
    const expectedResult = [{wasd: '123'}];
    expect(valueRecentSearch([], action)).toEqual(expectedResult);
  });

  it('Should reset biller config', () => {
    const action = {
      type: CLEAR_VALUE_RECENT_SEARCH
    };
    const expectedResult = [];
    expect(valueRecentSearch([], action)).toEqual(expectedResult);
  });
});
