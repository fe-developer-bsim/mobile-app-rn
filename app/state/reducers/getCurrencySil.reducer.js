import {SAVE_CURRENCY_SIL, CLEAR_CURRENCY_SIL} from '../actions/index.actions';

export default function getCurrencyNBSil (state = {}, action) {
  switch (action.type) {
  case SAVE_CURRENCY_SIL: {
    return action.payload;
  }
  case CLEAR_CURRENCY_SIL: {
    return {};
  }
  default:
    return state;
  }
}