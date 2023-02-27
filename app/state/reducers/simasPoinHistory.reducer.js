import {SAVE_SIMASPOIN_HISTORY, CLEAR_SIMASPOIN_HISTORY} from '../actions/index.actions';

export default function simasPoinHistoryReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_SIMASPOIN_HISTORY: {
    return action.payload;
  }
  case CLEAR_SIMASPOIN_HISTORY: {
    return [];
  }
  default:
    return state;
  }
}
