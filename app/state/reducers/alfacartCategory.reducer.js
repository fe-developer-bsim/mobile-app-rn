import {SAVE_CATEGORY, CLEAR_CATEGORY} from '../actions/index.actions';

export default function category (state = [], action) {
  switch (action.type) {
  case SAVE_CATEGORY: {
    return action.payload;
  }
  case CLEAR_CATEGORY: {
    return '';
  }
  default: {
    return state;
  }
  }
}
