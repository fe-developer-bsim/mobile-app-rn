import wishlistCMI from '../wishlistCMI.reducer';
import {SAVE_WISHLIST_CMI, UPDATE_WISHLIST_CMI, CLEAR_WISHLIST_CMI} from '../../actions/index.actions';

describe('Reducer: wishlistCMI', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(wishlistCMI(undefined, {})).toEqual(initialState);
  });
  it('Should add CMI cart list', () => {
    const nextState = [1, 2, 3];
    const action = {type: SAVE_WISHLIST_CMI, payload: [1, 2, 3]};
    expect(wishlistCMI([1, 2, 3], action)).toEqual(nextState);
  });
  it('Should update CMI cart list', () => {
    const nextState = [1, 2, 3];
    const action = {type: UPDATE_WISHLIST_CMI, payload: [1, 2, 3]};
    expect(wishlistCMI([1, 2, 3], action)).toEqual(nextState);
  });
  it('Should clear CMI list', () => {
    const nextState = [];
    const action = {type: CLEAR_WISHLIST_CMI};
    expect(wishlistCMI([], action)).toEqual(nextState);
  });
});
