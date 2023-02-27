import {SAVE_GENERATE_CODE, CLEAR_GENERATE_CODE} from '../actions/index.actions';

export default function checkpoint (state = {}, action) {
  switch (action.type) {
  case SAVE_GENERATE_CODE: {
    return action.payload;
  }
  case CLEAR_GENERATE_CODE: {
    return {};
  }
  default: {
    return state;
  }
  }
}
