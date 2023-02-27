import {SAVE_CURRENT_SECTION, CLEAR_CURRENT_SECTION} from '../actions/index.actions';

export default function currentSection (state = [], action) {
  switch (action.type) {
  case SAVE_CURRENT_SECTION: {
    return action.payload;
  }
  case CLEAR_CURRENT_SECTION: {
    return [];
  }
  default:
    return state;
  }
}
