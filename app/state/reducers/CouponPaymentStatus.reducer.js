import {SAVE_PAYMENT_STATUS_COUPON, DELETE_PAYMENT_STATUS_COUPON} from '../actions/index.actions';

export default function CouponPaymentStatus (state = '', action) {
  switch (action.type) {
  case SAVE_PAYMENT_STATUS_COUPON: {
    return action.payload;
  }
  case DELETE_PAYMENT_STATUS_COUPON: {
    return '';
  }
  default: {
    return state;
  }
  }
}
