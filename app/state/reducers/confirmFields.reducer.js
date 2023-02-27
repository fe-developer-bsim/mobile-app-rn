import {SAVE_CONFIRM_FIELDS, CLEAR_CONFIRM_FIELDS} from '../actions/index.actions';

export default function confirmFields (state = [], action) {
  switch (action.type) {
  case SAVE_CONFIRM_FIELDS: {
    return action.payload;
  }
  case CLEAR_CONFIRM_FIELDS: {
    return [];
  }
  default:
    return state;
  }
}
