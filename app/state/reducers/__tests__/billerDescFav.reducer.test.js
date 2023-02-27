import appInitKeys from '../billerDescFav.reducer';
import {SAVE_BILLER_FAV, CLEAR_BILLER_FAV} from '../../actions/index.actions';

describe('Reducer: appInitKeys', () => {

  it('Should return default state by default', () => {
    expect(appInitKeys({}, '')).toEqual({});
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_BILLER_FAV,
      payload: 'xx-000'
    };
    const expectedResult = 'xx-000';
    expect(appInitKeys({}, action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_BILLER_FAV
    };
    const expectedResult = {};
    expect(appInitKeys({}, action)).toEqual(expectedResult);
  });

});
