import {SAVE_PROVINCE_LIST_STORE, CLEAR_PROVINCE_LIST_STORE} from '../actions/index.actions';

export default function provinceListStoreReducer (state = [], action) {
  switch (action.type) {
  case SAVE_PROVINCE_LIST_STORE: {
    return action.payload;
  }
  case CLEAR_PROVINCE_LIST_STORE: {
    return [];
  }
  default:
    return state;
  }
}