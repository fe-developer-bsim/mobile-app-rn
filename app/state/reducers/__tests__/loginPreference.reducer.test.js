import loginPreference from '../loginPreference.reducer';
import {SAVE_LOGIN_PREFERENCE, CLEAR_LOGIN_PREFERENCE} from '../../actions/index.actions';

describe('Reducer: loginPreference', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_LOGIN_PREFERENCE,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(loginPreference([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_LOGIN_PREFERENCE
    };
    const expectedResult = {};
    expect(loginPreference([], action)).toEqual(expectedResult);
  });

});

