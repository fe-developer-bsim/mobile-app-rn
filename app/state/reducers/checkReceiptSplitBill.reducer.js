import {SAVE_CHECK_RECEIPT, CLEAR_CHECK_RECEIPT} from '../actions/index.actions';

export default function checkReceiptReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_CHECK_RECEIPT: {
    const checkReceipt = action.payload;    
    return checkReceipt;
  }
  case CLEAR_CHECK_RECEIPT: {
    return {};
  }
  default:
    return state;
  }
}
