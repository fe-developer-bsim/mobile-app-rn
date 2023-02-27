import usernameAvailability from '../usernameAvailability.reducer';
import {SAVE_USERNAMEAVAIL_STATUS, CLEAR_USERNAMEAVAIL_STATUS} from '../../actions/index.actions';

describe('Reducer: usernameAvailability', () => {

  it('Should set movies', () => {
    const action = {
      type: SAVE_USERNAMEAVAIL_STATUS,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(usernameAvailability({}, action)).toEqual(expectedResult);
  });

  it('Should reset movies', () => {
    const action = {
      type: CLEAR_USERNAMEAVAIL_STATUS
    };
    const expectedResult = {};
    expect(usernameAvailability({}, action)).toEqual(expectedResult);
  });

});
