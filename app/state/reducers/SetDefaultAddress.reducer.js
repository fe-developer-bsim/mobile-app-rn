import {SAVE_DEFAULT_ADDRESS, CLEAR_DEFAULT_ADDRESS} from '../actions/index.actions';

export default function captcha (state = {}, action) {
  switch (action.type) {
  case SAVE_DEFAULT_ADDRESS: {
    return action.payload;
  }
  case CLEAR_DEFAULT_ADDRESS: {
    return {};
  }
  default:
    return state;
  }
}
