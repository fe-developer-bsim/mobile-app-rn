import {SAVE_ALFA_SEARCH_STORE, DELETE_ALFA_SEARCH_STORE} from '../actions/index.actions';

export default function simasPoinReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_ALFA_SEARCH_STORE: {
    return action.payload;
  }
  case DELETE_ALFA_SEARCH_STORE: {
    return [];
  }
  default: {
    return state;
  }
  }
}
