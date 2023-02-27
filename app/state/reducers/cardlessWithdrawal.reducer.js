import {SAVE_CARDLESS_WITHDRAWAL_TRANSFER_LIST, CLEAR_CARDLESS_WITHDRAWAL_TRANSFER_LIST} from '../actions/index.actions';

export default function regexPassword (state = [], action) {
  switch (action.type) {
  case SAVE_CARDLESS_WITHDRAWAL_TRANSFER_LIST: {
    return action.payload;
  }
  case CLEAR_CARDLESS_WITHDRAWAL_TRANSFER_LIST: {
    return [];
  }
  default:
    return state;
  }
}
