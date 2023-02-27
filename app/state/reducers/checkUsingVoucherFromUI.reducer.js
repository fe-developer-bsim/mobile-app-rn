import {SAVE_CONTROLLER_USINGCOUPON, CLEAR_CONTROLLER_USINGCOUPON} from '../actions/index.actions';

export default function customerIdOrami (state = '', action) {
  switch (action.type) {
  case SAVE_CONTROLLER_USINGCOUPON: {
    return action.payload;
  }
  case CLEAR_CONTROLLER_USINGCOUPON: {
    return '';
  }
  default: {
    return state;
  }
  }
}
