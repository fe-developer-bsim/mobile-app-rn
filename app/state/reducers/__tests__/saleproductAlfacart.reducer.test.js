import saleproductAlfacart from '../saleproductAlfacart.reducer';
import {SAVE_SALEPRODUCT_ALFACART, UPDATE_SALEPRODUCT_ALFACART, CLEAR_SALEPRODUCT_ALFACART} from '../../actions/index.actions';

describe('Reducer: saleproductAlfacart', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(saleproductAlfacart(undefined, {})).toEqual(initialState);
  });
  it('Should add alfacart list', () => {
    const nextState = [1, 2, 3];
    const action = {type: SAVE_SALEPRODUCT_ALFACART, payload: [1, 2, 3]};
    expect(saleproductAlfacart([1, 2, 3], action)).toEqual(nextState);
  });
  it('Should update alfacart list', () => {
    const nextState = [1, 2, 3];
    const action = {type: UPDATE_SALEPRODUCT_ALFACART, payload: [1, 2, 3]};
    expect(saleproductAlfacart([1, 2, 3], action)).toEqual(nextState);
  });
  it('Should clear alfacart list', () => {
    const nextState = [];
    const action = {type: CLEAR_SALEPRODUCT_ALFACART};
    expect(saleproductAlfacart([], action)).toEqual(nextState);
  });
});
