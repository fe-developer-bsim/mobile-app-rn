import {SAVE_PASSENGER, CLEAR_PASSENGER} from '../actions/index.actions';

export default function userPassenger (state = {}, action) {
  switch (action.type) {
  case SAVE_PASSENGER: {
    return action.payload;
  }
  case CLEAR_PASSENGER: {
    return {};
  }
  default: {
    return state;
  }
  }
}
