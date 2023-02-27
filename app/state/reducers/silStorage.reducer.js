import {SAVE_SIL_STORAGE, CLEAR_SIL_STORAGE} from '../actions/index.actions';

export default function silStorage (state = [], action) {
  switch (action.type) {
  case SAVE_SIL_STORAGE : {
    return action.payload;
  }
  case CLEAR_SIL_STORAGE: {
    return [];
  }
  default:
    return state;
  }
}
