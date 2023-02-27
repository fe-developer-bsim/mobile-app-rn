import searchMetaData from '../searchMetaData.reducer';
import {SAVE_SEARCH_META_DATA, CLEAR_SEARCH_META_DATA} from '../../actions/index.actions';

describe('Reducer: searchMetaData', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(searchMetaData(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_SEARCH_META_DATA};
    expect(searchMetaData(previousState, action)).toEqual(initialState);
  });
  it('Should update searchMetaData', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_SEARCH_META_DATA, payload: {test: 'wa'}};
    expect(searchMetaData(previousState, action)).toEqual(nextState);
  });
});
