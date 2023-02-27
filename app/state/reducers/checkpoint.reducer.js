import {SAVE_CHECKPOINT, CLEAR_CHECKPOINT} from '../actions/index.actions';

export default function checkpoint (state = {}, action) {
  switch (action.type) {
  case SAVE_CHECKPOINT: {
    return action.payload;
  }
  case CLEAR_CHECKPOINT: {
    return {};
  }
  default: {
    return state;
  }
  }
}