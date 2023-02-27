import tutorialProduct from '../tutorialProduct.reducer';
import {SAVE_TUTORIAL_PRODUCT, CLEAR_TUTORIAL_PRODUCT} from '../../actions/index.actions';

describe('Reducer: tutorialProduct', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_TUTORIAL_PRODUCT,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(tutorialProduct([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_TUTORIAL_PRODUCT
    };
    const expectedResult = {};
    expect(tutorialProduct([], action)).toEqual(expectedResult);
  });

});

