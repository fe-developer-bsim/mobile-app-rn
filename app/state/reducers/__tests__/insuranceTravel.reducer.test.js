import insuranceTravel from '../insuranceTravel.reducer';
import {SET_INSURANCE_TRAVEL, CLEAR_INSURANCE_TRAVEL} from '../../actions/index.actions';

describe('Reducer: insuranceTravel', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(insuranceTravel(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_INSURANCE_TRAVEL};
    expect(insuranceTravel(previousState, action)).toEqual(initialState);
  });
  it('Should update insuranceTravel', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SET_INSURANCE_TRAVEL, payload: {test: 'wa'}};
    expect(insuranceTravel(previousState, action)).toEqual(nextState);
  });
});
