import imageKtp from '../imageKTPCamera.reducer';
import {SAVE_DATA_KTP, CLEAR_DATA_KTP} from '../../actions/index.actions';

describe('Reducer: paydayLoan', () => {
  it('Should return default state by default', () => {
    const initialState = {};
    expect(imageKtp(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {
    };
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_DATA_KTP};
    expect(imageKtp(previousState, action)).toEqual(initialState);
  });
  it('Should update paydayLoan', () => {
    const previousState = {
    };
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_DATA_KTP, payload: {test: 'wa'}};
    expect(imageKtp(previousState, action)).toEqual(nextState);
  });
});
