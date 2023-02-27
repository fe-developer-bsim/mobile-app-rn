import {SAVE_SUBDISTRICT_LIST_STORE, CLEAR_SUBDISTRICT_LIST_STORE} from '../actions/index.actions';

export default function cityListStoreReducer (state = [], action) {
  switch (action.type) {
  case SAVE_SUBDISTRICT_LIST_STORE: {
    return action.payload;
  }
  case CLEAR_SUBDISTRICT_LIST_STORE: {
    return [];
  }
  default:
    return state;
  }
}