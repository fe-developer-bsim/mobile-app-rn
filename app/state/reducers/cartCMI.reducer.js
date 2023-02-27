import {SAVE_CART_CMI, CLEAR_CART_CMI, UPDATE_CART_CMI} from '../actions/index.actions';

export default function cartCMI (state = [], action) {
  switch (action.type) {
  case SAVE_CART_CMI: {
    return action.payload;
  }
  case UPDATE_CART_CMI: {
    return action.payload;
  }
  case CLEAR_CART_CMI: {
    return [];
  }
  default:
    return state;
  }
}
