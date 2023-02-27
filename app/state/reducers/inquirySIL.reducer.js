import {SAVE_INQUIRY_SIL, CLEAR_INQUIRY_SIL} from '../actions/index.actions';

export default function inboxCounterReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_INQUIRY_SIL: {
    return action.payload;
  }
  case CLEAR_INQUIRY_SIL: {
    return {};
  }
  default:
    return state;
  }
}
