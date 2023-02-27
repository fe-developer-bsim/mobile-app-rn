import saveCVVnumber from '../saveCVVnumber.reducer';
import {SAVE_CVV_NUMBER, CLEAR_CVV_NUMBER} from '../../actions/index.actions';

describe('Reducer: savePicture', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_CVV_NUMBER,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(saveCVVnumber([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_CVV_NUMBER
    };
    const expectedResult = {};
    expect(saveCVVnumber([], action)).toEqual(expectedResult);
  });

});

