import egiftCart from '../merchantCartProduct.reducer';
import {ADD_PRODUCT_MERCHANT_CART, UPDATE_PRODUCT_MERCHANT_CART, CLEAR_PRODUCT_MERCHANT_CART} from '../../actions/index.actions';

describe('Reducer: egiftCart', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(egiftCart(undefined, {})).toEqual(initialState);
  });
  it('Should add egift cart list', () => {
    const nextState = [1, 2, 3, 1, 2, 3];
    const action = {type: ADD_PRODUCT_MERCHANT_CART, payload: [1, 2, 3]};
    expect(egiftCart([1, 2, 3], action)).toEqual(nextState);
  });
  it('Should update egift cart list', () => {
    const nextState = [1, 2, 3];
    const action = {type: UPDATE_PRODUCT_MERCHANT_CART, payload: [1, 2, 3]};
    expect(egiftCart([1, 2, 3], action)).toEqual(nextState);
  });
  it('Should clear egift list', () => {
    const nextState = [];
    const action = {type: CLEAR_PRODUCT_MERCHANT_CART};
    expect(egiftCart([], action)).toEqual(nextState);
  });
});
