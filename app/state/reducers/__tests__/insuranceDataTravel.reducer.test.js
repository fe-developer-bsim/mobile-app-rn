import insuranceDataTravel from '../insuranceDataTravel.reducer';
import {SAVE_DATA_TRAVEL, CLEAR_DATA_TRAVEL} from '../../actions/index.actions';

describe('Reducer: flight Data', () => {

  it('Should return default state by default', () => {
    expect(insuranceDataTravel({}, {})).toEqual({});
  });

  it('Should clear flight data', () => {
    const action = {
      type: CLEAR_DATA_TRAVEL
    };
    const expectedResult = {};
    expect(insuranceDataTravel({}, action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: SAVE_DATA_TRAVEL,
      payload: {
        passenger: '123'
      }
    };
    const expectedResult = {
      passenger: '123'
    };
    expect(insuranceDataTravel({}, action)).toEqual(expectedResult);
  });
});
