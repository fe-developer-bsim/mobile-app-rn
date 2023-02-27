import {SAVE_FAVORITE_BILLER, CLEAR_FAVORITE_BILLER} from '../actions/index.actions';

export default function captcha (state = {}, action) {
  switch (action.type) {
  case SAVE_FAVORITE_BILLER: {
    return action.payload;
  }
  case CLEAR_FAVORITE_BILLER: {
    return {};
  }
  default:
    return state;
  }
}
