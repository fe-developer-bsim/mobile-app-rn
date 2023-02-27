import {SAVE_CODE_ONBOARD, CLEAR_CODE_ONBOARD} from '../actions/index.actions';

export default function userReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_CODE_ONBOARD: {
    return action.payload;
  }
  case CLEAR_CODE_ONBOARD: {
    return {};
  }
  default:
    return state;
  }
}
