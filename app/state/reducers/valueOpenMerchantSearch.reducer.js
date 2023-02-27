import {SAVE_VALUE_OPEN_MERCHANT, CLEAR_VALUE_OPEN_MERCHANT} from '../actions/index.actions';

export default function valueOpenMerchantSearch (state = false, action) {
  switch (action.type) {
  case SAVE_VALUE_OPEN_MERCHANT: {
    return action.payload;
  }
  case CLEAR_VALUE_OPEN_MERCHANT: {
    return false;
  }
  default:
    return state;
  }
}