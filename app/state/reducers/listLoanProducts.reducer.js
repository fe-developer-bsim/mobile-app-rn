import {SAVE_LOAN_PRODUCT, CLEAR_LOAN_PRODUCT} from '../actions/index.actions';

export default function listLoanProducts (state = [], action) {
  switch (action.type) {
  case SAVE_LOAN_PRODUCT: {
    const listLoanProducts = action.payload;
    return [...listLoanProducts];
  }
  case CLEAR_LOAN_PRODUCT: {
    return [];
  }
  default:
    return state;
  }
}
