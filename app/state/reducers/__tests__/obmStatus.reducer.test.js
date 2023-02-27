import ipAddress from '../obmStatus.reducer';
import {SAVE_OBM_STATUS, CLEAR_OBM_STATUS} from '../../actions/index.actions';

describe('Reducer: referralCode', () => {

  it('Should return default state by default', () => {
    expect(ipAddress('', '')).toEqual('');
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_OBM_STATUS,
      payload: true
    };
    const expectedResult = true;
    expect(ipAddress('', action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_OBM_STATUS
    };
    const expectedResult = false;
    expect(ipAddress('', action)).toEqual(expectedResult);
  });

});
