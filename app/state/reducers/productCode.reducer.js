import {SAVE_PRODUCT_CODE, CLEAR_PRODUCT_CODE} from '../actions/index.actions';

export default function productCode (state = '', action) {
  switch (action.type) {
  case SAVE_PRODUCT_CODE: {
    return action.payload;
  }
  case CLEAR_PRODUCT_CODE: {
    return '';
  }
  default: {
    return state;
  }
  }
}
