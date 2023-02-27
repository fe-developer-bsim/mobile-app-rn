import flightFareDetail1 from '../flightFareDetail1.reducer';
import {SAVE_FLIGHT_DETAIL1, CLEAR_FLIGHT_DETAIL1} from '../../actions/index.actions';

describe('Reducer: flight Fare Detail 1', () => {

  it('Should return default state by default', () => {
    expect(flightFareDetail1({}, {})).toEqual({});
  });

  it('Should clear flight Fare Detail 1', () => {
    const action = {
      type: CLEAR_FLIGHT_DETAIL1
    };
    const expectedResult = {};
    expect(flightFareDetail1({}, action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: SAVE_FLIGHT_DETAIL1,
      payload: {
        passenger: '123'
      }
    };
    const expectedResult = {
      passenger: '123'
    };
    expect(flightFareDetail1({}, action)).toEqual(expectedResult);
  });
});
