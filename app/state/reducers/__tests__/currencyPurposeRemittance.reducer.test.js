import currencyPurposeRemittance from '../currencyPurposeRemittance.reducer';
import {SAVE_CURRENCY_PURPOSE, CLEAR_CURRENCY_PURPOSE} from '../../actions/index.actions';

describe('Reducer: user', () => {

  it('Should return default state by default', () => {
    expect(currencyPurposeRemittance([], '')).toEqual([]);
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_CURRENCY_PURPOSE,
      payload: []
    };
    const expectedResult = [];
    expect(currencyPurposeRemittance([], action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_CURRENCY_PURPOSE
    };
    const expectedResult = [];
    expect(currencyPurposeRemittance([], action)).toEqual(expectedResult);
  });
});
