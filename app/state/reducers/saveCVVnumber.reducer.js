import {SAVE_CVV_NUMBER, CLEAR_CVV_NUMBER} from '../actions/index.actions';

export default function referralCode (state = {}, action) {
  switch (action.type) {
  case SAVE_CVV_NUMBER: {
    return action.payload;
  }
  case CLEAR_CVV_NUMBER: {
    return {};
  }
  default:
    return state;
  }
}
