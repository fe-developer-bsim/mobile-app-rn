import proxyResolution from '../proxyResolution.reducer';
import {SAVE_PROXY_RESOLUTION, CLEAR_PROXY_RESOLUTION} from '../../actions/index.actions';

describe('Reducer: proxyResolution', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(proxyResolution(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_PROXY_RESOLUTION};
    expect(proxyResolution(previousState, action)).toEqual(initialState);
  });
  it('Should update proxyResolution', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_PROXY_RESOLUTION, payload: {test: 'wa'}};
    expect(proxyResolution(previousState, action)).toEqual(nextState);
  });
});
