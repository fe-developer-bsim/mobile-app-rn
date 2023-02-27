import {SAVE_INBOX_COUNTER, CLEAR_INBOX_COUNTER} from '../actions/index.actions';

export default function inboxCounterReducer (state = [], action) {
  switch (action.type) {
  case SAVE_INBOX_COUNTER: {
    return action.payload;
  }
  case CLEAR_INBOX_COUNTER: {
    return [];
  }
  default:
    return state;
  }
}
