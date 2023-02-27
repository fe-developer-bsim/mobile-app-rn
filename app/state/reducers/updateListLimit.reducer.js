import {UPDATE_LIST_LIMIT, CLEAR_LIST_LIMIT} from '../actions/index.actions';

export default function listCredit (state = [], action) {
  switch (action.type) {
  case UPDATE_LIST_LIMIT: {
    const newList = action.payload;
    return [...newList];
  }
  case CLEAR_LIST_LIMIT: {
    return [];
  }
  default:
    return state;
  }
}
