import {SAVE_PARTNER_LIST, CLEAR_PARTNER_LIST} from '../actions/index.actions';

export default function captcha (state = {}, action) {
  switch (action.type) {
  case SAVE_PARTNER_LIST: {
    return action.payload;
  }
  case CLEAR_PARTNER_LIST: {
    return {};
  }
  default:
    return state;
  }
}
