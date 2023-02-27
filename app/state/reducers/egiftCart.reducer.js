import {ADD_EGIFT_CART, UPDATE_EGIFT_CART, CLEAR_EGIFT_CART} from '../actions/index.actions';

export default function egiftReducer (state = [], action) {
  switch (action.type) {
  case ADD_EGIFT_CART: {
    return [...state, ...action.payload];
  }
  case UPDATE_EGIFT_CART: {
    return action.payload;
  }
  case CLEAR_EGIFT_CART: {
    return [];
  }
  default:
    return state;
  }
}
