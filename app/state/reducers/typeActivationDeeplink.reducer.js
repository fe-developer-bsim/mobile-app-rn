import {SAVE_TYPEACTIVATION_DEEPLINK, CLEAR_TYPEACTIVATION_DEEPLINK} from '../actions/index.actions';

export default function typeActivationDeeplink (state = '', action) {
  switch (action.type) {
  case SAVE_TYPEACTIVATION_DEEPLINK: {
    return action.payload;
  }
  case CLEAR_TYPEACTIVATION_DEEPLINK: {
    return '';
  }
  default: {
    return state;
  }
  }
}
