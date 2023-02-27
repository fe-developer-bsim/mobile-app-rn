import districtListStore from '../districtListStore.reducer';
import {SAVE_DISTRICT_LIST_STORE, CLEAR_DISTRICT_LIST_STORE} from '../../actions/index.actions';

describe('Reducer: loan accounts', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(districtListStore(undefined, {})).toEqual(initialState);
  });
  it('Should update loan accounts', () => {
    const previousState = [];
    const nextState = [{'test': '1234'}];
    const action = {type: SAVE_DISTRICT_LIST_STORE, payload: [{'test': '1234'}]};
    expect(districtListStore(previousState, action)).toEqual(nextState);
  });
  it('Should clear loan accounts', () => {
    const previousState = [{'test': '1234'}];
    const nextState = [];
    const action = {type: CLEAR_DISTRICT_LIST_STORE, payload: {}};
    expect(districtListStore(previousState, action)).toEqual(nextState);
  });
});
