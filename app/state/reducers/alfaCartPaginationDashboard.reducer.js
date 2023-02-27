import {SAVE_ALFA_PAGINATION_DASHBOARD, DELETE_ALFA_PAGINATION_DASHBOARD} from '../actions/index.actions';

export default function simasPoinReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_ALFA_PAGINATION_DASHBOARD: {
    return action.payload;
  }
  case DELETE_ALFA_PAGINATION_DASHBOARD: {
    return [];
  }
  default:
    return state;
  }
}