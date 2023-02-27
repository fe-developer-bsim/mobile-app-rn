import passwordRegex from '../passwordRegex.reducer';
import {SAVE_REGEX_PASSWORD_POLICY, CLEAR_REGEX_PASSWORD_POLICY} from '../../actions/index.actions';

describe('Reducer: passwordRegex', () => {

  it('Should return default state by default', () => {
    expect(passwordRegex({}, '')).toEqual({});
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_REGEX_PASSWORD_POLICY,
      payload: 'xx-000'
    };
    const expectedResult = 'xx-000';
    expect(passwordRegex({}, action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_REGEX_PASSWORD_POLICY
    };
    const expectedResult = {};
    expect(passwordRegex({}, action)).toEqual(expectedResult);
  });

});
