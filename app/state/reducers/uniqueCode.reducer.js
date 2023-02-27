import {SAVE_UNIQUE_CODE, CLEAR_UNIQUE_CODE} from '../actions/index.actions';

export default function cgvCoupon (state = '', action) {
  switch (action.type) {
  case SAVE_UNIQUE_CODE: {
    return action.payload;
  }
  case CLEAR_UNIQUE_CODE: {
    return '';
  }
  default:
    return state;
  }
}
