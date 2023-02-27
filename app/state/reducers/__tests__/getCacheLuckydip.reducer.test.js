import checkpoint from '../getCacheLuckydip.reducer';
import {SAVE_TICKET_LD_CACHE, CLEAR_TICKET_LD_CACHE} from '../../actions/index.actions';

describe('Reducer: luckydip cache ', () => {
  it('Should return default state by default', () => {
    expect(checkpoint(undefined, {})).toEqual({});
  });
  it('Should save dukcapil list', () => {
    expect(checkpoint([], {type: SAVE_TICKET_LD_CACHE, payload: {list: ['abc']}})).toEqual({list: ['abc']});
  });
  it('Should clear dukcapil list', () => {
    expect(checkpoint({list: ['abc']}, {type: CLEAR_TICKET_LD_CACHE})).toEqual({});
  });
});
