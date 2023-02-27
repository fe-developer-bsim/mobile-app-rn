import simasPoinHistory from '../simasPoinHistory.reducer';
import {SAVE_SIMASPOIN_HISTORY, CLEAR_SIMASPOIN_HISTORY} from '../../actions/index.actions';

describe('Reducer: user', () => {

  it('Should return default state by default', () => {
    expect(simasPoinHistory([], {})).toEqual([]);
  });

  it('Should set simasPoinHistory data', () => {
    const action = {
      type: SAVE_SIMASPOIN_HISTORY,
      payload: [{
        accountNumber: '123'
      }]
    };
    const expectedResult = [{
      accountNumber: '123'
    }];
    expect(simasPoinHistory([], action)).toEqual(expectedResult);
  });

  it('Should clear simasPoinHistory data', () => {
    const action = {
      type: CLEAR_SIMASPOIN_HISTORY
    };
    const expectedResult = [];
    expect(simasPoinHistory([], action)).toEqual(expectedResult);
  });
});
