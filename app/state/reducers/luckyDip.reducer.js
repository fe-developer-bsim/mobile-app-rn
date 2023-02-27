import {SAVE_LUCKY_DIP, CLEAR_LUCKY_DIP} from '../actions/index.actions';

export default function luckyDip (state = {}, action) {
  switch (action.type) {
  case SAVE_LUCKY_DIP: {
    return action.payload;
  }
  case CLEAR_LUCKY_DIP: {
    return {};
  }
  default: {
    return state;
  }
  }
}