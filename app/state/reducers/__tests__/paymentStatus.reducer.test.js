import paymentStatus from '../paymentStatus.reducer';
import {UPDATE_PAYMENT_STATUS, CLEAR_PAYMENT_STATUS} from '../../actions/index.actions';

describe('Reducer: paymentStatus', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(paymentStatus(undefined, {})).toEqual(initialState);
  });
  it('Should update paymentStatus', () => {
    const nextState = {1: 1, 2: 2, 3: 3};
    const action = {type: UPDATE_PAYMENT_STATUS, payload: {1: 1, 2: 2, 3: 3}};
    expect(paymentStatus({1: 1, 2: 2, 3: 3}, action)).toEqual(nextState);
  });
  it('Should clear paymentStatus', () => {
    const nextState = {};
    const action = {type: CLEAR_PAYMENT_STATUS};
    expect(paymentStatus({}, action)).toEqual(nextState);
  });
});
