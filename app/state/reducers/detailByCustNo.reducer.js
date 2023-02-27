import {SAVE_DETAIL_BY_CUST_NO, CLEAR_DETAIL_BY_CUST_NO} from '../actions/index.actions';

export default function detailByCustNo (state = {}, action) {
  switch (action.type) {
  case SAVE_DETAIL_BY_CUST_NO: {
    return action.payload;
  }
  case CLEAR_DETAIL_BY_CUST_NO: {
    return {};
  }
  default:
    return state;
  }
}
