import {SAVE_COMINGSOON_CGV, CLEAR_COMINGSOON_CGV} from '../actions/index.actions';

export default function referralCode (state = '', action) {
  switch (action.type) {
  case SAVE_COMINGSOON_CGV: {
    return action.payload;
  }
  case CLEAR_COMINGSOON_CGV: {
    return '';
  }
  default: {
    return state;
  }
  }
}
