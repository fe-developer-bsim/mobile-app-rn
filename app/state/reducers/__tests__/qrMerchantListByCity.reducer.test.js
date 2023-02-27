import qrMerchantListByCity from '../qrMerchantListByCity.reducer';
import {SAVE_QR_MERCHANT_BY_CITY, UPDATE_QR_MERCHANT_BY_CITY, CLEAR_QR_MERCHANT_BY_CITY} from '../../actions/index.actions';

describe('Reducer: qrMerchantListByCity', () => {

  it('Should return default state by default', () => {
    expect(qrMerchantListByCity('', '')).toEqual('');
  });
  
  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_QR_MERCHANT_BY_CITY,
      payload: 'xx-000'
    };
    const expectedResult = 'xx-000';
    expect(qrMerchantListByCity({}, action)).toEqual(expectedResult);
  });
  
  it('Should reset transaction Reference Number', () => {
    const action = {
      type: UPDATE_QR_MERCHANT_BY_CITY,
      payload: 'xx-000'
    };
    const expectedResult = ['x', 'x', '-', '0', '0', '0'];
    expect(qrMerchantListByCity([], action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_QR_MERCHANT_BY_CITY
    };
    const expectedResult = [];
    expect(qrMerchantListByCity([], action)).toEqual(expectedResult);
  });
  
});
  