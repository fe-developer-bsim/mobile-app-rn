import lastCreditCardTransactions from '../lastCreditCardTransactions.reducer';
import {LAST_CREDIT_CARD_TRANSACTION_UPDATE, CREDIT_CARD_TRANSACTIONS_CLEAR, ALL_CREDIT_CARD_TRANSACTIONS} from '../../actions/index.actions';

describe('Reducer: lastCreditCardTransactions', () => {
  it('Should return default state', () => {
    const nextState =  {allTransactions: [], recentTransactions: []};
    expect(lastCreditCardTransactions(undefined, {})).toEqual(nextState);
  });
  it('Should update credit card transactions', () => {
    const previousState = {'allTransactions': [{'accNo': 111111, 'name': 'wasd'}], 'recentTransactions': [{'accNo': 111111, 'name': 'wasd'}]};
    const payload = {'accNo': 222222, 'name': 'qwerty'};
    const nextState = {'allTransactions': [{'accNo': 111111, 'name': 'wasd'}, {'accNo': 222222, 'name': 'qwerty'}], 'recentTransactions': [{'accNo': 222222, 'name': 'qwerty'}, {'accNo': 111111, 'name': 'wasd'}]};
    const action = {type: LAST_CREDIT_CARD_TRANSACTION_UPDATE, payload};
    expect(lastCreditCardTransactions(previousState, action)).toEqual(nextState);
  });
  it('Should return all credit card transactions', () => {
    const previousState = {'allTransactions': [{'accNo': 111111, 'name': 'wasd'}], 'recentTransactions': [{'accNo': 111111, 'name': 'wasd'}]};
    const payload = [{'accNo': 222222, 'name': 'qwerty'}];
    const nextState = {'allTransactions':
    [{
      'accNo': 222222,
      'name': 'qwerty',
    }],
    'recentTransactions': [{
      'accNo': 222222,
      'name': 'qwerty',
    }],
    };
    const action = {type: ALL_CREDIT_CARD_TRANSACTIONS, payload};
    expect(lastCreditCardTransactions(previousState, action)).toEqual(nextState);
  });
  it('Should clear credit card transactions', () => {
    const nextState =  {allTransactions: [], recentTransactions: []};
    const previousState = {'allTransactions': [{'accNo': 111111, 'name': 'wasd'}], 'recentTransactions': [{'accNo': 111111, 'name': 'wasd'}]};
    const action = {type: CREDIT_CARD_TRANSACTIONS_CLEAR};
    expect(lastCreditCardTransactions(previousState, action)).toEqual(nextState);
  });
});
