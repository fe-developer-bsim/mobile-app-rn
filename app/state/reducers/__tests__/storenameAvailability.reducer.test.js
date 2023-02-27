import storenameAvailability from '../storenameAvailability.reducer';
import {SAVE_STORENAMEAVAIL_STATUS, CLEAR_STORENAMEAVAIL_STATUS} from '../../actions/index.actions';

describe('Reducer: storenameAvailability', () => {

  it('Should set movies', () => {
    const action = {
      type: SAVE_STORENAMEAVAIL_STATUS,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(storenameAvailability({}, action)).toEqual(expectedResult);
  });

  it('Should reset movies', () => {
    const action = {
      type: CLEAR_STORENAMEAVAIL_STATUS
    };
    const expectedResult = {};
    expect(storenameAvailability({}, action)).toEqual(expectedResult);
  });

});
