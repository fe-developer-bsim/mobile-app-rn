import detailProduct from '../alfacartDetailProduct.reducer';
import {SAVE_DETAIL_PRODUCT, CLEAR_DETAIL_PRODUCT} from '../../actions/index.actions';

describe('Reducer: detailProduct', () => {
  it('Should return default state by default', () => {
    expect(detailProduct(undefined, [])).toEqual([]);
  });
  it('Should save alfacart', () => {
    expect(detailProduct('', {type: SAVE_DETAIL_PRODUCT, payload: '123'})).toEqual('123');
  });
  it('Should clear alfacart', () => {
    expect(detailProduct('123', {type: CLEAR_DETAIL_PRODUCT})).toEqual('');
  });
});
