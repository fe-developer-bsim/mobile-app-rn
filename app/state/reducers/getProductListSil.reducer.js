import {SAVE_PRODUCT_LIST, CLEAR_PRODUCT_LIST} from '../actions/index.actions';

export default function getProductListSil (state = [], action) {
  switch (action.type) {
  case SAVE_PRODUCT_LIST: {
    return action.payload;
  }
  case CLEAR_PRODUCT_LIST: {
    return [];
  }
  default:
    return state;
  }
}
