import {SAVE_ALL_PRODUCT_SEARCH, CLEAR_ALL_PRODUCT_SEARCH} from '../actions/index.actions';

export default function listAllProductSearch (state = [], action) {
  switch (action.type) {
  case SAVE_ALL_PRODUCT_SEARCH: {
    return action.payload;
  }
  case CLEAR_ALL_PRODUCT_SEARCH: {
    return '';
  }
  default: {
    return state;
  }
  }
}