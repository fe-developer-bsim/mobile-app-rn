import {DRAWER_SHOW, DRAWER_HIDE} from '../actions/index.actions';

export default function showSpinner (state = false, action) {
  switch (action.type) {
  case DRAWER_SHOW: {
    return true;
  }
  case DRAWER_HIDE: {
    return false;
  }
  default: {
    return state;
  }
  }
}
