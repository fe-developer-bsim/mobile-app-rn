import {SAVE_CHARGE_LIST, CLEAR_CHARGE_LIST} from '../actions/index.actions';
export default function valueBankList (state = {}, action) {
  switch (action.type) {
  case SAVE_CHARGE_LIST: {
    return action.payload;
  }
  case CLEAR_CHARGE_LIST: {
    return {};
  }
  default: {
    return state;
  }
  }
}
