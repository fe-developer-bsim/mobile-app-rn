import {SAVE_SENDER, CLEAR_SENDER} from '../actions/index.actions';

export default function splitBillBySender (state = {}, action) {
  switch (action.type) {
  case SAVE_SENDER: {
    return action.payload;
  }
  case CLEAR_SENDER: {
    return '';
  }
  default:
    return state;
  }
}
