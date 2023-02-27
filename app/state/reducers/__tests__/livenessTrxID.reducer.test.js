import livenessTrxID from '../livenessTrxID.reducer';
import {SAVE_LV_TRXID, CLEAR_LV_TRXID} from '../../actions/index.actions';

describe('Reducer: livenessTrxID', () => {
  it('Should return default state by default', () => {
    expect(livenessTrxID(undefined, '')).toEqual('');
  });
  it('Should save productCode', () => {
    expect(livenessTrxID('', {type: SAVE_LV_TRXID, payload: '123'})).toEqual('123');
  });
  it('Should clear productCode', () => {
    expect(livenessTrxID('123', {type: CLEAR_LV_TRXID})).toEqual('');
  });
});
