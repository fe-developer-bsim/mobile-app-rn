import listAllProductSearch from '../alfacartCategory.reducer';
import {SAVE_CATEGORY, CLEAR_CATEGORY} from '../../actions/index.actions';

describe('Reducer: category', () => {
  it('Should return default state by default', () => {
    expect(listAllProductSearch(undefined, [])).toEqual([]);
  });
  it('Should save alfacart', () => {
    expect(listAllProductSearch('', {type: SAVE_CATEGORY, payload: '123'})).toEqual('123');
  });
  it('Should clear alfacart', () => {
    expect(listAllProductSearch('123', {type: CLEAR_CATEGORY})).toEqual('');
  });
});
