import {SAVE_EXCHANGE_CURRENCY, CLEAR_EXCHANGE_CURRENCY} from '../actions/index.actions';

export default function exchangeCurrencyRemittance (state = {}, action) {
  switch (action.type) {
  case SAVE_EXCHANGE_CURRENCY: {
    return action.payload;
  }
  case CLEAR_EXCHANGE_CURRENCY: {
    return {};
  }
  default:
    return state;
  }
}
