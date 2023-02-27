import {SAVE_NEW_SOF, CLEAR_NEW_SOF} from '../actions/index.actions';

export default function captcha (state = {}, action) {
  switch (action.type) {
  case SAVE_NEW_SOF: {
    return action.payload;
  }
  case CLEAR_NEW_SOF: {
    return {};
  }
  default:
    return state;
  }
}
