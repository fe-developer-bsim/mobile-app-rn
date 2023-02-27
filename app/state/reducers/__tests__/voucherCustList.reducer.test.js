import voucherCustList from '../voucherCustList.reducer';
import {SAVE_VOUCHER_CUST_LIST, CLEAR_VOUCHER_CUST_LIST} from '../../actions/index.actions';

describe('Reducer: subDistrict', () => {
  it('Should return default state by default', () => {
    expect(voucherCustList(undefined, {})).toEqual([]);
  });
  it('Should save subDistrict list', () => {
    expect(voucherCustList([], {type: SAVE_VOUCHER_CUST_LIST, payload: ['Sub 1', 'Sub 2']})).toEqual(['Sub 1', 'Sub 2']);
  });
  it('Should clear subDistrict list', () => {
    expect(voucherCustList(['Sub 1', 'Sub 2'], {type: CLEAR_VOUCHER_CUST_LIST})).toEqual([]);
  });
});
