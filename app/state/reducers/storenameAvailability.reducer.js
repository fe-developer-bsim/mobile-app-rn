import {SAVE_STORENAMEAVAIL_STATUS, CLEAR_STORENAMEAVAIL_STATUS} from '../actions/index.actions';

export default function referralCode (state = {}, action) {
  switch (action.type) {
  case SAVE_STORENAMEAVAIL_STATUS: {
    return action.payload;
  }
  case CLEAR_STORENAMEAVAIL_STATUS: {
    return {};
  }
  default:
    return state;
  }
}
