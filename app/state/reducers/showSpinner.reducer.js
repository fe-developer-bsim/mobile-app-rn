import {SPINNER_SHOW, SPINNER_HIDE} from '../actions/index.actions';

export default function showSpinner (state = false, action) {
  switch (action.type) {
  case SPINNER_SHOW: {
    return true;
  }
  case SPINNER_HIDE: {
    return false;
  }
  default: {
    return state;
  }
  }
}
