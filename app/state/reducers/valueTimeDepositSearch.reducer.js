import {SAVE_VALUE_TD, CLEAR_VALUE_TD} from '../actions/index.actions';

export default function valueTD (state = false, action) {
  switch (action.type) {
  case SAVE_VALUE_TD: {
    return action.payload;
  }
  case CLEAR_VALUE_TD: {
    return false;
  }
  default:
    return state;
  }
}