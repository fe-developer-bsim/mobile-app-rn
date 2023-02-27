import updateRecentSearch from '../updateRecentSearch.reducer';
import {UPDATE_RECENT_SEARCH, CLEAR_RECENT_SEARCH} from '../../actions/index.actions';

describe('Reducer: recurringtransfer', () => {

  it('Should return default state by default', () => {
    expect(updateRecentSearch([], '')).toEqual([]);
  });

  it('Should set biller config', () => {
    const action = {
      type: UPDATE_RECENT_SEARCH,
      payload: [{wasd: '123'}]
    };
    const expectedResult = [{wasd: '123'}];
    expect(updateRecentSearch([], action)).toEqual(expectedResult);
  });

  it('Should reset biller config', () => {
    const action = {
      type: CLEAR_RECENT_SEARCH
    };
    const expectedResult = [];
    expect(updateRecentSearch([], action)).toEqual(expectedResult);
  });
});
