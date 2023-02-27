import geoLocation from '../geoLocation.reducer';
import {GEO_LOCATION_SAVE, GEO_LOCATION_CLEAR} from '../../actions/index.actions';

describe('Reducer: geoLocation', () => {

  it('Should set saving data', () => {
    const action = {
      type: GEO_LOCATION_SAVE,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(geoLocation([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: GEO_LOCATION_CLEAR
    };
    const expectedResult = {};
    expect(geoLocation([], action)).toEqual(expectedResult);
  });

});

