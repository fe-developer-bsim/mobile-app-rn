import {SAVE_PRODUCT_DATA, CLEAR_PRODUCT_DATA} from '../actions/index.actions';

export default function productData (state = {}, action) {
  switch (action.type) {
  case SAVE_PRODUCT_DATA: {
    return action.payload;
  }
  case CLEAR_PRODUCT_DATA: {
    return [];
  }
  default:
    return state;
  }
}
