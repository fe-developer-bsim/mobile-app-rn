import uniqueCode from '../uniqueCode.reducer';
import {SAVE_UNIQUE_CODE, CLEAR_UNIQUE_CODE} from '../../actions/index.actions';

describe('Reducer:', () => {

  it('Should set uniqueCode config', () => {
    const action = {
      type: SAVE_UNIQUE_CODE,
      payload: {test: 'wasd'}
    };
    const expectedResult = {test: 'wasd'};
    expect(uniqueCode([], action)).toEqual(expectedResult);
  });

  it('Should reset uniqueCode config', () => {
    const action = {
      type: CLEAR_UNIQUE_CODE
    };
    const expectedResult = '';
    expect(uniqueCode([], action)).toEqual(expectedResult);
  });

});
