import {SAVE_CC_LIST, CLEAR_CC_LIST} from '../actions/index.actions';

export default function simasPoinReducer (state = [], action) {
  switch (action.type) {
  case SAVE_CC_LIST: {
    return action.payload;
  }
  case CLEAR_CC_LIST: {
    return [];
  }
  default:
    return state;
  }
}
