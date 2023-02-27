import pushNotif from '../pushNotif.reducer';
import {SAVE_NOTIF_LIST, CLEAR_NOTIF_LIST} from '../../actions/index.actions';

describe('Reducer: loan accounts', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(pushNotif(undefined, {})).toEqual(initialState);
  });
  it('Should update loan accounts', () => {
    const previousState = [];
    const nextState = [{'test': '1234'}];
    const action = {type: SAVE_NOTIF_LIST, payload: [{'test': '1234'}]};
    expect(pushNotif(previousState, action)).toEqual(nextState);
  });
  it('Should clear loan accounts', () => {
    const previousState = [{'test': '1234'}];
    const nextState = [];
    const action = {type: CLEAR_NOTIF_LIST, payload: {}};
    expect(pushNotif(previousState, action)).toEqual(nextState);
  });
});
