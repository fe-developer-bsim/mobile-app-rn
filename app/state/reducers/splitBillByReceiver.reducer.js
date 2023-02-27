import {SAVE_RECEIVER, CLEAR_RECEIVER} from '../actions/index.actions';

export default function splitBillByReceiver (state = {}, action) {
  switch (action.type) {
  case SAVE_RECEIVER: {
    return action.payload;
  }
  case CLEAR_RECEIVER: {
    return '';
  }
  default:
    return state;
  }
}
