import {SAVE_CINEMA_CGV, CLEAR_CINEMA_CGV} from '../actions/index.actions';

export default function referralCode (state = '', action) {
  switch (action.type) {
  case SAVE_CINEMA_CGV: {
    return action.payload;
  }
  case CLEAR_CINEMA_CGV: {
    return '';
  }
  default: {
    return state;
  }
  }
}
