import {SAVE_ALL_PRODUCT_MERCHANT_CATEGORY, CLEAR_ALL_PRODUCT_MERCHANT_CATEGORY} from '../actions/index.actions';

export default function allProductMerchantCategory (state = [], action) {
  switch (action.type) {
  case SAVE_ALL_PRODUCT_MERCHANT_CATEGORY: {
    return action.payload;
  }
  case CLEAR_ALL_PRODUCT_MERCHANT_CATEGORY: {
    return '';
  }
  default: {
    return state;
  }
  }
}