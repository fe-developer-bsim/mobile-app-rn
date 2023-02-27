import {SAVE_WISHLIST_ALFACART, CLEAR_WISHLIST_ALFACART, UPDATE_WISHLIST_ALFACART} from '../actions/index.actions';

export default function wishlistAlfacart (state = [], action) {
  switch (action.type) {
  case SAVE_WISHLIST_ALFACART: {
    return action.payload;
  }
  case UPDATE_WISHLIST_ALFACART: {
    return action.payload;
  }
  case CLEAR_WISHLIST_ALFACART: {
    return [];
  }
  default:
    return state;
  }
}
