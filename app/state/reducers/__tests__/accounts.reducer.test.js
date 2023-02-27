import accounts from '../accounts.reducer';
import {ACCOUNTS_UPDATE_BALANCES, ACCOUNTS_SET_ACCOUNTS, ACCOUNTS_UPDATE_BALANCE_EMONEY} from '../../actions/index.actions';

describe('Reducer: accounts', () => {

  it('Should return default state by default', () => {
    expect(accounts([], {})).toEqual([]);
  });

  it('Should set accounts data', () => {
    const action = {
      type: ACCOUNTS_SET_ACCOUNTS,
      payload: [{
        accountNumber: '123'
      }]
    };
    const expectedResult = [{
      accountNumber: '123'
    }];
    expect(accounts([], action)).toEqual(expectedResult);
  });

  it('Should update accounts data', () => {
    const action = {
      type: ACCOUNTS_UPDATE_BALANCE_EMONEY,
      payload: [{
        accountNumber: '123'
      }]
    };
    const expectedResult = [{balances: [{accountNumber: '123'}]}];
    expect(accounts([], action)).toEqual(expectedResult);
  });

  it('Should update accounts with new balances', () => {
    const action = {
      type: ACCOUNTS_UPDATE_BALANCES,
      payload:
      [{
        accountNumber: '123',
        availableBalance: '100000'
      }, {
        accountNumber: '234',
        availableBalance: '7000'
      }]
    };
    const state = [{
      accountNumber: '123'
    }, {
      accountNumber: '234'
    }];
    const expectedResult = [{
      accountNumber: '123',
      balances: {
        accountNumber: '123',
        availableBalance: '100000'
      }
    }, {
      accountNumber: '234',
      balances: {
        accountNumber: '234',
        availableBalance: '7000'
      }
    }];
    expect(accounts(state, action)).toEqual(expectedResult);
  });
});
