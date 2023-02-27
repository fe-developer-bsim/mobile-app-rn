import {SHARE_DEEPLINK_FLAG, CLEAR_SHARE_REFERRAL_FLAG} from '../actions/index.actions';

export default function isDeeplinkExist (state = '', action) {
  switch (action.type) {
  case SHARE_DEEPLINK_FLAG: {
    return action.payload;
  }
  case CLEAR_SHARE_REFERRAL_FLAG: {
    return '';
  }
  default: {
    return state;
  }
  }
}
