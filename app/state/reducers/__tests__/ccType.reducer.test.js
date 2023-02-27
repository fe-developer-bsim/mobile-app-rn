import ccType from '../ccType.reducer';
import {SAVE_CC_TYPE, CLEAR_CC_TYPE} from '../../actions/index.actions';

describe('Reducer: ccType', () => {
  it('Should return default state by default', () => {
    expect(ccType(undefined, '')).toEqual('');
  });
  it('Should save cc type', () => {
    expect(ccType('', {type: SAVE_CC_TYPE, payload: 'virtual'})).toEqual('virtual');
  });
  it('Should clear cc type', () => {
    expect(ccType('virtual', {type: CLEAR_CC_TYPE})).toEqual('');
  });
});
