import allproductAlfacart from '../allproductAlfacart.reducer';
import {SAVE_ALLPRODUCT_ALFACART, UPDATE_ALLPRODUCT_ALFACART, CLEAR_ALLPRODUCT_ALFACART} from '../../actions/index.actions';

describe('Reducer: allproductAlfacart', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(allproductAlfacart(undefined, {})).toEqual(initialState);
  });
  it('Should add alfacart cart list', () => {
    const nextState = [1, 2, 3];
    const action = {type: SAVE_ALLPRODUCT_ALFACART, payload: [1, 2, 3]};
    expect(allproductAlfacart([1, 2, 3], action)).toEqual(nextState);
  });
  it('Should update alfacart cart list', () => {
    const nextState = [1, 2, 3];
    const action = {type: UPDATE_ALLPRODUCT_ALFACART, payload: [1, 2, 3]};
    expect(allproductAlfacart([1, 2, 3], action)).toEqual(nextState);
  });
  it('Should clear alfacart list', () => {
    const nextState = [];
    const action = {type: CLEAR_ALLPRODUCT_ALFACART};
    expect(allproductAlfacart([], action)).toEqual(nextState);
  });
});
