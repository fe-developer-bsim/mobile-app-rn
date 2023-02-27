import inquirySIL from '../inquirySIL.reducer';
import {SAVE_INQUIRY_SIL, CLEAR_INQUIRY_SIL} from '../../actions/index.actions';

describe('Reducer: inquirySIL', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(inquirySIL(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_INQUIRY_SIL};
    expect(inquirySIL(previousState, action)).toEqual(initialState);
  });
  it('Should update inquirySIL', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_INQUIRY_SIL, payload: {test: 'wa'}};
    expect(inquirySIL(previousState, action)).toEqual(nextState);
  });
});
