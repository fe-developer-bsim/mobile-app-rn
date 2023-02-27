import listLimit from '../listLimit.reducer';
import {LIST_LIMIT, CLEAR_LIST_LIMIT} from '../../actions/index.actions';

describe('Reducer: recurringtransfer', () => {

  it('Should return default state by default', () => {
    expect(listLimit([], '')).toEqual([]);
  });

  it('Should set biller config', () => {
    const action = {
      type: LIST_LIMIT,
      payload: [{wasd: '123'}]
    };
    const expectedResult = [{wasd: '123'}];
    expect(listLimit([], action)).toEqual(expectedResult);
  });

  it('Should reset biller config', () => {
    const action = {
      type: CLEAR_LIST_LIMIT
    };
    const expectedResult = [];
    expect(listLimit([], action)).toEqual(expectedResult);
  });
});
