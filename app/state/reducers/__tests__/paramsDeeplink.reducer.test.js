import paramsDeeplink from '../paramsDeeplink.reducer';
import {SAVE_PARAMS_LINK, CLEAR_PARAMS_LINK} from '../../actions/index.actions';

describe('Reducer: payees', () => {

  it('Should return default state by default', () => {
    expect(paramsDeeplink([], {})).toEqual([]);
  });

  it('Should clear payee data', () => {
    const action = {
      type: CLEAR_PARAMS_LINK
    };
    const expectedResult = [];
    expect(paramsDeeplink([], action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: SAVE_PARAMS_LINK,
      payload: [{
        accountNumber: '123'
      }]
    };
    const expectedResult = [{
      accountNumber: '123'
    }];
    expect(paramsDeeplink([], action)).toEqual(expectedResult);
  });
});
