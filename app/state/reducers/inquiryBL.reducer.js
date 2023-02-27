import {SAVE_INQUIRY_BILLER, CLEAR_INQUIRY_BILLER} from '../actions/index.actions';

export default function captcha (state = {}, action) {
  switch (action.type) {
  case SAVE_INQUIRY_BILLER: {
    return action.payload;
  }
  case CLEAR_INQUIRY_BILLER: {
    return {};
  }
  default:
    return state;
  }
}
