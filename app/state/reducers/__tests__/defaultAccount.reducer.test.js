import checkpoint from '../defaultAccount.reducer';
import {SAVE_DEFAULT_ACCOUNT, CLEAR_DEFAULT_ACCOUNT} from '../../actions/index.actions';

describe('Reducer: checkpoint', () => {
  it('Should return default state by default', () => {
    expect(checkpoint(undefined, {})).toEqual({});
  });
  it('Should save dukcapil list', () => {
    expect(checkpoint([], {type: SAVE_DEFAULT_ACCOUNT, payload: {list: ['abc']}})).toEqual({list: ['abc']});
  });
  it('Should clear dukcapil list', () => {
    expect(checkpoint({list: ['abc']}, {type: CLEAR_DEFAULT_ACCOUNT})).toEqual({});
  });
});
