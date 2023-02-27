import releaseQR from '../releaseQR.reducer';
import {SAVE_RELEASE_QR_DATA, CLEAR_RELEASE_QR_DATA} from '../../actions/index.actions';

describe('Reducer: releaseQR', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(releaseQR(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_RELEASE_QR_DATA};
    expect(releaseQR(previousState, action)).toEqual(initialState);
  });
  it('Should update releaseQR', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_RELEASE_QR_DATA, payload: {test: 'wa'}};
    expect(releaseQR(previousState, action)).toEqual(nextState);
  });
});
