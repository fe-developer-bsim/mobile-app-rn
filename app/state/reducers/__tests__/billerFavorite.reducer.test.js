import appInitKeys from '../autoDebitList.reducer';
import {SAVE_DATA_AUTODEBIT, CLEAR_DATA_AUTODEBIT} from '../../actions/index.actions';

describe('Reducer: appInitKeys', () => {

  it('Should return default state by default', () => {
    expect(appInitKeys({}, '')).toEqual({});
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_DATA_AUTODEBIT,
      payload: 'xx-000'
    };
    const expectedResult = 'xx-000';
    expect(appInitKeys({}, action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_DATA_AUTODEBIT
    };
    const expectedResult = {};
    expect(appInitKeys({}, action)).toEqual(expectedResult);
  });

});
