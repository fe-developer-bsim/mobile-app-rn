import scannerState from '../scannerState.reducer';
import {SAVE_SCANNER_STATE, CLEAR_SCANNER_STATE} from '../../actions/index.actions';

describe('Reducer: scannerState', () => {

  it('Should set movies', () => {
    const action = {
      type: SAVE_SCANNER_STATE,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(scannerState({}, action)).toEqual(expectedResult);
  });

  it('Should reset movies', () => {
    const action = {
      type: CLEAR_SCANNER_STATE
    };
    const expectedResult = {};
    expect(scannerState({}, action)).toEqual(expectedResult);
  });

});
