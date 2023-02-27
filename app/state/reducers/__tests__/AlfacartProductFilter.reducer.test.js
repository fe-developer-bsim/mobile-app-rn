import allProductMerchant from '../AlfacartProductFilter.reducer';
import {SAVE_ALL_PRODUCT_FILTER_ALFA, CLEAR_ALL_PRODUCT_FILTER_ALFA} from '../../actions/index.actions';

describe('Reducer: allProductMerchant', () => {
  it('Should return default state by default', () => {
    expect(allProductMerchant(undefined, [])).toEqual([]);
  });
  it('Should save alfacart', () => {
    expect(allProductMerchant('', {type: SAVE_ALL_PRODUCT_FILTER_ALFA, payload: '123'})).toEqual('123');
  });
  it('Should clear alfacart', () => {
    expect(allProductMerchant('123', {type: CLEAR_ALL_PRODUCT_FILTER_ALFA})).toEqual('');
  });
});
