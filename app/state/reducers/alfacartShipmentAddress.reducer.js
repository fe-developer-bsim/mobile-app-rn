import {SAVE_ALL_SHIPMENT_ADDRESS_ALFA, CLEAR_ALL_SHIPMENT_ADDRESS_ALFA} from '../actions/index.actions';

export default function shipmentAdress (state = [], action) {
  switch (action.type) {
  case SAVE_ALL_SHIPMENT_ADDRESS_ALFA: {
    return action.payload;
  }
  case CLEAR_ALL_SHIPMENT_ADDRESS_ALFA: {
    return '';
  }
  default: {
    return state;
  }
  }
}