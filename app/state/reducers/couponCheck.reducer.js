import {SAVE_COUPON, CLEAR_COUPON} from '../actions/index.actions';

export default function couponCheck (state = {}, action) {
  switch (action.type) {
  case SAVE_COUPON: {
    return action.payload;
  }
  case CLEAR_COUPON: {
    return {};
  }
  default: {
    return state;
  }
  }
}