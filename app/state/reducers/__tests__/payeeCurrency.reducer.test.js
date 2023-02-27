import payeeCurrency from '../payeeCurrency.reducer';
import {SAVE_PAYEE, CLEAR_PAYEE} from '../../actions/index.actions';

describe('Reducer: user', () => {

  it('Should return default state by default', () => {
    expect(payeeCurrency([], '')).toEqual([]);
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_PAYEE,
      payload: []
    };
    const expectedResult = [];
    expect(payeeCurrency([], action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_PAYEE
    };
    const expectedResult = [];
    expect(payeeCurrency([], action)).toEqual(expectedResult);
  });
});
