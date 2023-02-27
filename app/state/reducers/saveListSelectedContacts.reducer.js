import {SAVE_LIST_SELECTED_CONTACTS, CLEAR_LIST_SELECTED_CONTACTS} from '../actions/index.actions';

export default function saveListSelectedContacts (state = '', action) {
  switch (action.type) {
  case SAVE_LIST_SELECTED_CONTACTS: {
    const addNewparticipants = action.payload;
    return [...addNewparticipants];
  }
  case CLEAR_LIST_SELECTED_CONTACTS: {
    return [];
  }
  default: {
    return state;
  }
  }
}
