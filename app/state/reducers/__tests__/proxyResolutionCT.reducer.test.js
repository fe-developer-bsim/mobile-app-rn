import proxyResolutionCT from '../proxyResolutionCT.reducer';
import {SAVE_PROXY_RESOLUTION_CT, CLEAR_PROXY_RESOLUTION_CT} from '../../actions/index.actions';

describe('Reducer: proxyResolutionCT', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(proxyResolutionCT(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_PROXY_RESOLUTION_CT};
    expect(proxyResolutionCT(previousState, action)).toEqual(initialState);
  });
  it('Should update proxyResolutionCT', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_PROXY_RESOLUTION_CT, payload: {test: 'wa'}};
    expect(proxyResolutionCT(previousState, action)).toEqual(nextState);
  });
});
