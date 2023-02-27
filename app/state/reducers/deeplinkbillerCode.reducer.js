import {SAVE_BILLERCODE_DEEPLINK, CLEAR_BILLERCODE_DEEPLINK} from '../actions/index.actions';

export default function deepLinkbillerCode (state = '', action) {
  switch (action.type) {
  case SAVE_BILLERCODE_DEEPLINK: {
    return action.payload;
  }
  case CLEAR_BILLERCODE_DEEPLINK: {
    return '';
  }
  default: {
    return state;
  }
  }
}
