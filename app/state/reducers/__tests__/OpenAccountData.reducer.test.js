import openAccountData from '../openAccountData.reducer';
import {SAVE_OPEN_ACCOUNT_DATA, CLEAR_OPEN_ACCOUNT_DATA, SAVE_OPEN_ACCOUNT_DATA_NAME, SAVE_OPEN_ACCOUNT_DATA_KTP, SAVE_OPEN_ACCOUNT_DATA_NPWP} from '../../actions/index.actions';

describe('Reducer: openAccountData', () => {
  it('Should return default state by default', () => {
    expect(openAccountData(undefined, {})).toEqual({});
  });
  it('Should save data for open account', () => {
    expect(openAccountData({1: 'a'}, {type: SAVE_OPEN_ACCOUNT_DATA, payload: {2: 'b'}})).toEqual({1: 'a', 2: 'b'});
  });
  it('Should save name data', () => {
    expect(openAccountData({1: 'a'}, {type: SAVE_OPEN_ACCOUNT_DATA_NAME, payload: 'test'})).toEqual({1: 'a', name: 'test'});
  });
  it('Should save ktp image data', () => {
    expect(openAccountData({1: 'a'}, {type: SAVE_OPEN_ACCOUNT_DATA_KTP, payload: 'test'})).toEqual({1: 'a', ktpImage: 'test'});
  });
  it('Should save ktp image data', () => {
    expect(openAccountData({1: 'a'}, {type: SAVE_OPEN_ACCOUNT_DATA_NPWP, payload: 'test'})).toEqual({1: 'a', npwpImage: 'test'});
  });
  it('Should clear open account data', () => {
    expect(openAccountData({1: 'a'}, {type: CLEAR_OPEN_ACCOUNT_DATA})).toEqual({});
  });
});
