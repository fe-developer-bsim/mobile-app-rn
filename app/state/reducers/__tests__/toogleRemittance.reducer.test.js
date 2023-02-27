import toogleRemittance from '../toogleRemittance.reducer';
import {SAVE_TOOGLE_REMITTANCE, DELETE_TOOGLE_REMITTANCE} from '../../actions/index.actions';

describe('Reducer:', () => {

  it('Should set toogleRemittance config', () => {
    const action = {
      type: SAVE_TOOGLE_REMITTANCE,
      payload: {test: 'wasd'}
    };
    const expectedResult = {test: 'wasd'};
    expect(toogleRemittance([], action)).toEqual(expectedResult);
  });

  it('Should reset toogleRemittance config', () => {
    const action = {
      type: DELETE_TOOGLE_REMITTANCE
    };
    const expectedResult = '';
    expect(toogleRemittance([], action)).toEqual(expectedResult);
  });

});
