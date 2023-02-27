import geoLocationSimasCatalog from '../geolocationSimasCatalog.reducer';
import {GEO_LOCATION_SIMASCATALOG_SAVE, GEO_LOCATION_SIMASCATALOG_CLEAR} from '../../actions/index.actions';

describe('Reducer: geoLocation', () => {

  it('Should set saving data', () => {
    const action = {
      type: GEO_LOCATION_SIMASCATALOG_SAVE,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(geoLocationSimasCatalog([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: GEO_LOCATION_SIMASCATALOG_CLEAR
    };
    const expectedResult = '';
    expect(geoLocationSimasCatalog([], action)).toEqual(expectedResult);
  });

});

