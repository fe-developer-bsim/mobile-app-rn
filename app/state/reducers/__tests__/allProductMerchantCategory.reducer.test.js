import cityList from '../allProductMerchantCategory.reducer';
import {SAVE_ALL_PRODUCT_MERCHANT_CATEGORY, CLEAR_ALL_PRODUCT_MERCHANT_CATEGORY} from '../../actions/index.actions';

describe('Reducer: feedback', () => {
  it('Should return default state by default', () => {
    expect(cityList(undefined, {})).toEqual([]);
  });
  it('Should save city list', () => {
    expect(cityList([], {type: SAVE_ALL_PRODUCT_MERCHANT_CATEGORY, payload: ['Jakarta', 'Palembang']})).toEqual(['Jakarta', 'Palembang']);
  });
  it('Should clear city list', () => {
    expect(cityList(['Jakarta', 'Palembang'], {type: CLEAR_ALL_PRODUCT_MERCHANT_CATEGORY})).toEqual('');
  });
});
