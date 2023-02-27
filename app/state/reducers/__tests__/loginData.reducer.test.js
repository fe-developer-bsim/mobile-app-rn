import loginData from '../loginData.reducer';
import {SAVE_LOGIN_DATA, CLEAR_LOGIN_DATA} from '../../actions/index.actions';

describe('Reducer: loginData', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_LOGIN_DATA,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(loginData([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_LOGIN_DATA
    };
    const expectedResult = {};
    expect(loginData([], action)).toEqual(expectedResult);
  });

});

