import {SAVE_QR_PARAMS, CLEAR_QR_PARAMS} from '../actions/index.actions';

export default function referralCode (state = {}, action) {
  switch (action.type) {
  case SAVE_QR_PARAMS: {
    return action.payload;
  }
  case CLEAR_QR_PARAMS: {
    return {};
  }
  default:
    return state;
  }
}
