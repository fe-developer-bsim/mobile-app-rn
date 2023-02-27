import checkStatusInvoice from '../checkStatusInvoice.reducer';
import {SAVE_TICK, CLEAR_TICK} from '../../actions/index.actions';

describe('Reducer: referralCode', () => {

  it('Should return default state by default', () => {
    expect(checkStatusInvoice('', '')).toEqual('');
  });

  it('Should set transaction', () => {
    const action = {
      type: SAVE_TICK,
      payload: {'checkStatusInvoice': 'asdf'},
    };
    const expectedResult = {'checkStatusInvoice': 'asdf'};
    expect(checkStatusInvoice('', action)).toEqual(expectedResult);
  });

  it('Should reset transaction', () => {
    const action = {
      type: CLEAR_TICK
    };
    const expectedResult = {};
    expect(checkStatusInvoice({}, action)).toEqual(expectedResult);
  });

});
