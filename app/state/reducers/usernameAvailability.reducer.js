import {SAVE_USERNAMEAVAIL_STATUS, CLEAR_USERNAMEAVAIL_STATUS} from '../actions/index.actions';

export default function referralCode (state = {}, action) {
  switch (action.type) {
  case SAVE_USERNAMEAVAIL_STATUS: {
    return action.payload;
  }
  case CLEAR_USERNAMEAVAIL_STATUS: {
    return {};
  }
  default:
    return state;
  }
}
