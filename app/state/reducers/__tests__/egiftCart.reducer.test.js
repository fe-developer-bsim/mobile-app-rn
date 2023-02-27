import egiftCart from '../egiftCart.reducer';
import {ADD_EGIFT_CART, UPDATE_EGIFT_CART, CLEAR_EGIFT_CART} from '../../actions/index.actions';

describe('Reducer: egiftCart', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(egiftCart(undefined, {})).toEqual(initialState);
  });
  it('Should add egift cart list', () => {
    const nextState = [1, 2, 3, 1, 2, 3];
    const action = {type: ADD_EGIFT_CART, payload: [1, 2, 3]};
    expect(egiftCart([1, 2, 3], action)).toEqual(nextState);
  });
  it('Should update egift cart list', () => {
    const nextState = [1, 2, 3];
    const action = {type: UPDATE_EGIFT_CART, payload: [1, 2, 3]};
    expect(egiftCart([1, 2, 3], action)).toEqual(nextState);
  });
  it('Should clear egift list', () => {
    const nextState = [];
    const action = {type: CLEAR_EGIFT_CART};
    expect(egiftCart([], action)).toEqual(nextState);
  });
});
