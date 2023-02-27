import {SAVE_PRODUCTS_ITEMS, CLEAR_PRODUCTS_ITEMS} from '../actions/index.actions';

export default function productItems (state = {}, action) {
  switch (action.type) {
  case SAVE_PRODUCTS_ITEMS: {
    const productItems = action.payload;
    return productItems;
  }
  case CLEAR_PRODUCTS_ITEMS: {
    return {};
  }
  default:
    return state;
  }
}
