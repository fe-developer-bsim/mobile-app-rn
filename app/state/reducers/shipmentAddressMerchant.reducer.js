import {SAVE_SHIPMENT_MERCHANT, CLEAR_SHIPMENT_MERCHANT} from '../actions/index.actions';

export default function shipmentAdress (state = [], action) {
  switch (action.type) {
  case SAVE_SHIPMENT_MERCHANT: {
    return action.payload;
  }
  case CLEAR_SHIPMENT_MERCHANT: {
    return '';
  }
  default: {
    return state;
  }
  }
}