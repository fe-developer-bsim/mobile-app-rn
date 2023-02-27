import {SAVE_ALL_PRODUCT_FILTER_ALFA, CLEAR_ALL_PRODUCT_FILTER_ALFA} from '../actions/index.actions';

export default function allProductMerchant (state = [], action) {
  switch (action.type) {
  case SAVE_ALL_PRODUCT_FILTER_ALFA: {
    return action.payload;
  }
  case CLEAR_ALL_PRODUCT_FILTER_ALFA: {
    return '';
  }
  default: {
    return state;
  }
  }
}