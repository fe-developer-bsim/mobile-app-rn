import categoryAlfacart from '../categoryAlfacart.reducer';
import {SAVE_CATEGORY_ALFACART, UPDATE_CATEGORY_ALFACART, CLEAR_CATEGORY_ALFACART} from '../../actions/index.actions';

describe('Reducer: categoryAlfacart', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(categoryAlfacart(undefined, {})).toEqual(initialState);
  });
  it('Should add alfacart list', () => {
    const nextState = [1, 2, 3];
    const action = {type: SAVE_CATEGORY_ALFACART, payload: [1, 2, 3]};
    expect(categoryAlfacart([1, 2, 3], action)).toEqual(nextState);
  });
  it('Should update alfacart list', () => {
    const nextState = [1, 2, 3];
    const action = {type: UPDATE_CATEGORY_ALFACART, payload: [1, 2, 3]};
    expect(categoryAlfacart([1, 2, 3], action)).toEqual(nextState);
  });
  it('Should clear alfacart list', () => {
    const nextState = [];
    const action = {type: CLEAR_CATEGORY_ALFACART};
    expect(categoryAlfacart([], action)).toEqual(nextState);
  });
});
