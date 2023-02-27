import tokenRegister from '../tokenRegister.reducer';
import {SAVE_TOKEN_REGISTER, CLEAR_TOKEN_REGISTER} from '../../actions/index.actions';

describe('Reducer: tokenRegister', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_TOKEN_REGISTER,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(tokenRegister([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_TOKEN_REGISTER
    };
    const expectedResult = {};
    expect(tokenRegister([], action)).toEqual(expectedResult);
  });
});
