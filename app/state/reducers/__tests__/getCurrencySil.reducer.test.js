import getCurrencySil from '../getCurrencySil.reducer';
import {SAVE_CURRENCY_SIL, CLEAR_CURRENCY_SIL} from '../../actions/index.actions';

describe('Reducer: getCurrencySil', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(getCurrencySil(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_CURRENCY_SIL};
    expect(getCurrencySil(previousState, action)).toEqual(initialState);
  });
  it('Should update getCurrencySil', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_CURRENCY_SIL, payload: {test: 'wa'}};
    expect(getCurrencySil(previousState, action)).toEqual(nextState);
  });
});
