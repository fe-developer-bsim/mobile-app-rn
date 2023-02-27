import {SAVE_NOTIF_LIST, CLEAR_NOTIF_LIST} from '../actions/index.actions';

export default function pushNotifReducer (state = [], action) {
  switch (action.type) {
  case SAVE_NOTIF_LIST: {
    return action.payload;
  }
  case CLEAR_NOTIF_LIST: {
    return [];
  }
  default:
    return state;
  }
}
