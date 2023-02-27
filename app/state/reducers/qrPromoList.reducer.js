import {SET_PROMO_LIST, CLEAR_PROMO_LIST} from '../actions/index.actions';

const defaultState = [];
export default function promos (state = defaultState, action) {
  switch (action.type) {
  case SET_PROMO_LIST: {
    return action.payload;
  }
  case CLEAR_PROMO_LIST: {
    return defaultState;
  }
  default:
    return state;
  }
}
