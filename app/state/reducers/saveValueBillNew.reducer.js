import {SAVE_VALUE_BILL_NEW, CLEAR_VALUE_BILL_NEW} from '../actions/index.actions';

export default function saveValueBillNew (state = [], action) {
  switch (action.type) {
  case SAVE_VALUE_BILL_NEW: {
    // const saveValueBillNew = action.payload;
    // return {...saveValueBillNew};
    return action.payload;
  }
  case CLEAR_VALUE_BILL_NEW: {
    return {};
  }
  default: {
    return state;
  }
  }
}
