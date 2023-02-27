import {SAVE_DETAIL_PRODUCT, CLEAR_DETAIL_PRODUCT} from '../actions/index.actions';

export default function detailProduct (state = [], action) {
  switch (action.type) {
  case SAVE_DETAIL_PRODUCT: {
    return action.payload;
  }
  case CLEAR_DETAIL_PRODUCT: {
    return '';
  }
  default: {
    return state;
  }
  }
}
