import simasPoinReducer from '../alfaCartPaginationSearch.reducer';
import {SAVE_ALFA_PAGINATION_SEARCH, DELETE_ALFA_PAGINATION_SEARCH} from '../../actions/index.actions';

describe('Reducer: simasPoinReducer', () => {
  it('Should return default state by default', () => {
    expect(simasPoinReducer(undefined, {})).toEqual({});
  });
  it('Should save alfacart', () => {
    expect(simasPoinReducer('', {type: SAVE_ALFA_PAGINATION_SEARCH, payload: '123'})).toEqual('123');
  });
  it('Should clear alfacart', () => {
    expect(simasPoinReducer('123', {type: DELETE_ALFA_PAGINATION_SEARCH})).toEqual([]);
  });
});
