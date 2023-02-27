import txTravelListPassenger from '../txTravelListPassenger.reducer';
import {SAVE_DATA_TX_TRAVEL_PASSENGER_LIST, CLEAR_DATA_TX_TRAVEL_PASSENGER_LIST} from '../../actions/index.actions';

describe('Reducer: txTravelListPassenger', () => {

  it('Should set movies', () => {
    const action = {
      type: SAVE_DATA_TX_TRAVEL_PASSENGER_LIST,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(txTravelListPassenger({}, action)).toEqual(expectedResult);
  });

  it('Should reset movies', () => {
    const action = {
      type: CLEAR_DATA_TX_TRAVEL_PASSENGER_LIST
    };
    const expectedResult = {};
    expect(txTravelListPassenger({}, action)).toEqual(expectedResult);
  });

});
