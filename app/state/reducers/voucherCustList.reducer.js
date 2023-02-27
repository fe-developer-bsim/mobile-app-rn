import {SAVE_VOUCHER_CUST_LIST, CLEAR_VOUCHER_CUST_LIST} from '../actions/index.actions';

export default function voucherCustList (state = [], action) {
  switch (action.type) {
  case SAVE_VOUCHER_CUST_LIST: {
    return action.payload;
  }
  case CLEAR_VOUCHER_CUST_LIST: {
    return [];
  }
  default:
    return state;
  }
}
