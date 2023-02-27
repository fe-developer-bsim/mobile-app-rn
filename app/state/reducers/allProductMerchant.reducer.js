import {SAVE_ALL_PRODUCT_MERCHANT, CLEAR_ALL_PRODUCT_MERCHANT} from '../actions/index.actions';

export default function allProductMerchantFilter (state = [], action) {
  switch (action.type) {
  case SAVE_ALL_PRODUCT_MERCHANT: {
    return action.payload;
  }
  case CLEAR_ALL_PRODUCT_MERCHANT: {
    return '';
  }
  default: {
    return state;
  }
  }
}