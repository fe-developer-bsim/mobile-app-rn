import {SAVE_INDEX, CLEAR_INDEX} from '../actions/index.actions';

export default function qrDiscountReducer (state = [], action) {
  switch (action.type) {
  case SAVE_INDEX: {
    const data = action.payload;
    if (data !== null || data !== undefined) {
      return action.payload;
    } else {
      return null;
    }
  }
  case CLEAR_INDEX: {
    return '';
  }
  default:
    return state;
  }
}
