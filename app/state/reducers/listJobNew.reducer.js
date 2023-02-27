import {SAVE_SIMPLIFIED_LIST_JOB_NEW, CLEAR_SIMPLIFIED_LIST_JOB_NEW} from '../actions/index.actions';

export default function listJobNew (state = [], action) {
  switch (action.type) {
  case SAVE_SIMPLIFIED_LIST_JOB_NEW: {
    const listJobNew = action.payload;
    return [...listJobNew];
  }
  case CLEAR_SIMPLIFIED_LIST_JOB_NEW: {
    return [];
  }
  default:
    return state;
  }
}