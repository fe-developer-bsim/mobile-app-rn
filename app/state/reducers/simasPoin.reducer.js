import {SAVE_SIMAS_POIN, CLEAR_SIMAS_POIN} from '../actions/index.actions';

export default function simasPoinReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_SIMAS_POIN: {
    return action.payload;
  }
  case CLEAR_SIMAS_POIN: {
    return [];
  }
  default:
    return state;
  }
}
