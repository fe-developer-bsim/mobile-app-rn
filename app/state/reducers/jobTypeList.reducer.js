import {SAVE_JOB_TYPE, CLEAR_JOB_TYPE} from '../actions/index.actions';

export default function jobTypeList (state = [], action) {
  switch (action.type) {
  case SAVE_JOB_TYPE: {
    return action.payload;
  }
  case CLEAR_JOB_TYPE: {
    return [];
  }
  default:
    return state;
  }
}
