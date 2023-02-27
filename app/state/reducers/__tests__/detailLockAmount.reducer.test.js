import checkpoint from '../detailLockedAmount.reducer';
import {SAVE_DETAIL_LOCKED_AMOUNT, CLEAR_DETAIL_LOCKED_AMOUNT} from '../../actions/index.actions';

describe('Reducer: checkpoint', () => {
  it('Should return default state by default', () => {
    expect(checkpoint(undefined, {})).toEqual({});
  });
  it('Should save dukcapil list', () => {
    expect(checkpoint([], {type: SAVE_DETAIL_LOCKED_AMOUNT, payload: {list: ['abc']}})).toEqual({list: ['abc']});
  });
  it('Should clear dukcapil list', () => {
    expect(checkpoint({list: ['abc']}, {type: CLEAR_DETAIL_LOCKED_AMOUNT})).toEqual({});
  });
});
