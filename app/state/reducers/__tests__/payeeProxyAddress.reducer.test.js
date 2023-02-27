import payeeProxyAddress from '../payeeProxyAddress.reducer';
import {PAYEE_UPDATE_PAYEE_PROXY_ADDRESS_LIST, PAYEE_PROXY_ADDRESS_LIST_CLEAR} from '../../actions/index.actions';

describe('Reducer: payeeProxyAddress', () => {

  it('Should return default state by default', () => {
    expect(payeeProxyAddress([], {})).toEqual([]);
  });

  it('Should clear payeeProxyAddress data', () => {
    const action = {
      type: PAYEE_PROXY_ADDRESS_LIST_CLEAR
    };
    const expectedResult = [];
    expect(payeeProxyAddress([], action)).toEqual(expectedResult);
  });

  it('Should set payeeProxyAddress data', () => {
    const action = {
      type: PAYEE_UPDATE_PAYEE_PROXY_ADDRESS_LIST,
      payload: [{
        accountNumber: '123'
      }]
    };
    const expectedResult = [{
      accountNumber: '123'
    }];
    expect(payeeProxyAddress([], action)).toEqual(expectedResult);
  });
});
