import {SAVE_CATEGORY_ALFACART, CLEAR_CATEGORY_ALFACART, UPDATE_CATEGORY_ALFACART} from '../actions/index.actions';

export default function categoryAlfacart (state = [], action) {
  switch (action.type) {
  case SAVE_CATEGORY_ALFACART: {
    return action.payload;
  }
  case UPDATE_CATEGORY_ALFACART: {
    return action.payload;
  }
  case CLEAR_CATEGORY_ALFACART: {
    return [];
  }
  default:
    return state;
  }
}
