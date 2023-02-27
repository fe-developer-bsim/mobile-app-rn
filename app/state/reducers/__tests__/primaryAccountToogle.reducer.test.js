import showSpinner from '../primaryAccountToogle.reducer';
import {SAVE_PRIMARY_ACCOUNT, RESET_PRIMARY_ACCOUNT} from '../../actions/index.actions';

describe('Reducer: dirtyMiniStatement', () => {

  it('Should return default state by default', () => {
    expect(showSpinner(false, '')).toEqual(false);
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_PRIMARY_ACCOUNT,
      payload: ''
    };
    const expectedResult = true;
    expect(showSpinner('', action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: RESET_PRIMARY_ACCOUNT
    };
    const expectedResult = false;
    expect(showSpinner('', action)).toEqual(expectedResult);
  });

});
