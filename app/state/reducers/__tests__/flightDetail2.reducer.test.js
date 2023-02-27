import flightDataDetail2 from '../flightDataDetail2.reducer';
import {SAVE_LIST_PLANE2, CLEAR_LIST_PLANE2} from '../../actions/index.actions';

describe('Reducer: flight Data', () => {

  it('Should return default state by default', () => {
    expect(flightDataDetail2({}, {})).toEqual({});
  });

  it('Should clear flight data', () => {
    const action = {
      type: CLEAR_LIST_PLANE2
    };
    const expectedResult = {};
    expect(flightDataDetail2({}, action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: SAVE_LIST_PLANE2,
      payload: {
        passenger: '123'
      }
    };
    const expectedResult = {
      passenger: '123'
    };
    expect(flightDataDetail2({}, action)).toEqual(expectedResult);
  });
});
