import ccCode from '../ccCode.reducer';
import {SAVE_CC_CODE, CLEAR_CC_CODE} from '../../actions/index.actions';

describe('Reducer: ccCode', () => {
  it('Should return default state by default', () => {
    expect(ccCode(undefined, '')).toEqual('');
  });
  it('Should save cc code', () => {
    expect(ccCode('', {type: SAVE_CC_CODE, payload: '123'})).toEqual('123');
  });
  it('Should clear cc code', () => {
    expect(ccCode('123', {type: CLEAR_CC_CODE})).toEqual('');
  });
});
