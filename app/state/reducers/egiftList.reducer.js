import {SAVE_EGIFT_LIST, CLEAR_EGIFT_LIST} from '../actions/index.actions';

export default function egiftReducer (state = [], action) {
  switch (action.type) {
  case SAVE_EGIFT_LIST: {
    return action.payload;
  }
  case CLEAR_EGIFT_LIST: {
    return [];
  }
  default:
    return state;
  }
}
