import flightData from '../flightData.reducer';
import {SAVE_FLIGHT_DATA, CLEAR_FLIGHT_DATA} from '../../actions/index.actions';

describe('Reducer: flight Data', () => {

  it('Should return default state by default', () => {
    expect(flightData({}, {})).toEqual({});
  });

  it('Should clear flight data', () => {
    const action = {
      type: CLEAR_FLIGHT_DATA
    };
    const expectedResult = {};
    expect(flightData({}, action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: SAVE_FLIGHT_DATA,
      payload: {
        passenger: '123'
      }
    };
    const expectedResult = {
      passenger: '123'
    };
    expect(flightData({}, action)).toEqual(expectedResult);
  });
});
