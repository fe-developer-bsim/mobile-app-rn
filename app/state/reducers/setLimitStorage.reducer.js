import {SAVE_DATA_LIST_LIMIT, CLEAR_DATA_LIST_LIMIT} from '../actions/index.actions';

export default function setLimitStorage (state = [], action) {
  switch (action.type) {
  case SAVE_DATA_LIST_LIMIT : {
    return action.payload;
  }
  case CLEAR_DATA_LIST_LIMIT: {
    return [];
  }
  default:
    return state;
  }
}
