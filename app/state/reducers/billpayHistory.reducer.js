import {SAVE_BILLPAY_HISTORY, CLEAR_BILLPAY_HISTORY} from '../actions/index.actions';

export default function captcha (state = {}, action) {
  switch (action.type) {
  case SAVE_BILLPAY_HISTORY: {
    return action.payload;
  }
  case CLEAR_BILLPAY_HISTORY: {
    return {};
  }
  default:
    return state;
  }
}
