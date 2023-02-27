import {SAVE_LOAN_ACCOUNT, CLEAR_LOAN_ACCOUNT} from '../actions/index.actions';

export default function accounts (state = [], action) {
  switch (action.type) {
  case SAVE_LOAN_ACCOUNT: {
    const accounts = action.payload;
    return [...accounts];
  }
  case CLEAR_LOAN_ACCOUNT: {
    return [];
  }
  default:
    return state;
  }
}
