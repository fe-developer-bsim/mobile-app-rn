import payeesRemittance from '../payeesRemittance.reducer';
import {PAYEE_UPDATE_PAYEE_REMITTANCE_LIST, PAYEE_REMITTANCE_LIST_CLEAR} from '../../actions/index.actions';

describe('Reducer: payeesRemittance', () => {

  it('Should return default state by default', () => {
    expect(payeesRemittance([], {})).toEqual([]);
  });

  it('Should clear payee data', () => {
    const action = {
      type: PAYEE_REMITTANCE_LIST_CLEAR
    };
    const expectedResult = [];
    expect(payeesRemittance([], action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: PAYEE_UPDATE_PAYEE_REMITTANCE_LIST,
      payload: [{
        accountNumber: '123'
      }]
    };
    const expectedResult = [{
      accountNumber: '123'
    }];
    expect(payeesRemittance([], action)).toEqual(expectedResult);
  });
});
