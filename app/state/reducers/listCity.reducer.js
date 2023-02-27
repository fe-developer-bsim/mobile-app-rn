import {SAVE_LIST_CITY, CLEAR_LIST_CITY} from '../actions/index.actions';

export default function listCity (state = [], action) {
  switch (action.type) {
  case SAVE_LIST_CITY: {
    const listCity = action.payload;
    return [...listCity];
  }
  case CLEAR_LIST_CITY: {
    return [];
  }
  default:
    return state;
  }
}
