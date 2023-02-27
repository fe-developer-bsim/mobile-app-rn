import ipAddress from '../ipAddress.reducer';
import {SAVE_IP_ADDRESS, CLEAR_IP_ADDRESS} from '../../actions/index.actions';

describe('Reducer: referralCode', () => {

  it('Should return default state by default', () => {
    expect(ipAddress('', '')).toEqual('');
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_IP_ADDRESS,
      payload: 'xx-000'
    };
    const expectedResult = 'xx-000';
    expect(ipAddress('', action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_IP_ADDRESS
    };
    const expectedResult = '';
    expect(ipAddress('', action)).toEqual(expectedResult);
  });

});
