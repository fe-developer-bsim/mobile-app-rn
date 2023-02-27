import loanAccounts from '../loanAccounts.reducer';
import {SAVE_LOAN_ACCOUNT, CLEAR_LOAN_ACCOUNT} from '../../actions/index.actions';

describe('Reducer: loan accounts', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(loanAccounts(undefined, {})).toEqual(initialState);
  });
  it('Should update loan accounts', () => {
    const previousState = [];
    const nextState = [{'test': '1234'}];
    const action = {type: SAVE_LOAN_ACCOUNT, payload: [{'test': '1234'}]};
    expect(loanAccounts(previousState, action)).toEqual(nextState);
  });
  it('Should clear loan accounts', () => {
    const previousState = [{'test': '1234'}];
    const nextState = [];
    const action = {type: CLEAR_LOAN_ACCOUNT, payload: {}};
    expect(loanAccounts(previousState, action)).toEqual(nextState);
  });
});
