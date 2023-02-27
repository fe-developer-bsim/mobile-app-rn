import silChooseIdrOrUsd from '../silChooseIdrOrUsd.reducer';
import {SAVE_SIL_IDR_USD, CLEAR_SIL_IDR_USD} from '../../actions/index.actions';

describe('Reducer: silChooseIdrOrUsd', () => {
  it('Should return default state by default', () => {
    expect(silChooseIdrOrUsd(undefined, '')).toEqual('');
  });
  it('Should save silChooseIdrOrUsd', () => {
    expect(silChooseIdrOrUsd('', {type: SAVE_SIL_IDR_USD, payload: '123'})).toEqual('123');
  });
  it('Should clear silChooseIdrOrUsd', () => {
    expect(silChooseIdrOrUsd('123', {type: CLEAR_SIL_IDR_USD})).toEqual('');
  });
});
