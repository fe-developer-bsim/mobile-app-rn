import fingerprint from '../fingerprint.reducer';
import {IS_USING_FINGERPRINT_UPDATE, CLEAR_IS_USING_FINGERPRINT} from '../../actions/index.actions';

describe('Reducer: fingerprint', () => {
  it('Should return default state by default', () => {
    const initialState =  false;
    expect(fingerprint(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  false;
    const previousState = true;
    const action = {type: CLEAR_IS_USING_FINGERPRINT};
    expect(fingerprint(previousState, action)).toEqual(initialState);
  });
  it('Should update fingerprint', () => {
    const previousState = false;
    const nextState = true;
    const action = {type: IS_USING_FINGERPRINT_UPDATE, payload: true};
    expect(fingerprint(previousState, action)).toEqual(nextState);
  });
});
