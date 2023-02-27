import {SAVE_LOGIN_DATA, CLEAR_LOGIN_DATA} from '../actions/index.actions';

export default function captcha (state = {}, action) {
  switch (action.type) {
  case SAVE_LOGIN_DATA: {
    return action.payload;
  }
  case CLEAR_LOGIN_DATA: {
    return {};
  }
  default:
    return state;
  }
}
