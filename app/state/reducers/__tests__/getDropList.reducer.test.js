import getDropList from '../getDropList.reducer';
import {SAVE_DROP_LIST, CLEAR_DROP_LIST} from '../../actions/index.actions';

describe('Reducer: loan accounts', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(getDropList(undefined, {})).toEqual(initialState);
  });
  it('Should update loan accounts', () => {
    const previousState = [];
    const nextState = [{'test': '1234'}];
    const action = {type: SAVE_DROP_LIST, payload: [{'test': '1234'}]};
    expect(getDropList(previousState, action)).toEqual(nextState);
  });
  it('Should clear loan accounts', () => {
    const previousState = [{'test': '1234'}];
    const nextState = [];
    const action = {type: CLEAR_DROP_LIST, payload: {}};
    expect(getDropList(previousState, action)).toEqual(nextState);
  });
});
