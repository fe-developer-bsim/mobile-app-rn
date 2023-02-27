import showSpinner from '../checkCifbeforeLogin.reducer';
import {CHECK_CIF_BEFORE_LOGIN, DELETE_CHECK_CIF_BEFORE_LOGIN} from '../../actions/index.actions';

describe('Reducer: dirtyMiniStatement', () => {

  it('Should return default state by default', () => {
    expect(showSpinner(false, '')).toEqual(false);
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: CHECK_CIF_BEFORE_LOGIN,
      payload: ''
    };
    const expectedResult = true;
    expect(showSpinner('', action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: DELETE_CHECK_CIF_BEFORE_LOGIN
    };
    const expectedResult = false;
    expect(showSpinner('', action)).toEqual(expectedResult);
  });

});
