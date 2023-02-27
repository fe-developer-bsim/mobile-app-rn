import showSpinner from '../showSpinner.reducer';
import {SPINNER_SHOW, SPINNER_HIDE} from '../../actions/index.actions';

describe('Reducer: dirtyMiniStatement', () => {

  it('Should return default state by default', () => {
    expect(showSpinner(false, '')).toEqual(false);
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SPINNER_SHOW,
      payload: ''
    };
    const expectedResult = true;
    expect(showSpinner('', action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: SPINNER_HIDE
    };
    const expectedResult = false;
    expect(showSpinner('', action)).toEqual(expectedResult);
  });

});
