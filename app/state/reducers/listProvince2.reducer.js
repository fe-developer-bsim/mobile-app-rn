import {SAVE_LIST_PROVINCE2, CLEAR_LIST_PROVINCE2} from '../actions/index.actions';

export default function listProvince2 (state = [], action) {
  switch (action.type) {
  case SAVE_LIST_PROVINCE2: {
    const listProvince = action.payload;
    return [...listProvince];
  }
  case CLEAR_LIST_PROVINCE2: {
    return [];
  }
  default:
    return state;
  }
}
