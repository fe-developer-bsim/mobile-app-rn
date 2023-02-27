import {SAVE_TICK, CLEAR_TICK} from '../actions/index.actions';

export default function lkdTick (state = {}, action) {
  switch (action.type) {
  case SAVE_TICK: {
    return action.payload;
  }
  case CLEAR_TICK: {
    return {};
  }
  default:
    return state;
  }
}