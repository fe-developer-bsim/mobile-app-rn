import {SAVE_PRIMARY_ACCOUNT, RESET_PRIMARY_ACCOUNT} from '../actions/index.actions';

export default function primasryAccountToogle (state = false, action) {
  switch (action.type) {
  case SAVE_PRIMARY_ACCOUNT: {
    return true;
  }
  case RESET_PRIMARY_ACCOUNT: {
    return false;
  }
  default: {
    return state;
  }
  }
}
