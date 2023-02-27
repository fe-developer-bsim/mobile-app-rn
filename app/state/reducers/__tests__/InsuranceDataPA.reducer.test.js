import InsuranceDataPA from '../InsuranceDataPA.reducer';
import {SAVE_DATA_PA, CLEAR_DATA_PA} from '../../actions/index.actions';

describe('Reducer: faceRecognition', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(InsuranceDataPA(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_DATA_PA};
    expect(InsuranceDataPA(previousState, action)).toEqual(initialState);
  });
  it('Should update InsuranceDataPA', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_DATA_PA, payload: {test: 'wa'}};
    expect(InsuranceDataPA(previousState, action)).toEqual(nextState);
  });
});
