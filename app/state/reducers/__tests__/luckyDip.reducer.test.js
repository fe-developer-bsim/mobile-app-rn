import appInitKeys from '../luckyDip.reducer';
import {SAVE_LUCKY_DIP, CLEAR_LUCKY_DIP} from '../../actions/index.actions';

describe('Reducer: appInitKeys', () => {

  it('Should return default state by default', () => {
    expect(appInitKeys({}, '')).toEqual({});
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_LUCKY_DIP,
      payload: {test: '111'}
    };
    const expectedResult = {test: '111'};
    expect(appInitKeys({}, action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_LUCKY_DIP
    };
    const expectedResult = {};
    expect(appInitKeys({}, action)).toEqual(expectedResult);
  });

});
