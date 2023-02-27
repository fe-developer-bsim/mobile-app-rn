import {SAVE_HEALTH_QUESTION, CLEAR_HEALTH_QUESTION} from '../actions/index.actions';

export default function healthQuestion (state = {}, action) {
  switch (action.type) {
  case SAVE_HEALTH_QUESTION: {
    return action.payload;
  }
  case CLEAR_HEALTH_QUESTION: {
    return {};
  }
  default:
    return state;
  }
}