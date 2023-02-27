import {FEEDBACK_SHOW, FEEDBACK_HIDE} from '../actions/index.actions';

const defaultState = {
  toggle: false
};

const feedbackReducer = (state = defaultState, action) => {
  switch (action.type) {
  case FEEDBACK_SHOW:  return {...state, toggle: true};
  case FEEDBACK_HIDE: return {...state, toggle: false};
  default: return state;
  }
};

export default feedbackReducer;
