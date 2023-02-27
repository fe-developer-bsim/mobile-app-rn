import checkpoint from '../checkpoint.reducer';
import {SAVE_CHECKPOINT, CLEAR_CHECKPOINT} from '../../actions/index.actions';

describe('Reducer: checkpoint', () => {
  it('Should return default state by default', () => {
    expect(checkpoint(undefined, {})).toEqual({});
  });
  it('Should save dukcapil list', () => {
    expect(checkpoint([], {type: SAVE_CHECKPOINT, payload: {list: ['abc']}})).toEqual({list: ['abc']});
  });
  it('Should clear dukcapil list', () => {
    expect(checkpoint({list: ['abc']}, {type: CLEAR_CHECKPOINT})).toEqual({});
  });
});
