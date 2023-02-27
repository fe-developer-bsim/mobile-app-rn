import getProductListSil from '../getProductListSil.reducer';
import {SAVE_PRODUCT_LIST, CLEAR_PRODUCT_LIST} from '../../actions/index.actions';

describe('Reducer: loan accounts', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(getProductListSil(undefined, {})).toEqual(initialState);
  });
  it('Should update loan accounts', () => {
    const previousState = [];
    const nextState = [{'test': '1234'}];
    const action = {type: SAVE_PRODUCT_LIST, payload: [{'test': '1234'}]};
    expect(getProductListSil(previousState, action)).toEqual(nextState);
  });
  it('Should clear loan accounts', () => {
    const previousState = [{'test': '1234'}];
    const nextState = [];
    const action = {type: CLEAR_PRODUCT_LIST, payload: {}};
    expect(getProductListSil(previousState, action)).toEqual(nextState);
  });
});
