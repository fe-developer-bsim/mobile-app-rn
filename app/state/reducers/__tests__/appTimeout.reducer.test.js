import appTimeout from '../appTimeout.reducer';
import {SET_APP_TIMEOUT, CLEAR_APP_TIMEOUT} from '../../actions/index.actions';

describe('Reducer: appTimeout', () => {

  it('Should return default state by default', () => {
    expect(appTimeout('', '')).toEqual('');
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SET_APP_TIMEOUT,
      payload: '600'
    };
    const expectedResult = '600';
    expect(appTimeout('', action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_APP_TIMEOUT
    };
    const expectedResult = 300;
    expect(appTimeout('', action)).toEqual(expectedResult);
  });

});
