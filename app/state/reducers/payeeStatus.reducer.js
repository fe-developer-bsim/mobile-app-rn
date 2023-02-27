import {SAVE_PAYEE_STATUS, CLEAR_PAYEE_STATUS} from '../actions/index.actions';

export default function payeeStatusReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_PAYEE_STATUS: {
    const payeeStatus = action.payload;    
    return payeeStatus;
  }
  case CLEAR_PAYEE_STATUS: {
    return {};
  }
  default:
    return state;
  }
}
