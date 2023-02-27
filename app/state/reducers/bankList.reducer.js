import {SAVE_BANK_LIST, CLEAR_BANK_LIST} from '../actions/index.actions';
export default function valueBankList (state = {}, action) {
  switch (action.type) {
  case SAVE_BANK_LIST: {
    return action.payload;
  }
  case CLEAR_BANK_LIST: {
    return {};
  }
  default: {
    return state;
  }
  }
}