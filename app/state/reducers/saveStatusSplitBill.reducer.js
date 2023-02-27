import {SAVE_STATUS, CLEAR_STATUS} from '../actions/index.actions';

export default function saveStatusSplitBill (state = {}, action) {
  switch (action.type) {
  case SAVE_STATUS: {
    return action.payload;
  }
  case CLEAR_STATUS: {
    return '';
  }
  default:
    return state;
  }
}
