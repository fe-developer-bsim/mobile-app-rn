import {SAVE_CURRENCY_PURPOSE, CLEAR_CURRENCY_PURPOSE} from '../actions/index.actions';

const defaultState = [];
export default function currencyPurpose (state = defaultState, action) {
  switch (action.type) {
  case SAVE_CURRENCY_PURPOSE: {
    return action.payload;
  }
  case CLEAR_CURRENCY_PURPOSE: {
    return defaultState;
  }
  default:
    return state;
  }
}
