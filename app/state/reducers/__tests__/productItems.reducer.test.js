import productItems from '../productItems.reducer';
import {SAVE_PRODUCTS_ITEMS, CLEAR_PRODUCTS_ITEMS} from '../../actions/index.actions';

describe('Reducer: productItems', () => {

  it('Should return default state by default', () => {
    expect(productItems([], {})).toEqual([]);
  });

  it('Should clear user data', () => {
    const action = {
      type: CLEAR_PRODUCTS_ITEMS,
      payload: [{
        accountNumber: '123'
      }]
    };
    const expectedResult = {};
    expect(productItems([], action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: SAVE_PRODUCTS_ITEMS,
      payload: [{
        accountNumber: '123'
      }]
    };
    const expectedResult = [{
      accountNumber: '123'
    }];
    expect(productItems([], action)).toEqual(expectedResult);
  });
});
