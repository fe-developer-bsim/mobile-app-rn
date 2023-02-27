import {SAVE_EGIFT_PAGE, CLEAR_EGIFT_PAGE} from '../actions/index.actions';

export default function egiftReducer (state = [], action) {
  switch (action.type) {
  case SAVE_EGIFT_PAGE: {
    return action.payload;
  }
  case CLEAR_EGIFT_PAGE: {
    return [];
  }
  default:
    return state;
  }
}
