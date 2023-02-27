import cityList from '../shipmentAddressMerchant.reducer';
import {SAVE_SHIPMENT_MERCHANT, CLEAR_SHIPMENT_MERCHANT} from '../../actions/index.actions';

describe('Reducer: feedback', () => {
  it('Should return default state by default', () => {
    expect(cityList(undefined, {})).toEqual([]);
  });
  it('Should save city list', () => {
    expect(cityList([], {type: SAVE_SHIPMENT_MERCHANT, payload: ['Jakarta', 'Palembang']})).toEqual(['Jakarta', 'Palembang']);
  });
  it('Should clear city list', () => {
    expect(cityList(['Jakarta', 'Palembang'], {type: CLEAR_SHIPMENT_MERCHANT})).toEqual('');
  });
});
