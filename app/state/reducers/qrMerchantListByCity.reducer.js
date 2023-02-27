import {SAVE_QR_MERCHANT_BY_CITY, UPDATE_QR_MERCHANT_BY_CITY, CLEAR_QR_MERCHANT_BY_CITY} from '../actions/index.actions';

export default function qrMerchantListByCityReducer (state = [], action) {
  switch (action.type) {
  case SAVE_QR_MERCHANT_BY_CITY: {
    return action.payload;
  }
  case UPDATE_QR_MERCHANT_BY_CITY: {
    return [...state, ...action.payload];
  }
  case CLEAR_QR_MERCHANT_BY_CITY: {
    return [];
  }
  default:
    return state;
  }
}
