import productItemsSimasValas from '../productItemsSimasValas.reducer';
import {SAVE_PRODUCTS_ITEMS_SIMAS_VALAS, CLEAR_PRODUCTS_ITEMS_SIMAS_VALAS} from '../../actions/index.actions';

describe('Reducer: productItemsSimasValas', () => {

  it('Should return default state by default', () => {
    expect(productItemsSimasValas([], {})).toEqual([]);
  });

  it('Should clear user data', () => {
    const action = {
      type: CLEAR_PRODUCTS_ITEMS_SIMAS_VALAS,
      payload: [{
        accountNumber: '123'
      }]
    };
    const expectedResult = {};
    expect(productItemsSimasValas([], action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: SAVE_PRODUCTS_ITEMS_SIMAS_VALAS,
      payload: [{
        accountNumber: '123'
      }]
    };
    const expectedResult = [{
      accountNumber: '123'
    }];
    expect(productItemsSimasValas([], action)).toEqual(expectedResult);
  });
});
