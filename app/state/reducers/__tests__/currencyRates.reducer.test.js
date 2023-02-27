import currencyRates from '../currencyRates.reducer';
import {SAVE_CURRENCY_RATES, CLEAR_CURRENCY_RATES} from '../../actions/index.actions';

describe('Reducer: user', () => {

  it('Should return default state by default', () => {
    expect(currencyRates([], '')).toEqual([]);
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_CURRENCY_RATES,
      payload: []
    };
    const expectedResult = [];
    expect(currencyRates([], action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_CURRENCY_RATES
    };
    const expectedResult = [];
    expect(currencyRates([], action)).toEqual(expectedResult);
  });
});
