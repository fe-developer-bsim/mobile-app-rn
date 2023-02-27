import {SHARE_REFERRAL_CODE, CLEAR_SHARE_REFERRAL_CODE} from '../actions/index.actions';

export default function referralCode (state = '', action) {
  switch (action.type) {
  case SHARE_REFERRAL_CODE: {
    return action.payload;
  }
  case CLEAR_SHARE_REFERRAL_CODE: {
    return '';
  }
  default: {
    return state;
  }
  }
}
