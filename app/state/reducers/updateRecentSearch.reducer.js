import {UPDATE_RECENT_SEARCH, CLEAR_RECENT_SEARCH} from '../actions/index.actions';

export default function updateRecentSearch (state = [], action) {
  switch (action.type) {
  case UPDATE_RECENT_SEARCH: {
    return action.payload;
  }
  case CLEAR_RECENT_SEARCH: {
    return [];
  }
  default:
    return state;
  }
}