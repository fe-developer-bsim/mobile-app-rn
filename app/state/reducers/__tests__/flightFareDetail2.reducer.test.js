import flightFareDetail2 from '../flightFareDetail2.reducer';
import {SAVE_FLIGHT_DETAIL2, CLEAR_FLIGHT_DETAIL2} from '../../actions/index.actions';

describe('Reducer: flight Fare Detail 2', () => {

  it('Should return default state by default', () => {
    expect(flightFareDetail2({}, {})).toEqual({});
  });

  it('Should clear flight Fare Detail 2', () => {
    const action = {
      type: CLEAR_FLIGHT_DETAIL2
    };
    const expectedResult = {};
    expect(flightFareDetail2({}, action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: SAVE_FLIGHT_DETAIL2,
      payload: {
        passenger: '123'
      }
    };
    const expectedResult = {
      passenger: '123'
    };
    expect(flightFareDetail2({}, action)).toEqual(expectedResult);
  });
});
