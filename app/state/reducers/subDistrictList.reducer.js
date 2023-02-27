import {SAVE_SUBDISTRICT_LIST, CLEAR_SUBDISTRICT_LIST} from '../actions/index.actions';

export default function cityListReducer (state = [], action) {
  switch (action.type) {
  case SAVE_SUBDISTRICT_LIST: {
    return action.payload;
  }
  case CLEAR_SUBDISTRICT_LIST: {
    return [];
  }
  default:
    return state;
  }
}
