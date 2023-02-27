import {SHOW_TIME_SLOT_ALFA, HIDE_TIME_SLOT_ALFA} from '../actions/index.actions';

export default function showSpinner (state = false, action) {
  switch (action.type) {
  case SHOW_TIME_SLOT_ALFA: {
    return true;
  }
  case HIDE_TIME_SLOT_ALFA: {
    return false;
  }
  default: {
    return state;
  }
  }
}