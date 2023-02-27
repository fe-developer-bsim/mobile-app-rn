import addProxyAddress from '../addProxyAddress.reducer';
import {SAVE_ADD_PROXY_ADDRESS, CLEAR_ADD_PROXY_ADDRESS} from '../../actions/index.actions';

describe('Reducer: user', () => {

  it('Should return default state by default', () => {
    expect(addProxyAddress([], '')).toEqual([]);
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_ADD_PROXY_ADDRESS,
      payload: []
    };
    const expectedResult = [];
    expect(addProxyAddress([], action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_ADD_PROXY_ADDRESS
    };
    const expectedResult = [];
    expect(addProxyAddress([], action)).toEqual(expectedResult);
  });
});
