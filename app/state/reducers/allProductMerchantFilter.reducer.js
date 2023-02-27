import {SAVE_ALL_PRODUCT_MERCHANT_FILTER, CLEAR_ALL_PRODUCT_MERCHANT_FILTER} from '../actions/index.actions';

export default function allProductMerchant (state = [], action) {
  switch (action.type) {
  case SAVE_ALL_PRODUCT_MERCHANT_FILTER: {
    return action.payload;
  }
  case CLEAR_ALL_PRODUCT_MERCHANT_FILTER: {
    return '';
  }
  default: {
    return state;
  }
  }
}