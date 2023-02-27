import {SAVE_PAYEE, CLEAR_PAYEE} from '../actions/index.actions';

const defaultState = [];
export default function promos (state = defaultState, action) {
  switch (action.type) {
  case SAVE_PAYEE: {
    return action.payload;
  }
  case CLEAR_PAYEE: {
    return defaultState;
  }
  default:
    return state;
  }
}
