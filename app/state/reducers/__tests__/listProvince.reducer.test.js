import province from '../listProvince.reducer';
import {SAVE_LIST_PROVINCE, CLEAR_LIST_PROVINCE} from '../../actions/index.actions';

describe('Reducer: province', () => {

  it('Should return default state by default', () => {
    expect(province([], {})).toEqual([]);
  });

  it('Should clear payee data', () => {
    const action = {
      type: CLEAR_LIST_PROVINCE
    };
    const expectedResult = [];
    expect(province([], action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: SAVE_LIST_PROVINCE,
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
