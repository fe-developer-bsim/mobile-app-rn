import payeeStatus from '../payeeStatus.reducer';
import {SAVE_PAYEE_STATUS, CLEAR_PAYEE_STATUS} from '../../actions/index.actions';

describe('Reducer: flight Data', () => {

  it('Should return default state by default', () => {
    expect(payeeStatus({}, {})).toEqual({});
  });

  it('Should clear flight data', () => {
    const action = {
      type: CLEAR_PAYEE_STATUS
    };
    const expectedResult = {};
    expect(payeeStatus({}, action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: SAVE_PAYEE_STATUS,
      payload: {
        passenger: '123'
      }
    };
    const expectedResult = {
      passenger: '123'
    };
    expect(payeeStatus({}, action)).toEqual(expectedResult);
  });
});
