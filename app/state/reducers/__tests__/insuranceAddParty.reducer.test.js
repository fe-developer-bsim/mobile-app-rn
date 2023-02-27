import insuranceAddParty from '../insuranceAddParty.reducer';
import {ADD_PARTY_INSURANCE, CLEAR_PARTY_INSURANCE} from '../../actions/index.actions';

describe('Reducer: flight Data', () => {

  it('Should return default state by default', () => {
    expect(insuranceAddParty({}, {})).toEqual({});
  });

  it('Should clear flight data', () => {
    const action = {
      type: CLEAR_PARTY_INSURANCE
    };
    const expectedResult = {};
    expect(insuranceAddParty({}, action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: ADD_PARTY_INSURANCE,
      payload: {
        passenger: '123'
      }
    };
    const expectedResult = {
      passenger: '123'
    };
    expect(insuranceAddParty({}, action)).toEqual(expectedResult);
  });
});
