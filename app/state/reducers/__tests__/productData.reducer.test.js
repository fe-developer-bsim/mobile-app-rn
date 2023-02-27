import productData from '../productData.reducer';
import {SAVE_PRODUCT_DATA, CLEAR_PRODUCT_DATA} from '../../actions/index.actions';

describe('Reducer: productData', () => {

  it('Should set productData', () => {
    const action = {
      type: SAVE_PRODUCT_DATA,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(productData([], action)).toEqual(expectedResult);
  });

  it('Should clear productData', () => {
    const action = {
      type: CLEAR_PRODUCT_DATA
    };
    const expectedResult = [];
    expect(productData([], action)).toEqual(expectedResult);
  });

});

