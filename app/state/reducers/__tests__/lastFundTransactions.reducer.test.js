import lastFundTransactions from '../lastFundTransactions.reducer';
import {LAST_FUND_TRANSACTION_UPDATE, FUND_TRANSACTION_CLEAR, ALL_PAYEES} from '../../actions/index.actions';

describe('Reducer: lastFundTransactions', () => {
  it('Should update fund transfer', () => {
    const previousState = {'allTransactions': [{'someKey': 1232, 'accountNumber': '13'}], 'recentTransactions': [{'someKey': 1232, 'accountNumber': '13'}]};
    const payload = {accountNumber: '43', someKey: 4562};
    const nextState = {'allTransactions': [{'someKey': 1232, 'accountNumber': '13'}, {'someKey': 4562, 'accountNumber': '43'}], 'recentTransactions': [{'someKey': 4562, 'accountNumber': '43'}, {'someKey': 1232, 'accountNumber': '13'}]};
    const action = {type: LAST_FUND_TRANSACTION_UPDATE, payload};
    expect(lastFundTransactions(previousState, action)).toEqual(nextState);
  });
  it('Should return default state by default', () => {
    const initialState =  {allTransactions: [], recentTransactions: []};
    expect(lastFundTransactions(undefined, {})).toEqual(initialState);
  });
  it('Should return all payees', () => {
    const previousState = {'allTransactions': [], 'recentTransactions': []};
    const nextState = {'allTransactions': [], 'recentTransactions': []};
    const action = {type: ALL_PAYEES, payload: []};
    expect(lastFundTransactions(previousState, action)).toEqual(nextState);
  });
  it('Should clear fund transfer', () => {
    const previousState = {'allTransactions': [{'someKey': 1232, 'accountNumber': '13'}], 'recentTransactions': [{'someKey': 1232, 'accountNumber': '13'}]};
    const nextState = {allTransactions: [], recentTransactions: []};
    const action = {type: FUND_TRANSACTION_CLEAR};
    expect(lastFundTransactions(previousState, action)).toEqual(nextState);
  });
});
