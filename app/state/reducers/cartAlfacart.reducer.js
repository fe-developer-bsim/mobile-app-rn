import {SAVE_CART_ALFACART, CLEAR_CART_ALFACART, UPDATE_CART_ALFACART} from '../actions/index.actions';

export default function cartAlfacart (state = [], action) {
  switch (action.type) {
  case SAVE_CART_ALFACART: {
    return action.payload;
  }
  case UPDATE_CART_ALFACART: {
    return action.payload;
  }
  case CLEAR_CART_ALFACART: {
    return [];
  }
  default:
    return state;
  }
}
