import hasfingerprint from '../hasfingerprint.reducer';
import {HAS_FINGERPRINT_UPDATE} from '../../actions/index.actions';

describe('Reducer: hasfingerprint', () => {
  it('Should return default state by default', () => {
    const initialState =  false;
    expect(hasfingerprint(undefined, {})).toEqual(initialState);
  });
  it('Should update fingerprint', () => {
    const previousState = false;
    const nextState = true;
    const action = {type: HAS_FINGERPRINT_UPDATE, payload: true};
    expect(hasfingerprint(previousState, action)).toEqual(nextState);
  });
});
