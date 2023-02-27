import inquiryProxyByEDW from '../inquiryProxyByEDW.reducer';
import {SAVE_INQUIRY_PROXY_BY_EDW, CLEAR_INQUIRY_PROXY_BY_EDW} from '../../actions/index.actions';

describe('Reducer: inquiryProxyByEDW', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(inquiryProxyByEDW(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_INQUIRY_PROXY_BY_EDW};
    expect(inquiryProxyByEDW(previousState, action)).toEqual(initialState);
  });
  it('Should update inquiryProxyByEDW', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_INQUIRY_PROXY_BY_EDW, payload: {test: 'wa'}};
    expect(inquiryProxyByEDW(previousState, action)).toEqual(nextState);
  });
});
