import shipmentAdress from '../alfacartShipmentAddress.reducer';
import {SAVE_ALL_SHIPMENT_ADDRESS_ALFA, CLEAR_ALL_SHIPMENT_ADDRESS_ALFA} from '../../actions/index.actions';

describe('Reducer: shipmentAdress', () => {
  it('Should return default state by default', () => {
    expect(shipmentAdress(undefined, [])).toEqual([]);
  });
  it('Should save alfacart', () => {
    expect(shipmentAdress('', {type: SAVE_ALL_SHIPMENT_ADDRESS_ALFA, payload: '123'})).toEqual('123');
  });
  it('Should clear alfacart', () => {
    expect(shipmentAdress('123', {type: CLEAR_ALL_SHIPMENT_ADDRESS_ALFA})).toEqual('');
  });
});
