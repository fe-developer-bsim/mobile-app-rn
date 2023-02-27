import maritalStatus from '../maritalStatus.reducer';
import {SAVE_MARITAL_STATUS, CLEAR_MARITAL_STATUS} from '../../actions/index.actions';

describe('Reducer: maritalStatus', () => {

  it('Should return default state by default', () => {
    expect(maritalStatus([], {})).toEqual([]);
  });

  it('Should clear payee data', () => {
    const action = {
      type: CLEAR_MARITAL_STATUS
    };
    const expectedResult = [];
    expect(maritalStatus([], action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: SAVE_MARITAL_STATUS,
      payload: [{
        accountNumber: '123'
      }]
    };
    const expectedResult = [{
      accountNumber: '123'
    }];
    expect(maritalStatus([], action)).toEqual(expectedResult);
  });
});
