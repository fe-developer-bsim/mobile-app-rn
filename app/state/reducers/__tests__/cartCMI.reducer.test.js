import cartCMI from '../cartCMI.reducer';
import {SAVE_CART_CMI, UPDATE_CART_CMI, CLEAR_CART_CMI} from '../../actions/index.actions';

describe('Reducer: cartCMI', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(cartCMI(undefined, {})).toEqual(initialState);
  });
  it('Should add CMI cart list', () => {
    const nextState = [1, 2, 3];
    const action = {type: SAVE_CART_CMI, payload: [1, 2, 3]};
    expect(cartCMI([1, 2, 3], action)).toEqual(nextState);
  });
  it('Should update CMI cart list', () => {
    const nextState = [1, 2, 3];
    const action = {type: UPDATE_CART_CMI, payload: [1, 2, 3]};
    expect(cartCMI([1, 2, 3], action)).toEqual(nextState);
  });
  it('Should clear CMI list', () => {
    const nextState = [];
    const action = {type: CLEAR_CART_CMI};
    expect(cartCMI([], action)).toEqual(nextState);
  });
});
