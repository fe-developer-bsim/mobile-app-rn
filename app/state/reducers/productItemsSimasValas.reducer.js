import {SAVE_PRODUCTS_ITEMS_SIMAS_VALAS, CLEAR_PRODUCTS_ITEMS_SIMAS_VALAS} from '../actions/index.actions';

export default function productItemsSimasValas (state = {}, action) {
  switch (action.type) {
  case SAVE_PRODUCTS_ITEMS_SIMAS_VALAS: {
    const productItemsSimasValas = action.payload;
    return productItemsSimasValas;
  }
  case CLEAR_PRODUCTS_ITEMS_SIMAS_VALAS: {
    return {};
  }
  default:
    return state;
  }
}
