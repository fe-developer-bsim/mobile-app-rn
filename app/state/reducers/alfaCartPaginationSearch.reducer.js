import {SAVE_ALFA_PAGINATION_SEARCH, DELETE_ALFA_PAGINATION_SEARCH} from '../actions/index.actions';

export default function simasPoinReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_ALFA_PAGINATION_SEARCH: {
    return action.payload;
  }
  case DELETE_ALFA_PAGINATION_SEARCH: {
    return [];
  }
  default:
    return state;
  }
}