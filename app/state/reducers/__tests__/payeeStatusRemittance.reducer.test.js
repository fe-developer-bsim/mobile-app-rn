import payeeStatusRemittance from '../payeeStatusRemittance.reducer';
import {SAVE_PAYEE_STATUS_REMITTANCE, CLEAR_PAYEE_STATUS_REMITTANCE} from '../../actions/index.actions';

describe('Reducer: payeeStatusRemittance', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_PAYEE_STATUS_REMITTANCE,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(payeeStatusRemittance([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_PAYEE_STATUS_REMITTANCE
    };
    const expectedResult = {};
    expect(payeeStatusRemittance([], action)).toEqual(expectedResult);
  });

});

