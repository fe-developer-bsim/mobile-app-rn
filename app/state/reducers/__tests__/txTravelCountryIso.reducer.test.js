import txTravelCountryIso from '../txTravelCountryIso.reducer';
import {SAVE_DATA_TX_TRAVEL_COUNTRY_ISO, CLEAR_DATA_TX_TRAVEL_COUNTRY_ISO} from '../../actions/index.actions';

describe('Reducer: txTravelCountryIso', () => {

  it('Should set movies', () => {
    const action = {
      type: SAVE_DATA_TX_TRAVEL_COUNTRY_ISO,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(txTravelCountryIso({}, action)).toEqual(expectedResult);
  });

  it('Should reset movies', () => {
    const action = {
      type: CLEAR_DATA_TX_TRAVEL_COUNTRY_ISO
    };
    const expectedResult = {};
    expect(txTravelCountryIso({}, action)).toEqual(expectedResult);
  });

});
