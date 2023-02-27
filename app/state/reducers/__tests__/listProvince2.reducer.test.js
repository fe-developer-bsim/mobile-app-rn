import province from '../listProvince2.reducer';
import {SAVE_LIST_PROVINCE2, CLEAR_LIST_PROVINCE2} from '../../actions/index.actions';

describe('Reducer: province', () => {

  it('Should return default state by default', () => {
    expect(province([], {})).toEqual([]);
  });

  it('Should clear payee data', () => {
    const action = {
      type: CLEAR_LIST_PROVINCE2
    };
    const expectedResult = [];
    expect(province([], action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: SAVE_LIST_PROVINCE2,
      payload: [{
        accountNumber: '123'
      }]
    };
    const expectedResult = [{
      accountNumber: '123'
    }];
    expect(province([], action)).toEqual(expectedResult);
  });
});
