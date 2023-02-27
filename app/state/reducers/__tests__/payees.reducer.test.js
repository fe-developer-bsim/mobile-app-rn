import payees from '../payees.reducer';
import {PAYEE_UPDATE_PAYEE_LIST, PAYEE_LIST_CLEAR} from '../../actions/index.actions';

describe('Reducer: payees', () => {

  it('Should return default state by default', () => {
    expect(payees([], {})).toEqual([]);
  });

  it('Should clear payee data', () => {
    const action = {
      type: PAYEE_LIST_CLEAR
    };
    const expectedResult = [];
    expect(payees([], action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: PAYEE_UPDATE_PAYEE_LIST,
      payload: [{
        accountNumber: '123'
      }]
    };
    const expectedResult = [{
      accountNumber: '123'
    }];
    expect(payees([], action)).toEqual(expectedResult);
  });
});
