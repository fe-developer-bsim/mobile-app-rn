import paydayLoanData from '../paydayLoanData.reducer';
import {PAYDAY_LOAN_DATA_CONFIG, CLEAR_PAYDAY_LOAN_DATA_CONFIG} from '../../actions/index.actions';

describe('Reducer: paydayLoan', () => {
  it('Should return default state by default', () => {
    const initialState = {};
    expect(paydayLoanData(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {
    };
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_PAYDAY_LOAN_DATA_CONFIG};
    expect(paydayLoanData(previousState, action)).toEqual(initialState);
  });
  it('Should update paydayLoan', () => {
    const previousState = {
    };
    const nextState = {
      test: 'wa'
    };
    const action = {type: PAYDAY_LOAN_DATA_CONFIG, payload: {test: 'wa'}};
    expect(paydayLoanData(previousState, action)).toEqual(nextState);
  });
});
