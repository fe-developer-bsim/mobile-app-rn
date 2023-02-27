import {SAVE_DETAIL_LOCKED_AMOUNT, CLEAR_DETAIL_LOCKED_AMOUNT} from '../actions/index.actions';

export default function ccCode (state = {}, action) {
  switch (action.type) {
  case SAVE_DETAIL_LOCKED_AMOUNT: {
    return action.payload;
  }
  case CLEAR_DETAIL_LOCKED_AMOUNT: {
    return {};
  }
  default: {
    return state;
  }
  }
}
