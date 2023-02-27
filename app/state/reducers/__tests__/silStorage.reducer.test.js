import silStorage from '../silStorage.reducer';
import {SAVE_SIL_STORAGE, CLEAR_SIL_STORAGE} from '../../actions/index.actions';

describe('Reducer: silStorage', () => {
  it('Should return default state by default', () => {
    expect(silStorage(undefined, [])).toEqual([]);
  });
  it('Should save sil storage', () => {
    expect(silStorage([{asd: '123'}, {asd: '123'}], {type: SAVE_SIL_STORAGE, payload: [{asd: '123'}, {asd: '123'}]})).toEqual([{asd: '123'}, {asd: '123'}]);
  });
  it('Should clear clear storage', () => {
    expect(silStorage([], {type: CLEAR_SIL_STORAGE})).toEqual([]);
  });
});
