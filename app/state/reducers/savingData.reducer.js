import {SAVE_SAVING_DATA, CLEAR_SAVING_DATA} from '../actions/index.actions';

export default function savingData (state = {}, action) {
  switch (action.type) {
  case SAVE_SAVING_DATA: {
    return action.payload;
  }
  case CLEAR_SAVING_DATA: {
    return [];
  }
  default:
    return state;
  }
}
