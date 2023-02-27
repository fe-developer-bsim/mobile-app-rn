import signature from '../signature.reducer';
import {SAVE_SIGNATURE, CLEAR_SIGNATURE} from '../../actions/index.actions';

describe('Reducer: provinceList', () => {
  it('Should return default state by default', () => {
    expect(signature(undefined, {})).toEqual({});
  });
  it('Should save province list', () => {
    expect(signature([], {type: SAVE_SIGNATURE, payload: {test: 'test'}})).toEqual({test: 'test'});
  });
  it('Should clear province list', () => {
    expect(signature({test: 'test'}, {type: CLEAR_SIGNATURE})).toEqual({});
  });
});
