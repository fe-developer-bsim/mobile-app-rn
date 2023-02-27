import {SAVE_CUSTOMERID_ORAMI, CLEAR_CUSTOMERID_ORAMI} from '../actions/index.actions';

export default function customerIdOrami (state = '', action) {
  switch (action.type) {
  case SAVE_CUSTOMERID_ORAMI: {
    return action.payload;
  }
  case CLEAR_CUSTOMERID_ORAMI: {
    return '';
  }
  default: {
    return state;
  }
  }
}
