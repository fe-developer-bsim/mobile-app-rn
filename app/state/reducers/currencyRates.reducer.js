import {SAVE_CURRENCY_RATES, CLEAR_CURRENCY_RATES} from '../actions/index.actions';

const defaultState = [];
export default function promos (state = defaultState, action) {
  switch (action.type) {
  case SAVE_CURRENCY_RATES: {
    return action.payload;
  }
  case CLEAR_CURRENCY_RATES: {
    return defaultState;
  }
  default:
    return state;
  }
}
