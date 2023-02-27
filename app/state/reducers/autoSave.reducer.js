import {SAVE_AUTO_SAVE, CLEAR_AUTO_SAVE} from '../actions/index.actions';
export default function autoSave (state = {}, action) {
  switch (action.type) {
  case SAVE_AUTO_SAVE: {
    return action.payload;
  }
  case CLEAR_AUTO_SAVE: {
    return {};
  }
  default: {
    return state;
  }
  }
}