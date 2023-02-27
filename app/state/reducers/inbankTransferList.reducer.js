import {SAVE_INBANK_TRANSACTION_LIST, CLEAR_INBANK_TRANSACTION_LIST} from '../actions/index.actions';

export default function listInbankTransfer (state = [], action) {
  switch (action.type) {
  case SAVE_INBANK_TRANSACTION_LIST: {
    return action.payload;
  }
  case CLEAR_INBANK_TRANSACTION_LIST: {
    return [];
  }
  default:
    return state;
  }
}
