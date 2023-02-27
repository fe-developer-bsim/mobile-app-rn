import setLimitStorage from '../setLimitStorage.reducer';
import {SAVE_DATA_LIST_LIMIT, CLEAR_DATA_LIST_LIMIT} from '../../actions/index.actions';

describe('Reducer: recurringtransfer', () => {

  it('Should return default state by default', () => {
    expect(setLimitStorage([], '')).toEqual([]);
  });

  it('Should set biller config', () => {
    const action = {
      type: SAVE_DATA_LIST_LIMIT,
      payload: [{wasd: '123'}]
    };
    const expectedResult = [{wasd: '123'}];
    expect(setLimitStorage([], action)).toEqual(expectedResult);
  });

  it('Should reset biller config', () => {
    const action = {
      type: CLEAR_DATA_LIST_LIMIT
    };
    const expectedResult = [];
    expect(setLimitStorage([], action)).toEqual(expectedResult);
  });
});
