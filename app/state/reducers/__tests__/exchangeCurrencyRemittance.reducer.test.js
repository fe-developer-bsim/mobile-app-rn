import exchangeCurrencyRemittance from '../exchangeCurrencyRemittance.reducer';
import {SAVE_EXCHANGE_CURRENCY, CLEAR_EXCHANGE_CURRENCY} from '../../actions/index.actions';

describe('Reducer: exchangeCurrencyRemittance', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_EXCHANGE_CURRENCY,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(exchangeCurrencyRemittance([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_EXCHANGE_CURRENCY
    };
    const expectedResult = {};
    expect(exchangeCurrencyRemittance([], action)).toEqual(expectedResult);
  });

});

