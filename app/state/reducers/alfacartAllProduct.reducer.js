import {SAVE_ALL_PRODUCT, CLEAR_ALL_PRODUCT} from '../actions/index.actions';

export default function listAllProduct (state = [], action) {
  switch (action.type) {
  case SAVE_ALL_PRODUCT: {
    return action.payload;
  }
  case CLEAR_ALL_PRODUCT: {
    return '';
  }
  default: {
    return state;
  }
  }
}
