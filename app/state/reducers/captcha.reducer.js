import {SET_CAPTCHA, CLEAR_CAPTCHA} from '../actions/index.actions';

export default function captcha (state = {}, action) {
  switch (action.type) {
  case SET_CAPTCHA: {
    return action.payload;
  }
  case CLEAR_CAPTCHA: {
    return {};
  }
  default:
    return state;
  }
}
