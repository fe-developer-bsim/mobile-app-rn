import ipAddress from '../obmPin.reducer';
import {SAVE_PIN_OBM, CLEAR_PIN_OBM} from '../../actions/index.actions';

describe('Reducer: referralCode', () => {

  it('Should return default state by default', () => {
    expect(ipAddress('', '')).toEqual('');
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_PIN_OBM,
      payload: 'xx-000'
    };
    const expectedResult = 'xx-000';
    expect(ipAddress('', action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_PIN_OBM
    };
    const expectedResult = '';
    expect(ipAddress('', action)).toEqual(expectedResult);
  });

});
