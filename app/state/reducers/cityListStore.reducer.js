import {SAVE_CITY_LIST_STORE, CLEAR_CITY_LIST_STORE} from '../actions/index.actions';

export default function cityListStoreReducer (state = [], action) {
  switch (action.type) {
  case SAVE_CITY_LIST_STORE: {
    return action.payload;
  }
  case CLEAR_CITY_LIST_STORE: {
    return [];
  }
  default:
    return state;
  }
}