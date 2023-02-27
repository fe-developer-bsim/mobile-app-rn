import wishlistAlfacart from '../wishlistAlfacart.reducer';
import {SAVE_WISHLIST_ALFACART, UPDATE_WISHLIST_ALFACART, CLEAR_WISHLIST_ALFACART} from '../../actions/index.actions';

describe('Reducer: wishlistAlfacart', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(wishlistAlfacart(undefined, {})).toEqual(initialState);
  });
  it('Should add alfacart cart list', () => {
    const nextState = [1, 2, 3];
    const action = {type: SAVE_WISHLIST_ALFACART, payload: [1, 2, 3]};
    expect(wishlistAlfacart([1, 2, 3], action)).toEqual(nextState);
  });
  it('Should update alfacart cart list', () => {
    const nextState = [1, 2, 3];
    const action = {type: UPDATE_WISHLIST_ALFACART, payload: [1, 2, 3]};
    expect(wishlistAlfacart([1, 2, 3], action)).toEqual(nextState);
  });
  it('Should clear alfacart list', () => {
    const nextState = [];
    const action = {type: CLEAR_WISHLIST_ALFACART};
    expect(wishlistAlfacart([], action)).toEqual(nextState);
  });
});
