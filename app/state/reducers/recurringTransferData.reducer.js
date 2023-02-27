import {SAVE_RECURRING_DATA, CLEAR_RECURRING_DATA} from '../actions/index.actions';

export default function recurringTransfer (state = [], action) {
  switch (action.type) {
  case SAVE_RECURRING_DATA: {
    const accounts = action.payload;
    return [...accounts];
  }
  case CLEAR_RECURRING_DATA: {
    return [];
  }
  default:
    return state;
  }
}
