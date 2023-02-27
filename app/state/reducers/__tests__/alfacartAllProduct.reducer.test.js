import listAllProduct from '../alfacartAllProduct.reducer';
import {SAVE_ALL_PRODUCT, CLEAR_ALL_PRODUCT} from '../../actions/index.actions';

describe('Reducer: listAllProduct', () => {
  it('Should return default state by default', () => {
    expect(listAllProduct(undefined, [])).toEqual([]);
  });
  it('Should save alfacart', () => {
    expect(listAllProduct('', {type: SAVE_ALL_PRODUCT, payload: '123'})).toEqual('123');
  });
  it('Should clear alfacart', () => {
    expect(listAllProduct('123', {type: CLEAR_ALL_PRODUCT})).toEqual('');
  });
});
