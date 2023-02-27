
import {SAVE_EDIT_LIMIT_TRANSACTION, CLEAR_EDIT_LIMIT_TRANSACTION} from '../actions/index.actions';

export default function setLimitTransactionEdit (state = {}, action) {
  switch (action.type) {
  case SAVE_EDIT_LIMIT_TRANSACTION: {
    return action.payload;
  }
  case CLEAR_EDIT_LIMIT_TRANSACTION: {
    return [];
  }
  default:
    return state;
  }

}
