import {SAVE_PROVINCE_LIST, CLEAR_PROVINCE_LIST} from '../actions/index.actions';

export default function provinceListReducer (state = [], action) {
  switch (action.type) {
  case SAVE_PROVINCE_LIST: {
    return action.payload;
  }
  case CLEAR_PROVINCE_LIST: {
    return [];
  }
  default:
    return state;
  }
}
