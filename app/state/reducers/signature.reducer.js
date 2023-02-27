import {SAVE_SIGNATURE, CLEAR_SIGNATURE} from '../actions/index.actions';

export default function simasPoinReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_SIGNATURE: {
    return action.payload;
  }
  case CLEAR_SIGNATURE: {
    return {};
  }
  default:
    return state;
  }
}
