import {PAYDAY_LOAN_DATA_CONFIG, CLEAR_PAYDAY_LOAN_DATA_CONFIG} from '../actions/index.actions';

export default function paydayLoan (state = {}, action) {
  switch (action.type) {
  case PAYDAY_LOAN_DATA_CONFIG: {
    return action.payload;
  }
  case CLEAR_PAYDAY_LOAN_DATA_CONFIG: {
    return {};
  }
  default: {
    return state;
  }
  }
}
