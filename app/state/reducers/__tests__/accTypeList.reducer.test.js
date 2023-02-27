import appInitKeys from '../accTypeList.reducer';
import {SAVE_ACC_TYPE, CLEAR_ACC_TYPE} from '../../actions/index.actions';

describe('Reducer: appInitKeys', () => {

  it('Should return default state by default', () => {
    expect(appInitKeys({}, '')).toEqual({});
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_ACC_TYPE,
      payload: 'xx-000'
    };
    const expectedResult = 'xx-000';
    expect(appInitKeys({}, action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_ACC_TYPE
    };
    const expectedResult = {};
    expect(appInitKeys({}, action)).toEqual(expectedResult);
  });

});
