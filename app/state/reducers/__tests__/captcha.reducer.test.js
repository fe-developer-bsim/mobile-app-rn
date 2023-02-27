import captchaReducer from '../captcha.reducer';
import * as actions from '../../actions/index.actions';

describe('Reducer: transactions', () => {
  const initialState = {};
  it('Should return default state by default', () => {
    expect(captchaReducer(undefined, {})).toEqual(initialState);
  });
  it('Should update captcha', () => {
    const action = {
      type: actions.SET_CAPTCHA,
      payload: {
        url: 'https://uat.mydibi.com'
      }
    };
    const expected = {
      url: 'https://uat.mydibi.com'
    };
    expect(captchaReducer(initialState, action)).toEqual(expected);
  });
  it('CLEAR_CAPTCHA: should clear all ', () => {
    const action = {
      type: actions.CLEAR_CAPTCHA
    };
    const state = {captcha: {
      url: 'https://uat.mydibi.com'
    }};
    const expected = {};
    expect(captchaReducer(state, action)).toEqual(expected);
  });
});
