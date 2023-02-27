import {SAVE_SCANNER_STATE, CLEAR_SCANNER_STATE} from '../actions/index.actions';

export default function getMmq (state = {}, action) {
  switch (action.type) {
  case SAVE_SCANNER_STATE: {
    return action.payload;
  }
  case CLEAR_SCANNER_STATE: {
    return {};
  }
  default: {
    return state;
  }
  }
}