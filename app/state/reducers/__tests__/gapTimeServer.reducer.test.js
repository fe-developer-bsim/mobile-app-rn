import gapTimeServer from '../gapTimeServer.reducer';
import {SET_GAP_TIME_SERVER, CLEAR_GAP_TIME_SERVER} from '../../actions/index.actions';

describe('Reducer: gapTimeServer', () => {

  it('Should return default state by default', () => {
    expect(gapTimeServer('', '')).toEqual('');
  });

  it('Should set gap time', () => {
    const action = {
      type: SET_GAP_TIME_SERVER,
      payload: '600'
    };
    const expectedResult = '600';
    expect(gapTimeServer('', action)).toEqual(expectedResult);
  });

  it('Should reset gap time', () => {
    const action = {
      type: CLEAR_GAP_TIME_SERVER
    };
    const expectedResult = 0;
    expect(gapTimeServer('', action)).toEqual(expectedResult);
  });

});
