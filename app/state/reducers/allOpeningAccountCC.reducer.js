import {SAVE_ALL_OPENING__CC, CLEAR_ALL_OPENING__CC} from '../actions/index.actions';

export default function allProductOpeningCC (state = [], action) {
  switch (action.type) {
  case SAVE_ALL_OPENING__CC: {
    return action.payload;
  }
  case CLEAR_ALL_OPENING__CC: {
    return '';
  }
  default: {
    return state;
  }
  }
}