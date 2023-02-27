import paydayLoan from '../imageSelfieCamera.reducer';
import {SAVE_DATA_SELFIE, CLEAR_DATA_SELFIE} from '../../actions/index.actions';

describe('Reducer: paydayLoan', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(paydayLoan(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_DATA_SELFIE};
    expect(paydayLoan(previousState, action)).toEqual(initialState);
  });
  it('Should update paydayLoan', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_DATA_SELFIE, payload: {test: 'wa'}};
    expect(paydayLoan(previousState, action)).toEqual(nextState);
  });
});
