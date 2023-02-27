import {SAVE_LIST_CITY2, CLEAR_LIST_CITY2} from '../actions/index.actions';

export default function listCity2 (state = [], action) {
  switch (action.type) {
  case SAVE_LIST_CITY2: {
    const listCity = action.payload;
    return [...listCity];
  }
  case CLEAR_LIST_CITY2: {
    return [];
  }
  default:
    return state;
  }
}
