import {ADD_PRODUCT_MERCHANT_CART, UPDATE_PRODUCT_MERCHANT_CART, CLEAR_PRODUCT_MERCHANT_CART} from '../actions/index.actions';

export default function merchantCartReducer (state = [], action) {
  switch (action.type) {
  case ADD_PRODUCT_MERCHANT_CART: {
    return [...state, ...action.payload];
  }
  case UPDATE_PRODUCT_MERCHANT_CART: {
    return action.payload;
  }
  case CLEAR_PRODUCT_MERCHANT_CART: {
    return [];
  }
  default:
    return state;
  }
}
