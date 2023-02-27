import {SAVE_SALEPRODUCT_ALFACART, CLEAR_SALEPRODUCT_ALFACART, UPDATE_SALEPRODUCT_ALFACART} from '../actions/index.actions';

export default function saleproductAlfacart (state = [], action) {
  switch (action.type) {
  case SAVE_SALEPRODUCT_ALFACART: {
    return action.payload;
  }
  case UPDATE_SALEPRODUCT_ALFACART: {
    return action.payload;
  }
  case CLEAR_SALEPRODUCT_ALFACART: {
    return [];
  }
  default:
    return state;
  }
}
