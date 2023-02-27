import {SAVE_DEFAULT_ACCOUNT, CLEAR_DEFAULT_ACCOUNT} from '../actions/index.actions';

export default function captcha (state = {}, action) {
  switch (action.type) {
  case SAVE_DEFAULT_ACCOUNT: {
    return action.payload;
  }
  case CLEAR_DEFAULT_ACCOUNT: {
    return {};
  }
  default:
    return state;
  }
}
