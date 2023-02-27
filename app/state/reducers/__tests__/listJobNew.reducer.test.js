import listJobNew from '../listLimit.reducer';
import {SAVE_SIMPLIFIED_LIST_JOB_NEW, CLEAR_SIMPLIFIED_LIST_JOB_NEW} from '../../actions/index.actions';

describe('Reducer: listJobNew', () => {

  it('Should return default state by default', () => {
    expect(listJobNew([], {})).toEqual([]);
  });

  it('Should clear payee data', () => {
    const action = {
      type: CLEAR_SIMPLIFIED_LIST_JOB_NEW
    };
    const expectedResult = [];
    expect(listJobNew([], action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: SAVE_SIMPLIFIED_LIST_JOB_NEW,
      payload: []
    };
    const expectedResult = [];
    expect(listJobNew([], action)).toEqual(expectedResult);
  });
});
