
import {SAVE_LIST_LIMIT_TRANSACTION, CLEAR_LIST_LIMIT_TRANSACTION} from '../actions/index.actions';

export default function userReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_LIST_LIMIT_TRANSACTION: {
    const userMetaData = action;
    return userMetaData;
  }
  case CLEAR_LIST_LIMIT_TRANSACTION: {
    return {};
  }
  default:
    return state;
  }
}
