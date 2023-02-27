import {SAVE_CC_NOTIF_SETTINGS, CLEAR_CC_NOTIF_SETTINGS} from '../actions/index.actions';

export default function ccNotifSettings (state = {}, action) {
  switch (action.type) {
  case SAVE_CC_NOTIF_SETTINGS: {
    return action.payload;
  }
  case CLEAR_CC_NOTIF_SETTINGS: {
    return {};
  }
  default:
    return state;
  }
}
