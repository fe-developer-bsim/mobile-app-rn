import {SAVE_MOBILE_NUMBER, CLEAR_MOBILE_NUMBER} from '../actions/index.actions';

export default function referralCode (state = '', action) {
  switch (action.type) {
  case SAVE_MOBILE_NUMBER: {
    return action.payload;
  }
  case CLEAR_MOBILE_NUMBER: {
    return '';
  }
  default: {
    return state;
  }
  }
}
