import {SAVE_DISTRICT_LIST, CLEAR_DISTRICT_LIST} from '../actions/index.actions';

export default function cityListReducer (state = [], action) {
  switch (action.type) {
  case SAVE_DISTRICT_LIST: {
    return action.payload;
  }
  case CLEAR_DISTRICT_LIST: {
    return [];
  }
  default:
    return state;
  }
}
