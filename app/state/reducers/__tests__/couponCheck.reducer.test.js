import checkpoint from '../couponCheck.reducer';
import {SAVE_COUPON, CLEAR_COUPON} from '../../actions/index.actions';

describe('Reducer: checkpoint', () => {
  it('Should return default state by default', () => {
    expect(checkpoint(undefined, {})).toEqual({});
  });
  it('Should save dukcapil list', () => {
    expect(checkpoint([], {type: SAVE_COUPON, payload: {list: ['abc']}})).toEqual({list: ['abc']});
  });
  it('Should clear dukcapil list', () => {
    expect(checkpoint({list: ['abc']}, {type: CLEAR_COUPON})).toEqual({});
  });
});
