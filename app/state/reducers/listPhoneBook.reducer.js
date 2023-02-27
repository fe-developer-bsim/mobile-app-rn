import {SAVE_PHONE_BOOK, CLEAR_PHONE_BOOK} from '../actions/index.actions';

export default function listPhoneBook (state = [], action) {
  switch (action.type) {
  case SAVE_PHONE_BOOK: {
    const listPhoneBook = action.payload;
    return [...listPhoneBook];
  }
  case CLEAR_PHONE_BOOK: {
    return [];
  }
  default:
    return state;
  }
}
