import flightDataDetail1 from '../flightDataDetail1.reducer';
import {SAVE_LIST_PLANE1, CLEAR_LIST_PLANE1} from '../../actions/index.actions';

describe('Reducer: flight Data', () => {

  it('Should return default state by default', () => {
    expect(flightDataDetail1({}, {})).toEqual({});
  });

  it('Should clear flight data', () => {
    const action = {
      type: CLEAR_LIST_PLANE1
    };
    const expectedResult = {};
    expect(flightDataDetail1({}, action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: SAVE_LIST_PLANE1,
      payload: {
        passenger: '123'
      }
    };
    const expectedResult = {
      passenger: '123'
    };
    expect(flightDataDetail1({}, action)).toEqual(expectedResult);
  });
});
