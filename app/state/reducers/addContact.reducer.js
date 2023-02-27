import {ADD_CONTACT, CLEAR_ADD_CONTACT} from '../actions/index.actions';

export default function addContact (state = {}, action) {
  switch (action.type) {
  case ADD_CONTACT: {
    return action.payload;
  }
  case CLEAR_ADD_CONTACT: {
    return [];
  }
  default:
    return state;
  }
}
