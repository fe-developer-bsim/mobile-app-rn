import {SAVE_VALUE_RECENT_SEARCH, CLEAR_VALUE_RECENT_SEARCH} from '../actions/index.actions';

export default function valueRecentSearch (state = [], action) {
  switch (action.type) {
  case SAVE_VALUE_RECENT_SEARCH: {
    return action.payload;
  }
  case CLEAR_VALUE_RECENT_SEARCH: {
    return [];
  }
  default:
    return state;
  }
}