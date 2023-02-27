import {SAVE_COUPON_COUNTER, CLEAR_COUPON_COUNTER} from '../actions/index.actions';

export default function couponCounterDetail (state = '', action) {
  switch (action.type) {
  case SAVE_COUPON_COUNTER: {
    return action.payload;
  }
  case CLEAR_COUPON_COUNTER: {
    return '';
  }
  default: {
    return state;
  }
  }
}
