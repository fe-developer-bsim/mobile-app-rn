import inquirySILPolis from '../inquirySILPolis.reducer';
import {SAVE_INQUIRY_POLIS, CLEAR_INQUIRY_POLIS} from '../../actions/index.actions';

describe('Reducer: loan accounts', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(inquirySILPolis(undefined, {})).toEqual(initialState);
  });
  it('Should update loan accounts', () => {
    const previousState = [];
    const nextState = [{'test': '1234'}];
    const action = {type: SAVE_INQUIRY_POLIS, payload: [{'test': '1234'}]};
    expect(inquirySILPolis(previousState, action)).toEqual(nextState);
  });
  it('Should clear loan accounts', () => {
    const previousState = [{'test': '1234'}];
    const nextState = [];
    const action = {type: CLEAR_INQUIRY_POLIS, payload: {}};
    expect(inquirySILPolis(previousState, action)).toEqual(nextState);
  });
});
