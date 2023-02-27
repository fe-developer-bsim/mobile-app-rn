import flightSchedule from '../flightSchedule.reducer';
import {SAVE_FLIGHT_SCHEDULE, CLEAR_FLIGHT_SCHEDULE} from '../../actions/index.actions';

describe('Reducer: flight Schedule', () => {

  it('Should return default state by default', () => {
    expect(flightSchedule({}, {})).toEqual({});
  });

  it('Should clear flight data', () => {
    const action = {
      type: CLEAR_FLIGHT_SCHEDULE
    };
    const expectedResult = {};
    expect(flightSchedule({}, action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: SAVE_FLIGHT_SCHEDULE,
      payload: {
        passenger: '123'
      }
    };
    const expectedResult = {
      passenger: '123'
    };
    expect(flightSchedule({}, action)).toEqual(expectedResult);
  });
});
