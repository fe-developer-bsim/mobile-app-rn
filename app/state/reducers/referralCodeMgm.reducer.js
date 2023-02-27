import {SAVE_REFERRAL_CODE_MGM, CLEAR_REFERRAL_CODE_MGM} from '../actions/index.actions';

export default function referralCodeMgm (state = {}, action) {
  switch (action.type) {
  case SAVE_REFERRAL_CODE_MGM: {
    return action.payload;
  }
  case CLEAR_REFERRAL_CODE_MGM: {
    return {};
  }
  default:
    return state;
  }
}
