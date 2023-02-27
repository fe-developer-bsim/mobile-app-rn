import {SAVE_CC_AVAILABLE_BALANCE, CLEAR_CC_AVAILABLE_BALANCE} from '../actions/index.actions';

export default function creditCardBalance (state = {}, action) {
  switch (action.type) {
  case SAVE_CC_AVAILABLE_BALANCE: {
    return action.payload;
  }
  case CLEAR_CC_AVAILABLE_BALANCE: {
    return [];
  }
  default:
    return state;
  }
}
