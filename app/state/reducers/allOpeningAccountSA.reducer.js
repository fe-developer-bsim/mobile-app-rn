import {SAVE_ALL_OPENING__SA, CLEAR_ALL_OPENING__SA} from '../actions/index.actions';

export default function allProductOpeningSA (state = [], action) {
  switch (action.type) {
  case SAVE_ALL_OPENING__SA: {
    return action.payload;
  }
  case CLEAR_ALL_OPENING__SA: {
    return '';
  }
  default: {
    return state;
  }
  }
}