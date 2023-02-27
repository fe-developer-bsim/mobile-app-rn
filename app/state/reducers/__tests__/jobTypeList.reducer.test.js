import jobTypeList from '../jobTypeList.reducer';
import {SAVE_JOB_TYPE, CLEAR_JOB_TYPE} from '../../actions/index.actions';

describe('Reducer: loan accounts', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(jobTypeList(undefined, {})).toEqual(initialState);
  });
  it('Should update loan accounts', () => {
    const previousState = [];
    const nextState = [{'test': '1234'}];
    const action = {type: SAVE_JOB_TYPE, payload: [{'test': '1234'}]};
    expect(jobTypeList(previousState, action)).toEqual(nextState);
  });
  it('Should clear loan accounts', () => {
    const previousState = [{'test': '1234'}];
    const nextState = [];
    const action = {type: CLEAR_JOB_TYPE, payload: {}};
    expect(jobTypeList(previousState, action)).toEqual(nextState);
  });
});
