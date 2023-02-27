import appInitKeys from '../utmAndRefferalCode.reducer';
import {SAVE_UTM_AND_DATA_LINK, CLEAR_UTM_AND_DATA_LINK} from '../../actions/index.actions';

describe('Reducer: appInitKeys', () => {

  it('Should return default state by default', () => {
    expect(appInitKeys({}, '')).toEqual({});
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_UTM_AND_DATA_LINK,
      payload: 'xx-000'
    };
    const expectedResult = 'xx-000';
    expect(appInitKeys({}, action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_UTM_AND_DATA_LINK
    };
    const expectedResult = {};
    expect(appInitKeys({}, action)).toEqual(expectedResult);
  });

});
