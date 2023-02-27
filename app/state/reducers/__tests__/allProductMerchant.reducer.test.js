import cityList from '../allProductMerchant.reducer';
import {SAVE_ALL_PRODUCT_MERCHANT, CLEAR_ALL_PRODUCT_MERCHANT} from '../../actions/index.actions';

describe('Reducer: feedback', () => {
  it('Should return default state by default', () => {
    expect(cityList(undefined, {})).toEqual([]);
  });
  it('Should save city list', () => {
    expect(cityList([], {type: SAVE_ALL_PRODUCT_MERCHANT, payload: ['Jakarta', 'Palembang']})).toEqual(['Jakarta', 'Palembang']);
  });
  it('Should clear city list', () => {
    expect(cityList(['Jakarta', 'Palembang'], {type: CLEAR_ALL_PRODUCT_MERCHANT})).toEqual('');
  });
});
