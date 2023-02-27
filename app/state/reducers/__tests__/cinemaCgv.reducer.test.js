import cinemaCgv from '../cinemaCgv.reducer';
import {SAVE_CINEMA_CGV, CLEAR_CINEMA_CGV} from '../../actions/index.actions';

describe('Reducer: cinemaCgv', () => {

  it('Should set biller config', () => {
    const action = {
      type: SAVE_CINEMA_CGV,
      payload: {test: 'wasd'}
    };
    const expectedResult = {test: 'wasd'};
    expect(cinemaCgv([], action)).toEqual(expectedResult);
  });

  it('Should reset biller config', () => {
    const action = {
      type: CLEAR_CINEMA_CGV
    };
    const expectedResult = '';
    expect(cinemaCgv([], action)).toEqual(expectedResult);
  });

});
