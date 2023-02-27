import productCode from '../productCode.reducer';
import {SAVE_PRODUCT_CODE, CLEAR_PRODUCT_CODE} from '../../actions/index.actions';

describe('Reducer: productCode', () => {
  it('Should return default state by default', () => {
    expect(productCode(undefined, '')).toEqual('');
  });
  it('Should save productCode', () => {
    expect(productCode('', {type: SAVE_PRODUCT_CODE, payload: '123'})).toEqual('123');
  });
  it('Should clear productCode', () => {
    expect(productCode('123', {type: CLEAR_PRODUCT_CODE})).toEqual('');
  });
});
