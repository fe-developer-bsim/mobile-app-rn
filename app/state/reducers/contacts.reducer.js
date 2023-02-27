import {SAVE_CONTACTS, CLEAR_CONTACTS} from '../actions/index.actions';

export default function contacts (state = {}, action) {
  switch (action.type) {
  case SAVE_CONTACTS: {
    return action.payload;
  }
  case CLEAR_CONTACTS: {
    return [];
  }
  default:
    return state;
  }
}
