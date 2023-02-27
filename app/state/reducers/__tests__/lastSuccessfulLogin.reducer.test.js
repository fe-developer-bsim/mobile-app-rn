import lastSuccessfulLogin from '../lastSuccessfulLogin.reducer';
import {UPDATE_LOGIN, CLEAR_LOGIN} from '../../actions/index.actions';

describe('Reducer: lastSuccessfulLogin', () => {

  it('Should return default state by default', () => {
    expect(lastSuccessfulLogin('', '')).toEqual('');
  });

  it('Should set last successful login', () => {
    const action = {
      type: UPDATE_LOGIN,
      payload: 'face'
    };
    const expectedResult = 'face';
    expect(lastSuccessfulLogin('', action)).toEqual(expectedResult);
  });

  it('Should reset last successful login', () => {
    const action = {
      type: CLEAR_LOGIN
    };
    const expectedResult = 'easypin';
    expect(lastSuccessfulLogin('', action)).toEqual(expectedResult);
  });

});
