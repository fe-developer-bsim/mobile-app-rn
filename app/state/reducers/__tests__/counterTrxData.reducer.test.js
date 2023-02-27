import showSpinner from '../counterTrxData.reducer';
import {SAVE_COUNTER_TRX_DATA, CLEAR_COUNTER_TRX_DATA} from '../../actions/index.actions';

describe('Reducer: dirtyMiniStatement', () => {

  it('Should return default state by default', () => {
    expect(showSpinner(false, '')).toEqual(false);
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_COUNTER_TRX_DATA,
      payload: ''
    };
    const expectedResult = '';
    expect(showSpinner('', action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_COUNTER_TRX_DATA
    };
    const expectedResult = '';
    expect(showSpinner('', action)).toEqual(expectedResult);
  });

});
