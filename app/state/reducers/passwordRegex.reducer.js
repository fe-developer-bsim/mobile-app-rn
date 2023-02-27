import {SAVE_REGEX_PASSWORD_POLICY, CLEAR_REGEX_PASSWORD_POLICY} from '../actions/index.actions';

export default function regexPassword (state = {}, action) {
  switch (action.type) {
  case SAVE_REGEX_PASSWORD_POLICY: {
    return action.payload;
  }
  case CLEAR_REGEX_PASSWORD_POLICY: {
    return {};
  }
  default:
    return state;
  }
}
