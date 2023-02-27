import appInitKeys from '../appInitKeys.reducer';
import {APP_INIT_KEYS_SAVE, APP_INIT_KEYS_CLEAR} from '../../actions/index.actions';

describe('Reducer: appInitKeys', () => {

  it('Should return default state by default', () => {
    expect(appInitKeys({}, '')).toEqual({});
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: APP_INIT_KEYS_SAVE,
      payload: 'xx-000'
    };
    const expectedResult = 'xx-000';
    expect(appInitKeys({}, action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: APP_INIT_KEYS_CLEAR
    };
    const expectedResult = {};
    expect(appInitKeys({}, action)).toEqual(expectedResult);
  });

});
