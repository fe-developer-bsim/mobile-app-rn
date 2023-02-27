import {SAVE_ADD_FAVORITE_TRX, CLEAR_ADD_FAVORITE_TRX} from '../actions/index.actions';

export default function valueOpenMerchantSearch (state = false, action) {
  switch (action.type) {
  case SAVE_ADD_FAVORITE_TRX: {
    return action.payload;
  }
  case CLEAR_ADD_FAVORITE_TRX: {
    return false;
  }
  default:
    return state;
  }
}