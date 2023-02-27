import {SAVE_INVESTMENT_ACCOUNT, INVESTMENT_ACCOUNT_CLEAR} from '../actions/index.actions';

export default function userReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_INVESTMENT_ACCOUNT: {
    const userMetaData = action.payload;
    return userMetaData;
  }
  case INVESTMENT_ACCOUNT_CLEAR: {
    return {};
  }
  default:
    return state;
  }
}
