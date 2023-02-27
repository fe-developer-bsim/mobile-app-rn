import {SAVE_DUKCAPIL, CLEAR_DUKCAPIL} from '../actions/index.actions';

export default function listDukcapil (state = {}, action) {
  switch (action.type) {
  case SAVE_DUKCAPIL: {
    return action.payload;
  }
  case CLEAR_DUKCAPIL: {
    return {};
  }
  default:
    return state;
  }
}
