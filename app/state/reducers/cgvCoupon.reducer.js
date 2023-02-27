import {SAVE_CGV_COUPON, CLEAR_CGV_COUPON} from '../actions/index.actions';

export default function cgvCoupon (state = {}, action) {
  switch (action.type) {
  case SAVE_CGV_COUPON: {
    return action.payload;
  }
  case CLEAR_CGV_COUPON: {
    return {};
  }
  default:
    return state;
  }
}
