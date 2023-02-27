import listSavingProducts from '../listSavingProducts.reducer';
import {SAVE_SAVING_PRODUCT, CLEAR_SAVING_PRODUCT} from '../../actions/index.actions';

describe('Reducer: listSavingProducts', () => {

  it('Should return default state by default', () => {
    expect(listSavingProducts([], {})).toEqual([]);
  });

  it('Should clear list saving product', () => {
    const action = {
      type: CLEAR_SAVING_PRODUCT
    };
    const expectedResult = [];
    expect(listSavingProducts([], action)).toEqual(expectedResult);
  });

  it('Should set list saving products', () => {
    const action = {
      type: SAVE_SAVING_PRODUCT,
      payload: [{
        productName: '123'
      }]
    };
    const expectedResult = [{
      productName: '123'
    }];
    expect(listSavingProducts([], action)).toEqual(expectedResult);
  });
});
