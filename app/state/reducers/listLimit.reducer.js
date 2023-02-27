import {LIST_LIMIT, CLEAR_LIST_LIMIT} from '../actions/index.actions';

export default function listLimit (state = [], action) {
  switch (action.type) {
  case LIST_LIMIT: {
    return action.payload;
  }
  case CLEAR_LIST_LIMIT: {
    return [];
  }
  default:
    return state;
  }
}
