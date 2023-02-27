import listAllProductSearch from '../alfacartAllProductSearch.reducer';
import {SAVE_ALL_PRODUCT_SEARCH, CLEAR_ALL_PRODUCT_SEARCH} from '../../actions/index.actions';

describe('Reducer: listAllProductSearch', () => {
  it('Should return default state by default', () => {
    expect(listAllProductSearch(undefined, [])).toEqual([]);
  });
  it('Should save alfacart', () => {
    expect(listAllProductSearch('', {type: SAVE_ALL_PRODUCT_SEARCH, payload: '123'})).toEqual('123');
  });
  it('Should clear alfacart', () => {
    expect(listAllProductSearch('123', {type: CLEAR_ALL_PRODUCT_SEARCH})).toEqual('');
  });
});
