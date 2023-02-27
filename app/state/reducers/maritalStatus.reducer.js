import {SAVE_MARITAL_STATUS, CLEAR_MARITAL_STATUS} from '../actions/index.actions';

export default function maritalStatus (state = [], action) {
  switch (action.type) {
  case SAVE_MARITAL_STATUS: {
    const maritalStatus = action.payload;
    return [...maritalStatus];
  }
  case CLEAR_MARITAL_STATUS: {
    return [];
  }
  default:
    return state;
  }
}
