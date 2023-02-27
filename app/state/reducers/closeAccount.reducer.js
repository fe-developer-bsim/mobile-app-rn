import {SAVE_CLOSE_ACCOUNT, CLEAR_CLOSE_ACCOUNT} from '../actions/index.actions';

export default function closeAccount (state = {}, action) {
  switch (action.type) {
  case SAVE_CLOSE_ACCOUNT : {
    return action.payload;
  }
  case CLEAR_CLOSE_ACCOUNT: {
    return {};
  }
  default:
    return state;
  }
}
