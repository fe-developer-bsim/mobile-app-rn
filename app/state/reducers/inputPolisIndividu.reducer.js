import {SAVE_INPUT_INDIVIDU, CLEAR_INPUT_INDIVIDU} from '../actions/index.actions';

export default function inputPolisIndividu (state = {}, action) {
  switch (action.type) {
  case SAVE_INPUT_INDIVIDU: {
    return action.payload;
  }
  case CLEAR_INPUT_INDIVIDU: {
    return {};
  }
  default:
    return state;
  }
}