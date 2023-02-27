import {SAVE_DATA_AUTODEBIT_HISTORY, CLEAR_DATA_AUTODEBIT_HISTORY} from '../actions/index.actions';

export default function autoDebitHistory (state = [], action) {
  switch (action.type) {
  case SAVE_DATA_AUTODEBIT_HISTORY: {
    const data = action.payload;
    return data;
  }
  case CLEAR_DATA_AUTODEBIT_HISTORY: {
    return [];
  }
  default:
    return state;
  }
}
