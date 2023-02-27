import saveLimitTransaction from '../saveLimitTransaction.reducer';
import {LIMIT_SAVE, LIMIT_CLEAR} from '../../actions/index.actions';

describe('Reducer: savePicture', () => {

  it('Should set saving data', () => {
    const action = {
      type: LIMIT_SAVE,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(saveLimitTransaction([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: LIMIT_CLEAR
    };
    const expectedResult = {};
    expect(saveLimitTransaction([], action)).toEqual(expectedResult);
  });

});

