import {SAVE_DISTRICT_LIST_STORE, CLEAR_DISTRICT_LIST_STORE} from '../actions/index.actions';

export default function cityListStoreReducer (state = [], action) {
  switch (action.type) {
  case SAVE_DISTRICT_LIST_STORE: {
    return action.payload;
  }
  case CLEAR_DISTRICT_LIST_STORE: {
    return [];
  }
  default:
    return state;
  }
}