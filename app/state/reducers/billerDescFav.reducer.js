import {SAVE_BILLER_FAV, CLEAR_BILLER_FAV} from '../actions/index.actions';

export default function captcha (state = {}, action) {
  switch (action.type) {
  case SAVE_BILLER_FAV: {
    return action.payload;
  }
  case CLEAR_BILLER_FAV: {
    return {};
  }
  default:
    return state;
  }
}
