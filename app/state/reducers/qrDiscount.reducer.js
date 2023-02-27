import {SAVE_QR_DISCOUNT, UPDATE_QR_DISCOUNT, CLEAR_QR_DISCOUNT} from '../actions/index.actions';

export default function qrDiscountReducer (state = [], action) {
  switch (action.type) {
  case SAVE_QR_DISCOUNT: {
    return action.payload;
  }
  case UPDATE_QR_DISCOUNT: {
    return [...state, ...action.payload];
  }
  case CLEAR_QR_DISCOUNT: {
    return [];
  }
  default:
    return state;
  }
}
