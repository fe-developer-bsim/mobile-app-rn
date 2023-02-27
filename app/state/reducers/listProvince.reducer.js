import {SAVE_LIST_PROVINCE, CLEAR_LIST_PROVINCE} from '../actions/index.actions';

export default function listProvince (state = [], action) {
  switch (action.type) {
  case SAVE_LIST_PROVINCE: {
    const listProvince = action.payload;
    return [...listProvince];
  }
  case CLEAR_LIST_PROVINCE: {
    return [];
  }
  default:
    return state;
  }
}
