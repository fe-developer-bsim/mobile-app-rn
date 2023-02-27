import {SAVE_OBM_STATUS, CLEAR_OBM_STATUS} from '../actions/index.actions';

export default function obmStatus (state = false, action) {
  switch (action.type) {
  case SAVE_OBM_STATUS: {
    return true;
  }
  case CLEAR_OBM_STATUS: {
    return false;
  }
  default: {
    return state;
  }
  }
}
