
import {SAVE_DELETE_LIMIT_TRANSACTION, CLEAR_DELETE_LIMIT_TRANSACTION} from '../actions/index.actions';

export default function userReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_DELETE_LIMIT_TRANSACTION: {
    const userMetaData = action.payload;
    return userMetaData;
  }
  case CLEAR_DELETE_LIMIT_TRANSACTION: {
    return {};
  }
  default:
    return state;
  }
}
