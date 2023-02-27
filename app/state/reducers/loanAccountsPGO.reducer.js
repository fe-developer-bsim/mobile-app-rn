import {SAVE_LOAN_ACCOUNT_PGO, CLEAR_LOAN_ACCOUNT_PGO} from '../actions/index.actions';

export default function loanDataPGO (state = {}, action) {
  switch (action.type) {
  case SAVE_LOAN_ACCOUNT_PGO: {
    return action.payload;
  }
  case CLEAR_LOAN_ACCOUNT_PGO: {
    return {};
  }
  default:
    return state;
  }
}
