import paydayLoan from '../paydayLoan.reducer';
import {PAYDAY_LOAN_CONFIG, CLEAR_PAYDAY_LOAN_CONFIG} from '../../actions/index.actions';

describe('Reducer: paydayLoan', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(paydayLoan(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_PAYDAY_LOAN_CONFIG};
    expect(paydayLoan(previousState, action)).toEqual(initialState);
  });
  it('Should update paydayLoan', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: PAYDAY_LOAN_CONFIG, payload: {test: 'wa'}};
    expect(paydayLoan(previousState, action)).toEqual(nextState);
  });
});
