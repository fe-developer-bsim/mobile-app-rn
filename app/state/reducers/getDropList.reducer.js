import {SAVE_DROP_LIST, CLEAR_DROP_LIST} from '../actions/index.actions';

export default function getDropList (state = [], action) {
  switch (action.type) {
  case SAVE_DROP_LIST: {
    return action.payload;
  }
  case CLEAR_DROP_LIST: {
    return [];
  }
  default:
    return state;
  }
}
