import {SAVE_SELECTED_CONTACTS, CLEAR_SELECTED_CONTACTS} from '../actions/index.actions';

export default function selectedContacts (state = [], action) {
  switch (action.type) {
  case SAVE_SELECTED_CONTACTS: {
    const selectedContacts = action.payload;
    return [...selectedContacts];
  }
  case CLEAR_SELECTED_CONTACTS: {
    return [];
  }
  default: {
    return state;
  }
  }
}
