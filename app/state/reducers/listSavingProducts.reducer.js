import {SAVE_SAVING_PRODUCT, CLEAR_SAVING_PRODUCT} from '../actions/index.actions';

export default function listSavingProducts (state = [], action) {
  switch (action.type) {
  case SAVE_SAVING_PRODUCT: {
    const listSavingProducts = action.payload;
    return [...listSavingProducts];
  }
  case CLEAR_SAVING_PRODUCT: {
    return [];
  }
  default:
    return state;
  }
}
