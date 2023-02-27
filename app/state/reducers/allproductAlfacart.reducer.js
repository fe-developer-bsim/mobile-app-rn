import {SAVE_ALLPRODUCT_ALFACART, CLEAR_ALLPRODUCT_ALFACART, UPDATE_ALLPRODUCT_ALFACART} from '../actions/index.actions';

export default function allproductAlfacart (state = [], action) {
  switch (action.type) {
  case SAVE_ALLPRODUCT_ALFACART: {
    return action.payload;
  }
  case UPDATE_ALLPRODUCT_ALFACART: {
    return action.payload;
  }
  case CLEAR_ALLPRODUCT_ALFACART: {
    return [];
  }
  default:
    return state;
  }
}
