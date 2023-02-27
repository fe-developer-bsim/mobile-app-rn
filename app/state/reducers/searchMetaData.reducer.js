import {SAVE_SEARCH_META_DATA, CLEAR_SEARCH_META_DATA} from '../actions/index.actions';
export default function searchMetaData (state = {}, action) {
  switch (action.type) {
  case SAVE_SEARCH_META_DATA: {
    return action.payload;
  }
  case CLEAR_SEARCH_META_DATA: {
    return {};
  }
  default: {
    return state;
  }
  }
}