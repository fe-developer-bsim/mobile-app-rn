import utm from '../utm.reducer';
import {SAVE_UTM, CLEAR_UTM} from '../../actions/index.actions';

describe('Reducer:', () => {

  it('Should set utm config', () => {
    const action = {
      type: SAVE_UTM,
      payload: {test: 'wasd'}
    };
    const expectedResult = {test: 'wasd'};
    expect(utm([], action)).toEqual(expectedResult);
  });

  it('Should reset utm config', () => {
    const action = {
      type: CLEAR_UTM
    };
    const expectedResult = '';
    expect(utm([], action)).toEqual(expectedResult);
  });

});
