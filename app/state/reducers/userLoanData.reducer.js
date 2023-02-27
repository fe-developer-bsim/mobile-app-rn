import {SAVE_USER_LOAN_DATA, CLEAR_USER_LOAN_DATA} from '../actions/index.actions';

export default function userLoanData (state = [], action) {
  switch (action.type) {
  case SAVE_USER_LOAN_DATA: {
    return action.payload;
  }
  case CLEAR_USER_LOAN_DATA: {
    return [];
  }
  default:
    return state;
  }
}
