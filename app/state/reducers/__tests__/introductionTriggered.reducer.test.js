import introduction from '../introductionTriggered.reducer';
import {TRIGGER_INTRODUCTION, CLEAR_TRIGGER_INTRODUCTION} from '../../actions/index.actions';

describe('Reducer: lastRecharges', () => {
  it('Should return default state by default', () => {
    const initialState =  false;
    expect(introduction(undefined, {})).toEqual(initialState);
  });
  it('Should update introductionTriggered', () => {
    const previousState = false;
    const payload = true;
    const nextState = true;
    const action = {type: TRIGGER_INTRODUCTION, payload};
    expect(introduction(previousState, action)).toEqual(nextState);
  });
  it('Should clear introductionTriggered', () => {
    const previousState = true;
    const nextState = false;
    const action = {type: CLEAR_TRIGGER_INTRODUCTION};
    expect(introduction(previousState, action)).toEqual(nextState);
  });

});
