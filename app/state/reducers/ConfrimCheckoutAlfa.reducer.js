import {SAVE_ALL_CONFRIM_CHECKOUT_ALFA, UPDATE_ALL_CONFRIM_CHECKOUT_ALFA, CLEAR_ALL_CONFRIM_CHECKOUT_ALFA} from '../actions/index.actions';

export default function allProductMerchantCategory (state = [], action) {
  switch (action.type) {
  case SAVE_ALL_CONFRIM_CHECKOUT_ALFA: {
    return action.payload;
  }
  case UPDATE_ALL_CONFRIM_CHECKOUT_ALFA: {
    return action.payload;
  }
  case CLEAR_ALL_CONFRIM_CHECKOUT_ALFA: {
    return '';
  }
  default: {
    return state;
  }
  }
}