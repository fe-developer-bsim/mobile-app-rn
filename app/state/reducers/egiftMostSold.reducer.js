import {SAVE_EGIFT_MOST, CLEAR_EGIFT_MOST} from '../actions/index.actions';

export default function timeout (state = [], action) {
  switch (action.type) {
  case SAVE_EGIFT_MOST: {
    return action.payload;
  }
  case CLEAR_EGIFT_MOST: {
    return [];
  }
  default: {
    return state;
  }
  }
}
