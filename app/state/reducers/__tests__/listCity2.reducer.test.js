import city from '../listCity2.reducer';
import {SAVE_LIST_CITY2, CLEAR_LIST_CITY2} from '../../actions/index.actions';

describe('Reducer: city', () => {

  it('Should return default state by default', () => {
    expect(city([], {})).toEqual([]);
  });

  it('Should clear payee data', () => {
    const action = {
      type: CLEAR_LIST_CITY2
    };
    const expectedResult = [];
    expect(city([], action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: SAVE_LIST_CITY2,
      payload: [{
        accountNumber: '123'
      }]
    };
    const expectedResult = [{
      accountNumber: '123'
    }];
    expect(city([], action)).toEqual(expectedResult);
  });
});
