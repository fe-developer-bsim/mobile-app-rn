import passenger from '../passenger.reducer';
import {SAVE_PASSENGER, CLEAR_PASSENGER} from '../../actions/index.actions';


describe('Reducer: passenger', () => {

  it('Should return default state by default', () => {
    expect(passenger({}, {})).toEqual({});
  });

  it('Should clear passenger data', () => {
    const action = {
      type: CLEAR_PASSENGER
    };
    const expectedResult = {};
    expect(passenger({}, action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: SAVE_PASSENGER,
      payload: {
        passenger: '123'
      }
    };
    const expectedResult = {
      passenger: '123'
    };
    expect(passenger({}, action)).toEqual(expectedResult);
  });
});
