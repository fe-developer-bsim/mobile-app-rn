import {SAVE_WISHLIST_CMI, CLEAR_WISHLIST_CMI, UPDATE_WISHLIST_CMI} from '../actions/index.actions';

export default function wishlistCMI (state = [], action) {
  switch (action.type) {
  case SAVE_WISHLIST_CMI: {
    return action.payload;
  }
  case UPDATE_WISHLIST_CMI: {
    return action.payload;
  }
  case CLEAR_WISHLIST_CMI: {
    return [];
  }
  default:
    return state;
  }
}
