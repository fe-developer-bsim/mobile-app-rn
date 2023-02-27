import insurancePA from '../insurancePA.reducer';
import {SET_INSURANCE_PA, CLEAR_INSURANCE_PA} from '../../actions/index.actions';

describe('Reducer: insurancePA', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(insurancePA(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_INSURANCE_PA};
    expect(insurancePA(previousState, action)).toEqual(initialState);
  });
  it('Should update insurancePA', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SET_INSURANCE_PA, payload: {test: 'wa'}};
    expect(insurancePA(previousState, action)).toEqual(nextState);
  });
});
