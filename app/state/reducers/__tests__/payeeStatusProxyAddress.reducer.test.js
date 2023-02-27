import payeeStatusProxyAddress from '../payeeStatusProxyAddress.reducer';
import {SAVE_PAYEE_STATUS_PROXY_ADDRESS, CLEAR_PAYEE_STATUS_PROXY_ADDRESS} from '../../actions/index.actions';

describe('Reducer: flight Data', () => {

  it('Should return default state by default', () => {
    expect(payeeStatusProxyAddress({}, {})).toEqual({});
  });

  it('Should clear flight data', () => {
    const action = {
      type: CLEAR_PAYEE_STATUS_PROXY_ADDRESS
    };
    const expectedResult = {};
    expect(payeeStatusProxyAddress({}, action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: SAVE_PAYEE_STATUS_PROXY_ADDRESS,
      payload: {
        passenger: '123'
      }
    };
    const expectedResult = {
      passenger: '123'
    };
    expect(payeeStatusProxyAddress({}, action)).toEqual(expectedResult);
  });
});
