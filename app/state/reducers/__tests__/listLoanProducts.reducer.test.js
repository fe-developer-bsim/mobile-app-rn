import listLoanProducts from '../listLoanProducts.reducer';
import {SAVE_LOAN_PRODUCT, CLEAR_LOAN_PRODUCT} from '../../actions/index.actions';

describe('Reducer: loan accounts', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(listLoanProducts(undefined, {})).toEqual(initialState);
  });
  it('Should update loan accounts', () => {
    const previousState = [];
    const nextState = [{'test': '1234'}];
    const action = {type: SAVE_LOAN_PRODUCT, payload: [{'test': '1234'}]};
    expect(listLoanProducts(previousState, action)).toEqual(nextState);
  });
  it('Should clear loan accounts', () => {
    const previousState = [{'test': '1234'}];
    const nextState = [];
    const action = {type: CLEAR_LOAN_PRODUCT, payload: {}};
    expect(listLoanProducts(previousState, action)).toEqual(nextState);
  });
});
