import {SAVE_DEMO_CODE, CLEAR_DEMO_CODE} from '../actions/index.actions';

export default function ccCode (state = false, action) {
  switch (action.type) {
  case SAVE_DEMO_CODE: {
    return action.payload;
  }
  case CLEAR_DEMO_CODE: {
    return false;
  }
  default: {
    return state;
  }
  }
}
