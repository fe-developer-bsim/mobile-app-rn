import cartAlfacart from '../cartAlfacart.reducer';
import {SAVE_CART_ALFACART, UPDATE_CART_ALFACART, CLEAR_CART_ALFACART} from '../../actions/index.actions';

describe('Reducer: cartAlfacart', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(cartAlfacart(undefined, {})).toEqual(initialState);
  });
  it('Should add alfacart cart list', () => {
    const nextState = [1, 2, 3];
    const action = {type: SAVE_CART_ALFACART, payload: [1, 2, 3]};
    expect(cartAlfacart([1, 2, 3], action)).toEqual(nextState);
  });
  it('Should update alfacart cart list', () => {
    const nextState = [1, 2, 3];
    const action = {type: UPDATE_CART_ALFACART, payload: [1, 2, 3]};
    expect(cartAlfacart([1, 2, 3], action)).toEqual(nextState);
  });
  it('Should clear alfacart list', () => {
    const nextState = [];
    const action = {type: CLEAR_CART_ALFACART};
    expect(cartAlfacart([], action)).toEqual(nextState);
  });
});
