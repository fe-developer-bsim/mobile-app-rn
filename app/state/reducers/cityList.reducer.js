import {SAVE_CITY_LIST, CLEAR_CITY_LIST} from '../actions/index.actions';

export default function cityListReducer (state = [], action) {
  switch (action.type) {
  case SAVE_CITY_LIST: {
    return action.payload;
  }
  case CLEAR_CITY_LIST: {
    return [];
  }
  default:
    return state;
  }
}
