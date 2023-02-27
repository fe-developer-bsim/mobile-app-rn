import {SAVE_DATA_AUTODEBIT, CLEAR_DATA_AUTODEBIT} from '../actions/index.actions';

export default function autoDebitList (state = {}, action) {
  switch (action.type) {
  case SAVE_DATA_AUTODEBIT: {
    const data = action.payload;
    return data;
  }
  case CLEAR_DATA_AUTODEBIT: {
    return {};
  }
  default:
    return state;
  }
}
