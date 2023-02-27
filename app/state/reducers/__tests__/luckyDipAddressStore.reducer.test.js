import appInitKeys from '../luckyDipAddressStore.reducer';
import {SAVE_LUCKY_DIP_ADDRESS, CLEAR_LUCKY_DIP_ADDRESS} from '../../actions/index.actions';

describe('Reducer: appInitKeys', () => {

  it('Should return default state by default', () => {
    expect(appInitKeys({}, '')).toEqual({});
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_LUCKY_DIP_ADDRESS,
      payload: {test: 'xx-000'}
    };
    const expectedResult = {test: 'xx-000'};
    expect(appInitKeys({}, action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_LUCKY_DIP_ADDRESS
    };
    const expectedResult = {};
    expect(appInitKeys({}, action)).toEqual(expectedResult);
  });

});
